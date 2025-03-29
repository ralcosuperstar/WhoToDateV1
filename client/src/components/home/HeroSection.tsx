import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-20 w-72 h-72 bg-pink-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-20 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <div className="inline-block mb-4 py-1 px-3 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center">
                <span className="emoji mr-1">🔍</span> Discover Your True Compatibility
              </span>
            </div>

            <h1 className="font-heading font-bold text-4xl lg:text-5xl mb-6 leading-tight">
              Find Your Perfect Match with <span className="text-primary">Compatibility DNA</span>
            </h1>

            <p className="text-neutral-dark/80 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              MyDate helps you discover your relationship compatibility profile through a fun, scientific assessment tailored for Indian singles.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary-dark transition duration-300 flex items-center justify-center">
                <span>Take the Assessment</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <button className="w-full sm:w-auto px-8 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition duration-300">
                Learn More
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-${i*100}`}></div>
                ))}
              </div>
              <p className="text-sm text-neutral-dark/70 ml-3">
                <span className="font-semibold">4,000+</span> happy couples matched
              </p>
            </div>
          </div>

          {/* Image/illustration */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 w-full max-w-lg mx-auto">
              <div className="w-full h-full rounded-2xl bg-white shadow-xl p-2 md:p-4 transform rotate-1">
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl h-64 md:h-80 lg:h-96 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">💘</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 mt-4 text-center">
                  <p className="font-medium text-neutral-dark">Find your compatibility DNA today!</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-60 z-0"></div>
            <div className="absolute bottom-1/3 left-1/4 w-8 h-8 bg-blue-200 rounded-full opacity-60 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;