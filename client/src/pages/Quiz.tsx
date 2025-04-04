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
  
  switch(section) {
    case 'personality':
      title = 'Personality Traits';
      description = 'These questions help us understand your natural tendencies and how you interact with the world.';
      icon = '👤';
      break;
    case 'emotional':
      title = 'Emotional Intelligence & Attachment';
      description = 'These questions explore how you connect emotionally and handle relationships.';
      icon = '❤️';
      break;
    case 'values':
      title = 'Values & Beliefs';
      description = 'These questions help us understand what matters most to you in life and relationships.';
      icon = '⚖️';
      break;
    case 'physical':
      title = 'Intimacy & Boundaries';
      description = 'These questions explore your attitudes toward physical and emotional intimacy.';
      icon = '🔐';
      break;
    default:
      title = 'Compatibility Assessment';
      description = 'Answer honestly for the most accurate results.';
      icon = '🧪';
  }
  
  return (
    <div className="mb-6 text-center">
      <span className="inline-block text-3xl mb-2">{icon}</span>
      <h2 className="text-xl font-heading font-bold mb-1">{title}</h2>
      <p className="text-neutral-dark/70 text-sm">{description}</p>
      <div className="mt-3 text-xs text-primary font-medium">
        Section {getSectionNumber(section)} of 4 • Question {questionNumber} of 40
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
            <span>A free basic compatibility profile with the option to unlock the full analysis</span>
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

const Quiz = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Get user data
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useQuery({ 
    queryKey: ['/api/me'],
    retry: false,
    refetchOnWindowFocus: false,
    // Use default on401: "throw" so we get errors instead of retrying endlessly
    staleTime: Infinity,
  });
  
  // Check for existing quiz answers
  const { data: existingQuiz, isLoading: isQuizLoading } = useQuery({ 
    queryKey: ['/api/quiz'],
    enabled: !!user, // Only run this query if we have a user
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  
  // Find current question
  const currentQuestion = quizQuestions.find(q => q.id === currentQuestionId);
  
  // Save quiz answers mutation
  const saveQuizMutation = useMutation({
    mutationFn: async (data: { answers: Record<number, number>, completed: boolean }) => {
      const res = await apiRequest("POST", "/api/quiz", data);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/quiz'] });
      
      if (data.completed) {
        // Generate the compatibility profile
        const profile = calculateCompatibilityProfile(answers);
        
        // Generate report with the calculated profile
        generateReportMutation.mutate({
          quizId: data.id,
          compatibilityProfile: profile,
          isPaid: false
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save your answers. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Generate report mutation
  const generateReportMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/report", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/report'] });
      
      // Save answers to session storage for non-logged in users too
      sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
      
      // Navigate to results
      navigate('/results');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate your report. Please try again.",
        variant: "destructive",
      });
      
      // Even if API fails, still store answers locally and redirect
      sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
      navigate('/results');
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
  };
  
  // Handle answer selection
  const handleAnswerSelected = (answerIndex: number) => {
    if (currentQuestion) {
      const newAnswers = { ...answers, [currentQuestion.id]: answerIndex };
      setAnswers(newAnswers);
      
      // If user is logged in, save to database
      if (user) {
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
        if (user) {
          saveQuizMutation.mutate({
            answers,
            completed: true
          });
        } else {
          // For non-logged in users, store in session and redirect
          sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
          navigate('/results');
        }
      } else {
        // Go to next question
        setCurrentQuestionId(currentQuestion.id + 1);
        
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
