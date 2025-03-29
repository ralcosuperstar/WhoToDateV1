import { Link } from "wouter";

const FeaturesSection = () => {
  return (
    <section className="py-12 bg-white px-4 relative overflow-hidden" id="how-it-works">
      {/* Mobile-friendly background elements */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-pink-50 rounded-full opacity-70"></div>
      <div className="absolute left-5 bottom-5 w-24 h-24 bg-yellow-50 rounded-full opacity-70"></div>
      
      <div className="max-w-md sm:max-w-xl md:max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block mb-2 py-1 px-3 bg-primary/10 rounded-full">
            <span className="text-primary font-medium text-xs sm:text-sm flex items-center">
              <span className="emoji mr-1">🧭</span> Your Journey to Self-Discovery
            </span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-3">How It Works <span className="emoji">📱</span></h2>
          <p className="text-sm sm:text-base mx-auto text-neutral-dark/80">Understand yourself for better relationship decisions</p>
        </div>
        
        {/* Simple responsive step cards */}
        <div className="space-y-4 sm:space-y-5 mb-8">
          {/* Step 1: Take the Quiz */}
          <div className="bg-gradient-to-r from-pink-50 to-white rounded-xl p-4 shadow-sm border border-pink-100 relative">
            <div className="absolute -left-2 -top-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">1</div>
            <div className="flex items-center">
              <div className="mr-3 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <span className="emoji text-xl">📝</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base sm:text-lg">Answer 15 Questions</h3>
                <p className="text-xs sm:text-sm text-neutral-dark/80">Quick 5-minute quiz based on relationship science</p>
              </div>
            </div>
          </div>
          
          {/* Step 2: Get Your Profile */}
          <div className="bg-gradient-to-r from-pink-50 to-white rounded-xl p-4 shadow-sm border border-pink-100 relative">
            <div className="absolute -left-2 -top-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">2</div>
            <div className="flex items-center">
              <div className="mr-3 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <span className="emoji text-xl">🔍</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base sm:text-lg">Discover Your Type</h3>
                <p className="text-xs sm:text-sm text-neutral-dark/80">Learn your relationship style and patterns</p>
              </div>
            </div>
          </div>
          
          {/* Step 3: Understanding Compatibility */}
          <div className="bg-gradient-to-r from-pink-50 to-white rounded-xl p-4 shadow-sm border border-pink-100 relative">
            <div className="absolute -left-2 -top-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">3</div>
            <div className="flex items-center">
              <div className="mr-3 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <span className="emoji text-xl">🧩</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base sm:text-lg">See Your Compatibility</h3>
                <p className="text-xs sm:text-sm text-neutral-dark/80">Know which types complement your personality</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA with clear benefit */}
        <div className="flex justify-center mb-10">
          <Link href="/quiz" className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-xl text-center transition shadow-md shadow-primary/20 text-sm sm:text-base flex items-center pulse-animation">
            <span className="emoji mr-2">🔮</span> Get Your Relationship Profile
          </Link>
        </div>
        
        {/* Why This Matters - More focused USP */}
        <div className="bg-gradient-to-r from-primary/5 to-pink-50 rounded-xl p-5 sm:p-6 shadow-md border border-pink-100">
          <h3 className="font-heading font-semibold text-xl text-center mb-5">Why Understanding Your Type Matters <span className="emoji">💡</span></h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <div className="flex items-start">
                <span className="emoji text-lg mr-2 mt-0.5">💔</span>
                <div>
                  <h4 className="font-medium text-sm sm:text-base mb-1">Break Unhealthy Patterns</h4>
                  <p className="text-xs sm:text-sm text-neutral-dark/80">Recognize why you might repeat the same relationship mistakes</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <div className="flex items-start">
                <span className="emoji text-lg mr-2 mt-0.5">⚖️</span>
                <div>
                  <h4 className="font-medium text-sm sm:text-base mb-1">Balance Strengths & Weaknesses</h4>
                  <p className="text-xs sm:text-sm text-neutral-dark/80">Find a partner whose traits complement yours</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <div className="flex items-start">
                <span className="emoji text-lg mr-2 mt-0.5">🔄</span>
                <div>
                  <h4 className="font-medium text-sm sm:text-base mb-1">Improve Communication</h4>
                  <p className="text-xs sm:text-sm text-neutral-dark/80">Learn how your natural style affects your relationships</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <div className="flex items-start">
                <span className="emoji text-lg mr-2 mt-0.5">🎯</span>
                <div>
                  <h4 className="font-medium text-sm sm:text-base mb-1">Make Better Choices</h4>
                  <p className="text-xs sm:text-sm text-neutral-dark/80">Filter potential partners based on compatibility data</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sample relationship profile card */}
          <div className="mt-6 relative">
            <div className="bg-white rounded-xl shadow-md p-4 relative z-10 border border-pink-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-base">Your Relationship Type</h4>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">Preview</span>
              </div>
              
              <div className="flex items-center mb-4 bg-purple-50 p-2 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-purple-400/20 flex items-center justify-center mr-3">
                  <span className="emoji">🔮</span>
                </div>
                <div>
                  <span className="block font-semibold text-sm">The Thoughtful Connector</span>
                  <span className="text-xs text-neutral-dark/70">Empathetic, caring, and seeks deep connections</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Attachment Style</span>
                    <span className="text-primary">Secure (78%)</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                    <div className="h-full w-[78%] bg-primary rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Emotional Intelligence</span>
                    <span className="text-blue-500">High (85%)</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                    <div className="h-full w-[85%] bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Link href="/quiz" className="text-primary font-medium text-sm inline-flex items-center">
                  Discover Your Relationship Type
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Simple decorative element */}
            <div className="absolute -bottom-2 -right-2 h-full w-full bg-yellow-100/70 rounded-xl -z-10 rotate-2"></div>
          </div>
        </div>
        
        {/* Trust indicators - relevant to USP */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 text-center">
          <div className="flex items-center">
            <span className="emoji mr-2">🇮🇳</span>
            <span className="text-xs sm:text-sm text-neutral-dark/80">Made for Indian singles</span>
          </div>
          <div className="flex items-center">
            <span className="emoji mr-2">🔒</span>
            <span className="text-xs sm:text-sm text-neutral-dark/80">Private & secure</span>
          </div>
          <div className="flex items-center">
            <span className="emoji mr-2">⚡</span>
            <span className="text-xs sm:text-sm text-neutral-dark/80">5-minute quiz</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
