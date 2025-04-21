import { useState } from 'react';
import { SimpleAuthProvider, useSimpleAuth } from '@/contexts/SimpleAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

function AuthTest() {
  const { user, signIn, signOut, isLoading } = useSimpleAuth();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSignIn = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      await signIn(email, password);
      setSuccessMessage('Signed in successfully!');
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to sign in');
    }
  };

  const handleSignOut = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      await signOut();
      setSuccessMessage('Signed out successfully!');
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to sign out');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Simple Auth Test</CardTitle>
          <CardDescription>Test the SimpleAuthContext component</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {successMessage && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-600">Success</AlertTitle>
              <AlertDescription className="text-green-600">{successMessage}</AlertDescription>
            </Alert>
          )}

          {user ? (
            <div className="bg-gray-100 p-4 rounded-lg space-y-2">
              <p className="font-medium">Signed in as:</p>
              <div className="bg-white p-3 rounded text-sm">
                <p><strong>User ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>First Name:</strong> {user.user_metadata?.first_name || 'N/A'}</p>
                <p><strong>Last Name:</strong> {user.user_metadata?.last_name || 'N/A'}</p>
                <p><strong>Phone:</strong> {user.user_metadata?.phone_number || 'N/A'}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {user ? (
            <Button 
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={handleSignOut}
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
          ) : (
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default function SimpleAuthTestPage() {
  return (
    <SimpleAuthProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center my-8">
            <h1 className="text-3xl font-bold">Simple Auth Component Test</h1>
            <p className="text-gray-500 mt-2">
              Testing independent Supabase authentication with a direct client instance
            </p>
          </div>
          
          <AuthTest />
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">How This Works</h2>
            <p className="mb-4">
              This page tests a standalone authentication implementation that uses a direct Supabase client instance to avoid conflicts with multiple client instances.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The <code>SimpleAuthContext</code> creates its own Supabase client</li>
              <li>This client is completely separate from other instances in the app</li>
              <li>Session state is tracked independently from other auth contexts</li>
              <li>This approach helps isolate and debug authentication issues</li>
            </ul>
          </div>
        </div>
      </div>
    </SimpleAuthProvider>
  );
}