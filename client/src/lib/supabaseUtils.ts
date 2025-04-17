import { getSupabaseClient } from './supabase';
import type { User } from '@supabase/supabase-js';

/**
 * Ensures that a user record exists in the public.users table.
 * This is necessary because the auth.users table is managed by Supabase Auth,
 * but we need a record in our public.users table for foreign key constraints.
 */
export async function ensureUserExists(supabaseUser: User): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    
    // Check if user exists in public.users table
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('id', supabaseUser.id)
      .single();
    
    // If we get a "not found" error, we need to create the user
    if (checkError && !existingUser) {
      console.log("Creating user record in Supabase public.users table");
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: supabaseUser.id,
          email: supabaseUser.email,
          phone_number: supabaseUser.phone || null,
          first_name: supabaseUser.user_metadata?.firstName || null,
          last_name: supabaseUser.user_metadata?.lastName || null,
          full_name: supabaseUser.user_metadata?.fullName || null,
        });
        
      if (insertError) {
        console.error("Failed to create user in public.users table:", insertError);
        return false;
      } else {
        console.log("Successfully created user in public.users table");
        return true;
      }
    } else {
      // User already exists
      console.log("User already exists in public.users table");
      return true;
    }
  } catch (error) {
    console.error("Error checking/creating user in Supabase:", error);
    return false;
  }
}