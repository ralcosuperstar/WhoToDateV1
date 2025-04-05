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
import { CompatibilityProfile } from "@/lib/compatibilityAnalysis";
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
            {profile.description}
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
                  <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">Personality Type</p>
                  <p className="text-sm font-medium text-blue-800">{profile.mbtiStyle}</p>
                </div>
              </div>
            </div>

            {/* Dimension Scores with visual representation */}
            <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
              <h3 className="text-md font-bold mb-3 flex items-center">
                <PieChart className="h-4 w-4 mr-2 text-primary" />
                Compatibility Dimensions
              </h3>
              <div className="space-y-3">
                {Object.entries(profile.sectionScores).map(([section, scoreValue]) => {
                  const score = scoreValue as number;
                  const roundedScore = Math.round(score);
                  
                  return (
                    <div key={section} className="relative">
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          {section === 'personality' && <Brain className="h-3 w-3 mr-1 text-primary" />}
                          {section === 'emotional' && <Heart className="h-3 w-3 mr-1 text-primary" />}
                          {section === 'values' && <Scale className="h-3 w-3 mr-1 text-primary" />}
                          {section === 'physical' && <Sparkles className="h-3 w-3 mr-1 text-primary" />}
                          <p className="text-xs font-medium uppercase">{section}</p>
                        </div>
                        <span className="text-xs font-bold">{roundedScore}%</span>
                      </div>
                      <div className="relative">
                        <div className="h-2.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${scoreBarColor(score)} rounded-full`}
                          ></motion.div>
                        </div>
                        {/* Weight indicator */}
                        <div className="absolute right-0 -bottom-4 text-[10px] text-neutral-500">
                          {section === 'personality' && '35% weight'}
                          {section === 'emotional' && '25% weight'}
                          {section === 'values' && '25% weight'}
                          {section === 'physical' && '15% weight'}
                        </div>
                      </div>
                    </div>
                  );
                })}
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
            {/* Personality Traits with radial visualization */}
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <h3 className="text-md font-bold mb-3 flex items-center text-purple-800">
                <Brain className="h-4 w-4 mr-2" />
                Your Personality Traits
              </h3>
              <div className="space-y-2.5">
                {Object.entries(profile.personalityTraits).map(([trait, score]) => (
                  <div key={trait} className="relative">
                    <div className="flex justify-between mb-1">
                      <p className="text-xs font-medium uppercase text-purple-800">{trait}</p>
                      <span className="text-xs font-bold text-purple-800">{score}%</span>
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
                ))}
              </div>
            </div>
            
            {/* Compatibility Matches */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-md font-bold mb-3 flex items-center text-blue-800">
                <Heart className="h-4 w-4 mr-2" />
                Compatibility Insights
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-xs font-medium uppercase mb-1 text-green-700 flex items-center">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Most Compatible With
                  </p>
                  <ul className="ml-5 text-xs list-disc space-y-1">
                    {profile.compatibleTypes.mostCompatible.map((type, idx) => (
                      <li key={idx}>{type}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-xs font-medium uppercase mb-1 text-yellow-700 flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Challenging Matches
                  </p>
                  <ul className="ml-5 text-xs list-disc space-y-1">
                    {profile.compatibleTypes.challengingMatches.map((type, idx) => (
                      <li key={idx}>{type}</li>
                    ))}
                  </ul>
                </div>
                
                <p className="text-xs text-blue-800 italic">
                  {profile.compatibleTypes.compatibilityRationale}
                </p>
              </div>
            </div>
            
            {/* Personal Growth & Tips */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <h3 className="text-md font-bold mb-3 flex items-center text-green-800">
                <Lightbulb className="h-4 w-4 mr-2" />
                Growth & Relationship Tips
              </h3>
              <div className="mb-3 p-3 bg-white rounded-md shadow-sm">
                <p className="text-xs font-medium uppercase mb-1 text-primary">Focus Area</p>
                <p className="text-sm">
                  {profile.growthRecommendation || "Work on developing deeper self-awareness in relationships."}
                </p>
              </div>
              <div className="space-y-2">
                {profile.relationshipTips.slice(0, 3).map((tip, idx) => (
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
        
        {/* Bottom Section - Your Ideal Match */}
        <div className="mt-5 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
          <h3 className="text-md font-bold mb-2 flex items-center text-primary">
            <User className="h-4 w-4 mr-2" />
            Your Ideal Partner
          </h3>
          <p className="text-sm">
            {profile.idealPartnerSummary || "You'll connect best with someone who appreciates depth over superficial qualities."}
          </p>
        </div>
        
        {/* Dating Advice */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-md font-bold mb-2 flex items-center text-blue-800">
            <Rocket className="h-4 w-4 mr-2" />
            Try This Dating Approach
          </h3>
          <p className="text-sm">
            {profile.datingExperience || "Practice active listening on your next date - put away distractions and truly focus on the other person."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullReportView;