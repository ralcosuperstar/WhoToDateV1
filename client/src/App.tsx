import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { initAnalytics } from "./lib/analytics";
import { ProtectedRoute } from "@/lib/protected-route";
import { SupabaseProvider as OldSupabaseProvider } from "@/contexts/SupabaseContext";
import { SupabaseProvider } from "@/contexts/NewSupabaseContext"; // New Supabase Context
import { SupabaseDbProvider } from "@/contexts/SupabaseDbContext";
import { AuthProvider } from "@/contexts/AuthContext";

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
import DevDashboardPage from "@/pages/DevDashboard"; // Development crash-proof dashboard
import SupabaseDashboardPage from "@/pages/SupabaseDashboardPage"; // New Supabase Dashboard
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import HowItWorks from "@/pages/NewHowItWorks";
import Science from "@/pages/SciencePage";
import Counselling from "@/pages/Counselling";
import AuthPage from "@/pages/auth-page";
import NewAuthPage from "@/pages/new-auth-page";
import SupabaseTest from "@/pages/SupabaseTest";
import SupabaseAuthTest from "@/pages/SupabaseAuthTest";
import SupabaseDbTest from "@/pages/SupabaseDbTest";
import SimpleAuthTest from "@/pages/SimpleAuthTest";
import CustomAuthTest from "@/pages/CustomAuthTest";
import AuthTest from "@/pages/auth-test";
import NewAuthTest from "@/pages/new-auth-test";
import TestApiPage from "@/pages/test-api-page";
import SimpleApiTest from "@/pages/SimpleApiTest";

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
      <Route path="/supabase-db-test" component={SupabaseDbTest} />
      <Route path="/simple-auth-test" component={SimpleAuthTest} />
      <Route path="/custom-auth-test" component={CustomAuthTest} />
      <Route path="/auth-test" component={AuthTest} />
      <Route path="/new-auth-test" component={NewAuthTest} />
      <Route path="/test-api" component={TestApiPage} />
      <Route path="/simple-api-test" component={SimpleApiTest} />
      
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
      <ProtectedRoute path="/results" component={SimpleResults} allowGuests={true} />
      <ProtectedRoute path="/results-legacy" component={Results} allowGuests={true} />
      <ProtectedRoute path="/report" component={Report} />
      <ProtectedRoute path="/analytics" component={Analytics} />
      <ProtectedRoute path="/dashboard-original" component={Dashboard} />
      <ProtectedRoute path="/dashboard-dev" component={DevDashboardPage} />
      
      {/* New Supabase Dashboard (direct integration) */}
      <Route path="/dashboard" component={SupabaseDashboardPage} />
      
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
      <SupabaseProvider> {/* New Supabase Context that uses our service directly */}
        <OldSupabaseProvider>
          <AuthProvider>
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
          </AuthProvider>
        </OldSupabaseProvider>
      </SupabaseProvider>
    </QueryClientProvider>
  );
}

export default App;
