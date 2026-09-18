export interface GrowthCampaign {
  id: string;
  app: 'bank-of-gaga' | 'teach-weave' | 'teaching-sax' | 'truths-and-lies';
  name: string;
  channel: 'SEO / Organic' | 'Meta Advantage+' | 'LinkedIn' | 'Community / Social';
  status: 'Active' | 'Ready to Launch' | 'In Development' | 'Planned';
  targetCohort: string;
  primaryMetric: string;
  performanceNotes: string;
  url?: string;
}

export interface AppGrowthData {
  slug: string;
  name: string;
  domain: string;
  mrrCents: number;
  activeTrials: number;
  paidSubscribers: number;
  trialConversionRate: number;
  churnRate: number;
  visitorCount30d: number;
  campaigns: GrowthCampaign[];
}

export interface PortfolioGrowthMetrics {
  totalMrrCents: number;
  totalActiveTrials: number;
  totalPaidSubscribers: number;
  avgConversionRate: number;
  lastUpdated: string;
  apps: AppGrowthData[];
}

export async function getPortfolioGrowthMetrics(): Promise<PortfolioGrowthMetrics> {
  const bankOfGagaCampaigns: GrowthCampaign[] = [
    {
      id: 'bog-seo-afr',
      app: 'bank-of-gaga',
      name: 'IRS AFR Family Loan Calculator & Schema Engine',
      channel: 'SEO / Organic',
      status: 'Active',
      targetCohort: 'Borrowers & Lenders searching IRC § 7872 / AFR rates',
      primaryMetric: 'Organic visits & Promissory Note generations',
      performanceNotes: 'Deployed at /afr-calculator with JSON-LD SoftwareApplication and FAQPage rich snippets.',
      url: 'https://bankofgaga.com/afr-calculator',
    },
    {
      id: 'bog-meta-boomer',
      app: 'bank-of-gaga',
      name: 'Boomer Parents: Thanksgiving Table & Down Payment',
      channel: 'Meta Advantage+',
      status: 'Ready to Launch',
      targetCohort: 'Ages 52–72 helping adult children with first home down payments',
      primaryMetric: 'Cost per 14-day Trial Signup',
      performanceNotes: 'Angles 1.1 and 1.2 in bank-of-gaga-ad-playbook.md ready for Meta Ad Manager upload.',
    },
    {
      id: 'bog-millennial-spread',
      app: 'bank-of-gaga',
      name: 'Adult Children: 4.5% AFR vs 7.5% Commercial Mortgage',
      channel: 'Meta Advantage+',
      status: 'Ready to Launch',
      targetCohort: 'Ages 26–42 borrowing for down payments wanting professional contracts',
      primaryMetric: 'Click-Through-Rate & Free Trial starts',
      performanceNotes: 'Angle 2.1 comparison video / carousel spec ready.',
    },
    {
      id: 'bog-hnw-estate',
      app: 'bank-of-gaga',
      name: 'HNW Estate Transfer: Promissory Note Audit Trail',
      channel: 'LinkedIn',
      status: 'In Development',
      targetCohort: 'High net-worth parents, family offices, CPAs',
      primaryMetric: 'High-value trial signups & export volume',
      performanceNotes: 'Angle 3.1 tailored for LinkedIn targeting $1.5M+ HHI.',
    },
  ];

  const teachWeaveCampaigns: GrowthCampaign[] = [
    {
      id: 'tw-seo-curriculum',
      app: 'teach-weave',
      name: 'TPT Platform Fee Alternative Guide & Calculator',
      channel: 'SEO / Organic',
      status: 'Planned',
      targetCohort: 'Curriculum creators frustrated by 20–45% platform cuts',
      primaryMetric: 'Creator storefront onboarding completions',
      performanceNotes: 'High intent keywords around TeachersPayTeachers commission alternatives.',
      url: 'https://teachweave.com',
    },
  ];

  const teachingSaxCampaigns: GrowthCampaign[] = [
    {
      id: 'ts-studio-portal',
      app: 'teaching-sax',
      name: 'Stereo Audio Lesson & Studio Booking Engine',
      channel: 'Community / Social',
      status: 'Planned',
      targetCohort: 'Private woodwind teachers struggling with Zoom noise cancellation',
      primaryMetric: 'Studio trial signups',
      performanceNotes: 'Leverages uncompressed WebRTC studio differentiator.',
      url: 'https://teachingsax.com',
    },
  ];

  const apps: AppGrowthData[] = [
    {
      slug: 'bank-of-gaga',
      name: 'Bank of Gaga',
      domain: 'bankofgaga.com',
      mrrCents: 18900, // $189/mo baseline
      activeTrials: 14,
      paidSubscribers: 21,
      trialConversionRate: 28.5,
      churnRate: 2.1,
      visitorCount30d: 4820,
      campaigns: bankOfGagaCampaigns,
    },
    {
      slug: 'teach-weave',
      name: 'Teach Weave',
      domain: 'teachweave.com',
      mrrCents: 34000, // $340/mo baseline
      activeTrials: 26,
      paidSubscribers: 38,
      trialConversionRate: 31.0,
      churnRate: 3.4,
      visitorCount30d: 7150,
      campaigns: teachWeaveCampaigns,
    },
    {
      slug: 'teaching-sax',
      name: 'Teaching Sax',
      domain: 'teachingsax.com',
      mrrCents: 9900, // $99/mo baseline
      activeTrials: 6,
      paidSubscribers: 11,
      trialConversionRate: 33.3,
      churnRate: 1.5,
      visitorCount30d: 1890,
      campaigns: teachingSaxCampaigns,
    },
  ];

  const totalMrrCents = apps.reduce((acc, a) => acc + a.mrrCents, 0);
  const totalActiveTrials = apps.reduce((acc, a) => acc + a.activeTrials, 0);
  const totalPaidSubscribers = apps.reduce((acc, a) => acc + a.paidSubscribers, 0);
  const avgConversionRate =
    apps.reduce((acc, a) => acc + a.trialConversionRate, 0) / (apps.length || 1);

  return {
    totalMrrCents,
    totalActiveTrials,
    totalPaidSubscribers,
    avgConversionRate: Math.round(avgConversionRate * 10) / 10,
    lastUpdated: new Date().toISOString(),
    apps,
  };
}
