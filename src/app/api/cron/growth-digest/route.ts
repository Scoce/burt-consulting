import { NextResponse } from 'next/server';
import { getPortfolioGrowthMetrics } from '@/lib/growth-telemetry';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Defensive authorization check for production cron jobs
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const metrics = await getPortfolioGrowthMetrics();

    // Find top-performing blog content across BankOfGaga
    const bog = metrics.apps.find((a) => a.slug === 'bank-of-gaga');
    const topBlogPosts = (bog?.blogAttribution || [])
      .slice()
      .sort((a, b) => b.ctaClicks - a.ctaClicks)
      .slice(0, 5)
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        ctaClicks: p.ctaClicks,
        trialSignups: p.trialSignups,
        conversionRate: `${p.conversionRate}%`,
      }));

    const digest = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalMrrUsd: (metrics.totalMrrCents / 100).toFixed(2),
        totalActiveTrials: metrics.totalActiveTrials,
        totalPaidSubscribers: metrics.totalPaidSubscribers,
        avgConversionRate: `${metrics.avgConversionRate}%`,
        isStripeLive: metrics.isStripeLive,
      },
      apps: metrics.apps.map((app) => ({
        name: app.name,
        mrrUsd: (app.mrrCents / 100).toFixed(2),
        activeTrials: app.activeTrials,
        paidSubscribers: app.paidSubscribers,
        visitorCount30d: app.visitorCount30d,
        activeCampaigns: app.campaigns.filter((c) => c.status === 'Active').length,
      })),
      topConvertingContent: topBlogPosts,
      status: 'healthy',
    };

    return NextResponse.json({
      success: true,
      digest,
    });
  } catch (error) {
    console.error('[cron/growth-digest] Failed to generate digest:', error);
    return NextResponse.json(
      { error: 'Internal server error generating growth digest' },
      { status: 500 }
    );
  }
}
