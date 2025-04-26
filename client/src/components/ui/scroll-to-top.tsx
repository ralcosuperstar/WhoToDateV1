import { useScrollTop } from '@/hooks/use-scroll-top';

/**
 * ScrollToTop component that will automatically scroll the window to the top
 * whenever the pathname changes. This should be placed near the top of your
 * component tree, typically just inside your Router.
 */
export const ScrollToTop = () => {
  useScrollTop();
  return null;
};

export default ScrollToTop;