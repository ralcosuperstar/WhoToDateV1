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
        setSupabaseClient(client);
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
      otpType="numeric"
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