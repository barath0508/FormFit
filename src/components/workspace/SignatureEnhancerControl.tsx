'use client';

import React from 'react';
import { Wand2, Sliders } from 'lucide-react';

export interface SignatureFilterSettings {
  enabled: boolean;
  threshold: number; // 120 to 235, default 185
  preserveBlueInk: boolean;
}

interface SignatureEnhancerControlProps {
  settings: SignatureFilterSettings;
  onChange: (settings: SignatureFilterSettings) => void;
  assetType: 'photo' | 'signature' | 'thumb' | 'document_pdf';
}

export function SignatureEnhancerControl({
  settings,
  onChange,
  assetType,
}: SignatureEnhancerControlProps) {
  const handleToggle = () => {
    onChange({
      ...settings,
      enabled: !settings.enabled,
    });
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5 space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-slate-900 dark:text-white">
            {assetType === 'thumb'
              ? 'Thumb Impression Ink & Contrast Enhancer'
              : 'Smart Signature Paper Whiten & Ink Contrast'}
          </span>
          {settings.enabled && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              Active
            </span>
          )}
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={settings.enabled}
          onClick={handleToggle}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            settings.enabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-600'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              settings.enabled ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {settings.enabled ? (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-3">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Converts grey notebook paper shadows and uneven room lighting into pure #FFFFFF white,
            preventing official rejection for &ldquo;non-white signature background&rdquo;.
          </p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                <span>Paper Whiten Threshold:</span>
              </span>
              <span className="font-mono text-slate-600 dark:text-slate-400 font-semibold">
                {settings.threshold}
              </span>
            </div>
            <input
              type="range"
              min="120"
              max="235"
              step="1"
              value={settings.threshold}
              onChange={(e) =>
                onChange({
                  ...settings,
                  threshold: parseInt(e.target.value, 10),
                })
              }
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              aria-label="Signature Threshold Slider"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>More ink strokes</span>
              <span>Whiter paper background</span>
            </div>
          </div>

          <div className="pt-1">
            <label className="inline-flex items-center gap-2 cursor-pointer text-[11px]">
              <input
                type="checkbox"
                checked={settings.preserveBlueInk}
                onChange={(e) =>
                  onChange({
                    ...settings,
                    preserveBlueInk: e.target.checked,
                  })
                }
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Preserve Natural Blue Ink (keep navy hue instead of pure black)
              </span>
            </label>
          </div>
        </div>
      ) : (
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Disabled. Turn on if your phone camera captured a yellowish or shadowed paper background.
        </p>
      )}
    </div>
  );
}
