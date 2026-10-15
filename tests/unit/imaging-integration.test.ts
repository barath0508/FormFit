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

  it('guarantees UPSC Square Photo satisfies 1:1 ratio, 20-300 KB, and DOP plaque check', () => {
    const upscPreset = getPresetBySlug('upsc-cse-ias-photo-signature-resizer');
    expect(upscPreset).toBeDefined();

    const photoSpec = upscPreset?.assets.find((a) => a.assetType === 'photo')!;
    expect(photoSpec).toBeDefined();
    expect(photoSpec.widthPx).toBe(550);
    expect(photoSpec.heightPx).toBe(550);
    expect(photoSpec.requiresNameAndDate).toBe('mandatory');

    const rawBuf = new Uint8Array(65 * 1024);
    rawBuf[0] = 0xff;
    rawBuf[1] = 0xd8;
    rawBuf[rawBuf.length - 2] = 0xff;
    rawBuf[rawBuf.length - 1] = 0xd9;

    const patched = patchJpegDpiHeader(rawBuf, photoSpec.dpi);
    const report = auditOutputBuffer(
      patched,
      photoSpec.widthPx,
      photoSpec.heightPx,
      photoSpec,
      true
    );

    expect(report.allPassed).toBe(true);
    expect(report.checks.find((c) => c.id === 'dimensions')?.passed).toBe(true);
    expect(report.checks.find((c) => c.id === 'dop_plaque')?.passed).toBe(true);
  });

  it('guarantees NEET Postcard Photo satisfies 800x1200 px and 10-200 KB bounds', () => {
    const neetPreset = getPresetBySlug('nta-neet-ug-passport-postcard-resizer');
    expect(neetPreset).toBeDefined();

    const postcardSpec = neetPreset?.assets.find((a) => a.id === 'neet-postcard-photo')!;
    expect(postcardSpec).toBeDefined();
    expect(postcardSpec.widthPx).toBe(800);
    expect(postcardSpec.heightPx).toBe(1200);
    expect(postcardSpec.minKB).toBe(10);
    expect(postcardSpec.maxKB).toBe(200);

    const rawBuf = new Uint8Array(95 * 1024);
    rawBuf[0] = 0xff;
    rawBuf[1] = 0xd8;
    rawBuf[rawBuf.length - 2] = 0xff;
    rawBuf[rawBuf.length - 1] = 0xd9;

    const patched = patchJpegDpiHeader(rawBuf, postcardSpec.dpi);
    const report = auditOutputBuffer(
      patched,
      postcardSpec.widthPx,
      postcardSpec.heightPx,
      postcardSpec,
      true
    );

    expect(report.allPassed).toBe(true);
  });

  it('guarantees RRB Signature satisfies strict 30 KB minimum floor via padding', () => {
    const rrbPreset = getPresetBySlug('rrb-ntpc-group-d-alp-resizer');
    expect(rrbPreset).toBeDefined();

    const signSpec = rrbPreset?.assets.find((a) => a.assetType === 'signature')!;
    expect(signSpec).toBeDefined();
    expect(signSpec.minKB).toBe(30);
    expect(signSpec.maxKB).toBe(70);

    // Raw signature compressed to only 8 KB
    const smallBuf = new Uint8Array(8 * 1024);
    smallBuf[0] = 0xff;
    smallBuf[1] = 0xd8;
    smallBuf[smallBuf.length - 2] = 0xff;
    smallBuf[smallBuf.length - 1] = 0xd9;

    const patched = patchJpegDpiHeader(smallBuf, signSpec.dpi);
    // Pad to 45 KB safe target
    const targetBytes = 45 * 1024;
    const padded = padJpegToTargetBytes(patched, targetBytes);

    expect(padded.byteLength).toBe(targetBytes);
    const report = auditOutputBuffer(
      padded,
      signSpec.widthPx,
      signSpec.heightPx,
      signSpec,
      false
    );

    expect(report.allPassed).toBe(true);
    expect(report.checks.find((c) => c.id === 'file_size')?.passed).toBe(true);
  });

  it('guarantees UPPSC Composite Photo+Signature satisfies 276x472 px at 200 DPI', () => {
    const uppscPreset = getPresetBySlug('uppsc-upsssc-up-police-photo-resizer');
    expect(uppscPreset).toBeDefined();

    const compositeSpec = uppscPreset?.assets.find((a) => a.id === 'uppsc-composite')!;
    expect(compositeSpec).toBeDefined();
    expect(compositeSpec.widthPx).toBe(276);
    expect(compositeSpec.heightPx).toBe(472);
    expect(compositeSpec.minKB).toBe(20);
    expect(compositeSpec.maxKB).toBe(50);

    const rawBuf = new Uint8Array(35 * 1024);
    rawBuf[0] = 0xff;
    rawBuf[1] = 0xd8;
    rawBuf[rawBuf.length - 2] = 0xff;
    rawBuf[rawBuf.length - 1] = 0xd9;

    const patched = patchJpegDpiHeader(rawBuf, compositeSpec.dpi);
    const report = auditOutputBuffer(
      patched,
      compositeSpec.widthPx,
      compositeSpec.heightPx,
      compositeSpec,
      false
    );

    expect(report.allPassed).toBe(true);
  });
});
