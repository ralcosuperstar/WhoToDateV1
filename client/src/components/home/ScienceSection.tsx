import { Link } from "wouter";

const ScienceSection = () => {
  return (
    <section className="py-12 bg-neutral-50 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block mb-3 py-1.5 px-4 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center justify-center">
                <span className="emoji mr-2">🔬</span> Science-Based Insights
              </span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-3">The Psychology Behind Your Relationship Style</h2>
            <p className="text-base sm:text-lg mx-auto text-neutral-dark/80 max-w-2xl">
              Our assessment combines attachment theory, relationship psychology, and compatibility research to reveal your unique patterns
            </p>
          </div>

          {/* Mobile-friendly two-column layout that stacks on small screens */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid sm:grid-cols-2">
              <div className="p-5 sm:p-8">
                <h3 className="font-heading font-semibold text-xl mb-4 flex items-center">
                  <span className="emoji mr-2">🧠</span> Relationship Psychology Frameworks
                </h3>
                <p className="text-neutral-dark/80 mb-5 text-sm sm:text-base">
                  Our assessment analyzes 5 key dimensions that influence how you connect with others:
                </p>
                <ul className="space-y-3">
                  {[
                    "Attachment style (how you bond with partners)",
                    "Communication patterns (how you express needs)",
                    "Conflict resolution approach (how you handle disagreements)",
                    "Emotional intelligence (how you process feelings)",
                    "Relationship values (what matters most to you)"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-0.5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-5 sm:p-8">
                <h3 className="font-heading font-semibold text-xl mb-4 flex items-center">
                  <span className="emoji mr-2">💡</span> Why Understanding Matters
                </h3>
                
                <div className="space-y-5">
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-start">
                      <span className="emoji mr-2 mt-0.5">🔄</span>
                      <div>
                        <h4 className="font-medium text-sm sm:text-base">Break Unhealthy Cycles</h4>
                        <p className="text-neutral-dark/80 text-xs sm:text-sm mt-1">
                          Recognize patterns from your past relationships and avoid repeating the same mistakes
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-start">
                      <span className="emoji mr-2 mt-0.5">🧩</span>
                      <div>
                        <h4 className="font-medium text-sm sm:text-base">Find Complementary Types</h4>
                        <p className="text-neutral-dark/80 text-xs sm:text-sm mt-1">
                          Identify which relationship types naturally balance and enhance your personality
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-start">
                      <span className="emoji mr-2 mt-0.5">🚧</span>
                      <div>
                        <h4 className="font-medium text-sm sm:text-base">Know Your Triggers</h4>
                        <p className="text-neutral-dark/80 text-xs sm:text-sm mt-1">
                          Understand what causes conflict for you and how to manage these triggers effectively
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature badges - mobile-friendly with icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 shadow-sm flex items-start">
              <span className="emoji text-xl mr-3 mt-0.5">📚</span>
              <div>
                <h4 className="font-medium text-sm sm:text-base">Research-Backed</h4>
                <p className="text-neutral-dark/70 text-xs sm:text-sm mt-1">
                  Based on established psychological frameworks and relationship studies
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm flex items-start">
              <span className="emoji text-xl mr-3 mt-0.5">🌏</span>
              <div>
                <h4 className="font-medium text-sm sm:text-base">Culturally Relevant</h4>
                <p className="text-neutral-dark/70 text-xs sm:text-sm mt-1">
                  Designed specifically for modern Indian relationship dynamics
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm flex items-start">
              <span className="emoji text-xl mr-3 mt-0.5">🔒</span>
              <div>
                <h4 className="font-medium text-sm sm:text-base">Private & Secure</h4>
                <p className="text-neutral-dark/70 text-xs sm:text-sm mt-1">
                  Your personal data is always protected and never shared
                </p>
              </div>
            </div>
          </div>
          
          {/* Final call to action */}
          <div className="mt-8 text-center">
            <Link 
              href="/quiz" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-xl shadow-md hover:bg-primary/90 transition"
            >
              <span className="emoji mr-2">🔍</span> Discover Your Relationship Type
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScienceSection;