import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-dark mb-6">
              Discover Your <span className="text-primary">Compatibility DNA</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-neutral-dark/80">
              Unlock the science of meaningful connections through our culturally relevant compatibility assessment, designed especially for Indian singles.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Link href="/quiz" className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg text-center transition">
                Start Your Assessment
              </Link>
              <Link href="/#how-it-works" className="border border-neutral-dark/20 hover:border-primary text-neutral-dark hover:text-primary font-medium px-6 py-3 rounded-lg text-center transition">
                Learn More
              </Link>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-neutral-dark/70">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span>Safe, secure, and backed by scientific research</span>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-semibold text-lg ml-3">Sample Question</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="font-medium mb-4">When making important life decisions, I prefer to:</p>
                    <div className="space-y-3">
                      <label className="flex items-center p-3 rounded-lg border border-neutral-dark/10 hover:border-primary cursor-pointer transition">
                        <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                        <span className="ml-3">Trust my gut feeling and intuition</span>
                      </label>
                      <label className="flex items-center p-3 rounded-lg border border-neutral-dark/10 hover:border-primary cursor-pointer transition">
                        <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                        <span className="ml-3">Weigh all options systematically before deciding</span>
                      </label>
                      <label className="flex items-center p-3 rounded-lg border border-neutral-dark/10 hover:border-primary cursor-pointer transition">
                        <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                        <span className="ml-3">Consult family and friends for their opinions</span>
                      </label>
                      <label className="flex items-center p-3 rounded-lg border border-neutral-dark/10 hover:border-primary cursor-pointer transition">
                        <input type="radio" name="sample-question" className="h-4 w-4 text-primary" />
                        <span className="ml-3">Consider what has worked best in the past</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-sm text-neutral-dark/70">Question 1 of 60</span>
                      <div className="w-32 h-2 bg-neutral-dark/10 rounded-full ml-3">
                        <div className="w-1/60 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <Link href="/quiz" className="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-lg transition">
                      Next
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 bg-amber-400/20 rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -left-4 h-16 w-16 bg-emerald-500/20 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
