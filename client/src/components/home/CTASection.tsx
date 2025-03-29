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
    <section className="py-16 px-4 relative overflow-hidden bg-gradient-to-r from-primary via-primary/95 to-purple-600">
      {/* Background elements - science-themed, mobile friendly */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-40 h-40 sm:w-60 sm:h-60 rounded-full bg-white blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 sm:w-60 sm:h-60 rounded-full bg-white blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-8 border-white/10 rounded-full"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-3 py-1.5 px-4 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-white font-medium text-sm flex items-center justify-center">
              <span className="emoji mr-2">🧪</span> Science-Based Assessment
            </span>
          </div>
        
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4 text-white">
            Find Relationships That Truly Fit Your Psychology
          </h2>

          <p className="text-white/90 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Our research-validated assessment reveals your unique psychological profile and the relationship dynamics most compatible with your personality traits.
          </p>

          {/* Scientific frameworks badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center">
              <div className="w-8 h-8 bg-blue-100/30 rounded-full flex items-center justify-center mr-2">
                <span className="emoji">🔄</span>
              </div>
              <span className="text-white text-sm font-medium">Attachment Theory</span>
            </div>
            
            <div className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center">
              <div className="w-8 h-8 bg-purple-100/30 rounded-full flex items-center justify-center mr-2">
                <span className="emoji">👤</span>
              </div>
              <span className="text-white text-sm font-medium">Big Five Model</span>
            </div>
            
            <div className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center">
              <div className="w-8 h-8 bg-green-100/30 rounded-full flex items-center justify-center mr-2">
                <span className="emoji">❤️</span>
              </div>
              <span className="text-white text-sm font-medium">Emotional Intelligence</span>
            </div>
          </div>

          {/* Scientific assessment benefits */}
          <div className="rounded-lg bg-white/10 p-6 mb-10 backdrop-blur-sm">
            <h3 className="text-white font-semibold text-lg mb-5">What Our Scientific Assessment Reveals:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <span className="emoji text-xl">🧠</span>
                </div>
                <h3 className="text-white font-semibold mb-2 text-base">Your Attachment Pattern</h3>
                <p className="text-white/80 text-sm">How your early relationships influence your adult bonding style and emotional needs</p>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <span className="emoji text-xl">⚡</span>
                </div>
                <h3 className="text-white font-semibold mb-2 text-base">Relationship Dynamics</h3>
                <p className="text-white/80 text-sm">The specific partner traits and interaction patterns that bring out your best qualities</p>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <span className="emoji text-xl">🔍</span>
                </div>
                <h3 className="text-white font-semibold mb-2 text-base">Growth Opportunities</h3>
                <p className="text-white/80 text-sm">Specific relationship skills to develop based on your psychological profile</p>
              </div>
            </div>
          </div>

          {/* Research validation stats */}
          <div className="bg-white/10 rounded-lg p-5 mb-10 backdrop-blur-sm max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">30+</div>
                <p className="text-white/80 text-xs sm:text-sm">Scientifically designed questions</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">10k+</div>
                <p className="text-white/80 text-xs sm:text-sm">Relationship profiles analyzed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">85%</div>
                <p className="text-white/80 text-xs sm:text-sm">Assessment accuracy rate</p>
              </div>
            </div>
          </div>

          {/* Enhanced testimonial with clear scientific benefit */}
          <div className="bg-white/10 rounded-lg p-5 mb-8 backdrop-blur-sm max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-400/30 flex items-center justify-center text-white mr-3">
                  <span className="emoji">👨‍💼</span>
                </div>
                <div className="text-left">
                  <h4 className="text-white font-medium text-sm">Arjun K.</h4>
                  <p className="text-white/70 text-xs">Software Engineer, Bengaluru</p>
                </div>
              </div>
              <div className="flex">
                <span className="text-amber-400 text-sm">★★★★★</span>
              </div>
            </div>
            <blockquote className="text-white/90 text-sm mb-3 text-left">
              "The assessment identified my attachment style as 'anxious-preoccupied' and explained how it was affecting my relationships. By understanding this pattern, I've been able to build much healthier connections. The scientific insights were eye-opening!"
            </blockquote>
            <div className="flex justify-between items-center">
              <p className="text-white/70 text-xs">Completed assessment 6 months ago</p>
              <div className="bg-green-500/20 px-2 py-1 rounded text-xs text-green-50">Verified Result</div>
            </div>
          </div>

          {/* CTA buttons with scientific emphasis */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href={ctaLink} 
              className="px-8 py-4 bg-white text-primary font-semibold rounded-xl shadow-lg hover:bg-neutral-100 transition duration-300 inline-flex items-center justify-center" 
              style={{animation: "pulse 4s infinite"}}
            >
              <span className="emoji mr-2">🧪</span>
              <span>Take the Scientific Assessment</span>
            </Link>
            
            <Link 
              href="/how-it-works" 
              className="px-6 py-4 bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/30 transition duration-300 inline-flex items-center justify-center"
            >
              <span className="emoji mr-2">🧭</span>
              <span>Learn How It Works</span>
            </Link>
          </div>

          {/* Trust indicators with scientific focus */}
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            <p className="text-white/80 text-xs flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Research-Based Methodology
            </p>
            <p className="text-white/80 text-xs flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              5-Minute Completion Time
            </p>
            <p className="text-white/80 text-xs flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Confidential Results
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;