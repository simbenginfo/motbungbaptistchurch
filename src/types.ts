export type ViewportMode = 'responsive' | 'mobile' | 'mobile-large' | 'mobile-compact' | 'tablet-portrait' | 'tablet-landscape';

export interface DevicePreset {
  id: ViewportMode;
  name: string;
  category: 'mobile' | 'tablet' | 'desktop';
  width: number;
  height: number;
  deviceLabel: string;
}

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isSafari: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isStandalone: boolean; // PWA mode
  hasTouch: boolean;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
}

export interface AppSettings {
  webappUrl: string;
  allowSandbox: boolean;
  autoRefreshInterval: number; // 0 for off
  useCacheBuster: boolean;
  customQueryParams: string;
}
