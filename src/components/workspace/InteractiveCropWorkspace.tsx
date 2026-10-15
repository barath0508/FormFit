'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CropRect } from '@/lib/imaging/canvas-renderer';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  RefreshCw,
  Eye,
  Sliders,
  Move,
} from 'lucide-react';

interface InteractiveCropWorkspaceProps {
  sourceUrl: string;
  sourceWidth: number;
  sourceHeight: number;
  targetWidth: number;
  targetHeight: number;
  assetType: 'photo' | 'signature' | 'thumb' | 'document_pdf';
  onCropChange: (crop: CropRect, rotation: number) => void;
}

export function InteractiveCropWorkspace({
  sourceUrl,
  sourceWidth,
  sourceHeight,
  targetWidth,
  targetHeight,
  assetType,
  onCropChange,
}: InteractiveCropWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Framing transform state
  const [scale, setScale] = useState(1.0);
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // In pixels relative to centered crop
  const [rotation, setRotation] = useState(0); // -180 to 180 degrees
  const [straighten, setStraighten] = useState(0); // -15 to +15 degrees
  const [showBiometricGuide, setShowBiometricGuide] = useState(assetType === 'photo');

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialOffsetRef = useRef({ x: 0, y: 0 });

  // Touch pinch interaction state
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartScaleRef = useRef(1.0);

  const targetAspect = targetWidth / targetHeight;

  // Calculate normalized CropRect based on scale, offset, and rotation
  const calculateNormalizedCrop = useCallback(() => {
    // Base fit size of crop box on source image
    let baseCropW = sourceWidth;
    let baseCropH = sourceWidth / targetAspect;

    if (baseCropH > sourceHeight) {
      baseCropH = sourceHeight;
      baseCropW = sourceHeight * targetAspect;
    }

    // Apply scale (zoom factor shrinks the crop window relative to source)
    const effectiveCropW = baseCropW / scale;
    const effectiveCropH = baseCropH / scale;

    // Center coordinates accounting for viewport screen-to-source pixel ratio
    const displayedW = Math.min(600, sourceWidth);
    const pxRatio = displayedW > 0 ? sourceWidth / displayedW : 1;
    const centerX = sourceWidth / 2 - (offset.x * pxRatio) / scale;
    const centerY = sourceHeight / 2 - (offset.y * pxRatio) / scale;

    const left = Math.max(0, Math.min(sourceWidth - effectiveCropW, centerX - effectiveCropW / 2));
    const top = Math.max(0, Math.min(sourceHeight - effectiveCropH, centerY - effectiveCropH / 2));

    return {
      x: left / sourceWidth,
      y: top / sourceHeight,
      width: effectiveCropW / sourceWidth,
      height: effectiveCropH / sourceHeight,
    };
  }, [sourceWidth, sourceHeight, targetAspect, scale, offset]);

  // Notify parent of crop change
  useEffect(() => {
    const crop = calculateNormalizedCrop();
    const totalRotation = rotation + straighten;
    onCropChange(crop, totalRotation);
  }, [calculateNormalizedCrop, rotation, straighten, onCropChange]);

  // Mouse & Touch Pan handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialOffsetRef.current = { ...offset };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setOffset({
      x: initialOffsetRef.current.x + dx,
      y: initialOffsetRef.current.y + dy,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already lost
    }
  };

  // Wheel Zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.0015;
    setScale((prev) => Math.max(0.6, Math.min(5.0, prev + zoomDelta)));
  };

  // Touch Pinch Zoom handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0]!;
      const t2 = e.touches[1]!;
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      touchStartDistRef.current = dist;
      touchStartScaleRef.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      const t1 = e.touches[0]!;
      const t2 = e.touches[1]!;
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const ratio = dist / touchStartDistRef.current;
      setScale(Math.max(0.6, Math.min(5.0, touchStartScaleRef.current * ratio)));
    }
  };

  const handleTouchEnd = () => {
    touchStartDistRef.current = null;
  };

  // Keyboard accessibility controls (Arrow keys, +, -, R)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOffset((prev) => ({ ...prev, y: prev.y - step }));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOffset((prev) => ({ ...prev, y: prev.y + step }));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setOffset((prev) => ({ ...prev, x: prev.x - step }));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setOffset((prev) => ({ ...prev, x: prev.x + step }));
    } else if (e.key === '+' || e.key === '=') {
      e.preventDefault();
      setScale((prev) => Math.min(5.0, prev + 0.1));
    } else if (e.key === '-' || e.key === '_') {
      e.preventDefault();
      setScale((prev) => Math.max(0.6, prev - 0.1));
    } else if (e.key.toLowerCase() === 'r') {
      e.preventDefault();
      setRotation((prev) => (prev + 90) % 360);
    }
  };

  const handleReset = () => {
    setScale(1.0);
    setOffset({ x: 0, y: 0 });
    setRotation(0);
    setStraighten(0);
  };

  return (
    <div className="w-full space-y-3">
      {/* Interactive Crop Viewport Frame */}
      <div
        ref={containerRef}
        tabIndex={0}
        role="region"
        aria-label="Interactive image cropping viewport. Use arrow keys to pan, plus/minus to zoom, R to rotate."
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-inner cursor-grab active:cursor-grabbing select-none focus:ring-2 focus:ring-blue-500 outline-none"
        style={{ touchAction: 'none' }}
      >
        {/* Background checkerboard */}
        <div className="absolute inset-0 bg-checkerboard opacity-20 pointer-events-none" />

        {/* Scaled and panned image */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-75 will-change-transform"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation + straighten}deg) scale(${scale})`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sourceUrl}
            alt="Candidate source file"
            className="max-w-none max-h-none select-none object-contain pointer-events-none"
            style={{
              width: `${Math.min(600, sourceWidth)}px`,
              height: 'auto',
            }}
          />
        </div>

        {/* Aspect-Locked Crop Overlay Mask */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-4">
          <div
            className="relative border-2 border-white/90 shadow-[0_0_0_9999px_rgba(15,23,42,0.65)] rounded-sm"
            style={{
              aspectRatio: `${targetWidth} / ${targetHeight}`,
              maxHeight: '88%',
              maxWidth: '88%',
            }}
          >
            {/* Thirds Grid Guidelines */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
              <div className="border-r border-b border-white/60" />
              <div className="border-r border-b border-white/60" />
              <div className="border-b border-white/60" />
              <div className="border-r border-b border-white/60" />
              <div className="border-r border-b border-white/60" />
              <div className="border-b border-white/60" />
              <div className="border-r border-white/60" />
              <div className="border-r border-white/60" />
              <div />
            </div>

            {/* Corner Markers */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-blue-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-blue-400" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-blue-400" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-blue-400" />

            {/* Biometric Face Guide Overlay (Passport Photos) */}
            {showBiometricGuide && assetType === 'photo' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                {/* Crown Guide */}
                <div className="w-full border-t border-dashed border-amber-400/80 absolute top-[12%]" />
                <span className="absolute top-[13%] text-[9px] text-amber-300 font-mono tracking-tighter bg-slate-900/60 px-1 rounded">
                  HEAD CROWN (TOP)
                </span>

                {/* Eye Level Guide */}
                <div className="w-full border-t border-dashed border-emerald-400/80 absolute top-[45%]" />
                <span className="absolute top-[46%] text-[9px] text-emerald-300 font-mono tracking-tighter bg-slate-900/60 px-1 rounded">
                  EYE LEVEL
                </span>

                {/* Chin Level Guide */}
                <div className="w-full border-t border-dashed border-amber-400/80 absolute bottom-[22%]" />
                <span className="absolute bottom-[23%] text-[9px] text-amber-300 font-mono tracking-tighter bg-slate-900/60 px-1 rounded">
                  CHIN LINE
                </span>

                {/* Oval Face Silhouette */}
                <div className="w-[52%] h-[68%] rounded-[50%] border border-dashed border-white/70 absolute top-[14%]" />
              </div>
            )}

            {/* Signature Bounding Box Guide */}
            {assetType === 'signature' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[88%] h-[65%] border border-dashed border-blue-400/70 rounded flex items-center justify-center">
                  <span className="text-[10px] text-blue-200 bg-slate-900/60 px-2 py-0.5 rounded font-mono">
                    Keep signature centered inside this frame
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Viewport Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-slate-900/80 text-white text-[11px] font-mono font-medium backdrop-blur-sm border border-slate-700">
            {targetWidth} × {targetHeight} px
          </span>
          <span className="px-2 py-1 rounded bg-blue-900/80 text-blue-200 text-[11px] font-mono font-medium backdrop-blur-sm border border-blue-700">
            {scale.toFixed(1)}x Zoom
          </span>
        </div>

        {/* Toggle Biometric Overlay Button */}
        {assetType === 'photo' && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowBiometricGuide(!showBiometricGuide);
            }}
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-medium backdrop-blur-sm border transition-colors flex items-center gap-1.5 ${
              showBiometricGuide
                ? 'bg-blue-600/90 text-white border-blue-500'
                : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Biometric Guide</span>
          </button>
        )}

        {/* Hint banner at bottom */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
          <span className="text-[10px] text-slate-400 bg-slate-900/80 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-slate-800 flex items-center gap-1">
            <Move className="w-3 h-3 text-slate-400" />
            <span>Drag to pan • Pinch / Wheel to zoom</span>
          </span>
        </div>
      </div>

      {/* Transform Control Bar */}
      <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
        {/* Zoom & Rotation Quick Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Zoom Slider */}
          <div className="flex items-center gap-2 flex-1 min-w-[180px]">
            <ZoomOut className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min="0.6"
              max="4.0"
              step="0.05"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              aria-label="Image Zoom Slider"
            />
            <ZoomIn className="w-4 h-4 text-slate-400" />
          </div>

          {/* Rotation Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setRotation((prev) => (prev - 90) % 360)}
              className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs flex items-center gap-1"
              title="Rotate 90 degrees counter-clockwise"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>-90°</span>
            </button>
            <button
              type="button"
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
              className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs flex items-center gap-1"
              title="Rotate 90 degrees clockwise"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>+90°</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs flex items-center gap-1"
              title="Reset Zoom and Pan"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Fine Straighten Slider (-15° to +15°) */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-xs">
          <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>Fine Straighten:</span>
          </span>
          <input
            type="range"
            min="-15"
            max="15"
            step="0.5"
            value={straighten}
            onChange={(e) => setStraighten(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            aria-label="Fine Straighten Angle"
          />
          <span className="text-slate-700 dark:text-slate-300 font-mono w-10 text-right">
            {straighten > 0 ? `+${straighten}°` : `${straighten}°`}
          </span>
        </div>
      </div>
    </div>
  );
}
