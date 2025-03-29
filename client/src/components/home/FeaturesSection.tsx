import { Link } from "wouter";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white px-4 relative overflow-hidden" id="how-it-works">
      {/* Background decorations */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-pink-50 rounded-full opacity-70"></div>
      <div className="absolute left-10 bottom-10 w-32 h-32 bg-yellow-50 rounded-full opacity-70"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-3 py-1 px-3 bg-primary/10 rounded-full">
            <span className="text-primary font-medium text-sm flex items-center">
              <span className="emoji mr-1">⚡</span> Quick & Fun Process
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">How MyDate Works <span className="emoji">🚀</span></h2>
          <p className="max-w-2xl mx-auto text-neutral-dark/80">Our modern approach to finding your perfect match combines science with fun!</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-8 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 border border-pink-100">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <span className="emoji text-4xl">🎯</span>
            </div>
            <h3 className="font-heading font-semibold text-2xl mb-4">Take the Quiz</h3>
            <p className="text-neutral-dark/80 leading-relaxed">Answer fun questions about your personality, values, and relationship goals. Takes just 5 minutes!</p>
            <div className="mt-6 flex">
              <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">Step 1</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-8 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 border border-pink-100">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <span className="emoji text-4xl">📊</span>
            </div>
            <h3 className="font-heading font-semibold text-2xl mb-4">Get Insights</h3>
            <p className="text-neutral-dark/80 leading-relaxed">Receive your colorful compatibility profile with insights about your dating personality!</p>
            <div className="mt-6 flex">
              <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">Step 2</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-8 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 border border-pink-100">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <span className="emoji text-4xl">💝</span>
            </div>
            <h3 className="font-heading font-semibold text-2xl mb-4">Find Matches</h3>
            <p className="text-neutral-dark/80 leading-relaxed">Compare your profile with potential partners to find your true match scientifically!</p>
            <div className="mt-6 flex">
              <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">Step 3</span>
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="bg-gradient-to-r from-primary/5 to-pink-50 rounded-3xl p-8 shadow-lg border border-pink-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 md:pr-10">
                <h3 className="font-heading font-semibold text-2xl md:text-3xl mb-6">What Makes Us Special <span className="emoji">✨</span></h3>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <span className="emoji text-xl mr-3 mt-0.5">🇮🇳</span>
                    <div>
                      <span className="font-medium text-lg">Made for Indian Dating Culture</span>
                      <p className="text-neutral-dark/80 mt-1">We understand family values, traditions, and modern Indian relationship dynamics</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="emoji text-xl mr-3 mt-0.5">🧠</span>
                    <div>
                      <span className="font-medium text-lg">Scientific Approach</span>
                      <p className="text-neutral-dark/80 mt-1">Combines personality science, attachment styles, and emotional intelligence</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="emoji text-xl mr-3 mt-0.5">🔒</span>
                    <div>
                      <span className="font-medium text-lg">Privacy First</span>
                      <p className="text-neutral-dark/80 mt-1">Your data stays private - you control who sees your compatibility results</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="emoji text-xl mr-3 mt-0.5">⚡</span>
                    <div>
                      <span className="font-medium text-lg">Fast & Fun</span>
                      <p className="text-neutral-dark/80 mt-1">No boring questionnaires - our colorful quiz is quick and enjoyable!</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Link href="/quiz" className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-xl text-center transition shadow-lg shadow-primary/20 inline-flex items-center">
                    <span className="emoji mr-2">🚀</span> Start Your Quiz Now
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/3 mt-8 md:mt-0">
                <div className="relative floating">
                  <div className="bg-white rounded-3xl shadow-lg p-6 relative z-10 border-2 border-pink-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-green-400/20 flex items-center justify-center">
                        <span className="emoji text-xl">💚</span>
                      </div>
                      <div>
                        <span className="block font-semibold text-lg">Green Match</span>
                        <span className="text-sm text-neutral-dark/70">High Compatibility</span>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-4">Your profile suggests you match well with caring, emotionally open partners who value communication.</p>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span>Communication</span>
                          <span>85%</span>
                        </div>
                        <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                          <div className="h-full w-[85%] bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span>Emotional Connection</span>
                          <span>92%</span>
                        </div>
                        <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                          <div className="h-full w-[92%] bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span>Values Alignment</span>
                          <span>78%</span>
                        </div>
                        <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                          <div className="h-full w-[78%] bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative cards */}
                  <div className="absolute -right-4 -bottom-4 h-full w-full bg-yellow-100 rounded-3xl -z-10 rotate-6"></div>
                  <div className="absolute -left-4 -bottom-2 h-full w-full bg-pink-100 rounded-3xl -z-20 -rotate-6"></div>
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
