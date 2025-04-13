import { Link } from "wouter";

const SimpleHero = () => {
  return (
    <section className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white px-4 relative overflow-hidden">
      {/* Fun background elements - bubbles and shapes */}
      <div className="absolute top-20 right-10 w-16 h-16 rounded-full bg-pink-200 opacity-60 animate-bounce"></div>
      <div className="absolute bottom-10 left-10 w-12 h-12 rounded-full bg-yellow-200 opacity-60 animate-pulse"></div>
      <div className="absolute top-40 left-5 w-8 h-8 rounded-full bg-blue-200 opacity-60 animate-float" style={{animationDuration: '3s'}}></div>
      <div className="absolute bottom-20 right-5 w-10 h-10 rounded-full bg-green-200 opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>

      <div className="container mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          {/* Left side: Text and Call-to-Action */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="bg-purple-100 rounded-full inline-flex items-center px-3 py-1 mb-4">
              <span className="text-purple-600 text-sm font-medium">
                <span className="mr-1">🎮</span> Fun Quiz Inside!
              </span>
            </div>

            <h1 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
              Find Friends Who <span className="relative text-primary">
                Match With You!
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,0 Q50,12 100,0" fill="none" stroke="rgba(230,50,85,0.3)" strokeWidth="8" />
                </svg>
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-6">
              Take our super easy quiz to find out who you'll get along with best. It's like finding the perfect friend who thinks just like you do!
            </p>

            {/* Friendly benefits for kids to understand */}
            <div className="bg-white rounded-xl p-4 shadow-md mb-6 border-2 border-blue-100">
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                <span className="mr-2">👍</span> Why Kids Love Our Quiz:
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  <span className="text-slate-600">It's super fun and easy - just like a game!</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  <span className="text-slate-600">You'll learn cool things about yourself</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  <span className="text-slate-600">Find out who would be your best friend</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  <span className="text-slate-600">Get an awesome colorful report at the end!</span>
                </li>
              </ul>
            </div>

            {/* Big friendly button */}
            <Link 
              href="/register" 
              className="inline-block py-4 px-8 bg-primary text-white font-bold text-xl rounded-full shadow-lg hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 animate-pulse"
            >
              <span className="mr-2">🎮</span> Start The Fun Quiz!
            </Link>
            <p className="mt-3 text-sm text-slate-500">It only takes 5 minutes - that's shorter than a cartoon!</p>
          </div>

          {/* Right side: Fun visual preview */}
          <div className="w-full md:w-1/2">
            <div className="relative bg-white rounded-2xl p-6 shadow-xl border-4 border-blue-200 max-w-md mx-auto transform rotate-2">
              <div className="absolute -top-5 -right-5 bg-yellow-300 text-slate-800 rounded-full w-16 h-16 flex items-center justify-center font-bold text-xs p-1 rotate-12 border-2 border-yellow-400">
                100% <br/> FREE!
              </div>

              <h2 className="text-2xl font-bold mb-4 text-center text-slate-800">
                <span className="mr-2">🧩</span> Your Friend Finder Quiz
              </h2>

              {/* Sample quiz cards */}
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-100">
                  <p className="text-center font-medium text-slate-700 mb-3">Which one do you like most?</p>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-white rounded-lg p-2 text-center cursor-pointer hover:bg-blue-100 transition-colors">
                      <span className="text-2xl">🏀</span>
                      <p className="text-xs mt-1">Sports</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center cursor-pointer hover:bg-blue-100 transition-colors">
                      <span className="text-2xl">🎨</span>
                      <p className="text-xs mt-1">Art</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center cursor-pointer hover:bg-blue-100 transition-colors">
                      <span className="text-2xl">📚</span>
                      <p className="text-xs mt-1">Books</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center cursor-pointer hover:bg-blue-100 transition-colors">
                      <span className="text-2xl">🎮</span>
                      <p className="text-xs mt-1">Games</p>
                    </div>
                  </div>
                </div>

                <div className="bg-pink-50 rounded-xl p-4 border-2 border-pink-100">
                  <p className="text-center font-medium text-slate-700 mb-3">Do you like meeting new people?</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white rounded-lg p-2 text-center cursor-pointer hover:bg-pink-100 transition-colors">
                      <span className="text-2xl">😄</span>
                      <p className="text-xs mt-1">Yes!</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center cursor-pointer hover:bg-pink-100 transition-colors">
                      <span className="text-2xl">😐</span>
                      <p className="text-xs mt-1">Sometimes</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center cursor-pointer hover:bg-pink-100 transition-colors">
                      <span className="text-2xl">😌</span>
                      <p className="text-xs mt-1">Not really</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result preview */}
              <div className="bg-green-100 rounded-xl p-4 border-2 border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-800">Your Match Type:</h3>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Amazing!</span>
                </div>
                <div className="flex items-center bg-white rounded-lg p-3">
                  <span className="text-4xl mr-3">🦁</span>
                  <div>
                    <p className="font-bold text-slate-800">The Brave Lion</p>
                    <p className="text-sm text-slate-600">You're brave, loyal, and love adventures!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple trust indicators */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
            <span className="text-xl mr-2">⭐⭐⭐⭐⭐</span>
            <span className="text-sm font-medium text-slate-700">Loved by 2,000+ kids!</span>
          </div>
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
            <span className="text-xl mr-2">🔒</span>
            <span className="text-sm font-medium text-slate-700">Safe & Private</span>
          </div>
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
            <span className="text-xl mr-2">⏱️</span>
            <span className="text-sm font-medium text-slate-700">Just 5 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleHero;