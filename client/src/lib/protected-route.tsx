import { Loader2 } from "lucide-react";
import { Route } from "wouter";
import { useSupabase } from "@/contexts/SupabaseContext";

export function ProtectedRoute({
  path,
  component: Component,
  allowGuests = false,
}: {
  path: string;
  component: React.ComponentType;
  allowGuests?: boolean;
}) {
  // Use Supabase hook instead of direct context access
  const { user, isLoading } = useSupabase();

  // Special handling for the quiz route - allow access without login
  const isQuizRoute = path === "/quiz";

  return (
    <Route path={path}>
      {() => {
        // Show loading spinner while checking authentication (only briefly)
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          );
        }

        // Allow quiz access even without authentication
        if (isQuizRoute || allowGuests) {
          return <Component />;
        }

        // For other protected routes, redirect if not authenticated
        if (!user) {
          // Store the intended destination for post-login redirect
          sessionStorage.setItem('redirectAfterAuth', path);
          
          // Use window.location.href instead of Redirect to avoid potential loops
          window.location.href = "/auth";
          return null;
        }

        // Render the protected component if authenticated
        return <Component />;
      }}
    </Route>
  );
}