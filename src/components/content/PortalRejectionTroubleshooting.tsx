import React from 'react';
import { ExamPortalPreset } from '@/types/preset';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PortalRejectionTroubleshootingProps {
  preset: ExamPortalPreset;
}

export function PortalRejectionTroubleshooting({ preset }: PortalRejectionTroubleshootingProps) {
  const photo = preset.assets.find((a) => a.assetType === 'photo') ?? preset.assets[0];
  const sign = preset.assets.find((a) => a.assetType === 'signature');

  // Fallback items if preset troubleshooting is sparse
  const items = preset.troubleshooting && preset.troubleshooting.length > 0
    ? preset.troubleshooting
    : [
        {
          portalMessage: `Image dimensions outside allowed ${photo?.widthPx}x${photo?.heightPx} px bounds.`,
          cause: 'Mobile crops leave arbitrary floating pixel dimensions which server-side validators reject.',
          solution: `FormFit automatically locks and renders the canvas to exact ${photo?.widthPx} × ${photo?.heightPx} pixels.`,
        },
        {
          portalMessage: `File size out of allowed ${sign ? `${sign.minKB}KB - ${sign.maxKB}KB` : 'specified'} range.`,
          cause: 'High-resolution smartphone photos remain too large or compress excessively below the byte floor.',
          solution: 'Our multi-iteration binary search compressor guarantees output strictly within the required byte window.',
        },
        {
          portalMessage: 'Signature image is blurry or faint.',
          cause: 'Uneven room lighting or phone shadow makes ink strokes faint during thresholding.',
          solution: 'Enable FormFit’s Smart Paper Whitener to boost black ink density and normalize paper to #FFFFFF.',
        },
      ];

  return (
    <section className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Common {preset.shortName} Portal Rejection Messages &amp; Exact Fixes
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Real server error messages encountered on {preset.conductingBody} online forms and the engineering solution implemented in FormFit.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th scope="col" className="px-4 py-3 w-1/3">Portal Error Message</th>
              <th scope="col" className="px-4 py-3 w-1/3">Underlying Technical Cause</th>
              <th scope="col" className="px-4 py-3 w-1/3">FormFit Solution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors">
                <td className="px-4 py-3.5 text-rose-700 dark:text-rose-400 font-mono text-xs">
                  <div className="p-2 rounded bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/50">
                    &ldquo;{item.portalMessage}&rdquo;
                  </div>
                </td>
                <td className="px-4 py-3.5 text-slate-700 dark:text-slate-300">
                  {item.cause}
                </td>
                <td className="px-4 py-3.5 text-emerald-800 dark:text-emerald-300">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item.solution}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
