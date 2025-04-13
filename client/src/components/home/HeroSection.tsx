import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="pt-28 sm:pt-32 md:pt-36 pb-16 relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Enhanced background elements with primary-glow */}
      <div className="absolute top-0 right-0 -mt-5 -mr-10 w-60 h-60 sm:w-80 sm:h-80 primary-glow rounded-full opacity-80 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-5 -ml-10 w-60 h-60 sm:w-80 sm:h-80 secondary-glow rounded-full opacity-80 blur-3xl"></div>

      {/* Decorative floating elements - adds movement and visual interest */}
      <div className="absolute top-1/4 left-10 w-8 h-8 rounded-full bg-purple-200/50 floating" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/3 right-10 w-6 h-6 rounded-full bg-indigo-200/50 floating" style={{animationDelay: '1.2s'}}></div>
      <div className="absolute bottom-1/4 left-1/4 w-10 h-10 rounded-full bg-pink-200/30 floating" style={{animationDelay: '0.8s'}}></div>

      <div className="container mx-auto px-4">
        {/* Mobile headline banner - enhanced with card shadow */}
        <div className="mb-6 mt-4 text-center card-gradient-1 rounded-xl shadow-card py-3 px-4 md:hidden shine">
          <h1 className="font-bold text-xl sm:text-2xl leading-tight">
            <span className="emoji">💘</span> Tired of dating the wrong people?
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          {/* Text content section */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <div className="inline-block mb-3 py-1 px-3 bg-primary/15 rounded-full shine">
              <span className="text-primary font-medium text-sm flex items-center">
                <span className="emoji mr-1">✨</span> Discover Your Perfect Match Type
              </span>
            </div>

            {/* Desktop headline - enhanced with updated styling */}
            <h1 className="hidden md:block font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
              Stop Wasting Time With <span className="text-primary relative">
                The Wrong People
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,0 Q50,12 100,0" fill="none" stroke="rgba(230,50,85,0.3)" strokeWidth="8" />
                </svg>
              </span>
            </h1>

            {/* Conversational value proposition */}
            <p className="text-neutral-dark/90 text-lg mb-6 max-w-lg mx-auto md:mx-0">
              Our 5-minute quiz reveals exactly who you're naturally compatible with, based on your personality. It's like having a relationship coach in your pocket!
            </p>

            {/* Social proof - enhanced avatars */}
            <div className="flex items-center justify-center md:justify-start mb-6">
              <div className="flex -space-x-2 mr-3">
                <div className="w-8 h-8 rounded-full bg-indigo-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-primary/30 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-violet-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-amber-300 border-2 border-white flex items-center justify-center text-xs font-bold">+</div>
              </div>
              <p className="text-sm font-medium"><span className="text-primary font-bold">600+</span> people took the test today</p>
            </div>

            {/* Benefit boxes - styled with new gradient classes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="bg-white rounded-xl p-3 shadow-card border border-red-100 relative">
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-lg">
                  WITHOUT US
                </div>
                <div className="flex items-start mb-2">
                  <span className="emoji mr-2 text-lg">😩</span>
                  <h3 className="font-medium text-base">Endless Dating Frustration</h3>
                </div>
                <ul className="space-y-1.5 pl-7">
                  <li className="text-sm text-gray-700 list-disc">Wasting time with wrong matches</li>
                  <li className="text-sm text-gray-700 list-disc">Repeating same relationship mistakes</li>
                  <li className="text-sm text-gray-700 list-disc">Feeling confused about failed relationships</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-3 shadow-card border border-green-100 relative">
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-lg">
                  WITH US
                </div>
                <div className="flex items-start mb-2">
                  <span className="emoji mr-2 text-lg">🥰</span>
                  <h3 className="font-medium text-base">Find Your Perfect Match</h3>
                </div>
                <ul className="space-y-1.5 pl-7">
                  <li className="text-sm text-gray-700 list-disc">Know exactly who's right for you</li>
                  <li className="text-sm text-gray-700 list-disc">Understand your relationship patterns</li>
                  <li className="text-sm text-gray-700 list-disc">Build healthier, happier relationships</li>
                </ul>
              </div>
            </div>

            {/* Strong primary CTA with enhanced design */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <div className="flex items-center">
                  <div className="flex">
                    <span className="text-amber-400">★</span>
                    <span className="text-amber-400">★</span>
                    <span className="text-amber-400">★</span>
                    <span className="text-amber-400">★</span>
                    <span className="text-amber-400">★</span>
                  </div>
                  <span className="text-sm font-medium ml-2 text-gray-800">4.9/5 from 2,000+ users</span>
                </div>
              </div>

              <Link href="/register" className="w-full py-4 bg-primary text-white font-bold text-lg rounded-xl shadow-md hover:bg-primary/90 transition duration-300 flex items-center justify-center pulse-animation">
                <span className="emoji mr-2">🚀</span>
                <span>Take The Free Quiz Now</span>
              </Link>

              <p className="text-xs text-center mt-2 text-gray-700">100% free comprehensive results and insights</p>
            </div>

            {/* Trust elements - enhanced with new styles */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-200">
                <span className="emoji mr-1">🔒</span>
                <span className="text-xs text-gray-700">100% Private</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-200">
                <span className="emoji mr-1">⏱️</span>
                <span className="text-xs text-gray-700">5 Minutes</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-200">
                <span className="emoji mr-1">🧠</span>
                <span className="text-xs text-gray-700">Science-Based</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-200">
                <span className="emoji mr-1">📱</span>
                <span className="text-xs text-gray-700">Mobile-Friendly</span>
              </div>
            </div>
          </div>

          {/* Visual preview - enhanced with new gradients and shadows */}
          <div className="w-full md:w-1/2 md:pl-6">
            <div className="relative">
              {/* Main mockup of the personality report */}
              <div className="bg-white rounded-xl shadow-card p-5 border border-pink-100 max-w-sm mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-primary/15 rounded-full flex items-center justify-center">
                      <span className="emoji text-lg">❤️</span>
                    </div>
                    <h3 className="font-semibold text-lg ml-2">Your Love Profile</h3>
                  </div>

                  <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    <span className="emoji mr-1">✅</span> GREEN
                  </div>
                </div>

                {/* Sample compatibility card with love gradient */}
                <div className="mb-4 bg-pink-50 rounded-lg p-3 border border-pink-100">
                  <h4 className="font-medium text-sm mb-1 text-gray-800">Your Personality Type:</h4>
                  <div className="flex items-center">
                    <div className="bg-white p-2 rounded-lg mr-2 shadow-sm">
                      <span className="emoji text-2xl">😊</span>
                    </div>
                    <div>
                      <p className="font-bold text-base text-gray-800">The Supportive Partner</p>
                      <p className="text-xs text-gray-700">You're attentive, emotionally connected, and create secure relationships</p>
                    </div>
                  </div>
                </div>

                {/* Perfect match section with enhanced styling */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2 text-gray-800">Your Perfect Match:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-50 border border-blue-100 p-2 rounded-lg text-center shadow-sm">
                      <span className="emoji block text-2xl mb-1">🌟</span>
                      <span className="text-xs font-medium text-gray-800">The Confident Leader</span>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 p-2 rounded-lg text-center shadow-sm">
                      <span className="emoji block text-2xl mb-1">🔥</span>
                      <span className="text-xs font-medium text-gray-800">The Passionate Creator</span>
                    </div>
                  </div>
                </div>

                {/* Relationship strengths preview with updated colors */}
                <div>
                  <h4 className="font-medium text-sm mb-2 text-gray-800">Your Relationship Strengths:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-primary mr-2 flex-shrink-0">
                        <span className="emoji text-xs">💯</span>
                      </div>
                      <p className="text-xs text-gray-700">Strong emotional connection abilities</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-primary mr-2 flex-shrink-0">
                        <span className="emoji text-xs">🤝</span>
                      </div>
                      <p className="text-xs text-gray-700">Natural harmony with complementary types</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-primary mr-2 flex-shrink-0">
                        <span className="emoji text-xs">🧠</span>
                      </div>
                      <p className="text-xs text-gray-700">Excellent communication skills</p>
                    </div>
                  </div>
                </div>

                {/* Full report details with updated colors */}
                <div className="mt-4 bg-green-50 rounded-lg p-3 border border-dashed border-green-200">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-sm text-gray-800">Full Report Included</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">100% Free</span>
                  </div>
                  <p className="text-xs text-gray-700 mb-2">Get comprehensive compatibility insights & guidance</p>
                  <div className="flex justify-center">
                    <span className="emoji text-2xl mr-1">📊</span>
                    <span className="emoji text-2xl mr-1">🚀</span>
                    <span className="emoji text-2xl mr-1">💝</span>
                    <span className="emoji text-2xl">🎁</span>
                  </div>
                </div>
              </div>

              {/* Enhanced decorative elements with subtle animations */}
              <div className="absolute -top-2 -right-2 h-full w-full bg-amber-100/30 rounded-xl -z-10 rotate-2 floating" style={{animationDuration: '6s'}}></div>
              <div className="absolute -bottom-2 -left-2 h-full w-full bg-primary/10 rounded-xl -z-20 -rotate-1 floating" style={{animationDuration: '7s'}}></div>
            </div>

            {/* Mobile CTA with enhanced styling */}
            <div className="mt-6 md:hidden">
              <Link href="/register" className="w-full py-4 bg-primary text-white font-bold text-lg rounded-xl shadow-card hover:bg-primary/90 transition duration-300 flex items-center justify-center">
                <span className="emoji mr-2">🚀</span>
                <span>Start Free Quiz</span>
              </Link>
            </div>

            {/* Testimonial with enhanced styling */}
            <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-gray-200 max-w-sm mx-auto">
              <div className="flex mb-2">
                <div className="flex flex-shrink-0">
                  <span className="text-amber-400">★</span>
                  <span className="text-amber-400">★</span>
                  <span className="text-amber-400">★</span>
                  <span className="text-amber-400">★</span>
                  <span className="text-amber-400">★</span>
                </div>
              </div>
              <p className="text-sm italic mb-2 text-gray-700">"I finally understand why my past relationships didn't work! This quiz helped me find someone who truly complements me. It's like having a relationship coach in your pocket."</p>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-primary/20 rounded-full mr-2"></div>
                <div>
                  <p className="text-xs font-bold text-gray-800">Priya S.</p>
                  <p className="text-xs text-gray-700">Mumbai, 26</p>
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