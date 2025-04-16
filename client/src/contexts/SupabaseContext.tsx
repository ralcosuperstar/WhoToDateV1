import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, initSupabase, signIn, signOut, signUp, getCurrentUser } from '@/lib/supabase';

// Define the context types
interface SupabaseContextType {
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  refreshUser: () => Promise<void>;
}

// Create the context with default values
const SupabaseContext = createContext<SupabaseContextType>({
  isLoading: true,
  user: null,
  session: null,
  signIn: () => Promise.resolve({}),
  signUp: () => Promise.resolve({}),
  signOut: () => Promise.resolve({}),
  refreshUser: () => Promise.resolve(),
});

// Create the provider component
export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  // Initialize Supabase and fetch the current user/session
  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;
    
    async function initialize() {
      setIsLoading(true);
      try {
        // Initialize the supabase client
        const client = await initSupabase();
        
        // Get the current session
        const { data: { session: currentSession } } = await client.auth.getSession();
        setSession(currentSession);
        
        // Get the current user
        if (currentSession) {
          const { data: { user: currentUser } } = await client.auth.getUser();
          setUser(currentUser);
        }
        
        // Subscribe to auth changes
        const { data: authSubscription } = client.auth.onAuthStateChange(
          (event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);
          }
        );
        
        subscription = authSubscription.subscription;
      } catch (error) {
        console.error('Error initializing Supabase:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    initialize();
    
    // Clean up subscription
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Function to refresh the user data
  const refreshUser = async () => {
    try {
      const { user: currentUser } = await getCurrentUser();
      setUser(currentUser || null);
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  // Define the value for the context
  const value: SupabaseContextType = {
    isLoading,
    user,
    session,
    signIn: (email, password) => signIn(email, password),
    signUp: (email, password) => signUp(email, password),
    signOut: async () => {
      const result = await signOut();
      if (!result.error) {
        setUser(null);
        setSession(null);
      }
      return result;
    },
    refreshUser,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

// Create a custom hook to use the Supabase context
export const useSupabase = () => useContext(SupabaseContext);