import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { evaluateGpsMatch } from '@/lib/haversine';
import { verifyProofOfClearance } from '@/lib/gemini';
import { ClearanceProof, VerificationStatus } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      reportId,
      afterImageUrl,
      afterImageBase64,
      afterLat,
      afterLng,
      workerId = 'WRK-' + Math.floor(1000 + Math.random() * 9000),
      workerName = 'Field Operative',
      contractorName = 'Assigned Municipal Concessionaire',
      payoutAmountInr = 4500,
    } = body;

    if (!reportId) {
      return NextResponse.json(
        { success: false, error: 'reportId is required' },
        { status: 400 }
      );
    }

    const report = store.getReportById(reportId);
    if (!report) {
      return NextResponse.json(
        { success: false, error: `Report ${reportId} not found` },
        { status: 404 }
      );
    }

    const effectiveAfterImage = afterImageUrl || afterImageBase64;
    if (!effectiveAfterImage) {
      return NextResponse.json(
        { success: false, error: 'afterImageUrl or afterImageBase64 is required' },
        { status: 400 }
      );
    }

    // 1. Geodetic Audit (Haversine Formula)
    const submittedLat = Number(afterLat ?? report.lat);
    const submittedLng = Number(afterLng ?? report.lng);

    if (
      isNaN(submittedLat) ||
      isNaN(submittedLng) ||
      submittedLat < -90 ||
      submittedLat > 90 ||
      submittedLng < -180 ||
      submittedLng > 180
    ) {
      return NextResponse.json(
        { success: false, error: 'Invalid geographic coordinates provided' },
        { status: 400 }
      );
    }

    const gpsResult = evaluateGpsMatch(
      report.lat,
      report.lng,
      submittedLat,
      submittedLng
    );

    // 2. Multimodal VLM Forensic Audit (Gemini)
    const vlmResult = await verifyProofOfClearance(
      report.original_image_url,
      effectiveAfterImage,
      {
        category: report.category,
        lat: report.lat,
        lng: report.lng,
        reportId: report.id,
        isFraud: !gpsResult.isMatch,
      }
    );

    // 3. Synthesis & Fraud Decision Tree
    let status: VerificationStatus = 'VERIFIED';
    let isVerified = true;
    let reason = '';
    let payoutStatus: 'AUTHORIZED' | 'HELD_FRAUD' = 'AUTHORIZED';

    if (!gpsResult.isMatch && gpsResult.status === 'GPS_MISMATCH_FRAUD') {
      status = 'FRAUD_GPS_MISMATCH';
      isVerified = false;
      payoutStatus = 'HELD_FRAUD';
      reason = `FRAUD DETECTED [GPS MISMATCH]: Image was captured ${gpsResult.distanceMeters}m away from reported coordinates (exceeding 35m tolerance). Contractor submitted invalid location proof.`;
    } else if (!vlmResult.isClear || vlmResult.fraudAlert) {
      status = 'FRAUD_LANDMARK_MISMATCH';
      isVerified = false;
      payoutStatus = 'HELD_FRAUD';
      reason = `FRAUD DETECTED [VLM AUDIT]: ${vlmResult.explanation}`;
    } else {
      status = 'VERIFIED';
      isVerified = true;
      payoutStatus = 'AUTHORIZED';
      reason = `PROOF-OF-CLEARANCE VERIFIED: GPS matched within ${gpsResult.distanceMeters}m. ${vlmResult.explanation}`;
    }

    const finalLandmarks = isVerified
      ? vlmResult.landmarkMatches
      : vlmResult.landmarkMatches.map((lm) => ({ ...lm, matched: false }));

    // 4. Record Clearance Proof
    const proof: ClearanceProof = {
      id: `PRF-${Date.now().toString().slice(-6)}`,
      report_id: reportId,
      after_image_url: effectiveAfterImage,
      worker_id: workerId,
      worker_name: workerName,
      contractor_name: contractorName,
      lat: submittedLat,
      lng: submittedLng,
      photo_timestamp: new Date().toISOString(),
      gps_distance_meters: gpsResult.distanceMeters,
      is_verified: isVerified,
      verification_status: status,
      verification_reason: reason,
      vlm_confidence: vlmResult.vlmConfidence,
      landmark_matches: finalLandmarks,
      payout_status: payoutStatus,
      payout_amount_inr: payoutAmountInr,
      created_at: new Date().toISOString(),
    };

    store.addProof(proof);

    return NextResponse.json({
      success: true,
      data: {
        proof,
        report: store.getReportById(reportId),
        gpsResult,
        vlmResult,
      },
    });
  } catch (error) {
    console.error('Error verifying clearance proof:', error);
    return NextResponse.json(
      { success: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
}
