import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import {
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  RadarIcon,
  Users,
  Heart,
  Brain,
  MessageCircle,
  Settings2,
} from "lucide-react";

type TabType = "personality" | "attachment" | "values" | "emotional" | "compatibility";

interface AnalyticsDashboardProps {
  report: any;
}

const AnalyticsDashboard = ({ report }: AnalyticsDashboardProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("personality");

  // Data for charts based on the report
  const personalityData = [
    { name: "Openness", score: report?.personalityTraits?.openness || 50 },
    { name: "Conscientiousness", score: report?.personalityTraits?.conscientiousness || 50 },
    { name: "Extraversion", score: report?.personalityTraits?.extraversion || 50 },
    { name: "Agreeableness", score: report?.personalityTraits?.agreeableness || 50 },
    { name: "Neuroticism", score: report?.personalityTraits?.neuroticism || 50 }
  ];

  const attachmentData = [
    { name: "Secure", score: report?.attachmentStyle === "secure" ? 80 : 30 },
    { name: "Anxious", score: report?.attachmentStyle === "anxious" ? 80 : 30 },
    { name: "Avoidant", score: report?.attachmentStyle === "avoidant" ? 80 : 30 },
    { name: "Fearful", score: report?.attachmentStyle === "fearful" ? 80 : 30 }
  ];

  const emotionalData = [
    { name: "Self-Awareness", score: report?.emotionalIntelligence?.selfAwareness || 50 },
    { name: "Self-Regulation", score: report?.emotionalIntelligence?.selfRegulation || 50 },
    { name: "Motivation", score: report?.emotionalIntelligence?.motivation || 50 },
    { name: "Empathy", score: report?.emotionalIntelligence?.empathy || 50 },
    { name: "Social Skills", score: report?.emotionalIntelligence?.socialSkills || 50 }
  ];

  const valuesData = [
    { name: "Tradition", value: report?.coreValues?.tradition || 50 },
    { name: "Independence", value: report?.coreValues?.independence || 50 },
    { name: "Family", value: report?.coreValues?.family || 50 },
    { name: "Ambition", value: report?.coreValues?.ambition || 50 },
    { name: "Open-mindedness", value: report?.coreValues?.openMindedness || 50 }
  ];

  // Colors for charts
  const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#9c27b0'];
  const COLOR_RED = '#ff3d71';
  const COLOR_YELLOW = '#ffaa00';
  const COLOR_GREEN = '#00d68f';

  // Generate colors based on compatibility color
  const getBarColor = () => {
    const color = report?.compatibilityColor || 'green';
    return color === 'green' ? COLOR_GREEN : color === 'yellow' ? COLOR_YELLOW : COLOR_RED;
  };

  return (
    <Tabs defaultValue="personality" className="mb-8" onValueChange={(value) => setActiveTab(value as TabType)}>
      <TabsList className="flex flex-wrap w-full h-auto md:h-12 mb-4 md:mb-0">
        <TabsTrigger value="personality" className="flex-1 h-12 md:h-auto">
          <Brain className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Personality Traits</span>
          <span className="inline sm:hidden">Traits</span>
        </TabsTrigger>
        <TabsTrigger value="attachment" className="flex-1 h-12 md:h-auto">
          <Heart className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Attachment Style</span>
          <span className="inline sm:hidden">Attachment</span>
        </TabsTrigger>
        <TabsTrigger value="emotional" className="flex-1 h-12 md:h-auto">
          <MessageCircle className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Emotional Intelligence</span>
          <span className="inline sm:hidden">Emotional</span>
        </TabsTrigger>
        <TabsTrigger value="values" className="flex-1 h-12 md:h-auto">
          <Settings2 className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Core Values</span>
          <span className="inline sm:hidden">Values</span>
        </TabsTrigger>
        <TabsTrigger value="compatibility" className="flex-1 h-12 md:h-auto">
          <Users className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Compatibility Analysis</span>
          <span className="inline sm:hidden">Analysis</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personality" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Personality Analysis
            </CardTitle>
            <CardDescription>
              Your Big Five personality trait scores based on the assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={personalityData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Score']}
                    labelFormatter={(label) => `Trait: ${label}`}
                  />
                  <Legend />
                  <Bar 
                    dataKey="score" 
                    fill={getBarColor()} 
                    name="Trait Score" 
                    barSize={30}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 space-y-2 text-sm">
              <h4 className="font-medium text-base">What This Means:</h4>
              <p>
                <strong>Openness</strong>: Higher scores indicate curiosity, imagination, and interest in new experiences.
              </p>
              <p>
                <strong>Conscientiousness</strong>: Higher scores reflect organization, responsibility, and self-discipline.
              </p>
              <p>
                <strong>Extraversion</strong>: Higher scores suggest sociability, assertiveness, and energy in social settings.
              </p>
              <p>
                <strong>Agreeableness</strong>: Higher scores indicate compassion, cooperation, and consideration for others.
              </p>
              <p>
                <strong>Neuroticism</strong>: Higher scores reflect greater emotional sensitivity and tendency toward negative emotions.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="attachment" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <RadarIcon className="w-5 h-5 mr-2" />
              Attachment Style Analysis
            </CardTitle>
            <CardDescription>
              Your attachment patterns in relationships based on your responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                  outerRadius={120} 
                  width={500} 
                  height={300} 
                  data={attachmentData}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar 
                    name="Attachment Score" 
                    dataKey="score" 
                    stroke={getBarColor()} 
                    fill={getBarColor()} 
                    fillOpacity={0.5} 
                  />
                  <Legend />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Score']}
                    labelFormatter={(label) => `Style: ${label}`}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6">
              <div className="p-4 bg-neutral-100 rounded-lg mb-4">
                <h4 className="font-medium mb-2">Your Dominant Style: {report.attachmentStyle.charAt(0).toUpperCase() + report.attachmentStyle.slice(1)}</h4>
                <p>
                  {
                    report.attachmentStyle === "secure" ?
                      "You tend to find it easy to form close bonds while maintaining independence. You're comfortable with intimacy and generally trust partners." :
                    report.attachmentStyle === "anxious" ?
                      "You seek closeness and may worry about your partner's availability or commitment. You may be sensitive to small changes in relationships." :
                    report.attachmentStyle === "avoidant" ?
                      "You value independence and may feel uncomfortable with deep emotional intimacy. You might keep emotional distance as a self-protection strategy." :
                    "You desire closeness but fear being hurt, which can create conflicting approaches to relationships where you both seek and avoid intimacy."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="emotional" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChartIcon className="w-5 h-5 mr-2" />
              Emotional Intelligence Analysis
            </CardTitle>
            <CardDescription>
              Your emotional intelligence components based on the assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={emotionalData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Score']}
                    labelFormatter={(label) => `Component: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke={getBarColor()} 
                    strokeWidth={3} 
                    activeDot={{ r: 8 }}
                    name="EQ Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-4">
              <h4 className="font-medium text-base">Component Analysis:</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-neutral-100 rounded-lg">
                  <h5 className="font-medium mb-1">Self-Awareness</h5>
                  <p className="text-sm">
                    Your ability to recognize your emotions and their impact on thoughts and behavior.
                    {emotionalData[0].score > 70 ? " Your high score suggests strong emotional awareness." : 
                      emotionalData[0].score < 40 ? " Your score suggests developing more awareness of emotions could benefit you." :
                      " Your score shows a moderate understanding of your emotions."}
                  </p>
                </div>
                
                <div className="p-3 bg-neutral-100 rounded-lg">
                  <h5 className="font-medium mb-1">Self-Regulation</h5>
                  <p className="text-sm">
                    Your ability to manage emotions and adapt to changing circumstances.
                    {emotionalData[1].score > 70 ? " Your high score indicates excellent emotional management." : 
                      emotionalData[1].score < 40 ? " Developing strategies to regulate emotions might help your relationships." :
                      " Your score shows a balanced approach to managing emotions."}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="values" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="w-5 h-5 mr-2" />
              Core Values Analysis
            </CardTitle>
            <CardDescription>
              Your fundamental values that influence relationship preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={valuesData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={(entry) => entry.name}
                  >
                    {valuesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Score']}
                    labelFormatter={(label) => `Value: ${label}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-4">
              <h4 className="font-medium mb-2">Value Compatibility Insights:</h4>
              <p>
                Your values profile suggests that {
                  Math.max(...valuesData.map(d => d.value)) > 75 ? 
                  `you place particularly high importance on ${valuesData.find(d => d.value === Math.max(...valuesData.map(item => item.value)))?.name}` : 
                  "you have a relatively balanced value system without extreme preferences"
                }.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="compatibility" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Comprehensive Compatibility Analysis
            </CardTitle>
            <CardDescription>
              Your overall compatibility profile and relationship insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className={`p-4 rounded-lg mb-4 ${
                report.compatibilityColor === 'green' 
                  ? 'bg-emerald-500/10 border border-emerald-500/30' 
                  : report.compatibilityColor === 'yellow'
                  ? 'bg-amber-500/10 border border-amber-500/30'
                  : 'bg-rose-500/10 border border-rose-500/30'
              }`}>
                <h4 className={`font-medium mb-2 ${
                  report.compatibilityColor === 'green' 
                    ? 'text-emerald-700' 
                    : report.compatibilityColor === 'yellow'
                    ? 'text-amber-700'
                    : 'text-rose-700'
                }`}>
                  {report.compatibilityColor === 'green' ? 'Adaptable & Balanced Profile' : 
                   report.compatibilityColor === 'yellow' ? 'Selective & Specific Profile' : 
                   'Particular & Defined Profile'}
                </h4>
                <p>
                  {report.compatibilityColor === 'green' 
                    ? 'Your responses indicate you have a flexible personality with balanced traits that can adapt to various relationship dynamics.' 
                    : report.compatibilityColor === 'yellow'
                    ? 'Your profile shows specific preferences in relationships. You value certain traits and may need alignment in key areas.'
                    : 'You have well-defined preferences and values. Your ideal relationship requires strong alignment in core areas.'}
                </p>
              </div>
            </div>

            {/* Strengths & Challenges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium text-lg mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 inline-flex items-center justify-center mr-2">✓</span>
                  Relationship Strengths
                </h4>
                <ul className="space-y-2">
                  {report.compatibilityDetails?.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-lg mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 inline-flex items-center justify-center mr-2">!</span>
                  Relationship Challenges
                </h4>
                <ul className="space-y-2">
                  {report.compatibilityDetails?.challenges.map((challenge: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsDashboard;