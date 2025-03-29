// Quiz data structure and questions based on psychological frameworks

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  section: 'personality' | 'emotional' | 'values' | 'physical';
  framework?: string;
}

// Helper function to get questions by section
export const getQuestionsBySection = (section: QuizQuestion['section']) => {
  return quizQuestions.filter(q => q.section === section);
};

// Helper function to get a question by ID
export const getQuestionById = (id: number) => {
  return quizQuestions.find(q => q.id === id);
};

// Complete set of 40 questions across 4 sections
export const quizQuestions: QuizQuestion[] = [
  // Section 1: Personality Traits (10 Questions)
  {
    id: 1,
    text: "It's Friday night. What sounds most appealing to you?",
    options: [
      "Hitting a big party or meet-up – you'll likely be found chatting with everyone and energizing the room.",
      "A small get-together with close friends – good conversations with your favorite people.",
      "A cozy night in – Netflix, a book, or gaming, enjoying some solo downtime or one-on-one with a partner.",
      "Going to bed early – crowds and social scenes aren't your thing, you'd rather recharge alone."
    ],
    section: 'personality',
    framework: 'Big Five - Extraversion'
  },
  {
    id: 2,
    text: "When it comes to keeping your space (room/desk) organized:",
    options: [
      "Everything has its place – You're meticulously neat, and clutter seriously bugs you.",
      "You prefer things fairly tidy, though a little mess is okay as long as it's not out of control.",
      "Organized chaos – Your space is messy but functional, and you can usually find what you need.",
      "Utterly chaotic – piles of stuff everywhere, cleaning isn't a priority until it's absolutely necessary."
    ],
    section: 'personality',
    framework: 'Big Five - Conscientiousness'
  },
  {
    id: 3,
    text: "You've planned a weekend trip with your partner. How do you approach it?",
    options: [
      "You create a detailed itinerary days in advance, complete with hotel bookings, routes, and a list of sights to see. Preparation is key!",
      "You list a couple of must-do activities but leave plenty of free time for spontaneous adventures. Balance is good.",
      "You decide to just wing it – no fixed plans, just go with the flow when you arrive. Spontaneity makes it fun.",
      "Trip? Oh, you didn't get around to planning anything… You'll figure it out (or not) once you're there."
    ],
    section: 'personality',
    framework: 'MBTI - Judging vs Perceiving'
  },
  {
    id: 4,
    text: "If someone (friend or partner) criticizes you or points out a mistake you made, you usually:",
    options: [
      "Appreciate the feedback and calmly discuss how to improve – you own up to it and consider it constructively.",
      "Feel a bit defensive initially, but later reflect and maybe apologize if needed – you try to be fair.",
      "Get upset or anxious and might take it quite personally – it really bothers you to be criticized.",
      "Brush it off or counter-criticize them – you don't like being blamed and might feel they're overreacting."
    ],
    section: 'personality',
    framework: 'Big Five - Agreeableness/Neuroticism'
  },
  {
    id: 5,
    text: "Your ideal approach to solving a problem or making a big decision is:",
    options: [
      "Analyze it with cold hard logic – pros/cons lists, maybe spreadsheets. Emotions shouldn't cloud judgment.",
      "Consider the facts but also listen to your gut feelings and values – a mix of head and heart.",
      "Go with what feels right in your heart – if it aligns with your emotions and values, that's the choice.",
      "Honestly, you often defer the decision hoping it resolves itself, or ask someone you trust to decide for you."
    ],
    section: 'personality',
    framework: 'MBTI - Thinking vs Feeling'
  },
  {
    id: 6,
    text: "How do you usually handle meeting new people at a gathering or event?",
    options: [
      "You love it – you naturally introduce yourself, ask questions, and enjoy the whole process of making new friends.",
      "You don't mind it – you'll chat if approached and can be friendly, though you may not seek out everyone.",
      "It's a bit uncomfortable – you stick mostly with people you know and might meet one or two new folks if they initiate.",
      "You actively avoid it – you find a corner or stay on your phone to dodge small talk as much as possible."
    ],
    section: 'personality',
    framework: 'Big Five - Extraversion'
  },
  {
    id: 7,
    text: "When working on a project (or in your job), what style describes you best?",
    options: [
      "Highly organized and planful – you set milestones, meet deadlines early, and feel stressed if things aren't structured.",
      "Fairly reliable – you plan a bit and generally meet deadlines, with an occasional last-minute cram if needed.",
      "More improvisational – you work in bursts of energy and might pull it off at the last minute, but it works for you.",
      "Quite slack or disorganized – deadlines and plans often sneak up on you, and you struggle to stick to a schedule."
    ],
    section: 'personality',
    framework: 'Big Five - Conscientiousness'
  },
  {
    id: 8,
    text: "Imagine your partner or close friend is going through a tough challenge (job loss, exam failure). You are more likely to:",
    options: [
      "Offer practical advice and help them problem-solve logically – you believe in tackling the issue head-on more than hand-holding.",
      "Give a listening ear and emotional support first, and gently suggest solutions later – a mix of empathy and problem-solving.",
      "Immediately try to comfort them – lots of hugs, understanding, and reassurance, focusing on their feelings rather than the fix.",
      "Feel a bit lost on how to help – you might awkwardly try to distract them or just hope they handle it, since deep emotional talk isn't your forte."
    ],
    section: 'personality',
    framework: 'MBTI - Thinking vs Feeling'
  },
  {
    id: 9,
    text: "Your friends would say you:",
    options: [
      "Are creative and adventurous – always keen to try new experiences, foods, ideas, and share them.",
      "Are practical and down-to-earth – you prefer familiar things and reliable routines, not wild experiments.",
      "Are warm and friendly – you get along with most people and avoid unnecessary conflicts.",
      "Are straightforward and blunt – you speak your mind even if it ruffles some feathers occasionally."
    ],
    section: 'personality',
    framework: 'Big Five - Openness/Agreeableness'
  },
  {
    id: 10,
    text: "When stressed about something important (deadline, relationship problem, etc.), you tend to:",
    options: [
      "Keep your cool – logically work through the issue step by step without getting too emotional.",
      "Feel some anxiety but generally manage it well – you might vent a bit but then focus on solutions.",
      "Become quite stressed and need to talk it through – emotional processing helps you cope.",
      "Get easily overwhelmed – anxiety or anger might take over, and you may struggle to think clearly."
    ],
    section: 'personality',
    framework: 'Big Five - Neuroticism'
  },

  // Section 2: Emotional Intelligence & Attachment (10 Questions)
  {
    id: 11,
    text: "In a relationship, when it comes to expressing your feelings:",
    options: [
      "You're an open book – you freely share your emotions, both positive and vulnerable ones, right from the start.",
      "You're moderately expressive – you'll open up about feelings after establishing some trust and connection.",
      "You're somewhat reserved – you might drop hints or show feelings through actions rather than words.",
      "You're very private – keeping your emotions to yourself feels safer, even in close relationships."
    ],
    section: 'emotional',
    framework: 'Emotional Intelligence - Self-expression'
  },
  {
    id: 12,
    text: "If a relationship ends:",
    options: [
      "You process it fully but move forward – sad but accepting that relationships sometimes end, and that's okay.",
      "You feel the pain but gradually heal – you might analyze what went wrong to learn, then cautiously open up again.",
      "You're devastated and may stay upset for months – relationships are precious, and losing one feels crushing.",
      "You try to appear unaffected – quickly jumping back into dating or avoiding thinking about it seems easier."
    ],
    section: 'emotional',
    framework: 'Attachment Theory'
  },
  {
    id: 13,
    text: "When your partner needs space or time apart:",
    options: [
      "You're completely comfortable – everyone needs space sometimes, and it doesn't threaten your bond.",
      "You're mostly okay with it – a little reassurance helps, but you understand the need for independence.",
      "You feel somewhat anxious – you worry what it means and might check in frequently to feel connected.",
      "You feel rejected or frustrated – space feels like abandonment, or like they're drifting away from you."
    ],
    section: 'emotional',
    framework: 'Attachment Theory'
  },
  {
    id: 14,
    text: "During a heated argument with someone you care about, you typically:",
    options: [
      "Stay calm and focused on resolving the issue – emotions don't cloud your ability to communicate clearly.",
      "Get emotional but try to listen – you might need a pause to collect yourself, but you aim to understand them.",
      "Become quite passionate or tearful – your emotions are intense and visible during conflicts.",
      "Shut down, walk away, or get defensive – arguments feel overwhelming or pointless to you."
    ],
    section: 'emotional',
    framework: 'Emotional Intelligence - Conflict resolution'
  },
  {
    id: 15,
    text: "You find out your partner has been texting an attractive coworker frequently (about work). You'd most likely:",
    options: [
      "Feel secure and think nothing of it – you trust their commitment completely and work relationships are normal.",
      "Notice it but generally trust them – maybe ask a casual question about the colleague out of curiosity.",
      "Feel a bit uncomfortable – you'd probably want to discuss boundaries or perhaps meet this person.",
      "Feel very threatened – you'd likely express strong concerns or check their phone when possible."
    ],
    section: 'emotional',
    framework: 'Attachment Theory - Jealousy'
  },
  {
    id: 16,
    text: "When it comes to trusting new romantic partners:",
    options: [
      "You trust easily – you generally believe people deserve trust until they give you reason not to.",
      "You're moderately trusting – basic trust comes fairly easily, but deep trust is earned over time.",
      "You're somewhat cautious – it takes quite a while before you fully trust someone with your heart.",
      "You find it very difficult – past experiences have taught you that trusting others leads to pain."
    ],
    section: 'emotional',
    framework: 'Attachment Theory - Trust'
  },
  {
    id: 17,
    text: "When you notice someone you care about is feeling down or upset:",
    options: [
      "You immediately sense their emotions and know just how to comfort them – it's like you can feel what they feel.",
      "You can usually tell they're upset and offer support – you make an effort to understand their perspective.",
      "You might notice if they're clearly upset, but aren't always sure how to respond appropriately.",
      "You often miss emotional cues – understanding others' feelings doesn't come naturally to you."
    ],
    section: 'emotional',
    framework: 'Emotional Intelligence - Empathy'
  },
  {
    id: 18,
    text: "Your approach to handling your own difficult emotions (like anger or sadness) is usually to:",
    options: [
      "Process them in healthy ways – you acknowledge feelings, understand their source, and express them appropriately.",
      "Manage them reasonably well – sometimes you need time to cool down, but generally handle emotions maturely.",
      "Sometimes struggle – you might dwell on negative feelings longer than you'd like or express them too intensely.",
      "Avoid them or lose control – you either push emotions away or they overwhelm you when they break through."
    ],
    section: 'emotional',
    framework: 'Emotional Intelligence - Self-regulation'
  },
  {
    id: 19,
    text: "In your ideal relationship, you and your partner would be:",
    options: [
      "Close but independent – deeply connected while maintaining individual identities, friends, and interests.",
      "Very close with some independence – sharing most aspects of life while keeping some separate spaces.",
      "Inseparable – doing nearly everything together and being each other's primary (or only) confidant and companion.",
      "More like companions – living parallel lives with some shared activities but lots of independence and privacy."
    ],
    section: 'emotional',
    framework: 'Attachment Theory - Dependency'
  },
  {
    id: 20,
    text: "When someone shares good news or an achievement with you, you usually:",
    options: [
      "Show genuine enthusiasm and joy for them – their success feels almost like your own.",
      "Feel happy for them and express congratulations – you can appreciate their moment.",
      "Acknowledge it positively but briefly – you're glad for them but may not show much excitement.",
      "Compare it to your own situation – their good news might make you feel competitive or inadequate."
    ],
    section: 'emotional',
    framework: 'Emotional Intelligence - Social awareness'
  },

  // Section 3: Values & Beliefs (10 Questions)
  {
    id: 21,
    text: "How important is religion or spirituality in your life and relationships?",
    options: [
      "Very important – my faith guides my daily decisions and I need a partner who shares my religious/spiritual views.",
      "Moderately important – I value my beliefs but could relate to someone with different yet respectful views.",
      "Somewhat important – I have spiritual interests but am very open to different perspectives.",
      "Not important – I'm secular/agnostic/atheist and prefer partners with similar non-religious outlooks."
    ],
    section: 'values',
    framework: 'Values - Spirituality'
  },
  {
    id: 22,
    text: "Regarding family relationships and in-laws, you believe:",
    options: [
      "Family comes first – close family ties are essential, and a partner should blend well with my family.",
      "Family is important – I value good relations with family but maintain some boundaries.",
      "Family at a distance – I care about family but believe couples need their independent space.",
      "Family is complicated – I prefer keeping family relationships somewhat separate from my romantic life."
    ],
    section: 'values',
    framework: 'Values - Family'
  },
  {
    id: 23,
    text: "Your view on gender roles in relationships is:",
    options: [
      "Traditional – I'm comfortable with conventional gender expectations and responsibilities.",
      "Somewhat traditional – I respect some traditional elements while adapting others for modern times.",
      "Mostly progressive – I believe in equality with some flexibility based on individual strengths.",
      "Completely egalitarian – I believe in equal sharing of all responsibilities regardless of gender."
    ],
    section: 'values',
    framework: 'Values - Gender roles'
  },
  {
    id: 24,
    text: "If there was a significant financial decision to make in your relationship:",
    options: [
      "You'd want to discuss every detail together – major decisions should always be made jointly.",
      "You'd consult each other but might delegate based on who's more financially savvy.",
      "You'd prefer separate finances with some joint expenses – maintaining financial independence matters to you.",
      "You'd either take charge completely or let your partner handle it – one person should manage finances."
    ],
    section: 'values',
    framework: 'Values - Financial attitudes'
  },
  {
    id: 25,
    text: "Your attitude toward having children is:",
    options: [
      "Definitely want children – having a family is a top priority in my life plan.",
      "Probably want children – I lean toward having kids but am somewhat flexible.",
      "Uncertain about children – I'm genuinely undecided or could go either way depending on my partner.",
      "Don't want children – I've decided that parenting isn't the path for me."
    ],
    section: 'values',
    framework: 'Values - Family planning'
  },
  {
    id: 26,
    text: "When it comes to lifestyle and social activities, you prefer:",
    options: [
      "An active, outgoing lifestyle – frequently attending social events, trying new restaurants, traveling often.",
      "A balanced social life – regular outings with good friends but also valuing quiet time at home.",
      "A mostly homebound lifestyle – occasional outings but preferring the comfort and peace of home.",
      "A very private lifestyle – minimal socializing and focusing on solitary or one-on-one activities."
    ],
    section: 'values',
    framework: 'Values - Lifestyle preferences'
  },
  {
    id: 27,
    text: "Your approach to health and fitness is:",
    options: [
      "Very dedicated – regular exercise, careful nutrition, and health consciousness are big parts of your life.",
      "Moderately health-conscious – you try to stay active and eat reasonably well most of the time.",
      "Somewhat casual – you care about health but don't stress about it; occasional exercise and moderate diet.",
      "Relaxed or indifferent – you don't focus much on exercise or dietary restrictions."
    ],
    section: 'values',
    framework: 'Values - Health attitudes'
  },
  {
    id: 28,
    text: "Regarding career and ambition, you:",
    options: [
      "Are highly ambitious – career success and achievement are top priorities that require significant focus.",
      "Value career success – you work hard for advancement but try to maintain work-life balance.",
      "Work to live, not live to work – you aim for stability more than advancement, with life outside work mattering more.",
      "Prefer a laid-back approach – ambition isn't your driving force; contentment and peace matter more than achievement."
    ],
    section: 'values',
    framework: 'Values - Career orientation'
  },
  {
    id: 29,
    text: "On politically or socially controversial topics, you generally:",
    options: [
      "Hold strong progressive views – you actively support social change and equality-focused positions.",
      "Hold moderate progressive views – you lean liberal but may be middle-ground on some issues.",
      "Hold moderate conservative views – you value tradition while accepting some social changes.",
      "Hold strong conservative views – you believe traditional values and established norms should be preserved."
    ],
    section: 'values',
    framework: 'Values - Political orientation'
  },
  {
    id: 30,
    text: "In terms of cultural identity and traditions, you:",
    options: [
      "Strongly identify with your culture – traditions and cultural practices are central to your life.",
      "Moderately value your cultural roots – you observe important traditions while adapting to modern contexts.",
      "Lightly connect with cultural traditions – you appreciate your heritage but don't strictly follow traditions.",
      "Don't strongly identify with a cultural background – you're more individualistic or multicultural in outlook."
    ],
    section: 'values',
    framework: 'Values - Cultural identity'
  },

  // Section 4: Physical/Moral Intimacy Beliefs (10 Questions)
  {
    id: 31,
    text: "Your view on physical intimacy before marriage or commitment is:",
    options: [
      "Traditional – physical intimacy should wait until marriage or similar commitment.",
      "Conservative – serious commitment should come before physical intimacy.",
      "Moderate – physical intimacy is natural in a developing relationship once there's mutual care.",
      "Liberal – physical intimacy can be a normal part of dating and exploring compatibility."
    ],
    section: 'physical',
    framework: 'Intimacy - Premarital views'
  },
  {
    id: 32,
    text: "How important is physical affection (hugs, holding hands, kisses) in a relationship to you?",
    options: [
      "Extremely important – frequent physical affection is a primary way you give and receive love.",
      "Very important – regular physical affection is significant for feeling connected.",
      "Moderately important – some physical affection is nice but not constant or essential.",
      "Less important – you're not very physically affectionate and communicate love in other ways."
    ],
    section: 'physical',
    framework: 'Intimacy - Physical touch'
  },
  {
    id: 33,
    text: "Regarding public displays of affection, you are:",
    options: [
      "Very comfortable – holding hands, hugging, and kissing in public feels natural to you.",
      "Mostly comfortable – casual touch and occasional kisses in public are fine.",
      "Somewhat reserved – subtle gestures like hand-holding are okay, but you prefer keeping romance private.",
      "Very private – you believe affection should be kept for private settings, not public view."
    ],
    section: 'physical',
    framework: 'Intimacy - Public affection'
  },
  {
    id: 34,
    text: "Your ideal frequency of physical intimacy in a committed relationship would be:",
    options: [
      "Very frequent – multiple times per week is ideal for feeling connected.",
      "Regular – weekly or so, as part of a balanced relationship.",
      "Occasional – quality matters more than frequency, perhaps a few times monthly.",
      "Infrequent – physical intimacy is less central to your needs in a relationship."
    ],
    section: 'physical',
    framework: 'Intimacy - Frequency'
  },
  {
    id: 35,
    text: "In a relationship, conversations about intimate topics (desires, preferences, etc.):",
    options: [
      "Should be completely open – honest, direct communication about all aspects of intimacy.",
      "Should be reasonably open – discussing most preferences once comfortable with each other.",
      "Should be somewhat selective – sharing basic needs while keeping some things private.",
      "Should be minimal – some things are better left unspoken or discovered naturally."
    ],
    section: 'physical',
    framework: 'Intimacy - Communication'
  },
  {
    id: 36,
    text: "Your thoughts about exploring or experimenting within physical intimacy are:",
    options: [
      "Very open – willing to try new things and openly express desires with a trusted partner.",
      "Moderately open – comfortable with some variety while staying within personal comfort zones.",
      "Somewhat traditional – preferring familiar patterns with occasional small variations.",
      "Conservative – preferring consistent, predictable intimate experiences without much variation."
    ],
    section: 'physical',
    framework: 'Intimacy - Experimentation'
  },
  {
    id: 37,
    text: "If your partner expressed a desire or interest that made you uncomfortable, you would:",
    options: [
      "Openly discuss it – try to understand their perspective while honestly expressing your boundaries.",
      "Consider it cautiously – think about whether you might become comfortable with it over time.",
      "Politely decline – stick to your comfort zone while trying not to judge them.",
      "React negatively – feel judged or be judgmental about desires that don't align with your values."
    ],
    section: 'physical',
    framework: 'Intimacy - Boundary negotiation'
  },
  {
    id: 38,
    text: "When it comes to appearance and attraction in a relationship:",
    options: [
      "Strong physical attraction is essential – chemistry and physical appeal are top priorities.",
      "Physical attraction matters significantly – though character is also very important.",
      "Connection matters more than looks – personality and values outweigh physical appearance.",
      "Appearance is secondary – intellectual and emotional connection far outweigh physical factors."
    ],
    section: 'physical',
    framework: 'Values - Physical attraction'
  },
  {
    id: 39,
    text: "Your attitude toward modesty and conservative dressing is:",
    options: [
      "Highly value modesty – prefer conservative dress for yourself and appreciate it in a partner.",
      "Moderately traditional – favor relatively modest attire in certain contexts, flexible in others.",
      "Generally relaxed – believe people should dress for their own comfort with reasonable awareness of setting.",
      "Very progressive – strongly support freedom of expression through clothing regardless of convention."
    ],
    section: 'physical',
    framework: 'Values - Modesty'
  },
  {
    id: 40,
    text: "Your view on maintaining friendships with ex-partners is:",
    options: [
      "Generally inappropriate – clean breaks are better for current relationships.",
      "Possible but with caution – occasional friendly contact may be okay if a current partner is comfortable.",
      "Usually acceptable – friendships can continue if the romantic relationship ended amicably.",
      "Completely natural – past relationships often transition well into meaningful friendships."
    ],
    section: 'physical',
    framework: 'Values - Boundaries with exes'
  }
];