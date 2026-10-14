import React from 'react';
import Link from 'next/link';
import { OfflinePrivacyBadge } from './OfflinePrivacyBadge';
import { Sparkles, Layers, SlidersHorizontal, ShieldCheck, FileCheck } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-colors dark:bg-slate-900/95 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-blue-800 transition-colors">
                <FileCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-slate-900 tracking-tight dark:text-white flex items-center gap-1">
                  FormFit<span className="text-blue-700 dark:text-blue-400">.in</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 block -mt-1 dark:text-slate-400">
                  Exam Compliance Engine
                </span>
              </div>
            </Link>

            {/* Main Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-slate-200 dark:border-slate-700">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 rounded-md hover:bg-slate-100 transition-colors dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Resizer Workbench
              </Link>
              <Link
                href="/specs-directory"
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 rounded-md hover:bg-slate-100 transition-colors dark:text-slate-200 dark:hover:bg-slate-800 flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4 text-slate-500" />
                <span>Exam Specs Directory</span>
              </Link>
              <Link
                href="/tools/photo-signature-joiner"
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 rounded-md hover:bg-slate-100 transition-colors dark:text-slate-200 dark:hover:bg-slate-800 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Photo + Sign Joiner</span>
              </Link>
              <Link
                href="/tools/date-name-on-photo"
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 rounded-md hover:bg-slate-100 transition-colors dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Name & Date Maker
              </Link>
              <Link
                href="/tools/jpg-to-pdf-under-size"
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 rounded-md hover:bg-slate-100 transition-colors dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Image to PDF
              </Link>
            </nav>
          </div>

          {/* Right Action & Privacy Telemetry */}
          <div className="flex items-center gap-3">
            <OfflinePrivacyBadge />
            <Link
              href="/privacy"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Verify Privacy</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
