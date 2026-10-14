'use client';

import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  slotId: string;
  format?: 'horizontal' | 'rectangle' | 'fluid';
  className?: string;
}

const MIN_HEIGHT_MAP = {
  horizontal: 'min-h-[100px] sm:min-h-[90px]',
  rectangle: 'min-h-[250px]',
  fluid: 'min-h-[120px]',
};

export function AdSlot({ slotId, format = 'horizontal', className = '' }: AdSlotProps) {
  const adStatus = process.env.NEXT_PUBLIC_ADSENSE_STATUS || 'review';
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
  const pushedRef = useRef(false);

  useEffect(() => {
    if (adStatus !== 'active' || !pubId || pushedRef.current) return;
    try {
      // @ts-expect-error adsbygoogle global injected by script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch {
      // Ignore adblocker errors gracefully
    }
  }, [adStatus, pubId]);

  // During initial AdSense review ('review' mode), do not render empty placeholder boxes!
  if (adStatus !== 'active' || !pubId) {
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`my-8 mx-auto w-full max-w-[970px] select-none ${className}`}
    >
      <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400 text-center mb-1.5">
        Advertisement
      </div>
      <div
        className={`w-full overflow-hidden rounded-lg border border-slate-200/80 bg-slate-50/60 dark:border-slate-700/80 dark:bg-slate-900/60 flex items-center justify-center ${MIN_HEIGHT_MAP[format]}`}
      >
        <ins
          className="adsbygoogle block w-full"
          style={{ display: 'block' }}
          data-ad-client={pubId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
