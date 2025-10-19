import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { initAnalytics } from "./lib/analytics";
import { ProtectedRoute } from "@/lib/protected-route";
import { FixedSupabaseProvider } from "@/contexts/FixedSupabaseContext"; // Simplified direct Supabase integration
import ScrollToTop from "@/components/ui/scroll-to-top";

// Layout components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import FixedQuiz from "@/pages/FixedQuiz"; // Fixed version of the quiz component
import DirectReport from "@/pages/DirectReport"; // New simplified direct report page
import FixedResults from "@/pages/FixedResults"; // Fixed results page with improved error handling
import EnhancedResults from "@/pages/EnhancedResults"; // New redesigned results page with better UX
import Analytics from "@/pages/Analytics";
import EnhancedDashboardPage from "@/pages/EnhancedDashboardPage"; // New Enhanced Dashboard with better UI/UX
import HowItWorks from "@/pages/NewHowItWorks";
import Science from "@/pages/SciencePage";
import NewAuthPage from "@/pages/new-auth-page";
import HowToDatePage from "@/pages/HowToDatePage"; // Dating approach guide eBook page
import ProfilePage from "@/pages/ProfilePage"; // New Profile management page
import AdminPage from "@/pages/AdminPage"; // Admin tools page for database management

// Policy Pages
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CookiePolicy from "@/pages/CookiePolicy";
import RefundPolicy from "@/pages/RefundPolicy";
import Sitemap from "@/pages/Sitemap";

import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* Public Routes */}
        <Route path="/" component={Home} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/science" component={Science} />
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
        <Route path="/results" component={EnhancedResults} />
        <Route path="/results-old" component={FixedResults} />
        <Route path="/report" component={DirectReport} />
        <Route path="/howtodate" component={HowToDatePage} />
        <ProtectedRoute path="/analytics" component={Analytics} />
        
        {/* Enhanced Dashboard */}
        <ProtectedRoute path="/dashboard" component={EnhancedDashboardPage} />
        <ProtectedRoute path="/profile" component={ProfilePage} />
        <ProtectedRoute path="/admin" component={AdminPage} />
        
        {/* Catch-all route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  useEffect(() => {
    // Initialize analytics when the app loads
    initAnalytics();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <FixedSupabaseProvider> {/* Uses consistent Supabase client initialization */}
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
          <Toaster />
        </div>
      </FixedSupabaseProvider>
    </QueryClientProvider>
  );
}

export default App;