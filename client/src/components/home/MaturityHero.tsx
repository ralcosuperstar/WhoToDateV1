import { Link } from "wouter";

const MaturityHero = () => {
  return (
    <section className="pt-24 md:pt-28 pb-16 relative overflow-hidden bg-white">
      {/* Background - removed blur elements that were causing issues */}

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side: compelling messaging */}
          <div className="w-full md:w-1/2 text-left mb-12 md:mb-0">
            <div className="inline-block mb-4 py-1.5 px-4 bg-yellow-50 rounded-full border border-yellow-200">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">🧬</span> A 5-minute compatibility quiz
              </span>
            </div>

            <h1 className="relative z-10 font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-6 text-gray-900 leading-tight">
              Find Who to Date – With <span style={{ color: '#e83a8e' }}>a Little Science</span> and a Lot of Fun
            </h1>

            <p className="text-gray-700 text-lg mb-6 max-w-lg">
              Take the guesswork out of dating. If you're feeling unsure or anxious about relationships, you're not alone. Modern dating can be overwhelming – our quiz helps you navigate it with confidence.
            </p>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-800 text-lg mb-4">In just 40 questions, you'll:</h3>
              <ul className="space-y-3 ml-1">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Know Yourself Better:</span>
                    <p className="text-sm text-gray-600">Uncover your personality traits, attachment style, and values – key factors that shape how you love and who you connect with.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Find Out Who Fits You:</span>
                    <p className="text-sm text-gray-600">Learn what kind of partner would harmonize with you best. No more wasting time on the wrong matches!</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Get Science-Backed Insights:</span>
                    <p className="text-sm text-gray-600">We use proven psychological frameworks (Big Five, MBTI, Attachment Theory) for our analysis.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-start mb-8">
              <div className="flex -space-x-1 mr-3">
                <div className="w-8 h-8 rounded-full bg-blue-200"></div>
                <div className="w-8 h-8 rounded-full bg-pink-200"></div>
                <div className="w-8 h-8 rounded-full bg-purple-200"></div>
                <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-xs font-bold text-yellow-500">
                  <span>😊</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700"><span className="text-primary font-bold">50,000+</span> Indian singles have found clarity</p>
            </div>

            {/* CTA */}
            <div className="mb-6">
              <Link 
                href="/register" 
                className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 text-white font-bold text-lg rounded-lg shadow-lg border border-pink-200 hover:opacity-90 transform hover:translate-y-[-2px] transition-all duration-300"
                style={{ backgroundColor: '#e83a8e' }}
              >
                <span className="mr-2">🔍</span>
                Start My FREE Compatibility Quiz
              </Link>
              
              <div className="mt-3 text-left">
                <span className="text-xs font-medium text-gray-600 flex items-center justify-start">
                  <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No signup needed, just honest answers!
                </span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-start gap-4">
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-pink-100">
                <span style={{ color: '#e83a8e' }} className="mr-2">🔒</span>
                <span className="text-sm text-gray-700 font-medium">100% Private</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-pink-100">
                <span style={{ color: '#e83a8e' }} className="mr-2">⏱️</span>
                <span className="text-sm text-gray-700 font-medium">5-Minute Quiz</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-pink-100">
                <span style={{ color: '#e83a8e' }} className="mr-2">🧠</span>
                <span className="text-sm text-gray-700 font-medium">Psychology-Based</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-pink-100">
                <span style={{ color: '#e83a8e' }} className="mr-2">🇮🇳</span>
                <span className="text-sm text-gray-700 font-medium">Indian Singles Focus</span>
              </div>
            </div>
          </div>

          {/* Right side: Visual representation of results */}
          <div className="w-full md:w-1/2 md:pl-8">
            <div className="relative mx-auto max-w-lg">
              {/* Compatibility Badge Info */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-5">
                <h3 className="font-bold text-xl text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">🚦</span> Your Compatibility Badge
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Every report comes with a color-coded compatibility badge – kind of like a traffic light for your love life!
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                      <span>🟢</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Green: High Compatibility</h4>
                      <p className="text-xs text-gray-600">Your traits and attitudes are well-aligned for relationship success.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3 mt-0.5">
                      <span>🟡</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Yellow: Moderate Compatibility</h4>
                      <p className="text-xs text-gray-600">Proceed with awareness – some areas may need extra attention.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3 mt-0.5">
                      <span>🔴</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Red: Potential Challenges</h4>
                      <p className="text-xs text-gray-600">Not a stop sign! Just flagging areas that need growth and attention.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-md">
                <div className="flex text-yellow-400 mb-3">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <p className="text-sm text-gray-600 italic mb-4">
                  "I was skeptical at first, but the quiz blew me away. My report explained why my last relationship fell apart (turns out my anxious attachment and my ex's avoidant attachment were a recipe for chaos!). It also showed me I got a Yellow badge – fair, because I do have some things to work on. The best part? It gave me tips on how to communicate my needs. I feel so much more confident about dating now."
                </p>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-gray-700 font-medium text-xs">AS</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Aditi S.</p>
                    <p className="text-xs text-gray-500">Mumbai, 24</p>
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