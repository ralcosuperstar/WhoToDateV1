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
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-primary/90 to-primary">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-6 text-white">
            Ready to Discover Your Compatibility DNA?
          </h2>

          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Take our scientifically designed assessment and get matched with compatible partners who share your relationship values and goals.
          </p>

          <div className="rounded-lg bg-white/10 p-6 mb-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-1">10 Minutes</h3>
                <p className="text-white/80 text-sm">Complete the assessment</p>
              </div>

              <div className="p-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-1">15+ Page Report</h3>
                <p className="text-white/80 text-sm">Detailed compatibility insights</p>
              </div>

              <div className="p-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-1">Instant Matches</h3>
                <p className="text-white/80 text-sm">Connect with compatible profiles</p>
              </div>
            </div>
          </div>

          <Link href={ctaLink} className="px-10 py-4 bg-white text-primary font-semibold rounded-lg shadow-lg hover:bg-neutral-100 transition duration-300 transform hover:-translate-y-1">
            <span className="flex items-center justify-center">
              Take the Free Assessment
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>

          <p className="text-white/70 text-sm mt-4">
            No credit card required. 100% free to start.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;