import { User } from '@supabase/supabase-js';
import { getSupabaseClient } from './supabase';

/**
 * Ensures a user record exists in the public.users table
 * This is needed because Supabase auth creates users in auth.users,
 * but we need records in public.users for foreign key relationships
 * 
 * IMPORTANT: We use the serverless API route to bypass Supabase RLS policies
 */
export async function ensureUserExists(user: User): Promise<void> {
  if (!user || !user.id) {
    throw new Error('Invalid user object');
  }

  try {
    // Use our server API to check and create the user
    // This bypasses Supabase RLS policies
    const response = await fetch('/api/ensure-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
        email: user.email,
        username: user.email?.split('@')[0] || `user_${Date.now()}`,
        is_verified: user.email_confirmed_at ? true : false,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to ensure user exists');
    }
    
    const data = await response.json();
    console.log('User record verified:', data.success);
    
  } catch (error) {
    console.error('Error ensuring user exists:', error);
    // For now, we'll continue even if this fails
    // so the user experience isn't interrupted
  }
}