'use client';

import React, { useState } from 'react';
import { AssetSpec } from '@/types/preset';
import { Sliders, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

interface CustomSpecOverrideDrawerProps {
  currentSpec: AssetSpec;
  onUpdateSpec: (updated: AssetSpec) => void;
  onResetToDefault: () => void;
  isModified: boolean;
}

export function CustomSpecOverrideDrawer({
  currentSpec,
  onUpdateSpec,
  onResetToDefault,
  isModified,
}: CustomSpecOverrideDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (field: keyof AssetSpec, val: any) => {
    onUpdateSpec({
      ...currentSpec,
      [field]: val,
    });
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden transition-all text-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Customize Dimensions &amp; KB Limits (Override Spec)
          </span>
          {isModified && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-medium">
              Modified
            </span>
          )}
        </div>
        <div className="text-slate-400">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
            Adjust target pixels, file size boundary, or DPI if your specific recruitment notification differs.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label htmlFor="custom-width" className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                Width (Pixels)
              </label>
              <input
                id="custom-width"
                type="number"
                min="50"
                max="4000"
                value={currentSpec.widthPx}
                onChange={(e) => handleChange('widthPx', Math.max(10, parseInt(e.target.value) || 10))}
                className="w-full px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label htmlFor="custom-height" className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                Height (Pixels)
              </label>
              <input
                id="custom-height"
                type="number"
                min="50"
                max="4000"
                value={currentSpec.heightPx}
                onChange={(e) => handleChange('heightPx', Math.max(10, parseInt(e.target.value) || 10))}
                className="w-full px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label htmlFor="custom-min-kb" className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                Min Size (KB Floor)
              </label>
              <input
                id="custom-min-kb"
                type="number"
                min="1"
                max="2000"
                value={currentSpec.minKB}
                onChange={(e) => handleChange('minKB', Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label htmlFor="custom-max-kb" className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                Max Size (KB Ceiling)
              </label>
              <input
                id="custom-max-kb"
                type="number"
                min="2"
                max="5000"
                value={currentSpec.maxKB}
                onChange={(e) => handleChange('maxKB', Math.max(currentSpec.minKB + 1, parseInt(e.target.value) || 2))}
                className="w-full px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Target DPI:</span>
              <select
                value={currentSpec.dpi}
                onChange={(e) => handleChange('dpi', parseInt(e.target.value))}
                className="px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-xs font-mono"
              >
                <option value={200}>200 DPI (Standard Govt / NSDL)</option>
                <option value={300}>300 DPI (High Res / UTIITSL)</option>
                <option value={150}>150 DPI (CAT / Standard)</option>
                <option value={600}>600 DPI (Ultra Detail)</option>
                <option value={96}>96 DPI (Web Default)</option>
              </select>
            </div>

            {isModified && (
              <button
                type="button"
                onClick={onResetToDefault}
                className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Official Specs</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
