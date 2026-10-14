import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface ExamFaqAccordionProps {
  faqs: FaqItem[];
  portalName: string;
}

export function ExamFaqAccordion({ faqs, portalName }: ExamFaqAccordionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-blue-600" />
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions: {portalName} Image Guidelines
        </h2>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
        {faqs.map((faq, idx) => (
          <details key={idx} className="group py-3.5 first:pt-0 last:pb-0 cursor-pointer">
            <summary className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 list-none select-none">
              <span>{faq.question}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0 ml-2" />
            </summary>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-1">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
