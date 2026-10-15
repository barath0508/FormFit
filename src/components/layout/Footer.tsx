import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, ArrowUpRight, Scale, FileText, Mail, Info, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 text-sm mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Privacy Guarantee */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-white tracking-tight">
                FormFit<span className="text-indigo-400">.in</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India&apos;s privacy-first client-side exam photo, signature, and document compliance engine.
              Zero bytes of candidate media ever leave your device.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verifiable Zero-Upload Architecture</span>
            </div>
          </div>

          {/* Col 2: National Competitive Exams */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              National Competitive Exams
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/resize/upsc-cse-ias-photo-signature-resizer" className="hover:text-white transition-colors">
                  UPSC CSE / IAS Photo &amp; Sign (550×550)
                </Link>
              </li>
              <li>
                <Link href="/resize/ssc-cgl-chsl-mts-gd-resizer" className="hover:text-white transition-colors">
                  SSC CGL / CHSL Signature (10–20 KB)
                </Link>
              </li>
              <li>
                <Link href="/resize/ibps-po-clerk-so-rrb-resizer" className="hover:text-white transition-colors">
                  IBPS PO / Clerk Photo (200×230) &amp; Sign
                </Link>
              </li>
              <li>
                <Link href="/resize/sbi-po-clerk-photo-signature-resizer" className="hover:text-white transition-colors">
                  SBI Careers Photo &amp; Declaration
                </Link>
              </li>
              <li>
                <Link href="/resize/rrb-ntpc-group-d-alp-resizer" className="hover:text-white transition-colors">
                  Railway RRB NTPC Signature (30–70 KB)
                </Link>
              </li>
              <li>
                <Link href="/resize/nta-neet-ug-passport-postcard-resizer" className="hover:text-white transition-colors">
                  NEET UG Postcard (4×6&quot;) &amp; Passport Photo
                </Link>
              </li>
              <li>
                <Link href="/resize/nta-jee-main-advanced-resizer" className="hover:text-white transition-colors">
                  JEE Main Photo (10–200 KB) &amp; Sign
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Exact-KB & Dimension Tools */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Exact Size &amp; DPI Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/kb/10kb-to-20kb-signature-resizer" className="hover:text-white transition-colors">
                  10KB to 20KB Signature Resizer
                </Link>
              </li>
              <li>
                <Link href="/kb/20kb-to-50kb-photo-resizer" className="hover:text-white transition-colors">
                  20KB to 50KB Photo Compressor
                </Link>
              </li>
              <li>
                <Link href="/dimensions/200x230-pixel-photo-converter" className="hover:text-white transition-colors">
                  200×230 Pixel Photo Converter (IBPS/SBI)
                </Link>
              </li>
              <li>
                <Link href="/dimensions/140x60-pixel-signature-converter" className="hover:text-white transition-colors">
                  140×60 Pixel Signature Converter
                </Link>
              </li>
              <li>
                <Link href="/dimensions/200-dpi-photo-signature-converter" className="hover:text-white transition-colors">
                  200 DPI Header Injector (NSDL PAN)
                </Link>
              </li>
              <li>
                <Link href="/dimensions/213x213-pixel-300-dpi-pan-resizer" className="hover:text-white transition-colors">
                  213×213 300 DPI UTIITSL Resizer
                </Link>
              </li>
              <li>
                <Link href="/dimensions/4x6-inch-postcard-photo-maker" className="hover:text-white transition-colors">
                  4×6 Inch Postcard Photo Maker (NEET)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust Suite, Guides & Legal */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Trust Suite &amp; Compliance Hub
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/guides" className="hover:text-white transition-colors font-medium text-indigo-400">
                  Editorial Guides &amp; Size Chart Hub →
                </Link>
              </li>
              <li>
                <Link href="/specs-directory" className="hover:text-white transition-colors">
                  Master 2026 Exam Specs Directory
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us &amp; 3-Step Audit Methodology
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy &amp; DPDP Cookie Rights
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service &amp; User Agreement
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Official Non-Affiliation Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us &amp; Report Spec Updates
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-3 leading-relaxed">
          <p>
            <strong className="text-slate-400">Official Non-Affiliation Notice:</strong> FormFit is an
            independent, privacy-first technical image formatting utility. It is not affiliated with, endorsed by, or
            operated by the Union Public Service Commission (UPSC), Staff Selection Commission (SSC), Institute of
            Banking Personnel Selection (IBPS), National Testing Agency (NTA), Unique Identification Authority of India
            (UIDAI), Protean eGov Technologies (NSDL), UTIITSL, Ministry of Railways, or any other Government entity.
            Portal and examination names are referenced under nominative fair use strictly to inform applicants of
            technical file-specification compatibility.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60 text-slate-500 text-xs">
            <p>© {new Date().getFullYear()} FormFit (formfit-rust.vercel.app). 100% Client-Side Free Civic Utility.</p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-300">Terms</Link>
              <Link href="/disclaimer" className="hover:text-slate-300">Disclaimer</Link>
              <Link href="/about" className="hover:text-slate-300">About</Link>
              <Link href="/contact" className="hover:text-slate-300">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
