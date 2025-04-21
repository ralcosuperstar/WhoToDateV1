import { SimpleAuthUI } from '@/components/auth/SimpleAuthUI';
import { SimpleAuthProvider } from '@/contexts/SimpleAuthContext';

export default function SimpleAuthPage() {
  return (
    <SimpleAuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#FFD1EC] via-white to-[#FFEFF8] p-4">
        <div className="w-full max-w-screen-xl grid md:grid-cols-2 gap-8 items-center">
          {/* Auth Form */}
          <div className="w-full max-w-md mx-auto">
            <SimpleAuthUI />
          </div>
          
          {/* Hero Section */}
          <div className="hidden md:flex flex-col text-center md:text-left space-y-6 p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e83a8e] to-purple-600">Discover</span> Your Perfect Match
            </h1>
            <p className="text-xl text-gray-600 mt-4">
              Our 5-minute compatibility quiz reveals insights that transform your dating experience
            </p>
            <div className="flex flex-col space-y-4 mt-6">
              <div className="flex items-center space-x-3">
                <div className="bg-[#e83a8e] p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <p className="text-gray-700">Personalized compatibility assessment</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-[#e83a8e] p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <p className="text-gray-700">Science-backed relationship insights</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-[#e83a8e] p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <p className="text-gray-700">Boost your dating confidence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimpleAuthProvider>
  );
}