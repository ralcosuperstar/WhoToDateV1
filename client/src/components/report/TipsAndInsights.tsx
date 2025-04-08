import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

interface TipsAndInsightsProps {
  compatibilityInsights?: string[];
  relationshipTips?: string[];
  growthRecommendation?: string;
  idealPartnerSummary?: string;
  datingExperience?: string;
  compatibilityColor: string;
}

const TipsAndInsights = ({ 
  compatibilityInsights,
  relationshipTips,
  growthRecommendation,
  idealPartnerSummary,
  datingExperience,
  compatibilityColor
}: TipsAndInsightsProps) => {
  const [expandedSection, setExpandedSection] = useState<string>("insights");

  // Define fallback data if properties are missing
  const insights = compatibilityInsights || [
    "Your attachment style influences how you form emotional connections in relationships.",
    "Your high emotional intelligence helps you navigate interpersonal challenges effectively.",
    "Your core values align well with partners who prioritize open communication and mutual growth."
  ];
  
  const tips = relationshipTips || [
    "Practice active listening to strengthen your emotional connection with partners.",
    "Be mindful of your emotional reactions in stressful situations.",
    "Communicate your needs clearly while respecting your partner's boundaries."
  ];

  const growth = growthRecommendation || 
    "Focus on developing greater self-awareness in your relationships and communication patterns. Notice how your emotions affect your interactions with potential partners.";
  
  const idealPartner = idealPartnerSummary || 
    "Your compatibility profile suggests you'd thrive with someone who balances emotional openness with respect for boundaries. Look for shared core values and complementary communication styles.";
  
  const experience = datingExperience || 
    "On your next date, focus more on asking thoughtful questions that reveal values and emotional intelligence. Listen actively for alignment with your core needs rather than just surface-level compatibility.";

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection("");
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="space-y-4">
      {/* Insights Section */}
      <div className="rounded-lg border border-neutral-200 overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection("insights")}
          className={`w-full p-4 flex items-center justify-between transition-colors ${
            expandedSection === "insights"
              ? compatibilityColor === 'green'
                ? 'bg-emerald-500 text-white'
                : compatibilityColor === 'yellow'
                ? 'bg-amber-500 text-white'
                : 'bg-rose-500 text-white'
              : 'bg-white hover:bg-neutral-50'
          }`}
        >
          <div className="flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" />
            <h3 className="font-heading font-semibold">Compatibility Insights</h3>
          </div>
          {expandedSection === "insights" ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        <AnimatePresence>
          {expandedSection === "insights" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white"
            >
              <div className="p-5">
                <ul className="space-y-4">
                  {insights.map((insight, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className={`mt-1 mr-3 flex-shrink-0 text-${
                        compatibilityColor === 'green' ? 'emerald' : 
                        compatibilityColor === 'yellow' ? 'amber' : 
                        'rose'
                      }-500`}>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <p>{insight}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tips Section */}
      <div className="rounded-lg border border-neutral-200 overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection("tips")}
          className={`w-full p-4 flex items-center justify-between transition-colors ${
            expandedSection === "tips"
              ? 'bg-indigo-500 text-white'
              : 'bg-white hover:bg-neutral-50'
          }`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            <h3 className="font-heading font-semibold">Relationship Tips</h3>
          </div>
          {expandedSection === "tips" ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        <AnimatePresence>
          {expandedSection === "tips" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white"
            >
              <div className="p-5">
                <ul className="space-y-4">
                  {tips.map((tip, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="mt-1 mr-3 flex-shrink-0 text-indigo-500">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <p>{tip}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Growth Section */}
      <div className="rounded-lg border border-neutral-200 overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection("growth")}
          className={`w-full p-4 flex items-center justify-between transition-colors ${
            expandedSection === "growth"
              ? 'bg-purple-500 text-white'
              : 'bg-white hover:bg-neutral-50'
          }`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-heading font-semibold">Growth & Development</h3>
          </div>
          {expandedSection === "growth" ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        <AnimatePresence>
          {expandedSection === "growth" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white"
            >
              <div className="p-5 space-y-5">
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <h4 className="font-medium mb-2">What You Should Work On</h4>
                  <p>{growth}</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <h4 className="font-medium mb-2">Your Ideal Partner</h4>
                  <p>{idealPartner}</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <h4 className="font-medium mb-2">Try This In Real Life</h4>
                  <p>{experience}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TipsAndInsights;