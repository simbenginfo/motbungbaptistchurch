import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, ExternalLink, QrCode as QrIcon, Smartphone, Share2 } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  webappUrl: string;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  webappUrl,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<'current' | 'direct'>('current');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const currentWindowUrl = typeof window !== 'undefined' ? window.location.href : '';
  const targetUrl = selectedTarget === 'current' ? currentWindowUrl : webappUrl;

  useEffect(() => {
    if (!isOpen || !targetUrl) return;

    QRCode.toDataURL(targetUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code', err));
  }, [isOpen, targetUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AppsScript Mobile Portal',
          text: 'Open Google Sheets & AppsScript on mobile or tablet',
          url: targetUrl,
        });
      } catch {
        // user cancelled share
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
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

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <QrIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 id="qr-modal-title" className="text-lg font-semibold tracking-tight">
              Scan to Open on Mobile
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Point your iPhone or Android camera at the code
            </p>
          </div>
        </div>

        {/* Tab switcher for what URL to scan */}
        <div className="flex p-1 mb-5 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => setSelectedTarget('current')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all text-center ${
              selectedTarget === 'current'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Portal (Recommended)
          </button>
          <button
            type="button"
            onClick={() => setSelectedTarget('direct')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all text-center ${
              selectedTarget === 'direct'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Direct Apps Script
          </button>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-5 bg-white rounded-xl border border-slate-200 dark:border-slate-700/60 mb-5 shadow-xs">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Scan QR code with smartphone"
              className="w-56 h-56 object-contain"
            />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-slate-400 text-sm">
              Generating QR code...
            </div>
          )}
          <div className="flex items-center gap-1.5 mt-3 text-slate-600 text-xs font-medium">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>Works with iOS Camera &amp; Android Lens</span>
          </div>
        </div>

        {/* URL box and actions */}
        <div className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl mb-4 text-xs">
          <div className="truncate flex-1 font-mono text-slate-600 dark:text-slate-300 select-all">
            {targetUrl}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleNativeShare}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Link</span>
          </button>

          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>Open in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
