const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya & Vikram",
      location: "Mumbai",
      profile: "Secure + Anxious Attachments",
      quote: "The compatibility assessment revealed our attachment styles and how they influence our communication. Understanding these patterns helped us resolve conflicts that used to repeat endlessly.",
      impact: "Stronger communication",
      timeframe: "Together for 2 years",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-500",
      icon: "❤️",
      rating: 5
    },
    {
      id: 2,
      name: "Arjun S.",
      location: "Bangalore",
      profile: "The Thoughtful Connector",
      quote: "After three failed relationships following the same unhealthy pattern, WhoToDate's scientific assessment showed me why I kept attracting the wrong partners. Now I've found someone truly compatible.",
      impact: "Breaking negative cycles",
      timeframe: "Found compatible match",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      icon: "🔍",
      rating: 5
    },
    {
      id: 3,
      name: "Neha & Rohit",
      location: "Delhi",
      profile: "High EQ Compatibility",
      quote: "Our report highlighted our complementary emotional intelligence strengths. This helped us navigate the cultural differences in our families and set healthy boundaries together.",
      impact: "Family harmony",
      timeframe: "Engaged after 1 year",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      icon: "✨",
      rating: 5
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-neutral-50" id="testimonials">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-3 py-1.5 px-4 bg-primary/10 rounded-full">
            <span className="text-primary font-medium text-sm flex items-center justify-center">
              <span className="emoji mr-2">💯</span> Proven Results
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">Science-Based Success Stories</h2>
          <p className="text-base sm:text-lg mx-auto text-neutral-dark/80 max-w-2xl">
            See how our psychological assessment helped these individuals find compatible relationships
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className={`${testimonial.bgColor} rounded-2xl overflow-hidden shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg`}
            >
              <div className="p-6">
                {/* Profile badge */}
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${testimonial.bgColor} border-2 border-white flex items-center justify-center ${testimonial.iconColor} text-xl`}>
                      <span className="emoji">{testimonial.icon}</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-heading font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-neutral-dark/70 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full font-medium text-neutral-dark/70">
                    {testimonial.timeframe}
                  </span>
                </div>

                {/* Scientific profile type */}
                <div className="bg-white/70 backdrop-blur-sm rounded-lg py-2 px-3 mb-4 inline-block">
                  <span className="text-sm font-medium">{testimonial.profile}</span>
                </div>

                <blockquote className="text-neutral-dark/90 mb-4 text-base leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Stars & impact */}
                <div className="flex justify-between items-center mt-5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}`} 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm px-3 py-1 rounded-lg">
                    <span className="text-xs font-medium text-green-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {testimonial.impact}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success metrics */}
        <div className="mt-16 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-6 text-center border-b md:border-b-0 md:border-r border-neutral-100">
              <div className="text-4xl font-bold text-primary mb-2">87%</div>
              <div className="text-lg font-medium mb-1">Improved Communication</div>
              <p className="text-neutral-dark/70 text-sm">
                Users report significantly better understanding of their partner's needs
              </p>
            </div>
            <div className="p-6 text-center border-b md:border-b-0 md:border-r border-neutral-100">
              <div className="text-4xl font-bold text-primary mb-2">92%</div>
              <div className="text-lg font-medium mb-1">Report Satisfaction</div>
              <p className="text-neutral-dark/70 text-sm">
                Users find their compatibility insights accurate and helpful
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">76%</div>
              <div className="text-lg font-medium mb-1">Relationship Success</div>
              <p className="text-neutral-dark/70 text-sm">
                Users report more satisfying relationships after applying insights
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-white/70 backdrop-blur-sm rounded-lg py-2 px-4 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-neutral-dark/70 text-sm font-medium">Limited time: Free comprehensive assessment</span>
          </div>
          <a href="/quiz" className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-medium rounded-xl shadow-md hover:bg-primary/90 transition">
            Get Your Compatibility Profile Now
          </a>
        </div>
      </div>
    </section>
  );
};
export default TestimonialsSection;