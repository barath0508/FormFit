'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ExamPortalPreset, AssetSpec } from '@/types/preset';
import { PresetSearchCombobox } from '../presets/PresetSearchCombobox';
import { AssetTypeTabs } from '../presets/AssetTypeTabs';
import { CustomSpecOverrideDrawer } from '../presets/CustomSpecOverrideDrawer';
import { ClientDropzone } from './ClientDropzone';
import { InteractiveCropWorkspace } from './InteractiveCropWorkspace';
import { DatePlaqueComposer, DatePlaqueSettings } from './DatePlaqueComposer';
import { SignatureEnhancerControl, SignatureFilterSettings } from './SignatureEnhancerControl';
import { CompressionTelemetryCard } from './CompressionTelemetryCard';
import { CropRect, renderProcessedCanvas } from '@/lib/imaging/canvas-renderer';
import { compressCanvasToExactKB, CompressionResult } from '@/lib/imaging/kb-compressor';
import { auditOutputBuffer, ComplianceAuditReport } from '@/lib/imaging/compliance-auditor';
import { packageJpegIntoPdf } from '@/lib/imaging/pdf-packager';
import { ShieldAlert, ArrowLeft, RefreshCw, FileText } from 'lucide-react';
import { EXAM_PRESETS } from '@/data/presets';

interface ResizerWorkbenchProps {
  initialPreset?: ExamPortalPreset;
}

