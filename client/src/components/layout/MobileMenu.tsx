import { Link } from "wouter";
import * as React from "react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from "@/contexts/NewSupabaseContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

const MobileMenu = ({ isOpen, onClose, onLogout }: MobileMenuProps) => {
  const { toast } = useToast();
  const { user, signOut, isLoading } = useSupabase();
  
  // Close menu when clicking a link
  const handleLinkClick = () => {
    onClose();
  };
  
  // Handle dashboard and analytics links with direct navigation
  const handleDashboardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    window.location.href = "/dashboard";
  };
  
  const handleAnalyticsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    window.location.href = "/analytics";
  };
  
  // Handle logout
  const handleLogout = async () => {
    onClose();
    
    try {
      if (onLogout) {
        // Use the provided logout handler if available
        onLogout();
      } else {
        // Otherwise use Supabase's signOut method directly
        const { error } = await signOut();
        
        if (error) {
          throw error;
        }
        
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account",
        });
        
        // Navigate to home page
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
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
    <div className="md:hidden bg-white w-full pb-4 px-6 shadow-md border-t border-gray-100">
      <nav className="flex flex-col divide-y divide-gray-100">
        <div className="py-3">
          <span className="text-xs uppercase text-gray-500 font-medium tracking-wider">Navigate</span>
          <div className="mt-2 grid grid-cols-2 gap-y-2">
            <Link href="/how-it-works" onClick={handleLinkClick} className="flex items-center text-gray-700 hover:text-primary py-2 transition-colors">
              <span className="emoji mr-2">🧭</span>
              <span>How It Works</span>
            </Link>
            <Link href="/science" onClick={handleLinkClick} className="flex items-center text-gray-700 hover:text-primary py-2 transition-colors">
              <span className="emoji mr-2">🧠</span>
              <span>The Science</span>
            </Link>
            <Link href="/counselling" onClick={handleLinkClick} className="flex items-center text-gray-700 hover:text-primary py-2 transition-colors">
              <span className="emoji mr-2">👩‍⚕️</span>
              <span>Counselling</span>
            </Link>
            <Link href="/blog" onClick={handleLinkClick} className="flex items-center text-gray-700 hover:text-primary py-2 transition-colors">
              <span className="emoji mr-2">📝</span>
              <span>Blog</span>
            </Link>
          </div>
        </div>
        
        <div className="py-3">
          <span className="text-xs uppercase text-gray-500 font-medium tracking-wider">Account</span>
          <div className="mt-2">
            {user ? (
              <div className="space-y-2">
                <Link href="/dashboard" onClick={handleDashboardClick} className="flex items-center text-gray-700 hover:text-primary py-2 transition-colors">
                  <span className="emoji mr-2">👤</span>
                  <span>Dashboard</span>
                </Link>
                <Link href="/analytics" onClick={handleAnalyticsClick} className="flex items-center text-gray-700 hover:text-primary py-2 transition-colors">
                  <span className="emoji mr-2">📊</span>
                  <span>Analytics</span>
                </Link>
                <Link href="/quiz" onClick={handleLinkClick} className="bg-slate-900 text-white w-full flex items-center justify-center py-3 rounded-lg font-medium mt-2 transition-colors hover:bg-slate-800 border-2 border-primary/20 shadow-md">
                  <span className="emoji mr-2">🧪</span>
                  <span>Take Quiz</span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-red-500 hover:text-red-600 flex items-center py-2 mt-2 border-t border-gray-100 pt-3 transition-colors"
                >
                  <span className="emoji mr-2">🚪</span>
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link href="/auth?tab=login" onClick={handleLinkClick} className="flex items-center text-gray-700 hover:text-primary py-2 transition-colors">
                  <span className="emoji mr-2">🔑</span>
                  <span>Login</span>
                </Link>
                <Link href="/auth?tab=register" onClick={handleLinkClick} className="bg-slate-200 text-slate-800 w-full flex items-center justify-center py-3 rounded-lg font-medium mt-2 transition-colors hover:bg-slate-300 border border-slate-300">
                  <span className="emoji mr-2">✨</span>
                  <span>Create Account</span>
                </Link>
                <Link href="/auth?tab=register" onClick={handleLinkClick} className="bg-slate-900 text-white w-full flex items-center justify-center py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all hover:bg-slate-800 border-2 border-primary/20">
                  <span className="emoji mr-2">🧪</span>
                  <span>Try Free</span>
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
