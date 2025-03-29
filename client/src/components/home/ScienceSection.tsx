import { Link } from "wouter";

const ScienceSection = () => {
  return (
    <section className="py-16 bg-neutral-light px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 py-1.5 px-4 bg-blue-500/10 rounded-full">
              <span className="text-blue-500 font-medium text-sm flex items-center justify-center">
                <span className="emoji mr-2">🧬</span> Based on Research
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">The Science Behind MyDate</h2>
            <p className="text-lg mx-auto text-neutral-dark/80 max-w-2xl">
              Our approach is grounded in attachment theory, personality psychology, and relationship science
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10">
                <h3 className="font-heading font-semibold text-2xl mb-4">Compatibility DNA Assessment</h3>
                <p className="text-neutral-dark/80 mb-6">
                  Our proprietary algorithm analyzes 29 dimensions of compatibility, including:
                </p>
                <ul className="space-y-3">
                  {[
                    "Attachment styles and emotional patterns",
                    "Core values and life priorities",
                    "Communication preferences",
                    "Conflict resolution styles",
                    "Cultural compatibility factors"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-0.5 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 md:p-10 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h4 className="font-heading font-semibold text-lg">Research-Backed</h4>
                  </div>
                  <p className="text-neutral-dark/80 mt-2">
                    Based on 40+ years of relationship research and validated psychological models
                  </p>
                </div>
                <div className="mb-6">
                  <div className="inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <h4 className="font-heading font-semibold text-lg">Culturally Sensitive</h4>
                  </div>
                  <p className="text-neutral-dark/80 mt-2">
                    Specifically designed for Indian dating culture and relationship expectations
                  </p>
                </div>
                <div>
                  <div className="inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h4 className="font-heading font-semibold text-lg">Private & Secure</h4>
                  </div>
                  <p className="text-neutral-dark/80 mt-2">
                    Your data is encrypted and never shared with third parties
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScienceSection;