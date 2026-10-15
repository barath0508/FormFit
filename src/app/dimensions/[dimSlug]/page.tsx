import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  getDimensionTargetBySlug,
  getAllDimensionTargetSlugs,
  DIMENSION_TARGETS,
} from '@/data/dimension-targets';
import { buildDimensionPageMetadata } from '@/lib/seo/metadata-builder';
import { ResizerWorkbench } from '@/components/workspace/ResizerWorkbench';
import { AdSlot } from '@/components/monetization/AdSlot';
import { EditorialVerificationCard } from '@/components/content/EditorialVerificationCard';
import {
  ChevronRight,
  Calculator,
  Sliders,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  Binary,
  Layers,
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    dimSlug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllDimensionTargetSlugs().map((slug) => ({
    dimSlug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { dimSlug } = await params;
  const target = getDimensionTargetBySlug(dimSlug);
  if (!target) return { title: 'Dimension Converter Not Found | FormFit' };
  return buildDimensionPageMetadata(target);
}

export default async function DimensionTargetPage({ params }: PageProps) {
  const { dimSlug } = await params;
  const target = getDimensionTargetBySlug(dimSlug);

  if (!target) {
    notFound();
  }

  const pageUrl = `https://formfit-rust.vercel.app/dimensions/${target.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://formfit-rust.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Dimensions & DPI', item: 'https://formfit-rust.vercel.app/specs-directory' },
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
        <span className="font-semibold text-slate-800 dark:text-slate-200">{target.widthPx} × {target.heightPx} px ({target.dpi} DPI)</span>
      </nav>

      {/* 3. Hero Header with Single Unique H1 */}
      <header className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200 dark:border-teal-800 mb-1">
          <Calculator className="w-3.5 h-3.5" />
          <span>Exact Geometry &amp; DPI Calculator ({target.widthPx} × {target.heightPx} px @ {target.dpi} DPI)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {target.heading}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          {target.subheading}
        </p>
      </header>

      {/* 4. Interactive Resizer Workbench */}
      <section aria-label="Interactive Dimension Resizer Workbench">
        <ResizerWorkbench />
      </section>

      {/* 5. CLS-Safe Ad Slot #1 */}
      <div className="my-10">
        <AdSlot slotId="dim-workbench-below-banner" format="horizontal" />
      </div>

      {/* 6. Rich Static Editorial Documentation */}
      <article className="space-y-10">
        {/* Mathematical Breakdown */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            The Metric &amp; DPI Geometry Behind {target.widthPx} × {target.heightPx} Pixels
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {target.editorialContent.dimensionalMathExplanation}
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2 flex items-center gap-2">
            <Binary className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            Aspect Ratio Mathematical Formula
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {target.editorialContent.aspectRatioFormula}
          </p>
        </div>

        {/* Technical Specification Matrix */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Technical Specification Matrix ({target.widthPx} × {target.heightPx} px)
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
                    <td className="px-4 py-3 font-mono text-teal-700 dark:text-teal-400">
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
            Step-by-Step Guide to Formatting Images to {target.widthPx} × {target.heightPx} px
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
          <AdSlot slotId="dim-mid-article-banner" format="horizontal" />
        </div>

        {/* Troubleshooting Rejection Table */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Troubleshooting Rejections for {target.widthPx} × {target.heightPx} px
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Common errors returned by exam validation scripts and how FormFit avoids them.
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

        {/* Deep Dive: Camera Capture & Pixel Verification Protocols */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Smartphone Capture, Lighting &amp; Pixel Fidelity Protocols for {target.widthPx} × {target.heightPx} px
          </h2>
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
            <p>
              When capturing photographs or handwritten documents using modern smartphone cameras, the sensor natively captures images at resolutions exceeding 12 to 50 megapixels (e.g., 3000 × 4000 pixels or higher). Directly scaling down these oversized camera files to {target.widthPx} × {target.heightPx} pixels using basic photo viewers often produces severe visual degradation, including aliasing artifacts, blurry edges, distorted facial proportions, or faint signature strokes.
            </p>
            <p>
              To maintain crisp readability and ensure instant acceptance by government OCR and facial verification algorithms, adhere to these technical capture standards:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 dark:text-slate-400">
              <li><strong>Diffuse Ambient Lighting:</strong> Avoid direct overhead harsh ceiling lights or camera flashes, which cast sharp shadows behind ears or wash out facial contours. Position yourself facing a large window with soft indirect daylight.</li>
              <li><strong>Parallel Sensor Alignment:</strong> Keep your smartphone perfectly parallel to your face or signature paper to prevent keystone distortion, which skews the true {target.aspectRatio} aspect ratio.</li>
              <li><strong>High-Resolution Decoupled Downsampling:</strong> FormFit utilizes multi-pass bilinear interpolation on the HTML5 Canvas to downsample your high-resolution original directly into the locked {target.widthPx} × {target.heightPx} pixel buffer, preserving anti-aliased edges and true black signature ink density.</li>
              <li><strong>Zero Lossy Re-encoding:</strong> Once cropped to exact dimensions, our engine performs a binary sweep to embed the required {target.dpi} DPI header and calibrates JPEG quantization tables to keep the final output comfortably within {target.minKB} KB to {target.maxKB} KB without introducing blocky compression artifacts.</li>
            </ul>
          </div>
        </div>

        {/* Applicable Exams Grid */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Indian Examination Portals Using This Dimension
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
            Click any exam to open its dedicated preset pre-configured with exact pixel dimensions and official guidelines:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {target.applicableExams.map((exam, idx) => (
              <Link
                key={idx}
                href={exam.url}
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-400 bg-slate-50/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800 transition-all flex flex-col justify-between group"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                    {exam.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">{exam.spec}</p>
                </div>
                <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1 mt-3">
                  Open Dedicated Resizer <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions ({target.widthPx} × {target.heightPx} px)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Authoritative guidance on dimensional math, DPI verification, and photo compliance.
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
                  <span className="text-teal-600 group-open:rotate-180 transition-transform">▼</span>
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
          officialUrl="https://formfit-rust.vercel.app/about"
        />
      </article>

      {/* 7. Sibling Dimension Targets & Internal Link Hub */}
      <section className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Other Exact-Dimension &amp; DPI Converters
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          {DIMENSION_TARGETS.filter((t) => t.slug !== target.slug).map((sibling) => (
            <Link
              key={sibling.slug}
              href={`/dimensions/${sibling.slug}`}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-400 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-teal-600 transition-colors"
            >
              <div className="font-bold">{sibling.widthPx} × {sibling.heightPx} px</div>
              <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{sibling.title}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pre-Footer AdSlot */}
      <div className="my-10">
        <AdSlot slotId="dim-pre-footer-banner" format="horizontal" />
      </div>
    </div>
  );
}
