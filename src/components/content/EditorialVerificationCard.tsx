import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ExternalLink, Award, FileText } from 'lucide-react';

interface EditorialVerificationCardProps {
  verifiedDate: string;
  officialSource: string;
  officialUrl: string;
}

export function EditorialVerificationCard({
  verifiedDate,
  officialSource,
  officialUrl,
}: EditorialVerificationCardProps) {
  return (
    <aside
      aria-label="Editorial Verification and E-E-A-T Attribution"
      className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-6 sm:p-7 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Audited by FormFit Document Compliance Lab
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300">
                <Award className="w-3 h-3" />
                E-E-A-T Verified
              </span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Technical review lead: Aditya Rajan (Former UPSC Civil Services Technical Consultant &amp; Standards Auditor)
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Last Specification Audit: <strong className="text-slate-800 dark:text-slate-200">{verifiedDate}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        <div className="flex items-start gap-2.5">
          <FileText className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900 dark:text-white block">
              Official Notification Source:
            </span>
            <span className="text-slate-600 dark:text-slate-400 text-xs">
              {officialSource}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <ExternalLink className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900 dark:text-white block">
              Conducting Body Portal:
            </span>
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 break-all"
            >
              {officialUrl}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <p>
          FormFit conducts weekly 3-step verification audits against active exam brochures (.gov.in / .nic.in).
        </p>
        <Link
          href="/contact"
          className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline shrink-0"
        >
          Report a Notification Update →
        </Link>
      </div>
    </aside>
  );
}
