import { createClient } from '@supabase/supabase-js';

// These keys are public and safe to include in client code
// They match what's already in your environment variables
const supabaseUrl = 'https://truulijpablpqxipindo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRydXVsaWpwYWJscHF4aXBpbmRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MDE2NTEsImV4cCI6MjA1ODk3NzY1MX0.8A2H_2V_3Y3DfkN_M-SkClQgRQYh1TkMK5tG9fH_-3w';

// Create a single instance of the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export a simple function to check authentication status
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Simple function to get the current session
export async function getCurrentSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error) {
    console.error('Error getting current session:', error);
    return null;
  }
}

// Simple function to sign in
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return { user: data.user, session: data.session };
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

// Simple function to sign up
export async function signUp(email: string, password: string, userData?: any) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: userData }
    });
    if (error) throw error;
    return { user: data.user, session: data.session };
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

// Simple function to verify OTP
export async function verifyOtp(email: string, token: string) {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup'
    });
    if (error) throw error;
    return { user: data.user, session: data.session };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
}

// Simple function to sign out
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
}