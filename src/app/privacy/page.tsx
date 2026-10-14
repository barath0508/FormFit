import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, WifiOff, Terminal, EyeOff, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Verifiable Zero-Upload Privacy Architecture | FormFit India',
  description:
    'Learn how FormFit India processes photos, signatures, and government identity documents entirely inside your browser memory with zero network uploads.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zero Server Uploads Guaranteed</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How FormFit India Guarantees 100% Privacy for Sensitive Documents
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Unlike generic photo resizers that upload your personal photographs, signatures, and caste/identity certificates
          to unverified remote servers, FormFit India runs entirely inside your client browser.
        </p>
      </div>

      {/* Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            HTML5 Canvas &amp; Web Workers
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            All pixel scaling, rotation transforms, paper whitening filters, and JPEG encoding execute
            locally in volatile browser memory.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center">
            <WifiOff className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Works Completely Offline
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Once this web page loads, you can turn off your Wi-Fi, cellular data, or activate Airplane Mode.
            The entire resizing pipeline continues to function without internet.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
          <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Zero Disk &amp; Cloud Storage
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We do not store your images in `localStorage` or `IndexedDB`. When you close or refresh the tab,
            all image buffers are immediately cleared by the browser garbage collector.
          </p>
        </div>
      </div>

      {/* DevTools Verification Guide */}
      <section className="bg-slate-900 text-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Terminal className="w-4 h-4" />
            <span>INDEPENDENT VERIFICATION PROTOCOL</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            How to Verify Zero Uploads in Google Chrome / Edge DevTools
          </h2>
          <p className="text-xs text-slate-400">
            You don&apos;t have to take our word for it. Here is how any applicant, cyber-cafe operator, or software engineer
            can verify that zero bytes leave your computer:
          </p>
        </div>

        <ol className="space-y-4 text-xs sm:text-sm text-slate-300">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-blue-400 font-bold flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <strong className="text-white">Open Developer Tools:</strong> Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-xs">F12</kbd> (or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-xs">Ctrl + Shift + I</kbd> on Windows, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-xs">Cmd + Option + I</kbd> on Mac).
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-blue-400 font-bold flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <strong className="text-white">Navigate to the Network Tab:</strong> Click on the <strong>Network</strong> tab at the top and select the <strong>Fetch/XHR</strong> sub-filter.
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-blue-400 font-bold flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <strong className="text-white">Upload, Crop &amp; Download:</strong> Select any sensitive photo, adjust the crop framing, toggle the Name/Date slate, and click <strong>Download Compliant File</strong>.
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 font-bold flex items-center justify-center shrink-0">
              4
            </span>
            <div>
              <strong className="text-white">Verify Zero Outbound Traffic:</strong> Inspect the Network log. You will observe <strong>0 new HTTP requests</strong>. All image operations occur strictly on your CPU/GPU.
            </div>
          </li>
        </ol>
      </section>

      {/* Strict Content Security Policy notice */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Enforced Content Security Policy (CSP) &amp; Security Headers
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          FormFit India emits strict HTTP security headers:
        </p>
        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono">
          <li>• <span className="font-semibold text-slate-900 dark:text-white">X-Content-Type-Options:</span> nosniff</li>
          <li>• <span className="font-semibold text-slate-900 dark:text-white">X-Frame-Options:</span> DENY (prevents clickjacking)</li>
          <li>• <span className="font-semibold text-slate-900 dark:text-white">Referrer-Policy:</span> strict-origin-when-cross-origin</li>
          <li>• <span className="font-semibold text-slate-900 dark:text-white">Permissions-Policy:</span> camera=(), microphone=(), geolocation=(), payment=()</li>
        </ul>
      </section>

      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors"
        >
          <span>Open Resizer Workbench</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
