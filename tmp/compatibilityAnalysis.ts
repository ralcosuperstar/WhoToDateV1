// Compatibility profile analysis and report generation

export type CompatibilityColor = 'green' | 'yellow' | 'red';

export interface PersonalityTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export type AttachmentStyle = 'secure' | 'anxious' | 'avoidant' | 'fearful';

export type MbtiStyle = 
  | 'INFJ' | 'INTJ' | 'INFP' | 'INTP' 
  | 'ENFJ' | 'ENTJ' | 'ENFP' | 'ENTP' 
  | 'ISFJ' | 'ISTJ' | 'ISFP' | 'ISTP' 
  | 'ESFJ' | 'ESTJ' | 'ESFP' | 'ESTP';

export interface EmotionalIntelligence {
  selfAwareness: number;
  selfRegulation: number;
  empathy: number;
  socialSkills: number;
}

export interface CoreValues {
  tradition: number;
  independence: number;
  family: number;
  ambition: number;
  openMindedness: number;
}

export interface IntimacyProfile {
  traditionalism: number;
  physicalAffection: number;
  communication: number;
  experimentation: number;
}

export interface StrengthsWeaknesses {
  strengths: string[];
  challenges: string[];
  growthAreas: string[];
}

export interface CompatibleTypes {
  mostCompatible: string[];
  challengingMatches: string[];
  compatibilityRationale: string;
}

export interface SectionScores {
  personality: number;
  emotional: number;
  values: number;
  physical: number;
}

export interface CompatibilityProfile {
  overallColor: CompatibilityColor;
  description: string;
  personalityTraits: PersonalityTraits;
  attachmentStyle: AttachmentStyle;
  mbtiStyle: MbtiStyle;
  emotionalIntelligence: EmotionalIntelligence;
  coreValues: CoreValues;
  intimacyProfile: IntimacyProfile;
  sectionScores: SectionScores;
  strengthsWeaknesses: StrengthsWeaknesses;
  compatibleTypes: CompatibleTypes;
  compatibilityInsights: string[];
  relationshipTips: string[];
}

// Calculate a compatibility profile based on quiz answers
export const calculateCompatibilityProfile = (answers: Record<number, number>): CompatibilityProfile => {
  // Default scores if not enough data
  if (Object.keys(answers).length < 10) {
    return generateDefaultProfile();
  }

  // Calculate Big Five personality traits
  const personalityTraits = calculatePersonalityTraits(answers);
  
  // Determine attachment style
  const attachmentStyle = determineAttachmentStyle(answers);
  
  // Calculate MBTI style
  const mbtiStyle = calculateMbtiStyle(answers);
  
  // Calculate emotional intelligence
  const emotionalIntelligence = calculateEmotionalIntelligence(answers);
  
  // Calculate core values
  const coreValues = calculateCoreValues(answers);
  
  // Calculate intimacy profile
  const intimacyProfile = calculateIntimacyProfile(answers);
  
  // Calculate section scores
  const sectionScores = calculateSectionScores(answers);
  
  // Determine overall compatibility color
  const overallColor = determineOverallColor(sectionScores, personalityTraits, attachmentStyle);
  
  // Generate description
  const description = generateDescription(overallColor, personalityTraits, attachmentStyle);
  
  // Generate strengths and weaknesses
  const strengthsWeaknesses = generateStrengthsWeaknesses(
    personalityTraits, 
    attachmentStyle, 
    emotionalIntelligence
  );
  
  // Generate compatible types
  const compatibleTypes = generateCompatibleTypes(
    personalityTraits, 
    attachmentStyle, 
    coreValues
  );
  
  // Generate compatibility insights
  const compatibilityInsights = generateCompatibilityInsights(
    overallColor,
    personalityTraits,
    attachmentStyle,
    coreValues,
    intimacyProfile
  );
  
  // Generate relationship tips
  const relationshipTips = generateRelationshipTips(
    personalityTraits,
    attachmentStyle,
    emotionalIntelligence
  );

  return {
    overallColor,
    description,
    personalityTraits,
    attachmentStyle,
    mbtiStyle,
    emotionalIntelligence,
    coreValues,
    intimacyProfile,
    sectionScores,
    strengthsWeaknesses,
    compatibleTypes,
    compatibilityInsights,
    relationshipTips
  };
};

// Generate a preview of the compatibility profile with limited information
export const generateProfilePreview = (compatibilityProfile: CompatibilityProfile) => {
  const { 
    overallColor, 
    description, 
    attachmentStyle, 
    mbtiStyle,
    sectionScores,
    strengthsWeaknesses,
    compatibleTypes
  } = compatibilityProfile;

  return {
    overallColor,
    description,
    attachmentStyle,
    mbtiStyle,
    sectionScores,
    previewStrengths: strengthsWeaknesses.strengths.slice(0, 2),
    previewChallenges: strengthsWeaknesses.challenges.slice(0, 2),
    previewCompatible: compatibleTypes.mostCompatible.slice(0, 1),
    previewChallenging: compatibleTypes.challengingMatches.slice(0, 1),
  };
};

// Helper functions for calculating various aspects of the compatibility profile
function calculatePersonalityTraits(answers: Record<number, number>): PersonalityTraits {
  // Map specific questions to personality traits
  // Questions 1, 6 → Extraversion
  // Questions 2, 3, 7 → Conscientiousness
  // Questions 4, 9 → Agreeableness
  // Questions 4, 10 → Neuroticism (stability)
  // Questions 5, 9 → Openness
  
  // Simplified mapping calculation
  const openness = mapAnswerToScore(answers[9], [75, 50, 65, 40]) * 0.6 
    + mapAnswerToScore(answers[5], [50, 60, 70, 30]) * 0.4;
    
  const conscientiousness = mapAnswerToScore(answers[2], [90, 70, 40, 20]) * 0.4 
    + mapAnswerToScore(answers[3], [80, 60, 35, 30]) * 0.3
    + mapAnswerToScore(answers[7], [90, 70, 45, 25]) * 0.3;
    
  const extraversion = mapAnswerToScore(answers[1], [90, 75, 40, 20]) * 0.5 
    + mapAnswerToScore(answers[6], [90, 70, 40, 20]) * 0.5;
    
  const agreeableness = mapAnswerToScore(answers[4], [85, 70, 50, 30]) * 0.6 
    + mapAnswerToScore(answers[9], [50, 40, 80, 35]) * 0.4;
    
  const neuroticism = mapAnswerToScore(answers[4], [25, 40, 70, 80]) * 0.5 
    + mapAnswerToScore(answers[10], [25, 40, 65, 85]) * 0.5;
  
  return {
    openness: normalizeScore(openness),
    conscientiousness: normalizeScore(conscientiousness),
    extraversion: normalizeScore(extraversion),
    agreeableness: normalizeScore(agreeableness),
    neuroticism: normalizeScore(neuroticism)
  };
}

function determineAttachmentStyle(answers: Record<number, number>): AttachmentStyle {
  // Questions 12, 13, 15, 16, 19 are most relevant for attachment
  
  // Calculate secure vs insecure tendencies
  const secureScore = 
      mapAnswerToScore(answers[12], [80, 65, 30, 20]) 
    + mapAnswerToScore(answers[13], [85, 70, 40, 20]) 
    + mapAnswerToScore(answers[15], [85, 70, 40, 20])
    + mapAnswerToScore(answers[16], [80, 65, 35, 20])
    + mapAnswerToScore(answers[19], [75, 60, 30, 40]);
  
  // Calculate anxious tendencies
  const anxiousScore = 
      mapAnswerToScore(answers[12], [30, 40, 85, 25]) 
    + mapAnswerToScore(answers[13], [20, 40, 85, 70]) 
    + mapAnswerToScore(answers[15], [25, 35, 70, 50])
    + mapAnswerToScore(answers[16], [40, 50, 75, 40])
    + mapAnswerToScore(answers[19], [30, 40, 90, 25]);
  
  // Calculate avoidant tendencies
  const avoidantScore = 
      mapAnswerToScore(answers[12], [25, 40, 30, 85]) 
    + mapAnswerToScore(answers[13], [50, 60, 30, 80]) 
    + mapAnswerToScore(answers[15], [40, 50, 30, 75])
    + mapAnswerToScore(answers[16], [25, 35, 40, 85])
    + mapAnswerToScore(answers[19], [40, 30, 20, 90]);
  
  // Fearful is high on both anxious and avoidant dimensions
  const fearfulScore = Math.min(anxiousScore, avoidantScore);
  
  // Determine the highest score
  const scores = [
    { style: 'secure' as AttachmentStyle, score: secureScore },
    { style: 'anxious' as AttachmentStyle, score: anxiousScore },
    { style: 'avoidant' as AttachmentStyle, score: avoidantScore },
    { style: 'fearful' as AttachmentStyle, score: fearfulScore }
  ];
  
  scores.sort((a, b) => b.score - a.score);
  
  return scores[0].style;
}

function calculateMbtiStyle(answers: Record<number, number>): MbtiStyle {
  // Extraversion (E) vs Introversion (I)
  const eScore = mapAnswerToScore(answers[1], [85, 65, 30, 15]) 
    + mapAnswerToScore(answers[6], [90, 70, 35, 20]);
  const iScore = 200 - eScore;
  const eOrI = eScore > iScore ? 'E' : 'I';
  
  // Sensing (S) vs Intuition (N)
  const sScore = mapAnswerToScore(answers[9], [40, 80, 60, 55]);
  const nScore = 100 - sScore;
  const sOrN = sScore > nScore ? 'S' : 'N';
  
  // Thinking (T) vs Feeling (F)
  const tScore = mapAnswerToScore(answers[5], [85, 50, 20, 40]) 
    + mapAnswerToScore(answers[8], [85, 45, 25, 60]);
  const fScore = 200 - tScore;
  const tOrF = tScore > fScore ? 'T' : 'F';
  
  // Judging (J) vs Perceiving (P)
  const jScore = mapAnswerToScore(answers[3], [85, 60, 30, 20]) 
    + mapAnswerToScore(answers[7], [90, 70, 35, 20]);
  const pScore = 200 - jScore;
  const jOrP = jScore > pScore ? 'J' : 'P';
  
  // Combine to get MBTI type
  const mbtiType = `${eOrI}${sOrN}${tOrF}${jOrP}` as MbtiStyle;
  
  return mbtiType;
}

