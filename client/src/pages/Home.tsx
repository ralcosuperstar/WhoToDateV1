import { Link } from "wouter";
import { Helmet } from 'react-helmet';
import { motion } from "framer-motion";
import { 
  Heart, 
  Users, 
  Brain, 
  Target, 
  Lightbulb, 
  ChevronRight, 
  CheckCircle2, 
  Check, 
  Timer, 
  ShieldCheck, 
  Medal,
  Sparkles,
  BadgeCheck,
  Star,
  Fingerprint 
} from "lucide-react";
import CounsellingPromotion from "@/components/shared/CounsellingPromotion";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>WhoToDate - Find Who to Date With Science and Fun</title>
        <meta name="description" content="Take our FREE 5-minute compatibility quiz to boost your dating confidence. Discover your personality traits, attachment style, and who fits you best." />
        <meta property="og:title" content="WhoToDate - Find Who to Date With Science and Fun" />
        <meta property="og:description" content="Take our FREE 5-minute compatibility quiz to boost your dating confidence. Discover your personality traits, attachment style, and who fits you best." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WhoToDate - Find Who to Date With Science and Fun" />
        <meta name="twitter:description" content="Take our FREE 5-minute compatibility quiz to boost your dating confidence. Discover your personality traits, attachment style, and who fits you best." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-16 md:pt-24 pb-16 bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side content */}
            <div className="order-1 md:order-1">
              <div className="inline-block mb-4 py-1.5 px-4 bg-pink-50 rounded-full shadow-sm">
                <span className="text-gray-700 font-medium text-sm flex items-center">
                  <span className="mr-2">🧬</span> A 5-minute compatibility quiz
                </span>
              </div>
              
              <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-6 text-gray-800 leading-tight">
                Take the Guesswork out of <span style={{ color: '#e83a8e' }}>Dating</span> with Science
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 max-w-xl">
                Modern dating feels overwhelming? You're not alone. Almost half of Indian singles report dating app fatigue. WhoToDate's free 5-minute quiz gives you a personalized compatibility guide—it's not a dating app, but a <span className="font-semibold">self-discovery tool rooted in psychology</span>.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
                  <Timer className="h-4 w-4 text-pink-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Takes 5 minutes</span>
                </div>
                
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">100% Private</span>
                </div>
                
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
                  <Medal className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Indian Singles Focus</span>
                </div>
                
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
                  <Users className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">For teens & adults</span>
                </div>
              </div>
              
              <div className="mb-8">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-4 text-white font-bold text-lg rounded-lg shadow-lg border border-pink-200 hover:opacity-90 transform hover:translate-y-[-2px] transition-all duration-300"
                  style={{ backgroundColor: '#e83a8e' }}
                >
                  Start My FREE Compatibility Quiz
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <div className="mt-3">
                  <p className="text-xs text-gray-500 flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                    No signup needed, just honest answers!
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center text-xs">😊</div>
                  <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-xs">🤩</div>
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-xs">🙂</div>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-pink-600">50,000+</span> Indian singles use our quiz
                </p>
              </div>
            </div>
            
            {/* Right side visual */}
            <div className="order-2 md:order-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 relative">
                {/* Color badges at top */}
                <div className="flex justify-center space-x-4 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-1">
                      <span>🟢</span>
                    </div>
                    <span className="text-xs font-medium text-gray-600">Green</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-1">
                      <span>🟡</span>
                    </div>
                    <span className="text-xs font-medium text-gray-600">Yellow</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-1">
                      <span>🔴</span>
                    </div>
                    <span className="text-xs font-medium text-gray-600">Red</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Your Dating Compatibility Report</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <Brain className="h-5 w-5 text-pink-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Personality Type</h3>
                        <p className="text-sm text-gray-600">Know your traits and how they affect your relationships</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <Heart className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Attachment Style</h3>
                        <p className="text-sm text-gray-600">Understand how you connect and bond with partners</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Compatibility Badge</h3>
                        <p className="text-sm text-gray-600">Get your green, yellow, or red relationship indicator</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center px-6 py-2.5 text-white font-medium rounded-lg shadow-md border border-pink-200 hover:opacity-90 text-sm"
                    style={{ backgroundColor: '#e83a8e' }}
                  >
                    See Sample Report
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* What sets us apart section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 py-1.5 px-4 bg-pink-50 rounded-full">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">🔍</span> What's the Unique Value?
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4 text-gray-800">
              WhoToDate isn't a dating app – <span className="text-pink-600">it's better</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We won't show you random profiles or make you swipe endlessly. Instead, we empower you with knowledge about yourself.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all h-full">
              <div className="bg-pink-500 p-3 rounded-xl inline-flex items-center justify-center text-white mb-4">
                <Brain className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Psychology-Backed</h3>
              <p className="text-gray-600">
                Grounded in research from psychology. The same personality factors therapists discuss with couples. Not superstition or gimmicks – but proven traits and patterns.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all h-full">
              <div className="bg-purple-500 p-3 rounded-xl inline-flex items-center justify-center text-white mb-4">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Non-Judgmental & Private</h3>
              <p className="text-gray-600">
                It's not a test you pass or fail. There are no "bad" personalities here. Your answers and results are confidential. A safe space to be honest.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all h-full">
              <div className="bg-blue-500 p-3 rounded-xl inline-flex items-center justify-center text-white mb-4">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Growth-Focused</h3>
              <p className="text-gray-600">
                Whether you get a "green" or "red" result, the goal is to help you grow. Get tips to improve yourself or learn what to watch out for in relationships.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 py-1.5 px-4 bg-white rounded-full shadow-sm">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">🎯</span> How Does It Work?
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4 text-gray-800">
              Three Simple Steps to Dating Confidence
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our process is designed to be quick, insightful, and immediately useful in your dating life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md relative z-10 h-full">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-xl">1</div>
                <h3 className="font-bold text-xl text-gray-800 mb-4 mt-2">Take the Quiz</h3>
                <p className="text-gray-600 mb-4">
                  Answer 40 simple questions about yourself – your habits, feelings, and preferences. No right or wrong answers, just be honest.
                </p>
                <div className="text-sm text-gray-500 flex items-center mt-auto">
                  <Timer className="h-4 w-4 mr-2" />
                  Takes about 5 minutes
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md relative z-10 h-full">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xl">2</div>
                <h3 className="font-bold text-xl text-gray-800 mb-4 mt-2">Get Your Results</h3>
                <p className="text-gray-600 mb-4">
                  Immediately see your Compatibility Report with a color-coded badge and detailed breakdown of your personality type, attachment style, and more.
                </p>
                <div className="text-sm text-gray-500 flex items-center mt-auto">
                  <BadgeCheck className="h-4 w-4 mr-2" />
                  Instant personalized insights
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md relative z-10 h-full">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">3</div>
                <h3 className="font-bold text-xl text-gray-800 mb-4 mt-2">Use Your Insights</h3>
                <p className="text-gray-600 mb-4">
                  Apply your new self-knowledge to approach dating with confidence. Know what you need, what to look for, and get tips on better communication.
                </p>
                <div className="text-sm text-gray-500 flex items-center mt-auto">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Transform your approach to dating
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-white font-bold text-lg rounded-lg shadow-lg border border-pink-200 hover:opacity-90 transform hover:translate-y-[-2px] transition-all duration-300"
              style={{ backgroundColor: '#e83a8e' }}
            >
              Start My FREE Compatibility Quiz
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* The Science Behind */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 py-1.5 px-4 bg-pink-50 rounded-full">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">🧠</span> The Science Behind WhoToDate
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4 text-gray-800">
              Dating with Data, Not Just Gut Feelings
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our quiz is built on five established psychological frameworks that researchers say play a huge role in compatibility.
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4 mb-12">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md text-center">
              <div className="mb-3 text-pink-500">
                <Brain className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="font-bold text-gray-800">Big Five Traits</h3>
              <p className="text-xs text-gray-600 mt-1">Personality dimensions most psychologists agree on</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md text-center">
              <div className="mb-3 text-purple-500">
                <Fingerprint className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="font-bold text-gray-800">MBTI</h3>
              <p className="text-xs text-gray-600 mt-1">16 personality types and cognitive functions</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md text-center">
              <div className="mb-3 text-blue-500">
                <Heart className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="font-bold text-gray-800">Attachment</h3>
              <p className="text-xs text-gray-600 mt-1">How we form bonds with romantic partners</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md text-center">
              <div className="mb-3 text-amber-500">
                <Sparkles className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="font-bold text-gray-800">EQ</h3>
              <p className="text-xs text-gray-600 mt-1">Emotional intelligence in relationships</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md text-center">
              <div className="mb-3 text-green-500">
                <BadgeCheck className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="font-bold text-gray-800">Core Values</h3>
              <p className="text-xs text-gray-600 mt-1">What matters most to you in life and love</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Link
              href="/science"
              className="inline-flex items-center justify-center px-6 py-3 text-gray-700 font-medium rounded-lg shadow-md border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300"
            >
              Learn More About The Science
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 py-1.5 px-4 bg-white rounded-full shadow-sm">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">💬</span> Real Users, Real Stories
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4 text-gray-800">
              Hear From People Like You
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our quiz has helped thousands of Indian singles gain clarity about themselves and their relationships.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md h-full">
              <div className="flex text-yellow-400 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              
              <p className="text-gray-600 italic mb-6">
                "I was skeptical at first, but the WhoToDate quiz blew me away. My report explained why my last relationship fell apart. It gave me tips on how to communicate my needs. I feel so much more confident about dating now."
              </p>
              
              <div className="flex items-center mt-auto">
                <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-medium mr-3">AS</div>
                <div>
                  <p className="font-bold text-gray-800">Aditi S.</p>
                  <p className="text-sm text-gray-500">Mumbai, 24</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md h-full">
              <div className="flex text-yellow-400 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              
              <p className="text-gray-600 italic mb-6">
                "I'm a college student totally new to dating. I took the quiz on a whim. It was actually fun, and the results were eerily accurate. I'm an INFP with a Secure attachment. The report called me a 'Thoughtful Idealist' and I got a green badge which feels encouraging!"
              </p>
              
              <div className="flex items-center mt-auto">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-medium mr-3">RP</div>
                <div>
                  <p className="font-bold text-gray-800">Rahul P.</p>
                  <p className="text-sm text-gray-500">Delhi, 19</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md h-full">
              <div className="flex text-yellow-400 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              
              <p className="text-gray-600 italic mb-6">
                "The cultural aspects in the report were a nice surprise. My parents are already talking marriage, and my WhoToDate results gave me language to explain what I'm looking for in a partner beyond the usual criteria. I value Openness a lot, which might clash with traditional expectations."
              </p>
              
              <div className="flex items-center mt-auto">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 font-medium mr-3">PK</div>
                <div>
                  <p className="font-bold text-gray-800">Priya K.</p>
                  <p className="text-sm text-gray-500">Bangalore, 28</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Counselling Promotion */}
      <section className="py-16 px-4 bg-white" id="counselling-promo">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 py-1.5 px-4 bg-pink-50 rounded-full shadow-sm">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">❤️</span> Relationship Support
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4 text-gray-800">
              Need to Talk? We're <span style={{ color: '#e83a8e' }}>Here For You</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sometimes relationships need a little extra support. Connect with verified counselors who
              specialize in relationship dynamics, emotional health, and personal growth.
            </p>
          </div>
          
          <CounsellingPromotion variant="full" />
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-10 shadow-lg border border-pink-100 text-center">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4 text-gray-800">
              Ready to Boost Your Dating Confidence?
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Don't leave your love life to chance. Join thousands of others who have turned self-discovery into dating success. Take the quiz now – it's free, private, and takes just 5 minutes.
            </p>
            
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-white font-bold text-lg rounded-lg shadow-lg border border-pink-200 hover:opacity-90 transform hover:translate-y-[-2px] transition-all duration-300"
              style={{ backgroundColor: '#e83a8e' }}
            >
              Start My FREE Compatibility Quiz
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <Check className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">No signup needed</span>
              </div>
              
              <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <Check className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">5-minute assessment</span>
              </div>
              
              <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <Check className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Instant results</span>
              </div>
              
              <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <Check className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Science-backed insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
