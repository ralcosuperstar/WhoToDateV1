// Compatibility profile generation and analysis logic

import type { Question } from "./questions";

// Compatibility color types
export type CompatibilityColor = 'green' | 'yellow' | 'red';

// Profile trait results
export interface ProfileTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

// Attachment style types
export type AttachmentStyle = 'secure' | 'anxious' | 'avoidant' | 'fearful';

// MBTI type string
export type MbtiType = 'INFJ' | 'INTJ' | 'ENFP' | 'ISTJ' | 'ESFJ' | 'ENFJ'; // Limited selection for simplicity

// EQ component scores
export interface EqScores {
  selfAwareness: number;
  selfRegulation: number;
  motivation: number;
  empathy: number;
  socialSkills: number;
}

// Compatibility details structure
export interface CompatibilityDetails {
  strengths: string[];
  challenges: string[];
  idealPartner: string[];
}

// Combined compatibility profile
export interface CompatibilityProfile {
  color: CompatibilityColor;
  personalityTraits: ProfileTraits;
  attachmentStyle: AttachmentStyle;
  mbtiType: MbtiType;
  emotionalIntelligence: EqScores;
  compatibilityDetails: CompatibilityDetails;
}

// Generate a complete compatibility profile from quiz answers
export const generateCompatibilityProfile = (answers: Record<number, number>): CompatibilityProfile => {
  // For this simple version, we'll use a score-based approach to determine the color
  // More sophisticated systems would use comprehensive algorithms for each framework
  
  // Calculate total answer value (crude measure for demo purposes)
  const answersArray = Object.values(answers);
  const answerSum = answersArray.reduce((sum, val) => sum + val, 0);
  const answerAvg = answerSum / answersArray.length;
  
  // Determine compatibility color based on simple thresholds
  let color: CompatibilityColor;
  if (answerAvg <= 1) {
    color = 'green';  // More first-choice answers indicate Green
  } else if (answerAvg <= 2) {
    color = 'yellow'; // More second-choice answers indicate Yellow
  } else {
    color = 'red';    // More third/fourth-choice answers indicate Red
  }
  
  // Generate personality traits (using random values for demo)
  // In a real implementation, these would be calculated based on specific questions
  const personalityTraits: ProfileTraits = {
    openness: Math.floor(Math.random() * 30) + 60, // 60-90% range
    conscientiousness: Math.floor(Math.random() * 30) + 60,
    extraversion: Math.floor(Math.random() * 30) + 60,
    agreeableness: Math.floor(Math.random() * 30) + 60,
    neuroticism: Math.floor(Math.random() * 30) + 60
  };
  
  // Determine attachment style based on attachment questions
  // For now using a simple random assignment for demo
  const attachmentStyles: AttachmentStyle[] = ['secure', 'anxious', 'avoidant', 'fearful'];
  const attachmentStyle: AttachmentStyle = attachmentStyles[Math.floor(Math.random() * attachmentStyles.length)];
  
  // Determine MBTI type based on MBTI questions
  const mbtiTypes: MbtiType[] = ['INFJ', 'INTJ', 'ENFP', 'ISTJ', 'ESFJ', 'ENFJ'];
  const mbtiType: MbtiType = mbtiTypes[Math.floor(Math.random() * mbtiTypes.length)];
  
  // Generate emotional intelligence scores
  const emotionalIntelligence: EqScores = {
    selfAwareness: Math.floor(Math.random() * 20) + 70, // 70-90% range
    selfRegulation: Math.floor(Math.random() * 20) + 70,
    motivation: Math.floor(Math.random() * 20) + 70,
    empathy: Math.floor(Math.random() * 20) + 70,
    socialSkills: Math.floor(Math.random() * 20) + 70
  };
  
  // Generate compatibility details
  const getCompatibilityDetails = (color: CompatibilityColor): CompatibilityDetails => {
    const details: CompatibilityDetails = {
      strengths: [],
      challenges: [],
      idealPartner: []
    };
    
    // Common strengths pool
    const allStrengths = [
      'Empathy', 'Communication', 'Loyalty', 'Patience', 
      'Adaptability', 'Emotional Awareness', 'Honesty'
    ];
    
    // Common challenges pool
    const allChallenges = [
      'Setting boundaries', 'Expressing needs directly', 'Managing expectations',
      'Handling conflict', 'Patience', 'Flexibility', 'Trust'
    ];
    
    // Common partner traits pool
    const allPartnerTraits = [
      'Understanding', 'Supportive', 'Independent', 'Patient',
      'Communicative', 'Honest', 'Emotionally intelligent'
    ];
    
    // Select 3 random items from each category
    // In a real implementation, these would be based on specific question responses
    details.strengths = getRandomElements(allStrengths, 3);
    details.challenges = getRandomElements(allChallenges, 3);
    details.idealPartner = getRandomElements(allPartnerTraits, 3);
    
    return details;
  };
  
  return {
    color,
    personalityTraits,
    attachmentStyle,
    mbtiType,
    emotionalIntelligence,
    compatibilityDetails: getCompatibilityDetails(color)
  };
};

// Helper function to get random elements from an array
function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Calculate compatibility score between two profiles
export const calculateCompatibilityScore = (
  profile1: CompatibilityProfile, 
  profile2: CompatibilityProfile
): number => {
  // This would be a complex algorithm in a real implementation
  // For demo, returning a simple score between 0-100
  return Math.floor(Math.random() * 100);
};

// Analyze strengths and challenges between two profiles
export const analyzeCompatibility = (
  profile1: CompatibilityProfile, 
  profile2: CompatibilityProfile
): { strengths: string[], challenges: string[] } => {
  // This would analyze specific traits and their interactions
  // For demo, returning placeholder data
  return {
    strengths: [
      'Complementary communication styles',
      'Shared values on important issues',
      'Balance between different personality traits'
    ],
    challenges: [
      'Different approaches to conflict resolution',
      'Varying needs for personal space',
      'Potential misalignment on family priorities'
    ]
  };
};

export default generateCompatibilityProfile;