function calculateEmotionalIntelligence(answers: Record<number, number>): EmotionalIntelligence {
  // Self-awareness: Questions 11, 18
  const selfAwareness = (
    mapAnswerToScore(answers[11], [85, 70, 45, 30]) +
    mapAnswerToScore(answers[18], [85, 70, 45, 30])
  ) / 2;
  
  // Self-regulation: Questions 14, 18
  const selfRegulation = (
    mapAnswerToScore(answers[14], [85, 70, 40, 25]) +
    mapAnswerToScore(answers[18], [90, 75, 40, 25])
  ) / 2;
  
  // Empathy: Questions 8, 17, 20
  const empathy = (
    mapAnswerToScore(answers[8], [30, 75, 90, 20]) +
    mapAnswerToScore(answers[17], [90, 75, 45, 25]) +
    mapAnswerToScore(answers[20], [90, 75, 45, 30])
  ) / 3;
  
  // Social skills: Questions 14, 17, 37
  const socialSkills = (
    mapAnswerToScore(answers[14], [80, 70, 40, 25]) +
    mapAnswerToScore(answers[17], [85, 70, 45, 30]) +
    mapAnswerToScore(answers[37], [85, 65, 50, 30])
  ) / 3;
  
  return {
    selfAwareness: normalizeScore(selfAwareness),
    selfRegulation: normalizeScore(selfRegulation),
    empathy: normalizeScore(empathy),
    socialSkills: normalizeScore(socialSkills)
  };
}

function calculateCoreValues(answers: Record<number, number>): CoreValues {
  // Tradition: Questions 21, 23, 30, 39
  const tradition = (
    mapAnswerToScore(answers[21], [90, 70, 40, 20]) +
    mapAnswerToScore(answers[23], [90, 70, 40, 20]) +
    mapAnswerToScore(answers[30], [90, 70, 40, 20]) +
    mapAnswerToScore(answers[39], [90, 70, 40, 20])
  ) / 4;
  
  // Independence: Questions 19, 24, 28
  const independence = (
    mapAnswerToScore(answers[19], [65, 50, 25, 90]) +
    mapAnswerToScore(answers[24], [40, 60, 85, 70]) +
    mapAnswerToScore(answers[28], [70, 75, 60, 40])
  ) / 3;
  
  // Family: Questions 22, 25
  const family = (
    mapAnswerToScore(answers[22], [90, 75, 50, 30]) +
    mapAnswerToScore(answers[25], [90, 75, 50, 20])
  ) / 2;
  
  // Ambition: Questions 28
  const ambition = mapAnswerToScore(answers[28], [90, 75, 45, 25]);
  
  // Open-mindedness: Questions 21, 29, 36, 40
  const openMindedness = (
    mapAnswerToScore(answers[21], [25, 50, 75, 90]) +
    mapAnswerToScore(answers[29], [90, 75, 40, 20]) +
    mapAnswerToScore(answers[36], [90, 70, 40, 20]) +
    mapAnswerToScore(answers[40], [25, 50, 80, 90])
  ) / 4;
  
  return {
    tradition: normalizeScore(tradition),
    independence: normalizeScore(independence),
    family: normalizeScore(family),
    ambition: normalizeScore(ambition),
    openMindedness: normalizeScore(openMindedness)
  };
}

function calculateIntimacyProfile(answers: Record<number, number>): IntimacyProfile {
  // Traditionalism: Questions 31, 39
  const traditionalism = (
    mapAnswerToScore(answers[31], [90, 75, 40, 20]) +
    mapAnswerToScore(answers[39], [90, 75, 40, 20])
  ) / 2;
  
  // Physical affection: Questions 32, 33, 34
  const physicalAffection = (
    mapAnswerToScore(answers[32], [90, 75, 50, 25]) +
    mapAnswerToScore(answers[33], [90, 75, 45, 25]) +
    mapAnswerToScore(answers[34], [90, 75, 50, 30])
  ) / 3;
  
  // Communication: Questions 35, 37
  const communication = (
    mapAnswerToScore(answers[35], [90, 75, 45, 25]) +
    mapAnswerToScore(answers[37], [90, 70, 50, 25])
  ) / 2;
  
  // Experimentation: Questions 36
  const experimentation = mapAnswerToScore(answers[36], [90, 70, 40, 25]);
  
  return {
    traditionalism: normalizeScore(traditionalism),
    physicalAffection: normalizeScore(physicalAffection),
    communication: normalizeScore(communication),
    experimentation: normalizeScore(experimentation)
  };
}

