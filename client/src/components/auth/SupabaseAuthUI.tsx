import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { initSupabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface SupabaseAuthUIProps {
  redirectTo?: string;
  appearance?: 'default' | 'minimal';
  showMagicLink?: boolean;
}

export function SupabaseAuthUI({
  redirectTo,
  appearance = 'default',
  showMagicLink = true,
}: SupabaseAuthUIProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [supabase, setSupabase] = useState<any>(null);

  useEffect(() => {
    async function loadSupabase() {
      try {
        console.log('Initializing Supabase for Auth UI...');
        const client = await initSupabase();
        setSupabase(client);
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

  if (!supabase) {
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
      supabaseClient={supabase}
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
      theme={appearance}
      redirectTo={redirectTo || window.location.origin}
      magicLink={showMagicLink}
    />
  );
}

export function SupabaseSignUp({ redirectTo }: { redirectTo?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Sign up to get started with WhoToDate</CardDescription>
      </CardHeader>
      <CardContent>
        <SupabaseAuthUI 
          redirectTo={redirectTo}
          appearance="default"
          showMagicLink={true}
        />
      </CardContent>
    </Card>
  );
}

export function SupabaseSignIn({ redirectTo }: { redirectTo?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to your WhoToDate account</CardDescription>
      </CardHeader>
      <CardContent>
        <SupabaseAuthUI 
          redirectTo={redirectTo} 
          appearance="default"
          showMagicLink={true}
        />
      </CardContent>
    </Card>
  );
}