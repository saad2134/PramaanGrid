import { NextRequest, NextResponse } from 'next/server';
import { generateCleanVision } from '@/lib/replicate';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, prompt } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'imageUrl is required' },
        { status: 400 }
      );
    }

    const result = await generateCleanVision(imageUrl, prompt);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error in clean vision generation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate clean vision' },
      { status: 500 }
    );
  }
}
