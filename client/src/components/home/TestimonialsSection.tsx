const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya & Vikram",
      location: "Mumbai",
      quote: "The compatibility assessment revealed things about our relationship dynamics that we hadn't even realized. Now we understand each other so much better!",
      image: "https://images.unsplash.com/photo-1511945863317-d60e146e9016?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      id: 2,
      name: "Arjun & Meera",
      location: "Bangalore",
      quote: "After three failed relationships, I was skeptical. But MyDate's assessment matched me with someone who truly understands me. We're getting married next month!",
      image: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      id: 3,
      name: "Neha & Rohit",
      location: "Delhi",
      quote: "The insights from our compatibility report helped us navigate cultural differences and family expectations. We couldn't be happier!",
      image: "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", 
      rating: 4
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-3 py-1.5 px-4 bg-purple-500/10 rounded-full">
            <span className="text-purple-600 font-medium text-sm flex items-center justify-center">
              <span className="emoji mr-2">💕</span> Success Stories
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">Hear from Happy Couples</h2>
          <p className="text-lg mx-auto text-neutral-dark/80 max-w-2xl">
            Real stories from couples who found meaningful connections through MyDate
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-neutral-light rounded-2xl p-6 shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-white"
                />
                <div className="ml-3">
                  <h4 className="font-heading font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-neutral-dark/70 text-sm">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-neutral-dark/90 italic mb-4">
                "{testimonial.quote}"
              </blockquote>

              <div className="border-t border-neutral-dark/10 pt-4 mt-auto">
                <p className="text-primary text-sm font-medium">Matched 8 months ago</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center text-primary font-medium hover:underline">
            Read More Success Stories
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
export default TestimonialsSection;