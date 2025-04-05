import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: React.ComponentType;
}) {
  const { user, isLoading } = useAuth();

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
          return <Redirect to="/auth" />;
        }

        // Render the protected component if authenticated
        return <Component />;
      }}
    </Route>
  );
}