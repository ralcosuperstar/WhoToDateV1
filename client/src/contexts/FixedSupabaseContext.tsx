import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import directSupabaseService from '@/services/directSupabaseService';
import { useToast } from '@/hooks/use-toast';

// Define the context types
interface SupabaseContextType {
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userData?: any) => Promise<any>;
  signOut: () => Promise<any>;
  verifyOtp: (email: string, token: string) => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  updatePassword: (password: string) => Promise<any>;
  refreshUser: () => Promise<void>;
  getUserProfile: () => Promise<any>;
  updateUserProfile: (data: any) => Promise<any>;
}

// Create the context with default values
export const FixedSupabaseContext = createContext<SupabaseContextType>({
  isLoading: true,
  user: null,
  session: null,
  signIn: () => Promise.resolve({}),
  signUp: () => Promise.resolve({}),
  signOut: () => Promise.resolve({}),
  verifyOtp: () => Promise.resolve({}),
  resetPassword: () => Promise.resolve({}),
  updatePassword: () => Promise.resolve({}),
  refreshUser: () => Promise.resolve(),
  getUserProfile: () => Promise.resolve({}),
  updateUserProfile: () => Promise.resolve({}),
});

// Create the provider component
export function FixedSupabaseProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [supabase, setSupabase] = useState<any>(null);
  const { toast } = useToast();
  
  // Initialize the Supabase client when the component mounts
  useEffect(() => {
    const initSupabase = async () => {
      try {
        // Use our supabaseConfig helper to get credentials from server
        const { getSupabaseClient } = await import('@/lib/supabaseConfig');
        const client = await getSupabaseClient();
        setSupabase(client);
        console.log('Fixed Context: Supabase client initialized successfully from server config');
      } catch (error) {
        console.error('Error initializing Supabase client in FixedSupabaseContext:', error);
        toast({
          title: 'Authentication Error',
          description: 'Failed to initialize authentication. Please try refreshing the page.',
          variant: 'destructive',
        });
      }
    };
    
    initSupabase();
  }, []);

  // Initial auth check - only run when supabase client is available
  useEffect(() => {
    // Skip if no supabase client is available yet
    if (!supabase) return;
    
    let mounted = true;
    
    const checkAuthStatus = async () => {
      try {
        console.log('Fixed Context: Checking auth status...');
        
        // Get current session
        const { data } = await supabase.auth.getSession();
        if (mounted) {
          if (data?.session) {
            setSession(data.session);
            setUser(data.session.user);
            console.log('Fixed Context: User authenticated:', data.session.user.id);
          } else {
            console.log('Fixed Context: No authenticated user');
            setSession(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Fixed Context: Error checking auth status:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    
    // Set up auth state change listener
    let authListener: { subscription: { unsubscribe: () => void } } | null = null;
    
    try {
      const listener = supabase.auth.onAuthStateChange((event: AuthChangeEvent, newSession: Session | null) => {
        console.log('Fixed Context: Auth state changed:', event);
        
        if (mounted) {
          if (newSession) {
            setSession(newSession);
            setUser(newSession.user);
            console.log('Fixed Context: User updated:', newSession.user.id);
          } else {
            setSession(null);
            setUser(null);
            console.log('Fixed Context: User cleared');
          }
        }
      });
      
      authListener = listener;
    } catch (error) {
      console.error('Failed to set up auth listener:', error);
    }
    
    // Run the initial auth check
    checkAuthStatus();
    
    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (mounted && isLoading) {
        console.log('Fixed Context: Loading timeout reached');
        setIsLoading(false);
      }
    }, 3000);
    
    // Cleanup
    return () => {
      mounted = false;
      clearTimeout(timeout);
      if (authListener && authListener.subscription && typeof authListener.subscription.unsubscribe === 'function') {
        try {
          authListener.subscription.unsubscribe();
        } catch (e) {
          console.error('Error unsubscribing from auth listener:', e);
        }
      }
    };
  }, [supabase]); // Re-run when supabase client changes

  // Function to refresh the user data
  const refreshUser = async () => {
    if (!supabase) return;
    
    try {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  // Function to get user profile from database
  const getUserProfile = async () => {
    if (!user) return { user: null, error: new Error('No authenticated user') };
    
    try {
      return await directSupabaseService.user.getUserById(user.id);
    } catch (error) {
      console.error('Error getting user profile:', error);
      return { user: null, error };
    }
  };

  // Function to update user profile
  const updateUserProfile = async (data: any) => {
    if (!user) return { user: null, error: new Error('No authenticated user') };
    
    try {
      return await directSupabaseService.user.updateUserProfile(user.id, data);
    } catch (error) {
      console.error('Error updating user profile:', error);
      return { user: null, error };
    }
  };

  // Simplified sign out function
  const handleSignOut = async () => {
    // Clear local state immediately - this happens whether Supabase is ready or not
    setUser(null);
    setSession(null);
    
    // Clear browser storage and cookies
    localStorage.removeItem("supabase.auth.token");
    localStorage.removeItem("supabase.auth.expires_at");
    document.cookie = "sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
    // Only attempt Supabase signOut if the client is available
    if (supabase) {
      try {
        // Sign out from Supabase
        const { error } = await supabase.auth.signOut();
        return { error };
      } catch (error) {
        console.error('Error signing out from Supabase:', error);
        return { error };
      }
    } else {
      console.log('No Supabase client available for signOut, but local state cleared');
      return { error: null };
    }
  };

  // Define the value for the context
  const value: SupabaseContextType = {
    isLoading,
    user,
    session,
    signIn: directSupabaseService.auth.signIn,
    signUp: directSupabaseService.auth.signUp,
    signOut: handleSignOut,
    verifyOtp: directSupabaseService.auth.verifyOtp,
    resetPassword: directSupabaseService.auth.resetPassword,
    updatePassword: directSupabaseService.auth.updatePassword,
    refreshUser,
    getUserProfile,
    updateUserProfile,
  };

  return (
    <FixedSupabaseContext.Provider value={value}>
      {children}
    </FixedSupabaseContext.Provider>
  );
}

// Create a custom hook to use the Supabase context
export function useFixedSupabase() {
  return useContext(FixedSupabaseContext);
}