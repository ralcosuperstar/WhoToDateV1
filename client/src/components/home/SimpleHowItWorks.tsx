import { Link } from "wouter";

const SimpleHowItWorks = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-yellow-50 to-blue-50 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            <span className="mr-2">🎯</span> How It Works - Super Easy!
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Finding your perfect match is as easy as 1-2-3. Even a kid can do it!
          </p>
        </div>

        {/* Steps with large illustrated numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <div className="relative">
            {/* Big number background */}
            <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-pink-400 text-white flex items-center justify-center text-3xl font-bold shadow-lg">1</div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-pink-200 pl-4 pt-8">
              <div className="w-20 h-20 mx-auto mb-4">
                <span className="text-5xl">🎮</span>
              </div>
              <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Play The Quiz</h3>
              <p className="text-center text-slate-600 text-lg">
                Just answer some fun questions about what you like and how you play with friends
              </p>
              <div className="bg-pink-100 rounded-lg p-2 mt-4 text-center">
                <p className="text-pink-600 text-sm font-medium">Takes only 5 minutes!</p>
              </div>
            </div>
          </div>

          <div className="relative mt-10 md:mt-0">
            {/* Arrow connector for desktop */}
            <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2">
              <span className="text-blue-400 text-4xl">→</span>
            </div>
            
            {/* Big number background */}
            <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-blue-400 text-white flex items-center justify-center text-3xl font-bold shadow-lg">2</div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200 pl-4 pt-8">
              <div className="w-20 h-20 mx-auto mb-4">
                <span className="text-5xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Magic Happens!</h3>
              <p className="text-center text-slate-600 text-lg">
                Our friendly robots figure out your special friendship type
              </p>
              <div className="bg-blue-100 rounded-lg p-2 mt-4 text-center">
                <p className="text-blue-600 text-sm font-medium">It's like magic but with science!</p>
              </div>
            </div>
          </div>

          <div className="relative mt-10 md:mt-0">
            {/* Arrow connector for desktop */}
            <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2">
              <span className="text-green-400 text-4xl">→</span>
            </div>
            
            {/* Big number background */}
            <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-green-400 text-white flex items-center justify-center text-3xl font-bold shadow-lg">3</div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200 pl-4 pt-8">
              <div className="w-20 h-20 mx-auto mb-4">
                <span className="text-5xl">🎁</span>
              </div>
              <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Get Your Report</h3>
              <p className="text-center text-slate-600 text-lg">
                See all about your friendship power and who your best matches are!
              </p>
              <div className="bg-green-100 rounded-lg p-2 mt-4 text-center">
                <p className="text-green-600 text-sm font-medium">100% Free and super fun!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo walkthrough - simplified phone mockups */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-center text-slate-800 mb-6">
            <span className="mr-2">👀</span> See How It Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 rounded-xl p-3 border-2 border-gray-200 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 h-6 w-20 bg-gray-200 rounded-full"></div>
              <div className="bg-white rounded-lg p-3 h-60 flex flex-col">
                <div className="text-center mb-2">
                  <span className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-medium text-blue-600">Question 1/10</span>
                </div>
                <h4 className="text-lg font-bold text-center mb-4">Do you like playing with lots of friends, or just a few best friends?</h4>
                <div className="space-y-2 mt-auto mb-2">
                  <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium py-2 rounded-lg transition-colors">
                    <span className="mr-2">👥</span> Lots of friends!
                  </button>
                  <button className="w-full bg-green-100 hover:bg-green-200 text-green-600 font-medium py-2 rounded-lg transition-colors">
                    <span className="mr-2">👫</span> Just a few close friends
                  </button>
                  <button className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600 font-medium py-2 rounded-lg transition-colors">
                    <span className="mr-2">🤔</span> It depends!
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-3 border-2 border-gray-200 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 h-6 w-20 bg-gray-200 rounded-full"></div>
              <div className="bg-white rounded-lg p-3 h-60 flex flex-col">
                <div className="text-center mb-2">
                  <span className="inline-block bg-purple-100 rounded-full px-3 py-1 text-sm font-medium text-purple-600">Question 5/10</span>
                </div>
                <h4 className="text-lg font-bold text-center mb-4">When you play games, do you like to:</h4>
                <div className="space-y-2 mt-auto mb-2">
                  <button className="w-full bg-red-100 hover:bg-red-200 text-red-600 font-medium py-2 rounded-lg transition-colors">
                    <span className="mr-2">🎯</span> Win the game!
                  </button>
                  <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-600 font-medium py-2 rounded-lg transition-colors">
                    <span className="mr-2">😄</span> Just have fun playing
                  </button>
                  <button className="w-full bg-teal-100 hover:bg-teal-200 text-teal-600 font-medium py-2 rounded-lg transition-colors">
                    <span className="mr-2">🤝</span> Make sure everyone has fun
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-3 border-2 border-gray-200 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 h-6 w-20 bg-gray-200 rounded-full"></div>
              <div className="bg-white rounded-lg p-3 h-60">
                <div className="text-center mb-3">
                  <span className="inline-block bg-green-100 rounded-full px-3 py-1 text-sm font-medium text-green-600">Your Result!</span>
                </div>
                <div className="text-center mb-3">
                  <span className="inline-block text-5xl">🦊</span>
                  <h4 className="text-xl font-bold mt-2">The Clever Fox</h4>
                </div>
                <p className="text-sm text-center text-slate-600 mb-3">
                  You're creative, smart, and love solving problems with your friends!
                </p>
                <div className="bg-yellow-100 rounded-lg p-2 text-center">
                  <p className="text-yellow-600 text-sm font-medium">Click for your full report!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple CTA */}
        <div className="text-center mt-10">
          <Link 
            href="/register" 
            className="inline-flex items-center justify-center py-4 px-8 bg-primary text-white font-bold text-xl rounded-full shadow-lg hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
          >
            <span className="mr-2">🚀</span> I'm Ready To Start!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SimpleHowItWorks;