import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollToTop component
 * 
 * This component scrolls the window to the top whenever the route changes.
 * Import and add this component to the App.tsx file to apply globally.
 */
export default function ScrollToTop(): null {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}