import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useFixedSupabase } from "@/contexts/FixedSupabaseContext";
import supabaseService from "@/services/supabaseService";

// Import icons
import { 
  ChevronDown, 
  User, 
  FileText, 
  Calendar,
  BarChart3,
  Heart,
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
  MessageCircle,
  ChevronRight,
  ArrowRight,
  Clock3,
  Check,
  AlertTriangle
} from "lucide-react";

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

// New component for welcome banner
const WelcomeBanner = ({ name }: { name: string }) => (
  <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#e83a8e] to-[#e83a8e]/80 mb-6">
    <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-sm"></div>
    <div className="relative z-10 px-6 py-8 text-white">
      <h1 className="font-heading font-bold text-2xl sm:text-3xl mb-2">
        Welcome, {name}!
      </h1>
      <p className="text-white/90 max-w-lg">
        Your journey to better relationships starts here. Explore your profile, check your compatibility report, or connect with a relationship counselor.
      </p>
    </div>
  </div>
);

// Quick Actions component
const QuickActions = ({ hasCompletedQuiz, hasReport }: { hasCompletedQuiz: boolean, hasReport: boolean }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
    {!hasCompletedQuiz && (
      <Card className="border-2 border-[#e83a8e]/30 bg-[#e83a8e]/5 hover:bg-[#e83a8e]/10 transition-colors">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="bg-[#e83a8e]/10 w-10 h-10 rounded-full flex items-center justify-center mb-3 mt-2">
            <FileText className="w-5 h-5 text-[#e83a8e]" />
          </div>
          <h3 className="font-medium mb-1">Take Compatibility Quiz</h3>
          <p className="text-sm text-neutral-dark/70 mb-3">Discover your relationship profile in 5 minutes</p>
          <Button asChild className="mt-auto w-full bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
            <Link href="/quiz">Start Quiz</Link>
          </Button>
        </CardContent>
      </Card>
    )}

    {hasCompletedQuiz && hasReport && (
      <Card className="border-2 border-[#e83a8e]/30 bg-[#e83a8e]/5 hover:bg-[#e83a8e]/10 transition-colors">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="bg-[#e83a8e]/10 w-10 h-10 rounded-full flex items-center justify-center mb-3 mt-2">
            <BarChart3 className="w-5 h-5 text-[#e83a8e]" />
          </div>
          <h3 className="font-medium mb-1">View Full Report</h3>
          <p className="text-sm text-neutral-dark/70 mb-3">Explore your detailed compatibility insights</p>
          <Button asChild className="mt-auto w-full bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
            <Link href="/report">View Report</Link>
          </Button>
        </CardContent>
      </Card>
    )}

    <Card className="hover:bg-neutral-dark/5 transition-colors">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-3 mt-2">
          <MessageCircle className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="font-medium mb-1">Talk to a Counselor</h3>
        <p className="text-sm text-neutral-dark/70 mb-3">Connect with relationship professionals</p>
        <Button asChild variant="outline" className="mt-auto w-full">
          <Link href="/counselling">Learn More</Link>
        </Button>
      </CardContent>
    </Card>

    <Card className="hover:bg-neutral-dark/5 transition-colors">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center mb-3 mt-2">
          <Calendar className="w-5 h-5 text-amber-600" />
        </div>
        <h3 className="font-medium mb-1">Compatibility Tips</h3>
        <p className="text-sm text-neutral-dark/70 mb-3">Practical tips based on your profile</p>
        <Button asChild variant="outline" className="mt-auto w-full">
          <Link href="/blog">Read Tips</Link>
        </Button>
      </CardContent>
    </Card>
  </div>
);

