import { Link } from "wouter";

const FeaturesSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-white px-4 relative overflow-hidden" id="how-it-works">
      {/* Background decorations */}
      <div className="absolute -right-32 -top-32 w-96 h-96 bg-pink-50 rounded-full opacity-70 blur-xl"></div>
      <div className="absolute left-10 bottom-10 w-64 h-64 bg-yellow-50 rounded-full opacity-70 blur-xl"></div>
      
      <div className="max-w-md sm:max-w-xl md:max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-3 py-1.5 px-4 bg-primary/10 rounded-full">
            <span className="text-primary font-medium text-sm flex items-center justify-center">
              <span className="emoji mr-2">⚡</span> Simple 3-Step Process
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">How MyDate Connects Hearts <span className="emoji">🚀</span></h2>
          <p className="text-lg mx-auto text-neutral-dark/80 max-w-2xl">Our scientific approach makes finding your perfect match easier than ever before!</p>
        </div>
        
        {/* Steps - Enhanced for better visual appeal */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Step 1 */}
          <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-6 shadow-lg border border-pink-100 relative h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="absolute -left-3 -top-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">1</div>
            
            <div className="pt-6 pb-2">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              
              <h3 className="font-heading font-semibold text-xl mb-3 text-center">Take the Assessment</h3>
              <p className="text-neutral-dark/80 text-center">Complete our scientifically-designed compatibility questionnaire in just 10 minutes to reveal your relationship preferences and patterns.</p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg border border-blue-100 relative h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="absolute -left-3 -top-3 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">2</div>
            
            <div className="pt-6 pb-2">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              
              <h3 className="font-heading font-semibold text-xl mb-3 text-center">Get Your Compatibility DNA</h3>
              <p className="text-neutral-dark/80 text-center">Receive a comprehensive compatibility report that reveals your attachment style, emotional patterns, and relationship strengths.</p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 shadow-lg border border-green-100 relative h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="absolute -left-3 -top-3 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">3</div>
            
            <div className="pt-6 pb-2">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h3 className="font-heading font-semibold text-xl mb-3 text-center">Connect With Matches</h3>
              <p className="text-neutral-dark/80 text-center">Get introduced to compatible partners based on your profile and start meaningful conversations that lead to lasting relationships.</p>
            </div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="bg-neutral-light rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">87%</p>
              <p className="text-sm text-neutral-dark/80">Match success rate</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">10 min</p>
              <p className="text-sm text-neutral-dark/80">Average assessment time</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">4,000+</p>
              <p className="text-sm text-neutral-dark/80">Successful matches</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">94%</p>
              <p className="text-sm text-neutral-dark/80">User satisfaction</p>
            </div>
          </div>
        </div>/div>
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
