import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
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
  resetPassword: () => Promise.resolve({}),
  updatePassword: () => Promise.resolve({}),
  refreshUser: () => Promise.resolve(),
  getUserProfile: () => Promise.resolve({}),
  updateUserProfile: () => Promise.resolve({}),
});

// Get the supabase client directly
const supabase = directSupabaseService.auth.getClient();

// Create the provider component
export function FixedSupabaseProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  // Initial auth check
  useEffect(() => {
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
    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
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
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Function to refresh the user data
  const refreshUser = async () => {
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
    try {
      // Clear local state immediately
      setUser(null);
      setSession(null);
      
      // Then actually sign out from Supabase
      localStorage.removeItem("supabase.auth.token");
      localStorage.removeItem("supabase.auth.expires_at");
      document.cookie = "sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      console.error('Error signing out:', error);
      return { error };
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