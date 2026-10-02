import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase';
import { store } from '@/lib/store';

const startTime = Date.now();

export async function GET() {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const metrics = store.getMetrics();

  return NextResponse.json(
    {
      status: 'healthy',
      service: 'PramaanGrid Municipal Civic Trust Protocol',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptimeSeconds,
      environment: process.env.NODE_ENV || 'development',
      demoMode: process.env.DEMO_MODE === 'true',
      checks: {
        store: 'operational',
        supabase: isSupabaseConfigured ? 'connected' : 'in-memory-fallback',
        geminiAi: Boolean(process.env.GEMINI_API_KEY) ? 'configured' : 'demo-simulation',
        replicateAi: Boolean(process.env.REPLICATE_API_TOKEN) ? 'configured' : 'demo-simulation',
        cartoBasemaps: Boolean(process.env.NEXT_PUBLIC_CARTO_API_KEY) ? 'configured' : 'demo-fallback',
      },
      stats: {
        totalReports: metrics.total_reports,
        resolvedReports: metrics.resolved_count,
        fraudIntercepted: metrics.fraud_blocked_count,
        taxpayerFundsProtectedInr: metrics.taxpayer_money_saved_inr,
      },
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
