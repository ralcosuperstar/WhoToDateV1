import { Link } from "wouter";

const SimpleFeaturesSection = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-yellow-50 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            <span className="mr-2">🎁</span> Cool Things You'll Get
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            After you take our fun quiz, you'll get some awesome things to help you make better friends!
          </p>
        </div>

        {/* Feature cards with big colorful icons and super simple text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-pink-400 hover:transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🦸‍♀️</span>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Your Secret Power</h3>
            <p className="text-center text-slate-600">
              Learn what makes you special and what kind of friend you are!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-400 hover:transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👫</span>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Best Friend Type</h3>
            <p className="text-center text-slate-600">
              Find out which kind of friends you'll get along with the best!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-400 hover:transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💪</span>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Your Superpowers</h3>
            <p className="text-center text-slate-600">
              Discover all the awesome things you're really good at in friendships!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-400 hover:transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Friendship Tips</h3>
            <p className="text-center text-slate-600">
              Cool tricks to help you make even better friends in the future!
            </p>
          </div>
        </div>

        {/* Colorful report preview */}
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto mb-10 border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-center text-slate-800 mb-4 flex items-center justify-center">
            <span className="mr-2">📝</span> Your Amazing Report Looks Like This:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-100">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">🦁</span>
                <h4 className="text-xl font-bold text-slate-800">The Brave Lion</h4>
              </div>
              <p className="text-slate-600 mb-3">
                You're brave, loyal and love adventures with your friends!
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-slate-600">You stand up for your friends</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-slate-600">You love exciting adventures</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-slate-600">You're super brave when afraid</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-100">
              <h4 className="text-lg font-bold text-slate-800 mb-3">Your Best Friend Matches:</h4>
              <div className="space-y-3">
                <div className="flex items-center bg-white rounded-lg p-2">
                  <span className="text-2xl mr-2">🦊</span>
                  <div>
                    <p className="font-bold text-slate-800">The Clever Fox</p>
                    <p className="text-sm text-slate-600">Smart, creative problem-solvers</p>
                  </div>
                </div>
                <div className="flex items-center bg-white rounded-lg p-2">
                  <span className="text-2xl mr-2">🐢</span>
                  <div>
                    <p className="font-bold text-slate-800">The Wise Turtle</p>
                    <p className="text-sm text-slate-600">Patient, thoughtful and loyal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200 text-center">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center justify-center">
              <span className="mr-2">💡</span> Fun Fact About You:
            </h4>
            <p className="text-slate-600">
              Did you know people with your friendship style are great at cheering others up when they feel sad? You're a super good friend to have!
            </p>
          </div>
        </div>

        {/* Fun call to action */}
        <div className="text-center">
          <Link 
            href="/register" 
            className="inline-block py-4 px-8 bg-primary text-white font-bold text-xl rounded-full shadow-lg hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
          >
            <span className="mr-2">🎮</span> I Want To Try The Quiz!
          </Link>
          <p className="mt-3 text-slate-500">It's 100% free and super fun!</p>
        </div>
      </div>
    </section>
  );
};

export default SimpleFeaturesSection;