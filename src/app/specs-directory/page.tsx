'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { EXAM_PRESETS, CATEGORY_LABELS } from '@/data/presets';
import { Search, ArrowRight, ExternalLink, Filter, CheckCircle2, Layers } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Master Registry</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Master Directory: Indian Exam &amp; Portal Upload Specifications
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Verified pixel dimensions, physical sizes in centimeters, byte-size limits in KB, and DPI requirements
          extracted directly from the latest 2026 official recruitment notifications.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by exam name (e.g. UPSC, SSC CGL, IBPS PO, JEE Main, PAN Card)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-xs sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'All Exams (24+)' : CATEGORY_LABELS[cat] || cat}
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
                      <Link href={`/resize/${preset.slug}`} className="hover:text-blue-600 transition-colors">
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
                      <div className="text-[11px] text-blue-700 dark:text-blue-400 font-semibold font-sans">
                        {photo.minKB}–{photo.maxKB} KB • {photo.dpi} DPI
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-slate-700 dark:text-slate-300">
                      {sign ? (
                        <>
                          <div>{sign.widthPx} × {sign.heightPx} px</div>
                          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold font-sans">
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
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-sm transition-colors"
                      >
                        <span>Open Resizer</span>
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
    </div>
  );
}
