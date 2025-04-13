import { Link } from "wouter";

const MaturityCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#21213a] to-[#191930] relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 -ml-24 -mt-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 -mr-24 -mb-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto backdrop-blur-sm">
          <div className="bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left column: enticing content */}
              <div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6 leading-tight">
                  Discover Who You're <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Truly Compatible</span> With
                </h2>
                
                <p className="text-slate-300 text-lg mb-6">
                  Stop wasting time with incompatible partners. Our scientifically validated assessment reveals your unique compatibility profile in just 5 minutes.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p className="text-slate-300">Comprehensive personality assessment</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p className="text-slate-300">Attachment style and relationship patterns</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p className="text-slate-300">Scientifically-matched compatibility insights</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p className="text-slate-300">Detailed personality profile report</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-2 text-sm text-slate-300">4.9/5 from 35,000+ users</span>
                  </div>
                  
                  <p className="text-slate-400 text-sm">
                    "The best relationship tool I've ever used. It's like having a relationship psychologist in your pocket." - <span className="text-white font-medium">The Times of India</span>
                  </p>
                </div>
              </div>

              {/* Right column: CTA form */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm">
                <h3 className="font-bold text-2xl text-white mb-6 text-center">
                  Begin Your Journey
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center bg-[#1a1a2e] rounded-lg p-4 border border-slate-700/50">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3 flex-shrink-0 border border-blue-500/30">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="10" r="3"></circle>
                        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Create Your Profile</h4>
                      <p className="text-sm text-slate-400">Quick account setup in seconds</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-[#1a1a2e] rounded-lg p-4 border border-slate-700/50">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-primary/30">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Take The Assessment</h4>
                      <p className="text-sm text-slate-400">Just 5 minutes for complete insights</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-[#1a1a2e] rounded-lg p-4 border border-slate-700/50">
                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0 border border-green-500/30">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Get Your Results</h4>
                      <p className="text-sm text-slate-400">Instant personalized compatibility profile</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <Link 
                    href="/register" 
                    className="w-full flex items-center justify-center px-8 py-4 bg-primary text-white font-bold text-lg rounded-lg shadow-lg hover:bg-primary/90 transform hover:translate-y-[-2px] transition-all duration-300"
                  >
                    Start Your Assessment
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <div className="flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-xs text-slate-300">5-Minute Assessment</span>
                  </div>
                  <div className="flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span className="text-xs text-slate-300">100% Secure & Private</span>
                  </div>
                  <div className="flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-xs text-slate-300">Free Results</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final trust elements */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="h-12 w-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-primary mb-3 border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h4 className="text-white font-medium text-sm">Data Privacy</h4>
              <p className="text-slate-400 text-xs">Your information stays private</p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-blue-400 mb-3 border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                </svg>
              </div>
              <h4 className="text-white font-medium text-sm">Free Report</h4>
              <p className="text-slate-400 text-xs">Comprehensive results included</p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-purple-400 mb-3 border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h4 className="text-white font-medium text-sm">User Satisfaction</h4>
              <p className="text-slate-400 text-xs">35,000+ happy users</p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-green-400 mb-3 border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h4 className="text-white font-medium text-sm">Scientifically Validated</h4>
              <p className="text-slate-400 text-xs">Research-backed methodology</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaturityCTASection;