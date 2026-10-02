import { NextRequest, NextResponse } from 'next/server';
import { analyzeCivicIssue } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageBase64, mimeType = 'image/jpeg', notes = '' } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { success: false, error: 'imageBase64 is required' },
        { status: 400 }
      );
    }

    const triage = await analyzeCivicIssue(imageBase64, mimeType, notes);

    return NextResponse.json({
      success: true,
      data: triage,
    });
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
