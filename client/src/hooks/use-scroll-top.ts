import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Custom hook that scrolls to the top of the page whenever
 * the current location (pathname) changes
 */
export function useScrollTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
}

export default useScrollTop;