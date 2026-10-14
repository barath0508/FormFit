export interface CropRect {
  x: number; // 0..1 normalized
  y: number; // 0..1 normalized
  width: number; // 0..1 normalized
  height: number; // 0..1 normalized
}

export interface RenderJobConfig {
  sourceImage: CanvasImageSource;
  sourceWidth: number;
  sourceHeight: number;
  crop: CropRect;
  rotationDeg: number; // -180 to 180
  targetWidth: number;
  targetHeight: number;
  backgroundFillColor?: string; // Default '#FFFFFF'
  brightness?: number; // -30 to +30
  contrast?: number; // -30 to +30
  signatureFilter?: {
    enabled: boolean;
    threshold: number; // 120 to 235
    preserveBlueInk: boolean;
  };
  datePlaque?: {
    enabled: boolean;
    candidateName: string;
    dateText: string; // DD-MM-YYYY
    theme: 'white_bg' | 'black_bg';
  };
}

/**
 * Creates an OffscreenCanvas or HTMLCanvasElement depending on runtime environment
 */
export function createCompatibleCanvas(width: number, height: number): HTMLCanvasElement | OffscreenCanvas {
  if (typeof OffscreenCanvas !== 'undefined') {
    return new OffscreenCanvas(width, height);
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function renderProcessedCanvas(config: RenderJobConfig): HTMLCanvasElement | OffscreenCanvas {
  const {
    sourceImage,
    sourceWidth,
    sourceHeight,
    crop,
    rotationDeg = 0,
    targetWidth,
    targetHeight,
    backgroundFillColor = '#FFFFFF',
    brightness = 0,
    contrast = 0,
    signatureFilter,
    datePlaque,
  } = config;

  const canvas = createCompatibleCanvas(targetWidth, targetHeight);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  if (!ctx) {
    throw new Error('Failed to acquire 2D rendering context');
  }

  // 1. Fill solid background
  ctx.fillStyle = backgroundFillColor;
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  // High quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 2. Render source image with rotation and crop
  ctx.save();

  // If brightness or contrast is specified (and signature filter is NOT active)
  if ((brightness !== 0 || contrast !== 0) && !signatureFilter?.enabled) {
    const bFactor = 100 + brightness;
    const cFactor = 100 + contrast;
    ctx.filter = `brightness(${bFactor}%) contrast(${cFactor}%)`;
  }

  // Compute crop box in actual source pixels
  const sx = Math.max(0, crop.x * sourceWidth);
  const sy = Math.max(0, crop.y * sourceHeight);
  const sWidth = Math.min(sourceWidth - sx, crop.width * sourceWidth);
  const sHeight = Math.min(sourceHeight - sy, crop.height * sourceHeight);

  if (rotationDeg !== 0) {
    // Translate to center of canvas, rotate, translate back
    ctx.translate(targetWidth / 2, targetHeight / 2);
    ctx.rotate((rotationDeg * Math.PI) / 180);
    ctx.drawImage(sourceImage, sx, sy, sWidth, sHeight, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
  } else {
    ctx.drawImage(sourceImage, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);
  }

  ctx.restore();

  // 3. Signature Adaptive Luminance Thresholding
  if (signatureFilter?.enabled) {
    applySignatureFilter(ctx, targetWidth, targetHeight, signatureFilter.threshold, signatureFilter.preserveBlueInk);
  }

  // 4. Name & Date-on-Photo (DOP) Plaque
  if (datePlaque?.enabled) {
    renderDatePlaque(ctx, targetWidth, targetHeight, datePlaque);
  }

  return canvas;
}

/**
 * Converts greyscale / shadowed paper backgrounds to pure #FFFFFF while preserving crisp ink
 */
function applySignatureFilter(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  width: number,
  height: number,
  threshold: number,
  preserveBlueInk: boolean
) {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  const len = data.length;

  for (let i = 0; i < len; i += 4) {
    const r = data[i] ?? 0;
    const g = data[i + 1] ?? 0;
    const b = data[i + 2] ?? 0;

    // Perceived luminance formula (ITU-R BT.601)
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    if (luminance >= threshold) {
      // Paper background -> turn into pure white
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    } else {
      if (preserveBlueInk && b > r + 15 && b > g + 15) {
        // Candidate signed with blue ballpoint or fountain pen
        // Enhance contrast while preserving blue hue
        const factor = Math.pow(luminance / threshold, 1.4);
        data[i] = Math.min(255, Math.floor(r * factor));
        data[i + 1] = Math.min(255, Math.floor(g * factor));
        data[i + 2] = Math.min(255, Math.floor(b * (factor * 1.2)));
      } else {
        // Black or dark ink -> amplify darkness for high sharpness
        const darkened = Math.floor(luminance * 0.7);
        data[i] = darkened;
        data[i + 1] = darkened;
        data[i + 2] = darkened;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
}

/**
 * Renders the regulatory Candidate Name and Date of Photograph (DOP) plaque at the bottom of the canvas
 */
function renderDatePlaque(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  width: number,
  height: number,
  config: {
    candidateName: string;
    dateText: string;
    theme: 'white_bg' | 'black_bg';
  }
) {
  const { candidateName, dateText, theme } = config;
  const hasName = candidateName.trim().length > 0;
  const hasDate = dateText.trim().length > 0;
  if (!hasName && !hasDate) return;

  // Plaque height: 16% if both name & date, 10% if only date
  const plaqueHeight = Math.round(height * (hasName && hasDate ? 0.17 : 0.11));
  const startY = height - plaqueHeight;

  const isWhite = theme === 'white_bg';
  const bgColor = isWhite ? '#FFFFFF' : '#0F172A';
  const textColor = isWhite ? '#000000' : '#FFFFFF';
  const borderColor = isWhite ? '#CBD5E1' : '#334155';

  // Draw plaque box
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, startY, width, plaqueHeight);

  // Top divider border
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = Math.max(1, Math.round(width / 300));
  ctx.beginPath();
  ctx.moveTo(0, startY);
  ctx.lineTo(width, startY);
  ctx.stroke();

  // Dynamic font sizing
  const maxTextWidth = width * 0.92;
  const nameStr = candidateName.trim().toUpperCase();
  const dateStr = dateText.trim().startsWith('DOP') ? dateText.trim() : `DOP: ${dateText.trim()}`;

  // Line 1: Candidate Name
  if (hasName && hasDate) {
    let nameFontSize = Math.max(10, Math.floor(plaqueHeight * 0.38));
    ctx.font = `bold ${nameFontSize}px Arial, "Helvetica Neue", sans-serif`;
    while (ctx.measureText(nameStr).width > maxTextWidth && nameFontSize > 9) {
      nameFontSize--;
      ctx.font = `bold ${nameFontSize}px Arial, "Helvetica Neue", sans-serif`;
    }

    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(nameStr, width / 2, startY + plaqueHeight * 0.35);

    // Line 2: Date
    let dateFontSize = Math.max(9, Math.floor(nameFontSize * 0.85));
    ctx.font = `600 ${dateFontSize}px Arial, "Helvetica Neue", sans-serif`;
    while (ctx.measureText(dateStr).width > maxTextWidth && dateFontSize > 8) {
      dateFontSize--;
      ctx.font = `600 ${dateFontSize}px Arial, "Helvetica Neue", sans-serif`;
    }
    ctx.fillText(dateStr, width / 2, startY + plaqueHeight * 0.76);
  } else {
    // Only one line
    const singleStr = hasName ? nameStr : dateStr;
    let fontSize = Math.max(10, Math.floor(plaqueHeight * 0.55));
    ctx.font = `bold ${fontSize}px Arial, "Helvetica Neue", sans-serif`;
    while (ctx.measureText(singleStr).width > maxTextWidth && fontSize > 9) {
      fontSize--;
      ctx.font = `bold ${fontSize}px Arial, "Helvetica Neue", sans-serif`;
    }

    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(singleStr, width / 2, startY + plaqueHeight * 0.52);
  }
}
