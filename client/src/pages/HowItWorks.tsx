import { Link } from "wouter";
import { ArrowRight, Brain, HeartHandshake, Lightbulb, Target, UsersRound, Zap } from "lucide-react";

// Progress steps component for the flow animation
const ProcessStep = ({ number, title, description, icon, isLast = false }: { 
  number: number; 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  isLast?: boolean;
}) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center h-12 w-12 rounded-full border-4 border-primary/20 bg-primary text-white font-bold text-xl">
          {number}
        </div>
        {!isLast && (
          <div className="w-0.5 bg-primary/30 h-24 md:h-16"></div>
        )}
      </div>
      <div className="ml-6 -mt-1">
        <h3 className="text-xl font-heading font-bold flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </h3>
        <p className="mt-1 text-neutral-dark/80">
          {description}
        </p>
      </div>
    </div>
  );
};

// Scientific framework feature card
const FrameworkCard = ({ icon, title, description, color }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string;
}) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-md h-full border ${color}`}>
      <div className="mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-heading font-semibold mb-3">{title}</h3>
      <p className="text-neutral-dark/80 text-sm">{description}</p>
    </div>
  );
};

// FAQ accordion item
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="border-b border-neutral-200 py-5 last:border-0">
      <details className="group">
        <summary className="flex justify-between items-center cursor-pointer list-none">
          <h3 className="text-lg font-medium">{question}</h3>
          <span className="transition group-open:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </summary>
        <div className="mt-3 text-neutral-dark/80">
          <p>{answer}</p>
        </div>
      </details>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="pt-16 pb-20">
      {/* Hero section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-purple-50">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
            Discover Your Perfect Relationship Fit
          </h1>
          <p className="text-lg sm:text-xl text-neutral-dark/80 max-w-3xl mx-auto mb-8">
            Our scientifically-backed approach analyzes your personality traits and relationship needs to help you find lasting compatibility
          </p>
          <Link 
            href="/quiz" 
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-medium rounded-xl shadow-lg hover:bg-primary/90 transition duration-300 text-lg"
            style={{animation: "pulse 4s infinite"}}
          >
            <span className="emoji mr-2">🧪</span> Start Free Assessment
          </Link>
          <div className="mt-6 text-sm text-neutral-dark/60">No registration required to begin</div>
        </div>
      </section>

      {/* Overview section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4">Beyond Simple Matchmaking</h2>
            <p className="text-lg text-neutral-dark/80 max-w-3xl mx-auto">
              WhoToDate isn't just another dating platform. We combine psychology, data science, and relationship research to uncover the relationship dynamics that will work best for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-6 rounded-xl text-center">
              <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Scientifically Validated</h3>
              <p className="text-neutral-dark/80">
                Our assessment is built on established psychological frameworks and validated with data from 10,000+ relationships
              </p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-xl text-center">
              <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Personalized Insights</h3>
              <p className="text-neutral-dark/80">
                Receive a comprehensive analysis of your attachment style, personality traits, and emotional patterns
              </p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-xl text-center">
              <div className="h-14 w-14 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Actionable Guidance</h3>
              <p className="text-neutral-dark/80">
                Transform insights into practical steps to build healthier, more fulfilling relationships
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Process Section with vertical timeline */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-block mb-3 py-1.5 px-4 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center justify-center">
                <span className="emoji mr-2">🧭</span> Your Journey to Better Relationships
              </span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4">How The Process Works</h2>
            <p className="text-neutral-dark/80 text-lg max-w-2xl mx-auto">
              Our thoughtfully designed process takes you from self-discovery to practical relationship guidance in four simple steps
            </p>
          </div>

          <div className="space-y-8 md:space-y-12 px-4">
            <ProcessStep 
              number={1} 
              title="Complete the Scientific Assessment" 
              description="Answer our carefully crafted questions based on attachment theory, personality psychology, emotional intelligence, and relationship values."
              icon={<Brain className="h-5 w-5 text-blue-500" />}
            />

            <ProcessStep 
              number={2} 
              title="Receive Your Basic Compatibility Profile" 
              description="Get immediate access to your relationship type and key compatibility indicators, completely free of charge."
              icon={<UsersRound className="h-5 w-5 text-green-500" />}
            />

            <ProcessStep 
              number={3} 
              title="Unlock In-Depth Analysis" 
              description="Upgrade to the premium report for comprehensive insights, including detailed compatibility breakdowns, scientific explanations, and personalized recommendations."
              icon={<Zap className="h-5 w-5 text-amber-500" />}
            />

            <ProcessStep 
              number={4} 
              title="Apply Insights to Your Relationships" 
              description="Use your newfound self-awareness and relationship knowledge to transform your dating life and build healthier connections."
              icon={<HeartHandshake className="h-5 w-5 text-primary" />}
              isLast={true}
            />
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/quiz" 
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-xl shadow-md hover:bg-primary/90 transition duration-300"
            >
              <span className="emoji mr-2">📋</span> Start Your Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Scientific Frameworks Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 py-1.5 px-4 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center justify-center">
                <span className="emoji mr-2">🧬</span> Our Scientific Foundation
              </span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4">Comprehensive Psychological Framework</h2>
            <p className="text-lg text-neutral-dark/80 max-w-3xl mx-auto">
              Our assessment integrates multiple scientific frameworks to provide you with a holistic understanding of your relationship patterns
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FrameworkCard 
              icon={<div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><span className="emoji text-xl">🔄</span></div>}
              title="Attachment Theory" 
              description="Identifies your attachment style (Secure, Anxious, Avoidant, or Fearful) to explain your emotional bonding patterns and relationship needs."
              color="border-blue-100"
            />

            <FrameworkCard 
              icon={<div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600"><span className="emoji text-xl">👤</span></div>}
              title="Big Five Personality Traits" 
              description="Measures your key personality dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism, and their impact on relationship dynamics."
              color="border-purple-100"
            />

            <FrameworkCard 
              icon={<div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600"><span className="emoji text-xl">❤️</span></div>}
              title="Emotional Intelligence" 
              description="Evaluates your ability to recognize, understand and manage emotions in yourself and others - crucial skills for healthy relationships."
              color="border-green-100"
            />

            <FrameworkCard 
              icon={<div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"><span className="emoji text-xl">⚖️</span></div>}
              title="Relationship Values" 
              description="Analyzes your core relationship values and preferences, incorporating cultural context to provide relevant compatibility insights."
              color="border-amber-100"
            />
          </div>
        </div>
      </section>

      {/* Premium Report Value */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-purple-50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block mb-3 py-1.5 px-4 bg-primary/10 rounded-full">
                <span className="text-primary font-medium text-sm flex items-center">
                  <span className="emoji mr-2">💎</span> Premium Insights
                </span>
              </div>
              
              <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-5">
                Why Upgrade to the Premium Report?
              </h2>
              
              <p className="text-neutral-dark/80 mb-6">
                While our free assessment provides valuable initial insights, the premium report offers a comprehensive analysis worth ₹999 that transforms your understanding of relationships.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">In-depth Scientific Analysis</h3>
                    <p className="text-sm text-neutral-dark/80">Detailed breakdown of all psychological dimensions with scientific explanations</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Personalized Compatibility Matches</h3>
                    <p className="text-sm text-neutral-dark/80">Learn which attachment styles, personality types, and emotional patterns complement yours</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Relationship Growth Strategies</h3>
                    <p className="text-sm text-neutral-dark/80">Actionable recommendations to improve your relationship patterns and address challenges</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Interactive Digital Experience</h3>
                    <p className="text-sm text-neutral-dark/80">Beautiful visualization of your results with detailed explanations and resources</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Lifetime Access</h3>
                    <p className="text-sm text-neutral-dark/80">Revisit your report anytime as you grow and experience different relationships</p>
                  </div>
                </li>
              </ul>
              
              <div className="flex space-x-4">
                <Link 
                  href="/quiz" 
                  className="px-6 py-3 bg-primary text-white font-medium rounded-xl shadow-md hover:bg-primary/90 transition duration-300 flex items-center justify-center"
                >
                  <span className="emoji mr-2">🚀</span> Start Your Journey
                </Link>
                
                <Link 
                  href="/#testimonials" 
                  className="px-6 py-3 border border-neutral-300 text-neutral-dark font-medium rounded-xl hover:bg-neutral-100 transition duration-300 flex items-center justify-center"
                >
                  <span className="emoji mr-2">👥</span> See Success Stories
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-neutral-200 relative">
              <div className="absolute -top-4 -right-4 bg-primary text-white text-sm font-bold px-4 py-1 rounded-full">
                PREMIUM
              </div>
              
              <h3 className="font-heading font-bold text-xl mb-4 border-b border-neutral-200 pb-3">
                Your Comprehensive Compatibility Report
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="emoji text-xl mr-3">📊</div>
                  <div>
                    <h4 className="font-medium">Multi-dimensional Profile</h4>
                    <p className="text-sm text-neutral-dark/80">Complete breakdown of all attachment, personality, and emotional dimensions</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="emoji text-xl mr-3">🔍</div>
                  <div>
                    <h4 className="font-medium">Compatibility Analysis</h4>
                    <p className="text-sm text-neutral-dark/80">Scientific explanation of your most and least compatible relationship types</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="emoji text-xl mr-3">💡</div>
                  <div>
                    <h4 className="font-medium">Personalized Advice</h4>
                    <p className="text-sm text-neutral-dark/80">Tailored recommendations based on your unique profile</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="emoji text-xl mr-3">📝</div>
                  <div>
                    <h4 className="font-medium">Relationship Pattern Recognition</h4>
                    <p className="text-sm text-neutral-dark/80">Insights into recurring themes and dynamics in your relationships</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="emoji text-xl mr-3">🎯</div>
                  <div>
                    <h4 className="font-medium">Growth Opportunities</h4>
                    <p className="text-sm text-neutral-dark/80">Areas where personal development can enhance relationship satisfaction</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Premium Report</span>
                  <div className="flex items-center">
                    <span className="line-through text-neutral-dark/60 mr-2">₹1,499</span>
                    <span className="font-bold text-lg">₹999</span>
                  </div>
                </div>
                <div className="text-sm text-neutral-dark/80">One-time payment, lifetime access</div>
              </div>
              
              <div className="text-center">
                <Link 
                  href="/quiz" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl flex items-center justify-center transition"
                >
                  <span className="emoji mr-2">🧪</span> Take the Assessment
                </Link>
                <p className="text-xs text-neutral-dark/60 mt-2">Start with the free assessment, upgrade later if you wish</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-neutral-dark/80 max-w-3xl mx-auto">
              Everything you need to know about our compatibility assessment process
            </p>
          </div>

          <div className="bg-neutral-50 rounded-xl p-6 shadow-sm">
            <FAQItem 
              question="How accurate is the compatibility assessment?" 
              answer="Our assessment is based on established psychological frameworks validated through research and data from over 10,000 relationship profiles. It shows 85% accuracy in predicting relationship satisfaction when comparing compatible types. While no assessment is perfect, our comprehensive approach considering multiple psychological dimensions provides highly reliable insights."
            />
            
            <FAQItem 
              question="How long does the assessment take to complete?" 
              answer="The initial assessment takes approximately 10-15 minutes to complete. We've carefully designed it to be thorough while respecting your time. The questions are structured to efficiently capture your relationship patterns across multiple psychological dimensions."
            />
            
            <FAQItem 
              question="What's included in the free assessment vs. the premium report?" 
              answer="The free assessment provides your basic relationship type and primary attachment style. The premium report includes a comprehensive analysis of all psychological dimensions, detailed compatibility matches, personalized recommendations, relationship pattern analysis, and growth strategies. It provides significantly deeper insights and actionable guidance."
            />
            
            <FAQItem 
              question="Is my data secure and private?" 
              answer="Absolutely. We take your privacy seriously. Your assessment data is stored securely and is never shared with third parties. We use industry-standard encryption and security measures to protect your information. You can access our detailed privacy policy for more information."
            />
            
            <FAQItem 
              question="How is this different from other dating apps?" 
              answer="Unlike dating apps that focus primarily on matching, we provide deep insights into your relationship dynamics and compatibility patterns. Our scientific approach helps you understand why certain relationships work better for you, allowing for more informed choices rather than superficial matches."
            />
            
            <FAQItem 
              question="Can I retake the assessment in the future?" 
              answer="Yes! People grow and change over time. You can retake the assessment as often as you'd like to track your personal growth and evolving relationship patterns. If you've purchased the premium report, you'll receive updated insights each time you retake the assessment."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4">
            Start Your Compatibility Journey Today
          </h2>
          <p className="text-lg text-neutral-dark/80 mb-8 max-w-2xl mx-auto">
            Discover your relationship personality and find the connections that truly complement who you are
          </p>
          <Link 
            href="/quiz" 
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-medium rounded-xl shadow-lg hover:bg-primary/90 transition duration-300 text-lg"
            style={{animation: "pulse 4s infinite"}}
          >
            <span className="emoji mr-2">🔍</span> Take the Free Assessment
          </Link>
          <p className="mt-4 text-neutral-dark/70">No registration required to begin</p>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;