import { useEffect, useState } from 'react';
import { useSupabase } from '@/contexts/SupabaseContext';
import { SupabaseLogoutButton } from '@/components/auth/SupabaseAuth';
import { SimpleAuthUI } from '@/components/auth/SimpleAuthUI';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

export default function SupabaseTest() {
  const { user, isLoading } = useSupabase();
  const [activeTab, setActiveTab] = useState('login');

  // Switch to register tab if we're coming from a register link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('tab') === 'register') {
      setActiveTab('register');
    }
  }, []);

  return (
    <div className="container max-w-md mx-auto py-24">
      <h1 className="text-2xl font-bold mb-6 text-center">Supabase Authentication Test</h1>
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Status</CardTitle>
            <CardDescription>Your current login status</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading authentication status...</p>
            ) : user ? (
              <div>
                <p className="mb-2">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="mb-2">
                  <span className="font-medium">User ID:</span> {user.id}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Created At:</span> {new Date(user.created_at).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-4">You are currently logged in</p>
              </div>
            ) : (
              <p>You are not logged in</p>
            )}
          </CardContent>
          {user && (
            <CardFooter>
              <SupabaseLogoutButton />
            </CardFooter>
          )}
        </Card>
      </div>
      
      {!user && (
        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>Sign in or create a new account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="mt-4">
                <SimpleAuthUI />
              </TabsContent>
              <TabsContent value="register" className="mt-4">
                <SimpleAuthUI />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is a test page for Supabase authentication. Your data is stored securely.
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}