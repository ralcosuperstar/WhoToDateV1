import { useEffect } from 'react';

/**
 * Higher-order component that automatically scrolls the window to the top
 * when the wrapped component mounts. This ensures that when navigating
 * between pages, the user always starts at the top of the new page.
 *
 * @param Component The component to wrap
 * @returns A new component that scrolls to top on mount
 */
export function withScrollReset<P extends object>(Component: React.ComponentType<P>): React.FC<P> {
  return function WithScrollReset(props: P) {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
    return <Component {...props} />;
  };
}

export default withScrollReset;