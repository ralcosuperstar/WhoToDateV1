import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient, Session, User, SupabaseClient } from '@supabase/supabase-js';

// Create a direct, standalone Supabase client
const supabaseUrl = 'https://truulijpablpqxipindo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRydXVsaWpwYWJscHF4aXBpbmRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MDE2NTEsImV4cCI6MjA1ODk3NzY1MX0.8A2H_2V_3Y3DfkN_M-SkClQgRQYh1TkMK5tG9fH_-3w';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define the auth context type
interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userData?: any) => Promise<any>;
  signOut: () => Promise<any>;
  verifyOtp: (email: string, token: string) => Promise<any>;
  ensureProfile: () => Promise<any>;
  supabase: SupabaseClient;
}

// Create the context
const SimpleAuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function SimpleAuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  // Initialize auth state on component mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true);
        console.log('SimpleAuthProvider: Initializing auth state...');
        
        // Get session from supabase
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('SimpleAuthProvider: Error getting session:', error);
          throw error;
        }
        
        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
          console.log('SimpleAuthProvider: User is authenticated');
        } else {
          setSession(null);
          setUser(null);
          console.log('SimpleAuthProvider: No active session');
        }
      } catch (error) {
        console.error('SimpleAuthProvider: Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('SimpleAuthProvider: Auth state changed:', event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
      }
    );

    // Clean up listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    console.log('SimpleAuthProvider: Signing in...');
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      console.log('SimpleAuthProvider: Sign in successful');
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, userData?: any) => {
    console.log('SimpleAuthProvider: Signing up...');
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) throw error;
      
      console.log('SimpleAuthProvider: Sign up successful');
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    console.log('SimpleAuthProvider: Signing out...');
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log('SimpleAuthProvider: Sign out successful');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP function for email verification
  const verifyOtp = async (email: string, token: string) => {
    console.log('SimpleAuthProvider: Verifying OTP...');
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });

      if (error) throw error;
      
      console.log('SimpleAuthProvider: OTP verification successful');
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  // Ensure profile exists in database
  const ensureProfile = async () => {
    console.log('SimpleAuthProvider: Ensuring profile...');
    if (!user) return null;
    
    setIsLoading(true);
    try {
      // Check if profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 means no rows returned, other errors should be thrown
        throw fetchError;
      }

      if (!existingProfile) {
        // Create profile if it doesn't exist
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
            phone_number: user.user_metadata?.phone_number || '',
            created_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (insertError) throw insertError;
        
        console.log('SimpleAuthProvider: Profile created successfully');
        return newProfile;
      }
      
      console.log('SimpleAuthProvider: Profile already exists');
      return existingProfile;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    isLoading,
    user,
    session,
    signIn,
    signUp,
    signOut,
    verifyOtp,
    ensureProfile,
    supabase
  };

  return (
    <SimpleAuthContext.Provider value={value}>
      {children}
    </SimpleAuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useSimpleAuth() {
  const context = useContext(SimpleAuthContext);
  if (context === undefined) {
    throw new Error('useSimpleAuth must be used within a SimpleAuthProvider');
  }
  return context;
}