import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Download, Share2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReportSection from "@/components/report/ReportSection";
import CompatibilityCard from "@/components/report/CompatibilityCard";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import PersonalityTraitCards from "@/components/report/PersonalityTraitCards";
import StrengthsAndChallenges from "@/components/report/StrengthsAndChallenges";
import CompatibilityTypeCards from "@/components/report/CompatibilityTypeCards";
import TipsAndInsights from "@/components/report/TipsAndInsights";
import InteractiveMetric from "@/components/report/InteractiveMetric";

const ReportImproved = () => {
  const [, navigate] = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "overview", "personality", "attachment"
  ]);

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter(s => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };
  
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
      }
      // Removed isPaid check since reports are now free
    }
  }, [user, report, isUserLoading, isReportLoading, navigate]);
  
  if (isUserLoading || isReportLoading) {
    return (
      <div className="min-h-screen bg-neutral-light pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user || !report) {
    return null; // Redirected by useEffect
  }
  
  const reportData = report.report || {};
  
  return (
    <>
      <Helmet>
        <title>Your Compatibility Report - WhoToDate</title>
        <meta name="description" content="View your detailed compatibility profile with insights into your personality traits, attachment style, and relationship preferences." />
        <meta name="robots" content="noindex" /> {/* Private content */}
      </Helmet>
      
      <div className="min-h-screen bg-neutral-light pt-20 pb-16 px-4">
        {/* Header */}
        <motion.div 
          className="container mx-auto max-w-4xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <Card className="mb-6 overflow-hidden shadow-lg border-0">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-primary/80 to-primary p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-20 w-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-inner">
                      <span className="font-heading font-bold text-2xl text-white">
                        {user.fullName ? user.fullName.charAt(0) : user.username.charAt(0)}
                        {user.fullName ? user.fullName.split(' ')[1]?.charAt(0) || '' : ''}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h1 className="font-heading font-semibold text-2xl md:text-3xl mb-2">
                      {user.fullName || user.username}'s Compatibility Profile
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium flex items-center">
                        <span className={`h-2 w-2 ${
                          report.compatibilityColor === 'green' ? 'bg-emerald-400' : 
                          report.compatibilityColor === 'yellow' ? 'bg-amber-400' : 'bg-rose-400'
                        } rounded-full mr-2`}></span>
                        {report.compatibilityColor?.charAt(0).toUpperCase() + report.compatibilityColor?.slice(1) || "Green"} Compatibility
                      </div>
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium flex items-center">
                        {reportData.mbtiType || "INFJ"} Personality
                      </div>
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium flex items-center">
                        {reportData.attachmentStyle?.charAt(0).toUpperCase() + reportData.attachmentStyle?.slice(1) || "Secure"} Attachment
                      </div>
                    </div>
                    <p className="text-sm text-white/80">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-white">
                <div className="flex justify-between gap-4 flex-wrap">
                  <p className="text-neutral-dark/80 text-sm md:text-base mb-4 md:mb-0 max-w-xl">
                    This detailed report analyzes your personality traits, attachment style, and emotional intelligence to provide insights into your relationship patterns and compatibility profile.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Save PDF</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Main Content */}
          <div className="space-y-6">
            {/* Compatibility Overview Section */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <button 
                className="w-full p-4 flex justify-between items-center bg-neutral-50 hover:bg-neutral-100 transition-colors"
                onClick={() => toggleSection("overview")}
              >
                <h2 className="font-heading text-xl font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  Compatibility Overview
                </h2>
                {expandedSections.includes("overview") ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              <AnimatePresence>
                {expandedSections.includes("overview") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6">
                      <div className="mb-6">
                        <p className="text-neutral-dark/80 mb-6">
                          Based on your responses to our scientifically designed questionnaire, we've analyzed your relationship preferences, 
                          communication style, and compatibility patterns. This overview gives you a snapshot of your relationship profile.
                        </p>
                        
                        <CompatibilityCard 
                          color={report.compatibilityColor as 'green' | 'yellow' | 'red' || 'green'}
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                        <InteractiveMetric
                          name="Attachment"
                          value={35}
                          description="Weight given to your attachment style in your overall compatibility profile"
                          color={report.compatibilityColor || 'green'}
                          icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>}
                        />
                        
                        <InteractiveMetric
                          name="Personality"
                          value={25}
                          description="Weight given to your personality traits in your overall compatibility profile"
                          color={report.compatibilityColor || 'green'}
                          icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>}
                        />
                        
                        <InteractiveMetric
                          name="Emotional IQ"
                          value={25}
                          description="Weight given to your emotional intelligence in your overall compatibility profile"
                          color={report.compatibilityColor || 'green'}
                          icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>}
                        />
                        
                        <InteractiveMetric
                          name="Values"
                          value={15}
                          description="Weight given to your core values in your overall compatibility profile"
                          color={report.compatibilityColor || 'green'}
                          icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Personality Traits Section */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <button 
                className="w-full p-4 flex justify-between items-center bg-neutral-50 hover:bg-neutral-100 transition-colors"
                onClick={() => toggleSection("personality")}
              >
                <h2 className="font-heading text-xl font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  Personality Profile
                </h2>
                {expandedSections.includes("personality") ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              <AnimatePresence>
                {expandedSections.includes("personality") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6">
                      <div className="mb-6">
                        <p className="text-neutral-dark/80 mb-6">
                          Your personality traits reflect your natural tendencies in relationships and social interactions. 
                          Understanding these traits can help you identify compatible partners and improve your relationship dynamics.
                        </p>
                        
                        <div className="bg-neutral-50 rounded-lg p-5 mb-6 text-center border border-neutral-200">
                          <div className="mb-2 text-neutral-dark/60 text-sm uppercase tracking-wide font-medium">Your MBTI Type</div>
                          <div className="text-4xl font-bold text-primary mb-2">{reportData.mbtiType || "INFJ"}</div>
                          <p>
                            {reportData.mbtiType === 'INFJ' && "The Advocate - Idealistic, principled, and sensitive. You seek meaningful connections."}
                            {reportData.mbtiType === 'INTJ' && "The Architect - Strategic, logical, and independent. You value intellectual compatibility."}
                            {reportData.mbtiType === 'ENFP' && "The Campaigner - Enthusiastic, creative, and sociable. You seek authentic connections."}
                            {reportData.mbtiType === 'ISTJ' && "The Logistician - Practical, reliable, and traditional. You value loyalty and stability."}
                            {reportData.mbtiType === 'ESFJ' && "The Consul - Caring, social, and organized. You value harmony and close connections."}
                            {reportData.mbtiType === 'ENFJ' && "The Protagonist - Charismatic, inspiring, and empathetic. You value growth and harmony."}
                            {!reportData.mbtiType && "The Advocate - Idealistic, principled, and sensitive. You seek meaningful connections."}
                          </p>
                        </div>
                        
                        <PersonalityTraitCards 
                          personalityTraits={reportData.personalityTraits || {}} 
                          compatibilityColor={report.compatibilityColor || 'green'}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Attachment Style Section */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <button 
                className="w-full p-4 flex justify-between items-center bg-neutral-50 hover:bg-neutral-100 transition-colors"
                onClick={() => toggleSection("attachment")}
              >
                <h2 className="font-heading text-xl font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  Attachment Style
                </h2>
                {expandedSections.includes("attachment") ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              <AnimatePresence>
                {expandedSections.includes("attachment") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6">
                      <div className="mb-6">
                        <p className="text-neutral-dark/80 mb-6">
                          Your attachment style is one of the most important factors in relationship compatibility. 
                          It determines how you form emotional bonds and respond to intimacy, conflict, and separation.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <motion.div 
                            className={`p-6 rounded-lg border shadow-sm ${
                              reportData.attachmentStyle === 'secure' ? 'bg-emerald-50 border-emerald-200' : 
                              reportData.attachmentStyle === 'anxious' ? 'bg-amber-50 border-amber-200' : 
                              'bg-rose-50 border-rose-200'
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <div className="text-center mb-4">
                              <div className={`inline-block px-4 py-2 rounded-full mb-2 ${
                                reportData.attachmentStyle === 'secure' ? 'bg-emerald-100 text-emerald-700' : 
                                reportData.attachmentStyle === 'anxious' ? 'bg-amber-100 text-amber-700' : 
                                'bg-rose-100 text-rose-700'
                              } font-medium text-lg`}>
                                {reportData.attachmentStyle?.charAt(0).toUpperCase() + reportData.attachmentStyle?.slice(1) || "Secure"} Attachment
                              </div>
                            </div>
                            
                            <p className="mb-4">
                              {reportData.attachmentStyle === 'secure' && 
                                "You have a secure attachment style, which means you're comfortable with intimacy and independence. You trust others and communicate openly. This balanced approach allows you to form healthy, stable relationships."}
                              {reportData.attachmentStyle === 'anxious' && 
                                "You have an anxious attachment style, which means you may worry about rejection and seek frequent reassurance. You value closeness and emotional connection, sometimes fearing that partners don't reciprocate your feelings equally."}
                              {reportData.attachmentStyle === 'avoidant' && 
                                "You have an avoidant attachment style, which means you value independence and self-sufficiency. You may find it challenging to fully trust or depend on others and might create emotional distance in relationships."}
                              {reportData.attachmentStyle === 'fearful' && 
                                "You have a fearful attachment style, which combines aspects of both anxious and avoidant patterns. You desire close relationships but also fear getting hurt. This can create a push-pull dynamic in your connections."}
                              {!reportData.attachmentStyle && 
                                "You have a secure attachment style, which means you're comfortable with intimacy and independence. You trust others and communicate openly. This balanced approach allows you to form healthy, stable relationships."}
                            </p>
                            
                            <div className="pt-4 border-t border-neutral-dark/10">
                              <h5 className="font-medium mb-2">Scientific Background:</h5>
                              <p className="text-sm text-neutral-dark/80">
                                Attachment theory, developed by John Bowlby and expanded by Mary Ainsworth, explains how early relationships 
                                with caregivers create patterns that influence our adult relationships. Your attachment style reflects 
                                these patterns and can evolve through self-awareness and healthy relationships.
                              </p>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            className="p-6 rounded-lg border border-neutral-200 shadow-sm bg-white"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <h4 className="font-medium text-lg mb-4">How This Affects Your Relationships</h4>
                            <ul className="space-y-3">
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
                                  <li className="flex items-start">
                                    <span className="text-emerald-500 mr-2">•</span>
                                    <span>You're able to support partners while maintaining healthy boundaries</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-emerald-500 mr-2">•</span>
                                    <span>You recover more quickly from relationship setbacks</span>
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
                                  <li className="flex items-start">
                                    <span className="text-amber-500 mr-2">•</span>
                                    <span>You're deeply invested in emotional connection</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-amber-500 mr-2">•</span>
                                    <span>You might become preoccupied with relationship concerns</span>
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
                                  <li className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    <span>You tend to be self-reliant and may struggle with vulnerability</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    <span>You may avoid deep emotional discussions or conflicts</span>
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
                                    <span>You might struggle with trusting partners fully</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    <span>You can experience emotional volatility in relationships</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    <span>You may have difficulty with consistent relationship patterns</span>
                                  </li>
                                </>
                              )}
                              {!reportData.attachmentStyle && (
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
                                  <li className="flex items-start">
                                    <span className="text-emerald-500 mr-2">•</span>
                                    <span>You're able to support partners while maintaining healthy boundaries</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-emerald-500 mr-2">•</span>
                                    <span>You recover more quickly from relationship setbacks</span>
                                  </li>
                                </>
                              )}
                            </ul>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Strengths & Challenges Section */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <button 
                className="w-full p-4 flex justify-between items-center bg-neutral-50 hover:bg-neutral-100 transition-colors"
                onClick={() => toggleSection("strengths")}
              >
                <h2 className="font-heading text-xl font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  Strengths & Challenges
                </h2>
                {expandedSections.includes("strengths") ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              <AnimatePresence>
                {expandedSections.includes("strengths") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6">
                      <p className="text-neutral-dark/80 mb-6">
                        Understanding your relationship strengths and challenges helps you leverage your positive traits
                        and work on areas that may need attention. This self-awareness is key to healthier relationships.
                      </p>
                      
                      <StrengthsAndChallenges 
                        strengthsWeaknesses={reportData.compatibilityDetails?.strengthsWeaknesses} 
                        compatibilityColor={report.compatibilityColor || 'green'}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Compatibility Matches Section */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <button 
                className="w-full p-4 flex justify-between items-center bg-neutral-50 hover:bg-neutral-100 transition-colors"
                onClick={() => toggleSection("compatibility")}
              >
                <h2 className="font-heading text-xl font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                  Compatibility Matches
                </h2>
                {expandedSections.includes("compatibility") ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              <AnimatePresence>
                {expandedSections.includes("compatibility") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6">
                      <p className="text-neutral-dark/80 mb-6">
                        Based on your personality profile, attachment style, and core values, we've identified the types of people
                        you're most likely to form strong, healthy connections with, as well as potential relationship challenges.
                      </p>
                      
                      <CompatibilityTypeCards 
                        compatibleTypes={reportData.compatibilityDetails?.compatibleTypes} 
                        compatibilityColor={report.compatibilityColor || 'green'}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Tips & Insights Section */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <button 
                className="w-full p-4 flex justify-between items-center bg-neutral-50 hover:bg-neutral-100 transition-colors"
                onClick={() => toggleSection("insights")}
              >
                <h2 className="font-heading text-xl font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                  Tips & Practical Insights
                </h2>
                {expandedSections.includes("insights") ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              <AnimatePresence>
                {expandedSections.includes("insights") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6">
                      <p className="text-neutral-dark/80 mb-6">
                        These actionable tips and insights are designed to help you apply your compatibility profile
                        to real-world dating situations and relationship development.
                      </p>
                      
                      <TipsAndInsights 
                        compatibilityInsights={reportData.compatibilityDetails?.compatibilityInsights}
                        relationshipTips={reportData.compatibilityDetails?.relationshipTips}
                        growthRecommendation={reportData.growthRecommendation}
                        idealPartnerSummary={reportData.idealPartnerSummary}
                        datingExperience={reportData.datingExperience}
                        compatibilityColor={report.compatibilityColor || 'green'}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Analytics Dashboard Section */}
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <button 
                className="w-full p-4 flex justify-between items-center bg-neutral-50 hover:bg-neutral-100 transition-colors"
                onClick={() => toggleSection("analytics")}
              >
                <h2 className="font-heading text-xl font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                  Interactive Analytics
                </h2>
                {expandedSections.includes("analytics") ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              <AnimatePresence>
                {expandedSections.includes("analytics") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6">
                      <p className="text-neutral-dark/80 mb-6">
                        Explore your compatibility profile in detail with these interactive data visualizations.
                        Gain deeper insights by comparing different aspects of your relationship preferences.
                      </p>
                      
                      <AnalyticsDashboard report={reportData} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
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
        </motion.div>
      </div>
    </>
  );
};

export default ReportImproved;