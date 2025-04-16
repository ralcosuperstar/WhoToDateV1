import { useState } from 'react';
import { SupabaseSignUpSimple } from '@/components/auth/SimpleAuthUI';
import { SupabaseLogoutButton } from '@/components/auth/SupabaseAuth';
import { useSupabase } from '@/contexts/SupabaseContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SupabaseAuthTest() {
  const { user, isLoading } = useSupabase();
  const [activeTab, setActiveTab] = useState<string>("status");

  return (
    <div className="container max-w-3xl mx-auto py-24">
      <h1 className="text-2xl font-bold mb-6 text-center">Supabase Auth Test</h1>
      
      {user ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Status</CardTitle>
              <CardDescription>You are currently logged in</CardDescription>
            </CardHeader>
            <CardContent>
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
                    <h3 className="text-lg font-medium">User Metadata</h3>
                    <pre className="bg-muted p-2 rounded-md mt-2 text-xs overflow-auto">
                      {JSON.stringify(user.user_metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <SupabaseLogoutButton />
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <SupabaseSignUpSimple />
            </TabsContent>
            <TabsContent value="signup">
              <SupabaseSignUpSimple />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}