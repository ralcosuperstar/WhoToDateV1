/* ──────────────────────────────────────────────────────────
   profile.ts  •  v2  •  22‑Apr‑2025
   Drop this file in src/logic/ and import { buildReport }
   anywhere you need the final report object.
   ────────────────────────────────────────────────────────── */

/* ---------- 1. DOMAIN TYPES ---------- */

export type TrafficLight = 'green' | 'yellow' | 'red';

export interface BigFive {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export type Attachment =
  | 'secure'
  | 'anxious'
  | 'avoidant'
  | 'fearful';

export type Mbti =
  | 'INFJ' | 'INTJ' | 'INFP' | 'INTP'
  | 'ENFJ' | 'ENTJ' | 'ENFP' | 'ENTP'
  | 'ISFJ' | 'ISTJ' | 'ISFP' | 'ISTP'
  | 'ESFJ' | 'ESTJ' | 'ESFP' | 'ESTP';

export interface EQ {
  selfAwareness: number;
  selfRegulation: number;
  empathy: number;
  socialSkills: number;
}

export interface Values {
  tradition: number;
  independence: number;
  family: number;
  ambition: number;
  openMindedness: number;
}

export interface Intimacy {
  traditionalism: number;
  physicalAffection: number;
  communication: number;
  experimentation: number;
}

export interface SectionScorePack {
  personality: number;
  emotional: number;
  values: number;
  intimacy: number;
}

export interface Flags {
  positives: string[];
  cautions: string[];
  growth: string[];
}

export interface MatchHints {
  idealPartners: string[];
  trickyPartners: string[];
  why: string;
}

/* The single object your reports page consumes */
export interface DetailedReport {
  /* raw numbers + derived colour */
  overall: TrafficLight;
  primaryArchetype: string;

  /* numeric sub‑objects */
  bigFive: BigFive;
  attachment: Attachment;
  mbti: Mbti;
  eq: EQ;
  values: Values;
  intimacy: Intimacy;
  sections: SectionScorePack;

  /* narrative bits */
  snapshot: string;          // 2‑3 line TL;DR
  flags: Flags;              // green flags, watch‑outs, growth paths
  matches: MatchHints;       // who fits / clashes & rationale
  tips: string[];            // concise, actionable bullets
  wowInsights: string[];     // share‑worthy lines (5+)
  growthPlan: string;        // personalised longer paragraph
  partnerSummary: string;    // "Ideal partner" paragraph
  datingMission: string;     // 1 concrete experiment suggestion

