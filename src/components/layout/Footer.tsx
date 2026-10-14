import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 text-sm mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Privacy Guarantee */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-white tracking-tight">
                FormFit<span className="text-blue-400">.in</span>
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

          {/* Col 2: Popular Competitive Exams */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              National Competitive Exams
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/resize/upsc-photo-signature-resizer" className="hover:text-white transition-colors">
                  UPSC CSE / IAS Photo & Sign (550×550)
                </Link>
              </li>
              <li>
                <Link href="/resize/ssc-cgl-chsl-mts-resizer" className="hover:text-white transition-colors">
                  SSC CGL / CHSL Signature (10–20 KB)
                </Link>
              </li>
              <li>
                <Link href="/resize/ibps-po-clerk-photo-resizer" className="hover:text-white transition-colors">
                  IBPS PO / Clerk Photo (200×230) & Sign
                </Link>
              </li>
              <li>
                <Link href="/resize/sbi-po-clerk-photo-resizer" className="hover:text-white transition-colors">
                  SBI Careers Photo & Thumb Impression
                </Link>
              </li>
              <li>
                <Link href="/resize/rrb-ntpc-group-d-photo-resizer" className="hover:text-white transition-colors">
                  Railway RRB NTPC Signature (30–70 KB)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: NTA & Civic Identity Cards */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              NTA & Identity Cards
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/resize/nta-jee-main-photo-resizer" className="hover:text-white transition-colors">
                  NTA JEE Main Photo (10–200 KB)
                </Link>
              </li>
              <li>
                <Link href="/resize/nta-neet-ug-photo-resizer" className="hover:text-white transition-colors">
                  NEET UG Postcard (4×6&quot;) & Passport Photo
                </Link>
              </li>
              <li>
                <Link href="/resize/gate-photo-signature-resizer" className="hover:text-white transition-colors">
                  GATE GOAPS Signature (560×180 px)
                </Link>
              </li>
              <li>
                <Link href="/resize/nsdl-pan-card-photo-resizer" className="hover:text-white transition-colors">
                  NSDL PAN Card Photo 200 DPI (2.5×3.5 cm)
                </Link>
              </li>
              <li>
                <Link href="/resize/utiitsl-pan-card-photo-resizer" className="hover:text-white transition-colors">
                  UTIITSL PAN 300 DPI Photo & 600 DPI Sign
                </Link>
              </li>
              <li>
                <Link href="/resize/passport-seva-photo-resizer" className="hover:text-white transition-colors">
                  Passport Seva Kendra Photo (4.5×3.5 cm)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Standalone Utilities & Standards */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Specialized Tools & Trust
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tools/photo-signature-joiner" className="hover:text-white transition-colors">
                  Photo + Signature Joiner (Vertical/Horizontal)
                </Link>
              </li>
              <li>
                <Link href="/tools/date-name-on-photo" className="hover:text-white transition-colors">
                  Name & Date on Photo (DOP) Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/jpg-to-pdf-under-size" className="hover:text-white transition-colors">
                  Certificate to PDF Under 100KB / 300KB
                </Link>
              </li>
              <li>
                <Link href="/specs-directory" className="hover:text-white transition-colors">
                  Full 2026 Exam Specs Directory
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  How We Guarantee Zero Uploads (DevTools Proof)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Editorial Verification Standards & About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box (Section 14 Compliance) */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-3 leading-relaxed">
          <p>
            <strong className="text-slate-400">Official Non-Affiliation Disclaimer:</strong> FormFit India is an
            independent, privacy-first technical image formatting utility. It is not affiliated with, endorsed by, or
            operated by the Union Public Service Commission (UPSC), Staff Selection Commission (SSC), Institute of
            Banking Personnel Selection (IBPS), National Testing Agency (NTA), Unique Identification Authority of India
            (UIDAI), Protean eGov Technologies (NSDL), UTIITSL, Ministry of Railways, or any other Government entity.
            Portal and examination names are referenced under nominative fair use strictly to inform applicants of
            technical file-specification compatibility.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-slate-500">
            <p>© {new Date().getFullYear()} FormFit India (formfit.in). Free Civic Utility for Indian Aspirants.</p>
            <p className="flex items-center gap-1">
              Crafted with mathematical precision for 100% on-device privacy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
