import { createCompatibleCanvas } from './canvas-renderer';

export interface StitcherConfig {
  photoCanvas: CanvasImageSource;
  photoWidth: number;
  photoHeight: number;
  signatureCanvas: CanvasImageSource;
  signatureWidth: number;
  signatureHeight: number;
  layout: 'vertical' | 'horizontal';
  dividerLine?: boolean;
  spacingPx?: number;
  backgroundColor?: string;
}

export function stitchPhotoAndSignature(config: StitcherConfig): HTMLCanvasElement | OffscreenCanvas {
  const {
    photoCanvas,
    photoWidth,
    photoHeight,
    signatureCanvas,
    signatureWidth,
    signatureHeight,
    layout,
    dividerLine = true,
    spacingPx = 4,
    backgroundColor = '#FFFFFF',
  } = config;

  let totalWidth = 0;
  let totalHeight = 0;

  if (layout === 'vertical') {
    // Photo on top, signature below
    // Normalize width to the photo width
    totalWidth = photoWidth;
    const scaledSignHeight = Math.round((signatureHeight / signatureWidth) * totalWidth);
    totalHeight = photoHeight + spacingPx + scaledSignHeight;

    const canvas = createCompatibleCanvas(totalWidth, totalHeight);
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, totalWidth, totalHeight);

    // Draw photo
    ctx.drawImage(photoCanvas, 0, 0, photoWidth, photoHeight, 0, 0, totalWidth, photoHeight);

    // Optional divider line
    if (dividerLine) {
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, photoHeight + spacingPx / 2);
      ctx.lineTo(totalWidth, photoHeight + spacingPx / 2);
      ctx.stroke();
    }

    // Draw signature
    ctx.drawImage(
      signatureCanvas,
      0,
      0,
      signatureWidth,
      signatureHeight,
      0,
      photoHeight + spacingPx,
      totalWidth,
      scaledSignHeight
    );

    return canvas;
  } else {
    // Horizontal layout: photo on left, signature on right
    totalHeight = photoHeight;
    const scaledSignWidth = Math.round((signatureWidth / signatureHeight) * totalHeight);
    totalWidth = photoWidth + spacingPx + scaledSignWidth;

    const canvas = createCompatibleCanvas(totalWidth, totalHeight);
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, totalWidth, totalHeight);

    // Draw photo
    ctx.drawImage(photoCanvas, 0, 0, photoWidth, photoHeight, 0, 0, photoWidth, totalHeight);

    // Optional divider line
    if (dividerLine) {
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(photoWidth + spacingPx / 2, 0);
      ctx.lineTo(photoWidth + spacingPx / 2, totalHeight);
      ctx.stroke();
    }

    // Draw signature
    ctx.drawImage(
      signatureCanvas,
      0,
      0,
      signatureWidth,
      signatureHeight,
      photoWidth + spacingPx,
      0,
      scaledSignWidth,
      totalHeight
    );

    return canvas;
  }
}
