import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "wouter";
import { Helmet } from "react-helmet";
import { type DetailedReport, buildReport } from "../logic/profile";
import { useToast } from "../hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { motion, AnimatePresence } from "framer-motion";
import { useFixedSupabase } from "../contexts/FixedSupabaseContext";
import directSupabaseService from "../services/directSupabaseService";
import jsPDF from "jspdf";
import { downloadEnhancedPDFReport } from "../lib/enhancedPdfGenerator";
import { 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Share2,
  Users,
  ArrowRight,
  RefreshCw,
  Heart,
  Brain,
  Star,
  Sparkles,
  User,
  MessageCircle,
  BookOpen,
  Book,
  ChevronDown,
  ChevronUp,
  HomeIcon,
  Printer,
  Zap,
  Gift,
  Target,
  ChevronsLeft,
  Trophy,
  Lightbulb,
  ShieldCheck,
  PartyPopper,
  BarChart4,
  Puzzle,
  HeartHandshake,
  FileText,
  Send
} from "lucide-react";

// Enhanced loading animation component
const LoadingAnimation = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Heart className="h-8 w-8 text-primary animate-pulse" />
      </div>
    </div>
    <p className="mt-6 text-neutral-600 text-center text-lg animate-pulse">Creating your personalized insights...</p>
    <p className="mt-2 text-neutral-400 text-center text-sm">This usually takes just a few seconds</p>
  </div>
);

// Progress bar component with better visual
const CompatibilityBar = ({ 
  value, 
  label, 
  color = "primary",
  emoji = "✨"
}: { 
  value: number; 
  label: string; 
  color?: "primary" | "green" | "yellow" | "red" | "blue" | "purple";
  emoji?: string;
}) => {
  const colorClasses = {
    primary: "bg-primary",
    green: "bg-green-500",
    yellow: "bg-amber-500",
    red: "bg-rose-500",
    blue: "bg-blue-600",
    purple: "bg-purple-600"
  };

  const gradientClasses = {
    primary: "from-fuchsia-500 to-pink-500",
    green: "from-emerald-500 to-green-500",
    yellow: "from-amber-400 to-yellow-500",
    red: "from-rose-500 to-red-500",
    blue: "from-blue-500 to-indigo-600",
    purple: "from-purple-500 to-indigo-500"
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1 items-center">
        <div className="flex items-center">
          <span className="text-lg mr-2">{emoji}</span>
          <span className="text-neutral-700 font-medium">{label}</span>
        </div>
        <span className="font-bold text-lg" style={{ color: color === 'primary' ? '#e83a8e' : '' }}>
          {value}%
        </span>
      </div>
      <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${gradientClasses[color]}`}
        ></motion.div>
      </div>
    </div>
  );
};

// Compatibility badge component
const CompatibilityBadge = ({ overall }: { overall: 'green' | 'yellow' | 'red' }) => {
  const badgeConfig = {
    green: {
      color: "bg-green-500",
      icon: <CheckCircle2 className="h-5 w-5 text-white" />,
      text: "High Compatibility",
      description: "You show strong potential for healthy, balanced relationships"
    },
    yellow: {
      color: "bg-amber-500",
      icon: <AlertTriangle className="h-5 w-5 text-white" />,
      text: "Balanced Compatibility",
      description: "You have good potential with some areas for growth"
    },
    red: {
      color: "bg-rose-500",
      icon: <XCircle className="h-5 w-5 text-white" />,
      text: "Complex Compatibility",
      description: "You have opportunities for significant relationship growth"
    }
  };

  const config = badgeConfig[overall];

  return (
    <div className="flex items-center p-4 rounded-lg border border-gray-200 bg-white shadow-sm mb-6">
      <div className={`${config.color} p-3 rounded-full mr-4`}>
        {config.icon}
      </div>
      <div>
        <h3 className="font-bold text-lg text-gray-800">{config.text}</h3>
        <p className="text-gray-600">{config.description}</p>
      </div>
    </div>
  );
};

// Section Card component
const SectionCard = ({
  title,
  emoji,
  icon,
  children,
  className = ""
}: {
  title: string;
  emoji: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 ${className}`}>
    <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-4 border-b border-gray-100 flex items-center">
      <span className="text-2xl mr-2">{emoji}</span>
      <h2 className="text-xl font-bold text-gray-800 flex items-center">
        {title}
        <span className="ml-2 text-primary">{icon}</span>
      </h2>
    </div>
    <div className="p-5 bg-white">
      {children}
    </div>
  </div>
);

// Tab component for navigation
const TabNav = ({
  activeTab,
  setActiveTab,
  tabs
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: Array<{id: string; label: string; icon: React.ReactNode; emoji: string}>;
}) => {
  // State for mobile dropdown
  const [isOpen, setIsOpen] = useState(false);
  
  const activeTabData = tabs.find(tab => tab.id === activeTab);
  
  // For desktop - regular tabs
  const desktopTabs = (
    <div className="hidden md:flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
            activeTab === tab.id 
              ? "bg-primary text-white shadow-sm" 
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span className="mr-1.5">{tab.emoji}</span>
          {tab.label}
          {tab.icon && <span className="ml-1.5">{tab.icon}</span>}
        </button>
      ))}
    </div>
  );
  
  // For mobile - dropdown
  const mobileDropdown = (
    <div className="md:hidden relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="flex items-center">
          <span className="mr-2">{activeTabData?.emoji}</span>
          <span className="font-medium">{activeTabData?.label}</span>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsOpen(false);
                }}
                className={`w-full p-3 text-left flex items-center ${
                  activeTab === tab.id ? "bg-primary/10" : "hover:bg-gray-50"
                }`}
              >
                <span className="mr-2">{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  
  return (
    <div className="sticky top-[76px] bg-gray-50 z-30 py-3 px-4 border-b border-gray-200 mb-6">
      <div className="max-w-4xl mx-auto">
        {desktopTabs}
        {mobileDropdown}
      </div>
    </div>
  );
};

// Share button component
const ShareButton = ({ profile, name }: { profile: DetailedReport; name?: string }) => {
  const [isSharing, setIsSharing] = useState(false);
  
  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      // Create the share data
      const shareData = {
        title: 'My WhoToDate Compatibility Profile',
        text: `Check out my relationship compatibility profile: I'm a ${profile.primaryArchetype} with ${profile.attachment} attachment style!`,
        url: window.location.href
      };
      
      // Try to use the Web Share API if available
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback - copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`
        );
        
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    } finally {
      setIsSharing(false);
    }
  };
  
  // WhatsApp specific share
  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `*My WhoToDate Compatibility Results* 📊\n\nHi! I just took the relationship compatibility quiz at WhoToDate and discovered I'm a ${profile.primaryArchetype} with ${profile.attachment} attachment style.\n\nYou should try it too! ${window.location.origin}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };
  
  return (
    <div className="space-y-3">
      <button
        onClick={shareWhatsApp}
        className="w-full py-3 px-4 bg-[#25D366] text-white font-medium rounded-lg flex items-center justify-center hover:bg-[#128C7E] transition-colors"
        disabled={isSharing}
      >
        <Send className="h-5 w-5 mr-2" />
        Share on WhatsApp
      </button>
      
      <button
        onClick={handleShare}
        className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors"
        disabled={isSharing}
      >
        <Share2 className="h-5 w-5 mr-2" />
        {isSharing ? 'Sharing...' : 'Share Results'}
      </button>
    </div>
  );
};

// Main component
const EnhancedResults = () => {
  // Initialize hooks first
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClientInstance = useQueryClient();
  
  // State hooks
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [profile, setProfile] = useState<DetailedReport | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loadingTime, setLoadingTime] = useState(0);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  // References to sections for scrolling
  const overviewRef = useRef<HTMLDivElement>(null);
  const personalityRef = useRef<HTMLDivElement>(null);
  const compatibilityRef = useRef<HTMLDivElement>(null);
  const growthRef = useRef<HTMLDivElement>(null);
  
  // Authentication
  const { user: supabaseUser, isLoading: isUserLoading } = useFixedSupabase();
  const isUserError = !supabaseUser && !isUserLoading;
  
  // Get database user
  const { 
    data: dbUser, 
    isLoading: isDbUserLoading, 
    error: dbUserError
  } = useQuery({
    queryKey: ['dbUser', supabaseUser?.id],
    queryFn: async () => {
      if (!supabaseUser?.email) throw new Error('User email not available');
      return directSupabaseService.user.getUserByEmail(supabaseUser.email);
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
    queryKey: ['quiz', supabaseUser?.id],
    queryFn: async () => {
      if (!supabaseUser?.id) throw new Error('Auth user ID not available');
      return directSupabaseService.quiz.getQuizAnswers(supabaseUser.id);
    },
    enabled: !!supabaseUser?.id,
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
    queryKey: ['report', supabaseUser?.id],
    queryFn: async () => {
      if (!supabaseUser?.id) throw new Error('Auth user ID not available');
      return directSupabaseService.report.getReport(supabaseUser.id);
    },
    enabled: !!supabaseUser?.id,
    refetchOnWindowFocus: false,
    retry: 2
  });
  
  // Mutation to create report
  const createReportMutation = useMutation({
    mutationFn: async (data: { 
      quizId: number;
      report: DetailedReport; 
      compatibilityColor: string;
      isPaid: boolean;
    }) => {
      setIsGeneratingReport(true);
      
      try {
        if (!supabaseUser) {
          throw new Error('User not authenticated');
        }
        
        const userId = supabaseUser.id;
        
        if (!userId) {
          throw new Error('User ID not available');
        }
        
        const result = await directSupabaseService.report.createReport({
          userId,
          quizId: data.quizId,
          report: data.report,
          compatibilityColor: data.compatibilityColor,
          isPaid: data.isPaid
        });
        
        const report = result.success ? result.report : null;
        
        return report;
      } catch (error) {
        console.error("Report creation failed:", error);
        throw error;
      } finally {
        setIsGeneratingReport(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report', supabaseUser?.id] });
      
      toast({
        title: "Success!",
        description: "Your compatibility report has been created."
      });
      
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
  
  // Try loading compatibility profile from session storage
  useEffect(() => {
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
  }, [profile, answers]);
  
  // Generate profile from report or answers
  useEffect(() => {
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
      setProfile(report.report as DetailedReport);
      return;
    }
    
    // If we have quiz answers from database but no answers in state, use them
    if (existingQuiz && !report) {
      if (isDev) console.debug("Using quiz answers from database");
      try {
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
            const detailedReport = buildReport(quizAnswers);
            setProfile(detailedReport);
            
            // Create a report using these answers
            if (supabaseUser && supabaseUser.id && quizData.id) {
              if (isDev) console.debug("Creating report from quiz answers");
              createReportMutation.mutate({
                quizId: quizData.id,
                report: detailedReport,
                compatibilityColor: detailedReport.overall,
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
        const detailedReport = buildReport(answers);
        
        // Save to session storage as backup
        sessionStorage.setItem('compatibilityProfile', JSON.stringify(detailedReport));
        setProfile(detailedReport);
        
        // Create a report if we have quiz data
        if (existingQuiz && supabaseUser && supabaseUser.id) {
          const quizData = existingQuiz as any;
          if (quizData.id) {
            if (isDev) console.debug("Creating report from session answers");
            createReportMutation.mutate({
              quizId: quizData.id,
              report: detailedReport,
              compatibilityColor: detailedReport.overall,
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
  
  // Scroll to section when activeTab changes
  useEffect(() => {
    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    switch (activeTab) {
      case 'overview':
        scrollToSection(overviewRef);
        break;
      case 'personality':
        scrollToSection(personalityRef);
        break;
      case 'compatibility':
        scrollToSection(compatibilityRef);
        break;
      case 'growth':
        scrollToSection(growthRef);
        break;
      default:
        break;
    }
  }, [activeTab]);
  
  // Track loading time for UI
  useEffect(() => {
    if (!profile && !isGeneratingReport) {
      const timer = setTimeout(() => {
        setLoadingTime(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [profile, loadingTime, isGeneratingReport]);
  
  // Handle retry loading
  const handleRetry = () => {
    if (supabaseUser?.id) {
      refetchQuiz();
      refetchReport();
    }
    
    setLoadingTime(0);
    
    toast({
      title: "Refreshing",
      description: "Getting the latest data..."
    });
  };
  
  // Handle printing the report
  const handlePrint = () => {
    window.print();
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
  
  // Define interface for database user
  interface DbUser {
    id: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    [key: string]: any; // For any other properties
  }
  
  // Get user's first name
  const getFirstName = () => {
    if (!dbUser || !dbUser.user) return '';
    
    // Use first_name from database or extract from full_name
    const user = dbUser.user as DbUser;
    return user.first_name || user.full_name?.split(' ')[0] || '';
  };
  
  // Only show authentication loading if it's still loading
  if (isUserLoading && !supabaseUser) {
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-3xl">
          <LoadingAnimation />
        </div>
      </div>
    );
  }
  
  // If user is not authenticated, don't show anything
  if (isUserError) {
    return null;
  }
  
  // If no profile yet, show loading with options to retry
  if (!profile) {
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-3xl">
          <LoadingAnimation />
          
          {loadingTime > 0 && (
            <div className="mt-8 text-center">
              <p className="text-neutral-600 mb-4">This is taking longer than expected.</p>
              <button
                onClick={handleRetry}
                className="inline-flex items-center px-4 py-2 bg-neutral-700 text-white rounded-lg font-medium"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Define the tabs for the report
  const reportTabs = [
    { id: "overview", label: "Overview", icon: <BarChart4 size={16} />, emoji: "🔍" },
    { id: "personality", label: "Personality", icon: <Brain size={16} />, emoji: "🧠" },
    { id: "compatibility", label: "Compatibility", icon: <HeartHandshake size={16} />, emoji: "❤️" },
    { id: "growth", label: "Growth", icon: <Lightbulb size={16} />, emoji: "💡" }
  ];
  
  return (
    <div className="pt-8 pb-20 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Your Compatibility Results | WhoToDate</title>
        <meta 
          name="description" 
          content="View your personalized compatibility profile with insights into your personality, attachment style, and relationship patterns."
        />
        <style type="text/css">
          {`
            @media print {
              body * {
                visibility: hidden;
              }
              #printable-report, #printable-report * {
                visibility: visible;
              }
              #printable-report {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
              .no-print {
                display: none !important;
              }
            }
            
            .gradient-text {
              background: linear-gradient(to right, #ffffff 20%, #ffe1f0 80%);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              display: inline;
              text-shadow: 0 0 20px rgba(255,255,255,0.1);
            }
          `}
        </style>
      </Helmet>
      
      <div className="container mx-auto max-w-4xl px-4">
        {/* Hero section with user greeting and action buttons - redesigned with vibrant colors */}
        <div className="bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 text-white rounded-xl p-6 md:p-10 shadow-xl mb-8 overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/4 -translate-y-1/4 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white opacity-10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-yellow-300 opacity-20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          
          {/* Sparkling stars */}
          <div className="absolute top-1/4 right-1/3 text-2xl animate-bounce" style={{ animationDuration: '2s' }}>✨</div>
          <div className="absolute bottom-1/4 left-1/3 text-2xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>✨</div>
          
          <div className="relative mb-8 z-10">
            <div className="inline-block bg-pink-700/30 px-4 py-1 rounded-full text-sm font-semibold mb-3 backdrop-blur-sm">
              COMPATIBILITY REPORT COMPLETE
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 flex flex-wrap items-center">
              <span className="mr-3 text-yellow-300">🎯</span>
              <span className="gradient-text">{getFirstName() ? `${getFirstName()}, Your` : 'Your'} Results Are Ready!</span>
            </h1>
            <p className="text-lg opacity-95 max-w-3xl leading-relaxed">
              <span className="font-semibold">Congratulations!</span> We've analyzed your answers and created this <span className="underline decoration-pink-300 decoration-wavy underline-offset-2">personalized compatibility profile</span> just for you. Discover your unique relationship patterns and find your perfect match!
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-6 z-10 relative">
            <Link 
              href="/dashboard" 
              className="bg-white text-fuchsia-600 font-medium py-3 px-5 rounded-lg flex items-center hover:bg-fuchsia-50 transition-colors shadow-md"
            >
              <ChevronsLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            
            <button
              onClick={() => downloadEnhancedPDFReport(profile)}
              className="bg-fuchsia-800 shadow-md text-white font-medium py-3 px-5 rounded-lg flex items-center hover:bg-fuchsia-700 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Download PDF Report
            </button>
            
            <button
              onClick={handlePrint}
              className="bg-transparent border-2 border-white/70 backdrop-blur-sm text-white font-medium py-3 px-5 rounded-lg flex items-center hover:bg-white/10 transition-colors"
            >
              <Printer className="h-5 w-5 mr-2" />
              Print Report
            </button>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <TabNav 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={reportTabs}
        />
        
        {/* Printable Report Area */}
        <div id="printable-report">
          {/* Overview Section */}
          <div ref={overviewRef} className="mb-8 scroll-mt-24">
            <SectionCard
              title="Your Compatibility Overview"
              emoji="🔍"
              icon={<BarChart4 className="h-5 w-5" />}
            >
              <div className="space-y-6">
                <div className="mb-6">
                  <CompatibilityBadge overall={profile.overall as 'green' | 'yellow' | 'red'} />
                  
                  <p className="text-gray-700 mb-6">
                    Based on your answers, you have a <span className="font-semibold">{profile.overall === 'green' ? 'High' : profile.overall === 'yellow' ? 'Balanced' : 'Complex'} Compatibility Profile</span>.
                    This means {profile.snapshot}
                  </p>
                  
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Trophy className="h-5 w-5 text-primary mr-2" />
                      Your Top Relationship Strengths
                    </h3>
                    <ul className="space-y-2">
                      {profile.flags.positives.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <User className="h-5 w-5 text-primary mr-2" />
                      Your Personality Type
                    </h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Puzzle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">{profile.primaryArchetype}</h4>
                        <p className="text-gray-600">Your dominant personality archetype</p>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Your personality combines {highestBigFiveTrait(profile)} qualities with {secondHighestBigFiveTrait(profile)} tendencies, making you particularly skilled at forming connections through your {profile.attachment} attachment style.
                    </p>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Heart className="h-5 w-5 text-primary mr-2" />
                      Your Attachment Style
                    </h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <HeartHandshake className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 capitalize">{profile.attachment}</h4>
                        <p className="text-gray-600">How you form emotional bonds</p>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      With a {profile.attachment} attachment style, you {attachmentDescription(profile.attachment)}
                    </p>
                  </div>
                </div>
                
                <div className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Key Compatibility Indicators</h3>
                  <div className="space-y-4">
                    <CompatibilityBar 
                      value={getBigFiveValue(profile, 'openness')} 
                      label="Openness to Experience" 
                      color="blue"
                      emoji="🌟"
                    />
                    <CompatibilityBar 
                      value={getBigFiveValue(profile, 'conscientiousness')} 
                      label="Conscientiousness" 
                      color="green"
                      emoji="📝"
                    />
                    <CompatibilityBar 
                      value={getBigFiveValue(profile, 'extraversion')} 
                      label="Extraversion" 
                      color="yellow"
                      emoji="🎭"
                    />
                    <CompatibilityBar 
                      value={getBigFiveValue(profile, 'agreeableness')} 
                      label="Agreeableness" 
                      color="primary"
                      emoji="🤝"
                    />
                    <CompatibilityBar 
                      value={100 - getBigFiveValue(profile, 'neuroticism')} 
                      label="Emotional Stability" 
                      color="purple"
                      emoji="😌"
                    />
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
          
          {/* Personality Section */}
          <div ref={personalityRef} className="mb-8 scroll-mt-24">
            <SectionCard
              title="Your Personality Deep Dive"
              emoji="🧠"
              icon={<Brain className="h-5 w-5" />}
            >
              <div className="space-y-6">
                <div className="bg-purple-50 rounded-lg p-5 border border-purple-100 mb-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                    <Book className="h-5 w-5 mr-2" />
                    Your MBTI Personality Type: {profile.mbti}
                  </h3>
                  <p className="text-purple-700 mb-4">
                    Your Myers-Briggs personality type reveals how you perceive the world and make decisions. Let's break down what {profile.mbti} means:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-purple-900 mb-2">{profile.mbti.charAt(0) === 'E' ? 'Extraversion (E)' : 'Introversion (I)'}</h4>
                      <p className="text-sm text-purple-800">
                        {profile.mbti.charAt(0) === 'E' 
                          ? 'You gain energy from social interaction and prefer engaging with the external world.'
                          : 'You gain energy from quiet reflection and prefer focusing on your internal thoughts.'}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-purple-900 mb-2">{profile.mbti.charAt(1) === 'S' ? 'Sensing (S)' : 'Intuition (N)'}</h4>
                      <p className="text-sm text-purple-800">
                        {profile.mbti.charAt(1) === 'S' 
                          ? 'You focus on concrete facts and details, preferring practical and realistic approaches.'
                          : 'You focus on patterns and possibilities, preferring abstract thinking and innovation.'}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-purple-900 mb-2">{profile.mbti.charAt(2) === 'T' ? 'Thinking (T)' : 'Feeling (F)'}</h4>
                      <p className="text-sm text-purple-800">
                        {profile.mbti.charAt(2) === 'T' 
                          ? 'You make decisions based on logic, analysis, and objective considerations.'
                          : 'You make decisions based on values, harmony, and how they affect people.'}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-purple-900 mb-2">{profile.mbti.charAt(3) === 'J' ? 'Judging (J)' : 'Perceiving (P)'}</h4>
                      <p className="text-sm text-purple-800">
                        {profile.mbti.charAt(3) === 'J' 
                          ? 'You prefer structure, planning, and decisiveness in your approach to life.'
                          : 'You prefer flexibility, spontaneity, and keeping options open.'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Big Five Personality Traits</h3>
                  <p className="text-gray-700 mb-4">
                    The Big Five is the most scientifically validated personality model. Here's how you score on each dimension:
                  </p>
                  
                  <div className="space-y-6 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-blue-800 mb-2">Openness to Experience: {getBigFiveValue(profile, 'openness')}%</h4>
                      <p className="text-blue-700 mb-2">
                        {getBigFiveValue(profile, 'openness') > 70 
                          ? 'You are highly curious, creative, and open to new ideas and experiences. You enjoy intellectual stimulation and thinking outside the box.'
                          : getBigFiveValue(profile, 'openness') > 40
                            ? 'You have a healthy balance between enjoying new experiences and appreciating familiar routines. You are adaptable to both innovation and tradition.'
                            : 'You prefer familiar routines and practical approaches. You value tradition and concrete thinking over abstract ideas.'}
                      </p>
                      <p className="text-sm text-blue-600">
                        <strong>In relationships:</strong> {getBigFiveValue(profile, 'openness') > 70 
                          ? 'You thrive with partners who can engage in deep conversations and share new experiences with you.'
                          : getBigFiveValue(profile, 'openness') > 40
                            ? 'You appreciate both adventure and stability in relationships, making you adaptable to different partners.'
                            : 'You value reliability and consistency in relationships, preferring partners with similar values.'}
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <h4 className="font-semibold text-green-800 mb-2">Conscientiousness: {getBigFiveValue(profile, 'conscientiousness')}%</h4>
                      <p className="text-green-700 mb-2">
                        {getBigFiveValue(profile, 'conscientiousness') > 70 
                          ? 'You are highly organized, responsible, and goal-oriented. You value planning, reliability, and following through on commitments.'
                          : getBigFiveValue(profile, 'conscientiousness') > 40
                            ? 'You balance structure with flexibility, being organized when necessary but also allowing room for spontaneity.'
                            : 'You prefer spontaneity and flexibility over rigid planning. You take a more relaxed approach to goals and schedules.'}
                      </p>
                      <p className="text-sm text-green-600">
                        <strong>In relationships:</strong> {getBigFiveValue(profile, 'conscientiousness') > 70 
                          ? 'You are a reliable partner who keeps promises and takes relationship responsibilities seriously.'
                          : getBigFiveValue(profile, 'conscientiousness') > 40
                            ? 'You are reliable while still being adaptable, making you a balanced partner who can adjust to different situations.'
                            : 'You bring spontaneity and flexibility to relationships, preferring to go with the flow rather than strict planning.'}
                      </p>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                      <h4 className="font-semibold text-yellow-800 mb-2">Extraversion: {getBigFiveValue(profile, 'extraversion')}%</h4>
                      <p className="text-yellow-700 mb-2">
                        {getBigFiveValue(profile, 'extraversion') > 70 
                          ? 'You are energetic, outgoing, and socially confident. You enjoy being around others and tend to seek excitement and stimulation.'
                          : getBigFiveValue(profile, 'extraversion') > 40
                            ? 'You balance social interaction with alone time, being comfortable in both settings without strongly preferring either.'
                            : 'You are more reserved and prefer deeper one-on-one connections over large social gatherings. You recharge through quiet time alone.'}
                      </p>
                      <p className="text-sm text-yellow-600">
                        <strong>In relationships:</strong> {getBigFiveValue(profile, 'extraversion') > 70 
                          ? 'You enjoy sharing new experiences and social activities with your partner, bringing energy to the relationship.'
                          : getBigFiveValue(profile, 'extraversion') > 40
                            ? 'You can adapt to both social and quiet activities with a partner, making you versatile in different relationship dynamics.'
                            : 'You value quality time and deep conversations with your partner, preferring meaningful connection over social excitement.'}
                      </p>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                      <h4 className="font-semibold text-red-800 mb-2">Agreeableness: {getBigFiveValue(profile, 'agreeableness')}%</h4>
                      <p className="text-red-700 mb-2">
                        {getBigFiveValue(profile, 'agreeableness') > 70 
                          ? 'You are compassionate, cooperative, and considerate of others\' feelings. You value harmony and tend to be trusting and helpful.'
                          : getBigFiveValue(profile, 'agreeableness') > 40
                            ? 'You balance cooperation with standing up for your own needs, being kind while maintaining healthy boundaries.'
                            : 'You are straightforward and prioritize truth over tact. You are comfortable with competition and challenging others\' ideas.'}
                      </p>
                      <p className="text-sm text-red-600">
                        <strong>In relationships:</strong> {getBigFiveValue(profile, 'agreeableness') > 70 
                          ? 'You are naturally supportive and empathetic, often prioritizing your partner\'s needs and working to maintain harmony.'
                          : getBigFiveValue(profile, 'agreeableness') > 40
                            ? 'You balance supporting your partner with advocating for your own needs, creating balanced relationships.'
                            : 'You value honesty and directness, even during conflict, and expect the same from your partner.'}
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h4 className="font-semibold text-purple-800 mb-2">Emotional Stability: {100 - getBigFiveValue(profile, 'neuroticism')}%</h4>
                      <p className="text-purple-700 mb-2">
                        {getBigFiveValue(profile, 'neuroticism') < 30 
                          ? 'You are calm, emotionally resilient, and tend to stay composed under pressure. You are less likely to experience frequent mood swings.'
                          : getBigFiveValue(profile, 'neuroticism') < 60
                            ? 'You experience normal emotional ups and downs but generally manage them effectively and return to baseline.'
                            : 'You experience emotions intensely and may be more sensitive to stress. You are likely perceptive about emotional undercurrents.'}
                      </p>
                      <p className="text-sm text-purple-600">
                        <strong>In relationships:</strong> {getBigFiveValue(profile, 'neuroticism') < 30 
                          ? 'You bring stability and calm to relationships, handling conflict with composure and providing emotional consistency.'
                          : getBigFiveValue(profile, 'neuroticism') < 60
                            ? 'You understand emotional nuances while maintaining stability, making you both responsive and reliable.'
                            : 'You bring emotional depth and sensitivity to relationships, often being highly attuned to your partner\'s feelings.'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Emotional Intelligence Profile</h3>
                  <p className="text-gray-700 mb-4">
                    Emotional intelligence is crucial for healthy relationships. Here's your EQ breakdown:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="text-2xl mr-2">🧠</span> Self-Awareness: {profile.eq.selfAwareness}%
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {profile.eq.selfAwareness > 70 
                          ? 'You have an excellent understanding of your emotions, strengths, weaknesses, and how they affect your behavior and relationships.'
                          : profile.eq.selfAwareness > 40
                            ? 'You generally understand your emotions and their impact, though occasional blind spots may arise in challenging situations.'
                            : 'You may sometimes struggle to identify your emotions and their influence on your behavior, especially in stressful moments.'}
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="text-2xl mr-2">⚖️</span> Self-Regulation: {profile.eq.selfRegulation}%
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {profile.eq.selfRegulation > 70 
                          ? 'You excel at managing your emotions, adapting to changing circumstances, and controlling impulsive reactions.'
                          : profile.eq.selfRegulation > 40
                            ? 'You generally manage your emotions well, though you may sometimes react impulsively under significant stress.'
                            : 'You may find it challenging to regulate strong emotions, sometimes leading to impulsive reactions during conflict.'}
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="text-2xl mr-2">❤️</span> Empathy: {profile.eq.empathy}%
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {profile.eq.empathy > 70 
                          ? 'You naturally understand and connect with others\' emotions, showing genuine care and seeing situations from their perspective.'
                          : profile.eq.empathy > 40
                            ? 'You generally understand others\' feelings, though you may sometimes miss subtle emotional cues or complex feelings.'
                            : 'You may sometimes find it challenging to recognize others\' emotions or understand perspectives very different from your own.'}
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="text-2xl mr-2">🤝</span> Social Skills: {profile.eq.socialSkills}%
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {profile.eq.socialSkills > 70 
                          ? 'You excel at building rapport, navigating social dynamics, and communicating effectively across various relationship contexts.'
                          : profile.eq.socialSkills > 40
                            ? 'You generally navigate social interactions well, though complex or highly emotional situations might sometimes challenge you.'
                            : 'You may sometimes find social interactions demanding, particularly in groups or emotionally charged situations.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
          
          {/* Compatibility Section */}
          <div ref={compatibilityRef} className="mb-8 scroll-mt-24">
            <SectionCard
              title="Your Compatibility Analysis"
              emoji="❤️"
              icon={<HeartHandshake className="h-5 w-5" />}
            >
              <div className="space-y-6">
                <div className="bg-primary/5 p-5 rounded-lg border border-primary/20 mb-6">
                  <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Your Relationship Pattern
                  </h3>
                  <p className="text-gray-700 mb-4">
                    With your {profile.attachment} attachment style, you tend to approach relationships in a particular way:
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center capitalize">
                      <span className="text-xl mr-2">💯</span> {profile.attachment} Attachment Explained
                    </h4>
                    <p className="text-gray-600">
                      {profile.attachment === 'secure' 
                        ? 'You are comfortable with intimacy and independence, easily balancing closeness with healthy autonomy. You form stable relationships with clear communication and trust.'
                        : profile.attachment === 'anxious'
                          ? 'You deeply value closeness and may worry about your partner\'s availability. You are sensitive to potential rejection and seek frequent reassurance in relationships.'
                          : profile.attachment === 'avoidant'
                            ? 'You value independence and may feel uncomfortable with too much closeness. You tend to keep emotional distance to protect yourself in relationships.'
                            : 'You experience conflicting desires for closeness and distance. You want intimate connections but also fear getting hurt, creating complex relationship dynamics.'}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="text-xl mr-2">🚀</span> Relationship Strengths
                      </h4>
                      <ul className="text-gray-600 space-y-1">
                        {getAttachmentStrengths(profile.attachment).map((strength, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="text-xl mr-2">⚠️</span> Relationship Challenges
                      </h4>
                      <ul className="text-gray-600 space-y-1">
                        {getAttachmentChallenges(profile.attachment).map((challenge, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-yellow-500 mr-2">!</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Ideal Partner Match</h3>
                  <p className="text-gray-700 mb-4">
                    Based on your personality and attachment style, here's what you should look for in a partner:
                  </p>
                  
                  <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 mb-6">
                    <p className="text-indigo-700 mb-4 italic">
                      "{profile.partnerSummary}"
                    </p>
                    
                    <h4 className="font-semibold text-indigo-800 mb-3">Look for these qualities in a partner:</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {profile.matches?.idealPartners?.map((quality, i) => (
                        <div key={i} className="bg-white p-3 rounded-lg shadow-sm flex items-start">
                          <ShieldCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{quality}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h4 className="font-semibold text-indigo-800 mt-5 mb-3">Be cautious with partners who are:</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {profile.matches?.trickyPartners?.map((quality, i) => (
                        <div key={i} className="bg-white p-3 rounded-lg shadow-sm flex items-start">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{quality}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Communication Style Match
                    </h4>
                    <p className="text-green-700 mb-4">
                      Your communication style is shaped by your personality profile. Here's what works best for you:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h5 className="font-semibold text-green-800 mb-2">What Works For You</h5>
                        <ul className="text-gray-600 space-y-2">
                          {getCommunicationPreferences(profile).map((pref, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{pref}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h5 className="font-semibold text-green-800 mb-2">Communication Challenges</h5>
                        <ul className="text-gray-600 space-y-2">
                          {getCommunicationChallenges(profile).map((challenge, i) => (
                            <li key={i} className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
          
          {/* Growth Section */}
          <div ref={growthRef} className="mb-8 scroll-mt-24">
            <SectionCard
              title="Your Growth Path"
              emoji="💡"
              icon={<Lightbulb className="h-5 w-5" />}
            >
              <div className="space-y-6">
                <div className="mb-6">
                  <p className="text-gray-700 mb-4">
                    Everyone has areas for growth in relationships. Here's your personalized growth plan:
                  </p>
                  
                  <div className="bg-amber-50 p-5 rounded-lg border border-amber-100 mb-6">
                    <h3 className="text-xl font-semibold text-amber-800 mb-3 flex items-center">
                      <Zap className="h-5 w-5 mr-2" />
                      Your Personal Growth Journey
                    </h3>
                    <p className="text-amber-700 mb-4 italic">
                      "{profile.growthPlan}"
                    </p>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                      <h4 className="font-semibold text-amber-800 mb-2 flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Your Dating Mission
                      </h4>
                      <p className="text-gray-700">
                        {profile.datingMission}
                      </p>
                    </div>
                    
                    <h4 className="font-semibold text-amber-800 mb-3">Growth Opportunities:</h4>
                    <div className="space-y-3">
                      {profile.flags.growth.map((growth, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg shadow-sm flex items-start">
                          <Sparkles className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{growth}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Custom Action Plan</h3>
                  <p className="text-gray-700 mb-4">
                    Here are specific actions you can take to improve your relationship experiences:
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    {profile.tips.map((tip, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <h4 className="font-semibold text-gray-800 mb-1">Tip #{index + 1}</h4>
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                    <Gift className="h-5 w-5 mr-2" />
                    Share-Worthy Insights
                  </h3>
                  <p className="text-blue-700 mb-4">
                    Here are some fascinating insights about your personality and relationship style:
                  </p>
                  
                  <div className="space-y-4">
                    {profile.wowInsights.map((insight, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex">
                        <div className="bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                          <PartyPopper className="h-4 w-4 text-blue-600" />
                        </div>
                        <p className="text-gray-700">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
        
        {/* Action buttons - these will not print */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200 no-print">
          <h3 className="text-xl font-semibold mb-4 text-center">Share Your Results</h3>
          <ShareButton profile={profile} name={getFirstName()} />
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <HomeIcon className="h-5 w-5 mr-1" />
                Back to Dashboard
              </Link>
              
              <Link 
                href="/quiz" 
                className="text-primary hover:text-primary/80 flex items-center"
              >
                <RefreshCw className="h-5 w-5 mr-1" />
                Retake Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
function attachmentDescription(attachment: string): string {
  switch (attachment) {
    case 'secure':
      return 'approach relationships with a healthy balance of intimacy and independence. You trust others and communicate openly about your needs.';
    case 'anxious':
      return 'tend to seek high levels of closeness and may worry about your partner\'s availability and commitment.';
    case 'avoidant':
      return 'value independence and may sometimes keep emotional distance as a way of protecting yourself.';
    case 'fearful':
      return 'experience conflicting desires for closeness and distance, wanting connection but feeling uncomfortable with too much intimacy.';
    default:
      return 'have a unique approach to forming emotional bonds with others.';
  }
}

function getBigFiveValue(profile: DetailedReport, trait: keyof DetailedReport['bigFive']): number {
  return Math.round(profile.bigFive[trait]);
}

function highestBigFiveTrait(profile: DetailedReport): string {
  const traits = Object.entries(profile.bigFive);
  const highest = traits.reduce((max, current) => 
    (current[1] > max[1]) ? current : max
  );
  
  return traitLabel(highest[0] as keyof DetailedReport['bigFive']);
}

function secondHighestBigFiveTrait(profile: DetailedReport): string {
  const traits = Object.entries(profile.bigFive);
  const sorted = [...traits].sort((a, b) => b[1] - a[1]);
  
  if (sorted.length > 1) {
    return traitLabel(sorted[1][0] as keyof DetailedReport['bigFive']);
  }
  
  return traitLabel(sorted[0][0] as keyof DetailedReport['bigFive']);
}

function traitLabel(trait: keyof DetailedReport['bigFive']): string {
  switch (trait) {
    case 'openness': return 'creative and open-minded';
    case 'conscientiousness': return 'organized and responsible';
    case 'extraversion': return 'social and energetic';
    case 'agreeableness': return 'compassionate and cooperative';
    case 'neuroticism': return 'emotionally sensitive and expressive';
    default: return 'balanced';
  }
}

function getAttachmentStrengths(attachment: string): string[] {
  switch (attachment) {
    case 'secure':
      return [
        'Clear communication about your needs and boundaries',
        'Healthy balance between togetherness and independence',
        'Ability to trust and be trustworthy',
        'Resilience during relationship challenges'
      ];
    case 'anxious':
      return [
        'Deep dedication to your relationships',
        'High emotional sensitivity and empathy',
        'Strong desire for authentic connection',
        'Willingness to work on relationship issues'
      ];
    case 'avoidant':
      return [
        'Strong independence and self-sufficiency',
        'Respect for your partner\'s personal space',
        'Thoughtful decision-making in relationships',
        'Ability to remain calm during emotional situations'
      ];
    case 'fearful':
      return [
        'Deep capacity for emotional understanding',
        'Strong sensitivity to the needs of others',
        'Capacity for profound relationship insights',
        'Resilience developed through navigating complexity'
      ];
    default:
      return [
        'Balanced approach to relationships',
        'Adaptability to different relationship dynamics',
        'Capacity for both independence and connection',
        'Thoughtful approach to emotional challenges'
      ];
  }
}

function getAttachmentChallenges(attachment: string): string[] {
  switch (attachment) {
    case 'secure':
      return [
        'May struggle to understand partners with insecure attachment',
        'Could become frustrated by ineffective communication patterns',
        'Might assume others process emotions similarly to you',
        'May need to develop more patience with different relationship paces'
      ];
    case 'anxious':
      return [
        'Tendency to seek frequent reassurance about the relationship',
        'May interpret neutral actions as signs of rejection',
        'Could become overly focused on the relationship',
        'Might struggle with establishing personal boundaries'
      ];
    case 'avoidant':
      return [
        'Difficulty opening up about deeper emotions',
        'Tendency to withdraw during relationship conflicts',
        'May prioritize independence over intimacy',
        'Could struggle with expressing vulnerability'
      ];
    case 'fearful':
      return [
        'Conflicting desires for closeness and distance',
        'Difficulty trusting even supportive partners',
        'Challenging emotional regulation during relationship stress',
        'May send mixed signals about your needs'
      ];
    default:
      return [
        'Potential communication mismatches with partners',
        'Navigating differences in emotional expression',
        'Balancing personal needs with relationship requirements',
        'Understanding different perspectives on intimacy'
      ];
  }
}

function getCommunicationPreferences(profile: DetailedReport): string[] {
  // Generate based on personality traits
  const preferences = [];
  
  if (profile.bigFive.extraversion > 60) {
    preferences.push("Direct, energetic conversations with plenty of verbal exchange");
  } else if (profile.bigFive.extraversion < 40) {
    preferences.push("Thoughtful, measured communication with time to process");
  }
  
  if (profile.bigFive.openness > 60) {
    preferences.push("Abstract, big-picture discussions that explore possibilities");
  } else if (profile.bigFive.openness < 40) {
    preferences.push("Practical, concrete conversations focused on specifics");
  }
  
  if (profile.eq.empathy > 60) {
    preferences.push("Emotionally sensitive exchanges that acknowledge feelings");
  }
  
  if (profile.attachment === 'secure') {
    preferences.push("Straightforward expression of needs and concerns");
  } else if (profile.attachment === 'anxious') {
    preferences.push("Regular check-ins and verbal reassurance");
  } else if (profile.attachment === 'avoidant') {
    preferences.push("Respectful space to process thoughts before responding");
  }
  
  // Add some defaults if we don't have enough
  if (preferences.length < 3) {
    preferences.push("Balanced dialogue with mutual sharing and listening");
    preferences.push("Clear, specific language about expectations");
  }
  
  return preferences.slice(0, 4);
}

function getCommunicationChallenges(profile: DetailedReport): string[] {
  // Generate based on personality traits
  const challenges = [];
  
  if (profile.bigFive.extraversion > 70) {
    challenges.push("May sometimes dominate conversations or interrupt");
  } else if (profile.bigFive.extraversion < 30) {
    challenges.push("Might not always express thoughts in group settings");
  }
  
  if (profile.bigFive.neuroticism > 60) {
    challenges.push("Can read too much into ambiguous messages");
  }
  
  if (profile.bigFive.agreeableness > 70) {
    challenges.push("Might avoid necessary conflict to maintain harmony");
  } else if (profile.bigFive.agreeableness < 40) {
    challenges.push("May sometimes come across as too direct or critical");
  }
  
  if (profile.attachment === 'anxious') {
    challenges.push("Tendency to seek excessive confirmation or clarification");
  } else if (profile.attachment === 'avoidant') {
    challenges.push("May withdraw when emotional conversations get intense");
  } else if (profile.attachment === 'fearful') {
    challenges.push("Could send mixed signals about your needs and feelings");
  }
  
  // Add some defaults if we don't have enough
  if (challenges.length < 3) {
    challenges.push("Occasional misalignment between words and non-verbal cues");
    challenges.push("Difficulty expressing needs during heightened emotions");
  }
  
  return challenges.slice(0, 4);
}

export default EnhancedResults;