/**
 * Advanced Compatibility Profile Calculator
 * 
 * This module analyzes quiz answers to generate a comprehensive compatibility profile
 * based on psychological research, cultural factors relevant to Indian dating context,
 * and Gen Z relationship patterns.
 * 
 * The implementation is based on research from:
 * - Attachment theory patterns and relationship satisfaction
 * - Big Five personality traits and relationship outcomes
 * - Emotional intelligence components and relationship success
 * - Cultural factors specific to Indian relationship contexts
 * 
 * References:
 * - Studies on relationship compatibility and communication
 * - Gen Z dating trends (2024-2025)
 * - Research on values alignment and relationship satisfaction
 */

export interface PersonalityTraits {
  openness: number;           // Curiosity, creativity, openness to new experiences
  conscientiousness: number;  // Organization, reliability, planning
  extraversion: number;       // Social energy, outgoing vs reserved
  agreeableness: number;      // Warmth, empathy, cooperation vs independence
  neuroticism: number;        // Emotional sensitivity vs emotional stability
}

export interface EmotionalIntelligence {
  selfAwareness: number;      // Understanding own emotions
  selfRegulation: number;     // Managing emotions, especially during stress
  empathy: number;            // Understanding others' emotions
  communication: number;      // Ability to express emotions and needs
}

export interface CoreValues {
  tradition: number;          // Traditional vs progressive outlook
  independence: number;       // Autonomy vs family/community influence
  family: number;             // Family orientation and importance
  ambition: number;           // Career/personal growth focus
  honesty: number;            // Integrity and authenticity value
}

export interface IntimacyProfile {
  traditionalism: number;     // Conservative vs liberal views on intimacy
  physicalAffection: number;  // Comfort with physical expressions of love
  communication: number;      // Openness to discussing intimate topics
  importance: number;         // How much physical connection matters
}

export type AttachmentStyle = 'secure' | 'anxious' | 'avoidant' | 'fearful';

export interface StrengthsWeaknesses {
  strengths: string[];        // Key relationship strengths
  challenges: string[];       // Areas for growth or potential issues
}

export interface IdealPartner {
  traits: string[];           // Traits that would be compatible
  warningFlags: string[];     // Traits that might cause friction
}

export interface RelationshipInsights {
  compatibilityPatterns: string[];  // Patterns in relationship tendencies
  growthAreas: string[];            // Areas for personal development
  communicationTips: string[];      // Communication strategies
}

export interface CompatibilityProfile {
  personalityTraits: PersonalityTraits;
  emotionalIntelligence: EmotionalIntelligence;
  attachmentStyle: AttachmentStyle;
  coreValues: CoreValues;
  intimacyProfile: IntimacyProfile;
  
  // Interpreted results for the user
  personalityArchetype: string;      // E.g., "The Thoughtful Supporter"
  emotionalStrength: string;         // E.g., "Empathetic Listener"
  valuesOrientation: string;         // E.g., "Progressive Independent"
  intimacyStyle: string;             // E.g., "Affectionate and Open"
  
  strengthsWeaknesses: StrengthsWeaknesses;
  idealPartner: IdealPartner;
  relationshipInsights: RelationshipInsights;
  
  overallColor: string;              // "green", "yellow", or "red"
  overallSummary: string;            // One-line summary of compatibility profile
}

// Question category mapping
const QUESTION_MAPPINGS = {
  // Personality traits (Big Five) - Questions 1-10
  openness: [1, 5, 9],
  conscientiousness: [2, 3, 7],
  extraversion: [1, 6],
  agreeableness: [8, 9],
  neuroticism: [4, 11],
  
  // Emotional intelligence - Questions 11-20
  selfAwareness: [15, 18],
  selfRegulation: [11, 14],
  empathy: [13, 15],
  communication: [12, 19],
  
  // Attachment style - directly and indirectly measured
  attachment: [20],
  attachmentIndicators: [11, 12, 19],
  
  // Core values - Questions 21-30
  tradition: [22, 23, 24, 28, 29],
  independence: [21, 26],
  family: [21, 26, 27],
  ambition: [27],
  honesty: [25, 30],
  
  // Intimacy profile - Questions 31-40
  intimacyTraditionalism: [33, 34, 35],
  physicalAffection: [31, 32],
  intimacyCommunication: [36, 39],
  intimacyImportance: [37, 40]
};

