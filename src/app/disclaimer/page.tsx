import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { AlertCircle, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Official Non-Affiliation Disclaimer | FormFit',
  description:
    'FormFit is an independent technical utility. We are not affiliated with, endorsed by, or connected to UPSC, SSC, IBPS, NTA, RRB, UIDAI, or any government body.',
  alternates: {
    canonical: 'https://formfit-rust.vercel.app/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
          <span>Independent Technical Utility Notice</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Official Non-Affiliation Disclaimer
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Please read this statement regarding our independence, trademark usage, and nominative fair use.
        </p>
      </header>

      {/* 1. Official Non-Affiliation Declaration */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          1. Independent Technical Utility Declaration
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong>FormFit (formfit-rust.vercel.app) is an independent, non-governmental technical utility and educational web resource.</strong>
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          FormFit is <strong>NOT</strong> affiliated with, associated with, authorized by, endorsed by, or in any way officially connected with:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium pl-2">
          <li>• Union Public Service Commission (UPSC)</li>
          <li>• Staff Selection Commission (SSC)</li>
          <li>• Institute of Banking Personnel Selection (IBPS)</li>
          <li>• State Bank of India (SBI)</li>
          <li>• National Testing Agency (NTA - NEET/JEE/CUET)</li>
          <li>• Railway Recruitment Boards (RRB)</li>
          <li>• Unique Identification Authority of India (UIDAI)</li>
          <li>• Protean eGov Technologies / NSDL</li>
          <li>• UTI Infrastructure Technology And Services (UTIITSL)</li>
          <li>• Any State Public Service Commission (TNPSC, UPPSC, BPSC, MPSC, RPSC)</li>
        </ul>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
          The official websites for these organizations are hosted on the .gov.in and .nic.in government domains
          (e.g., upsc.gov.in, ssc.gov.in, ibps.in, nta.ac.in, myaadhaar.uidai.gov.in).
        </p>
      </section>

      {/* 2. Nominative Fair Use Notice */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          2. Nominative Fair Use of Trademarks &amp; Names
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          All examination titles, portal names, government agency acronyms, and registered trademarks referenced on
          FormFit (including but not limited to UPSC, SSC CGL, IBPS PO, SBI Clerk, NEET UG, JEE Main, GATE, Aadhaar,
          and PAN) are the property of their respective trademark holders.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The use of these names, acronyms, and references on FormFit constitutes <strong>Nominative Fair Use</strong> under
          applicable Indian and international trademark laws. They are used strictly and solely to identify the intended
          technical file dimension, resolution, and format compatibility for applicants preparing their digital uploads.
        </p>
      </section>

      {/* 3. Candidate Responsibility */}
      <section className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Candidate Advisory
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Candidates are advised to always consult the original, official notification circular published by the respective
          conducting examination authority on their official government portal before final submission of their application.
        </p>
      </section>

      {/* Footer navigation */}
      <footer className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <Link href="/terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          Read Terms of Service →
        </Link>
        <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          Contact Document Lab →
        </Link>
      </footer>
    </div>
  );
}
