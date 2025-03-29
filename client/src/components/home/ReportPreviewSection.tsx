import { Link } from "wouter";

const ReportPreviewSection = () => {
  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-50 rounded-full -mr-48 -mt-48 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-50 rounded-full -ml-48 -mb-48 opacity-30"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <div className="inline-block mb-3 py-1.5 px-4 bg-purple-500/10 rounded-full">
              <span className="text-purple-600 font-medium text-sm flex items-center">
                <span className="emoji mr-2">📊</span> Comprehensive Insights
              </span>
            </div>

            <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-6">Your Personalized Compatibility Report</h2>

            <p className="text-neutral-dark/80 text-lg mb-8">
              Our in-depth compatibility assessment generates a personalized report that helps you understand your relationship patterns and find truly compatible partners.
            </p>

            <div className="mb-8">
              <h3 className="font-heading font-semibold text-xl mb-4">What's included in your report:</h3>

              <ul className="space-y-3">
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Detailed analysis of your attachment style</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Insights into your emotional patterns and communication style</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Your compatibility color code and what it means for your relationships</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Actionable suggestions for relationship growth and improvement</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Personalized matching criteria for finding compatible partners</span>
                </li>
              </ul>
            </div>

            <button className="px-8 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary-dark transition duration-300">
              Get Your Free Report
            </button>
          </div>

          <div className="relative">
            <div className="bg-white border border-neutral-dark/10 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-5">
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-semibold text-xl">MyDate Compatibility Report</h3>
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Premium</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center mb-8">
                  <div className="mb-4 md:mb-0 md:mr-6">
                    <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-4xl">A+</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-heading font-semibold text-xl mb-1">Secure Connector</h4>
                    <p className="text-neutral-dark/70 mb-2">Your Attachment Style</p>
                    <div className="flex">
                      <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-green-100 text-green-800">Strong Match: Anxious Preoccupied</span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-yellow-100 text-yellow-800">Compatible: Dismissive</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <h5 className="font-medium mb-2 text-sm text-neutral-dark/70">Emotional Intelligence</h5>
                    <div className="w-full bg-neutral-light rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2 text-sm text-neutral-dark/70">Communication Style</h5>
                    <div className="w-full bg-neutral-light rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2 text-sm text-neutral-dark/70">Conflict Resolution</h5>
                    <div className="w-full bg-neutral-light rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-light p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Your Top Values</h5>
                  <div className="flex flex-wrap gap-2">
                    {["Trust", "Honesty", "Emotional Support", "Growth", "Family"].map((value) => (
                      <span key={value} className="text-xs font-medium px-2.5 py-1 rounded bg-white">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-lg bg-yellow-100 -z-10 transform rotate-12"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-lg bg-blue-100 -z-10 transform -rotate-12"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportPreviewSection;