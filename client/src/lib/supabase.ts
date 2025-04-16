import { createClient } from '@supabase/supabase-js';
import type { AuthError, Session, SupabaseClient, User } from '@supabase/supabase-js';

// Create a global instance for the Supabase client
let supabaseInstance: SupabaseClient | null = null;

// Function to get the Supabase configuration
async function getSupabaseConfig() {
  try {
    // Fetch the Supabase configuration from our backend
    const response = await fetch('/api/supabase-config');
    if (!response.ok) {
      throw new Error('Failed to fetch Supabase configuration');
    }
    const { supabaseUrl, supabaseAnonKey } = await response.json();
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase configuration');
    }
    
    return { supabaseUrl, supabaseAnonKey };
  } catch (error) {
    console.error('Error fetching Supabase configuration:', error);
    throw error;
  }
}

// Initialize the Supabase client
export async function initSupabase() {
  try {
    // If the client is already initialized, return it
    if (supabaseInstance) {
      return supabaseInstance;
    }
    
    // Get the configuration
    const { supabaseUrl, supabaseAnonKey } = await getSupabaseConfig();
    
    console.log('Initializing Supabase with URL:', supabaseUrl);
    
    // Create a new Supabase client
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true
      }
    });
    
    console.log('Supabase client initialized successfully');
    
    return supabaseInstance;
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    throw error;
  }
}

// Get the Supabase client instance
export function getSupabaseClient() {
  if (!supabaseInstance) {
    throw new Error('Supabase client not initialized. Call initSupabase() first.');
  }
  return supabaseInstance;
}

// Helper function to ensure client is initialized
async function ensureClient() {
  if (!supabaseInstance) {
    return await initSupabase();
  }
  return supabaseInstance;
}

// Sign up with email and password
export const signUp = async (email: string, password: string) => {
  try {
    const client = await ensureClient();
    return await client.auth.signUp({
      email,
      password,
    });
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    const client = await ensureClient();
    return await client.auth.signInWithPassword({
      email,
      password,
    });
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    const client = await ensureClient();
    return await client.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get the current user
export const getCurrentUser = async () => {
  try {
    const client = await ensureClient();
    const { data: { user } } = await client.auth.getUser();
    return { user };
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
};

// Get the current session
export const getSession = async () => {
  try {
    const client = await ensureClient();
    const { data: { session } } = await client.auth.getSession();
    return { session };
  } catch (error) {
    console.error('Error getting session:', error);
    throw error;
  }
};

// Export the current instance for direct access (but prefer using the async functions)
export { supabaseInstance as supabase };