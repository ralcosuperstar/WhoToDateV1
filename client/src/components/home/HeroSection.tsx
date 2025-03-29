import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="pt-16 pb-10 px-4 love-gradient relative overflow-hidden">
      {/* Background decorative elements - reduced for mobile */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-pink-200 opacity-20 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-5 w-24 h-24 bg-amber-200 opacity-20 rounded-full blur-xl"></div>
      
      <div className="max-w-xl mx-auto relative z-10">
        {/* Mobile-optimized hero content */}
        <div className="text-center">
          <div className="inline-block mb-3 py-1 px-3 bg-red-100 rounded-full">
            <span className="text-primary font-medium text-sm flex items-center justify-center">
              <span className="emoji mr-1">❤️</span> For Modern Indian Singles
            </span>
          </div>
          
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-neutral-dark mb-4">
            Find Your Perfect <span className="text-primary relative inline-block">
              Match
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,0 Q50,12 100,0" fill="none" stroke="rgba(255,82,122,0.3)" strokeWidth="8" />
              </svg>
            </span>
          </h1>
          
          <p className="text-base sm:text-lg mb-6 text-neutral-dark/80 max-w-sm mx-auto">
            <span className="emoji mr-1">✨</span> Free 5-minute quiz to find your perfect match based on science!
          </p>
          
          {/* Primary CTA - Full width on mobile */}
          <Link 
            href="/quiz" 
            className="w-full block bg-primary hover:bg-primary/90 text-white font-medium px-6 py-4 rounded-xl text-center transition shadow-lg shadow-primary/20 pulse-animation"
          >
            <span className="emoji mr-2">🚀</span> Start Your Free Quiz Now
          </Link>
          
          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2 mt-6 mb-8">
            <div className="flex flex-col items-center bg-white/80 rounded-lg p-2 shadow-sm">
              <span className="emoji mb-1">⏱️</span>
              <span className="text-xs text-neutral-dark/70 text-center">5 Minutes</span>
            </div>
            <div className="flex flex-col items-center bg-white/80 rounded-lg p-2 shadow-sm">
              <span className="emoji mb-1">🔒</span>
              <span className="text-xs text-neutral-dark/70 text-center">100% Private</span>
            </div>
            <div className="flex flex-col items-center bg-white/80 rounded-lg p-2 shadow-sm">
              <span className="emoji mb-1">🧠</span>
              <span className="text-xs text-neutral-dark/70 text-center">Scientific</span>
            </div>
          </div>
        </div>
        
        {/* Sample Question Card */}
        <div className="relative mt-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 relative z-10 border-2 border-pink-100">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="emoji">💭</span>
              </div>
              <h3 className="font-semibold text-base sm:text-lg ml-2 sm:ml-3">Quick Question</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-3 text-sm sm:text-base">When it comes to romance, I believe that:</p>
                <div className="space-y-2">
                  <label className="flex items-center p-2 sm:p-3 rounded-xl border-2 border-pink-100 hover:border-primary hover:bg-pink-50 cursor-pointer transition">
                    <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                    <span className="ml-2 text-sm sm:text-base"><span className="emoji mr-1">💖</span> Love at first sight is real</span>
                  </label>
                  <label className="flex items-center p-2 sm:p-3 rounded-xl border-2 border-pink-100 hover:border-primary hover:bg-pink-50 cursor-pointer transition">
                    <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                    <span className="ml-2 text-sm sm:text-base"><span className="emoji mr-1">🤝</span> Friendship comes before romance</span>
                  </label>
                  <label className="flex items-center p-2 sm:p-3 rounded-xl border-2 border-pink-100 hover:border-primary hover:bg-pink-50 cursor-pointer transition">
                    <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                    <span className="ml-2 text-sm sm:text-base"><span className="emoji mr-1">🧩</span> Compatibility = shared values</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-xs font-medium text-neutral-dark/70">Fun & Quick! <span className="emoji">⏱️</span></span>
                </div>
                <Link href="/quiz" className="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-xl transition shadow-md shadow-primary/10 text-sm">
                  Continue <span className="emoji ml-1">→</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Simpler decorative elements for mobile */}
          <div className="absolute -top-2 -right-2 h-12 w-12 bg-yellow-400/30 rounded-full -z-10"></div>
          <div className="absolute -bottom-2 -left-2 h-10 w-10 bg-pink-500/20 rounded-full -z-10"></div>
        </div>
        
        {/* Social proof - simplified for mobile */}
        <div className="mt-5 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-pink-100 text-center">
          <div className="flex justify-center mb-1">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-white text-xs">R</div>
              <div className="w-7 h-7 rounded-full border-2 border-white bg-emerald-500 flex items-center justify-center text-white text-xs">S</div>
              <div className="w-7 h-7 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-white text-xs">A</div>
            </div>
          </div>
          <p className="text-xs font-medium">2,500+ people joined this week!</p>
          <div className="flex justify-center mt-1">
            <span className="text-amber-500 text-xs">★★★★★</span>
            <span className="text-xs ml-1 text-neutral-dark/70">4.9/5</span>
          </div>
        </div>
        
        {/* Secondary CTA */}
        <div className="mt-6 text-center">
          <Link 
            href="/#how-it-works" 
            className="text-primary font-medium text-sm inline-flex items-center"
          >
            <span className="emoji mr-1">🔍</span> See How It Works
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
