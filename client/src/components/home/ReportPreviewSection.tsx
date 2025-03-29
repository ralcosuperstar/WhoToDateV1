import { Link } from "wouter";

const ReportPreviewSection = () => {
  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      {/* Scientific-themed background elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-pink-50 rounded-full -mr-20 -mt-20 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full -ml-20 -mb-20 opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-8 border-neutral-100/30 rounded-full opacity-30"></div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block mb-3 py-1.5 px-4 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center">
                <span className="emoji mr-2">📊</span> Comprehensive Analysis
              </span>
            </div>

            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4">Your Scientific Compatibility Profile</h2>

            <p className="text-neutral-dark/80 text-base sm:text-lg max-w-3xl mx-auto">
              Our in-depth compatibility reports combine multiple psychological frameworks to provide you with actionable relationship insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-100 mb-6">
                <h3 className="font-heading font-semibold text-lg mb-4 flex items-center">
                  <span className="emoji mr-2">🧪</span> Your Scientific Profile Provides:
                </h3>

                <ul className="space-y-3.5">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 mt-0.5 shrink-0">
                      <span className="emoji text-sm">🧠</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Attachment Style Analysis</h4>
                      <p className="text-neutral-dark/70 text-sm">Identifies your bonding pattern (Secure, Anxious, Avoidant, or Fearful) and its impact on your relationships</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3 mt-0.5 shrink-0">
                      <span className="emoji text-sm">👤</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Personality Dimensions</h4>
                      <p className="text-neutral-dark/70 text-sm">Maps your Big Five traits and shows how they influence your relationship behaviors and needs</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5 shrink-0">
                      <span className="emoji text-sm">❤️</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Emotional Intelligence Mapping</h4>
                      <p className="text-neutral-dark/70 text-sm">Measures your EQ and identifies specific emotional skills that enhance your relationships</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3 mt-0.5 shrink-0">
                      <span className="emoji text-sm">⚖️</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Relationship Values Integration</h4>
                      <p className="text-neutral-dark/70 text-sm">Incorporates your cultural context and personal values into the compatibility assessment</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3 mt-0.5 shrink-0">
                      <span className="emoji text-sm">🔍</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Pattern Recognition</h4>
                      <p className="text-neutral-dark/70 text-sm">Identifies recurring relationship dynamics through multi-dimensional analysis</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/5 rounded-lg p-4 flex items-start mb-6">
                <div className="mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-neutral-dark/80">
                  <span className="font-medium">Scientific validation:</span> Our assessment methodology has been refined through analysis of 10,000+ relationship profiles and shows 85% accuracy in predicting relationship satisfaction.
                </p>
              </div>

              <div className="flex space-x-3">
                <Link 
                  href="/quiz" 
                  className="flex-1 px-6 py-3 bg-primary text-white font-medium rounded-xl shadow-md hover:bg-primary/90 transition duration-300 flex items-center justify-center"
                >
                  <span className="emoji mr-2">🧪</span> Get Your Scientific Profile
                </Link>
                
                <Link 
                  href="/#compatibility-science" 
                  className="px-4 py-3 border border-neutral-200 text-neutral-dark font-medium rounded-xl hover:bg-neutral-50 transition duration-300 flex items-center justify-center"
                >
                  <span className="emoji mr-2">🔬</span> Learn More
                </Link>
              </div>
            </div>

            <div className="order-1 md:order-2">
              {/* Enhanced scientific report card */}
              <div className="relative mx-auto max-w-md">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200 relative z-10">
                  <div className="bg-gradient-to-r from-blue-600 to-primary text-white p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-heading font-semibold text-lg flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Scientific Profile Report
                      </h3>
                      <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full font-medium">Premium</span>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Personality type with scientific framework label */}
                    <div className="flex items-center mb-5 bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mr-4 shrink-0">
                        <span className="emoji text-2xl">🧪</span>
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-heading font-semibold text-lg">The Thoughtful Connector</h4>
                          <span className="ml-2 text-xs bg-blue-200/50 px-2 py-0.5 rounded text-blue-700">Attachment Theory</span>
                        </div>
                        <p className="text-neutral-dark/70 text-sm">Secure attachment with high emotional intelligence and value for deep connections</p>
                      </div>
                    </div>

                    {/* Enhanced scientific metrics */}
                    <div className="space-y-4 mb-5">
                      <div>
                        <div className="flex justify-between items-center text-sm font-medium mb-1">
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Attachment Style
                          </span>
                          <span className="flex items-center">
                            <span className="text-blue-500 font-semibold">Secure</span>
                            <span className="text-xs bg-blue-50 ml-2 px-2 py-0.5 rounded">82%</span>
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-neutral-100 rounded-full">
                          <div className="h-full w-[82%] bg-blue-500 rounded-full"></div>
                        </div>
                        <p className="text-xs text-neutral-dark/60 mt-1">Forms secure emotional bonds with healthy interdependence</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-sm font-medium mb-1">
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                            Big Five: Openness
                          </span>
                          <span className="flex items-center">
                            <span className="text-purple-500 font-semibold">High</span>
                            <span className="text-xs bg-purple-50 ml-2 px-2 py-0.5 rounded">78%</span>
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-neutral-100 rounded-full">
                          <div className="h-full w-[78%] bg-purple-500 rounded-full"></div>
                        </div>
                        <p className="text-xs text-neutral-dark/60 mt-1">Curious, creative, and open to different perspectives</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-sm font-medium mb-1">
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Emotional Intelligence
                          </span>
                          <span className="flex items-center">
                            <span className="text-green-500 font-semibold">Very High</span>
                            <span className="text-xs bg-green-50 ml-2 px-2 py-0.5 rounded">90%</span>
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-neutral-100 rounded-full">
                          <div className="h-full w-[90%] bg-green-500 rounded-full"></div>
                        </div>
                        <p className="text-xs text-neutral-dark/60 mt-1">Exceptional ability to manage emotions and understand others</p>
                      </div>
                    </div>

                    {/* Scientific compatibility analysis */}
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 mb-4">
                      <h5 className="text-sm font-medium mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Scientific Compatibility Analysis
                      </h5>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h6 className="text-sm font-medium flex items-center mb-2 text-green-700">
                            <span className="emoji mr-1">✅</span> High Compatibility
                          </h6>
                          <ul className="space-y-1">
                            <li className="text-xs flex items-start">
                              <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                              <span>Secure attachment types</span>
                            </li>
                            <li className="text-xs flex items-start">
                              <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                              <span>Conscientious individuals</span>
                            </li>
                            <li className="text-xs flex items-start">
                              <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                              <span>Value-aligned partners</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-red-50 p-3 rounded-lg">
                          <h6 className="text-sm font-medium flex items-center mb-2 text-red-700">
                            <span className="emoji mr-1">⚠️</span> Potential Challenges
                          </h6>
                          <ul className="space-y-1">
                            <li className="text-xs flex items-start">
                              <span className="h-1.5 w-1.5 bg-red-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                              <span>Avoidant attachment types</span>
                            </li>
                            <li className="text-xs flex items-start">
                              <span className="h-1.5 w-1.5 bg-red-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                              <span>Low EQ individuals</span>
                            </li>
                            <li className="text-xs flex items-start">
                              <span className="h-1.5 w-1.5 bg-red-500 rounded-full mt-1.5 mr-1.5 shrink-0"></span>
                              <span>Highly neurotic partners</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Growth insight */}
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3 shrink-0">
                          <span className="emoji">💡</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm text-amber-700 mb-1">Scientific Growth Insight</h5>
                          <p className="text-sm">Your high empathy can lead to emotional exhaustion. Research shows that setting clearer boundaries will help you maintain emotional energy while preserving your natural supportiveness.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scientific decorative elements */}
                <div className="absolute -top-3 -right-3 w-full h-full bg-gradient-to-br from-blue-100/60 to-purple-100/60 rounded-xl -z-10 transform rotate-2"></div>
                <div className="absolute -bottom-3 -left-3 w-full h-full bg-gradient-to-br from-pink-100/60 to-amber-100/60 rounded-xl -z-20 transform -rotate-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportPreviewSection;