import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Helmet } from "react-helmet";
import { calculateCompatibilityProfile, generateProfilePreview, type CompatibilityProfile } from "@/lib/compatibilityAnalysis";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { 
  Download, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ChevronRight, 
  BarChart4,
  Heart, 
  Send, 
  CreditCard,
  Share2,
  Users,
  ArrowRight
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
          <span className="inline-block bg-primary/10 text-primary rounded-full p-3 mb-3">
            <BarChart4 className="h-6 w-6" />
          </span>
          <h2 className="text-2xl font-bold mb-2">Your Compatibility Profile</h2>
          <p className="text-neutral-dark/70">
            Here's a free preview of your personalized compatibility profile
          </p>
        </div>

        {/* Overall Compatibility Color */}
        <div className={`p-4 rounded-lg border ${colorClass} mb-6 flex items-center`}>
          {colorIcon}
          <div className="ml-3">
            <p className="font-medium">
              {profile.overallColor === 'green' 
                ? 'High Compatibility Potential' 
                : profile.overallColor === 'yellow' 
                  ? 'Moderate Compatibility Potential' 
                  : 'Challenging Compatibility Profile'}
            </p>
            <p className="text-sm">
              {profile.overallColor === 'green' 
                ? 'You have many qualities that contribute to healthy relationships.' 
                : profile.overallColor === 'yellow' 
                  ? 'You have a mix of strengths and growth areas in relationships.' 
                  : 'You have significant patterns that may create challenges in relationships.'}
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="space-y-5 mb-8">
          <p className="text-neutral-dark">
            {profile.description.split('. ')[0] + '.'}
          </p>
          
          {/* Section Scores */}
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(profile.sectionScores).map(([section, scoreValue]) => {
              const score = scoreValue as number;
              return (
                <div key={section} className="bg-neutral-50 p-3 rounded-md">
                  <p className="text-sm font-medium capitalize">{section}</p>
                  <div className="flex items-center mt-1">
                    <div className="h-2 flex-grow bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                    <span className="text-xs ml-2 font-medium">{Math.round(score)}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Profile Insights */}
          <div>
            <h3 className="font-medium mb-2 text-sm uppercase tracking-wide text-neutral-dark/70">Key Insights</h3>
            <div className="space-y-3">
              <div className="bg-neutral-50 p-3 rounded-md">
                <p className="text-sm font-medium">Attachment Style</p>
                <p className="text-sm capitalize">{profile.attachmentStyle}</p>
              </div>
              <div className="bg-neutral-50 p-3 rounded-md">
                <p className="text-sm font-medium">Personality Type</p>
                <p className="text-sm">{profile.mbtiStyle}</p>
              </div>
            </div>
          </div>

          {/* Preview of Strengths & Challenges */}
          <div>
            <h3 className="font-medium mb-2 text-sm uppercase tracking-wide text-neutral-dark/70">Strengths & Challenges</h3>
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-md">
                <p className="text-sm font-medium text-green-800 flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  Strengths (Preview)
                </p>
                <ul className="ml-6 mt-1 text-sm list-disc text-green-800">
                  {previewData.previewStrengths.map((strength: string, idx: number) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-md">
                <p className="text-sm font-medium text-yellow-800 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                  Challenges (Preview)
                </p>
                <ul className="ml-6 mt-1 text-sm list-disc text-yellow-800">
                  {previewData.previewChallenges.map((challenge: string, idx: number) => (
                    <li key={idx}>{challenge}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Growth Preview */}
          <div>
            <h3 className="font-medium mb-2 text-sm uppercase tracking-wide text-neutral-dark/70">Growth Insight</h3>
            <div className="space-y-3">
              <div className="bg-purple-50 p-3 rounded-md">
                <p className="text-sm font-medium text-purple-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Personal Growth (Preview)
                </p>
                <p className="text-sm text-purple-800 mt-1">
                  {previewData.previewGrowthRecommendation}
                </p>
                <p className="text-xs text-purple-700/70 mt-2 flex items-center">
                  <ArrowRight className="h-3 w-3 mr-1 inline" />
                  View your full report for complete insights
                </p>
              </div>
            </div>
          </div>

          {/* Preview Compatibility */}
          <div>
            <h3 className="font-medium mb-2 text-sm uppercase tracking-wide text-neutral-dark/70">Compatibility Preview</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm font-medium text-blue-800 flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-blue-500" />
                  Most Compatible With
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  {previewData.previewCompatible[0]}
                </p>
                
                <p className="text-sm font-medium text-blue-800 flex items-center mt-2">
                  <XCircle className="h-4 w-4 mr-2 text-blue-500" />
                  Potential Challenges With
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  {previewData.previewChallenging[0]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Free Full Report Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-5 mb-6">
          <div className="flex items-start">
            <div className="rounded-full bg-blue-500/10 p-2 mr-3 mt-1">
              <BarChart4 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Access Your Full Report (It's Free!)</h3>
              <p className="text-sm opacity-80 mb-4">
                Get complete insights, relationship tips, and all compatibility details that can help you understand yourself better.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex text-sm items-start">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Visual analysis of all personality dimensions</span>
                </li>
                <li className="flex text-sm items-start">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Personal growth recommendations for relationship success</span>
                </li>
                <li className="flex text-sm items-start">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Ideal partner insights based on your unique profile</span>
                </li>
                <li className="flex text-sm items-start">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Practical dating advice to try in real life</span>
                </li>
              </ul>
            </div>
          </div>
          
          <motion.button
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center"
            onClick={onGetFullReport}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <BarChart4 className="h-5 w-5 mr-2" />
            View My Full Report
          </motion.button>
        </div>

        {/* Share and links */}
        <div className="flex flex-col space-y-3">
          <button 
            className="py-2 px-4 text-center text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 rounded-lg flex items-center justify-center"
          >
            <Send className="h-4 w-4 mr-2" />
            Share Your Results
          </button>
          
          <Link href="/quiz" className="text-center text-neutral-dark/70 text-sm hover:underline">
            Retake Assessment
          </Link>
        </div>
      </div>
    </div>
  );
};

// Payment modal removed as reports are now free

// Success modal removed as reports are now free

const Results = () => {
  // Initialize hooks first
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClientInstance = useQueryClient(); // Create instance but use imported queryClient for calls
  
  // All useState calls
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [profile, setProfile] = useState<CompatibilityProfile | null>(null);
  const [isPremiumReportVisible, setIsPremiumReportVisible] = useState(false);
  
  // All data fetching queries
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useQuery({ 
    queryKey: ['/api/me'],
    retry: false,
    refetchOnWindowFocus: false
  });
  
  const { data: report, isLoading: isReportLoading, isError: isReportError } = useQuery({ 
    queryKey: ['/api/report'],
    enabled: !!user,
    retry: false,
    refetchOnWindowFocus: false
  });
  
  const { data: existingQuiz, isLoading: isQuizLoading } = useQuery({ 
    queryKey: ['/api/quiz'],
    enabled: !!user,
    retry: false,
    refetchOnWindowFocus: false
  });
  
  // Create report mutation
  const createReportMutation = useMutation({
    mutationFn: async (data: { 
      quizId: number;
      compatibilityProfile?: CompatibilityProfile; // Optional but useful for the server
      report: CompatibilityProfile; // Required by schema
      compatibilityColor: string; // Required by schema
      isPaid: boolean;
    }) => {
      const res = await apiRequest("POST", "/api/report", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/report'] });
      toast({
        title: "Success!",
        description: "Your compatibility report has been created."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create your report. Please try again.",
        variant: "destructive",
      });
      console.error("Report creation error:", error);
    }
  });
  
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
    } else if (!user) {
      navigate('/quiz');
    }
  }, [navigate, user]);
  
  // Generate profile when answers are available
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      try {
        const compatibilityProfile = calculateCompatibilityProfile(answers);
        setProfile(compatibilityProfile);
        
        // Create report if needed
        if (user && !report && compatibilityProfile && existingQuiz) {
          // Make sure existingQuiz has an id
          const quizId = typeof existingQuiz === 'object' && existingQuiz && 'id' in existingQuiz ? 
            (existingQuiz as any).id : null;
          
          if (quizId) {
            // Debugging to see what we're sending
            console.log("Sending data to /api/report:", {
              quizId,
              compatibilityProfile, // Field required by server.routes.ts
              isPaid: true 
            });
            
            // Send the report data with proper structure
            createReportMutation.mutate({
              quizId,
              // Use the actual compatibilityProfile structure for the server to access it
              compatibilityProfile,
              // Add these fields to satisfy the schema requirements directly
              report: compatibilityProfile,
              compatibilityColor: compatibilityProfile.overallColor, 
              isPaid: true // All reports are free
            });
          }
        }
      } catch (e) {
        console.error('Failed to generate profile', e);
        toast({
          title: "Error",
          description: "We couldn't generate your compatibility profile. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, [answers, toast, user, report, existingQuiz]);
  
  // All reports are now free, so we'll show the full report directly
  useEffect(() => {
    // If we have a profile, show the full report immediately
    if (profile) {
      // Skip all modals and show the premium report directly
      setIsPremiumReportVisible(true);
    }
  }, [profile]);
  
  // This is kept for backward compatibility but not used in the main flow anymore
  const handleGetFullReport = () => {
    // Show full report immediately
    setIsPremiumReportVisible(true);
  };
  
  // All handlers related to payment/premium were removed as reports are now free
  
  // Check for authentication
  if (isUserLoading) {
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-dark/70">Loading your data...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Handle authentication and error redirects
  useEffect(() => {
    if (isUserError) {
      toast({
        title: "Login Required",
        description: "Please log in to view your compatibility report.",
        variant: "destructive",
      });
      navigate('/auth');
    } else if (isReportError) {
      toast({
        title: "Error Retrieving Report",
        description: "We couldn't retrieve your report. Please try taking the quiz again.",
        variant: "destructive",
      });
      navigate('/quiz');
    }
  }, [isUserError, isReportError, toast, navigate]);
  
  // Show loading states or redirect based on conditions
  if (isUserError || isReportError) {
    return null;
  }
  
  // Show loading while fetching report or generating profile
  if (isReportLoading || !profile) {
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-dark/70">Analyzing your responses...</p>
          </div>
        </div>
      </div>
    );
  }
  
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
              <div className="flex justify-center">
                <button
                  onClick={() => downloadPDFReport(profile)}
                  className="py-3 px-6 bg-primary text-white font-medium rounded-lg flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF Report
                </button>
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

export default Results;