import { createClient } from '@supabase/supabase-js';
import * as schema from "@shared/schema";

// Check for required Supabase environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_SERVICE_KEY must be set for database operations."
  );
}

// Create a Supabase client with the service role key for database operations
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Export for compatibility with existing code
export const db = supabaseAdmin;
