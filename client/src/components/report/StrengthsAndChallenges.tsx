import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

interface StrengthsAndChallengesProps {
  strengthsWeaknesses?: {
    strengths?: string[];
    challenges?: string[];
    growthAreas?: string[];
  };
  compatibilityColor: string;
}

const StrengthsAndChallenges = ({ strengthsWeaknesses, compatibilityColor }: StrengthsAndChallengesProps) => {
  // Define fallback data if properties are missing
  const strengths = strengthsWeaknesses?.strengths || ["Emotional intelligence", "Communication skills", "Empathy"];
  const challenges = strengthsWeaknesses?.challenges || ["Setting boundaries", "Handling criticism"];
  const growthAreas = strengthsWeaknesses?.growthAreas || ["Self-awareness in relationships", "Active listening"];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Strengths Section */}
      <motion.div
        className="rounded-lg overflow-hidden border border-neutral-200 shadow-sm"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className={`p-4 ${
          compatibilityColor === 'green' ? 'bg-emerald-500 text-white' : 
          compatibilityColor === 'yellow' ? 'bg-amber-500 text-white' : 
          'bg-rose-500 text-white'
        }`}>
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            <h3 className="font-heading font-semibold">Your Relationship Strengths</h3>
          </div>
        </div>
        
        <div className="p-5 bg-white">
          <ul className="space-y-3">
            {strengths.map((strength, index) => (
              <motion.li 
                key={index}
                variants={item}
                className="flex items-start"
              >
                <div className={`mt-1 mr-3 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  compatibilityColor === 'green' ? 'bg-emerald-100 text-emerald-500' : 
                  compatibilityColor === 'yellow' ? 'bg-amber-100 text-amber-500' : 
                  'bg-rose-100 text-rose-500'
                }`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <span className="font-medium">{strength}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Challenges Section */}
      <motion.div
        className="rounded-lg overflow-hidden border border-neutral-200 shadow-sm"
        variants={container}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
      >
        <div className="p-4 bg-neutral-800 text-white">
          <div className="flex items-center">
            <TrendingDown className="w-5 h-5 mr-2" />
            <h3 className="font-heading font-semibold">Your Relationship Challenges</h3>
          </div>
        </div>
        
        <div className="p-5 bg-white">
          <ul className="space-y-3">
            {challenges.map((challenge, index) => (
              <motion.li 
                key={index}
                variants={item}
                className="flex items-start"
              >
                <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <div>
                  <span className="font-medium">{challenge}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Growth Areas Section */}
      <motion.div
        className="rounded-lg overflow-hidden border border-neutral-200 shadow-sm"
        variants={container}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.6 }}
      >
        <div className="p-4 bg-indigo-500 text-white">
          <div className="flex items-center">
            <ArrowUpRight className="w-5 h-5 mr-2" />
            <h3 className="font-heading font-semibold">Growth Opportunities</h3>
          </div>
        </div>
        
        <div className="p-5 bg-white">
          <ul className="space-y-3">
            {growthAreas.map((area, index) => (
              <motion.li 
                key={index}
                variants={item}
                className="flex items-start"
              >
                <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <div>
                  <span className="font-medium">{area}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default StrengthsAndChallenges;