function calculateSectionScores(answers: Record<number, number>): SectionScores {
  // Initialize counters
  let personalitySum = 0;
  let personalityCount = 0;
  let emotionalSum = 0;
  let emotionalCount = 0;
  let valuesSum = 0;
  let valuesCount = 0;
  let physicalSum = 0;
  let physicalCount = 0;

  // Loop through answers and categorize by section
  for (const [questionId, answerIndex] of Object.entries(answers)) {
    const id = parseInt(questionId);
    
    // Personality section (questions 1-10)
    if (id >= 1 && id <= 10) {
      // Map answer index (0-3) to a score (0-100)
      personalitySum += mapAnswerToRawScore(answerIndex);
      personalityCount++;
    }
    // Emotional section (questions 11-20)
    else if (id >= 11 && id <= 20) {
      emotionalSum += mapAnswerToRawScore(answerIndex);
      emotionalCount++;
    }
    // Values section (questions 21-30)
    else if (id >= 21 && id <= 30) {
      valuesSum += mapAnswerToRawScore(answerIndex);
      valuesCount++;
    }
    // Physical section (questions 31-40)
    else if (id >= 31 && id <= 40) {
      physicalSum += mapAnswerToRawScore(answerIndex);
      physicalCount++;
    }
  }

  // Calculate average scores, avoiding division by zero
  const personalityScore = personalityCount > 0 ? personalitySum / personalityCount : 50;
  const emotionalScore = emotionalCount > 0 ? emotionalSum / emotionalCount : 50;
  const valuesScore = valuesCount > 0 ? valuesSum / valuesCount : 50;
  const physicalScore = physicalCount > 0 ? physicalSum / physicalCount : 50;

  return {
    personality: personalityScore,
    emotional: emotionalScore,
    values: valuesScore,
    physical: physicalScore
  };
}

function determineOverallColor(
  sectionScores: SectionScores,
  personalityTraits: PersonalityTraits,
  attachmentStyle: AttachmentStyle
): CompatibilityColor {
  // Calculate a weighted average of the section scores
  const overallScore = (
    sectionScores.personality * 0.25 +
    sectionScores.emotional * 0.3 +
    sectionScores.values * 0.25 +
    sectionScores.physical * 0.2
  );
  
  // Adjustment based on attachment style
  let attachmentAdjustment = 0;
  if (attachmentStyle === 'secure') attachmentAdjustment = 10;
  if (attachmentStyle === 'anxious') attachmentAdjustment = -5;
  if (attachmentStyle === 'avoidant') attachmentAdjustment = -10;
  if (attachmentStyle === 'fearful') attachmentAdjustment = -15;
  
  // Adjustment based on personality traits
  const personalityAdjustment = 
    (100 - personalityTraits.neuroticism) * 0.1 +
    personalityTraits.agreeableness * 0.05 +
    personalityTraits.openness * 0.03;
  
  // Final adjusted score
  const adjustedScore = overallScore + attachmentAdjustment + personalityAdjustment;
  
  // Determine color based on adjusted score
  if (adjustedScore >= 70) return 'green';
  if (adjustedScore >= 45) return 'yellow';
  return 'red';
}

function generateDescription(
  overallColor: CompatibilityColor,
  personalityTraits: PersonalityTraits,
  attachmentStyle: AttachmentStyle
): string {
  let description = '';
  
  // Base description on overall compatibility color
  if (overallColor === 'green') {
    description = 'Your compatibility profile suggests that you have a well-balanced personality with healthy relationship patterns. You likely find it relatively easy to form and maintain satisfying connections with others. Your approach to relationships shows maturity and flexibility.';
  } else if (overallColor === 'yellow') {
    description = 'Your compatibility profile indicates some strengths alongside areas that may require attention. While you have positive relationship qualities, there are specific patterns that could present challenges in certain relationships. With awareness and effort, you can navigate these effectively.';
  } else {
    description = 'Your compatibility profile highlights significant areas that may present challenges in relationships. You may experience recurring patterns that make lasting, fulfilling connections difficult. However, with self-awareness and possibly professional support, you can develop healthier relationship dynamics.';
  }
  
  // Add personality-specific insights
  if (personalityTraits.extraversion > 70) {
    description += ' You thrive on social connection and likely bring energy and enthusiasm to relationships.';
  } else if (personalityTraits.extraversion < 30) {
    description += ' You value deep one-on-one connections and need personal space to recharge.';
  }
  
  if (personalityTraits.neuroticism > 70) {
    description += ' You may experience emotional intensity that can both enrich and challenge your relationships.';
  } else if (personalityTraits.neuroticism < 30) {
    description += ' Your emotional stability is a strength that helps you maintain calm during relationship challenges.';
  }
  
  // Add attachment-specific insights
  if (attachmentStyle === 'secure') {
    description += ' Your secure attachment style allows you to balance closeness and independence in relationships.';
  } else if (attachmentStyle === 'anxious') {
    description += ' Your attachment style may lead you to seek reassurance and worry about abandonment in relationships.';
  } else if (attachmentStyle === 'avoidant') {
    description += ' You tend to value independence and may find it challenging to fully open up in relationships.';
  } else if (attachmentStyle === 'fearful') {
    description += ' You may experience conflicting desires for closeness while fearing rejection, making relationships complex.';
  }
  
  return description;
}

