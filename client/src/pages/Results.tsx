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
  Users
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
                  <Lock className="h-3 w-3 mr-1 inline" />
                  Full growth plan available in premium report
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

        {/* Premium Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
          <div className="flex items-start">
            <div className="rounded-full bg-primary/10 p-2 mr-3 mt-1">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Unlock Your Full Premium Report</h3>
              <p className="text-sm opacity-80 mb-4">
                Get complete insights, relationship tips, and all compatibility details in a downloadable PDF.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex text-sm items-start">
                  <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Detailed analysis of all 5 personality dimensions</span>
                </li>
                <li className="flex text-sm items-start">
                  <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Personalized growth recommendations for personal development</span>
                </li>
                <li className="flex text-sm items-start">
                  <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Ideal partner summary based on your personality profile</span>
                </li>
                <li className="flex text-sm items-start">
                  <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Actionable dating experiences to try in real life</span>
                </li>
                <li className="flex text-sm items-start">
                  <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Shareable PDF you can save or print</span>
                </li>
              </ul>
            </div>
          </div>
          
          <motion.button
            className="w-full py-3 px-4 bg-primary text-white font-medium rounded-lg flex items-center justify-center"
            onClick={onGetFullReport}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Get Full Report (₹499 only)
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

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSuccess: () => void;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!isOpen) return null;
  
  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment process
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Complete Your Payment</h3>
          <p className="mb-6 text-neutral-dark/70">
            Secure one-time payment to unlock your full compatibility report.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="border border-neutral-200 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Full Compatibility Report</span>
                <span className="font-bold">₹499</span>
              </div>
              <p className="text-sm text-neutral-dark/70">Lifetime access and PDF download</p>
            </div>
            
            <div className="border border-neutral-200 rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Payment Methods</p>
              <div className="flex space-x-2">
                <div className="border border-neutral-200 rounded-lg p-2 flex-1 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Razorpay_logo.svg" alt="Razorpay" className="h-6" />
                </div>
                <div className="border border-neutral-200 rounded-lg p-2 flex-1 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="h-6" />
                </div>
                <div className="border border-neutral-200 rounded-lg p-2 flex-1 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/UPI-Logo-vector.svg" alt="UPI" className="h-6" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button 
              className="flex-1 py-2 px-4 border border-neutral-300 text-neutral-dark rounded-lg"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </button>
            
            <button 
              className="flex-1 py-2 px-4 bg-primary text-white font-medium rounded-lg flex items-center justify-center"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="mr-2">Processing...</span>
                  <div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                </>
              ) : (
                "Pay ₹499"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessModal = ({ 
  isOpen, 
  onClose,
  profile,
  onViewOnline
}: { 
  isOpen: boolean; 
  onClose: () => void;
  profile: CompatibilityProfile | null;
  onViewOnline: () => void;
}) => {
  if (!isOpen || !profile) return null;
  
  const handleDownload = () => {
    downloadPDFReport(profile);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
          
          <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
          <p className="mb-6 text-neutral-dark/70">
            Your full compatibility report is ready to view and download.
          </p>
          
          <div className="space-y-3">
            <button 
              className="w-full py-3 px-4 bg-primary text-white font-medium rounded-lg flex items-center justify-center"
              onClick={handleDownload}
            >
              <Download className="h-5 w-5 mr-2" />
              Download Full Report
            </button>
            
            <button 
              className="w-full py-3 px-4 border border-neutral-300 text-neutral-dark rounded-lg"
              onClick={onViewOnline}
            >
              View Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Results = () => {
  // Initialize hooks first
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClientInstance = useQueryClient(); // Create instance but use imported queryClient for calls
  
  // All useState calls
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [profile, setProfile] = useState<CompatibilityProfile | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
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
  
  // These handlers are kept for backward compatibility
  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setIsPremiumReportVisible(true);
  };
  
  const handleViewOnline = () => {
    setIsSuccessModalOpen(false);
    setIsPremiumReportVisible(true);
  };
  
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
                    const url = window.location.href;
                    navigator.clipboard.writeText(url).then(() => {
                      toast({
                        title: "Link copied!",
                        description: "Share your results link with friends",
                      });
                    });
                  }}
                  className="py-2 px-4 bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Results
                </button>
                
                <button
                  onClick={() => {
                    const subject = "Check out my WhoToDate compatibility profile!";
                    const body = "I just got my relationship compatibility profile from WhoToDate and thought you might enjoy taking the quiz too! It's quick, free, and gives you surprising insights into your relationship style. Check it out at: " + window.location.origin;
                    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  }}
                  className="py-2 px-4 bg-green-600 text-white font-medium rounded-lg flex items-center justify-center"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Refer a Friend
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
        
        <PaymentModal 
          isOpen={isPaymentModalOpen} 
          onClose={() => setIsPaymentModalOpen(false)} 
          onSuccess={handlePaymentSuccess} 
        />
        
        <SuccessModal 
          isOpen={isSuccessModalOpen} 
          onClose={() => setIsSuccessModalOpen(false)}
          profile={profile}
          onViewOnline={handleViewOnline} 
        />
      </div>
    </div>
  );
};

export default Results;