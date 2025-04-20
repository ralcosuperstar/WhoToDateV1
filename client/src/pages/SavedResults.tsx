import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { Loader2, BarChart4, AlertTriangle, CheckCircle2, XCircle, ArrowLeft, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import ReportSection from '@/components/report/ReportSection';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { reportService } from '@/services/reportService';
import type { CompatibilityProfile } from '@/lib/compatibilityAnalysis';

const SavedResults = () => {
  const [, navigate] = useLocation();
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Get the saved report from Supabase
  useEffect(() => {
    const loadSavedReport = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        setLoading(true);
        console.log('Looking for saved report for user:', user.id);
        
        const { report: reportData, error: reportError } = await reportService.getReport(user.id);
        
        if (reportError) {
          console.error('Error loading saved report:', reportError);
          setError(reportError);
          toast({
            title: 'Error',
            description: 'Could not load your saved report. Please try again.',
            variant: 'destructive',
          });
          return;
        }
        
        if (!reportData) {
          console.log('No saved report found for user');
          toast({
            title: 'No Report Found',
            description: 'We couldn\'t find a saved report for your account. Would you like to take the quiz?',
            action: (
              <Button variant="outline" size="sm" onClick={() => navigate('/quiz')}>
                Take Quiz
              </Button>
            ),
          });
          navigate('/quiz');
          return;
        }
        
        console.log('Saved report loaded successfully:', reportData);
        setReport(reportData);
      } catch (err) {
        console.error('Exception loading saved report:', err);
        setError(err instanceof Error ? err : new Error('Unknown error loading report'));
      } finally {
        setLoading(false);
      }
    };
    
    loadSavedReport();
  }, [user, navigate, toast]);
  
  if (loading) {
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-neutral-dark/70">Loading your saved compatibility profile...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !report) {
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center text-destructive">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Error Loading Report
              </CardTitle>
              <CardDescription>
                We couldn't retrieve your saved compatibility profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                There was a problem loading your saved report. This might be due to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>A temporary server issue</li>
                <li>Your session may need to be refreshed</li>
                <li>You haven't completed the compatibility assessment yet</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button variant="default" onClick={() => navigate('/quiz')}>
                  Take Assessment
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Refresh Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Get profile from report data
  const profile = report.report as CompatibilityProfile;
  const compatibilityColor = report.compatibility_color || profile?.overallColor || 'yellow';
  
  // Determine styling based on compatibility color
  const getColorStyling = (color: string) => {
    switch (color) {
      case 'green':
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
          bgClass: 'bg-emerald-50',
          borderClass: 'border-emerald-200',
          textClass: 'text-emerald-800'
        };
      case 'yellow':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
          bgClass: 'bg-amber-50',
          borderClass: 'border-amber-200',
          textClass: 'text-amber-800'
        };
      case 'red':
        return {
          icon: <XCircle className="h-5 w-5 text-rose-500" />,
          bgClass: 'bg-rose-50',
          borderClass: 'border-rose-200',
          textClass: 'text-rose-800'
        };
      default:
        return {
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
          bgClass: 'bg-amber-50',
          borderClass: 'border-amber-200',
          textClass: 'text-amber-800'
        };
    }
  };
  
  const styling = getColorStyling(compatibilityColor);
  
  return (
    <div className="pt-20 px-4 pb-12">
      <Helmet>
        <title>Your Compatibility Results | WhoToDate</title>
        <meta name="description" content="View your personalized compatibility profile and relationship insights." />
      </Helmet>
      
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Your Compatibility Profile</h1>
        </div>
        
        <div className="mb-6">
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Profile Summary</CardTitle>
              <CardDescription>
                Your compatibility assessment results from {new Date(report.created_at).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg ${styling.bgClass} ${styling.borderClass} border flex items-center mb-4`}>
                <div className="mr-3">
                  {styling.icon}
                </div>
                <div>
                  <p className={`font-medium ${styling.textClass}`}>
                    {compatibilityColor === 'green' 
                      ? 'Adaptable & Balanced Profile' 
                      : compatibilityColor === 'yellow' 
                        ? 'Selective & Specific Profile' 
                        : 'Particular & Defined Profile'}
                  </p>
                  <p className="text-sm">
                    {compatibilityColor === 'green' 
                      ? 'You have a balanced personality that adapts well to various relationship dynamics.' 
                      : compatibilityColor === 'yellow' 
                        ? 'You have specific preferences that make you compatible with certain personality types.' 
                        : 'You have particular relationship needs that require specific partner qualities.'}
                  </p>
                </div>
              </div>
              
              {profile && (
                <div className="space-y-4">
                  <p className="text-sm">
                    {profile.description}
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/quiz" className="flex items-center justify-center">
                        <BarChart4 className="h-4 w-4 mr-2" />
                        Retake Quiz
                      </Link>
                    </Button>
                    
                    {!report.is_paid && (
                      <Button asChild className="w-full">
                        <Link href="/payment" className="flex items-center justify-center">
                          <Unlock className="h-4 w-4 mr-2" />
                          Unlock Full Report
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {profile && (
          <div className="mb-6">
            <Tabs 
              defaultValue="overview" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="personality">Personality</TabsTrigger>
                <TabsTrigger value="relationships">Relationships</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <ReportSection title="Compatibility Summary">
                  <p className="mb-4">{profile.description}</p>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h4 className="font-medium mb-2">Key Personality Traits</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {profile.strengths?.slice(0, 3).map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                </ReportSection>
              </TabsContent>
              
              <TabsContent value="personality" className="space-y-4">
                <ReportSection title="Your Personality Profile">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                      <h4 className="font-medium mb-2">Your Strengths</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {profile.strengths?.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                      <h4 className="font-medium mb-2">Growth Areas</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {profile.growthAreas?.map((area, index) => (
                          <li key={index}>{area}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ReportSection>
                
                <ReportSection title="Attachment Style">
                  <p className="mb-4">
                    Your attachment style is primarily <strong>{profile.attachmentStyle}</strong>.
                  </p>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h4 className="font-medium mb-2">What This Means</h4>
                    <p className="mb-3">
                      {profile.attachmentStyle === 'secure' 
                        ? "You tend to form healthy emotional bonds with others. You're comfortable with intimacy and independence." 
                        : profile.attachmentStyle === 'anxious' 
                        ? "You seek closeness and may worry about your partner's commitment or feelings." 
                        : profile.attachmentStyle === 'avoidant' 
                        ? "You value independence and may find too much closeness uncomfortable." 
                        : "You may experience a mix of wanting closeness while being afraid of rejection."}
                    </p>
                  </div>
                </ReportSection>
              </TabsContent>
              
              <TabsContent value="relationships" className="space-y-4">
                <ReportSection title="Relationship Dynamics">
                  <p className="mb-4">
                    Based on your profile, here's how you tend to show up in relationships:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                      <h4 className="font-medium mb-2">Communication Style</h4>
                      <p>
                        {profile.communicationStyle === 'direct' 
                          ? "You communicate openly and directly, preferring straightforward conversations." 
                          : profile.communicationStyle === 'thoughtful' 
                          ? "You take time to process your thoughts before expressing them, offering considered responses." 
                          : profile.communicationStyle === 'emotional' 
                          ? "You express yourself with emotion and energy, sharing your feelings openly." 
                          : "You adapt your communication style based on the situation and who you're talking to."}
                      </p>
                    </div>
                    
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                      <h4 className="font-medium mb-2">Most Compatible With</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {profile.compatibleTypes?.mostCompatible?.map((type, index) => (
                          <li key={index}>{type}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ReportSection>
              </TabsContent>
            </Tabs>
            
            {/* Add Retake Quiz button */}
            <div className="mt-8 flex justify-center">
              <Link href="/quiz">
                <Button variant="outline" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Retake Quiz</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedResults;