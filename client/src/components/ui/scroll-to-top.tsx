import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollToTop component that will automatically scroll the window to the top
 * whenever the pathname changes. This should be placed near the top of your
 * component tree, typically just inside your Router.
 */
export const ScrollToTop = () => {
  const [location] = useLocation();
  
  useEffect(() => {
    // Scroll to top when location (pathname) changes
    window.scrollTo(0, 0);
  }, [location]);
  
  return null; // This component doesn't render anything
};

export default ScrollToTop;