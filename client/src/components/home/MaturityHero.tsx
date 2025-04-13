import { Link } from "wouter";

const MaturityHero = () => {
  return (
    <section className="pt-28 md:pt-32 pb-16 relative overflow-hidden bg-gradient-to-br from-[#292352] to-[#1a1a2e]">
      {/* Subtle gradient overlays for visual depth */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-black/30 mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-0 left-0 w-full h-full transform rotate-180 scale-150 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
      </div>

      {/* Subtle animated particles */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-white/20 animate-ping" style={{animationDuration: '3s'}}></div>
      <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-white/20 animate-ping" style={{animationDuration: '4s'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-white/20 animate-ping" style={{animationDuration: '5s'}}></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side: compelling messaging */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <div className="inline-block mb-4 py-1 px-3 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-primary/90 font-medium text-sm flex items-center">
                <span className="mr-2">✨</span> Discover Your True Compatibility
              </span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-white leading-tight">
              Unlock Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Relationship DNA</span>
            </h1>

            <p className="text-slate-300 text-lg md:text-xl mb-8 max-w-lg">
              Our scientifically validated assessment reveals your unique attachment style, personality traits, and compatibility patterns. Gain deeper insights into who you truly connect with.
            </p>

            {/* Social proof */}
            <div className="flex items-center justify-center md:justify-start mb-8">
              <div className="flex -space-x-2 mr-3">
                <div className="w-8 h-8 rounded-full bg-indigo-400/30 border-2 border-indigo-400/80"></div>
                <div className="w-8 h-8 rounded-full bg-primary/30 border-2 border-primary/80"></div>
                <div className="w-8 h-8 rounded-full bg-purple-400/30 border-2 border-purple-400/80"></div>
                <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-slate-300">+</div>
              </div>
              <p className="text-sm font-medium text-slate-300"><span className="text-primary font-bold">35,000+</span> users gained self-awareness</p>
            </div>

            {/* Key value propositions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Attachment Style Analysis</h3>
                    <p className="text-sm text-slate-300">
                      Understand how your early relationships shape your adult bonding patterns
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-blue-400/20 flex items-center justify-center text-blue-400 mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Compatibility Matching</h3>
                    <p className="text-sm text-slate-300">
                      Discover your ideal match types based on personality complementarity
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-purple-400/20 flex items-center justify-center text-purple-400 mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Relationship Strengths</h3>
                    <p className="text-sm text-slate-300">
                      Identify your natural relationship gifts and how to leverage them
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-green-400/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Growth Opportunities</h3>
                    <p className="text-sm text-slate-300">
                      Pinpoint areas for personal development to enhance relationship success
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary CTA with trust elements */}
            <div>
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold text-lg rounded-lg shadow-lg hover:bg-primary/90 transform hover:translate-y-[-2px] transition-all duration-300"
              >
                Take The Assessment
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>

              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-full px-3 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span className="text-xs text-slate-300">5 Minutes</span>
                </div>
                <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-full px-3 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <span className="text-xs text-slate-300">Free Results</span>
                </div>
                <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-full px-3 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span className="text-xs text-slate-300">Privacy Protected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Visual representation of results */}
          <div className="w-full md:w-1/2 md:pl-8">
            <div className="relative mx-auto max-w-lg">
              {/* Main display card */}
              <div className="bg-[#1e1e3a] rounded-2xl shadow-2xl p-6 border border-slate-700 mb-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-primary/30 rounded-full flex items-center justify-center text-primary border border-primary/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-xl ml-3 text-white">Your Compatibility Profile</h3>
                  </div>
                  <div className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full flex items-center border border-green-500/30">
                    <span className="mr-1">●</span> SECURE
                  </div>
                </div>

                {/* Attachment style */}
                <div className="mb-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <h4 className="font-medium text-sm mb-3 text-slate-300">Attachment Style:</h4>
                  <div className="flex items-center">
                    <div className="bg-slate-800 p-3 rounded-lg shadow-inner mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="18" y1="8" x2="23" y2="13"></line>
                        <line x1="23" y1="8" x2="18" y2="13"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">Secure Connector</p>
                      <p className="text-sm text-slate-400">You form stable, trusting relationships with balanced boundaries</p>
                    </div>
                  </div>
                </div>

                {/* Compatibility matches */}
                <div className="mb-6">
                  <h4 className="font-medium text-sm mb-3 text-slate-300">Top Compatibility Matches:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-2 border border-blue-500/30">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">The Nurturer</p>
                          <div className="flex">
                            <span className="text-blue-400 text-xs">94% Match</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-2 border border-purple-500/30">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">The Visionary</p>
                          <div className="flex">
                            <span className="text-purple-400 text-xs">88% Match</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key insights preview */}
                <div className="bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-white">Key Insights</h4>
                    <span className="text-xs bg-white/10 text-slate-300 px-2 py-0.5 rounded-full">Premium Preview</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p className="text-sm text-slate-300">Strong emotional intelligence and self-regulation</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p className="text-sm text-slate-300">Natural ability to maintain healthy boundaries</p>
                    </div>
                    <div className="flex items-center opacity-50">
                      <div className="h-6 w-6 rounded-full bg-slate-700 flex items-center justify-center text-slate-500 mr-2 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-slate-500">7 more insights in full report...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary cards for depth */}
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#1e1e3a]/80 rounded-xl border border-slate-700 shadow-xl transform -rotate-6 z-[-1]"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-[#1e1e3a]/80 rounded-xl border border-slate-700 shadow-xl transform rotate-6 z-[-1]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaturityHero;