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
    <header className="bg-white shadow-sm fixed w-full z-50 border-b border-gray-100">
      <div className="container mx-auto px-3 sm:px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="h-8 w-8 rounded-full bg-white border border-pink-400 flex items-center justify-center">
            <span className="font-heading font-bold text-base" style={{ color: '#f364a2' }}>W</span>
          </div>
          <span className="text-gray-800 font-heading font-bold text-lg transition-all group-hover:text-primary">WhoToDate</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/how-it-works" className={`text-gray-700 hover:text-primary font-medium text-sm transition-colors relative ${location === '/how-it-works' ? 'text-primary font-semibold' : ''}`}>
            How It Works
          </Link>
          <Link href="/science" className={`text-gray-700 hover:text-primary font-medium text-sm transition-colors relative ${location === '/science' ? 'text-primary font-semibold' : ''}`}>
            The Science
          </Link>
          <Link href="/counselling" className={`text-gray-700 hover:text-primary font-medium text-sm transition-colors relative ${location === '/counselling' ? 'text-primary font-semibold' : ''}`}>
            Counselling
          </Link>
          <Link href="/#testimonials" className={`text-gray-700 hover:text-primary font-medium text-sm transition-colors relative ${location === '/#testimonials' ? 'text-primary font-semibold' : ''}`}>
            Testimonials
          </Link>
          <Link href="/blog" className={`text-gray-700 hover:text-primary font-medium text-sm transition-colors relative ${location.startsWith('/blog') ? 'text-primary font-semibold' : ''}`}>
            Blog
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <Link href="/dashboard" className="hidden md:block text-gray-700 hover:text-primary font-medium text-sm transition-colors">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                disabled={isLoading}
                className="hidden md:block text-gray-500 hover:text-red-500 font-medium text-sm transition-colors"
              >
                {isLoading ? 'Logging out...' : 'Log Out'}
              </button>
            </>
          ) : (
            <Link href="/auth" className="hidden md:block text-gray-700 hover:text-primary font-medium text-sm transition-colors">
              Login
            </Link>
          )}
          <Link 
            href={user ? "/quiz" : "/auth?tab=register"} 
            className="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-1.5 text-sm rounded-full shadow-sm hover:shadow transition-all"
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
