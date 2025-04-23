import { useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from 'react-helmet';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { SignUp } from "@clerk/clerk-react";

const Register = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Get redirect parameter from URL
  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get("redirect") || "/quiz";
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      toast({
        title: "Already registered",
        description: "You are already logged in. Redirecting to quiz...",
      });
      
      // Fix for history pushState error - use window.location instead of wouter navigate
      window.location.href = "/quiz";
    }
  }, [user, toast]);

  return (
    <>
      <Helmet>
        <title>Register - WhoToDate</title>
        <meta name="description" content="Create a new account to unlock your relationship blueprint and begin your self-discovery journey." />
      </Helmet>
      
      <div className="min-h-screen bg-neutral-light pt-12 pb-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#e83a8e' }}>Start Your Self-Discovery Journey</h1>
            <p className="text-neutral-600">Create an account to unlock your relationship blueprint</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-1">
            <SignUp 
              path="/register"
              routing="path"
              signInUrl="/login"
              redirectUrl={redirectTo}
              afterSignUpUrl={redirectTo}
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-[#e83a8e] hover:bg-[#e83a8e]/90',
                  footerActionLink: 'text-[#e83a8e] hover:text-[#e83a8e]/90',
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
