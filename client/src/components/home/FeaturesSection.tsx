import { Link } from "wouter";

const FeaturesSection = () => {
  return (
    <section className="py-12 bg-white px-4 relative overflow-hidden" id="how-it-works">
      {/* Mobile-friendly background elements */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-pink-50 rounded-full opacity-70"></div>
      <div className="absolute left-5 bottom-5 w-24 h-24 bg-yellow-50 rounded-full opacity-70"></div>
      
      <div className="max-w-md sm:max-w-xl md:max-w-5xl mx-auto relative z-10">
        {/* Mobile-friendly heading */}
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-3">
            <span className="emoji mr-2">💘</span> Stop Guessing, Start Knowing
          </h2>
          <p className="text-base md:text-lg mx-auto text-neutral-dark/80 max-w-2xl leading-relaxed">
            Our personality test takes the guesswork out of relationships by showing you exactly who you're compatible with
          </p>
        </div>
        
        {/* Results snapshot - what you'll get */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-5 md:p-8 shadow-md mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-xl">
              <span className="emoji mr-2">✨</span> What You'll Discover
            </h3>
            <div className="bg-white rounded-full py-1 px-3 text-xs font-medium text-primary shadow-sm border border-pink-100">
              In Just 5 Minutes
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-pink-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-pink-50 flex items-center justify-center text-primary mb-2">
                <span className="emoji text-xl">👫</span>
              </div>
              <h4 className="font-medium text-sm md:text-base mb-1">Your Match Type</h4>
              <p className="text-xs text-neutral-dark/70">
                Exactly who you should date
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                <span className="emoji text-xl">🧠</span>
              </div>
              <h4 className="font-medium text-sm md:text-base mb-1">Love Personality</h4>
              <p className="text-xs text-neutral-dark/70">
                Your unique relationship style
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-2">
                <span className="emoji text-xl">💪</span>
              </div>
              <h4 className="font-medium text-sm md:text-base mb-1">Key Strengths</h4>
              <p className="text-xs text-neutral-dark/70">
                What makes you special
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 mb-2">
                <span className="emoji text-xl">🚫</span>
              </div>
              <h4 className="font-medium text-sm md:text-base mb-1">Red Flags</h4>
              <p className="text-xs text-neutral-dark/70">
                Who to definitely avoid
              </p>
            </div>
          </div>
          
          {/* Mobile primary CTA */}
          <div className="mt-5 md:hidden">
            <Link 
              href="/register" 
              className="block w-full py-3 bg-primary text-white font-bold rounded-xl text-center shadow-md hover:bg-primary/90 transition"
              style={{animation: "pulse 2s infinite"}}
            >
              <span className="emoji mr-2">🚀</span> Take Free Test Now
            </Link>
          </div>
        </div>
        
        {/* Simple, super easy process - 3 steps with illustrations */}
        <div className="mb-10">
          <h3 className="font-heading font-semibold text-xl md:text-2xl text-center mb-6">
            <span className="emoji mr-2">👣</span> 3 Simple Steps to Better Relationships
          </h3>
          
          <div className="grid md:grid-cols-3 gap-5">
            <div className="relative">
              <div className="bg-white rounded-xl p-5 shadow-md border border-pink-100 h-full">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3209/3209175.png" 
                  alt="Take the quiz" 
                  className="w-16 h-16 mx-auto mb-3 opacity-80"
                />
                <h4 className="font-bold text-center text-lg mb-2">Quick Quiz</h4>
                <p className="text-center text-sm text-neutral-dark/70">
                  Answer fun personality questions about your relationship habits
                </p>
                <div className="bg-primary/5 text-primary text-xs font-medium py-1 px-2 rounded-full flex items-center justify-center mt-3 w-max mx-auto">
                  <span className="emoji mr-1">⏱️</span> Only 5 minutes
                </div>
              </div>
            </div>
            
            <div className="relative mt-6 md:mt-0">
              <div className="hidden md:block absolute top-1/2 -left-5 h-0.5 w-10 bg-pink-100"></div>
              <div className="bg-white rounded-xl p-5 shadow-md border border-blue-100 h-full">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2910/2910756.png" 
                  alt="Get results" 
                  className="w-16 h-16 mx-auto mb-3 opacity-80"
                />
                <h4 className="font-bold text-center text-lg mb-2">See Results</h4>
                <p className="text-center text-sm text-neutral-dark/70">
                  Discover your relationship type and who you're compatible with
                </p>
                <div className="bg-blue-50 text-blue-600 text-xs font-medium py-1 px-2 rounded-full flex items-center justify-center mt-3 w-max mx-auto">
                  <span className="emoji mr-1">💯</span> Scientifically backed
                </div>
              </div>
            </div>
            
            <div className="relative mt-6 md:mt-0">
              <div className="hidden md:block absolute top-1/2 -left-5 h-0.5 w-10 bg-blue-100"></div>
              <div className="bg-white rounded-xl p-5 shadow-md border border-green-100 h-full">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2518/2518048.png" 
                  alt="Transform relationships" 
                  className="w-16 h-16 mx-auto mb-3 opacity-80"
                />
                <h4 className="font-bold text-center text-lg mb-2">Level Up</h4>
                <p className="text-center text-sm text-neutral-dark/70">
                  Use your insights to find better matches and improve relationships
                </p>
                <div className="bg-green-50 text-green-600 text-xs font-medium py-1 px-2 rounded-full flex items-center justify-center mt-3 w-max mx-auto">
                  <span className="emoji mr-1">🔝</span> Premium features available
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
            <Link href="/register" className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-xl text-center transition shadow-md shadow-primary/20 text-sm sm:text-base flex items-center" style={{animation: "pulse 4s infinite"}}>
              <span className="emoji mr-2">🧪</span> Take the Free Assessment
            </Link>
          </div>
        </div>
        
        {/* Before & After stories - real transformation */}
        <div className="mb-10">
          <h3 className="font-heading font-semibold text-xl md:text-2xl text-center mb-6">
            <span className="emoji mr-2">🔄</span> See The Transformation
          </h3>
          
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl shadow-md border border-pink-100 overflow-hidden">
              <div className="bg-primary text-white py-2 px-4 font-medium text-sm">
                <span className="emoji mr-2">⛔</span> BEFORE OUR TEST
              </div>
              <div className="p-4">
                <div className="flex items-start mb-4">
                  <div className="h-10 w-10 rounded-full bg-neutral-100 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-sm">Neha, 27</p>
                    <p className="text-xs text-neutral-dark/70">Software Engineer, Bengaluru</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-2 mt-0.5 flex-shrink-0">
                      <span className="emoji text-xs">⛔</span>
                    </div>
                    <p className="text-sm">"I kept dating the same type of guys who never committed"</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-2 mt-0.5 flex-shrink-0">
                      <span className="emoji text-xs">⛔</span>
                    </div>
                    <p className="text-sm">"Always attracted to people who weren't good for me"</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-2 mt-0.5 flex-shrink-0">
                      <span className="emoji text-xs">⛔</span>
                    </div>
                    <p className="text-sm">"Frustrated with dating apps showing wrong matches"</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="bg-red-50 py-1 px-3 rounded-full text-xs font-medium text-red-600">
                    <span className="emoji mr-1">💔</span> Frustrated & Confused
                  </div>
                  <div className="flex">
                    <span className="text-yellow-400">★</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-neutral-200">★</span>
                    <span className="text-neutral-200">★</span>
                    <span className="text-neutral-200">★</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md border border-green-100 overflow-hidden">
              <div className="bg-green-500 text-white py-2 px-4 font-medium text-sm">
                <span className="emoji mr-2">✅</span> AFTER OUR TEST
              </div>
              <div className="p-4">
                <div className="flex items-start mb-4">
                  <div className="h-10 w-10 rounded-full bg-neutral-100 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-sm">Neha, 27</p>
                    <p className="text-xs text-neutral-dark/70">Software Engineer, Bengaluru</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2 mt-0.5 flex-shrink-0">
                      <span className="emoji text-xs">✅</span>
                    </div>
                    <p className="text-sm">"I understood my anxious attachment style & found a secure partner"</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2 mt-0.5 flex-shrink-0">
                      <span className="emoji text-xs">✅</span>
                    </div>
                    <p className="text-sm">"Now I recognize red flags early and avoid toxic matches"</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2 mt-0.5 flex-shrink-0">
                      <span className="emoji text-xs">✅</span>
                    </div>
                    <p className="text-sm">"In a healthy relationship with someone who complements me"</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="bg-green-50 py-1 px-3 rounded-full text-xs font-medium text-green-600">
                    <span className="emoji mr-1">💕</span> Happy & Confident
                  </div>
                  <div className="flex">
                    <span className="text-yellow-400">★</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-yellow-400">★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Relationship Type Preview */}
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
