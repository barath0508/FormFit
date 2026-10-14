'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export function CookieConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('formfit_cookie_consent');
      if (!consent) {
        setIsOpen(true);
      }
    } catch {
      // Ignore localStorage restrictions
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('formfit_cookie_consent', 'accepted');
    } catch {
      // Ignore
    }
    setIsOpen(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('formfit_cookie_consent', 'declined');
    } catch {
      // Ignore
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent Notice"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            100% Client-Side Privacy &amp; Cookies Notice
          </h3>
        </div>
        <button
          onClick={handleDecline}
          aria-label="Close Notice"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        FormFit India processes your photos, signatures, and PDFs <strong>100% inside your browser RAM</strong>. Files are never uploaded to any server. We and third-party vendors (including Google) use cookies to serve relevant advertisements and analyze traffic under Google Consent Mode v2 and India&apos;s DPDP Act.
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <Link
          href="/privacy"
          className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
        >
          Read Privacy Policy
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Necessary Only
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </aside>
  );
}
