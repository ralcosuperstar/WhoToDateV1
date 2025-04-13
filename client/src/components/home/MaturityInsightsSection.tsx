import { Link } from "wouter";

const MaturityInsightsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#1a1a2e] to-[#21213a] relative overflow-hidden">
      {/* Subtle particle effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-primary/30 animate-ping" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-blue-400/30 animate-ping" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-green-400/30 animate-ping" style={{animationDuration: '5s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 py-1 px-3 bg-white/5 backdrop-blur-sm rounded-full">
            <span className="text-primary/90 font-medium text-sm flex items-center">
              <span className="mr-2">🔍</span> Deep Psychological Insights
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
            Discover What Makes You <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Compatible</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Our assessment analyzes key dimensions of your relationship psychology to provide meaningful, actionable insights
          </p>
        </div>

        {/* Four main insight categories with sophisticated visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/80 transition-colors group">
            <div className="h-14 w-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            </div>
            <h3 className="font-bold text-xl text-white mb-2">Attachment Style</h3>
            <p className="text-slate-300 mb-4">
              How your early relationships shaped your adult bonding patterns and connection needs
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-slate-400">Secure, Anxious, or Avoidant tendencies</p>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-slate-400">Trust and intimacy patterns</p>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-slate-400">Conflict resolution style</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/80 transition-colors group">
            <div className="h-14 w-14 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M 12,16 C 8,12 8,8 12,4 C 16,8 16,12 12,16 Z"></path>
                <line x1="12" y1="16" x2="12" y2="22"></line>
              </svg>
            </div>
            <h3 className="font-bold text-xl text-white mb-2">Personality Traits</h3>
            <p className="text-slate-300 mb-4">
              Your unique mix of traits from the Big Five model and how they influence relationships
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-slate-400">Openness and intellectual connection</p>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-slate-400">Agreeableness in partnership</p>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-slate-400">Emotional stability under stress</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/80 transition-colors group">
            <div className="h-14 w-14 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3 className="font-bold text-xl text-white mb-2">Love Language</h3>
            <p className="text-slate-300 mb-4">
              Your primary and secondary ways of expressing and receiving love in relationships
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-slate-400">Communication preferences</p>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-slate-400">Physical touch needs</p>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-slate-400">Appreciation and recognition style</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/80 transition-colors group">
            <div className="h-14 w-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            </div>
            <h3 className="font-bold text-xl text-white mb-2">Emotional Intelligence</h3>
            <p className="text-slate-300 mb-4">
              Your capacity for emotional awareness and regulation in intimate relationships
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-slate-400">Self-awareness and reflection</p>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-slate-400">Empathy and perspective-taking</p>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-slate-400">Emotional regulation strategies</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sophisticated results preview with gradient overlays */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 max-w-4xl mx-auto">
          <div className="px-6 py-5 bg-gradient-to-r from-primary/20 to-blue-500/10 border-b border-slate-700/50">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                Your Complete Compatibility Profile
              </h3>
              <span className="text-sm text-slate-300">Premium Sample</span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column: Compatibility chart */}
              <div>
                <h4 className="font-medium text-white mb-4">Compatibility Analysis</h4>
                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-400">Emotional Stability</span>
                        <span className="text-sm text-primary font-medium">85%</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-400">Trust Building</span>
                        <span className="text-sm text-blue-400 font-medium">92%</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-500/70 rounded-full" style={{width: '92%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-400">Physical Connection</span>
                        <span className="text-sm text-purple-400 font-medium">78%</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-purple-500/70 rounded-full" style={{width: '78%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-400">Intellectual Sync</span>
                        <span className="text-sm text-green-400 font-medium">88%</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-green-500/70 rounded-full" style={{width: '88%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-400">Conflict Resolution</span>
                        <span className="text-sm text-yellow-400 font-medium">72%</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-500/70 rounded-full" style={{width: '72%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column: Match recommendations */}
              <div>
                <h4 className="font-medium text-white mb-4">Ideal Match Profile</h4>
                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-primary/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                          <line x1="9" y1="9" x2="9.01" y2="9"></line>
                          <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium text-white text-sm">Confident & Supportive</h5>
                        <p className="text-xs text-slate-400">Someone who balances confidence with emotional support</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3 flex-shrink-0 border border-blue-500/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium text-white text-sm">Stable & Consistent</h5>
                        <p className="text-xs text-slate-400">With reliable communication and emotional regularity</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0 border border-green-500/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium text-white text-sm">Intellectually Curious</h5>
                        <p className="text-xs text-slate-400">Someone who engages your mind and shares interests</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-4 sm:mb-0">
                  <h4 className="font-medium text-white mb-1">Unlock Your Full Assessment</h4>
                  <p className="text-sm text-slate-400">Detailed insights into your compatibility profile</p>
                </div>
                <Link href="/register" className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors">
                  Take the Assessment
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaturityInsightsSection;