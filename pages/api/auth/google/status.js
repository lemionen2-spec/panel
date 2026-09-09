import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    const { data } = await supabase
      .from("google_tokens")
      .select("id")
      .eq("id", 1)
      .maybeSingle();

    res.status(200).json({ connected: !!data });
  } catch (e) {
    res.status(200).json({ connected: false });
  }
}
