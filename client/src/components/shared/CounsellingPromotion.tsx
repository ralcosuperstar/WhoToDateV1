import React from "react";
import { Link } from "wouter";
import { Heart, Users, Clock, ChevronRight, BadgeCheck } from "lucide-react";
import aanchalImg from "@/assets/Aanchal.jpg";

interface CounsellingPromotionProps {
  variant?: 'default' | 'compact' | 'full';
  className?: string;
}

const CounsellingPromotion: React.FC<CounsellingPromotionProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-[#fcf1f7] to-[#fff4f9] rounded-2xl overflow-hidden shadow-sm ${className}`}>
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-start gap-6">
          <div className="md:w-3/5">
            <h3 className="text-xl md:text-2xl font-heading font-bold text-gray-800 mb-3">
              Talk to Someone Who Gets It
            </h3>
            <p className="text-gray-600 mb-4">
              Whether you're feeling stuck, overwhelmed, or need guidance on relationship issues, 
              our verified counselors are here to help you find clarity and emotional balance.
            </p>
            <div className="flex flex-wrap gap-3 mb-5">
              <div className="inline-flex items-center text-xs font-medium text-gray-700 bg-white px-3 py-1.5 rounded-full shadow-sm">
                <Users className="h-3.5 w-3.5 text-primary mr-1.5" />
                Psychology-Based Counselors
              </div>
              <div className="inline-flex items-center text-xs font-medium text-gray-700 bg-white px-3 py-1.5 rounded-full shadow-sm">
                <Clock className="h-3.5 w-3.5 text-primary mr-1.5" />
                Quick Medical Listeners
              </div>
            </div>
            <Link href="/counselling" className="inline-flex items-center text-white font-medium px-4 py-2 text-sm rounded-lg shadow-sm hover:opacity-90 transition-all" style={{ backgroundColor: '#e83a8e' }}>
              Explore Counseling Options
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="flex flex-col items-center md:items-end mt-2 md:mt-0 self-center md:self-start">
            <div className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-sm mb-3 text-sm">
              <BadgeCheck className="h-4 w-4 mr-1.5" />
              <span className="font-medium">Verified Professionals</span>
            </div>
            
            <div className="w-28 h-28 overflow-hidden rounded-full border-4 border-white shadow-md">
              <img 
                src={aanchalImg} 
                alt="Professional Counselor" 
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'full') {
    return (
      <section className={`py-16 overflow-hidden ${className}`}>
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-[#FFF9FB] via-[#FFF0F6] to-[#FAE3EF] rounded-3xl overflow-hidden relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full translate-x-1/3 -translate-y-1/3 opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100 rounded-full -translate-x-1/3 translate-y-1/3 opacity-70"></div>
            
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="md:w-3/5">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-800 mb-4">
                  <span className="text-primary">Talk to Someone</span> Who Gets It
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Modern relationships can be confusing, overwhelming, and sometimes even painful. 
                  Whether you're stuck in overthinking, fresh out of a breakup, or feeling physically 
                  drained from emotional stress — you don't have to go through it alone.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/80 p-4 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                      </div>
                      <h3 className="font-heading font-semibold text-gray-800">Psychology-Based Counselors</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Trained professionals with Psychology degrees for deep emotional support and guidance.
                    </p>
                  </div>
                  
                  <div className="bg-white/80 p-4 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <h3 className="font-heading font-semibold text-gray-800">Medical Graduate Listeners</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      First responders for emotional emergencies when you need immediate support.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="/counselling" className="inline-flex items-center text-white font-medium px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-all" style={{ backgroundColor: '#e83a8e' }}>
                    Explore Counselors
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </Link>
                  <Link href="/counselling#how-it-works" className="inline-flex items-center bg-white text-gray-700 border border-gray-200 font-medium px-6 py-3 text-base rounded-lg shadow-sm hover:bg-gray-50 transition-all">
                    Learn How It Works
                  </Link>
                </div>
              </div>
              
              <div className="md:w-2/5 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-2 bg-white rounded-full shadow-md"></div>
                  <div className="absolute inset-0 overflow-hidden rounded-full border-8 border-white shadow-lg z-10">
                    <img 
                      src={aanchalImg} 
                      alt="Professional Counselor" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full shadow-lg p-4 z-20">
                    <Heart className="text-primary h-6 w-6" />
                  </div>
                  <div className="absolute -top-3 -left-3 bg-blue-600 rounded-full shadow-lg px-3 py-1.5 z-20 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white mr-1">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    <span className="text-white text-xs font-semibold">Verified Professionals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  // Default variant
  return (
    <div className={`bg-gradient-to-br from-[#FFF9FB] via-[#FFF0F6] to-[#FAE3EF] rounded-2xl overflow-hidden shadow-md ${className}`}>
      <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/3 flex justify-center md:justify-start order-1 md:order-none">
          <div className="relative w-48 h-48 md:w-56 md:h-56">
            <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-white shadow-lg">
              <img 
                src={aanchalImg} 
                alt="Professional Counselor" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-3 -right-3 bg-blue-600 rounded-lg shadow-lg px-3 py-1.5 z-10 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white mr-1">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
              <span className="text-white text-xs font-semibold">Verified Professionals</span>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-gray-800 mb-3">
            Talk to Someone Who Gets It
          </h3>
          
          <p className="text-gray-600 mb-6">
            Modern relationships can be confusing and sometimes painful. Whether you're stuck in 
            overthinking, fresh out of a breakup, or feeling emotionally drained — our verified
            counselors are here to help you find clarity and peace of mind.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="inline-flex items-center font-medium text-gray-700 bg-white/80 px-3 py-2 rounded-lg shadow-sm">
              <Users className="h-4 w-4 text-primary mr-2" />
              Psychology-Based Counselors
            </div>
            <div className="inline-flex items-center font-medium text-gray-700 bg-white/80 px-3 py-2 rounded-lg shadow-sm">
              <Clock className="h-4 w-4 text-primary mr-2" />
              Medical Graduate Listeners
            </div>
          </div>
          
          <Link href="/counselling" className="inline-flex items-center text-white font-medium px-5 py-2.5 text-sm rounded-lg shadow-md hover:shadow-lg transition-all" style={{ backgroundColor: '#e83a8e' }}>
            Explore Counseling Options
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CounsellingPromotion;