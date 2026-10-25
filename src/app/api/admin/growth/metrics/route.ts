import { NextResponse } from 'next/server';
import { getPortfolioGrowthMetrics } from '@/lib/growth-telemetry';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const metrics = await getPortfolioGrowthMetrics();
    return NextResponse.json(metrics, {
      headers: {
        'Cache-Control': 'private, max-age=30, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('[growth-metrics] Error fetching portfolio telemetry:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve growth metrics' },
      { status: 500 }
    );
  }
}
