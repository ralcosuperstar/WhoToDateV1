import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { quizQuestions } from "@/lib/quizData";
import { calculateCompatibilityProfile } from "@/lib/compatibilityAnalysis";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronRight, Info, Check } from "lucide-react";
import { useSupabase } from "@/contexts/NewSupabaseContext";
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
  
  return (
    <div className="mb-6 text-center">
      <span className="inline-block text-3xl mb-2">{icon}</span>
      <h2 className="text-xl font-heading font-bold mb-1">{title}</h2>
      <p className="text-neutral-dark/70 text-sm">{description}</p>
      <div className="mt-3 text-xs text-primary font-medium">
        Section {sectionNumber} of 4 • Question {questionNumber} of 40
      </div>
    </div>
  );
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

/**
 * FixedQuiz Component - A more resilient version of the Quiz component
 * This version handles authentication and database interaction more gracefully
 */
const FixedQuiz = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Quiz state
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Current question based on ID
  const currentQuestion = quizQuestions.find(q => q.id === currentQuestionId);
  
  // Get authentication state from context
  const { user } = useSupabase();
  
  // Force rendering after a short timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Load existing quiz data when component mounts
  useEffect(() => {
    const loadQuizData = async () => {
      // Skip if showing intro - we'll load data only when user starts the quiz
      if (showIntro) return;
      
      try {
        // Try to load from local storage first
        const savedAnswers = sessionStorage.getItem('quizAnswers');
        if (savedAnswers) {
          const parsedAnswers = JSON.parse(savedAnswers);
          setAnswers(parsedAnswers);
          
          // Find the next unanswered question
          const answeredIds = Object.keys(parsedAnswers).map(Number);
          if (answeredIds.length > 0) {
            const maxAnswered = Math.max(...answeredIds);
            if (maxAnswered < quizQuestions.length) {
              setCurrentQuestionId(maxAnswered + 1);
            }
          }
        }
        
        // If user is logged in, load from database
        if (user) {
          try {
            // Since quizService doesn't exist, use direct Supabase queries
            const supabase = await getSupabaseClient();
            
            const { data, error } = await supabase
              .from('quiz_answers')
              .select('*')
              .eq('user_id', user.id)
              .maybeSingle();
            
            if (error) {
              console.error("Error loading quiz data:", error);
              return;
            }
            
            if (data) {
              // If the quiz is completed, redirect to results
              if (data.completed) {
                navigate('/results');
                return;
              }
              
              // If database has answers, use those (overriding local storage)
              if (data.answers && typeof data.answers === 'object') {
                setAnswers(data.answers as Record<number, number>);
                
                // Find the next unanswered question
                const answeredIds = Object.keys(data.answers as Record<number, number>).map(Number);
                if (answeredIds.length > 0) {
                  const maxAnswered = Math.max(...answeredIds);
                  if (maxAnswered < quizQuestions.length) {
                    setCurrentQuestionId(maxAnswered + 1);
                  }
                }
              }
            }
          } catch (dbErr) {
            console.error("Database error loading quiz:", dbErr);
            // Continue with local storage data
          }
        }
      } catch (err) {
        console.error("Failed to load quiz data:", err);
        // Continue without existing data - the user can start fresh
      }
    };
    
    loadQuizData();
  }, [showIntro, user, navigate]);
  
  // Save answers to storage and database
  const saveAnswers = async (newAnswers: Record<number, number>, completed: boolean) => {
    try {
      // Always save to session storage
      sessionStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
      
      // If user is logged in, save to database
      if (user) {
        setSaving(true);
        
        try {
          // Since quizService doesn't exist, use direct Supabase queries
          const supabase = await getSupabaseClient();
          
          // Check if user already has quiz answers
          const { data: existingAnswers, error: checkError } = await supabase
            .from('quiz_answers')
            .select('id')
            .eq('user_id', user.id)
            .maybeSingle();
            
          if (checkError) throw checkError;
          
          let result;
          
          if (existingAnswers) {
            // Update existing quiz answers
            const { error } = await supabase
              .from('quiz_answers')
              .update({
                answers: newAnswers,
                completed
              })
              .eq('id', existingAnswers.id);
              
            if (error) throw error;
          } else {
            // Create new quiz answers
            const { error } = await supabase
              .from('quiz_answers')
              .insert({
                user_id: user.id,
                answers: newAnswers,
                completed
              });
              
            if (error) throw error;
          }
        } catch (dbErr) {
          console.error("Database error saving quiz answers:", dbErr);
          // Continue with local storage only
        }
      }
    } catch (err) {
      console.error("Error in saveAnswers function:", err);
      // Don't throw - continue with local storage only
    } finally {
      setSaving(false);
    }
  };
  
  // Complete the quiz and generate report
  const completeQuiz = async () => {
    try {
      setSubmitting(true);
      
      // First save the answers as completed
      await saveAnswers(answers, true);
      
      // Generate the compatibility profile
      const profile = calculateCompatibilityProfile(answers);
      
      // Always save to session storage for results page to use
      sessionStorage.setItem('compatibilityProfile', JSON.stringify(profile));
      
      // If user is logged in, save report to database
      if (user) {
        try {
          // Since quizService doesn't exist, use direct Supabase queries
          const supabase = await getSupabaseClient();
          
          // Get the quiz ID directly from quiz_answers table
          const { data: quizData, error: quizError } = await supabase
            .from('quiz_answers')
            .select('id')
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (quizError) throw quizError;
          
          if (quizData) {
            // Generate compatibility color
            const compatibilityType = profile.primaryType || 'balanced';
            const colorMap: Record<string, string> = {
              passionate: '#e83a8e', // pink
              secure: '#4ade80',     // green
              anxious: '#f97316',    // orange
              avoidant: '#3b82f6',   // blue
              balanced: '#8b5cf6',   // purple
            };
            const compatibilityColor = colorMap[compatibilityType] || colorMap.balanced;
            
            // Create report in database
            const { error: reportError } = await supabase
              .from('reports')
              .insert({
                user_id: user.id,
                quiz_id: quizData.id,
                report: profile,
                is_paid: false,
                compatibility_color: compatibilityColor
              });
              
            if (reportError) throw reportError;
          }
        } catch (dbErr) {
          console.error("Error saving report to database:", dbErr);
          // Continue with results page anyway since we have data in session storage
        }
      }
      
      // Navigate to the results page
      navigate('/results');
    } catch (err) {
      console.error("Error completing quiz:", err);
      toast({
        title: "Error",
        description: "There was a problem saving your results, but we'll continue to the results page anyway.",
        variant: "destructive",
      });
      
      // Navigate to results anyway - we have the profile in session storage
      navigate('/results');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Start the quiz
  const handleStartQuiz = () => {
    setShowIntro(false);
    
    // Show initial reminder
    toast({
      title: "💭 Honesty Matters",
      description: "Remember, there are no 'right' answers—only honest ones that help you understand yourself better.",
    });
  };
  
  // Handle answer selection
  const handleAnswerSelected = (answerIndex: number) => {
    if (!currentQuestion) return;
    
    // Update local state
    const newAnswers = { ...answers, [currentQuestion.id]: answerIndex };
    setAnswers(newAnswers);
    
    // Save answers in the background (don't wait for it to complete)
    saveAnswers(newAnswers, false).catch(err => {
      console.error("Background save failed:", err);
    });
  };
  
  // Go to next question
  const handleNextQuestion = async () => {
    if (!currentQuestion) return;
    
    // Check if this is the last question
    const isLast = currentQuestion.id === quizQuestions.length;
    
    if (isLast) {
      // We're at the last question, complete the quiz
      if (user) {
        // User is logged in, complete the quiz properly
        await completeQuiz();
      } else {
        // Not logged in, save to session storage and redirect to auth
        sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
        toast({
          title: "Login Required",
          description: "To see your personalized results, please create an account or log in.",
        });
        navigate('/auth');
      }
    } else {
      // Not the last question, just go to the next one
      setCurrentQuestionId(currentQuestion.id + 1);
      
      // Show a reminder occasionally (20% chance if more than 5 questions since last reminder)
      if (Math.random() < 0.2 && currentQuestion.id % 5 === 0) {
        const reminderIndex = Math.floor(Math.random() * honestyReminders.length);
        toast({
          title: "💭 Quick Reminder",
          description: honestyReminders[reminderIndex],
        });
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
  
  // Show loading state
  if (loading) {
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col items-center py-12">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-neutral-500">Loading quiz...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Main quiz UI
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
                  isPending={saving || submitting}
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

export default FixedQuiz;