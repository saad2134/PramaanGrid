import exifr from 'exifr';

export interface ExtractedExifData {
  hasGps: boolean;
  latitude?: number;
  longitude?: number;
  timestamp?: string;
  device?: string;
  raw?: Record<string, unknown>;
}

/**
 * Extracts GPS metadata, timestamp, and device info from image Buffer or File
 */
export async function extractExifFromBuffer(
  input: Buffer | Uint8Array | ArrayBuffer | Blob
): Promise<ExtractedExifData> {
  try {
    const data = await exifr.parse(input, {
      gps: true,
      tiff: true,
      exif: true,
    });

    if (!data) {
      return { hasGps: false };
    }

    const latitude = typeof data.latitude === 'number' ? data.latitude : undefined;
    const longitude = typeof data.longitude === 'number' ? data.longitude : undefined;
    const timestamp = data.DateTimeOriginal || data.CreateDate || data.ModifyDate;
    const device = [data.Make, data.Model].filter(Boolean).join(' ');

    return {
      hasGps: latitude !== undefined && longitude !== undefined,
      latitude,
      longitude,
      timestamp: timestamp ? new Date(timestamp).toISOString() : undefined,
      device: device || undefined,
      raw: data,
    };
  } catch (error) {
    console.warn('Failed to parse EXIF data:', error);
    return { hasGps: false };
  }
}
