import { Link } from "wouter";

const SimpleTestimonialsSection = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-purple-50 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            <span className="mr-2">😃</span> Kids Love Our Quiz!
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See what other kids just like you have said about our fun friendship quiz!
          </p>
        </div>

        {/* Kid-friendly testimonials with cartoon avatars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-pink-200 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-2 border-2 border-pink-300">
                <span className="text-3xl">👧</span>
              </div>
              <h3 className="font-bold text-lg text-slate-800">Priya, 10</h3>
              <div className="text-yellow-400 text-xl">★★★★★</div>
            </div>
            
            <p className="text-slate-600 text-center mb-3">
              "This quiz was super fun! I found out I'm a 'Caring Dolphin' and now I know why I get along so well with my best friend Sara!"
            </p>
            
            <div className="bg-green-100 rounded-lg p-2 text-center">
              <p className="text-green-600 text-sm font-medium flex items-center justify-center">
                <span className="mr-2">🐬</span> The Caring Dolphin
              </p>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2 border-2 border-blue-300">
                <span className="text-3xl">👦</span>
              </div>
              <h3 className="font-bold text-lg text-slate-800">Arjun, 11</h3>
              <div className="text-yellow-400 text-xl">★★★★★</div>
            </div>
            
            <p className="text-slate-600 text-center mb-3">
              "I always wondered why I liked playing with certain friends more. Now I know I'm a 'Brave Lion' and my best matches are 'Wise Owls'!"
            </p>
            
            <div className="bg-yellow-100 rounded-lg p-2 text-center">
              <p className="text-yellow-600 text-sm font-medium flex items-center justify-center">
                <span className="mr-2">🦁</span> The Brave Lion
              </p>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200 transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2 border-2 border-purple-300">
                <span className="text-3xl">👧</span>
              </div>
              <h3 className="font-bold text-lg text-slate-800">Meera, 9</h3>
              <div className="text-yellow-400 text-xl">★★★★★</div>
            </div>
            
            <p className="text-slate-600 text-center mb-3">
              "The quiz was like playing a fun game! I loved finding out I'm a 'Creative Butterfly'. The pictures were so colorful and pretty!"
            </p>
            
            <div className="bg-blue-100 rounded-lg p-2 text-center">
              <p className="text-blue-600 text-sm font-medium flex items-center justify-center">
                <span className="mr-2">🦋</span> The Creative Butterfly
              </p>
            </div>
          </div>
        </div>

        {/* Parent testimonials */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-green-200 mb-10">
          <h3 className="text-2xl font-bold text-center text-slate-800 mb-6">
            <span className="mr-2">👨‍👩‍👧‍👦</span> Parents Love It Too!
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 border border-blue-200">
                  <span className="text-xl">👩</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Neha's Mom</h4>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-slate-600 mb-3">
                "My daughter learned so much about herself from this quiz! The language was simple enough for her to understand, and she was so excited to share her results with us."
              </p>
              <p className="text-blue-600 text-sm font-medium">
                "It helped her understand why she sometimes has trouble with certain friends at school."
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3 border border-green-200">
                  <span className="text-xl">👨</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Raj's Dad</h4>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-slate-600 mb-3">
                "This quiz helped my son understand friendship in a way I couldn't explain. The colorful animals and simple descriptions really connected with him."
              </p>
              <p className="text-green-600 text-sm font-medium">
                "Now he knows his 'friendship superpower' and feels more confident!"
              </p>
            </div>
          </div>
        </div>

        {/* Fun facts */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-200 max-w-3xl mx-auto mb-10">
          <h3 className="text-2xl font-bold text-center text-slate-800 mb-4 flex items-center justify-center">
            <span className="mr-2">✨</span> Fun Quiz Facts
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
              <span className="text-4xl block mb-2">🎮</span>
              <h4 className="font-bold text-slate-800 mb-1">10,000+</h4>
              <p className="text-slate-600 text-sm">Kids have taken our fun quiz!</p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <span className="text-4xl block mb-2">🦁</span>
              <h4 className="font-bold text-slate-800 mb-1">8 Animals</h4>
              <p className="text-slate-600 text-sm">Different friendship types to discover</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <span className="text-4xl block mb-2">⭐</span>
              <h4 className="font-bold text-slate-800 mb-1">5 Stars</h4>
              <p className="text-slate-600 text-sm">Average rating from happy kids!</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Link 
            href="/register" 
            className="inline-flex items-center justify-center py-4 px-8 bg-primary text-white font-bold text-xl rounded-full shadow-lg hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
          >
            <span className="mr-2">🎮</span> Try The Fun Quiz Now!
          </Link>
          <p className="mt-3 text-slate-500">Join thousands of kids who've already discovered their friendship type!</p>
        </div>
      </div>
    </section>
  );
};

export default SimpleTestimonialsSection;