import { describe, it, expect } from 'vitest';
import { auditOutputBuffer } from '@/lib/imaging/compliance-auditor';
import { patchJpegDpiHeader } from '@/lib/imaging/dpi-patcher';
import { AssetSpec } from '@/types/preset';

describe('compliance-auditor', () => {
  const dummySpec: AssetSpec = {
    id: 'test-photo',
    label: 'Passport Photo',
    assetType: 'photo',
    widthPx: 200,
    heightPx: 230,
    widthCm: 3.5,
    heightCm: 4.5,
    minKB: 20,
    maxKB: 50,
    dpi: 200,
    allowedFormats: ['jpg', 'jpeg'],
    backgroundRule: 'White background',
    requiresNameAndDate: 'mandatory',
    notes: [],
  };

  it('passes compliance audit when dimensions, byte size, DPI, and plaque match', () => {
    // Create a 25 KB buffer starting with valid JPEG SOI + APP0 200 DPI
    const rawJpeg = new Uint8Array(25 * 1024);
    rawJpeg[0] = 0xff;
    rawJpeg[1] = 0xd8;
    rawJpeg[rawJpeg.length - 2] = 0xff;
    rawJpeg[rawJpeg.length - 1] = 0xd9;

    const patched = patchJpegDpiHeader(rawJpeg, 200);
    const report = auditOutputBuffer(patched, 200, 230, dummySpec, true);

    expect(report.allPassed).toBe(true);
    expect(report.checks.find((c) => c.id === 'dimensions')?.passed).toBe(true);
    expect(report.checks.find((c) => c.id === 'file_size')?.passed).toBe(true);
    expect(report.checks.find((c) => c.id === 'dpi_header')?.passed).toBe(true);
    expect(report.checks.find((c) => c.id === 'dop_plaque')?.passed).toBe(true);
  });

  it('fails compliance audit when file size is below minimum KB floor', () => {
    // 10 KB buffer when spec requires 20 KB
    const smallJpeg = new Uint8Array(10 * 1024);
    smallJpeg[0] = 0xff;
    smallJpeg[1] = 0xd8;
    smallJpeg[smallJpeg.length - 2] = 0xff;
    smallJpeg[smallJpeg.length - 1] = 0xd9;

    const patched = patchJpegDpiHeader(smallJpeg, 200);
    const report = auditOutputBuffer(patched, 200, 230, dummySpec, true);

    expect(report.allPassed).toBe(false);
    expect(report.checks.find((c) => c.id === 'file_size')?.passed).toBe(false);
  });

  it('fails compliance audit when dimensions do not match', () => {
    const rawJpeg = new Uint8Array(25 * 1024);
    rawJpeg[0] = 0xff;
    rawJpeg[1] = 0xd8;
    rawJpeg[rawJpeg.length - 2] = 0xff;
    rawJpeg[rawJpeg.length - 1] = 0xd9;

    const patched = patchJpegDpiHeader(rawJpeg, 200);
    const report = auditOutputBuffer(patched, 300, 300, dummySpec, true);

    expect(report.allPassed).toBe(false);
    expect(report.checks.find((c) => c.id === 'dimensions')?.passed).toBe(false);
  });
});
