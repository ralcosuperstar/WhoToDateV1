import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
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

  // Get the Clerk publishable key from environment variables
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || import.meta.env.CLERK_PUBLISHABLE_KEY;
  
  if (!clerkPubKey) {
    console.error("Missing Clerk Publishable Key");
  }

  return (
    <QueryClientProvider client={queryClient}>
      {clerkPubKey ? (
        <ClerkProvider publishableKey={clerkPubKey}>
          <AuthProvider>
            <AppContent />
            <Toaster />
          </AuthProvider>
        </ClerkProvider>
      ) : (
        // Fallback without Clerk auth when keys are not available
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
                <div className="container mx-auto p-4 text-center mt-12">
                  <h2 className="text-2xl font-semibold mb-4">Authentication System Unavailable</h2>
                  <p className="mb-4">
                    The authentication system is currently not configured. Please provide Clerk API keys.
                  </p>
                  <p>
                    You can still explore most of the site functionality, but login/registration features are unavailable.
                  </p>
                </div>
              )} />
              <Route path="/register" component={() => (
                <div className="container mx-auto p-4 text-center mt-12">
                  <h2 className="text-2xl font-semibold mb-4">Authentication System Unavailable</h2>
                  <p className="mb-4">
                    The authentication system is currently not configured. Please provide Clerk API keys.
                  </p>
                  <p>
                    You can still explore most of the site functionality, but login/registration features are unavailable.
                  </p>
                </div>
              )} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
          <Toaster />
        </div>
      )}
    </QueryClientProvider>
  );
}

export default App;
