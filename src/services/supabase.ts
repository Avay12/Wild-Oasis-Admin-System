import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://wjczjcltqqbimesehwmp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3pqY2x0cXFiaW1lc2Vod21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2NDI2ODMsImV4cCI6MjAzNDIxODY4M30.Zs3kHbwQQ3_bsr_lvhM3Abkpt9XGkdliCrgULagThZ8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
