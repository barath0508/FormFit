export interface PdfPackagingOptions {
  jpegBytes: Uint8Array;
  maxKB: number;
  pageSize?: 'A4' | 'match_image';
}

/**
 * Embeds compressed JPEG bytes into a compliant single-page PDF
 * using dynamically imported pdf-lib to maintain zero initial bundle overhead.
 */
export async function packageJpegIntoPdf(options: PdfPackagingOptions): Promise<Uint8Array> {
  const { jpegBytes, pageSize = 'A4' } = options;

  // Dynamically import pdf-lib to keep initial bundle size small
  const { PDFDocument } = await import('pdf-lib');

  const pdfDoc = await PDFDocument.create();
  const image = await pdfDoc.embedJpg(jpegBytes);

  if (pageSize === 'A4') {
    // Standard A4 dimensions in points: 595.28 x 841.89 pt (72 DPI)
    const a4Width = 595.28;
    const a4Height = 841.89;
    const page = pdfDoc.addPage([a4Width, a4Height]);

    // Scale image proportionally to fit within 40pt margins
    const margin = 40;
    const availableWidth = a4Width - margin * 2;
    const availableHeight = a4Height - margin * 2;

    const scale = Math.min(availableWidth / image.width, availableHeight / image.height, 1);
    const scaledWidth = image.width * scale;
    const scaledHeight = image.height * scale;

    // Center on page
    const x = (a4Width - scaledWidth) / 2;
    const y = (a4Height - scaledHeight) / 2;

    page.drawImage(image, {
      x,
      y,
      width: scaledWidth,
      height: scaledHeight,
    });
  } else {
    // Match exact image dimensions in points (assuming 72 points per inch)
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