// Score normalization (map 1-4 scale to 0-100)
const normalizeScore = (score: number): number => {
  return Math.round(((score - 1) / 3) * 100);
};

// Some questions are reverse scored (4=0, 3=33, 2=67, 1=100)
const reverseScore = (score: number): number => {
  return Math.round(((4 - score) / 3) * 100);
};

/**
 * Map an answer to a trait score with possible reverse scoring
 */
const mapAnswerToScore = (questionNumber: number, answer: number, trait: string): number => {
  // List of questions that need reverse scoring for specific traits
  const reverseScored: Record<string, number[]> = {
    neuroticism: [4], // Lower scores on Q4 indicate higher neuroticism
    extraversion: [1], // Lower scores on Q1 indicate lower extraversion
    // Add other reverse scored questions as needed
  };
  
  // Check if this question is reverse scored for this trait
  if (reverseScored[trait]?.includes(questionNumber)) {
    return reverseScore(answer);
  }
  
  return normalizeScore(answer);
};

/**
 * Calculate average score for a trait based on relevant questions
 */
const calculateTraitScore = (
  answers: Record<number, number>, 
  questionNumbers: number[],
  trait: string
): number => {
  if (!questionNumbers.length) return 50; // Default mid-range if no questions
  
  const scores = questionNumbers.map(qNum => {
    const answer = answers[qNum];
    // Default to middle value (2.5) if answer is missing
    if (answer === undefined || answer === null || answer === 0) {
      return 50;
    }
    return mapAnswerToScore(qNum, answer, trait);
  });
  
  // Calculate average score
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Math.round(sum / scores.length);
};

/**
 * Determine the user's attachment style based on their answers
 */
const determineAttachmentStyle = (answers: Record<number, number>): AttachmentStyle => {
  // Q20 is direct self-identification of attachment style
  const directAttachment = answers[20] || 0;
  
  // Direct identification mapping (1=Secure, 2=Anxious, 3=Avoidant, 4=Not sure/Mixed)
  if (directAttachment === 1) return 'secure';
  if (directAttachment === 2) return 'anxious';
  if (directAttachment === 3) return 'avoidant';
  
  // If direct identification is unclear, assess from other questions
  // Calculate scores for each attachment style based on behavioral questions
  const anxiousSignals = calculateTraitScore(answers, [12], 'anxious');
  const avoidantSignals = calculateTraitScore(answers, [11], 'avoidant');
  
  // Determine likely attachment based on behavioral patterns
  if (anxiousSignals > 70 && avoidantSignals > 70) {
    return 'fearful'; // High on both anxiety and avoidance
  } else if (anxiousSignals > 70) {
    return 'anxious';
  } else if (avoidantSignals > 70) {
    return 'avoidant';
  }
  
  return 'secure'; // Default to secure if evidence is unclear
};

/**
 * Calculate the user's personality traits
 */
const calculatePersonalityTraits = (answers: Record<number, number>): PersonalityTraits => {
  return {
    openness: calculateTraitScore(answers, QUESTION_MAPPINGS.openness, 'openness'),
    conscientiousness: calculateTraitScore(answers, QUESTION_MAPPINGS.conscientiousness, 'conscientiousness'),
    extraversion: calculateTraitScore(answers, QUESTION_MAPPINGS.extraversion, 'extraversion'),
    agreeableness: calculateTraitScore(answers, QUESTION_MAPPINGS.agreeableness, 'agreeableness'),
    neuroticism: calculateTraitScore(answers, QUESTION_MAPPINGS.neuroticism, 'neuroticism')
  };
};

/**
 * Calculate the user's emotional intelligence
 */
const calculateEmotionalIntelligence = (answers: Record<number, number>): EmotionalIntelligence => {
  return {
    selfAwareness: calculateTraitScore(answers, QUESTION_MAPPINGS.selfAwareness, 'selfAwareness'),
    selfRegulation: calculateTraitScore(answers, QUESTION_MAPPINGS.selfRegulation, 'selfRegulation'),
    empathy: calculateTraitScore(answers, QUESTION_MAPPINGS.empathy, 'empathy'),
    communication: calculateTraitScore(answers, QUESTION_MAPPINGS.communication, 'communication')
  };
};

