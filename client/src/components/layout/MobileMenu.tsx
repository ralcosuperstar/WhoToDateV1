import { Link } from "wouter";
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
    <div className="md:hidden bg-white w-full pb-4 px-4 shadow-md">
      <nav className="flex flex-col space-y-3">
        <Link href="/#how-it-works" onClick={handleLinkClick} className="text-neutral-dark hover:text-primary py-2">
          How It Works
        </Link>
        <Link href="/#compatibility-science" onClick={handleLinkClick} className="text-neutral-dark hover:text-primary py-2">
          The Science
        </Link>
        <Link href="/#testimonials" onClick={handleLinkClick} className="text-neutral-dark hover:text-primary py-2">
          Testimonials
        </Link>
        <Link href="/blog" onClick={handleLinkClick} className="text-neutral-dark hover:text-primary py-2">
          Blog
        </Link>
        {user ? (
          <>
            <Link href="/dashboard" onClick={handleLinkClick} className="text-neutral-dark hover:text-primary py-2">
              Dashboard
            </Link>
            <Link href="/quiz" onClick={handleLinkClick} className="text-neutral-dark hover:text-primary py-2">
              Take Quiz
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" onClick={handleLinkClick} className="text-neutral-dark hover:text-primary py-2">
              Login
            </Link>
            <Link href="/register" onClick={handleLinkClick} className="text-neutral-dark hover:text-primary py-2">
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
