import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ibbswuaejyecacuwqjpj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliYnN3dWFlanllY2FjdXdxanBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5NjY4MDAsImV4cCI6MjAwODU0MjgwMH0.C2Cx6Hh97cqgTxxh9yAOVp6yUUEHMUukEbtaRJ8xSxw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
