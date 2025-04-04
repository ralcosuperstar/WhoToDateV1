import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { initAnalytics } from "./lib/analytics";
import { ClerkProvider } from "@clerk/clerk-react";
import { AuthProvider } from "@/hooks/use-auth";

// Layout components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import Quiz from "@/pages/Quiz";
import Results from "@/pages/Results";
import Payment from "@/pages/Payment";
import Report from "@/pages/Report";
import Analytics from "@/pages/Analytics";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import HowItWorks from "@/pages/HowItWorks";
import Science from "@/pages/Science";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/science" component={Science} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/results" component={Results} />
      <Route path="/payment" component={Payment} />
      <Route path="/report" component={Report} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Router />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    // Initialize analytics when the app loads
    initAnalytics();
  }, []);

  // Use either VITE_CLERK_PUBLISHABLE_KEY or CLERK_PUBLISHABLE_KEY
  // In development, we can access the CLERK_PUBLISHABLE_KEY directly
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || import.meta.env.CLERK_PUBLISHABLE_KEY;

  // For simplicity, let's just use the non-authenticated mode
  // We've seen that there are issues with Clerk initialization
  // Once you have both the CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY correctly set up,
  // you can switch this back to use Clerk
  const useClerkAuth = false;
  
  return (
    <QueryClientProvider client={queryClient}>
      {useClerkAuth && clerkPubKey ? (
        <ClerkProvider 
          publishableKey={clerkPubKey}
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-md rounded-lg border border-gray-200",
              headerTitle: "text-primary font-bold",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              footerActionLink: "text-primary hover:text-primary/90"
            }
          }}
        >
          <AuthProvider>
            <AppContent />
            <Toaster />
          </AuthProvider>
        </ClerkProvider>
      ) : (
        // Fallback without Clerk auth when keys are not available
        <AuthProvider noClerk={true}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/how-it-works" component={HowItWorks} />
                <Route path="/science" component={Science} />
                <Route path="/blog" component={Blog} />
                <Route path="/blog/:slug" component={BlogPost} />
                <Route path="/login" component={() => (
                  <div className="container mx-auto p-4 mt-12 max-w-2xl">
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                      <div className="flex items-center justify-center mb-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-semibold mb-4 text-center">Authentication System in Development Mode</h2>
                      <p className="mb-4 text-gray-600">
                        The authentication system is currently running in development mode without Clerk integration. To enable full authentication features:
                      </p>
                      <ul className="list-disc list-inside mb-4 text-gray-600 space-y-2">
                        <li>Set up a Clerk account at <a href="https://clerk.dev" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">clerk.dev</a></li>
                        <li>Add both <code className="bg-gray-100 px-1 rounded">CLERK_PUBLISHABLE_KEY</code> and <code className="bg-gray-100 px-1 rounded">CLERK_SECRET_KEY</code> to your environment</li>
                        <li>Set <code className="bg-gray-100 px-1 rounded">useClerkAuth = true</code> in <code className="bg-gray-100 px-1 rounded">App.tsx</code></li>
                      </ul>
                      <p className="mt-4 text-gray-700">
                        You can still explore the rest of the WhoToDate application without logging in. Try the compatibility quiz or browse the science page!
                      </p>
                      <div className="mt-6 flex justify-center">
                        <Link to="/" className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-lg transition">
                          Return to Home
                        </Link>
                      </div>
                    </div>
                  </div>
                )} />
                <Route path="/register" component={() => (
                  <div className="container mx-auto p-4 mt-12 max-w-2xl">
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                      <div className="flex items-center justify-center mb-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-semibold mb-4 text-center">Registration System in Development Mode</h2>
                      <p className="mb-4 text-gray-600">
                        The authentication system is currently running in development mode without Clerk integration. To enable full registration features:
                      </p>
                      <ul className="list-disc list-inside mb-4 text-gray-600 space-y-2">
                        <li>Set up a Clerk account at <a href="https://clerk.dev" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">clerk.dev</a></li>
                        <li>Add both <code className="bg-gray-100 px-1 rounded">CLERK_PUBLISHABLE_KEY</code> and <code className="bg-gray-100 px-1 rounded">CLERK_SECRET_KEY</code> to your environment</li>
                        <li>Set <code className="bg-gray-100 px-1 rounded">useClerkAuth = true</code> in <code className="bg-gray-100 px-1 rounded">App.tsx</code></li>
                      </ul>
                      <p className="mt-4 text-gray-700">
                        In the meantime, you can still try out all the features of WhoToDate! Take the compatibility quiz to see your personalized results.
                      </p>
                      <div className="mt-6 flex justify-center">
                        <Link to="/quiz" className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-lg transition">
                          Try the Quiz
                        </Link>
                      </div>
                    </div>
                  </div>
                )} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
            <Toaster />
          </div>
        </AuthProvider>
      )}
    </QueryClientProvider>
  );
}

export default App;
