import { Link } from "wouter";

const ScienceSection = () => {
  return (
    <section className="py-16 bg-neutral-50 px-4" id="compatibility-science">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block mb-3 py-1.5 px-4 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center justify-center">
                <span className="emoji mr-2">🔬</span> Our Scientific Approach
              </span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-3">The Science of Relationship Compatibility</h2>
            <p className="text-base sm:text-lg mx-auto text-neutral-dark/80 max-w-2xl">
              WhoToDate integrates multiple psychological frameworks to provide personalized compatibility insights based on validated research
            </p>
          </div>

          {/* Three core scientific frameworks */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100">
              <div className="bg-blue-50 p-4">
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="emoji text-xl">🔄</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg">Attachment Theory</h3>
                </div>
                <p className="text-neutral-dark/80 text-sm">
                  How your early relationships shape your adult connection patterns
                </p>
              </div>
              <div className="p-4">
                <div className="space-y-2.5">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium">Identifies 4 Attachment Styles</h4>
                      <p className="text-neutral-dark/70 text-xs">Secure, Anxious, Avoidant, Fearful</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium">Predicts Relationship Behaviors</h4>
                      <p className="text-neutral-dark/70 text-xs">Communication, trust, and conflict patterns</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium">Guides Compatibility Matching</h4>
                      <p className="text-neutral-dark/70 text-xs">Which styles work best together</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-purple-100">
              <div className="bg-purple-50 p-4">
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <span className="emoji text-xl">👤</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg">Big Five Personality</h3>
                </div>
                <p className="text-neutral-dark/80 text-sm">
                  The most scientifically validated model of personality traits
                </p>
              </div>
              <div className="p-4">
                <div className="space-y-2.5">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mt-0.5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium">Measures 5 Core Traits</h4>
                      <p className="text-neutral-dark/70 text-xs">Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mt-0.5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium">Predicts Relationship Success</h4>
                      <p className="text-neutral-dark/70 text-xs">Based on trait complementarity and similarity</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mt-0.5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium">Identifies Growth Areas</h4>
                      <p className="text-neutral-dark/70 text-xs">Personality aspects that may require flexibility</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-amber-100">
              <div className="bg-amber-50 p-4">
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <span className="emoji text-xl">❤️</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg">Indian Cultural Context</h3>
                </div>
                <p className="text-neutral-dark/80 text-sm">
                  Relationship dynamics in the unique Indian social environment
                </p>
              </div>
              <div className="p-4">
                <div className="space-y-2.5">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mt-0.5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium">Family Values Integration</h4>
                      <p className="text-neutral-dark/70 text-xs">Balancing personal desires with family expectations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mt-0.5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium">Cultural Compatibility</h4>
                      <p className="text-neutral-dark/70 text-xs">Lifestyle, values, and belief alignment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mt-0.5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium">Modern Relationship Expectations</h4>
                      <p className="text-neutral-dark/70 text-xs">Finding balance in evolving social norms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* How the science works in practice */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-100 mb-10">
            <div className="p-6">
              <h3 className="font-heading font-semibold text-xl mb-4 flex items-center">
                <span className="emoji mr-2">🧠</span> Our Scientific Assessment Process
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm mr-3 mt-0.5 shrink-0">1</div>
                    <div>
                      <h4 className="font-medium text-base">Questionnaire Design</h4>
                      <p className="text-neutral-dark/80 text-sm mt-1">
                        Carefully crafted questions measure multiple dimensions of your relationship tendencies, based on validated psychological instruments
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm mr-3 mt-0.5 shrink-0">2</div>
                    <div>
                      <h4 className="font-medium text-base">Algorithm Development</h4>
                      <p className="text-neutral-dark/80 text-sm mt-1">
                        Our algorithms analyze response patterns against research-based compatibility models to identify your relationship profile
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm mr-3 mt-0.5 shrink-0">3</div>
                    <div>
                      <h4 className="font-medium text-base">Multi-Dimensional Analysis</h4>
                      <p className="text-neutral-dark/80 text-sm mt-1">
                        We examine interlocking factors across attachment, personality, values, and emotional intelligence to create a holistic profile
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm mr-3 mt-0.5 shrink-0">4</div>
                    <div>
                      <h4 className="font-medium text-base">Actionable Insights</h4>
                      <p className="text-neutral-dark/80 text-sm mt-1">
                        We translate complex psychological findings into clear, practical guidance for your relationship journey
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Research validation badge */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-base">Scientific Validation</h4>
                    <p className="text-neutral-dark/80 text-sm">Continuously refined through analysis of 10,000+ profiles</p>
                  </div>
                </div>
                <div className="ml-0 sm:ml-auto py-2 px-3 bg-green-50 rounded-lg text-sm text-green-700 font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                  <span>85% accuracy in relationship outcome prediction</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Key scientists and research partnerships - mobile-friendly with icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white rounded-lg p-4 shadow-sm flex items-start">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 shrink-0">
                <span className="emoji text-xl">📊</span>
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base">Data-Driven Approach</h4>
                <p className="text-neutral-dark/70 text-xs sm:text-sm mt-1">
                  Our assessment is constantly improved through outcome analysis and feedback loops
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm flex items-start">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3 shrink-0">
                <span className="emoji text-xl">🌏</span>
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base">Indian Research Focus</h4>
                <p className="text-neutral-dark/70 text-xs sm:text-sm mt-1">
                  Local research partnerships ensure relevance to Indian relationship contexts
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm flex items-start">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3 shrink-0">
                <span className="emoji text-xl">🔒</span>
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base">Ethical Analysis</h4>
                <p className="text-neutral-dark/70 text-xs sm:text-sm mt-1">
                  Strict privacy protocols with data used only for assessment improvement
                </p>
              </div>
            </div>
          </div>
          
          {/* Final call to action */}
          <div className="mt-8 text-center">
            <Link 
              href="/quiz" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-xl shadow-md hover:bg-primary/90 transition"
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