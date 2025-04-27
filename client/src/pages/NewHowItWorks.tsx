import { Link } from "wouter";
import { BookOpen, Brain, CheckCircle, Clock, FileCheck, Heart, HeartHandshake, ArrowRight, Zap, Users, Lightbulb, Target, Shield } from "lucide-react";
import CounsellingPromotion from "@/components/shared/CounsellingPromotion";

// Process step component for the 3-step process
const ProcessStep = ({ number, icon, title, description, iconColor, bgColor, borderColor }: { 
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
}) => {
  return (
    <div className={`relative p-8 rounded-xl shadow-md border ${borderColor} ${bgColor} overflow-hidden`}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -mt-12 -mr-12"></div>
      
      <div className="flex items-start">
        <div className={`flex items-center justify-center h-14 w-14 rounded-full ${iconColor} text-white font-bold text-xl flex-shrink-0 shadow-md`}>
          {icon}
        </div>
        <div className="ml-5">
          <div className="inline-block py-1 px-3 rounded-full bg-white/80 shadow-sm mb-2">
            <span className="text-gray-700 font-medium text-sm flex items-center">
              Step {number}
            </span>
          </div>
          <h3 className="text-xl font-heading font-bold mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Compatible badge component
const CompatibilityBadge = ({ color, label, description }: { 
  color: string; 
  label: string; 
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`h-16 w-16 rounded-full ${color} flex items-center justify-center shadow-lg mb-3 border-4 border-white`}>
        <span className="text-2xl">
          {color.includes('green') && '🟢'}
          {color.includes('yellow') && '🟡'}
          {color.includes('red') && '🔴'}
        </span>
      </div>
      <h3 className="font-bold text-gray-800 mb-1">{label}</h3>
      <p className="text-sm text-gray-600 text-center max-w-xs">{description}</p>
    </div>
  );
};

// Report section card component
const ReportSection = ({ icon, title, description, features }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-pink-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-pink-50 text-primary mr-3">
          {icon}
        </div>
        <h3 className="font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Application card for step 3
const ApplicationCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-purple-100 hover:border-purple-300 transition-all shadow-sm">
      <div className="flex items-center mb-3">
        <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mr-3">
          {icon}
        </div>
        <h4 className="font-bold text-gray-800">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

// FAQ item component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <details className="group">
        <summary className="flex justify-between items-center cursor-pointer list-none">
          <h3 className="text-lg font-medium text-gray-800">{question}</h3>
          <span className="transition group-open:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </summary>
        <div className="mt-3 text-gray-600">
          <p>{answer}</p>
        </div>
      </details>
    </div>
  );
};

