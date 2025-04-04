import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { apiRequest, queryClient } from "../lib/queryClient";
import { User } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// We'll conditionally import Clerk to avoid the error
let useUser: any;
let useClerk: any;
try {
  // Dynamic import to avoid errors when Clerk is not available
  const clerkReact = require("@clerk/clerk-react");
  useUser = clerkReact.useUser;
  useClerk = clerkReact.useClerk;
} catch (e) {
  // Provide mock implementations if Clerk is not available
  useUser = () => ({ user: null, isLoaded: true });
  useClerk = () => ({ session: null });
}

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  syncUserWithClerk: () => Promise<void>;
  linkExistingAccount: (userId: number) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

// A version of the provider for when Clerk is not available
export function NoClerkAuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        user: null,
        isLoading: false,
        error: null,
        syncUserWithClerk: async () => { /* No-op */ },
        linkExistingAccount: async () => { /* No-op */ }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// The regular auth provider when Clerk is available
export function ClerkAuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const { user: clerkUser, isLoaded: clerkIsLoaded } = useUser();
  const { session } = useClerk();
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Synchronize with backend when Clerk user changes
  useEffect(() => {
    if (clerkIsLoaded) {
      if (clerkUser) {
        syncUserWithClerk();
      } else {
        setUser(null);
        setIsLoading(false);
      }
    }
  }, [clerkUser, clerkIsLoaded]);
  
  // Handle when the Clerk session becomes active to re-sync user data
  useEffect(() => {
    if (session?.status === "active" && clerkUser) {
      syncUserWithClerk();
    }
  }, [session?.status]);

  // Create or update user in the backend
  const syncUserWithClerk = async (): Promise<void> => {
    if (!clerkUser) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Syncing user with Clerk ID:", clerkUser.id);
      
      // Send the Clerk user data to our backend
      const response = await fetch("/api/users/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress,
          username: clerkUser.username || clerkUser.firstName || clerkUser.id,
          fullName: clerkUser.fullName,
          imageUrl: clerkUser.imageUrl
        }),
        credentials: "include" // Important: this ensures cookies are sent with the request
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to sync user with backend");
      }
      
      const userData: User = await response.json();
      console.log("User synchronized successfully:", userData);
      setUser(userData);
      
      // Update the cached user data
      queryClient.setQueryData(["/api/me"], userData);
      
      // Make a follow-up request to /api/me to ensure session is established
      // Use direct fetch with credentials to ensure cookies are sent
      const meResponse = await fetch("/api/me", { 
        credentials: "include"
      });
      
      if (meResponse.ok) {
        const updatedUserData: User = await meResponse.json();
        console.log("ME endpoint verified successful:", updatedUserData);
        queryClient.setQueryData(["/api/me"], updatedUserData);
      } else {
        console.error("ME endpoint verification failed:", meResponse.status);
        // Try to analyze the session issue
        const errorBody = await meResponse.text().catch(() => "Could not read error body");
        console.error("ME endpoint error details:", errorBody);
        
        if (meResponse.status === 401) {
          // Session was not properly established, show a specific message
          toast({
            title: "Session Error",
            description: "Your login was successful, but there was an issue establishing your session. Please try refreshing the page.",
            variant: "destructive",
          });
        }
      }
      
    } catch (err) {
      console.error("Error syncing user:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      toast({
        title: "Authentication error",
        description: err instanceof Error ? err.message : "Failed to synchronize your account data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Link an existing account to the current Clerk user
  const linkExistingAccount = async (userId: number): Promise<void> => {
    if (!clerkUser) {
      toast({
        title: "Authentication error",
        description: "You must be logged in to link accounts",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/users/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          clerkId: clerkUser.id
        }),
        credentials: "include" // Important: this ensures cookies are sent with the request
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to link accounts");
      }
      
      const userData: User = await response.json();
      setUser(userData);
      
      // Update the cached user data
      queryClient.setQueryData(["/api/me"], userData);
      
      // Verify session by making a follow-up request to /api/me
      const meResponse = await fetch("/api/me", { credentials: "include" });
      
      if (meResponse.ok) {
        const updatedUserData = await meResponse.json();
        console.log("Session verified after account linking:", updatedUserData);
        queryClient.setQueryData(["/api/me"], updatedUserData);
      }
      
      toast({
        title: "Account linked",
        description: "Your existing account has been successfully linked",
        variant: "default",
      });
      
    } catch (err) {
      console.error("Error linking accounts:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      toast({
        title: "Account linking failed",
        description: err instanceof Error ? err.message : String(err),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        syncUserWithClerk,
        linkExistingAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Wrapper component that chooses the appropriate provider
export function AuthProvider({ children, noClerk = false }: { children: ReactNode, noClerk?: boolean }) {
  if (noClerk) {
    return <NoClerkAuthProvider>{children}</NoClerkAuthProvider>;
  } else {
    return <ClerkAuthProvider>{children}</ClerkAuthProvider>;
  }
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}