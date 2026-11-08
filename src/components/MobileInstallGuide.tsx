import React, { useState } from 'react';
import { X, Apple, CheckCircle2, ShieldAlert, ArrowUpRight, PlusSquare, MoreVertical, Share } from 'lucide-react';

interface MobileInstallGuideProps {
  isOpen: boolean;
  onClose: () => void;
  webappUrl: string;
}

export const MobileInstallGuide: React.FC<MobileInstallGuideProps> = ({
  isOpen,
  onClose,
  webappUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'ios' | 'android' | 'browser-tips'>('ios');

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <h2 id="pwa-guide-title" className="text-xl font-bold tracking-tight">
            Mobile &amp; Tablet Setup Guide
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Install this portal to your home screen for full-screen native performance on iOS &amp; Android.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex p-1 mb-6 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'ios'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            <span>iOS / iPad (Safari)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'android'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1.0001s.4482-.9997.9993-.9997c.5516 0 .9997.4482.9997.9997 0 .5515-.4481 1.0001-.9997 1.0001m-11.046 0c-.5511 0-.9993-.4486-.9993-1.0001s.4482-.9997.9993-.9997c.5516 0 .9997.4482.9997.9997 0 .5515-.4481 1.0001-.9997 1.0001m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8.1 12 8.1s-3.5902.3116-5.1368.8497L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.775h24c-.3432-4.1161-2.6889-7.5883-6.1185-9.4536" />
            </svg>
            <span>Android (Chrome)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('browser-tips')}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'browser-tips'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span>Cross-Browser Tips</span>
          </button>
        </div>

        {/* Tab 1: iOS */}
        {activeTab === 'ios' && (
          <div className="space-y-4 text-sm">
            <div className="flex gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0 font-bold text-xs">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  Open this link in Safari
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Apple requires Safari to install Web Apps to the iPhone / iPad home screen.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0 font-bold text-xs">
                2
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-slate-100">
                  <span>Tap the Share button</span>
                  <Share className="w-4 h-4 text-blue-500 inline" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Located in the bottom navigation bar on iPhone, or top-right on iPad.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0 font-bold text-xs">
                3
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-slate-100">
                  <span>Scroll down &amp; tap &quot;Add to Home Screen&quot;</span>
                  <PlusSquare className="w-4 h-4 text-slate-700 dark:text-slate-300 inline" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Confirm the name and tap &quot;Add&quot; in the upper-right corner.
                </p>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>
                Launches without Safari address bars and gives you 100% full screen view!
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Android */}
        {activeTab === 'android' && (
          <div className="space-y-4 text-sm">
            <div className="flex gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  Open in Chrome or Samsung Internet
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Compatible with all modern Android browsers on phones and tablets.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">
                2
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-slate-100">
                  <span>Tap the Browser Menu (3 dots)</span>
                  <MoreVertical className="w-4 h-4 text-slate-600 inline" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Located in the top-right corner of Chrome.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">
                3
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  Select &quot;Install app&quot; or &quot;Add to Home screen&quot;
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  The app icon will be pinned to your Android apps drawer and home screen.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Browser Tips & Apps Script Gotchas */}
        {activeTab === 'browser-tips' && (
          <div className="space-y-3.5 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-1">
                Google Apps Script Deployment Checklist
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                For the backend to load seamlessly across all devices without requiring individual Google logins:
              </p>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li>
                  <strong>Execute as:</strong> Set to <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">Me (your email)</code> so non-Google users can submit records.
                </li>
                <li>
                  <strong>Who has access:</strong> Set to <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">Anyone</code> so visitors aren&apos;t blocked with 403 Forbidden.
                </li>
                <li>
                  <strong>X-Frame-Options:</strong> In your <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">doGet()</code> function in Apps Script, ensure you have:
                  <div className="mt-1 font-mono text-[11px] p-2 bg-slate-900 text-slate-100 rounded-md overflow-x-auto">
                    return HtmlService.createHtmlOutputFromFile(&apos;index&apos;)<br />
                    &nbsp;&nbsp;.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl text-amber-900 dark:text-amber-300">
              <h4 className="font-semibold text-sm mb-1 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Safari Intelligent Tracking Prevention (ITP)</span>
              </h4>
              <p className="leading-relaxed">
                If iOS Safari blocks embedded Google sessions inside iframes due to third-party cookie restrictions, use the <strong>&quot;Open Direct App&quot;</strong> button in the top bar. It launches the Google Apps Script directly in Safari with zero cookie restrictions.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <a
            href={webappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>Launch Direct Web App</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
