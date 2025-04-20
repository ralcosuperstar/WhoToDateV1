import { getSupabaseClient } from './supabase';
import { ensureUserExists } from './supabaseUtils';

/**
 * Sign in with email and password
 */
export async function signInWithPassword(email: string, password: string) {
  try {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Error signing in:', error);
      return { user: null, session: null, error };
    }

    // Ensure user exists in database
    if (data.user) {
      try {
        await ensureUserExists(data.user);
      } catch (syncError) {
        console.error('Error syncing user after sign in:', syncError);
        // Continue even if sync fails
      }
    }

    return { user: data.user, session: data.session, error: null };
  } catch (error: any) {
    console.error('Exception during sign in:', error);
    return { user: null, session: null, error };
  }
}

/**
 * Sign up with email and password
 */
export async function signUpWithPassword(email: string, password: string, userData?: any) {
  try {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });

    if (error) {
      console.error('Error signing up:', error);
      return { user: null, session: null, error };
    }

    // Special case - existing user detection
    // If identities array is empty, it means user already exists
    if (data.user && (!data.user.identities || data.user.identities.length === 0)) {
      console.log('User already exists - detected from identities array');
      return { 
        user: null, 
        session: null, 
        error: { 
          message: 'User already registered', 
          existingUser: true 
        } 
      };
    }

    return { user: data.user, session: data.session, error: null };
  } catch (error: any) {
    console.error('Exception during sign up:', error);
    return { user: null, session: null, error };
  }
}

/**
 * Verify OTP for email confirmation
 */
export async function verifyOtp(email: string, token: string) {
  try {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup'
    });

    if (error) {
      console.error('Error verifying OTP:', error);
      return { user: null, session: null, error };
    }

    // Ensure user exists in database
    if (data.user) {
      try {
        await ensureUserExists(data.user);
      } catch (syncError) {
        console.error('Error syncing user after OTP verification:', syncError);
        // Continue even if sync fails
      }
    }

    return { user: data.user, session: data.session, error: null };
  } catch (error: any) {
    console.error('Exception during OTP verification:', error);
    return { user: null, session: null, error };
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    const supabase = await getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error signing out:', error);
      return { error };
    }
    
    return { error: null };
  } catch (error: any) {
    console.error('Exception during sign out:', error);
    return { error };
  }
}

/**
 * Get the current session
 */
export async function getSession() {
  try {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error);
      return null;
    }
    
    return data.session;
  } catch (error) {
    console.error('Exception getting session:', error);
    return null;
  }
}

/**
 * Get the current user
 */
export async function getCurrentUser() {
  try {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting user:', error);
      return null;
    }
    
    return data.user;
  } catch (error) {
    console.error('Exception getting user:', error);
    return null;
  }
}

/**
 * Sync the current user with the server
 */
export async function syncUserWithServer(user: any) {
  if (!user || !user.email || !user.id) {
    console.error('Invalid user object for server sync');
    return { success: false };
  }
  
  try {
    const response = await fetch('/api/supabase-sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        user_id: user.id
      }),
      credentials: 'include'
    });
    
    if (!response.ok) {
      const text = await response.text();
      console.error('Failed to sync with server:', text);
      return { success: false, error: text };
    }
    
    console.log('Successfully synced with server');
    return { success: true };
  } catch (error) {
    console.error('Exception during server sync:', error);
    return { success: false, error };
  }
}