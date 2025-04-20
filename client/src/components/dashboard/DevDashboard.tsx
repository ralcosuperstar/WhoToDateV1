import { useState } from "react";
import { Link } from "wouter";
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
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from "@/contexts/SupabaseContext";

const DevDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editFullName, setEditFullName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const { toast } = useToast();
  const { user: supabaseUser, isLoading: isSupabaseLoading, signOut } = useSupabase();
  
  // Mock user data for development
  const mockUser = supabaseUser ? {
    username: supabaseUser.email?.split('@')[0] || 'user',
    email: supabaseUser.email || 'example@example.com',
    fullName: supabaseUser.user_metadata?.full_name || 'Development User',
  } : {
    username: 'devuser',
    email: 'dev@example.com',
    fullName: 'Development User',
  };
  
  // Mock report for development
  const mockReport = {
    id: 1,
    compatibilityColor: 'green',
    isPaid: true,
    report: {
      summary: "You have a balanced and adaptable personality profile",
      strengths: ["Strong communication", "Emotional stability", "Adaptability"],
      challenges: ["Occasional stubbornness", "Perfectionism"],
      recommendations: ["Practice active listening", "Be mindful of overcommitment"]
    }
  };
  
  // Handle opening the edit profile dialog
  const handleEditProfileOpen = () => {
    setEditFullName(mockUser.fullName);
    setEditEmail(mockUser.email);
    setIsEditProfileOpen(true);
  };

  // Mock update profile function
  const handleUpdateProfile = () => {
    // In a development environment, we just simulate success
    setTimeout(() => {
      setIsEditProfileOpen(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    }, 500);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
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

  if (isSupabaseLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!supabaseUser) {
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
          Welcome, {mockUser.fullName || mockUser.username}!
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
                  <p className="rounded-lg border border-neutral-dark/10 p-2">{mockUser.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="rounded-lg border border-neutral-dark/10 p-2">{mockUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="rounded-lg border border-neutral-dark/10 p-2">{mockUser.fullName || 'Not provided'}</p>
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
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  <span className="font-medium">Green Compatibility Profile</span>
                </div>
                
                <p className="text-neutral-dark/80">
                  You have completed the compatibility assessment.
                </p>
                
                {mockReport.isPaid ? (
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="report" className="space-y-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Green Compatibility Profile</CardTitle>
                <CardDescription>
                  You have a balanced and adaptable personality profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Personality Traits</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Openness</span>
                          <span>75%</span>
                        </div>
                        <div className="w-full bg-neutral-dark/10 rounded-full h-2.5">
                          <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Emotional Stability</span>
                          <span>68%</span>
                        </div>
                        <div className="w-full bg-neutral-dark/10 rounded-full h-2.5">
                          <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Communication</span>
                          <span>82%</span>
                        </div>
                        <div className="w-full bg-neutral-dark/10 rounded-full h-2.5">
                          <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Relationship Insights</CardTitle>
                <CardDescription>
                  Key strengths and challenges in your relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Strengths</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {mockReport.report.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Challenges</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {mockReport.report.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>
                  Personalized suggestions for relationship growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {mockReport.report.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
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
            <Button onClick={handleUpdateProfile}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DevDashboard;