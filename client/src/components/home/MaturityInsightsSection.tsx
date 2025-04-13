import { Link } from "wouter";

const MaturityInsightsSection = () => {
  return (
    <section className="py-16 bg-slate-800 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 py-1 px-3 bg-slate-700/50 rounded-full">
            <span className="text-primary font-medium text-sm flex items-center">
              <span className="mr-2">🔍</span> Data-Driven Insights
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
            Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">Compatibility Profile</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Our assessment reveals your unique attachment style, personality traits, and relationship patterns
          </p>
        </div>

        {/* Insights Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="group relative bg-slate-800 rounded-2xl shadow-xl border border-indigo-900/50 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="p-6">
              <div className="mb-6 flex items-center">
                <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 mr-4 border border-blue-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-white">Attachment Profile</h3>
              </div>

              <p className="text-slate-300 mb-6">
                Understand how your early relationships shape your adult connections. Your attachment style impacts how you form bonds and navigate intimacy.
              </p>

              <div className="bg-slate-900/70 rounded-xl p-4 border border-slate-700">
                <h4 className="font-medium text-slate-300 mb-3 text-sm">Your Attachment Style:</h4>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <div className="w-full bg-slate-700/40 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="ml-2 text-sm text-blue-400 font-medium">75%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Secure</span>
                    <span>Anxious</span>
                    <span>Avoidant</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="bg-blue-600/20 rounded-full py-1 px-3 text-blue-400 font-medium border border-blue-600/30">
                    Secure Primary
                  </div>
                  <div className="bg-indigo-600/20 rounded-full py-1 px-3 text-indigo-400 font-medium border border-indigo-600/30">
                    Anxious Secondary
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <Link href="/register" className="block w-full text-center py-3 rounded-lg bg-slate-700 hover:bg-blue-600 text-white font-medium transition-colors duration-300">
                Discover Your Style
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-slate-800 rounded-2xl shadow-xl border border-indigo-900/50 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-purple-600"></div>
            <div className="p-6">
              <div className="mb-6 flex items-center">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mr-4 border border-primary/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-white">Personality Traits</h3>
              </div>

              <p className="text-slate-300 mb-6">
                Your unique personality traits influence your relationship needs, communication style, and conflict resolution strategies.
              </p>

              <div className="bg-slate-900/70 rounded-xl p-4 border border-slate-700 mb-1">
                <h4 className="font-medium text-slate-300 mb-3 text-sm">Big Five Personality Traits:</h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Openness</span>
                      <span className="text-primary">82%</span>
                    </div>
                    <div className="w-full bg-slate-700/40 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Conscientiousness</span>
                      <span className="text-green-400">70%</span>
                    </div>
                    <div className="w-full bg-slate-700/40 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Extraversion</span>
                      <span className="text-blue-400">65%</span>
                    </div>
                    <div className="w-full bg-slate-700/40 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <Link href="/register" className="block w-full text-center py-3 rounded-lg bg-slate-700 hover:bg-primary text-white font-medium transition-colors duration-300">
                Analyze Your Traits
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-slate-800 rounded-2xl shadow-xl border border-indigo-900/50 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
            <div className="p-6">
              <div className="mb-6 flex items-center">
                <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-500 mr-4 border border-purple-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-white">Compatibility Insights</h3>
              </div>

              <p className="text-slate-300 mb-6">
                Our algorithm identifies your most compatible match types based on complementary traits and shared values.
              </p>

              <div className="bg-slate-900/70 rounded-xl p-4 border border-slate-700">
                <h4 className="font-medium text-slate-300 mb-3 text-sm">Your Top Match Types:</h4>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between bg-slate-800/70 rounded-lg p-3 border border-slate-700/50">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-2 border border-purple-500/30">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <span className="text-white font-medium">The Nurturer</span>
                    </div>
                    <span className="text-sm bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full border border-green-500/30">
                      94% Match
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-slate-800/70 rounded-lg p-3 border border-slate-700/50">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-2 border border-blue-500/30">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <span className="text-white font-medium">The Creator</span>
                    </div>
                    <span className="text-sm bg-blue-500/20 text-blue-500 px-2 py-0.5 rounded-full border border-blue-500/30">
                      86% Match
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <Link href="/register" className="block w-full text-center py-3 rounded-lg bg-slate-700 hover:bg-purple-600 text-white font-medium transition-colors duration-300">
                Find Your Matches
              </Link>
            </div>
          </div>
        </div>

        {/* Comparison chart */}
        <div className="max-w-4xl mx-auto bg-slate-900/50 rounded-2xl shadow-xl backdrop-blur-sm border border-indigo-900/30 overflow-hidden mb-12">
          <div className="px-6 py-5 bg-gradient-to-r from-blue-600/20 to-indigo-600/10 border-b border-indigo-900/30">
            <h3 className="font-bold text-xl text-white">Compatibility Profile Comparison</h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <line x1="18" y1="8" x2="23" y2="13"></line>
                      <line x1="23" y1="8" x2="18" y2="13"></line>
                    </svg>
                  </div>
                </div>
                <h4 className="font-bold text-white mb-1">Profile Type A</h4>
                <p className="text-slate-400 text-sm mb-3">Secure Connector</p>
                <ul className="text-slate-300 text-sm space-y-2 text-left">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    High emotional intelligence
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Stable relationships
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Clear communication
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 border border-blue-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
                <h4 className="font-bold text-white mb-1">Profile Type B</h4>
                <p className="text-slate-400 text-sm mb-3">Analytical Thinker</p>
                <ul className="text-slate-300 text-sm space-y-2 text-left">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Thoughtful problem-solving
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Intellectual connection
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Values independence
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 border border-purple-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
                <h4 className="font-bold text-white mb-1">Profile Type C</h4>
                <p className="text-slate-400 text-sm mb-3">Empathic Mediator</p>
                <ul className="text-slate-300 text-sm space-y-2 text-left">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Deep emotional connection
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Highly supportive
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Prioritizes harmony
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800/70 rounded-2xl p-4 border border-slate-700/50">
              <h4 className="font-medium text-white text-center mb-6">Compatibility Matrix</h4>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-green-500/40 rounded-lg p-3 text-center border border-green-500/30">
                  <span className="text-white font-medium">A + B</span>
                  <p className="text-xs text-slate-300 mt-1">95% Compatible</p>
                </div>
                <div className="bg-green-500/30 rounded-lg p-3 text-center border border-green-500/30">
                  <span className="text-white font-medium">A + C</span>
                  <p className="text-xs text-slate-300 mt-1">92% Compatible</p>
                </div>
                <div className="bg-yellow-500/30 rounded-lg p-3 text-center border border-yellow-500/30">
                  <span className="text-white font-medium">B + C</span>
                  <p className="text-xs text-slate-300 mt-1">78% Compatible</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA button */}
        <div className="text-center">
          <Link 
            href="/register" 
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold text-lg rounded-lg shadow-lg hover:bg-primary/90 transform hover:translate-y-[-2px] transition-all duration-300"
          >
            Get Your Complete Profile
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
          <p className="mt-4 text-slate-400 text-sm">
            5-minute assessment • Scientifically validated • Instant results
          </p>
        </div>
      </div>
    </section>
  );
};

export default MaturityInsightsSection;