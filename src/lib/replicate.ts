import Replicate from 'replicate';

const apiToken = process.env.REPLICATE_API_TOKEN || '';

const replicate = apiToken ? new Replicate({ auth: apiToken }) : null;

/**
 * Generates the "Vision of Tomorrow" clean street visualization
 * Uses FLUX.1 Fill [dev] or SD inpainting to remove the waste pile while
 * preserving buildings, trees, road contours, and lighting.
 */
export async function generateCleanVision(
  imageUrl: string,
  prompt: string = 'clean modern street pavement in India, pristine asphalt, planted flowering shrubs, swept clean sidewalk, beautiful sunny day, zero garbage, zero plastic, photorealistic 8k'
): Promise<{
  cleanImageUrl: string;
  isSimulated: boolean;
  promptUsed: string;
}> {
  if (!replicate || (process.env.DEMO_MODE === 'true' && !apiToken)) {
    return {
      cleanImageUrl: getSimulatedCleanImageUrl(imageUrl),
      isSimulated: true,
      promptUsed: prompt,
    };
  }

  try {
    // Calling FLUX.1 Fill [dev] on Replicate
    const output = (await replicate.run(
      'black-forest-labs/flux-fill-dev',
      {
        input: {
          image: imageUrl,
          prompt: prompt,
          guidance: 30,
          steps: 28,
          output_format: 'webp',
          output_quality: 90,
        },
      }
    )) as unknown;

    let resultUrl = '';
    if (Array.isArray(output) && output.length > 0) {
      resultUrl = String(output[0]);
    } else if (typeof output === 'string') {
      resultUrl = output;
    } else if (output && typeof (output as { url: () => string }).url === 'function') {
      resultUrl = (output as { url: () => string }).url();
    } else {
      resultUrl = String(output);
    }

    return {
      cleanImageUrl: resultUrl,
      isSimulated: false,
      promptUsed: prompt,
    };
  } catch (error) {
    console.error('Replicate inpainting error:', error);
    return {
      cleanImageUrl: getSimulatedCleanImageUrl(imageUrl),
      isSimulated: true,
      promptUsed: prompt,
    };
  }
}

/**
 * Returns clean reference images for demo mode or offline showcase
 */
function getSimulatedCleanImageUrl(beforeImageUrl: string): string {
  // If the before image matches one of our demo seeds, return its paired clean version
  if (beforeImageUrl.includes('dump1') || beforeImageUrl.includes('blackspot')) {
    return 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1000&q=80';
  }
  if (beforeImageUrl.includes('drain') || beforeImageUrl.includes('culvert')) {
    return 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80';
  }
  // High quality clean Indian street / urban pathway imagery
  return 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80';
}