function generateStrengthsWeaknesses(
  personalityTraits: PersonalityTraits,
  attachmentStyle: AttachmentStyle,
  emotionalIntelligence: EmotionalIntelligence
): StrengthsWeaknesses {
  const strengths: string[] = [];
  const challenges: string[] = [];
  const growthAreas: string[] = [];
  
  // Add personality-based strengths and challenges
  if (personalityTraits.openness > 70) {
    strengths.push('Curiosity and openness to new experiences');
  } else if (personalityTraits.openness < 30) {
    challenges.push('Resistance to change or new experiences');
    growthAreas.push('Becoming more open to different perspectives and experiences');
  }
  
  if (personalityTraits.conscientiousness > 70) {
    strengths.push('Reliability and strong organizational skills');
  } else if (personalityTraits.conscientiousness < 30) {
    challenges.push('Difficulty with organization or following through');
    growthAreas.push('Developing more consistency and follow-through in relationships');
  }
  
  if (personalityTraits.extraversion > 70) {
    strengths.push('Strong social energy and enthusiasm');
  } else if (personalityTraits.extraversion < 30) {
    strengths.push('Deep thinking and meaningful one-on-one connections');
    challenges.push('May find extensive socializing draining');
  }
  
  if (personalityTraits.agreeableness > 70) {
    strengths.push('Warmth, empathy, and cooperative nature');
  } else if (personalityTraits.agreeableness < 30) {
    challenges.push('Potential for bluntness that may hurt others');
    growthAreas.push("Developing more diplomacy and considering others' feelings");
  }
  
  if (personalityTraits.neuroticism > 70) {
    challenges.push('Tendency toward worry and emotional reactivity');
    growthAreas.push('Building emotional regulation skills and perspective-taking');
  } else if (personalityTraits.neuroticism < 30) {
    strengths.push('Emotional stability and resilience under stress');
  }
  
  // Add attachment-based insights
  if (attachmentStyle === 'secure') {
    strengths.push('Healthy balance of independence and intimacy');
    strengths.push('Ability to communicate needs effectively');
  } else if (attachmentStyle === 'anxious') {
    challenges.push('Worry about partner's availability or commitment');
    challenges.push('Tendency to seek excessive reassurance');
    growthAreas.push('Developing more self-reliance and managing anxiety');
  } else if (attachmentStyle === 'avoidant') {
    challenges.push('Difficulty with emotional vulnerability and closeness');
    strengths.push('Self-reliance and independence');
    growthAreas.push('Opening up more and allowing deeper emotional connection');
  } else if (attachmentStyle === 'fearful') {
    challenges.push('Conflicting desires for closeness while fearing rejection');
    growthAreas.push('Building trust and security in relationships');
    growthAreas.push('Developing consistent relationship patterns');
  }
  
  // Add emotional intelligence insights
  if (emotionalIntelligence.selfAwareness > 70) {
    strengths.push('Strong understanding of your own emotions and triggers');
  } else if (emotionalIntelligence.selfAwareness < 40) {
    growthAreas.push('Developing greater awareness of your emotional patterns');
  }
  
  if (emotionalIntelligence.selfRegulation > 70) {
    strengths.push('Excellent emotional regulation during conflicts');
  } else if (emotionalIntelligence.selfRegulation < 40) {
    challenges.push('Difficulty managing emotions during stress or conflict');
    growthAreas.push('Building skills to regulate emotions in challenging situations');
  }
  
  if (emotionalIntelligence.empathy > 70) {
    strengths.push('Strong ability to understand others' feelings and perspectives');
  } else if (emotionalIntelligence.empathy < 40) {
    challenges.push('Trouble understanding or connecting with others' emotions');
    growthAreas.push('Developing greater empathy and perspective-taking');
  }
  
  if (emotionalIntelligence.socialSkills > 70) {
    strengths.push('Excellent communication and conflict resolution abilities');
  } else if (emotionalIntelligence.socialSkills < 40) {
    challenges.push('Challenges with relationship communication or navigation');
    growthAreas.push('Improving communication skills and social awareness');
  }
  
  // Ensure we have at least 3 of each
  while (strengths.length < 3) strengths.push('Willingness to learn and grow through relationships');
  while (challenges.length < 3) challenges.push('Finding partners who complement your unique relationship style');
  while (growthAreas.length < 3) growthAreas.push('Continually developing self-awareness in relationships');
  
  return { strengths, challenges, growthAreas };
}

function generateCompatibleTypes(
  personalityTraits: PersonalityTraits,
  attachmentStyle: AttachmentStyle,
  coreValues: CoreValues
): CompatibleTypes {
  const mostCompatible: string[] = [];
  const challengingMatches: string[] = [];
  let compatibilityRationale = '';
  
  // Compatible and challenging types based on attachment style
  if (attachmentStyle === 'secure') {
    mostCompatible.push('People with secure or anxious attachment styles');
    mostCompatible.push('Partners who value open communication');
    challengingMatches.push('Highly avoidant individuals who resist emotional intimacy');
    compatibilityRationale = 'Your secure attachment style allows you to adapt to different relationship dynamics, though you'll thrive with someone who also values healthy intimacy and open communication. You can provide stability for anxiously attached partners, but may find it frustrating if someone consistently avoids closeness or vulnerability.';
  } else if (attachmentStyle === 'anxious') {
    mostCompatible.push('Partners with secure attachment who provide consistency');
    mostCompatible.push('People who are naturally reassuring and communicative');
    challengingMatches.push('Avoidant individuals who require significant space');
    challengingMatches.push('Partners who are emotionally unavailable or inconsistent');
    compatibilityRationale = 'You'll thrive with a partner who can provide the reassurance and stability you desire. Secure partners can help you develop more confidence, while avoidant partners might trigger your insecurities. Look for relationships where consistent communication and emotional availability are valued.';
  } else if (attachmentStyle === 'avoidant') {
    mostCompatible.push('Partners who respect your need for independence');
    mostCompatible.push('People who are patient with emotional pacing');
    challengingMatches.push('Anxious individuals who require frequent reassurance');
    challengingMatches.push('Partners who perceive independence as rejection');
    compatibilityRationale = 'You need a partner who understands your need for space and independence without taking it personally. Secure partners can respect your boundaries while gently encouraging connection. Relationships with anxiously attached people often become problematic as their need for closeness may feel overwhelming to you.';
  } else if (attachmentStyle === 'fearful') {
    mostCompatible.push('Patient partners with secure attachment');
    mostCompatible.push('People who are consistent and trustworthy over time');
    challengingMatches.push('Partners with unpredictable emotional patterns');
    challengingMatches.push('People who push for either extreme closeness or distance');
    compatibilityRationale = 'Your relationship patterns can be complex due to simultaneous desire for and fear of intimacy. You'll benefit most from a patient, secure partner who can provide consistency and safety while understanding your need to move slowly in building trust. Avoid relationships that reinforce insecurity or fear.';
  }
  
  // Add personality-based compatibility
  if (personalityTraits.extraversion > 70) {
    if (personalityTraits.openness > 60) {
      mostCompatible.push('Fellow adventurous, socially active people');
    } else {
      mostCompatible.push('People who enjoy social activities within familiar settings');
    }
    challengingMatches.push('Highly introverted people who need extensive alone time');
  } else if (personalityTraits.extraversion < 30) {
    mostCompatible.push('People who value meaningful one-on-one time');
    mostCompatible.push('Partners who are comfortable with quiet companionship');
    challengingMatches.push('Highly social people who constantly seek external stimulation');
  }
  
  // Add values-based compatibility
  if (coreValues.tradition > 70) {
    mostCompatible.push('Partners with similar traditional values');
    challengingMatches.push('Very progressive individuals with unconventional lifestyles');
  } else if (coreValues.tradition < 30) {
    mostCompatible.push('Open-minded individuals who embrace new ideas');
    challengingMatches.push('Highly traditional people with rigid expectations');
  }
  
  if (coreValues.family > 70) {
    mostCompatible.push('Family-oriented partners who value close family ties');
    challengingMatches.push('Extremely independent people disconnected from family');
  }
  
  // Ensure we have enough entries
  while (mostCompatible.length < 3) {
    mostCompatible.push('People who appreciate your unique combination of traits');
  }
  
  while (challengingMatches.length < 3) {
    challengingMatches.push('Partners whose core values fundamentally conflict with yours');
  }
  
  if (compatibilityRationale === '') {
    compatibilityRationale = 'Your compatibility is determined by several factors, including attachment style, personality traits, and core values. The most harmonious relationships will be with partners who complement your strengths and understand your unique needs.';
  }
  
  return {
    mostCompatible,
    challengingMatches,
    compatibilityRationale
  };
}

function generateCompatibilityInsights(
  overallColor: CompatibilityColor,
  personalityTraits: PersonalityTraits,
  attachmentStyle: AttachmentStyle,
  coreValues: CoreValues,
  intimacyProfile: IntimacyProfile
): string[] {
  const insights: string[] = [];
  
  // Overall compatibility color insights
  if (overallColor === 'green') {
    insights.push('Your profile indicates you have many of the qualities that contribute to healthy relationship patterns. You likely approach relationships with a good balance of giving and receiving.');
  } else if (overallColor === 'yellow') {
    insights.push('Your compatibility profile shows a mix of strengths and potential challenge areas. With awareness, you can navigate relationships successfully while continuing to grow.');
  } else {
    insights.push('Your profile reveals some significant patterns that may create challenges in relationships. Working on these areas can substantially improve your relationship experiences.');
  }
  
  // Attachment insights
  if (attachmentStyle === 'secure') {
    insights.push('Your secure attachment style is a major relationship strength. You likely feel comfortable with both intimacy and independence, creating a healthy foundation for connections.');
  } else if (attachmentStyle === 'anxious') {
    insights.push('Your attachment style suggests you deeply value connection, but may sometimes worry about losing relationships or seek frequent reassurance. Understanding this pattern can help you develop more security.');
  } else if (attachmentStyle === 'avoidant') {
    insights.push('Your attachment tendencies indicate you value independence highly, sometimes at the expense of emotional closeness. Recognizing when you're creating distance can help you build more satisfying connections.');
  } else if (attachmentStyle === 'fearful') {
    insights.push('Your attachment patterns show a complex mix of desiring closeness while fearing rejection or hurt. This can create push-pull dynamics in relationships that may benefit from therapeutic support.');
  }
  
  // Personality insights
  if (personalityTraits.extraversion > 70) {
    insights.push('Your outgoing nature brings energy to relationships, though partners with different social needs may require compromises around alone time versus social activities.');
  } else if (personalityTraits.extraversion < 30) {
    insights.push('Your introspective nature allows for deep connections, but may require finding partners who understand your need for alone time and quieter forms of togetherness.');
  }
  
  if (personalityTraits.neuroticism > 70) {
    insights.push('Your emotional sensitivity allows you to deeply connect but may also create vulnerability to stress in relationships. Developing emotional regulation strategies can help.');
  } else if (personalityTraits.neuroticism < 30) {
    insights.push('Your emotional stability is a relationship strength, helping you remain calm during conflicts. Remember that partners may need more emotional processing than you do.');
  }
  
  // Values insights
  if (coreValues.tradition > 70) {
    insights.push('Your traditional values will align well with partners who share similar perspectives but may create friction with more progressive individuals.');
  } else if (coreValues.openMindedness > 70) {
    insights.push('Your open-minded approach to relationships allows for growth and flexibility, though very traditional partners may find your perspectives challenging.');
  }
  
  if (coreValues.family > 70) {
    insights.push('Your strong family orientation suggests you'll thrive with a partner who also values close family connections and traditions.');
  }
  
  // Intimacy insights
  if (intimacyProfile.traditionalism > 70) {
    insights.push('Your traditional approach to physical intimacy means you value developing deep trust before physical connection, which works best with partners who share this perspective.');
  } else if (intimacyProfile.traditionalism < 30) {
    insights.push('Your open attitudes about physical intimacy mean you view it as a natural part of dating and connection, which works best with partners who share similar views.');
  }
  
  if (intimacyProfile.communication > 70) {
    insights.push('Your comfort with open communication about desires and needs is a relationship strength that fosters healthy intimacy and connection.');
  } else if (intimacyProfile.communication < 30) {
    insights.push('Developing more comfort discussing intimacy needs and preferences could enhance your relationship satisfaction.');
  }
  
  // Ensure at least 5 insights
  while (insights.length < 5) {
    insights.push('Understanding your unique relationship patterns helps you make better choices in partners and build more fulfilling connections.');
  }
  
  return insights;
}

function generateRelationshipTips(
  personalityTraits: PersonalityTraits,
  attachmentStyle: AttachmentStyle,
  emotionalIntelligence: EmotionalIntelligence
): string[] {
  const tips: string[] = [];
  
  // Attachment-based tips
  if (attachmentStyle === 'anxious') {
    tips.push('Practice self-soothing techniques when feeling insecure rather than immediately seeking reassurance.');
    tips.push('Look for consistent actions over time rather than words when evaluating a partner's commitment.');
    tips.push('Communicate needs directly rather than testing partners or expecting them to read your mind.');
  } else if (attachmentStyle === 'avoidant') {
    tips.push('Challenge yourself to share feelings more openly, even when it feels uncomfortable.');
    tips.push('Notice when you're creating emotional distance during moments of closeness.');
    tips.push('Remember that interdependence is not the same as unhealthy dependence.');
  } else if (attachmentStyle === 'fearful') {
    tips.push('Work on building trust gradually with partners who show consistent reliability.');
    tips.push('Consider therapy to address deeper patterns of insecurity in relationships.');
    tips.push('Be mindful of both tendencies to cling and to distance in relationships.');
  } else {
    tips.push('Continue nurturing your secure foundation while being patient with partners who may have different attachment needs.');
    tips.push('Use your relationship strengths to help create safety in your connections.');
  }
  
  // Personality-based tips
  if (personalityTraits.neuroticism > 70) {
    tips.push('Develop techniques to manage emotional reactivity during relationship conflicts.');
    tips.push('Practice distinguishing between feelings and facts when worried about your relationship.');
  }
  
  if (personalityTraits.extraversion > 70) {
    tips.push('Be mindful that partners may need more alone time than you do.');
  } else if (personalityTraits.extraversion < 30) {
    tips.push('Communicate your need for alone time as self-care rather than rejection of your partner.');
  }
  
  if (personalityTraits.openness < 40) {
    tips.push('Try to remain open to your partner's different perspectives rather than insisting on your way.');
  }
  
  if (personalityTraits.agreeableness < 40) {
    tips.push('Balance honesty with kindness when giving feedback to partners.');
  }
  
  // EQ-based tips
  if (emotionalIntelligence.selfAwareness < 50) {
    tips.push('Take time to reflect on your emotional patterns and triggers in relationships.');
  }
  
  if (emotionalIntelligence.empathy < 50) {
    tips.push('Practice active listening without immediately offering solutions to better understand your partner's feelings.');
  }
  
  if (emotionalIntelligence.selfRegulation < 50) {
    tips.push('Learn to take breaks during heated moments before responding emotionally.');
  }
  
  // General tips to add if needed
  const generalTips = [
    'Invest in developing friendship alongside romance in your relationships.',
    'Remember that compatibility doesn't mean similarity in all areas, but rather complementary dynamics.',
    'Regularly check in about relationship satisfaction rather than assuming everything is fine.',
    'Learn your partner's love language to show affection in ways they most appreciate.',
    'Consider how your family of origin influences your current relationship patterns.',
    'View disagreements as opportunities to understand each other better rather than conflicts to win.'
  ];
  
  // Add general tips until we have at least 6
  while (tips.length < 6) {
    const randomIndex = Math.floor(Math.random() * generalTips.length);
    const tip = generalTips[randomIndex];
    if (!tips.includes(tip)) {
      tips.push(tip);
    }
  }
  
  return tips;
}

// Helper function to map answer indices to trait scores
function mapAnswerToScore(answerIndex: number, scoreMapping: number[]): number {
  if (answerIndex === undefined || answerIndex < 0 || answerIndex >= scoreMapping.length) {
    return 50; // Default middle score for missing data
  }
  return scoreMapping[answerIndex];
}

// Helper function to map answer indices to raw scores (0-100)
function mapAnswerToRawScore(answerIndex: number): number {
  if (answerIndex === undefined) return 50;
  
  // Map answer index (0-3) to score range (0-100)
  const scores = [85, 65, 40, 20]; // High, Medium-High, Medium-Low, Low
  return scores[answerIndex] || 50;
}

// Helper function to ensure scores are within 0-100 range
function normalizeScore(score: number): number {
  return Math.max(0, Math.min(100, score));
}

// Generate default profile when not enough data is available
function generateDefaultProfile(): CompatibilityProfile {
  return {
    overallColor: 'yellow',
    description: 'This is a preliminary profile based on limited data. Complete more questions for a personalized analysis.',
    personalityTraits: {
      openness: 50,
      conscientiousness: 50,
      extraversion: 50,
      agreeableness: 50,
      neuroticism: 50
    },
    attachmentStyle: 'secure',
    mbtiStyle: 'INFJ',
    emotionalIntelligence: {
      selfAwareness: 50,
      selfRegulation: 50,
      empathy: 50,
      socialSkills: 50
    },
    coreValues: {
      tradition: 50,
      independence: 50,
      family: 50,
      ambition: 50,
      openMindedness: 50
    },
    intimacyProfile: {
      traditionalism: 50,
      physicalAffection: 50,
      communication: 50,
      experimentation: 50
    },
    sectionScores: {
      personality: 50,
      emotional: 50,
      values: 50,
      physical: 50
    },
    strengthsWeaknesses: {
      strengths: [
        'Willingness to explore self-understanding',
        'Interest in improving relationship patterns',
        'Openness to personal growth'
      ],
      challenges: [
        'Need more data to identify specific patterns',
        'Incomplete profile may miss important nuances',
        'Still developing self-awareness in relationships'
      ],
      growthAreas: [
        'Continue reflecting on relationship patterns',
        'Observe your reactions in different relationship situations',
        'Complete the assessment for deeper insights'
      ]
    },
    compatibleTypes: {
      mostCompatible: [
        'Partners who share your journey of self-discovery',
        'People who value personal growth and communication',
        'Individuals with patience and understanding'
      ],
      challengingMatches: [
        'Partners who don't value self-awareness',
        'People unwilling to discuss relationship dynamics',
        'Individuals with rigid expectations of relationships'
      ],
      compatibilityRationale: 'While your full compatibility profile is still developing, partners who value personal growth, open communication, and mutual understanding will likely be good matches as you continue your journey of self-discovery.'
    },
    compatibilityInsights: [
      'Complete the full assessment to unlock detailed insights about your relationship patterns.',
      'Every question you answer helps build a more accurate profile of your compatibility strengths and growth areas.',
      'Understanding yourself is the first step toward finding fulfilling relationships that match your needs.',
      'Your willingness to reflect on your relationship patterns shows a valuable commitment to personal growth.',
      'The more honest you are in your responses, the more valuable your compatibility insights will be.'
    ],
    relationshipTips: [
      'Practice open communication about needs and expectations in relationships.',
      'Pay attention to patterns in your past relationships for valuable insights.',
      'Remember that compatibility is about complementary qualities, not just similarities.',
      'Take time to understand what you truly need versus what you think you should want.',
      'Reflect on how your family background may influence your relationship expectations.',
      'Value personal growth alongside relationship development.'
    ]
  };
}