import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kxyhvogyxocxmozqqsok.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eWh2b2d5eG9jeG1venFxc29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MDQ4OTAsImV4cCI6MjA4MTE4MDg5MH0.706zLiRVo-WhF1BpwJT_Lt6M5uzbXselZroX9kyJHdg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
