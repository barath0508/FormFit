import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { GUIDES } from '@/data/guides';
import { AdSlot } from '@/components/monetization/AdSlot';
import { BookOpen, Clock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Official Document Compliance & Exam Guides Hub | FormFit India',
  description: 'Comprehensive, engineer-verified editorial guides covering photo resizing, signature background cleaning, 200 DPI conversion, and portal rejection fixes.',
  alternates: {
    canonical: 'https://formfit.in/guides',
  },
  openGraph: {
    title: 'Official Document Compliance & Exam Guides Hub | FormFit India',
    description: 'Comprehensive, engineer-verified editorial guides covering photo resizing, signature background cleaning, 200 DPI conversion, and portal rejection fixes.',
    url: 'https://formfit.in/guides',
    siteName: 'FormFit India',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function GuidesIndexPage() {
  const categories = Array.from(new Set(GUIDES.map((g) => g.category)));

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <header className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          <BookOpen className="w-3.5 h-3.5" />
          <span>E-E-A-T Verified Document Compliance Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Official Examination Document &amp; Photography Guides
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          In-depth, mathematically verified tutorials written by former examination technical consultants and web standards engineers. Master portal compliance, avoid rejection notices, and protect your identity documents.
        </p>
      </header>

      {/* CLS-Safe Ad Slot #1 */}
      <AdSlot slotId="guides-hub-top-banner" format="horizontal" />

      {/* Guides Grid by Category */}
      <div className="space-y-12">
        {categories.map((category) => {
          const categoryGuides = GUIDES.filter((g) => g.category === category);
          return (
            <section key={category} className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                {category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryGuides.map((guide) => (
                  <article
                    key={guide.slug}
                    className="flex flex-col justify-between p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400">
                          <Clock className="w-3.5 h-3.5" />
                          {guide.readTime}
                        </span>
                        <span>{guide.lastUpdatedDate}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                        <Link href={`/guides/${guide.slug}`} className="focus:outline-none">
                          {guide.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {guide.summary}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {guide.author.name}
                      </span>
                      <Link
                        href={`/guides/${guide.slug}`}
                        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        Read Tutorial <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Pre-Footer Ad Slot */}
      <div className="my-10">
        <AdSlot slotId="guides-hub-bottom-banner" format="horizontal" />
      </div>
    </div>
  );
}
