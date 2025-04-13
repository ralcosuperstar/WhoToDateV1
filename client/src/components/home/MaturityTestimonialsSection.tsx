import { Link } from "wouter";

const MaturityTestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoLTZ2LTZoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 py-1 px-3 bg-white rounded-full shadow-sm border border-gray-200">
            <span className="text-gray-700 font-medium text-sm flex items-center">
              <span className="mr-2">💬</span> User Experiences
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-800 mb-4">
            Success Stories & <span className="text-primary">Testimonials</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover how our assessment has helped thousands of people find greater relationship clarity and compatibility
          </p>
        </div>

        {/* Featured testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:border-blue-200 transition-colors">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Priya S.</h4>
                <p className="text-xs text-gray-500">27, Software Engineer</p>
              </div>
            </div>
            
            <div className="mb-4 flex">
              <span className="text-yellow-500">★★★★★</span>
            </div>
            
            <blockquote className="text-gray-600 mb-5 italic">
              "The assessment was eye-opening. I discovered I have a secure attachment style but tend to attract anxious partners. Understanding this pattern has transformed how I approach dating."
            </blockquote>
            
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex justify-between items-center mb-1">
                <h5 className="font-medium text-gray-700 text-sm">Profile Type:</h5>
                <span className="text-xs bg-blue-50 text-primary px-2 py-0.5 rounded-full border border-blue-100">Secure Connector</span>
              </div>
              <p className="text-xs text-gray-600">
                Found compatible partner within 3 months after taking the assessment
              </p>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:border-blue-200 transition-colors">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Arjun K.</h4>
                <p className="text-xs text-gray-500">32, Marketing Executive</p>
              </div>
            </div>
            
            <div className="mb-4 flex">
              <span className="text-yellow-500">★★★★★</span>
            </div>
            
            <blockquote className="text-gray-600 mb-5 italic">
              "After years of confusing dating experiences, this assessment finally helped me understand why I struggled with commitment. The insights into my avoidant tendencies were life-changing."
            </blockquote>
            
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex justify-between items-center mb-1">
                <h5 className="font-medium text-gray-700 text-sm">Profile Type:</h5>
                <span className="text-xs bg-blue-50 text-primary px-2 py-0.5 rounded-full border border-blue-100">Thoughtful Analyzer</span>
              </div>
              <p className="text-xs text-gray-600">
                Currently in a 1-year relationship with 90% compatibility match
              </p>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:border-blue-200 transition-colors">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary mr-3 flex-shrink-0 border border-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Neha M.</h4>
                <p className="text-xs text-gray-500">29, Healthcare Professional</p>
              </div>
            </div>
            
            <div className="mb-4 flex">
              <span className="text-yellow-500">★★★★★</span>
            </div>
            
            <blockquote className="text-gray-600 mb-5 italic">
              "The compatibility insights were surprisingly accurate. I took the assessment with my partner, and it pinpointed exactly where our communication breaks down. We're now working on those areas together."
            </blockquote>
            
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex justify-between items-center mb-1">
                <h5 className="font-medium text-gray-700 text-sm">Profile Type:</h5>
                <span className="text-xs bg-blue-50 text-primary px-2 py-0.5 rounded-full border border-blue-100">Empathic Mediator</span>
              </div>
              <p className="text-xs text-gray-600">
                Existing 3-year relationship significantly improved after assessment
              </p>
            </div>
          </div>
        </div>

        {/* Statistics and social proof */}
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md mb-16">
          <div className="px-6 py-5 bg-blue-50 border-b border-blue-100">
            <h3 className="font-bold text-xl text-gray-800">The Numbers Speak For Themselves</h3>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">35,000+</div>
                <p className="text-gray-600 text-sm">Active Users</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">85%</div>
                <p className="text-gray-600 text-sm">Found Compatible Matches</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">91%</div>
                <p className="text-gray-600 text-sm">Report Relationship Improvement</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
                <p className="text-gray-600 text-sm">Average User Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Before/After testimonial - featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1">
              BEFORE
            </div>
            
            <div className="mb-6 pt-3">
              <h4 className="font-bold text-gray-800 text-lg mb-3">Relationship Struggles</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-lg bg-red-50 flex items-center justify-center text-red-500 mr-2 flex-shrink-0 mt-0.5 border border-red-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Repeated patterns of failed relationships</p>
                </div>
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-lg bg-red-50 flex items-center justify-center text-red-500 mr-2 flex-shrink-0 mt-0.5 border border-red-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Misunderstandings and frequent conflicts</p>
                </div>
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-lg bg-red-50 flex items-center justify-center text-red-500 mr-2 flex-shrink-0 mt-0.5 border border-red-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Confusion about who is right for me</p>
                </div>
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-lg bg-red-50 flex items-center justify-center text-red-500 mr-2 flex-shrink-0 mt-0.5 border border-red-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Difficulty expressing needs and emotions</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-100 border border-gray-200 mr-3 flex-shrink-0"></div>
              <div>
                <p className="text-sm text-gray-600 italic">"I was stuck in a cycle of dating the wrong people, but couldn't figure out why."</p>
                <p className="text-xs text-gray-500 mt-1">Raj T., 28</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1">
              AFTER
            </div>
            
            <div className="mb-6 pt-3">
              <h4 className="font-bold text-gray-800 text-lg mb-3">Relationship Breakthrough</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-lg bg-green-50 flex items-center justify-center text-green-500 mr-2 flex-shrink-0 mt-0.5 border border-green-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Clear understanding of relationship patterns</p>
                </div>
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-lg bg-green-50 flex items-center justify-center text-green-500 mr-2 flex-shrink-0 mt-0.5 border border-green-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Ability to identify compatible partners</p>
                </div>
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-lg bg-green-50 flex items-center justify-center text-green-500 mr-2 flex-shrink-0 mt-0.5 border border-green-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Improved communication and conflict resolution</p>
                </div>
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-lg bg-green-50 flex items-center justify-center text-green-500 mr-2 flex-shrink-0 mt-0.5 border border-green-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Greater emotional awareness and expression</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-100 border border-gray-200 mr-3 flex-shrink-0"></div>
              <div>
                <p className="text-sm text-gray-600 italic">"The assessment was a revelation. I finally understand what I need in a relationship and found someone who complements me."</p>
                <p className="text-xs text-gray-500 mt-1">Raj T., 28</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Link 
            href="/register" 
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-gray-800 font-bold text-lg rounded-lg shadow-lg border border-primary/50 hover:bg-primary/90 transform hover:translate-y-[-2px] transition-all duration-300"
          >
            Take The Assessment Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
          <p className="mt-4 text-gray-600 text-sm">
            Join thousands who've transformed their relationship experiences
          </p>
        </div>
      </div>
    </section>
  );
};

export default MaturityTestimonialsSection;