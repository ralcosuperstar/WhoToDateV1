import { useState, useEffect } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle, KeyRound } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabaseConfig';

export default function SupabaseConnectionTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<'signed-out' | 'signed-in'>('signed-out');
  const [user, setUser] = useState<any>(null);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');

  // Initialize Supabase client
  useEffect(() => {
    async function initSupabase() {
      try {
        setIsLoading(true);
        const client = await getSupabaseClient();
        setSupabase(client);
        
        // Check initial auth state
        const { data } = await client.auth.getSession();
        if (data.session) {
          setAuthStatus('signed-in');
          setUser(data.session.user);
        } else {
          setAuthStatus('signed-out');
          setUser(null);
        }
        
        // Set up auth listener
        const { data: authListener } = client.auth.onAuthStateChange((event, session) => {
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
      } catch (error) {
        console.error('Error initializing Supabase:', error);
        setErrorMessage('Failed to initialize Supabase client. Check console for details.');
        setConnectionStatus('error');
      } finally {
        setIsLoading(false);
      }
    }
    
    initSupabase();
  }, []);

  const testConnection = async () => {
    if (!supabase) {
      setErrorMessage('Supabase client not initialized');
      return;
    }
    
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
    if (!supabase) {
      setErrorMessage('Supabase client not initialized');
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      console.log('Sign in successful:', data);
      setConnectionStatus('success');
      setErrorMessage(null);
    } catch (error: any) {
      console.error('Sign in failed:', error);
      setErrorMessage(error.message || 'Sign in failed');
      setConnectionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    if (!supabase) {
      setErrorMessage('Supabase client not initialized');
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log('Sign out successful');
      setConnectionStatus('idle');
      setErrorMessage(null);
    } catch (error: any) {
      console.error('Sign out failed:', error);
      setErrorMessage(error.message || 'Sign out failed');
      setConnectionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Initializing...</CardTitle>
            <CardDescription>
              Setting up Supabase connection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
            {errorMessage && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
          <CardDescription>
            Test connection to Supabase services using server-provided API keys
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
            
            {user ? (
              <div className="bg-white p-3 rounded text-sm">
                <div className="font-medium">User ID: {user.id}</div>
                <div>Email: {user.email}</div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-white p-3 rounded text-sm">
                  <label className="block text-sm font-medium text-gray-700">Test Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  />
                </div>
                <div className="bg-white p-3 rounded text-sm">
                  <label className="block text-sm font-medium text-gray-700">Test Password</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  />
                </div>
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
        <p>Note: This test uses a Supabase client with API keys from the server environment.</p>
      </div>
    </div>
  );
}