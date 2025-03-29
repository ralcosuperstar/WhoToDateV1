// Compatibility assessment questions organized by framework

export interface Question {
  id: number;
  text: string;
  options: string[];
  framework: 'big-five' | 'attachment' | 'mbti' | 'eq' | 'values';
  trait?: string;
}

// Big Five (OCEAN) questions
const bigFiveQuestions: Question[] = [
  {
    id: 1,
    text: "When making important life decisions, I prefer to:",
    options: [
      "Trust my gut feeling and intuition",
      "Weigh all options systematically before deciding",
      "Consult family and friends for their opinions",
      "Consider what has worked best in the past"
    ],
    framework: "big-five",
    trait: "openness"
  },
  {
    id: 2,
    text: "In social situations, I typically:",
    options: [
      "Enjoy meeting new people and being the center of attention",
      "Prefer talking with a few close friends",
      "Observe and listen more than speak",
      "Feel energized by group activities but need alone time afterward"
    ],
    framework: "big-five",
    trait: "extraversion"
  },
  {
    id: 3,
    text: "When it comes to planning, I am:",
    options: [
      "Very organized with detailed to-do lists",
      "Generally organized but flexible with plans",
      "Spontaneous and prefer to go with the flow",
      "Minimal planning, preferring to adapt as I go"
    ],
    framework: "big-five",
    trait: "conscientiousness"
  },
  {
    id: 4,
    text: "During disagreements, I tend to:",
    options: [
      "Prioritize harmony and try to find middle ground",
      "Stand my ground firmly on issues important to me",
      "Try to understand the other person's perspective first",
      "Avoid conflict and revisit the issue when emotions settle"
    ],
    framework: "big-five",
    trait: "agreeableness"
  },
  {
    id: 5,
    text: "When I face setbacks, I usually:",
    options: [
      "Remain calm and look for solutions",
      "Feel anxious but try to push through",
      "Take time to process my emotions before acting",
      "Get frustrated but quickly bounce back"
    ],
    framework: "big-five",
    trait: "neuroticism"
  },
  {
    id: 6,
    text: "I consider myself to be:",
    options: [
      "Creative and imaginative",
      "Practical and down-to-earth",
      "Analytical and logical",
      "A balance of creative and practical"
    ],
    framework: "big-five",
    trait: "openness"
  },
  {
    id: 7,
    text: "When attending social events, I typically:",
    options: [
      "Leave feeling energized and excited",
      "Need alone time to recharge afterward",
      "Enjoy myself but get tired after extended socializing",
      "Prefer smaller gatherings to large parties"
    ],
    framework: "big-five",
    trait: "extraversion"
  },
  {
    id: 8,
    text: "When faced with a task, I prefer to:",
    options: [
      "Complete it immediately and check it off my list",
      "Break it down into manageable steps",
      "Wait until I feel inspired or motivated",
      "Prioritize it among other responsibilities"
    ],
    framework: "big-five",
    trait: "conscientiousness"
  },
  {
    id: 9,
    text: "In group discussions, I tend to:",
    options: [
      "Ensure everyone's opinion is heard",
      "Express my views clearly and directly",
      "Find compromise between different viewpoints",
      "Listen first, then offer my perspective"
    ],
    framework: "big-five",
    trait: "agreeableness"
  },
  {
    id: 10,
    text: "When unexpected changes occur, I typically:",
    options: [
      "Adapt quickly and look for opportunities",
      "Feel anxious but develop a new plan",
      "Need time to adjust before moving forward",
      "Analyze how the change affects my goals"
    ],
    framework: "big-five",
    trait: "neuroticism"
  }
];

// Attachment style questions
const attachmentQuestions: Question[] = [
  {
    id: 11,
    text: "In romantic relationships, I:",
    options: [
      "Feel comfortable with both intimacy and independence",
      "Often worry my partner doesn't love me as much as I love them",
      "Value my independence and sometimes feel suffocated by too much closeness",
      "Want closeness but fear getting hurt if I get too attached"
    ],
    framework: "attachment"
  },
  {
    id: 12,
    text: "When my partner needs space, I typically:",
    options: [
      "Understand their need and use the time for my own interests",
      "Feel anxious and worry about what they're thinking",
      "Welcome the space and freedom",
      "Feel conflicted between giving space and seeking reassurance"
    ],
    framework: "attachment"
  },
  {
    id: 13,
    text: "During arguments with a partner, I tend to:",
    options: [
      "Stay engaged and work toward resolution",
      "Feel overwhelmed with emotions and need reassurance",
      "Need time alone to process before discussing further",
      "Struggle between expressing feelings and withdrawing"
    ],
    framework: "attachment"
  },
  {
    id: 14,
    text: "My approach to trust in relationships is:",
    options: [
      "I generally trust others until given reason not to",
      "I'm cautious about trusting completely as I fear disappointment",
      "I find it difficult to fully depend on romantic partners",
      "I want to trust but past experiences make me hesitant"
    ],
    framework: "attachment"
  },
  {
    id: 15,
    text: "When it comes to expressing emotions, I:",
    options: [
      "Am comfortable sharing my feelings openly",
      "Sometimes worry I share too much too soon",
      "Prefer to keep many feelings private",
      "Feel conflicted about opening up emotionally"
    ],
    framework: "attachment"
  }
];

