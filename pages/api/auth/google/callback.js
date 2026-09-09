import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error) {
    return res.redirect("/?google=error");
  }

  try {
    const siteUrl = "https://www.dijitalgelirsistemi.com.tr";
    const redirectUri = `${siteUrl}/api/auth/google/callback`;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenRes.json();

    if (!tokenRes.ok) {
      console.error("Google token exchange failed:", tokens);
      return res.redirect("/?google=error");
    }

    const { access_token, refresh_token, expires_in } = tokens;
    const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

    const { error: dbError } = await supabase.from("google_tokens").upsert({
      id: 1,
      access_token,
      refresh_token,
      expires_at: expiresAt,
      updated_at: new Date().toISOString(),
    });

    if (dbError) {
      console.error("Supabase write failed:", dbError);
      return res.redirect("/?google=error");
    }

    return res.redirect("/?google=connected");
  } catch (e) {
    console.error(e);
    return res.redirect("/?google=error");
  }
}
