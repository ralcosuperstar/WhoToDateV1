import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Helmet } from "react-helmet";
import { calculateCompatibilityProfile, generateProfilePreview } from "@/lib/compatibilityAnalysis";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
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
  CreditCard 
} from "lucide-react";

const ResultsPreview = ({ profile, onGetFullReport }: { 
  profile: any; 
  onGetFullReport: () => void;
}) => {
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
                  {profile.previewStrengths.map((strength: string, idx: number) => (
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
                  {profile.previewChallenges.map((challenge: string, idx: number) => (
                    <li key={idx}>{challenge}</li>
                  ))}
                </ul>
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
                  {profile.previewCompatible[0]}
                </p>
                
                <p className="text-sm font-medium text-blue-800 flex items-center mt-2">
                  <XCircle className="h-4 w-4 mr-2 text-blue-500" />
                  Potential Challenges With
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  {profile.previewChallenging[0]}
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
                  <span>Full compatibility insights (not just preview)</span>
                </li>
                <li className="flex text-sm items-start">
                  <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Personalized relationship tips and guidance</span>
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

const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  
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
              onClick={onClose}
            >
              <Download className="h-5 w-5 mr-2" />
              Download Full Report
            </button>
            
            <button 
              className="w-full py-3 px-4 border border-neutral-300 text-neutral-dark rounded-lg"
              onClick={onClose}
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
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [profile, setProfile] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  // Get user data
  const { data: user } = useQuery({ 
    queryKey: ['/api/me'],
    retry: false,
    refetchOnWindowFocus: false
  });
  
  // Get report data
  const { data: report, isLoading: isReportLoading } = useQuery({ 
    queryKey: ['/api/report'],
    enabled: !!user,
    retry: false,
    refetchOnWindowFocus: false
  });
  
  // Get answer data from session storage
  useEffect(() => {
    // Try to load answers from session storage first
    const savedAnswers = sessionStorage.getItem('quizAnswers');
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        setAnswers(parsedAnswers);
      } catch (e) {
        console.error('Failed to parse saved answers', e);
        // redirect to quiz if we have no answers
        navigate('/quiz');
      }
    } else if (!user) {
      // No saved answers and no user, send back to quiz
      navigate('/quiz');
    }
  }, [navigate, user]);
  
  // Generate profile once we have answers
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      try {
        const compatibilityProfile = calculateCompatibilityProfile(answers);
        const previewProfile = generateProfilePreview(compatibilityProfile);
        setProfile(previewProfile);
      } catch (e) {
        console.error('Failed to generate profile', e);
        toast({
          title: "Error",
          description: "We couldn't generate your compatibility profile. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, [answers, toast]);
  
  // Make payment
  const handleGetFullReport = () => {
    setIsPaymentModalOpen(true);
  };
  
  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setIsSuccessModalOpen(true);
    
    // Save report as paid
    if (user && report) {
      // In a real app, this would make an API call to update payment status
      // and save the complete report in the database
    }
  };
  
  if (!profile) {
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
        <ResultsPreview profile={profile} onGetFullReport={handleGetFullReport} />
        
        <PaymentModal 
          isOpen={isPaymentModalOpen} 
          onClose={() => setIsPaymentModalOpen(false)} 
          onSuccess={handlePaymentSuccess} 
        />
        
        <SuccessModal 
          isOpen={isSuccessModalOpen} 
          onClose={() => setIsSuccessModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Results;