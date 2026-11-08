import { DeviceInfo } from '../types';

export function detectDevice(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isIOS: false,
      isAndroid: false,
      isSafari: false,
      isChrome: false,
      isFirefox: false,
      isStandalone: false,
      hasTouch: false,
      userAgent: '',
      screenWidth: 1024,
      screenHeight: 768,
    };
  }

  const ua = navigator.userAgent || '';
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // iOS detection (including iPad on iPadOS 13+ which presents as MacIntel)
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  const isAndroid = /Android/.test(ua);

  // Tablet heuristics
  const isTablet =
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk)/i.test(ua) ||
    (isIOS && Math.min(window.screen.width, window.screen.height) >= 600) ||
    (isAndroid && Math.min(window.screen.width, window.screen.height) >= 600);

  // Mobile heuristics (phone)
  const isMobile =
    !isTablet &&
    (/Mobile|iPhone|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
      (hasTouch && Math.min(window.innerWidth, window.innerHeight) < 768));

  // Browser detection
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isChrome = /Chrome/.test(ua) && /Google Inc/.test(navigator.vendor || '');
  const isFirefox = /Firefox/.test(ua);

  // PWA standalone check
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;

  return {
    isMobile,
    isTablet,
    isIOS,
    isAndroid,
    isSafari,
    isChrome,
    isFirefox,
    isStandalone,
    hasTouch,
    userAgent: ua,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  };
}
