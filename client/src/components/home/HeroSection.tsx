import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="pt-28 sm:pt-32 md:pt-36 pb-12 relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Mobile-optimized background elements */}
      <div className="absolute top-0 right-0 -mt-5 -mr-10 w-40 h-40 sm:w-60 sm:h-60 bg-pink-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-5 -ml-10 w-40 h-40 sm:w-60 sm:h-60 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4">
        {/* Mobile headline banner - with extra padding to prevent overlap */}
        <div className="mb-6 mt-4 text-center bg-white rounded-xl shadow-sm py-3 px-4 border border-pink-100 md:hidden">
          <h1 className="font-bold text-xl sm:text-2xl leading-tight">
            <span className="emoji">💘</span> Tired of dating the wrong people?
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          {/* Text content - Clear USP and conversational language */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <div className="inline-block mb-3 py-1 px-3 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center">
                <span className="emoji mr-1">✨</span> Discover Your Perfect Match Type
              </span>
            </div>

            {/* Desktop headline - clear problem/solution framing */}
            <h1 className="hidden md:block font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
              Stop Wasting Time With <span className="text-primary relative">
                The Wrong People
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,0 Q50,12 100,0" fill="none" stroke="rgba(255,82,122,0.3)" strokeWidth="8" />
                </svg>
              </span>
            </h1>

            {/* Conversational value proposition */}
            <p className="text-neutral-dark/90 text-lg mb-6 max-w-lg mx-auto md:mx-0">
              Our 5-minute quiz reveals exactly who you're naturally compatible with, based on your personality. It's like having a relationship coach in your pocket!
            </p>

            {/* Social proof - urgency and popularity */}
            <div className="flex items-center justify-center md:justify-start mb-6">
              <div className="flex -space-x-2 mr-3">
                <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-pink-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-purple-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-yellow-300 border-2 border-white flex items-center justify-center text-xs font-bold">+</div>
              </div>
              <p className="text-sm font-medium"><span className="text-primary">600+</span> people took the test today</p>
            </div>

            {/* Benefit boxes - clear comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="bg-white rounded-xl p-3 shadow-sm border border-pink-100 relative">
                <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-0.5 rounded-lg">
                  WITHOUT US
                </div>
                <div className="flex items-start mb-2">
                  <span className="emoji mr-2 text-lg">😩</span>
                  <h3 className="font-medium text-base">Endless Dating Frustration</h3>
                </div>
                <ul className="space-y-1.5 pl-7">
                  <li className="text-sm text-neutral-dark/80 list-disc">Wasting time with wrong matches</li>
                  <li className="text-sm text-neutral-dark/80 list-disc">Repeating same relationship mistakes</li>
                  <li className="text-sm text-neutral-dark/80 list-disc">Feeling confused about failed relationships</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-3 shadow-sm border border-green-100 relative">
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-lg">
                  WITH US
                </div>
                <div className="flex items-start mb-2">
                  <span className="emoji mr-2 text-lg">🥰</span>
                  <h3 className="font-medium text-base">Find Your Perfect Match</h3>
                </div>
                <ul className="space-y-1.5 pl-7">
                  <li className="text-sm text-neutral-dark/80 list-disc">Know exactly who's right for you</li>
                  <li className="text-sm text-neutral-dark/80 list-disc">Understand your relationship patterns</li>
                  <li className="text-sm text-neutral-dark/80 list-disc">Build healthier, happier relationships</li>
                </ul>
              </div>
            </div>

            {/* Strong primary CTA with social proof */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-pink-100 shadow-sm mb-6">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <div className="flex items-center">
                  <div className="flex">
                    <span className="text-yellow-400">★</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-yellow-400">★</span>
                  </div>
                  <span className="text-sm font-medium ml-2">4.9/5 from 2,000+ users</span>
                </div>
              </div>
              
              <Link href="/register" className="w-full py-4 bg-primary text-white font-bold text-lg rounded-xl shadow-md hover:bg-primary/90 transition duration-300 flex items-center justify-center" style={{animation: "pulse 2s infinite"}}>
                <span className="emoji mr-2">🚀</span>
                <span>Take The Free Quiz Now</span>
              </Link>
              
              <p className="text-xs text-center mt-2 text-neutral-dark/70">100% free comprehensive results and insights</p>
            </div>

            {/* Trust elements */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <span className="emoji mr-1">🔒</span>
                <span className="text-xs">100% Private</span>
              </div>
              <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <span className="emoji mr-1">⏱️</span>
                <span className="text-xs">5 Minutes</span>
              </div>
              <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <span className="emoji mr-1">🧠</span>
                <span className="text-xs">Science-Based</span>
              </div>
              <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <span className="emoji mr-1">📱</span>
                <span className="text-xs">Mobile-Friendly</span>
              </div>
            </div>
          </div>

          {/* Visual preview - relationship report mockup */}
          <div className="w-full md:w-1/2 md:pl-6">
            <div className="relative">
              {/* Main mockup of the personality report */}
              <div className="bg-white rounded-xl shadow-lg p-5 border border-pink-100 max-w-sm mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="emoji text-lg">❤️</span>
                    </div>
                    <h3 className="font-semibold text-lg ml-2">Your Love Profile</h3>
                  </div>
                  
                  <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    <span className="emoji mr-1">✅</span> GREEN
                  </div>
                </div>
                
                {/* Sample compatibility card */}
                <div className="mb-4 bg-green-50 rounded-lg p-3 border border-green-100">
                  <h4 className="font-medium text-sm mb-1">Your Personality Type:</h4>
                  <div className="flex items-center">
                    <div className="bg-white p-2 rounded-lg mr-2">
                      <span className="emoji text-2xl">😊</span>
                    </div>
                    <div>
                      <p className="font-bold text-base">The Supportive Partner</p>
                      <p className="text-xs text-neutral-dark/70">You're attentive, emotionally connected, and create secure relationships</p>
                    </div>
                  </div>
                </div>
                
                {/* Perfect match section */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Your Perfect Match:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white border border-pink-100 p-2 rounded-lg text-center">
                      <span className="emoji block text-2xl mb-1">🌟</span>
                      <span className="text-xs font-medium">The Confident Leader</span>
                    </div>
                    <div className="bg-white border border-pink-100 p-2 rounded-lg text-center">
                      <span className="emoji block text-2xl mb-1">🔥</span>
                      <span className="text-xs font-medium">The Passionate Creator</span>
                    </div>
                  </div>
                </div>
                
                {/* Relationship strengths preview */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Your Relationship Strengths:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 flex-shrink-0">
                        <span className="emoji text-xs">💯</span>
                      </div>
                      <p className="text-xs">Strong emotional connection abilities</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 flex-shrink-0">
                        <span className="emoji text-xs">🤝</span>
                      </div>
                      <p className="text-xs">Natural harmony with complementary types</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 flex-shrink-0">
                        <span className="emoji text-xs">🧠</span>
                      </div>
                      <p className="text-xs">Excellent communication skills</p>
                    </div>
                  </div>
                </div>
                
                {/* Full report details */}
                <div className="mt-4 bg-primary/5 rounded-lg p-3 border border-dashed border-primary/30">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-sm">Full Report Included</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">100% Free</span>
                  </div>
                  <p className="text-xs text-neutral-dark/70 mb-2">Get comprehensive compatibility insights & guidance</p>
                  <div className="flex justify-center">
                    <span className="emoji text-2xl mr-1">📊</span>
                    <span className="emoji text-2xl mr-1">🚀</span>
                    <span className="emoji text-2xl mr-1">💝</span>
                    <span className="emoji text-2xl">🎁</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 h-full w-full bg-yellow-100/50 rounded-xl -z-10 rotate-2"></div>
              <div className="absolute -bottom-2 -left-2 h-full w-full bg-purple-100/50 rounded-xl -z-20 -rotate-1"></div>
            </div>
            
            {/* Mobile CTA - easy access */}
            <div className="mt-6 md:hidden">
              <Link href="/register" className="w-full py-4 bg-primary text-white font-bold text-lg rounded-xl shadow-md hover:bg-primary/90 transition duration-300 flex items-center justify-center">
                <span className="emoji mr-2">🚀</span>
                <span>Start Free Quiz</span>
              </Link>
            </div>
            
            {/* Testimonial for social proof */}
            <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-blue-100 max-w-sm mx-auto">
              <div className="flex mb-2">
                <div className="flex flex-shrink-0">
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                </div>
              </div>
              <p className="text-sm italic mb-2">"I finally understand why my past relationships didn't work! This quiz helped me find someone who truly complements me. It's like having a relationship coach in your pocket."</p>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-100 rounded-full mr-2"></div>
                <div>
                  <p className="text-xs font-bold">Priya S.</p>
                  <p className="text-xs text-neutral-dark/70">Mumbai, 26</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;