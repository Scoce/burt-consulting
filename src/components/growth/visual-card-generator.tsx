'use client';

import React, { useState, useRef } from 'react';
import { Download, Sparkles, Sliders, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface TemplateConfig {
  id: string;
  name: string;
  badge: string;
  headline: string;
  subhead: string;
  leftTitle: string;
  leftPoints: string[];
  rightTitle: string;
  rightPoints: string[];
  cta: string;
  accentColor: string;
}

const TEMPLATES: TemplateConfig[] = [
  {
    id: 'comparison',
    name: 'Handshake vs. Bank of Gaga',
    badge: 'FAMILY LOAN REALITY CHECK',
    headline: 'Stop Lending Money on a Handshake.',
    subhead: 'How to help your kids buy a home without ruining Sunday dinner.',
    leftTitle: 'The Verbal Handshake',
    leftPoints: [
      'Awkward repayment reminders',
      'Forgotten interest & balances',
      'IRS § 7872 gift-tax audit risk',
      'Underwriter flags mortgage fraud',
    ],
    rightTitle: 'Bank of Gaga',
    rightPoints: [
      'Legal promissory note in 2 min',
      'Automated, friendly text reminders',
      '100% IRS AFR rate compliant',
      'Underwriter-approved paper trail',
    ],
    cta: 'bankofgaga.com · Free Promissory Note',
    accentColor: '#14b8a6', // teal
  },
  {
    id: 'savings',
    name: 'Interest Rate Arbitrage (7.6% vs 4.3%)',
    badge: 'SAVE YOUR KIDS $48,000+',
    headline: 'Why Pay 7.6% When You Can Use 4.3%?',
    subhead: 'Save your kids thousands in mortgage interest using legal IRS AFR rates.',
    leftTitle: 'Commercial Bank Mortgage',
    leftPoints: [
      '7.6% APR commercial rate',
      '$3,530 / month payment',
      '$273,600 paid to Wall Street',
      'Strict credit underwriting',
    ],
    rightTitle: 'Family AFR Loan (Gaga)',
    rightPoints: [
      '4.3% IRS legal minimum rate',
      '$2,474 / month payment',
      'Keep $126,000 inside the family',
      'Approved as legal 2nd mortgage',
    ],
    cta: 'Calculate Your Rate at bankofgaga.com/afr-calculator',
    accentColor: '#10b981', // emerald
  },
  {
    id: 'mortgage-gift',
    name: 'Mortgage Gift Letter vs Family Loan',
    badge: 'FIRST-TIME HOMEBUYER WARNING',
    headline: 'Don’t Sign a Fake Gift Letter.',
    subhead: 'If you expect to be repaid, signing a gift letter is federal mortgage fraud.',
    leftTitle: 'Mortgage Gift Letter',
    leftPoints: [
      'Must swear funds are never repaid',
      'Verbal expectation = fraud risk',
      'Consumes lifetime gift exemption',
      'Creates unspoken family tension',
    ],
    rightTitle: 'Bank of Gaga Loan',
    rightPoints: [
      'Formal documented 2nd mortgage',
      'Transparent repayment schedule',
      '100% IRS & lender compliant',
      'Preserves family harmony',
    ],
    cta: 'Set Up Clean Family Financing at bankofgaga.com',
    accentColor: '#f59e0b', // amber
  },
];

export default function VisualCardGenerator() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('comparison');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '9:16'>('1:1');
  const [isExporting, setIsExporting] = useState(false);

  // Editable fields based on selected template
  const activeTemplate = TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

  const [headline, setHeadline] = useState(activeTemplate.headline);
  const [subhead, setSubhead] = useState(activeTemplate.subhead);
  const [badge, setBadge] = useState(activeTemplate.badge);

  // Sync state on template change
  const handleSelectTemplate = (t: TemplateConfig) => {
    setSelectedTemplateId(t.id);
    setHeadline(t.headline);
    setSubhead(t.subhead);
    setBadge(t.badge);
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const exportAsPng = () => {
    setIsExporting(true);
    const canvas = document.createElement('canvas');
    const width = 1080;
    const height = aspectRatio === '1:1' ? 1080 : 1920;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // 1. Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#020617'); // slate-950
    bgGrad.addColorStop(1, '#0f172a'); // slate-900
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Grid pattern / subtle accents
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 40; x < width; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 40; y < height; y += 80) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const paddingX = 80;
    let currentY = aspectRatio === '1:1' ? 90 : 180;

    // 2. Brand badge
    ctx.fillStyle = '#0f766e';
    ctx.beginPath();
    ctx.roundRect(paddingX, currentY, 400, 48, 24);
    ctx.fill();

    ctx.fillStyle = '#2dd4bf';
    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`★  ${badge}`, paddingX + 24, currentY + 32);

    currentY += 100;

    // 3. Main Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 58px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    
    // Word wrap headline
    const words = headline.split(' ');
    let line = '';
    const maxWidth = width - paddingX * 2;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, paddingX, currentY);
        line = words[n] + ' ';
        currentY += 70;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, paddingX, currentY);
    currentY += 30;

    // 4. Subheading
    ctx.fillStyle = '#94a3b8'; // slate-400
    ctx.font = '400 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(subhead, paddingX, currentY + 40, maxWidth);
    currentY += 120;

    // 5. Comparison Cards Side by Side
    const cardWidth = (width - paddingX * 2 - 40) / 2;
    const cardHeight = aspectRatio === '1:1' ? 440 : 640;

    // Left Card (The Bad Way)
    ctx.fillStyle = 'rgba(239, 68, 68, 0.08)'; // red tint
    ctx.beginPath();
    ctx.roundRect(paddingX, currentY, cardWidth, cardHeight, 28);
    ctx.fill();
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#f87171';
    ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`✗  ${activeTemplate.leftTitle}`, paddingX + 36, currentY + 60);

    let pointY = currentY + 120;
    activeTemplate.leftPoints.forEach((point) => {
      ctx.fillStyle = '#fca5a5';
      ctx.font = '400 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(`• ${point}`, paddingX + 36, pointY, cardWidth - 70);
      pointY += (aspectRatio === '1:1' ? 65 : 100);
    });

    // Right Card (Bank of Gaga Way)
    const rightCardX = paddingX + cardWidth + 40;
    ctx.fillStyle = 'rgba(20, 184, 166, 0.12)'; // teal tint
    ctx.beginPath();
    ctx.roundRect(rightCardX, currentY, cardWidth, cardHeight, 28);
    ctx.fill();
    ctx.strokeStyle = '#14b8a6';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#2dd4bf';
    ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`✓  ${activeTemplate.rightTitle}`, rightCardX + 36, currentY + 60);

    let rightPointY = currentY + 120;
    activeTemplate.rightPoints.forEach((point) => {
      ctx.fillStyle = '#ccfbf1';
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(`✓ ${point}`, rightCardX + 36, rightPointY, cardWidth - 70);
      rightPointY += (aspectRatio === '1:1' ? 65 : 100);
    });

    currentY += cardHeight + 60;

    // 6. Bottom Banner / CTA
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(paddingX, currentY, width - paddingX * 2, 80, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('BANK OF GAGA', paddingX + 32, currentY + 48);

    ctx.fillStyle = '#2dd4bf';
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(activeTemplate.cta, paddingX + 260, currentY + 48);

    // Download trigger
    const link = document.createElement('a');
    link.download = `bankofgaga-ad-${activeTemplate.id}-${aspectRatio.replace(':', 'x')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setIsExporting(false);
  };

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-400" /> Module C: Ad Creative & Visual Card Generator
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Render high-contrast visual comparison ads optimized for Meta Advantage+, Instagram Feed (1:1), and Stories/Reels (9:16).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Ratio Selector */}
          <div className="bg-slate-950 border border-white/10 rounded-xl p-1 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setAspectRatio('1:1')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                aspectRatio === '1:1'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1:1 Feed
            </button>
            <button
              type="button"
              onClick={() => setAspectRatio('9:16')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                aspectRatio === '9:16'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              9:16 Story / Reel
            </button>
          </div>

          <button
            type="button"
            onClick={exportAsPng}
            disabled={isExporting}
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-teal-500/20"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Generating...' : 'Export High-Res PNG'}
          </button>
        </div>
      </div>

      {/* Template Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => handleSelectTemplate(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTemplateId === t.id
                ? 'bg-white/15 text-white border border-white/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Grid: Live Preview & Form Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4 bg-slate-950/70 p-5 rounded-2xl border border-white/10">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 pb-2 border-b border-white/5">
            <Sliders className="w-3.5 h-3.5 text-teal-400" /> Ad Card Customizer
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Badge Label
            </label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-teal-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Main Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-teal-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Subheading / Hook
            </label>
            <textarea
              rows={2}
              value={subhead}
              onChange={(e) => setSubhead(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-teal-400"
            />
          </div>

          <div className="text-xs text-slate-400 pt-2 border-t border-white/5 flex items-center justify-between">
            <span>Dimensions:</span>
            <span className="font-mono text-teal-300 font-bold">
              {aspectRatio === '1:1' ? '1080 × 1080 px' : '1080 × 1920 px'}
            </span>
          </div>
        </div>

        {/* Live Card Preview Box */}
        <div className="lg:col-span-7 flex justify-center bg-slate-950 p-6 rounded-2xl border border-white/10 overflow-hidden">
          <div
            className={`w-full max-w-[480px] bg-slate-950 border border-white/15 rounded-2xl p-6 flex flex-col justify-between shadow-2xl transition-all ${
              aspectRatio === '9:16' ? 'aspect-[9/16] min-h-[580px]' : 'aspect-square'
            }`}
          >
            <div className="space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-teal-300 bg-teal-950/80 border border-teal-700/60 px-2.5 py-1 rounded-full">
                ★ {badge}
              </div>

              {/* Headline */}
              <div>
                <h4 className="text-lg sm:text-xl font-black text-white leading-tight">
                  {headline}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{subhead}</p>
              </div>

              {/* Comparison Split Columns */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {/* Left (Red / Flawed) */}
                <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-3 space-y-2">
                  <div className="text-xs font-bold text-red-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span className="truncate">{activeTemplate.leftTitle}</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-red-200/80">
                    {activeTemplate.leftPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-red-400 font-bold">✕</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right (Teal / Bank of Gaga) */}
                <div className="bg-teal-950/30 border border-teal-500/50 rounded-xl p-3 space-y-2 shadow-inner">
                  <div className="text-xs font-extrabold text-teal-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span className="truncate">{activeTemplate.rightTitle}</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-teal-100 font-medium">
                    {activeTemplate.rightPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-teal-400 font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom CTA Bar */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 mt-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-teal-500/20 text-teal-300 font-black text-[10px] flex items-center justify-center border border-teal-500/30">
                  BG
                </div>
                <span className="text-[11px] font-bold text-white">Bank of Gaga</span>
              </div>
              <span className="text-[10px] font-bold text-teal-300 truncate">
                {activeTemplate.cta}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
