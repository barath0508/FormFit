import { AssetSpec } from '@/types/preset';
import { readJpegDpi } from './dpi-patcher';

export interface ComplianceCheckItem {
  id: 'dimensions' | 'file_size' | 'dpi_header' | 'format' | 'dop_plaque';
  label: string;
  expected: string;
  actual: string;
  passed: boolean;
  status: 'pass' | 'warn' | 'fail';
  detail?: string;
}

export interface ComplianceAuditReport {
  allPassed: boolean;
  actualBytes: number;
  actualKB: number;
  checks: ComplianceCheckItem[];
}

export function auditOutputBuffer(
  buffer: Uint8Array,
  renderedWidth: number,
  renderedHeight: number,
  spec: AssetSpec,
  dopRendered: boolean
): ComplianceAuditReport {
  const actualBytes = buffer.byteLength;
  const actualKB = Number((actualBytes / 1024).toFixed(1));
  const minBytes = Math.floor(spec.minKB * 1024);
  const maxBytes = Math.ceil(spec.maxKB * 1024);

  const checks: ComplianceCheckItem[] = [];

  // 1. Dimensions check
  const dimPassed = renderedWidth === spec.widthPx && renderedHeight === spec.heightPx;
  checks.push({
    id: 'dimensions',
    label: 'Image Dimensions',
    expected: `${spec.widthPx} × ${spec.heightPx} px (${spec.widthCm} × ${spec.heightCm} cm)`,
    actual: `${renderedWidth} × ${renderedHeight} px`,
    passed: dimPassed,
    status: dimPassed ? 'pass' : 'fail',
    detail: dimPassed ? 'Pixel dimensions match official exam portal notification.' : 'Dimensions differ from specified requirements.',
  });

  // 2. File size check
  const sizePassed = actualBytes >= minBytes && actualBytes <= maxBytes;
  checks.push({
    id: 'file_size',
    label: 'File Size in KB',
    expected: `${spec.minKB} KB – ${spec.maxKB} KB (${minBytes.toLocaleString()} – ${maxBytes.toLocaleString()} B)`,
    actual: `${actualKB} KB (${actualBytes.toLocaleString()} Bytes)`,
    passed: sizePassed,
    status: sizePassed ? 'pass' : 'fail',
    detail: sizePassed
      ? 'File size falls safely inside the portal upload window.'
      : actualBytes < minBytes
      ? `File size is under the required ${spec.minKB} KB floor.`
      : `File size exceeds the allowed ${spec.maxKB} KB ceiling.`,
  });

  // 3. DPI check
  const dpiInfo = readJpegDpi(buffer);
  const detectedDpi = dpiInfo ? dpiInfo.xDensity : 72;
  const dpiPassed = detectedDpi === spec.dpi;
  checks.push({
    id: 'dpi_header',
    label: 'DPI Resolution Metadata',
    expected: `${spec.dpi} DPI (JFIF APP0)`,
    actual: `${detectedDpi} DPI`,
    passed: dpiPassed,
    status: dpiPassed ? 'pass' : 'warn',
    detail: dpiPassed
      ? 'Binary JFIF header carries verified DPI density tags.'
      : 'DPI metadata header could not be verified.',
  });

  // 4. File format check
  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8;
  const isPdf = buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46;
  const isExpectedPdf = spec.assetType === 'document_pdf';
  const formatPassed = isExpectedPdf ? isPdf : isJpeg;

  checks.push({
    id: 'format',
    label: 'File Format & Container',
    expected: isExpectedPdf ? 'PDF Document' : 'Standard JPEG / sRGB (.jpg)',
    actual: isPdf ? 'PDF Document' : isJpeg ? 'JPEG (.jpg) with clean JFIF' : 'Unknown',
    passed: formatPassed,
    status: formatPassed ? 'pass' : 'fail',
    detail: formatPassed ? 'Valid file container matching portal upload rules.' : 'Unexpected file format encoding.',
  });

  // 5. Name & Date-on-Photo Plaque check
  let dopStatus: 'pass' | 'warn' | 'fail' = 'pass';
  let dopPassed = true;
  let dopExpected = 'Not mandatory';
  let dopDetail = 'Plaque is optional for this portal.';

  if (spec.requiresNameAndDate === 'mandatory') {
    dopExpected = 'Mandatory Candidate Name & DOP Plaque';
    dopPassed = dopRendered;
    dopStatus = dopRendered ? 'pass' : 'warn';
    dopDetail = dopRendered
      ? 'Official name and date plaque successfully rendered.'
      : 'Notice: Portal mandates Candidate Name and Date on photograph.';
  } else if (spec.requiresNameAndDate === 'recommended') {
    dopExpected = 'Recommended Name & Date Plaque';
    dopStatus = dopRendered ? 'pass' : 'pass';
    dopDetail = dopRendered
      ? 'Name & date plaque rendered.'
      : 'Allowed without plaque per official brochure.';
  }

  checks.push({
    id: 'dop_plaque',
    label: 'Name & Date Plaque (DOP)',
    expected: dopExpected,
    actual: dopRendered ? 'Rendered at bottom' : 'Standard Photo (No Plaque)',
    passed: dopPassed,
    status: dopStatus,
    detail: dopDetail,
  });

  const allPassed = checks.every((c) => c.passed);

  return {
    allPassed,
    actualBytes,
    actualKB,
    checks,
  };
}
