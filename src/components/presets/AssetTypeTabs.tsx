'use client';

import React from 'react';
import { AssetSpec } from '@/types/preset';
import { User, PenTool, Fingerprint, FileText } from 'lucide-react';

interface AssetTypeTabsProps {
  assets: AssetSpec[];
  activeAssetId: string;
  onSelectAsset: (assetId: string) => void;
}

export function AssetTypeTabs({ assets, activeAssetId, onSelectAsset }: AssetTypeTabsProps) {
  const getIcon = (type: AssetSpec['assetType']) => {
    switch (type) {
      case 'photo':
        return <User className="w-4 h-4 shrink-0" />;
      case 'signature':
        return <PenTool className="w-4 h-4 shrink-0" />;
      case 'thumb':
        return <Fingerprint className="w-4 h-4 shrink-0" />;
      case 'document_pdf':
        return <FileText className="w-4 h-4 shrink-0" />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
        {assets.map((asset) => {
          const isActive = asset.id === activeAssetId;
          return (
            <button
              key={asset.id}
              type="button"
              onClick={() => onSelectAsset(asset.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border snap-start ${
                isActive
                  ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}>
                {getIcon(asset.assetType)}
              </span>
              <span>{asset.label}</span>
              <span
                className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  isActive
                    ? 'bg-blue-800 text-blue-100'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                {asset.widthPx}×{asset.heightPx} px • {asset.minKB}–{asset.maxKB} KB
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
