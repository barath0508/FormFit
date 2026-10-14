export interface ValidatedFileResult {
  ok: boolean;
  mimeType?: 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf';
  errorCode?: 'FILE_TOO_LARGE' | 'UNSUPPORTED_FORMAT' | 'DIMENSION_OVERFLOW' | 'CORRUPT_FILE';
  userMessage?: string;
  width?: number;
  height?: number;
}

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB
const MAX_DIMENSION_PX = 8192; // 8192x8192 px max

export async function validateUploadedFile(file: File): Promise<ValidatedFileResult> {
  // 1. Check file size cap
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      ok: false,
      errorCode: 'FILE_TOO_LARGE',
      userMessage: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 25 MB to prevent memory crashes.`,
    };
  }

  // 2. Read first 16 bytes for magic bytes verification
  let headerBuffer: ArrayBuffer;
  try {
    headerBuffer = await file.slice(0, 16).arrayBuffer();
  } catch {
    return {
      ok: false,
      errorCode: 'CORRUPT_FILE',
      userMessage: 'Could not read file header. The file might be corrupt or inaccessible.',
    };
  }

  const bytes = new Uint8Array(headerBuffer);
  let detectedType: 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf' | null = null;

  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    detectedType = 'image/jpeg';
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  else if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    detectedType = 'image/png';
  }
  // WebP: RIFF .... WEBP
  else if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    detectedType = 'image/webp';
  }
  // PDF: %PDF- (25 50 44 46 2D)
  else if (
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d
  ) {
    detectedType = 'application/pdf';
  }

  if (!detectedType) {
    // Check for HEIC / TIFF magic bytes to give helpful error message
    const isHeic =
      (bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) ||
      file.name.toLowerCase().endsWith('.heic');

    if (isHeic) {
      return {
        ok: false,
        errorCode: 'UNSUPPORTED_FORMAT',
        userMessage: 'Apple HEIC image format detected. Please select a JPG or PNG file, or change your iPhone Camera Settings: Formats → Most Compatible.',
      };
    }

    return {
      ok: false,
      errorCode: 'UNSUPPORTED_FORMAT',
      userMessage: 'Unsupported file format. Please upload a valid JPG, PNG, WebP photo, or PDF document.',
    };
  }

  if (detectedType === 'application/pdf') {
    return {
      ok: true,
      mimeType: 'application/pdf',
    };
  }

  // 3. Check image dimensions via createImageBitmap or Image element
  try {
    let width = 0;
    let height = 0;

    if (typeof createImageBitmap === 'function') {
      const bmp = await createImageBitmap(file);
      width = bmp.width;
      height = bmp.height;
      bmp.close();
    } else if (typeof window !== 'undefined') {
      const url = URL.createObjectURL(file);
      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          width = img.naturalWidth;
          height = img.naturalHeight;
          URL.revokeObjectURL(url);
          resolve();
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error('IMAGE_LOAD_ERROR'));
        };
        img.src = url;
      });
    }

    if (width > MAX_DIMENSION_PX || height > MAX_DIMENSION_PX) {
      return {
        ok: false,
        errorCode: 'DIMENSION_OVERFLOW',
        userMessage: `Image dimensions (${width} × ${height} px) exceed the safe limit (${MAX_DIMENSION_PX} × ${MAX_DIMENSION_PX} px).`,
      };
    }

    return {
      ok: true,
      mimeType: detectedType,
      width,
      height,
    };
  } catch {
    return {
      ok: false,
      errorCode: 'CORRUPT_FILE',
      userMessage: 'The image appears to be corrupted and could not be decoded.',
    };
  }
}
