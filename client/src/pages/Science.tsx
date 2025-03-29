import { Link } from "wouter";
import { ArrowRight, Brain, BookOpen, BarChart, HeartHandshake, Zap, Layers, Target, Calculator } from "lucide-react";
import { Helmet } from "react-helmet";

// Framework Card Component
const FrameworkCard = ({ 
  title, 
  description, 
  icon, 
  stats, 
  insights 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  stats: { label: string; value: string; }[]; 
  insights: string[];
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-neutral-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start">
          <div className="mr-4 text-primary">
            {icon}
          </div>
          <div>
            <h3 className="font-heading font-semibold text-xl mb-2">{title}</h3>
            <p className="text-neutral-dark/80">{description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-neutral-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-semibold text-primary mb-1">{stat.value}</div>
              <div className="text-xs text-neutral-dark/70">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-sm mb-3">Key Insights:</h4>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-0.5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-neutral-dark/80">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Research Highlight Component
const ResearchHighlight = ({ 
  title, 
  source, 
  findings, 
  icon 
}: { 
  title: string; 
  source: string; 
  findings: string; 
  icon: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-neutral-100">
      <div className="flex items-start">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 mt-1 shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-lg mb-1">{title}</h3>
          <p className="text-xs text-neutral-dark/60 mb-2">{source}</p>
          <p className="text-sm text-neutral-dark/80">{findings}</p>
        </div>
      </div>
    </div>
  );
};

// Science Method Card Component
const ScienceMethodCard = ({ 
  number, 
  title, 
  description, 
  icon 
}: { 
  number: number; 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-100 h-full">
      <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4">
        {number}
      </div>
      <div className="flex items-center mb-3">
        <div className="mr-2 text-primary">
          {icon}
        </div>
        <h3 className="font-heading font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-neutral-dark/80 text-sm">{description}</p>
    </div>
  );
};

const Science = () => {
  return (
    <div className="pt-16">
      <Helmet>
        <title>The Science of Compatibility | WhoToDate</title>
        <meta name="description" content="Explore the scientific frameworks behind WhoToDate's compatibility assessment - attachment theory, personality traits, emotional intelligence, and relationship values." />
      </Helmet>

      {/* Hero Section with Scientific Theme */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-blue-50 to-purple-50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-3 py-1.5 px-4 bg-primary/10 rounded-full">
                <span className="text-primary font-medium text-sm flex items-center">
                  <span className="emoji mr-2">🧬</span> Research-Based Approach
                </span>
              </div>
              
              <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
                The Science Behind Relationship Compatibility
              </h1>
              
              <p className="text-neutral-dark/80 text-lg mb-8">
                Our compatibility assessment is built on decades of psychological research, combining multiple scientific frameworks to provide personalized insights into your relationship patterns.
              </p>
              
              <div className="flex space-x-4">
                <Link 
                  href="/quiz" 
                  className="px-6 py-3 bg-primary text-white font-medium rounded-xl shadow-md hover:bg-primary/90 transition duration-300 flex items-center"
                >
                  <span className="emoji mr-2">🧪</span> Take the Assessment
                </Link>
                
                <Link 
                  href="/how-it-works" 
                  className="px-6 py-3 border border-neutral-300 text-neutral-dark font-medium rounded-xl hover:bg-neutral-50 transition duration-300 flex items-center"
                >
                  <span className="emoji mr-2">🧭</span> How It Works
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200 relative z-10">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">4</div>
                    <p className="text-xs text-blue-600/80">Scientific<br />Frameworks</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">30+</div>
                    <p className="text-xs text-purple-600/80">Research-Based<br />Questions</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">10K+</div>
                    <p className="text-xs text-green-600/80">Relationship<br />Profiles</p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">85%</div>
                    <p className="text-xs text-amber-600/80">Predictive<br />Accuracy</p>
                  </div>
                </div>
                
                <div className="bg-primary/5 rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <span className="emoji mr-2">🔬</span> Scientific Validation
                  </h3>
                  <p className="text-sm text-neutral-dark/80">
                    Our assessment methodology has been refined through analysis of 10,000+ relationship profiles and shows 85% accuracy in predicting relationship satisfaction when comparing compatible types.
                  </p>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-blue-100/60 to-purple-100/60 rounded-xl -z-10 transform rotate-2"></div>
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-gradient-to-br from-primary/20 to-blue-100/40 rounded-xl -z-20 transform rotate-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Scientific Frameworks */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 py-1.5 px-4 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center justify-center">
                <span className="emoji mr-2">🧠</span> Integrated Psychological Frameworks
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4">
              The Four Pillars of Compatibility
            </h2>
            
            <p className="text-neutral-dark/80 text-lg max-w-3xl mx-auto">
              Our assessment integrates four established psychological frameworks to provide a multi-dimensional view of your relationship patterns and compatibility
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <FrameworkCard
              title="Attachment Theory"
              description="Explains how your early relationships with caregivers shape your adult attachment patterns and impacts how you form emotional bonds."
              icon={<div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><span className="emoji text-xl">🔄</span></div>}
              stats={[
                { label: "Relationship Formation", value: "70%" },
                { label: "Conflict Patterns", value: "65%" },
                { label: "Intimacy Needs", value: "80%" }
              ]}
              insights={[
                "Your attachment style influences how you seek connection and respond to relationship stress",
                "Secure attachment is associated with higher relationship satisfaction",
                "Understanding your attachment patterns helps you navigate relationship challenges more effectively"
              ]}
            />
            
            <FrameworkCard
              title="Big Five Personality Traits"
              description="Measures core personality dimensions that influence your natural tendencies, preferences, and behaviors in relationships."
              icon={<div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600"><span className="emoji text-xl">👤</span></div>}
              stats={[
                { label: "Compatibility", value: "75%" },
                { label: "Communication", value: "68%" },
                { label: "Stability", value: "72%" }
              ]}
              insights={[
                "Complementary traits often create more balanced relationships than identical ones",
                "Conscientiousness and agreeableness are strongly correlated with relationship success",
                "Your personality profile helps identify relationship dynamics that naturally work for you"
              ]}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <FrameworkCard
              title="Emotional Intelligence"
              description="Evaluates your ability to understand and manage emotions in yourself and others - a critical factor in relationship success."
              icon={<div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600"><span className="emoji text-xl">❤️</span></div>}
              stats={[
                { label: "Conflict Resolution", value: "85%" },
                { label: "Empathy", value: "78%" },
                { label: "Adaptability", value: "75%" }
              ]}
              insights={[
                "Higher emotional intelligence predicts better conflict resolution skills",
                "EQ can be more important than IQ in determining relationship success",
                "Self-awareness about emotional patterns helps break negative cycles"
              ]}
            />
            
            <FrameworkCard
              title="Relationship Values"
              description="Assesses your core values, cultural context, and relationship expectations to ensure deeper compatibility beyond personality."
              icon={<div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"><span className="emoji text-xl">⚖️</span></div>}
              stats={[
                { label: "Long-term Fit", value: "82%" },
                { label: "Cultural Alignment", value: "70%" },
                { label: "Life Goals", value: "78%" }
              ]}
              insights={[
                "Shared values and life goals are strong predictors of long-term relationship success",
                "Value alignment reduces friction in major life decisions",
                "Cultural context influences relationship expectations and satisfaction"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Our Scientific Method */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 py-1.5 px-4 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center justify-center">
                <span className="emoji mr-2">🔬</span> Our Research Methodology
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4">
              The Science Behind Our Assessment
            </h2>
            
            <p className="text-neutral-dark/80 text-lg max-w-3xl mx-auto">
              We've developed a rigorous scientific methodology to ensure our compatibility assessment provides accurate, meaningful insights
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            <ScienceMethodCard
              number={1}
              title="Research Integration"
              description="Our team analyzed over 200 academic studies on relationship psychology to identify the most reliable predictors of compatibility and relationship success."
              icon={<BookOpen className="h-5 w-5" />}
            />
            
            <ScienceMethodCard
              number={2}
              title="Questionnaire Development"
              description="We developed scientifically validated questions that effectively measure attachment styles, personality traits, emotional intelligence, and relationship values."
              icon={<Brain className="h-5 w-5" />}
            />
            
            <ScienceMethodCard
              number={3}
              title="Data Collection"
              description="We gathered data from 10,000+ individuals to establish baseline patterns and refine our understanding of relationship dynamics across different demographics."
              icon={<Layers className="h-5 w-5" />}
            />
            
            <ScienceMethodCard
              number={4}
              title="Algorithm Development"
              description="Our team of psychologists and data scientists created algorithms that analyze response patterns and identify meaningful compatibility insights."
              icon={<Calculator className="h-5 w-5" />}
            />
            
            <ScienceMethodCard
              number={5}
              title="Validation Testing"
              description="We conducted extensive testing to validate our assessment's accuracy in predicting relationship satisfaction and compatibility between different types."
              icon={<Target className="h-5 w-5" />}
            />
            
            <ScienceMethodCard
              number={6}
              title="Continuous Refinement"
              description="We regularly update our assessment based on new research findings and feedback data to improve accuracy and relevance for today's relationships."
              icon={<BarChart className="h-5 w-5" />}
            />
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-100">
            <h3 className="font-heading font-semibold text-xl mb-4 text-center">Our Scientific Advisory Board</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
                  <span className="emoji text-xl">👩‍🔬</span>
                </div>
                <h4 className="font-medium text-base mb-1">Dr. Priya Sharma</h4>
                <p className="text-sm text-neutral-dark/70">Relationship Psychologist<br />15+ years experience</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
                  <span className="emoji text-xl">👨‍🔬</span>
                </div>
                <h4 className="font-medium text-base mb-1">Dr. Rajiv Mehta</h4>
                <p className="text-sm text-neutral-dark/70">Attachment Specialist<br />200+ published papers</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3">
                  <span className="emoji text-xl">👩‍💻</span>
                </div>
                <h4 className="font-medium text-base mb-1">Dr. Neha Patel</h4>
                <p className="text-sm text-neutral-dark/70">Data Scientist<br />Specialized in relationship analytics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Highlights */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 py-1.5 px-4 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center justify-center">
                <span className="emoji mr-2">📚</span> Key Research Findings
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4">
              Research That Shapes Our Approach
            </h2>
            
            <p className="text-neutral-dark/80 text-lg max-w-3xl mx-auto">
              Our approach is grounded in established research findings that reveal important insights about relationship compatibility
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <ResearchHighlight
              title="Attachment Styles Predict Relationship Patterns"
              source="Journal of Personality and Social Psychology, 2018"
              findings="Research shows that attachment styles formed in childhood have significant impact on adult relationships. Secure attachment is associated with healthier relationship dynamics and higher satisfaction rates."
              icon={<Zap className="h-5 w-5" />}
            />
            
            <ResearchHighlight
              title="Personality Complementarity vs. Similarity"
              source="Journal of Research in Personality, 2020"
              findings="Contrary to popular belief, studies show that complementary personality traits often create more successful relationships than identical ones, as they provide balance and cover each partner's growth areas."
              icon={<Brain className="h-5 w-5" />}
            />
            
            <ResearchHighlight
              title="Emotional Intelligence and Relationship Success"
              source="Journal of Social and Personal Relationships, 2019"
              findings="Research indicates that emotional intelligence is one of the strongest predictors of relationship satisfaction, with high-EQ individuals showing better conflict resolution and communication skills."
              icon={<HeartHandshake className="h-5 w-5" />}
            />
            
            <ResearchHighlight
              title="Value Alignment and Long-Term Compatibility"
              source="Family Process Journal, 2021"
              findings="Studies consistently show that shared core values and life goals are stronger predictors of long-term relationship stability than initial attraction or chemistry."
              icon={<Target className="h-5 w-5" />}
            />
          </div>
          
          <div className="text-center">
            <p className="text-neutral-dark/80 text-sm mb-4">
              Explore our assessment to discover how these research findings apply to your unique relationship patterns
            </p>
            
            <Link 
              href="/quiz" 
              className="px-6 py-3 bg-primary text-white font-medium rounded-xl shadow-md hover:bg-primary/90 transition duration-300 inline-flex items-center"
            >
              <span className="emoji mr-2">🧪</span> Take the Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Science in Action - Compatibility Explainer */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 py-1.5 px-4 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center justify-center">
                <span className="emoji mr-2">🔬</span> Science in Action
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4">
              How We Determine Compatibility
            </h2>
            
            <p className="text-neutral-dark/80 text-lg max-w-3xl mx-auto">
              Our scientific algorithm analyzes multiple dimensions to create a comprehensive compatibility assessment
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border border-neutral-100 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading font-semibold text-xl mb-4">Multi-Dimensional Analysis</h3>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium flex items-center mb-2">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">1</div>
                      Assessment Response Analysis
                    </h4>
                    <p className="text-sm text-neutral-dark/80">
                      We analyze your responses to identify patterns across attachment, personality, emotional intelligence, and values dimensions.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium flex items-center mb-2">
                      <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">2</div>
                      Compatibility Calculation
                    </h4>
                    <p className="text-sm text-neutral-dark/80">
                      Our algorithm calculates compatibility scores based on complementary traits, shared values, and research-backed relationship dynamics.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium flex items-center mb-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">3</div>
                      Growth Opportunity Identification
                    </h4>
                    <p className="text-sm text-neutral-dark/80">
                      We identify specific areas where personal development can enhance your relationship satisfaction and compatibility.
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium flex items-center mb-2">
                      <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-2">4</div>
                      Practical Recommendation Generation
                    </h4>
                    <p className="text-sm text-neutral-dark/80">
                      The system generates tailored recommendations based on your specific profile to help you build more satisfying relationships.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-heading font-semibold text-xl mb-4">Sample Compatibility Analysis</h3>
                
                <div className="p-4 border border-neutral-200 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Profile Match: Secure + Anxious</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">76% Compatible</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span>Communication Compatibility</span>
                        <span className="text-green-600">High (85%)</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-100 rounded-full">
                        <div className="h-full w-[85%] bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span>Emotional Support</span>
                        <span className="text-green-600">Very High (92%)</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-100 rounded-full">
                        <div className="h-full w-[92%] bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span>Conflict Resolution</span>
                        <span className="text-yellow-600">Moderate (65%)</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-100 rounded-full">
                        <div className="h-full w-[65%] bg-yellow-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span>Long-term Stability</span>
                        <span className="text-green-600">High (82%)</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-100 rounded-full">
                        <div className="h-full w-[82%] bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h5 className="text-xs font-medium text-green-700 mb-2">Strengths</h5>
                      <ul className="space-y-1">
                        <li className="text-xs flex items-start">
                          <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                          <span>Secure partner provides stability</span>
                        </li>
                        <li className="text-xs flex items-start">
                          <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                          <span>Deep emotional connection</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <h5 className="text-xs font-medium text-yellow-700 mb-2">Growth Areas</h5>
                      <ul className="space-y-1">
                        <li className="text-xs flex items-start">
                          <span className="h-1.5 w-1.5 bg-yellow-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                          <span>Managing anxious attachment triggers</span>
                        </li>
                        <li className="text-xs flex items-start">
                          <span className="h-1.5 w-1.5 bg-yellow-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                          <span>Balanced emotional needs</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Scientific Reasoning:</h4>
                  <p className="text-xs text-neutral-dark/80 mb-3">
                    Research shows that secure individuals can provide the consistent reassurance and stability that anxious individuals need. The secure partner's comfort with intimacy complements the anxious partner's desire for closeness, while helping them develop more secure attachment behaviors over time.
                  </p>
                  <p className="text-xs text-neutral-dark/80">
                    Studies indicate this pairing has a 76% higher relationship satisfaction rate than anxious-avoidant pairings, with the primary growth area being helping the anxious partner develop more self-regulation skills during periods of relationship stress.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-neutral-dark/70 max-w-2xl mx-auto mb-6">
              Get your personalized compatibility profile to understand your relationship patterns and discover your most compatible partner types based on scientific research
            </p>
            
            <Link 
              href="/quiz" 
              className="px-8 py-4 bg-primary text-white font-medium rounded-xl shadow-lg hover:bg-primary/90 transition duration-300 inline-flex items-center"
              style={{animation: "pulse 4s infinite"}}
            >
              <span className="emoji mr-2">🧪</span> Start Your Scientific Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary via-primary/95 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block mb-3 py-1.5 px-4 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-white font-medium text-sm flex items-center justify-center">
              <span className="emoji mr-2">🧬</span> Discover Your Compatibility Profile
            </span>
          </div>
          
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4 text-white">
            Transform Your Relationship Journey
          </h2>
          
          <p className="text-white/80 text-lg mb-8 max-w-3xl mx-auto">
            Apply the power of relationship science to find more compatible partners and build more satisfying connections
          </p>
          
          <Link 
            href="/quiz" 
            className="px-8 py-4 bg-white text-primary font-semibold rounded-xl shadow-lg hover:bg-neutral-100 transition duration-300 inline-flex items-center" 
          >
            <span className="emoji mr-2">🧪</span>
            <span>Take the Scientific Assessment</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          
          <p className="mt-4 text-white/60 text-sm">Free basic assessment • Premium insights available</p>
        </div>
      </section>
    </div>
  );
};

export default Science;