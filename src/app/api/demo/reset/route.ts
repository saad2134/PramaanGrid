import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST() {
  try {
    store.resetToDefault();
    return NextResponse.json({
      success: true,
      message: 'Demo dataset reset to initial state.',
      metrics: store.getMetrics(),
    });
  } catch (error) {
    console.error('Error resetting demo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset demo' },
      { status: 500 }
    );
  }
}
