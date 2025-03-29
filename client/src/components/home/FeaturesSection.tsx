import { Link } from "wouter";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white px-4 relative overflow-hidden" id="how-it-works">
      {/* Mobile-friendly background elements */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-pink-50 rounded-full opacity-70"></div>
      <div className="absolute left-5 bottom-5 w-24 h-24 bg-yellow-50 rounded-full opacity-70"></div>
      
      <div className="max-w-md sm:max-w-xl md:max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block mb-2 py-1 px-3 bg-primary/10 rounded-full">
            <span className="text-primary font-medium text-xs sm:text-sm flex items-center">
              <span className="emoji mr-1">🧭</span> From Insight to Action
            </span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-3">How WhoToDate Works <span className="emoji">🔍</span></h2>
          <p className="text-sm sm:text-base md:text-lg mx-auto text-neutral-dark/80 max-w-2xl mb-4">
            Our scientific assessment translates your unique personality traits into actionable relationship insights
          </p>
          <Link href="/how-it-works" className="text-primary font-medium hover:underline inline-flex items-center">
            <span>View detailed process</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
        {/* Enhanced process flow - horizontal on larger screens */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Step 1: Take the Assessment */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-pink-100 relative">
            <div className="absolute -left-2 -top-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">1</div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="mb-4 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <span className="emoji text-2xl">📋</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg sm:text-xl mb-2">Complete the Assessment</h3>
                <p className="text-sm sm:text-base text-neutral-dark/80">
                  Answer 30 scientifically designed questions that measure your attachment style, personality traits, emotional intelligence, and relationship values
                </p>
                <div className="mt-3 inline-flex items-center bg-purple-50 py-1 px-2 rounded-lg">
                  <span className="emoji mr-1">⏱️</span>
                  <span className="text-xs text-purple-700 font-medium">Just 5 minutes to complete</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 2: Get Your Comprehensive Analysis */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100 relative">
            <div className="absolute -left-2 -top-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">2</div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="mb-4 w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <span className="emoji text-2xl">🧠</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg sm:text-xl mb-2">Receive Your Analysis</h3>
                <p className="text-sm sm:text-base text-neutral-dark/80">
                  Our algorithm analyzes your responses against established psychological frameworks to create your comprehensive relationship profile
                </p>
                <div className="mt-3 inline-flex items-center bg-blue-50 py-1 px-2 rounded-lg">
                  <span className="emoji mr-1">📊</span>
                  <span className="text-xs text-blue-700 font-medium">Data-driven insights</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 3: Apply the Insights */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-green-100 relative">
            <div className="absolute -left-2 -top-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">3</div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="mb-4 w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                <span className="emoji text-2xl">💪</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg sm:text-xl mb-2">Apply the Knowledge</h3>
                <p className="text-sm sm:text-base text-neutral-dark/80">
                  Transform your relationship journey with practical compatibility guidance, personalized recommendations, and relationship skill-building tips
                </p>
                <div className="mt-3 inline-flex items-center bg-green-50 py-1 px-2 rounded-lg">
                  <span className="emoji mr-1">🔑</span>
                  <span className="text-xs text-green-700 font-medium">Actionable strategies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* What You'll Discover - More focused on practical outcomes */}
        <div className="bg-neutral-50 rounded-xl p-6 sm:p-8 shadow-md border border-neutral-100 mb-10">
          <h3 className="font-heading font-semibold text-xl sm:text-2xl text-center mb-6">What You'll Discover About Yourself <span className="emoji">🔎</span></h3>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-pink-50">
              <div className="h-12 w-12 rounded-full bg-pink-50 flex items-center justify-center text-primary mb-3 mx-auto sm:mx-0">
                <span className="emoji text-xl">🔄</span>
              </div>
              <h4 className="font-medium text-center sm:text-left text-base mb-2">Attachment Style</h4>
              <p className="text-sm text-neutral-dark/80 text-center sm:text-left">
                How your early relationship experiences shape your adult bonding patterns and emotional needs
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-50">
              <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-3 mx-auto sm:mx-0">
                <span className="emoji text-xl">👤</span>
              </div>
              <h4 className="font-medium text-center sm:text-left text-base mb-2">Personality Traits</h4>
              <p className="text-sm text-neutral-dark/80 text-center sm:text-left">
                Your unique combination of Big Five traits and how they influence your relationship behaviors
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-50">
              <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-3 mx-auto sm:mx-0">
                <span className="emoji text-xl">❤️</span>
              </div>
              <h4 className="font-medium text-center sm:text-left text-base mb-2">Compatibility Profile</h4>
              <p className="text-sm text-neutral-dark/80 text-center sm:text-left">
                The relationship dynamics and partner types that naturally complement your personality
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-50">
              <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-3 mx-auto sm:mx-0">
                <span className="emoji text-xl">💡</span>
              </div>
              <h4 className="font-medium text-center sm:text-left text-base mb-2">Growth Opportunities</h4>
              <p className="text-sm text-neutral-dark/80 text-center sm:text-left">
                Specific areas where personal development can enhance your relationship satisfaction
              </p>
            </div>
          </div>
          
          {/* CTA with clear benefit */}
          <div className="flex justify-center mt-8">
            <Link href="/quiz" className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-xl text-center transition shadow-md shadow-primary/20 text-sm sm:text-base flex items-center" style={{animation: "pulse 4s infinite"}}>
              <span className="emoji mr-2">🧪</span> Take the Free Assessment
            </Link>
          </div>
        </div>
        
        {/* Real-world application - practical benefits with visual card */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="font-heading font-semibold text-xl sm:text-2xl mb-4">Why Understanding Your Type Transforms Relationships <span className="emoji">✨</span></h3>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 flex items-start">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5 shrink-0">
                  <span className="emoji">💞</span>
                </div>
                <div>
                  <h4 className="font-medium text-base mb-1">Break Unhealthy Cycles</h4>
                  <p className="text-sm text-neutral-dark/80">
                    Recognize and stop repeating patterns that lead to the same relationship problems and disappointments
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 flex items-start">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 mt-0.5 shrink-0">
                  <span className="emoji">🔊</span>
                </div>
                <div>
                  <h4 className="font-medium text-base mb-1">Improve Communication</h4>
                  <p className="text-sm text-neutral-dark/80">
                    Learn how your natural communication style affects your relationships and adjust it for better understanding
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 flex items-start">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3 mt-0.5 shrink-0">
                  <span className="emoji">⚖️</span>
                </div>
                <div>
                  <h4 className="font-medium text-base mb-1">Find Better Balance</h4>
                  <p className="text-sm text-neutral-dark/80">
                    Discover partners whose strengths complement your growth areas for more harmonious relationships
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 flex items-start">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3 mt-0.5 shrink-0">
                  <span className="emoji">🎯</span>
                </div>
                <div>
                  <h4 className="font-medium text-base mb-1">Make Confident Decisions</h4>
                  <p className="text-sm text-neutral-dark/80">
                    Evaluate potential relationships based on compatibility data rather than just feelings or first impressions
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced sample relationship profile card */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-lg p-5 relative z-10 border border-pink-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-heading font-semibold text-lg">Your Relationship Profile</h4>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">Full Report</span>
              </div>
              
              <div className="flex items-center mb-5 bg-purple-50 p-3 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-purple-400/20 flex items-center justify-center mr-3">
                  <span className="emoji text-xl">🌟</span>
                </div>
                <div>
                  <span className="block font-semibold text-base">The Thoughtful Connector</span>
                  <span className="text-sm text-neutral-dark/70">Deep relationships with emotional authenticity</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-5">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>Attachment Style</span>
                    <span className="text-primary">Secure (78%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-neutral-dark/10 rounded-full">
                    <div className="h-full w-[78%] bg-primary rounded-full"></div>
                  </div>
                  <p className="text-xs text-neutral-dark/60 mt-1">You form secure bonds with healthy boundaries</p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>Emotional Intelligence</span>
                    <span className="text-blue-500">High (85%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-neutral-dark/10 rounded-full">
                    <div className="h-full w-[85%] bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="text-xs text-neutral-dark/60 mt-1">You navigate emotions with awareness and empathy</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="text-sm font-medium flex items-center mb-2">
                    <span className="emoji mr-1">✅</span> Natural Strengths
                  </h5>
                  <ul className="space-y-1">
                    <li className="text-xs flex items-start">
                      <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                      <span>Deep emotional connections</span>
                    </li>
                    <li className="text-xs flex items-start">
                      <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                      <span>Excellent active listening</span>
                    </li>
                    <li className="text-xs flex items-start">
                      <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                      <span>Emotional independence</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-amber-50 p-3 rounded-lg">
                  <h5 className="text-sm font-medium flex items-center mb-2">
                    <span className="emoji mr-1">🌱</span> Growth Areas
                  </h5>
                  <ul className="space-y-1">
                    <li className="text-xs flex items-start">
                      <span className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                      <span>Setting clear boundaries</span>
                    </li>
                    <li className="text-xs flex items-start">
                      <span className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                      <span>Direct communication</span>
                    </li>
                    <li className="text-xs flex items-start">
                      <span className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                      <span>Vulnerability in conflict</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <Link href="/quiz" className="inline-flex items-center justify-center w-full py-3 text-white bg-primary rounded-lg font-medium hover:bg-primary/90 transition">
                  Get Your Full Relationship Profile
                </Link>
              </div>
            </div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute -bottom-3 -right-3 h-full w-full bg-yellow-100/70 rounded-xl -z-10 rotate-2"></div>
            <div className="absolute -bottom-6 -right-6 h-full w-full bg-blue-100/30 rounded-xl -z-20 rotate-3"></div>
          </div>
        </div>
        
        {/* Enhanced trust indicators - relevant to USP */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-5 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center justify-center text-center">
              <div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                  <span className="emoji">🇮🇳</span>
                </div>
                <h5 className="font-medium text-sm mb-1">Culturally Relevant</h5>
                <p className="text-xs text-neutral-dark/70">Designed specifically for Indian relationship dynamics</p>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center justify-center text-center">
              <div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                  <span className="emoji">🔒</span>
                </div>
                <h5 className="font-medium text-sm mb-1">100% Private</h5>
                <p className="text-xs text-neutral-dark/70">Your data is secure and never shared with third parties</p>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center justify-center text-center">
              <div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                  <span className="emoji">📱</span>
                </div>
                <h5 className="font-medium text-sm mb-1">Mobile Optimized</h5>
                <p className="text-xs text-neutral-dark/70">Complete the assessment on any device in just 5 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
