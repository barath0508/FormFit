import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export function VisualDosAndDonts() {
  return (
    <div className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-4">
      <div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Visual Do&apos;s &amp; Don&apos;ts: Official Photo &amp; Signature Standards
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Follow these biometric framing guidelines to prevent scrutiny rejection during application processing.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Item 1: Correct Framing (DO) */}
        <div className="border border-emerald-200 dark:border-emerald-800/60 rounded-lg p-3 bg-emerald-50/40 dark:bg-emerald-950/20 flex flex-col items-center text-center">
          <div className="w-24 h-28 rounded border-2 border-emerald-500 bg-white relative flex flex-col items-center justify-center overflow-hidden mb-2.5 shadow-sm">
            {/* SVG schematic portrait */}
            <svg viewBox="0 0 100 120" className="w-full h-full text-slate-700">
              <rect width="100" height="120" fill="#FFFFFF" />
              {/* Head */}
              <circle cx="50" cy="45" r="22" fill="#CBD5E1" />
              {/* Eyes */}
              <circle cx="43" cy="42" r="2.5" fill="#334155" />
              <circle cx="57" cy="42" r="2.5" fill="#334155" />
              {/* Neutral mouth */}
              <line x1="45" y1="55" x2="55" y2="55" stroke="#334155" strokeWidth="1.5" />
              {/* Shoulders */}
              <path d="M 20 120 Q 50 78 80 120 Z" fill="#1E40AF" />
            </svg>
            <div className="absolute top-1 right-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 bg-white rounded-full" />
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
            Acceptable Framing
          </span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
            Full face centered, plain light background, neutral expression, both ears visible.
          </p>
        </div>

        {/* Item 2: Glasses Glare / Sunglasses (DON'T) */}
        <div className="border border-red-200 dark:border-red-800/60 rounded-lg p-3 bg-red-50/40 dark:bg-red-950/20 flex flex-col items-center text-center">
          <div className="w-24 h-28 rounded border-2 border-red-400 bg-white relative flex flex-col items-center justify-center overflow-hidden mb-2.5 shadow-sm">
            <svg viewBox="0 0 100 120" className="w-full h-full text-slate-700">
              <rect width="100" height="120" fill="#FFFFFF" />
              <circle cx="50" cy="45" r="22" fill="#CBD5E1" />
              {/* Dark Sunglasses */}
              <rect x="36" y="38" width="13" height="9" rx="2" fill="#0F172A" />
              <rect x="51" y="38" width="13" height="9" rx="2" fill="#0F172A" />
              <line x1="49" y1="42" x2="51" y2="42" stroke="#0F172A" strokeWidth="2" />
              <line x1="45" y1="55" x2="55" y2="55" stroke="#334155" strokeWidth="1.5" />
              <path d="M 20 120 Q 50 78 80 120 Z" fill="#64748B" />
            </svg>
            <div className="absolute top-1 right-1">
              <XCircle className="w-4 h-4 text-red-600 bg-white rounded-full" />
            </div>
          </div>
          <span className="text-xs font-bold text-red-800 dark:text-red-300">
            Rejected: Dark Glasses
          </span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
            Sunglasses, tinted spectacles, or heavy flash glare over eyes are strictly prohibited.
          </p>
        </div>

        {/* Item 3: Dark / Patterned Background (DON'T) */}
        <div className="border border-red-200 dark:border-red-800/60 rounded-lg p-3 bg-red-50/40 dark:bg-red-950/20 flex flex-col items-center text-center">
          <div className="w-24 h-28 rounded border-2 border-red-400 bg-slate-800 relative flex flex-col items-center justify-center overflow-hidden mb-2.5 shadow-sm">
            <svg viewBox="0 0 100 120" className="w-full h-full text-slate-700">
              <rect width="100" height="120" fill="#334155" />
              <circle cx="50" cy="45" r="22" fill="#94A3B8" />
              <circle cx="43" cy="42" r="2" fill="#0F172A" />
              <circle cx="57" cy="42" r="2" fill="#0F172A" />
              <path d="M 20 120 Q 50 78 80 120 Z" fill="#0F172A" />
            </svg>
            <div className="absolute top-1 right-1">
              <XCircle className="w-4 h-4 text-red-600 bg-white rounded-full" />
            </div>
          </div>
          <span className="text-xs font-bold text-red-800 dark:text-red-300">
            Rejected: Dark Background
          </span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
            Background must be clean white or light grey. Do not shoot against patterned curtains or outdoor trees.
          </p>
        </div>

        {/* Item 4: Capital Letters Signature (DON'T) */}
        <div className="border border-red-200 dark:border-red-800/60 rounded-lg p-3 bg-red-50/40 dark:bg-red-950/20 flex flex-col items-center text-center">
          <div className="w-24 h-28 rounded border-2 border-red-400 bg-white relative flex flex-col items-center justify-center overflow-hidden mb-2.5 shadow-sm p-2">
            <div className="font-mono font-bold text-sm text-slate-900 tracking-widest border border-dashed border-red-300 p-1">
              AARAV S
            </div>
            <div className="absolute top-1 right-1">
              <XCircle className="w-4 h-4 text-red-600 bg-white rounded-full" />
            </div>
          </div>
          <span className="text-xs font-bold text-red-800 dark:text-red-300">
            Rejected: Capital Letters
          </span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
            IBPS, SSC, and UPSC strictly reject signatures written in block or CAPITAL letters. Use cursive handwriting.
          </p>
        </div>
      </div>
    </div>
  );
}
