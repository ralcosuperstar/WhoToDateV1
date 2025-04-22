import { 
  CheckCircle2, 
  AlertTriangle, 
  Heart, 
  ArrowRight,
  Lightbulb,
  User,
  Rocket,
  Brain,
  Scale,
  Sparkles,
  Download,
  Share2,
  Star,
  Zap,
  BookOpen,
  Glasses,
  HeartHandshake,
  Gift,
  Info,
  Puzzle,
  ChevronDown
} from "lucide-react";
import { DetailedReport } from "../../logic/profile";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const FullReportView = ({ 
  profile
}: { 
  profile: DetailedReport;
}) => {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  
  // References to each section for scrolling
  const overviewRef = useRef<HTMLDivElement>(null);
  const personalityRef = useRef<HTMLDivElement>(null);
  const emotionalRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const partnerRef = useRef<HTMLDivElement>(null);
  const adviceRef = useRef<HTMLDivElement>(null);

  // Scroll to section when activeSection changes
  useEffect(() => {
    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    switch (activeSection) {
      case 'overview':
        scrollToSection(overviewRef);
        break;
      case 'personality':
        scrollToSection(personalityRef);
        break;
      case 'emotional':
        scrollToSection(emotionalRef);
        break;
      case 'values':
        scrollToSection(valuesRef);
        break;
      case 'partner':
        scrollToSection(partnerRef);
        break;
      case 'advice':
        scrollToSection(adviceRef);
        break;
      default:
        break;
    }
  }, [activeSection]);

  // Safety check - if profile is undefined or incomplete, show loading state
  if (!profile || 
      !profile.bigFive || 
      !profile.flags || 
      !profile.overall || 
      !profile.snapshot) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-center text-primary">Discovering Your Relationship DNA ✨</h2>
        <div className="flex justify-center my-8">
          <div className="animate-spin h-12 w-12 border-4 border-primary rounded-full border-t-transparent"></div>
        </div>
        <p className="text-center text-neutral-600">Just a moment while we analyze your unique relationship profile...</p>
      </div>
    );
  }

  // Enhanced colors and styling based on profile
  const bgGradient = profile.overall === 'green' 
    ? 'from-emerald-500 to-teal-600' 
    : profile.overall === 'yellow' 
      ? 'from-amber-500 to-yellow-600' 
      : 'from-rose-500 to-pink-600';

  const themeColor = profile.overall === 'green' 
    ? 'text-emerald-600' 
    : profile.overall === 'yellow' 
      ? 'text-amber-600' 
      : 'text-rose-600';
  
  const themeBgLight = profile.overall === 'green' 
    ? 'bg-emerald-50' 
    : profile.overall === 'yellow' 
      ? 'bg-amber-50' 
      : 'bg-rose-50';
  
  const themeBorder = profile.overall === 'green' 
    ? 'border-emerald-200' 
    : profile.overall === 'yellow' 
      ? 'border-amber-200' 
      : 'border-rose-200';
  
  // Get highest personality trait
  const getHighestTrait = () => {
    if (!profile.bigFive) return null;
    const traits = Object.entries(profile.bigFive);
    if (traits.length === 0) return null;
    return traits.reduce((max, current) => 
      (current[1] > max[1]) ? current : max
    );
  };

  const highestTrait = getHighestTrait();

  // Get suggested partner traits
  const getPartnerTraits = () => {
    if (!profile.matches?.idealPartners) return [];
    return profile.matches.idealPartners.slice(0, 3);
  };

  const suggestedPartnerTraits = getPartnerTraits();

  return (
    <div className="min-h-screen bg-neutral-50 pt-6 pb-12">
      {/* Header Section with Stunning Hero */}
      <div className={`relative overflow-hidden bg-gradient-to-r ${bgGradient} text-white mb-8 rounded-xl mx-auto max-w-5xl shadow-lg`}>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>
        </div>
        <div className="relative p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 flex items-center">
            <span className="mr-3 text-5xl">✨</span>
            Your Relationship Profile
          </h1>
          <p className="text-xl opacity-90 mb-6 max-w-2xl">
            Based on your answers, we've unlocked the secrets to your unique relationship style
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg flex-1 min-w-[200px]">
              <h3 className="text-lg font-bold mb-1 flex items-center">
                <User className="h-5 w-5 mr-2" /> 
                Personality Archetype
              </h3>
              <p className="text-xl font-semibold">{profile.primaryArchetype}</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg flex-1 min-w-[200px]">
              <h3 className="text-lg font-bold mb-1 flex items-center">
                <Heart className="h-5 w-5 mr-2" /> 
                Attachment Style
              </h3>
              <p className="text-xl font-semibold capitalize">{profile.attachment}</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg flex-1 min-w-[200px]">
              <h3 className="text-lg font-bold mb-1 flex items-center">
                <Star className="h-5 w-5 mr-2" /> 
                Relationship Potential
              </h3>
              <p className="text-xl font-semibold">
                {profile.overall === 'green' 
                  ? 'High Compatibility' 
                  : profile.overall === 'yellow' 
                    ? 'Moderate Compatibility' 
                    : 'Complex Compatibility'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4">
        {/* Desktop Navigation Tabs */}
        <div className="hidden md:flex flex-wrap gap-2 mb-8 bg-white p-3 rounded-lg shadow-sm">
          <button 
            onClick={() => setActiveSection("overview")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${activeSection === "overview" ? "bg-primary/90 text-white shadow-md" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
          >
            🔍 Overview
          </button>
          <button 
            onClick={() => setActiveSection("personality")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${activeSection === "personality" ? "bg-purple-800 text-white shadow-md" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
          >
            🧩 Your Personality
          </button>
          <button 
            onClick={() => setActiveSection("emotional")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${activeSection === "emotional" ? "bg-rose-700 text-white shadow-md" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
          >
            ❤️ Emotional Intelligence
          </button>
          <button 
            onClick={() => setActiveSection("values")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${activeSection === "values" ? "bg-amber-700 text-white shadow-md" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
          >
            ⚖️ Core Values
          </button>
          <button 
            onClick={() => setActiveSection("partner")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${activeSection === "partner" ? "bg-emerald-700 text-white shadow-md" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
          >
            💘 Ideal Partner
          </button>
          <button 
            onClick={() => setActiveSection("advice")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${activeSection === "advice" ? "bg-blue-700 text-white shadow-md" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
          >
            💡 Growth & Advice
          </button>
        </div>
        
        {/* Mobile Navigation Dropdown */}
        <div className="md:hidden mb-8">
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="w-full flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
          >
            <span className="font-semibold flex items-center gap-2">
              {activeSection === "overview" && "🔍 Overview"}
              {activeSection === "personality" && "🧩 Your Personality"}
              {activeSection === "emotional" && "❤️ Emotional Intelligence"}
              {activeSection === "values" && "⚖️ Core Values"}
              {activeSection === "partner" && "💘 Ideal Partner"}
              {activeSection === "advice" && "💡 Growth & Advice"}
            </span>
            <ChevronDown className={`h-5 w-5 transition-transform ${showMobileMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {showMobileMenu && (
            <div className="absolute left-4 right-4 mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-20">
              <div className="p-2 space-y-1">
                <button 
                  onClick={() => {
                    setActiveSection("overview");
                    setShowMobileMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold ${activeSection === "overview" ? "bg-primary/90 text-white shadow-md" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
                >
                  🔍 Overview
                </button>
                <button 
                  onClick={() => {
                    setActiveSection("personality");
                    setShowMobileMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold ${activeSection === "personality" ? "bg-purple-800 text-white shadow-md" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
                >
                  🧩 Your Personality
                </button>
                <button 
                  onClick={() => {
                    setActiveSection("emotional");
                    setShowMobileMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold ${activeSection === "emotional" ? "bg-rose-700 text-white shadow-md" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
                >
                  ❤️ Emotional Intelligence
                </button>
                <button 
                  onClick={() => {
                    setActiveSection("values");
                    setShowMobileMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold ${activeSection === "values" ? "bg-amber-700 text-white shadow-md" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
                >
                  ⚖️ Core Values
                </button>
                <button 
                  onClick={() => {
                    setActiveSection("partner");
                    setShowMobileMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold ${activeSection === "partner" ? "bg-emerald-600 text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
                >
                  💘 Ideal Partner
                </button>
                <button 
                  onClick={() => {
                    setActiveSection("advice");
                    setShowMobileMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold ${activeSection === "advice" ? "bg-blue-600 text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
                >
                  💡 Growth & Advice
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Overview Section */}
        <div ref={overviewRef} className="mb-16 scroll-mt-24" id="overview">
          <div className="relative">
            <div className="absolute -left-5 h-full w-1 bg-primary rounded-full opacity-50"></div>
            <h2 className="text-3xl font-bold mb-6 text-primary">🔍 Overview</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className={`p-6 ${themeBgLight} ${themeBorder} border-b`}>
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                <Info className="h-6 w-6 mr-2" /> 
                What Your Quiz Results Reveal
              </h2>
              <p className="text-neutral-700">{profile.snapshot}</p>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">📊 Your Relationship DNA at a Glance</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
                  <h4 className="font-bold text-lg mb-3 flex items-center text-purple-800">
                    🧩 What Makes You Unique
                  </h4>
                  <p className="text-purple-900">
                    Your dominant trait is <span className="font-bold">{highestTrait ? highestTrait[0] : "balance"}</span>.
                    With a {profile.primaryArchetype} personality type and {profile.attachment} attachment style,
                    you bring unique qualities to relationships that define how you connect with others.
                  </p>
                </div>
                
                <div className="bg-emerald-50 p-5 rounded-lg border border-emerald-100">
                  <h4 className="font-bold text-lg mb-3 flex items-center text-emerald-800">
                    ⭐ Who You'll Click With
                  </h4>
                  <p className="text-emerald-900">
                    Your ideal partner will likely have traits like{' '}
                    {suggestedPartnerTraits.length > 0 ? (
                      <span>
                        <span className="font-bold">{suggestedPartnerTraits.join(", ")}</span>
                      </span>
                    ) : (
                      "compassion, emotional stability, and intellectual curiosity"
                    )}.
                    They'll complement your style while supporting your growth.
                  </p>
                </div>
              </div>
              
              <div className="bg-rose-50 p-5 rounded-lg border border-rose-100">
                <h4 className="font-bold text-lg mb-3 flex items-center text-rose-800">
                  ❓ What Questions Should You Be Asking?
                </h4>
                <div className="space-y-3">
                  <p className="text-rose-900">
                    Based on your profile, consider reflecting on these questions:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-rose-900">
                    <li>How does your {profile.attachment} attachment style influence your expectations in relationships?</li>
                    <li>What would a partner who truly understands your {profile.primaryArchetype} personality bring to your life?</li>
                    <li>How might your relationship strengths be used to overcome your challenges?</li>
                    <li>What qualities in a partner would help you grow into your best self?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className={`p-6 ${themeBgLight} ${themeBorder} border-b`}>
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                <BookOpen className="h-6 w-6 mr-2" /> 
                Understanding Your Report
              </h2>
              <p className="text-neutral-700">
                This report is based on scientific research in personality psychology, attachment theory, 
                and relationship dynamics. Explore each section to gain deeper insights.
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">Personality Assessment</h3>
                    <p className="text-sm text-blue-700">Based on the Five Factor Model (Big Five), scientifically validated as the most accurate personality framework.</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-pink-50 rounded-lg">
                  <div className="bg-pink-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <Heart className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pink-800">Attachment Style</h3>
                    <p className="text-sm text-pink-700">Derived from attachment theory by Bowlby and Ainsworth, identifying your primary relationship attachment pattern.</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-amber-50 rounded-lg">
                  <div className="bg-amber-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <Scale className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-800">Values Assessment</h3>
                    <p className="text-sm text-amber-700">Analyzes your core values that drive compatibility and long-term relationship satisfaction.</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-purple-50 rounded-lg">
                  <div className="bg-purple-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <HeartHandshake className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-800">Compatibility Framework</h3>
                    <p className="text-sm text-purple-700">Our proprietary algorithm combines multiple dimensions to predict compatibility and relationship satisfaction.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personality Section */}
        <div ref={personalityRef} className="mb-16 scroll-mt-24" id="personality">
          <div className="relative">
            <div className="absolute -left-5 h-full w-1 bg-purple-500 rounded-full opacity-50"></div>
            <h2 className="text-3xl font-bold mb-6 text-purple-700">🧩 Your Personality</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 bg-purple-50 border-b border-purple-100">
              <h2 className="text-2xl font-bold mb-2 flex items-center text-purple-800">
                <Brain className="h-6 w-6 mr-2" /> 
                Your Personality Profile
              </h2>
              <p className="text-purple-900">
                Your personality type is <span className="font-bold">{profile.primaryArchetype}</span>. 
                Here's how your unique traits shape your relationships and interactions.
              </p>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-6 text-purple-800">🧠 Your Big Five Personality Traits</h3>
              
              <div className="space-y-6 mb-8">
                {profile.bigFive && Object.entries(profile.bigFive).map(([trait, scoreVal]) => {
                  // Values are already on a 0-100 scale, no conversion needed
                  const score = typeof scoreVal === 'number' ? Math.min(100, Math.max(0, scoreVal)) : 50;
                  
                  // Determine score level description
                  const getScoreLevel = (s: number, t: string) => {
                    if (s >= 70) {
                      switch(t) {
                        case 'openness': return "highly creative and open to new experiences";
                        case 'conscientiousness': return "extremely organized and disciplined";
                        case 'extraversion': return "highly sociable and energetic";
                        case 'agreeableness': return "very compassionate and cooperative";
                        case 'neuroticism': return "more sensitive to stress and emotions";
                        default: return "high";
                      }
                    } else if (s >= 40) {
                      switch(t) {
                        case 'openness': return "moderately open to new ideas while valuing tradition";
                        case 'conscientiousness': return "balanced between spontaneity and structure";
                        case 'extraversion': return "adaptable to both social and private settings";
                        case 'agreeableness': return "balanced between compromise and assertiveness";
                        case 'neuroticism': return "moderately resilient with normal emotional responses";
                        default: return "moderate";
                      }
                    } else {
                      switch(t) {
                        case 'openness': return "practical and conventional in approach";
                        case 'conscientiousness': return "flexible and spontaneous";
                        case 'extraversion': return "more reserved and reflective";
                        case 'agreeableness': return "more analytical and direct in communication";
                        case 'neuroticism': return "exceptionally resilient to stress";
                        default: return "low";
                      }
                    }
                  };
                  
                  // Trait descriptions for relationships
                  const getTraitRelationshipImpact = (t: string) => {
                    switch(t) {
                      case 'openness': 
                        return "In relationships, this trait affects how you explore new experiences together and handle differences in viewpoints.";
                      case 'conscientiousness': 
                        return "This trait influences how you approach responsibilities, planning, and reliability in relationships.";
                      case 'extraversion': 
                        return "This quality shapes your social energy, communication style, and need for togetherness versus alone time.";
                      case 'agreeableness': 
                        return "This trait determines how you handle conflicts, express empathy, and prioritize harmony in relationships.";
                      case 'neuroticism': 
                        return "This quality impacts emotional stability, stress response, and how you process relationship challenges.";
                      default: 
                        return "";
                    }
                  };
                  
                  return (
                    <div key={trait} className="bg-purple-50 p-5 rounded-lg border border-purple-100">
                      <div className="flex justify-between mb-3">
                        <h4 className="font-bold text-lg text-purple-800 capitalize">{trait}</h4>
                        <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          {Math.round(score)}%
                        </span>
                      </div>
                      
                      <div className="h-3 w-full bg-purple-200 rounded-full overflow-hidden mb-4">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-purple-600 rounded-full"
                        ></motion.div>
                      </div>
                      
                      <p className="text-purple-900 mb-3">
                        You are <span className="font-semibold">{getScoreLevel(score, trait)}</span>.
                      </p>
                      
                      <p className="text-purple-800 text-sm">
                        {getTraitRelationshipImpact(trait)}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                <h3 className="text-xl font-semibold mb-4 text-indigo-800">⭐ What Does This Mean For Your Relationships?</h3>
                
                <div className="space-y-4">
                  <div className="flex">
                    <div className="bg-indigo-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
                      <Gift className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-800">Your Gift to Relationships</h4>
                      <p className="text-indigo-700">
                        Your personality type brings {profile.flags?.positives?.[0] || "unique strengths"} to your relationships,
                        making you particularly skilled at fostering connection through {profile.primaryArchetype.toLowerCase()} qualities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-indigo-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
                      <AlertTriangle className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-800">Potential Blind Spots</h4>
                      <p className="text-indigo-700">
                        Be mindful of tendencies toward {profile.flags?.cautions?.[0]?.toLowerCase() || "potential challenges"}.
                        Awareness of these patterns can help you navigate relationship dynamics more effectively.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-indigo-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
                      <Star className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-800">Ideal Conversation Starters</h4>
                      <p className="text-indigo-700">
                        Based on your profile, deep conversations about {highestTrait ? highestTrait[0].toLowerCase() : "personal values"}-related topics
                        will help you connect authentically with potential partners who appreciate your unique perspective.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 bg-blue-50 border-b border-blue-100">
              <h2 className="text-2xl font-bold mb-2 flex items-center text-blue-800">
                <HeartHandshake className="h-6 w-6 mr-2" /> 
                👫 Your Attachment Style
              </h2>
              <p className="text-blue-700">
                Your attachment style is <span className="font-bold capitalize">{profile.attachment}</span>.
                This pattern, formed early in life, influences how you connect with others in relationships.
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">🔍 Understanding Your Attachment Style</h3>
                
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                  <h4 className="font-bold text-lg mb-3 text-blue-800">
                    What {profile.attachment} Attachment Means:
                  </h4>
                  
                  {profile.attachment === "secure" ? (
                    <p className="text-blue-700">
                      With a secure attachment style, you likely find it natural to form close bonds while maintaining healthy independence.
                      You're comfortable with intimacy and trust, can communicate your needs effectively, and aren't overly fearful of abandonment.
                      This balanced approach to relationships creates a strong foundation for healthy partnerships.
                    </p>
                  ) : profile.attachment === "anxious" ? (
                    <p className="text-blue-700">
                      With an anxious attachment style, you may seek high levels of closeness and reassurance in relationships.
                      You're attentive to your partner's emotional cues and may worry about rejection or abandonment.
                      Your natural desire for connection can create deep bonds, though finding the right balance of independence is key.
                    </p>
                  ) : profile.attachment === "avoidant" ? (
                    <p className="text-blue-700">
                      With an avoidant attachment style, you value independence and self-sufficiency in relationships.
                      You may find it challenging to fully open up emotionally and might create distance when relationships feel too intense.
                      Your strength lies in self-reliance, while developing comfort with deeper vulnerability can enhance your connections.
                    </p>
                  ) : (
                    <p className="text-blue-700">
                      Your attachment style shows a mixed pattern of relationship behaviors that can vary based on circumstances and partners.
                      You may experience both a desire for closeness and comfort with distance at different times.
                      Understanding these patterns helps you navigate relationship dynamics with greater awareness.
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                  <h4 className="font-bold text-lg mb-3 text-green-800">💪 Your Attachment Strengths</h4>
                  <ul className="space-y-3">
                    {profile.attachment === "secure" ? (
                      <>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Ability to form deep emotional connections while maintaining healthy boundaries</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Effective communication of needs and feelings in relationships</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Resilience during relationship challenges and conflicts</span>
                        </li>
                      </>
                    ) : profile.attachment === "anxious" ? (
                      <>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Deep capacity for emotional connection and intimacy</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Strong emotional intuition and awareness of others' feelings</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Dedication and loyalty to maintaining relationships</span>
                        </li>
                      </>
                    ) : profile.attachment === "avoidant" ? (
                      <>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Strong sense of independence and self-sufficiency</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Ability to maintain boundaries and personal space</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Capacity for logical problem-solving in emotional situations</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Adaptability to different relationship dynamics</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Complex emotional depth that can create meaningful connections</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Ability to understand both sides of relationship dynamics</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-5 rounded-lg border border-orange-100">
                  <h4 className="font-bold text-lg mb-3 text-orange-800">🧭 Growth Opportunities</h4>
                  <ul className="space-y-3">
                    {profile.attachment === "secure" ? (
                      <>
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Being patient with partners who have different attachment styles</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Continuing to communicate boundaries clearly during challenges</span>
                        </li>
                      </>
                    ) : profile.attachment === "anxious" ? (
                      <>
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Developing greater comfort with independence and space in relationships</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Building self-validation rather than seeking excessive reassurance</span>
                        </li>
                      </>
                    ) : profile.attachment === "avoidant" ? (
                      <>
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Becoming more comfortable with emotional intimacy and vulnerability</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Communicating needs directly rather than creating distance</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Developing more consistent patterns of relating across relationships</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Working toward more secure attachment behaviors over time</span>
                        </li>
                      </>
                    )}
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Remember that attachment styles can evolve with self-awareness and healthy relationships</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emotional Intelligence Section */}
        <div ref={emotionalRef} className="mb-16 scroll-mt-24" id="emotional">
          <div className="relative">
            <div className="absolute -left-5 h-full w-1 bg-pink-500 rounded-full opacity-50"></div>
            <h2 className="text-3xl font-bold mb-6 text-pink-700">❤️ Emotional Intelligence</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 bg-pink-50 border-b border-pink-100">
              <h2 className="text-2xl font-bold mb-2 flex items-center text-pink-800">
                <Heart className="h-6 w-6 mr-2" /> 
                Your Emotional Intelligence
              </h2>
              <p className="text-pink-700">
                Emotional intelligence is a key predictor of relationship success. Here's how your emotional capabilities 
                shape your relationship experiences.
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-pink-800">🧠 Your EQ Profile</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {profile.eq && Object.entries(profile.eq).map(([trait, scoreVal]) => {
                    // Values are already on a 0-100 scale, no conversion needed
                    const score = typeof scoreVal === 'number' ? Math.min(100, Math.max(0, scoreVal)) : 50;
                    
                    // EQ dimension labels
                    const eqLabels: Record<string, string> = {
                      'selfAwareness': 'Self Awareness',
                      'selfRegulation': 'Self Regulation',
                      'empathy': 'Empathy',
                      'socialSkills': 'Social Skills'
                    };

                    // EQ dimension descriptions
                    const eqDescriptions: Record<string, string> = {
                      'selfAwareness': 'Your ability to understand your own emotions and their impact',
                      'selfRegulation': 'Your skill at managing and controlling your emotional responses',
                      'empathy': 'Your capacity to understand and share the feelings of others',
                      'socialSkills': 'Your ability to navigate social interactions and relationships effectively'
                    };
                    
                    return (
                      <div key={trait} className="bg-pink-50 p-5 rounded-lg border border-pink-100">
                        <div className="flex justify-between mb-3">
                          <h4 className="font-bold text-lg text-pink-800">
                            {eqLabels[trait] || trait}
                          </h4>
                          <span className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                            {Math.round(score)}%
                          </span>
                        </div>
                        
                        <div className="h-3 w-full bg-pink-200 rounded-full overflow-hidden mb-4">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-pink-500 rounded-full"
                          ></motion.div>
                        </div>
                        
                        <p className="text-pink-700 text-sm">
                          {eqDescriptions[trait] || `This measures your emotional capacity in ${trait}`}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-pink-50 p-6 rounded-lg border border-pink-100">
                  <h3 className="text-lg font-semibold mb-4 text-pink-800 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Why Emotional Intelligence Matters in Relationships
                  </h3>
                  
                  <div className="space-y-4">
                    <p className="text-pink-900">
                      High emotional intelligence is associated with:
                    </p>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-pink-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                          <span className="text-pink-800 text-sm font-medium">1</span>
                        </div>
                        <span className="text-pink-800">Better conflict resolution and fewer destructive arguments</span>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="bg-pink-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                          <span className="text-pink-800 text-sm font-medium">2</span>
                        </div>
                        <span className="text-pink-800">Increased intimacy and emotional connection</span>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="bg-pink-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                          <span className="text-pink-800 text-sm font-medium">3</span>
                        </div>
                        <span className="text-pink-800">More effective communication of needs and boundaries</span>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="bg-pink-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                          <span className="text-pink-800 text-sm font-medium">4</span>
                        </div>
                        <span className="text-pink-800">Greater resilience during relationship challenges</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-pink-800">💌 Your Emotional Strengths in Relationships</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                    <h4 className="font-bold text-lg mb-3 text-green-800">🌟 What You Bring to the Table</h4>
                    <ul className="space-y-3 ml-5 list-disc text-green-800">
                      {profile.flags?.positives?.slice(0, 3).map((strength, i) => (
                        <li key={i}>{strength}</li>
                      )) || (
                        <>
                          <li>You naturally create emotional safety for your partner</li>
                          <li>You're attentive to your partner's emotional needs</li>
                          <li>You bring thoughtfulness to your interactions</li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <div className="bg-amber-50 p-5 rounded-lg border border-amber-100">
                    <h4 className="font-bold text-lg mb-3 text-amber-800">🌱 Growth Opportunities</h4>
                    <ul className="space-y-3 ml-5 list-disc text-amber-800">
                      {profile.flags?.cautions?.slice(0, 3).map((challenge, i) => (
                        <li key={i}>{challenge}</li>
                      )) || (
                        <>
                          <li>Practice active listening without planning your response</li>
                          <li>Develop comfort with emotional vulnerability</li>
                          <li>Build patience during emotionally charged moments</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div ref={valuesRef} className="mb-16 scroll-mt-24" id="values">
          <div className="relative">
            <div className="absolute -left-5 h-full w-1 bg-amber-500 rounded-full opacity-50"></div>
            <h2 className="text-3xl font-bold mb-6 text-amber-700">⚖️ Core Values</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 bg-amber-50 border-b border-amber-100">
              <h2 className="text-2xl font-bold mb-2 flex items-center text-amber-800">
                <Scale className="h-6 w-6 mr-2" /> 
                Your Core Values
              </h2>
              <p className="text-amber-700">
                Values alignment is one of the strongest predictors of long-term relationship satisfaction.
                Here's what matters most to you.
              </p>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-amber-800">🧭 Your Values Profile</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {profile.values && Object.entries(profile.values).map(([trait, scoreVal]) => {
                  // Values are already on a 0-100 scale, no conversion needed
                  const score = typeof scoreVal === 'number' ? Math.min(100, Math.max(0, scoreVal)) : 50;
                  
                  // Values labels
                  const valueLabels: Record<string, string> = {
                    'tradition': 'Tradition',
                    'independence': 'Independence',
                    'family': 'Family',
                    'ambition': 'Ambition',
                    'openMindedness': 'Open-Mindedness'
                  };
                  
                  // Values descriptions
                  const valueDescriptions: Record<string, string> = {
                    'tradition': 'Respect for customs, traditions, and cultural practices',
                    'independence': 'Self-reliance, freedom, and personal autonomy',
                    'family': 'Focus on family bonds, nurturing, and family connections',
                    'ambition': 'Personal success, achievement, and goal orientation',
                    'openMindedness': 'Receptiveness to new ideas, experiences, and perspectives'
                  };
                  
                  return (
                    <div key={trait} className="bg-amber-50 p-5 rounded-lg border border-amber-100">
                      <div className="flex justify-between mb-3">
                        <h4 className="font-bold text-lg text-amber-800">
                          {valueLabels[trait] || trait}
                        </h4>
                        <span className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                          {Math.round(score)}%
                        </span>
                      </div>
                      
                      <div className="h-3 w-full bg-amber-200 rounded-full overflow-hidden mb-4">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-amber-500 rounded-full"
                        ></motion.div>
                      </div>
                      
                      <p className="text-amber-700 text-sm">
                        {valueDescriptions[trait] || `This measures how much you value ${trait}`}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                <h3 className="text-lg font-semibold mb-4 text-orange-800">🔍 Why Values Matter in Relationships</h3>
                
                <div className="space-y-4">
                  <p className="text-orange-900">
                    Research consistently shows that couples with aligned values report higher relationship satisfaction
                    and lower conflict, even when personalities differ. Here's why your values profile matters:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                        <Puzzle className="h-4 w-4 mr-2" />
                        Compatibility
                      </h4>
                      <p className="text-orange-700 text-sm">
                        Values alignment predicts how well you'll navigate major life decisions together
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                        <HeartHandshake className="h-4 w-4 mr-2" />
                        Understanding
                      </h4>
                      <p className="text-orange-700 text-sm">
                        Knowing your partner's core values creates deeper connection and empathy
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Growth
                      </h4>
                      <p className="text-orange-700 text-sm">
                        Different yet complementary values can expand your perspective and experiences
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ideal Partner Section */}
        <div ref={partnerRef} className="mb-16 scroll-mt-24" id="partner">
          <div className="relative">
            <div className="absolute -left-5 h-full w-1 bg-indigo-500 rounded-full opacity-50"></div>
            <h2 className="text-3xl font-bold mb-6 text-indigo-700">💘 Ideal Partner</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 bg-indigo-50 border-b border-indigo-100">
              <h2 className="text-2xl font-bold mb-2 flex items-center text-indigo-800">
                <Heart className="h-6 w-6 mr-2" /> 
                ✨ Your Soulmate Profile
              </h2>
              <p className="text-indigo-700">
                {profile.partnerSummary || "Based on your unique personality traits and values, here's what a truly compatible partner might look like for you."}
              </p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                  <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Qualities That Will Complement You
                  </h3>
                  
                  <div className="space-y-3">
                    {profile.matches?.idealPartners?.map((trait, i) => (
                      <div key={i} className="flex items-start">
                        <div className="bg-green-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <p className="text-green-800">{trait}</p>
                      </div>
                    )) || (
                      <>
                        <div className="flex items-start">
                          <div className="bg-green-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </div>
                          <p className="text-green-800">Someone who appreciates your unique perspective</p>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-green-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </div>
                          <p className="text-green-800">A partner who balances emotional support with independence</p>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-green-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </div>
                          <p className="text-green-800">Someone who shares your core values while bringing fresh ideas</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-100">
                  <h3 className="text-lg font-semibold mb-4 text-yellow-800 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Potential Red Flags to Watch For
                  </h3>
                  
                  <div className="space-y-3">
                    {profile.matches?.trickyPartners?.map((warning, i) => (
                      <div key={i} className="flex items-start">
                        <div className="bg-yellow-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        </div>
                        <p className="text-yellow-800">{warning}</p>
                      </div>
                    )) || (
                      <>
                        <div className="flex items-start">
                          <div className="bg-yellow-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          </div>
                          <p className="text-yellow-800">Partners who don't respect your boundaries or independence</p>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-yellow-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          </div>
                          <p className="text-yellow-800">Relationships that create emotional instability</p>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-yellow-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          </div>
                          <p className="text-yellow-800">People who don't appreciate your unique strengths</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
                <h3 className="text-lg font-semibold mb-4 text-blue-800">🧩 How Your Ideal Partner Helps You Grow</h3>
                
                <div className="space-y-4">
                  <p className="text-blue-700">
                    {profile.matches?.why || "The right partner won't just make you happy—they'll help you become your best self. Based on your profile, here's how your ideal match would complement your journey:"}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <Puzzle className="h-4 w-4 mr-2" />
                        They'll Balance Your {highestTrait ? highestTrait[0] : "Strengths"}
                      </h4>
                      <p className="text-blue-700 text-sm">
                        By providing perspective that complements your natural tendencies,
                        they'll help you see situations more holistically.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <Zap className="h-4 w-4 mr-2" />
                        They'll Support Your Growth
                      </h4>
                      <p className="text-blue-700 text-sm">
                        Their complementary style will create a safe space for you to
                        work on areas like {profile.flags?.cautions?.[0]?.toLowerCase() || "personal growth areas"}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-rose-50 p-6 rounded-lg border border-rose-100">
                <h3 className="text-lg font-semibold mb-4 text-rose-800">🚀 Your Dating Mission</h3>
                
                <p className="text-rose-700 mb-4">
                  {profile.datingMission || "Based on your personality profile, here's one concrete experiment to try in your dating journey:"}
                </p>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-rose-800 font-medium">
                    "Focus on finding someone who values {highestTrait ? highestTrait[0].toLowerCase() : "your unique qualities"} and appreciates your {profile.attachment} attachment style. When meeting potential partners, share something authentic about your core values early on to assess compatibility."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advice Section */}
        <div ref={adviceRef} className="mb-16 scroll-mt-24" id="advice">
          <div className="relative">
            <div className="absolute -left-5 h-full w-1 bg-emerald-500 rounded-full opacity-50"></div>
            <h2 className="text-3xl font-bold mb-6 text-emerald-700">💡 Growth & Advice</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 bg-emerald-50 border-b border-emerald-100">
              <h2 className="text-2xl font-bold mb-2 flex items-center text-emerald-800">
                <Lightbulb className="h-6 w-6 mr-2" /> 
                🌱 Your Growth Journey
              </h2>
              <p className="text-emerald-700">
                Self-awareness is the first step toward personal growth. Here are insights and
                actionable steps to help you develop more fulfilling relationships.
              </p>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-800">🌱 Personal Development Plan</h3>
              
              <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-100 mb-6">
                <h4 className="font-bold text-lg mb-3 text-emerald-800">Your Growth Plan</h4>
                <p className="text-emerald-700">{profile.growthPlan}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                  <h4 className="font-bold text-lg mb-3 text-green-800">💪 Your Attachment Strengths</h4>
                  <ul className="space-y-3">
                    {profile.flags?.positives?.map((strength, i) => (
                      <div key={i} className="flex items-start">
                        <div className="bg-green-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                          <Star className="h-4 w-4 text-green-600" />
                        </div>
                        <p className="text-green-800">{strength}</p>
                      </div>
                    )) || (
                      <>
                        <div className="flex items-start">
                          <div className="bg-green-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <Star className="h-4 w-4 text-green-600" />
                          </div>
                          <p className="text-green-800">Your natural ability to connect with others</p>
                        </div>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-5 rounded-lg border border-orange-100">
                  <h4 className="font-bold text-lg mb-3 text-orange-800">🧭 Growth Opportunities</h4>
                  <ul className="space-y-3">
                    {profile.flags?.cautions?.map((caution, i) => (
                      <div key={i} className="flex items-start">
                        <div className="bg-orange-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                          <ArrowRight className="h-4 w-4 text-orange-600" />
                        </div>
                        <p className="text-orange-800">{caution}</p>
                      </div>
                    )) || (
                      <>
                        <div className="flex items-start">
                          <div className="bg-orange-200 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                            <ArrowRight className="h-4 w-4 text-orange-600" />
                          </div>
                          <p className="text-orange-800">Being more direct about your needs and boundaries</p>
                        </div>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                <h3 className="text-lg font-semibold mb-4 text-indigo-800">🗣️ Communication Tips for Your Style</h3>
                
                <div className="space-y-4">
                  {profile.tips?.map((tip, i) => (
                    <div key={i} className="flex items-start">
                      <div className="bg-indigo-200 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <Lightbulb className="h-4 w-4 text-indigo-600" />
                      </div>
                      <p className="text-indigo-800">{tip}</p>
                    </div>
                  )) || (
                    <>
                      <div className="flex items-start">
                        <div className="bg-indigo-200 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                          <Lightbulb className="h-4 w-4 text-indigo-600" />
                        </div>
                        <p className="text-indigo-800">Use "I" statements when expressing feelings or concerns ("I feel..." rather than "You always...")</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 bg-blue-50 border-b border-blue-100">
              <h2 className="text-2xl font-bold mb-2 flex items-center text-blue-800">
                <Rocket className="h-6 w-6 mr-2" /> 
                💡 Relationship Insights
              </h2>
              <p className="text-blue-700">
                Deeper understanding leads to more fulfilling connections. Here are key insights 
                to guide your relationship journey.
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {profile.wowInsights?.map((insight, i) => (
                  <div key={i} className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                    <div className="flex">
                      <div className="bg-blue-200 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
                        <Glasses className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-blue-800">{insight}</p>
                      </div>
                    </div>
                  </div>
                )) || (
                  <>
                    <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                      <div className="flex">
                        <div className="bg-blue-200 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
                          <Glasses className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-blue-800">Your attachment style influences your approach to emotional intimacy and independence in relationships.</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-8 flex gap-4">
                <button className="flex-1 bg-primary text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <Download className="mr-2 h-5 w-5" />
                  Download Full Report PDF
                </button>
                
                <button className="flex-1 bg-white border border-neutral-200 text-neutral-700 font-semibold py-3 px-6 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share Your Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullReportView;