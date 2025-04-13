import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="pt-20 pb-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left side content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
              Find Your Perfect Match With <span className="text-primary">Science</span>
            </h1>
            
            <p className="text-gray-700 text-lg mb-6 max-w-lg mx-auto md:mx-0">
              Our 5-minute quiz reveals exactly who you're naturally compatible with, based on your personality. It's like having a relationship coach in your pocket!
            </p>
            
            {/* Social proof */}
            <div className="flex items-center justify-center md:justify-start mb-6">
              <div className="flex -space-x-2 mr-3">
                <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">+</div>
              </div>
              <p className="text-sm font-medium text-gray-700"><span className="text-primary font-bold">600+</span> people took the test today</p>
            </div>
            
            {/* Comparison boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                <div className="flex items-start mb-2">
                  <span className="text-2xl mr-2">😩</span>
                  <h3 className="font-medium text-gray-800">Without Our Science</h3>
                </div>
                <ul className="space-y-2 pl-6">
                  <li className="text-sm text-gray-700 list-disc">Wasting time with wrong matches</li>
                  <li className="text-sm text-gray-700 list-disc">Repeating relationship mistakes</li>
                  <li className="text-sm text-gray-700 list-disc">Feeling frustrated and confused</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-md border border-green-200">
                <div className="flex items-start mb-2">
                  <span className="text-2xl mr-2">🥰</span>
                  <h3 className="font-medium text-gray-800">With Our Science</h3>
                </div>
                <ul className="space-y-2 pl-6">
                  <li className="text-sm text-gray-700 list-disc">Know exactly who's right for you</li>
                  <li className="text-sm text-gray-700 list-disc">Understand your patterns</li>
                  <li className="text-sm text-gray-700 list-disc">Build healthier relationships</li>
                </ul>
              </div>
            </div>
            
            {/* CTA */}
            <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200 mb-6">
              <div className="flex items-center justify-center md:justify-start mb-3">
                <div className="flex">
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                </div>
                <span className="text-sm font-medium ml-2 text-gray-800">4.9/5 from 2,000+ users</span>
              </div>
              
              <Link href="/register" className="w-full py-4 bg-primary text-white font-bold text-lg rounded-lg shadow-md hover:bg-primary/90 transition flex items-center justify-center">
                <span className="mr-2">🚀</span>
                <span>Take The Free Quiz Now</span>
              </Link>
              
              <p className="text-xs text-center mt-2 text-gray-600">100% free comprehensive results and insights</p>
            </div>
            
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="flex items-center bg-gray-50 rounded-full px-3 py-2 border border-gray-200">
                <span className="mr-1">🔒</span>
                <span className="text-xs text-gray-700">100% Private</span>
              </div>
              <div className="flex items-center bg-gray-50 rounded-full px-3 py-2 border border-gray-200">
                <span className="mr-1">⏱️</span>
                <span className="text-xs text-gray-700">5 Minutes</span>
              </div>
              <div className="flex items-center bg-gray-50 rounded-full px-3 py-2 border border-gray-200">
                <span className="mr-1">🧠</span>
                <span className="text-xs text-gray-700">Science-Based</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Report preview */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200 max-w-md mx-auto">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">❤️</span>
                  </div>
                  <h3 className="font-semibold text-lg ml-2 text-gray-800">Your Love Profile</h3>
                </div>
                
                <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                  <span className="mr-1">✅</span> GREEN
                </div>
              </div>
              
              {/* Personality type */}
              <div className="mb-4 bg-pink-50 rounded-lg p-3 border border-pink-100">
                <h4 className="font-medium text-sm mb-2 text-gray-800">Your Personality Type:</h4>
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-lg mr-2 shadow-sm">
                    <span className="text-2xl">😊</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">The Supportive Partner</p>
                    <p className="text-xs text-gray-600">You're attentive, emotionally connected, and create secure relationships</p>
                  </div>
                </div>
              </div>
              
              {/* Perfect matches */}
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2 text-gray-800">Your Perfect Match:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 border border-blue-100 p-2 rounded-lg text-center">
                    <span className="block text-2xl mb-1">🌟</span>
                    <span className="text-xs font-medium text-gray-800">The Confident Leader</span>
                  </div>
                  <div className="bg-orange-50 border border-orange-100 p-2 rounded-lg text-center">
                    <span className="block text-2xl mb-1">🔥</span>
                    <span className="text-xs font-medium text-gray-800">The Passionate Creator</span>
                  </div>
                </div>
              </div>
              
              {/* Relationship strengths */}
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2 text-gray-800">Your Relationship Strengths:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center mr-2">
                      <span className="text-xs">💯</span>
                    </div>
                    <p className="text-sm text-gray-700">Strong emotional connection</p>
                  </div>
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center mr-2">
                      <span className="text-xs">🤝</span>
                    </div>
                    <p className="text-sm text-gray-700">Natural harmony with others</p>
                  </div>
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center mr-2">
                      <span className="text-xs">🧠</span>
                    </div>
                    <p className="text-sm text-gray-700">Excellent communication skills</p>
                  </div>
                </div>
              </div>
              
              {/* Full report section */}
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-sm text-gray-800">Full Report Included</h4>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">100% Free</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">Get comprehensive compatibility insights & guidance</p>
                <div className="flex justify-center">
                  <span className="text-2xl mr-1">📊</span>
                  <span className="text-2xl mr-1">🚀</span>
                  <span className="text-2xl mr-1">💝</span>
                  <span className="text-2xl">🎁</span>
                </div>
              </div>
            </div>
            
            {/* Testimonial */}
            <div className="mt-6 bg-white rounded-lg p-4 shadow-md border border-gray-200 max-w-md mx-auto">
              <div className="flex mb-2">
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
              </div>
              <p className="text-sm italic mb-2 text-gray-700">"I finally understand why my past relationships didn't work! This quiz helped me find someone who truly complements me."</p>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-pink-100 rounded-full mr-2"></div>
                <div>
                  <p className="text-xs font-bold text-gray-800">Priya S.</p>
                  <p className="text-xs text-gray-600">Mumbai, 26</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;