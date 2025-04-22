import { 
  BarChart4, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Heart, 
  Send,
  ArrowRight,
  Lightbulb,
  User,
  Rocket,
  PieChart,
  Brain,
  BarChart,
  Medal,
  Scale,
  Sparkles
} from "lucide-react";
import { CompatibilityProfile } from "../../utils/calculateCompatibilityProfile";
import { motion } from "framer-motion";

// This component displays the full report in a single-page visual format
const FullReportView = ({ 
  profile
}: { 
  profile: CompatibilityProfile;
}) => {
  const colorClass = profile.overallColor === 'green' 
    ? 'bg-green-50 text-green-800 border-green-200' 
    : profile.overallColor === 'yellow' 
      ? 'bg-yellow-50 text-yellow-800 border-yellow-200' 
      : 'bg-red-50 text-red-800 border-red-200';

  const colorIcon = profile.overallColor === 'green' 
    ? <CheckCircle2 className="h-5 w-5 text-green-500" /> 
    : profile.overallColor === 'yellow' 
      ? <AlertTriangle className="h-5 w-5 text-yellow-500" /> 
      : <XCircle className="h-5 w-5 text-red-500" />;
  
  const scoreBarColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const colorGradient = profile.overallColor === 'green' 
    ? 'from-green-100 to-green-50' 
    : profile.overallColor === 'yellow' 
      ? 'from-yellow-100 to-yellow-50' 
      : 'from-red-100 to-red-50';

  return (
    <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
      <div className="p-4 md:p-6">
        {/* Header with Overall Summary */}
        <div className={`p-4 rounded-lg bg-gradient-to-r ${colorGradient} mb-6`}>
          <div className="flex items-center mb-3">
            <div className="p-2 bg-white rounded-full mr-3">
              {colorIcon}
            </div>
            <h2 className="text-xl font-bold">
              {profile.overallColor === 'green' 
                ? 'High Compatibility Potential' 
                : profile.overallColor === 'yellow' 
                  ? 'Moderate Compatibility Potential' 
                  : 'Challenging Compatibility Profile'}
            </h2>
          </div>
          <p className="text-sm leading-relaxed">
            {profile.overallSummary}
          </p>
        </div>

        {/* Main grid layout for all content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Key Profile Summary */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-md font-bold mb-3 flex items-center text-blue-800">
                <User className="h-4 w-4 mr-2" />
                Your Relationship Profile
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">Attachment Style</p>
                  <p className="text-sm font-medium capitalize text-blue-800">{profile.attachmentStyle}</p>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">Personality Archetype</p>
                  <p className="text-sm font-medium text-blue-800">{profile.personalityArchetype}</p>
                </div>
              </div>
            </div>

            {/* Relationship Strengths & Challenges */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="text-md font-bold mb-3 flex items-center text-green-800">
                  <Medal className="h-4 w-4 mr-2" />
                  Your Relationship Strengths
                </h3>
                <ul className="ml-5 text-sm list-disc text-green-800 space-y-1.5">
                  {profile.strengthsWeaknesses.strengths.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h3 className="text-md font-bold mb-3 flex items-center text-yellow-800">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Areas for Growth
                </h3>
                <ul className="ml-5 text-sm list-disc text-yellow-800 space-y-1.5">
                  {profile.strengthsWeaknesses.challenges.map((challenge, idx) => (
                    <li key={idx}>{challenge}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Personality Traits visualization */}
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <h3 className="text-md font-bold mb-3 flex items-center text-purple-800">
                <Brain className="h-4 w-4 mr-2" />
                Your Personality Traits
              </h3>
              <div className="space-y-2.5">
                {Object.entries(profile.personalityTraits).map(([trait, scoreVal]) => {
                  // Values are already on a 0-100 scale, no conversion needed
                  const score = typeof scoreVal === 'number' ? Math.min(100, Math.max(0, scoreVal)) : 50;
                  
                  return (
                    <div key={trait} className="relative">
                      <div className="flex justify-between mb-1">
                        <p className="text-xs font-medium uppercase text-purple-800">{trait}</p>
                        <span className="text-xs font-bold text-purple-800">{Math.round(score)}%</span>
                      </div>
                      <div className="h-2 w-full bg-purple-200 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-purple-500 rounded-full"
                        ></motion.div>
                      </div>
                      <p className="text-[10px] text-purple-700/80 mt-1">
                        {trait === 'openness' && 'Receptiveness to new ideas & experiences'}
                        {trait === 'conscientiousness' && 'Organization, reliability & responsibility'}
                        {trait === 'extraversion' && 'Energy from social interaction'}
                        {trait === 'agreeableness' && 'Concern for social harmony & cooperation'}
                        {trait === 'neuroticism' && 'Emotional stability & stress resilience'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Emotional Intelligence visualization */}
            <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
              <h3 className="text-md font-bold mb-3 flex items-center text-pink-800">
                <Heart className="h-4 w-4 mr-2" />
                Your Emotional Intelligence
              </h3>
              <div className="space-y-2.5">
                {Object.entries(profile.emotionalIntelligence).map(([trait, scoreVal]) => {
                  // Values are already on a 0-100 scale, no conversion needed
                  const score = typeof scoreVal === 'number' ? Math.min(100, Math.max(0, scoreVal)) : 50;
                  
                  return (
                    <div key={trait} className="relative">
                      <div className="flex justify-between mb-1">
                        <p className="text-xs font-medium uppercase text-pink-800">{trait}</p>
                        <span className="text-xs font-bold text-pink-800">{Math.round(score)}%</span>
                      </div>
                      <div className="h-2 w-full bg-pink-200 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-pink-500 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Core Values Visualization */}
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
              <h3 className="text-md font-bold mb-3 flex items-center text-amber-800">
                <Scale className="h-4 w-4 mr-2" />
                Your Core Values
              </h3>
              <div className="space-y-2.5">
                {Object.entries(profile.coreValues).map(([trait, scoreVal]) => {
                  // Values are already on a 0-100 scale, no conversion needed
                  const score = typeof scoreVal === 'number' ? Math.min(100, Math.max(0, scoreVal)) : 50;
                  
                  return (
                    <div key={trait} className="relative">
                      <div className="flex justify-between mb-1">
                        <p className="text-xs font-medium uppercase text-amber-800">{trait}</p>
                        <span className="text-xs font-bold text-amber-800">{Math.round(score)}%</span>
                      </div>
                      <div className="h-2 w-full bg-amber-200 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-amber-500 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Ideal Partner Insights */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-md font-bold mb-3 flex items-center text-blue-800">
                <Heart className="h-4 w-4 mr-2" />
                Ideal Partner Insights
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-xs font-medium uppercase mb-1 text-green-700 flex items-center">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Compatible Traits
                  </p>
                  <ul className="ml-5 text-xs list-disc space-y-1">
                    {profile.idealPartner.traits.map((trait, idx) => (
                      <li key={idx}>{trait}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-xs font-medium uppercase mb-1 text-yellow-700 flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Warning Signs
                  </p>
                  <ul className="ml-5 text-xs list-disc space-y-1">
                    {profile.idealPartner.warningFlags.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Intimacy Profile */}
            <div className="bg-red-50 rounded-lg p-4 border border-red-100">
              <h3 className="text-md font-bold mb-3 flex items-center text-red-800">
                <Heart className="h-4 w-4 mr-2" />
                Your Intimacy Style: {profile.intimacyStyle}
              </h3>
              <div className="space-y-2.5">
                {Object.entries(profile.intimacyProfile).map(([trait, scoreVal]) => {
                  // Values are already on a 0-100 scale, no conversion needed
                  const score = typeof scoreVal === 'number' ? Math.min(100, Math.max(0, scoreVal)) : 50;
                  
                  return (
                    <div key={trait} className="relative">
                      <div className="flex justify-between mb-1">
                        <p className="text-xs font-medium uppercase text-red-800">{trait}</p>
                        <span className="text-xs font-bold text-red-800">{Math.round(score)}%</span>
                      </div>
                      <div className="h-2 w-full bg-red-200 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-red-500 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Communication Tips */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <h3 className="text-md font-bold mb-3 flex items-center text-green-800">
                <Lightbulb className="h-4 w-4 mr-2" />
                Communication Tips
              </h3>
              <div className="space-y-2">
                {profile.relationshipInsights.communicationTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="bg-green-200 text-green-800 font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    <p className="text-xs text-green-800">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Growth Areas */}
        <div className="mt-5 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
          <h3 className="text-md font-bold mb-2 flex items-center text-primary">
            <User className="h-4 w-4 mr-2" />
            Growth Areas
          </h3>
          <ul className="ml-5 text-sm list-disc space-y-1.5">
            {profile.relationshipInsights.growthAreas.map((area, idx) => (
              <li key={idx}>{area}</li>
            ))}
          </ul>
        </div>
        
        {/* Pattern Insights */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-md font-bold mb-2 flex items-center text-blue-800">
            <Rocket className="h-4 w-4 mr-2" />
            Relationship Patterns
          </h3>
          <ul className="ml-5 text-sm list-disc space-y-1.5">
            {profile.relationshipInsights.compatibilityPatterns.map((pattern, idx) => (
              <li key={idx}>{pattern}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FullReportView;