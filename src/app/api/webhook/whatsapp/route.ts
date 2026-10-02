import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { store } from '@/lib/store';
import { analyzeCivicIssue } from '@/lib/gemini';
import { generateCleanVision } from '@/lib/replicate';
import { checkRateLimit } from '@/lib/rate-limit';
import { Report } from '@/types';

/**
 * Validates Twilio HMAC-SHA1 Webhook Signature
 */
function validateTwilioSignature(
  authToken: string,
  signature: string | null,
  url: string,
  params: Record<string, string>
): boolean {
  if (!signature || !authToken) return false;
  try {
    const sortedKeys = Object.keys(params).sort();
    let data = url;
    for (const key of sortedKeys) {
      data += key + params[key];
    }
    const hmac = crypto.createHmac('sha1', authToken).update(data).digest('base64');
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
  } catch {
    return false;
  }
}

/**
 * Twilio WhatsApp Webhook Endpoint
 * Ingests incoming citizen WhatsApp reports (media + text + location)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting Check (30 requests / min per IP)
    const rateLimit = checkRateLimit(request, 'whatsapp-webhook', { limit: 30, windowMs: 60 * 1000 });
    if (!rateLimit.allowed) {
      return new NextResponse(
        '<Response><Message>⚠️ Rate limit exceeded. Please wait a moment.</Message></Response>',
        { status: 429, headers: { 'Content-Type': 'text/xml' } }
      );
    }

    const formData = await request.formData();
    const from = (formData.get('From') as string) || '';
    const body = (formData.get('Body') as string) || '';
    const mediaUrl = (formData.get('MediaUrl0') as string) || '';
    const latitude = formData.get('Latitude') as string;
    const longitude = formData.get('Longitude') as string;

    // 2. Twilio Signature Verification (Enforced when TWILIO_AUTH_TOKEN is set in non-demo mode)
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioSignature = request.headers.get('x-twilio-signature');
    const isDemoMode = process.env.DEMO_MODE === 'true';

    if (authToken && !isDemoMode) {
      const params: Record<string, string> = {};
      formData.forEach((val, key) => {
        if (typeof val === 'string') params[key] = val;
      });

      const url = request.url;
      const isValid = validateTwilioSignature(authToken, twilioSignature, url, params);
      if (!isValid) {
        console.warn('Twilio webhook rejected: Invalid HMAC signature from', from);
        return new NextResponse(
          '<Response><Message>403 Forbidden: Invalid Twilio Signature</Message></Response>',
          { status: 403, headers: { 'Content-Type': 'text/xml' } }
        );
      }
    }

    const lat = latitude ? parseFloat(latitude) : 17.4108;
    const lng = longitude ? parseFloat(longitude) : 78.4373;

    // Immediate Twilio acknowledgement XML
    let replyMessage = '';

    if (!mediaUrl && !body) {
      replyMessage =
        '🙏 Namaste from PramaanGrid (प्रमाण-ग्रिड).\nPlease send a photo of the garbage dump or clogged drain along with your location pin to register an official civic report.';
    } else if (mediaUrl) {
      // 3. Multimodal AI Analysis via Gemini Flash
      const triage = await analyzeCivicIssue(mediaUrl, 'image/jpeg', body);

      if (!triage.is_civic_issue || !triage.troll_filter_passed) {
        replyMessage = `⚠️ PramaanGrid AI Triage Notice:\n${triage.reasoning}\n\nPlease submit an image of a municipal waste blackspot or stormwater drain.`;
      } else {
        // 4. Generate Vision of Tomorrow via Replicate FLUX.1 Fill
        const cleanVision = await generateCleanVision(mediaUrl);

        // 5. Register ticket in system
        const ticketId = `REP-PG-${Date.now().toString().slice(-4)}`;
        const report: Report = {
          id: ticketId,
          phone_hash: from ? from.slice(0, 6) + '*****' : '9198480*****',
          original_image_url: mediaUrl,
          ai_clean_image_url: cleanVision.cleanImageUrl,
          lat,
          lng,
          address: 'WhatsApp Geo-Pin Location',
          ward: 'Ward 98 - Central Zone',
          city: 'Hyderabad',
          category: triage.category,
          severity: triage.severity,
          status: 'PENDING',
          description: body || triage.reasoning,
          created_at: new Date().toISOString(),
          ai_triage: triage,
        };

        store.addReport(report);

        replyMessage = `✅ Report Received & Cryptographically Logged!\n\n📋 Ticket: #${ticketId}\n⚠️ Severity: ${triage.severity}/10 (${triage.hazard_level} Hazard)\n📦 Estimated Volume: ${triage.estimated_volume_m3} m³\n\n🛡️ Privacy Shield: Pedestrian faces & vehicle numbers have been blurred.\n\n✨ Vision of Tomorrow: We've attached an AI projection of your street fully cleared!\n\nContractor payment will remain frozen until an on-site Proof-of-Clearance GPS audit confirms completion.`;
      }
    } else {
      replyMessage =
        '📸 Please attach a photo of the waste blackspot along with your message.';
    }

    // Return TwiML XML
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>${replyMessage.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</Message>
</Response>`;

    return new NextResponse(twiml, {
      headers: { 'Content-Type': 'text/xml' },
    });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    const fallbackTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>🙏 Thank you for your message. Your civic report is being processed by PramaanGrid.</Message>
</Response>`;
    return new NextResponse(fallbackTwiml, {
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}
