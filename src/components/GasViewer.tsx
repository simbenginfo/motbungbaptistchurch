import React, { useState, useEffect, useRef } from 'react';
import { Loader2, ExternalLink, RefreshCw, AlertCircle, ShieldAlert, Sparkles, Database } from 'lucide-react';
import { AppSettings } from '../types';

interface GasViewerProps {
  settings: AppSettings;
  reloadKey: number;
  onOpenSettings: () => void;
  onOpenGuide: () => void;
  isZenMode: boolean;
  onExitZen: () => void;
}

export const GasViewer: React.FC<GasViewerProps> = ({
  settings,
  reloadKey,
  onOpenGuide,
  isZenMode,
  onExitZen,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasTimedOut, setHasTimedOut] = useState<boolean>(false);
  const [iframeError, setIframeError] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Build the effective target URL with query params & cache buster
  const computedUrl = React.useMemo(() => {
    let url = settings.webappUrl;
    const urlParams: string[] = [];

    if (settings.customQueryParams.trim()) {
      urlParams.push(settings.customQueryParams.trim().replace(/^\?/, ''));
    }

    if (settings.useCacheBuster) {
      urlParams.push(`_cb=${Date.now()}`);
    }

    if (urlParams.length > 0) {
      const separator = url.includes('?') ? '&' : '?';
      url += `${separator}${urlParams.join('&')}`;
    }

    return url;
  }, [settings.webappUrl, settings.customQueryParams, settings.useCacheBuster, reloadKey]);

  useEffect(() => {
    setIsLoading(true);
    setHasTimedOut(false);
    setIframeError(false);

    // Google Apps Script can take 2-4s on cold start. If 12s pass, offer immediate troubleshooting tips
    const timer = setTimeout(() => {
      setHasTimedOut(true);
    }, 12000);

    return () => clearTimeout(timer);
  }, [computedUrl, reloadKey]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setIframeError(true);
  };

  return (
    <div className="relative w-full h-full min-h-full bg-slate-950 flex flex-col overflow-hidden">
      {/* Floating Zen Mode exit control */}
      {isZenMode && (
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={onExitZen}
            className="px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-900/90 text-white border border-slate-700/80 shadow-lg backdrop-blur-md hover:bg-slate-800 transition-all flex items-center gap-1.5 active:scale-95"
            title="Exit Zen full-screen mode"
          >
            <span>Exit Fullscreen</span>
          </button>
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && !iframeError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/95 backdrop-blur-sm text-center">
          <div className="relative mb-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Database className="w-7 h-7 animate-pulse text-indigo-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
              <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            </div>
          </div>

          <h3 className="text-base font-semibold text-slate-100">
            Connecting to Google Sheets Backend
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4 leading-relaxed">
            Initializing Motbung Baptist Church records system and verifying Google Apps Script session...
          </p>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800/80 max-w-xs truncate">
            <span>{computedUrl}</span>
          </div>

          {/* If cold start is taking longer than 10s */}
          {hasTimedOut && (
            <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-200 text-xs max-w-md animate-in fade-in">
              <div className="flex items-start gap-2 text-left">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-300">Google Apps Script Cold Start</p>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    Apps Script instances spin down after inactivity and can take up to 15 seconds to wake up.
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <a
                      href={computedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline"
                    >
                      <span>Launch directly in new tab</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      type="button"
                      onClick={onOpenGuide}
                      className="text-xs text-slate-400 hover:text-slate-200"
                    >
                      View Setup Guide
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Explicit Iframe Load Error / Cookie Block Fallback */}
      {iframeError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <h3 className="text-base font-semibold text-slate-100">
            Browser Restricted Inline Frame
          </h3>
          <p className="text-xs text-slate-400 max-w-md mt-1 mb-5 leading-relaxed">
            Safari (iOS) or Chrome third-party cookie restrictions may prevent the Google account login or Apps Script session from rendering inside an iframe.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={computedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-lg shadow-indigo-600/20"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in Direct Window</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setIframeError(false);
                setIsLoading(true);
                if (iframeRef.current) {
                  iframeRef.current.src = computedUrl;
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Frame Load</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Iframe Wrapper with iOS Safari container containment */}
      <div className="gas-frame-wrapper relative flex-1 w-full h-full overflow-hidden ios-scroll">
        <iframe
          ref={iframeRef}
          key={`${computedUrl}-${reloadKey}`}
          src={computedUrl}
          title="Google Apps Script Web App"
          onLoad={handleLoad}
          onError={handleError}
          allow="camera; microphone; geolocation; clipboard-read; clipboard-write; fullscreen; autoplay"
          {...(settings.allowSandbox
            ? {
                sandbox:
                  'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-downloads allow-modals',
              }
            : {})}
          className="w-full h-full min-w-full min-h-full border-0 block"
        />
      </div>

      {/* Subtle bottom helper status in standard view */}
      {!isZenMode && (
        <div className="shrink-0 flex items-center justify-between px-3 py-1.5 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 select-none pb-safe">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate">Google Sheets &amp; Apps Script Backend</span>
            <span className="text-slate-600 dark:text-slate-600">·</span>
            <span className="hidden sm:inline text-slate-500">Touch &amp; Mobile Ready</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={computedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <span>Direct Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