const StatItem = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm border border-pink-100">
      <div className="text-2xl font-bold text-primary mb-1">{value}</div>
      <div className="text-sm text-gray-600 text-center">{label}</div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="pt-0 pb-20">
      {/* Hero section */}
      <section className="pt-8 pb-16 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-block mb-6 py-1.5 px-4 bg-white rounded-full shadow-sm">
            <span className="text-gray-700 font-medium text-sm flex items-center">
              <span className="mr-2">📖</span> The Simple Three-Step Process
            </span>
          </div>
          
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-6 text-gray-800">
            Dating Doesn't Come With a User Manual, <br />
            <span style={{ color: '#e83a8e' }}>But We Might Be the Next Best Thing!</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We've made the process simple and user-friendly. In fact, you can break it down into three easy steps. Unlike a dating app, we're not matching you with strangers - we're giving you the insights to find better matches on your own.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-pink-100">
              <Clock className="h-4 w-4 text-pink-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">5-7 minute quiz</span>
            </div>
            
            <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-pink-100">
              <FileCheck className="h-4 w-4 text-pink-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">40 intuitive questions</span>
            </div>
            
            <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-pink-100">
              <Shield className="h-4 w-4 text-pink-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">100% private results</span>
            </div>
          </div>
          
          <Link 
            href="/register" 
            className="inline-flex items-center justify-center px-8 py-4 text-white font-bold text-lg rounded-lg shadow-lg border border-pink-200 hover:opacity-90 transform hover:translate-y-[-2px] transition-all duration-300"
            style={{ backgroundColor: '#e83a8e' }}
          >
            Start My FREE Compatibility Quiz
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
          
          <div className="mt-5 text-sm text-gray-500">No endless swiping. No awkward small talk with strangers. Just you, exploring you.</div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatItem value="67%" label="of online daters never even have a date from apps" />
            <StatItem value="5 min" label="is all it takes to complete our compatibility quiz" />
            <StatItem value="3" label="scientifically-backed personality indicators" />
            <StatItem value="100%" label="focused on your personal growth and understanding" />
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 py-1.5 px-4 bg-pink-50 rounded-full">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">🚀</span> The Journey to Better Relationships
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4 text-gray-800">
              How It Works - Your Path to Relationship Clarity
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're not setting you up on dates. We're setting you up with insights that you can take into the real world.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <ProcessStep
              number={1}
              icon={<BookOpen className="h-7 w-7" />}
              title="Take the Quiz"
              description="This is the fun part! The quiz has 40 questions covering various scenarios and preferences. Most people finish in about 5 to 7 minutes. Just be honest with your answers."
              iconColor="bg-gradient-to-br from-pink-500 to-pink-600"
              bgColor="bg-gradient-to-br from-pink-50 to-pink-100/50"
              borderColor="border-pink-200"
            />
            
            <ProcessStep
              number={2}
              icon={<FileCheck className="h-7 w-7" />}
              title="Get Your Report"
              description="Once you finish, instantly see your Compatibility Profile with your Green, Yellow, or Red badge. You'll get a detailed breakdown of your personality and relationship style."
              iconColor="bg-gradient-to-br from-purple-500 to-purple-600"
              bgColor="bg-gradient-to-br from-purple-50 to-purple-100/50"
              borderColor="border-purple-200"
            />
            
            <ProcessStep
              number={3}
              icon={<Zap className="h-7 w-7" />}
              title="Apply Your Results"
              description="Use your profile as a dating compass. Whether you're single, dating, or in a relationship, your report provides insights to guide better relationship decisions."
              iconColor="bg-gradient-to-br from-blue-500 to-blue-600"
              bgColor="bg-gradient-to-br from-blue-50 to-blue-100/50"
              borderColor="border-blue-200"
            />
          </div>
          
          <div className="text-center">
            <Link 
              href="/register" 
              className="inline-flex items-center px-6 py-3 text-white font-medium rounded-xl shadow-md hover:opacity-90 transition-all"
              style={{ backgroundColor: '#e83a8e' }}
            >
              Start My Quiz Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Step 2: Compatibility Report Badges Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 py-1.5 px-4 bg-white rounded-full shadow-sm">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">🎯</span> Step 2: Your Compatibility Report
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4 text-gray-800">
              Understanding Your Compatibility Badge
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our easy-to-understand color system helps you quickly grasp your relationship outlook
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <CompatibilityBadge 
              color="bg-green-500" 
              label="Green Badge" 
              description="You're showing strong relationship potential with healthy attachment patterns and emotional skills. You likely form stable bonds and communicate effectively."
            />
            
            <CompatibilityBadge 
              color="bg-yellow-500" 
              label="Yellow Badge" 
              description="You have a mix of strengths and growth areas. With some self-awareness and effort, you can build successful relationships by addressing specific patterns."
            />
            
            <CompatibilityBadge 
              color="bg-red-500" 
              label="Red Badge" 
              description="You may have significant challenges in forming healthy relationships. Your report will highlight specific areas to work on with extra attention and possibly professional guidance."
            />
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="font-bold text-xl text-gray-800 mb-3">Your Comprehensive Report Includes:</h3>
              <p className="text-gray-600">Everything is presented in simple, everyday language - no psychology degree needed!</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <ReportSection
                icon={<Brain className="h-5 w-5" />}
                title="Personality Analysis"
                description="Understand your core traits and how they affect your relationships."
                features={[
                  "Big Five Personality Traits",
                  "Myers-Briggs (MBTI) Type",
                  "Personality strengths & blind spots"
                ]}
              />
              
              <ReportSection
                icon={<Heart className="h-5 w-5" />}
                title="Attachment Style"
                description="Discover how you form emotional bonds and connections."
                features={[
                  "Your attachment style explained",
                  "How it affects your relationships",
                  "Potential challenges & solutions"
                ]}
              />
              
              <ReportSection
                icon={<Lightbulb className="h-5 w-5" />}
                title="Compatibility Insights"
                description="Learn what types of partners are most compatible with you."
                features={[
                  "Your most compatible types",
                  "Potential relationship challenges",
                  "Personalized relationship tips"
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: Apply Your Results */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 py-1.5 px-4 bg-purple-50 rounded-full">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">💡</span> Step 3: Apply Your Results
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4 text-gray-800">
              Using Your Compatibility Profile in Real Life
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Knowledge is power - especially when it comes to relationships. Here's how to use your results effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            <ApplicationCard
              icon={<Target className="h-5 w-5" />}
              title="Dating Compass"
              description="Use your report as a guide pointing you toward healthier relationships and helping you recognize red flags early."
            />
            
            <ApplicationCard
              icon={<Users className="h-5 w-5" />}
              title="Partner Insights"
              description="Invite your partner or date to take the quiz too and compare results for deeper understanding and better communication."
            />
            
            <ApplicationCard
              icon={<HeartHandshake className="h-5 w-5" />}
              title="Dating Profile"
              description="Highlight parts of your WhoToDate results on your dating app profiles to attract more compatible matches."
            />
            
            <ApplicationCard
              icon={<BookOpen className="h-5 w-5" />}
              title="Personal Growth"
              description="Identify your relationship strengths and areas for improvement to become a better partner over time."
            />
          </div>
          
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-md border border-pink-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 md:pr-8 mb-6 md:mb-0">
                <h3 className="font-bold text-xl text-gray-800 mb-4">Your Love Life, Upgraded</h3>
                <p className="text-gray-600 mb-4">
                  To recap the flow – you take a quick quiz, you get deep insights about your personality and compatibility (color-coded for clarity), and then you apply those insights to make smarter choices in dating.
                </p>
                <p className="text-gray-600">
                  That confidence and clarity you exude after understanding your profile? Trust us, it's attractive. People will notice the self-assuredness.
                </p>
              </div>
              
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-white p-5 rounded-xl shadow-md border border-pink-200 text-center">
                  <div className="rounded-full bg-pink-50 w-16 h-16 mx-auto flex items-center justify-center mb-4">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Ready for a Better Approach?</h4>
                  <Link 
                    href="/register" 
                    className="inline-flex items-center justify-center px-4 py-2 text-white font-medium rounded-lg text-sm shadow-md hover:opacity-90 transition-all"
                    style={{ backgroundColor: '#e83a8e' }}
                  >
                    Take the Free Quiz
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 py-1.5 px-4 bg-white rounded-full shadow-sm">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">❓</span> Frequently Asked Questions
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4 text-gray-800">
              Got Questions? We've Got Answers
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you might want to know about our compatibility quiz and reports
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-200">
            <FAQItem 
              question="Is this a dating app where I'll match with others?" 
              answer="No, WhoToDate is not a dating app. We don't show you profiles or make you swipe on strangers. We're a self-discovery tool that helps you understand your relationship patterns, so you can make better choices in your dating life."
            />
            
            <FAQItem 
              question="How long does the quiz take?" 
              answer="Most people complete the quiz in 5-7 minutes. There are 40 questions, and they're designed to be intuitive and quick to answer. You don't need to study or prepare - just be honest!"
            />
            
            <FAQItem 
              question="How do I use the results in real life?" 
              answer="Your report acts like a relationship compass. You can use it to guide your dating decisions, share with potential partners as a conversation starter, or highlight aspects on your dating profiles. Many users also share their results with friends for additional insights."
            />
            
            <FAQItem 
              question="Are my results private?" 
              answer="Absolutely. Your quiz answers and results are completely private unless you choose to share them. We don't display your profile to other users or make any of your information public. We take your privacy seriously."
            />
            
            <FAQItem 
              question="How accurate is the compatibility profile?" 
              answer="Our quiz is based on established psychological frameworks including the Big Five personality traits, attachment theory, and more. While no personality assessment is perfect, our users consistently report that the results align with their relationship experiences and provide valuable insights."
            />
            
            <FAQItem 
              question="What if I get a Yellow or Red badge?" 
              answer="These badges aren't negative judgments - they're opportunities for growth! Yellow and Red badges highlight specific relationship challenges you might face, but also provide guidance on how to address these areas. Many successful relationships involve at least one person with a Yellow badge who's mindful of their growth areas."
            />
          </div>
        </div>
      </section>
      
      {/* Counselling Promotion */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 py-1.5 px-4 bg-pink-50 rounded-full shadow-sm">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">❤️</span> Professional Support
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4 text-gray-800">
              Need Deeper Guidance? <span style={{ color: '#e83a8e' }}>We've Got You Covered</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sometimes you need more than a quiz. Our counselling service connects you with experienced 
              relationship professionals who can help you navigate complex emotions and situations.
            </p>
          </div>
          
          <CounsellingPromotion variant="default" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white rounded-xl p-8 shadow-md border border-pink-100">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4 text-gray-800">
              Ready to Transform Your Love Life?
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Take the 5-minute quiz today and get instant insights into your relationship personality
            </p>
            
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center px-8 py-4 text-white font-bold text-lg rounded-lg shadow-lg border border-pink-200 hover:opacity-90 transform hover:translate-y-[-2px] transition-all duration-300"
              style={{ backgroundColor: '#e83a8e' }}
            >
              Start My FREE Compatibility Quiz
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="inline-flex items-center bg-pink-50 px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">5-minute quiz</span>
              </div>
              
              <div className="inline-flex items-center bg-pink-50 px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Instant results</span>
              </div>
              
              <div className="inline-flex items-center bg-pink-50 px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Science-backed insights</span>
              </div>
              
              <div className="inline-flex items-center bg-pink-50 px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">100% private</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;