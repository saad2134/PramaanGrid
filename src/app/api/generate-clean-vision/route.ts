import { NextRequest, NextResponse } from 'next/server';
import { generateCleanVision } from '@/lib/replicate';
import { checkRateLimit } from '@/lib/rate-limit';

const MAX_IMAGE_URL_LENGTH = 14 * 1024 * 1024; // 10MB if base64 data URI

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting Check (15 requests / min per IP)
    const rateLimit = checkRateLimit(request, 'generate-clean-vision', { limit: 15, windowMs: 60 * 1000 });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded for inpainting generation. Please wait.',
          retryAfterMs: Math.max(0, rateLimit.resetAt - Date.now()),
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(rateLimit.limit),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    const body = await request.json();
    const { imageUrl, prompt } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'imageUrl is required' },
        { status: 400 }
      );
    }

    if (typeof imageUrl === 'string' && imageUrl.length > MAX_IMAGE_URL_LENGTH) {
      return NextResponse.json(
        { success: false, error: 'Image payload exceeds maximum allowable size' },
        { status: 413 }
      );
    }

    const result = await generateCleanVision(imageUrl, prompt);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      {
        headers: {
          'X-RateLimit-Limit': String(rateLimit.limit),
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        },
      }
    );
  } catch (error) {
    console.error('Error in clean vision generation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate clean vision' },
      { status: 500 }
    );
  }
}
