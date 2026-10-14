'use client';

import React from 'react';
import { ComplianceAuditReport } from '@/lib/imaging/compliance-auditor';
import { AssetSpec } from '@/types/preset';
import {
  Download,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface CompressionTelemetryCardProps {
  spec: AssetSpec;
  report: ComplianceAuditReport | null;
  isProcessing: boolean;
  onDownload: () => void;
  portalShortName: string;
}

export function CompressionTelemetryCard({
  spec,
  report,
  isProcessing,
  onDownload,
  portalShortName,
}: CompressionTelemetryCardProps) {
  const actualKB = report?.actualKB ?? 0;
  const minKB = spec.minKB;
  const maxKB = spec.maxKB;

  // Calculate percentage within allowed [minKB, maxKB] window
  let windowProgress = 50;
  if (report) {
    if (actualKB <= minKB) {
      windowProgress = 0;
    } else if (actualKB >= maxKB) {
      windowProgress = 100;
    } else {
      windowProgress = Math.round(((actualKB - minKB) / (maxKB - minKB)) * 100);
    }
  }

  const allPassed = report?.allPassed ?? false;

  // Generate clean filename
  const cleanPortal = portalShortName.replace(/[^a-zA-Z0-9]/g, '_');
  const cleanAsset = spec.label.replace(/[^a-zA-Z0-9]/g, '_');
  const extension = spec.assetType === 'document_pdf' ? 'pdf' : 'jpg';
  const downloadFilename = `${cleanPortal}_${cleanAsset}_${spec.widthPx}x${spec.heightPx}px_${actualKB}KB.${extension}`;

  return (
    <div className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-5">
      {/* Header and Compliance Receipt Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Compliance Verification Audit
          </h4>
          <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-0.5">
            {spec.label}
          </span>
        </div>

        {report && (
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
              allPassed
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700'
                : 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700'
            }`}
          >
            {allPassed ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>100% Portal Compliant</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Review Warnings</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Target vs Actual File Size Window Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Target Size Window ({spec.minKB} KB – {spec.maxKB} KB):
          </span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            {report ? `${actualKB} KB` : 'Calculating...'}
          </span>
        </div>

        {/* Progress meter */}
        <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden border border-slate-200 dark:border-slate-600">
          {/* Safe zone highlight */}
          <div className="absolute inset-y-0 left-[10%] right-[10%] bg-emerald-100/60 dark:bg-emerald-900/30 border-x border-emerald-300" />

          {/* Current position bar */}
          {report && (
            <div
              className={`h-full transition-all duration-300 ${
                allPassed ? 'bg-emerald-600' : 'bg-amber-500'
              }`}
              style={{ width: `${Math.max(5, Math.min(100, windowProgress))}%` }}
            />
          )}
        </div>

        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>Min: {spec.minKB} KB</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Optimal Safe Window</span>
          <span>Max: {spec.maxKB} KB</span>
        </div>
      </div>

      {/* 5-Point Verification Audit Checklist */}
      <div className="space-y-2">
        {report?.checks.map((check) => (
          <div
            key={check.id}
            className="flex items-start justify-between gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 text-xs"
          >
            <div className="space-y-0.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                {check.label}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">
                Actual: {check.actual} • Target: {check.expected}
              </span>
            </div>

            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5 ${
                check.status === 'pass'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200'
                  : check.status === 'warn'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-200'
              }`}
            >
              {check.status === 'pass' ? 'MATCHED' : check.status === 'warn' ? 'NOTICE' : 'REJECTED'}
            </span>
          </div>
        ))}
      </div>

      {/* Primary Download Button */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!report || isProcessing}
          onClick={onDownload}
          className="w-full min-h-[50px] px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Optimizing File Size &amp; Injecting DPI...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Download Compliant {spec.assetType === 'document_pdf' ? 'PDF' : 'JPEG'} ({actualKB} KB)</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-slate-400 mt-2 truncate font-mono">
          Save as: {downloadFilename}
        </p>
      </div>

      {/* Privacy Guarantee Marker */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Generated 100% on this device • Zero server round-trips</span>
      </div>
    </div>
  );
}
