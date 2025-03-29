import { Link } from "wouter";

const ScienceSection = () => {
  return (
    <section className="py-16 px-4" id="compatibility-science">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl mb-4">The Science Behind Our Compatibility Assessment</h2>
          <p className="max-w-2xl mx-auto text-neutral-dark/80">Our methodology combines established psychological frameworks to provide a comprehensive understanding of your relationship compatibility.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-5">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-xl ml-4">Big Five Personality Traits</h3>
            </div>
            
            <p className="mb-4">The scientifically validated OCEAN model measures your personality across five dimensions:</p>
            
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-28 font-medium">Openness</span>
                <div className="h-2 flex-1 bg-neutral-dark/10 rounded-full mx-3">
                  <div className="h-full w-3/4 bg-primary rounded-full"></div>
                </div>
                <span className="text-sm">75%</span>
              </li>
              <li className="flex items-center">
                <span className="w-28 font-medium">Conscientiousness</span>
                <div className="h-2 flex-1 bg-neutral-dark/10 rounded-full mx-3">
                  <div className="h-full w-4/5 bg-primary rounded-full"></div>
                </div>
                <span className="text-sm">80%</span>
              </li>
              <li className="flex items-center">
                <span className="w-28 font-medium">Extraversion</span>
                <div className="h-2 flex-1 bg-neutral-dark/10 rounded-full mx-3">
                  <div className="h-full w-1/2 bg-primary rounded-full"></div>
                </div>
                <span className="text-sm">50%</span>
              </li>
              <li className="flex items-center">
                <span className="w-28 font-medium">Agreeableness</span>
                <div className="h-2 flex-1 bg-neutral-dark/10 rounded-full mx-3">
                  <div className="h-full w-2/3 bg-primary rounded-full"></div>
                </div>
                <span className="text-sm">66%</span>
              </li>
              <li className="flex items-center">
                <span className="w-28 font-medium">Neuroticism</span>
                <div className="h-2 flex-1 bg-neutral-dark/10 rounded-full mx-3">
                  <div className="h-full w-1/3 bg-primary rounded-full"></div>
                </div>
                <span className="text-sm">33%</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-5">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-xl ml-4">Attachment Styles</h3>
            </div>
            
            <p className="mb-4">Your attachment style influences how you connect with partners emotionally:</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-neutral-dark/10 rounded-lg p-4 bg-primary/5 relative">
                <div className="absolute -top-3 -right-3 bg-primary text-white text-xs py-1 px-2 rounded-full">
                  Your Style
                </div>
                <h4 className="font-heading font-semibold mb-2">Secure</h4>
                <p className="text-sm">You're comfortable with intimacy and independence. You trust others and communicate openly.</p>
              </div>
              
              <div className="border border-neutral-dark/10 rounded-lg p-4">
                <h4 className="font-heading font-semibold mb-2">Anxious</h4>
                <p className="text-sm">Worry about rejection and abandonment. Seek reassurance and closeness.</p>
              </div>
              
              <div className="border border-neutral-dark/10 rounded-lg p-4">
                <h4 className="font-heading font-semibold mb-2">Avoidant</h4>
                <p className="text-sm">Value independence and self-sufficiency. May struggle with emotional intimacy.</p>
              </div>
              
              <div className="border border-neutral-dark/10 rounded-lg p-4">
                <h4 className="font-heading font-semibold mb-2">Fearful</h4>
                <p className="text-sm">Combination of anxious and avoidant traits. Desire but also fear close relationships.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-5">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-xl ml-4">Myers-Briggs Type</h3>
            </div>
            
            <p className="mb-4">The MBTI framework helps identify your cognitive preferences and communication style:</p>
            
            <div className="flex flex-wrap">
              <div className="w-1/2 mb-4 pr-2">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Introversion</span>
                  <span className="font-medium">Extraversion</span>
                </div>
                <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                  <div className="h-full w-1/3 bg-primary rounded-full"></div>
                </div>
              </div>
              
              <div className="w-1/2 mb-4 pl-2">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Sensing</span>
                  <span className="font-medium">Intuition</span>
                </div>
                <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                  <div className="h-full w-2/3 bg-primary rounded-full"></div>
                </div>
              </div>
              
              <div className="w-1/2 mb-4 pr-2">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Thinking</span>
                  <span className="font-medium">Feeling</span>
                </div>
                <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                  <div className="h-full w-4/5 bg-primary rounded-full"></div>
                </div>
              </div>
              
              <div className="w-1/2 mb-4 pl-2">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Judging</span>
                  <span className="font-medium">Perceiving</span>
                </div>
                <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                  <div className="h-full w-2/5 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-4 mt-2">
              <div className="flex items-center mb-2">
                <span className="text-primary font-heading font-bold text-xl">INFJ</span>
                <span className="ml-3 text-neutral-dark/80">The Advocate</span>
              </div>
              <p className="text-sm">Idealistic, principled, and sensitive. You seek meaningful connections and value deep, authentic relationships.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-5">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-xl ml-4">Emotional Intelligence</h3>
            </div>
            
            <p className="mb-4">EQ is crucial for relationship success. Your emotional intelligence profile:</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Self-Awareness</span>
                  <span>85%</span>
                </div>
                <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                  <div className="h-full w-[85%] bg-primary rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Self-Regulation</span>
                  <span>70%</span>
                </div>
                <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                  <div className="h-full w-[70%] bg-primary rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Motivation</span>
                  <span>90%</span>
                </div>
                <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                  <div className="h-full w-[90%] bg-primary rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Empathy</span>
                  <span>80%</span>
                </div>
                <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                  <div className="h-full w-[80%] bg-primary rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Social Skills</span>
                  <span>75%</span>
                </div>
                <div className="h-2 w-full bg-neutral-dark/10 rounded-full">
                  <div className="h-full w-[75%] bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-neutral-dark/80">
              <p>Your high emotional intelligence helps you navigate relationship challenges and communicate effectively.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/quiz" className="inline-block bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition">
            Take the Assessment Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ScienceSection;
