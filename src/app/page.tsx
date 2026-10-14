import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ResizerWorkbench } from '@/components/workspace/ResizerWorkbench';
import { EXAM_PRESETS, getPresetBySlug } from '@/data/presets';
import { VisualDosAndDonts } from '@/components/content/VisualDosAndDonts';
import { ExamFaqAccordion } from '@/components/content/ExamFaqAccordion';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Zap,
  Lock,
  ArrowRight,
  Layers,
  Sparkles,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'FormFit India — Free Client-Side Exam Photo, Signature & Document Resizer',
  description:
    'Free online photo and signature resizer for UPSC, SSC, IBPS, SBI, RRB, NEET, JEE, PAN Card, and Indian Passport. Injects exact 200/300 DPI header, satisfies strict 10–20 KB & 20–50 KB floors, and adds Name/Date slates. 100% private in-browser tool.',
};

export default function HomePage() {
  const defaultPreset = getPresetBySlug('upsc-photo-signature-resizer') || EXAM_PRESETS[0]!;

  const generalFaqs = [
    {
      question: 'How does FormFit India ensure 100% privacy for sensitive documents?',
      answer:
        'All image resizing, background whitening, date slate rendering, and JPEG compression execute entirely inside your device memory using HTML5 Canvas and Web Workers. Zero bytes of your photographs, signatures, or caste/identity certificates are ever uploaded to any remote server.',
    },
    {
      question: 'Why do government portals like NSDL PAN and State PSCs reject resized photos?',
      answer:
        'Government upload validators inspect the binary JFIF (APP0) density metadata header in the JPEG file to confirm it contains exactly 200 DPI or 300 DPI. Standard online photo editors only export at default 72 or 96 DPI. FormFit India automatically injects the verified big-endian DPI header bytes.',
    },
    {
      question: 'How do you prevent signatures from falling below the minimum KB floor (e.g., 10 KB or 30 KB)?',
      answer:
        'Clean signatures on white paper compress down to 3 KB–8 KB even at high quality, causing portals like SSC (10–20 KB) and Railway RRB (30–70 KB) to reject them. FormFit India uses intelligent, standards-compliant JPEG Comment (0xFFFE) byte-floor padding so your signature always satisfies the portal minimum size requirement.',
    },
    {
      question: 'Can I use FormFit India while completely offline?',
      answer:
        'Yes! Once this web page is loaded in your browser, you can turn off your Wi-Fi, cellular data, or enable Airplane Mode. The tool will continue to resize, filter, and download your files completely offline.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Header Section */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Verified 2026 Official Exam Specifications</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Privacy-First Exam Photo, Signature &amp; Document Resizer
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Format photos and signatures for <strong>UPSC, SSC, IBPS, NEET, JEE, RRB, and PAN Cards</strong> in seconds.
          Guarantees exact pixel dimensions, locks file sizes inside strict <strong>10–20 KB &amp; 20–50 KB</strong> windows,
          and injects true <strong>200/300 DPI</strong> headers.
        </p>
      </div>

      {/* Primary Resizer Interactive Workbench */}
      <section aria-label="Interactive Image Resizer Workbench">
        <ResizerWorkbench initialPreset={defaultPreset} />
      </section>

      {/* Top Exam Preset Quick Grid */}
      <section className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Instant Portals &amp; Exam Presets
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select your specific examination to launch a pre-configured workbench with official rules.
            </p>
          </div>
          <Link
            href="/specs-directory"
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 flex items-center gap-1 group"
          >
            <span>View All 24+ Exams</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {EXAM_PRESETS.slice(0, 8).map((preset) => (
            <Link
              key={preset.slug}
              href={`/resize/${preset.slug}`}
              className="group p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  <span>{preset.category.replace('_', ' ')}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">
                    200 DPI
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {preset.shortName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {preset.fullName}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <span className="font-mono text-[11px]">
                  {preset.assets[0]?.widthPx}×{preset.assets[0]?.heightPx} px • {preset.assets[0]?.minKB}–{preset.assets[0]?.maxKB} KB
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why FormFit India vs Other Tools */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Why Generic Resizers Cause Government Portal Rejections
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Indian recruitment portals (UPSC, SSC, IBPS, NTA) enforce specialized validation scripts that
            standard image editors are not built to satisfy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Minimum KB Floor Padding
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When an SSC or Railway signature compresses to 6 KB, standard tools fail because portals demand
              at least 10 KB or 30 KB. We automatically inject safe JFIF comment bytes to hit the floor.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              True Binary DPI Header Injection
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              NSDL PAN and State PSC validators reject images without 200 or 300 DPI metadata. We patch the binary
              JFIF APP0 segment so your image passes backend validation immediately.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              100% Client-Side Privacy
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Never upload your photo, signature, or identity cards to suspicious third-party servers. All operations
              execute locally in your browser memory and work even in Airplane Mode.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Do's & Don'ts */}
      <section>
        <VisualDosAndDonts />
      </section>

      {/* Master FAQ Accordion */}
      <section>
        <ExamFaqAccordion faqs={generalFaqs} portalName="Indian Competitive Exam" />
      </section>
    </div>
  );
}
