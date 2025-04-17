import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { quizQuestions, getQuestionsBySection } from "@/lib/quizData";
import { calculateCompatibilityProfile } from "@/lib/compatibilityAnalysis";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronRight, Info, Check } from "lucide-react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { getSupabaseClient } from "@/lib/supabase";

// Progress bar component
const ProgressBar = ({ currentQuestion, totalQuestions }: { currentQuestion: number; totalQuestions: number }) => {
  const progress = Math.round((currentQuestion / totalQuestions) * 100);
  
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between text-xs text-neutral-dark/70 mb-1">
        <span>Question {currentQuestion} of {totalQuestions}</span>
        <span>{progress}% Complete</span>
      </div>
      <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Section info component
const SectionInfo = ({ section, questionNumber }: { section: string; questionNumber: number }) => {
  let title = '';
  let description = '';
  let icon = '';
  let sectionNumber = 0;
  
  // Determine which section we're in based on the section name
  switch(section) {
    case 'personality':
      title = 'Personality Traits';
      description = 'These questions help us understand your natural tendencies and how you interact with the world.';
      icon = '👤';
      sectionNumber = 1;
      break;
    case 'emotional':
      title = 'Emotional Intelligence & Attachment';
      description = 'These questions explore how you connect emotionally and handle relationships.';
      icon = '❤️';
      sectionNumber = 2;
      break;
    case 'values':
      title = 'Values & Beliefs';
      description = 'These questions help us understand what matters most to you in life and relationships.';
      icon = '⚖️';
      sectionNumber = 3;
      break;
    case 'physical':
      title = 'Intimacy & Boundaries';
      description = 'These questions explore your attitudes toward physical and emotional intimacy.';
      icon = '🔐';
      sectionNumber = 4;
      break;
    default:
      title = 'Compatibility Assessment';
      description = 'Answer honestly for the most accurate results.';
      icon = '🧪';
      sectionNumber = 0;
  }
  
  // Always get the correct section number based on the actual section name
  // This ensures the section number is always correctly displayed
  const currentSectionNumber = getSectionNumber(section);
  
  return (
    <div className="mb-6 text-center">
      <span className="inline-block text-3xl mb-2">{icon}</span>
      <h2 className="text-xl font-heading font-bold mb-1">{title}</h2>
      <p className="text-neutral-dark/70 text-sm">{description}</p>
      <div className="mt-3 text-xs text-primary font-medium">
        Section {currentSectionNumber} of 4 • Question {questionNumber} of 40
      </div>
    </div>
  );
};

// Helper function to get section number
const getSectionNumber = (section: string): number => {
  switch(section) {
    case 'personality': return 1;
    case 'emotional': return 2;
    case 'values': return 3;
    case 'physical': return 4;
    default: return 0;
  }
};

// Question card component
const QuizQuestion = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelected 
}: { 
  question: any; 
  selectedAnswer?: number;
  onAnswerSelected: (answerIndex: number) => void;
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-100">
      <h3 className="text-lg font-medium mb-4">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              selectedAnswer === index 
                ? 'bg-primary/10 border-primary' 
                : 'border-neutral-200 hover:border-primary/50'
            }`}
            onClick={() => onAnswerSelected(index)}
          >
            <div className="flex items-center">
              <div className={`h-5 w-5 rounded-full border mr-3 flex-shrink-0 ${
                selectedAnswer === index
                  ? 'bg-primary border-primary'
                  : 'border-neutral-400'
              }`}>
                {selectedAnswer === index && (
                  <span className="h-full w-full flex items-center justify-center text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </div>
              <span className="text-sm md:text-base">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Navigation buttons component
const QuizNavigation = ({
  onNext,
  onPrevious,
  canGoNext,
  isLastQuestion,
  showPrevious = true,
  isPending = false
}: {
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  isLastQuestion: boolean;
  showPrevious?: boolean;
  isPending?: boolean;
}) => {
  return (
    <div className="flex justify-between mt-6">
      {showPrevious ? (
        <button
          className="px-4 py-2 border border-neutral-200 rounded-lg flex items-center text-neutral-dark hover:bg-neutral-50 transition"
          onClick={onPrevious}
          disabled={isPending}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </button>
      ) : (
        <div></div> // Empty div to maintain flex spacing
      )}
      
      <button
        className={`px-6 py-3 rounded-lg flex items-center font-medium ${
          canGoNext && !isPending
            ? 'bg-primary text-white hover:bg-primary/90'
            : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
        }`}
        onClick={onNext}
        disabled={!canGoNext || isPending}
      >
        {isPending ? (
          <>
            <span className="mr-2">Processing</span>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </>
        ) : (
          <>
            {isLastQuestion ? 'See Results' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </>
        )}
      </button>
    </div>
  );
};

// Introduction screen
const QuizIntro = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border border-neutral-100 text-center">
      <span className="text-4xl mb-4 inline-block">🧪</span>
      <h2 className="text-2xl font-heading font-bold mb-3">Scientific Compatibility Assessment</h2>
      <p className="text-neutral-dark/80 mb-6 max-w-lg mx-auto">
        Discover your unique relationship patterns and compatibility profile through this scientifically-designed 40-question assessment.
      </p>
      
      <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
        <h3 className="font-medium mb-2 flex items-center text-blue-700">
          <Info className="h-5 w-5 mr-2" />
          Here's what to expect:
        </h3>
        
        <ul className="space-y-2 text-sm text-blue-800/80">
          <li className="flex items-start">
            <span className="h-5 w-5 text-blue-500 mr-2">•</span>
            <span><strong>40 questions</strong> divided into 4 sections (about 8-10 minutes to complete)</span>
          </li>
          <li className="flex items-start">
            <span className="h-5 w-5 text-blue-500 mr-2">•</span>
            <span>Questions about personality, emotional patterns, values, and relationship preferences</span>
          </li>
          <li className="flex items-start">
            <span className="h-5 w-5 text-blue-500 mr-2">•</span>
            <span>A comprehensive compatibility profile with personalized insights and recommendations</span>
          </li>
          <li className="flex items-start">
            <span className="h-5 w-5 text-blue-500 mr-2">•</span>
            <span>Scientifically validated insights based on relationship psychology research</span>
          </li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">For the most accurate results:</h3>
        <p className="text-sm text-neutral-dark/70 mb-1">
          • Answer honestly rather than what you think is "right"
        </p>
        <p className="text-sm text-neutral-dark/70 mb-1">
          • Choose the option that feels most natural to you
        </p>
        <p className="text-sm text-neutral-dark/70">
          • Take your time to reflect on each question
        </p>
      </div>
      
      <motion.button
        className="px-8 py-4 bg-primary text-white font-medium rounded-xl shadow-md hover:bg-primary/90 transition flex items-center justify-center mx-auto"
        onClick={onStart}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="mr-2">🚀</span>
        Start Assessment
      </motion.button>
    </div>
  );
};

// Honesty reminder messages
const honestyReminders = [
  "Remember, there are no 'right' answers—only honest ones that help you understand yourself better.",
  "Take a moment to reflect on how you actually behave, not how you wish you would behave.",
  "The most insightful results come from honest self-reflection, not idealized answers.",
  "Being honest with yourself now leads to more meaningful connections later.",
  "This is a judgment-free zone—answer based on your true feelings, not societal expectations.",
  "Your authentic answers will help you understand your unique relationship patterns.",
  "Think about your actual patterns in relationships, not theoretical scenarios.",
  "The more honest you are, the more accurate your compatibility insights will be.",
  "Recognize your true self—both strengths and growth areas—for the most helpful results.",
  "True compatibility starts with self-awareness. Answer honestly to discover your authentic patterns."
];

const Quiz = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [lastReminderQuestion, setLastReminderQuestion] = useState(0);
  
  // Use Supabase authentication instead of API endpoint
  const { user: supabaseUser, isLoading: isSupabaseLoading } = useSupabase();
  
  // Local user state to handle both Supabase and API authentication
  const [localUser, setLocalUser] = useState<any>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isUserError, setIsUserError] = useState(false);
  
  // Effect to sync Supabase auth state with local user state
  useEffect(() => {
    if (supabaseUser) {
      setLocalUser(supabaseUser);
      setIsUserError(false);
    } else if (!isSupabaseLoading) {
      setLocalUser(null);
      setIsUserError(!supabaseUser);
    }
    setIsUserLoading(isSupabaseLoading);
  }, [supabaseUser, isSupabaseLoading]);
  
  // Check for existing quiz answers from Supabase
  const [existingQuiz, setExistingQuiz] = useState<any>(null);
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  
  // Effect to load quiz answers from Supabase when user is authenticated
  useEffect(() => {
    const loadQuizAnswers = async () => {
      if (!localUser) return;
      
      try {
        setIsQuizLoading(true);
        const supabase = getSupabaseClient();
        
        // Get the user's quiz answers
        const { data: quizAnswers, error } = await supabase
          .from('quiz_answers')
          .select('*')
          .eq('user_id', localUser.id)
          .maybeSingle();
        
        if (error) throw error;
        
        if (quizAnswers) {
          setExistingQuiz(quizAnswers);
        }
      } catch (error) {
        console.error("Error loading quiz answers:", error);
        toast({
          title: "Error",
          description: "Failed to load your previous quiz answers.",
          variant: "destructive",
        });
      } finally {
        setIsQuizLoading(false);
      }
    };
    
    loadQuizAnswers();
  }, [localUser, toast]);
  
  // Find current question
  const currentQuestion = quizQuestions.find(q => q.id === currentQuestionId);
  
  // Save quiz answers mutation using Supabase directly
  const saveQuizMutation = useMutation({
    mutationFn: async (data: { answers: Record<number, number>, completed: boolean }) => {
      try {
        // Get the Supabase client
        const supabase = getSupabaseClient();
        
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          console.log("No active session, saving answers locally only");
          return { id: 0, answers: data.answers, completed: data.completed };
        }
        
        const userId = session.user.id;
        
        // Check if user already has quiz answers
        const { data: existingAnswers } = await supabase
          .from('quiz_answers')
          .select('id')
          .eq('user_id', userId)
          .maybeSingle();
        
        let result;
        
        if (existingAnswers) {
          // Update existing quiz answers
          const { data: updatedQuiz, error } = await supabase
            .from('quiz_answers')
            .update({
              answers: data.answers,
              completed: data.completed
            })
            .eq('id', existingAnswers.id)
            .select()
            .single();
            
          if (error) throw error;
          result = updatedQuiz;
        } else {
          // Create new quiz answers
          const { data: newQuiz, error } = await supabase
            .from('quiz_answers')
            .insert({
              user_id: userId,
              answers: data.answers,
              completed: data.completed
            })
            .select()
            .single();
            
          if (error) throw error;
          result = newQuiz;
        }
        
        return result;
      } catch (error) {
        console.error("Error saving quiz answers:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      // Update the existing quiz data in state instead of invalidating a query
      setExistingQuiz(data);
      
      if (data.completed) {
        // Generate the compatibility profile
        const profile = calculateCompatibilityProfile(answers);
        
        // Generate report with the calculated profile using Supabase
        generateReportMutation.mutate({
          quizId: data.id,
          compatibilityProfile: profile,
          isPaid: false
        });
      }
    },
    onError: (error) => {
      console.error("Quiz save error:", error);
      toast({
        title: "Error",
        description: "Failed to save your answers. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Generate report mutation using Supabase directly
  const generateReportMutation = useMutation({
    mutationFn: async (data: { quizId: number, compatibilityProfile: any, isPaid: boolean }) => {
      try {
        // Get the Supabase client
        const supabase = getSupabaseClient();
        
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error("No active session");
        }
        
        const userId = session.user.id;
        
        // Check if user already has a report
        const { data: existingReport } = await supabase
          .from('reports')
          .select('id')
          .eq('user_id', userId)
          .maybeSingle();
        
        let result;
        
        if (existingReport) {
          // Update existing report
          const { data: updatedReport, error } = await supabase
            .from('reports')
            .update({
              quiz_id: data.quizId,
              compatibility_profile: data.compatibilityProfile,
              is_paid: data.isPaid
            })
            .eq('id', existingReport.id)
            .select()
            .single();
            
          if (error) throw error;
          result = updatedReport;
        } else {
          // Create new report
          const { data: newReport, error } = await supabase
            .from('reports')
            .insert({
              user_id: userId,
              quiz_id: data.quizId,
              compatibility_profile: data.compatibilityProfile,
              is_paid: data.isPaid
            })
            .select()
            .single();
            
          if (error) throw error;
          result = newReport;
        }
        
        return result;
      } catch (error) {
        console.error("Error generating report:", error);
        throw error;
      }
    },
    onSuccess: (report) => {
      // Store report in sessionStorage for easy access from results page
      sessionStorage.setItem('compatibilityReport', JSON.stringify(report));
      
      // Always save answers to session storage (for backup/recovery purposes)
      sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
      
      // Navigate to results using Supabase
      navigate('/results-supabase');
    },
    onError: (error) => {
      console.error("Report generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate your report. Please try again after logging in.",
        variant: "destructive",
      });
      
      // Store answers locally regardless
      sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
      
      // For logged-in users, redirect to results page anyway
      // For guest users, redirect to authentication page
      if (localUser) {
        navigate('/results');
      } else {
        navigate('/auth');
      }
    }
  });
  
  // Load existing answers if available
  useEffect(() => {
    if (existingQuiz && typeof existingQuiz === 'object' && 'answers' in existingQuiz && existingQuiz.answers) {
      setAnswers(existingQuiz.answers as Record<number, number>);
      
      if ('completed' in existingQuiz && existingQuiz.completed) {
        setQuizCompleted(true);
        navigate('/results');
      } else {
        // Find the next unanswered question
        const answeredIds = Object.keys(existingQuiz.answers as Record<number, number>).map(Number);
        if (answeredIds.length > 0) {
          const nextId = Math.max(...answeredIds) + 1;
          if (nextId <= quizQuestions.length) {
            setCurrentQuestionId(nextId);
            setShowIntro(false);
          }
        }
      }
    }
  }, [existingQuiz, navigate]);
  
  // Start the quiz
  const handleStartQuiz = () => {
    setShowIntro(false);
    // Show initial honesty reminder
    toast({
      title: "💭 Honesty Matters",
      description: "Remember, there are no 'right' answers—only honest ones that help you understand yourself better.",
    });
  };
  
  // Handle answer selection
  const handleAnswerSelected = (answerIndex: number) => {
    if (currentQuestion) {
      const newAnswers = { ...answers, [currentQuestion.id]: answerIndex };
      setAnswers(newAnswers);
      
      // If user is logged in, save to database
      if (localUser) {
        saveQuizMutation.mutate({
          answers: newAnswers,
          completed: false
        });
      }
    }
  };
  
  // Go to next question
  const handleNextQuestion = () => {
    if (currentQuestion) {
      // Check if we're at the last question
      const isLastQuestion = currentQuestion.id === quizQuestions.length;
      
      if (isLastQuestion) {
        setQuizCompleted(true);
        
        // If user is logged in, complete the quiz in the database
        if (localUser) {
          saveQuizMutation.mutate({
            answers,
            completed: true
          });
        } else {
          // For non-logged in users, store in session and redirect to auth
          sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
          toast({
            title: "Login Required",
            description: "To view your personalized compatibility report, please create an account or log in.",
          });
          navigate('/auth');
        }
      } else {
        // Go to next question
        setCurrentQuestionId(currentQuestion.id + 1);
        
        // Show honesty reminder periodically (every ~5-8 questions)
        if (currentQuestion.id >= lastReminderQuestion + 5 + Math.floor(Math.random() * 4)) {
          const reminderIndex = Math.floor(Math.random() * honestyReminders.length);
          toast({
            title: "💭 Honesty Check",
            description: honestyReminders[reminderIndex],
          });
          setLastReminderQuestion(currentQuestion.id);
        }
        
        // Show section change toast when moving to a new section
        const currentSection = currentQuestion.section;
        const nextQuestion = quizQuestions.find(q => q.id === currentQuestion.id + 1);
        
        if (nextQuestion && nextQuestion.section !== currentSection) {
          let nextSectionName = '';
          switch(nextQuestion.section) {
            case 'emotional':
              nextSectionName = 'Emotional Intelligence & Attachment';
              break;
            case 'values':
              nextSectionName = 'Values & Beliefs';
              break;
            case 'physical':
              nextSectionName = 'Intimacy & Boundaries';
              break;
            default:
              nextSectionName = 'Next Section';
          }
          
          toast({
            title: `Moving to ${nextSectionName}`,
            description: "Great job! You've completed a section of the assessment.",
          });
        }
      }
    }
  };
  
  // Go to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestion && currentQuestion.id > 1) {
      setCurrentQuestionId(currentQuestion.id - 1);
    }
  };
  
  // Determine if we can go to the next question
  const canGoNext = currentQuestion ? answers[currentQuestion.id] !== undefined : false;
  const isLastQuestion = currentQuestion ? currentQuestion.id === quizQuestions.length : false;
  
  // Handle authentication and loading states
  if (isUserLoading) {
    // Initial loading
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-3xl">
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Check for authentication error but allow guest users
  if (isUserError) {
    // Show intro page for guests
    if (showIntro) {
      // Do nothing, the render after this condition will show the intro
    } else {
      // Handle answers locally for guest users
      console.log("User is not authenticated, storing answers locally only");
    }
  }
  
  return (
    <div className="pt-20 px-4 pb-12">
      <Helmet>
        <title>Compatibility Assessment | WhoToDate</title>
        <meta name="description" content="Take our scientifically-designed compatibility assessment to discover your unique relationship patterns and find your most compatible match types." />
      </Helmet>
      
      <div className="container mx-auto max-w-3xl">
        {showIntro ? (
          <QuizIntro onStart={handleStartQuiz} />
        ) : (
          <>
            {currentQuestion && (
              <>
                <ProgressBar
                  currentQuestion={currentQuestion.id}
                  totalQuestions={quizQuestions.length}
                />
                
                <SectionInfo
                  section={currentQuestion.section}
                  questionNumber={currentQuestion.id}
                />
                
                <QuizQuestion
                  question={currentQuestion}
                  selectedAnswer={answers[currentQuestion.id]}
                  onAnswerSelected={handleAnswerSelected}
                />
                
                <QuizNavigation
                  onNext={handleNextQuestion}
                  onPrevious={handlePreviousQuestion}
                  canGoNext={canGoNext}
                  isLastQuestion={isLastQuestion}
                  showPrevious={currentQuestion.id > 1}
                  isPending={saveQuizMutation.isPending || generateReportMutation.isPending}
                />
              </>
            )}
          </>
        )}
        
        {/* Mobile sticky progress indicator */}
        {!showIntro && currentQuestion && (
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-neutral-200 p-2 md:hidden">
            <div className="h-1 w-full bg-neutral-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300" 
                style={{ width: `${Math.round((currentQuestion.id / quizQuestions.length) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
