import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import CompatibilityCard from "@/components/report/CompatibilityCard";
import { User, Report } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient"; 
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from "@/contexts/SupabaseContext";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editFullName, setEditFullName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user: supabaseUser, isLoading: isSupabaseLoading, signOut } = useSupabase();
  
  // Local state to store the user profile
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  
  // Effect to fetch user details once we have Supabase auth
  useEffect(() => {
    const fetchUserData = async () => {
      if (supabaseUser) {
        try {
          // First try to get user from the API
          const response = await fetch('/api/user', {
            credentials: 'include'
          });
          
          if (response.ok) {
            const userData = await response.json();
            setLocalUser(userData);
          } else {
            // If that fails, create a basic user object from Supabase data
            console.log('Creating basic user from Supabase data');
            // Create a minimal User object with required fields
            const basicUser: User = {
              id: 0, // We don't know the ID yet
              username: supabaseUser.email?.split('@')[0] || 'user',
              password: '', // Not used in frontend display
              email: supabaseUser.email || '',
              phoneNumber: supabaseUser.phone || null,
              firstName: null,
              lastName: null,
              fullName: supabaseUser.user_metadata?.full_name || '',
              dateOfBirth: null,
              gender: null,
              imageUrl: null,
              isVerified: true,
              verificationMethod: null,
              verificationToken: null,
              verificationTokenExpiry: null,
              otpCode: null,
              otpExpiry: null,
              clerkId: supabaseUser.id,
              createdAt: new Date(),
            };
            setLocalUser(basicUser);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast({
            title: 'Error',
            description: 'Failed to load user data',
            variant: 'destructive'
          });
        } finally {
          setIsUserLoading(false);
        }
      } else if (!isSupabaseLoading) {
        setIsUserLoading(false);
        setLocalUser(null);
      }
    };
    
    fetchUserData();
  }, [supabaseUser, isSupabaseLoading, toast]);
  
  // Modified report query with error handling
  const { 
    data: report, 
    isLoading: isReportLoading,
    isError: isReportError
  } = useQuery<Report>({ 
    queryKey: ['/api/report'],
    enabled: !!localUser,
    retry: false,
    // If the query fails, we'll handle it gracefully
    onError: (error) => {
      console.error('Error fetching report:', error);
      // We're handling errors in the UI, so no need to show toast
    }
  });
  
  // Handle opening the edit profile dialog
  const handleEditProfileOpen = () => {
    if (localUser) {
      setEditFullName(localUser.fullName || '');
      setEditEmail(localUser.email);
      setIsEditProfileOpen(true);
    }
  };

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: { fullName: string; email: string }) => {
      const res = await apiRequest('PUT', '/api/user/profile', data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
      setIsEditProfileOpen(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "There was a problem updating your profile",
        variant: "destructive",
      });
    }
  });

  // Handle profile update submission
  const handleUpdateProfile = () => {
    updateProfileMutation.mutate({
      fullName: editFullName,
      email: editEmail
    });
  };

  // Use Supabase signOut function directly
  const handleLogout = async () => {
    try {
      await signOut();
      // Clear user data from cache
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
      queryClient.invalidateQueries({ queryKey: ['/api/report'] });
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      
      // Navigate to home page
      window.location.href = "/";
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!localUser) {
    return (
      <div className="text-center py-12">
        <h2 className="font-heading font-bold text-xl mb-4">User not found</h2>
        <p className="mb-6">Please log in to view your dashboard.</p>
        <Button asChild>
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl mb-2">
          Welcome, {localUser.fullName || localUser.username}!
        </h1>
        <p className="text-neutral-dark/70">
          Manage your profile and view your compatibility report.
        </p>
      </div>

      <Tabs
        defaultValue="profile"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="report">Compatibility Report</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Manage your account details and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <p className="rounded-lg border border-neutral-dark/10 p-2">{localUser.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="rounded-lg border border-neutral-dark/10 p-2">{localUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="rounded-lg border border-neutral-dark/10 p-2">{localUser.fullName || 'Not provided'}</p>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={handleEditProfileOpen}>Edit Profile</Button>
                  <Button 
                    variant="outline" 
                    className="text-red-500 hover:text-red-600"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Assessment Status</CardTitle>
              <CardDescription>
                Check the status of your compatibility assessment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isReportLoading ? (
                <div className="flex items-center justify-center h-20">
                  <div className="w-6 h-6 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
              ) : isReportError ? (
                <div className="space-y-4">
                  <p className="text-neutral-dark/80">
                    There was an error loading your assessment. This might be because:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>You haven't completed the assessment yet</li>
                    <li>Your session needs to be refreshed</li>
                  </ul>
                  <div className="flex space-x-3 mt-4">
                    <Button asChild>
                      <Link href="/quiz">Take Assessment</Link>
                    </Button>
                  </div>
                </div>
              ) : report ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className={`h-3 w-3 rounded-full ${report.compatibilityColor === 'green' ? 'bg-emerald-500' : report.compatibilityColor === 'yellow' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                    <span className="font-medium">{report.compatibilityColor.charAt(0).toUpperCase() + report.compatibilityColor.slice(1)} Compatibility Profile</span>
                  </div>
                  
                  <p className="text-neutral-dark/80">
                    You have completed the compatibility assessment.
                  </p>
                  
                  {report.isPaid ? (
                    <Button asChild>
                      <Link href="/report">View Full Report</Link>
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-amber-500">
                        Your report is ready, but it hasn't been unlocked yet.
                      </p>
                      <Button asChild>
                        <Link href="/payment">Unlock Full Report</Link>
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-neutral-dark/80">
                    You haven't taken the compatibility assessment yet.
                  </p>
                  <Button asChild>
                    <Link href="/quiz">Take Assessment</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="report" className="space-y-6">
          {isReportLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : isReportError ? (
            <Card>
              <CardHeader>
                <CardTitle>Error Loading Report</CardTitle>
                <CardDescription>
                  We couldn't load your compatibility report.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">This could be because:</p>
                <ul className="list-disc pl-5 mb-6 space-y-1">
                  <li>You haven't completed the assessment</li>
                  <li>There was a temporary server issue</li>
                  <li>Your session needs to be refreshed</li>
                </ul>
                <Button asChild>
                  <Link href="/quiz">Take Assessment</Link>
                </Button>
              </CardContent>
            </Card>
          ) : report ? (
            report.isPaid ? (
              <div className="space-y-6">
                <CompatibilityCard 
                  color={report.compatibilityColor as 'green' | 'yellow' | 'red'}
                  title={report.compatibilityColor === 'green' ? 'Adaptable & Balanced' : 
                        report.compatibilityColor === 'yellow' ? 'Selective & Specific' : 
                        'Particular & Defined'}
                  description="This is a summary of your compatibility profile based on the assessment you completed."
                  traits={[
                    { name: "Openness", value: 75 },
                    { name: "Emotional Stability", value: 68 },
                    { name: "Communication", value: 82 }
                  ]}
                />
                
                <Button asChild>
                  <Link href="/report">View Full Report</Link>
                </Button>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Unlock Your Full Report</CardTitle>
                  <CardDescription>
                    Your report is ready, but it needs to be unlocked.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <p className="mb-4">Based on your assessment, you have a <span className="font-medium">{report.compatibilityColor.charAt(0).toUpperCase() + report.compatibilityColor.slice(1)} Compatibility Profile</span>.</p>
                    <p>Unlock your full report to discover:</p>
                    <ul className="ml-6 mt-2 list-disc space-y-1">
                      <li>Detailed personality insights</li>
                      <li>Relationship strengths and challenges</li>
                      <li>Compatibility with different personality types</li>
                      <li>Personalized recommendations</li>
                    </ul>
                  </div>
                  
                  <Button asChild>
                    <Link href="/payment">Unlock Full Report for ₹999</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Report Found</CardTitle>
                <CardDescription>
                  You need to complete the assessment to generate your report.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">
                  Take our comprehensive compatibility assessment to discover your unique relationship patterns and preferences.
                </p>
                <Button asChild>
                  <Link href="/quiz">Start Assessment</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={editFullName}
                onChange={(e) => setEditFullName(e.target.value)}
                className="col-span-3"
                placeholder="Enter your full name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="col-span-3"
                placeholder="Enter your email address"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleUpdateProfile}
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending ? 'Updating...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboard;
