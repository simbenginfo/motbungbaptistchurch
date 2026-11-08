/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { ViewportMode, DevicePreset, AppSettings, DeviceInfo } from './types';
import { detectDevice } from './utils/deviceDetector';
import { Navbar } from './components/Navbar';
import { GasViewer } from './components/GasViewer';
import { DeviceFrame } from './components/DeviceFrame';
import { QrCodeModal } from './components/QrCodeModal';
import { MobileInstallGuide } from './components/MobileInstallGuide';
import { DiagnosticsModal } from './components/DiagnosticsModal';
import { SettingsDrawer } from './components/SettingsDrawer';

const DEFAULT_WEBAPP_URL =
  'https://script.google.com/macros/s/AKfycbwSAqTx-WK2B6q22ioXNwHwhEG1AeW9RTBqm4SAsBT2cbDVqYcCUD8xwYb80rtGmf0l/exec';

const STORAGE_KEY = 'mbc_appscript_portal_settings_v1';

const PRESETS: Record<ViewportMode, DevicePreset> = {
  responsive: {
    id: 'responsive',
    name: 'Full Responsive Canvas',
    category: 'desktop',
    width: 0,
    height: 0,
    deviceLabel: 'Adaptive Viewport',
  },
  mobile: {
    id: 'mobile',
    name: 'iPhone 16 Pro / Pixel 8',
    category: 'mobile',
    width: 393,
    height: 852,
    deviceLabel: 'Smartphone Standard',
  },
  'mobile-compact': {
    id: 'mobile-compact',
    name: 'iPhone SE / Compact',
    category: 'mobile',
    width: 375,
    height: 667,
    deviceLabel: 'Compact Smartphone',
  },
  'mobile-large': {
    id: 'mobile-large',
    name: 'iPhone Pro Max / Ultra',
    category: 'mobile',
    width: 430,
    height: 932,
    deviceLabel: 'Large Smartphone',
  },
  'tablet-portrait': {
    id: 'tablet-portrait',
    name: 'iPad 10.9" Portrait',
    category: 'tablet',
    width: 820,
    height: 1180,
    deviceLabel: 'Tablet Portrait',
  },
  'tablet-landscape': {
    id: 'tablet-landscape',
    name: 'iPad 10.9" Landscape',
    category: 'tablet',
    width: 1180,
    height: 820,
    deviceLabel: 'Tablet Landscape',
  },
};

export default function App() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => detectDevice());
  const [viewportMode, setViewportMode] = useState<ViewportMode>('responsive');
  const [reloadKey, setReloadKey] = useState<number>(1);
  const [isZenMode, setIsZenMode] = useState<boolean>(false);

  // Modals state
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // App settings state with localStorage persistence
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore JSON parse errors
    }
    return {
      webappUrl: DEFAULT_WEBAPP_URL,
      allowSandbox: false,
      autoRefreshInterval: 0,
      useCacheBuster: false,
      customQueryParams: '',
    };
  });

  // Keep device info updated on resize/rotation
  useEffect(() => {
    const handleResize = () => {
      setDeviceInfo(detectDevice());
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Save settings when changed
  const handleSaveSettings = useCallback((newSettings: AppSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch {
      // storage unavailable
    }
    setReloadKey((k) => k + 1);
  }, []);

  const handleReload = useCallback(() => {
    setReloadKey((k) => k + 1);
  }, []);

  const handleToggleZen = useCallback(() => {
    setIsZenMode((z) => !z);
  }, []);

  // Computed effective full web app URL for direct opening
  const directUrl = useMemo(() => {
    let url = settings.webappUrl;
    if (settings.customQueryParams.trim()) {
      const sep = url.includes('?') ? '&' : '?';
      url += `${sep}${settings.customQueryParams.trim().replace(/^\?/, '')}`;
    }
    return url;
  }, [settings.webappUrl, settings.customQueryParams]);

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Top Bar Navigation (Hidden in Zen / Fullscreen mode) */}
      {!isZenMode && (
        <Navbar
          currentMode={viewportMode}
          onSelectMode={setViewportMode}
          onOpenQr={() => setIsQrOpen(true)}
          onOpenGuide={() => setIsGuideOpen(true)}
          onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onReload={handleReload}
          onToggleZen={handleToggleZen}
          webappUrl={directUrl}
        />
      )}

      {/* Main Viewport Container */}
      <main className="flex-1 w-full h-full relative overflow-hidden flex flex-col">
        {viewportMode === 'responsive' ? (
          <GasViewer
            settings={settings}
            reloadKey={reloadKey}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenGuide={() => setIsGuideOpen(true)}
            isZenMode={isZenMode}
            onExitZen={() => setIsZenMode(false)}
          />
        ) : (
          <DeviceFrame
            mode={viewportMode}
            presets={PRESETS}
          >
            <GasViewer
              settings={settings}
              reloadKey={reloadKey}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenGuide={() => setIsGuideOpen(true)}
              isZenMode={false}
              onExitZen={() => setIsZenMode(false)}
            />
          </DeviceFrame>
        )}
      </main>

      {/* Modals & Dialogs */}
      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        webappUrl={directUrl}
      />

      <MobileInstallGuide
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        webappUrl={directUrl}
      />

      <DiagnosticsModal
        isOpen={isDiagnosticsOpen}
        onClose={() => setIsDiagnosticsOpen(false)}
        deviceInfo={deviceInfo}
        webappUrl={directUrl}
      />

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
        defaultUrl={DEFAULT_WEBAPP_URL}
      />
    </div>
  );
}
