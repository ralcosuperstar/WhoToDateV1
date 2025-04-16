import { Loader2 } from "lucide-react";
import { Route } from "wouter";
import { useSupabase } from "@/contexts/SupabaseContext";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: React.ComponentType;
}) {
  // Use Supabase hook instead of direct context access
  const { user, isLoading } = useSupabase();

  return (
    <Route path={path}>
      {() => {
        // Show loading spinner while checking authentication
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          );
        }

        // Redirect to auth page if not authenticated
        if (!user) {
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