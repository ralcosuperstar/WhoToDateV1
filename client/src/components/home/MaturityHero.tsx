import { Link } from "wouter";

const MaturityHero = () => {
  return (
    <section className="pt-28 md:pt-32 pb-16 relative overflow-hidden bg-white">
      {/* Clean light mode background */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white to-blue-50/40"></div>

      {/* Subtle animated elements */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-blue-200/30 animate-ping" style={{animationDuration: '3s'}}></div>
      <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-blue-200/30 animate-ping" style={{animationDuration: '4s'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-blue-200/30 animate-ping" style={{animationDuration: '5s'}}></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side: compelling messaging */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <div className="inline-block mb-4 py-1.5 px-4 bg-blue-50 rounded-full border border-blue-100">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">✨</span> Discover Your True Compatibility
              </span>
            </div>

            <h1 className="relative z-10 font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 leading-tight">
              Unlock Your<br />
              <span className="text-gray-900 font-bold relative inline-block">
                Relationship DNA
                <div className="absolute -bottom-3 left-0 w-full h-4 bg-blue-100 -z-10"></div>
              </span>
            </h1>

            <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-lg">
              Our scientifically validated assessment reveals your unique attachment style, personality traits, and compatibility patterns. Gain deeper insights into who you truly connect with.
            </p>

            {/* Social proof */}
            <div className="flex items-center justify-center md:justify-start mb-8">
              <div className="flex -space-x-2 mr-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-500">
                  <span className="text-xs">😊</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-500">
                  <span className="text-xs">❤️</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-500">
                  <span className="text-xs">🤝</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-xs font-bold text-blue-500">+</div>
              </div>
              <p className="text-sm font-medium text-gray-700"><span className="text-primary font-bold">35,000+</span> users found love!</p>
            </div>

            {/* Key value propositions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-200 transition-colors shadow-sm">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 border border-blue-100 text-xl">
                    ❤️
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Attachment Style Quiz</h3>
                    <p className="text-sm text-gray-600">
                      Discover if you're secure, anxious, or avoidant in relationships.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-200 transition-colors shadow-sm">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 border border-blue-100 text-xl">
                    🔍
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Perfect Match Finder</h3>
                    <p className="text-sm text-gray-600">
                      Find who you'll click with based on your personality type.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-200 transition-colors shadow-sm">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 border border-blue-100 text-xl">
                    ⭐
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Relationship Insights</h3>
                    <p className="text-sm text-gray-600">
                      Highlight your natural relationship gifts and talents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-200 transition-colors shadow-sm">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 border border-blue-100 text-xl">
                    🚀
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Growth Journey</h3>
                    <p className="text-sm text-gray-600">
                      Level up your relationship skills and find lasting love.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary CTA with trust elements */}
            <div>
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold text-lg rounded-md shadow-md hover:bg-primary/90 transform hover:translate-y-[-2px] transition-all duration-300"
              >
                Take The Assessment
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>

              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5 shadow-sm">
                  <span className="text-xs text-blue-500 font-medium mr-1">⏱️</span>
                  <span className="text-xs text-gray-700 font-medium">Takes 5 Minutes</span>
                </div>
                <div className="flex items-center bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5 shadow-sm">
                  <span className="text-xs text-blue-500 font-medium mr-1">🎁</span>
                  <span className="text-xs text-gray-700 font-medium">Free Results</span>
                </div>
                <div className="flex items-center bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5 shadow-sm">
                  <span className="text-xs text-blue-500 font-medium mr-1">🔒</span>
                  <span className="text-xs text-gray-700 font-medium">Privacy Protected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Visual representation of results */}
          <div className="w-full md:w-1/2 md:pl-8">
            <div className="relative mx-auto max-w-lg">
              {/* Main display card */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-4">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0 border border-blue-100 text-xl">
                      ❤️
                    </div>
                    <h3 className="font-semibold text-xl ml-1 text-gray-800">Your Love Profile</h3>
                  </div>
                  <div className="bg-green-50 text-green-600 text-xs font-bold px-4 py-1.5 rounded-full flex items-center border border-green-100">
                    <span className="mr-1">✓</span> MATCH-READY
                  </div>
                </div>

                {/* Attachment style */}
                <div className="mb-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <h4 className="font-medium text-sm mb-3 text-gray-700 flex items-center">
                    <span className="mr-1">🔄</span> Your Attachment Style:
                  </h4>
                  <div className="flex items-center">
                    <div className="bg-white p-3 rounded-lg shadow-sm mr-3 flex-shrink-0 border border-gray-100">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">Secure Connector</p>
                      <p className="text-sm text-gray-600">You form stable, trusting relationships with balanced boundaries</p>
                    </div>
                  </div>
                </div>

                {/* Compatibility matches */}
                <div className="mb-6">
                  <h4 className="font-medium text-sm mb-3 text-gray-700 flex items-center">
                    <span className="mr-1">✨</span> Your Perfect Matches:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center mr-2 border border-gray-100">
                          <span className="text-base">🧠</span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">The Nurturer</p>
                          <div className="flex">
                            <span className="text-blue-500 text-xs font-medium">94% Match</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center mr-2 border border-gray-100">
                          <span className="text-base">🌟</span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">The Visionary</p>
                          <div className="flex">
                            <span className="text-blue-500 text-xs font-medium">88% Match</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key insights preview */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700 flex items-center">
                      <span className="mr-1">💡</span> Key Insights
                    </h4>
                    <span className="text-xs bg-white text-primary px-2 py-0.5 rounded-full font-medium border border-blue-100">Premium Preview</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-lg bg-white flex items-center justify-center mr-2 flex-shrink-0 text-blue-500 border border-blue-100">
                        <span className="text-xs">✓</span>
                      </div>
                      <p className="text-sm text-gray-600">Strong emotional intelligence and self-regulation</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-lg bg-white flex items-center justify-center mr-2 flex-shrink-0 text-blue-500 border border-blue-100">
                        <span className="text-xs">✓</span>
                      </div>
                      <p className="text-sm text-gray-600">Natural ability to maintain healthy boundaries</p>
                    </div>
                    <div className="flex items-center opacity-80">
                      <div className="h-6 w-6 rounded-lg bg-white flex items-center justify-center mr-2 flex-shrink-0 text-gray-400 border border-gray-100">
                        <span className="text-xs">+</span>
                      </div>
                      <p className="text-sm text-gray-500">7 more insights in full report...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaturityHero;