interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar = ({ currentQuestion, totalQuestions }: ProgressBarProps) => {
  const progress = Math.floor((currentQuestion / totalQuestions) * 100);
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-neutral-dark/70">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <div className="w-full h-2 bg-neutral-dark/10 rounded-full">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
