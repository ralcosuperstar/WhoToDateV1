import { useEffect, useState } from 'react';
import { useSupabase } from '@/contexts/SupabaseContext';
import { SimpleAuthUI } from '@/components/auth/SimpleAuthUI';
import { SupabaseLogoutButton } from '@/components/auth/SupabaseAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

export default function SimpleAuthTest() {
  const { user, isLoading } = useSupabase();

  return (
    <div className="container max-w-md mx-auto py-24">
      <h1 className="text-2xl font-bold mb-6 text-center">Simple Auth UI Test</h1>
      
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
        <div>
          <SimpleAuthUI />
        </div>
      )}
      
      <div className="mt-6">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            This is a simplified version of the Supabase Auth UI that supports email/password login and magic link (passwordless) authentication.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}