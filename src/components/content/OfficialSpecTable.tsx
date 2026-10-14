import React from 'react';
import { AssetSpec } from '@/types/preset';
import { Check, Info } from 'lucide-react';

interface OfficialSpecTableProps {
  assets: AssetSpec[];
  portalFullName: string;
  conductingBody: string;
  notificationRef: string;
  lastVerifiedDate: string;
}

export function OfficialSpecTable({
  assets,
  portalFullName,
  conductingBody,
  notificationRef,
  lastVerifiedDate,
}: OfficialSpecTableProps) {
  return (
    <div className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Official Upload Specifications Matrix
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Verified directly from {conductingBody} Official Notification ({notificationRef})
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 shrink-0">
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verified: {lastVerifiedDate}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th scope="col" className="px-4 py-3">Deliverable</th>
              <th scope="col" className="px-4 py-3">Pixel Dimensions</th>
              <th scope="col" className="px-4 py-3">Physical Size (cm)</th>
              <th scope="col" className="px-4 py-3">File Size (KB Window)</th>
              <th scope="col" className="px-4 py-3">Resolution (DPI)</th>
              <th scope="col" className="px-4 py-3">Background &amp; Ink Rules</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
            {assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors">
                <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                  {asset.label}
                  {asset.requiresNameAndDate === 'mandatory' && (
                    <span className="block mt-1 text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
                      • Mandatory Name &amp; Date Plaque
                    </span>
                  )}
                </td>
                <td className="px-4 py-3.5 font-mono text-slate-700 dark:text-slate-300">
                  {asset.widthPx} × {asset.heightPx} px
                </td>
                <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">
                  {asset.widthCm} × {asset.heightCm} cm
                </td>
                <td className="px-4 py-3.5 font-mono font-semibold text-blue-700 dark:text-blue-400">
                  {asset.minKB} KB – {asset.maxKB} KB
                </td>
                <td className="px-4 py-3.5 font-mono text-slate-700 dark:text-slate-300">
                  {asset.dpi} DPI
                </td>
                <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">
                  <div>{asset.backgroundRule}</div>
                  {asset.inkColorRule && (
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                      Ink: {asset.inkColorRule}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <span>
          FormFit automatically verifies your output file against every row in this table. If a portal releases
          an emergency corrigendum, use the &ldquo;Customize Dimensions &amp; KB Limits&rdquo; drawer above to override any value.
        </span>
      </div>
    </div>
  );
}
