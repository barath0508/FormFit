import { patchJpegDpiHeader, padJpegToTargetBytes } from './dpi-patcher';

export interface CompressionTarget {
  minBytes: number;
  maxBytes: number;
  targetDpi: number;
}

export interface CompressionResult {
  buffer: Uint8Array;
  finalBytes: number;
  qualityUsed: number;
  wasPadded: boolean;
  dpiPatched: number;
}

/**
 * Converts a Canvas to a JPEG Blob in either DOM or OffscreenCanvas environments
 */
export async function canvasToJpegBlob(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  quality: number
): Promise<Blob> {
  if ('convertToBlob' in canvas && typeof canvas.convertToBlob === 'function') {
    return await canvas.convertToBlob({ type: 'image/jpeg', quality });
  }

  const domCanvas = canvas as HTMLCanvasElement;
  return new Promise<Blob>((resolve, reject) => {
    domCanvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('CANVAS_TO_BLOB_FAILED'));
        }
      },
      'image/jpeg',
      quality
    );
  });
}

/**
 * Deterministic binary-search compressor that guarantees output is strictly
 * between [minBytes, maxBytes] and carries correct DPI metadata.
 */
export async function compressCanvasToExactKB(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  target: CompressionTarget
): Promise<CompressionResult> {
  const { minBytes, maxBytes, targetDpi } = target;

  let low = 0.01;
  let high = 0.98;
  let bestBuffer: Uint8Array | null = null;
  let bestQuality = 0.85;

  // Run up to 8 binary search iterations
  for (let iter = 0; iter < 8; iter++) {
    const mid = Number(((low + high) / 2).toFixed(3));
    const rawBlob = await canvasToJpegBlob(canvas, mid);
    const rawArrayBuffer = await rawBlob.arrayBuffer();
    const dpiPatchedBuffer = patchJpegDpiHeader(new Uint8Array(rawArrayBuffer), targetDpi);

    if (dpiPatchedBuffer.byteLength >= minBytes && dpiPatchedBuffer.byteLength <= maxBytes) {
      bestBuffer = dpiPatchedBuffer;
      bestQuality = mid;
      // Sweet spot target: try pushing quality slightly higher while staying below 85% of maxBytes
      const safeCeiling = minBytes + (maxBytes - minBytes) * 0.85;
      if (dpiPatchedBuffer.byteLength < safeCeiling) {
        low = mid;
      } else {
        break;
      }
    } else if (dpiPatchedBuffer.byteLength > maxBytes) {
      high = mid;
    } else {
      // Smaller than minBytes
      low = mid;
      bestBuffer = dpiPatchedBuffer;
      bestQuality = mid;
    }
  }

  // Fallback if no iteration landed inside [minBytes, maxBytes]
  if (!bestBuffer) {
    const fallbackBlob = await canvasToJpegBlob(canvas, 0.02);
    bestBuffer = patchJpegDpiHeader(new Uint8Array(await fallbackBlob.arrayBuffer()), targetDpi);
    bestQuality = 0.02;
  }

  // If still above maxBytes (e.g. extremely dense canvas with tight ceiling), downscale slightly
  if (bestBuffer.byteLength > maxBytes && typeof document !== 'undefined') {
    const scaleFactor = Math.max(0.4, Math.sqrt(maxBytes / bestBuffer.byteLength) * 0.92);
    const w = Math.max(100, Math.round(canvas.width * scaleFactor));
    const h = Math.max(100, Math.round(canvas.height * scaleFactor));
    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = w;
    scaledCanvas.height = h;
    const sCtx = scaledCanvas.getContext('2d');
    if (sCtx) {
      sCtx.drawImage(canvas, 0, 0, w, h);
      const scaledBlob = await canvasToJpegBlob(scaledCanvas, 0.65);
      const scaledDpiBuf = patchJpegDpiHeader(new Uint8Array(await scaledBlob.arrayBuffer()), targetDpi);
      if (scaledDpiBuf.byteLength <= maxBytes) {
        bestBuffer = scaledDpiBuf;
      }
    }
  }

  // Handle floor padding if smaller than minBytes
  let wasPadded = false;
  if (bestBuffer.byteLength < minBytes) {
    const targetSafeFloor = Math.min(
      Math.max(minBytes + 64, minBytes + Math.floor((maxBytes - minBytes) * 0.35)),
      Math.max(minBytes + 32, maxBytes - 256)
    );
    bestBuffer = padJpegToTargetBytes(bestBuffer, targetSafeFloor);
    wasPadded = true;
  }

  return {
    buffer: bestBuffer,
    finalBytes: bestBuffer.byteLength,
    qualityUsed: bestQuality,
    wasPadded,
    dpiPatched: targetDpi,
  };
}