/**
 * Calculate the user's core values
 */
const calculateCoreValues = (answers: Record<number, number>): CoreValues => {
  return {
    tradition: calculateTraitScore(answers, QUESTION_MAPPINGS.tradition, 'tradition'),
    independence: calculateTraitScore(answers, QUESTION_MAPPINGS.independence, 'independence'),
    family: calculateTraitScore(answers, QUESTION_MAPPINGS.family, 'family'),
    ambition: calculateTraitScore(answers, QUESTION_MAPPINGS.ambition, 'ambition'),
    honesty: calculateTraitScore(answers, QUESTION_MAPPINGS.honesty, 'honesty')
  };
};

/**
 * Calculate the user's intimacy profile
 */
const calculateIntimacyProfile = (answers: Record<number, number>): IntimacyProfile => {
  return {
    traditionalism: calculateTraitScore(answers, QUESTION_MAPPINGS.intimacyTraditionalism, 'intimacyTraditionalism'),
    physicalAffection: calculateTraitScore(answers, QUESTION_MAPPINGS.physicalAffection, 'physicalAffection'),
    communication: calculateTraitScore(answers, QUESTION_MAPPINGS.intimacyCommunication, 'intimacyCommunication'),
    importance: calculateTraitScore(answers, QUESTION_MAPPINGS.intimacyImportance, 'intimacyImportance')
  };
};

/**
 * Determine the user's personality archetype based on their traits
 */
const determinePersonalityArchetype = (personalityTraits: PersonalityTraits): string => {
  const { openness, conscientiousness, extraversion, agreeableness, neuroticism } = personalityTraits;
  
  // High extraversion + high agreeableness = "The Social Butterfly"
  if (extraversion > 70 && agreeableness > 70) {
    return "The Social Butterfly";
  }
  
  // High conscientiousness + high neuroticism = "The Organized Worrier"
  if (conscientiousness > 70 && neuroticism > 70) {
    return "The Thoughtful Planner";
  }
  
  // Low extraversion + high conscientiousness = "The Reliable Introvert"
  if (extraversion < 30 && conscientiousness > 70) {
    return "The Reliable Introvert";
  }
  
  // High openness + high agreeableness = "The Curious Diplomat"
  if (openness > 70 && agreeableness > 70) {
    return "The Curious Diplomat";
  }
  
  // Low extraversion + low neuroticism = "The Calm Observer"
  if (extraversion < 30 && neuroticism < 30) {
    return "The Calm Observer";
  }
  
  // Low openness + high conscientiousness = "The Steady Traditionalist"
  if (openness < 30 && conscientiousness > 70) {
    return "The Steady Traditionalist";
  }
  
  // Default archetypes based on strongest trait
  const traits = [
    { name: "openness", value: openness, label: "The Explorer" },
    { name: "conscientiousness", value: conscientiousness, label: "The Organizer" },
    { name: "extraversion", value: extraversion, label: "The Socializer" },
    { name: "agreeableness", value: agreeableness, label: "The Peacemaker" },
    { name: "neuroticism", value: neuroticism, label: "The Passionate Heart" }
  ];
  
  // Sort traits by value (highest first)
  traits.sort((a, b) => b.value - a.value);
  
  // Return label for the strongest trait
  return traits[0].label;
};

/**
 * Determine the user's emotional strength based on their emotional intelligence
 */
const determineEmotionalStrength = (emotionalIntelligence: EmotionalIntelligence): string => {
  const { selfAwareness, selfRegulation, empathy, communication } = emotionalIntelligence;
  
  // Find the highest EQ trait
  const traits = [
    { name: "selfAwareness", value: selfAwareness, label: "The Self-Aware Partner" },
    { name: "selfRegulation", value: selfRegulation, label: "The Emotionally Stable Rock" },
    { name: "empathy", value: empathy, label: "The Empathetic Listener" },
    { name: "communication", value: communication, label: "The Clear Communicator" }
  ];
  
  // Sort traits by value (highest first)
  traits.sort((a, b) => b.value - a.value);
  
  // Return label for the strongest trait
  return traits[0].label;
};

/**
 * Determine the user's values orientation based on their core values
 */
