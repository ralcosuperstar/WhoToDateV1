// Quiz data structure and questions based on psychological frameworks

// Define the option interface to match JSON structure
export interface QuizOption {
  label: string;
  text: string;
  score: number;
}

// Define the question interface to match JSON structure
export interface QuizQuestionRaw {
  id: number;
  section: string;
  question: string;
  options: QuizOption[];
}

// Modified interface for compatibility with existing code
export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  section: 'personality' | 'emotional' | 'values' | 'physical';
  framework?: string;
  rawOptions?: QuizOption[]; // Store the original options with scores
}

// Load quiz questions from JSON file
import rawQuestionsData from '../assets/who_to_date_quiz_questions.json';

// Convert section name from JSON to our internal format
const mapSectionName = (section: string): 'personality' | 'emotional' | 'values' | 'physical' => {
  const sectionMap: Record<string, 'personality' | 'emotional' | 'values' | 'physical'> = {
    'Personality': 'personality',
    'Emotional Intelligence': 'emotional',
    'Values': 'values',
    'Physical': 'physical',
    'Intimacy': 'physical'
  };
  
  return sectionMap[section] || 'personality';
};

// Transform the raw JSON questions to our application format
const transformQuestions = (rawQuestions: QuizQuestionRaw[]): QuizQuestion[] => {
  return rawQuestions.map(raw => {
    // Extract just the text from each option
    const optionTexts = raw.options.map(option => option.text);
    
    return {
      id: raw.id,
      text: raw.question,
      options: optionTexts,
      section: mapSectionName(raw.section),
      rawOptions: raw.options // Keep the original options with scores
    };
  });
};

// Complete set of questions from the JSON file
export const quizQuestions: QuizQuestion[] = transformQuestions(rawQuestionsData as QuizQuestionRaw[]);

// Helper function to get questions by section
export const getQuestionsBySection = (section: QuizQuestion['section']) => {
  return quizQuestions.filter(q => q.section === section);
};

// Helper function to get a question by ID
export const getQuestionById = (id: number) => {
  return quizQuestions.find(q => q.id === id);
};

// Helper function to get the score for a particular answer
export const getScoreForAnswer = (questionId: number, answerIndex: number): number => {
  const question = quizQuestions.find(q => q.id === questionId);
  if (!question || !question.rawOptions || answerIndex < 0 || answerIndex >= question.rawOptions.length) {
    return 0;
  }
  return question.rawOptions[answerIndex].score;
};