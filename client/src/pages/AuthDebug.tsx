import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { Loader2, RefreshCcw, AlertTriangle, Check, Key } from "lucide-react";

// Debug page for authentication troubleshooting
export default function AuthDebug() {
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  const [isTestingAuth, setIsTestingAuth] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  
  // Check localStorage for auth token on load
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setAuthToken(token);
  }, []);
  
  const handleDebugLogin = async () => {
    setIsTestingAuth(true);
    
    try {
      // Clear existing auth token
      localStorage.removeItem("auth_token");
      document.cookie = "auth_token=; path=/; max-age=0";
      
      const response = await apiRequest("POST", "/api/debug-login");
      const data = await response.json();
      
      // Save the auth token and debug info
      if (data.authToken) {
        localStorage.setItem("auth_token", data.authToken);
        document.cookie = `auth_token=${data.authToken}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
        setAuthToken(data.authToken);
      }
      
      setDebugInfo(data);
      
      toast({
        title: "Debug login successful",
        description: "Authentication token saved, refreshing app state...",
        variant: "default",
      });
      
      // Force reload to apply new auth state
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Debug login error:", error);
      toast({
        title: "Debug login failed",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    } finally {
      setIsTestingAuth(false);
    }
  };
  
  // Test the current auth token (if any)
  const testCurrentAuth = async () => {
    setIsTestingAuth(true);
    
    try {
      // Try to fetch the current user with the token
      const response = await fetch("/api/me", {
        credentials: "include",
        headers: {
          "Authorization": authToken ? `Bearer ${authToken}` : "",
          "Cache-Control": "no-cache"
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Auth token is valid",
          description: "Successfully fetched your user data",
          variant: "default",
        });
      } else {
        toast({
          title: "Auth token is invalid",
          description: data.message || "Could not retrieve user data",
          variant: "destructive",
        });
      }
      
      setDebugInfo(data);
    } catch (error) {
      console.error("Auth test error:", error);
      toast({
        title: "Auth test failed",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    } finally {
      setIsTestingAuth(false);
    }
  };
  
  const clearSession = () => {
    localStorage.removeItem("auth_token");
    document.cookie = "auth_token=; path=/; max-age=0";
    document.cookie = "whotodate.sid=; path=/; max-age=0";
    document.cookie = "connect.sid=; path=/; max-age=0";
    
    setAuthToken(null);
    
    toast({
      title: "Session cleared",
      description: "All auth tokens and cookies have been removed",
      variant: "default",
    });
    
    // Force reload to apply changes
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Authentication Debug Tool</h1>
      <p className="text-lg mb-8">This page helps troubleshoot authentication issues</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              Authentication Status
            </CardTitle>
            <CardDescription>
              Current login status and stored tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  {user ? (
                    <Check className="h-5 w-5 text-green-500 mt-1" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                  )}
                  <div>
                    <p className="font-medium">User Status: {user ? "Logged In" : "Not Logged In"}</p>
                    {user && (
                      <p className="text-sm text-muted-foreground">
                        Logged in as {user.username} (ID: {user.id})
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  {authToken ? (
                    <Check className="h-5 w-5 text-green-500 mt-1" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                  )}
                  <div>
                    <p className="font-medium">Auth Token: {authToken ? "Present" : "Missing"}</p>
                    {authToken && (
                      <p className="text-sm text-muted-foreground break-all">
                        {authToken.substring(0, 8)}...{authToken.substring(authToken.length - 8)}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div>
                    <p className="font-medium">Cookies:</p>
                    <p className="text-sm text-muted-foreground break-all">
                      {document.cookie || "No cookies present"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="flex gap-2 w-full">
              <Button 
                onClick={testCurrentAuth} 
                disabled={isTestingAuth || !authToken}
                variant="outline"
                className="flex-1"
              >
                {isTestingAuth && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Test Current Auth
              </Button>
              <Button 
                onClick={clearSession}
                variant="destructive"
                className="flex-1"
              >
                Clear Session
              </Button>
            </div>
            <Button 
              onClick={handleDebugLogin} 
              disabled={isTestingAuth}
              className="w-full"
            >
              {isTestingAuth && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Debug Login
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCcw className="h-5 w-5 text-primary" />
              Debug Information
            </CardTitle>
            <CardDescription>
              Auth response details for troubleshooting
            </CardDescription>
          </CardHeader>
          <CardContent>
            {debugInfo ? (
              <pre className="bg-muted p-4 rounded-md overflow-auto max-h-80 text-xs">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            ) : (
              <div className="bg-muted p-4 rounded-md text-center text-muted-foreground">
                <p>No debug information available.</p>
                <p className="text-sm">Run a debug login to see auth response details.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}