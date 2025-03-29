import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ResultPreview from "@/components/quiz/ResultPreview";
import QuizLayout from "@/components/quiz/QuizLayout";

const Results = () => {
  const [, navigate] = useLocation();
  
  // Check if user is authenticated
  const { data: user, isLoading: isUserLoading } = useQuery({ 
    queryKey: ['/api/me'],
    retry: false,
    refetchOnWindowFocus: false
  });
  
  // Check for quiz answers
  const { data: quiz, isLoading: isQuizLoading } = useQuery({ 
    queryKey: ['/api/quiz'],
    enabled: !!user,
    retry: false,
    refetchOnWindowFocus: false
  });
  
  // Redirect to quiz if not completed
  useEffect(() => {
    if (!isUserLoading && !isQuizLoading) {
      if (!user) {
        navigate("/login?redirect=results");
      } else if (!quiz || !quiz.completed) {
        navigate("/quiz");
      }
    }
  }, [user, quiz, isUserLoading, isQuizLoading, navigate]);
  
  if (isUserLoading || isQuizLoading) {
    return (
      <QuizLayout title="Loading Results...">
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </QuizLayout>
    );
  }
  
  if (!user) {
    return (
      <QuizLayout
        title="Authentication Required"
        description="Please log in to view your results."
      >
        <div className="text-center">
          <p className="mb-6">You need to be logged in to see your assessment results.</p>
          <Button asChild>
            <Link href="/login?redirect=results">Log In</Link>
          </Button>
        </div>
      </QuizLayout>
    );
  }
  
  if (!quiz || !quiz.completed) {
    return (
      <QuizLayout
        title="Assessment Not Completed"
        description="You need to complete the assessment first."
      >
        <div className="text-center">
          <p className="mb-6">You haven't completed the compatibility assessment yet.</p>
          <Button asChild>
            <Link href="/quiz">Take Assessment</Link>
          </Button>
        </div>
      </QuizLayout>
    );
  }
  
  return (
    <QuizLayout 
      title="Your Assessment Results" 
      description="Here's a preview of your compatibility profile."
    >
      <ResultPreview 
        answers={quiz.answers} 
        userId={user.id} 
        quizId={quiz.id} 
      />
    </QuizLayout>
  );
};

export default Results;
