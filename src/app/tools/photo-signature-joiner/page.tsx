'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { stitchPhotoAndSignature } from '@/lib/imaging/photo-sign-stitcher';
import { compressCanvasToExactKB } from '@/lib/imaging/kb-compressor';
import { validateUploadedFile } from '@/lib/imaging/file-validator';
import {
  UploadCloud,
  Download,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Columns,
  Rows,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export default function PhotoSignatureJoinerPage() {
  const [photoImg, setPhotoImg] = useState<{ element: HTMLImageElement; url: string; w: number; h: number } | null>(null);
  const [signImg, setSignImg] = useState<{ element: HTMLImageElement; url: string; w: number; h: number } | null>(null);

  const [layout, setLayout] = useState<'vertical' | 'horizontal'>('vertical');
  const [dividerLine, setDividerLine] = useState(true);
  const [spacingPx, setSpacingPx] = useState(6);
  const [minKB, setMinKB] = useState(20);
  const [maxKB, setMaxKB] = useState(100);

  const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
  const [finalBuffer, setFinalBuffer] = useState<Uint8Array | null>(null);
  const [actualKB, setActualKB] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // File loading helpers
  const handleLoadFile = async (file: File, type: 'photo' | 'sign') => {
    const val = await validateUploadedFile(file);
    if (!val.ok) return;

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (type === 'photo') {
        setPhotoImg({ element: img, url, w: img.naturalWidth, h: img.naturalHeight });
      } else {
        setSignImg({ element: img, url, w: img.naturalWidth, h: img.naturalHeight });
      }
    };
    img.src = url;
  };

  // Re-generate stitched canvas
  useEffect(() => {
    if (!photoImg || !signImg) return;

    setIsProcessing(true);
    const timer = setTimeout(async () => {
      try {
        const canvas = stitchPhotoAndSignature({
          photoCanvas: photoImg.element,
          photoWidth: photoImg.w,
          photoHeight: photoImg.h,
          signatureCanvas: signImg.element,
          signatureWidth: signImg.w,
          signatureHeight: signImg.h,
          layout,
          dividerLine,
          spacingPx,
        });

        const res = await compressCanvasToExactKB(canvas, {
          minBytes: minKB * 1024,
          maxBytes: maxKB * 1024,
          targetDpi: 200,
        });

        setFinalBuffer(res.buffer);
        setActualKB(Number((res.finalBytes / 1024).toFixed(1)));

        const blob = new Blob([res.buffer as unknown as BlobPart], { type: 'image/jpeg' });
        const previewUrl = URL.createObjectURL(blob);
        setPreviewBlobUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return previewUrl;
        });
      } catch (e) {
        console.error('Stitching failed:', e);
      } finally {
        setIsProcessing(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [photoImg, signImg, layout, dividerLine, spacingPx, minKB, maxKB]);

  const handleDownload = () => {
    if (!finalBuffer) return;
    const blob = new Blob([finalBuffer as unknown as BlobPart], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Photo_Signature_Combined_${actualKB}KB.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const loadSamplePair = async () => {
    try {
      const pRes = await fetch('/samples/sample-portrait.jpg');
      const pBlob = await pRes.blob();
      const pFile = new File([pBlob], 'sample-portrait.jpg', { type: 'image/jpeg' });
      await handleLoadFile(pFile, 'photo');

      const sRes = await fetch('/samples/sample-signature.jpg');
      const sBlob = await sRes.blob();
      const sFile = new File([sBlob], 'sample-signature.jpg', { type: 'image/jpeg' });
      await handleLoadFile(sFile, 'sign');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Standalone Utility</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Photo &amp; Signature Joiner / Combiner
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Combine your photograph and signature into a single compliant JPG file, as required by specific State PSCs,
          university admissions, and admit card portals.
        </p>
      </div>

      {/* Upload Zone for both assets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Photo Upload Box */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Step 1: Candidate Photograph
            </span>
            {photoImg && (
              <span className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{photoImg.w} × {photoImg.h} px</span>
              </span>
            )}
          </div>

          <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors min-h-[160px]">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleLoadFile(f, 'photo');
              }}
            />
            {photoImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoImg.url} alt="Uploaded Photo" className="h-28 object-contain rounded" />
            ) : (
              <div className="text-center space-y-1">
                <UploadCloud className="w-8 h-8 text-blue-600 mx-auto" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Select Candidate Photo
                </span>
                <span className="text-[10px] text-slate-400">JPG, PNG up to 25 MB</span>
              </div>
            )}
          </label>
        </div>

        {/* Signature Upload Box */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Step 2: Candidate Signature
            </span>
            {signImg && (
              <span className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{signImg.w} × {signImg.h} px</span>
              </span>
            )}
          </div>

          <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors min-h-[160px]">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleLoadFile(f, 'sign');
              }}
            />
            {signImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={signImg.url} alt="Uploaded Signature" className="h-28 object-contain rounded" />
            ) : (
              <div className="text-center space-y-1">
                <UploadCloud className="w-8 h-8 text-blue-600 mx-auto" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Select Candidate Signature
                </span>
                <span className="text-[10px] text-slate-400">JPG, PNG up to 25 MB</span>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* 1-Tap Demo Button */}
      {(!photoImg || !signImg) && (
        <div className="text-center">
          <button
            type="button"
            onClick={loadSamplePair}
            className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 inline-flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Load Demo Photo &amp; Signature (1-Click Test)</span>
          </button>
        </div>
      )}

      {/* Settings & Combined Preview */}
      {photoImg && signImg && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Controls (5 cols) */}
          <div className="md:col-span-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Layout &amp; Size Settings
            </h3>

            {/* Layout Toggle */}
            <div className="space-y-1.5">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Arrangement:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLayout('vertical')}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 ${
                    layout === 'vertical'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Rows className="w-4 h-4" />
                  <span>Vertical (Photo Top)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLayout('horizontal')}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 ${
                    layout === 'horizontal'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Columns className="w-4 h-4" />
                  <span>Horizontal (Side-by-Side)</span>
                </button>
              </div>
            </div>

            {/* Divider toggle */}
            <label className="flex items-center gap-2 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={dividerLine}
                onChange={(e) => setDividerLine(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              <span className="text-slate-700 dark:text-slate-300">
                Include 1px separator line between photo and signature
              </span>
            </label>

            {/* KB limits */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Min Size (KB)
                </label>
                <input
                  type="number"
                  value={minKB}
                  onChange={(e) => setMinKB(parseInt(e.target.value) || 10)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Max Size (KB)
                </label>
                <input
                  type="number"
                  value={maxKB}
                  onChange={(e) => setMaxKB(parseInt(e.target.value) || 100)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded font-mono text-xs"
                />
              </div>
            </div>

            {/* Download CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleDownload}
                disabled={isProcessing || !finalBuffer}
                className="w-full min-h-[46px] rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Combined File ({actualKB} KB)</span>
              </button>
            </div>
          </div>

          {/* Stitched Output Preview (7 cols) */}
          <div className="md:col-span-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Live Combined Preview
              </span>
              <span className="font-mono text-emerald-600 font-bold">{actualKB} KB • 200 DPI</span>
            </div>

            <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center min-h-[300px]">
              {previewBlobUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewBlobUrl}
                  alt="Stitched Preview"
                  className="max-h-[360px] object-contain shadow-md rounded border border-white"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
