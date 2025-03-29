// Initialize and manage analytics services (Google Analytics and Meta Pixel)

// Google Analytics 4 implementation
export const initGoogleAnalytics = () => {
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-MEASUREMENT_ID';
  
  // Skip in development environment
  if (import.meta.env.DEV) {
    console.log('Google Analytics skipped in development mode');
    return;
  }
  
  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  
  // Initialize GA4
  window.dataLayer = window.dataLayer || [];
  
  function gtag(...args: any[]) {
    window.dataLayer.push(arguments);
  }
  
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false // We'll handle page views manually
  });
  
  // Expose gtag function globally
  window.gtag = gtag;
  
  console.log('Google Analytics initialized');
};

// Meta Pixel implementation
export const initMetaPixel = () => {
  const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || 'PIXEL_ID';
  
  // Skip in development environment
  if (import.meta.env.DEV) {
    console.log('Meta Pixel skipped in development mode');
    return;
  }
  
  // Initialize Meta Pixel
  const initFbPixel = function() {
    const f = window as any;
    const b = document;
    // Check if fbq already exists and is a function
    if (f.fbq && typeof f.fbq === 'function') return;
    const fbq = function(this: any) {
      // @ts-ignore
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    if (!f.fbq) f.fbq = fbq;
    // @ts-ignore
    fbq.push = fbq;
    // @ts-ignore
    fbq.loaded = true;
    // @ts-ignore
    fbq.version = '2.0';
    // @ts-ignore
    fbq.queue = [];
    const t = b.createElement('script');
    t.async = true;
    t.src = 'https://connect.facebook.net/en_US/fbevents.js';
    const s = b.getElementsByTagName('script')[0];
    if (s && s.parentNode) s.parentNode.insertBefore(t, s);
  };
  
  initFbPixel();
  
  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');
  
  console.log('Meta Pixel initialized');
};

// Track page views
export const trackPageView = (path: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
  }
  
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Track events
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
  
  if (window.fbq) {
    window.fbq('track', eventName, params);
  }
};

// Initialize all analytics services
export const initAnalytics = () => {
  initGoogleAnalytics();
  initMetaPixel();
  
  // Track initial page view
  trackPageView(window.location.pathname);
};

// Augment window interface to make TypeScript happy
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}
