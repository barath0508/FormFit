import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getKbTargetBySlug, getAllKbTargetSlugs, KB_TARGETS } from '@/data/kb-targets';
import { buildKbPageMetadata } from '@/lib/seo/metadata-builder';
import { ResizerWorkbench } from '@/components/workspace/ResizerWorkbench';
import { AdSlot } from '@/components/monetization/AdSlot';
import { EditorialVerificationCard } from '@/components/content/EditorialVerificationCard';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Sliders,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  Binary,
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    kbSlug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllKbTargetSlugs().map((slug) => ({
    kbSlug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kbSlug } = await params;
  const target = getKbTargetBySlug(kbSlug);
  if (!target) return { title: 'File Size Tool Not Found | FormFit' };
  return buildKbPageMetadata(target);
}

export default async function KbTargetPage({ params }: PageProps) {
  const { kbSlug } = await params;
  const target = getKbTargetBySlug(kbSlug);

  if (!target) {
    notFound();
  }

  const pageUrl = `https://formfit.in/kb/${target.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://formfit.in' },
          { '@type': 'ListItem', position: 2, name: 'KB Compressors', item: 'https://formfit.in/specs-directory' },
          { '@type': 'ListItem', position: 3, name: target.title, item: pageUrl },
        ],
      },
      {
        '@type': 'WebApplication',
        '@id': `${pageUrl}#app`,
        name: target.title,
        url: pageUrl,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All HTML5 Browsers',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: target.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* 1. Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/specs-directory" className="hover:text-indigo-600 dark:hover:text-indigo-400">Directory</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-800 dark:text-slate-200">{target.minKB}KB to {target.maxKB}KB Resizer</span>
      </nav>

      {/* 3. Hero Header with Single Unique H1 */}
      <header className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-1">
          <Sliders className="w-3.5 h-3.5" />
          <span>Strict Byte-Boundary Enforcer ({target.minKB} KB – {target.maxKB} KB)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {target.heading}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          {target.subheading}
        </p>
      </header>

      {/* 4. Interactive Resizer Workbench */}
      <section aria-label="Interactive File Resizer Workbench">
        <ResizerWorkbench />
      </section>

      {/* 5. CLS-Safe Ad Slot #1 */}
      <div className="my-10">
        <AdSlot slotId="kb-workbench-below-banner" format="horizontal" />
      </div>

      {/* 6. Rich Static Editorial Documentation */}
      <article className="space-y-10">
        {/* Why this size exists */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Why Indian Portals Mandate the {target.minKB} KB to {target.maxKB} KB File Boundary
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {target.editorialContent.whyThisSizeExists}
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2 flex items-center gap-2">
            <Binary className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            The Digital Compression Mechanics
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {target.editorialContent.compressionMechanics}
          </p>
        </div>

        {/* Technical Specification Matrix */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Technical Specification Matrix ({target.minKB} KB – {target.maxKB} KB)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th scope="col" className="px-4 py-3">Technical Parameter</th>
                  <th scope="col" className="px-4 py-3">Specification Value</th>
                  <th scope="col" className="px-4 py-3">Validation Importance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                {target.editorialContent.technicalTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40">
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                      {row.parameter}
                    </td>
                    <td className="px-4 py-3 font-mono text-indigo-700 dark:text-indigo-400">
                      {row.value}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.importance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Step-by-Step Guide to Resizing Your File to {target.minKB} KB–{target.maxKB} KB
          </h2>
          <ol className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-decimal list-inside">
            {target.editorialContent.stepByStepGuide.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Mid-Article Ad Slot */}
        <div className="my-8">
          <AdSlot slotId="kb-mid-article-banner" format="horizontal" />
        </div>

        {/* Troubleshooting Rejection Table */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Rejection Troubleshooting for {target.minKB} KB–{target.maxKB} KB Uploads
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Common errors returned by government application backends and how FormFit avoids them.
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th scope="col" className="px-4 py-3">Portal Error Message</th>
                  <th scope="col" className="px-4 py-3">Root Cause</th>
                  <th scope="col" className="px-4 py-3">FormFit Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                {target.troubleshooting.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40">
                    <td className="px-4 py-3.5 text-rose-700 dark:text-rose-400 font-mono text-xs">
                      &ldquo;{item.portalMessage}&rdquo;
                    </td>
                    <td className="px-4 py-3.5 text-slate-700 dark:text-slate-300">
                      {item.cause}
                    </td>
                    <td className="px-4 py-3.5 text-emerald-800 dark:text-emerald-300 font-medium">
                      {item.solution}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Applicable Exams Grid */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Indian Examinations Requiring {target.minKB} KB to {target.maxKB} KB
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
            Click any exam to open its dedicated preset pre-configured with exact pixel dimensions and official guidelines:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {target.applicableExams.map((exam, idx) => (
              <Link
                key={idx}
                href={exam.url}
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-slate-50/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800 transition-all flex flex-col justify-between group"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {exam.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">{exam.spec}</p>
                </div>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 mt-3">
                  Open Dedicated Resizer <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions ({target.minKB}KB–{target.maxKB}KB Resizer)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Expert answers regarding byte compression, portal rejection errors, and client-side security.
              </p>
            </div>
          </div>
          <div className="space-y-3 mt-6">
            {target.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/40 p-4 open:bg-white dark:open:bg-slate-800 transition-colors"
              >
                <summary className="font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="text-indigo-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/60 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* E-E-A-T Editorial Verification Card */}
        <EditorialVerificationCard
          verifiedDate="2026-03-01"
          officialSource="Indian Government Recruitment Examination IT Guidelines (NIC & TCS iON)"
          officialUrl="https://formfit.in/about"
        />
      </article>

      {/* 7. Sibling KB Targets & Internal Link Hub */}
      <section className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Other Exact-KB File Size Converters
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {KB_TARGETS.filter((t) => t.slug !== target.slug).map((sibling) => (
            <Link
              key={sibling.slug}
              href={`/kb/${sibling.slug}`}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-indigo-600 transition-colors"
            >
              <div className="font-bold">{sibling.minKB}KB to {sibling.maxKB}KB</div>
              <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{sibling.title}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pre-Footer AdSlot */}
      <div className="my-10">
        <AdSlot slotId="kb-pre-footer-banner" format="horizontal" />
      </div>
    </div>
  );
}
