import { createClient, User, Session } from '@supabase/supabase-js';

// Singleton instance of the Supabase client
let supabaseClient: ReturnType<typeof createClient> | null = null;
let isInitialized = false;

// For backward compatibility with existing code
export async function initSupabase() {
  return await getSupabaseClient();
}

// Hardcoded fallback values (these are public keys, safe to include)
const FALLBACK_SUPABASE_URL = "https://truulijpablpqxipindo.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRydXVsaWpwYWJscHF4aXBpbmRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyMDQwOTUsImV4cCI6MjAyODc4MDA5NX0.rWwxEbdjr6O0Xs6aBUQV5h3K0gWKZW1K1GPyv-UGxzs";

// This function fetches the config from the server
export async function getSupabaseConfig() {
  try {
    const res = await fetch('/api/supabase-config');
    if (!res.ok) {
      throw new Error(`Failed to fetch Supabase config: ${res.status}`);
    }
    
    const config = await res.json();
    
    if (config.initialized && config.url && config.anonKey) {
      return { url: config.url, anonKey: config.anonKey };
    } else {
      throw new Error('Supabase config not initialized');
    }
  } catch (error) {
    console.warn('Failed to get Supabase config from API, using fallback values');
    return { url: FALLBACK_SUPABASE_URL, anonKey: FALLBACK_SUPABASE_ANON_KEY };
  }
}

// Initialize and get the Supabase client (singleton pattern)
export async function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient;
  }
  
  try {
    const { url, anonKey } = await getSupabaseConfig();
    
    supabaseClient = createClient(url, anonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    });
    
    isInitialized = true;
    console.log('Supabase client initialized successfully');
    return supabaseClient;
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    throw error;
  }
}

// Check if Supabase is initialized
export function isSupabaseInitialized() {
  return isInitialized;
}

// Helper function to get the current user
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting current user:', error);
    return null;
  }
  return data.user;
}

// Helper function to get the current session
export async function getSession(): Promise<Session | null> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  return data.session;
}

// Helper function to sign in with email and password
export async function signIn(email: string, password: string) {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('Error signing in:', error);
    return { user: null, session: null, error };
  }

  return { user: data.user, session: data.session, error: null };
}

// Helper function to sign up with email and password
export async function signUp(email: string, password: string, userData?: any) {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
      emailRedirectTo: `${window.location.origin}/auth?verification=success`
    }
  });

  if (error) {
    console.error('Error signing up:', error);
    return { user: null, session: null, error };
  }

  return { user: data.user, session: data.session, error: null };
}

// Helper function to sign out
export async function signOut() {
  const supabase = await getSupabaseClient();
  const { error } = await supabase.auth.signOut();
  return { error };
}