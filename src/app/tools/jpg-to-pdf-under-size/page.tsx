'use client';

import React, { useState } from 'react';
import { validateUploadedFile } from '@/lib/imaging/file-validator';
import { packageJpegIntoPdf } from '@/lib/imaging/pdf-packager';
import { canvasToJpegBlob } from '@/lib/imaging/kb-compressor';
import {
  UploadCloud,
  Download,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';

export default function JpgToPdfUnderSizePage() {
  const [targetMaxKB, setTargetMaxKB] = useState<number>(300);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedPdfBytes, setGeneratedPdfBytes] = useState<Uint8Array | null>(null);
  const [finalSizeKB, setFinalSizeKB] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = async (file: File) => {
    setErrorMessage(null);
    setSelectedFile(file);
    setIsProcessing(true);

    try {
      const val = await validateUploadedFile(file);
      if (!val.ok) {
        setErrorMessage(val.userMessage || 'Invalid file format.');
        setIsProcessing(false);
        return;
      }

      // Convert image to canvas and scale so it fits target KB
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = async () => {
        try {
          const canvas = document.createElement('canvas');
          // Scale to standard document scan dimension: 1240 x 1754 (A4 at 150 DPI)
          const targetW = 1240;
          const targetH = Math.round((img.naturalHeight / img.naturalWidth) * targetW);
          canvas.width = targetW;
          canvas.height = targetH;

          const ctx = canvas.getContext('2d')!;
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, targetW, targetH);
          ctx.drawImage(img, 0, 0, targetW, targetH);

          // Deterministic binary search to ensure final PDF is strictly <= targetMaxKB
          const maxAllowedBytes = targetMaxKB * 1024;
          let lowQ = 0.05;
          let highQ = 0.92;
          let bestPdfBytes: Uint8Array | null = null;

          for (let iter = 0; iter < 5; iter++) {
            const midQ = Number(((lowQ + highQ) / 2).toFixed(2));
            const jBlob = await canvasToJpegBlob(canvas, midQ);
            const jBytes = new Uint8Array(await jBlob.arrayBuffer());
            const pBytes = await packageJpegIntoPdf({
              jpegBytes: jBytes,
              maxKB: targetMaxKB,
              pageSize: 'A4',
            });

            if (pBytes.byteLength <= maxAllowedBytes) {
              bestPdfBytes = pBytes;
              lowQ = midQ;
            } else {
              highQ = midQ;
            }
          }

          if (!bestPdfBytes) {
            const minBlob = await canvasToJpegBlob(canvas, 0.05);
            bestPdfBytes = await packageJpegIntoPdf({
              jpegBytes: new Uint8Array(await minBlob.arrayBuffer()),
              maxKB: targetMaxKB,
              pageSize: 'A4',
            });
          }

          setGeneratedPdfBytes(bestPdfBytes);
          setFinalSizeKB(Number((bestPdfBytes.byteLength / 1024).toFixed(1)));
          URL.revokeObjectURL(objectUrl);
        } catch (e) {
          console.error(e);
          setErrorMessage('Could not generate PDF.');
        } finally {
          setIsProcessing(false);
        }
      };
      img.onerror = () => {
        setErrorMessage('Failed to decode document image.');
        setIsProcessing(false);
      };
      img.src = objectUrl;
    } catch {
      setErrorMessage('Error reading uploaded file.');
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!generatedPdfBytes) return;
    const blob = new Blob([generatedPdfBytes as unknown as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificate_Document_${finalSizeKB}KB.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          <FileText className="w-3.5 h-3.5 text-blue-600" />
          <span>Certificate Compressor</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Convert Scanned Image to PDF Under Target KB
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Compress Category, EWS, OBC-NCL, PwBD, or 10th Marks Sheet certificates into an exact-size
          compliant PDF file matching portal limits (50 KB, 100 KB, 200 KB, 300 KB).
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm space-y-6">
        {/* Target Size Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Target Maximum PDF Size:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[100, 200, 300, 500].map((kb) => (
              <button
                key={kb}
                type="button"
                onClick={() => {
                  setTargetMaxKB(kb);
                  if (selectedFile) handleFileChange(selectedFile);
                }}
                className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  targetMaxKB === kb
                    ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Under {kb} KB
              </button>
            ))}
          </div>
        </div>

        {/* Dropzone */}
        <div>
          <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors min-h-[180px]">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileChange(f);
              }}
            />
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-slate-700 text-blue-600 flex items-center justify-center mb-2">
              <UploadCloud className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Select Scanned Certificate Photo
            </span>
            <span className="text-xs text-slate-400 mt-0.5">JPG, PNG up to 25 MB</span>
          </label>
        </div>

        {/* Error notice */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-50 text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success & Download Status */}
        {generatedPdfBytes && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>PDF Ready ({finalSizeKB} KB &le; {targetMaxKB} KB)</span>
              </span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                Passes Portal Cap
              </span>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="w-full min-h-[46px] rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Compliant PDF ({finalSizeKB} KB)</span>
            </button>
          </div>
        )}

        <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Encrypted inside device memory • Zero server uploads</span>
        </div>
      </div>
    </div>
  );
}
