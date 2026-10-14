'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { EXAM_PRESETS, CATEGORY_LABELS } from '@/data/presets';
import { KB_TARGETS } from '@/data/kb-targets';
import { DIMENSION_TARGETS } from '@/data/dimension-targets';
import { GUIDES } from '@/data/guides';
import { Search, ArrowRight, Layers, Sliders, Calculator, BookOpen, Wrench } from 'lucide-react';

export default function SpecsDirectoryPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'upsc', 'ssc', 'banking', 'nta', 'railways_defence', 'govt_id', 'state_psc'];

  const filtered = EXAM_PRESETS.filter((preset) => {
    const matchesCat = selectedCategory === 'all' || preset.category === selectedCategory;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      preset.shortName.toLowerCase().includes(q) ||
      preset.fullName.toLowerCase().includes(q) ||
      preset.conductingBody.toLowerCase().includes(q) ||
      preset.searchKeywords.some((k) => k.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <header className="space-y-2 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          <Layers className="w-3.5 h-3.5" />
          <span>Master Registry &amp; Full Site Directory</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Master Directory: Indian Exam &amp; Portal Upload Specifications
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Verified pixel dimensions, physical sizes in centimeters, byte-size limits in KB, and DPI requirements
          extracted directly from the latest 2026 official recruitment notifications.
        </p>
      </header>

      {/* Pillar 1: Exam Specific Specifications */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Pillar 1: Competitive Examination &amp; Civic Portal Tools
        </h2>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by exam name (e.g. UPSC, SSC CGL, IBPS PO, JEE Main, PAN Card)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-xs sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'All Exams (22+)' : CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Specification Table */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] font-bold">
                <tr>
                  <th scope="col" className="px-4 py-3.5">Portal / Exam Name</th>
                  <th scope="col" className="px-4 py-3.5">Conducting Body</th>
                  <th scope="col" className="px-4 py-3.5">Photo Requirements</th>
                  <th scope="col" className="px-4 py-3.5">Signature Requirements</th>
                  <th scope="col" className="px-4 py-3.5">Last Verified</th>
                  <th scope="col" className="px-4 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {filtered.map((preset) => {
                  const photo = preset.assets.find((a) => a.assetType === 'photo') || preset.assets[0]!;
                  const sign = preset.assets.find((a) => a.assetType === 'signature');

                  return (
                    <tr key={preset.slug} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                        <Link href={`/resize/${preset.slug}`} className="hover:text-indigo-600 transition-colors">
                          {preset.shortName}
                        </Link>
                        <div className="text-[11px] font-normal text-slate-500 line-clamp-1">
                          {preset.fullName}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">
                        {preset.conductingBody}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-slate-700 dark:text-slate-300">
                        <div>{photo.widthPx} × {photo.heightPx} px</div>
                        <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold font-sans">
                          {photo.minKB}–{photo.maxKB} KB • {photo.dpi} DPI
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-slate-700 dark:text-slate-300">
                        {sign ? (
                          <>
                            <div>{sign.widthPx} × {sign.heightPx} px</div>
                            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold font-sans">
                              {sign.minKB}–{sign.maxKB} KB • {sign.dpi} DPI
                            </div>
                          </>
                        ) : (
                          <span className="text-slate-400 italic">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">
                        {preset.lastVerifiedDate}
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <Link
                          href={`/resize/${preset.slug}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-colors"
                        >
                          <span>Open Tool</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pillar 2: Exact-KB Resizers */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Pillar 2: Exact-KB Target Resizers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KB_TARGETS.map((target) => (
            <Link
              key={target.slug}
              href={`/kb/${target.slug}`}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-white dark:bg-slate-800 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                  {target.minKB} KB – {target.maxKB} KB
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  {target.title}
                </h3>
              </div>
              <span className="text-xs text-slate-500 flex items-center gap-1 mt-3">
                Open Resizer <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Pillar 3: Exact-Dimension & DPI Converters */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          Pillar 3: Exact-Dimension &amp; DPI Converters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIMENSION_TARGETS.map((dim) => (
            <Link
              key={dim.slug}
              href={`/dimensions/${dim.slug}`}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-400 bg-white dark:bg-slate-800 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-1">
                  {dim.widthPx} × {dim.heightPx} px ({dim.dpi} DPI)
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                  {dim.title}
                </h3>
              </div>
              <span className="text-xs text-slate-500 flex items-center gap-1 mt-3">
                Open Converter <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Pillar 4: Editorial Knowledge Base Guides */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Pillar 4: Document Compliance Editorial Guides (15 Articles)
          </h2>
          <Link href="/guides" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            View All Guides Hub →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-white dark:bg-slate-800 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] font-medium text-slate-500 block mb-1">
                  {guide.readTime} • {guide.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {guide.title}
                </h3>
              </div>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 mt-3">
                Read Tutorial <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Specialized Document Tools */}
      <section className="space-y-4 pb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Wrench className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Specialized Document Utilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/tools/photo-signature-joiner"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-white dark:bg-slate-800 transition-all group"
          >
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">
              Photo + Signature Joiner
            </h3>
            <p className="text-xs text-slate-500 mt-1">Stitch photo and signature into a 3.5×6.0 cm vertical strip for UPPSC &amp; MP Vyapam.</p>
          </Link>
          <Link
            href="/tools/date-name-on-photo"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-white dark:bg-slate-800 transition-all group"
          >
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">
              Name &amp; Date on Photo Maker
            </h3>
            <p className="text-xs text-slate-500 mt-1">Add candidate name and date of photograph (DOP) plaque for UPSC, NEET, and TNPSC.</p>
          </Link>
          <Link
            href="/tools/jpg-to-pdf-under-size"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-white dark:bg-slate-800 transition-all group"
          >
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">
              Certificate PDF Compressor
            </h3>
            <p className="text-xs text-slate-500 mt-1">Compress caste, EWS, and PwD certificates to under 100 KB or 300 KB with 200 DPI clarity.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
