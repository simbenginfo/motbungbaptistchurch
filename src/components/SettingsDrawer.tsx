import React, { useState } from 'react';
import { X, Settings2, RotateCcw, Save, ShieldCheck } from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSave: (newSettings: AppSettings) => void;
  defaultUrl: string;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
  defaultUrl,
}) => {
  const [formData, setFormData] = useState<AppSettings>(settings);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    const resetSettings: AppSettings = {
      webappUrl: defaultUrl,
      allowSandbox: false, // Apps Script standard works best without strict restriction
      autoRefreshInterval: 0,
      useCacheBuster: false,
      customQueryParams: '',
    };
    setFormData(resetSettings);
    onSave(resetSettings);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-drawer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
            <Settings2 className="w-5 h-5" />
          </div>
          <div>
            <h2 id="settings-drawer-title" className="text-lg font-semibold tracking-tight">
              Portal Settings
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure Google Apps Script endpoint &amp; frame parameters
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              Google Apps Script Web App URL
            </label>
            <input
              type="url"
              required
              value={formData.webappUrl}
              onChange={(e) => setFormData({ ...formData, webappUrl: e.target.value })}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Must end with <code className="text-slate-600 dark:text-slate-300">/exec</code>.
            </p>
          </div>

          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              Custom Query Parameters (Optional)
            </label>
            <input
              type="text"
              value={formData.customQueryParams}
              onChange={(e) => setFormData({ ...formData, customQueryParams: e.target.value })}
              placeholder="e.g. page=records&area=Motbung"
              className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Appended to the web app URL upon loading.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.useCacheBuster}
                onChange={(e) => setFormData({ ...formData, useCacheBuster: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  Force Cache Busting
                </span>
                <p className="text-[11px] text-slate-400">
                  Appends a timestamp to reload fresh Apps Script code after republishing.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowSandbox}
                onChange={(e) => setFormData({ ...formData, allowSandbox: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    Apply Strict Iframe Sandbox
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Default is unchecked to allow Google account sign-in cookies and file downloads.
                </p>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-medium text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save &amp; Reload</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
