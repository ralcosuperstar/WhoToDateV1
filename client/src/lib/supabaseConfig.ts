import { createClient, SupabaseClient } from '@supabase/supabase-js';

// GLOBAL SINGLETON: Define a truly global singleton for the Supabase client
// This is required to prevent "Multiple GoTrueClient instances" warning
declare global {
  interface Window {
    __SUPABASE_SINGLETON_CLIENT?: SupabaseClient;
  }
}

// Cache for the Supabase configuration
let supabaseConfig: { url: string; anonKey: string } | null = null;

/**
 * Fetches Supabase configuration from the server
 */
export async function fetchSupabaseConfig(): Promise<{ url: string; anonKey: string }> {
  if (supabaseConfig) {
    return supabaseConfig;
  }
  
  try {
    const response = await fetch('/api/supabase-config');
    if (!response.ok) {
      throw new Error('Failed to fetch Supabase config');
    }
    
    const data = await response.json();
    supabaseConfig = {
      url: data.url,
      anonKey: data.anonKey
    };
    
    return supabaseConfig;
  } catch (error) {
    console.error('Error fetching Supabase config:', error);
    throw error;
  }
}

/**
 * Gets a Supabase client instance using the configuration from the server
 * This implementation ensures there is truly only ONE client instance 
 * in the entire application by storing it in the global window object.
 */
export async function getSupabaseClient(): Promise<SupabaseClient> {
  // First check if we already have a client instance in the global scope
  if (typeof window !== 'undefined' && window.__SUPABASE_SINGLETON_CLIENT) {
    return window.__SUPABASE_SINGLETON_CLIENT;
  }
  
  try {
    const config = await fetchSupabaseConfig();
    
    console.log('Creating Supabase client with config from API');
    const newClient = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true, // Enable session persistence
        storageKey: 'supabase.auth.token' // Use consistent storage key
      }
    });
    
    // Store the client in the global scope to ensure it's truly a singleton
    if (typeof window !== 'undefined') {
      window.__SUPABASE_SINGLETON_CLIENT = newClient;
    }
    
    return newClient;
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    throw error;
  }
}

/**
 * This function is deprecated and only kept for backward compatibility.
 * Always use getSupabaseClient() instead.
 * @deprecated Use getSupabaseClient() instead
 */
export async function createFreshSupabaseClient(): Promise<SupabaseClient> {
  // Always returns the singleton instance
  return getSupabaseClient();
}