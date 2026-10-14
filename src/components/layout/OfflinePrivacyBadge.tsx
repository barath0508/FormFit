'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, WifiOff } from 'lucide-react';

export function OfflinePrivacyBadge() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>100% In-Browser Zero Upload</span>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 animate-pulse"
        title="Airplane Mode Active: Processing runs 100% locally on your device with zero internet connectivity"
      >
        <WifiOff className="w-3.5 h-3.5 text-amber-600" />
        <span>Airplane Mode Active — Fully Offline</span>
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
      title="All image scaling, slate rendering, and compression run inside your device memory. Zero bytes leave your browser."
    >
      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
      <span>100% In-Browser • Zero Upload</span>
    </div>
  );
}
