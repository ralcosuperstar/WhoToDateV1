const TestimonialsSection = () => {
  return (
    <section className="py-16 px-4" id="testimonials">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl mb-4">What Our Users Say</h2>
          <p className="max-w-2xl mx-auto text-neutral-dark/80">Discover how MyDate has helped singles understand themselves better and find compatible partners.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start mb-4">
              <div className="mr-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-heading font-bold text-primary">RK</span>
                </div>
              </div>
              <div>
                <h4 className="font-heading font-semibold">Rahul Kapoor</h4>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-neutral-dark/60 text-xs ml-2">Delhi</span>
                </div>
              </div>
            </div>
            
            <p className="text-neutral-dark/80">"After years of using dating apps without success, MyDate helped me understand why I kept attracting the wrong partners. My compatibility report was eye-opening, and I've now found someone who truly complements my personality."</p>
            
            <div className="mt-4 pt-4 border-t border-neutral-dark/10">
              <div className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-sm rounded-full font-medium inline-flex items-center">
                <span className="h-2 w-2 bg-emerald-500 rounded-full mr-1"></span>
                Green Compatibility
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start mb-4">
              <div className="mr-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-heading font-bold text-primary">PM</span>
                </div>
              </div>
              <div>
                <h4 className="font-heading font-semibold">Priya Mehta</h4>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-neutral-dark/20">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-neutral-dark/60 text-xs ml-2">Mumbai</span>
                </div>
              </div>
            </div>
            
            <p className="text-neutral-dark/80">"The family dynamics section of my report was incredibly accurate! As someone from a traditional background dating someone more modern, knowing my 'Yellow' compatibility helped me navigate potential conflicts and communicate better."</p>
            
            <div className="mt-4 pt-4 border-t border-neutral-dark/10">
              <div className="px-2 py-1 bg-amber-500/10 text-amber-500 text-sm rounded-full font-medium inline-flex items-center">
                <span className="h-2 w-2 bg-amber-500 rounded-full mr-1"></span>
                Yellow Compatibility
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start mb-4">
              <div className="mr-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-heading font-bold text-primary">VR</span>
                </div>
              </div>
              <div>
                <h4 className="font-heading font-semibold">Vikram Reddy</h4>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-neutral-dark/60 text-xs ml-2">Hyderabad</span>
                </div>
              </div>
            </div>
            
            <p className="text-neutral-dark/80">"As someone who was always hesitant about using dating apps, MyDate gave me the tools to understand my relationship patterns. The assessment was fun and insightful, and my girlfriend and I both got reports to compare our compatibility."</p>
            
            <div className="mt-4 pt-4 border-t border-neutral-dark/10">
              <div className="px-2 py-1 bg-red-500/10 text-red-500 text-sm rounded-full font-medium inline-flex items-center">
                <span className="h-2 w-2 bg-red-500 rounded-full mr-1"></span>
                Red Compatibility
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
