import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { buildReport, DetailedReport } from '../logic/profile';
import { adaptToLegacyProfile } from '../logic/profileAdapter';
import { CompatibilityProfile } from '../utils/calculateCompatibilityProfile';
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { downloadDetailedPDFReport, downloadPDFReport } from '../lib/pdfGenerator';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Download, Braces, Check } from 'lucide-react';
import FullReportView from '../components/reports/FullReportView';

/**
 * Test Report Page
 * 
 * This page is used to test the new profile format directly.
 * It generates both a DetailedReport and a CompatibilityProfile for comparison.
 * It shows various visualizations using the data.
 */
const TestReport: React.FC = () => {
  // Use state to store our report objects
  const [detailedReport, setDetailedReport] = useState<DetailedReport | null>(null);
  const [legacyProfile, setLegacyProfile] = useState<CompatibilityProfile | null>(null);
  
  // Build some sample answers (this would normally come from the quiz)
  const generateSampleAnswers = () => {
    const answers: Record<number, number> = {};
    
    // Generate 43 random answers (values 0-4)
    for (let i = 1; i <= 43; i++) {
      answers[i] = Math.floor(Math.random() * 5); // 0-4 answer choices
    }
    
    return answers;
  };
  
  // Generate reports using our sample data
  const generateReports = () => {
    const sampleAnswers = generateSampleAnswers();
    
    // Build the detailed report using the new structure
    const newReport = buildReport(sampleAnswers);
    setDetailedReport(newReport);
    
    // Convert to legacy format for comparison 
    const adaptedProfile = adaptToLegacyProfile(newReport);
    setLegacyProfile(adaptedProfile);
  };
  
  return (
    <div className="pt-16 pb-12 bg-neutral-50 min-h-screen">
      <Helmet>
        <title>Test Report | WhoToDate</title>
        <meta name="description" content="Testing the new report format" />
      </Helmet>
      
      <div className="container max-w-5xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Report Page</h1>
          <p className="text-lg text-gray-600">Generate and test the new profile format</p>
          
          <div className="flex justify-center mt-8">
            <Button 
              onClick={generateReports}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Generate Random Report
            </Button>
          </div>
        </div>
        
        {(detailedReport && legacyProfile) ? (
          <Tabs defaultValue="visualizations" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
              <TabsTrigger value="legacy-report">Legacy Report</TabsTrigger>
              <TabsTrigger value="data">Raw Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visualizations" className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Radar Chart */}
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>Personality Radar</CardTitle>
                    <CardDescription>Big Five personality traits</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius="80%" data={detailedReport.radarSeries}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="axis" />
                        <PolarRadiusAxis domain={[0, 100]} />
                        <Radar
                          name="Personality"
                          dataKey="value"
                          stroke="#e83a8e"
                          fill="#e83a8e"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                {/* Section Bars */}
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>Section Scores</CardTitle>
                    <CardDescription>Overall performance by area</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={detailedReport.sectionBars}
                      >
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="section" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="#e83a8e" name="Score" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              {/* Key attributes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Primary Archetype</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{detailedReport.primaryArchetype}</div>
                    <div className="text-sm text-gray-500 mt-1">Your dominant personality pattern</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Attachment Style</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary capitalize">{detailedReport.attachment}</div>
                    <div className="text-sm text-gray-500 mt-1">Your relationship attachment pattern</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">MBTI Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{detailedReport.mbti}</div>
                    <div className="text-sm text-gray-500 mt-1">Myers-Briggs personality type</div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Positive flags */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Relationship Strengths</CardTitle>
                  <CardDescription>Key positive qualities you bring to relationships</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {detailedReport.flags.positives.map((strength, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2 flex-shrink-0">
                          <Check className="h-4 w-4" />
                        </span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Download buttons */}
              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <Button 
                  onClick={() => downloadDetailedPDFReport(detailedReport)}
                  className="flex-1"
                  variant="outline"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Detailed Report (New Format)
                </Button>
                
                <Button 
                  onClick={() => downloadPDFReport(legacyProfile)}
                  className="flex-1"
                  variant="outline"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Legacy Report
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="legacy-report">
              <FullReportView profile={legacyProfile} />
            </TabsContent>
            
            <TabsContent value="data">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Braces className="h-5 w-5 mr-2" />
                      New DetailedReport Format
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-auto text-xs max-h-[600px]">
                      {JSON.stringify(detailedReport, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Braces className="h-5 w-5 mr-2" />
                      Legacy CompatibilityProfile Format
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-auto text-xs max-h-[600px]">
                      {JSON.stringify(legacyProfile, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-gray-500 mb-4">Generate a report to see visualizations and data</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestReport;