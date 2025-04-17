import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { initSupabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SimpleAuthUI() {
  const [isLoading, setIsLoading] = useState(true);
  const [supabaseClient, setSupabaseClient] = useState<any>(null);

  useEffect(() => {
    async function loadSupabase() {
      try {
        console.log('Initializing Supabase for Auth UI...');
        const client = await initSupabase();
        
        // Set up auth state change listener
        const { data: { subscription } } = client.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event);
            
            // Only sync on sign_in or user_updated events
            if (event === 'SIGNED_IN' && session?.user) {
              console.log('User signed in, syncing with server...');
              try {
                // Call our sync endpoint
                const response = await fetch('/api/supabase-sync', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email: session.user.email,
                    user_id: session.user.id
                  }),
                  credentials: 'include' // Important for cookies
                });
                
                if (!response.ok) {
                  console.error("Failed to sync with server after sign in:", await response.text());
                } else {
                  console.log("Successfully synced Supabase user with server");
                }
              } catch (syncError) {
                console.error("Error syncing with server:", syncError);
              }
            }
          }
        );
        
        // Store the client
        setSupabaseClient(client);
        
        // Return cleanup function
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing Supabase for Auth UI:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadSupabase();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!supabaseClient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription>
            Unable to initialize authentication. Please try again later.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Auth
      supabaseClient={supabaseClient}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#e83a8e',
              brandAccent: '#d3277d',
            },
          },
        },
      }}
      providers={[]}
      redirectTo={window.location.origin}
      magicLink={true}
      view="sign_in"
      showLinks={true}
      additionalData={{
        first_name: '',
        last_name: '',
        phone: ''
      }}
      localization={{
        variables: {
          sign_up: {
            email_label: 'Email',
            password_label: 'Password',
            button_label: 'Sign up',
            loading_button_label: 'Signing up...',
            confirmation_text: 'Check your email for a verification code',
            link_text: "Don't have an account? Sign up"
          },
          sign_in: {
            email_label: 'Email',
            password_label: 'Password',
            button_label: 'Sign in',
            loading_button_label: 'Signing in...',
            link_text: 'Already have an account? Sign in'
          },
          forgotten_password: {
            email_label: 'Email',
            password_label: 'Password',
            button_label: 'Send reset instructions',
            loading_button_label: 'Sending reset instructions...',
            confirmation_text: 'Check your email for a password reset link'
          }
        }
      }}
    />
  );
}

export function SupabaseSignUpSimple() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Sign up to get started with WhoToDate</CardDescription>
      </CardHeader>
      <CardContent>
        <SimpleAuthUI />
      </CardContent>
    </Card>
  );
}