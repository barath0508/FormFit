import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPresetBySlug, getAllPresetSlugs } from '@/data/presets';
import { buildExamPageMetadata } from '@/lib/seo/metadata-builder';
import { ResizerWorkbench } from '@/components/workspace/ResizerWorkbench';
import { OfficialSpecTable } from '@/components/content/OfficialSpecTable';
import { StepByStepCaptureGuide } from '@/components/content/StepByStepCaptureGuide';
import { PortalRejectionTroubleshooting } from '@/components/content/PortalRejectionTroubleshooting';
import { VisualDosAndDonts } from '@/components/content/VisualDosAndDonts';
import { CmToPixelDpiReferenceCard } from '@/components/content/CmToPixelDpiReferenceCard';
import { ExamFaqAccordion } from '@/components/content/ExamFaqAccordion';
import { EditorialVerificationCard } from '@/components/content/EditorialVerificationCard';
import { RelatedExamsInternalLinks } from '@/components/content/RelatedExamsInternalLinks';
import { AdSlot } from '@/components/monetization/AdSlot';
import { JsonLd } from '@/components/seo/JsonLd';
import { ChevronRight, CheckCircle2, ExternalLink } from 'lucide-react';

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
  if (!preset) return { title: 'Portal Not Found | FormFit' };
  return buildExamPageMetadata(preset);
}

export default async function PortalResizerPage({ params }: PageProps) {
  const { portalSlug } = await params;
  const preset = getPresetBySlug(portalSlug);

  if (!preset) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* 1. Multi-Entity JSON-LD Schema Graph */}
      <JsonLd preset={preset} />

      {/* 2. Breadcrumb Navigation & Verification Badge */}
      <nav aria-label="Breadcrumb" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li>
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5" />
          </li>
          <li>
            <Link href="/specs-directory" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Exam Directory
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5" />
          </li>
          <li className="font-semibold text-slate-800 dark:text-slate-200">
            {preset.shortName} Resizer
          </li>
        </ol>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Audited: {preset.lastVerifiedDate}</span>
          </span>
          <a
            href={preset.officialWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </nav>

      {/* 3. Hero Header with Single Unique H1 */}
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {preset.fullName} Photo, Signature &amp; Document Resizer
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Instantly crop and compress your candidate photo and signature to exact {preset.shortName} dimensions and KB limits.
          100% private in-browser tool complying with official notification: {preset.notificationReference}.
        </p>
      </header>

      {/* 4. Interactive Client-Side Workbench (Above the Fold) */}
      <section aria-label="Interactive Resizer Workbench">
        <ResizerWorkbench initialPreset={preset} />
      </section>

      {/* 5. CLS-Safe Ad Slot #1 (Strictly Separated by 40px Margin) */}
      <div className="my-10">
        <AdSlot slotId="workbench-below-banner" format="horizontal" />
      </div>

      {/* 6. Rich Static Editorial Documentation (950–1,350 Words for SEO & AdSense) */}
      <article className="space-y-10">
        <OfficialSpecTable
          assets={preset.assets}
          portalFullName={preset.fullName}
          conductingBody={preset.conductingBody}
          notificationRef={preset.notificationReference}
          lastVerifiedDate={preset.lastVerifiedDate}
        />

        <StepByStepCaptureGuide preset={preset} />

        <AdSlot slotId="mid-article-banner" format="horizontal" />

        <PortalRejectionTroubleshooting preset={preset} />

        <VisualDosAndDonts />

        <CmToPixelDpiReferenceCard preset={preset} />

        <ExamFaqAccordion faqs={preset.faqs} portalName={preset.shortName} />

        <EditorialVerificationCard
          verifiedDate={preset.lastVerifiedDate}
          officialSource={preset.notificationReference}
          officialUrl={preset.officialWebsiteUrl}
        />
      </article>

      {/* 7. CLS-Safe Ad Slot #3 */}
      <div className="my-10">
        <AdSlot slotId="pre-footer-banner" format="horizontal" />
      </div>

      {/* 8. Contextual Internal Linking Mesh */}
      <RelatedExamsInternalLinks currentSlug={preset.slug} category={preset.category} />
    </div>
  );
}
