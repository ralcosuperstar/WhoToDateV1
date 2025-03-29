import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

const CTASection = () => {
  const { data: user } = useQuery({ 
    queryKey: ['/api/me'],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  const ctaLink = user ? "/quiz" : "/register";
  
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="bg-primary rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 text-white">
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Start Your Compatibility Journey Today
              </h2>
              <p className="mb-6 opacity-90">
                Discover your relationship patterns and preferences with our scientifically-backed assessment. 
                Take the first step toward finding meaningful connections.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-5 h-5 mr-3 mt-0.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Fun, engaging 15-minute assessment</span>
                </li>
                <li className="flex items-start">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-5 h-5 mr-3 mt-0.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Comprehensive 20+ page report</span>
                </li>
                <li className="flex items-start">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-5 h-5 mr-3 mt-0.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Culturally relevant insights for Indian relationships</span>
                </li>
              </ul>
              
              <Link 
                href={ctaLink} 
                className="inline-block bg-white text-primary font-medium px-6 py-3 rounded-lg hover:bg-neutral-light transition"
              >
                Take the Free Assessment Now
              </Link>
            </div>
            
            <div className="md:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1602522833512-5356a3e6acb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80" 
                alt="Happy couple using MyDate" 
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-md p-4">
                <div className="flex space-x-3">
                  <div className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 text-sm rounded-full font-medium flex items-center">
                    <span className="h-2 w-2 bg-emerald-500 rounded-full mr-1"></span>
                    Green
                  </div>
                  <div className="px-3 py-1.5 bg-amber-500/10 text-amber-500 text-sm rounded-full font-medium flex items-center">
                    <span className="h-2 w-2 bg-amber-500 rounded-full mr-1"></span>
                    Yellow
                  </div>
                  <div className="px-3 py-1.5 bg-red-500/10 text-red-500 text-sm rounded-full font-medium flex items-center">
                    <span className="h-2 w-2 bg-red-500 rounded-full mr-1"></span>
                    Red
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
