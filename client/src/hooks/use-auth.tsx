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
      // Send the Clerk user data to our backend
      const response = await apiRequest("POST", "/api/users/sync", {
        clerkId: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        username: clerkUser.username || clerkUser.firstName || clerkUser.id,
        fullName: clerkUser.fullName,
        imageUrl: clerkUser.imageUrl
      });
      
      if (!response.ok) {
        throw new Error("Failed to sync user with backend");
      }
      
      const userData: User = await response.json();
      setUser(userData);
      
      // Update the cached user data
      queryClient.setQueryData(["/api/me"], userData);
      
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      toast({
        title: "Authentication error",
        description: "Failed to synchronize your account data",
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
      const response = await apiRequest("POST", "/api/users/link", {
        userId,
        clerkId: clerkUser.id
      });
      
      if (!response.ok) {
        throw new Error("Failed to link accounts");
      }
      
      const userData: User = await response.json();
      setUser(userData);
      
      // Update the cached user data
      queryClient.setQueryData(["/api/me"], userData);
      
      toast({
        title: "Account linked",
        description: "Your existing account has been successfully linked",
        variant: "default",
      });
      
    } catch (err) {
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