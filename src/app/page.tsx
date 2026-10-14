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
    'Free online photo and signature resizer for UPSC, SSC, IBPS, RRB, NEET & PAN Card. Injects 200/300 DPI headers & locks 10–20KB and 20–50KB sizes. 100% private in-browser.',
  alternates: {
    canonical: 'https://formfit.in',
  },
  openGraph: {
    title: 'FormFit India — Official Exam Spec Photo & Signature Resizer',
    description:
      'Free online photo and signature resizer for UPSC, SSC, IBPS, RRB, NEET & PAN Card. Injects 200/300 DPI headers & locks 10–20KB and 20–50KB sizes. 100% private in-browser.',
    url: 'https://formfit.in',
    siteName: 'FormFit India — Official Exam Spec Photo & Signature Resizer',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function HomePage() {
  const defaultPreset = getPresetBySlug('upsc-photo-signature-resizer') || EXAM_PRESETS[0]!;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://formfit.in' },
        ],
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://formfit.in/#app',
        name: 'FormFit India — Official Exam Photo, Signature & Document Resizer',
        url: 'https://formfit.in',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Android, iOS, Windows, macOS, Linux (All HTML5 Browsers)',
        browserRequirements: 'Requires HTML5 Canvas and JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        author: {
          '@type': 'Organization',
          name: 'FormFit India Document Compliance Lab',
          url: 'https://formfit.in/about',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does FormFit India ensure 100% privacy for sensitive documents?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All image resizing, background whitening, date slate rendering, and JPEG compression execute entirely inside your device memory using HTML5 Canvas and Web Workers. Zero bytes of your photographs, signatures, or caste/identity certificates are ever uploaded to any remote server.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why do government portals like NSDL PAN and State PSCs reject resized photos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Government upload validators inspect the binary JFIF (APP0) density metadata header in the JPEG file to confirm it contains exactly 200 DPI or 300 DPI. Standard online photo editors only export at default 72 or 96 DPI. FormFit India automatically injects the verified big-endian DPI header bytes.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you prevent signatures from falling below the minimum KB floor (e.g., 10 KB or 30 KB)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Clean signatures on white paper compress down to 3 KB–8 KB even at high quality, causing portals like SSC (10–20 KB) and Railway RRB (30–70 KB) to reject them. FormFit India uses intelligent, standards-compliant JPEG Comment (0xFFFE) byte-floor padding so your signature always satisfies the portal minimum size requirement.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I use FormFit India while completely offline?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Once this web page is loaded in your browser, you can turn off your Wi-Fi, cellular data, or enable Airplane Mode. The tool will continue to resize, filter, and download your files completely offline.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the required photo format for UPSC OTR and CSE exams?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'UPSC mandates that passport photographs have minimum 350x350 pixels up to 1000x1000 pixels, with file size between 20 KB and 300 KB. The face must occupy 75% to 80% of the image frame, and the photograph must clearly display the candidate name and the date of capture at the bottom.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I resize an IBPS handwritten declaration to 50KB-100KB?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'IBPS PO, Clerk, and SO forms require the handwritten declaration in black ink on white paper, formatted to 800x400 pixels (aspect ratio 2:1) within 50 KB to 100 KB. FormFit provides a dedicated preset that scales declaration scans to exact dimensions and compresses them into the compliant KB range.',
            },
          },
          {
            '@type': 'Question',
            name: 'What ink color must be used for SSC, Banking, and NTA signatures?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SSC, UPSC, and State PSCs accept black or blue ink signatures, while IBPS, SBI, and NTA strictly mandate black ink on white unruled paper. Signatures written in capital letters or blurred by camera shake are summarily rejected.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I convert a photo to 200 DPI for NSDL PAN card applications?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'NSDL Protean requires 200 DPI resolution at 2.5x3.5 cm (197x276 pixels) under 50 KB. FormFit automatically rewires the JPEG JFIF header to declare 200 DPI horizontal and vertical density, ensuring immediate portal acceptance without Photoshop.',
            },
          },
        ],
      },
    ],
  };

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
    {
      question: 'What is the required photo format for UPSC OTR and CSE exams?',
      answer:
        'UPSC mandates that passport photographs have minimum 350x350 pixels up to 1000x1000 pixels, with file size between 20 KB and 300 KB. The face must occupy 75% to 80% of the image frame, and the photograph must clearly display the candidate name and the date of capture at the bottom.',
    },
    {
      question: 'How do I resize an IBPS handwritten declaration to 50KB-100KB?',
      answer:
        'IBPS PO, Clerk, and SO forms require the handwritten declaration in black ink on white paper, formatted to 800x400 pixels (aspect ratio 2:1) within 50 KB to 100 KB. FormFit provides a dedicated preset that scales declaration scans to exact dimensions and compresses them into the compliant KB range.',
    },
    {
      question: 'What ink color must be used for SSC, Banking, and NTA signatures?',
      answer:
        'SSC, UPSC, and State PSCs accept black or blue ink signatures, while IBPS, SBI, and NTA strictly mandate black ink on white unruled paper. Signatures written in capital letters or blurred by camera shake are summarily rejected.',
    },
    {
      question: 'How do I convert a photo to 200 DPI for NSDL PAN card applications?',
      answer:
        'NSDL Protean requires 200 DPI resolution at 2.5x3.5 cm (197x276 pixels) under 50 KB. FormFit automatically rewires the JPEG JFIF header to declare 200 DPI horizontal and vertical density, ensuring immediate portal acceptance without Photoshop.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <span>View All 32+ Exams</span>
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

      {/* Comprehensive Master Comparison Table */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Official Indian Examination Specification Reference (2026–2027)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Carefully audited specifications cross-referenced against official notifications from UPSC, SSC, IBPS, NTA, and RRB recruitment boards.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th scope="col" className="px-4 py-3">Examination / Portal</th>
                <th scope="col" className="px-4 py-3">Photo Dimensions &amp; Size</th>
                <th scope="col" className="px-4 py-3">Signature Dimensions &amp; Size</th>
                <th scope="col" className="px-4 py-3">DPI &amp; Mandatory Rules</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
              <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">UPSC Civil Services (OTR)</td>
                <td className="px-4 py-3 font-mono text-blue-700 dark:text-blue-400">350×350 to 1000×1000 px (20–300 KB)</td>
                <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">550×350 px (20–300 KB)</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">200 DPI, 75% face coverage, Name &amp; Date plaque required</td>
              </tr>
              <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">SSC (CGL, CHSL, MTS, GD)</td>
                <td className="px-4 py-3 font-mono text-blue-700 dark:text-blue-400">275×354 px / 3.5×4.5 cm (20–50 KB)</td>
                <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">236×118 px / 4.0×2.0 cm (10–20 KB)</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">200 DPI, white background, no caps in signature</td>
              </tr>
              <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">IBPS &amp; SBI Banking</td>
                <td className="px-4 py-3 font-mono text-blue-700 dark:text-blue-400">200×230 px / 3.5×4.5 cm (20–50 KB)</td>
                <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">140×60 px (10–20 KB)</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">200 DPI, black ink signature, 800×400 declaration (50–100 KB)</td>
              </tr>
              <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">NTA NEET UG &amp; JEE Main</td>
                <td className="px-4 py-3 font-mono text-blue-700 dark:text-blue-400">276×354 px &amp; 4×6 inch Postcard (10–200 KB)</td>
                <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">276×118 px (4–30 KB)</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">200 DPI, white background, 80% face coverage showing ears</td>
              </tr>
              <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">Railway RRB (NTPC, Group D, ALP)</td>
                <td className="px-4 py-3 font-mono text-blue-700 dark:text-blue-400">275×354 px (30–70 KB)</td>
                <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">140×60 px (30–70 KB)</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">200 DPI, strict 30 KB minimum floor for signatures</td>
              </tr>
              <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40">
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">NSDL Protean PAN Card</td>
                <td className="px-4 py-3 font-mono text-blue-700 dark:text-blue-400">197×276 px / 2.5×3.5 cm (10–50 KB)</td>
                <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">354×157 px / 4.5×2.0 cm (10–50 KB)</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Mandatory 200 DPI JFIF binary header check</td>
              </tr>
            </tbody>
          </table>
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

      {/* Guide on Candidate Privacy & Server Security */}
      <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          Why Server-Based Resizers Threaten Applicant Identity Security
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm space-y-3 leading-relaxed text-slate-600 dark:text-slate-300">
          <p>
            Every year, lakhs of competitive examination candidates inadvertently upload sensitive identity artifacts—including clear passport portraits, handwritten signatures, Aadhaar numbers, and category certificates—to unvetted third-party resizing websites. Many of these websites retain uploaded files on remote server disks, exposing candidates to digital identity theft, fraudulent bank account creation, and impersonation scams.
          </p>
          <p>
            FormFit India was engineered specifically to solve this structural vulnerability. By leveraging HTML5 Canvas, the JavaScript File API, and WebAssembly, our application operates completely client-side inside your browser sandbox. When you select a photo, your browser decodes the bitmap directly into local RAM, crops and scales the pixels, pads binary bytes to satisfy minimum KB thresholds, and streams the compliant JPEG back to your Downloads folder. No server endpoint ever touches your personal files.
          </p>
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