// MBTI-inspired questions
const mbtiQuestions: Question[] = [
  {
    id: 16,
    text: "When learning something new, I prefer:",
    options: [
      "Concrete examples and practical applications",
      "Understanding underlying theories and concepts",
      "A combination of theory and practice",
      "Exploring possibilities and making connections"
    ],
    framework: "mbti"
  },
  {
    id: 17,
    text: "When making decisions, I typically:",
    options: [
      "Consider how choices affect people and relationships",
      "Analyze objectively based on logic and facts",
      "Balance logical analysis with values and feelings",
      "Make decisions quickly based on what feels right"
    ],
    framework: "mbti"
  },
  {
    id: 18,
    text: "My typical approach to planning is:",
    options: [
      "Creating detailed plans and following through",
      "Making flexible plans and adapting as needed",
      "Having general goals but staying open to opportunities",
      "Preferring spontaneity over rigid planning"
    ],
    framework: "mbti"
  },
  {
    id: 19,
    text: "In conversations, I tend to:",
    options: [
      "Think carefully before speaking",
      "Think out loud and process verbally",
      "Listen more than I speak",
      "Speak energetically and animatedly"
    ],
    framework: "mbti"
  },
  {
    id: 20,
    text: "I'm most energized when:",
    options: [
      "Spending time with people in social settings",
      "Having deep one-on-one conversations",
      "Engaging in solitary activities I enjoy",
      "Alternating between social time and alone time"
    ],
    framework: "mbti"
  }
];

// Emotional Intelligence (EQ) questions
const eqQuestions: Question[] = [
  {
    id: 21,
    text: "When I feel upset or angry, I typically:",
    options: [
      "Can identify exactly what triggered these feelings",
      "Need time to understand why I'm feeling this way",
      "Express my emotions immediately",
      "Try to suppress or ignore these feelings"
    ],
    framework: "eq"
  },
  {
    id: 22,
    text: "When someone shares a problem with me, I usually:",
    options: [
      "Listen fully before offering advice or solutions",
      "Immediately try to suggest solutions",
      "Share similar experiences from my own life",
      "Ask questions to better understand their situation"
    ],
    framework: "eq"
  },
  {
    id: 23,
    text: "When facing a stressful situation, I:",
    options: [
      "Can recognize and manage my emotions effectively",
      "Get overwhelmed but eventually regain control",
      "Use specific techniques to calm myself",
      "Sometimes let stress affect my behavior toward others"
    ],
    framework: "eq"
  },
  {
    id: 24,
    text: "In group settings, I'm typically:",
    options: [
      "Aware of others' feelings and group dynamics",
      "Focused on the task or discussion at hand",
      "Attentive to how I'm being perceived",
      "Concerned with ensuring everyone feels included"
    ],
    framework: "eq"
  },
  {
    id: 25,
    text: "When receiving criticism, I usually:",
    options: [
      "Consider it objectively for personal growth",
      "Feel initially hurt but reflect on it later",
      "Become defensive or dismiss it",
      "Appreciate the feedback but may struggle to apply it"
    ],
    framework: "eq"
  }
];

// Cultural and value-based questions (tailored to Indian context)
const valueQuestions: Question[] = [
  {
    id: 26,
    text: "Regarding family involvement in relationships, I believe:",
    options: [
      "Family approval and involvement are essential",
      "Family opinions matter but my choice is primary",
      "Relationships should be independent of family influence",
      "Balance between family involvement and personal choice is ideal"
    ],
    framework: "values"
  },
  {
    id: 27,
    text: "My view on traditional gender roles in relationships is:",
    options: [
      "Traditional roles provide structure and clarity",
      "Some traditional aspects are valuable, others outdated",
      "Roles should be based on individual strengths not gender",
      "Complete equality and flexibility in all roles"
    ],
    framework: "values"
  },
  {
    id: 28,
    text: "Regarding religious practices in relationships, I prefer:",
    options: [
      "Sharing the same religious beliefs and practices",
      "Respecting each other's different religious practices",
      "Being spiritual rather than religious",
      "Religion not playing a significant role"
    ],
    framework: "values"
  },
  {
    id: 29,
    text: "My attitude toward career and work-life balance is:",
    options: [
      "Career is a top priority for personal fulfillment",
      "Balance between career and personal life is essential",
      "Family and relationships come before career ambitions",
      "Flexible approach depending on life circumstances"
    ],
    framework: "values"
  },
  {
    id: 30,
    text: "Regarding financial management in relationships, I prefer:",
    options: [
      "Joint decision-making for all financial matters",
      "Maintaining some financial independence while sharing major expenses",
      "Separate finances with clear agreements about shared costs",
      "One partner primarily managing finances with input from the other"
    ],
    framework: "values"
  }
];

// Combine all questions
export const questions: Question[] = [
  ...bigFiveQuestions,
  ...attachmentQuestions,
  ...mbtiQuestions,
  ...eqQuestions,
  ...valueQuestions
];

// Get questions by framework
export const getQuestionsByFramework = (framework: Question['framework']) => {
  return questions.filter(q => q.framework === framework);
};

// Export default as questions array
export default questions;
