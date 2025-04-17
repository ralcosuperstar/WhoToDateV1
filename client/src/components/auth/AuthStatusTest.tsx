import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';

export function AuthStatusTest() {
  const [isLoading, setIsLoading] = useState(true);
  const [supabaseUser, setSupabaseUser] = useState<any>(null);
  const [serverUser, setServerUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      setIsLoading(true);
      setError(null);
      
      try {
        // Check Supabase auth status
        const supabase = getSupabaseClient();
        const { data: { user } } = await supabase.auth.getUser();
        setSupabaseUser(user);
        
        // Check server session status
        const response = await fetch('/api/user', {
          credentials: 'include' // Important for cookies
        });
        
        if (response.ok) {
          const userData = await response.json();
          setServerUser(userData);
        } else if (response.status !== 401) {
          // Only treat as error if it's not a 401 (which is expected if not logged in)
          const errorText = await response.text();
          setError(`Server error: ${response.status} - ${errorText}`);
        }
      } catch (e) {
        setError(`Error checking auth: ${e instanceof Error ? e.message : String(e)}`);
      } finally {
        setIsLoading(false);
      }
    }
    
    checkAuth();
  }, []);
  
  const handleSync = async () => {
    if (!supabaseUser) {
      setError('No Supabase user logged in to sync');
      return;
    }
    
    setIsLoading(true);
    try {
      // Call our sync endpoint
      const response = await fetch('/api/supabase-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: supabaseUser.email,
          user_id: supabaseUser.id
        }),
        credentials: 'include' // Important for cookies
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
      
      const syncedUser = await response.json();
      setServerUser(syncedUser);
      
      // Refresh server status
      const userResponse = await fetch('/api/user', {
        credentials: 'include'
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setServerUser(userData);
      }
    } catch (e) {
      setError(`Error syncing: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Authentication Status</CardTitle>
        <CardDescription>Check if you're authenticated with both Supabase and the server</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center my-4">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Supabase Auth:</h3>
              <div className="bg-slate-100 p-3 rounded-md mt-2">
                {supabaseUser ? (
                  <pre className="text-xs overflow-auto">{JSON.stringify(supabaseUser, null, 2)}</pre>
                ) : (
                  <p className="text-sm text-muted-foreground">Not logged in with Supabase</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium">Server Session:</h3>
              <div className="bg-slate-100 p-3 rounded-md mt-2">
                {serverUser ? (
                  <pre className="text-xs overflow-auto">{JSON.stringify(serverUser, null, 2)}</pre>
                ) : (
                  <p className="text-sm text-muted-foreground">No active server session</p>
                )}
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-md">
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <div className="flex justify-between mt-4">
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
              >
                Refresh
              </Button>
              
              <Button
                onClick={handleSync}
                disabled={!supabaseUser || isLoading}
              >
                Sync with Server
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}