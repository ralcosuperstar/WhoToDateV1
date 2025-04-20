import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

function AuthStatusTest() {
  const { user, session, isLoading, isInitialized, error, signOut } = useAuth();

  const formattedUser = user ? {
    id: user.id,
    email: user.email,
    isEmailVerified: user.email_confirmed_at !== null,
    lastSignIn: user.last_sign_in_at,
    createdAt: user.created_at,
  } : null;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Authentication Status</CardTitle>
        <CardDescription>
          Details about the current authentication state
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 border rounded-md">
            <h3 className="text-sm font-medium mb-1">Initialization Status</h3>
            <div className="flex items-center text-sm">
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <span className={`h-3 w-3 rounded-full mr-2 ${isInitialized ? 'bg-green-500' : 'bg-red-500'}`} />
              )}
              {isLoading ? 'Loading...' : (isInitialized ? 'Initialized' : 'Not Initialized')}
            </div>
          </div>

          <div className="p-4 border rounded-md">
            <h3 className="text-sm font-medium mb-1">Authentication Status</h3>
            <div className="flex items-center text-sm">
              <span className={`h-3 w-3 rounded-full mr-2 ${user ? 'bg-green-500' : 'bg-red-500'}`} />
              {user ? 'Authenticated' : 'Not Authenticated'}
            </div>
          </div>

          {user && (
            <div className="p-4 border rounded-md">
              <h3 className="text-sm font-medium mb-2">User Information</h3>
              <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                {JSON.stringify(formattedUser, null, 2)}
              </pre>
            </div>
          )}

          {session && (
            <div className="p-4 border rounded-md">
              <h3 className="text-sm font-medium mb-2">Session Information</h3>
              <div className="text-xs">
                <p>Session Expires: {new Date(session.expires_at! * 1000).toLocaleString()}</p>
                <p>Access Token: {session.access_token.substring(0, 10)}...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {user ? (
          <Button onClick={() => signOut()} variant="outline">
            Sign Out
          </Button>
        ) : (
          <Button onClick={() => window.location.href = '/auth'} variant="default">
            Sign In
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export { AuthStatusTest };
export default AuthStatusTest;