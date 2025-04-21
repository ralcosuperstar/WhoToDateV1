import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Cache for the Supabase configuration and client instance
let supabaseConfig: { url: string; anonKey: string } | null = null;
let supabaseInstance: SupabaseClient | null = null;

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
 */
export async function getSupabaseClient(): Promise<SupabaseClient> {
  if (supabaseInstance) {
    return supabaseInstance;
  }
  
  try {
    const config = await fetchSupabaseConfig();
    
    console.log('Creating Supabase client with config from API');
    supabaseInstance = createClient(config.url, config.anonKey);
    
    return supabaseInstance;
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    throw error;
  }
}

/**
 * Creates a new Supabase client instance (for cases where you need a fresh instance)
 */
export async function createFreshSupabaseClient(): Promise<SupabaseClient> {
  try {
    const config = await fetchSupabaseConfig();
    return createClient(config.url, config.anonKey);
  } catch (error) {
    console.error('Error creating fresh Supabase client:', error);
    throw error;
  }
}