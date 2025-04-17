import { User } from '@supabase/supabase-js';
import { getSupabaseClient } from './supabase';

/**
 * Ensures a user record exists in the public.users table
 * This is needed because Supabase auth creates users in auth.users,
 * but we need records in public.users for foreign key relationships
 */
export async function ensureUserExists(user: User): Promise<void> {
  if (!user || !user.id) {
    throw new Error('Invalid user object');
  }

  const supabase = getSupabaseClient();
  
  // First check if user already exists in public.users
  const { data: existingUser, error: queryError } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();
    
  if (queryError) {
    console.error('Error checking if user exists:', queryError);
    throw queryError;
  }
  
  // If user doesn't exist, create record in public.users
  if (!existingUser) {
    console.log('Creating basic user from Supabase data');
    
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: user.email,
        username: user.email?.split('@')[0] || `user_${Date.now()}`,
        is_verified: user.email_confirmed_at ? true : false,
        created_at: new Date().toISOString()
      });
      
    if (insertError) {
      console.error('Error creating user record:', insertError);
      throw insertError;
    }
  }
}