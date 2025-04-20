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
    
    async function initialize() {
      setIsLoading(true);
      try {
        // Get current session
        const sessionData = await authService.getSession();
        setSession(sessionData);
        
        // Get current user if session exists
        if (sessionData) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
          
          // Ensure user exists in database (or create if needed)
          if (userData) {
            const { error } = await userService.ensureUserExists(userData);
            if (error) {
              console.error('Error ensuring user exists:', error);
            }
          }
        }
        
        // Subscribe to auth changes
        const client = await authService.getClient();
        const { data: authListener } = client.auth.onAuthStateChange(
          async (event, newSession) => {
            console.log("Auth state changed:", event);
            setSession(newSession);
            
            if (newSession?.user) {
              setUser(newSession.user);
              
              // Ensure user exists in database when they sign in
              if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
                console.log('Ensuring user exists after auth change');
                try {
                  await userService.ensureUserExists(newSession.user);
                  // Direct Supabase approach - don't try to sync with Express server
                } catch (error) {
                  console.error('Error ensuring user exists after auth change:', error);
                }
              }
            } else {
              setUser(null);
            }
          }
        );
        
        unsubscribe = authListener.subscription;
      } catch (error) {
        console.error('Error initializing Supabase context:', error);
        toast({
          title: 'Authentication Error',
          description: 'There was a problem connecting to the authentication service.',
          variant: 'destructive',
        });
      } finally {
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
      const result = await authService.signOut();
      if (!result.error) {
        setUser(null);
        setSession(null);
      }
      return result;
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