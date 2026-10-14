'use client';

import React, { useState, useRef, useEffect } from 'react';
import { validateUploadedFile } from '@/lib/imaging/file-validator';
import { renderProcessedCanvas } from '@/lib/imaging/canvas-renderer';
import { compressCanvasToExactKB } from '@/lib/imaging/kb-compressor';
import {
  UploadCloud,
  Download,
  Calendar,
  User,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Tag,
} from 'lucide-react';

export default function DateNameOnPhotoPage() {
  const [candidateName, setCandidateName] = useState('');
  const [dateText, setDateText] = useState(() => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}-${month}-${d.getFullYear()}`;
  });
  const [theme, setTheme] = useState<'white_bg' | 'black_bg'>('white_bg');

  const [loadedImg, setLoadedImg] = useState<{ element: HTMLImageElement; url: string; w: number; h: number } | null>(null);
  const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
  const [finalBuffer, setFinalBuffer] = useState<Uint8Array | null>(null);
  const [actualKB, setActualKB] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = async (file: File) => {
    const val = await validateUploadedFile(file);
    if (!val.ok) return;

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setLoadedImg({ element: img, url, w: img.naturalWidth, h: img.naturalHeight });
    };
    img.src = url;
  };

  const loadSample = async () => {
    try {
      const res = await fetch('/samples/sample-portrait.jpg');
      const blob = await res.blob();
      const file = new File([blob], 'sample-portrait.jpg', { type: 'image/jpeg' });
      setCandidateName('AARAV SHARMA');
      await handleFile(file);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!loadedImg) return;
    setIsProcessing(true);

    const timer = setTimeout(async () => {
      try {
        const canvas = renderProcessedCanvas({
          sourceImage: loadedImg.element,
          sourceWidth: loadedImg.w,
          sourceHeight: loadedImg.h,
          crop: { x: 0, y: 0, width: 1, height: 1 },
          rotationDeg: 0,
          targetWidth: Math.min(800, Math.max(350, loadedImg.w)),
          targetHeight: Math.min(1000, Math.max(450, loadedImg.h)),
          datePlaque: {
            enabled: true,
            candidateName,
            dateText,
            theme,
          },
        });

        const res = await compressCanvasToExactKB(canvas, {
          minBytes: 20 * 1024,
          maxBytes: 100 * 1024,
          targetDpi: 200,
        });

        setFinalBuffer(res.buffer);
        setActualKB(Number((res.finalBytes / 1024).toFixed(1)));

        const blob = new Blob([res.buffer as unknown as BlobPart], { type: 'image/jpeg' });
        const pUrl = URL.createObjectURL(blob);
        setPreviewBlobUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return pUrl;
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsProcessing(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [loadedImg, candidateName, dateText, theme]);

  const handleDownload = () => {
    if (!finalBuffer) return;
    const blob = new Blob([finalBuffer as unknown as BlobPart], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Photo_With_Name_Date_${actualKB}KB.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          <Tag className="w-3.5 h-3.5 text-blue-600" />
          <span>Regulatory Compliance Tool</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Name &amp; Date on Photo (DOP) Slate Generator
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Add your full candidate name and date of photo capture in the official regulatory bottom plaque
          mandated by SSC CGL, UPSC Civil Services, and State PSC notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Inputs & File Upload (5 cols) */}
        <div className="md:col-span-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-4 text-xs">
          <h2 className="font-bold text-sm text-slate-900 dark:text-white">
            1. Plaque Details &amp; Photo
          </h2>

          {/* Photo Dropzone */}
          <div>
            <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
              Upload Passport Photograph:
            </label>
            <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer transition-colors min-h-[140px]">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
              {loadedImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={loadedImg.url} alt="Photo" className="h-24 object-contain rounded" />
              ) : (
                <div className="text-center space-y-1">
                  <UploadCloud className="w-6 h-6 text-blue-600 mx-auto" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    Choose Photo from Device
                  </span>
                  <span className="text-[10px] text-slate-400">JPG, PNG up to 25 MB</span>
                </div>
              )}
            </label>

            {!loadedImg && (
              <button
                type="button"
                onClick={loadSample}
                className="w-full mt-2 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Load Sample Photo for Demo</span>
              </button>
            )}
          </div>

          {/* Candidate Name Input */}
          <div>
            <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Candidate Name (Printed Uppercase)</span>
            </label>
            <input
              type="text"
              maxLength={32}
              placeholder="e.g. PRIYA PATEL"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value.toUpperCase())}
              className="w-full px-2.5 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white uppercase font-bold text-xs"
            />
          </div>

          {/* Date of Photograph Input */}
          <div>
            <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Date of Photograph (DD-MM-YYYY)</span>
            </label>
            <input
              type="text"
              placeholder="DD-MM-YYYY"
              value={dateText}
              onChange={(e) => setDateText(e.target.value)}
              className="w-full px-2.5 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-mono text-xs font-semibold"
            />
          </div>

          {/* Style selector */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-1.5">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Plaque Appearance:</span>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  checked={theme === 'white_bg'}
                  onChange={() => setTheme('white_bg')}
                  className="text-blue-600"
                />
                <span>White Box / Black Text</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  checked={theme === 'black_bg'}
                  onChange={() => setTheme('black_bg')}
                  className="text-blue-600"
                />
                <span>Black Box / White Text</span>
              </label>
            </div>
          </div>

          {/* Download CTA */}
          <div className="pt-2">
            <button
              type="button"
              disabled={!finalBuffer || isProcessing}
              onClick={handleDownload}
              className="w-full min-h-[46px] rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Slate Photo ({actualKB} KB)</span>
            </button>
          </div>
        </div>

        {/* Right Preview Output (7 cols) */}
        <div className="md:col-span-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Plaque Preview
            </span>
            {finalBuffer && (
              <span className="font-mono text-emerald-600 font-bold">{actualKB} KB • 200 DPI</span>
            )}
          </div>

          <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center min-h-[350px]">
            {previewBlobUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewBlobUrl}
                alt="Photo with Name and Date Preview"
                className="max-h-[380px] object-contain shadow-lg rounded border border-white"
              />
            ) : (
              <div className="text-center text-slate-400 text-xs">
                Upload your photo or click &ldquo;Load Sample Photo&rdquo; to preview the generated plaque.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
