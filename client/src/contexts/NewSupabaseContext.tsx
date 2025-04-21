import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import supabaseService, { authService, userService } from '@/services/supabaseService';
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
export const SupabaseContext = createContext<SupabaseContextType>({
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

// Create the provider component
export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  // Initialize and fetch the current user/session
  useEffect(() => {
    let unsubscribe: any = null;
    let initialized = false;
    
    async function initialize() {
      // Only allow initialization once
      if (initialized) return;
      initialized = true;
      
      setIsLoading(true);
      try {
        console.log('Initializing Supabase context...');
        
        // Use the existing client from the singleton pattern
        const client = await authService.getClient();
        
        if (!client) {
          throw new Error('Failed to initialize Supabase client');
        }
        
        console.log('Supabase client initialized successfully');
        
        // Set up the auth state change listener first before checking the current session
        // This ensures we don't miss any auth state changes that happen during initialization
        const { data: authListener } = client.auth.onAuthStateChange(
          async (event, newSession) => {
            console.log("Auth state changed:", event);
            
            // Important: Don't set loading to false yet, wait until we process the event
            
            // INITIAL_SESSION event is triggered when the page loads
            if (event === 'INITIAL_SESSION') {
              if (newSession?.user) {
                console.log('User authenticated:', newSession.user.id);
                setSession(newSession);
                setUser(newSession.user);
                
                // Ensure user exists in database
                try {
                  const { error } = await userService.ensureUserExists(newSession.user);
                  if (error) {
                    console.error('Error ensuring user exists:', error);
                  }
                } catch (userError) {
                  console.error('Exception ensuring user exists:', userError);
                }
              } else {
                console.log('No authenticated user in INITIAL_SESSION');
                setUser(null);
                setSession(null);
              }
            } 
            // User just signed in
            else if (event === 'SIGNED_IN') {
              if (newSession?.user) {
                console.log('User signed in:', newSession.user.id);
                setSession(newSession);
                setUser(newSession.user);
                
                // Ensure user exists in database
                try {
                  await userService.ensureUserExists(newSession.user);
                } catch (error) {
                  console.error('Error ensuring user exists after sign in:', error);
                }
              }
            } 
            // User signed out
            else if (event === 'SIGNED_OUT') {
              console.log('User signed out');
              setUser(null);
              setSession(null);
            }
            
            // Finally, always set loading to false after processing the event
            setIsLoading(false);
          }
        );
        
        unsubscribe = authListener.subscription;
        
        // Get current session - this will trigger the INITIAL_SESSION event
        // through the listener we just set up
        const { data } = await client.auth.getSession();
        
        // If the auth listener doesn't fire for some reason, ensure we're not stuck in loading state
        // by setting a timeout
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        
      } catch (error) {
        console.error('Error initializing Supabase context:', error);
        toast({
          title: 'Authentication Error',
          description: 'There was a problem connecting to the authentication service.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    }
    
    initialize();
    
    // Clean up subscription
    return () => {
      if (unsubscribe) {
        unsubscribe.unsubscribe();
      }
    };
  }, [toast]);

  // Function to refresh the user data
  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser || null);
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  // Function to get user profile from database
  const getUserProfile = async () => {
    if (!user) return { profile: null, error: new Error('No authenticated user') };
    return await userService.getUserById(user.id);
  };

  // Function to update user profile
  const updateUserProfile = async (data: any) => {
    if (!user) return { profile: null, error: new Error('No authenticated user') };
    return await userService.updateUserProfile(user.id, data);
  };

  // Define the value for the context
  const value: SupabaseContextType = {
    isLoading,
    user,
    session,
    signIn: authService.signIn,
    signUp: authService.signUp,
    signOut: async () => {
      try {
        console.log("Context: Attempting to sign out");
        // First clear local state immediately to give immediate feedback
        setUser(null);
        setSession(null);
        
        // Then actually sign out from Supabase
        const result = await authService.signOut();
        
        console.log("Context: Sign out complete, result:", result);
        
        // Force a browser refresh of auth state by clearing any tokens/cache
        localStorage.removeItem("supabase.auth.token");
        localStorage.removeItem("supabase.auth.expires_at");
        
        // Clear any session cookies by setting to expired
        document.cookie = "sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        return result;
      } catch (error) {
        console.error("Context: Error during sign out:", error);
        // Still reset the local state even if there was an API error
        setUser(null);
        setSession(null);
        return { error };
      }
    },
    resetPassword: authService.resetPassword,
    updatePassword: authService.updatePassword,
    refreshUser,
    getUserProfile,
    updateUserProfile,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

// Create a custom hook to use the Supabase context
export function useSupabase() {
  return useContext(SupabaseContext);
}