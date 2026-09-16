const GOOGLE_TAG_ID = import.meta.env.VITE_GOOGLE_TAG_ID;
const FACEBOOK_PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID;

type FacebookPixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  push: FacebookPixel;
  queue: unknown[];
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: FacebookPixel;
    _fbq?: FacebookPixel;
  }
}

const appendScript = (id: string, src: string) => {
  if (document.getElementById(id)) return;

  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

const initGoogleTag = () => {
  if (!GOOGLE_TAG_ID) return;

  appendScript('google-tag-manager', `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_TAG_ID);
};

const initFacebookPixel = () => {
  if (!FACEBOOK_PIXEL_ID || window.fbq) return;

  const pixel = function facebookPixel(...args: unknown[]) {
    pixel.callMethod ? pixel.callMethod(...args) : pixel.queue.push(args);
  } as FacebookPixel;

  window.fbq = pixel;
  window._fbq = pixel;
  pixel.push = pixel;
  pixel.loaded = true;
  pixel.version = '2.0';
  pixel.queue = [];

  appendScript('facebook-pixel', 'https://connect.facebook.net/en_US/fbevents.js');

  pixel('init', FACEBOOK_PIXEL_ID);
  pixel('track', 'PageView');
};

export const initTracking = () => {
  if (typeof window === 'undefined') return;

  initGoogleTag();
  initFacebookPixel();
};
