import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

const CTASection = () => {
  const { data: user } = useQuery({ 
    queryKey: ['/api/me'],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  const ctaLink = user ? "/quiz" : "/register";
  
  return (
    <section className="py-10 sm:py-16 px-4 energy-gradient relative overflow-hidden">
      {/* Simplified background decorations for mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/30 to-transparent"></div>
      <div className="absolute -left-10 -top-10 w-32 h-32 bg-pink-200 opacity-30 rounded-full blur-xl"></div>
      <div className="absolute right-5 bottom-10 w-24 h-24 bg-yellow-200 opacity-30 rounded-full blur-xl"></div>
      
      <div className="max-w-md sm:max-w-xl md:max-w-4xl mx-auto relative z-10">
        {/* Mobile optimized CTA card */}
        <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl overflow-hidden shadow-xl border border-white/20">
          {/* Content */}
          <div className="p-6 sm:p-8 text-white">
            <div className="inline-block mb-4 py-1 px-3 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-white font-medium text-xs sm:text-sm flex items-center">
                <span className="emoji mr-1">⭐</span> Find Your Perfect Match
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4">
              Begin Your Love <span className="relative inline-block">
                Journey
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,0 Q50,12 100,0" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="8" />
                </svg>
              </span> <span className="emoji">💖</span>
            </h2>
            
            <p className="mb-5 text-white/90 text-sm sm:text-base">
              Our 5-minute quiz finds your perfect match based on science that understands
              modern Indian relationships!
            </p>
            
            {/* Features grid - mobile friendly */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <span className="emoji mb-1 block">⏱️</span>
                <span className="text-sm font-medium">5-Minute Quiz</span>
              </div>
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <span className="emoji mb-1 block">📊</span>
                <span className="text-sm font-medium">Visual Report</span>
              </div>
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <span className="emoji mb-1 block">🇮🇳</span>
                <span className="text-sm font-medium">For Indians</span>
              </div>
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <span className="emoji mb-1 block">🔄</span>
                <span className="text-sm font-medium">Find Matches</span>
              </div>
            </div>
            
            {/* Primary CTA button - full width on mobile */}
            <Link 
              href={ctaLink} 
              className="w-full block text-center bg-white text-primary font-medium px-6 py-4 rounded-xl hover:bg-white/90 transition shadow-lg shadow-primary/30 pulse-animation"
            >
              <span className="emoji mr-2">🚀</span> Start Free Quiz Now
            </Link>
          </div>
          
          {/* Floating compatibility card */}
          <div className="relative mx-4 -mt-2 -mb-4 z-20">
            <div className="bg-white rounded-2xl shadow-lg p-4 border border-pink-100 floating">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-2">
                    <span className="emoji">💘</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-dark text-sm">Match Preview</p>
                  </div>
                </div>
                <div className="bg-green-400/20 text-green-500 text-xs rounded-full px-2 py-1 font-medium flex items-center">
                  <span className="emoji mr-1">💚</span> 87% Match
                </div>
              </div>
              
              <div className="flex space-x-2 items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">S</div>
                <div className="h-1 flex-grow bg-neutral-dark/10 rounded-full">
                  <div className="h-full w-[87%] bg-primary rounded-full"></div>
                </div>
                <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold">R</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial - simplified for mobile */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-pink-100 shadow-sm">
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-3">
              <div className="w-7 h-7 rounded-full border-2 border-white bg-yellow-500 flex items-center justify-center text-white text-xs">S</div>
              <div className="w-7 h-7 rounded-full border-2 border-white bg-pink-500 flex items-center justify-center text-white text-xs">P</div>
            </div>
            <div>
              <div className="flex text-amber-500 text-xs mb-1">★★★★★</div>
              <p className="text-xs italic text-neutral-dark/80">"MyDate helped us find true compatibility! The quiz was fun, insights spot on!"</p>
            </div>
          </div>
        </div>
        
        {/* Trust badge */}
        <div className="mt-5 text-center text-xs text-neutral-dark/60">
          <div className="flex items-center justify-center">
            <span className="emoji mr-1">🔒</span> 100% secure & private
            <span className="mx-2">•</span>
            <span className="emoji mr-1">👫</span> 10,000+ matches made
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
