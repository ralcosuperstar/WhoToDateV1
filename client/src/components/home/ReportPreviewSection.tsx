import { Link } from "wouter";

const ReportPreviewSection = () => {
  return (
    <section className="py-16 bg-white px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl mb-4">Your Comprehensive Compatibility Report</h2>
          <p className="max-w-2xl mx-auto text-neutral-dark/80">Get detailed insights into your relationship patterns and preferences.</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8">
          <div className="md:w-1/3">
            <div className="bg-neutral-light rounded-xl p-6 h-full">
              <h3 className="font-heading font-semibold text-xl mb-4">What You'll Learn</h3>
              
              <ul className="space-y-4">
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Your core relationship strengths and potential blind spots</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Communication style and how you express emotions</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Values alignment including family expectations, traditions, and lifestyle preferences</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Conflict resolution approach and emotional reactions</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Your compatibility color code and what it means for your relationships</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Actionable suggestions for relationship growth and improvement</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="bg-white border border-neutral-dark/10 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-primary text-white p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-semibold text-lg">MyDate Compatibility Report</h3>
                  <span className="text-sm bg-white/20 px-2 py-1 rounded">Premium</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center mb-6">
                  <div className="mb-4 md:mb-0 md:mr-6">
                    <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-heading font-bold text-2xl text-primary">AS</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-heading font-semibold text-xl mb-1">Anjali Singh</h4>
                    <div className="flex items-center mb-2">
                      <div className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-sm rounded-full font-medium flex items-center">
                        <span className="h-2 w-2 bg-emerald-500 rounded-full mr-1"></span>
                        Green Compatibility
                      </div>
                    </div>
                    <p className="text-sm text-neutral-dark/70">Report generated on March 15, 2025</p>
                  </div>
                </div>
                
                <div className="border-t border-neutral-dark/10 pt-6 space-y-6">
                  <div>
                    <h5 className="font-heading font-semibold mb-3">Personality Overview</h5>
                    <p className="text-neutral-dark/80">You are a thoughtful, empathetic individual who values deep connections. Your INFJ personality type combined with secure attachment style makes you a supportive and understanding partner who seeks meaning in relationships.</p>
                  </div>
                  
                  <div>
                    <h5 className="font-heading font-semibold mb-3">Relationship Strengths</h5>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-neutral-light p-3 rounded-lg">
                        <span className="font-medium block mb-1">High Empathy</span>
                        <p className="text-sm text-neutral-dark/80">You easily understand others' perspectives and emotional needs.</p>
                      </div>
                      <div className="bg-neutral-light p-3 rounded-lg">
                        <span className="font-medium block mb-1">Value Clarity</span>
                        <p className="text-sm text-neutral-dark/80">You have a strong sense of personal values and ethics.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-heading font-semibold mb-3">Communication Style</h5>
                    <div className="flex items-center mb-3">
                      <span className="w-32 text-sm">Direct vs. Indirect</span>
                      <div className="h-2 flex-1 bg-neutral-dark/10 rounded-full mx-3">
                        <div className="h-full w-2/3 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm">Balanced</span>
                    </div>
                    <p className="text-neutral-dark/80 text-sm">You communicate thoughtfully, preferring meaningful conversations over small talk. While you can be direct about important matters, you're sensitive to others' feelings.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-heading font-semibold mb-3">Compatible With</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary mt-0.5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span>Thoughtful, authentic individuals</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary mt-0.5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span>Those who appreciate intellectual depth</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary mt-0.5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span>Partners who value personal growth</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-heading font-semibold mb-3">Growth Opportunities</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-amber-500 mt-0.5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                          </svg>
                          <span>Being more flexible with plans</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-amber-500 mt-0.5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                          </svg>
                          <span>Expressing needs more directly</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-amber-500 mt-0.5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                          </svg>
                          <span>Setting clearer boundaries</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="text-center pt-2">
                    <span className="text-sm text-neutral-dark/60">Report preview - Full report contains 20+ pages of detailed insights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <div className="bg-primary/5 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 md:pr-8">
                <h3 className="font-heading font-semibold text-xl md:text-2xl mb-4">Get Your Full Compatibility Report</h3>
                <p className="mb-6">Unlock comprehensive insights into your relationship patterns and preferences with our detailed 20+ page report.</p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="font-medium">One-time payment, lifetime access</span>
                      <p className="text-sm text-neutral-dark/70">Pay once and get permanent access to your report</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="font-medium">Culturally relevant insights</span>
                      <p className="text-sm text-neutral-dark/70">Tailored for Indian relationship dynamics and values</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="font-medium">Actionable relationship advice</span>
                      <p className="text-sm text-neutral-dark/70">Practical tips to improve your relationship outcomes</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link href="/payment" className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg inline-flex items-center transition">
                    <span>Get Your Report for ₹999</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/3 mt-8 md:mt-0 flex justify-center">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                    alt="Couple looking at report" 
                    className="rounded-lg shadow-md"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-md p-3">
                    <div className="flex items-center">
                      <div className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-sm rounded-full font-medium flex items-center">
                        <span className="h-2 w-2 bg-emerald-500 rounded-full mr-1"></span>
                        Green Compatibility
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

export default ReportPreviewSection;
