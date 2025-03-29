import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { generateCompatibilityProfile } from '@/lib/compatibility';

interface ResultPreviewProps {
  answers: Record<number, number>;
  userId: number;
  quizId: number;
}

const ResultPreview = ({ answers, userId, quizId }: ResultPreviewProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [compatibilityColor, setCompatibilityColor] = useState<'green' | 'yellow' | 'red'>();
  const [compatibilityEmoji, setCompatibilityEmoji] = useState<string>('');
  
  useEffect(() => {
    // Simulate generating the preview results
    const timer = setTimeout(() => {
      const result = generateCompatibilityProfile(answers);
      setCompatibilityColor(result.color);
      
      // Set emoji based on color
      if (result.color === 'green') {
        setCompatibilityEmoji('✅');
      } else if (result.color === 'yellow') {
        setCompatibilityEmoji('⚠️');
      } else {
        setCompatibilityEmoji('🚫');
      }
      
      setIsGenerating(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [answers]);
  
  const colorClasses = {
    green: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-500',
      dot: 'bg-emerald-500',
      border: 'border-emerald-500'
    },
    yellow: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-500',
      dot: 'bg-amber-500',
      border: 'border-amber-500'
    },
    red: {
      bg: 'bg-red-500/10',
      text: 'text-red-500',
      dot: 'bg-red-500',
      border: 'border-red-500'
    }
  };
  
  const selectedColor = compatibilityColor ? colorClasses[compatibilityColor] : colorClasses.green;

  return (
    <div className="text-center">
      <h2 className="font-heading font-bold text-2xl mb-6">Your Compatibility Preview</h2>
      
      {isGenerating ? (
        <div className="space-y-4">
          <div className="mx-auto w-24 h-24 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
          <p>Analyzing your responses...</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className={`mx-auto w-24 h-24 rounded-full ${selectedColor.bg} flex items-center justify-center mb-4`}>
              <span className="text-4xl">{compatibilityEmoji}</span>
            </div>
            
            <h3 className="font-heading font-semibold text-xl mb-2">
              You have a{" "}
              <span className={selectedColor.text}>
                {compatibilityColor?.charAt(0).toUpperCase() + compatibilityColor?.slice(1)}
              </span>{" "}
              Compatibility Profile
            </h3>
            
            <Card className="max-w-lg mx-auto mt-6">
              <CardContent className="pt-6">
                <div className={`px-3 py-1.5 ${selectedColor.bg} ${selectedColor.text} text-sm rounded-full font-medium inline-flex items-center mb-4`}>
                  <span className={`h-2 w-2 ${selectedColor.dot} rounded-full mr-1`}></span>
                  {compatibilityColor === 'green' && 'Adaptable & Balanced'}
                  {compatibilityColor === 'yellow' && 'Selective & Specific'}
                  {compatibilityColor === 'red' && 'Particular & Defined'}
                </div>
                
                <p className="mb-4">
                  {compatibilityColor === 'green' && 
                    'Your responses indicate you have a flexible personality with balanced traits that can adapt to various relationship dynamics.'}
                  {compatibilityColor === 'yellow' && 
                    'Your profile shows specific preferences in relationships. You value certain traits and may need alignment in key areas.'}
                  {compatibilityColor === 'red' && 
                    'You have well-defined preferences and values. Your ideal relationship requires strong alignment in core areas.'}
                </p>
                
                <div className="border-t border-neutral-dark/10 pt-4 text-sm text-neutral-dark/70">
                  Get your complete report to see detailed insights about your personality traits, attachment style, and compatibility patterns.
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild>
              <Link href="/payment">Get Full Report</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultPreview;
