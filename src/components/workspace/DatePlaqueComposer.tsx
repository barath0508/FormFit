'use client';

import React from 'react';
import { Calendar, User, Tag, AlertTriangle } from 'lucide-react';

export interface DatePlaqueSettings {
  enabled: boolean;
  candidateName: string;
  dateText: string;
  theme: 'white_bg' | 'black_bg';
}

interface DatePlaqueComposerProps {
  settings: DatePlaqueSettings;
  onChange: (settings: DatePlaqueSettings) => void;
  mandatoryNotice?: string;
}

export function DatePlaqueComposer({ settings, onChange, mandatoryNotice }: DatePlaqueComposerProps) {
  // Format today's date as DD-MM-YYYY
  const getTodayFormatted = () => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleToggle = () => {
    const nextEnabled = !settings.enabled;
    onChange({
      ...settings,
      enabled: nextEnabled,
      dateText: settings.dateText || getTodayFormatted(),
    });
  };

  const handleNameChange = (val: string) => {
    // Upper-case name and filter out emojis/special symbols except period, space
    const cleaned = val.toUpperCase().slice(0, 32);
    onChange({
      ...settings,
      candidateName: cleaned,
    });
  };

  const handleDateChange = (val: string) => {
    onChange({
      ...settings,
      dateText: val,
    });
  };

  // Check if date might be older than 90 days
  const isOlderThan90Days = () => {
    if (!settings.dateText) return false;
    const parts = settings.dateText.split('-');
    if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      const diffDays = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays > 90;
    }
    return false;
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5 space-y-3 text-xs">
      {/* Header and Toggle Switch */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-slate-900 dark:text-white">
            Name &amp; Date on Photo (DOP Plaque)
          </span>
          {mandatoryNotice && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
              Mandatory for this Exam
            </span>
          )}
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={settings.enabled}
          onClick={handleToggle}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            settings.enabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              settings.enabled ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {settings.enabled ? (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-3">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Renders an official white box at the bottom of the photo with your full name and capture date,
            as required by SSC, UPSC, NEET, and TNPSC.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Candidate Name Input */}
            <div>
              <label htmlFor="dop-name" className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
                <User className="w-3 h-3 text-slate-400" />
                <span>Candidate Name (Full Name)</span>
              </label>
              <input
                id="dop-name"
                type="text"
                maxLength={32}
                placeholder="e.g. AARAV SHARMA"
                value={settings.candidateName}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white uppercase font-semibold text-xs tracking-wide"
              />
            </div>

            {/* Date on Photo Input */}
            <div>
              <label htmlFor="dop-date" className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Date of Photograph (DD-MM-YYYY)</span>
              </label>
              <input
                id="dop-date"
                type="text"
                placeholder="DD-MM-YYYY"
                value={settings.dateText}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-mono text-xs"
              />
            </div>
          </div>

          {/* Warning if date is older than 90 days */}
          {isOlderThan90Days() && (
            <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Notice: Exam guidelines usually require photographs taken within the last 3 months (90 days).</span>
            </div>
          )}

          {/* Theme Option (White vs Dark Plaque) */}
          <div className="flex items-center gap-3 pt-1 text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">Plaque Style:</span>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="plaque-theme"
                checked={settings.theme === 'white_bg'}
                onChange={() => onChange({ ...settings, theme: 'white_bg' })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700 dark:text-slate-200 font-medium">
                White Box + Black Text (Recommended)
              </span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="plaque-theme"
                checked={settings.theme === 'black_bg'}
                onChange={() => onChange({ ...settings, theme: 'black_bg' })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700 dark:text-slate-200 font-medium">
                Black Box + White Text
              </span>
            </label>
          </div>
        </div>
      ) : (
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Disabled. Turn on if your exam notice specifically requires your name and photo date at the bottom.
        </p>
      )}
    </div>
  );
}
