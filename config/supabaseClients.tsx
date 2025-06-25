import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL ||
  "https://fqaciwqylmwewpvddcjd.supabase.co";
const supabaseKey =
  process.env.REACT_APP_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxYWNpd3F5bG13ZXdwdmRkY2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODc1NTksImV4cCI6MjA2NTA2MzU1OX0.pT7amvdRiM1YQufgFMzgoH54w7CYyPWMQlXPIMZhw6M";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
