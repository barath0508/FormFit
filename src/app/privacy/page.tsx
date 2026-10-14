import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ShieldCheck,
  WifiOff,
  Terminal,
  EyeOff,
  Lock,
  Cookie,
  FileCheck,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Zero-Upload Security Proof | FormFit',
  description:
    'FormFit processes photos, signatures, and documents 100% inside your browser RAM. Read our DPDP Act compliance, Google AdSense cookie policy, and zero-server guarantee.',
  alternates: {
    canonical: 'https://formfit.in/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Client-Side Privacy Guarantee</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy Policy &amp; Security Architecture
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          FormFit (formfit.in) was engineered with a strict <strong>Privacy-First, Zero-Upload architecture</strong>.
          We believe candidates applying for government exams and civic IDs should never have their identity documents,
          handwritten signatures, or caste certificates stored on commercial cloud servers.
        </p>
      </header>

      {/* 1. Technical Explanation of Client-Side Processing */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          1. 100% Client-Side Image &amp; Document Processing Guarantee
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          When you select a candidate photograph, signature, or PDF certificate on FormFit, the file is read
          directly into your device&apos;s local Random Access Memory (RAM) using the browser&apos;s native{' '}
          <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-indigo-600 font-mono text-xs">
            FileReader
          </code>{' '}
          and{' '}
          <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-indigo-600 font-mono text-xs">
            createImageBitmap
          </code>{' '}
          APIs.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          All image cropping, pixel resampling, 200/300 DPI binary JFIF patch injection, paper whitening thresholding,
          and exact-KB compression algorithms execute exclusively inside your web browser via HTML5 Canvas and
          WebAssembly. <strong>No file payload, image binary, or biometric data is ever transmitted across the internet
          or stored on any FormFit server.</strong>
        </p>
      </section>

      {/* 2. Google AdSense & DoubleClick DART Cookies Disclosure */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cookie className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          2. Google AdSense &amp; DoubleClick DART Cookie Disclosure
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          FormFit uses Google AdSense to serve advertisements to support this free educational utility.
          In accordance with Google publisher policies, we provide the following mandatory disclosures:
        </p>
        <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <li>
            Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this
            website or other websites on the internet.
          </li>
          <li>
            Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their
            visit to this site and/or other sites on the Internet.
          </li>
          <li>
            Users may opt out of personalized advertising by visiting{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline inline-flex items-center gap-1"
            >
              Google Ads Settings <ExternalLink className="w-3 h-3" />
            </a>.
          </li>
          <li>
            Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by
            visiting{' '}
            <a
              href="https://www.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline inline-flex items-center gap-1"
            >
              aboutads.info <ExternalLink className="w-3 h-3" />
            </a>.
          </li>
        </ul>
      </section>

      {/* 3. DPDP Act (India) & GDPR Consent Rights */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          3. Compliance with India&apos;s DPDP Act, 2023 &amp; GDPR
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Under the Digital Personal Data Protection Act, 2023 (India) and the General Data Protection Regulation (GDPR),
          data principles have fundamental rights over their personal identifiers.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Because FormFit implements <em>Privacy by Design</em>:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>We do not collect names, Aadhaar numbers, PAN numbers, or biometric fingerprints.</li>
          <li>We do not create candidate user accounts or demand mobile phone numbers for OTP verification.</li>
          <li>We do not maintain databases of uploaded student images.</li>
          <li>Anonymous analytical logs (e.g. pageviews) contain no personally identifiable information (PII).</li>
        </ul>
      </section>

      {/* 4. Independent DevTools Verification Protocol */}
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
            can independently verify that zero bytes leave your computer:
          </p>
        </div>

        <ol className="space-y-4 text-xs sm:text-sm text-slate-300">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 font-bold flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <strong className="text-white">Open Developer Tools:</strong> Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-xs">F12</kbd> (or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-xs">Ctrl + Shift + I</kbd> on Windows).
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 font-bold flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <strong className="text-white">Navigate to the Network Tab:</strong> Click on the <strong>Network</strong> tab at the top and select the <strong>Fetch/XHR</strong> sub-filter.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 font-bold flex items-center justify-center shrink-0">
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

      {/* Contact Link */}
      <footer className="text-center pt-4 text-xs text-slate-500 dark:text-slate-400">
        Questions regarding our privacy architecture? Contact us at{' '}
        <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
          privacy@formfit.in
        </Link>
      </footer>
    </div>
  );
}
