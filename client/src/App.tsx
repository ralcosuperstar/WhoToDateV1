import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { initAnalytics } from "./lib/analytics";
import { ProtectedRoute } from "@/lib/protected-route";
import { SupabaseProvider } from "@/contexts/SupabaseContext";
import { SupabaseDbProvider } from "@/contexts/SupabaseDbContext";

// Layout components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import Quiz from "@/pages/Quiz";
import Results from "@/pages/Results";
import SimpleResults from "@/pages/SimpleResults";
import Report from "@/pages/Report";
import Analytics from "@/pages/Analytics";
import Dashboard from "@/pages/Dashboard";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import HowItWorks from "@/pages/NewHowItWorks";
import Science from "@/pages/SciencePage";
import Counselling from "@/pages/Counselling";
import AuthPage from "@/pages/auth-page";
import NewAuthPage from "@/pages/new-auth-page";
import SupabaseTest from "@/pages/SupabaseTest";
import SupabaseAuthTest from "@/pages/SupabaseAuthTest";
import SimpleAuthTest from "@/pages/SimpleAuthTest";
import CustomAuthTest from "@/pages/CustomAuthTest";
import AuthTest from "@/pages/auth-test";

// Policy Pages
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CookiePolicy from "@/pages/CookiePolicy";
import RefundPolicy from "@/pages/RefundPolicy";
import Sitemap from "@/pages/Sitemap";

import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/science" component={Science} />
      <Route path="/counselling" component={Counselling} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/auth" component={NewAuthPage} />
      <Route path="/old-auth" component={AuthPage} />
      <Route path="/supabase-test" component={SupabaseTest} />
      <Route path="/supabase-auth-test" component={SupabaseAuthTest} />
      <Route path="/simple-auth-test" component={SimpleAuthTest} />
      <Route path="/custom-auth-test" component={CustomAuthTest} />
      <Route path="/auth-test" component={AuthTest} />
      
      {/* Policy Pages */}
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/cookies" component={CookiePolicy} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route path="/sitemap" component={Sitemap} />
      
      {/* Auth redirects - for backward compatibility */}
      <Route path="/login">
        {() => window.location.href = "/auth?tab=login"}
      </Route>
      <Route path="/register">
        {() => window.location.href = "/auth?tab=register"}
      </Route>
      <Route path="/sign-in">
        {() => window.location.href = "/auth?tab=login"}
      </Route>
      <Route path="/sign-up">
        {() => window.location.href = "/auth?tab=register"}
      </Route>
      
      {/* Protected Routes */}
      <ProtectedRoute path="/quiz" component={Quiz} allowGuests={true} />
      <ProtectedRoute path="/results" component={Results} allowGuests={true} />
      <ProtectedRoute path="/results-supabase" component={SimpleResults} />
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
      <SupabaseProvider>
        <SupabaseDbProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
            <Toaster />
          </div>
        </SupabaseDbProvider>
      </SupabaseProvider>
    </QueryClientProvider>
  );
}

export default App;
