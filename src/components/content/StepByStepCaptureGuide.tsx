import React from 'react';
import { ExamPortalPreset } from '@/types/preset';
import { Camera, Smartphone, Sun, ShieldAlert, Sparkles } from 'lucide-react';

interface StepByStepCaptureGuideProps {
  preset: ExamPortalPreset;
}

export function StepByStepCaptureGuide({ preset }: StepByStepCaptureGuideProps) {
  const photoAsset = preset.assets.find((a) => a.assetType === 'photo') ?? preset.assets[0];
  const signAsset = preset.assets.find((a) => a.assetType === 'signature');

  return (
    <section className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <Camera className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Official Smartphone &amp; Scanner Capture Guide for {preset.shortName}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Follow these verified physical capture techniques to produce images that pass {preset.conductingBody} automated upload checks without rejection.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Photo Capture Protocol */}
        {photoAsset && (
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-5 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Photograph Capture Protocol ({photoAsset.widthPx} × {photoAsset.heightPx} px)
              </h3>
            </div>
            <ol className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-decimal list-inside">
              <li>
                <strong>Background Alignment:</strong> Stand 3–4 feet away from a plain white or light off-white wall. Ensure no shadows fall directly behind your ears or shoulders.
              </li>
              <li>
                <strong>Lighting Balance:</strong> Face a window with bright, diffuse daylight or place a light source in front of you. Avoid overhead ceiling bulbs that create dark shadows under eyes and chin.
              </li>
              <li>
                <strong>Facial Geometry:</strong> Keep your head straight, looking directly into the camera. Both ears and eyes must be clearly visible. Keep a neutral expression with mouth closed.
              </li>
              <li>
                <strong>Headwear &amp; Eyewear:</strong> Caps, hats, masks, and dark sunglasses are strictly forbidden. Regular clear prescription spectacles are allowed only if lenses have zero glare.
              </li>
              {photoAsset.requiresNameAndDate === 'mandatory' && (
                <li className="text-amber-800 dark:text-amber-300 font-medium">
                  <strong>Name &amp; Date Plaque:</strong> This portal mandates candidate full name and date of photo (DOP) at the bottom. Use FormFit’s automated toggle above to generate this banner.
                </li>
              )}
            </ol>
          </div>
        )}

        {/* Signature Capture Protocol */}
        {signAsset && (
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-5 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="flex items-center gap-2 mb-3">
              <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Scanned Signature Protocol ({signAsset.minKB}–{signAsset.maxKB} KB)
              </h3>
            </div>
            <ol className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-decimal list-inside">
              <li>
                <strong>Paper &amp; Ink Selection:</strong> Sign strictly on clean, unruled white paper. Use a bold {signAsset.inkColorRule || 'black ballpoint or gel pen'}. Avoid ruled notebook paper.
              </li>
              <li>
                <strong>No Hand Shadows:</strong> Hold your phone perpendicular to the paper without leaning over it. Ambient daylight prevents your phone body from casting a dark diagonal shadow.
              </li>
              <li>
                <strong>Running Handwriting Only:</strong> Never sign in full capital or block letters. Capital letter signatures will cause scrutiny rejection during document verification.
              </li>
              <li>
                <strong>Adaptive Paper Whitening:</strong> If your smartphone photo appears greyish or yellow, toggle FormFit’s Paper Whitening filter to normalize the paper to pure #FFFFFF.
              </li>
              <li>
                <strong>Automated Byte-Floor:</strong> Our engine automatically injects safe JFIF comment padding if your clean signature compresses below the {signAsset.minKB} KB floor.
              </li>
            </ol>
          </div>
        )}
      </div>

      {preset.captureTips && preset.captureTips.length > 0 && (
        <div className="mt-6 p-4 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-indigo-950 dark:text-indigo-200 mb-1">
              Expert Tip for {preset.shortName} Candidates
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-indigo-900 dark:text-indigo-300">
              {preset.captureTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
