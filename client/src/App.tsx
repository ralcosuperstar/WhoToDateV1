import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { initAnalytics } from "./lib/analytics";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

// Layout components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import Quiz from "@/pages/Quiz";
import Results from "@/pages/Results";
import Report from "@/pages/Report";
import Analytics from "@/pages/Analytics";
import Dashboard from "@/pages/Dashboard";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import HowItWorks from "@/pages/HowItWorks";
import Science from "@/pages/Science";
import AuthPage from "@/pages/auth-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/science" component={Science} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/auth" component={AuthPage} />
      
      {/* Protected Routes */}
      <ProtectedRoute path="/quiz" component={Quiz} />
      <ProtectedRoute path="/results" component={Results} />
      <ProtectedRoute path="/report" component={Report} />
      <ProtectedRoute path="/analytics" component={Analytics} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      
      {/* Catch-all route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Initialize analytics when the app loads
    initAnalytics();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
          <Toaster />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
