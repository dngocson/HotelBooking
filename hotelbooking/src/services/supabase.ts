import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yknjuhlbtefbwyqoskgq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrbmp1aGxidGVmYnd5cW9za2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgzNzI3MTAsImV4cCI6MjAwMzk0ODcxMH0.k4ToeabdN3Vx9ZZdBunggdAvvtKFZV5K8RlxklRJSmg";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
