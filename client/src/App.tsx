import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { initAnalytics } from "./lib/analytics";
import { ProtectedRoute } from "@/lib/protected-route";
import { FixedSupabaseProvider } from "@/contexts/FixedSupabaseContext"; // Simplified direct Supabase integration 
import { SupabaseAuthProvider } from "@/contexts/SupabaseAuthContext"; // Authentication context

// Layout components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import FixedQuiz from "@/pages/FixedQuiz"; // Fixed version of the quiz component
import DirectReport from "@/pages/DirectReport"; // New simplified direct report page
import FixedResults from "@/pages/FixedResults"; // Fixed results page with improved error handling
import Analytics from "@/pages/Analytics";
import SupabaseDashboardPage from "@/pages/SupabaseDashboardPage"; // New Supabase Dashboard
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import HowItWorks from "@/pages/NewHowItWorks";
import Science from "@/pages/SciencePage";
import Counselling from "@/pages/Counselling";
import NewAuthPage from "@/pages/new-auth-page";

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
      
      {/* Core App Routes */}
      <Route path="/quiz" component={FixedQuiz} />
      <Route path="/results" component={FixedResults} />
      <Route path="/report" component={DirectReport} />
      <ProtectedRoute path="/analytics" component={Analytics} />
      
      {/* Supabase Dashboard */}
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
      <FixedSupabaseProvider> {/* Simplified Supabase Context that directly integrates with Supabase */}
        <SupabaseAuthProvider> {/* Authentication context for persistent user sessions */}
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
            <Toaster />
          </div>
        </SupabaseAuthProvider>
      </FixedSupabaseProvider>
    </QueryClientProvider>
  );
}

export default App;