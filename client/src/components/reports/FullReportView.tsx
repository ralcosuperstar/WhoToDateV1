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
  Rocket
} from "lucide-react";
import { useState } from "react";
import { CompatibilityProfile } from "@/lib/compatibilityAnalysis";
import { motion } from "framer-motion";

// This component will be used to display the full report after payment
const FullReportView = ({ 
  profile
}: { 
  profile: CompatibilityProfile;
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'insights'>('overview');
  
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

  return (
    <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Your Full Compatibility Profile</h2>
            <p className="text-neutral-dark/70">
              Complete analysis of your relationship patterns and preferences
            </p>
          </div>
          {/* Download button is now handled by parent component */}
        </div>

        {/* Tabs */}
        <div className="border-b border-neutral-200 mb-6">
          <div className="flex space-x-6">
            <button 
              className={`py-3 relative ${activeTab === 'overview' 
                ? 'text-primary font-medium' 
                : 'text-neutral-dark/70'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
              {activeTab === 'overview' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTab"
                />
              )}
            </button>
            <button 
              className={`py-3 relative ${activeTab === 'details' 
                ? 'text-primary font-medium' 
                : 'text-neutral-dark/70'}`}
              onClick={() => setActiveTab('details')}
            >
              Detailed Analysis
              {activeTab === 'details' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTab"
                />
              )}
            </button>
            <button 
              className={`py-3 relative ${activeTab === 'insights' 
                ? 'text-primary font-medium' 
                : 'text-neutral-dark/70'}`}
              onClick={() => setActiveTab('insights')}
            >
              Premium Insights
              {activeTab === 'insights' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTab"
                />
              )}
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Overall Compatibility Color */}
            <div className={`p-4 rounded-lg border ${colorClass} mb-6 flex items-center`}>
              {colorIcon}
              <div className="ml-3">
                <p className="font-medium">
                  {profile.overallColor === 'green' 
                    ? 'High Compatibility Potential' 
                    : profile.overallColor === 'yellow' 
                      ? 'Moderate Compatibility Potential' 
                      : 'Challenging Compatibility Profile'}
                </p>
                <p className="text-sm">
                  {profile.description}
                </p>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="space-y-4">
              <h3 className="font-medium">Profile Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-neutral-50 p-3 rounded-md">
                  <p className="text-sm font-medium">Attachment Style</p>
                  <p className="text-sm capitalize">{profile.attachmentStyle}</p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-md">
                  <p className="text-sm font-medium">Personality Type</p>
                  <p className="text-sm">{profile.mbtiStyle}</p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-md">
                  <p className="text-sm font-medium">Overall Compatibility</p>
                  <p className="text-sm capitalize">{profile.overallColor}</p>
                </div>
              </div>
            </div>

            {/* Section Scores */}
            <div className="space-y-4">
              <h3 className="font-medium">Dimension Scores</h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(profile.sectionScores).map(([section, scoreValue]) => {
                  const score = scoreValue as number;
                  return (
                    <div key={section} className="bg-neutral-50 p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium capitalize">{section}</p>
                        <span className="text-sm font-medium">{Math.round(score)}%</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${scoreBarColor(score)} rounded-full`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-neutral-dark/70 mt-1">
                        {section === 'personality' && 'How you interact with the world (35% weight)'}
                        {section === 'emotional' && 'Your emotional intelligence skills (25% weight)'}
                        {section === 'values' && 'Your core values and beliefs (25% weight)'}
                        {section === 'physical' && 'Your physical and intimacy preferences (15% weight)'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Strengths & Challenges */}
            <div className="space-y-4">
              <h3 className="font-medium">Strengths & Challenges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-green-800 flex items-center mb-2">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    Your Relationship Strengths
                  </p>
                  <ul className="ml-6 text-sm list-disc text-green-800 space-y-2">
                    {profile.strengthsWeaknesses.strengths.map((strength, idx) => (
                      <li key={idx}>{strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-yellow-800 flex items-center mb-2">
                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                    Your Relationship Challenges
                  </p>
                  <ul className="ml-6 text-sm list-disc text-yellow-800 space-y-2">
                    {profile.strengthsWeaknesses.challenges.map((challenge, idx) => (
                      <li key={idx}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Personality Traits */}
            <div className="space-y-4">
              <h3 className="font-medium">Personality Traits (Big Five)</h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(profile.personalityTraits).map(([trait, score]) => (
                  <div key={trait} className="bg-neutral-50 p-3 rounded-md">
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium capitalize">{trait}</p>
                      <span className="text-sm font-medium">{score}%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${scoreBarColor(score)} rounded-full`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-neutral-dark/70 mt-1">
                      {trait === 'openness' && 'Your receptiveness to new experiences and ideas'}
                      {trait === 'conscientiousness' && 'Your level of organization and reliability'}
                      {trait === 'extraversion' && 'Your social energy and enthusiasm with others'}
                      {trait === 'agreeableness' && 'Your warmth and concern for social harmony'}
                      {trait === 'neuroticism' && 'Your emotional reactivity and stress response'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotional Intelligence */}
            <div className="space-y-4">
              <h3 className="font-medium">Emotional Intelligence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(profile.emotionalIntelligence).map(([ability, score]) => (
                  <div key={ability} className="bg-neutral-50 p-3 rounded-md">
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium capitalize">{ability.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <span className="text-sm font-medium">{score}%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${scoreBarColor(score)} rounded-full`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values */}
            <div className="space-y-4">
              <h3 className="font-medium">Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(profile.coreValues).map(([value, score]) => (
                  <div key={value} className="bg-neutral-50 p-3 rounded-md">
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium capitalize">{value}</p>
                      <span className="text-sm font-medium">{score}%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${scoreBarColor(score)} rounded-full`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compatibility Types */}
            <div className="space-y-4">
              <h3 className="font-medium">Compatibility Analysis</h3>
              
              <div className="border border-neutral-200 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center text-green-700">
                  <Heart className="h-4 w-4 mr-2 text-green-500" />
                  Most Compatible With:
                </h4>
                <ul className="ml-6 text-sm list-disc space-y-1">
                  {profile.compatibleTypes.mostCompatible.map((type, idx) => (
                    <li key={idx}>{type}</li>
                  ))}
                </ul>
                
                <h4 className="font-medium mt-4 mb-2 flex items-center text-yellow-700">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                  Challenging Matches:
                </h4>
                <ul className="ml-6 text-sm list-disc space-y-1">
                  {profile.compatibleTypes.challengingMatches.map((type, idx) => (
                    <li key={idx}>{type}</li>
                  ))}
                </ul>
                
                <p className="text-sm mt-4 text-neutral-dark/80">
                  <strong>Why:</strong> {profile.compatibleTypes.compatibilityRationale}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Insights Tab - Premium content from the content blocks */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* Growth Recommendation */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">What You Should Work On</h3>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-purple-800">
                  {profile.growthRecommendation}
                </p>
              </div>
            </div>
            
            {/* Ideal Partner */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Your Ideal Match</h3>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-blue-800">
                  {profile.idealPartnerSummary}
                </p>
              </div>
            </div>
            
            {/* Dating Experience */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Rocket className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Try This In Real Life</h3>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800">
                  {profile.datingExperience}
                </p>
              </div>
            </div>
            
            {/* Relationship Tips */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Actionable Relationship Tips</h3>
              </div>
              
              <div className="space-y-3">
                {profile.relationshipTips.slice(0, 5).map((tip, idx) => (
                  <div key={idx} className="flex items-start bg-neutral-50 p-3 rounded-md">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Compatibility Insights */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Deeper Compatibility Insights</h3>
              </div>
              
              <div className="space-y-3">
                {profile.compatibilityInsights.slice(0, 5).map((insight, idx) => (
                  <div key={idx} className="bg-neutral-50 p-3 rounded-md">
                    <p className="text-sm">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullReportView;