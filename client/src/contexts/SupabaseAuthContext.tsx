import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getSupabaseClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface SupabaseAuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: Error }>;
  signup: (email: string, password: string, metadata?: Record<string, any>) => Promise<{ success: boolean; error?: Error }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: Error }>;
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined);

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        setIsLoading(true);
        const supabase = await getSupabaseClient();
        
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          console.log('User authenticated:', session.user.id);
        }
        
        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log('Auth state changed:', event);
            setUser(session?.user || null);
            
            if (event === 'SIGNED_IN') {
              toast({
                title: 'Signed in successfully',
                description: 'Welcome back!',
              });
            } else if (event === 'SIGNED_OUT') {
              toast({
                title: 'Signed out successfully',
                description: 'You have been logged out.',
              });
            }
          }
        );
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error('Error checking auth session:', err);
        setError(err instanceof Error ? err : new Error('Unknown authentication error'));
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, [toast]);
  
  // Login with email and password
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: Error }> => {
    try {
      setIsLoading(true);
      const supabase = await getSupabaseClient();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      setUser(data.user);
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      const error = err instanceof Error ? err : new Error('Login failed');
      setError(error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register a new user
  const signup = async (email: string, password: string, metadata?: Record<string, any>): Promise<{ success: boolean; error?: Error }> => {
    try {
      setIsLoading(true);
      const supabase = await getSupabaseClient();
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      
      if (error) throw error;
      
      // User might need to verify email
      if (data.user && !data.user.confirmed_at) {
        toast({
          title: 'Verification email sent',
          description: 'Please check your email to complete registration.',
        });
      } else {
        setUser(data.user);
      }
      
      return { success: true };
    } catch (err) {
      console.error('Signup error:', err);
      const error = err instanceof Error ? err : new Error('Registration failed');
      setError(error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout the user
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const supabase = await getSupabaseClient();
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError(err instanceof Error ? err : new Error('Logout failed'));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset password
  const resetPassword = async (email: string): Promise<{ success: boolean; error?: Error }> => {
    try {
      setIsLoading(true);
      const supabase = await getSupabaseClient();
      
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      
      toast({
        title: 'Reset email sent',
        description: 'Check your email for the password reset link.',
      });
      
      return { success: true };
    } catch (err) {
      console.error('Password reset error:', err);
      const error = err instanceof Error ? err : new Error('Password reset failed');
      setError(error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };
  
  const value = {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    resetPassword,
  };
  
  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

// Hook to use the auth context
export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext);
  
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  
  return context;
}