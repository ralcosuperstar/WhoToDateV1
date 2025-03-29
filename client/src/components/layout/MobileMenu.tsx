import { Link } from "wouter";
import * as React from "react";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const MobileMenu = ({ isOpen, onClose, user }: MobileMenuProps) => {
  // Close menu when clicking a link
  const handleLinkClick = () => {
    onClose();
  };

  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white w-full pb-4 px-6 shadow-md border-t border-pink-100">
      <nav className="flex flex-col divide-y divide-gray-100">
        <div className="py-3">
          <span className="text-xs uppercase text-neutral-dark/60 font-medium">Navigate</span>
          <div className="mt-2 grid grid-cols-2 gap-y-2">
            <Link href="/how-it-works" onClick={handleLinkClick} className="flex items-center text-neutral-dark hover:text-primary py-2">
              <span className="emoji mr-2">🧭</span>
              <span>How It Works</span>
            </Link>
            <Link href="/science" onClick={handleLinkClick} className="flex items-center text-neutral-dark hover:text-primary py-2">
              <span className="emoji mr-2">🧠</span>
              <span>The Science</span>
            </Link>
            <Link href="/#testimonials" onClick={handleLinkClick} className="flex items-center text-neutral-dark hover:text-primary py-2">
              <span className="emoji mr-2">💬</span>
              <span>Testimonials</span>
            </Link>
            <Link href="/blog" onClick={handleLinkClick} className="flex items-center text-neutral-dark hover:text-primary py-2">
              <span className="emoji mr-2">📝</span>
              <span>Blog</span>
            </Link>
          </div>
        </div>
        
        <div className="py-3">
          <span className="text-xs uppercase text-neutral-dark/60 font-medium">Account</span>
          <div className="mt-2">
            {user ? (
              <div className="space-y-1">
                <Link href="/dashboard" onClick={handleLinkClick} className="flex items-center text-neutral-dark hover:text-primary py-2">
                  <span className="emoji mr-2">👤</span>
                  <span>Dashboard</span>
                </Link>
                <Link href="/analytics" onClick={handleLinkClick} className="flex items-center text-neutral-dark hover:text-primary py-2">
                  <span className="emoji mr-2">📊</span>
                  <span>Analytics</span>
                </Link>
                <Link href="/quiz" onClick={handleLinkClick} className="bg-primary/10 text-primary w-full flex items-center justify-center py-3 rounded-lg font-medium mt-2">
                  <span className="emoji mr-2">🧪</span>
                  <span>Take Quiz</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <Link href="/login" onClick={handleLinkClick} className="flex items-center text-neutral-dark hover:text-primary py-2">
                  <span className="emoji mr-2">🔑</span>
                  <span>Login</span>
                </Link>
                <Link href="/register" onClick={handleLinkClick} className="bg-primary/10 text-primary w-full flex items-center justify-center py-3 rounded-lg font-medium mt-2">
                  <span className="emoji mr-2">✨</span>
                  <span>Create Account</span>
                </Link>
                <Link href="/quiz" onClick={handleLinkClick} className="bg-primary text-white w-full flex items-center justify-center py-3 rounded-lg font-medium">
                  <span className="emoji mr-2">🧪</span>
                  <span>Take Quiz</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
