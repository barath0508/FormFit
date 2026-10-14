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

  // Check if standard APP0 JFIF header already exists at byte offset 2
  const hasApp0 =
    jpegBytes[2] === 0xff &&
    jpegBytes[3] === 0xe0 &&
    jpegBytes[6] === 0x4a && // 'J'
    jpegBytes[7] === 0x46 && // 'F'
    jpegBytes[8] === 0x49 && // 'I'
    jpegBytes[9] === 0x46; // 'F'

  if (hasApp0) {
    const out = new Uint8Array(jpegBytes);
    out[13] = 0x01; // 1 = dots per inch (DPI)
    out[14] = hi;
    out[15] = lo;
    out[16] = hi;
    out[17] = lo;
    return out;
  }

  // If no APP0 header, construct standard 18-byte JFIF APP0 segment:
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
  // Insert APP0 segment
  merged.set(app0Segment, 2);
  // Copy remaining bytes
  merged.set(jpegBytes.subarray(2), 2 + app0Segment.length);
  return merged;
}

export function padJpegToTargetBytes(jpegBytes: Uint8Array, targetByteLength: number): Uint8Array {
  if (jpegBytes.byteLength >= targetByteLength) {
    return jpegBytes;
  }

  const bytesNeeded = targetByteLength - jpegBytes.byteLength;
  // Minimum COM segment is 4 bytes (0xFF 0xFE + 2 bytes for length)
  if (bytesNeeded < 4) {
    return jpegBytes;
  }

  const payloadLength = bytesNeeded - 2; // length field includes 2 length bytes
  if (payloadLength > 65533) {
    throw new Error('PADDING_OVERFLOW: Requested padding exceeds single JPEG COM segment limit');
  }

  const comSegment = new Uint8Array(bytesNeeded);
  comSegment[0] = 0xff;
  comSegment[1] = 0xfe; // COM marker
  comSegment[2] = (payloadLength >> 8) & 0xff;
  comSegment[3] = payloadLength & 0xff;
  comSegment.fill(0x20, 4); // Fill payload with safe ASCII spaces

  // Insert COM segment immediately after SOI + APP0 header (typically offset 20)
  const insertOffset = Math.min(20, jpegBytes.length - 2);
  const padded = new Uint8Array(targetByteLength);
  padded.set(jpegBytes.subarray(0, insertOffset), 0);
  padded.set(comSegment, insertOffset);
  padded.set(jpegBytes.subarray(insertOffset), insertOffset + comSegment.length);
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
