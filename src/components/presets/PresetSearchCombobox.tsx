'use client';

import React, { useState, useRef, useEffect } from 'react';
import { EXAM_PRESETS, CATEGORY_LABELS } from '@/data/presets';
import { ExamPortalPreset } from '@/types/preset';
import { Search, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';

interface PresetSearchComboboxProps {
  selectedPreset: ExamPortalPreset | null;
  onSelectPreset: (preset: ExamPortalPreset | null) => void;
  isCustomMode: boolean;
  onToggleCustomMode: () => void;
}

export function PresetSearchCombobox({
  selectedPreset,
  onSelectPreset,
  isCustomMode,
  onToggleCustomMode,
}: PresetSearchComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter presets by query or searchKeywords
  const filteredPresets = EXAM_PRESETS.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    if (p.shortName.toLowerCase().includes(q)) return true;
    if (p.fullName.toLowerCase().includes(q)) return true;
    if (p.conductingBody.toLowerCase().includes(q)) return true;
    if (p.searchKeywords.some((k) => k.toLowerCase().includes(q))) return true;
    return false;
  });

  // Group by category
  const groupedPresets: Record<string, ExamPortalPreset[]> = {};
  for (const preset of filteredPresets) {
    const cat = preset.category;
    if (!groupedPresets[cat]) {
      groupedPresets[cat] = [];
    }
    groupedPresets[cat]!.push(preset);
  }

  const handleSelect = (preset: ExamPortalPreset) => {
    onSelectPreset(preset);
    setIsOpen(false);
    setQuery('');
  };

  const handleCustomClick = () => {
    onToggleCustomMode();
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <label id="preset-combobox-label" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
        Select Examination or Government Portal
      </label>

      {/* Main Trigger / Search Input */}
      <div
        className={`relative flex items-center bg-white dark:bg-slate-800 border rounded-lg shadow-sm transition-all ${
          isOpen ? 'ring-2 ring-blue-600 border-blue-600' : 'border-slate-300 dark:border-slate-700 hover:border-slate-400'
        }`}
      >
        <Search className="w-4 h-4 text-slate-400 ml-3.5 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-labelledby="preset-combobox-label"
          className="w-full py-2.5 pl-2.5 pr-10 text-sm font-medium text-slate-900 dark:text-white bg-transparent outline-none placeholder:text-slate-400"
          placeholder={
            isCustomMode
              ? 'Custom Dimensions Mode Active'
              : selectedPreset
              ? `${selectedPreset.shortName} — ${selectedPreset.fullName}`
              : 'Search 24+ Indian exams (e.g., UPSC, SSC, IBPS, NEET, PAN)...'
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />

        <button
          type="button"
          tabIndex={-1}
          aria-label="Toggle preset menu"
          onClick={() => {
            setIsOpen(!isOpen);
            inputRef.current?.focus();
          }}
          className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
          {/* Custom Dimension Mode Option */}
          <div className="p-2 bg-slate-50 dark:bg-slate-900/50">
            <button
              type="button"
              onClick={handleCustomClick}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                isCustomMode
                  ? 'bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Custom Dimensions &amp; KB Mode (Any Portal / Exam)</span>
              </div>
              {isCustomMode && <Check className="w-4 h-4 text-blue-600" />}
            </button>
          </div>

          {/* Grouped Exam Options */}
          {Object.keys(groupedPresets).length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
              No matching exams found for &ldquo;{query}&rdquo;.
              <div className="mt-2">
                <button
                  type="button"
                  onClick={handleCustomClick}
                  className="text-xs text-blue-600 dark:text-blue-400 font-semibold underline"
                >
                  Switch to Custom Dimensions Mode
                </button>
              </div>
            </div>
          ) : (
            Object.entries(groupedPresets).map(([category, presets]) => (
              <div key={category} className="p-2">
                <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {CATEGORY_LABELS[category] || category}
                </div>
                <div className="space-y-0.5 mt-1">
                  {presets.map((preset) => {
                    const isSelected = selectedPreset?.slug === preset.slug && !isCustomMode;
                    return (
                      <button
                        key={preset.slug}
                        type="button"
                        onClick={() => handleSelect(preset)}
                        className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{preset.shortName}</div>
                          <div
                            className={`text-[11px] truncate max-w-sm sm:max-w-md ${
                              isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {preset.fullName}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
