import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CompatibilityCard from "@/components/report/CompatibilityCard";
import { User, Report } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient"; 
import { useToast } from "@/hooks/use-toast";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: user, isLoading: isUserLoading } = useQuery<User>({ 
    queryKey: ['/api/me']
  });

  const { data: report, isLoading: isReportLoading } = useQuery<Report>({ 
    queryKey: ['/api/report'],
    enabled: !!user
  });
  
  const logoutMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/logout'),
    onSuccess: () => {
      // Clear user data from cache
      queryClient.invalidateQueries({ queryKey: ['/api/me'] });
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      // Navigate to home page
      window.location.href = "/";
    },
    onError: () => {
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  });

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
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
          Welcome, {user.fullName || user.username}!
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
                  <p className="rounded-lg border border-neutral-dark/10 p-2">{user.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="rounded-lg border border-neutral-dark/10 p-2">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="rounded-lg border border-neutral-dark/10 p-2">{user.fullName || 'Not provided'}</p>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline">Edit Profile</Button>
                  <Button 
                    variant="outline" 
                    className="text-red-500 hover:text-red-600"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                  >
                    {logoutMutation.isPending ? 'Logging out...' : 'Log Out'}
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
    </div>
  );
};

export default UserDashboard;
