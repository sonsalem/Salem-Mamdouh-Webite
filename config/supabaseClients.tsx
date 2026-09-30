import { createClient } from "@supabase/supabase-js";

// Set in .env.local (see .env.example). NEXT_PUBLIC_ so they're available in
// the browser, where the content is fetched.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY — copy .env.example to .env.local.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
