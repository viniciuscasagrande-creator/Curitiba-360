import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://mock-curitiba360.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'mock-anon-key-123456';

// Supabase client instance with automatic fallback mode
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
