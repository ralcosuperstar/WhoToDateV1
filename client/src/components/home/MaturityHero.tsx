import { Link } from "wouter";

const MaturityHero = () => {
  return (
    <section className="pt-24 md:pt-28 pb-16 relative overflow-hidden bg-white">
      {/* Background - removed blur elements that were causing issues */}

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side: compelling messaging */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <div className="inline-block mb-4 py-1.5 px-4 bg-yellow-50 rounded-full border border-yellow-200">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">✨</span> Discover Your Perfect Match Type
              </span>
            </div>

            <h1 className="relative z-10 font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-6 text-gray-900 leading-tight">
              Stop Wasting Time With <span className="text-primary">The Wrong People</span>
            </h1>

            <p className="text-gray-700 text-lg mb-8 max-w-lg">
              Our 5-minute quiz reveals exactly who you're naturally compatible with, based on your personality. It's like having a relationship coach in your pocket!
            </p>

            {/* Social proof */}
            <div className="flex items-center justify-center md:justify-start mb-8">
              <div className="flex -space-x-1 mr-3">
                <div className="w-8 h-8 rounded-full bg-blue-200"></div>
                <div className="w-8 h-8 rounded-full bg-pink-200"></div>
                <div className="w-8 h-8 rounded-full bg-purple-200"></div>
                <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-xs font-bold text-yellow-500">
                  <span>😊</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700"><span className="text-primary font-bold">50,000+</span> people took the test today</p>
            </div>

            {/* Two column comparison - Problems vs Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <span className="inline-block bg-red-100 text-red-600 text-sm py-1 px-3 rounded-full font-medium">WITHOUT US</span>
                </div>
                <div className="flex items-center mb-3">
                  <span className="mr-2">😔</span>
                  <h3 className="font-bold text-gray-800">Endless Dating Frustration</h3>
                </div>
                <ul className="space-y-2 ml-6 list-disc text-gray-600 text-sm">
                  <li>Wasting time with wrong matches</li>
                  <li>Repeating same relationship mistakes</li>
                  <li>Feeling confused about failed relationships</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <span className="inline-block bg-green-100 text-green-600 text-sm py-1 px-3 rounded-full font-medium">WITH US</span>
                </div>
                <div className="flex items-center mb-3">
                  <span className="mr-2">🎯</span>
                  <h3 className="font-bold text-gray-800">Find Your Perfect Match</h3>
                </div>
                <ul className="space-y-2 ml-6 list-disc text-gray-600 text-sm">
                  <li>Know exactly who's right for you</li>
                  <li>Understand your relationship patterns</li>
                  <li>Build healthier, happier relationships</li>
                </ul>
              </div>
            </div>

            {/* Rating and CTA */}
            <div className="mb-6">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <div className="flex text-yellow-400 mr-2">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <span className="text-sm font-medium text-gray-600">4.9/5 from 2,000+ users</span>
              </div>
              
              <Link 
                href="/register" 
                className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold text-lg rounded-md shadow-md hover:bg-primary/90 transform hover:translate-y-[-2px] transition-all duration-300"
              >
                <span className="mr-2">🚀</span>
                Take The Free Quiz Now
              </Link>
              
              <div className="mt-3 text-center md:text-left">
                <span className="text-xs text-gray-600">100% free comprehensive results and insights</span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-gray-500">
                  <span className="text-sm">🔒</span>
                </div>
                <span className="text-xs text-gray-600 font-medium">100% Private</span>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-gray-500">
                  <span className="text-sm">⏱️</span>
                </div>
                <span className="text-xs text-gray-600 font-medium">5 Minutes</span>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-gray-500">
                  <span className="text-sm">🧪</span>
                </div>
                <span className="text-xs text-gray-600 font-medium">Science-Based</span>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-gray-500">
                  <span className="text-sm">📱</span>
                </div>
                <span className="text-xs text-gray-600 font-medium">Mobile-Friendly</span>
              </div>
            </div>
          </div>

          {/* Right side: Visual representation of results */}
          <div className="w-full md:w-1/2 md:pl-8">
            <div className="relative mx-auto max-w-lg">
              {/* Main display card */}
              <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-2xl">❤️</span>
                    <h3 className="font-bold text-lg text-gray-800">Your Love Profile</h3>
                  </div>
                  <div className="bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full">
                    <span className="mr-1">✓</span> GREEN
                  </div>
                </div>

                {/* Personality Type */}
                <div className="mb-5">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Your Personality Type:</h4>
                  <div className="flex items-center bg-yellow-50 rounded-lg p-2 border border-yellow-100">
                    <div className="mr-3 text-xl">
                      <span>😊</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-800">The Supportive Partner</h5>
                      <p className="text-xs text-gray-600">You're attentive, emotionally connected, and naturally nurturing in relationships</p>
                    </div>
                  </div>
                </div>

                {/* Perfect Match */}
                <div className="mb-5">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Your Perfect Match:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-50 p-2 rounded-lg text-center">
                      <div className="text-2xl mb-1">☀️</div>
                      <p className="text-sm font-medium text-gray-800">The Confident Leader</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded-lg text-center">
                      <div className="text-2xl mb-1">🔥</div>
                      <p className="text-sm font-medium text-gray-800">The Passionate Creator</p>
                    </div>
                  </div>
                </div>

                {/* Relationship Strengths */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Your Relationship Strengths:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mr-2 text-pink-500 text-xs">✓</div>
                      <p className="text-sm text-gray-600">Strong emotional connection abilities</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mr-2 text-pink-500 text-xs">✓</div>
                      <p className="text-sm text-gray-600">Natural harmony with complementary types</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mr-2 text-pink-500 text-xs">✓</div>
                      <p className="text-sm text-gray-600">Excellent communication skills</p>
                    </div>
                  </div>
                </div>

                {/* Report Status */}
                <div className="flex items-center justify-between bg-gray-50 rounded-md p-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">Full Report Included</span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">100% Free</span>
                </div>

                {/* Report Icons */}
                <div className="flex justify-between text-2xl text-gray-400">
                  <span>📊</span>
                  <span>❤️</span>
                  <span>🔍</span>
                  <span>🎁</span>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
                <div className="flex text-yellow-400 mb-2">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <p className="text-sm text-gray-600 italic mb-3">
                  "I finally understand why my past relationships didn't work out and found someone who truly complements me. It's like having a relationship coach in your pocket!"
                </p>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-gray-700 font-medium text-xs">PS</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Priya S.</p>
                    <p className="text-xs text-gray-500">Mumbai, 28</p>
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