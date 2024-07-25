import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://tbdnqeequpkpxismudxc.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiZG5xZWVxdXBrcHhpc211ZHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2Mzg1MTMsImV4cCI6MjAzNjIxNDUxM30.-0Cknhn8xJC-Xj6vMZA3n4vRly73FfRPxV641zEUhDc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
