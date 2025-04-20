import { createClient, type User, type Session } from '@supabase/supabase-js';
import { apiRequest } from './queryClient';

// Types
interface AuthResponse {
  user: User | null;
  session: Session | null;
  error?: Error;
}

// Dynamically fetch Supabase configuration from the server
let supabaseClient: ReturnType<typeof createClient> | null = null;
let initialized = false;
let initializationError: Error | null = null;
let initializationPromise: Promise<void> | null = null;

// Initialize Supabase client with configuration from the server
export const initializeSupabase = async (): Promise<void> => {
  // If already initialized or initializing, don't try again
  if (initialized || initializationPromise) {
    return initializationPromise || Promise.resolve();
  }
  
  // Set up initialization promise
  initializationPromise = (async () => {
    try {
      // Direct fetch to avoid path prefix issues
      const response = await fetch('/api/supabase-config');
      if (!response.ok) {
        throw new Error(`Failed to fetch Supabase config: ${response.status} ${response.statusText}`);
      }
      const config = await response.json();
      
      if (!config.initialized || !config.url || !config.anonKey) {
        throw new Error('Missing Supabase configuration');
      }
      
      // Create the Supabase client
      supabaseClient = createClient(config.url, config.anonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
        }
      });
      
      // Test the connection
      const { data, error } = await supabaseClient.auth.getSession();
      
      if (error) {
        console.warn('Supabase session not found:', error.message);
        // This is not a critical error as the user might not be logged in
      }
      
      console.log('Supabase client initialized successfully');
      initialized = true;
      initializationError = null;
    } catch (error) {
      console.error('Error initializing Supabase:', error);
      initializationError = error instanceof Error ? error : new Error(String(error));
      initialized = false;
      throw error;
    }
  })();
  
  return initializationPromise;
};

// Get the Supabase client (initializing if needed)
export const getSupabaseClient = async () => {
  if (!initialized && !initializationPromise) {
    await initializeSupabase();
  } else if (initializationPromise) {
    await initializationPromise;
  }
  
  if (!supabaseClient) {
    throw new Error('Supabase client not initialized');
  }
  
  return supabaseClient;
};

// Function to check if Supabase is initialized
export const isSupabaseInitialized = () => {
  return initialized;
};

// Function to get any initialization error
export const getSupabaseError = () => {
  return initializationError;
};

// Initialize Supabase on app load
initializeSupabase().catch(err => {
  console.error('Failed to initialize Supabase on app load:', err);
});

// Authentication functions
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    return {
      user: data.user,
      session: data.session
    };
  } catch (error) {
    console.error('Error signing in:', error);
    return {
      user: null,
      session: null,
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
};

export const signUp = async (
  email: string, 
  password: string,
  userData?: Record<string, any>
): Promise<AuthResponse> => {
  try {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/auth?verification=success`
      }
    });
    
    if (error) throw error;
    
    return {
      user: data.user,
      session: data.session
    };
  } catch (error) {
    console.error('Error signing up:', error);
    return {
      user: null,
      session: null,
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
};

export const signOut = async (): Promise<{ error: Error | null }> => {
  try {
    const supabase = await getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return {
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
};

export const getCurrentUser = async (): Promise<{ user: User | null }> => {
  try {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    
    return { user: data.user };
  } catch (error) {
    console.error('Error getting current user:', error);
    return { user: null };
  }
};

export const getSession = async (): Promise<{ session: Session | null }> => {
  try {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    
    return { session: data.session };
  } catch (error) {
    console.error('Error getting session:', error);
    return { session: null };
  }
};

// Custom utility for initializing Supabase
export const initSupabase = async () => {
  await initializeSupabase();
  return await getSupabaseClient();
};

export default getSupabaseClient;