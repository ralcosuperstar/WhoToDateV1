import { Link } from "wouter";

const MaturityInsightsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-pink-50/30 to-gray-50 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-100/30 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 py-1 px-3 bg-white rounded-full shadow-sm border border-pink-100">
            <span className="text-gray-700 font-medium text-sm flex items-center">
              <span className="mr-2">🔍</span> Scientifically-Validated Analysis
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-800 mb-4">
            Know Your <span className="text-primary">Relationship DNA</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our comprehensive assessment reveals your unique personality traits, attachment style, emotional intelligence, and relationship values - all for FREE
          </p>
        </div>

        {/* Insights Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="group relative bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-primary"></div>
            <div className="p-6">
              <div className="mb-6 flex items-center">
                <div className="h-12 w-12 rounded-lg bg-pink-50 flex items-center justify-center text-primary mr-4 border border-pink-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-gray-800">Attachment Profile</h3>
              </div>

              <p className="text-gray-600 mb-6">
                Discover whether you're secure, anxious, or avoidant in relationships based on established psychological theories that predict relationship success.
              </p>

              <div className="bg-pink-50/60 rounded-xl p-4 border border-pink-100">
                <h4 className="font-medium text-gray-700 mb-3 text-sm">Your Attachment Style:</h4>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="ml-2 text-sm text-primary font-medium">75%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Secure</span>
                    <span>Anxious</span>
                    <span>Avoidant</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="bg-pink-50 rounded-full py-1 px-3 text-primary font-medium border border-pink-100">
                    Secure Primary
                  </div>
                  <div className="bg-purple-50 rounded-full py-1 px-3 text-purple-600 font-medium border border-purple-100">
                    Anxious Secondary
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <Link href="/register" className="block w-full text-center py-3 rounded-md bg-primary hover:bg-primary/90 text-gray-800 font-medium transition-colors duration-300 border border-primary/50">
                Discover Your Style
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-primary"></div>
            <div className="p-6">
              <div className="mb-6 flex items-center">
                <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary mr-4 border border-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-gray-800">Personality Traits</h3>
              </div>

              <p className="text-gray-600 mb-6">
                Your unique personality traits influence your relationship needs, communication style, and conflict resolution strategies.
              </p>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-1">
                <h4 className="font-medium text-gray-700 mb-3 text-sm">Big Five Personality Traits:</h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Openness</span>
                      <span className="text-primary">82%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Conscientiousness</span>
                      <span className="text-green-600">70%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Extraversion</span>
                      <span className="text-primary">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <Link href="/register" className="block w-full text-center py-3 rounded-md bg-primary hover:bg-primary/90 text-gray-800 font-medium transition-colors duration-300 border border-primary/50">
                Analyze Your Traits
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-primary"></div>
            <div className="p-6">
              <div className="mb-6 flex items-center">
                <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary mr-4 border border-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-gray-800">Compatibility Insights</h3>
              </div>

              <p className="text-gray-600 mb-6">
                Our algorithm identifies your most compatible match types based on complementary traits and shared values.
              </p>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3 text-sm">Your Top Match Types:</h4>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-2 border border-primary/20">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <span className="text-gray-800 font-medium">The Nurturer</span>
                    </div>
                    <span className="text-sm bg-green-50 text-green-600 px-2 py-0.5 rounded-full border border-green-100">
                      94% Match
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary mr-2 border border-blue-100">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <span className="text-gray-800 font-medium">The Creator</span>
                    </div>
                    <span className="text-sm bg-blue-50 text-primary px-2 py-0.5 rounded-full border border-blue-100">
                      86% Match
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <Link href="/register" className="block w-full text-center py-3 rounded-md bg-primary hover:bg-primary/90 text-gray-800 font-medium transition-colors duration-300 border border-primary/50">
                Find Your Matches
              </Link>
            </div>
          </div>
        </div>

        {/* Comparison chart */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-12">
          <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-blue-100/40 border-b border-gray-200">
            <h3 className="font-bold text-xl text-gray-800">Compatibility Profile Comparison</h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-blue-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <line x1="18" y1="8" x2="23" y2="13"></line>
                      <line x1="23" y1="8" x2="18" y2="13"></line>
                    </svg>
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">Profile Type A</h4>
                <p className="text-gray-600 text-sm mb-3">Secure Connector</p>
                <ul className="text-gray-600 text-sm space-y-2 text-left">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    High emotional intelligence
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Stable relationships
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Clear communication
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-blue-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">Profile Type B</h4>
                <p className="text-gray-600 text-sm mb-3">Analytical Thinker</p>
                <ul className="text-gray-600 text-sm space-y-2 text-left">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Thoughtful problem-solving
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Intellectual connection
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Values independence
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-blue-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">Profile Type C</h4>
                <p className="text-gray-600 text-sm mb-3">Empathic Mediator</p>
                <ul className="text-gray-600 text-sm space-y-2 text-left">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Deep emotional connection
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Highly supportive
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Prioritizes harmony
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <h4 className="font-medium text-gray-800 text-center mb-6">Compatibility Matrix</h4>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                  <span className="text-gray-800 font-medium">A + B</span>
                  <p className="text-xs text-gray-600 mt-1">95% Compatible</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                  <span className="text-gray-800 font-medium">A + C</span>
                  <p className="text-xs text-gray-600 mt-1">92% Compatible</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center border border-yellow-200">
                  <span className="text-gray-800 font-medium">B + C</span>
                  <p className="text-xs text-gray-600 mt-1">78% Compatible</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA button */}
        <div className="text-center">
          <Link 
            href="/register" 
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-gray-800 font-bold text-lg rounded-lg shadow-lg border border-primary/50 hover:bg-primary/90 transform hover:translate-y-[-2px] transition-all duration-300"
          >
            Get Your Complete Profile
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
          <p className="mt-4 text-gray-600 text-sm">
            5-minute assessment • Scientifically validated • Instant results
          </p>
        </div>
      </div>
    </section>
  );
};

export default MaturityInsightsSection;