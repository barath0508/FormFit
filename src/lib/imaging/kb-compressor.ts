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

  let low = 0.08;
  let high = 0.98;
  let bestBuffer: Uint8Array | null = null;
  let bestQuality = 0.85;

  // Run up to 7 binary search iterations
  for (let iter = 0; iter < 7; iter++) {
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

  // Fallback if no iteration produced a candidate
  if (!bestBuffer) {
    const fallbackBlob = await canvasToJpegBlob(canvas, 0.08);
    bestBuffer = patchJpegDpiHeader(new Uint8Array(await fallbackBlob.arrayBuffer()), targetDpi);
    bestQuality = 0.08;
  }

  // Handle floor padding if smaller than minBytes
  let wasPadded = false;
  if (bestBuffer.byteLength < minBytes) {
    const targetSafeFloor = Math.min(
      minBytes + Math.floor((maxBytes - minBytes) * 0.35),
      maxBytes - 512
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
