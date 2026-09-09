export default function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const siteUrl = "https://www.dijitalgelirsistemi.com.tr";
  const redirectUri = `${siteUrl}/api/auth/google/callback`;

  const scope = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/documents",
  ].join(" ");

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope,
    access_type: "offline",
    prompt: "consent",
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
