import { useState } from 'react';
import { CustomAuthUI } from '@/components/auth/CustomAuthUI';
import { SupabaseLogoutButton } from '@/components/auth/SupabaseAuth';
import { useSupabase } from '@/contexts/SupabaseContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

export default function CustomAuthTest() {
  const { user, isLoading } = useSupabase();

  return (
    <div className="container max-w-md mx-auto py-24">
      <h1 className="text-2xl font-bold mb-6 text-center">Custom Auth UI Test</h1>
      
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
                {user.user_metadata && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium">User Data</h3>
                    <p className="mb-1">
                      <span className="font-medium">First Name:</span> {user.user_metadata.first_name || 'Not provided'}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">Last Name:</span> {user.user_metadata.last_name || 'Not provided'}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">Phone:</span> {user.user_metadata.phone || 'Not provided'}
                    </p>
                  </div>
                )}
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
          <CustomAuthUI />
        </div>
      )}
      
      <div className="mt-6">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            This is a custom authentication UI that collects first name, last name, email, password, and phone number with OTP verification.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}