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
    <section className="py-16 px-4 relative overflow-hidden bg-gradient-to-br from-primary/90 to-primary">
      {/* Background elements - mobile friendly */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -right-10 w-40 h-40 sm:w-60 sm:h-60 rounded-full bg-white blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 sm:w-60 sm:h-60 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4 text-white">
            Understand Your Relationship Type <span className="emoji">🧠</span>
          </h2>

          <p className="text-white/90 text-base sm:text-lg mb-6 max-w-xl mx-auto">
            Stop repeating the same relationship mistakes. Discover what truly works for you based on your personality.
          </p>

          {/* Mobile-friendly feature grid */}
          <div className="rounded-lg bg-white/10 p-4 sm:p-6 mb-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 sm:p-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="emoji">⏱️</span>
                </div>
                <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">5-Min Quiz</h3>
                <p className="text-white/80 text-xs sm:text-sm">Quick, fun personality questions</p>
              </div>

              <div className="p-3 sm:p-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="emoji">📊</span>
                </div>
                <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">In-Depth Profile</h3>
                <p className="text-white/80 text-xs sm:text-sm">Understand your relationship patterns</p>
              </div>

              <div className="p-3 sm:p-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="emoji">🧩</span>
                </div>
                <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">Compatibility Guide</h3>
                <p className="text-white/80 text-xs sm:text-sm">Know which types work best with yours</p>
              </div>
            </div>
          </div>

          {/* Testimonial to add credibility */}
          <div className="bg-white/10 rounded-lg p-4 mb-8 backdrop-blur-sm max-w-xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <div className="flex -space-x-1">
                <span className="text-amber-400 text-lg">★★★★★</span>
              </div>
            </div>
            <p className="text-white/90 text-sm italic mb-3">
              "I finally understand why my past relationships didn't work! The compatibility profile helped me recognize patterns I was blind to for years."
            </p>
            <p className="text-white/80 text-xs font-medium">— Priya S., 27, Mumbai</p>
          </div>

          {/* Strong CTA button */}
          <Link href={ctaLink} className="px-8 py-3.5 bg-white text-primary font-semibold rounded-xl shadow-lg hover:bg-neutral-100 transition duration-300 inline-flex items-center justify-center pulse-animation">
            <span className="emoji mr-2">🔍</span>
            <span>Discover Your Relationship Type</span>
          </Link>

          {/* Trust indicators */}
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            <p className="text-white/80 text-xs flex items-center">
              <span className="emoji mr-1">🔒</span> 100% Secure
            </p>
            <p className="text-white/80 text-xs flex items-center">
              <span className="emoji mr-1">⏱️</span> Takes Only 5 Minutes
            </p>
            <p className="text-white/80 text-xs flex items-center">
              <span className="emoji mr-1">🎁</span> Free Basic Results
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;