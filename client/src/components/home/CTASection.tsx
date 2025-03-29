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
    <section className="py-20 px-4 energy-gradient relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/30 to-transparent"></div>
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-pink-200 opacity-30 rounded-full blur-xl"></div>
      <div className="absolute right-10 bottom-20 w-40 h-40 bg-yellow-200 opacity-30 rounded-full blur-xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="bg-gradient-to-r from-primary to-primary/90 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 text-white">
              <div className="inline-block mb-6 py-1 px-3 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="text-white font-medium text-sm flex items-center">
                  <span className="emoji mr-1">⭐</span> Ready to Find Your Perfect Match?
                </span>
              </div>
              
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
                Begin Your Love <span className="relative inline-block">
                  Journey 
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,0 Q50,12 100,0" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="8" />
                  </svg>
                </span> Today! <span className="emoji">💖</span>
              </h2>
              
              <p className="mb-8 text-white/90 text-lg">
                Find your perfect match with our fun, science-backed quiz that understands
                modern Indian relationships. Takes just 5 minutes to discover your compatibility profile!
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="emoji mr-3">⏱️</span>
                  <span className="text-lg">Quick 5-minute fun quiz</span>
                </li>
                <li className="flex items-start">
                  <span className="emoji mr-3">📊</span>
                  <span className="text-lg">Colorful, visual compatibility report</span>
                </li>
                <li className="flex items-start">
                  <span className="emoji mr-3">🇮🇳</span>
                  <span className="text-lg">Created for modern Indian relationships</span>
                </li>
                <li className="flex items-start">
                  <span className="emoji mr-3">🔄</span>
                  <span className="text-lg">Compare with potential matches</span>
                </li>
              </ul>
              
              <Link 
                href={ctaLink} 
                className="inline-flex items-center justify-center bg-white text-primary font-medium px-8 py-4 rounded-xl hover:bg-white/90 transition shadow-lg shadow-primary/30 pulse-animation"
              >
                <span className="emoji mr-2">🚀</span> Start Free Quiz Now
              </Link>
            </div>
            
            <div className="md:w-1/2 relative">
              {/* Image with circular mask */}
              <div className="relative h-full">
                <img 
                  src="https://images.unsplash.com/photo-1602522833512-5356a3e6acb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80" 
                  alt="Happy couple using MyDate" 
                  className="h-full w-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent"></div>
                
                {/* Floating elements */}
                <div className="absolute top-10 left-10 bg-white rounded-2xl shadow-lg p-3 rotate-3 backdrop-blur-sm bg-white/90 floating">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <span className="emoji">💘</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-dark">87% Match!</p>
                      <div className="h-1.5 w-24 bg-neutral-dark/10 rounded-full">
                        <div className="h-full w-[87%] bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-10 right-10 bg-white rounded-2xl shadow-lg p-4 -rotate-2 backdrop-blur-sm bg-white/90 floating" style={{animationDelay: '0.5s'}}>
                  <div className="flex space-x-3">
                    <div className="px-3 py-2 bg-green-400/20 text-green-500 text-sm rounded-full font-medium flex items-center">
                      <span className="emoji mr-1">💚</span> Green Match
                    </div>
                    <div className="px-3 py-2 bg-amber-400/20 text-amber-500 text-sm rounded-full font-medium flex items-center">
                      <span className="emoji mr-1">💛</span> Yellow
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-1/2 right-24 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-3 backdrop-blur-sm bg-white/90 floating" style={{animationDelay: '1s'}}>
                  <span className="emoji text-2xl">❤️</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial */}
        <div className="mt-8 mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-yellow-500 flex items-center justify-center text-white text-xs">SK</div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-pink-500 flex items-center justify-center text-white text-xs">PR</div>
            </div>
          </div>
          <p className="italic text-neutral-dark/80">"MyDate helped us understand our compatibility on a deeper level. The quiz was fun, and the insights were spot on!"</p>
          <div className="flex justify-center mt-2">
            <span className="text-yellow-500">★★★★★</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
