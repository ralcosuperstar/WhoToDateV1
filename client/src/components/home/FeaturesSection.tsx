import { Link } from "wouter";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white px-4" id="how-it-works">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl mb-4">How MyDate Works</h2>
          <p className="max-w-2xl mx-auto text-neutral-dark/80">Our scientific approach helps you understand yourself better and find meaningful connections.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-neutral-light rounded-xl p-6 transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="font-heading font-semibold text-xl mb-3">Take the Assessment</h3>
            <p className="text-neutral-dark/80">Complete our fun yet insightful questionnaire designed to understand your personality, values, and relationship preferences.</p>
          </div>
          
          <div className="bg-neutral-light rounded-xl p-6 transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
            </div>
            <h3 className="font-heading font-semibold text-xl mb-3">Get Your Report</h3>
            <p className="text-neutral-dark/80">Receive a comprehensive compatibility profile with insights into your relationship tendencies and compatibility patterns.</p>
          </div>
          
          <div className="bg-neutral-light rounded-xl p-6 transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </div>
            <h3 className="font-heading font-semibold text-xl mb-3">Share & Compare</h3>
            <p className="text-neutral-dark/80">Use your insights to make better relationship choices. Compare with others to discover your true compatibility.</p>
          </div>
        </div>
        
        <div className="mt-16">
          <div className="bg-primary/5 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 md:pr-8">
                <h3 className="font-heading font-semibold text-xl md:text-2xl mb-4">What Makes Our Assessment Unique</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Blends scientific psychology with cultural relevance for Indian relationships</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Combines multiple frameworks: Big Five traits, MBTI, attachment styles, and EQ</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Includes specific scenarios related to family dynamics, traditions, and values</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Provides actionable insights you can apply to any relationship situation</span>
                  </li>
                </ul>
              </div>
              
              <div className="md:w-1/3 mt-6 md:mt-0">
                <div className="relative">
                  <div className="bg-white rounded-xl shadow p-4 md:p-6 relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block font-medium">Green Compatibility</span>
                        <span className="text-sm text-neutral-dark/70">Adaptable & Open</span>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-3">Your profile indicates high adaptability and openness to different personalities and backgrounds.</p>
                    
                    <div className="h-1.5 w-full bg-neutral-dark/10 rounded-full mb-3">
                      <div className="h-full w-4/5 bg-emerald-500 rounded-full"></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-neutral-dark/70">
                      <span>Flexibility</span>
                      <span>80%</span>
                    </div>
                  </div>
                  
                  <div className="absolute -left-3 top-4 -z-10">
                    <div className="bg-white rounded-xl shadow p-4 md:p-6 opacity-70">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                          </svg>
                        </div>
                        <div>
                          <span className="block font-medium">Yellow Compatibility</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -left-6 top-10 -z-20">
                    <div className="bg-white rounded-xl shadow p-4 md:p-6 opacity-40">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                          </svg>
                        </div>
                        <div>
                          <span className="block font-medium">Red Compatibility</span>
                        </div>
                      </div>
                    </div>
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

export default FeaturesSection;