const determineValuesOrientation = (coreValues: CoreValues): string => {
  const { tradition, independence, family, ambition, honesty } = coreValues;
  
  // Traditional + Family-focused
  if (tradition > 70 && family > 70) {
    return "Family-Centered Traditionalist";
  }
  
  // Progressive + Independence-focused
  if (tradition < 30 && independence > 70) {
    return "Progressive Independent";
  }
  
  // Balanced values
  if (tradition >= 30 && tradition <= 70 &&
      independence >= 30 && independence <= 70 &&
      family >= 30 && family <= 70) {
    return "Values-Balanced Moderate";
  }
  
  // Career-focused
  if (ambition > 70) {
    return tradition > 50 ? "Ambitious Traditionalist" : "Progressive Achiever";
  }
  
  // Honesty-focused
  if (honesty > 70) {
    return "Integrity-Driven " + (tradition > 50 ? "Traditionalist" : "Progressive");
  }
  
  // Default based on tradition vs progressive
  return tradition > 50 ? "Tradition-Oriented" : "Progressive-Minded";
};

/**
 * Determine the user's intimacy style based on their intimacy profile
 */
const determineIntimacyStyle = (intimacyProfile: IntimacyProfile): string => {
  const { traditionalism, physicalAffection, communication, importance } = intimacyProfile;
  
  // Traditional + Low importance
  if (traditionalism > 70 && importance < 30) {
    return "Reserved and Traditional";
  }
  
  // Traditional + High importance
  if (traditionalism > 70 && importance > 70) {
    return "Passionate within Boundaries";
  }
  
  // Open + High affection + Good communication
  if (traditionalism < 30 && physicalAffection > 70 && communication > 70) {
    return "Openly Affectionate and Communicative";
  }
  
  // Open + Low affection
  if (traditionalism < 30 && physicalAffection < 30) {
    return "Intellectually Open but Physically Reserved";
  }
  
  // High affection + Low communication
  if (physicalAffection > 70 && communication < 30) {
    return "Physically Expressive but Verbally Reserved";
  }
  
  // Default based on traditionalism
  return traditionalism > 50 ? 
    "Values Traditional Intimacy" : 
    "Open-minded about Intimacy";
};

/**
 * Identify the user's relationship strengths based on their profile
 */
const identifyStrengths = (
  personalityTraits: PersonalityTraits,
  emotionalIntelligence: EmotionalIntelligence,
  attachmentStyle: AttachmentStyle,
  coreValues: CoreValues,
  intimacyProfile: IntimacyProfile
): string[] => {
  const strengths: string[] = [];
  
  // Personality-based strengths
  if (personalityTraits.agreeableness > 70) {
    strengths.push("Kind and supportive nature");
  }
  if (personalityTraits.conscientiousness > 70) {
    strengths.push("Reliable and organized");
  }
  if (personalityTraits.openness > 70) {
    strengths.push("Curious and open to new experiences");
  }
  if (personalityTraits.extraversion > 70) {
    strengths.push("Socially engaging and energetic");
  }
  if (personalityTraits.neuroticism < 30) {
    strengths.push("Emotionally stable and calm");
  }
  
  // EQ-based strengths
  if (emotionalIntelligence.empathy > 70) {
    strengths.push("Deeply empathetic and understanding");
  }
  if (emotionalIntelligence.communication > 70) {
    strengths.push("Excellent emotional communicator");
  }
  if (emotionalIntelligence.selfRegulation > 70) {
    strengths.push("Handles emotions maturely");
  }
  if (emotionalIntelligence.selfAwareness > 70) {
    strengths.push("Self-aware and reflective");
  }
  
  // Attachment-based strengths
  if (attachmentStyle === 'secure') {
    strengths.push("Secure and trusting in relationships");
  }
  
  // Values-based strengths
  if (coreValues.honesty > 70) {
    strengths.push("High integrity and authenticity");
  }
  if (coreValues.family > 70) {
    strengths.push("Strong family values");
  }
  
  // Intimacy-based strengths
  if (intimacyProfile.communication > 70) {
    strengths.push("Open about discussing intimacy needs");
  }
  
  // Limit to top 3 strengths
  return strengths.slice(0, 3);
};

/**
 * Identify the user's relationship challenges based on their profile
 */
