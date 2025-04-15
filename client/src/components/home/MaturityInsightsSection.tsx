import { Link } from "wouter";

const MaturityInsightsSection = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Removed background blur elements that were causing text visibility issues */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 py-1 px-3 bg-white rounded-full shadow-sm border border-pink-100">
            <span className="text-gray-700 font-medium text-sm flex items-center">
              <span className="mr-2">🧠</span> Why Take Our Quiz?
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-800 mb-4">
            In Just 40 Questions, <span style={{ color: '#e83a8e' }}>You'll Discover...</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Our FREE scientifically validated quiz reveals key insights that can transform your dating experience and boost your relationship confidence
          </p>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 border border-pink-100 shadow-md hover:shadow-lg transition-all text-left">
              <div className="flex items-start mb-4">
                <div className="h-10 w-10 rounded-full bg-pink-50 flex items-center justify-center text-primary mr-4 flex-shrink-0 border border-pink-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">Know Yourself Better</h3>
                  <p className="text-gray-600">Uncover your personality traits, attachment style, and values – key factors that shape how you love and who you connect with. Self-awareness is a superpower in dating.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-pink-100 shadow-md hover:shadow-lg transition-all text-left">
              <div className="flex items-start mb-4">
                <div className="h-10 w-10 rounded-full bg-pink-50 flex items-center justify-center text-primary mr-4 flex-shrink-0 border border-pink-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="18" y1="8" x2="23" y2="13"></line>
                    <line x1="23" y1="8" x2="18" y2="13"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">Find Out Who Fits You</h3>
                  <p className="text-gray-600">Learn what kind of partner would harmonize with you best. Your report highlights areas of compatibility and potential friction, so you can focus on relationships that <i>click</i>.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-pink-100 shadow-md hover:shadow-lg transition-all text-left">
              <div className="flex items-start mb-4">
                <div className="h-10 w-10 rounded-full bg-pink-50 flex items-center justify-center text-primary mr-4 flex-shrink-0 border border-pink-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">Get Science-Backed Insights</h3>
                  <p className="text-gray-600">We use proven psychological frameworks (Big Five, MBTI, Attachment Theory, Emotional Intelligence) for our analysis - the same factors researchers have linked to happy relationships.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-pink-100 shadow-md hover:shadow-lg transition-all text-left">
              <div className="flex items-start mb-4">
                <div className="h-10 w-10 rounded-full bg-pink-50 flex items-center justify-center text-primary mr-4 flex-shrink-0 border border-pink-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">Enjoy Culturally Tuned Advice</h3>
                  <p className="text-gray-600">Unlike one-size-fits-all tests, WhoToDate is built with Indian dating culture in mind. We understand family dynamics, traditional values vs. modern views, and the arranged marriage context.</p>
                </div>
              </div>
            </div>
          </div>
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
                Discover whether you're secure, anxious, or avoidant in relationships based on established psychological theories that help you understand your relationship patterns.
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
              <Link href="/register" className="block w-full text-center py-3 rounded-md text-white font-medium transition-colors duration-300 border border-pink-200 hover:opacity-90"
              style={{ backgroundColor: '#e83a8e' }}>
                Discover Your Style
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-primary"></div>
            <div className="p-6">
              <div className="mb-6 flex items-center">
                <div className="h-12 w-12 rounded-lg bg-pink-50 flex items-center justify-center text-primary mr-4 border border-pink-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-gray-800">Personality Traits</h3>
              </div>

              <p className="text-gray-600 mb-6">
                Based on the Big Five model, we analyze your unique personality dimensions to help you understand your relationship patterns and communication style.
              </p>

              <div className="bg-pink-50/60 rounded-xl p-4 border border-pink-100 mb-1">
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
                      <span className="text-purple-600">70%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
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
              <Link href="/register" className="block w-full text-center py-3 rounded-md text-white font-medium transition-colors duration-300 border border-pink-200 hover:opacity-90"
              style={{ backgroundColor: '#e83a8e' }}>
                Analyze Your Traits
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-primary"></div>
            <div className="p-6">
              <div className="mb-6 flex items-center">
                <div className="h-12 w-12 rounded-lg bg-pink-50 flex items-center justify-center text-primary mr-4 border border-pink-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-gray-800">Relationship Insights</h3>
              </div>

              <p className="text-gray-600 mb-6">
                Our research-backed assessment helps you understand what personality types harmonize with your own, based on your unique traits, values, and emotional patterns.
              </p>

              <div className="bg-pink-50/60 rounded-xl p-4 border border-pink-100">
                <h4 className="font-medium text-gray-700 mb-3 text-sm">Your Harmonious Types:</h4>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-pink-100">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-2 border border-primary/20">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <span className="text-gray-800 font-medium">The Nurturer</span>
                    </div>
                    <span className="text-sm bg-green-50 text-green-600 px-2 py-0.5 rounded-full border border-green-100">
                      94% Harmony
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-pink-100">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 mr-2 border border-purple-100">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <span className="text-gray-800 font-medium">The Visionary</span>
                    </div>
                    <span className="text-sm bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full border border-purple-100">
                      86% Harmony
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <Link href="/register" className="block w-full text-center py-3 rounded-md text-white font-medium transition-colors duration-300 border border-pink-200 hover:opacity-90"
              style={{ backgroundColor: '#e83a8e' }}>
                Discover Harmonious Types
              </Link>
            </div>
          </div>
        </div>

        {/* Unique Value Proposition */}
        <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8 border border-pink-100 shadow-md">
          <div className="text-center mb-8">
            <div className="inline-block mb-4 py-1 px-3 bg-white rounded-full shadow-sm border border-pink-100">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">🔍</span> What's the Unique Value?
              </span>
            </div>
            <h3 className="font-bold text-2xl text-gray-800 mb-3">
              WhoToDate isn't a dating app – <span style={{ color: '#e83a8e' }}>it's better</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We won't show you random profiles or make you swipe endlessly. Instead, we give you the tools to make better dating decisions on your own terms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-pink-50 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-pink-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800">Psychology-Backed</h4>
              </div>
              <p className="text-sm text-gray-600">
                Grounded in research from psychology. We're talking the same personality factors therapists and counselors discuss with couples - not superstition or gimmicks.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-pink-50 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-pink-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <path d="M20 8v6"></path>
                    <path d="M23 11h-6"></path>
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800">Non-Judgmental & Private</h4>
              </div>
              <p className="text-sm text-gray-600">
                It's not a test you pass or fail. There are no "bad" personalities here. Your answers and results are confidential - creating a safe space to be honest.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-pink-50 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-pink-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800">Growth-Focused</h4>
              </div>
              <p className="text-sm text-gray-600">
                Whether you get a "green" or "red" result, the goal is to help you grow. The report gives tips on how to improve yourself or what to watch out for in relationships.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison chart */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-12">
          <div className="px-6 py-5 bg-gradient-to-r from-pink-50 to-purple-50/40 border-b border-pink-100">
            <h3 className="font-bold text-xl text-gray-800">Personality Type Harmony</h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-pink-50 rounded-xl p-4 border border-pink-100 text-center hover:shadow-md transition-all">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-pink-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <line x1="18" y1="8" x2="23" y2="13"></line>
                      <line x1="23" y1="8" x2="18" y2="13"></line>
                    </svg>
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">Secure Connector</h4>
                <p className="text-gray-600 text-sm mb-3">Green Zone Profile</p>
                <ul className="text-gray-600 text-sm space-y-2 text-left">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    High emotional intelligence
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Forms stable relationships
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Clear communication style
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 text-center hover:shadow-md transition-all">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-purple-500 mr-3 flex-shrink-0 border border-purple-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">Analytical Visionary</h4>
                <p className="text-gray-600 text-sm mb-3">Green Zone Profile</p>
                <ul className="text-gray-600 text-sm space-y-2 text-left">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Deep intellectual connection
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Excellent problem-solving
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Balanced independence
                  </li>
                </ul>
              </div>

              <div className="bg-pink-50 rounded-xl p-4 border border-pink-100 text-center hover:shadow-md transition-all">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-pink-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">Empathic Nurturer</h4>
                <p className="text-gray-600 text-sm mb-3">Green Zone Profile</p>
                <ul className="text-gray-600 text-sm space-y-2 text-left">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Emotionally supportive
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Creates deep connections
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Maintains relationship harmony
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50/50 to-purple-50/50 rounded-xl p-4 border border-pink-100 shadow-sm">
              <h4 className="font-medium text-gray-800 text-center mb-6">Relationship Harmony Matrix</h4>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white rounded-lg p-3 text-center border border-pink-200 hover:border-primary transition-all">
                  <span className="text-gray-800 font-medium">Secure + Visionary</span>
                  <p className="text-xs text-primary font-medium mt-1">95% Harmony</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center border border-pink-200 hover:border-primary transition-all">
                  <span className="text-gray-800 font-medium">Secure + Nurturer</span>
                  <p className="text-xs text-primary font-medium mt-1">92% Harmony</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center border border-purple-200 hover:border-purple-500 transition-all">
                  <span className="text-gray-800 font-medium">Visionary + Nurturer</span>
                  <p className="text-xs text-purple-500 font-medium mt-1">88% Harmony</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA button */}
        <div className="text-center">
          <div className="inline-block mb-6 py-1 px-3 bg-purple-50 rounded-full shadow-sm border border-purple-100">
            <span className="text-gray-700 font-medium text-sm flex items-center">
              <span className="mr-2">🎁</span> Take the Free 5-Minute Quiz
            </span>
          </div>
          
          <Link 
            href="/register" 
            className="inline-flex items-center justify-center px-8 py-4 text-white font-bold text-lg rounded-lg shadow-lg border border-pink-200 hover:opacity-90 transform hover:translate-y-[-2px] transition-all duration-300"
            style={{ backgroundColor: '#e83a8e' }}
          >
            Start My FREE Compatibility Quiz
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-pink-100 hover:border-primary transition-all">
              <div className="rounded-full bg-pink-50 w-10 h-10 mx-auto mb-2 flex items-center justify-center text-primary">
                <span className="text-xl">⏱️</span>
              </div>
              <h4 className="font-medium text-gray-800 mb-1">Quick 5-Minute Quiz</h4>
              <p className="text-sm text-gray-600">Just 40 simple questions about your personality and preferences</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100 hover:border-purple-500 transition-all">
              <div className="rounded-full bg-purple-50 w-10 h-10 mx-auto mb-2 flex items-center justify-center text-purple-500">
                <span className="text-xl">🧠</span>
              </div>
              <h4 className="font-medium text-gray-800 mb-1">Science-Backed Analysis</h4>
              <p className="text-sm text-gray-600">Based on established psychological frameworks and attachment theory</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-pink-100 hover:border-primary transition-all">
              <div className="rounded-full bg-pink-50 w-10 h-10 mx-auto mb-2 flex items-center justify-center text-primary">
                <span className="text-xl">🎯</span>
              </div>
              <h4 className="font-medium text-gray-800 mb-1">Instant Results</h4>
              <p className="text-sm text-gray-600">Get your comprehensive relationship blueprint immediately after completion</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaturityInsightsSection;