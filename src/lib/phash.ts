import sharp from 'sharp';

/**
 * Computes a 64-bit Difference Hash (dHash) for an image Buffer or Base64 string.
 * dHash scales the image to 9x8 grayscale and tracks brightness gradients.
 * Resilient against resizing, JPEG recompression, and color filtering.
 */
export async function computePerceptualHash(imageInput: string | Buffer): Promise<string> {
  try {
    let buffer: Buffer;

    if (Buffer.isBuffer(imageInput)) {
      buffer = imageInput;
    } else if (typeof imageInput === 'string') {
      const cleanBase64 = imageInput.replace(/^data:image\/\w+;base64,/, '');
      buffer = Buffer.from(cleanBase64, 'base64');
    } else {
      return '';
    }

    // Resize to 9 columns x 8 rows in grayscale
    const { data } = await sharp(buffer)
      .resize(9, 8, { fit: 'fill' })
      .grayscale()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let hash = '';
    // 8 rows of 8 comparisons = 64 bits
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const left = data[row * 9 + col];
        const right = data[row * 9 + col + 1];
        hash += left > right ? '1' : '0';
      }
    }

    return hash;
  } catch (error) {
    console.warn('Perceptual hash computation failed, falling back to checksum:', error);
    // Simple fallback hash if image decoding fails
    return fallbackHash(imageInput);
  }
}

/**
 * Computes the Hamming distance between two 64-bit binary hashes.
 * Returns the count of differing bits (0 to 64).
 */
export function calculateHammingDistance(hashA: string, hashB: string): number {
  if (!hashA || !hashB || hashA.length !== hashB.length) {
    return 64; // Maximum distance if invalid
  }

  let distance = 0;
  for (let i = 0; i < hashA.length; i++) {
    if (hashA[i] !== hashB[i]) {
      distance++;
    }
  }
  return distance;
}

/**
 * Evaluates whether two images are suspicious duplicates.
 * Thresholds:
 * - Distance <= 5: Near-duplicate / recycled photo
 * - Distance <= 10: Highly similar composition
 * - Distance > 10: Distinct images
 */
export function isDuplicateImage(
  hashA: string,
  hashB: string,
  threshold: number = 5
): { isDuplicate: boolean; distance: number; similarityPercent: number } {
  const distance = calculateHammingDistance(hashA, hashB);
  const similarityPercent = Math.round(((64 - distance) / 64) * 100);

  return {
    isDuplicate: distance <= threshold,
    distance,
    similarityPercent,
  };
}

function fallbackHash(input: string | Buffer): string {
  const str = Buffer.isBuffer(input) ? input.toString('base64', 0, 1000) : input.slice(0, 1000);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(2).padStart(64, '0').slice(0, 64);
}
