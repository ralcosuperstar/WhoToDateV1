import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabaseClient, signIn, signOut, signUp, getCurrentUser, getSession } from '@/lib/supabase';
import { ensureUserExists } from '@/lib/supabaseUtils';

// Define the context types
interface SupabaseContextType {
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  supabase: any | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  refreshUser: () => Promise<void>;
}

// Create the context with default values
export const SupabaseContext = createContext<SupabaseContextType>({
  isLoading: true,
  user: null,
  session: null,
  supabase: null,
  signIn: () => Promise.resolve({}),
  signUp: () => Promise.resolve({}),
  signOut: () => Promise.resolve({}),
  refreshUser: () => Promise.resolve(),
});

// Create the provider component
export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [supabaseClient, setSupabaseClient] = useState<any>(null);

  // Initialize Supabase and fetch the current user/session
  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;
    
    async function initialize() {
      setIsLoading(true);
      try {
        // Initialize the supabase client
        const client = await getSupabaseClient();
        setSupabaseClient(client);
        
        // Get the current session
        const sessionData = await getSession();
        setSession(sessionData);
        
        // Get the current user
        if (sessionData) {
          const userData = await getCurrentUser();
          setUser(userData);
        }
        
        // Subscribe to auth changes
        const { data: authSubscription } = client.auth.onAuthStateChange(
          async (event, newSession) => {
            console.log("Auth state changed in context:", event);
            setSession(newSession);
            setUser(newSession?.user ?? null);
            
            // Sync with the server when a user signs in or is updated
            if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && newSession?.user) {
              try {
                // First, ensure the user exists in the public.users table
                await ensureUserExists(newSession.user);
                
                // Then sync with our server
                console.log("Syncing session with server after", event);
                try {
                  const response = await fetch('/api/supabase-sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email: newSession.user.email,
                      user_id: newSession.user.id
                    }),
                    credentials: 'include' // Important for cookies
                  });
                  
                  if (!response.ok) {
                    const text = await response.text();
                    console.error("Failed to sync with server from context:", text);
                  } else {
                    console.log("Successfully synced with server from context");
                  }
                } catch (error) {
                  console.error("Error during server sync:", error);
                  // Continue authentication process even if server sync fails
                }
              } catch (syncError) {
                console.error("Error syncing with server from context:", syncError);
              }
            }
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
      const currentUser = await getCurrentUser();
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
    supabase: supabaseClient,
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
}

// Create a custom hook to use the Supabase context
export function useSupabase() {
  return useContext(SupabaseContext);
}