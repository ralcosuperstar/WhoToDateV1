import { Link } from "wouter";
import { Brain, Heart, Sparkles, BookOpen, Target, ArrowRight, Users, Lightbulb, BarChart, Shield, ChevronRight, Check, BrainCircuit, Fingerprint, Crown, Gauge, X } from "lucide-react";
import { Helmet } from "react-helmet";
import { useState } from "react";

// Simple modal for showing more information
const InfoModal = ({ isOpen, onClose, content }: { isOpen: boolean; onClose: () => void; content: string }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-xl p-5 max-w-sm w-full transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900">More Information</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="text-sm text-gray-600">{content}</div>
        <div className="mt-4 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white rounded-md"
            style={{ backgroundColor: '#e83a8e' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Framework Tabs component with interactive selection
const FrameworkTabs = () => {
  const [activeTab, setActiveTab] = useState("big-five");
  const [modalInfo, setModalInfo] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  
  const frameworks = [
    {
      id: "big-five",
      title: "Big Five Personality Traits",
      icon: <Brain className="h-5 w-5" />,
      color: "text-pink-500",
      bgColor: "bg-pink-100",
      hoverColor: "hover:bg-pink-50"
    },
    {
      id: "mbti",
      title: "Myers-Briggs Type",
      icon: <Fingerprint className="h-5 w-5" />,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      hoverColor: "hover:bg-purple-50"
    },
    {
      id: "attachment",
      title: "Attachment Theory",
      icon: <Heart className="h-5 w-5" />,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-50"
    },
    {
      id: "eq",
      title: "Emotional Intelligence",
      icon: <Sparkles className="h-5 w-5" />,
      color: "text-amber-500",
      bgColor: "bg-amber-100",
      hoverColor: "hover:bg-amber-50"
    },
    {
      id: "values",
      title: "Core Values",
      icon: <Crown className="h-5 w-5" />,
      color: "text-green-500",
      bgColor: "bg-green-100",
      hoverColor: "hover:bg-green-50"
    }
  ];
  
  const frameworkContent = {
    "big-five": {
      title: "Big Five Personality Traits (O.C.E.A.N)",
      description: "Modern psychology's gold standard for personality is the Big Five traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. Each person falls somewhere on the spectrum of each trait.",
      impact: "People who score high in Agreeableness and Conscientiousness tend to have more satisfying and stable relationships – they're cooperative, responsible, and easier to get along with. High Neuroticism can lead to more conflict and insecurity.",
      stats: [
        { value: "90%", label: "of psychologists use the Big Five model" },
        { value: "50+", label: "years of research validation" },
        { value: "5", label: "core personality dimensions" }
      ],
      traits: [
        { name: "Openness", description: "Adventure-seeking, artistic interest, intellectual curiosity", score: 80 },
        { name: "Conscientiousness", description: "Organization, responsibility, self-discipline", score: 65 },
        { name: "Extraversion", description: "Sociability, assertiveness, energy level", score: 45 },
        { name: "Agreeableness", description: "Compassion, respectfulness, trust of others", score: 75 },
        { name: "Neuroticism", description: "Anxiety, emotional volatility, depression", score: 30 }
      ]
    },
    "mbti": {
      title: "Myers-Briggs Type Indicator (MBTI)",
      description: "The MBTI sorts you into 16 personality types based on four preference pairs (Introvert/Extravert, Intuitive/Sensing, Feeling/Thinking, Perceiving/Judging).",
      impact: "Each type has tendencies in relationships – ENFJs are known to be passionate and caring partners, ISTJs are loyal and value stability, INFPs are dreamy romantics, and so on.",
      stats: [
        { value: "88%", label: "of Fortune 100 companies use MBTI" },
        { value: "16", label: "distinct personality types" },
        { value: "70+", label: "years of application" }
      ],
      traits: [
        { name: "E vs I", description: "How you direct and receive energy (External vs Internal)", moreInfo: "Extraverts (E) are energized by social interaction, while Introverts (I) recharge through solitude" },
        { name: "S vs N", description: "How you take in information (Sensing vs iNtuition)", moreInfo: "Sensors (S) focus on tangible facts, while Intuitives (N) look for patterns and possibilities" }, 
        { name: "T vs F", description: "How you make decisions (Thinking vs Feeling)", moreInfo: "Thinkers (T) prioritize logic and consistency, while Feelers (F) emphasize values and harmony" },
        { name: "J vs P", description: "How you approach the outer world (Judging vs Perceiving)", moreInfo: "Judgers (J) prefer structure and closure, while Perceivers (P) value flexibility and openness" }
      ]
    },
    "attachment": {
      title: "Attachment Theory",
      description: "Attachment theory explains how your early relationships with caregivers shape your adult relationships and impacts how you form emotional bonds with partners.",
      impact: "Secure people (about 55% of the population) are comfortable with both intimacy and independence. Anxious people love deeply but fear being abandoned. Avoidant people value independence so much that they can pull away when relationships get too close.",
      stats: [
        { value: "55%", label: "of people have secure attachment" },
        { value: "20%", label: "have anxious attachment" },
        { value: "25%", label: "have avoidant attachment" }
      ],
      traits: [
        { name: "Secure", description: "Comfortable with intimacy and independence", moreInfo: "Forms stable, trusting relationships with good communication" },
        { name: "Anxious", description: "Seeks high closeness, fears abandonment", moreInfo: "May become overly dependent and worry about the relationship" },
        { name: "Avoidant", description: "Prioritizes independence, uncomfortable with intimacy", moreInfo: "Tends to create emotional distance and may struggle with commitment" },
        { name: "Fearful", description: "Both desires and fears closeness", moreInfo: "Often experiences conflicting emotions about relationships" }
      ]
    },
    "eq": {
      title: "Emotional Intelligence (EQ)",
      description: "Emotional Intelligence is how good you are at understanding and managing emotions – both yours and others'. In relationships, this translates to empathy, good communication, and handling conflicts calmly.",
      impact: "Research shows EQ is one of the major predictors of happiness in relationships. One study found that emotional intelligence differences could account for about 40% of the variation in marital satisfaction.",
      stats: [
        { value: "40%", label: "of relationship satisfaction linked to EQ" },
        { value: "4", label: "core components of emotional intelligence" },
        { value: "90%", label: "of top performers have high EQ" }
      ],
      traits: [
        { name: "Self-Awareness", description: "Understanding your own emotions", moreInfo: "Recognizing how your feelings affect your behavior and relationships" },
        { name: "Self-Regulation", description: "Managing emotional reactions", moreInfo: "Controlling impulsive feelings and behaviors, especially during conflicts" },
        { name: "Empathy", description: "Understanding others' emotions", moreInfo: "Sensing what others are feeling and seeing situations from their perspective" },
        { name: "Social Skills", description: "Managing relationships effectively", moreInfo: "Communicating clearly and resolving disagreements constructively" }
      ]
    },
    "values": {
      title: "Core Values & Moral Foundations",
      description: "Beyond personality and emotional style, what often makes or breaks a relationship are deep values. Do you and your partner believe in the same fundamental things?",
      impact: "When you agree on fundamental values, there's less conflict on big life choices. Values affect everything from how you view commitment and gender roles to how you want to spend your time and money.",
      stats: [
        { value: "85%", label: "of breakups involve value conflicts" },
        { value: "5+", label: "core value dimensions" },
        { value: "3x", label: "higher satisfaction with aligned values" }
      ],
      traits: [
        { name: "Care vs. Harm", description: "Empathy, kindness, and protection from suffering", moreInfo: "How much you prioritize the wellbeing of others" },
        { name: "Fairness vs. Cheating", description: "Justice, rights, and equality", moreInfo: "Your concern for fair treatment and balance in relationships" },
        { name: "Loyalty vs. Betrayal", description: "Commitment to family/group", moreInfo: "How you view obligations to your in-group vs. individuals" },
        { name: "Authority vs. Subversion", description: "Respect for tradition and hierarchy", moreInfo: "How you view leadership roles and traditional structures" },
        { name: "Sanctity vs. Degradation", description: "Purity, dignity, and spiritual concerns", moreInfo: "Your boundaries around what's considered inappropriate" }
      ]
    }
  };
  
  const content = frameworkContent[activeTab as keyof typeof frameworkContent];
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Modal for showing additional information */}
      <InfoModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        content={modalInfo} 
      />
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar tabs */}
        <div className="md:w-1/4 bg-gray-50 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200">
          <h3 className="font-bold text-gray-700 mb-4 hidden md:block">Psychological Frameworks</h3>
          
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-2 md:pb-0">
            {frameworks.map(framework => (
              <button
                key={framework.id}
                className={`flex items-center p-3 rounded-lg transition-all ${
                  activeTab === framework.id 
                    ? `${framework.bgColor} border border-${framework.color.split('-')[1]}-200` 
                    : `bg-white border border-gray-200 ${framework.hoverColor}`
                } min-w-max md:min-w-0`}
                onClick={() => setActiveTab(framework.id)}
              >
                <div className={`mr-3 ${framework.color}`}>{framework.icon}</div>
                <span className={`${activeTab === framework.id ? 'font-medium' : ''} text-sm md:text-base text-gray-800`}>
                  {framework.title}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Content area */}
        <div className="md:w-3/4 p-4 md:p-6">
          <div className={`inline-block mb-4 py-1 px-3 rounded-full ${frameworks.find(f => f.id === activeTab)?.bgColor}`}>
            <span className={`text-xs font-medium flex items-center ${frameworks.find(f => f.id === activeTab)?.color}`}>
              {frameworks.find(f => f.id === activeTab)?.icon}
              <span className="ml-2">Framework {frameworks.findIndex(f => f.id === activeTab) + 1} of 5</span>
            </span>
          </div>
          
          <h3 className="font-bold text-xl text-gray-800 mb-3">{content.title}</h3>
          <p className="text-gray-600 mb-6">{content.description}</p>
          
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Impact on Relationships:</h4>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">{content.impact}</p>
          </div>
          
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {content.stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                <div className={`text-xl font-bold ${frameworks.find(f => f.id === activeTab)?.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Traits section */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Key Components:</h4>
            <div className="space-y-3">
              {content.traits.map((trait, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-all">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full ${frameworks.find(f => f.id === activeTab)?.bgColor} flex items-center justify-center mr-3`}>
                        {activeTab === "big-five" ? (
                          <div className={`text-lg font-semibold ${frameworks.find(f => f.id === activeTab)?.color}`}>
                            {trait.name.charAt(0)}
                          </div>
                        ) : (
                          <span className={`${frameworks.find(f => f.id === activeTab)?.color}`}>
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800">{trait.name}</h5>
                        <p className="text-sm text-gray-600">{trait.description}</p>
                      </div>
                    </div>
                    {'moreInfo' in trait && (
                      <button 
                        onClick={() => {
                          setModalInfo(trait.moreInfo);
                          setModalOpen(true);
                        }} 
                        className="text-gray-400 hover:text-gray-700 focus:outline-none"
                        aria-label="More information"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cultural adaptation section component
const CulturalAdaptation = () => {
  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100 shadow-md relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full -mt-16 -mr-16"></div>
      
      <div className="relative z-10">
        <div className="inline-block mb-4 py-1 px-3 bg-white rounded-full shadow-sm">
          <span className="text-gray-700 font-medium text-sm flex items-center">
            <span className="mr-2">🇮🇳</span> India-Specific Insights
          </span>
        </div>
        
        <h3 className="font-bold text-xl text-gray-800 mb-4">
          ⭐ Culturally Adapted for Indian Relationships
        </h3>
        
        <p className="text-gray-600 mb-6">
          Relationships aren't one-size-fits-all, and culture plays a big role in what compatibility means. WhoToDate is proudly tailored for Indian singles and the Desi dating scene.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-pink-100 shadow-sm">
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 mr-3">
                <Users className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-gray-800">Family Dynamics</h4>
            </div>
            <p className="text-sm text-gray-600">
              In many Indian relationships, it's not just about two individuals dating – it's also about two families coming together. Our quiz touches on how you view things like family approval, living with in-laws, and long-term commitments.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-pink-100 shadow-sm">
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 mr-3">
                <Heart className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-gray-800">Dating & Marriage Attitudes</h4>
            </div>
            <p className="text-sm text-gray-600">
              Dating is still a relatively new concept in many parts of India. A lot of people date secretly or informally until it's "time to get married." We're mindful of that in our questions and guidance.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 border border-pink-100 shadow-sm">
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 mr-3">
                <Crown className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-gray-800">Values and Morals</h4>
            </div>
            <p className="text-sm text-gray-600">
              Views on religion, premarital relationships, alcohol, etc., can vary widely. We handle these topics with cultural nuance. We're not here to preach any value as better than another – only to help you understand compatibility.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-pink-100 shadow-sm">
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 mr-3">
                <BookOpen className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-gray-800">Language and Examples</h4>
            </div>
            <p className="text-sm text-gray-600">
              In your report, you might see culturally-relevant references. We keep things relatable whether you're from Mumbai, a small town in Kerala, an NRI balancing two cultures, or anywhere in between.
            </p>
          </div>
        </div>
        
        <div className="mt-6 bg-white p-4 rounded-lg border border-pink-100 flex items-center">
          <div className="text-gray-800 font-medium mr-auto">Our team has consulted local psychologists and relationship coaches to ensure cultural calibration.</div>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pink-500 opacity-20">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Calculation method component
const CalculationMethod = () => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="inline-block mb-4 py-1 px-3 bg-blue-50 rounded-full">
          <span className="text-blue-700 font-medium text-sm flex items-center">
            <BrainCircuit className="h-4 w-4 mr-2" /> Our Methodology
          </span>
        </div>
        
        <h3 className="font-bold text-xl text-gray-800 mb-3">
          🔬 How We Calculate Your Results
        </h3>
        
        <p className="text-gray-600">
          Without giving away our "secret sauce" entirely, here's a peek under the hood of how your 40 quiz questions lead to your compatibility profile:
        </p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-500 mr-3">
              <span className="font-bold">1</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Question Mapping</h4>
              <p className="text-sm text-gray-600">
                Every quiz question you answer is designed by experts to reveal something about one or more of the five psychological areas (personality, attachment, EQ, etc.).
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-500 mr-3">
              <span className="font-bold">2</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Scoring & Analysis</h4>
              <p className="text-sm text-gray-600">
                Once you finish, our system tallies your responses using a weighted scoring model developed with psychologists to profile you across dozens of sub-traits.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-500 mr-3">
              <span className="font-bold">3</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Compatibility Formula</h4>
              <p className="text-sm text-gray-600">
                Your "raw profile" is processed through our compatibility formula created from research insights on what trait combinations tend to make relationships easier versus harder.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-500 mr-3">
              <span className="font-bold">4</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Color Assignment</h4>
              <p className="text-sm text-gray-600">
                Based on your overall score, you receive a Green (highly compatible), Yellow (moderately compatible), or Red (challenging compatibility) badge reflecting your relationship outlook.
              </p>
              <div className="mt-2 flex space-x-3">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-500 mr-1"></div>
                  <span className="text-xs text-gray-600">Green</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-yellow-500 mr-1"></div>
                  <span className="text-xs text-gray-600">Yellow</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-red-500 mr-1"></div>
                  <span className="text-xs text-gray-600">Red</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-500 mr-3">
              <span className="font-bold">5</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Detailed Reporting</h4>
              <p className="text-sm text-gray-600">
                Your report breaks down each component with detailed explanations and personalized tips tailored to your specific profile to help you navigate and improve your relationships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Interesting Stat component
const StatisticItem = ({ icon, value, label, color, highlight, notes }: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
  highlight: string;
  notes?: string;
}) => {
  return (
    <div className={`bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow ${highlight}`}>
      <div className="flex items-center mb-4">
        <div className={`h-12 w-12 rounded-full ${color} flex items-center justify-center text-white mr-3`}>
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
      {notes && (
        <div className="text-xs text-gray-500 italic">{notes}</div>
      )}
    </div>
  );
};

// Main Science page component
const Science = () => {
  return (
    <div className="pt-16 pb-20">
      <Helmet>
        <title>The Science Behind WhoToDate | Understanding Relationship Compatibility</title>
        <meta name="description" content="Explore the scientific frameworks behind our compatibility assessment - Big Five, MBTI, Attachment Theory, Emotional Intelligence, and Core Values - all tailored for Indian relationships." />
      </Helmet>

      {/* Hero section */}
      <section className="py-16 px-4 bg-gradient-to-br from-pink-50 via-pink-100/30 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <div className="inline-block mb-4 py-1.5 px-4 bg-white rounded-full shadow-sm">
                <span className="text-gray-700 font-medium text-sm flex items-center">
                  <span className="mr-2">🧬</span> Research-Based Framework
                </span>
              </div>
              
              <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-6 text-gray-800">
                The Science Behind WhoToDate
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                Dating might feel like magic, but there's a lot of science behind what makes two people click. WhoToDate isn't just a random quiz – it's built on five established psychological frameworks that researchers say play a huge role in compatibility.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <Brain className="h-4 w-4 text-pink-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Big Five Traits</span>
                </div>
                
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <Fingerprint className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Myers-Briggs</span>
                </div>
                
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <Heart className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Attachment Theory</span>
                </div>
                
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Emotional Intelligence</span>
                </div>
                
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <Crown className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Core Values</span>
                </div>
              </div>
              
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-xl shadow-md border border-pink-200 hover:opacity-90 transition-all duration-300"
                style={{ backgroundColor: '#e83a8e' }}
              >
                Take the 5-Minute Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="md:col-span-2 grid grid-cols-2 gap-3">
              <StatisticItem 
                icon={<Lightbulb className="h-6 w-6" />}
                value="5"
                label="Scientific Frameworks"
                color="bg-pink-500"
                highlight="hover:border-pink-300"
              />
              
              <StatisticItem 
                icon={<Target className="h-6 w-6" />}
                value="40"
                label="Targeted Questions"
                color="bg-purple-500"
                highlight="hover:border-purple-300"
                notes="Completes in ~5 minutes"
              />
              
              <StatisticItem 
                icon={<Users className="h-6 w-6" />}
                value="69%"
                label="of Gen Z Indians prefer love marriages"
                color="bg-blue-500"
                highlight="hover:border-blue-300"
                notes="Source: Statista"
              />
              
              <StatisticItem 
                icon={<Gauge className="h-6 w-6" />}
                value="85%"
                label="Compatibility Assessment Accuracy"
                color="bg-green-500"
                highlight="hover:border-green-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Framework section with interactive tabs */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 py-1.5 px-4 bg-pink-50 rounded-full">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">🧠</span> Psychological Foundations
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4 text-gray-800">
              Five Established Science Frameworks
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combined these frameworks to give you a well-rounded analysis of your personality, attachment style, emotional intelligence, and moral values.
            </p>
          </div>
          
          <FrameworkTabs />
        </div>
      </section>

      {/* Cultural adaptation section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <CulturalAdaptation />
        </div>
      </section>

      {/* How we calculate section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <CalculationMethod />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white rounded-xl p-8 shadow-md border border-pink-100">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4 text-gray-800">
              Experience the Science in Action
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Take the quiz and discover how these scientific frameworks can help you understand your dating patterns and find more compatible relationships
            </p>
            
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center px-8 py-4 text-white font-bold text-lg rounded-lg shadow-lg border border-pink-200 hover:opacity-90 transform hover:translate-y-[-2px] transition-all duration-300"
              style={{ backgroundColor: '#e83a8e' }}
            >
              Start My FREE Compatibility Quiz
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="inline-flex items-center bg-pink-50 px-4 py-2 rounded-full shadow-sm">
                <Check className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">5-minute assessment</span>
              </div>
              
              <div className="inline-flex items-center bg-pink-50 px-4 py-2 rounded-full shadow-sm">
                <Check className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Instant results</span>
              </div>
              
              <div className="inline-flex items-center bg-pink-50 px-4 py-2 rounded-full shadow-sm">
                <Check className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Personalized insights</span>
              </div>
              
              <div className="inline-flex items-center bg-pink-50 px-4 py-2 rounded-full shadow-sm">
                <Check className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Indian cultural context</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Science;