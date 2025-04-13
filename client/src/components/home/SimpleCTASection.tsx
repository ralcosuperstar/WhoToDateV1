import { Link } from "wouter";

const SimpleCTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-pink-50 px-4 relative overflow-hidden">
      {/* Fun background elements */}
      <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-yellow-200 opacity-40 animate-bounce" style={{animationDuration: '5s'}}></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-blue-200 opacity-40 animate-bounce" style={{animationDuration: '6s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-green-200 opacity-40 animate-bounce" style={{animationDuration: '7s'}}></div>

      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-primary relative z-10">
          {/* Celebration elements */}
          <div className="absolute -top-6 -left-6 w-16 h-16 bg-yellow-300 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-blue-300 rounded-full animate-pulse"></div>
          
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                <span className="mr-2">🎈</span> Ready For A Fun Adventure?
              </h2>
              <p className="text-xl text-slate-600">
                Join the thousands of kids who've already discovered their awesome friendship type!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Fun images/illustrations on the left */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-200 rounded-full opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-pink-200 rounded-full opacity-30"></div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Your Adventure Awaits!</h3>
                
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl">🦁</div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">🦊</div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">🐬</div>
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-3xl">🦉</div>
                </div>
                
                <p className="text-slate-600 text-lg">
                  Which amazing animal friend are you? Take the quiz to find out!
                </p>
                
                <div className="mt-4 text-center">
                  <div className="inline-block bg-white rounded-full px-4 py-2 shadow-md">
                    <span className="text-xl">⭐⭐⭐⭐⭐</span>
                    <p className="text-slate-700 font-medium">Loved by kids ages 8-12!</p>
                  </div>
                </div>
              </div>
              
              {/* Call to action on the right */}
              <div className="flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl mr-3 flex-shrink-0">✓</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">Super Fun Quiz</h4>
                      <p className="text-slate-600">Like playing a game with colorful animals and emoji!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl mr-3 flex-shrink-0">✓</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">Super Easy to Understand</h4>
                      <p className="text-slate-600">Simple words and pictures make it fun for everyone!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-xl mr-3 flex-shrink-0">✓</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">Awesome Report</h4>
                      <p className="text-slate-600">Get a colorful report with cool facts about you!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl mr-3 flex-shrink-0">✓</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">100% Free!</h4>
                      <p className="text-slate-600">No tricks or surprises - the whole quiz is free!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Extra emphasized CTA */}
            <div className="text-center">
              <div className="mb-6 bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200 inline-block">
                <p className="text-slate-700 font-medium">
                  <span className="text-yellow-500 mr-2">⚡</span>
                  <span className="text-lg">Just 5 minutes to discover your animal friend type!</span>
                </p>
              </div>
              
              <Link 
                href="/register" 
                className="inline-block py-5 px-10 bg-primary text-white font-bold text-2xl rounded-full shadow-xl hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 animate-pulse"
              >
                <span className="mr-2">🎮</span> Start My Fun Quiz!
              </Link>
              
              <p className="mt-4 text-slate-500">
                Already taken the quiz? <Link href="/login" className="text-primary font-medium underline">Log in here</Link> to see your results!
              </p>
            </div>
          </div>
        </div>
        
        {/* Final friendly footer-style element */}
        <div className="text-center mt-10">
          <p className="text-slate-500 text-sm">
            Made with <span className="text-red-500">❤️</span> for kids by the team at WhoToDate
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/privacy" className="text-primary hover:underline text-sm">Safe for Kids</Link>
            <Link href="/terms" className="text-primary hover:underline text-sm">Parent Guide</Link>
            <Link href="/contact" className="text-primary hover:underline text-sm">Contact Us</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleCTASection;