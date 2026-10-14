import { describe, it, expect } from 'vitest';
import { patchJpegDpiHeader, padJpegToTargetBytes, readJpegDpi } from '@/lib/imaging/dpi-patcher';
import { auditOutputBuffer } from '@/lib/imaging/compliance-auditor';
import { getPresetBySlug } from '@/data/presets';

describe('End-to-End Imaging & Compliance Pipeline', () => {
  it('guarantees SSC Signature strictly hits the 10 KB to 20 KB window via floor padding', () => {
    const sscPreset = getPresetBySlug('ssc-cgl-chsl-mts-resizer');
    expect(sscPreset).toBeDefined();

    const signSpec = sscPreset?.assets.find((a) => a.assetType === 'signature')!;
    expect(signSpec).toBeDefined();
    expect(signSpec.minKB).toBe(10);
    expect(signSpec.maxKB).toBe(20);

    // Simulate an ultra-low entropy clean white signature that compresses to only 4 KB
    const smallBuffer = new Uint8Array(4 * 1024);
    smallBuffer[0] = 0xff;
    smallBuffer[1] = 0xd8;
    smallBuffer[smallBuffer.length - 2] = 0xff;
    smallBuffer[smallBuffer.length - 1] = 0xd9;

    // Apply 200 DPI patch
    const patched = patchJpegDpiHeader(smallBuffer, signSpec.dpi);
    expect(patched.byteLength).toBeGreaterThanOrEqual(smallBuffer.byteLength);

    // If smaller than minBytes, apply floor padding
    const minBytes = signSpec.minKB * 1024; // 10,240 bytes
    const maxBytes = signSpec.maxKB * 1024; // 20,480 bytes
    const safeTargetBytes = minBytes + 2048; // 12,288 bytes

    const compliantBuffer = padJpegToTargetBytes(patched, safeTargetBytes);

    expect(compliantBuffer.byteLength).toBe(safeTargetBytes);
    expect(compliantBuffer.byteLength).toBeGreaterThanOrEqual(minBytes);
    expect(compliantBuffer.byteLength).toBeLessThanOrEqual(maxBytes);

    // Run compliance audit
    const report = auditOutputBuffer(
      compliantBuffer,
      signSpec.widthPx,
      signSpec.heightPx,
      signSpec,
      false
    );

    expect(report.allPassed).toBe(true);
    expect(report.checks.find((c) => c.id === 'file_size')?.passed).toBe(true);
    expect(report.checks.find((c) => c.id === 'dpi_header')?.passed).toBe(true);
  });

  it('guarantees NSDL PAN Photo embeds exact 200 DPI in big-endian bytes', () => {
    const nsdlPreset = getPresetBySlug('nsdl-pan-card-photo-resizer');
    expect(nsdlPreset).toBeDefined();

    const photoSpec = nsdlPreset?.assets.find((a) => a.assetType === 'photo')!;
    expect(photoSpec).toBeDefined();
    expect(photoSpec.dpi).toBe(200);

    const rawBuf = new Uint8Array(25 * 1024);
    rawBuf[0] = 0xff;
    rawBuf[1] = 0xd8;
    rawBuf[rawBuf.length - 2] = 0xff;
    rawBuf[rawBuf.length - 1] = 0xd9;

    const patched = patchJpegDpiHeader(rawBuf, photoSpec.dpi);
    const dpi = readJpegDpi(patched);

    expect(dpi).not.toBeNull();
    expect(dpi?.xDensity).toBe(200);
    expect(dpi?.yDensity).toBe(200);
    expect(dpi?.unit).toBe(1);

    const report = auditOutputBuffer(
      patched,
      photoSpec.widthPx,
      photoSpec.heightPx,
      photoSpec,
      false
    );

    expect(report.allPassed).toBe(true);
  });

  it('guarantees UTIITSL PAN Photo embeds exact 300 DPI', () => {
    const utiPreset = getPresetBySlug('utiitsl-pan-card-photo-resizer');
    expect(utiPreset).toBeDefined();

    const photoSpec = utiPreset?.assets.find((a) => a.assetType === 'photo')!;
    expect(photoSpec).toBeDefined();
    expect(photoSpec.dpi).toBe(300);

    const rawBuf = new Uint8Array(15 * 1024);
    rawBuf[0] = 0xff;
    rawBuf[1] = 0xd8;
    rawBuf[rawBuf.length - 2] = 0xff;
    rawBuf[rawBuf.length - 1] = 0xd9;

    const patched = patchJpegDpiHeader(rawBuf, photoSpec.dpi);
    const dpi = readJpegDpi(patched);

    expect(dpi?.xDensity).toBe(300);
    expect(dpi?.yDensity).toBe(300);
  });
});