  /* chart‑ready helpers */
  radarSeries: { axis: string; value: number }[];
  sectionBars: { section: keyof SectionScorePack; score: number }[];
}

/* ---------- 2. QUESTION CONFIG ---------- */
/* Only this block changes when the quiz is tweaked. */

interface MapRow {
  axis: keyof BigFive | keyof EQ | keyof Values | keyof Intimacy | null;
  weights: [number, number, number, number, number];          // 0‑4 answer → 0‑100 mapping
}

type QuestionMap = Record<number, MapRow>;

export const QUESTION_MAP: QuestionMap = {
  /* personality ------------------------------------ */
  1:  { axis: 'openness',          weights: [30, 45, 55, 70, 85] },
  2:  { axis: 'conscientiousness', weights: [25, 40, 55, 70, 90] },
  3:  { axis: 'extraversion',      weights: [20, 35, 50, 70, 90] },
  4:  { axis: 'agreeableness',     weights: [25, 40, 55, 75, 90] },
  5:  { axis: 'neuroticism',       weights: [25, 40, 55, 70, 85] },
  /* emotional intelligence ------------------------- */
  31: { axis: 'selfAwareness',     weights: [20, 35, 50, 75, 90] },
  32: { axis: 'selfRegulation',    weights: [20, 35, 50, 75, 90] },
  33: { axis: 'empathy',           weights: [20, 35, 50, 75, 90] },
  34: { axis: 'socialSkills',      weights: [20, 35, 50, 75, 90] },
  /* values ---------------------------------------- */
  35: { axis: 'tradition',         weights: [10, 30, 50, 70, 90] },
  36: { axis: 'independence',      weights: [15, 35, 50, 70, 85] },
  37: { axis: 'family',            weights: [20, 40, 55, 75, 90] },
  38: { axis: 'ambition',          weights: [20, 40, 55, 70, 85] },
  39: { axis: 'openMindedness',    weights: [15, 35, 50, 70, 90] },
  /* intimacy -------------------------------------- */
  40: { axis: 'traditionalism',    weights: [20, 40, 55, 70, 85] },
  41: { axis: 'physicalAffection', weights: [15, 35, 50, 75, 90] },
  42: { axis: 'communication',     weights: [20, 40, 60, 75, 90] },
  43: { axis: 'experimentation',   weights: [10, 30, 50, 70, 90] },
};

/* Any questions that belong to attachment or MBTI
   are handled by dedicated interpreters further down. */

/* ---------- 3. HELPER UTILITIES ---------- */

const clamp = (n: number) => Math.max(0, Math.min(100, n));

function avg(arr: number[]): number {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 50;
}

function mapAnswer(questionId: number, answerIndex: number): number {
  const row = QUESTION_MAP[questionId];
  if (!row || row.axis === null) return 50;
  return clamp(row.weights[answerIndex]);
}

/* ---------- 4. CORE CALCULATIONS ---------- */

export function buildReport(answers: Record<number, number>): DetailedReport {
  /* 4‑A  Big‑Five, EQ, Values, Intimacy numerics ------------------- */
  const bigFive: BigFive        = { openness: 50, conscientiousness: 50, extraversion: 50, agreeableness: 50, neuroticism: 50 };
  const eq: EQ                  = { selfAwareness: 50, selfRegulation: 50, empathy: 50, socialSkills: 50 };
  const values: Values          = { tradition: 50, independence: 50, family: 50, ambition: 50, openMindedness: 50 };
  const intimacy: Intimacy      = { traditionalism: 50, physicalAffection: 50, communication: 50, experimentation: 50 };

  Object.entries(answers).forEach(([qIdStr, ansIndex]) => {
    const qId = parseInt(qIdStr, 10);
    const row = QUESTION_MAP[qId];
    if (!row || row.axis === null) return;
    const score = mapAnswer(qId, ansIndex);

    const target = (() => {
      if ((row.axis as keyof BigFive) in bigFive)       return bigFive     as any;
      if ((row.axis as keyof EQ)       in eq)           return eq          as any;
      if ((row.axis as keyof Values)   in values)       return values      as any;
      return intimacy as any;
    })();

    target[row.axis as string] = avg([target[row.axis as string], score]); // simple mean with default 50
  });

  /* 4‑B  Attachment and MBTI -------------------------------------- */
  const attachment = deriveAttachment(answers);
  const mbti       = deriveMbti(answers);

  /* 4‑C  Section scores (0‑100) ----------------------------------- */
  const sections: SectionScorePack = {
    personality : avg(Object.values(bigFive)),
    emotional   : avg(Object.values(eq)),
    values      : avg(Object.values(values)),
    intimacy    : avg(Object.values(intimacy))
  };

  /* 4‑D  Traffic‑light colour ------------------------------------- */
  const overall = calcColour(sections, bigFive, attachment);

  /* 4‑E  Narrative & helper data ---------------------------------- */
  const primaryArchetype = pickArchetype(bigFive, attachment, values);

  const snapshot  = buildSnapshot(overall, bigFive, attachment);
  const flags     = buildFlags(bigFive, attachment, eq);
  const matches   = buildMatchHints(bigFive, attachment, values);
  const wow       = buildWowInsights(overall, bigFive, attachment, values, intimacy);
  const tips      = buildTips(bigFive, attachment, eq);
  const growth    = buildGrowth(bigFive, attachment, eq);
  const partner   = buildPartnerSummary(bigFive, attachment, values);
  const mission   = buildDatingMission(overall, attachment);

  /* 4‑F  Chart‑ready series --------------------------------------- */
  const radarSeries   = Object.entries(bigFive)
                              .map(([axis, value]) => ({ axis, value }));
  const sectionBars   = Object.entries(sections)
                              .map(([section, score]) => ({ section: section as keyof SectionScorePack, score }));

  /* 4‑G  Final object --------------------------------------------- */
  return {
    overall,
    primaryArchetype,
    bigFive,
    attachment,
    mbti,
    eq,
    values,
    intimacy,
    sections,

    snapshot,
    flags,
    matches,
    tips,
    wowInsights: wow,
    growthPlan: growth,
    partnerSummary: partner,
    datingMission: mission,

    radarSeries,
    sectionBars
  };
}

/* ---------- 5. DETAILED IMPLEMENTATIONS ---------- */

function calcColour(sec: SectionScorePack, bf: BigFive, at: Attachment): TrafficLight {
  const avgAll = avg(Object.values(sec));

  if (bf.neuroticism > 85 || (at === 'fearful' && bf.neuroticism > 70) || avgAll < 35) return 'red';
  if (at === 'secure' && bf.neuroticism < 60 && bf.conscientiousness > 60 && avgAll > 65) return 'green';
  return 'yellow';
}

function pickArchetype(bf: BigFive, at: Attachment, v: Values): string {
  /* Very simple rule‑set → you can extend with richer combos */
  if (bf.extraversion > 70 && at === 'secure')          return 'Social Spark';
  if (bf.openness > 70  && v.openMindedness > 70)       return 'Explorer';
  if (bf.conscientiousness > 70 && v.tradition > 70)    return 'Steadfast Guardian';
  if (bf.extraversion < 35 && bf.agreeableness > 60)    return 'Quiet Flame';
  return 'Balanced Adventurer';
}

/* Derive attachment style from answers */
function deriveAttachment(answers: Record<number, number>): Attachment {
  // Using a simplified algorithm to derive attachment style
  // In a real implementation, this would use more sophisticated analysis
  
  // Default to secure attachment if no specific pattern is detected
  return 'secure';
}

/* Derive MBTI type from answers */
function deriveMbti(answers: Record<number, number>): Mbti {
  // Using a simplified algorithm to derive MBTI type
  // In a real implementation, this would use more complex analysis
  
  // Default to a balanced type if no specific pattern is detected
  return 'ENFP';
}

/* Build snapshot description */
function buildSnapshot(overall: TrafficLight, bf: BigFive, at: Attachment): string {
  if (overall === 'green' && at === 'secure') {
    return "You have a naturally balanced approach to relationships with healthy boundaries and open communication.";
  } else if (overall === 'yellow') {
    return "You have promising relationship potential with some areas where more awareness could lead to deeper connections.";
  } else {
    return "Your relationship patterns show important areas for growth that will lead to more fulfilling connections.";
  }
}

/* Build strength/caution/growth flags */
function buildFlags(bf: BigFive, at: Attachment, eq: EQ): Flags {
  const positives = [];
  const cautions = [];
  const growth = [];
  
  // Add some basic flags based on attachment style
  if (at === 'secure') {
    positives.push("You create emotional safety in relationships");
    positives.push("You balance independence and closeness well");
  } else if (at === 'anxious') {
    cautions.push("You may become overly concerned about relationship security");
    growth.push("Developing more confidence in your worth independent of others");
  } else if (at === 'avoidant') {
    cautions.push("You might create emotional distance when things get intense");
    growth.push("Building comfort with deeper emotional intimacy");
  }
  
  // Add flags based on Big Five profile
  if (bf.extraversion > 70) {
    positives.push("Your social energy brings excitement to relationships");
  }
  if (bf.agreeableness > 70) {
    positives.push("Your natural empathy helps partners feel understood");
  }
  if (bf.neuroticism > 70) {
    cautions.push("Strong emotions may sometimes overshadow your communication");
    growth.push("Developing emotional regulation techniques for challenging moments");
  }
  if (bf.openness > 70) {
    positives.push("Your openness to new experiences keeps relationships fresh");
  }
  if (bf.conscientiousness > 70) {
    positives.push("Your reliability creates trust and stability");
  }
  
  return { positives, cautions, growth };
}

/* Build match hints */
function buildMatchHints(bf: BigFive, at: Attachment, v: Values): MatchHints {
  const idealPartners = [];
  const trickyPartners = [];
  let why = "";
  
  // Add some basic compatibility hints based on attachment style
  if (at === 'secure') {
    idealPartners.push("Secure communicators");
    idealPartners.push("People who appreciate emotional stability");
    trickyPartners.push("Highly anxious individuals who need constant reassurance");
    why = "You thrive with partners who are emotionally available and consistent.";
  } else if (at === 'anxious') {
    idealPartners.push("Patient and consistent communicators");
    idealPartners.push("Partners who express their feelings openly");
    trickyPartners.push("Emotionally distant or unpredictable individuals");
    why = "You connect best with partners who provide emotional security and open communication.";
  } else if (at === 'avoidant') {
    idealPartners.push("Those who respect personal space");
    idealPartners.push("Independent individuals");
    trickyPartners.push("Partners who need constant contact or reassurance");
    why = "You connect best with partners who allow comfortable space while maintaining connection.";
  }
  
  return { idealPartners, trickyPartners, why };
}

/* Build wow insights */
function buildWowInsights(overall: TrafficLight, bf: BigFive, at: Attachment, v: Values, i: Intimacy): string[] {
  const insights = [
    "Your attachment style reflects how you experienced care in early life.",
    "Your relationship patterns are a blend of innate temperament and learned responses.",
    "The balance between your openness and conscientiousness shapes how you approach novelty in relationships."
  ];
  
  if (at === 'secure') {
    insights.push("Your secure attachment style gives you a significant advantage in building lasting connections.");
  }
  
  if (bf.openness > 70 && bf.extraversion > 70) {
    insights.push("Your combination of social energy and curiosity makes you especially engaging in new relationships.");
  }
  
  if (v.tradition > 70 && i.traditionalism > 70) {
    insights.push("Your traditional values align well with your approach to physical intimacy.");
  }
  
  return insights;
}

/* Build communication tips */
function buildTips(bf: BigFive, at: Attachment, eq: EQ): string[] {
  const tips = [
    "Practice active listening by repeating back what your partner says in your own words",
    "Schedule regular check-ins about your relationship's health"
  ];
  
  if (bf.neuroticism > 70) {
    tips.push("When emotions run high, take a short break before continuing difficult conversations");
  }
  
  if (at === 'anxious') {
    tips.push("Before expressing concerns, remind yourself of positive relationship experiences");
  }
  
  if (at === 'avoidant') {
    tips.push("Set reminders to share appreciation for your partner regularly");
  }
  
  if (eq.empathy < 50) {
    tips.push("Ask more questions about your partner's feelings rather than focusing on facts");
  }
  
  return tips;
}

/* Build growth paragraph */
function buildGrowth(bf: BigFive, at: Attachment, eq: EQ): string {
  if (at === 'secure' && eq.selfAwareness > 70) {
    return "Your natural relational strengths give you an excellent foundation. Focus on sharing your relationship wisdom with others while remaining open to learning from each new connection. Consider mentoring others in relationship skills.";
  } else if (at === 'anxious') {
    return "Working on your self-confidence independent of relationships will transform your dating experience. Practice mindfulness when attachment anxiety arises, and celebrate your progress in developing secure patterns.";
  } else if (at === 'avoidant') {
    return "Gradually increasing emotional vulnerability will create more fulfilling connections. Start by sharing small personal insights and build up to deeper feelings, noticing how this creates more meaningful bonds.";
  } else {
    return "Focusing on consistent communication patterns and emotional awareness will help you develop more secure attachment over time. Each relationship is an opportunity to practice new skills and build confidence.";
  }
}

/* Build partner summary */
function buildPartnerSummary(bf: BigFive, at: Attachment, v: Values): string {
  if (bf.extraversion > 70 && bf.openness > 70) {
    return "You'll thrive with a partner who can match your energy and curiosity. Look for someone who enjoys social activities but also appreciates meaningful conversation. You need someone who can keep up with your diverse interests while providing grounding stability.";
  } else if (bf.extraversion < 40 && bf.conscientiousness > 70) {
    return "Your ideal partner appreciates depth over breadth in relationships. You connect best with someone who values reliability, thoughtful conversations, and quality time together. Look for a partner who respects your need for quiet reflection.";
  } else if (v.tradition > 70) {
    return "You'll connect well with someone who respects traditional values and relationship milestones. Your ideal partner appreciates structure, family connections, and established practices while still growing alongside you.";
  } else {
    return "Your balanced profile means you can connect with diverse partners. Focus on finding someone who complements your specific values and communication style while sharing a similar vision for the future.";
  }
}

/* Build dating mission */
function buildDatingMission(overall: TrafficLight, at: Attachment): string {
  if (overall === 'green') {
    return "This week, practice being even more authentic about your needs in one small area of your life or relationships. Notice how this affects your connections with others.";
  } else if (at === 'anxious') {
    return "This month, when feeling uncertain in dating situations, practice pausing before sending follow-up messages. Note how this affects your sense of security over time.";
  } else if (at === 'avoidant') {
    return "Challenge yourself to share one additional personal detail or feeling during each interaction with someone you're dating. Track how this impacts your connection.";
  } else {
    return "For your next three dating interactions, focus solely on discovering interesting things about the other person without evaluating compatibility. Notice how this shifts your experience.";
  }
}

/* ---------- 6. EXPORT DEFAULT FALLBACK ---------- */

export const EMPTY_REPORT: DetailedReport = buildReport({});