// Progress Card component
const ProgressCard = ({ quizAnswers, report }: { quizAnswers: QuizData | null, report: ReportData | null }) => {
  // Calculate progress status
  const quizCompleted = quizAnswers?.completed || false;
  const reportGenerated = report !== null;
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Clock3 className="w-5 h-5 mr-2 text-[#e83a8e]" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${quizCompleted ? 'bg-green-100' : 'bg-neutral-dark/10'}`}>
                {quizCompleted ? <Check className="w-4 h-4 text-green-600" /> : <span className="text-sm">1</span>}
              </div>
              <div>
                <p className="font-medium">Take Compatibility Quiz</p>
                <p className="text-sm text-neutral-dark/70">{quizCompleted ? 'Completed' : 'Pending'}</p>
              </div>
            </div>
            {!quizCompleted && (
              <Button asChild size="sm" className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
                <Link href="/quiz">Start</Link>
              </Button>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${reportGenerated ? 'bg-green-100' : 'bg-neutral-dark/10'}`}>
                {reportGenerated ? <Check className="w-4 h-4 text-green-600" /> : <span className="text-sm">2</span>}
              </div>
              <div>
                <p className="font-medium">Generate Report</p>
                <p className="text-sm text-neutral-dark/70">{reportGenerated ? 'Generated' : quizCompleted ? 'Ready' : 'Take quiz first'}</p>
              </div>
            </div>
            {quizCompleted && !reportGenerated && (
              <Button asChild size="sm" className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
                <Link href="/results">Generate</Link>
              </Button>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-neutral-dark/10">
                <span className="text-sm">3</span>
              </div>
              <div>
                <p className="font-medium">Get Personalized Advice</p>
                <p className="text-sm text-neutral-dark/70">{reportGenerated ? 'Available' : 'After report'}</p>
              </div>
            </div>
            {reportGenerated && (
              <Button asChild size="sm" variant="outline">
                <Link href="/counselling">Explore</Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Profile summary component
const ProfileSummary = ({ profile }: { profile: UserProfile }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-lg flex items-center">
        <User className="w-5 h-5 mr-2 text-[#e83a8e]" />
        Profile Summary
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        <Avatar className="w-16 h-16 border-2 border-[#e83a8e]/20">
          <AvatarFallback className="bg-[#e83a8e]/10 text-[#e83a8e] text-lg font-medium">
            {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : profile.email.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-medium mb-1">{profile.full_name || profile.username}</h3>
          <p className="text-sm text-neutral-dark/70 mb-2">{profile.email}</p>
          {profile.phone_number && (
            <p className="text-sm text-neutral-dark/70">{profile.phone_number}</p>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge variant="outline" className="bg-[#e83a8e]/5 text-[#e83a8e]">Profile Active</Badge>
        <Badge variant="outline" className="bg-blue-50 text-blue-600">Email Verified</Badge>
      </div>
    </CardContent>
    <CardFooter className="flex justify-end pt-0">
      <Button variant="ghost" size="sm" className="text-sm text-[#e83a8e]">
        Edit Profile
      </Button>
    </CardFooter>
  </Card>
);

// Mobile navigation menu
const MobileNavMenu = ({ 
  activeTab,
  setActiveTab,
  handleLogout
}: {
  activeTab: string,
  setActiveTab: (tab: string) => void,
  handleLogout: () => void
}) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" className="md:hidden p-2">
        <Menu className="h-6 w-6" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-[80%] sm:w-[350px]">
      <SheetHeader className="mb-6">
        <SheetTitle className="flex items-center text-[#e83a8e]">
          <Heart className="w-5 h-5 mr-2 fill-[#e83a8e]" />
          WhoToDate
        </SheetTitle>
        <SheetDescription>
          Discover your compatibility profile
        </SheetDescription>
      </SheetHeader>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <nav className="space-y-1 pr-4">
          <Button
            variant={activeTab === "overview" ? "secondary" : "ghost"}
            className="w-full justify-start h-auto py-2.5"
            onClick={() => setActiveTab("overview")}
          >
            <BarChart3 className="min-w-5 h-5 mr-2" />
            <span className="text-sm whitespace-normal text-left">Overview</span>
          </Button>
          <Button
            variant={activeTab === "profile" ? "secondary" : "ghost"}
            className="w-full justify-start h-auto py-2.5"
            onClick={() => setActiveTab("profile")}
          >
            <User className="min-w-5 h-5 mr-2" />
            <span className="text-sm whitespace-normal text-left">Profile</span>
          </Button>
          <Button
            variant={activeTab === "report" ? "secondary" : "ghost"}
            className="w-full justify-start h-auto py-2.5"
            onClick={() => setActiveTab("report")}
          >
            <FileText className="min-w-5 h-5 mr-2" />
            <span className="text-sm whitespace-normal text-left">Compatibility Report</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start h-auto py-2.5"
            asChild
          >
            <Link href="/counselling">
              <MessageCircle className="min-w-5 h-5 mr-2" />
              <span className="text-sm whitespace-normal text-left">Talk to a Counselor</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start h-auto py-2.5"
            asChild
          >
            <Link href="/blog">
              <Calendar className="min-w-5 h-5 mr-2" />
              <span className="text-sm whitespace-normal text-left">Relationship Tips</span>
            </Link>
          </Button>
        </nav>
      </ScrollArea>
      <div className="absolute bottom-4 left-4 right-4">
        <Button 
          variant="destructive" 
          className="w-full justify-start h-auto py-2.5"
          onClick={handleLogout}
        >
          <LogOut className="min-w-5 h-5 mr-2" />
          <span className="text-sm whitespace-normal text-left">Log Out</span>
        </Button>
      </div>
    </SheetContent>
  </Sheet>
);

// Compatibility card summary component
const CompatibilitySummaryCard = ({ report }: { report: ReportData }) => {
  const color = report.compatibility_color || 'yellow';
  
  const title = !report.compatibility_color ? 'Your Compatibility Profile' :
                report.compatibility_color === 'green' ? 'Adaptable & Balanced' : 
                report.compatibility_color === 'yellow' ? 'Selective & Specific' : 
                'Particular & Defined';
  
  const traits = [
    { name: "Openness", value: 75 },
    { name: "Emotional Stability", value: 68 },
    { name: "Communication", value: 82 }
  ];
  
  const getColorClass = () => {
    switch(color) {
      case 'green': return 'bg-gradient-to-r from-emerald-500 to-teal-500';
      case 'red': return 'bg-gradient-to-r from-rose-500 to-pink-500';
      default: return 'bg-gradient-to-r from-amber-500 to-yellow-500';
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <div className={`${getColorClass()} px-6 py-4 text-white`}>
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-white/90 text-sm">Your compatibility profile is ready</p>
      </div>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {traits.map((trait) => (
            <div key={trait.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{trait.name}</span>
                <span className="font-medium">{trait.value}%</span>
              </div>
              <div className="w-full bg-neutral-dark/10 rounded-full h-2">
                <div 
                  className="bg-[#e83a8e] h-2 rounded-full" 
                  style={{ width: `${trait.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          asChild 
          className="w-full mt-6 bg-[#e83a8e] hover:bg-[#d02e7d] text-white"
        >
          <Link href="/results">
            View Full Report <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

// Enhanced Dashboard component
const EnhancedDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  // Auth context - use fixed Supabase context
  const { user, signOut } = useFixedSupabase();
  
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
  
  // Add a timeout to prevent infinite loading
  useEffect(() => {
    // Check if we're still loading after 5 seconds
    const timeout = setTimeout(() => {
      if (isProfileLoading) {
        console.log('Dashboard: Profile loading timeout reached');
        setIsProfileLoading(false);
        
        // Set fallback data from auth user if available
        if (user) {
          setUserProfile({
            id: user.id,
            username: user.email?.split('@')[0] || 'user',
            email: user.email || '',
            full_name: user.user_metadata?.full_name || null,
            phone_number: user.phone || null
          });
        }
      }
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [isProfileLoading, user]);

  // Fetch user profile from database
  useEffect(() => {
    const fetchUserProfile = async () => {
      // If no user, or if profile is already loaded, exit early
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
          // Safely convert the profile data to UserProfile type
          const safeProfile = {
            id: typeof profile.id === 'string' ? profile.id : user.id || '',
            username: typeof profile.username === 'string' ? profile.username : 
                      (typeof profile.email === 'string' ? profile.email.split('@')[0] : 
                      (typeof user.email === 'string' ? user.email.split('@')[0] : 'user')),
            email: typeof profile.email === 'string' ? profile.email : user.email || '',
            full_name: typeof profile.full_name === 'string' ? profile.full_name : 
                      (user.user_metadata && typeof user.user_metadata.full_name === 'string' ? 
                      user.user_metadata.full_name : null),
            phone_number: typeof profile.phone_number === 'string' ? profile.phone_number : 
                         (typeof user.phone === 'string' ? user.phone : null)
          };
          setUserProfile(safeProfile);
        }
      } catch (error) {
        console.error('Error in fetchUserProfile:', error);
        setProfileError(error instanceof Error ? error : new Error(String(error)));
        
        // Still set a fallback profile on error
        if (user) {
          setUserProfile({
            id: user.id,
            username: user.email?.split('@')[0] || 'user',
            email: user.email || '',
            full_name: user.user_metadata?.full_name || null,
            phone_number: user.phone || null
          });
        }
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
          // Convert the quiz answers to the expected format
          setQuizAnswers({
            id: answers.id || 0,
            user_id: answers.userId || user.id,
            answers: answers.answers || {},
            completed: answers.completed || false,
            started_at: answers.startedAt ? answers.startedAt.toString() : null,
            completed_at: answers.completedAt ? answers.completedAt.toString() : null
          });
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
          // Safely convert report data to expected format
          setReport({
            id: reportData.id || 0,
            user_id: reportData.userId || user.id,
            quiz_id: reportData.quizId || 0,
            report: reportData.report || {},
            compatibility_color: reportData.compatibilityColor || 'yellow',
            is_paid: reportData.isPaid || true // Reports are now free
          });
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
  
  // Handle logout
  const handleLogout = async () => {
    try {
      console.log("Dashboard: Starting logout process");
      
      // Show toast first for immediate feedback
      toast({
        title: "Logging out...",
        description: "Please wait while we log you out",
      });
      
      // Clear any local storage/cookies
      localStorage.removeItem("supabase.auth.token");
      localStorage.removeItem("supabase.auth.expires_at");
      
      // Clear any session cookies
      document.cookie = "sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Call the signOut method
      await signOut();
      
      console.log("Dashboard: Logout completed successfully");
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      
      // Use replace to force a clean page load without keeping history
      setTimeout(() => {
        window.location.replace("/");
      }, 300);
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
      
      // Even if there's an error, try to navigate home
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    }
  };
  
  // Show loading state
  if (isProfileLoading || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#e83a8e]/30 border-t-[#e83a8e] rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Show error state if user is not authenticated
  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="font-heading font-bold text-xl mb-4">User not found</h2>
        <p className="mb-6">Please log in to view your dashboard.</p>
        <Button asChild className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
          <Link href="/auth">Log In</Link>
        </Button>
      </div>
    );
  }
  
  // Derived state for UI decisions
  const hasCompletedQuiz = quizAnswers?.completed || false;
  const hasReport = report !== null;
  
  // Helper function to get display name
  const getDisplayName = () => {
    return userProfile.full_name || userProfile.username || userProfile.email.split('@')[0];
  };
  
  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      {/* Mobile navigation header */}
      <div className="flex justify-between items-center mb-6 md:hidden">
        <h1 className="font-heading font-bold text-xl flex items-center">
          <Heart className="w-5 h-5 mr-2 fill-[#e83a8e] text-[#e83a8e]" />
          <span className="text-[#e83a8e]">WhoToDate</span>
        </h1>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#e83a8e]/10 text-[#e83a8e]">
                    {userProfile.full_name ? userProfile.full_name.charAt(0).toUpperCase() : userProfile.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/results">My Report</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <MobileNavMenu 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleLogout={handleLogout}
          />
        </div>
      </div>
      
      {/* Desktop layout with sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar - Desktop only */}
        <div className="hidden md:block md:col-span-3 lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-24">
            <div className="mb-6">
              <h3 className="font-heading font-bold text-lg flex items-center text-[#e83a8e]">
                <Heart className="w-5 h-5 mr-2 fill-[#e83a8e]" />
                WhoToDate
              </h3>
            </div>
            
            <nav className="space-y-1 mb-6">
              <Button
                variant={activeTab === "overview" ? "secondary" : "ghost"}
                className="w-full justify-start h-auto py-2.5"
                onClick={() => setActiveTab("overview")}
              >
                <BarChart3 className="min-w-5 h-5 mr-2" />
                <span className="text-sm whitespace-normal text-left">Overview</span>
              </Button>
              <Button
                variant={activeTab === "profile" ? "secondary" : "ghost"}
                className="w-full justify-start h-auto py-2.5"
                onClick={() => setActiveTab("profile")}
              >
                <User className="min-w-5 h-5 mr-2" />
                <span className="text-sm whitespace-normal text-left">Profile</span>
              </Button>
              <Button
                variant={activeTab === "report" ? "secondary" : "ghost"}
                className="w-full justify-start h-auto py-2.5"
                onClick={() => setActiveTab("report")}
              >
                <FileText className="min-w-5 h-5 mr-2" />
                <span className="text-sm whitespace-normal text-left">Compatibility Report</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-auto py-2.5"
                asChild
              >
                <Link href="/counselling">
                  <MessageCircle className="min-w-5 h-5 mr-2" />
                  <span className="text-sm whitespace-normal text-left">Talk to a Counselor</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-auto py-2.5"
                asChild
              >
                <Link href="/blog">
                  <Calendar className="min-w-5 h-5 mr-2" />
                  <span className="text-sm whitespace-normal text-left">Relationship Tips</span>
                </Link>
              </Button>
            </nav>
            
            <div className="pt-4 border-t">
              <Button 
                variant="destructive" 
                className="w-full justify-start h-auto py-2.5"
                onClick={handleLogout}
              >
                <LogOut className="min-w-5 h-5 mr-2" />
                <span className="text-sm whitespace-normal text-left">Log Out</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="md:col-span-9 lg:col-span-10">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <WelcomeBanner name={getDisplayName()} />
              
              <QuickActions 
                hasCompletedQuiz={hasCompletedQuiz}
                hasReport={hasReport}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProgressCard 
                  quizAnswers={quizAnswers}
                  report={report}
                />
                
                {/* If report exists, show compatibility summary */}
                {hasReport && report ? (
                  <CompatibilitySummaryCard report={report} />
                ) : (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-[#e83a8e]" />
                        Unlock Your Compatibility Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        Complete your compatibility assessment to reveal your unique relationship style and receive personalized insights.
                      </p>
                      
                      {!hasCompletedQuiz ? (
                        <Button asChild className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white w-full">
                          <Link href="/quiz">
                            Take 5-Minute Quiz <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Button 
                          className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white w-full"
                          onClick={() => {
                            toast({
                              title: "Generating report...",
                              description: "Please wait while we prepare your report"
                            });
                            setTimeout(() => {
                              window.location.href = "/results";
                            }, 500);
                          }}
                        >
                          Generate Report <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
          
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4">
                Your Profile
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProfileSummary profile={userProfile} />
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-[#e83a8e]" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-neutral-dark/70">Receive updates and tips</p>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <h4 className="font-medium">Password</h4>
                        <p className="text-sm text-neutral-dark/70">Update your password</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium">Delete Account</h4>
                        <p className="text-sm text-neutral-dark/70">Remove all your data</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-[#e83a8e]" />
                    Assessment History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {hasCompletedQuiz ? (
                    <div className="border rounded-lg divide-y">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
                        <div>
                          <h4 className="font-medium">Compatibility Assessment</h4>
                          <p className="text-sm text-neutral-dark/70">
                            Completed on {quizAnswers?.completed_at ? new Date(quizAnswers.completed_at).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center">
                          <Badge className="bg-green-100 text-green-800 mr-3">Completed</Badge>
                          <Button asChild variant="ghost" size="sm" className="text-[#e83a8e]">
                            <Link href="/quiz">Review</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="mb-3 text-neutral-dark/70">
                        <Calendar className="w-10 h-10 mx-auto mb-2" />
                        <p>No assessments completed yet</p>
                      </div>
                      <Button asChild className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
                        <Link href="/quiz">Take Assessment</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Report Tab */}
          {activeTab === "report" && (
            <div className="space-y-6">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4">
                Compatibility Report
              </h2>
              
              {isReportLoading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="w-8 h-8 border-4 border-[#e83a8e]/30 border-t-[#e83a8e] rounded-full animate-spin"></div>
                </div>
              ) : reportError ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                      Error Loading Report
                    </CardTitle>
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
                    <Button asChild className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
                      <Link href="/quiz">Take Assessment</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : report ? (
                <div className="space-y-6">
                  {/* All reports are now free, so we always show the compatibility card and report button */}
                  <Card className="overflow-hidden">
                    <div className={`${
                      report.compatibility_color === 'green' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                      report.compatibility_color === 'red' ? 'bg-gradient-to-r from-rose-500 to-pink-500' :
                      'bg-gradient-to-r from-amber-500 to-yellow-500'
                    } px-6 py-8 text-white`}>
                      <h3 className="font-bold text-2xl mb-2">{
                        !report.compatibility_color ? 'Your Compatibility Profile' :
                        report.compatibility_color === 'green' ? 'Adaptable & Balanced' : 
                        report.compatibility_color === 'yellow' ? 'Selective & Specific' : 
                        'Particular & Defined'
                      }</h3>
                      <p className="text-white/90">
                        This is a summary of your compatibility profile based on the assessment you completed.
                      </p>
                    </div>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">Key Compatibility Traits</h4>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Openness</span>
                                <span className="font-medium">75%</span>
                              </div>
                              <div className="w-full bg-neutral-dark/10 rounded-full h-2">
                                <div 
                                  className="bg-[#e83a8e] h-2 rounded-full" 
                                  style={{ width: '75%' }}
                                ></div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Emotional Stability</span>
                                <span className="font-medium">68%</span>
                              </div>
                              <div className="w-full bg-neutral-dark/10 rounded-full h-2">
                                <div 
                                  className="bg-[#e83a8e] h-2 rounded-full" 
                                  style={{ width: '68%' }}
                                ></div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Communication</span>
                                <span className="font-medium">82%</span>
                              </div>
                              <div className="w-full bg-neutral-dark/10 rounded-full h-2">
                                <div 
                                  className="bg-[#e83a8e] h-2 rounded-full" 
                                  style={{ width: '82%' }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Button asChild className="w-full bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
                          <Link href="/results">
                            View Full Detailed Report <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Relationship Style</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-neutral-dark/80">
                          Your attachment style influences how you connect with partners.
                        </p>
                        <Button asChild variant="link" className="px-0 text-[#e83a8e]">
                          <Link href="/results">Learn more</Link>
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Communication Pattern</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-neutral-dark/80">
                          Your unique way of expressing needs and resolving conflicts.
                        </p>
                        <Button asChild variant="link" className="px-0 text-[#e83a8e]">
                          <Link href="/results">Learn more</Link>
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Growth Areas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-neutral-dark/80">
                          Opportunities to enhance your relationship satisfaction.
                        </p>
                        <Button asChild variant="link" className="px-0 text-[#e83a8e]">
                          <Link href="/results">Learn more</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
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
                    <Button asChild className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
                      <Link href="/quiz">Take Assessment</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;