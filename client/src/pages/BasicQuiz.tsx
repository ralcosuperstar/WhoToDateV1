import React, { useState } from 'react';
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";

// Very basic quiz component with minimal dependencies
const BasicQuiz = () => {
  const [, navigate] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  
  // Simple test questions
  const questions = [
    {
      text: "How would you describe your communication style?",
      options: [
        "I'm direct and straightforward",
        "I'm thoughtful and diplomatic",
        "I adapt based on the situation",
        "I prefer to listen more than speak"
      ]
    },
    {
      text: "How do you typically handle conflict?",
      options: [
        "Address it immediately and directly",
        "Take time to process before responding",
        "Try to find a compromise",
        "Prefer to avoid confrontation"
      ]
    },
    {
      text: "What's most important to you in a relationship?",
      options: [
        "Honesty and open communication",
        "Emotional support and understanding",
        "Growth and shared experiences",
        "Space and independence"
      ]
    }
  ];
  
  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    
    // Move to next question or finish
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save answers to session storage
      sessionStorage.setItem('basicQuizAnswers', JSON.stringify(newAnswers));
      
      // Navigate to home page (simulating completion)
      alert("Quiz completed! Thanks for taking it.");
      navigate('/');
    }
  };
  
  return (
    <div className="pt-20 px-4 pb-12">
      <Helmet>
        <title>Basic Quiz | WhoToDate</title>
      </Helmet>
      
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Basic Compatibility Quiz</h2>
          <p className="mb-6 text-neutral-500">Question {currentQuestion + 1} of {questions.length}</p>
          
          <div className="mb-6">
            <h3 className="text-xl mb-4">{questions[currentQuestion].text}</h3>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="w-full text-left p-4 rounded-lg border border-neutral-200 hover:border-primary"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-neutral-500">
            Progress: {currentQuestion + 1} / {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicQuiz;