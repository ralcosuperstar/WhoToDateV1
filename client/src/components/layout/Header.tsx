import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const { data: user } = useQuery({ 
    queryKey: ['/api/me'],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-heading font-bold">M</span>
          </div>
          <span className="text-primary font-heading font-bold text-xl">MyDate</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/#how-it-works" className={`text-neutral-dark hover:text-primary font-medium ${location === '/#how-it-works' ? 'text-primary' : ''}`}>
            How It Works
          </Link>
          <Link href="/#compatibility-science" className={`text-neutral-dark hover:text-primary font-medium ${location === '/#compatibility-science' ? 'text-primary' : ''}`}>
            The Science
          </Link>
          <Link href="/#testimonials" className={`text-neutral-dark hover:text-primary font-medium ${location === '/#testimonials' ? 'text-primary' : ''}`}>
            Testimonials
          </Link>
          <Link href="/blog" className={`text-neutral-dark hover:text-primary font-medium ${location.startsWith('/blog') ? 'text-primary' : ''}`}>
            Blog
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <Link href="/dashboard" className="hidden md:block text-neutral-dark hover:text-primary font-medium">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="hidden md:block text-neutral-dark hover:text-primary font-medium">
              Login
            </Link>
          )}
          <Link href={user ? "/quiz" : "/register"} className="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-lg transition">
            {user ? "Take Quiz" : "Take Quiz"}
          </Link>
          <button 
            className="md:hidden text-neutral-dark" 
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} user={user} />
    </header>
  );
};

export default Header;
