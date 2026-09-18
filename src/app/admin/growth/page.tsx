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
  Plus,
  Copy,
  Check,
  X,
  FileCheck,
  Send,
  AlertCircle,
  FileText,
  MessageSquare,
  Eye,
  Sliders,
  Share2,
} from 'lucide-react';
import { PortfolioGrowthMetrics, AppGrowthData, CreativeAngle } from '@/lib/growth-telemetry';
import { StagedArticle } from '@/lib/growth-content';
import { CommunityThread } from '@/lib/community-listener';
import VisualCardGenerator from '@/components/growth/visual-card-generator';

export default function GrowthHubDashboard() {
  const [metrics, setMetrics] = useState<PortfolioGrowthMetrics | null>(null);
  const [selectedApp, setSelectedApp] = useState<string>('bank-of-gaga');
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'creative' | 'community'>('overview');
  const [loading, setLoading] = useState(true);

  // Modals & Interactive Angle State
  const [inspectingAngle, setInspectingAngle] = useState<CreativeAngle | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // New Angle Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCohort, setNewCohort] = useState('Boomer Parents & Grandparents');
  const [newFormat, setNewFormat] = useState('UGC Video Reel & 3-Frame Carousel');
  const [newHook, setNewHook] = useState('');
  const [newScript, setNewScript] = useState('');
  const [newHeadline, setNewHeadline] = useState('');
  const [newCta, setNewCta] = useState('Open Your Family Bank (14-Day Free Trial)');
  const [newVisualSpecs, setNewVisualSpecs] = useState('');

  // SEO Content Flywheel State (Module B)
  const [articles, setArticles] = useState<StagedArticle[]>([]);
  const [inspectingArticle, setInspectingArticle] = useState<StagedArticle | null>(null);
  const [contentLoadingId, setContentLoadingId] = useState<string | null>(null);
  const [contentFeedback, setContentFeedback] = useState<string | null>(null);

  // Community Intent Listener State (Module D)
  const [threads, setThreads] = useState<CommunityThread[]>([]);
  const [threadLoadingId, setThreadLoadingId] = useState<string | null>(null);

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

  async function fetchContent() {
    try {
      const res = await fetch(`/api/admin/growth/content?app=${selectedApp}`);
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles || []);
      }
    } catch (err) {
      console.error('Failed to load staged content:', err);
    }
  }

  async function fetchCommunity() {
    try {
      const res = await fetch(`/api/admin/growth/community?app=${selectedApp}`);
      if (res.ok) {
        const data = await res.json();
        setThreads(data.threads || []);
      }
    } catch (err) {
      console.error('Failed to load community threads:', err);
    }
  }

  useEffect(() => {
    fetchTelemetry();
  }, []);

  useEffect(() => {
    fetchContent();
    fetchCommunity();
  }, [selectedApp]);

  const activeApp: AppGrowthData | undefined = metrics?.apps.find(
    (a) => a.slug === selectedApp
  );

  // --- Angles Handler (Module C) ---
  async function handleValidateAngle(angleId: string) {
    setActionLoadingId(angleId);
    try {
      const res = await fetch('/api/admin/growth/angles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'validate', id: angleId }),
      });
      if (res.ok) {
        await fetchTelemetry();
        if (inspectingAngle?.id === angleId) {
          const updatedRes = await fetch(`/api/admin/growth/angles?app=${selectedApp}`);
          const data = await updatedRes.json();
          const fresh = data.angles.find((a: CreativeAngle) => a.id === angleId);
          if (fresh) setInspectingAngle(fresh);
        }
      }
    } catch (err) {
      console.error('Validation error:', err);
    } finally {
      setActionLoadingId(null);
    }
  }

  async function handlePublishAngle(angleId: string) {
    setActionLoadingId(angleId);
    try {
      const res = await fetch('/api/admin/growth/angles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish', id: angleId }),
      });
      if (res.ok) {
        await fetchTelemetry();
        if (inspectingAngle?.id === angleId) {
          const updatedRes = await fetch(`/api/admin/growth/angles?app=${selectedApp}`);
          const data = await updatedRes.json();
          const fresh = data.angles.find((a: CreativeAngle) => a.id === angleId);
          if (fresh) setInspectingAngle(fresh);
        }
      }
    } catch (err) {
      console.error('Publish error:', err);
    } finally {
      setActionLoadingId(null);
    }
  }

  async function handleCreateAngle(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newHook.trim() || !newScript.trim()) return;

    setActionLoadingId('creating');
    try {
      const res = await fetch('/api/admin/growth/angles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          app: selectedApp,
          title: newTitle.trim(),
          cohort: newCohort,
          format: newFormat,
          hook3s: newHook.trim(),
          bodyScript: newScript.trim(),
          headline: newHeadline.trim(),
          cta: newCta.trim(),
          visualSpecs: newVisualSpecs.trim(),
        }),
      });

      if (res.ok) {
        setIsCreateModalOpen(false);
        setNewTitle('');
        setNewHook('');
        setNewScript('');
        setNewHeadline('');
        setNewVisualSpecs('');
        await fetchTelemetry();
      }
    } catch (err) {
      console.error('Create angle error:', err);
    } finally {
      setActionLoadingId(null);
    }
  }

  // --- Content Handlers (Module B) ---
  async function handleValidateContent(slug: string) {
    setContentLoadingId(slug);
    try {
      const res = await fetch('/api/admin/growth/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'validate', slug }),
      });
      if (res.ok) {
        const data = await res.json();
        await fetchContent();
        if (inspectingArticle?.slug === slug && data.article) {
          setInspectingArticle(data.article);
        }
        setContentFeedback(`Validated "${slug}" successfully.`);
        setTimeout(() => setContentFeedback(null), 3000);
      }
    } catch (err) {
      console.error('Article validation error:', err);
    } finally {
      setContentLoadingId(null);
    }
  }

  async function handlePublishContent(slug: string) {
    setContentLoadingId(slug);
    try {
      const res = await fetch('/api/admin/growth/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish', slug }),
      });
      if (res.ok) {
        const data = await res.json();
        await fetchContent();
        if (inspectingArticle?.slug === slug && data.article) {
          setInspectingArticle(data.article);
        }
        setContentFeedback(
          data.pathWritten
            ? `Published directly to ${data.pathWritten}!`
            : `Article marked as Published in repository queue.`
        );
        setTimeout(() => setContentFeedback(null), 4000);
      }
    } catch (err) {
      console.error('Article publish error:', err);
    } finally {
      setContentLoadingId(null);
    }
  }

  // --- Community Handlers (Module D) ---
  async function handleThreadStatus(id: string, status: 'Fresh' | 'Drafted' | 'Engaged') {
    setThreadLoadingId(id);
    try {
      const res = await fetch('/api/admin/growth/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', id, status }),
      });
      if (res.ok) {
        await fetchCommunity();
      }
    } catch (err) {
      console.error('Thread status error:', err);
    } finally {
      setThreadLoadingId(null);
    }
  }

  function copyToClipboard(text: string, fieldId: string) {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Bar Header */}
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
            {metrics?.isStripeLive ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-2.5 py-1 rounded-full font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Stripe Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/50 border border-amber-800/60 px-2.5 py-1 rounded-full font-medium">
                Demo Baseline
              </span>
            )}

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
        {/* Real Live Stripe Banner */}
        {metrics?.isStripeLive && (
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                ✓
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Live Stripe Integration Active</h4>
                <p className="text-xs text-emerald-300/80">
                  Real-time telemetry from Stripe live product: <strong>{activeApp?.stripeProductName || 'BankOfGaga — The Gaga Plan'}</strong>.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-900/60 px-3 py-1 rounded-lg border border-emerald-700/50">
              Live API
            </span>
          </div>
        )}

        {/* Global Feedback Banner */}
        {contentFeedback && (
          <div className="bg-teal-950/60 border border-teal-500/40 rounded-2xl p-3.5 px-4 text-xs font-bold text-teal-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            {contentFeedback}
          </div>
        )}

        {/* Real KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Active Paid Subscriptions</span>
              <Users className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {metrics?.totalPaidSubscribers ?? 0}
            </div>
            <div className="text-xs text-slate-400">
              Live paying customers via Stripe
            </div>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Live Monthly MRR</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">
              ${((metrics?.totalMrrCents ?? 0) / 100).toFixed(0)}
              <span className="text-xs font-medium text-slate-400 ml-1">/mo</span>
            </div>
            <div className="text-xs text-slate-400">
              Gross recurring subscription revenue
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
              Accounts in 14-day evaluation
            </div>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Conversion Rate</span>
              <TrendingUp className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {metrics?.avgConversionRate ?? 0}%
            </div>
            <div className="text-xs text-slate-400">
              Trial-to-paid activation benchmark
            </div>
          </div>
        </div>

        {/* Portfolio App Switcher */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
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
                    Live Focus
                  </span>
                )}
              </button>
            ))}
          </div>

          <a
            href={activeApp?.domain ? `https://${activeApp.domain}` : '#'}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-slate-400 hover:text-teal-300 transition-colors flex items-center gap-1.5"
          >
            Visit {activeApp?.name} <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4 Architectural Growth Modules (Sub-Navigation Tabs) */}
        <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-1.5 flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Funnels & Acquisition</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'content'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>SEO & Blog Flywheel</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
              {articles.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('creative')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'creative'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Ad Creative Engine</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
              {activeApp?.angles.length || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('community')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'community'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Community Intent</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
              {threads.length}
            </span>
          </button>
        </div>

        {/* TAB 1: FUNNELS & OVERVIEW (Module A) */}
        {activeTab === 'overview' && activeApp && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-orange-400" /> Live Acquisition Magnets & Campaigns
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live SEO interactive tools, calculators, and direct-response campaign allocations.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeApp.campaigns.map((camp) => (
                  <div
                    key={camp.id}
                    className="bg-slate-950/60 border border-white/10 rounded-2xl p-5 space-y-3"
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
          </div>
        )}

        {/* TAB 2: SEO CONTENT FLYWHEEL (Module B) */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-400" /> Module B: High-Intent SEO Staging & Publishing
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Stage, validate SEO criteria (word count, keywords, calculator links), and publish directly to Bank of Gaga repository.
                  </p>
                </div>
                <div className="text-xs text-slate-400 font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  Target Dir: <span className="text-teal-300">loan-portal/content/blog/</span>
                </div>
              </div>

              {articles.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm bg-slate-950/50 rounded-2xl border border-white/5">
                  No staged articles found for this app yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {articles.map((art) => (
                    <div
                      key={art.slug}
                      className="bg-slate-950/70 border border-white/10 rounded-2xl p-5 space-y-4 hover:border-teal-500/40 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-950/60 border border-orange-800/60 px-2 py-0.5 rounded">
                              Keyword: {art.targetKeyword}
                            </span>
                            <span
                              className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                                art.status === 'Published'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : art.status === 'Validated'
                                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              }`}
                            >
                              {art.status}
                            </span>
                          </div>
                          <h4 className="text-base font-extrabold text-white mt-1">
                            {art.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-2">
                            {art.description}
                          </p>
                          <div className="text-[11px] text-teal-400/90 italic pt-1">
                            Intent: {art.intent}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setInspectingArticle(art)}
                            className="text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" /> Read Full Article
                          </button>

                          {art.status === 'Draft' && (
                            <button
                              type="button"
                              disabled={contentLoadingId === art.slug}
                              onClick={() => handleValidateContent(art.slug)}
                              className="text-xs font-bold bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
                            >
                              <FileCheck className="w-3.5 h-3.5" /> Run SEO Audit
                            </button>
                          )}

                          {art.status === 'Validated' && (
                            <button
                              type="button"
                              disabled={contentLoadingId === art.slug}
                              onClick={() => handlePublishContent(art.slug)}
                              className="text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-1.5 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
                            >
                              <Send className="w-3.5 h-3.5" /> Publish to Bank of Gaga
                            </button>
                          )}

                          {art.status === 'Published' && (
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Live in Repository
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Validation checks preview if present */}
                      {art.validationChecks && (
                        <div className="bg-slate-900/60 p-3.5 rounded-xl border border-white/5 space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                            Automated SEO Audit Results:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {art.validationChecks.map((chk, i) => (
                              <div key={i} className="flex items-start gap-1.5">
                                <span className={chk.passed ? 'text-emerald-400' : 'text-red-400'}>
                                  {chk.passed ? '✓' : '✗'}
                                </span>
                                <span className="text-slate-300">
                                  <strong>{chk.name}:</strong> {chk.note}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: AD CREATIVE ENGINE & VISUAL CARDS (Module C) */}
        {activeTab === 'creative' && activeApp && (
          <div className="space-y-8">
            {/* 1. Visual Card Generator Component */}
            <VisualCardGenerator />

            {/* 2. Ad Angles & Scripts Pipeline */}
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-teal-400" /> Direct-Response Angles & Script Pipeline
                  </h3>
                  <p className="text-xs text-slate-400">
                    Targeted Meta Advantage+ scripts (Problem → Agitation → Solution) with 1-click script copy.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-teal-500/20"
                  >
                    <Plus className="w-4 h-4" /> Create New Angle
                  </button>
                </div>
              </div>

              {/* Angles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {activeApp.angles.map((angle) => (
                  <div
                    key={angle.id}
                    className="bg-slate-950/70 border border-white/10 rounded-2xl p-5 space-y-4 hover:border-teal-500/40 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      {/* Status and Cohort */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded truncate max-w-[170px]">
                          {angle.cohort}
                        </span>
                        <span
                          className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full border ${
                            angle.status === 'Published'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : angle.status === 'Validated'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          }`}
                        >
                          {angle.status}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-base font-extrabold text-white group-hover:text-teal-300 transition-colors">
                        {angle.title}
                      </h4>

                      {/* 3-Second Hook Preview */}
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                        <span className="text-[10px] font-bold uppercase text-orange-400 tracking-wider">
                          3-Second Hook:
                        </span>
                        <p className="text-xs text-slate-300 italic line-clamp-3">
                          &ldquo;{angle.hook3s}&rdquo;
                        </p>
                      </div>

                      <div className="text-xs text-slate-400">
                        <strong>Headline:</strong> {angle.headline}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setInspectingAngle(angle)}
                        className="text-xs font-bold text-teal-400 hover:text-teal-300 hover:underline flex items-center gap-1"
                      >
                        Inspect Script & Specs →
                      </button>

                      <div className="flex items-center gap-1.5">
                        {angle.status === 'Draft' && (
                          <button
                            type="button"
                            disabled={actionLoadingId === angle.id}
                            onClick={() => handleValidateAngle(angle.id)}
                            className="text-xs font-bold bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <FileCheck className="w-3 h-3" /> Validate
                          </button>
                        )}
                        {angle.status === 'Validated' && (
                          <button
                            type="button"
                            disabled={actionLoadingId === angle.id}
                            onClick={() => handlePublishAngle(angle.id)}
                            className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Send className="w-3 h-3" /> Publish
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMMUNITY INTENT MONITOR (Module D) */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-orange-400" /> Module D: Community Forum Intent Monitor
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    High-intent threads from Reddit (r/personalfinance, r/AgingParents) with authentic, authoritative responses and 1-click copy.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Total Discussions:</span>
                  <span className="text-xs font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-teal-300 font-mono">
                    {threads.length} Monitored
                  </span>
                </div>
              </div>

              {threads.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm bg-slate-950/50 rounded-2xl border border-white/5">
                  No community discussions found for this app.
                </div>
              ) : (
                <div className="space-y-6">
                  {threads.map((thread) => (
                    <div
                      key={thread.id}
                      className="bg-slate-950/70 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 hover:border-orange-500/30 transition-all"
                    >
                      {/* Thread Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 bg-orange-950/70 border border-orange-800/60 px-2 py-0.5 rounded">
                              {thread.community}
                            </span>
                            <span className="text-xs text-slate-400">
                              by <strong>{thread.author}</strong> · {thread.postedTimeAgo}
                            </span>
                            <span className="text-xs text-slate-500">
                              ({thread.upvotes} upvotes · {thread.commentsCount} comments)
                            </span>
                          </div>
                          <h4 className="text-base font-extrabold text-white">
                            {thread.threadTitle}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                              thread.status === 'Engaged'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : thread.status === 'Drafted'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            }`}
                          >
                            {thread.status}
                          </span>

                          <button
                            type="button"
                            disabled={threadLoadingId === thread.id}
                            onClick={() =>
                              handleThreadStatus(
                                thread.id,
                                thread.status === 'Engaged' ? 'Fresh' : 'Engaged'
                              )
                            }
                            className="text-xs font-bold text-slate-400 hover:text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg transition-colors"
                          >
                            {thread.status === 'Engaged' ? 'Mark Fresh' : 'Mark Engaged'}
                          </button>
                        </div>
                      </div>

                      {/* Pain Point & Tool Match */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-3 space-y-1">
                          <span className="text-[10px] font-bold uppercase text-red-400 tracking-wider">
                            Extracted Core Pain Point:
                          </span>
                          <p className="text-slate-300">{thread.extractedPainPoint}</p>
                        </div>

                        <div className="bg-teal-950/20 border border-teal-500/20 rounded-xl p-3 space-y-1">
                          <span className="text-[10px] font-bold uppercase text-teal-400 tracking-wider">
                            Recommended Growth Solution:
                          </span>
                          <p className="text-teal-200 font-medium">{thread.recommendedAngleOrTool}</p>
                        </div>
                      </div>

                      {/* Pre-Drafted Authentic Reply */}
                      <div className="space-y-2 bg-slate-900/80 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                            <Share2 className="w-3.5 h-3.5 text-teal-400" />
                            Drafted High-Reputation Reply (Non-Spam / Helpful)
                          </span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(thread.draftedReply, thread.id)}
                            className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-lg transition-colors"
                          >
                            {copiedField === thread.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            {copiedField === thread.id ? 'Copied Reply!' : 'Copy Reply'}
                          </button>
                        </div>

                        <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                          {thread.draftedReply}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Inspect Angle Modal */}
      {inspectingAngle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                  {inspectingAngle.cohort} · {inspectingAngle.format}
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  {inspectingAngle.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingAngle(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Validation Checklist if present */}
            {inspectingAngle.validationChecks && (
              <div className="bg-slate-950/70 border border-white/10 rounded-2xl p-4 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-teal-400" /> Automated Direct-Response Checks
                </div>
                <div className="space-y-1.5">
                  {inspectingAngle.validationChecks.map((check, i) => (
                    <div key={i} className="text-xs flex items-center gap-2">
                      <span className={check.passed ? 'text-emerald-400' : 'text-red-400'}>
                        {check.passed ? '✓' : '✗'}
                      </span>
                      <strong className="text-white">{check.name}:</strong>
                      <span className="text-slate-400">{check.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3-Second Hook */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  3-Second Hook (UGC Opening Video Frame)
                </label>
                <button
                  type="button"
                  onClick={() => copyToClipboard(inspectingAngle.hook3s, 'hook')}
                  className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copiedField === 'hook' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedField === 'hook' ? 'Copied!' : 'Copy Hook'}
                </button>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 text-sm font-medium text-slate-200 leading-relaxed italic">
                &ldquo;{inspectingAngle.hook3s}&rdquo;
              </div>
            </div>

            {/* Full Body Script / Primary Text */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Full Video Script & Meta Primary Text
                </label>
                <button
                  type="button"
                  onClick={() => copyToClipboard(inspectingAngle.bodyScript, 'body')}
                  className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copiedField === 'body' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedField === 'body' ? 'Copied!' : 'Copy Script'}
                </button>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 text-xs sm:text-sm font-normal text-slate-300 leading-relaxed whitespace-pre-wrap">
                {inspectingAngle.bodyScript}
              </div>
            </div>

            {/* Headline and CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500">Ad Headline</span>
                <p className="text-xs font-bold text-white">{inspectingAngle.headline}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500">CTA Button</span>
                <p className="text-xs font-bold text-teal-400">{inspectingAngle.cta}</p>
              </div>
            </div>

            {/* Visual Storyboard Specs */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-500">
                Visual Specs & Storyboard Frames
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {inspectingAngle.visualSpecs}
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-xs text-slate-400">
                Status: <strong className="text-white">{inspectingAngle.status}</strong>
              </span>

              <div className="flex items-center gap-2">
                {inspectingAngle.status === 'Draft' && (
                  <button
                    type="button"
                    onClick={() => handleValidateAngle(inspectingAngle.id)}
                    className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all"
                  >
                    Run Automated Validation
                  </button>
                )}
                {inspectingAngle.status === 'Validated' && (
                  <button
                    type="button"
                    onClick={() => handlePublishAngle(inspectingAngle.id)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all"
                  >
                    Publish to Active Campaigns
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setInspectingAngle(null)}
                  className="bg-white/10 hover:bg-white/15 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inspect Staged Article Modal */}
      {inspectingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-400 bg-orange-950/70 border border-orange-800/60 px-2 py-0.5 rounded">
                  Target Keyword: {inspectingArticle.targetKeyword}
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  {inspectingArticle.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingArticle(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Validation Checklist if present */}
            {inspectingArticle.validationChecks && (
              <div className="bg-slate-950/70 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-teal-400" /> SEO Content Audit
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {inspectingArticle.validationChecks.map((check, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className={check.passed ? 'text-emerald-400' : 'text-red-400'}>
                        {check.passed ? '✓' : '✗'}
                      </span>
                      <span className="text-slate-300">
                        <strong>{check.name}:</strong> {check.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Markdown Content Viewer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Full Article Markdown
                </label>
                <button
                  type="button"
                  onClick={() => copyToClipboard(inspectingArticle.contentMarkdown, 'article')}
                  className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copiedField === 'article' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedField === 'article' ? 'Copied Markdown!' : 'Copy Markdown'}
                </button>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                {inspectingArticle.contentMarkdown}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-xs text-slate-400">
                Status: <strong className="text-white">{inspectingArticle.status}</strong>
              </span>

              <div className="flex items-center gap-2">
                {inspectingArticle.status === 'Draft' && (
                  <button
                    type="button"
                    onClick={() => handleValidateContent(inspectingArticle.slug)}
                    className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all"
                  >
                    Run SEO Audit
                  </button>
                )}
                {inspectingArticle.status === 'Validated' && (
                  <button
                    type="button"
                    onClick={() => handlePublishContent(inspectingArticle.slug)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all"
                  >
                    Publish to Bank of Gaga
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setInspectingArticle(null)}
                  className="bg-white/10 hover:bg-white/15 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create New Angle Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-black text-white">
                  Draft New Creative Angle
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Create a direct-response ad concept, script, and visual spec for {activeApp?.name}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAngle} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Angle Title / Concept
                </label>
                <input
                  type="text"
                  placeholder="e.g. Angle 4.1: The Grandparent College Loan"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Target Cohort
                  </label>
                  <select
                    value={newCohort}
                    onChange={(e) => setNewCohort(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400"
                  >
                    <option value="Boomer Parents & Grandparents">Boomer Parents & Grandparents</option>
                    <option value="Responsible Adult Children">Responsible Adult Children</option>
                    <option value="High-Net-Worth Estate Planners">High-Net-Worth Estate Planners</option>
                    <option value="Wedding & Down Payment Borrowers">Wedding & Down Payment Borrowers</option>
                    <option value="General Audience">General Audience</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Creative Format
                  </label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400"
                  >
                    <option value="UGC Video Reel & 3-Frame Carousel">UGC Video Reel & 3-Frame Carousel</option>
                    <option value="Split-Screen Comparison Infographic">Split-Screen Comparison Infographic</option>
                    <option value="Document Proof / Authority Clip">Document Proof / Authority Clip</option>
                    <option value="LinkedIn Carousel / Long-Form">LinkedIn Carousel / Long-Form</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-orange-400">
                  3-Second Hook (Video Opening Frame / First Line)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Stop lending your kids money on a handshake. Here is what to do instead..."
                  value={newHook}
                  onChange={(e) => setNewHook(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Body Script / Primary Ad Copy
                </label>
                <textarea
                  rows={5}
                  placeholder="Write the full script or primary ad text here..."
                  value={newScript}
                  onChange={(e) => setNewScript(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm font-sans focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Headline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Family Loans Made Clean & Simple"
                    value={newHeadline}
                    onChange={(e) => setNewHeadline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Call To Action
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Open Your Bank (14-Day Free Trial)"
                    value={newCta}
                    onChange={(e) => setNewCta(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Visual Specs & Storyboard
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Frame 1: Parent talking to camera. Frame 2: Screen recording of mobile agreement. Frame 3: End card with logo."
                  value={newVisualSpecs}
                  onChange={(e) => setNewVisualSpecs(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoadingId === 'creating'}
                  className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-teal-500/20"
                >
                  {actionLoadingId === 'creating' ? 'Saving...' : 'Save as Draft'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
