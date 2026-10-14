import React from 'react';
import { ExamPortalPreset } from '@/types/preset';
import { Calculator, Binary } from 'lucide-react';

interface CmToPixelDpiReferenceCardProps {
  preset: ExamPortalPreset;
}

export function CmToPixelDpiReferenceCard({ preset }: CmToPixelDpiReferenceCardProps) {
  const photo = preset.assets.find((a) => a.assetType === 'photo') ?? preset.assets[0];
  const sign = preset.assets.find((a) => a.assetType === 'signature');

  return (
    <section className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Centimeters to Pixels Conversion Math for {preset.shortName}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            How physical metric measurements translate into exact digital pixels at 150, 200, and 300 DPI print densities.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Math Breakdown Box */}
        <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Binary className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            The Conversion Equation
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Since 1 inch equals exactly 2.54 centimeters, the formula to calculate pixels from physical centimeters at any resolution (DPI) is:
          </p>
          <div className="p-3 bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-800/80 rounded font-mono text-xs text-teal-900 dark:text-teal-300 font-semibold text-center">
            Pixels = (Dimension in Centimeters ÷ 2.54) × DPI
          </div>
          {photo && (
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <p>
                <strong>For {preset.shortName} Photo ({photo.widthCm} × {photo.heightCm} cm at {photo.dpi} DPI):</strong>
              </p>
              <p className="font-mono text-[11px]">
                Width: ({photo.widthCm} ÷ 2.54) × {photo.dpi} = {((photo.widthCm / 2.54) * photo.dpi).toFixed(2)} ≈ <strong>{photo.widthPx} pixels</strong>
              </p>
              <p className="font-mono text-[11px]">
                Height: ({photo.heightCm} ÷ 2.54) × {photo.dpi} = {((photo.heightCm / 2.54) * photo.dpi).toFixed(2)} ≈ <strong>{photo.heightPx} pixels</strong>
              </p>
            </div>
          )}
        </div>

        {/* Multi-DPI Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th scope="col" className="px-3 py-2.5">Asset</th>
                <th scope="col" className="px-3 py-2.5">Metric Size</th>
                <th scope="col" className="px-3 py-2.5">Pixels @ 150 DPI</th>
                <th scope="col" className="px-3 py-2.5">Pixels @ 200 DPI</th>
                <th scope="col" className="px-3 py-2.5">Pixels @ 300 DPI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
              {preset.assets.map((asset) => {
                const px150w = Math.round((asset.widthCm / 2.54) * 150);
                const px150h = Math.round((asset.heightCm / 2.54) * 150);
                const px200w = Math.round((asset.widthCm / 2.54) * 200);
                const px200h = Math.round((asset.heightCm / 2.54) * 200);
                const px300w = Math.round((asset.widthCm / 2.54) * 300);
                const px300h = Math.round((asset.heightCm / 2.54) * 300);

                return (
                  <tr key={asset.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40">
                    <td className="px-3 py-2.5 font-bold text-slate-900 dark:text-white">
                      {asset.label}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-slate-600 dark:text-slate-400">
                      {asset.widthCm} × {asset.heightCm} cm
                    </td>
                    <td className="px-3 py-2.5 font-mono text-slate-500">
                      {px150w} × {px150h} px
                    </td>
                    <td className="px-3 py-2.5 font-mono font-bold text-teal-700 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-950/20">
                      {px200w} × {px200h} px
                    </td>
                    <td className="px-3 py-2.5 font-mono text-slate-500">
                      {px300w} × {px300h} px
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 italic">
            * Bold column indicates the official default {preset.assets[0]?.dpi || 200} DPI density embedded in FormFit’s binary JFIF output.
          </p>
        </div>
      </div>
    </section>
  );
}
