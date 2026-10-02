import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  try {
    const metrics = store.getMetrics();
    const reports = store.getReports();

    // Calculate ward breakdown
    const wardMap: Record<string, { total: number; resolved: number; fraud: number }> = {};
    reports.forEach((r) => {
      const wardKey = r.ward || 'General';
      if (!wardMap[wardKey]) {
        wardMap[wardKey] = { total: 0, resolved: 0, fraud: 0 };
      }
      wardMap[wardKey].total += 1;
      if (r.status === 'RESOLVED') wardMap[wardKey].resolved += 1;
      if (r.status === 'FRAUD') wardMap[wardKey].fraud += 1;
    });

    return NextResponse.json({
      success: true,
      data: {
        metrics,
        wardPerformance: wardMap,
      },
    });
  } catch (error) {
    console.error('Error fetching civic stats:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
