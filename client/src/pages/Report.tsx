import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ReportSection from "@/components/report/ReportSection";
import CompatibilityCard from "@/components/report/CompatibilityCard";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";

const Report = () => {
  const [, navigate] = useLocation();
  
  // Check if user is authenticated
  const { data: user, isLoading: isUserLoading } = useQuery({ 
    queryKey: ['/api/me'],
    retry: false,
    refetchOnWindowFocus: false
  });
  
  // Check for report
  const { data: report, isLoading: isReportLoading } = useQuery({ 
    queryKey: ['/api/report'],
    enabled: !!user,
    retry: false
  });
  
  // Redirect if not authorized
  useEffect(() => {
    if (!isUserLoading && !isReportLoading) {
      if (!user) {
        navigate("/login?redirect=report");
      } else if (!report) {
        navigate("/quiz");
      } else if (!report.isPaid) {
        navigate("/payment");
      }
    }
  }, [user, report, isUserLoading, isReportLoading, navigate]);
  
  if (isUserLoading || isReportLoading) {
    return (
      <div className="min-h-screen bg-neutral-light pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user || !report || !report.isPaid) {
    return null; // Redirected by useEffect
  }
  
  const reportData = report.report;
  
  return (
    <>
      <Helmet>
        <title>Your Compatibility Report - MyDate</title>
        <meta name="description" content="View your detailed compatibility profile with insights into your personality traits, attachment style, and relationship preferences." />
        <meta name="robots" content="noindex" /> {/* Private content */}
      </Helmet>
      
      <div className="min-h-screen bg-neutral-light pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center mb-6">
                <div className="mb-4 md:mb-0 md:mr-6">
                  <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-heading font-bold text-2xl text-primary">
                      {user.fullName ? user.fullName.charAt(0) : user.username.charAt(0)}
                      {user.fullName 
                        ? user.fullName.split(' ')[1]?.charAt(0) || '' 
                        : ''}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h1 className="font-heading font-semibold text-2xl mb-1">
                    {user.fullName || user.username}'s Compatibility Report
                  </h1>
                  <div className="flex items-center mb-2">
                    <div className={`px-2 py-1 ${
                      report.compatibilityColor === 'green' 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : report.compatibilityColor === 'yellow'
                        ? 'bg-amber-500/10 text-amber-500'
                        : 'bg-red-500/10 text-red-500'
                    } text-sm rounded-full font-medium flex items-center`}>
                      <span className={`h-2 w-2 ${
                        report.compatibilityColor === 'green' 
                          ? 'bg-emerald-500' 
                          : report.compatibilityColor === 'yellow'
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      } rounded-full mr-1`}></span>
                      {report.compatibilityColor.charAt(0).toUpperCase() + report.compatibilityColor.slice(1)} Compatibility
                    </div>
                  </div>
                  <p className="text-sm text-neutral-dark/70">Report generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mb-8">
            <CompatibilityCard 
              color={report.compatibilityColor as 'green' | 'yellow' | 'red'}
              title={
                report.compatibilityColor === 'green' 
                  ? 'Adaptable & Balanced' 
                  : report.compatibilityColor === 'yellow'
                  ? 'Selective & Specific'
                  : 'Particular & Defined'
              }
              description={
                report.compatibilityColor === 'green' 
                  ? 'You have a flexible personality with balanced traits that help you adapt to various relationship dynamics. You\'re generally compatible with a wide range of personality types.' 
                  : report.compatibilityColor === 'yellow'
                  ? 'You have specific preferences in relationships and value certain traits over others. You thrive in relationships where key values and communication styles align.'
                  : 'You have well-defined preferences and values that are important to you in relationships. Your ideal match would share many of your core values and relationship approach.'
              }
            />
          </div>
          
          <div className="space-y-10">
            <ReportSection 
              title="Personality Overview" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              }
            >
              <div className="space-y-6">
                <p>
                  Based on your responses, you are a thoughtful, empathetic individual who values deep connections. 
                  Your personality combines elements of introspection with a desire for meaningful interactions.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-neutral-light rounded-lg p-4">
                    <h4 className="font-heading font-semibold mb-3">Big Five Traits</h4>
                    <div className="space-y-3">
                      {Object.entries(reportData.personalityTraits).map(([trait, score]) => (
                        <div key={trait}>
                          <div className="flex justify-between mb-1">
                            <span className="capitalize">{trait}</span>
                            <span>{score}%</span>
                          </div>
                          <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-neutral-light rounded-lg p-4">
                    <h4 className="font-heading font-semibold mb-3">MBTI Personality Type</h4>
                    <div className="text-center py-4">
                      <span className="text-primary font-heading font-bold text-3xl">{reportData.mbtiType}</span>
                      <p className="mt-2">
                        {reportData.mbtiType === 'INFJ' && "The Advocate - Idealistic, principled, and sensitive. You seek meaningful connections."}
                        {reportData.mbtiType === 'INTJ' && "The Architect - Strategic, logical, and independent. You value intellectual compatibility."}
                        {reportData.mbtiType === 'ENFP' && "The Campaigner - Enthusiastic, creative, and sociable. You seek authentic connections."}
                        {reportData.mbtiType === 'ISTJ' && "The Logistician - Practical, reliable, and traditional. You value loyalty and stability."}
                        {reportData.mbtiType === 'ESFJ' && "The Consul - Caring, social, and organized. You value harmony and close connections."}
                        {reportData.mbtiType === 'ENFJ' && "The Protagonist - Charismatic, inspiring, and empathetic. You value growth and harmony."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ReportSection>
            
            <ReportSection 
              title="Attachment Style" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              }
            >
              <div className="bg-neutral-light rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-1/3 text-center">
                    <div className={`inline-block px-4 py-2 rounded-full ${
                      reportData.attachmentStyle === 'secure' 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : reportData.attachmentStyle === 'anxious'
                        ? 'bg-amber-500/10 text-amber-500'
                        : 'bg-red-500/10 text-red-500'
                    } font-medium text-lg mb-2`}>
                      {reportData.attachmentStyle.charAt(0).toUpperCase() + reportData.attachmentStyle.slice(1)} Attachment
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <p>
                      {reportData.attachmentStyle === 'secure' && 
                        "You have a secure attachment style, which means you're comfortable with intimacy and independence. You trust others and communicate openly. This balanced approach allows you to form healthy, stable relationships."}
                      {reportData.attachmentStyle === 'anxious' && 
                        "You have an anxious attachment style, which means you may worry about rejection and seek frequent reassurance. You value closeness and emotional connection, sometimes fearing that partners don't reciprocate your feelings equally."}
                      {reportData.attachmentStyle === 'avoidant' && 
                        "You have an avoidant attachment style, which means you value independence and self-sufficiency. You may find it challenging to fully trust or depend on others and might create emotional distance in relationships."}
                      {reportData.attachmentStyle === 'fearful' && 
                        "You have a fearful attachment style, which combines aspects of both anxious and avoidant patterns. You desire close relationships but also fear getting hurt. This can create a push-pull dynamic in your connections."}
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-neutral-dark/10">
                      <h5 className="font-medium mb-2">How this affects your relationships:</h5>
                      <ul className="space-y-1">
                        {reportData.attachmentStyle === 'secure' && (
                          <>
                            <li className="flex items-start">
                              <span className="text-emerald-500 mr-2">•</span>
                              <span>You communicate needs and boundaries effectively</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-emerald-500 mr-2">•</span>
                              <span>You're comfortable with both intimacy and independence</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-emerald-500 mr-2">•</span>
                              <span>You trust partners and handle conflict constructively</span>
                            </li>
                          </>
                        )}
                        {reportData.attachmentStyle === 'anxious' && (
                          <>
                            <li className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              <span>You may seek frequent reassurance from partners</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              <span>You're sensitive to subtle changes in relationships</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              <span>You may worry about abandonment or rejection</span>
                            </li>
                          </>
                        )}
                        {reportData.attachmentStyle === 'avoidant' && (
                          <>
                            <li className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              <span>You value your independence and personal space</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              <span>You may find it difficult to fully open up emotionally</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              <span>You might create distance when relationships get too intense</span>
                            </li>
                          </>
                        )}
                        {reportData.attachmentStyle === 'fearful' && (
                          <>
                            <li className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              <span>You desire close connections but fear getting hurt</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              <span>You may experience conflicting impulses to seek and avoid intimacy</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              <span>You might struggle with trust and vulnerability</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ReportSection>
            
            <ReportSection 
              title="Emotional Intelligence" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              }
            >
              <p className="mb-4">
                Your emotional intelligence (EQ) score reflects your ability to recognize, understand, and manage emotions in yourself and others. This is crucial for relationship success.
              </p>
              
              <div className="space-y-4">
                {Object.entries(reportData.emotionalIntelligence).map(([trait, score]) => (
                  <div key={trait}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize">{trait.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span>{score}%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <h5 className="font-medium mb-2">Your EQ Strengths</h5>
                <p>
                  Your emotional intelligence profile shows particular strength in motivation and self-awareness. 
                  This means you understand your own emotions well and are driven to improve your relationships. 
                  These qualities help you navigate relationship challenges effectively and communicate your needs clearly.
                </p>
              </div>
            </ReportSection>
            
            <ReportSection 
              title="Compatibility Insights" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              }
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-neutral-light rounded-lg p-4">
                  <h4 className="font-heading font-semibold mb-3">Your Relationship Strengths</h4>
                  <ul className="space-y-3">
                    {reportData.compatibilityDetails.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-500 mt-0.5 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <div>
                          <span className="font-medium">{strength}</span>
                          <p className="text-sm text-neutral-dark/80">
                            {strength === 'Empathy' && 'You understand others\' feelings and perspectives well.'}
                            {strength === 'Communication' && 'You express yourself clearly and listen attentively.'}
                            {strength === 'Loyalty' && 'You value commitment and are dedicated to your relationships.'}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-neutral-light rounded-lg p-4">
                  <h4 className="font-heading font-semibold mb-3">Growth Areas</h4>
                  <ul className="space-y-3">
                    {reportData.compatibilityDetails.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-500 mt-0.5 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <div>
                          <span className="font-medium">{challenge}</span>
                          <p className="text-sm text-neutral-dark/80">
                            {challenge === 'Patience' && 'You may benefit from developing more patience in challenging situations.'}
                            {challenge === 'Flexibility' && 'Being more adaptable to change could strengthen your relationships.'}
                            {challenge === 'Trust' && 'Learning to trust more easily may help deepen your connections.'}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-neutral-light rounded-lg p-4">
                <h4 className="font-heading font-semibold mb-3">Most Compatible With</h4>
                <p className="mb-4">Based on your profile, you tend to form strong connections with people who are:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {reportData.compatibilityDetails.idealPartner.map((trait, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg text-center">
                      <span className="font-medium">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ReportSection>
            
            <ReportSection 
              title="Growth Recommendation" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              <div className="bg-neutral-light rounded-lg p-6">
                <h4 className="font-heading font-semibold text-lg mb-3">What You Should Work On</h4>
                <p className="mb-2">
                  {reportData.growthRecommendation || "Focus on developing greater self-awareness in your relationships and communication patterns. Notice how your emotions affect your interactions with potential partners."}
                </p>
                <div className="pt-4 border-t border-neutral-dark/10 mt-4 text-sm text-neutral-dark/70">
                  Everyone has growth areas—identifying yours is a sign of emotional intelligence and maturity.
                </div>
              </div>
            </ReportSection>
            
            <ReportSection 
              title="Ideal Partner Summary" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              }
            >
              <div className="bg-neutral-light rounded-lg p-6">
                <h4 className="font-heading font-semibold text-lg mb-3">Your Ideal Match</h4>
                <p className="mb-2">
                  {reportData.idealPartnerSummary || "Your compatibility profile suggests you'd thrive with someone who balances emotional openness with respect for boundaries. Look for shared core values and complementary communication styles."}
                </p>
                <div className="pt-4 border-t border-neutral-dark/10 mt-4 text-sm text-neutral-dark/70">
                  Understanding who you're most compatible with can help you recognize valuable connections when they appear.
                </div>
              </div>
            </ReportSection>
            
            <ReportSection 
              title="Real-Life Experiences to Try" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              }
            >
              <div className="bg-neutral-light rounded-lg p-6">
                <h4 className="font-heading font-semibold text-lg mb-3">Try This In Real Life</h4>
                <p className="mb-2">
                  {reportData.datingExperience || "On your next date, focus more on asking thoughtful questions that reveal values and emotional intelligence. Listen actively for alignment with your core needs rather than just surface-level compatibility."}
                </p>
                <div className="pt-4 border-t border-neutral-dark/10 mt-4 text-sm text-neutral-dark/70">
                  Small changes in your approach to dating can lead to significantly better experiences and connections.
                </div>
              </div>
            </ReportSection>
            
            <ReportSection 
              title="Interactive Analytics" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              }
            >
              <div className="space-y-4">
                <p>
                  Explore your compatibility profile in detail with interactive charts and visualizations.
                  These analytics provide deeper insights into your personality traits, attachment style, and relationship preferences.
                </p>
                
                <AnalyticsDashboard report={reportData} />
              </div>
            </ReportSection>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
              <Button asChild>
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/analytics">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                  <span>Advanced Analytics</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
