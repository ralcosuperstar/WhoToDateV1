import { useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from 'react-helmet';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Get redirect parameter from URL
  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      toast({
        title: "Already logged in",
        description: "You are already logged in. Redirecting...",
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
      
      <div className="min-h-screen bg-neutral-light pt-12 pb-16 px-4 flex items-center justify-center">
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
    </>
  );
};

export default Login;
