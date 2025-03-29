import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { questions } from "@/lib/questions";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import QuizLayout from "@/components/quiz/QuizLayout";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import ProgressBar from "@/components/quiz/ProgressBar";
import ResultPreview from "@/components/quiz/ResultPreview";

const Quiz = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  // Get user data
  const { data: user } = useQuery({ 
    queryKey: ['/api/me'],
    retry: false,
    refetchOnWindowFocus: false
  });
  
  // Check for existing quiz answers
  const { data: existingQuiz, isLoading: isQuizLoading } = useQuery({ 
    queryKey: ['/api/quiz'],
    enabled: !!user,
    retry: false,
    refetchOnWindowFocus: false
  });
  
  // Save quiz answers mutation
  const saveQuizMutation = useMutation({
    mutationFn: async (data: { answers: Record<number, number>, completed: boolean }) => {
      const res = await apiRequest("POST", "/api/quiz", data);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/quiz'] });
      
      if (data.completed) {
        // Generate report mutation (when completed)
        generateReportMutation.mutate({
          quizId: data.id,
          report: {
            personalityTraits: {
              openness: calculateTraitScore('openness', answers),
              conscientiousness: calculateTraitScore('conscientiousness', answers),
              extraversion: calculateTraitScore('extraversion', answers),
              agreeableness: calculateTraitScore('agreeableness', answers),
              neuroticism: calculateTraitScore('neuroticism', answers)
            },
            attachmentStyle: determineAttachmentStyle(answers),
            mbtiType: determineMbtiType(answers),
            emotionalIntelligence: calculateEqScore(answers),
            compatibilityDetails: generateCompatibilityDetails(answers)
          },
          compatibilityColor: determineCompatibilityColor(answers),
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
      setShowResult(true);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate your report. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Load existing answers if available
  useEffect(() => {
    if (existingQuiz && existingQuiz.answers) {
      setAnswers(existingQuiz.answers);
      
      if (existingQuiz.completed) {
        setQuizCompleted(true);
        setShowResult(true);
      }
    }
  }, [existingQuiz]);
  
  const handleAnswer = (questionId: number, answerIndex: number) => {
    const newAnswers = { ...answers, [questionId]: answerIndex };
    setAnswers(newAnswers);
    
    // Save answers to API
    saveQuizMutation.mutate({
      answers: newAnswers,
      completed: false
    });
    
    // Move to next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmit = () => {
    setQuizCompleted(true);
    
    // Save completed quiz
    saveQuizMutation.mutate({
      answers,
      completed: true
    });
  };
  
  // Simple mock functions for report generation
  const calculateTraitScore = (trait: string, answers: Record<number, number>) => {
    // In a real app, this would use a scoring algorithm based on specific questions
    return Math.floor(Math.random() * 40) + 60; // Random score between 60-100
  };
  
  const determineAttachmentStyle = (answers: Record<number, number>) => {
    const styles = ['secure', 'anxious', 'avoidant', 'fearful'];
    return styles[Math.floor(Math.random() * styles.length)];
  };
  
  const determineMbtiType = (answers: Record<number, number>) => {
    const types = ['INFJ', 'INTJ', 'ENFP', 'ISTJ', 'ESFJ', 'ENFJ'];
    return types[Math.floor(Math.random() * types.length)];
  };
  
  const calculateEqScore = (answers: Record<number, number>) => {
    return {
      selfAwareness: Math.floor(Math.random() * 30) + 70,
      selfRegulation: Math.floor(Math.random() * 40) + 60,
      motivation: Math.floor(Math.random() * 20) + 80,
      empathy: Math.floor(Math.random() * 30) + 70,
      socialSkills: Math.floor(Math.random() * 30) + 70
    };
  };
  
  const generateCompatibilityDetails = (answers: Record<number, number>) => {
    return {
      strengths: ['Empathy', 'Communication', 'Loyalty'],
      challenges: ['Patience', 'Flexibility', 'Trust'],
      idealPartner: ['Understanding', 'Supportive', 'Independent']
    };
  };
  
  const determineCompatibilityColor = (answers: Record<number, number>) => {
    const colors = ['green', 'yellow', 'red'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  if (!user) {
    return (
      <QuizLayout
        title="Authentication Required"
        description="Please log in to take the compatibility assessment."
      >
        <div className="text-center">
          <p className="mb-6">You need to be logged in to save your assessment results.</p>
          <button 
            className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition"
            onClick={() => navigate("/login?redirect=quiz")}
          >
            Log In or Register
          </button>
        </div>
      </QuizLayout>
    );
  }
  
  if (isQuizLoading) {
    return (
      <QuizLayout title="Loading Assessment...">
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </QuizLayout>
    );
  }
  
  if (showResult) {
    return (
      <QuizLayout 
        title="Assessment Complete" 
        description="Here's a preview of your compatibility profile."
      >
        {existingQuiz && (
          <ResultPreview 
            answers={answers} 
            userId={user.id} 
            quizId={existingQuiz.id} 
          />
        )}
      </QuizLayout>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <QuizLayout 
      title="Compatibility Assessment" 
      description="Answer honestly for the most accurate results."
    >
      <ProgressBar 
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
      
      <QuizQuestion
        question={currentQuestion}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        currentAnswerIndex={answers[currentQuestion.id]}
        showPreviousButton={currentQuestionIndex > 0}
        showNextButton={true}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
        onSubmit={handleSubmit}
      />
    </QuizLayout>
  );
};

export default Quiz;
