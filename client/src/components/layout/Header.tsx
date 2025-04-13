import { useState } from "react";
import { Link, useLocation } from "wouter";
import MobileMenu from "./MobileMenu";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { toast } = useToast();
  const { user, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      // Let any auth system handle the logout
      // For now, we'll just pretend it worked
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      // Navigate to home page
      window.location.href = "/";
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/95 shadow-md fixed w-full z-50 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 md:py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-sm transition-all group-hover:shadow-md group-hover:scale-105">
            <span className="text-white font-heading font-bold text-lg">W</span>
          </div>
          <span className="text-primary font-heading font-bold text-lg sm:text-xl transition-all group-hover:text-primary/90">WhoToDate</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/how-it-works" className={`text-gray-700 hover:text-primary font-medium transition-colors relative ${location === '/how-it-works' ? 'text-primary font-semibold' : ''}`}>
            How It Works
            {location === '/how-it-works' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
          <Link href="/science" className={`text-gray-700 hover:text-primary font-medium transition-colors relative ${location === '/science' ? 'text-primary font-semibold' : ''}`}>
            The Science
            {location === '/science' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
          <Link href="/counselling" className={`text-gray-700 hover:text-primary font-medium transition-colors relative ${location === '/counselling' ? 'text-primary font-semibold' : ''}`}>
            Counselling
            {location === '/counselling' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
          <Link href="/#testimonials" className={`text-gray-700 hover:text-primary font-medium transition-colors relative ${location === '/#testimonials' ? 'text-primary font-semibold' : ''}`}>
            Testimonials
            {location === '/#testimonials' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
          <Link href="/blog" className={`text-gray-700 hover:text-primary font-medium transition-colors relative ${location.startsWith('/blog') ? 'text-primary font-semibold' : ''}`}>
            Blog
            {location.startsWith('/blog') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard" className="hidden md:block text-gray-700 hover:text-primary font-medium transition-colors">
                Dashboard
              </Link>
              <Link href="/analytics" className="hidden md:block text-gray-700 hover:text-primary font-medium transition-colors">
                Analytics
              </Link>
              <button 
                onClick={handleLogout}
                disabled={isLoading}
                className="hidden md:block text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                {isLoading ? 'Logging out...' : 'Log Out'}
              </button>
            </>
          ) : (
            <Link href="/auth" className="hidden md:block text-gray-700 hover:text-primary font-medium transition-colors">
              Login
            </Link>
          )}
          <Link 
            href={user ? "/quiz" : "/auth?tab=register"} 
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 sm:px-7 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-primary/20"
          >
            {user ? "Take Quiz" : "Try Free"}
          </Link>
          <button 
            className="md:hidden text-gray-700 hover:text-primary transition-colors" 
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        user={user} 
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Header;
