import { useState } from "react";
import { QuizQuestion as QuizQuestionType } from "@/lib/quizData";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (questionId: number, answerIndex: number) => void;
  onPrevious: () => void;
  currentAnswerIndex?: number;
  showPreviousButton: boolean;
  showNextButton: boolean;
  isLastQuestion: boolean;
  onSubmit?: () => void;
}

const QuizQuestion = ({
  question,
  onAnswer,
  onPrevious,
  currentAnswerIndex,
  showPreviousButton,
  showNextButton,
  isLastQuestion,
  onSubmit
}: QuizQuestionProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(currentAnswerIndex);
  const { toast } = useToast();

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  const handleNext = () => {
    if (selectedIndex === undefined) {
      toast({
        title: "Please select an answer",
        description: "You need to select an option before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    onAnswer(question.id, selectedIndex);
  };

  const handleSubmit = () => {
    if (selectedIndex === undefined) {
      toast({
        title: "Please select an answer",
        description: "You need to select an option before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    onAnswer(question.id, selectedIndex);
    if (onSubmit) onSubmit();
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="font-medium mb-4">{question.text}</p>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label 
              key={index} 
              className={`flex items-center p-3 rounded-lg border ${
                selectedIndex === index 
                  ? 'border-primary bg-primary/5' 
                  : 'border-neutral-dark/10 hover:border-primary'
              } cursor-pointer transition`}
            >
              <input 
                type="radio" 
                name={`question-${question.id}`} 
                className="h-4 w-4 text-primary" 
                checked={selectedIndex === index}
                onChange={() => handleSelect(index)}
              />
              <span className="ml-3">{option}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        {showPreviousButton ? (
          <Button 
            variant="outline" 
            onClick={onPrevious}
          >
            Previous
          </Button>
        ) : (
          <div></div>
        )}
        
        {isLastQuestion ? (
          <Button 
            onClick={handleSubmit}
            disabled={selectedIndex === undefined}
          >
            Submit
          </Button>
        ) : (
          showNextButton && (
            <Button 
              onClick={handleNext}
              disabled={selectedIndex === undefined}
            >
              Next
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
