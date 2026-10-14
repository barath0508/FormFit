import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { EXAM_PRESETS, getPresetBySlug, getAllPresetSlugs } from '@/data/presets';
import { ResizerWorkbench } from '@/components/workspace/ResizerWorkbench';
import { OfficialSpecTable } from '@/components/content/OfficialSpecTable';
import { VisualDosAndDonts } from '@/components/content/VisualDosAndDonts';
import { ExamFaqAccordion } from '@/components/content/ExamFaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    portalSlug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllPresetSlugs().map((slug) => ({
    portalSlug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { portalSlug } = await params;
  const preset = getPresetBySlug(portalSlug);
  if (!preset) return { title: 'Portal Not Found | FormFit India' };

  const photoAsset = preset.assets.find((a) => a.assetType === 'photo') || preset.assets[0]!;
  const signAsset = preset.assets.find((a) => a.assetType === 'signature');

  const title = `${preset.shortName} Photo & Signature Resizer (${photoAsset.widthPx}x${photoAsset.heightPx} px, ${photoAsset.minKB}–${photoAsset.maxKB} KB) | FormFit India`;
  const description = `Resize ${preset.fullName} photo (${photoAsset.widthPx}x${photoAsset.heightPx} px, ${photoAsset.minKB}–${photoAsset.maxKB} KB) and signature ${
    signAsset ? `(${signAsset.widthPx}x${signAsset.heightPx} px, ${signAsset.minKB}–${signAsset.maxKB} KB)` : ''
  } online for free. 100% private in-browser tool with verified ${photoAsset.dpi} DPI header and Name/Date slate.`;

  return {
    title,
    description,
    keywords: preset.searchKeywords,
    alternates: {
      canonical: `https://formfit.in/resize/${preset.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://formfit.in/resize/${preset.slug}`,
      type: 'website',
    },
  };
}

export default async function PortalResizerPage({ params }: PageProps) {
  const { portalSlug } = await params;
  const preset = getPresetBySlug(portalSlug);

  if (!preset) {
    notFound();
  }

  // Get related exams in same category
  const relatedExams = EXAM_PRESETS.filter(
    (p) => p.category === preset.category && p.slug !== preset.slug
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Structured Data Injector */}
      <JsonLd preset={preset} />

      {/* Breadcrumb Navigation & Verification Badge */}
      <nav aria-label="Breadcrumb" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li>
            <Link href="/" className="hover:text-blue-700 dark:hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5" />
          </li>
          <li>
            <Link href="/specs-directory" className="hover:text-blue-700 dark:hover:text-blue-400">
              Exam Directory
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5" />
          </li>
          <li className="font-semibold text-slate-800 dark:text-slate-200">
            {preset.shortName}
          </li>
        </ol>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Verified: {preset.lastVerifiedDate}</span>
          </span>
          <a
            href={preset.officialWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-blue-700 dark:hover:text-blue-400"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </nav>

      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {preset.fullName} Photo, Signature &amp; Document Resizer
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Instantly crop and compress your photo and signature to exact {preset.shortName} requirements.
          Complies with the latest official notification: {preset.notificationReference}.
        </p>
      </div>

      {/* Interactive Workbench Pre-Loaded with Current Preset */}
      <section aria-label="Interactive Resizer Workbench">
        <ResizerWorkbench initialPreset={preset} />
      </section>

      {/* Official Specification Matrix */}
      <section>
        <OfficialSpecTable
          assets={preset.assets}
          portalFullName={preset.fullName}
          conductingBody={preset.conductingBody}
          notificationRef={preset.notificationReference}
          lastVerifiedDate={preset.lastVerifiedDate}
        />
      </section>

      {/* Step-by-Step Instructions */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Step-by-Step Guide to Formatting Your {preset.shortName} Uploads
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-xs">
              1
            </span>
            <h3 className="font-bold text-slate-900 dark:text-white">Choose Asset</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-normal">
              Click the tab for Passport Photo, Scanned Signature, or Document PDF above.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-xs">
              2
            </span>
            <h3 className="font-bold text-slate-900 dark:text-white">Align &amp; Crop</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-normal">
              Drag and zoom your photo to fit the biometric face guide or signature box.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-xs">
              3
            </span>
            <h3 className="font-bold text-slate-900 dark:text-white">Apply Filters / Name</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-normal">
              Toggle Name &amp; Date plaque for photos or the paper whitener for signatures.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
              4
            </span>
            <h3 className="font-bold text-slate-900 dark:text-white">Download Compliant File</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-normal">
              Click the green button to save your verified file with 200 DPI header ready for upload.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Do's & Don'ts */}
      <section>
        <VisualDosAndDonts />
      </section>

      {/* Exam FAQs */}
      <section>
        <ExamFaqAccordion faqs={preset.faqs} portalName={preset.shortName} />
      </section>

      {/* Related Exams in Same Category */}
      {relatedExams.length > 0 && (
        <section className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Related Recruitment &amp; Entrance Exams
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {relatedExams.map((rel) => (
              <Link
                key={rel.slug}
                href={`/resize/${rel.slug}`}
                className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 hover:shadow-sm text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all flex items-center justify-between group"
              >
                <span>{rel.shortName}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
