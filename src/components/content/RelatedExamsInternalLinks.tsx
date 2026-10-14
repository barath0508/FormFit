import React from 'react';
import Link from 'next/link';
import { EXAM_PRESETS } from '@/data/presets';
import { KB_TARGETS } from '@/data/kb-targets';
import { GUIDES } from '@/data/guides';
import { ArrowRight, BookOpen, Sliders, ExternalLink } from 'lucide-react';

interface RelatedExamsInternalLinksProps {
  currentSlug: string;
  category: string;
}

export function RelatedExamsInternalLinks({
  currentSlug,
  category,
}: RelatedExamsInternalLinksProps) {
  // 6 related exams: prioritized by same category, then fallback
  const sameCategoryExams = EXAM_PRESETS.filter(
    (p) => p.slug !== currentSlug && p.category === category
  );
  const otherCategoryExams = EXAM_PRESETS.filter(
    (p) => p.slug !== currentSlug && p.category !== category
  );
  const relatedExams = [...sameCategoryExams, ...otherCategoryExams].slice(0, 6);

  // 2 relevant KB targets
  const relevantKbs = KB_TARGETS.slice(0, 2);

  // 2 relevant Guides
  const relevantGuides = GUIDES.slice(0, 2);

  return (
    <section
      aria-label="Related Exam Resizers and Compliance Guides"
      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-2">
        <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Related Exam Resizers &amp; Compliance Hub
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
        Prepare all candidate documents according to official government notification circulars with zero server uploads.
      </p>

      {/* Sibling Exams Grid */}
      <div className="mb-6">
        <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-3">
          Popular Exam Photo &amp; Signature Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {relatedExams.map((exam) => {
            const photo = exam.assets.find((a) => a.assetType === 'photo') ?? exam.assets[0];
            const sign = exam.assets.find((a) => a.assetType === 'signature');
            return (
              <Link
                key={exam.slug}
                href={`/resize/${exam.slug}`}
                className="group p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800 transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {exam.shortName} Resizer
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {photo ? `${photo.widthPx}×${photo.heightPx} px` : ''}
                    {sign ? ` • Sign ${sign.minKB}–${sign.maxKB} KB` : ''}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 mt-3">
                  Format Compliant File
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Exact-KB Tools & Editorial Guides Mesh */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700/80">
        <div>
          <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            Exact-KB Size Tools
          </h3>
          <div className="space-y-2">
            {relevantKbs.map((kb) => (
              <Link
                key={kb.slug}
                href={`/kb/${kb.slug}`}
                className="block p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-slate-50/50 dark:bg-slate-900/30 text-xs text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
              >
                <div className="font-semibold">{kb.title}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Enforce exact {kb.minKB} KB to {kb.maxKB} KB file size bounds</div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Official Compliance Guides
          </h3>
          <div className="space-y-2">
            {relevantGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="block p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-slate-50/50 dark:bg-slate-900/30 text-xs text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
              >
                <div className="font-semibold">{guide.title}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{guide.readTime} • {guide.category}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
