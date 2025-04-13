import { Link } from "wouter";

const ScienceSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-neutral-50 px-4" id="compatibility-science">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block mb-3 py-1.5 px-4 bg-primary/15 rounded-full shadow-sm">
              <span className="text-primary font-medium text-sm flex items-center justify-center">
                <span className="emoji mr-2">🔬</span> Our Scientific Approach
              </span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-3 bg-gradient-to-r from-primary to-fuchsia-600 text-transparent bg-clip-text">The Science of Relationship Compatibility</h2>
            <p className="text-base sm:text-lg mx-auto text-neutral-dark/80 max-w-2xl">
              WhoToDate integrates multiple psychological frameworks to provide personalized compatibility insights based on validated research
            </p>
          </div>

          {/* Three core scientific frameworks */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-all group hover:border-blue-200">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/70 p-4 group-hover:from-blue-100 group-hover:to-blue-200/70 transition-colors">
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform border border-blue-200">
                    <span className="emoji text-xl">🔄</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-blue-800">Attachment Theory</h3>
                </div>
                <p className="text-blue-900/80 text-sm">
                  How your early relationships shape your adult connection patterns
                </p>
              </div>
              <div className="p-4">
                <div className="space-y-2.5">
                  <div className="flex items-start group/item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 shrink-0 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium group-hover/item:text-blue-700 transition-colors">Identifies 4 Attachment Styles</h4>
                      <p className="text-neutral-dark/70 text-xs">Secure, Anxious, Avoidant, Fearful</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group/item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 shrink-0 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium group-hover/item:text-blue-700 transition-colors">Predicts Relationship Behaviors</h4>
                      <p className="text-neutral-dark/70 text-xs">Communication, trust, and conflict patterns</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group/item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 shrink-0 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium group-hover/item:text-blue-700 transition-colors">Guides Compatibility Matching</h4>
                      <p className="text-neutral-dark/70 text-xs">Which styles work best together</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-fuchsia-100 hover:shadow-lg transition-all group hover:border-fuchsia-200">
              <div className="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100/70 p-4 group-hover:from-fuchsia-100 group-hover:to-fuchsia-200/70 transition-colors">
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-fuchsia-100 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform border border-fuchsia-200">
                    <span className="emoji text-xl">👤</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-fuchsia-800">Big Five Personality</h3>
                </div>
                <p className="text-fuchsia-900/80 text-sm">
                  The most scientifically validated model of personality traits
                </p>
              </div>
              <div className="p-4">
                <div className="space-y-2.5">
                  <div className="flex items-start group/item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-fuchsia-500 mt-0.5 mr-2 shrink-0 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium group-hover/item:text-fuchsia-700 transition-colors">Measures 5 Core Traits</h4>
                      <p className="text-neutral-dark/70 text-xs">Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group/item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-fuchsia-500 mt-0.5 mr-2 shrink-0 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium group-hover/item:text-fuchsia-700 transition-colors">Predicts Relationship Success</h4>
                      <p className="text-neutral-dark/70 text-xs">Based on trait complementarity and similarity</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group/item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-fuchsia-500 mt-0.5 mr-2 shrink-0 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium group-hover/item:text-fuchsia-700 transition-colors">Identifies Growth Areas</h4>
                      <p className="text-neutral-dark/70 text-xs">Personality aspects that may require flexibility</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-pink-100 hover:shadow-lg transition-all group hover:border-pink-200">
              <div className="bg-gradient-to-br from-pink-50 to-pink-100/70 p-4 group-hover:from-pink-100 group-hover:to-pink-200/70 transition-colors">
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform border border-pink-200">
                    <span className="emoji text-xl">❤️</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-pink-800">Indian Cultural Context</h3>
                </div>
                <p className="text-pink-900/80 text-sm">
                  Relationship dynamics in the unique Indian social environment
                </p>
              </div>
              <div className="p-4">
                <div className="space-y-2.5">
                  <div className="flex items-start group/item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mt-0.5 mr-2 shrink-0 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium group-hover/item:text-pink-700 transition-colors">Family Values Integration</h4>
                      <p className="text-neutral-dark/70 text-xs">Balancing personal desires with family expectations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group/item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mt-0.5 mr-2 shrink-0 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium group-hover/item:text-pink-700 transition-colors">Cultural Compatibility</h4>
                      <p className="text-neutral-dark/70 text-xs">Lifestyle, values, and belief alignment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group/item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mt-0.5 mr-2 shrink-0 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium group-hover/item:text-pink-700 transition-colors">Modern Relationship Expectations</h4>
                      <p className="text-neutral-dark/70 text-xs">Finding balance in evolving social norms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* How the science works in practice */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-100 mb-10 hover:shadow-lg transition-all">
            <div className="p-6">
              <h3 className="font-heading font-semibold text-xl mb-4 flex items-center text-gradient bg-gradient-to-r from-primary to-fuchsia-600 bg-clip-text text-transparent">
                <span className="emoji mr-2">🧠</span> Our Scientific Assessment Process
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start group hover:bg-pink-50/40 p-2 rounded-lg transition-colors">
                    <div className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold text-sm mr-3 mt-0.5 shrink-0 group-hover:scale-110 transition-transform group-hover:bg-primary/20">1</div>
                    <div>
                      <h4 className="font-medium text-base group-hover:text-primary transition-colors">Questionnaire Design</h4>
                      <p className="text-neutral-dark/80 text-sm mt-1">
                        Carefully crafted questions measure multiple dimensions of your relationship tendencies, based on validated psychological instruments
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group hover:bg-fuchsia-50/40 p-2 rounded-lg transition-colors">
                    <div className="h-6 w-6 rounded-full bg-fuchsia-500/15 flex items-center justify-center text-fuchsia-600 font-semibold text-sm mr-3 mt-0.5 shrink-0 group-hover:scale-110 transition-transform group-hover:bg-fuchsia-500/20">2</div>
                    <div>
                      <h4 className="font-medium text-base group-hover:text-fuchsia-600 transition-colors">Algorithm Development</h4>
                      <p className="text-neutral-dark/80 text-sm mt-1">
                        Our algorithms analyze response patterns against research-based compatibility models to identify your relationship profile
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start group hover:bg-purple-50/40 p-2 rounded-lg transition-colors">
                    <div className="h-6 w-6 rounded-full bg-purple-500/15 flex items-center justify-center text-purple-600 font-semibold text-sm mr-3 mt-0.5 shrink-0 group-hover:scale-110 transition-transform group-hover:bg-purple-500/20">3</div>
                    <div>
                      <h4 className="font-medium text-base group-hover:text-purple-600 transition-colors">Multi-Dimensional Analysis</h4>
                      <p className="text-neutral-dark/80 text-sm mt-1">
                        We examine interlocking factors across attachment, personality, values, and emotional intelligence to create a holistic profile
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group hover:bg-blue-50/40 p-2 rounded-lg transition-colors">
                    <div className="h-6 w-6 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-600 font-semibold text-sm mr-3 mt-0.5 shrink-0 group-hover:scale-110 transition-transform group-hover:bg-blue-500/20">4</div>
                    <div>
                      <h4 className="font-medium text-base group-hover:text-blue-600 transition-colors">Actionable Insights</h4>
                      <p className="text-neutral-dark/80 text-sm mt-1">
                        We translate complex psychological findings into clear, practical guidance for your relationship journey
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Research validation badge */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-fuchsia-50 rounded-lg border border-blue-100/50">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center text-primary mr-3 shrink-0 border border-primary/20 shadow-sm hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-base text-blue-800">Scientific Validation</h4>
                    <p className="text-blue-900/80 text-sm">Continuously refined through analysis of 10,000+ profiles</p>
                  </div>
                </div>
                <div className="ml-0 sm:ml-auto py-2 px-4 bg-green-100 rounded-lg text-sm text-green-700 font-medium flex items-center border border-green-200 shadow-sm hover:bg-green-200/70 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                  <span>85% accuracy in relationship outcome prediction</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Key scientists and research partnerships - mobile-friendly with icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white rounded-lg p-4 shadow-md flex items-start hover:shadow-lg hover:bg-blue-50/30 transition-all group border border-blue-50">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 shrink-0 group-hover:scale-110 transition-transform border border-blue-200 shadow-sm">
                <span className="emoji text-xl">📊</span>
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base group-hover:text-blue-700 transition-colors">Data-Driven Approach</h4>
                <p className="text-neutral-dark/70 text-xs sm:text-sm mt-1">
                  Our assessment is constantly improved through outcome analysis and feedback loops
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-md flex items-start hover:shadow-lg hover:bg-fuchsia-50/30 transition-all group border border-fuchsia-50">
              <div className="h-10 w-10 rounded-full bg-fuchsia-100 flex items-center justify-center text-fuchsia-600 mr-3 shrink-0 group-hover:scale-110 transition-transform border border-fuchsia-200 shadow-sm">
                <span className="emoji text-xl">🌏</span>
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base group-hover:text-fuchsia-700 transition-colors">Indian Research Focus</h4>
                <p className="text-neutral-dark/70 text-xs sm:text-sm mt-1">
                  Local research partnerships ensure relevance to Indian relationship contexts
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-md flex items-start hover:shadow-lg hover:bg-pink-50/30 transition-all group border border-pink-50">
              <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mr-3 shrink-0 group-hover:scale-110 transition-transform border border-pink-200 shadow-sm">
                <span className="emoji text-xl">🔒</span>
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base group-hover:text-pink-700 transition-colors">Ethical Analysis</h4>
                <p className="text-neutral-dark/70 text-xs sm:text-sm mt-1">
                  Strict privacy protocols with data used only for assessment improvement
                </p>
              </div>
            </div>
          </div>
          
          {/* Final call to action */}
          <div className="mt-8 text-center">
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-md hover:bg-slate-800 transition-all hover:shadow-lg hover:scale-105 transform border-2 border-primary/30"
            >
              <span className="emoji mr-2">🧪</span> Take the Scientific Assessment
            </Link>
            <p className="text-neutral-dark/60 text-sm mt-3">
              Just 5 minutes to discover your relationship compatibility profile
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScienceSection;