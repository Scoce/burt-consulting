'use client';

import React, { useState } from 'react';
import {
  X,
  FileCheck,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Eye,
  Code2,
  Share2,
  Sparkles,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Layers,
} from 'lucide-react';
import { StagedArticle } from '@/lib/growth-content';

interface ArticleReviewModalProps {
  article: StagedArticle;
  onClose: () => void;
  onPublish: (slug: string) => Promise<void>;
  onValidate: (slug: string) => Promise<void>;
  isLoading: boolean;
}

export default function ArticleReviewModal({
  article,
  onClose,
  onPublish,
  onValidate,
  isLoading,
}: ArticleReviewModalProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'audit' | 'distribution' | 'raw'>('preview');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  function copyToClipboard(text: string, fieldId: string) {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  }

  // Pre-wired UTM links for distribution
  const liveBlogUrl = `https://bankofgaga.com/blog/${article.slug}`;
  const organicSocialUtm = `${liveBlogUrl}?utm_source=facebook&utm_medium=community_post&utm_campaign=${article.slug}`;
  const metaAdsUtm = `${liveBlogUrl}?utm_source=meta_ads&utm_medium=feed_carousel&utm_campaign=${article.slug}`;
  const directSignupUtm = `https://bankofgaga.com/signup?utm_source=blog&utm_medium=cta_review&utm_campaign=${article.slug}`;

  // Simple, clean markdown rendering for visual preview
  function renderMarkdownPreview(content: string) {
    // Strip YAML frontmatter for the visual preview
    const cleanContent = content.replace(/^---[\s\S]*?---\n*/, '');
    const lines = cleanContent.split('\n');

    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushList = () => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-1.5 my-3 text-slate-300 text-sm pl-2">
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    const formatInline = (text: string) => {
      return text
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em class="italic text-slate-200">$1</em>')
        .replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-teal-300 px-1 py-0.5 rounded font-mono text-xs">$1</code>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-teal-400 hover:text-teal-300 underline font-semibold">$1</a>');
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Check for image: ![alt](url)
      const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        flushList();
        const alt = imgMatch[1];
        const src = imgMatch[2];
        elements.push(
          <div key={`img-${index}`} className="my-5 space-y-1.5">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 shadow-lg">
              <img
                src={src}
                alt={alt}
                className="w-full h-auto max-h-[420px] object-cover"
                onError={(e) => {
                  // Fallback visual placeholder if image path differs
                  const target = e.currentTarget;
                  target.style.display = 'none';
                }}
              />
            </div>
            {alt && (
              <p className="text-center text-[11px] text-slate-400 italic">
                {alt}
              </p>
            )}
          </div>
        );
        return;
      }

      // Check for headings
      if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h4 key={`h4-${index}`} className="text-base font-bold text-white mt-5 mb-2">
            {trimmed.replace('### ', '')}
          </h4>
        );
        return;
      }

      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-extrabold text-white mt-7 mb-3 border-b border-white/10 pb-2 flex items-center gap-2">
            {trimmed.replace('## ', '')}
          </h3>
        );
        return;
      }

      if (trimmed.startsWith('# ')) {
        flushList();
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-black text-white mt-4 mb-3">
            {trimmed.replace('# ', '')}
          </h2>
        );
        return;
      }

      // Blockquotes
      if (trimmed.startsWith('> ')) {
        flushList();
        elements.push(
          <blockquote
            key={`bq-${index}`}
            className="my-4 border-l-4 border-teal-500 bg-teal-950/20 p-4 rounded-r-2xl text-slate-200 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace('> ', '')) }}
          />
        );
        return;
      }

      // Dividers
      if (trimmed === '---') {
        flushList();
        elements.push(<hr key={`hr-${index}`} className="my-6 border-white/10" />);
        return;
      }

      // Lists
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        inList = true;
        listItems.push(trimmed.replace(/^[*|-]\s+/, ''));
        return;
      }

      // Regular text paragraphs
      if (trimmed.length > 0) {
        flushList();
        elements.push(
          <p
            key={`p-${index}`}
            className="text-slate-300 text-sm leading-relaxed my-3 font-normal"
            dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
          />
        );
      }
    });

    flushList();
    return elements;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 bg-slate-950/60 flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400 bg-teal-950/70 border border-teal-800/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Human-in-the-Loop Staging Queue
              </span>
              <span
                className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                  article.status === 'Published'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : article.status === 'Validated'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 animate-pulse'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                {article.status === 'Validated'
                  ? '🟡 Awaiting Your Approval (Validated)'
                  : article.status === 'Published'
                  ? '✅ Published Live'
                  : 'Draft'}
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                app: {article.app}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
              {article.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/10 bg-slate-950/40 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'preview'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" /> Visual Article Preview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'audit'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileCheck className="w-4 h-4" /> SEO & Quality Audit
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('distribution')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'distribution'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4" /> Distribution & Social Links
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('raw')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'raw'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" /> Raw Markdown & Frontmatter
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* TAB 1: VISUAL EDITORIAL PREVIEW */}
          {activeTab === 'preview' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                  Target Search Intent:
                </div>
                <p className="text-xs text-slate-300">
                  <strong>Keyword:</strong> &ldquo;{article.targetKeyword}&rdquo; &bull; {article.intent}
                </p>
                <p className="text-xs text-slate-400 italic">
                  <strong>Meta Description:</strong> {article.description}
                </p>
              </div>

              <div className="prose prose-invert max-w-none">
                {renderMarkdownPreview(article.contentMarkdown)}
              </div>
            </div>
          )}

          {/* TAB 2: SEO & QUALITY AUDIT */}
          {activeTab === 'audit' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400" /> Automated Compliance & Quality Checks
                </h4>
                <p className="text-xs text-slate-400">
                  Autonomous pre-flight audit before staging for human sign-off.
                </p>

                <div className="space-y-2.5 pt-2">
                  {article.validationChecks && article.validationChecks.length > 0 ? (
                    article.validationChecks.map((chk, i) => (
                      <div
                        key={i}
                        className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-start gap-3"
                      >
                        <span className={`text-base font-bold ${chk.passed ? 'text-emerald-400' : 'text-red-400'}`}>
                          {chk.passed ? '✓' : '✗'}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white">{chk.name}</div>
                          <div className="text-xs text-slate-300 mt-0.5">{chk.note}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-400 italic p-3">
                      No automated validation records found. Click &ldquo;Run SEO Audit&rdquo; to execute.
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/10 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Brand Voice Checklist (The Costco Middle)
                </h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Respectful, competent tone for mature parents (no condescending AARP clichés).</li>
                  <li>Clear terminology: <em>money agreement</em>, <em>member</em>, <em>Gaga</em>, <em>Mark Paid</em>.</li>
                  <li>Grounding in statutory IRS rules: IRC § 7872 and IRC § 2503(b).</li>
                  <li>Strict 14-day free trial copy consistent with Stripe API.</li>
                  <li>Zero money holding / escrow clarification.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: DISTRIBUTION & SOCIAL CHANNELS */}
          {activeTab === 'distribution' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-teal-950/30 border border-teal-500/30 p-4 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" /> Multi-Channel Distribution Plan
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Publishing this post generates an editorial anchor. Below are the pre-wired, UTM-tracked distribution assets to drive traffic immediately without paying for ads.
                </p>
              </div>

              {/* Channel 1: Free Organic Social / Facebook / Forum Post */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    1. Zero-Cost Social / Community Post (Facebook Groups / Reddit)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `If you loaned money to your adult kid (for a house down payment or college) and want to forgive the remaining balance for Christmas or a milestone, do NOT just say "forget it" on a handshake.\n\nThe IRS has a strict rule: if you forgive more than $18,000 in a single year, you can trigger gift tax reporting forms (or even accidental income tax for your kid).\n\nHere is the simple 2-year holiday split parents use to legally wipe out debt 100% tax-free:\n${organicSocialUtm}`,
                        'social-post'
                      )
                    }
                    className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 font-bold"
                  >
                    {copiedField === 'social-post' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedField === 'social-post' ? 'Copied Post Copy!' : 'Copy Post Text'}
                  </button>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-xs text-slate-300 space-y-2 leading-relaxed">
                  <p>
                    If you loaned money to your adult kid (for a house down payment or college) and want to forgive the remaining balance for Christmas or a milestone, do NOT just say &ldquo;forget it&rdquo; on a handshake.
                  </p>
                  <p>
                    The IRS has a strict rule: if you forgive more than $18,000 in a single year, you can trigger gift tax reporting forms (or even accidental income tax for your kid).
                  </p>
                  <p className="text-teal-400 font-mono text-[11px]">
                    Link: {organicSocialUtm}
                  </p>
                </div>
              </div>

              {/* Channel 2: Pre-wired Links */}
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-white">
                  2. Pre-Tagged Tracking Links (Neon Telemetry Wired)
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase">
                      Live Editorial Post URL (Once Published)
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        readOnly
                        value={liveBlogUrl}
                        className="flex-1 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 font-mono text-[11px]"
                      />
                      <button
                        type="button"
                        onClick={() => copyToClipboard(liveBlogUrl, 'blog-url')}
                        className="bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg text-slate-200"
                      >
                        {copiedField === 'blog-url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase">
                      Direct 14-Day Free Trial Signup Link
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        readOnly
                        value={directSignupUtm}
                        className="flex-1 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 font-mono text-[11px]"
                      />
                      <button
                        type="button"
                        onClick={() => copyToClipboard(directSignupUtm, 'signup-url')}
                        className="bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg text-slate-200"
                      >
                        {copiedField === 'signup-url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RAW MARKDOWN */}
          {activeTab === 'raw' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Full Markdown Content
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(article.contentMarkdown, 'raw-markdown')}
                  className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copiedField === 'raw-markdown' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedField === 'raw-markdown' ? 'Copied!' : 'Copy Markdown'}
                </button>
              </div>
              <pre className="bg-slate-950 p-4 rounded-2xl border border-white/10 text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap max-h-[450px] overflow-y-auto">
                {article.contentMarkdown}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer / Action Bar */}
        <div className="px-6 py-4 border-t border-white/10 bg-slate-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            {article.status === 'Validated' ? (
              <span className="flex items-center gap-1.5 text-blue-300 font-medium">
                <AlertTriangle className="w-4 h-4 text-blue-400 shrink-0" />
                Awaiting your approval. Approving writes this post to loan-portal and updates live tracking.
              </span>
            ) : article.status === 'Published' ? (
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Article is live on BankOfGaga with live UTM click tracking.
              </span>
            ) : (
              <span>Draft mode. Run SEO audit to validate.</span>
            )}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {article.status === 'Draft' && (
              <button
                type="button"
                disabled={isLoading}
                onClick={() => onValidate(article.slug)}
                className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" /> Run SEO Audit
              </button>
            )}

            {article.status === 'Validated' && (
              <button
                type="button"
                disabled={isLoading}
                onClick={() => onPublish(article.slug)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-1.5"
              >
                {isLoading ? (
                  <span>Publishing...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> ✅ Approve &amp; Publish to BankOfGaga
                  </>
                )}
              </button>
            )}

            {article.status === 'Published' && (
              <a
                href={liveBlogUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
              >
                View Live on Site <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="bg-white/10 hover:bg-white/15 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
