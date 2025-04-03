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

export const calculateCompatibilityProfile = (answers: Record<number, number>): CompatibilityProfile => {
  // Calculate personality traits and attachment style
  const personalityTraits = calculatePersonalityTraits(answers);
  const attachmentStyle = determineAttachmentStyle(answers);
  const mbtiStyle = calculateMbtiStyle(answers);
  const emotionalIntelligence = calculateEmotionalIntelligence(answers);
  const coreValues = calculateCoreValues(answers);
  const intimacyProfile = calculateIntimacyProfile(answers);
  
  // Calculate section scores
  const sectionScores = calculateSectionScores(answers);
  
  // Determine overall compatibility color
  const overallColor = determineOverallColor(
    sectionScores,
    personalityTraits,
    attachmentStyle
  );
  
  // Generate description
  const description = generateDescription(
    overallColor,
    personalityTraits,
    attachmentStyle
  );
  
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

// Generate a simplified preview of the profile
export const generateProfilePreview = (compatibilityProfile: CompatibilityProfile) => {
  const {
    overallColor,
    description,
    personalityTraits,
    attachmentStyle,
    mbtiStyle,
    sectionScores,
    strengthsWeaknesses,
    compatibleTypes
  } = compatibilityProfile;

  // Preview strengths/challenges (limit to 2 of each)
  const previewStrengths = strengthsWeaknesses.strengths.slice(0, 2);
  const previewChallenges = strengthsWeaknesses.challenges.slice(0, 2);
  
  // Preview compatible/challenging types (limit to 1 of each)
  const previewCompatible = compatibleTypes.mostCompatible.slice(0, 1);
  const previewChallenging = compatibleTypes.challengingMatches.slice(0, 1);
  
  return {
    overallColor,
    description,
    attachmentStyle,
    mbtiStyle, 
    sectionScores,
    previewStrengths,
    previewChallenges,
    previewCompatible,
    previewChallenging
  };
};

// Implementation of helper functions

function calculatePersonalityTraits(answers: Record<number, number>): PersonalityTraits {
  // Questions for openness: 1, 6, 11, 16, 21
  // Questions for conscientiousness: 2, 7, 12, 17, 22
  // Questions for extraversion: 3, 8, 13, 18, 23
  // Questions for agreeableness: 4, 9, 14, 19, 24
  // Questions for neuroticism: 5, 10, 15, 20, 25
  
  // Initialize with moderate values (50 on a 0-100 scale)
  const traits = {
    openness: 50,
    conscientiousness: 50,
    extraversion: 50,
    agreeableness: 50,
    neuroticism: 50
  };
  
  // Calculate openness
  let opennessScore = 0;
  let opennessCount = 0;
  
  [1, 6, 11, 16, 21].forEach(q => {
    if (answers[q] !== undefined) {
      opennessScore += mapAnswerToScore(answers[q], [30, 40, 50, 70, 85]);
      opennessCount++;
    }
  });
  
  if (opennessCount > 0) {
    traits.openness = Math.round(opennessScore / opennessCount);
  }
  
  // Calculate conscientiousness
  let conscientiousnessScore = 0;
  let conscientiousnessCount = 0;
  
  [2, 7, 12, 17, 22].forEach(q => {
    if (answers[q] !== undefined) {
      conscientiousnessScore += mapAnswerToScore(answers[q], [25, 40, 55, 70, 90]);
      conscientiousnessCount++;
    }
  });
  
  if (conscientiousnessCount > 0) {
    traits.conscientiousness = Math.round(conscientiousnessScore / conscientiousnessCount);
  }
  
  // Calculate extraversion
  let extraversionScore = 0;
  let extraversionCount = 0;
  
  [3, 8, 13, 18, 23].forEach(q => {
    if (answers[q] !== undefined) {
      extraversionScore += mapAnswerToScore(answers[q], [20, 35, 50, 70, 90]);
      extraversionCount++;
    }
  });
  
  if (extraversionCount > 0) {
    traits.extraversion = Math.round(extraversionScore / extraversionCount);
  }
  
  // Calculate agreeableness
  let agreeablenessScore = 0;
  let agreeablenessCount = 0;
  
  [4, 9, 14, 19, 24].forEach(q => {
    if (answers[q] !== undefined) {
      agreeablenessScore += mapAnswerToScore(answers[q], [25, 40, 55, 75, 90]);
      agreeablenessCount++;
    }
  });
  
  if (agreeablenessCount > 0) {
    traits.agreeableness = Math.round(agreeablenessScore / agreeablenessCount);
  }
  
  // Calculate neuroticism
  let neuroticismScore = 0;
  let neuroticismCount = 0;
  
  [5, 10, 15, 20, 25].forEach(q => {
    if (answers[q] !== undefined) {
      neuroticismScore += mapAnswerToScore(answers[q], [25, 40, 55, 70, 85]);
      neuroticismCount++;
    }
  });
  
  if (neuroticismCount > 0) {
    traits.neuroticism = Math.round(neuroticismScore / neuroticismCount);
  }
  
  return traits;
}

function determineAttachmentStyle(answers: Record<number, number>): AttachmentStyle {
  // Questions for attachment: 26, 27, 28, 29, 30
  // Q26: I find it easy to trust romantic partners (secure +, avoidant -)
  // Q27: I worry about my partner leaving me (anxious +, secure -)
  // Q28: I prefer not to get too emotionally close to a partner (avoidant +, secure -)
  // Q29: I both desire and fear intimacy (fearful +)
  // Q30: I can rely on others and allow them to rely on me (secure +, avoidant -)
  
  // Calculate attachment scores (0-100 scale)
  let secureScore = 50;
  let anxiousScore = 40;
  let avoidantScore = 40;
  let fearfulScore = 30;
  
  // Q26: I find it easy to trust romantic partners
  if (answers[26] !== undefined) {
    secureScore += mapAnswerToScore(answers[26], [-10, -5, 0, 10, 20]);
    avoidantScore -= mapAnswerToScore(answers[26], [10, 5, 0, -5, -10]);
  }
  
  // Q27: I worry about my partner leaving me
  if (answers[27] !== undefined) {
    anxiousScore += mapAnswerToScore(answers[27], [-15, -5, 0, 10, 25]);
    secureScore -= mapAnswerToScore(answers[27], [10, 5, 0, -5, -10]);
    fearfulScore += mapAnswerToScore(answers[27], [-5, 0, 5, 10, 15]);
  }
  
  // Q28: I prefer not to get too emotionally close to a partner
  if (answers[28] !== undefined) {
    avoidantScore += mapAnswerToScore(answers[28], [-15, -5, 0, 15, 25]);
    secureScore -= mapAnswerToScore(answers[28], [10, 5, 0, -5, -15]);
  }
  
  // Q29: I both desire and fear intimacy
  if (answers[29] !== undefined) {
    fearfulScore += mapAnswerToScore(answers[29], [-15, -5, 0, 15, 25]);
    secureScore -= mapAnswerToScore(answers[29], [10, 5, 0, -5, -15]);
  }
  
  // Q30: I can rely on others and allow them to rely on me
  if (answers[30] !== undefined) {
    secureScore += mapAnswerToScore(answers[30], [-10, -5, 0, 10, 20]);
    avoidantScore -= mapAnswerToScore(answers[30], [10, 5, 0, -5, -10]);
  }
  
  // Normalize scores
  secureScore = normalizeScore(secureScore);
  anxiousScore = normalizeScore(anxiousScore);
  avoidantScore = normalizeScore(avoidantScore);
  fearfulScore = normalizeScore(fearfulScore);
  
  // Determine dominant style
  const scores = [
    { style: 'secure' as AttachmentStyle, score: secureScore },
    { style: 'anxious' as AttachmentStyle, score: anxiousScore },
    { style: 'avoidant' as AttachmentStyle, score: avoidantScore },
    { style: 'fearful' as AttachmentStyle, score: fearfulScore }
  ];
  
  // Sort by score (descending)
  scores.sort((a, b) => b.score - a.score);
  
  return scores[0].style;
}

function calculateMbtiStyle(answers: Record<number, number>): MbtiStyle {
  // Simplified MBTI calculation
  // E/I: Extroversion vs Introversion (Q3, Q8, Q13, Q18, Q23)
  // S/N: Sensing vs Intuition (Q1, Q6, Q11, Q16, Q21)
  // T/F: Thinking vs Feeling (Q4, Q9, Q14, Q19, Q24)
  // J/P: Judging vs Perceiving (Q2, Q7, Q12, Q17, Q22)
  
  let eScore = 0;
  let sScore = 0;
  let tScore = 0;
  let jScore = 0;
  
  // E/I calculation
  [3, 8, 13, 18, 23].forEach(q => {
    if (answers[q] !== undefined) {
      eScore += mapAnswerToRawScore(q, answers[q]);
    }
  });
  
  // S/N calculation (reversed from openness)
  [1, 6, 11, 16, 21].forEach(q => {
    if (answers[q] !== undefined) {
      sScore += 4 - mapAnswerToRawScore(answers[q]);
    }
  });
  
  // T/F calculation (reversed from agreeableness)
  [4, 9, 14, 19, 24].forEach(q => {
    if (answers[q] !== undefined) {
      tScore += 4 - mapAnswerToRawScore(answers[q]);
    }
  });
  
  // J/P calculation (from conscientiousness)
  [2, 7, 12, 17, 22].forEach(q => {
    if (answers[q] !== undefined) {
      jScore += mapAnswerToRawScore(answers[q]);
    }
  });
  
  // Determine preferences
  const e = eScore > 10 ? 'E' : 'I';
  const s = sScore > 10 ? 'S' : 'N';
  const t = tScore > 10 ? 'T' : 'F';
  const j = jScore > 10 ? 'J' : 'P';
  
  return `${e}${s}${t}${j}` as MbtiStyle;
}

function calculateEmotionalIntelligence(answers: Record<number, number>): EmotionalIntelligence {
  // Questions for emotional intelligence: 31-34
  // 31: Self-awareness
  // 32: Self-regulation
  // 33: Empathy
  // 34: Social skills
  
  const eq = {
    selfAwareness: 50,
    selfRegulation: 50,
    empathy: 50,
    socialSkills: 50
  };
  
  if (answers[31] !== undefined) {
    eq.selfAwareness = mapAnswerToScore(answers[31], [20, 35, 50, 75, 90]);
  }
  
  if (answers[32] !== undefined) {
    eq.selfRegulation = mapAnswerToScore(answers[32], [20, 35, 50, 75, 90]);
  }
  
  if (answers[33] !== undefined) {
    eq.empathy = mapAnswerToScore(answers[33], [20, 35, 50, 75, 90]);
  }
  
  if (answers[34] !== undefined) {
    eq.socialSkills = mapAnswerToScore(answers[34], [20, 35, 50, 75, 90]);
  }
  
  return eq;
}

function calculateCoreValues(answers: Record<number, number>): CoreValues {
  // Questions for core values: 35-39
  // 35: Tradition
  // 36: Independence
  // 37: Family
  // 38: Ambition
  // 39: Open-mindedness
  
  const values = {
    tradition: 50,
    independence: 50,
    family: 50,
    ambition: 50,
    openMindedness: 50
  };
  
  if (answers[35] !== undefined) {
    values.tradition = mapAnswerToScore(answers[35], [10, 30, 50, 70, 90]);
  }
  
  if (answers[36] !== undefined) {
    values.independence = mapAnswerToScore(answers[36], [10, 30, 50, 70, 90]);
  }
  
  if (answers[37] !== undefined) {
    values.family = mapAnswerToScore(answers[37], [10, 30, 50, 70, 90]);
  }
  
  if (answers[38] !== undefined) {
    values.ambition = mapAnswerToScore(answers[38], [10, 30, 50, 70, 90]);
  }
  
  if (answers[39] !== undefined) {
    values.openMindedness = mapAnswerToScore(answers[39], [10, 30, 50, 70, 90]);
  }
  
  return values;
}

function calculateIntimacyProfile(answers: Record<number, number>): IntimacyProfile {
  // Questions for intimacy: 40-43
  // 40: Traditionalism
  // 41: Physical affection
  // 42: Communication
  // 43: Experimentation
  
  const intimacy = {
    traditionalism: 50,
    physicalAffection: 50,
    communication: 50,
    experimentation: 50
  };
  
  if (answers[40] !== undefined) {
    intimacy.traditionalism = mapAnswerToScore(answers[40], [10, 30, 50, 70, 90]);
  }
  
  if (answers[41] !== undefined) {
    intimacy.physicalAffection = mapAnswerToScore(answers[41], [10, 30, 50, 70, 90]);
  }
  
  if (answers[42] !== undefined) {
    intimacy.communication = mapAnswerToScore(answers[42], [10, 30, 50, 70, 90]);
  }
  
  if (answers[43] !== undefined) {
    intimacy.experimentation = mapAnswerToScore(answers[43], [10, 30, 50, 70, 90]);
  }
  
  return intimacy;
}

function calculateSectionScores(answers: Record<number, number>): SectionScores {
  // Calculate section scores (normalized 0-100)
  const scores = {
    personality: 0,
    emotional: 0,
    values: 0,
    physical: 0
  };
  
  // Personality section (questions 1-30)
  let personalityPoints = 0;
  let personalityCount = 0;
  
  for (let i = 1; i <= 30; i++) {
    if (answers[i] !== undefined) {
      personalityPoints += mapAnswerToRawScore(answers[i]);
      personalityCount++;
    }
  }
  
  if (personalityCount > 0) {
    scores.personality = (personalityPoints / (personalityCount * 4)) * 100;
  }
  
  // Emotional section (questions 31-34)
  let emotionalPoints = 0;
  let emotionalCount = 0;
  
  for (let i = 31; i <= 34; i++) {
    if (answers[i] !== undefined) {
      emotionalPoints += mapAnswerToRawScore(answers[i]);
      emotionalCount++;
    }
  }
  
  if (emotionalCount > 0) {
    scores.emotional = (emotionalPoints / (emotionalCount * 4)) * 100;
  }
  
  // Values section (questions 35-39)
  let valuesPoints = 0;
  let valuesCount = 0;
  
  for (let i = 35; i <= 39; i++) {
    if (answers[i] !== undefined) {
      valuesPoints += mapAnswerToRawScore(answers[i]);
      valuesCount++;
    }
  }
  
  if (valuesCount > 0) {
    scores.values = (valuesPoints / (valuesCount * 4)) * 100;
  }
  
  // Physical section (questions 40-43)
  let physicalPoints = 0;
  let physicalCount = 0;
  
  for (let i = 40; i <= 43; i++) {
    if (answers[i] !== undefined) {
      physicalPoints += mapAnswerToRawScore(answers[i]);
      physicalCount++;
    }
  }
  
  if (physicalCount > 0) {
    scores.physical = (physicalPoints / (physicalCount * 4)) * 100;
  }
  
  return scores;
}

function determineOverallColor(
  sectionScores: SectionScores,
  personalityTraits: PersonalityTraits,
  attachmentStyle: AttachmentStyle
): CompatibilityColor {
  // Calculate average section score
  const avgScore = (
    sectionScores.personality + 
    sectionScores.emotional + 
    sectionScores.values + 
    sectionScores.physical
  ) / 4;
  
  // Red flags
  if (
    personalityTraits.neuroticism > 85 || 
    (attachmentStyle === 'fearful' && personalityTraits.neuroticism > 70) ||
    avgScore < 35
  ) {
    return 'red';
  }
  
  // Green indicators
  if (
    attachmentStyle === 'secure' && 
    personalityTraits.neuroticism < 60 && 
    personalityTraits.conscientiousness > 60 &&
    avgScore > 65
  ) {
    return 'green';
  }
  
  // Yellow default
  return 'yellow';
}

function generateDescription(
  overallColor: CompatibilityColor,
  personalityTraits: PersonalityTraits,
  attachmentStyle: AttachmentStyle
): string {
  let description = "";
  
  // Color-based intro
  if (overallColor === 'green') {
    description = "Your compatibility profile shows many strengths that contribute to healthy relationships. ";
  } else if (overallColor === 'yellow') {
    description = "Your compatibility profile shows a mix of relationship strengths and growth opportunities. ";
  } else {
    description = "Your compatibility profile reveals patterns that may create challenges in relationships. ";
  }
  
  // Personality-based insights
  if (personalityTraits.extraversion > 70) {
    description += "You're likely outgoing and socially confident, bringing energy to your relationships. ";
  } else if (personalityTraits.extraversion < 30) {
    description += "You likely prefer deeper connections with fewer people, valuing quality over quantity in relationships. ";
  }
  
  if (personalityTraits.neuroticism > 70) {
    description += "You may experience emotions intensely, which can create both deep connection and occasional tension. ";
  } else if (personalityTraits.neuroticism < 30) {
    description += "Your emotional stability is a relationship strength, helping you navigate challenges with resilience. ";
  }
  
  // Attachment-based insights
  if (attachmentStyle === 'secure') {
    description += "You generally feel comfortable with both intimacy and independence, creating a healthy balance in relationships.";
  } else if (attachmentStyle === 'anxious') {
    description += "You value closeness in relationships and may sometimes worry about your partner's availability or commitment.";
  } else if (attachmentStyle === 'avoidant') {
    description += "You value independence and may sometimes find it challenging to open up completely in relationships.";
  } else if (attachmentStyle === 'fearful') {
    description += "You may experience a mix of desiring closeness while also having concerns about getting hurt in relationships.";
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
  
  // Add personality-based insights
  if (personalityTraits.openness > 70) {
    strengths.push("Intellectual curiosity and openness to new experiences");
  } else if (personalityTraits.openness < 30) {
    challenges.push("Potential resistance to change or new relationship dynamics");
    growthAreas.push("Developing more flexibility with different viewpoints");
  }
  
  if (personalityTraits.conscientiousness > 70) {
    strengths.push("Reliability and commitment to relationship responsibilities");
  } else if (personalityTraits.conscientiousness < 30) {
    challenges.push("Difficulty with consistency or relationship maintenance");
    growthAreas.push("Building more structure and reliability in relationships");
  }
  
  if (personalityTraits.extraversion > 70) {
    strengths.push("Social energy and enthusiasm in relationships");
  } else if (personalityTraits.extraversion < 30) {
    strengths.push("Capacity for deep one-on-one connection");
    challenges.push("May need significant alone time to recharge");
  }
  
  if (personalityTraits.agreeableness > 70) {
    strengths.push("Warmth, empathy, and cooperative nature");
  } else if (personalityTraits.agreeableness < 30) {
    challenges.push("Potential for bluntness that may hurt others");
    growthAreas.push("Developing more diplomacy and considering others' feelings");
  }
  
  if (personalityTraits.neuroticism > 70) {
    challenges.push("Tendency toward worry and emotional reactivity");
    growthAreas.push("Building emotional regulation skills and perspective-taking");
  } else if (personalityTraits.neuroticism < 30) {
    strengths.push("Emotional stability and resilience under stress");
  }
  
  // Add attachment-based insights
  if (attachmentStyle === 'secure') {
    strengths.push("Healthy balance of independence and intimacy");
    strengths.push("Ability to communicate needs effectively");
  } else if (attachmentStyle === 'anxious') {
    challenges.push("Worry about partner's availability or commitment");
    challenges.push("Tendency to seek excessive reassurance");
    growthAreas.push("Developing more self-reliance and managing anxiety");
  } else if (attachmentStyle === 'avoidant') {
    challenges.push("Difficulty with emotional vulnerability and closeness");
    strengths.push("Self-reliance and independence");
    growthAreas.push("Opening up more and allowing deeper emotional connection");
  } else if (attachmentStyle === 'fearful') {
    challenges.push("Conflicting desires for closeness while fearing rejection");
    growthAreas.push("Building trust and security in relationships");
    growthAreas.push("Developing consistent relationship patterns");
  }
  
  // Add emotional intelligence insights
  if (emotionalIntelligence.selfAwareness > 70) {
    strengths.push("Strong understanding of your own emotions and triggers");
  } else if (emotionalIntelligence.selfAwareness < 40) {
    growthAreas.push("Developing greater awareness of your emotional patterns");
  }
  
  if (emotionalIntelligence.selfRegulation > 70) {
    strengths.push("Excellent emotional regulation during conflicts");
  } else if (emotionalIntelligence.selfRegulation < 40) {
    challenges.push("Difficulty managing emotions during stress or conflict");
    growthAreas.push("Building skills to regulate emotions in challenging situations");
  }
  
  if (emotionalIntelligence.empathy > 70) {
    strengths.push("Strong ability to understand others' feelings and perspectives");
  } else if (emotionalIntelligence.empathy < 40) {
    challenges.push("Trouble understanding or connecting with others' emotions");
    growthAreas.push("Developing greater empathy and perspective-taking");
  }
  
  if (emotionalIntelligence.socialSkills > 70) {
    strengths.push("Excellent communication and conflict resolution abilities");
  } else if (emotionalIntelligence.socialSkills < 40) {
    challenges.push("Challenges with relationship communication or navigation");
    growthAreas.push("Improving communication skills and social awareness");
  }
  
  // Ensure we have at least 3 of each
  while (strengths.length < 3) strengths.push("Willingness to learn and grow through relationships");
  while (challenges.length < 3) challenges.push("Finding partners who complement your unique relationship style");
  while (growthAreas.length < 3) growthAreas.push("Continually developing self-awareness in relationships");
  
  return { strengths, challenges, growthAreas };
}

function generateCompatibleTypes(
  personalityTraits: PersonalityTraits,
  attachmentStyle: AttachmentStyle,
  coreValues: CoreValues
): CompatibleTypes {
  const mostCompatible: string[] = [];
  const challengingMatches: string[] = [];
  let compatibilityRationale = "";
  
  // Compatible and challenging types based on attachment style
  if (attachmentStyle === 'secure') {
    mostCompatible.push("People with secure or anxious attachment styles");
    mostCompatible.push("Partners who value open communication");
    challengingMatches.push("Highly avoidant individuals who resist emotional intimacy");
    compatibilityRationale = "Your secure attachment style allows you to adapt to different relationship dynamics, though you'll thrive with someone who also values healthy intimacy and open communication. You can provide stability for anxiously attached partners, but may find it frustrating if someone consistently avoids closeness or vulnerability.";
  } else if (attachmentStyle === 'anxious') {
    mostCompatible.push("Partners with secure attachment who provide consistency");
    mostCompatible.push("People who are naturally reassuring and communicative");
    challengingMatches.push("Avoidant individuals who require significant space");
    challengingMatches.push("Partners who are emotionally unavailable or inconsistent");
    compatibilityRationale = "You'll thrive with a partner who can provide the reassurance and stability you desire. Secure partners can help you develop more confidence, while avoidant partners might trigger your insecurities. Look for relationships where consistent communication and emotional availability are valued.";
  } else if (attachmentStyle === 'avoidant') {
    mostCompatible.push("Partners who respect your need for independence");
    mostCompatible.push("People who are patient with emotional pacing");
    challengingMatches.push("Anxious individuals who require frequent reassurance");
    challengingMatches.push("Partners who perceive independence as rejection");
    compatibilityRationale = "You need a partner who understands your need for space and independence without taking it personally. Secure partners can respect your boundaries while gently encouraging connection. Relationships with anxiously attached people often become problematic as their need for closeness may feel overwhelming to you.";
  } else if (attachmentStyle === 'fearful') {
    mostCompatible.push("Patient partners with secure attachment");
    mostCompatible.push("People who are consistent and trustworthy over time");
    challengingMatches.push("Partners with unpredictable emotional patterns");
    challengingMatches.push("People who push for either extreme closeness or distance");
    compatibilityRationale = "Your relationship patterns can be complex due to simultaneous desire for and fear of intimacy. You'll benefit most from a patient, secure partner who can provide consistency and safety while understanding your need to move slowly in building trust. Avoid relationships that reinforce insecurity or fear.";
  }
  
  // Add personality-based compatibility
  if (personalityTraits.extraversion > 70) {
    if (personalityTraits.openness > 60) {
      mostCompatible.push("Fellow adventurous, socially active people");
    } else {
      mostCompatible.push("People who enjoy social activities within familiar settings");
    }
    challengingMatches.push("Highly introverted people who need extensive alone time");
  } else if (personalityTraits.extraversion < 30) {
    mostCompatible.push("People who value meaningful one-on-one time");
    mostCompatible.push("Partners who are comfortable with quiet companionship");
    challengingMatches.push("Highly social people who constantly seek external stimulation");
  }
  
  // Add values-based compatibility
  if (coreValues.tradition > 70) {
    mostCompatible.push("Partners with similar traditional values");
    challengingMatches.push("Very progressive individuals with unconventional lifestyles");
  } else if (coreValues.tradition < 30) {
    mostCompatible.push("Open-minded individuals who embrace new ideas");
    challengingMatches.push("Highly traditional people with rigid expectations");
  }
  
  if (coreValues.family > 70) {
    mostCompatible.push("Family-oriented partners who value close family ties");
    challengingMatches.push("Extremely independent people disconnected from family");
  }
  
  // Ensure we have enough entries
  while (mostCompatible.length < 3) {
    mostCompatible.push("People who appreciate your unique combination of traits");
  }
  
  while (challengingMatches.length < 3) {
    challengingMatches.push("Partners whose core values fundamentally conflict with yours");
  }
  
  if (compatibilityRationale === "") {
    compatibilityRationale = "Your compatibility is determined by several factors, including attachment style, personality traits, and core values. The most harmonious relationships will be with partners who complement your strengths and understand your unique needs.";
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
    insights.push("Your profile indicates you have many of the qualities that contribute to healthy relationship patterns. You likely approach relationships with a good balance of giving and receiving.");
  } else if (overallColor === 'yellow') {
    insights.push("Your compatibility profile shows a mix of strengths and potential challenge areas. With awareness, you can navigate relationships successfully while continuing to grow.");
  } else {
    insights.push("Your profile reveals some significant patterns that may create challenges in relationships. Working on these areas can substantially improve your relationship experiences.");
  }
  
  // Attachment insights
  if (attachmentStyle === 'secure') {
    insights.push("Your secure attachment style is a major relationship strength. You likely feel comfortable with both intimacy and independence, creating a healthy foundation for connections.");
  } else if (attachmentStyle === 'anxious') {
    insights.push("Your attachment style suggests you deeply value connection, but may sometimes worry about losing relationships or seek frequent reassurance. Understanding this pattern can help you develop more security.");
  } else if (attachmentStyle === 'avoidant') {
    insights.push("Your attachment tendencies indicate you value independence highly, sometimes at the expense of emotional closeness. Recognizing when you're creating distance can help you build more satisfying connections.");
  } else if (attachmentStyle === 'fearful') {
    insights.push("Your attachment patterns show a complex mix of desiring closeness while fearing rejection or hurt. This can create push-pull dynamics in relationships that may benefit from therapeutic support.");
  }
  
  // Personality insights
  if (personalityTraits.extraversion > 70) {
    insights.push("Your outgoing nature brings energy to relationships, though partners with different social needs may require compromises around alone time versus social activities.");
  } else if (personalityTraits.extraversion < 30) {
    insights.push("Your introspective nature allows for deep connections, but may require finding partners who understand your need for alone time and quieter forms of togetherness.");
  }
  
  if (personalityTraits.neuroticism > 70) {
    insights.push("Your emotional sensitivity allows you to deeply connect but may also create vulnerability to stress in relationships. Developing emotional regulation strategies can help.");
  } else if (personalityTraits.neuroticism < 30) {
    insights.push("Your emotional stability is a relationship strength, helping you remain calm during conflicts. Remember that partners may need more emotional processing than you do.");
  }
  
  // Values insights
  if (coreValues.tradition > 70) {
    insights.push("Your traditional values will align well with partners who share similar perspectives but may create friction with more progressive individuals.");
  } else if (coreValues.openMindedness > 70) {
    insights.push("Your open-minded approach to relationships allows for growth and flexibility, though very traditional partners may find your perspectives challenging.");
  }
  
  if (coreValues.family > 70) {
    insights.push("Your strong family orientation suggests you'll thrive with a partner who also values close family connections and traditions.");
  }
  
  // Intimacy insights
  if (intimacyProfile.traditionalism > 70) {
    insights.push("Your traditional approach to physical intimacy means you value developing deep trust before physical connection, which works best with partners who share this perspective.");
  } else if (intimacyProfile.traditionalism < 30) {
    insights.push("Your open attitudes about physical intimacy mean you view it as a natural part of dating and connection, which works best with partners who share similar views.");
  }
  
  if (intimacyProfile.communication > 70) {
    insights.push("Your comfort with open communication about desires and needs is a relationship strength that fosters healthy intimacy and connection.");
  } else if (intimacyProfile.communication < 30) {
    insights.push("Developing more comfort discussing intimacy needs and preferences could enhance your relationship satisfaction.");
  }
  
  // Ensure at least 5 insights
  while (insights.length < 5) {
    insights.push("Understanding your unique relationship patterns helps you make better choices in partners and build more fulfilling connections.");
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
    tips.push("Practice self-soothing techniques when feeling insecure rather than immediately seeking reassurance.");
    tips.push("Look for consistent actions over time rather than words when evaluating a partner's commitment.");
    tips.push("Communicate needs directly rather than testing partners or expecting them to read your mind.");
  } else if (attachmentStyle === 'avoidant') {
    tips.push("Challenge yourself to share feelings more openly, even when it feels uncomfortable.");
    tips.push("Notice when you're creating emotional distance during moments of closeness.");
    tips.push("Remember that interdependence is not the same as unhealthy dependence.");
  } else if (attachmentStyle === 'fearful') {
    tips.push("Work on building trust gradually with partners who show consistent reliability.");
    tips.push("Consider therapy to address deeper patterns of insecurity in relationships.");
    tips.push("Be mindful of both tendencies to cling and to distance in relationships.");
  } else {
    tips.push("Continue nurturing your secure foundation while being patient with partners who may have different attachment needs.");
    tips.push("Use your relationship strengths to help create safety in your connections.");
  }
  
  // Personality-based tips
  if (personalityTraits.neuroticism > 70) {
    tips.push("Develop techniques to manage emotional reactivity during relationship conflicts.");
    tips.push("Practice distinguishing between feelings and facts when worried about your relationship.");
  }
  
  if (personalityTraits.extraversion > 70) {
    tips.push("Be mindful that partners may need more alone time than you do.");
  } else if (personalityTraits.extraversion < 30) {
    tips.push("Communicate your need for alone time as self-care rather than rejection of your partner.");
  }
  
  if (personalityTraits.openness < 40) {
    tips.push("Try to remain open to your partner's different perspectives rather than insisting on your way.");
  }
  
  if (personalityTraits.agreeableness < 40) {
    tips.push("Balance honesty with kindness when giving feedback to partners.");
  }
  
  // EQ-based tips
  if (emotionalIntelligence.selfAwareness < 50) {
    tips.push("Take time to reflect on your emotional patterns and triggers in relationships.");
  }
  
  if (emotionalIntelligence.empathy < 50) {
    tips.push("Practice active listening without immediately offering solutions to better understand your partner's feelings.");
  }
  
  if (emotionalIntelligence.selfRegulation < 50) {
    tips.push("When conflicts arise, practice taking a short break to collect your thoughts before responding.");
  }
  
  // General tips everyone can benefit from
  tips.push("Remember that compatibility doesn't mean similarity in all areas, but rather complementary dynamics.");
  tips.push("Learn your partner's love language to show affection in ways they most appreciate.");
  
  // Ensure at least 5 tips
  while (tips.length < 5) {
    tips.push("Focus on building a friendship foundation alongside romantic connection for long-term relationship health.");
  }
  
  return tips;
}

// Import the getScoreForAnswer function from quizData
import { getScoreForAnswer } from './quizData';

function mapAnswerToScore(answerIndex: number, scoreMapping: number[]): number {
  // Map from 0-4 answer index to a scaled score based on provided mapping
  if (answerIndex >= 0 && answerIndex < scoreMapping.length) {
    return scoreMapping[answerIndex];
  }
  return 50; // Default middle value
}

function mapAnswerToRawScore(questionId: number, answerIndex: number): number {
  // Try to get the score from the JSON data first
  const jsonScore = getScoreForAnswer(questionId, answerIndex);
  if (jsonScore > 0) {
    return jsonScore;
  }
  
  // Fallback to the old method if no JSON score available
  return Math.max(0, Math.min(4, answerIndex));
}

function normalizeScore(score: number): number {
  // Ensure score is within 0-100 range
  return Math.max(0, Math.min(100, score));
}

function generateDefaultProfile(): CompatibilityProfile {
  return {
    overallColor: 'yellow',
    description: "Your compatibility profile shows a mix of relationship strengths and growth opportunities. You appear to value connection while also maintaining your independence. Understanding your patterns can help you create more fulfilling relationships.",
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
        "Ability to balance independence and connection",
        "Willingness to communicate and understand others",
        "Self-awareness about your relationship patterns"
      ],
      challenges: [
        "Navigating differences in communication styles",
        "Managing expectations in relationships",
        "Finding partners who complement your approach"
      ],
      growthAreas: [
        "Developing deeper emotional understanding",
        "Building stronger conflict resolution skills",
        "Creating clearer boundaries while staying connected"
      ]
    },
    compatibleTypes: {
      mostCompatible: [
        "Partners who value authentic communication",
        "People who respect your independence while offering support",
        "Individuals with complementary emotional strengths"
      ],
      challengingMatches: [
        "Partners with vastly different core values",
        "People who struggle with healthy communication",
        "Individuals who don't value personal growth"
      ],
      compatibilityRationale: "You're likely to thrive with partners who value authentic communication and emotional growth. The key to your relationship satisfaction is finding someone who respects your independence while also creating space for meaningful connection."
    },
    compatibilityInsights: [
      "Your balanced approach to relationships creates opportunities for both growth and stability.",
      "You value authentic connection but also need space for personal development.",
      "Understanding your emotional patterns will help you choose compatible partners.",
      "Your communication style is a key factor in relationship success.",
      "Finding someone who shares your core values while complementing your traits will be important."
    ],
    relationshipTips: [
      "Focus on open, honest communication from the beginning of relationships.",
      "Pay attention to how potential partners handle conflict and emotional discussions.",
      "Be clear about your needs and boundaries while remaining open to compromise.",
      "Remember that growing together requires both vulnerability and respect.",
      "Look for patterns in your relationship history to identify what truly works for you."
    ]
  };
}