import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface CompatibilityTypesProps {
  compatibleTypes?: {
    mostCompatible?: string[];
    challengingMatches?: string[];
    compatibilityRationale?: string;
  };
  compatibilityColor: string;
}

const CompatibilityTypeCards = ({ compatibleTypes, compatibilityColor }: CompatibilityTypesProps) => {
  // Define fallback data if properties are missing
  const mostCompatible = compatibleTypes?.mostCompatible || ["Emotionally Open", "Supportive", "Honest"];
  const challengingMatches = compatibleTypes?.challengingMatches || ["Overly Critical", "Emotionally Distant"];
  const rationale = compatibleTypes?.compatibilityRationale || 
    "Based on your attachment style and personality traits, you tend to form stronger bonds with partners who share your emotional openness while complementing your approach to relationships.";

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
      <motion.div 
        className="p-6 rounded-lg bg-neutral-light"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-neutral-dark/80 italic mb-4">{rationale}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Compatible */}
        <motion.div
          className={`rounded-lg p-5 ${
            compatibilityColor === 'green' ? 'bg-emerald-50 border border-emerald-200' : 
            compatibilityColor === 'yellow' ? 'bg-amber-50 border border-amber-200' : 
            'bg-rose-50 border border-rose-200'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 ${
              compatibilityColor === 'green' ? 'bg-emerald-100 text-emerald-600' : 
              compatibilityColor === 'yellow' ? 'bg-amber-100 text-amber-600' : 
              'bg-rose-100 text-rose-600'
            }`}>
              <Check className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-semibold text-lg">Most Compatible With</h4>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {mostCompatible.map((trait, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="font-medium">{trait}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Challenging Matches */}
        <motion.div
          className="rounded-lg p-5 bg-neutral-50 border border-neutral-200"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <div className="w-9 h-9 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center mr-3">
              <X className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-semibold text-lg">Challenging Matches</h4>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {challengingMatches.map((trait, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="font-medium">{trait}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompatibilityTypeCards;