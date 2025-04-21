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
import { userService } from "@/services/supabaseService";

// Quiz sections data
const quizSections = [
  {
    id: 'personality',
    title: 'Personality Traits',
    description: 'These questions help us understand your natural tendencies and how you interact with the world.',
    icon: '👤',
    number: 1
  },
  {
    id: 'emotional',
    title: 'Emotional Intelligence & Attachment',
    description: 'These questions explore how you connect emotionally and handle relationships.',
    icon: '❤️',
    number: 2
  },
  {
    id: 'values',
    title: 'Values & Beliefs',
    description: 'These questions help us understand what matters most to you in life and relationships.',
    icon: '⚖️',
    number: 3
  },
  {
    id: 'physical',
    title: 'Intimacy & Boundaries',
    description: 'These questions explore your attitudes toward physical and emotional intimacy.',
    icon: '🔐',
    number: 4
  }
];

// Progress bar component
const ProgressBar = ({ currentQuestion, totalQuestions }: { currentQuestion: number; totalQuestions: number }) => {
  const progress = Math.round((currentQuestion / totalQuestions) * 100);
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-xs text-neutral-dark/70 mb-1">
        <span>Question {currentQuestion} of {totalQuestions}</span>
        <span>{progress}% Complete</span>
      </div>
      <div className="h-3 w-full bg-[#e83a8e]/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#e83a8e] rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Section overview component to show progress across all sections
const SectionOverview = ({ 
  currentSection, 
  completedQuestions,
  answers
}: { 
  currentSection: string; 
  completedQuestions: number;
  answers: Record<number, number>;
}) => {
  // Calculate sections completion based on questions completed in each section
  const getSectionCompletionStatus = () => {
    // Map to track questions completed per section
    const sectionQuestionCounts: Record<string, { total: number, completed: number }> = {
      personality: { total: 0, completed: 0 },
      emotional: { total: 0, completed: 0 },
      values: { total: 0, completed: 0 },
      physical: { total: 0, completed: 0 }
    };
    
    // Count total questions per section
    quizQuestions.forEach(q => {
      if (sectionQuestionCounts[q.section]) {
        sectionQuestionCounts[q.section].total++;
      }
    });
    
    // Count completed questions per section
    Object.keys(sectionQuestionCounts).forEach(sectionId => {
      // Get all questions in this section
      const sectionQuestions = quizQuestions.filter(q => q.section === sectionId);
      
      // Count how many have been answered (are in the answers object)
      let completedCount = 0;
      sectionQuestions.forEach(q => {
        if (answers && answers[q.id] !== undefined) {
          completedCount++;
        }
      });
      
      sectionQuestionCounts[sectionId].completed = completedCount;
      
      // Debug
      console.log(`Section ${sectionId}: ${completedCount}/${sectionQuestionCounts[sectionId].total} completed`);
    });
    
    // A section is complete if at least 10 questions are completed
    const completedSections = Object.entries(sectionQuestionCounts)
      .filter(([_, counts]) => counts.completed >= 10)
      .map(([section, _]) => section);
      
    console.log("Completed sections:", completedSections);
      
    return {
      completedSections,
      currentSection,
      sectionQuestionCounts
    };
  };
  
  const sectionStatus = getSectionCompletionStatus();
  
  // Get current section index
  const getCurrentSectionIndex = () => {
    return quizSections.findIndex(section => section.id === currentSection);
  };
  
  return (
    <div className="mb-8 bg-white rounded-xl p-4 shadow-md border border-[#e83a8e]/20">
      <h3 className="text-center font-medium mb-5 text-[#e83a8e]">Your Assessment Journey</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quizSections.map((section, index) => {
          const currentSectionIndex = getCurrentSectionIndex();
          const isComplete = sectionStatus.completedSections.includes(section.id);
          const isCurrent = section.id === currentSection;
          const isUpcoming = !isComplete && !isCurrent;
          
          return (
            <div 
              key={section.id}
              className={`text-center p-2 rounded-lg transition-all ${
                isComplete 
                  ? 'bg-[#e83a8e]/10 text-[#e83a8e]' 
                  : isCurrent 
                    ? 'bg-[#e83a8e]/5 border border-[#e83a8e]/30' 
                    : 'bg-gray-50 text-gray-400'
              }`}
            >
              <div className={`mx-auto w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1 ${
                isComplete 
                  ? 'bg-[#e83a8e] text-white' 
                  : isCurrent 
                    ? 'bg-white border-2 border-[#e83a8e]' 
                    : 'bg-gray-100 text-gray-400'
              }`}>
                <span className="text-base sm:text-lg">{isComplete ? '✓' : section.icon}</span>
              </div>
              <div className="text-xs font-medium leading-tight">
                {section.title.split('&')[0].split(' ').slice(0, 2).join(' ')}
              </div>
              <div className="text-[9px] sm:text-[10px] mt-1 opacity-80">
                {isComplete ? 'Complete' : isCurrent ? 'In Progress' : 'Coming Up'}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center">
        <div className="h-2 w-full bg-[#e83a8e]/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#e83a8e] rounded-full transition-all duration-300" 
            style={{ width: `${Math.max(0, (completedQuestions / 40) * 100)}%` }}
          ></div>
        </div>
        <div className="mt-1 sm:mt-0 sm:ml-2 text-xs font-medium text-[#e83a8e] text-center sm:text-left">
          {completedQuestions || 0} of 40 completed
        </div>
      </div>
      
      <div className="mt-3 text-center">
        <div className="text-xs text-neutral-dark/60">
          Complete the assessment to unlock your personalized report
        </div>
        <div className="mt-2 flex justify-center space-x-1">
          <span className="text-sm">🧪</span>
          <span className="text-sm">➡️</span>
          <span className="text-sm">📊</span>
          <span className="text-sm">➡️</span>
          <span className="text-sm">🔍</span>
          <span className="text-sm">➡️</span>
          <span className="text-sm">💖</span>
        </div>
      </div>
    </div>
  );
};



// Question card component with improved styling
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
    <div className="bg-white rounded-xl p-6 shadow-md border border-[#e83a8e]/20">
      <h3 className="text-lg font-medium mb-6 text-center">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              selectedAnswer === index 
                ? 'bg-[#e83a8e]/10 border-[#e83a8e] shadow-sm' 
                : 'border-neutral-200 hover:border-[#e83a8e]/50 hover:bg-[#e83a8e]/5'
            }`}
            onClick={() => onAnswerSelected(index)}
          >
            <div className="flex items-center">
              <div className={`h-5 w-5 rounded-full border transition-colors mr-3 flex-shrink-0 ${
                selectedAnswer === index
                  ? 'bg-[#e83a8e] border-[#e83a8e]'
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
      
      <div className="mt-6 text-center text-xs text-neutral-dark/60 italic">
        Select the answer that best describes you, not what you think is "right"
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
          className="px-4 py-2 border border-[#e83a8e]/20 rounded-lg flex items-center text-neutral-dark hover:bg-[#e83a8e]/5 transition"
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
            ? 'bg-[#e83a8e] text-white hover:bg-[#d02e7d]'
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
            {isLastQuestion ? (
              <>
                <span className="mr-2">See Results</span>
                <span>📊</span>
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </>
        )}
      </button>
    </div>
  );
};

// Introduction screen
const QuizIntro = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border border-[#e83a8e]/20 text-center">
      <span className="text-4xl mb-4 inline-block">🧪</span>
      <h2 className="text-2xl font-heading font-bold mb-3">Scientific Compatibility Assessment</h2>
      <p className="text-neutral-dark/80 mb-6 max-w-lg mx-auto">
        Discover your unique relationship patterns and compatibility profile through this scientifically-designed 40-question assessment.
      </p>
      
      <div className="bg-[#e83a8e]/10 rounded-lg p-4 mb-6 text-left">
        <h3 className="font-medium mb-2 flex items-center text-[#e83a8e]">
          <Info className="h-5 w-5 mr-2" />
          Here's what to expect:
        </h3>
        
        <ul className="space-y-2 text-sm text-neutral-dark/90">
          <li className="flex items-start">
            <span className="h-5 w-5 text-[#e83a8e] mr-2">•</span>
            <span><strong>40 questions</strong> divided into 4 sections (about 8-10 minutes to complete)</span>
          </li>
          <li className="flex items-start">
            <span className="h-5 w-5 text-[#e83a8e] mr-2">•</span>
            <span>Questions about personality, emotional patterns, values, and relationship preferences</span>
          </li>
          <li className="flex items-start">
            <span className="h-5 w-5 text-[#e83a8e] mr-2">•</span>
            <span>A comprehensive compatibility profile with personalized insights and recommendations</span>
          </li>
          <li className="flex items-start">
            <span className="h-5 w-5 text-[#e83a8e] mr-2">•</span>
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
        className="px-8 py-4 bg-[#e83a8e] text-white font-medium rounded-xl shadow-md hover:bg-[#d02e7d] transition flex items-center justify-center mx-auto"
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
          // Use the Auth UUID directly - this is what the database now expects
          const authUserId = user.id;
          
          if (!authUserId) {
            console.error("No auth user ID available");
            // Continue with local storage only
            return;
          }
          
          console.log('Using Auth UUID for database operations:', authUserId);
          
          // Use direct Supabase queries
          const supabase = await getSupabaseClient();
          
          // Check if user already has quiz answers using the Auth UUID
          const { data: existingAnswers, error: checkError } = await supabase
            .from('quiz_answers')
            .select('id')
            .eq('user_id', authUserId)
            .maybeSingle();
            
          if (checkError) throw checkError;
          
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
                user_id: authUserId, // Use the Auth UUID directly
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
          // Use the Auth UUID directly - this is what the database now expects
          const authUserId = user.id;
          
          if (!authUserId) {
            console.error("No auth user ID available");
            toast({
              title: "Database Error",
              description: "Could not find your user account. Your results are saved locally only.",
              variant: "destructive"
            });
            navigate('/local-results');
            return;
          }
          
          console.log("Using Auth UUID for database operations:", authUserId);
          
          // Use direct Supabase queries
          const supabase = await getSupabaseClient();
          
          // Get the quiz ID directly from quiz_answers table using the Auth UUID
          const { data: quizData, error: quizError } = await supabase
            .from('quiz_answers')
            .select('id')
            .eq('user_id', authUserId)
            .maybeSingle();
          
          if (quizError) throw quizError;
          
          if (quizData) {
            // Create report in database - using snake_case for column names to match PostgreSQL conventions
            const { error: reportError } = await supabase
              .from('reports')
              .insert({
                user_id: authUserId, // Use the Auth UUID directly
                quiz_id: quizData.id,
                report: profile,
                is_paid: false
              });
              
            if (reportError) {
              console.error("Error creating report:", reportError);
              throw reportError;
            } else {
              console.log("Successfully saved report to database for user ID:", authUserId);
            }
          } else {
            console.error("No quiz answers found for user ID:", authUserId);
            throw new Error("No quiz answers found");
          }
        } catch (dbErr) {
          console.error("Error saving report to database:", dbErr);
          toast({
            title: "Database Error",
            description: "There was an error saving your report. Your results are saved locally only.",
            variant: "destructive"
          });
          // Continue with results page anyway since we have data in session storage
        }
      }
      
      // Navigate to the results page, preferring the main results page for logged-in users
      // with fallback to local-results for non-logged-in users
      navigate(user ? '/results' : '/local-results');
    } catch (err) {
      console.error("Error completing quiz:", err);
      toast({
        title: "Error",
        description: "There was a problem saving your results, but we'll continue to the results page anyway.",
        variant: "destructive",
      });
      
      // Navigate to results page even on error - we have the profile in session storage
      navigate(user ? '/results' : '/local-results');
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
    
    console.log("Selected answer:", answerIndex, "for question:", currentQuestion.id);
    
    // Update local state
    const newAnswers = { ...answers, [currentQuestion.id]: answerIndex };
    setAnswers(newAnswers);
    
    // Auto-progress to next question after a short delay when an answer is selected
    setTimeout(() => {
      if (currentQuestion.id < quizQuestions.length) {
        handleNextQuestion();
      }
    }, 700);
    
    // Save answers in the background (don't wait for it to complete)
    saveAnswers(newAnswers, false).catch(err => {
      console.error("Background save failed:", err);
    });
  };
  
  // Go to next question
  const handleNextQuestion = async () => {
    if (!currentQuestion) {
      console.error("Next button clicked but currentQuestion is null");
      return;
    }
    
    // Log state for debugging
    console.log("Current question:", currentQuestion.id);
    console.log("Quiz length:", quizQuestions.length);
    console.log("Current answers:", answers);
    
    // Check if this is the last question
    const isLast = currentQuestion.id === quizQuestions.length;
    console.log("Is last question:", isLast);
    
    if (isLast) {
      // We're at the last question, complete the quiz
      if (user) {
        console.log("Completing quiz for logged in user:", user.id);
        // User is logged in, complete the quiz properly
        await completeQuiz();
      } else {
        console.log("User not logged in, redirecting to auth");
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
      const nextQuestionId = currentQuestion.id + 1;
      console.log("Moving to next question:", nextQuestionId);
      setCurrentQuestionId(nextQuestionId);
      
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
                
                {/* New section overview component */}
                {console.log("Current answers state:", answers, "Length:", Object.keys(answers).length)}
                <SectionOverview 
                  currentSection={currentQuestion.section}
                  completedQuestions={Object.keys(answers).length}
                  answers={answers}
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
                
                {/* Final result teaser */}
                {currentQuestion.id > 30 && (
                  <div className="mt-8 bg-[#e83a8e]/5 border border-[#e83a8e]/20 rounded-lg p-4 text-center">
                    <div className="text-sm font-medium text-[#e83a8e] mb-1">
                      Almost there! 
                    </div>
                    <div className="text-xs text-neutral-dark/70">
                      Complete all questions to unlock your personalized compatibility profile and relationship insights.
                    </div>
                    <div className="mt-2 flex justify-center">
                      <span className="text-lg">📊</span>
                      <span className="mx-1">➡️</span>
                      <span className="text-lg">💖</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
        
        {/* Mobile sticky progress indicator */}
        {!showIntro && currentQuestion && (
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#e83a8e]/20 p-2 md:hidden">
            <div className="h-1 w-full bg-[#e83a8e]/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#e83a8e] rounded-full transition-all duration-300" 
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