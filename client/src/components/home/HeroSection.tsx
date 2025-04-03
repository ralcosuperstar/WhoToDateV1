import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="pt-40 pb-12 relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Background elements - subtle & mobile-friendly */}
      <div className="absolute top-0 right-0 -mt-5 -mr-10 w-40 h-40 sm:w-60 sm:h-60 bg-pink-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-5 -ml-10 w-40 h-40 sm:w-60 sm:h-60 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text content - Clear USP and value proposition */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <div className="inline-block mb-3 py-1 px-3 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center">
                <span className="emoji mr-1">🔬</span> Science-Based Relationship Insights
              </span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-4 leading-tight">
              Find Relationships That <span className="text-primary relative">
                Actually Suit You
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,0 Q50,12 100,0" fill="none" stroke="rgba(255,82,122,0.3)" strokeWidth="8" />
                </svg>
              </span>
            </h1>

            <p className="text-neutral-dark/90 text-base sm:text-lg mb-5 max-w-lg mx-auto md:mx-0">
              <span className="emoji mr-1">🧪</span> Our scientifically validated assessment reveals the relationship types that complement your unique personality traits and emotional patterns.
            </p>

            {/* Direct benefit bullets - what you'll learn */}
            <ul className="mb-6 text-left bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm max-w-md mx-auto md:mx-0">
              <li className="flex items-start mb-2">
                <span className="emoji mr-2 mt-0.5">🧠</span>
                <span className="text-sm">Understand your <strong>attachment style</strong> and emotional patterns</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="emoji mr-2 mt-0.5">🧩</span>
                <span className="text-sm">Discover which personality types <strong>naturally complement</strong> yours</span>
              </li>
              <li className="flex items-start">
                <span className="emoji mr-2 mt-0.5">🛠️</span>
                <span className="text-sm">Get <strong>practical insights</strong> to improve current and future relationships</span>
              </li>
            </ul>

            {/* Strong CTAs with action and clear value */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-3">
              <Link href="/register" className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-medium rounded-xl shadow-md hover:bg-primary/90 transition duration-300 flex items-center justify-center" style={{animation: "pulse 4s infinite"}}>
                <span className="emoji mr-2">📋</span>
                <span>Take the Relationship Assessment</span>
              </Link>

              <Link href="/#compatibility-science" className="w-full sm:w-auto px-6 py-3 border border-primary text-primary font-medium rounded-xl hover:bg-primary/5 transition duration-300 flex items-center justify-center">
                <span className="emoji mr-2">🔬</span>
                <span>See The Science</span>
              </Link>
            </div>

            {/* Trust indicators - scientific credibility */}
            <div className="mt-6 flex items-center justify-center md:justify-start">
              <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <span className="text-xs text-neutral-dark/80 mr-1">Based on</span>
                <div className="flex space-x-1.5">
                  <div className="px-2 py-0.5 bg-blue-50 rounded-md text-xs font-medium text-blue-600">Attachment Theory</div>
                  <div className="px-2 py-0.5 bg-purple-50 rounded-md text-xs font-medium text-purple-600">Big Five</div>
                  <div className="px-2 py-0.5 bg-amber-50 rounded-md text-xs font-medium text-amber-600">MBTI</div>
                </div>
              </div>
            </div>

            {/* Research validation badge */}
            <div className="mt-3 flex items-center justify-center md:justify-start">
              <div className="flex items-center text-neutral-dark/70 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Validated with <span className="font-medium">10,000+</span> relationship profiles</span>
              </div>
            </div>
          </div>

          {/* Visual preview - sample quiz & results */}
          <div className="w-full md:w-1/2 md:pl-6">
            <div className="relative">
              {/* Sample quiz card - showing scientific depth */}
              <div className="bg-white rounded-xl shadow-lg p-4 mb-4 border border-pink-100 max-w-sm mx-auto">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="emoji">🧪</span>
                  </div>
                  <h3 className="font-semibold text-base ml-2">Attachment Assessment <span className="text-xs text-neutral-dark/60">Question 3 of 15</span></h3>
                </div>
                
                <div className="space-y-3">
                  <p className="font-medium text-sm">When your partner needs emotional space, you typically:</p>
                  <div className="space-y-2">
                    <label className="flex items-center p-2 rounded-lg border border-pink-100 hover:border-primary hover:bg-pink-50 cursor-pointer transition">
                      <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                      <span className="ml-2 text-sm">Feel anxious about what they're thinking</span>
                    </label>
                    <label className="flex items-center p-2 rounded-lg border border-pink-100 hover:border-primary hover:bg-pink-50 cursor-pointer transition">
                      <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                      <span className="ml-2 text-sm">Respect their needs and focus on your own interests</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Floating compatibility card - scientific depth showcase */}
              <div className="bg-white rounded-xl shadow-lg p-4 border border-pink-100 max-w-sm mx-auto relative z-10 floating">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-base">Your Relationship Analysis</h3>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">Scientific</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Attachment Style: <span className="text-primary">Secure (82%)</span></span>
                      <span className="text-xs bg-green-50 text-green-600 px-1.5 rounded">Strength</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                      <div className="h-full w-[82%] bg-primary rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Emotional Intelligence: <span className="text-blue-500">High (75%)</span></span>
                      <span className="text-xs bg-green-50 text-green-600 px-1.5 rounded">Strength</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                      <div className="h-full w-[75%] bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <div className="bg-green-50 p-2 rounded-lg flex-1 text-center">
                      <span className="emoji block text-lg">✅</span>
                      <span className="text-xs font-medium">Compatible With</span>
                      <p className="text-xs text-neutral-dark/70">Secure, Anxious</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded-lg flex-1 text-center">
                      <span className="emoji block text-lg">⚠️</span>
                      <span className="text-xs font-medium">Challenge With</span>
                      <p className="text-xs text-neutral-dark/70">Avoidant</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 h-full w-full bg-yellow-100/50 rounded-xl -z-10 rotate-2"></div>
              <div className="absolute -bottom-2 -left-2 h-full w-full bg-purple-100/50 rounded-xl -z-20 -rotate-1"></div>
            </div>
            
            {/* Trust badges - scientific focus */}
            <div className="grid grid-cols-3 gap-2 mt-6 max-w-sm mx-auto">
              <div className="flex flex-col items-center bg-white/80 rounded-lg p-2 shadow-sm">
                <span className="emoji mb-1">⏱️</span>
                <span className="text-xs text-neutral-dark/70 text-center">5-Min Assessment</span>
              </div>
              <div className="flex flex-col items-center bg-white/80 rounded-lg p-2 shadow-sm">
                <span className="emoji mb-1">📊</span>
                <span className="text-xs text-neutral-dark/70 text-center">Research-Based</span>
              </div>
              <div className="flex flex-col items-center bg-white/80 rounded-lg p-2 shadow-sm">
                <span className="emoji mb-1">🇮🇳</span>
                <span className="text-xs text-neutral-dark/70 text-center">Indian Context</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;