const identifyChallenges = (
  personalityTraits: PersonalityTraits,
  emotionalIntelligence: EmotionalIntelligence,
  attachmentStyle: AttachmentStyle,
  coreValues: CoreValues,
  intimacyProfile: IntimacyProfile
): string[] => {
  const challenges: string[] = [];
  
  // Personality-based challenges
  if (personalityTraits.agreeableness < 30) {
    challenges.push("May come across as too blunt or critical");
  }
  if (personalityTraits.conscientiousness < 30) {
    challenges.push("Might struggle with consistency or organization");
  }
  if (personalityTraits.openness < 30) {
    challenges.push("May resist change or new experiences");
  }
  if (personalityTraits.neuroticism > 70) {
    challenges.push("Can experience emotional highs and lows intensely");
  }
  
  // EQ-based challenges
  if (emotionalIntelligence.empathy < 30) {
    challenges.push("May miss emotional cues from partner");
  }
  if (emotionalIntelligence.communication < 30) {
    challenges.push("Could improve expressing emotional needs");
  }
  if (emotionalIntelligence.selfRegulation < 30) {
    challenges.push("Might react impulsively when upset");
  }
  
  // Attachment-based challenges
  if (attachmentStyle === 'anxious') {
    challenges.push("May worry about partner's commitment");
  }
  if (attachmentStyle === 'avoidant') {
    challenges.push("Might need space during emotional situations");
  }
  if (attachmentStyle === 'fearful') {
    challenges.push("Can alternate between seeking closeness and distance");
  }
  
  // Intimacy-based challenges
  if (intimacyProfile.communication < 30) {
    challenges.push("Finds it difficult to discuss intimacy needs");
  }
  
  // Limit to top 3 challenges
  return challenges.slice(0, 3);
};

/**
 * Identify ideal partner traits based on the user's profile
 */
const identifyIdealPartnerTraits = (
  personalityTraits: PersonalityTraits,
  emotionalIntelligence: EmotionalIntelligence,
  attachmentStyle: AttachmentStyle,
  coreValues: CoreValues,
  intimacyProfile: IntimacyProfile
): string[] => {
  const traits: string[] = [];
  
  // Based on attachment style
  if (attachmentStyle === 'anxious') {
    traits.push("Consistent and reassuring");
  }
  if (attachmentStyle === 'avoidant') {
    traits.push("Respects your need for independence");
  }
  if (attachmentStyle === 'fearful') {
    traits.push("Patient and understanding");
  }
  if (attachmentStyle === 'secure') {
    traits.push("Emotionally available");
  }
  
  // Based on personality
  if (personalityTraits.extraversion > 70) {
    traits.push("Socially energetic or appreciates your outgoing nature");
  }
  if (personalityTraits.extraversion < 30) {
    traits.push("Comfortable with quiet time together");
  }
  if (personalityTraits.openness > 70) {
    traits.push("Curious and explorative");
  }
  if (personalityTraits.neuroticism > 70) {
    traits.push("Calm and steady during emotional moments");
  }
  
  // Based on values
  if (coreValues.tradition > 70) {
    traits.push("Shares your traditional values");
  }
  if (coreValues.tradition < 30) {
    traits.push("Progressive-minded like you");
  }
  if (coreValues.family > 70) {
    traits.push("Values family connections");
  }
  if (coreValues.ambition > 70) {
    traits.push("Supports your ambitions");
  }
  
  // Based on intimacy
  if (intimacyProfile.traditionalism > 70) {
    traits.push("Respects traditional boundaries in intimacy");
  }
  if (intimacyProfile.physicalAffection > 70) {
    traits.push("Physically affectionate");
  }
  if (intimacyProfile.communication > 70) {
    traits.push("Open to discussing needs and boundaries");
  }
  
  // Limit to 5 traits
  return traits.slice(0, 5);
};

/**
 * Identify warning flags for potential partners
 */
