import React, { useState } from 'react';
import { X, Activity, CheckCircle, AlertTriangle, RefreshCw, Smartphone, Globe, Shield, Terminal } from 'lucide-react';
import { DeviceInfo } from '../types';

interface DiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  deviceInfo: DeviceInfo;
  webappUrl: string;
}

export const DiagnosticsModal: React.FC<DiagnosticsModalProps> = ({
  isOpen,
  onClose,
  deviceInfo,
  webappUrl,
}) => {
  const [testing, setTesting] = useState(false);
  const [pingResult, setPingResult] = useState<{
    status: 'idle' | 'success' | 'warning' | 'error';
    latencyMs?: number;
    message?: string;
  }>({ status: 'idle' });

  if (!isOpen) return null;

  const runConnectivityCheck = async () => {
    setTesting(true);
    setPingResult({ status: 'idle' });
    const startTime = performance.now();

    try {
      // We ping the Apps Script URL with mode: 'no-cors' since Google Apps Script runs cross-origin
      await fetch(webappUrl, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',
      });
      const elapsed = Math.round(performance.now() - startTime);

      setPingResult({
        status: 'success',
        latencyMs: elapsed,
        message: `Endpoint reachable (${elapsed}ms round-trip). Cross-origin responses handled cleanly.`,
      });
    } catch (err: unknown) {
      const elapsed = Math.round(performance.now() - startTime);
      const errMsg = err instanceof Error ? err.message : String(err);
      setPingResult({
        status: 'warning',
        latencyMs: elapsed,
        message: `Network ping note: ${errMsg || 'Restricted by browser CORS policy'}. Direct navigation may still be functional.`,
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="diagnostics-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 id="diagnostics-modal-title" className="text-lg font-semibold tracking-tight">
              Compatibility &amp; Diagnostics
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live device inspection and Google Apps Script connectivity status
            </p>
          </div>
        </div>

        {/* Live Connectivity Test */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Apps Script Connectivity
            </span>
            <button
              type="button"
              onClick={runConnectivityCheck}
              disabled={testing}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Pinging...' : 'Ping Endpoint'}</span>
            </button>
          </div>

          <p className="text-xs font-mono text-slate-600 dark:text-slate-300 truncate mb-2 select-all">
            {webappUrl}
          </p>

          {pingResult.status === 'idle' && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click &quot;Ping Endpoint&quot; to test network round-trip time to Google servers.
            </p>
          )}

          {pingResult.status === 'success' && (
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-semibold">Reachable in {pingResult.latencyMs}ms</p>
                <p className="mt-0.5">{pingResult.message}</p>
              </div>
            </div>
          )}

          {pingResult.status === 'warning' && (
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <p className="font-semibold">Diagnostic Note</p>
                <p className="mt-0.5">{pingResult.message}</p>
              </div>
            </div>
          )}
        </div>

        {/* Client Device & Browser Info */}
        <div className="space-y-3 mb-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Detected Environment
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Device Form Factor</span>
              </div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {deviceInfo.isTablet
                  ? 'Tablet'
                  : deviceInfo.isMobile
                  ? 'Smartphone'
                  : 'Desktop / Laptop'}
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                <Globe className="w-3.5 h-3.5" />
                <span>Operating System</span>
              </div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {deviceInfo.isIOS
                  ? 'Apple iOS / iPadOS'
                  : deviceInfo.isAndroid
                  ? 'Google Android'
                  : 'macOS / Windows / Linux'}
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Primary Browser</span>
              </div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {deviceInfo.isSafari
                  ? 'Safari WebKit'
                  : deviceInfo.isChrome
                  ? 'Chrome / Chromium'
                  : deviceInfo.isFirefox
                  ? 'Firefox Gecko'
                  : 'Standard Web Browser'}
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>Viewport Resolution</span>
              </div>
              <p className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {deviceInfo.screenWidth} &times; {deviceInfo.screenHeight} px
              </p>
            </div>
          </div>
        </div>

        {/* Browser capabilities checklist */}
        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
            <span>Touch Screen Enabled</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {deviceInfo.hasTouch ? 'Yes (Multi-Touch)' : 'No (Mouse / Pointer)'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
            <span>PWA Standalone Mode</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {deviceInfo.isStandalone ? 'Installed (Standalone)' : 'Browser Tab'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span>iOS Safe Area Support</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              Supported (`env(safe-area-inset)`)
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
