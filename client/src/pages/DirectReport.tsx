import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSupabase } from "@/contexts/NewSupabaseContext";
import { Link } from "wouter";
import { calculateCompatibilityProfile, type CompatibilityProfile } from "@/lib/compatibilityAnalysis";
import FullReportView from "@/components/reports/FullReportView";
import { Download, ArrowRight, Share2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadPDFReport } from "@/lib/pdfGenerator";
import supabaseService from "@/services/supabaseService";

const DirectReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<CompatibilityProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoading: isUserLoading, signIn } = useSupabase();
  const { toast } = useToast();

  useEffect(() => {
    const loadReport = async () => {
      console.log("DirectReport effect running, isUserLoading:", isUserLoading, "user:", user ? "logged in" : "not logged in");
      
      // Exit early if user data is still loading
      if (isUserLoading) {
        console.log("User data still loading, returning early");
        return;
      }
      
      // Handle case where user is not logged in
      if (!user) {
        console.log("No user found, showing login prompt");
        setIsLoading(false);
        setError("User not authenticated");
        return;
      }

      try {
        setIsLoading(true);

        // Get Supabase client
        const supabase = await supabaseService.auth.getClient();
        
        // First check if we have a report
        console.log("Checking for existing report for user:", user.id);
        const report = await supabaseService.report.getReportByUserId(supabase, user.id);
        
        if (report && report.report) {
          console.log("Found existing report, loading it");
          setProfile(report.report as CompatibilityProfile);
          setIsLoading(false);
          return;
        }
        
        // No report, get quiz answers
        console.log("No report found, checking quiz answers");
        const quizAnswers = await supabaseService.quiz.getQuizAnswers(supabase, user.id);
        
        if (!quizAnswers || !quizAnswers.answers) {
          setError("No quiz answers found. Please take the quiz first.");
          setIsLoading(false);
          return;
        }
        
        console.log("Found quiz answers, generating profile");
        // Cast answers to Record<number, number> to fix type error
        const answers = quizAnswers.answers as Record<number, number>;
        const compatibilityProfile = calculateCompatibilityProfile(answers);
        setProfile(compatibilityProfile);
        
        // Create a report if we don't have one yet
        console.log("Creating report from calculated profile");
        await supabaseService.report.createReport(supabase, {
          userId: user.id,
          quizId: quizAnswers.id,
          report: compatibilityProfile,
          compatibilityColor: compatibilityProfile.overallColor,
          isPaid: true // All reports are free
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading report:", error);
        setError("Failed to load your report data. Please try again.");
        setIsLoading(false);
      }
    };

    loadReport();
  }, [user, isUserLoading]);

  // Show loading state
  if (isUserLoading || isLoading) {
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-dark/70">Loading your report...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !user) {
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white rounded-lg shadow-md border border-neutral-200 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {error || "Please log in to view your report"}
            </h2>
            <p className="text-center mb-6">
              {!user ? "You need to be logged in to access your compatibility report." : 
               "We couldn't load your report data."}
            </p>
            <div className="flex justify-center space-x-4">
              {!user ? (
                <>
                  <Link href="/auth">
                    <button className="py-3 px-5 bg-primary text-white font-medium rounded-lg">
                      Log In or Sign Up
                    </button>
                  </Link>
                  <button 
                    onClick={async () => {
                      try {
                        await signIn("udasirajat@gmail.com", "password123");
                        window.location.reload(); // Force reload after login
                      } catch (error) {
                        console.error("Quick login failed:", error);
                      }
                    }}
                    className="py-3 px-5 border border-primary text-primary font-medium rounded-lg"
                  >
                    Quick Demo Login
                  </button>
                </>
              ) : (
                <Link href="/quiz">
                  <button className="py-3 px-5 bg-primary text-white font-medium rounded-lg">
                    Take the Quiz
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading if profile not available
  if (!profile) {
    return (
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-dark/70">Preparing your report...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show profile view
  return (
    <div className="pt-20 px-4 pb-12 bg-neutral-50 min-h-screen">
      <Helmet>
        <title>Your Compatibility Report | WhoToDate</title>
        <meta 
          name="description" 
          content="View your personalized compatibility profile with insights, strengths, challenges, and guidance for better relationships." 
        />
      </Helmet>
      
      <div className="container mx-auto max-w-2xl">
        <div>
          <FullReportView profile={profile} />
          <div className="mt-8 space-y-4">
            {/* Download PDF Button */}
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => downloadPDFReport(profile)}
                className="py-3 px-5 bg-primary text-white font-medium rounded-lg flex items-center justify-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Download PDF Report
              </button>
              
              <Link href="/quiz">
                <button
                  className="py-3 px-5 border border-primary text-primary bg-white font-medium rounded-lg flex items-center justify-center hover:bg-primary/5"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Retake Quiz
                </button>
              </Link>
            </div>
            
            {/* Share and Refer Buttons */}
            <div className="flex flex-col md:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  // Create a personalized share message based on the profile
                  const strengthText = profile.strengthsWeaknesses.strengths[0] || "";
                  const challengeText = profile.strengthsWeaknesses.challenges[0] || "";
                  
                  const shareText = `I just took the WhoToDate compatibility assessment! It says my relationship strength is "${strengthText}" and I should work on "${challengeText}". This free tool helps you understand what kind of relationships suit you best. Try it yourself at: ${window.location.origin}`;
                  
                  // Share via WhatsApp if on mobile, otherwise copy to clipboard
                  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    // Mobile device - open WhatsApp
                    window.open(`whatsapp://send?text=${encodeURIComponent(shareText)}`);
                  } else {
                    // Desktop - copy to clipboard
                    navigator.clipboard.writeText(shareText).then(() => {
                      toast({
                        title: "Share message copied!",
                        description: "Paste and share with your friends",
                      });
                    });
                  }
                }}
                className="py-2 px-4 bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Results
              </button>
              
              <button
                onClick={() => {
                  // Create a personalized message based on profile
                  const subject = `My ${profile.overallColor} compatibility profile from WhoToDate!`;
                  
                  // Get a tip to share
                  const randomTip = profile.relationshipTips[Math.floor(Math.random() * profile.relationshipTips.length)] || "Understanding your relationship style helps find better matches";
                  
                  const body = `Hey! I just discovered my relationship compatibility type on WhoToDate. 
                  
My profile says I'm a ${profile.attachmentStyle} attachment style with ${profile.mbtiStyle} personality type. One relationship tip I got was: "${randomTip}"

This free tool gives you insights into your relationship patterns and helps you understand what kind of relationships will suit you best. It takes about 5 minutes to complete.

Try it yourself at: ${window.location.origin}`;
                  
                  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
                className="py-2 px-4 bg-green-600 text-white font-medium rounded-lg flex items-center justify-center"
              >
                <Users className="h-4 w-4 mr-2" />
                Email to a Friend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectReport;