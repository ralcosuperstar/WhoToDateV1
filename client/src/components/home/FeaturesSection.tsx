import { Link } from "wouter";

const FeaturesSection = () => {
  return (
    <section className="py-10 sm:py-16 bg-white px-4 relative overflow-hidden" id="how-it-works">
      {/* Background decorations - reduced for mobile */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-pink-50 rounded-full opacity-70"></div>
      <div className="absolute left-5 bottom-5 w-24 h-24 bg-yellow-50 rounded-full opacity-70"></div>
      
      <div className="max-w-md sm:max-w-xl md:max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block mb-2 py-1 px-3 bg-primary/10 rounded-full">
            <span className="text-primary font-medium text-xs sm:text-sm flex items-center">
              <span className="emoji mr-1">⚡</span> Quick & Fun Process
            </span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-3">How MyDate Works <span className="emoji">🚀</span></h2>
          <p className="text-sm sm:text-base mx-auto text-neutral-dark/80">The easiest way to find your perfect match!</p>
        </div>
        
        {/* Steps - Simplified for mobile */}
        <div className="space-y-4 sm:space-y-6 mb-8">
          {/* Step 1 */}
          <div className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-4 shadow-md border border-pink-100 relative">
            <div className="absolute -left-2 -top-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
            <div className="flex items-center">
              <div className="mr-3 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <span className="emoji text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Take the Quiz</h3>
                <p className="text-xs sm:text-sm text-neutral-dark/80">Just 5 minutes for 15 fun personality questions</p>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-4 shadow-md border border-pink-100 relative">
            <div className="absolute -left-2 -top-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
            <div className="flex items-center">
              <div className="mr-3 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <span className="emoji text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Get Insights</h3>
                <p className="text-xs sm:text-sm text-neutral-dark/80">Discover your unique dating personality</p>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-4 shadow-md border border-pink-100 relative">
            <div className="absolute -left-2 -top-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
            <div className="flex items-center">
              <div className="mr-3 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <span className="emoji text-2xl">💝</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Find Matches</h3>
                <p className="text-xs sm:text-sm text-neutral-dark/80">Compare with others & find your true match</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick CTA */}
        <div className="flex justify-center mb-10">
          <Link href="/quiz" className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-xl text-center transition shadow-md shadow-primary/20 text-sm sm:text-base flex items-center">
            <span className="emoji mr-2">🚀</span> Start Free Quiz Now
          </Link>
        </div>
        
        {/* What makes us special - Mobile optimized */}
        <div className="bg-gradient-to-r from-primary/5 to-pink-50 rounded-2xl p-5 sm:p-6 shadow-md border border-pink-100">
          <h3 className="font-heading font-semibold text-xl text-center mb-4">What Makes Us Special <span className="emoji">✨</span></h3>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white/70 rounded-xl p-3 shadow-sm">
              <div className="flex items-center mb-2">
                <span className="emoji text-lg mr-2">🇮🇳</span>
                <span className="font-medium text-sm">For Indians</span>
              </div>
              <p className="text-xs text-neutral-dark/80">Made for modern Indian dating culture & values</p>
            </div>
            
            <div className="bg-white/70 rounded-xl p-3 shadow-sm">
              <div className="flex items-center mb-2">
                <span className="emoji text-lg mr-2">🧠</span>
                <span className="font-medium text-sm">Scientific</span>
              </div>
              <p className="text-xs text-neutral-dark/80">Based on psychology & relationship science</p>
            </div>
            
            <div className="bg-white/70 rounded-xl p-3 shadow-sm">
              <div className="flex items-center mb-2">
                <span className="emoji text-lg mr-2">🔒</span>
                <span className="font-medium text-sm">Private</span>
              </div>
              <p className="text-xs text-neutral-dark/80">You control who sees your results</p>
            </div>
            
            <div className="bg-white/70 rounded-xl p-3 shadow-sm">
              <div className="flex items-center mb-2">
                <span className="emoji text-lg mr-2">⚡</span>
                <span className="font-medium text-sm">Fast & Fun</span>
              </div>
              <p className="text-xs text-neutral-dark/80">Enjoyable quiz with visual results</p>
            </div>
          </div>
          
          {/* Mobile-friendly compatibility card */}
          <div className="mt-6 relative">
            <div className="bg-white rounded-2xl shadow-md p-4 relative z-10 border border-pink-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-green-400/20 flex items-center justify-center">
                  <span className="emoji">💚</span>
                </div>
                <div>
                  <span className="block font-semibold">Green Match</span>
                  <span className="text-xs text-neutral-dark/70">High Compatibility</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Communication</span>
                    <span>85%</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                    <div className="h-full w-[85%] bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Emotional Connection</span>
                    <span>92%</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                    <div className="h-full w-[92%] bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Link href="/quiz" className="text-primary font-medium text-sm inline-flex items-center">
                  Get Your Compatibility Profile
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Simpler decorative elements */}
            <div className="absolute -right-2 -bottom-2 h-full w-full bg-yellow-100 rounded-2xl -z-10 rotate-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
