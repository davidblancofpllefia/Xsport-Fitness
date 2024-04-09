import { createClient } from '@supabase/supabase-js'
   const supabaseUrl = 'https://izipcbvvfzyyzshhsucl.supabase.co'
   const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6aXBjYnZ2Znp5eXpzaGhzdWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NzIwMDIsImV4cCI6MjAyNjQ0ODAwMn0.sNA6CVCgQjv4xerDeqHZKvavldngu61XJjQ4twNU3YI'
   export const supabase = createClient(supabaseUrl, supabaseKey)

   