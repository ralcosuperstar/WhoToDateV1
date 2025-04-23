import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { calculateCompatibilityProfile, type CompatibilityProfile } from "@/lib/compatibilityAnalysis";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { 
  Download, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ChevronRight, 
  BarChart4,
  Heart, 
  Send, 
  ArrowRight
} from "lucide-react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useSupabaseDb } from "@/contexts/SupabaseDbContext";
import { Loader2 } from "lucide-react";

const ResultsPage = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user } = useSupabase();
  const { quiz, report } = useSupabaseDb();
  
  // State
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [profile, setProfile] = useState<CompatibilityProfile | null>(null);
  const [isFullReportVisible, setIsFullReportVisible] = useState(false);
  
  // Load answers from session storage or from quiz data
  useEffect(() => {
    // First try to get answers from quiz data
    if (quiz.data && quiz.data.answers) {
      setAnswers(quiz.data.answers);
    } else {
      // If no quiz data, try to get answers from session storage
      const savedAnswers = sessionStorage.getItem('quizAnswers');
      if (savedAnswers) {
        try {
          const parsedAnswers = JSON.parse(savedAnswers);
          setAnswers(parsedAnswers);
        } catch (e) {
          console.error('Failed to parse saved answers', e);
          navigate('/quiz');
        }
      } else if (!user) {
        // If no answers and no user, redirect to quiz
        navigate('/quiz');
      }
    }
  }, [navigate, user, quiz.data]);
  
  // Generate profile when answers are available
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      try {
        const compatibilityProfile = calculateCompatibilityProfile(answers);
        
        // Add extra properties needed for the UI display
        const enhancedProfile = {
          ...compatibilityProfile,
          // Adding necessary UI display properties
          attachmentDescription: getAttachmentDescription(compatibilityProfile.attachmentStyle),
          mbtiDescription: getMbtiDescription(compatibilityProfile.mbtiStyle),
          strengths: getStrengthsList(compatibilityProfile),
          challenges: getChallengesList(compatibilityProfile),
          growthTips: getGrowthTips(compatibilityProfile),
          mostCompatible: getMostCompatibleTypes(compatibilityProfile),
          leastCompatible: getLeastCompatibleTypes(compatibilityProfile),
          datingAdvice: getDatingAdvice(compatibilityProfile),
          datingTips: getDatingTips(compatibilityProfile)
        };
        
        setProfile(enhancedProfile);
        
        // Create report if needed
        if (user && !report.data && compatibilityProfile && quiz.data) {
          report.create({
            quizId: quiz.data.id,
            compatibilityProfile: enhancedProfile,
            isPaid: false
          });
        }
      } catch (e) {
        console.error('Failed to calculate profile', e);
        toast({
          title: "Error",
          description: "Failed to calculate your compatibility profile. Please retake the quiz.",
          variant: "destructive",
        });
        navigate('/quiz');
      }
    }
  }, [answers, user, report, quiz.data, navigate, toast]);
  
  // Helper functions to generate UI content
  const getAttachmentDescription = (style: string): string => {
    switch(style) {
      case 'secure':
        return 'You form stable and trusting bonds with others. You're comfortable with intimacy and independence.';
      case 'anxious':
        return 'You seek close connections but may worry about abandonment. You value emotional closeness.';
      case 'avoidant':
        return 'You value independence and may find it challenging to fully open up emotionally.';
      case 'fearful':
        return 'You desire close relationships but find them difficult to trust and maintain.';
      default:
        return 'Your attachment pattern influences how you form emotional bonds in relationships.';
    }
  };
  
  const getMbtiDescription = (type: string): string => {
    // This would ideally be a full description for each type
    return `Your ${type} personality type shapes your communication style and how you process information.`;
  };
  
  const getStrengthsList = (profile: CompatibilityProfile): string[] => {
    const strengths: string[] = [];
    
    // Generate strengths based on personality traits
    if (profile.personalityTraits.openness > 70) {
      strengths.push('Open to new experiences and perspectives');
    }
    if (profile.personalityTraits.conscientiousness > 70) {
      strengths.push('Reliable and organized in your approach to relationships');
    }
    if (profile.personalityTraits.extraversion > 70) {
      strengths.push('Socially engaging and energetic in relationships');
    }
    if (profile.personalityTraits.agreeableness > 70) {
      strengths.push('Compassionate and considerate of others');
    }
    if (profile.personalityTraits.neuroticism < 40) {
      strengths.push('Emotionally stable and resilient under stress');
    }
    
    // Add attachment-based strengths
    if (profile.attachmentStyle === 'secure') {
      strengths.push('Able to form healthy, balanced relationships');
      strengths.push('Comfortable with both intimacy and independence');
    }
    
    // Add strengths based on emotional intelligence
    if (profile.emotionalIntelligence.empathy > 70) {
      strengths.push("Strong ability to understand others' feelings and perspectives");
    }
    
    return strengths.length > 0 ? strengths : ['Discovering your relationship strengths through self-awareness'];
  };
  
  const getChallengesList = (profile: CompatibilityProfile): string[] => {
    const challenges = [];
    
    // Generate challenges based on personality traits
    if (profile.personalityTraits.openness < 30) {
      challenges.push('May resist change or new relationship experiences');
    }
    if (profile.personalityTraits.conscientiousness < 30) {
      challenges.push('May struggle with relationship consistency or reliability');
    }
    if (profile.personalityTraits.agreeableness < 30) {
      challenges.push('May find it difficult to compromise in relationships');
    }
    if (profile.personalityTraits.neuroticism > 70) {
      challenges.push('May experience heightened emotional reactions to relationship stress');
    }
    
    // Add attachment-based challenges
    if (profile.attachmentStyle === 'anxious') {
      challenges.push('May worry about abandonment or rejection');
    } else if (profile.attachmentStyle === 'avoidant') {
      challenges.push('May struggle with emotional vulnerability and intimacy');
    } else if (profile.attachmentStyle === 'fearful') {
      challenges.push('May have conflicting desires for closeness and distance');
    }
    
    return challenges.length > 0 ? challenges : ['Working through relationship patterns requires ongoing reflection'];
  };
  
  const getGrowthTips = (profile: CompatibilityProfile): string[] => {
    const tips = [];
    
    // Add tips based on personality traits
    if (profile.personalityTraits.openness < 50) {
      tips.push('Try new experiences with your partner to broaden your perspectives');
    }
    if (profile.personalityTraits.conscientiousness < 50) {
      tips.push('Develop consistent relationship habits that build trust');
    }
    if (profile.personalityTraits.extraversion < 50) {
      tips.push('Balance your need for solitude with quality time together');
    }
    if (profile.personalityTraits.agreeableness < 50) {
      tips.push('Practice active listening and validating your partner's feelings');
    }
    if (profile.personalityTraits.neuroticism > 50) {
      tips.push('Develop emotional regulation techniques for relationship stress');
    }
    
    // Add attachment-based growth tips
    if (profile.attachmentStyle === 'anxious') {
      tips.push('Work on self-validation rather than seeking constant reassurance');
    } else if (profile.attachmentStyle === 'avoidant') {
      tips.push('Practice gradual emotional vulnerability in safe relationships');
    } else if (profile.attachmentStyle === 'fearful') {
      tips.push('Seek consistency and clarity in your relationship boundaries');
    }
    
    return tips.length > 0 ? tips : ['Focus on self-awareness and honest communication in relationships'];
  };
  
  const getMostCompatibleTypes = (profile: CompatibilityProfile): string[] => {
    // This would be based on a more complex compatibility algorithm
    // Here we're providing a simplified example
    if (profile.attachmentStyle === 'secure') {
      return ['People with secure attachment styles', 'Those who value honest communication', 'Partners who respect boundaries'];
    } else if (profile.attachmentStyle === 'anxious') {
      return ['Secure individuals who provide consistency', 'Partners who express affection openly', 'Those who value emotional connection'];
    } else if (profile.attachmentStyle === 'avoidant') {
      return ['Those who respect your independence', 'Partners who are patient with emotional pacing', 'People who communicate directly'];
    } else {
      return ['Secure, consistent partners', 'Those who practice healthy communication', 'People who are emotionally mature'];
    }
  };
  
  const getLeastCompatibleTypes = (profile: CompatibilityProfile): string[] => {
    // This would be based on a more complex compatibility algorithm
    // Here we're providing a simplified example
    if (profile.attachmentStyle === 'secure') {
      return ['Highly unstable relationship patterns', 'Inconsistent communication styles', 'Those unwilling to work on relationships'];
    } else if (profile.attachmentStyle === 'anxious') {
      return ['Highly avoidant individuals', 'Those uncomfortable with emotional expression', 'Partners who are inconsistent or unpredictable'];
    } else if (profile.attachmentStyle === 'avoidant') {
      return ['Highly anxious individuals seeking constant reassurance', 'Those who don't respect personal space', 'Partners who are emotionally demanding'];
    } else {
      return ['Unstable or unpredictable relationship patterns', 'Those with poor communication skills', 'Partners who don't respect boundaries'];
    }
  };
  
  const getDatingAdvice = (profile: CompatibilityProfile): string => {
    // Provide dating advice based on attachment style
    if (profile.attachmentStyle === 'secure') {
      return 'Your secure attachment style positions you well for healthy relationships. Look for partners who also demonstrate emotional stability, clear communication, and respect for boundaries.';
    } else if (profile.attachmentStyle === 'anxious') {
      return 'You value connection and closeness. Focus on developing self-validation and choose partners who are consistent, communicative, and emotionally available.';
    } else if (profile.attachmentStyle === 'avoidant') {
      return 'You value independence which is healthy, but relationships also require connection. Seek partners who respect your space while gently encouraging emotional openness.';
    } else {
      return 'Building relationship security takes time. Focus on clear communication, consistent boundaries, and partners who demonstrate emotional maturity and stability.';
    }
  };
  
  const getDatingTips = (profile: CompatibilityProfile): string[] => {
    const tips = [];
    
    // General tips for everyone
    tips.push('Be authentic rather than trying to present an idealized version of yourself');
    tips.push('Pay attention to how potential partners treat others, not just you');
    tips.push('Notice how you feel after spending time with someone—energized or drained');
    
    // Add attachment-specific tips
    if (profile.attachmentStyle === 'anxious') {
      tips.push('Take time to evaluate new relationships rather than rushing in');
      tips.push('Notice if you're compromising your values to maintain a connection');
    } else if (profile.attachmentStyle === 'avoidant') {
      tips.push('Be mindful if you're finding reasons to end promising relationships');
      tips.push('Practice sharing your thoughts and feelings gradually');
    } else if (profile.attachmentStyle === 'fearful') {
      tips.push('Start with friendship to build trust before romantic involvement');
      tips.push('Consider professional support to work through relationship patterns');
    }
    
    return tips;
  };
  
  // Handle "Get Full Report" button click
  const handleGetFullReport = () => {
    setIsFullReportVisible(true);
  };

  // Loading state
  if (quiz.isLoading || report.isLoading) {
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-neutral-dark">Loading your results...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (quiz.error || report.error) {
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-neutral-dark mb-6">
              We couldn't load your results. Please try retaking the quiz.
            </p>
            <button 
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg"
              onClick={() => navigate('/quiz')}
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // No profile state
  if (!profile) {
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No profile found</h2>
            <p className="text-neutral-dark mb-6">
              We couldn't find your compatibility profile. Please try retaking the quiz.
            </p>
            <button 
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg"
              onClick={() => navigate('/quiz')}
            >
              Take Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-20 px-4 pb-12">
      <Helmet>
        <title>Your Compatibility Results | WhoToDate</title>
        <meta name="description" content="View your personalized compatibility profile based on your quiz answers." />
      </Helmet>
      
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Your Compatibility Results</h1>
          <p className="text-neutral-dark/70">
            Based on your assessment, here's your personalized compatibility profile
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - if full report visible, this takes up 1/3 of screen */}
          <div className={isFullReportVisible ? "lg:col-span-1" : "lg:col-span-2 lg:mx-auto"}>
            <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden mb-6">
              <div className="p-6">
                <div className="text-center mb-8">
                  <span className="inline-block bg-primary/10 text-primary rounded-full p-3 mb-3">
                    <BarChart4 className="h-6 w-6" />
                  </span>
                  <h2 className="text-2xl font-bold mb-2">Your Compatibility Profile</h2>
                  <p className="text-neutral-dark/70">
                    {isFullReportVisible 
                      ? "Summary of your compatibility profile" 
                      : "Here's a free preview of your personalized compatibility profile"}
                  </p>
                </div>
                
                {/* Overall Compatibility Color */}
                <div className={`p-4 rounded-lg border mb-6 flex items-center ${
                  profile.overallColor === 'green' 
                    ? 'bg-green-50 text-green-800 border-green-200' 
                    : profile.overallColor === 'yellow' 
                      ? 'bg-yellow-50 text-yellow-800 border-yellow-200' 
                      : 'bg-red-50 text-red-800 border-red-200'
                }`}>
                  {profile.overallColor === 'green' 
                    ? <CheckCircle2 className="h-5 w-5 text-green-500" /> 
                    : profile.overallColor === 'yellow' 
                      ? <AlertTriangle className="h-5 w-5 text-yellow-500" /> 
                      : <XCircle className="h-5 w-5 text-red-500" />}
                  <div className="ml-3">
                    <p className="font-medium">
                      {profile.overallColor === 'green' 
                        ? 'High Compatibility Potential' 
                        : profile.overallColor === 'yellow' 
                          ? 'Moderate Compatibility Potential' 
                          : 'Challenging Compatibility Profile'}
                    </p>
                    <p className="text-sm">
                      {profile.overallColor === 'green' 
                        ? 'You have many qualities that contribute to healthy relationships.' 
                        : profile.overallColor === 'yellow' 
                          ? 'You have a mix of strengths and growth areas in relationships.' 
                          : 'You have significant patterns that may create challenges in relationships.'}
                    </p>
                  </div>
                </div>
                
                {/* Section Scores */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-sm uppercase tracking-wide text-neutral-dark/70">
                    Dimension Scores
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(profile.sectionScores).map(([section, scoreValue]) => {
                      const score = scoreValue as number;
                      return (
                        <div key={section} className="bg-neutral-50 p-3 rounded-md">
                          <p className="text-sm font-medium capitalize">{section}</p>
                          <div className="flex items-center mt-1">
                            <div className="h-2 flex-grow bg-neutral-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${score}%` }}
                              ></div>
                            </div>
                            <span className="text-xs ml-2 font-medium">{Math.round(score)}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Key Profile Insights */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-sm uppercase tracking-wide text-neutral-dark/70">
                    Key Insights
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-neutral-50 p-3 rounded-md">
                      <p className="text-sm font-medium">Attachment Style</p>
                      <p className="text-sm capitalize">{profile.attachmentStyle}</p>
                    </div>
                    <div className="bg-neutral-50 p-3 rounded-md">
                      <p className="text-sm font-medium">Personality Type</p>
                      <p className="text-sm">{profile.mbtiStyle}</p>
                    </div>
                  </div>
                </div>
                
                {/* Access full report section - only show if not viewing full report */}
                {!isFullReportVisible && (
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-5 mb-6">
                    <div className="flex items-start">
                      <div className="rounded-full bg-blue-500/10 p-2 mr-3 mt-1">
                        <BarChart4 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Access Your Full Report</h3>
                        <p className="text-sm opacity-80 mb-4">
                          Get complete insights, relationship tips, and all compatibility details that can help you understand yourself better.
                        </p>
                        <ul className="space-y-2 mb-4">
                          <li className="flex text-sm items-start">
                            <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>All personality dimensions</span>
                          </li>
                          <li className="flex text-sm items-start">
                            <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Personal growth recommendations</span>
                          </li>
                          <li className="flex text-sm items-start">
                            <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Ideal partner insights</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <motion.button
                      className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center"
                      onClick={handleGetFullReport}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <BarChart4 className="h-5 w-5 mr-2" />
                      View My Full Report
                    </motion.button>
                  </div>
                )}
                
                {/* Share and links */}
                <div className="flex flex-col space-y-3">
                  <button 
                    className="py-2 px-4 text-center text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 rounded-lg flex items-center justify-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Share Your Results
                  </button>
                  
                  <button 
                    className="py-2 px-4 text-center text-neutral-dark border border-neutral-200 hover:bg-neutral-50 rounded-lg flex items-center justify-center"
                    onClick={() => navigate('/quiz')}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Retake Assessment
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Full Report */}
          {isFullReportVisible && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
                <div className="p-6">
                  <div className="text-center mb-8">
                    <span className="inline-block bg-primary/10 text-primary rounded-full p-3 mb-3">
                      <ChevronRight className="h-6 w-6" />
                    </span>
                    <h2 className="text-2xl font-bold mb-2">Your Full Compatibility Report</h2>
                    <p className="text-neutral-dark/70">
                      Detailed insights to help you understand your relationship patterns
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Profile Summary */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-primary">Overall Profile</h3>
                      <p className="mb-4">{profile.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-neutral-50 rounded-lg p-4">
                          <h4 className="font-medium mb-2">Attachment Style</h4>
                          <p className="text-sm capitalize mb-1">{profile.attachmentStyle}</p>
                          <p className="text-sm text-neutral-dark/70">{profile.attachmentDescription}</p>
                        </div>
                        
                        <div className="bg-neutral-50 rounded-lg p-4">
                          <h4 className="font-medium mb-2">Personality Type</h4>
                          <p className="text-sm mb-1">{profile.mbtiStyle}</p>
                          <p className="text-sm text-neutral-dark/70">{profile.mbtiDescription}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Relationship Strengths */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-green-600">Your Relationship Strengths</h3>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <ul className="space-y-2">
                          {profile.strengths.map((strength, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Relationship Challenges */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-yellow-600">Your Relationship Challenges</h3>
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                        <ul className="space-y-2">
                          {profile.challenges.map((challenge, idx) => (
                            <li key={idx} className="flex items-start">
                              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Growth Recommendations */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-purple-600">Growth Recommendations</h3>
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                        <p className="mb-4">{profile.growthRecommendation}</p>
                        
                        <h4 className="font-medium mb-2">Practical Tips</h4>
                        <ul className="space-y-2">
                          {profile.growthTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="h-5 w-5 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 mr-2 mt-0.5 flex-shrink-0">
                                {idx + 1}
                              </div>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Compatibility */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-blue-600">Compatibility Insights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                          <h4 className="font-medium mb-2 flex items-center">
                            <Heart className="h-5 w-5 text-blue-500 mr-2" />
                            Most Compatible With
                          </h4>
                          <ul className="space-y-2">
                            {profile.mostCompatible.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="h-5 w-5 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 mr-2 mt-0.5 flex-shrink-0">
                                  {idx + 1}
                                </div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                          <h4 className="font-medium mb-2 flex items-center">
                            <AlertTriangle className="h-5 w-5 text-blue-500 mr-2" />
                            Potential Challenges With
                          </h4>
                          <ul className="space-y-2">
                            {profile.leastCompatible.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="h-5 w-5 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 mr-2 mt-0.5 flex-shrink-0">
                                  {idx + 1}
                                </div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dating Advice */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-red-600">Dating Advice</h3>
                      <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                        <p className="mb-4">{profile.datingAdvice}</p>
                        
                        <h4 className="font-medium mb-2">Dating Tips</h4>
                        <ul className="space-y-2">
                          {profile.datingTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="h-5 w-5 bg-red-200 rounded-full flex items-center justify-center text-red-700 mr-2 mt-0.5 flex-shrink-0">
                                {idx + 1}
                              </div>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Download and Share */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="flex-1 py-3 px-4 bg-neutral-800 text-white font-medium rounded-lg flex items-center justify-center">
                        <Download className="h-5 w-5 mr-2" />
                        Download as PDF
                      </button>
                      
                      <button className="flex-1 py-3 px-4 bg-primary text-white font-medium rounded-lg flex items-center justify-center">
                        <Send className="h-5 w-5 mr-2" />
                        Share Results
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;