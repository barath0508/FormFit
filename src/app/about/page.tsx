import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Building2, CheckCircle2, ShieldCheck, UserCheck, Mail, ArrowRight, FileCheck, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About FormFit — Editorial Standards & Civic Utility Mission',
  description:
    'Learn about FormFit, our 3-step methodology for auditing government recruitment notifications, and our zero-server-cost client-side privacy model.',
  alternates: {
    canonical: 'https://formfit-rust.vercel.app/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          <Building2 className="w-3.5 h-3.5" />
          <span>Independent Civic Technology Initiative</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About FormFit (formfit-rust.vercel.app)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          FormFit was engineered to solve a widespread, stressful problem faced by tens of millions of Indian students,
          civil service aspirants, and job applicants every month: rigid, idiosyncratic portal upload rejections.
        </p>
      </header>

      {/* The Core Problem We Solve */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Why We Built This Utility
        </h2>
        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
          <p>
            Whether applying for the <strong>UPSC Civil Services Examination</strong>, <strong>SSC CGL</strong>,{' '}
            <strong>IBPS Bank PO</strong>, <strong>NEET UG</strong>, or updating an <strong>Aadhaar/PAN card</strong>,
            applicants encounter strict digital gatekeepers:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Narrow file-size windows (e.g. &ldquo;Must be strictly between 10 KB and 20 KB&rdquo;).</li>
            <li>Binary JFIF density metadata checks requiring exactly 200 or 300 DPI.</li>
            <li>Mandatory candidate name and Date of Photograph (DOP) printed at the bottom of photos.</li>
            <li>Non-white paper shadow rejections on signature uploads.</li>
          </ul>
          <p>
            Historically, applicants had only two choices: visit a local cyber-cafe and pay fees for manual tweaks,
            or use online web tools that upload sensitive personal ID documents to unknown remote servers and bombard
            them with deceptive advertising banners.
          </p>
          <p className="font-semibold text-slate-900 dark:text-white">
            FormFit is the third, better way: an ultra-fast, 100% private, client-side compliance engine that guarantees
            zero server uploads and perfect portal compatibility on any budget smartphone.
          </p>
        </div>
      </section>

      {/* Editorial & Verification Methodology */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Our 3-Step Specification Audit Methodology
          </h2>
        </div>
        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
          <p>
            We maintain a strict verification protocol for every examination and government portal preset:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Primary Source Auditing:</strong> Specifications are extracted directly from official Gazette notifications,
              information bulletins, and official website recruitment circulars (e.g., <code>upsc.gov.in</code>, <code>ssc.gov.in</code>, <code>ibps.in</code>).
            </li>
            <li>
              <strong>Corrigendum Tracking:</strong> Whenever an exam conducting body issues an amendment or corrigendum modifying
              dimensional or byte requirements, our registry is updated immediately.
            </li>
            <li>
              <strong>Override Escape Hatch:</strong> We provide an expandable &ldquo;Customize Dimensions &amp; KB Limits&rdquo;
              drawer on every single workbench so applicants can adapt to unforeseen rule changes on the fly.
            </li>
          </ol>
        </div>
      </section>

      {/* Editorial & Technical Team Attribution */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Editorial &amp; Technical Leadership Team
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Aditya Rajan
            </h3>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              Lead Document Compliance Engineer &amp; Technical Auditor
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Specialist in binary raster manipulation, EXIF/JFIF metadata extraction, and biometric verification workflows. Former consultant on automated examination scrutiny engines.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Priya Sharma
            </h3>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              Senior Web Standards &amp; Client-Side Security Engineer
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Focuses on in-browser WebAssembly, HTML5 OffscreenCanvas GPU acceleration, and zero-trust document security under India&apos;s DPDP Act, 2023.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700/60">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span>Research &amp; Engineering Lab: Bengaluru, Karnataka, India</span>
        </div>
      </section>

      {/* Official Non-Affiliation Disclaimer */}
      <section className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <span className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
          Official Non-Affiliation Notice
        </span>
        <p>
          FormFit is an independent educational and civic technology utility. It is not affiliated with,
          sponsored by, or operated by the Union Public Service Commission (UPSC), Staff Selection Commission (SSC),
          National Testing Agency (NTA), Institute of Banking Personnel Selection (IBPS), Unique Identification Authority
          of India (UIDAI), Protean eGov Technologies (NSDL), UTIITSL, or any Central or State Government department.
        </p>
      </section>

      <div className="text-center pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors"
        >
          <span>Try FormFit Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
