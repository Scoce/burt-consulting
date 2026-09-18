'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Megaphone,
  LogOut,
} from 'lucide-react';
import { PortfolioGrowthMetrics, AppGrowthData } from '@/lib/growth-telemetry';

export default function GrowthHubDashboard() {
  const [metrics, setMetrics] = useState<PortfolioGrowthMetrics | null>(null);
  const [selectedApp, setSelectedApp] = useState<string>('bank-of-gaga');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTelemetry() {
      try {
        const res = await fetch('/api/admin/growth/metrics');
        if (res.ok) {
          const data = await res.json();
          setMetrics(data);
        }
      } catch (err) {
        console.error('Failed to load growth telemetry:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTelemetry();
  }, []);

  const activeApp: AppGrowthData | undefined = metrics?.apps.find(
    (a) => a.slug === selectedApp
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-sm">
                BC
              </div>
              <span className="font-bold text-base text-white tracking-tight">James Burt</span>
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-950/60 border border-teal-800/60 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Portfolio Growth Hub
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Telemetry
            </span>
            <Link
              href="/"
              className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-all"
            >
              Back to Site
            </Link>
            <button
              type="button"
              onClick={async () => {
                await fetch('/api/admin/logout', { method: 'POST' });
                window.location.href = '/admin/login';
              }}
              className="text-xs font-semibold text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3 h-3" /> Log Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Portfolio MRR</span>
              <DollarSign className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-3xl font-black text-white">
              ${((metrics?.totalMrrCents ?? 0) / 100).toFixed(0)}
              <span className="text-xs font-medium text-slate-400 ml-1">/mo</span>
            </div>
            <div className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Recurring subscriptions across portfolio
            </div>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Active Trials</span>
              <Activity className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {metrics?.totalActiveTrials ?? 0}
            </div>
            <div className="text-xs text-slate-400">
              In 14-day evaluation period
            </div>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Paid Subscribers</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {metrics?.totalPaidSubscribers ?? 0}
            </div>
            <div className="text-xs text-slate-400">
              Active accounts across all apps
            </div>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Avg Trial Conversion</span>
              <TrendingUp className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {metrics?.avgConversionRate ?? 0}%
            </div>
            <div className="text-xs text-emerald-400">
              Benchmark: Top quartile for SaaS
            </div>
          </div>
        </div>

        {/* App Selector Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          {metrics?.apps.map((app) => (
            <button
              key={app.slug}
              onClick={() => setSelectedApp(app.slug)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                selectedApp === app.slug
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Layers className="w-4 h-4" />
              {app.name}
              {app.slug === 'bank-of-gaga' && (
                <span className="text-[10px] uppercase font-extrabold bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded border border-orange-500/30">
                  Focus
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Selected App Detail Section */}
        {activeApp && (
          <div className="space-y-6">
            {/* App Overview Banner */}
            <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-white">{activeApp.name}</h2>
                  <a
                    href={`https://${activeApp.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-slate-400 hover:text-teal-400 flex items-center gap-1"
                  >
                    {activeApp.domain} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-sm text-slate-400">
                  {activeApp.slug === 'bank-of-gaga'
                    ? 'Family loan tracking, promissory note generator, and automated repayment reminders.'
                    : activeApp.slug === 'teach-weave'
                    ? 'Teacher curriculum marketplace and standards alignment platform.'
                    : 'Private music studio scheduling and uncompressed stereo WebRTC audio.'}
                </p>
              </div>

              {/* Quick Metrics */}
              <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">App MRR</div>
                  <div className="text-xl font-black text-white">
                    ${(activeApp.mrrCents / 100).toFixed(0)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">Active Trials</div>
                  <div className="text-xl font-black text-orange-400">{activeApp.activeTrials}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">Conversion %</div>
                  <div className="text-xl font-black text-emerald-400">
                    {activeApp.trialConversionRate}%
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Campaigns & Flywheel */}
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-teal-400" /> Active Marketing & Acquisition Channels
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live SEO magnets, Meta Advantage+ direct-response campaigns, and community flywheels.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeApp.campaigns.map((camp) => (
                  <div
                    key={camp.id}
                    className="bg-slate-950/60 border border-white/10 rounded-2xl p-5 space-y-3 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                          {camp.channel}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1.5">{camp.name}</h4>
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          camp.status === 'Active'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : camp.status === 'Ready to Launch'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {camp.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1">
                      <div>
                        <strong className="text-slate-400">Cohort:</strong> {camp.targetCohort}
                      </div>
                      <div>
                        <strong className="text-slate-400">Target KPI:</strong> {camp.primaryMetric}
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 bg-white/5 p-3 rounded-xl border border-white/5 leading-relaxed">
                      {camp.performanceNotes}
                    </p>

                    {camp.url && (
                      <a
                        href={camp.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-teal-300 hover:underline pt-1"
                      >
                        View Public Landing Page <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bank of Gaga Ad Playbook Reference Card */}
            {activeApp.slug === 'bank-of-gaga' && (
              <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-orange-400" /> Direct-Response Creative Angles
                    </h3>
                    <p className="text-xs text-slate-400">
                      Battle-tested copy frameworks from{' '}
                      <code className="text-orange-300 font-mono text-xs">
                        docs/marketing/bank-of-gaga-ad-playbook.md
                      </code>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-950/70 border border-white/10 rounded-2xl p-5 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase text-orange-400 bg-orange-950/60 border border-orange-800/60 px-2 py-0.5 rounded">
                      Angle 1.1 · Boomer Parents
                    </span>
                    <h4 className="font-bold text-white text-sm">
                      The Thanksgiving Table Dilemma
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      &ldquo;If you&apos;re thinking about lending your adult kid money for a house down payment... watch this before you write that check. Most loans don&apos;t fail from bad intent; they fail because nobody wants to talk about it.&rdquo;
                    </p>
                    <div className="text-[11px] text-teal-400 font-semibold">
                      Goal: Emotional relief & automated boundary setting.
                    </div>
                  </div>

                  <div className="bg-slate-950/70 border border-white/10 rounded-2xl p-5 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                      Angle 1.2 · Tax Compliance
                    </span>
                    <h4 className="font-bold text-white text-sm">
                      The IRS Gift Tax Trap (AFR Rules)
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      &ldquo;Did you know the IRS has a mandatory minimum interest rate you have to charge family? Learn how the $10,000 carve-out and statutory AFR rates keep your loan 100% audit-proof.&rdquo;
                    </p>
                    <div className="text-[11px] text-teal-400 font-semibold">
                      Goal: Drives traffic to /afr-calculator.
                    </div>
                  </div>

                  <div className="bg-slate-950/70 border border-white/10 rounded-2xl p-5 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                      Angle 2.1 · Adult Borrowers
                    </span>
                    <h4 className="font-bold text-white text-sm">
                      Don&apos;t Pay the Bank 7.5%
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      &ldquo;Why give commercial banks $100k in mortgage interest when it could stay in your family? Borrow from parents at 4.3% AFR with formal contracts and transparent tracking.&rdquo;
                    </p>
                    <div className="text-[11px] text-teal-400 font-semibold">
                      Goal: Financial empowerment & dignity.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
