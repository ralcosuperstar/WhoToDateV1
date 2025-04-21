import { useEffect } from "react";
import { useLocation } from "wouter";
import { useSupabase } from '@/contexts/NewSupabaseContext';
import { CustomAuthUI } from '@/components/auth/CustomAuthUI';
import { Loader2 } from "lucide-react";

export default function NewAuthPage() {
  // Router
  const [, navigate] = useLocation();
  
  // Auth states
  const { user, isLoading } = useSupabase();
  
  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // If already logged in and waiting for redirect
  if (user || isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left column - Auth form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-4 md:p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-primary">WhotoDate</h1>
          <p className="text-muted-foreground mb-8">
            Unlock your relationship blueprint and self-discovery journey
          </p>
          
          <CustomAuthUI />
        </div>
      </div>
      
      {/* Right column - Image and features */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-primary/5 to-primary/10 p-8 justify-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-primary">Why Join WhoToDate?</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-card p-3 rounded-full shadow-sm border border-border">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
              </div>
              <div>
                <div className="text-xl font-medium">Scientific Approach</div>
                <p className="text-muted-foreground">Our compatibility assessment is based on psychological principles and research.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-card p-3 rounded-full shadow-sm border border-border">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M2 12h5"/><path d="M17 12h5"/><path d="M9 7v10"/><path d="M15 7v10"/><path d="M12 22v-4"/><path d="M12 6V2"/></svg>
              </div>
              <div>
                <div className="text-xl font-medium">Detailed Analysis</div>
                <p className="text-muted-foreground">Get in-depth insights about your relationship patterns and preferences.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-card p-3 rounded-full shadow-sm border border-border">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <div>
                <div className="text-xl font-medium">Practical Advice</div>
                <p className="text-muted-foreground">Receive actionable guidance to improve your relationships and dating experience.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-card p-3 rounded-full shadow-sm border border-border">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21.5 12H16a4 4 0 1 0 0 8h1a4 4 0 1 0 0-8"/><circle cx="7.5" cy="14.5" r="1.5"/><path d="M7.5 19.5V5a2 2 0 0 1 2-2H18"/><path d="m16 8 3-3-3-3"/></svg>
              </div>
              <div>
                <div className="text-xl font-medium">Free Report</div>
                <p className="text-muted-foreground">Start with a free basic compatibility profile to discover your relationship style.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}