export function ResizerWorkbench({ initialPreset = EXAM_PRESETS[0]! }: ResizerWorkbenchProps) {
  // Preset and custom mode state
  const [selectedPreset, setSelectedPreset] = useState<ExamPortalPreset | null>(initialPreset);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Active asset tab
  const [activeAssetId, setActiveAssetId] = useState<string>(initialPreset.assets[0]?.id || 'custom-asset');
  const [customSpecOverride, setCustomSpecOverride] = useState<AssetSpec | null>(null);

  // Loaded file state
  const [loadedFile, setLoadedFile] = useState<{
    file: File;
    objectUrl: string;
    width: number;
    height: number;
  } | null>(null);

  // Source Image element ref for canvas rendering
  const sourceImageRef = useRef<HTMLImageElement | null>(null);

  // Transform state
  const [currentCrop, setCurrentCrop] = useState<CropRect>({ x: 0, y: 0, width: 1, height: 1 });
  const [currentRotation, setCurrentRotation] = useState<number>(0);

  // Tool settings
  const [datePlaque, setDatePlaque] = useState<DatePlaqueSettings>({
    enabled: initialPreset.assets[0]?.requiresNameAndDate === 'mandatory',
    candidateName: '',
    dateText: '',
    theme: 'white_bg',
  });

  const [signatureFilter, setSignatureFilter] = useState<SignatureFilterSettings>({
    enabled: initialPreset.assets[0]?.assetType === 'signature',
    threshold: 185,
    preserveBlueInk: true,
  });

  // Compression & Telemetry state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [auditReport, setAuditReport] = useState<ComplianceAuditReport | null>(null);
  const [finalBuffer, setFinalBuffer] = useState<Uint8Array | null>(null);

  // Determine active AssetSpec
  const activePresetAssets = selectedPreset?.assets || [];
  const baseAsset = activePresetAssets.find((a) => a.id === activeAssetId) || activePresetAssets[0] || {
    id: 'custom-spec',
    label: 'Custom Deliverable',
    assetType: 'photo',
    widthPx: 350,
    heightPx: 350,
    widthCm: 3.5,
    heightCm: 3.5,
    minKB: 20,
    maxKB: 100,
    dpi: 200,
    allowedFormats: ['jpg', 'jpeg'],
    backgroundRule: 'Plain white background',
    requiresNameAndDate: 'not_required',
    notes: [],
  };

  const currentSpec: AssetSpec = customSpecOverride || baseAsset;

  // Sync settings when active asset changes
  const handleSelectAsset = (assetId: string) => {
    setActiveAssetId(assetId);
    setCustomSpecOverride(null);
    const asset = activePresetAssets.find((a) => a.id === assetId);
    if (asset) {
      setDatePlaque((prev) => ({
        ...prev,
        enabled: asset.requiresNameAndDate === 'mandatory',
      }));
      setSignatureFilter((prev) => ({
        ...prev,
        enabled: asset.assetType === 'signature' || asset.assetType === 'thumb',
      }));
    }
  };

  const handleSelectPreset = (preset: ExamPortalPreset | null) => {
    if (preset) {
      setSelectedPreset(preset);
      setIsCustomMode(false);
      setActiveAssetId(preset.assets[0]?.id || '');
      setCustomSpecOverride(null);
      setDatePlaque((prev) => ({
        ...prev,
        enabled: preset.assets[0]?.requiresNameAndDate === 'mandatory',
      }));
      setSignatureFilter((prev) => ({
        ...prev,
        enabled: preset.assets[0]?.assetType === 'signature' || preset.assets[0]?.assetType === 'thumb',
      }));
    }
  };

  const handleToggleCustomMode = () => {
    setIsCustomMode(true);
    setSelectedPreset(null);
    setCustomSpecOverride({
      id: 'custom-user-spec',
      label: 'Custom Specifications',
      assetType: 'photo',
      widthPx: 200,
      heightPx: 230,
      widthCm: 3.5,
      heightCm: 4.5,
      minKB: 20,
      maxKB: 50,
      dpi: 200,
      allowedFormats: ['jpg', 'jpeg'],
      backgroundRule: 'Custom specification',
      requiresNameAndDate: 'not_required',
      notes: [],
    });
  };

  // Handle file loaded from dropzone
  const handleFileLoaded = (file: File, objectUrl: string, width: number, height: number) => {
    // Revoke previous URL if exists
    if (loadedFile) {
      URL.revokeObjectURL(loadedFile.objectUrl);
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      sourceImageRef.current = img;
      setLoadedFile({ file, objectUrl, width, height });
    };
    img.src = objectUrl;
  };

  // Core processing pipeline: renders canvas and runs exact KB compression
  const runCompressionPipeline = useCallback(async () => {
    if (!sourceImageRef.current || !loadedFile) return;

    setIsProcessing(true);
    try {
      // 1. Render processed canvas with crop, rotation, signature filter, and date plaque
      const renderedCanvas = renderProcessedCanvas({
        sourceImage: sourceImageRef.current,
        sourceWidth: loadedFile.width,
        sourceHeight: loadedFile.height,
        crop: currentCrop,
        rotationDeg: currentRotation,
        targetWidth: currentSpec.widthPx,
        targetHeight: currentSpec.heightPx,
        signatureFilter: {
          enabled: signatureFilter.enabled,
          threshold: signatureFilter.threshold,
          preserveBlueInk: signatureFilter.preserveBlueInk,
        },
        datePlaque: {
          enabled: datePlaque.enabled,
          candidateName: datePlaque.candidateName,
          dateText: datePlaque.dateText,
          theme: datePlaque.theme,
        },
      });

      // 2. Compress to exact KB window with DPI injection
      const targetMinBytes = Math.floor(currentSpec.minKB * 1024);
      const targetMaxBytes = Math.ceil(currentSpec.maxKB * 1024);

      const compressionRes: CompressionResult = await compressCanvasToExactKB(renderedCanvas, {
        minBytes: targetMinBytes,
        maxBytes: targetMaxBytes,
        targetDpi: currentSpec.dpi,
      });

      let finalOutputBytes = compressionRes.buffer;

      // 3. If PDF format requested, wrap into PDF container
      if (currentSpec.assetType === 'document_pdf') {
        finalOutputBytes = await packageJpegIntoPdf({
          jpegBytes: compressionRes.buffer,
          maxKB: currentSpec.maxKB,
          pageSize: 'A4',
        });
      }

      setFinalBuffer(finalOutputBytes);

      // 4. Run post-compression compliance audit
      const audit = auditOutputBuffer(
        finalOutputBytes,
        currentSpec.widthPx,
        currentSpec.heightPx,
        currentSpec,
        datePlaque.enabled && datePlaque.candidateName.length > 0
      );

      setAuditReport(audit);
    } catch (err) {
      console.error('Processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [loadedFile, currentCrop, currentRotation, currentSpec, signatureFilter, datePlaque]);

  // Debounce pipeline execution on crop or setting changes
  useEffect(() => {
    if (!loadedFile) return;
    const timer = setTimeout(() => {
      runCompressionPipeline();
    }, 200);
    return () => clearTimeout(timer);
  }, [runCompressionPipeline, loadedFile]);

  // Download Trigger
  const handleDownload = () => {
    if (!finalBuffer) return;

    const mime = currentSpec.assetType === 'document_pdf' ? 'application/pdf' : 'image/jpeg';
    const blob = new Blob([finalBuffer as unknown as BlobPart], { type: mime });
    const url = URL.createObjectURL(blob);

    const cleanPortal = (selectedPreset?.shortName || 'Custom_Exam').replace(/[^a-zA-Z0-9]/g, '_');
    const cleanAsset = currentSpec.label.replace(/[^a-zA-Z0-9]/g, '_');
    const ext = currentSpec.assetType === 'document_pdf' ? 'pdf' : 'jpg';
    const filename = `FormFit_${cleanPortal}_${cleanAsset}_${currentSpec.widthPx}x${currentSpec.heightPx}px.${ext}`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 5000);
  };

  // Reset to initial dropzone state
  const handleClearImage = () => {
    if (loadedFile) {
      URL.revokeObjectURL(loadedFile.objectUrl);
    }
    setLoadedFile(null);
    setAuditReport(null);
    setFinalBuffer(null);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Configuration Bar: Preset Search & Asset Tabs */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <PresetSearchCombobox
          selectedPreset={selectedPreset}
          onSelectPreset={handleSelectPreset}
          isCustomMode={isCustomMode}
          onToggleCustomMode={handleToggleCustomMode}
        />

        {/* Advisory banner for portals with live photo capture (e.g. ssc.gov.in) */}
        {selectedPreset?.liveCaptureAdvisory && (
          <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block mb-0.5">Official Portal Advisory</span>
              <span>{selectedPreset.liveCaptureAdvisory}</span>
            </div>
          </div>
        )}

        {/* Asset Type Tabs */}
        {!isCustomMode && activePresetAssets.length > 0 && (
          <AssetTypeTabs
            assets={activePresetAssets}
            activeAssetId={activeAssetId}
            onSelectAsset={handleSelectAsset}
          />
        )}

        {/* Custom Spec Override Drawer */}
        <CustomSpecOverrideDrawer
          currentSpec={currentSpec}
          onUpdateSpec={(updated) => setCustomSpecOverride(updated)}
          onResetToDefault={() => setCustomSpecOverride(null)}
          isModified={customSpecOverride !== null}
        />
      </div>

      {/* Main Workbench Viewport: Left Workspace + Right Telemetry */}
      {!loadedFile ? (
        <ClientDropzone onFileLoaded={handleFileLoaded} assetType={currentSpec.assetType} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Interactive Crop & Enhancer Controls */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleClearImage}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Upload Another Image</span>
              </button>

              <span className="text-xs text-slate-500 font-mono">
                Source: {loadedFile.width} × {loadedFile.height} px
              </span>
            </div>

            {/* Interactive Canvas Viewport */}
            <InteractiveCropWorkspace
              sourceUrl={loadedFile.objectUrl}
              sourceWidth={loadedFile.width}
              sourceHeight={loadedFile.height}
              targetWidth={currentSpec.widthPx}
              targetHeight={currentSpec.heightPx}
              assetType={currentSpec.assetType}
              onCropChange={(crop, rot) => {
                setCurrentCrop(crop);
                setCurrentRotation(rot);
              }}
            />

            {/* Name & Date on Photo (DOP) Plaque Composer */}
            {currentSpec.assetType === 'photo' && (
              <DatePlaqueComposer
                settings={datePlaque}
                onChange={setDatePlaque}
                mandatoryNotice={
                  currentSpec.requiresNameAndDate === 'mandatory'
                    ? 'Mandatory for this Exam'
                    : undefined
                }
              />
            )}

            {/* Signature & Thumb Paper Whitener & Contrast Enhancer */}
            {(currentSpec.assetType === 'signature' || currentSpec.assetType === 'thumb') && (
              <SignatureEnhancerControl
                settings={signatureFilter}
                onChange={setSignatureFilter}
                assetType={currentSpec.assetType}
              />
            )}
          </div>

          {/* Right Column (5 cols): Sticky Compression Telemetry & Instant Download */}
          <div className="lg:col-span-5 sticky top-20 space-y-4">
            <CompressionTelemetryCard
              spec={currentSpec}
              report={auditReport}
              isProcessing={isProcessing}
              onDownload={handleDownload}
              portalShortName={selectedPreset?.shortName || 'FormFit'}
            />
          </div>
        </div>
      )}
    </div>
  );
}
