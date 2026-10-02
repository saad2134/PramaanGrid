import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { analyzeCivicIssue } from '@/lib/gemini';
import { generateCleanVision } from '@/lib/replicate';
import { Report, ReportCategory } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const city = searchParams.get('city');

    let reports = store.getReports();

    if (status && status !== 'ALL') {
      reports = reports.filter((r) => r.status === status);
    }
    if (category && category !== 'ALL') {
      reports = reports.filter((r) => r.category === category);
    }
    if (city && city !== 'ALL') {
      reports = reports.filter((r) => r.city.toLowerCase() === city.toLowerCase());
    }

    const metrics = store.getMetrics();

    return NextResponse.json({
      success: true,
      data: reports,
      metrics,
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      imageUrl,
      imageBase64,
      lat = 17.385,
      lng = 78.4867,
      address = 'Reported Location',
      ward = 'Ward 1',
      city = 'Hyderabad',
      notes = '',
      phone = '919800000000',
    } = body;

    const effectiveImage = imageUrl || imageBase64;
    if (!effectiveImage) {
      return NextResponse.json(
        { success: false, error: 'Image is required' },
        { status: 400 }
      );
    }

    // 1. Run Gemini multimodal triage & troll filter
    const triage = await analyzeCivicIssue(
      imageBase64 || effectiveImage,
      'image/jpeg',
      notes
    );

    // If flagged by troll filter, reject immediately
    if (!triage.is_civic_issue || !triage.troll_filter_passed) {
      return NextResponse.json({
        success: false,
        isTroll: true,
        message: triage.reasoning,
        triage,
      });
    }

    // 2. Run Replicate FLUX.1 Fill clean vision generation
    const cleanVision = await generateCleanVision(effectiveImage);

    // 3. Assemble and save report
    const newReport: Report = {
      id: `REP-${city.slice(0, 3).toUpperCase()}-${String(
        Math.floor(Math.random() * 900) + 100
      )}`,
      phone_hash: phone.slice(0, 6) + '*****',
      original_image_url: effectiveImage,
      ai_clean_image_url: cleanVision.cleanImageUrl,
      lat: Number(lat),
      lng: Number(lng),
      address,
      ward,
      city,
      category: triage.category as ReportCategory,
      severity: triage.severity,
      status: 'PENDING',
      description: notes || triage.reasoning,
      created_at: new Date().toISOString(),
      ai_triage: triage,
    };

    store.addReport(newReport);

    return NextResponse.json({
      success: true,
      data: newReport,
      message: 'Report successfully created and verified by AI.',
    });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process report' },
      { status: 500 }
    );
  }
}
