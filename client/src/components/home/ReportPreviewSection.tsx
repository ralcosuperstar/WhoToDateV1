import { Link } from "wouter";

const ReportPreviewSection = () => {
  return (
    <section className="py-12 px-4 bg-white relative overflow-hidden">
      {/* Mobile-friendly background elements */}
      <div className="absolute top-0 right-0 w-60 h-60 sm:w-80 sm:h-80 bg-pink-50 rounded-full -mr-20 -mt-20 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 sm:w-80 sm:h-80 bg-purple-50 rounded-full -ml-20 -mb-20 opacity-30"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          <div>
            <div className="inline-block mb-3 py-1.5 px-4 bg-primary/10 rounded-full">
              <span className="text-primary font-medium text-sm flex items-center">
                <span className="emoji mr-2">🔍</span> Self-Discovery Journey
              </span>
            </div>

            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4">Your Relationship Personality Profile</h2>

            <p className="text-neutral-dark/80 text-base sm:text-lg mb-6">
              Stop wondering why your relationships follow certain patterns. Our assessment reveals your unique relationship personality and gives you the tools to improve.
            </p>

            <div className="mb-6">
              <h3 className="font-heading font-semibold text-lg mb-3 flex items-center">
                <span className="emoji mr-2">✨</span> Your profile reveals:
              </h3>

              <ul className="space-y-2.5">
                <li className="flex items-start">
                  <span className="emoji text-sm mr-2 mt-0.5">🧠</span>
                  <span className="text-sm sm:text-base">Your natural communication and conflict resolution style</span>
                </li>
                <li className="flex items-start">
                  <span className="emoji text-sm mr-2 mt-0.5">❤️</span>
                  <span className="text-sm sm:text-base">How you form emotional bonds and express affection</span>
                </li>
                <li className="flex items-start">
                  <span className="emoji text-sm mr-2 mt-0.5">🚩</span>
                  <span className="text-sm sm:text-base">Relationship red flags you might be missing</span>
                </li>
                <li className="flex items-start">
                  <span className="emoji text-sm mr-2 mt-0.5">🔄</span>
                  <span className="text-sm sm:text-base">Patterns you keep repeating in relationships</span>
                </li>
                <li className="flex items-start">
                  <span className="emoji text-sm mr-2 mt-0.5">💪</span>
                  <span className="text-sm sm:text-base">Your relationship strengths and growth opportunities</span>
                </li>
              </ul>
            </div>

            <Link href="/quiz" className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-xl shadow-md hover:bg-primary/90 transition duration-300">
              <span className="emoji mr-2">📋</span> Get Your Free Profile
            </Link>
          </div>

          <div className="relative mt-8 md:mt-0">
            {/* Mobile-optimized report card */}
            <div className="bg-white border border-neutral-dark/10 rounded-xl shadow-lg overflow-hidden max-w-md mx-auto">
              <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-semibold text-lg">Your Relationship Type</h3>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Sample</span>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                {/* Type classification */}
                <div className="flex items-center mb-5 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  <div className="mr-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="emoji text-2xl">🔮</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-heading font-semibold text-lg mb-0.5">The Thoughtful Connector</h4>
                    <p className="text-neutral-dark/70 text-sm">You value deep emotional bonds and meaningful communication</p>
                  </div>
                </div>

                {/* Key traits */}
                <div className="space-y-3 mb-5">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="flex items-center"><span className="emoji mr-1">🤝</span> Relationship Approach</span>
                      <span className="text-primary">Secure (82%)</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-100 rounded-full">
                      <div className="h-full w-[82%] bg-primary rounded-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="flex items-center"><span className="emoji mr-1">💬</span> Communication Style</span>
                      <span className="text-blue-500">Direct (75%)</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-100 rounded-full">
                      <div className="h-full w-[75%] bg-blue-500 rounded-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="flex items-center"><span className="emoji mr-1">🧩</span> Compatibility Flexibility</span>
                      <span className="text-purple-500">High (88%)</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-100 rounded-full">
                      <div className="h-full w-[88%] bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Compatibility matches */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <div className="flex items-center mb-1">
                      <span className="emoji mr-1 text-sm">✅</span>
                      <h5 className="font-medium text-xs text-green-700">Best Match With</h5>
                    </div>
                    <p className="text-sm font-medium">The Steady Supporter</p>
                  </div>
                  
                  <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                    <div className="flex items-center mb-1">
                      <span className="emoji mr-1 text-sm">⚠️</span>
                      <h5 className="font-medium text-xs text-red-700">Challenges With</h5>
                    </div>
                    <p className="text-sm font-medium">The Distant Analyzer</p>
                  </div>
                </div>

                {/* Growth tip */}
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <div className="flex items-start">
                    <span className="emoji mr-2 mt-0.5">💡</span>
                    <div>
                      <h5 className="font-medium text-xs text-yellow-700 mb-1">Growth Opportunity</h5>
                      <p className="text-sm">Setting clearer boundaries could help you maintain your emotional energy in relationships.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements - simplified for mobile */}
            <div className="absolute -top-3 -right-3 w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-yellow-100/80 -z-10 transform rotate-6"></div>
            <div className="absolute -bottom-3 -left-3 w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-blue-100/80 -z-10 transform -rotate-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportPreviewSection;