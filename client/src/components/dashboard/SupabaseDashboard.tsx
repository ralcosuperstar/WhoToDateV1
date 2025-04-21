import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
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
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from "@/contexts/NewSupabaseContext";
import supabaseService from "@/services/supabaseService";

// Define types for clarity
interface UserProfile {
  id: string;
  username: string;
  email: string;
  full_name: string | null;
  phone_number: string | null;
}

interface QuizData {
  id: number;
  user_id: string;
  answers: any;
  completed: boolean;
  started_at: string | null;
  completed_at: string | null;
}

interface ReportData {
  id: number;
  user_id: string;
  quiz_id: number;
  report: any;
  compatibility_color: string;
  is_paid: boolean;
}

const SupabaseDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editFullName, setEditFullName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const { toast } = useToast();
  
  // Auth context
  const { user, signOut } = useSupabase();
  
  // Local state for data
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizData | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);
  
  // Loading states
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isQuizLoading, setIsQuizLoading] = useState(true);
  const [isReportLoading, setIsReportLoading] = useState(true);
  
  // Error states
  const [profileError, setProfileError] = useState<Error | null>(null);
  const [quizError, setQuizError] = useState<Error | null>(null);
  const [reportError, setReportError] = useState<Error | null>(null);
  
  // Fetch user profile from database
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setIsProfileLoading(false);
        return;
      }
      
      try {
        setIsProfileLoading(true);
        console.log('Fetching user profile for:', user.id);
        const { user: profile, error } = await supabaseService.user.getUserById(user.id);
        
        if (error) {
          console.error('Error fetching user profile:', error);
          setProfileError(error instanceof Error ? error : new Error(String(error)));
          
          // Fallback to basic profile from auth
          setUserProfile({
            id: user.id,
            username: user.email?.split('@')[0] || 'user',
            email: user.email || '',
            full_name: user.user_metadata?.full_name || null,
            phone_number: user.phone || null
          });
        } else if (profile) {
          console.log('User profile loaded:', profile);
          setUserProfile(profile as UserProfile);
        }
      } catch (error) {
        console.error('Error in fetchUserProfile:', error);
        setProfileError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsProfileLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [user]);
  
  // Fetch quiz answers
  useEffect(() => {
    const fetchQuizAnswers = async () => {
      if (!user) {
        setIsQuizLoading(false);
        return;
      }
      
      try {
        setIsQuizLoading(true);
        console.log('Fetching quiz answers for:', user.id);
        // Get Supabase client first
        const supabase = await supabaseService.auth.getClient();
        // Call the method correctly with supabase client and user ID
        const answers = await supabaseService.quiz.getQuizAnswers(supabase, user.id);
        
        console.log('Quiz answers loaded:', answers);
        if (answers) {
          setQuizAnswers(answers as QuizData);
        }
      } catch (error) {
        console.error('Error in fetchQuizAnswers:', error);
        setQuizError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsQuizLoading(false);
      }
    };
    
    fetchQuizAnswers();
  }, [user]);
  
  // Fetch report
  useEffect(() => {
    const fetchReport = async () => {
      if (!user) {
        setIsReportLoading(false);
        return;
      }
      
      try {
        setIsReportLoading(true);
        console.log('Fetching report for:', user.id);
        // Get Supabase client first
        const supabase = await supabaseService.auth.getClient();
        // Call the method correctly with supabase client and user ID
        const reportData = await supabaseService.report.getReport(supabase, user.id);
        
        console.log('Report loaded:', reportData);
        if (reportData) {
          setReport(reportData as ReportData);
        }
      } catch (error) {
        console.error('Error in fetchReport:', error);
        setReportError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsReportLoading(false);
      }
    };
    
    fetchReport();
  }, [user]);
  
  // Handle opening the edit profile dialog
  const handleEditProfileOpen = () => {
    if (userProfile) {
      setEditFullName(userProfile.full_name || '');
      setEditEmail(userProfile.email);
      setIsEditProfileOpen(true);
    }
  };
  
  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!user || !userProfile) return;
    
    try {
      console.log('Updating profile for:', user.id);
      const { user: updatedProfile, error } = await supabaseService.user.updateUserProfile(
        user.id,
        {
          full_name: editFullName,
          email: editEmail
        }
      );
      
      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Update failed",
          description: error.message || "There was a problem updating your profile",
          variant: "destructive",
        });
      } else {
        console.log('Profile updated:', updatedProfile);
        setUserProfile(updatedProfile as UserProfile);
        setIsEditProfileOpen(false);
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated",
        });
      }
    } catch (error) {
      console.error('Error in handleUpdateProfile:', error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile",
        variant: "destructive",
      });
    }
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
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
  
  // Show loading state
  if (isProfileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Show error state if user is not authenticated
  if (!user || !userProfile) {
    return (
      <div className="text-center py-12">
        <h2 className="font-heading font-bold text-xl mb-4">User not found</h2>
        <p className="mb-6">Please log in to view your dashboard.</p>
        <Button asChild>
          <Link href="/auth">Log In</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl mb-2">
          Welcome, {userProfile.full_name || userProfile.username}!
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
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-[#e83a8e]/10">
          <TabsTrigger 
            value="profile" 
            className="data-[state=active]:bg-[#e83a8e] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="report" 
            className="data-[state=active]:bg-[#e83a8e] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Compatibility Report
          </TabsTrigger>
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
                  <p className="rounded-lg border border-neutral-dark/10 p-2">{userProfile.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="rounded-lg border border-neutral-dark/10 p-2">{userProfile.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="rounded-lg border border-neutral-dark/10 p-2">{userProfile.full_name || 'Not provided'}</p>
                </div>
                
                <div className="flex gap-3 pt-4">
                  {/* Edit Profile functionality disabled due to Supabase trigger issues */}
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
              {isQuizLoading || isReportLoading ? (
                <div className="flex items-center justify-center h-20">
                  <div className="w-6 h-6 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
              ) : report ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className={`h-3 w-3 rounded-full ${
                      report.compatibility_color ? (
                        report.compatibility_color === 'green' ? 'bg-emerald-500' : 
                        report.compatibility_color === 'yellow' ? 'bg-amber-500' : 
                        'bg-red-500'
                      ) : 'bg-gray-500'
                    }`}></div>
                    <span className="font-medium">
                      {report.compatibility_color ? 
                        `${report.compatibility_color.charAt(0).toUpperCase()}${report.compatibility_color.slice(1)} Compatibility Profile` : 
                        'Compatibility Profile'
                      }
                    </span>
                  </div>
                  
                  <p className="text-neutral-dark/80">
                    You have completed the compatibility assessment.
                  </p>
                  
                  {/* All reports are now free, so we always show the button to view the report */}
                  <Button asChild className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white transition-colors">
                    <Link href="/report">View Full Report</Link>
                  </Button>
                </div>
              ) : quizAnswers?.completed ? (
                <div className="space-y-4">
                  <p className="text-neutral-dark/80">
                    You have completed the assessment, but your report is still being generated.
                  </p>
                  <Button asChild className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white transition-colors">
                    <Link href="/results">View Results</Link>
                  </Button>
                </div>
              ) : quizAnswers ? (
                <div className="space-y-4">
                  <p className="text-neutral-dark/80">
                    You have started the assessment but haven't completed it yet.
                  </p>
                  <Button asChild className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white transition-colors">
                    <Link href="/quiz">Continue Assessment</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-neutral-dark/80">
                    You haven't taken the compatibility assessment yet.
                  </p>
                  <Button asChild className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white transition-colors">
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
          ) : reportError ? (
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
            <div className="space-y-6">
              {/* All reports are now free, so we always show the compatibility card and report button */}
              <CompatibilityCard 
                color={(report.compatibility_color || 'yellow') as 'green' | 'yellow' | 'red'}
                title={
                  !report.compatibility_color ? 'Your Compatibility Profile' :
                  report.compatibility_color === 'green' ? 'Adaptable & Balanced' : 
                  report.compatibility_color === 'yellow' ? 'Selective & Specific' : 
                  'Particular & Defined'
                }
                description="This is a summary of your compatibility profile based on the assessment you completed."
                traits={[
                  { name: "Openness", value: 75 },
                  { name: "Emotional Stability", value: 68 },
                  { name: "Communication", value: 82 }
                ]}
              />
              
              <Button asChild className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white transition-colors">
                <Link href="/report">View Full Report</Link>
              </Button>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Report Available</CardTitle>
                <CardDescription>
                  You haven't completed the compatibility assessment yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">
                  Take our compatibility assessment to discover your unique relationship profile
                  and receive personalized insights.
                </p>
                <Button asChild>
                  <Link href="/quiz">Take Assessment</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Profile Dialog removed due to Supabase trigger issue */}

    </div>
  );
};

export default SupabaseDashboard;