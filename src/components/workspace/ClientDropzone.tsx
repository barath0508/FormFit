'use client';

import React, { useState, useRef } from 'react';
import { validateUploadedFile } from '@/lib/imaging/file-validator';
import { UploadCloud, Image as ImageIcon, AlertCircle, FileCheck2, Sparkles } from 'lucide-react';

interface ClientDropzoneProps {
  onFileLoaded: (file: File, objectUrl: string, width: number, height: number) => void;
  assetType: 'photo' | 'signature' | 'thumb' | 'document_pdf';
}

export function ClientDropzone({ onFileLoaded, assetType }: ClientDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setIsLoading(true);
    setErrorMessage(null);

    const result = await validateUploadedFile(file);

    if (!result.ok) {
      setErrorMessage(result.userMessage || 'Invalid file uploaded.');
      setIsLoading(false);
      return;
    }

    try {
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        onFileLoaded(file, objectUrl, img.naturalWidth, img.naturalHeight);
        setIsLoading(false);
      };
      img.onerror = () => {
        setErrorMessage('Failed to decode image pixels.');
        setIsLoading(false);
      };
      img.src = objectUrl;
    } catch {
      setErrorMessage('Could not process selected image.');
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    const file = files[0];
    if (file) {
      processFile(file);
    }
  };

  const loadSample = async (samplePath: string, filename: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch(samplePath);
      const blob = await res.blob();
      const file = new File([blob], filename, { type: 'image/jpeg' });
      await processFile(file);
    } catch {
      setErrorMessage('Could not load sample photo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative w-full border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[340px] sm:min-h-[380px] ${
          isDragging
            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-900/20'
            : 'border-slate-300 dark:border-slate-700 hover:border-blue-500 bg-white dark:bg-slate-800'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) processFile(file);
          }}
        />

        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-400 flex items-center justify-center mb-4 shadow-sm">
          {isLoading ? (
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <UploadCloud className="w-8 h-8" />
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">
          {assetType === 'signature'
            ? 'Drop candidate signature here'
            : assetType === 'thumb'
            ? 'Drop left thumb impression here'
            : 'Drop candidate photograph here'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
          or click to browse from device (JPG, PNG, WebP up to 25 MB). Files never leave your browser memory.
        </p>

        <button
          type="button"
          className="min-h-[44px] px-6 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors"
        >
          Select {assetType === 'signature' ? 'Signature' : 'Photo'} from Phone / PC
        </button>

        {/* 1-Click Sample Testing Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Test Instantly with 1-Click Official Samples:</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => loadSample('/samples/sample-portrait.jpg', 'sample-candidate-photo.jpg')}
              className="min-h-[38px] px-3.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/60 hover:bg-slate-100 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>Load Sample Portrait</span>
            </button>
            <button
              type="button"
              onClick={() => loadSample('/samples/sample-signature.jpg', 'sample-candidate-signature.jpg')}
              className="min-h-[38px] px-3.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/60 hover:bg-slate-100 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Load Sample Signature</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Alert Banner */}
      {errorMessage && (
        <div className="mt-3 p-3.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold block mb-0.5">Upload Error</span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
