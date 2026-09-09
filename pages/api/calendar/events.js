import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function refreshAccessToken(refreshToken) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Google token yenilenemedi");
  return data; // { access_token, expires_in, ... }
}

export default async function handler(req, res) {
  const range = req.query.range === "all" ? "all" : "week";

  const { data: tokenRow, error: dbError } = await supabase
    .from("google_tokens")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (dbError || !tokenRow) {
    return res.status(200).json({ connected: false, events: [] });
  }

  let accessToken = tokenRow.access_token;
  const isExpired = new Date(tokenRow.expires_at).getTime() < Date.now() + 60000;

  if (isExpired) {
    try {
      const refreshed = await refreshAccessToken(tokenRow.refresh_token);
      accessToken = refreshed.access_token;
      const newExpiresAt = new Date(Date.now() + refreshed.expires_in * 1000).toISOString();
      await supabase
        .from("google_tokens")
        .update({
          access_token: accessToken,
          expires_at: newExpiresAt,
          updated_at: new Date().toISOString(),
        })
        .eq("id", 1);
    } catch (e) {
      console.error("Token refresh failed:", e);
      return res.status(200).json({ connected: false, events: [] });
    }
  }

  let timeMin, timeMax;
  if (range === "week") {
    const now = new Date();
    const day = now.getDay(); // 0=Paz, 1=Pzt, ... 6=Cmt
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);
    const sundayEnd = new Date(monday);
    sundayEnd.setDate(monday.getDate() + 7);
    timeMin = monday.toISOString();
    timeMax = sundayEnd.toISOString();
  } else {
    timeMin = new Date().toISOString();
    timeMax = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
  }

  const params = new URLSearchParams({
    timeMin,
    timeMax,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: range === "week" ? "50" : "150",
  });

  try {
    const calRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params.toString()}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const calData = await calRes.json();

    if (!calRes.ok) {
      console.error("Calendar API error:", calData);
      return res.status(200).json({ connected: true, events: [], error: true });
    }

    const events = (calData.items || []).map((ev) => ({
      id: ev.id,
      title: ev.summary || "(Başlıksız)",
      start: ev.start?.dateTime || ev.start?.date,
      end: ev.end?.dateTime || ev.end?.date,
      allDay: !ev.start?.dateTime,
      link: ev.htmlLink,
    }));

    return res.status(200).json({ connected: true, events });
  } catch (e) {
    console.error(e);
    return res.status(200).json({ connected: true, events: [], error: true });
  }
}
