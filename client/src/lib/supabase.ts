import { createClient } from '@supabase/supabase-js';

// Function to get Supabase configuration from the server
async function getSupabaseConfig() {
  // Try to get from localStorage first to avoid unnecessary API calls
  const cachedConfig = localStorage.getItem('supabaseConfig');
  if (cachedConfig) {
    try {
      return JSON.parse(cachedConfig);
    } catch (e) {
      console.error('Failed to parse cached supabase config:', e);
    }
  }
  
  // Fetch from API endpoint if not in localStorage
  try {
    const response = await fetch('/api/supabase-config');
    if (!response.ok) {
      throw new Error('Failed to get Supabase configuration');
    }
    
    const config = await response.json();
    
    // Cache the config in localStorage
    localStorage.setItem('supabaseConfig', JSON.stringify(config));
    
    return config;
  } catch (e) {
    console.error('Error fetching Supabase config:', e);
    // Fallback to environment variables if available (might work in development)
    return {
      supabaseUrl: '',
      supabaseAnonKey: '',
    };
  }
}

// Initialize Supabase with credentials (will be initialized properly in initSupabase)
let supabase = createClient('', '');

// Initialize Supabase with actual credentials
export async function initSupabase() {
  try {
    const { supabaseUrl, supabaseAnonKey } = await getSupabaseConfig();
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase credentials not available');
    }
    
    // Create the actual client
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client initialized successfully');
    return true;
  } catch (e) {
    console.error('Failed to initialize Supabase client:', e);
    return false;
  }
}

// Export the client
export { supabase };

// Helper functions for authentication
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

// Helper function to get user session
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
};