import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getGuideBySlug, getAllGuideSlugs } from '@/data/guides';
import { getPresetBySlug } from '@/data/presets';
import { buildGuidePageMetadata } from '@/lib/seo/metadata-builder';
import { AdSlot } from '@/components/monetization/AdSlot';
import {
  ChevronRight,
  Clock,
  User,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sliders,
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    guideSlug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({
    guideSlug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { guideSlug } = await params;
  const guide = getGuideBySlug(guideSlug);
  if (!guide) return { title: 'Guide Not Found | FormFit' };
  return buildGuidePageMetadata(guide);
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { guideSlug } = await params;
  const guide = getGuideBySlug(guideSlug);

  if (!guide) {
    notFound();
  }

  const pageUrl = `https://formfit-rust.vercel.app/guides/${guide.slug}`;

  // Match primary related exam preset for the interactive callout card
  const primaryExamSlug = guide.relatedExamSlugs[0];
  const primaryPreset = primaryExamSlug ? getPresetBySlug(primaryExamSlug) : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://formfit-rust.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Guides Hub', item: 'https://formfit-rust.vercel.app/guides' },
          { '@type': 'ListItem', position: 3, name: guide.title, item: pageUrl },
        ],
      },
      {
        '@type': 'TechArticle',
        '@id': `${pageUrl}#article`,
        headline: guide.title,
        description: guide.metaDescription,
        url: pageUrl,
        datePublished: guide.publishedDate,
        dateModified: guide.lastUpdatedDate,
        inLanguage: 'en-IN',
        author: {
          '@type': 'Person',
          name: guide.author.name,
          jobTitle: guide.author.role,
        },
        publisher: {
          '@type': 'Organization',
          name: 'FormFit Document Compliance Lab',
          url: 'https://formfit-rust.vercel.app',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: guide.faqs.map((faq) => ({
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
    <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/guides" className="hover:text-indigo-600 dark:hover:text-indigo-400">Guides</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{guide.category}</span>
      </nav>

      {/* 3. Article Header */}
      <header className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {guide.category}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {guide.readTime}
          </span>
          <span className="text-xs text-slate-500">
            Last Updated: {guide.lastUpdatedDate}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {guide.heading}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {guide.subheading}
        </p>

        {/* E-E-A-T Author Card */}
        <div className="flex items-center gap-3 pt-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-sm shrink-0 border border-indigo-200 dark:border-indigo-800">
            {guide.author.name.charAt(0)}
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              {guide.author.name}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {guide.author.role}
            </div>
          </div>
        </div>
      </header>

      {/* Guide-to-Tool Action Card */}
      {primaryPreset && (
        <aside
          aria-label="Interactive Resizer Tool Callout"
          className="p-5 rounded-xl border border-indigo-200 dark:border-indigo-800/80 bg-gradient-to-r from-indigo-50/80 to-purple-50/60 dark:from-indigo-950/30 dark:to-purple-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-indigo-950 dark:text-indigo-200">
                Format Your File Now: {primaryPreset.shortName} Resizer Workbench
              </h3>
            </div>
            <p className="text-xs text-indigo-900/80 dark:text-indigo-300/80">
              Directly apply the exact dimensions, 200 DPI JFIF injection, and byte windows discussed in this guide.
            </p>
          </div>
          <Link
            href={`/resize/${primaryPreset.slug}`}
            className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all flex items-center gap-1.5 shrink-0 justify-center"
          >
            Open Interactive Tool <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </aside>
      )}

      {/* Summary Lead */}
      <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border-l-4 border-indigo-600 dark:border-indigo-500 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
        {guide.summary}
      </div>

      {/* Top Ad Slot */}
      <AdSlot slotId="guide-article-top" format="horizontal" />

      {/* Article Content Sections */}
      <article className="space-y-10 text-slate-800 dark:text-slate-200">
        {guide.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-2">
              {section.heading}
            </h2>

            {section.subheading && (
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {section.subheading}
              </h3>
            )}

            <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {section.body.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>

            {section.callout && (
              <div
                className={`p-4 rounded-lg text-xs leading-relaxed flex items-start gap-3 ${
                  section.callout.type === 'warning'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                    : section.callout.type === 'important'
                    ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                    : 'bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200'
                }`}
              >
                {section.callout.type === 'warning' || section.callout.type === 'important' ? (
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <div>{section.callout.text}</div>
              </div>
            )}

            {section.table && (
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-xs divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      {section.table.headers.map((h, hIdx) => (
                        <th key={hIdx} scope="col" className="px-4 py-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-slate-700 dark:text-slate-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </article>

      {/* Mid-Article Ad Slot */}
      <div className="my-8">
        <AdSlot slotId="guide-article-mid" format="horizontal" />
      </div>

      {/* FAQs Section */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions About This Topic
            </h2>
          </div>
          <div className="space-y-3">
            {guide.faqs.map((faq, idx) => (
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
        </section>
      )}

      {/* Related Exam Tools Callout Grid */}
      {guide.relatedExamSlugs.length > 0 && (
        <section className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Applicable Exam Resizers Mentioned in This Guide
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {guide.relatedExamSlugs.map((slug) => {
              const preset = getPresetBySlug(slug);
              if (!preset) return null;
              return (
                <Link
                  key={slug}
                  href={`/resize/${slug}`}
                  className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-500 hover:shadow-sm text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all flex items-center justify-between group"
                >
                  <span>{preset.shortName}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Pre-Footer Ad Slot */}
      <div className="my-10">
        <AdSlot slotId="guide-article-bottom" format="horizontal" />
      </div>
    </div>
  );
}
