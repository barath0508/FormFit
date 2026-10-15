/**
 * FormFit — Binary JFIF DPI Header Injector & Safe Byte Padder
 * Manipulates raw JPEG JFIF (APP0) density headers and injects JPEG COM (0xFFFE)
 * markers for exact byte floor compliance on strict Indian government portals.
 */

export function patchJpegDpiHeader(jpegBytes: Uint8Array, dpi: number): Uint8Array {
  if (jpegBytes.length < 4 || jpegBytes[0] !== 0xff || jpegBytes[1] !== 0xd8) {
    throw new Error('INVALID_JPEG_BUFFER: Missing SOI marker 0xFFD8');
  }

  const clampedDpi = Math.max(72, Math.min(1200, Math.round(dpi)));
  const hi = (clampedDpi >> 8) & 0xff;
  const lo = clampedDpi & 0xff;

  // Check if standard APP0 JFIF header exists at byte offset 2
  const hasApp0AtOffset2 =
    jpegBytes[2] === 0xff &&
    jpegBytes[3] === 0xe0 &&
    jpegBytes[6] === 0x4a && // 'J'
    jpegBytes[7] === 0x46 && // 'F'
    jpegBytes[8] === 0x49 && // 'I'
    jpegBytes[9] === 0x46; // 'F'

  if (hasApp0AtOffset2) {
    const out = new Uint8Array(jpegBytes);
    out[13] = 0x01; // 1 = dots per inch (DPI)
    out[14] = hi;
    out[15] = lo;
    out[16] = hi;
    out[17] = lo;
    return out;
  }

  // If no APP0 header at offset 2, construct standard 18-byte JFIF APP0 segment:
  // FF E0 [00 10] 'J' 'F' 'I' 'F' 00 [01 01] 01 [hi lo] [hi lo] 00 00
  const app0Segment = new Uint8Array([
    0xff,
    0xe0,
    0x00,
    0x10, // Length = 16 bytes payload + length field
    0x4a,
    0x46,
    0x49,
    0x46,
    0x00, // "JFIF\0"
    0x01,
    0x01, // Version 1.1
    0x01, // Density units = 1 (DPI)
    hi,
    lo, // Xdensity
    hi,
    lo, // Ydensity
    0x00,
    0x00, // Thumbnail width & height = 0
  ]);

  const merged = new Uint8Array(jpegBytes.length + app0Segment.length);
  // Copy SOI (first 2 bytes)
  merged.set(jpegBytes.subarray(0, 2), 0);
  // Insert APP0 segment immediately after SOI
  merged.set(app0Segment, 2);
  // Copy remaining bytes
  merged.set(jpegBytes.subarray(2), 2 + app0Segment.length);
  return merged;
}

export function padJpegToTargetBytes(jpegBytes: Uint8Array, targetByteLength: number): Uint8Array {
  if (jpegBytes.byteLength >= targetByteLength) {
    return jpegBytes;
  }

  let bytesRemaining = targetByteLength - jpegBytes.byteLength;
  // Minimum COM segment is 4 bytes (0xFF 0xFE + 2 bytes for length)
  if (bytesRemaining < 4) {
    return jpegBytes;
  }

  // Determine safe marker boundary insertion offset
  let insertOffset = 2; // Default immediately after SOI
  if (jpegBytes[2] === 0xff && jpegBytes[3] === 0xe0 && jpegBytes.length >= 6) {
    const app0Len = ((jpegBytes[4] ?? 0) << 8) | (jpegBytes[5] ?? 0);
    insertOffset = Math.min(jpegBytes.length - 2, 4 + app0Len);
  }

  // Build list of COM segments (each at most 65533 payload bytes)
  const segments: Uint8Array[] = [];
  while (bytesRemaining >= 4) {
    const chunkBytes = Math.min(bytesRemaining, 65535);
    const payloadLength = chunkBytes - 2;

    const seg = new Uint8Array(chunkBytes);
    seg[0] = 0xff;
    seg[1] = 0xfe; // COM marker
    seg[2] = (payloadLength >> 8) & 0xff;
    seg[3] = payloadLength & 0xff;
    seg.fill(0x20, 4); // Safe ASCII spaces

    segments.push(seg);
    bytesRemaining -= chunkBytes;
  }

  const totalComLength = segments.reduce((acc, s) => acc + s.byteLength, 0);
  const padded = new Uint8Array(jpegBytes.length + totalComLength);

  padded.set(jpegBytes.subarray(0, insertOffset), 0);
  let currentOffset = insertOffset;
  for (const seg of segments) {
    padded.set(seg, currentOffset);
    currentOffset += seg.byteLength;
  }
  padded.set(jpegBytes.subarray(insertOffset), currentOffset);

  return padded;
}

export function readJpegDpi(jpegBytes: Uint8Array): { xDensity: number; yDensity: number; unit: number } | null {
  if (jpegBytes.length < 20 || jpegBytes[0] !== 0xff || jpegBytes[1] !== 0xd8) {
    return null;
  }

  // Scan markers
  let offset = 2;
  while (offset < jpegBytes.length - 4) {
    if (jpegBytes[offset] !== 0xff) {
      break;
    }
    const marker = jpegBytes[offset + 1];
    if (marker === 0xd9 || marker === 0xda) {
      break; // End of Image or Start of Scan
    }

    const length = ((jpegBytes[offset + 2] ?? 0) << 8) | (jpegBytes[offset + 3] ?? 0);
    if (length < 2) break;

    if (marker === 0xe0) {
      // APP0 marker
      if (
        jpegBytes[offset + 4] === 0x4a && // 'J'
        jpegBytes[offset + 5] === 0x46 && // 'F'
        jpegBytes[offset + 6] === 0x49 && // 'I'
        jpegBytes[offset + 7] === 0x46 && // 'F'
        jpegBytes[offset + 8] === 0x00
      ) {
        const unit = jpegBytes[offset + 11] ?? 0;
        const xDensity = ((jpegBytes[offset + 12] ?? 0) << 8) | (jpegBytes[offset + 13] ?? 0);
        const yDensity = ((jpegBytes[offset + 14] ?? 0) << 8) | (jpegBytes[offset + 15] ?? 0);
        return { unit, xDensity, yDensity };
      }
    }

    offset += 2 + length;
  }

  return null;
}
