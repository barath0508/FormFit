import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Scale, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service & Candidate Responsibility Agreement | FormFit',
  description:
    'Terms of service for FormFit. Learn about our free utility scope, candidate portal preview verification duties, and intellectual property terms.',
  alternates: {
    canonical: 'https://formfit-rust.vercel.app/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          <Scale className="w-3.5 h-3.5" />
          <span>User Agreement &amp; Operating Guidelines</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Last revised: March 2026. Please read these terms carefully before utilizing FormFit (formfit-rust.vercel.app).
          By accessing this technical utility, you agree to comply with the operational conditions outlined herein.
        </p>
      </header>

      {/* 1. Scope of Free Technical Utility */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          1. Scope of the Free Utility Service
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          FormFit provides a browser-based, client-side digital image manipulation utility designed to assist Indian
          citizens, job applicants, and students in formatting photographs, scanned signatures, and PDF documents to match
          the technical pixel dimensions, DPI metadata, and file size limits required by government recruitment and entrance portals.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          FormFit is provided free of charge for personal, non-commercial use. No account registration or payment
          is required to access the image processing workbench or compliance tools.
        </p>
      </section>

      {/* 2. Mandatory Candidate Verification Responsibility */}
      <section className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-bold text-amber-950 dark:text-amber-200">
            2. Candidate Verification Responsibility Clause
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
          While FormFit’s Document Compliance Lab audits exam specifications against active official gazette
          notifications and examination brochures (.gov.in / .nic.in), <strong>the candidate remains solely and
          ultimately responsible for verifying the visual legibility, framing, and acceptance of their file on the
          official government portal before final fee payment and application submission</strong>.
        </p>
        <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
          Government examination boards (including UPSC, SSC, IBPS, NTA, and State PSCs) may revise guidelines via
          supplementary addenda or corrigenda during an active recruitment cycle. Candidates must always cross-check
          their downloaded file preview against the instructions in their specific exam bulletin.
        </p>
      </section>

      {/* 3. Intellectual Property & Prohibition of Automated Scraping */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          3. Intellectual Property &amp; Acceptable Use
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          All original editorial articles, mathematical conversion formulas, UI designs, codebases, and curated
          specifications matrices published on FormFit are protected under intellectual property and copyright laws.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          You agree not to use automated bots, scrapers, or headless browsers to mass-scrape our database of presets,
          editorial guides, or reverse-engineer our client-side binary header injection routines for unauthorized commercial redistribution.
        </p>
      </section>

      {/* 4. Limitation of Liability */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          4. Disclaimer of Warranties &amp; Limitation of Liability
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          FormFit is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether
          express or implied. Under no circumstances shall FormFit, its developers, or contributors be held
          liable for any direct, indirect, incidental, consequential, or punitive damages arising from the rejection,
          scrutiny objection, or disqualification of an examination application by any government commission or testing agency.
        </p>
      </section>

      {/* Footer navigation */}
      <footer className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <Link href="/disclaimer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          Read Official Non-Affiliation Disclaimer →
        </Link>
        <Link href="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          Read Privacy Policy →
        </Link>
      </footer>
    </div>
  );
}
