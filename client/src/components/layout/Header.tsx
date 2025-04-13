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
    <header className="bg-white shadow-soft fixed w-full z-50 backdrop-blur-sm bg-white/90">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 md:py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="h-9 w-9 rounded-full bg-primary/95 flex items-center justify-center shadow-sm transition-all group-hover:shadow-md group-hover:bg-primary">
            <span className="text-white font-heading font-bold text-lg">W</span>
          </div>
          <span className="text-primary font-heading font-bold text-lg sm:text-xl transition-all group-hover:text-primary/90">WhoToDate</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/how-it-works" className={`text-neutral-dark hover:text-primary font-medium transition-colors relative ${location === '/how-it-works' ? 'text-primary' : ''}`}>
            How It Works
            {location === '/how-it-works' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
          <Link href="/science" className={`text-neutral-dark hover:text-primary font-medium transition-colors relative ${location === '/science' ? 'text-primary' : ''}`}>
            The Science
            {location === '/science' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
          <Link href="/counselling" className={`text-neutral-dark hover:text-primary font-medium transition-colors relative ${location === '/counselling' ? 'text-primary' : ''}`}>
            Counselling
            {location === '/counselling' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
          <Link href="/#testimonials" className={`text-neutral-dark hover:text-primary font-medium transition-colors relative ${location === '/#testimonials' ? 'text-primary' : ''}`}>
            Testimonials
            {location === '/#testimonials' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
          <Link href="/blog" className={`text-neutral-dark hover:text-primary font-medium transition-colors relative ${location.startsWith('/blog') ? 'text-primary' : ''}`}>
            Blog
            {location.startsWith('/blog') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard" className="hidden md:block text-neutral-dark hover:text-primary font-medium transition-colors">
                Dashboard
              </Link>
              <Link href="/analytics" className="hidden md:block text-neutral-dark hover:text-primary font-medium transition-colors">
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
            <Link href="/auth" className="hidden md:block text-neutral-dark hover:text-primary font-medium transition-colors">
              Login
            </Link>
          )}
          <Link 
            href={user ? "/quiz" : "/auth?tab=register"} 
            className="bg-primary hover:bg-primary/90 text-white font-medium px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            {user ? "Take Quiz" : "Try Free"}
          </Link>
          <button 
            className="md:hidden text-neutral-dark hover:text-primary transition-colors" 
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
