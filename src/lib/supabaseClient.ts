import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL ? process.env.SUPABASE_URL : '';
const supabaseKey = process.env.SUPABASE_ANON_KEY ? process.env.SUPABASE_ANON_KEY : '';

export const supabase = createClient(supabaseUrl, supabaseKey);