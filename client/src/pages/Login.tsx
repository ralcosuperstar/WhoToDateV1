import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from 'react-helmet';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { SignIn, useClerk, useUser } from "@clerk/clerk-react";

const Login = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user, isLoading, error, syncUserWithClerk } = useAuth();
  const { isLoaded: clerkIsLoaded, isSignedIn: clerkIsSignedIn, user: clerkUser } = useUser();
  const { session } = useClerk();
  const [debugInfo, setDebugInfo] = useState<{[key: string]: any}>({});
  
  // Get redirect parameter from URL
  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  
  // Debug clerk auth status
  useEffect(() => {
    if (clerkIsLoaded) {
      console.log("Clerk auth status:", { 
        isSignedIn: clerkIsSignedIn, 
        userId: clerkUser?.id,
        sessionId: session?.id,
        sessionStatus: session?.status
      });
      
      setDebugInfo({
        clerkIsLoaded,
        clerkIsSignedIn,
        clerkUserId: clerkUser?.id,
        clerkEmail: clerkUser?.primaryEmailAddress?.emailAddress,
        sessionId: session?.id,
        sessionStatus: session?.status,
        ourUser: user ? { id: user.id, username: user.username } : null,
        authIsLoading: isLoading,
        authError: error?.message
      });
      
      // If signed in with Clerk but not with our backend, try to sync
      if (clerkIsSignedIn && clerkUser && !user && !isLoading) {
        console.log("Clerk user signed in but our backend doesn't recognize them - syncing...");
        syncUserWithClerk().catch(err => {
          console.error("Sync error:", err);
        });
      }
    }
  }, [clerkIsLoaded, clerkIsSignedIn, clerkUser, session, user, isLoading]);
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      console.log("User authenticated in our system, redirecting...", user);
      toast({
        title: "Logged in successfully",
        description: "You are now logged in. Redirecting...",
      });
      
      // Fix for history pushState error - use window.location instead of wouter navigate
      const destination = redirectTo.startsWith('/') ? redirectTo.substring(1) : redirectTo;
      window.location.href = `/${destination}`;
    }
  }, [user, redirectTo, toast]);

  return (
    <>
      <Helmet>
        <title>Login - WhoToDate</title>
        <meta name="description" content="Log in to access your compatibility profile and report." />
      </Helmet>
      
      <div className="min-h-screen bg-neutral-light pt-12 pb-16 px-4 flex flex-col">
        {/* Debug panel - only show in development */}
        {import.meta.env.DEV && (
          <div className="mb-8 w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4 border border-neutral-200 text-xs font-mono">
            <h2 className="text-base font-semibold mb-2 text-primary">Authentication Debug Info</h2>
            <div className="bg-zinc-50 p-3 rounded overflow-auto max-h-64">
              <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>
            <div className="mt-3 flex space-x-2">
              <button 
                onClick={() => syncUserWithClerk()}
                className="bg-primary/90 hover:bg-primary text-white text-xs py-1 px-3 rounded"
              >
                Force Sync with Clerk
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-xs py-1 px-3 rounded"
              >
                Reload Page
              </button>
              <button 
                onClick={() => {
                  // Clear any stored data and try again
                  window.localStorage.clear();
                  window.sessionStorage.clear();
                  document.cookie.split(";").forEach(c => {
                    document.cookie = c
                      .replace(/^ +/, "")
                      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
                  });
                  window.location.reload();
                }}
                className="bg-red-100 hover:bg-red-200 text-red-700 text-xs py-1 px-3 rounded"
              >
                Clear Storage & Reload
              </button>
            </div>
          </div>
        )}

        {/* Main login content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
              <p className="text-neutral-600">Sign in to access your compatibility profile</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-1">
              <SignIn 
                path="/login"
                routing="path"
                signUpUrl="/register"
                redirectUrl={redirectTo}
                afterSignInUrl={redirectTo}
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-primary hover:bg-primary/90',
                    footerActionLink: 'text-primary hover:text-primary/90',
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