const identifyWarningFlags = (
  personalityTraits: PersonalityTraits,
  emotionalIntelligence: EmotionalIntelligence,
  attachmentStyle: AttachmentStyle,
  coreValues: CoreValues,
  intimacyProfile: IntimacyProfile
): string[] => {
  const flags: string[] = [];
  
  // Based on attachment
  if (attachmentStyle === 'anxious') {
    flags.push("Emotionally unavailable or inconsistent");
  }
  if (attachmentStyle === 'avoidant') {
    flags.push("Overly demanding of your time and attention");
  }
  
  // Based on personality
  if (personalityTraits.extraversion > 70) {
    flags.push("Dislikes social gatherings or activities");
  }
  if (personalityTraits.extraversion < 30) {
    flags.push("Needs constant social stimulation");
  }
  if (personalityTraits.openness > 70) {
    flags.push("Resistant to new ideas or experiences");
  }
  if (personalityTraits.openness < 30) {
    flags.push("Constantly pushing you out of your comfort zone");
  }
  
  // Based on values
  if (coreValues.tradition > 70) {
    flags.push("Dismissive of traditions important to you");
  }
  if (coreValues.tradition < 30) {
    flags.push("Too rigid about traditional expectations");
  }
  if (coreValues.family > 70) {
    flags.push("Doesn't value family connections");
  }
  if (coreValues.honesty > 70) {
    flags.push("Dishonest or lacks transparency");
  }
  
  // Based on intimacy
  if (intimacyProfile.traditionalism > 70) {
    flags.push("Pressures you beyond your intimacy comfort zone");
  }
  if (intimacyProfile.traditionalism < 30 && intimacyProfile.importance > 70) {
    flags.push("Has very traditional views on intimacy");
  }
  
  // Limit to 3 warning flags
  return flags.slice(0, 3);
};

/**
 * Generate relationship pattern insights
 */
const generatePatternInsights = (
  personalityTraits: PersonalityTraits,
  emotionalIntelligence: EmotionalIntelligence,
  attachmentStyle: AttachmentStyle
): string[] => {
  const insights: string[] = [];
  
  // High neuroticism + anxious attachment
  if (personalityTraits.neuroticism > 70 && attachmentStyle === 'anxious') {
    insights.push("You may experience stronger emotional reactions when feeling insecure in relationships");
  }
  
  // Low extraversion + high agreeableness
  if (personalityTraits.extraversion < 30 && personalityTraits.agreeableness > 70) {
    insights.push("You're likely a supportive listener who forms deep connections with fewer people");
  }
  
  // High conscientiousness + secure attachment
  if (personalityTraits.conscientiousness > 70 && attachmentStyle === 'secure') {
    insights.push("Your reliability and emotional security make you a stable, trustworthy partner");
  }
  
  // High openness + high EQ
  if (personalityTraits.openness > 70 && 
     (emotionalIntelligence.empathy > 70 || emotionalIntelligence.communication > 70)) {
    insights.push("Your combination of curiosity and emotional intelligence leads to deep, growth-oriented relationships");
  }
  
  // Low self-regulation + high neuroticism
  if (emotionalIntelligence.selfRegulation < 30 && personalityTraits.neuroticism > 70) {
    insights.push("You may benefit from developing emotional regulation strategies for relationship stress");
  }
  
  // Default insights based on attachment style
  if (insights.length === 0) {
    if (attachmentStyle === 'secure') {
      insights.push("You generally approach relationships with a healthy balance of independence and closeness");
    } else if (attachmentStyle === 'anxious') {
      insights.push("You deeply value connection and may sometimes worry about your partner's availability");
    } else if (attachmentStyle === 'avoidant') {
      insights.push("You value independence and may need space to process emotions during relationship challenges");
    } else if (attachmentStyle === 'fearful') {
      insights.push("You may experience conflicting desires for closeness and distance in relationships");
    }
  }
  
  return insights;
};

/**
 * Generate growth areas based on the user's profile
 */
