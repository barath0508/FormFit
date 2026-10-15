import { describe, it, expect } from 'vitest';
import { patchJpegDpiHeader, padJpegToTargetBytes, readJpegDpi } from '@/lib/imaging/dpi-patcher';

describe('dpi-patcher', () => {
  // Construct a minimal valid JPEG buffer: SOI + APP0 + DQT + SOF0 + SOS + EOI
  function createMinimalJpeg(): Uint8Array {
    return new Uint8Array([
      0xff, 0xd8, // SOI
      0xff, 0xe0, 0x00, 0x10, // APP0 length 16
      0x4a, 0x46, 0x49, 0x46, 0x00, // "JFIF\0"
      0x01, 0x01, // v1.1
      0x01, // unit = DPI
      0x00, 0x48, // 72 DPI
      0x00, 0x48, // 72 DPI
      0x00, 0x00, // thumbnail
      // Dummy entropy / markers
      0xff, 0xfe, 0x00, 0x04, 0x41, 0x42, // COM
      0xff, 0xd9, // EOI
    ]);
  }

  it('updates DPI to 200 in existing APP0 segment', () => {
    const input = createMinimalJpeg();
    const patched = patchJpegDpiHeader(input, 200);

    expect(patched[0]).toBe(0xff);
    expect(patched[1]).toBe(0xd8);
    expect(patched[2]).toBe(0xff);
    expect(patched[3]).toBe(0xe0);
    // Unit byte (offset 13) should be 1
    expect(patched[13]).toBe(1);
    // 200 in hex is 0x00C8 -> hi=0, lo=200
    expect(patched[14]).toBe(0);
    expect(patched[15]).toBe(200);
    expect(patched[16]).toBe(0);
    expect(patched[17]).toBe(200);

    const dpi = readJpegDpi(patched);
    expect(dpi).not.toBeNull();
    expect(dpi?.xDensity).toBe(200);
    expect(dpi?.yDensity).toBe(200);
    expect(dpi?.unit).toBe(1);
  });

  it('updates DPI to 300 for UTIITSL PAN preset', () => {
    const input = createMinimalJpeg();
    const patched = patchJpegDpiHeader(input, 300);

    // 300 in hex is 0x012C -> hi=1, lo=44
    expect(patched[14]).toBe(1);
    expect(patched[15]).toBe(44);
    expect(patched[16]).toBe(1);
    expect(patched[17]).toBe(44);

    const dpi = readJpegDpi(patched);
    expect(dpi?.xDensity).toBe(300);
    expect(dpi?.yDensity).toBe(300);
  });

  it('inserts APP0 segment when JPEG missing APP0 header', () => {
    // A JPEG buffer without APP0 (e.g. SOI followed directly by COM)
    const bareJpeg = new Uint8Array([
      0xff, 0xd8, // SOI
      0xff, 0xfe, 0x00, 0x04, 0x41, 0x42, // COM
      0xff, 0xd9, // EOI
    ]);

    const patched = patchJpegDpiHeader(bareJpeg, 200);
    expect(patched[0]).toBe(0xff);
    expect(patched[1]).toBe(0xd8);
    expect(patched[2]).toBe(0xff);
    expect(patched[3]).toBe(0xe0);

    const dpi = readJpegDpi(patched);
    expect(dpi?.xDensity).toBe(200);
    expect(dpi?.yDensity).toBe(200);
    expect(dpi?.unit).toBe(1);
  });

  it('pads small JPEG buffer to exact target bytes with COM marker', () => {
    const input = createMinimalJpeg();
    const targetSize = 15360; // 15 KB
    const padded = padJpegToTargetBytes(input, targetSize);

    expect(padded.byteLength).toBe(targetSize);
    // Starts with SOI
    expect(padded[0]).toBe(0xff);
    expect(padded[1]).toBe(0xd8);
    // Ends with EOI
    expect(padded[padded.byteLength - 2]).toBe(0xff);
    expect(padded[padded.byteLength - 1]).toBe(0xd9);

    // Check inserted COM marker at offset 20
    expect(padded[20]).toBe(0xff);
    expect(padded[21]).toBe(0xfe);
  });

  it('pads large requests exceeding 65535 bytes across multiple COM segments', () => {
    const input = createMinimalJpeg();
    const targetSize = 80000; // 80 KB (> 65535 bytes)
    const padded = padJpegToTargetBytes(input, targetSize);

    expect(padded.byteLength).toBe(targetSize);
    expect(padded[0]).toBe(0xff);
    expect(padded[1]).toBe(0xd8);
    expect(padded[20]).toBe(0xff);
    expect(padded[21]).toBe(0xfe);
    expect(padded[padded.byteLength - 2]).toBe(0xff);
    expect(padded[padded.byteLength - 1]).toBe(0xd9);
  });

  it('returns original buffer if already larger than target bytes', () => {
    const input = createMinimalJpeg();
    const padded = padJpegToTargetBytes(input, input.byteLength - 5);
    expect(padded.byteLength).toBe(input.byteLength);
  });
});
