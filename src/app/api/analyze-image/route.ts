import { NextRequest, NextResponse } from 'next/server';
import { analyzeCivicIssue } from '@/lib/gemini';
import { checkRateLimit } from '@/lib/rate-limit';

// Maximum base64 payload size: ~10 MB
const MAX_BASE64_LENGTH = 14 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting Check (20 requests / min per IP)
    const rateLimit = checkRateLimit(request, 'analyze-image', { limit: 20, windowMs: 60 * 1000 });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please wait before submitting more images.',
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
    const { imageBase64, mimeType = 'image/jpeg', notes = '' } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { success: false, error: 'imageBase64 is required' },
        { status: 400 }
      );
    }

    // 2. Payload Size Validation Guard
    if (typeof imageBase64 === 'string' && imageBase64.length > MAX_BASE64_LENGTH) {
      return NextResponse.json(
        { success: false, error: 'Image payload exceeds 10MB maximum limit' },
        { status: 413 }
      );
    }

    const triage = await analyzeCivicIssue(imageBase64, mimeType, notes);

    return NextResponse.json(
      {
        success: true,
        data: triage,
      },
      {
        headers: {
          'X-RateLimit-Limit': String(rateLimit.limit),
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        },
      }
    );
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
