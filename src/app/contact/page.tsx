'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Clock, Send, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

export default function ContactPage() {
  const [examName, setExamName] = useState('');
  const [notificationUrl, setNotificationUrl] = useState('');
  const [changeDetails, setChangeDetails] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examName.trim() || !changeDetails.trim()) return;

    // Trigger mailto client or mock submission
    const subject = encodeURIComponent(`Exam Spec Update Report: ${examName}`);
    const body = encodeURIComponent(
      `Exam / Portal Name: ${examName}\nOfficial Notification URL: ${notificationUrl}\nReporter Email: ${userEmail}\n\nDetails of Change:\n${changeDetails}`
    );
    window.location.href = `mailto:support@formfit.in?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          <Mail className="w-3.5 h-3.5" />
          <span>Support &amp; Notification Audit Lab</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Contact FormFit &amp; Report Spec Updates
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Has an examination board recently issued a new notification, addendum, or changed dimensional requirements?
          Report it directly to our Document Compliance Lab for immediate verification and preset updating.
        </p>
      </header>

      {/* Support Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Direct Email Support
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For technical queries, privacy questions, or partnership inquiries:
          </p>
          <a
            href="mailto:support@formfit.in"
            className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline block pt-1"
          >
            support@formfit.in
          </a>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Expected Response Window
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Our compliance engineering team monitors incoming corrigendum alerts daily. We aim to respond and update active presets within:
          </p>
          <div className="text-sm font-bold text-teal-700 dark:text-teal-400 pt-1">
            24 – 48 Business Hours
          </div>
        </div>
      </div>

      {/* Report Form */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Report an Examination Specification Update or New Exam Preset
          </h2>
        </div>

        {submitted ? (
          <div className="p-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-200">
              Report Submitted Successfully!
            </h3>
            <p className="text-xs text-emerald-900 dark:text-emerald-300 max-w-md mx-auto">
              Thank you for contributing to the student community. Your email client has been triggered, or you can send details directly to support@formfit.in. Our compliance lab will audit the primary notification PDF.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="exam-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Examination or Portal Name *
              </label>
              <input
                id="exam-name"
                type="text"
                required
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="e.g., UPSC CSE 2026, SSC GD 2026, UP Police SI"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="notif-url" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Official Notification URL (.gov.in / .nic.in / .ac.in / .in)
              </label>
              <input
                id="notif-url"
                type="url"
                value={notificationUrl}
                onChange={(e) => setNotificationUrl(e.target.value)}
                placeholder="https://upsc.gov.in/sites/default/files/Notification-CivilServicesExam2026.pdf"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="reporter-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Your Email (Optional, if you wish to receive update confirmation)
              </label>
              <input
                id="reporter-email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="candidate@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="change-details" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Details of the Rule Change or Specification *
              </label>
              <textarea
                id="change-details"
                rows={4}
                required
                value={changeDetails}
                onChange={(e) => setChangeDetails(e.target.value)}
                placeholder="e.g., The board has updated the signature size from 10–20 KB to 20–50 KB on page 14 of the new information bulletin."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-lg text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Report to Compliance Lab</span>
            </button>
          </form>
        )}
      </section>

      {/* Footer Navigation */}
      <footer className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <Link href="/about" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          Read About Our Lab &amp; Team →
        </Link>
        <Link href="/disclaimer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          Non-Affiliation Notice →
        </Link>
      </footer>
    </div>
  );
}