const generateGrowthAreas = (
  personalityTraits: PersonalityTraits,
  emotionalIntelligence: EmotionalIntelligence,
  attachmentStyle: AttachmentStyle
): string[] => {
  const growthAreas: string[] = [];
  
  // Low emotional intelligence areas
  if (emotionalIntelligence.selfAwareness < 50) {
    growthAreas.push("Developing greater awareness of your emotional patterns and triggers");
  }
  if (emotionalIntelligence.selfRegulation < 50) {
    growthAreas.push("Practicing techniques to manage emotions during relationship stress");
  }
  if (emotionalIntelligence.empathy < 50) {
    growthAreas.push("Strengthening your ability to understand your partner's perspective");
  }
  if (emotionalIntelligence.communication < 50) {
    growthAreas.push("Enhancing your emotional expression and vulnerability");
  }
  
  // Attachment-related growth
  if (attachmentStyle === 'anxious') {
    growthAreas.push("Building self-reassurance skills rather than seeking constant validation");
  }
  if (attachmentStyle === 'avoidant') {
    growthAreas.push("Practicing staying engaged during emotional conversations");
  }
  if (attachmentStyle === 'fearful') {
    growthAreas.push("Working through trust issues with consistency and self-awareness");
  }
  
  // Personality-related growth
  if (personalityTraits.neuroticism > 70) {
    growthAreas.push("Developing resilience and perspective during emotional challenges");
  }
  if (personalityTraits.agreeableness < 30) {
    growthAreas.push("Finding balance between honesty and kindness in communication");
  }
  if (personalityTraits.openness < 30) {
    growthAreas.push("Being open to occasional new experiences with a partner");
  }
  
  // Ensure we have at least one growth area
  if (growthAreas.length === 0) {
    growthAreas.push("Continuing to nurture open communication about needs and feelings");
  }
  
  // Limit to 2 growth areas
  return growthAreas.slice(0, 2);
};

/**
 * Generate communication tips based on the user's profile
 */
const generateCommunicationTips = (
  personalityTraits: PersonalityTraits,
  emotionalIntelligence: EmotionalIntelligence,
  attachmentStyle: AttachmentStyle
): string[] => {
  const tips: string[] = [];
  
  // Attachment-specific tips
  if (attachmentStyle === 'anxious') {
    tips.push("When feeling insecure, try stating your needs directly rather than hinting or testing");
  }
  if (attachmentStyle === 'avoidant') {
    tips.push("Try to share small feelings regularly rather than withdrawing when overwhelmed");
  }
  if (attachmentStyle === 'fearful') {
    tips.push("Practice naming your conflicting needs: 'Part of me wants closeness, part needs space'");
  }
  
  // Personality-specific tips
  if (personalityTraits.extraversion > 70) {
    tips.push("Remember to create space for your partner to share, especially if they're quieter");
  }
  if (personalityTraits.extraversion < 30) {
    tips.push("Schedule important conversations when you're emotionally charged, not depleted");
  }
  if (personalityTraits.neuroticism > 70) {
    tips.push("When emotions run high, take a brief pause before continuing difficult conversations");
  }
  if (personalityTraits.agreeableness < 30) {
    tips.push("Balance honesty with tact by using 'I feel' statements rather than criticisms");
  }
  
  // EQ-specific tips
  if (emotionalIntelligence.communication < 50) {
    tips.push("Try writing down your feelings before important conversations to organize your thoughts");
  }
  if (emotionalIntelligence.empathy < 50) {
    tips.push("Practice active listening by paraphrasing your partner's perspective before responding");
  }
  
  // Default tip if none apply
  if (tips.length === 0) {
    tips.push("Continue practicing the balance of speaking honestly and listening attentively");
  }
  
  // Limit to 2 tips
  return tips.slice(0, 2);
};

/**
 * Determine overall compatibility color based on the user's profile
 */
const determineOverallCompatibilityColor = (
  personalityTraits: PersonalityTraits,
  emotionalIntelligence: EmotionalIntelligence,
  attachmentStyle: AttachmentStyle,
  coreValues: CoreValues
): string => {
  
  // Red flags (high-risk indicators)
  if (personalityTraits.neuroticism > 80 && emotionalIntelligence.selfRegulation < 30) {
    return 'red';
  }
  if (attachmentStyle === 'fearful' && personalityTraits.neuroticism > 70) {
    return 'red';
  }
  if (emotionalIntelligence.empathy < 20 && emotionalIntelligence.communication < 20) {
    return 'red';
  }
  
  // Green indicators (positive signs)
  if (attachmentStyle === 'secure' && personalityTraits.neuroticism < 50) {
    return 'green';
  }
  if (emotionalIntelligence.communication > 70 && emotionalIntelligence.empathy > 70) {
    return 'green';
  }
  if (personalityTraits.agreeableness > 70 && personalityTraits.conscientiousness > 70) {
    return 'green';
  }
  
  // Default to yellow (mixed indicators)
  return 'yellow';
};

/**
 * Generate an overall summary of the user's compatibility profile
 */
