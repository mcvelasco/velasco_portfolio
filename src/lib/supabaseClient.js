import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ahgdzkscivbmmeeombyb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZ2R6a3NjaXZibW1lZW9tYnliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNzA5NzgsImV4cCI6MjA5MjY0Njk3OH0.dTsbwRH9ShCYrFLYTNfzuT8HsgaH_iPAnWXL5sqaeYI";
export const supabase = createClient(supabaseUrl, supabaseKey)