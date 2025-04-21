import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Helmet } from "react-helmet";
import { calculateCompatibilityProfile, generateProfilePreview, type CompatibilityProfile } from "@/lib/compatibilityAnalysis";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { reportService, quizService, userService, authService } from "@/services/supabaseService";
import { useFixedSupabase } from "@/contexts/FixedSupabaseContext";
import { 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Share2,
  Users,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import FullReportView from "@/components/reports/FullReportView";
import { downloadPDFReport } from "@/lib/pdfGenerator";

const ResultsPreview = ({ profile, onGetFullReport }: { 
  profile: CompatibilityProfile; 
  onGetFullReport: () => void;
}) => {
  // Generate preview data from full profile
  const previewData = generateProfilePreview(profile);
  const colorClass = profile.overallColor === 'green' 
    ? 'bg-green-50 text-green-800 border-green-200' 
    : profile.overallColor === 'yellow' 
      ? 'bg-yellow-50 text-yellow-800 border-yellow-200' 
      : 'bg-red-50 text-red-800 border-red-200';

  const colorIcon = profile.overallColor === 'green' 
    ? <CheckCircle2 className="h-5 w-5 text-green-500" /> 
    : profile.overallColor === 'yellow' 
      ? <AlertTriangle className="h-5 w-5 text-yellow-500" /> 
      : <XCircle className="h-5 w-5 text-red-500" />;

  return (
    <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-dark mb-2">
            Your Compatibility Profile
          </h1>
          <p className="text-neutral-dark/70">
            Here's a preview of your compatibility profile
          </p>
        </div>
        
        <div className={`mb-6 p-4 rounded-md border ${colorClass} flex items-center`}>
          {colorIcon}
          <span className="ml-2 font-medium">
            {profile.overallColor === 'green' 
              ? 'High Compatibility' 
              : profile.overallColor === 'yellow' 
                ? 'Medium Compatibility' 
                : 'Challenging Compatibility'}
          </span>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-neutral-dark mb-2">
              Attachment Style
            </h3>
            <p className="text-neutral-dark/70">
              {profile.attachmentStyle}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-neutral-dark mb-2">
              Personality Style
            </h3>
            <p className="text-neutral-dark/70">
              {profile.mbtiStyle}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-neutral-dark mb-2">
              Top Strengths
            </h3>
            <ul className="list-disc pl-5 text-neutral-dark/70 space-y-1">
              {profile.strengthsWeaknesses.strengths.slice(0, 2).map((strength, i) => (
                <li key={i}>{strength}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-8 text-center space-y-4">
          <button
            onClick={onGetFullReport}
            className="py-3 px-6 w-full bg-primary text-white font-medium rounded-lg flex items-center justify-center"
          >
            View Full Report
          </button>
          
          <Link href="/quiz" className="text-center text-neutral-dark/70 text-sm hover:underline">
            Retake Assessment
          </Link>
        </div>
      </div>
    </div>
  );
};

const FixedResults = () => {
  // Initialize hooks first
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClientInstance = useQueryClient();
  
  // State hooks
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [profile, setProfile] = useState<CompatibilityProfile | null>(null);
  const [isPremiumReportVisible, setIsPremiumReportVisible] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  // Authentication
  const { user: supabaseUser, isLoading: isUserLoading } = useFixedSupabase();
  const isUserError = !supabaseUser && !isUserLoading;
  
  // Debug authentication - only in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.debug("Auth state in FixedResults:", { 
        supabaseUser: !!supabaseUser, 
        id: supabaseUser?.id,
        isUserLoading 
      });
    }
  }, [supabaseUser, isUserLoading]);
  
  // Get database user
  const { 
    data: dbUser, 
    isLoading: isDbUserLoading, 
    error: dbUserError
  } = useQuery({
    queryKey: ['dbUser', supabaseUser?.id],
    queryFn: async () => {
      if (!supabaseUser?.email) throw new Error('User email not available');
      const client = await authService.getClient();
      return userService.getUserByEmail(client, supabaseUser.email);
    },
    enabled: !!supabaseUser?.email,
    refetchOnWindowFocus: false,
    retry: 2
  });
  
  // Get quiz answers
  const { 
    data: existingQuiz, 
    isLoading: isQuizLoading,
    error: quizError,
    refetch: refetchQuiz
  } = useQuery({
    queryKey: ['quiz', dbUser?.id],
    queryFn: async () => {
      if (!dbUser?.id) throw new Error('Database user ID not available');
      const client = await authService.getClient();
      return quizService.getQuizByUserId(client, dbUser.id);
    },
    enabled: !!dbUser?.id,
    retry: 2,
    refetchOnWindowFocus: false
  });
  
  // Get report if it exists
  const { 
    data: report, 
    isLoading: isReportLoading, 
    isError: isReportError,
    refetch: refetchReport
  } = useQuery({
    queryKey: ['report', dbUser?.id],
    queryFn: async () => {
      if (!dbUser?.id) throw new Error('Database user ID not available');
      const client = await authService.getClient();
      return reportService.getReportByUserId(client, dbUser.id);
    },
    enabled: !!dbUser?.id,
    refetchOnWindowFocus: false,
    retry: 2
  });
  
  // Mutation to create report
  const createReportMutation = useMutation({
    mutationFn: async (data: { 
      quizId: number;
      report: CompatibilityProfile; 
      compatibilityColor: string;
      isPaid: boolean;
    }) => {
      setIsGeneratingReport(true);
      const isDev = process.env.NODE_ENV === 'development';
      
      try {
        if (!supabaseUser) {
          throw new Error('User not authenticated');
        }
        
        const client = await authService.getClient();
        const dbUser = await userService.getUserByEmail(client, supabaseUser.email || '');
        
        if (!dbUser || !dbUser.id) {
          throw new Error('Unable to find database user ID');
        }
        
        const userId = dbUser.id;
        
        const report = await reportService.createReport(client, {
          userId,
          quizId: data.quizId,
          report: data.report,
          compatibilityColor: data.compatibilityColor,
          isPaid: data.isPaid
        });
        
        return report;
      } catch (error) {
        console.error("Report creation failed:", error);
        throw error;
      } finally {
        setIsGeneratingReport(false);
      }
    },
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['report'] });
      toast({
        title: "Success!",
        description: "Your compatibility report has been created."
      });
      
      // Refresh the report data
      refetchReport();
    },
    onError: (error) => {
      console.error("Report creation error:", error);
      toast({
        title: "Error",
        description: "Failed to create your report. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Check if we're in a loading state
  const isLoading = isUserLoading || isDbUserLoading || isQuizLoading || isReportLoading || isGeneratingReport;
  
  // Load answers from session storage
  useEffect(() => {
    const savedAnswers = sessionStorage.getItem('quizAnswers');
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        setAnswers(parsedAnswers);
      } catch (e) {
        console.error('Failed to parse saved answers', e);
        navigate('/quiz');
      }
    } else if (!supabaseUser) {
      navigate('/quiz');
    }
  }, [navigate, supabaseUser]);
  
  // Try loading compatibility profile from session storage - this runs once
  useEffect(() => {
    // Skip if we already have a profile, or if we don't have any answers
    if (profile || Object.keys(answers).length === 0) return;
    
    const savedProfile = sessionStorage.getItem('compatibilityProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
      } catch (e) {
        console.error('Failed to parse saved profile from session storage', e);
      }
    }
  }, []); // Empty dependency array to run only once on mount 
  
  // Generate profile from report or answers
  useEffect(() => {
    // Skip if we already have a profile
    if (profile) return;
    
    const isDev = process.env.NODE_ENV === 'development';
    
    if (isDev) {
      console.debug("Processing report/quiz data for profile generation");
      console.debug("Data available:", { 
        report: !!report, 
        quiz: !!existingQuiz,
        answers: Object.keys(answers).length > 0
      });
    }
    
    // If we have a report, use it
    if (report && report.report) {
      if (isDev) console.debug("Using existing report for profile");
      // Type assertion to ensure TypeScript knows this is a CompatibilityProfile
      setProfile(report.report as CompatibilityProfile);
      return;
    }
    
    // If we have quiz answers from database but no answers in state, use them
    if (existingQuiz && !report) {
      if (isDev) console.debug("Using quiz answers from database");
      try {
        // Cast to any to access its properties
        const quizData = existingQuiz as any;
        
        if (quizData.answers && typeof quizData.answers === 'object') {
          // Convert to proper format
          const quizAnswers: Record<number, number> = {};
          
          Object.entries(quizData.answers).forEach(([key, value]) => {
            const questionNumber = parseInt(key, 10);
            const answerValue = typeof value === 'number' ? value : 0;
            
            if (!isNaN(questionNumber)) {
              quizAnswers[questionNumber] = answerValue;
            }
          });
          
          // If we have valid quiz answers, generate a profile
          if (Object.keys(quizAnswers).length > 0) {
            if (isDev) console.debug("Generating profile from quiz answers");
            setAnswers(quizAnswers);
            const compatibilityProfile = calculateCompatibilityProfile(quizAnswers);
            setProfile(compatibilityProfile);
            
            // Create a report using these answers
            if (supabaseUser && dbUser && quizData.id) {
              if (isDev) console.debug("Creating report from quiz answers");
              createReportMutation.mutate({
                quizId: quizData.id,
                report: compatibilityProfile,
                compatibilityColor: compatibilityProfile.overallColor,
                isPaid: true
              });
            }
            
            return;
          }
        }
      } catch (error) {
        console.error("Error processing quiz answers:", error);
      }
    }
    
    // If we have answers in state, generate a profile
    if (Object.keys(answers).length > 0 && !profile) {
      if (isDev) console.debug("Generating profile from answers in state");
      try {
        const compatibilityProfile = calculateCompatibilityProfile(answers);
        
        // Save to session storage as backup
        sessionStorage.setItem('compatibilityProfile', JSON.stringify(compatibilityProfile));
        setProfile(compatibilityProfile);
        
        // Create a report if we have quiz data
        if (existingQuiz && dbUser && supabaseUser) {
          const quizData = existingQuiz as any;
          if (quizData.id) {
            if (isDev) console.debug("Creating report from session answers");
            createReportMutation.mutate({
              quizId: quizData.id,
              report: compatibilityProfile,
              compatibilityColor: compatibilityProfile.overallColor,
              isPaid: true
            });
          }
        }
      } catch (error) {
        console.error("Error generating profile from answers:", error);
        toast({
          title: "Error",
          description: "We couldn't generate your profile. Please try again.",
          variant: "destructive"
        });
      }
    }
  }, [report, existingQuiz, answers, dbUser, supabaseUser, createReportMutation, toast, profile]);
  
  // Show full report when profile is available
  useEffect(() => {
    if (profile) {
      setIsPremiumReportVisible(true);
    }
  }, [profile]);
  
  // Track loading time for UI
  useEffect(() => {
    if (!profile && !isGeneratingReport) {
      const timer = setTimeout(() => {
        setLoadingTime(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [profile, loadingTime, isGeneratingReport]);
  
  // Function to show full report (kept for backward compatibility)
  const handleGetFullReport = () => {
    setIsPremiumReportVisible(true);
  };
  
  // Handle retry loading
  const handleRetry = () => {
    // Refetch all data
    if (dbUser?.id) {
      refetchQuiz();
      refetchReport();
    }
    
    // Reset loading time
    setLoadingTime(0);
    
    toast({
      title: "Refreshing",
      description: "Getting the latest data..."
    });
  };
  
  // Redirect if not authenticated
  useEffect(() => {
    if (isUserError) {
      toast({
        title: "Login Required",
        description: "Please log in to view your report",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [isUserError, toast, navigate]);
  
  // Only show authentication loading if it's still loading
  // This change allows the component to proceed to the next step if auth is available
  if (isUserLoading && !supabaseUser) {
    if (process.env.NODE_ENV === 'development') {
      console.debug("Waiting for authentication to complete...");
    }
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-dark/70">Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // If user is not authenticated, don't show anything (redirect happens in effect)
  if (isUserError) {
    return null;
  }
  
  // If no profile yet, show loading with options to retry
  if (!profile) {
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col items-center justify-center py-12">
            {/* Show loading spinner */}
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-dark/70 mb-2">
              {isGeneratingReport ? "Generating your report..." : "Analyzing your responses..."}
            </p>
            
            {/* If taking too long, show retry options */}
            {loadingTime > 1 && !isGeneratingReport && (
              <div className="mt-8 p-5 border border-neutral-200 rounded-lg bg-white w-full max-w-md">
                <h3 className="text-lg font-medium text-neutral-dark mb-2">Taking longer than expected?</h3>
                <p className="text-neutral-dark/70 mb-4">Your report might need to be generated for the first time. Here are some options:</p>
                
                <div className="space-y-3">
                  <button
                    onClick={handleRetry}
                    disabled={isLoading}
                    className="py-2 px-4 bg-primary text-white font-medium rounded-lg flex items-center justify-center w-full"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Retry Loading
                  </button>
                  
                  <Link href="/quiz">
                    <button 
                      className="py-2 px-4 border border-primary text-primary bg-white font-medium rounded-lg flex items-center justify-center w-full"
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Retake Quiz
                    </button>
                  </Link>
                </div>
                
                {/* Show errors if available */}
                {(dbUserError || quizError || isReportError) && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                    <p className="font-medium mb-1">Errors detected:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {dbUserError && <li>User data issue</li>}
                      {quizError && <li>Quiz answers not found</li>}
                      {isReportError && <li>Report generation failed</li>}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Show the report once it's available
  return (
    <div className="pt-20 px-4 pb-12 bg-neutral-50 min-h-screen">
      <Helmet>
        <title>Your Compatibility Results | WhoToDate</title>
        <meta name="description" content="View your personalized compatibility profile with insights, strengths, challenges, and guidance for better relationships." />
      </Helmet>
      
      <div className="container mx-auto max-w-2xl">
        {isPremiumReportVisible ? (
          <div>
            <FullReportView profile={profile} />
            <div className="mt-8 space-y-4">
              {/* Download PDF Button */}
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => downloadPDFReport(profile)}
                  className="py-3 px-5 bg-primary text-white font-medium rounded-lg flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF Report
                </button>
                
                <Link href="/quiz">
                  <button
                    className="py-3 px-5 border border-primary text-primary bg-white font-medium rounded-lg flex items-center justify-center hover:bg-primary/5"
                  >
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Retake Quiz
                  </button>
                </Link>
              </div>
              
              {/* Share and Refer Buttons */}
              <div className="flex flex-col md:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    // Create a personalized share message based on the profile
                    const strengthText = profile.strengthsWeaknesses.strengths[0] || "";
                    const challengeText = profile.strengthsWeaknesses.challenges[0] || "";
                    
                    const shareText = `I just took the WhoToDate compatibility assessment! It says my relationship strength is "${strengthText}" and I should work on "${challengeText}". This free tool helps you understand what kind of relationships suit you best. Try it yourself at: ${window.location.origin}`;
                    
                    // Share via WhatsApp if on mobile, otherwise copy to clipboard
                    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                      // Mobile device - open WhatsApp
                      window.open(`whatsapp://send?text=${encodeURIComponent(shareText)}`);
                    } else {
                      // Desktop - copy to clipboard
                      navigator.clipboard.writeText(shareText).then(() => {
                        toast({
                          title: "Share message copied!",
                          description: "Paste and share with your friends",
                        });
                      });
                    }
                  }}
                  className="py-2 px-4 bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Results
                </button>
                
                <button
                  onClick={() => {
                    // Create a personalized message based on profile
                    const subject = `My ${profile.overallColor} compatibility profile from WhoToDate!`;
                    
                    // Get a tip to share
                    const randomTip = profile.relationshipTips[Math.floor(Math.random() * profile.relationshipTips.length)] || "Understanding your relationship style helps find better matches";
                    
                    const body = `Hey! I just discovered my relationship compatibility type on WhoToDate. 
                    
My profile says I'm a ${profile.attachmentStyle} attachment style with ${profile.mbtiStyle} personality type. One relationship tip I got was: "${randomTip}"

This free tool gives you insights into your relationship patterns and helps you understand what kind of relationships will suit you best. It takes about 5 minutes to complete.

Try it yourself at: ${window.location.origin}`;
                    
                    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  }}
                  className="py-2 px-4 bg-green-600 text-white font-medium rounded-lg flex items-center justify-center"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Email to a Friend
                </button>
              </div>
            </div>
          </div>
        ) : (
          <ResultsPreview 
            profile={profile} 
            onGetFullReport={handleGetFullReport} 
          />
        )}
      </div>
    </div>
  );
};

export default FixedResults;