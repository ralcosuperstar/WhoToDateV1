import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle, KeyRound } from 'lucide-react';

// Create a direct, standalone Supabase client for testing
const supabaseUrl = 'https://truulijpablpqxipindo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRydXVsaWpwYWJscHF4aXBpbmRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MDE2NTEsImV4cCI6MjA1ODk3NzY1MX0.8A2H_2V_3Y3DfkN_M-SkClQgRQYh1TkMK5tG9fH_-3w';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SupabaseConnectionTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<'signed-out' | 'signed-in'>('signed-out');
  const [user, setUser] = useState<any>(null);

  // Check initial auth state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setAuthStatus('signed-in');
          setUser(data.session.user);
        } else {
          setAuthStatus('signed-out');
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuth();

    // Set up auth listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      if (session) {
        setAuthStatus('signed-in');
        setUser(session.user);
      } else {
        setAuthStatus('signed-out');
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const testConnection = async () => {
    setIsLoading(true);
    setConnectionStatus('idle');
    setErrorMessage(null);

    try {
      // Simple query to test database connection
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .limit(1);

      if (error) throw error;
      
      console.log('Connection test successful:', data);
      setConnectionStatus('success');
    } catch (error: any) {
      console.error('Connection test failed:', error);
      setConnectionStatus('error');
      setErrorMessage(error.message || 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    setIsLoading(true);
    try {
      // Sign in with test credentials (these will be provided by user)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com', // Ask user to provide test credentials
        password: 'password123'     // Ask user to provide test credentials
      });

      if (error) throw error;
      
      console.log('Sign in successful:', data);
    } catch (error: any) {
      console.error('Sign in failed:', error);
      setErrorMessage(error.message || 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log('Sign out successful');
    } catch (error: any) {
      console.error('Sign out failed:', error);
      setErrorMessage(error.message || 'Sign out failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
          <CardDescription>
            Test direct connection to Supabase services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectionStatus === 'success' && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-600">Connection Successful</AlertTitle>
              <AlertDescription className="text-green-600">
                Successfully connected to Supabase database.
              </AlertDescription>
            </Alert>
          )}
          
          {connectionStatus === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection Failed</AlertTitle>
              <AlertDescription>
                {errorMessage || 'An error occurred while connecting to Supabase.'}
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-gray-100 p-4 rounded-lg space-y-2">
            <div className="flex items-center">
              <KeyRound className="mr-2 h-4 w-4 text-gray-500" />
              <div className="font-medium">Auth Status:</div>
              <div className="ml-2 font-medium">
                {authStatus === 'signed-in' ? (
                  <span className="text-green-600">Signed In</span>
                ) : (
                  <span className="text-gray-600">Signed Out</span>
                )}
              </div>
            </div>
            
            {user && (
              <div className="bg-white p-3 rounded text-sm">
                <div className="font-medium">User ID: {user.id}</div>
                <div>Email: {user.email}</div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            onClick={testConnection}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Connection...
              </>
            ) : (
              'Test Database Connection'
            )}
          </Button>
          
          {authStatus === 'signed-out' ? (
            <Button 
              className="w-full bg-green-600 hover:bg-green-700" 
              onClick={signIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Test Sign In'
              )}
            </Button>
          ) : (
            <Button 
              className="w-full bg-red-600 hover:bg-red-700" 
              onClick={signOut}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing Out...
                </>
              ) : (
                'Sign Out'
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Note: This test uses a direct Supabase client with no dependencies on any context providers.</p>
      </div>
    </div>
  );
}