const generateOverallSummary = (
  personalityArchetype: string,
  emotionalStrength: string,
  attachmentStyle: AttachmentStyle,
  valuesOrientation: string
): string => {
  // Create poetic descriptor based on profile
  let descriptor = "";
  
  if (personalityArchetype.includes("Social")) {
    descriptor = "A Vibrant Social Force";
  } else if (personalityArchetype.includes("Calm") || personalityArchetype.includes("Reliable")) {
    descriptor = "A Steady, Calming Presence";
  } else if (personalityArchetype.includes("Explorer") || personalityArchetype.includes("Curious")) {
    descriptor = "An Adventurous Spirit";
  } else if (personalityArchetype.includes("Thoughtful")) {
    descriptor = "A Thoughtful Soul";
  } else if (personalityArchetype.includes("Passionate")) {
    descriptor = "A Passionate Heart";
  } else {
    descriptor = "A Multi-Faceted Individual";
  }
  
  // Add attachment style context
  let attachmentContext = "";
  if (attachmentStyle === 'secure') {
    attachmentContext = "who offers security and trust";
  } else if (attachmentStyle === 'anxious') {
    attachmentContext = "who values deep connection";
  } else if (attachmentStyle === 'avoidant') {
    attachmentContext = "who balances closeness with independence";
  } else if (attachmentStyle === 'fearful') {
    attachmentContext = "navigating the dance of intimacy and distance";
  }
  
  return `${descriptor} ${attachmentContext}`;
};

/**
 * Generate a comprehensive compatibility profile based on quiz answers
 */
export const calculateCompatibilityProfile = (
  answers: Record<number, number>
): CompatibilityProfile => {
  // Calculate raw scores for different dimensions
  const personalityTraits = calculatePersonalityTraits(answers);
  const emotionalIntelligence = calculateEmotionalIntelligence(answers);
  const attachmentStyle = determineAttachmentStyle(answers);
  const coreValues = calculateCoreValues(answers);
  const intimacyProfile = calculateIntimacyProfile(answers);
  
  // Interpret the scores into meaningful categories
  const personalityArchetype = determinePersonalityArchetype(personalityTraits);
  const emotionalStrength = determineEmotionalStrength(emotionalIntelligence);
  const valuesOrientation = determineValuesOrientation(coreValues);
  const intimacyStyle = determineIntimacyStyle(intimacyProfile);
  
  // Generate insights
  const strengths = identifyStrengths(personalityTraits, emotionalIntelligence, attachmentStyle, coreValues, intimacyProfile);
  const challenges = identifyChallenges(personalityTraits, emotionalIntelligence, attachmentStyle, coreValues, intimacyProfile);
  
  const idealPartnerTraits = identifyIdealPartnerTraits(personalityTraits, emotionalIntelligence, attachmentStyle, coreValues, intimacyProfile);
  const warningFlags = identifyWarningFlags(personalityTraits, emotionalIntelligence, attachmentStyle, coreValues, intimacyProfile);
  
  const compatibilityPatterns = generatePatternInsights(personalityTraits, emotionalIntelligence, attachmentStyle);
  const growthAreas = generateGrowthAreas(personalityTraits, emotionalIntelligence, attachmentStyle);
  const communicationTips = generateCommunicationTips(personalityTraits, emotionalIntelligence, attachmentStyle);
  
  // Determine overall compatibility color
  const overallColor = determineOverallCompatibilityColor(personalityTraits, emotionalIntelligence, attachmentStyle, coreValues);
  
  // Generate overall summary
  const overallSummary = generateOverallSummary(personalityArchetype, emotionalStrength, attachmentStyle, valuesOrientation);
  
  // Assemble and return the complete profile
  return {
    personalityTraits,
    emotionalIntelligence,
    attachmentStyle,
    coreValues,
    intimacyProfile,
    
    personalityArchetype,
    emotionalStrength,
    valuesOrientation,
    intimacyStyle,
    
    strengthsWeaknesses: {
      strengths,
      challenges
    },
    
    idealPartner: {
      traits: idealPartnerTraits,
      warningFlags
    },
    
    relationshipInsights: {
      compatibilityPatterns,
      growthAreas,
      communicationTips
    },
    
    overallColor,
    overallSummary
  };
};