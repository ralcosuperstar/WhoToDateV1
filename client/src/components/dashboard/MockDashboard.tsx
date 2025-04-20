import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CompatibilityCard from "@/components/report/CompatibilityCard";
import { useToast } from "@/hooks/use-toast";

/**
 * This is a completely mocked dashboard component for development
 * that doesn't rely on any server-side API calls
 */
const MockDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editFullName, setEditFullName] = useState("Dev User");
  const [editEmail, setEditEmail] = useState("dev@example.com");
  const { toast } = useToast();
  
  // Mock report data
  const mockReport = {
    id: 1,
    createdAt: new Date(),
    userId: 1,
    quizId: 1,
    report: {
      summary: "This is a development mode report for testing purposes.",
      strengths: ["Communication", "Empathy", "Patience"],
      challenges: ["Adaptability", "Conflict Resolution"],
      recommendations: ["Practice active listening", "Learn to manage expectations"]
    },
    isPaid: true,
    compatibilityColor: "green" as "green" | "yellow" | "red"
  };

  // Handle opening the edit profile dialog
  const handleEditProfileOpen = () => {
    setIsEditProfileOpen(true);
  };

  // Handle fake profile update
  const handleUpdateProfile = () => {
    setIsEditProfileOpen(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated (mock update)",
    });
  };

  // Handle fake logout
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account (mock logout)",
    });
    
    // Navigate to home page
    window.location.href = "/";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl mb-2">
          Welcome, Dev User! (Development Mode)
        </h1>
        <p className="text-neutral-dark/70">
          This is a mock dashboard for development. No server API calls will be made.
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
                  <p className="rounded-lg border border-neutral-dark/10 p-2">devuser</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="rounded-lg border border-neutral-dark/10 p-2">dev@example.com</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="rounded-lg border border-neutral-dark/10 p-2">Dev User</p>
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
                
                <Button asChild>
                  <Link href="/report">View Full Report</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="report" className="space-y-6">
          <div className="space-y-6">
            <CompatibilityCard 
              color={mockReport.compatibilityColor}
              title="Adaptable & Balanced"
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
            <Button onClick={handleUpdateProfile}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MockDashboard;