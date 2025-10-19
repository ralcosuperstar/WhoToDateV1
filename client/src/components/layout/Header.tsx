import { useState } from "react";
import { Link, useLocation } from "wouter";
import MobileMenu from "./MobileMenu";
import { useToast } from "@/hooks/use-toast";
import { useFixedSupabase } from "@/contexts/FixedSupabaseContext"; // Use the fixed Supabase context

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { toast } = useToast();
  const { user, isLoading, signOut } = useFixedSupabase();

  const handleLogout = async () => {
    try {
      // Set loading state immediately to prevent multiple clicks
      // But don't disable button as it causes the "logging out" text to get stuck
      
      console.log("Starting logout process");
      
      // Use Supabase signOut method
      const { error } = await signOut();
      
      if (error) {
        console.error("Logout error from Supabase:", error);
        throw error;
      }
      
      console.log("Logout successful, showing toast");
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      
      // Clear any cached user data in localStorage
      localStorage.removeItem("supabase.auth.token");
      
      // Small delay to allow the auth state to update before redirecting
      setTimeout(() => {
        // Use window.location.replace instead of href to prevent caching issues
        window.location.replace("/");
      }, 300);
      
    } catch (error) {
      console.error("Logout error:", error);
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
    <header className="bg-gradient-to-b from-white to-pink-50 shadow-sm sticky top-0 w-full z-50 border-b border-gray-100 h-16 md:h-[76px]">
      <div className="container mx-auto px-3 sm:px-4 py-4 md:py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#e83a8e' }}>
            <span className="font-heading font-bold text-base text-white">W</span>
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
            className="text-white font-medium px-4 py-1.5 text-sm rounded-full shadow-sm hover:shadow transition-all"
            style={{ backgroundColor: '#e83a8e' }}
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
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Header;
