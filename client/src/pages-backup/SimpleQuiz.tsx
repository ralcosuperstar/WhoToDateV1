import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { quizQuestions } from "@/lib/quizData";
import { calculateCompatibilityProfile } from "@/lib/compatibilityAnalysis";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useSupabase } from "@/contexts/NewSupabaseContext";
import { getSupabaseClient } from "@/lib/supabase";

// Quiz component wrappers
const QuizLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-20 px-4 pb-12">
      <Helmet>
        <title>Compatibility Assessment | WhoToDate</title>
        <meta name="description" content="Take our scientifically-designed compatibility assessment to discover your unique relationship patterns and find your most compatible match types." />
      </Helmet>
      <div className="container mx-auto max-w-3xl">
        {children}
      </div>
    </div>
  );
};

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
          <span className="mr-2">ℹ️</span>
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

// Main Quiz Component
const SimpleQuiz = () => {
  // Navigation
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Quiz state
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSaving, setIsSaving] = useState(false);
  
  // Current question based on ID
  const currentQuestion = quizQuestions.find(q => q.id === currentQuestionId);
  
  // Auth state from Supabase
  const { user } = useSupabase();
  
  // Load existing quiz data if user is logged in and we're not showing intro
  useEffect(() => {
    if (!user || showIntro) return;
    
    const loadQuizData = async () => {
      try {
        const supabase = await getSupabaseClient();
        
        // Get any existing quiz data
        const { data, error } = await supabase
          .from('quiz_answers')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (error) {
          console.error("Error loading quiz data:", error);
          return;
        }
        
        if (data && data.answers) {
          // If quiz is complete, go to results
          if (data.completed) {
            navigate('/results');
            return;
          }
          
          // Otherwise, load the answers and find next unanswered question
          setAnswers(data.answers as Record<number, number>);
          const answeredQuestions = Object.keys(data.answers as Record<number, number>).map(Number);
          
          if (answeredQuestions.length > 0) {
            const maxAnswered = Math.max(...answeredQuestions);
            if (maxAnswered < quizQuestions.length) {
              setCurrentQuestionId(maxAnswered + 1);
              setShowIntro(false);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load quiz data:", err);
      }
    };
    
    loadQuizData();
  }, [user, showIntro, navigate]);
  
  // Save answers to database (if logged in)
  const saveAnswers = async (newAnswers: Record<number, number>, completed: boolean) => {
    if (!user) {
      // Just save to session storage for non-logged in users
      sessionStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
      return;
    }
    
    setIsSaving(true);
    
    try {
      const supabase = await getSupabaseClient();
      
      // Check if user already has quiz answers
      const { data: existing } = await supabase
        .from('quiz_answers')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (existing) {
        // Update existing answers
        await supabase
          .from('quiz_answers')
          .update({
            answers: newAnswers,
            completed
          })
          .eq('id', existing.id);
      } else {
        // Create new quiz answers
        await supabase
          .from('quiz_answers')
          .insert({
            user_id: user.id,
            answers: newAnswers,
            completed
          });
      }
      
      // Also save to session storage as backup
      sessionStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
    } catch (err) {
      console.error("Error saving quiz answers:", err);
      toast({
        title: "Error",
        description: "There was a problem saving your answers. We'll keep them in your browser storage.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Save completed quiz and generate report
  const completeQuiz = async () => {
    // First save the quiz as completed
    await saveAnswers(answers, true);
    
    // Always generate and save profile to session storage
    const profile = calculateCompatibilityProfile(answers);
    sessionStorage.setItem('compatibilityProfile', JSON.stringify(profile));
    
    // If user is logged in, save report to database
    if (user) {
      try {
        const supabase = await getSupabaseClient();
        
        // Get the quiz id
        const { data: quizData } = await supabase
          .from('quiz_answers')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (quizData) {
          // Save report to database
          await supabase
            .from('reports')
            .upsert({
              user_id: user.id,
              quiz_id: quizData.id,
              report: profile,
              is_paid: false
            });
        }
      } catch (err) {
        console.error("Error saving report:", err);
        // We can still continue since we have the profile in session storage
      }
    }
    
    // Create a mock report for the results page
    const mockReport = {
      id: 0,
      user_id: user?.id || '0',
      quiz_id: 0,
      report: profile,
      is_paid: false,
      created_at: new Date().toISOString()
    };
    
    // Save to session storage and navigate to results
    sessionStorage.setItem('compatibilityReport', JSON.stringify(mockReport));
    navigate('/results');
  };
  
  // Start the quiz
  const handleStartQuiz = () => {
    setShowIntro(false);
    toast({
      title: "💭 Honesty Matters",
      description: "Remember, there are no 'right' answers—only honest ones that help you understand yourself better.",
    });
  };
  
  // Handle answer selection
  const handleAnswerSelected = (answerIndex: number) => {
    if (!currentQuestion) return;
    
    const newAnswers = { ...answers, [currentQuestion.id]: answerIndex };
    setAnswers(newAnswers);
    
    // Save in background but don't block UI
    saveAnswers(newAnswers, false);
  };
  
  // Go to next question
  const handleNextQuestion = async () => {
    if (!currentQuestion) return;
    
    const isLastQuestion = currentQuestion.id === quizQuestions.length;
    
    if (isLastQuestion) {
      // Completing the quiz - handle differently for logged in vs. guest
      if (user) {
        // User is logged in, complete quiz and show results
        await completeQuiz();
      } else {
        // User is not logged in, save to session storage and redirect to auth page
        sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
        toast({
          title: "Login Required",
          description: "To see your personalized results, please create an account or log in.",
        });
        navigate('/auth');
      }
    } else {
      // Not the last question, just go to next
      setCurrentQuestionId(currentQuestion.id + 1);
      
      // Show a reminder message every 10 questions
      if (currentQuestion.id % 10 === 0) {
        toast({
          title: "💭 Remember",
          description: "Your honest answers will lead to the most accurate results and insights.",
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
  
  return (
    <QuizLayout>
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
                isPending={isSaving}
              />
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
        </>
      )}
    </QuizLayout>
  );
};

export default SimpleQuiz;