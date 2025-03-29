import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="pt-24 md:pt-28 pb-16 md:pb-24 px-4 love-gradient relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 opacity-20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-200 opacity-20 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-1/4 w-24 h-24 bg-red-200 opacity-20 rounded-full blur-xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <div className="inline-block mb-3 py-1 px-3 bg-red-100 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center">
                <span className="emoji mr-1">❤️</span> Made for Modern Indian Singles
              </span>
            </div>
            
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-dark mb-6">
              Find Your Perfect <span className="text-primary relative">
                Match
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,0 Q50,12 100,0" fill="none" stroke="rgba(255,82,122,0.3)" strokeWidth="8" />
                </svg>
              </span> With Science & Fun!
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-neutral-dark/80">
              <span className="emoji mr-1">✨</span> Discover your true compatibility through our fun personality quiz designed for today's Indian dating scene!
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Link href="/quiz" className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-xl text-center transition shadow-lg shadow-primary/20 pulse-animation flex items-center justify-center">
                <span className="emoji mr-2">🚀</span> Start Your Quiz Now
              </Link>
              <Link href="/#how-it-works" className="border-2 border-primary/20 hover:border-primary/40 bg-white text-primary font-medium px-6 py-3 rounded-xl text-center transition flex items-center justify-center">
                <span className="emoji mr-2">🔍</span> How It Works
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-5 text-sm text-neutral-dark/70">
              <div className="flex items-center">
                <span className="emoji mr-1">🔒</span>
                <span>100% Private & Secure</span>
              </div>
              <div className="flex items-center">
                <span className="emoji mr-1">⚡</span>
                <span>Takes Only 5 Minutes</span>
              </div>
              <div className="flex items-center">
                <span className="emoji mr-1">🧠</span>
                <span>Science-Backed Results</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative floating">
              <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 relative z-10 border-2 border-pink-100">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="emoji">💭</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg ml-3">Quick Question</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="font-medium mb-4">When it comes to romance, I believe that:</p>
                    <div className="space-y-3">
                      <label className="flex items-center p-3 rounded-xl border-2 border-pink-100 hover:border-primary hover:bg-pink-50 cursor-pointer transition">
                        <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                        <span className="ml-3"><span className="emoji mr-1">💖</span> Love at first sight is real</span>
                      </label>
                      <label className="flex items-center p-3 rounded-xl border-2 border-pink-100 hover:border-primary hover:bg-pink-50 cursor-pointer transition">
                        <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                        <span className="ml-3"><span className="emoji mr-1">🤝</span> Friendship should come before romance</span>
                      </label>
                      <label className="flex items-center p-3 rounded-xl border-2 border-pink-100 hover:border-primary hover:bg-pink-50 cursor-pointer transition">
                        <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                        <span className="ml-3"><span className="emoji mr-1">🧩</span> Compatibility is about shared values</span>
                      </label>
                      <label className="flex items-center p-3 rounded-xl border-2 border-pink-100 hover:border-primary hover:bg-pink-50 cursor-pointer transition">
                        <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                        <span className="ml-3"><span className="emoji mr-1">✨</span> Attraction needs that special "spark"</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-neutral-dark/70">Fun & Quick! <span className="emoji">⏱️</span></span>
                      <div className="w-32 h-2 bg-neutral-dark/10 rounded-full ml-3">
                        <div className="w-[5%] h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <Link href="/quiz" className="bg-primary hover:bg-primary/90 text-white font-medium px-5 py-2 rounded-xl transition shadow-md shadow-primary/10">
                      Start Quiz <span className="emoji ml-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 bg-yellow-400/30 rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -left-4 h-16 w-16 bg-pink-500/20 rounded-full -z-10"></div>
            </div>
            
            {/* Social proof */}
            <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-pink-100">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-white text-xs">RK</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-500 flex items-center justify-center text-white text-xs">SP</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-white text-xs">AK</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-500 flex items-center justify-center text-white text-xs">DP</div>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Joined by 2,500+ others this week!</p>
                  <div className="flex mt-1">
                    <span className="text-amber-500">★★★★★</span>
                    <span className="text-xs ml-1 text-neutral-dark/70">4.9/5 rating</span>
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

export default HeroSection;
