import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="pt-10 pb-10 relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Background elements - subtle & mobile-friendly */}
      <div className="absolute top-0 right-0 -mt-5 -mr-10 w-40 h-40 sm:w-60 sm:h-60 bg-pink-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-5 -ml-10 w-40 h-40 sm:w-60 sm:h-60 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text content - Clear USP and value proposition */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <div className="inline-block mb-3 py-1 px-3 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center">
                <span className="emoji mr-1">🧠</span> Understand Your Dating Patterns
              </span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-4 leading-tight">
              Discover Your <span className="text-primary relative">
                Relationship Type
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,0 Q50,12 100,0" fill="none" stroke="rgba(255,82,122,0.3)" strokeWidth="8" />
                </svg>
              </span>
            </h1>

            <p className="text-neutral-dark/90 text-base sm:text-lg mb-5 max-w-lg mx-auto md:mx-0">
              <span className="emoji mr-1">✨</span> Get a personalized relationship profile that explains who you're most compatible with based on your personality.
            </p>

            {/* Direct benefit bullets - what you'll learn */}
            <ul className="mb-6 text-left bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm max-w-md mx-auto md:mx-0">
              <li className="flex items-start mb-2">
                <span className="emoji mr-2 mt-0.5">🔍</span>
                <span className="text-sm"><strong>Understand why</strong> past relationships worked or failed</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="emoji mr-2 mt-0.5">💡</span>
                <span className="text-sm">Learn what <strong>relationship types</strong> are truly compatible with yours</span>
              </li>
              <li className="flex items-start">
                <span className="emoji mr-2 mt-0.5">📊</span>
                <span className="text-sm">Get a <strong>visual compatibility map</strong> for better dating decisions</span>
              </li>
            </ul>

            {/* Strong CTAs with action and clear value */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-3">
              <Link href="/quiz" className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-medium rounded-xl shadow-md hover:bg-primary/90 transition duration-300 flex items-center justify-center pulse-animation">
                <span className="emoji mr-2">🧪</span>
                <span>Take the 5-Min Quiz</span>
              </Link>

              <Link href="/#how-it-works" className="w-full sm:w-auto px-6 py-3 border border-primary text-primary font-medium rounded-xl hover:bg-primary/5 transition duration-300 flex items-center justify-center">
                <span className="emoji mr-2">📱</span>
                <span>See How It Works</span>
              </Link>
            </div>

            {/* Trust indicators - social proof */}
            <div className="mt-6 flex items-center justify-center md:justify-start">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-white text-xs">R</div>
                <div className="w-7 h-7 rounded-full border-2 border-white bg-emerald-500 flex items-center justify-center text-white text-xs">S</div>
                <div className="w-7 h-7 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-white text-xs">A</div>
                <div className="w-7 h-7 rounded-full border-2 border-white bg-purple-500 flex items-center justify-center text-white text-xs">P</div>
              </div>
              <p className="text-sm text-neutral-dark/70 ml-3 flex items-center">
                <span className="text-amber-500 mr-1">★★★★★</span>
                <span><span className="font-semibold">10,000+</span> users love their results</span>
              </p>
            </div>
          </div>

          {/* Visual preview - sample quiz & results */}
          <div className="w-full md:w-1/2 md:pl-6">
            <div className="relative">
              {/* Sample quiz card */}
              <div className="bg-white rounded-xl shadow-lg p-4 mb-4 border border-pink-100 max-w-sm mx-auto">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="emoji">💭</span>
                  </div>
                  <h3 className="font-semibold text-base ml-2">Sample Question <span className="text-xs text-neutral-dark/60">1 of 15</span></h3>
                </div>
                
                <div className="space-y-3">
                  <p className="font-medium text-sm">How do you typically handle conflict in relationships?</p>
                  <div className="space-y-2">
                    <label className="flex items-center p-2 rounded-lg border border-pink-100 hover:border-primary hover:bg-pink-50 cursor-pointer transition">
                      <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                      <span className="ml-2 text-sm"><span className="emoji mr-1">🗣️</span> Talk it out immediately</span>
                    </label>
                    <label className="flex items-center p-2 rounded-lg border border-pink-100 hover:border-primary hover:bg-pink-50 cursor-pointer transition">
                      <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                      <span className="ml-2 text-sm"><span className="emoji mr-1">🤔</span> Need time to process first</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Floating compatibility card - what you'll get */}
              <div className="bg-white rounded-xl shadow-lg p-4 border border-pink-100 max-w-sm mx-auto relative z-10 floating">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-base">Your Relationship Profile</h3>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">Preview</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Attachment Style: <span className="text-primary">Secure</span></span>
                      <span>82%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                      <div className="h-full w-[82%] bg-primary rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Communication Style: <span className="text-blue-500">Direct</span></span>
                      <span>75%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                      <div className="h-full w-[75%] bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <div className="bg-green-50 p-2 rounded-lg flex-1 text-center">
                      <span className="emoji block text-lg">👍</span>
                      <span className="text-xs font-medium">Best Match</span>
                      <p className="text-xs text-neutral-dark/70">Anchor Type</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded-lg flex-1 text-center">
                      <span className="emoji block text-lg">👎</span>
                      <span className="text-xs font-medium">Avoid</span>
                      <p className="text-xs text-neutral-dark/70">Anxious Type</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 h-full w-full bg-yellow-100/50 rounded-xl -z-10 rotate-2"></div>
              <div className="absolute -bottom-2 -left-2 h-full w-full bg-purple-100/50 rounded-xl -z-20 -rotate-1"></div>
            </div>
            
            {/* Trust badges - quick info */}
            <div className="grid grid-cols-3 gap-2 mt-6 max-w-sm mx-auto">
              <div className="flex flex-col items-center bg-white/80 rounded-lg p-2 shadow-sm">
                <span className="emoji mb-1">⏱️</span>
                <span className="text-xs text-neutral-dark/70 text-center">Just 5 Mins</span>
              </div>
              <div className="flex flex-col items-center bg-white/80 rounded-lg p-2 shadow-sm">
                <span className="emoji mb-1">🧠</span>
                <span className="text-xs text-neutral-dark/70 text-center">Scientific</span>
              </div>
              <div className="flex flex-col items-center bg-white/80 rounded-lg p-2 shadow-sm">
                <span className="emoji mb-1">🔒</span>
                <span className="text-xs text-neutral-dark/70 text-center">Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;