import { Link } from "wouter";

const MaturityMethodologySection = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Removed abstract shapes that were causing blur/visibility issues */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 py-1 px-3 bg-white rounded-full shadow-sm border border-pink-100">
            <span className="text-gray-700 font-medium text-sm flex items-center">
              <span className="mr-2">🔬</span> Backed by Research
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-800 mb-4">
            The <span className="text-primary">Science</span> Behind Our Assessment
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our relationship assessment combines multiple validated psychological frameworks to give you accurate, meaningful insights into your relationship patterns
          </p>
        </div>

        {/* Three-column scientific frameworks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-pink-200 transition-colors shadow-md transform hover:scale-[1.02] transition-all">
            <div className="h-16 w-16 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-primary mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"></path>
                <path d="M8 21h8"></path>
                <path d="M12 17v4"></path>
                <path d="M17 8v8"></path>
                <path d="M17 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                <path d="M14 8h6"></path>
              </svg>
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-3 text-center">Attachment Theory</h3>
            <p className="text-gray-600 text-center mb-4">
              How your early relationships shape your adult connections and emotional intimacy patterns
            </p>
            <div className="space-y-3">
              <div className="flex items-center bg-pink-50/50 rounded-lg p-3 border border-pink-100">
                <div className="h-8 w-8 rounded-lg bg-pink-50 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-pink-100">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Secure Attachment</h4>
                  <p className="text-xs text-gray-600">Comfortable with intimacy and independence</p>
                </div>
              </div>
              <div className="flex items-center bg-pink-50/50 rounded-lg p-3 border border-pink-100">
                <div className="h-8 w-8 rounded-lg bg-pink-50 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-pink-100">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Anxious Attachment</h4>
                  <p className="text-xs text-gray-600">Seeks high reassurance and closeness</p>
                </div>
              </div>
              <div className="flex items-center bg-pink-50/50 rounded-lg p-3 border border-pink-100">
                <div className="h-8 w-8 rounded-lg bg-pink-50 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-pink-100">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Avoidant Attachment</h4>
                  <p className="text-xs text-gray-600">Values independence and self-reliance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-200 transition-colors shadow-md transform hover:scale-[1.02] transition-all">
            <div className="h-16 w-16 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-500 mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-3 text-center">Big Five Personality</h3>
            <p className="text-gray-600 text-center mb-4">
              The scientifically validated personality model that helps you understand your relationship patterns and preferences
            </p>
            <div className="space-y-3">
              <div className="flex items-center bg-purple-50/50 rounded-lg p-3 border border-purple-100">
                <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 mr-3 flex-shrink-0 border border-purple-100">
                  <span className="text-sm font-bold">O</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Openness to Experience</h4>
                  <p className="text-xs text-gray-600">Interest in new ideas and experiences</p>
                </div>
              </div>
              <div className="flex items-center bg-purple-50/50 rounded-lg p-3 border border-purple-100">
                <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 mr-3 flex-shrink-0 border border-purple-100">
                  <span className="text-sm font-bold">C</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Conscientiousness</h4>
                  <p className="text-xs text-gray-600">Organization and responsibility level</p>
                </div>
              </div>
              <div className="flex items-center bg-purple-50/50 rounded-lg p-3 border border-purple-100">
                <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 mr-3 flex-shrink-0 border border-purple-100">
                  <span className="text-sm font-bold">E</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Extraversion</h4>
                  <p className="text-xs text-gray-600">Energy level in social interactions</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-pink-200 transition-colors shadow-md transform hover:scale-[1.02] transition-all">
            <div className="h-16 w-16 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-primary mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="8" cy="12" r="1"></circle>
                <circle cx="16" cy="12" r="1"></circle>
              </svg>
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-3 text-center">Love Languages</h3>
            <p className="text-gray-600 text-center mb-4">
              Identifies how you prefer to give and receive love, essential for relationship satisfaction
            </p>
            <div className="space-y-3">
              <div className="flex items-center bg-pink-50/50 rounded-lg p-3 border border-pink-100">
                <div className="h-8 w-8 rounded-lg bg-pink-50 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-pink-100">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Words of Affirmation</h4>
                  <p className="text-xs text-gray-600">Verbal expressions of appreciation</p>
                </div>
              </div>
              <div className="flex items-center bg-pink-50/50 rounded-lg p-3 border border-pink-100">
                <div className="h-8 w-8 rounded-lg bg-pink-50 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-pink-100">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Quality Time</h4>
                  <p className="text-xs text-gray-600">Undivided attention and togetherness</p>
                </div>
              </div>
              <div className="flex items-center bg-pink-50/50 rounded-lg p-3 border border-pink-100">
                <div className="h-8 w-8 rounded-lg bg-pink-50 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-pink-100">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Physical Touch</h4>
                  <p className="text-xs text-gray-600">Physical expressions of affection</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assessment methodology */}
        <div className="bg-gradient-to-r from-pink-50/80 to-purple-50/80 rounded-xl p-8 border border-pink-100 shadow-md max-w-4xl mx-auto mb-12">
          <div className="inline-block mb-4 py-1 px-3 bg-white rounded-full shadow-sm border border-pink-100 mx-auto">
            <span className="text-gray-700 font-medium text-sm flex items-center">
              <span className="mr-2">📊</span> Our Process
            </span>
          </div>
          <h3 className="font-bold text-2xl text-gray-800 mb-6 text-center">
            How We Create Your <span className="text-primary">FREE</span> Relationship Blueprint
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side: timeline process */}
            <div className="border-r border-pink-200 pr-8">
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-4 w-0.5" style={{ backgroundColor: 'rgba(232, 58, 142, 0.6)' }}></div>
                
                <div className="relative mb-8">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center text-white absolute left-0 top-0"
                  style={{ backgroundColor: '#e83a8e' }}>
                    <span className="font-bold">1</span>
                  </div>
                  <div className="ml-12">
                    <h4 className="font-bold text-gray-800 mb-2">Research-Based Assessment</h4>
                    <p className="text-sm text-gray-600">
                      Answer our scientifically validated questions about your personality, attachment style, and relationship preferences in just 5 minutes.
                    </p>
                  </div>
                </div>
                
                <div className="relative mb-8">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center text-white absolute left-0 top-0"
                  style={{ backgroundColor: '#e83a8e' }}>
                    <span className="font-bold">2</span>
                  </div>
                  <div className="ml-12">
                    <h4 className="font-bold text-gray-800 mb-2">Advanced Data Analysis</h4>
                    <p className="text-sm text-gray-600">
                      Our algorithm processes your responses across multiple psychological dimensions to build your unique relationship profile.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center text-white absolute left-0 top-0"
                  style={{ backgroundColor: '#e83a8e' }}>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="ml-12">
                    <h4 className="font-bold text-gray-800 mb-2">Instant Report Generation</h4>
                    <p className="text-sm text-gray-600">
                      Receive your comprehensive compatibility report immediately, with actionable insights and personalized relationship guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: validation */}
            <div>
              <div className="bg-white rounded-xl p-4 border border-pink-100 mb-6 hover:shadow-md transition-all">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mr-3 flex-shrink-0 border border-green-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Research-Backed Science</h4>
                    <div className="flex">
                      <span className="text-green-600 text-xs">Built on established theory</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Our assessment framework integrates attachment theory, Big Five personality traits, and love language research—all validated by decades of psychological studies.
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-purple-100 mb-6 hover:shadow-md transition-all">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 mr-3 flex-shrink-0 border border-purple-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Extensive Data Analysis</h4>
                    <div className="flex">
                      <span className="text-purple-500 text-xs">From 50,000+ Indian profiles</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Our algorithm has been developed using insights from tens of thousands of relationships, continuously improving its ability to provide meaningful relationship insights.
                </p>
              </div>

              <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-pink-100 hover:shadow-md transition-all">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-pink-50 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-pink-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">85% Satisfaction Rate</h4>
                    <p className="text-xs text-gray-600">Users report improved relationship understanding</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="text-center">
          <div className="inline-block mb-4 py-1 px-3 bg-purple-50 rounded-full shadow-sm border border-purple-100">
            <span className="text-gray-700 font-medium text-sm flex items-center">
              <span className="mr-2">🎁</span> Get Your Free Report Now
            </span>
          </div>
          
          <Link 
            href="/register" 
            className="inline-flex items-center justify-center px-8 py-4 text-white font-bold text-lg rounded-lg shadow-lg border border-pink-200 hover:opacity-90 transform hover:translate-y-[-2px] transition-all duration-300"
            style={{ backgroundColor: '#e83a8e' }}
          >
            Create Your FREE Relationship Blueprint
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
            <div className="bg-white rounded-full px-4 py-2 shadow-sm border border-pink-100 flex items-center">
              <span className="text-primary mr-2">⏱️</span>
              <span className="text-sm text-gray-700">5-Minute Quiz</span>
            </div>
            <div className="bg-white rounded-full px-4 py-2 shadow-sm border border-pink-100 flex items-center">
              <span className="text-primary mr-2">🧪</span>
              <span className="text-sm text-gray-700">Scientific Assessment</span>
            </div>
            <div className="bg-white rounded-full px-4 py-2 shadow-sm border border-pink-100 flex items-center">
              <span className="text-primary mr-2">💯</span>
              <span className="text-sm text-gray-700">50,000+ Indian Singles</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaturityMethodologySection;