import React from 'react';
import {
  ExternalLink,
  Smartphone,
  Tablet,
  Monitor,
  QrCode,
  HelpCircle,
  Activity,
  Settings,
  RefreshCw,
  Maximize2,
} from 'lucide-react';
import { ViewportMode } from '../types';

interface NavbarProps {
  currentMode: ViewportMode;
  onSelectMode: (mode: ViewportMode) => void;
  onOpenQr: () => void;
  onOpenGuide: () => void;
  onOpenDiagnostics: () => void;
  onOpenSettings: () => void;
  onReload: () => void;
  onToggleZen: () => void;
  webappUrl: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  onOpenQr,
  onOpenGuide,
  onOpenDiagnostics,
  onOpenSettings,
  onReload,
  onToggleZen,
  webappUrl,
}) => {
  return (
    <header className="shrink-0 h-14 w-full bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 lg:gap-8 z-30 pt-safe select-none">
      {/* Zone 1: Brand Title (Single line wordmark) */}
      <div className="flex items-center gap-2 shrink-0">
        <a
          href="/"
          className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap hover:text-indigo-400 transition-colors"
        >
          AppsScript Portal
        </a>
      </div>

      {/* Zone 2: Navigation Links / Viewport Modes */}
      <nav className="flex items-center gap-1 sm:gap-2 text-xs font-medium overflow-x-auto no-scrollbar">
        {/* Device Viewport Selector */}
        <div className="flex items-center p-0.5 bg-slate-800/80 rounded-lg border border-slate-700/60 shrink-0">
          <button
            type="button"
            onClick={() => onSelectMode('responsive')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
              currentMode === 'responsive'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Full Width Responsive"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Full</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
              currentMode === 'mobile' || currentMode === 'mobile-large'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('tablet-portrait')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
              currentMode.startsWith('tablet')
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>
        </div>

        {/* Action triggers */}
        <button
          type="button"
          onClick={onOpenQr}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
          title="Scan QR Code to open on mobile"
        >
          <QrCode className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden lg:inline">QR Scan</span>
        </button>

        <button
          type="button"
          onClick={onOpenGuide}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
          title="Mobile & Tablet Setup Guide"
        >
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden lg:inline">Install Guide</span>
        </button>

        <button
          type="button"
          onClick={onOpenDiagnostics}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
          title="System Diagnostics & Ping"
        >
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden xl:inline">Diagnostics</span>
        </button>
      </nav>

      {/* Zone 3: Primary Action & Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button
          type="button"
          onClick={onReload}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Reload Apps Script Frame"
          aria-label="Reload"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onToggleZen}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:flex"
          title="Zen Mode / Hide Bar"
          aria-label="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onOpenSettings}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Portal Settings"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        <a
          href={webappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors whitespace-nowrap shadow-xs"
        >
          <span>Open Direct</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
};
