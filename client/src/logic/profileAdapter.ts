/**
 * Profile Adapter
 * 
 * This module bridges the gap between the new modular profile.ts implementation
 * and the existing compatibility profile model used throughout the application.
 * It converts the DetailedReport format to the legacy CompatibilityProfile format
 * to ensure backward compatibility while we transition to the new structure.
 */

import { DetailedReport, buildReport } from './profile';
import type { CompatibilityProfile, PersonalityTraits, EmotionalIntelligence, CoreValues, IntimacyProfile, AttachmentStyle, StrengthsWeaknesses, IdealPartner, RelationshipInsights } from '../utils/calculateCompatibilityProfile';

/**
 * Converts the new DetailedReport to the legacy CompatibilityProfile format
 * used throughout the existing application
 */
export function adaptToLegacyProfile(report: DetailedReport): CompatibilityProfile {
  // Map personality traits
  const personalityTraits: PersonalityTraits = {
    openness: report.bigFive.openness,
    conscientiousness: report.bigFive.conscientiousness,
    extraversion: report.bigFive.extraversion,
    agreeableness: report.bigFive.agreeableness,
    neuroticism: report.bigFive.neuroticism
  };

  // Map emotional intelligence
  const emotionalIntelligence: EmotionalIntelligence = {
    selfAwareness: report.eq.selfAwareness,
    selfRegulation: report.eq.selfRegulation,
    empathy: report.eq.empathy,
    communication: report.eq.socialSkills // map socialSkills to communication
  };

  // Map core values
  const coreValues: CoreValues = {
    tradition: report.values.tradition,
    independence: report.values.independence,
    family: report.values.family,
    ambition: report.values.ambition,
    honesty: report.values.openMindedness // map openMindedness to honesty as closest match
  };

  // Map intimacy profile
  const intimacyProfile: IntimacyProfile = {
    traditionalism: report.intimacy.traditionalism,
    physicalAffection: report.intimacy.physicalAffection,
    communication: report.intimacy.communication,
    importance: report.intimacy.experimentation // map experimentation to importance
  };

  // Map attachment style
  const attachmentStyle: AttachmentStyle = report.attachment;

  // Map strengths and weaknesses
  const strengthsWeaknesses: StrengthsWeaknesses = {
    strengths: report.flags.positives,
    challenges: [...report.flags.cautions, ...report.flags.growth]
  };

  // Map ideal partner
  const idealPartner: IdealPartner = {
    traits: report.matches.idealPartners,
    warningFlags: report.matches.trickyPartners
  };

  // Map relationship insights
  const relationshipInsights: RelationshipInsights = {
    compatibilityPatterns: [report.matches.why, ...report.wowInsights],
    growthAreas: [report.growthPlan, report.datingMission],
    communicationTips: report.tips
  };

  // Create the legacy compatibility profile
  const compatibilityProfile: CompatibilityProfile = {
    personalityTraits,
    emotionalIntelligence,
    attachmentStyle,
    coreValues,
    intimacyProfile,
    
    // Interpreted results
    personalityArchetype: report.primaryArchetype,
    emotionalStrength: "The " + report.primaryArchetype,
    valuesOrientation: report.values.tradition > 70 ? "Traditional Values-Oriented" : 
                      report.values.openMindedness > 70 ? "Progressive Values-Oriented" : 
                      "Values-Balanced Moderate",
    intimacyStyle: report.intimacy.traditionalism > 70 ? "Traditional about Intimacy" :
                  report.intimacy.experimentation > 70 ? "Adventurous about Intimacy" :
                  "Open-minded about Intimacy",
    
    strengthsWeaknesses,
    idealPartner,
    relationshipInsights,
    
    overallColor: report.overall,
    overallSummary: report.snapshot
  };

  return compatibilityProfile;
}

/**
 * Wrapper function that builds a detailed report and then converts it to the legacy format
 * This is the main function to use for backward compatibility
 */
export function calculateLegacyCompatibilityProfile(answers: Record<number, number>): CompatibilityProfile {
  const detailedReport = buildReport(answers);
  return adaptToLegacyProfile(detailedReport);
}