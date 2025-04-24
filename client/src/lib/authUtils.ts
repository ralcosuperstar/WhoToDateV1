import directSupabaseService from '@/services/directSupabaseService';
import { ensureUserExists } from './supabaseUtils';
import { getSupabaseClient } from './supabaseConfig';

// Get the Supabase client on-demand to avoid duplicate client instances
const getClient = async () => await getSupabaseClient();

/**
 * Sign in with email and password
 */
export async function signInWithPassword(email: string, password: string) {
  try {
    // Get a client instance when needed
    const supabase = await getClient();
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
    // Get a client instance when needed
    const supabase = await getClient();
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
    // Get a client instance when needed
    const supabase = await getClient();
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
    // Get a client instance when needed
    const supabase = await getClient();
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
    // Get a client instance when needed
    const supabase = await getClient();
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
    // Get a client instance when needed
    const supabase = await getClient();
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
    console.log(`Syncing user with server after sign in: ${user.email}`);
    
    // First ensure the user exists in the database
    const ensureResponse = await fetch('/api/ensure-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.id,
        email: user.email,
        username: user.user_metadata?.username || user.email.split('@')[0],
        isVerified: !!user.email_confirmed_at
      }),
      credentials: 'include'
    });
    
    if (!ensureResponse.ok) {
      const text = await ensureResponse.text();
      console.error('Failed to ensure user exists:', text);
      // Continue anyway - this might just be a duplicate error
    }
    
    // Then try to sync the session
    const syncResponse = await fetch('/api/supabase-sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        user_id: user.id
      }),
      credentials: 'include'
    });
    
    if (!syncResponse.ok) {
      const text = await syncResponse.text();
      console.error('Failed to sync with server:', text);
      // Continue anyway - session sync isn't critical
    } else {
      console.log('Successfully synced with server');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Exception during server sync:', error);
    // Don't fail auth because of sync issues
    return { success: true };
  }
}