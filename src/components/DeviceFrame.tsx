import React, { useState } from 'react';
import { RotateCw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { ViewportMode, DevicePreset } from '../types';

interface DeviceFrameProps {
  mode: ViewportMode;
  children: React.ReactNode;
  presets: Record<ViewportMode, DevicePreset>;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  mode,
  children,
  presets,
}) => {
  const [isRotated, setIsRotated] = useState(false);
  const [scale, setScale] = useState<number>(1);

  const preset = presets[mode];

  // If responsive mode, render edge-to-edge full width without bezel
  if (mode === 'responsive') {
    return <div className="w-full h-full flex-1 relative overflow-hidden">{children}</div>;
  }

  // Calculate rotated width & height
  const width = isRotated ? preset.height : preset.width;
  const height = isRotated ? preset.width : preset.height;

  const isTablet = preset.category === 'tablet';

  return (
    <div className="w-full h-full flex-1 flex flex-col items-center justify-start bg-slate-900/50 p-4 sm:p-6 overflow-auto">
      {/* Device Toolbar: Rotate, Scale, Dimension info */}
      <div className="shrink-0 flex items-center justify-between gap-4 px-4 py-2 mb-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">{preset.name}</span>
          <span className="text-slate-500">·</span>
          <span className="font-mono text-slate-400 tabular-nums">
            {width} &times; {height} px
          </span>
          {isRotated && (
            <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-800">
              Landscape
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsRotated(!isRotated)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
            title="Rotate Device Orientation"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">Rotate</span>
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          <button
            type="button"
            onClick={() => setScale((s) => Math.max(0.5, Number((s - 0.1).toFixed(1))))}
            disabled={scale <= 0.5}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="font-mono text-[11px] text-slate-400 w-10 text-center tabular-nums">
            {Math.round(scale * 100)}%
          </span>

          <button
            type="button"
            onClick={() => setScale((s) => Math.min(1.2, Number((s + 0.1).toFixed(1))))}
            disabled={scale >= 1.2}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setScale(1)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-[11px]"
            title="Reset to 100%"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div
        className="transition-transform duration-200 origin-top flex items-center justify-center"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <div
          className={`relative bg-slate-950 shadow-2xl transition-all duration-300 ${
            isTablet
              ? 'rounded-[32px] border-[12px] border-slate-800 ring-1 ring-slate-700/50'
              : 'rounded-[48px] border-[10px] border-slate-800 ring-1 ring-slate-700/50'
          }`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          {/* Simulated Dynamic Island / Camera Notch for Phones */}
          {!isTablet && !isRotated && (
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 w-24 h-6 bg-black rounded-full flex items-center justify-end pr-2 gap-1.5 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
            </div>
          )}

          {/* Simulated Tablet Camera */}
          {isTablet && (
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-30 w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
          )}

          {/* Screen Content Wrapper */}
          <div
            className={`w-full h-full overflow-hidden bg-slate-950 ${
              isTablet ? 'rounded-[20px]' : 'rounded-[38px]'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
