import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ScreenshotShowcase from '@/components/ScreenshotShowcase';
import { ArrowLeft, ExternalLink, PiggyBank, Users, Shield, TrendingUp, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bank of Gaga | Family Loan Tracker',
  description: 'How I built Bank of Gaga, a subscription-based Web app that helps families track loans, set schedules, and practice investing.',
  alternates: {
    canonical: 'https://burtconsulting.com/projects/bank-of-gaga',
  },
};

export default function BankOfGagaProject() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Bank of Gaga',
    'operatingSystem': 'Web',
    'applicationCategory': 'FinanceApplication',
    'description': 'A family-loan tracking platform that replaces spreadsheets with formal loan agreements, amortization schedules, and reminders.',
  };

  return (
    <article className="min-h-screen py-16 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sax-gold/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <header className="space-y-6 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sax-gold/10 border border-sax-gold/20 text-xs font-semibold text-sax-gold">
            <PiggyBank className="w-4 h-4" />
            Family Finance SaaS
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Bank of Gaga: Keeping Family Loans Friendly
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            Replaces awkward IOUs and messy spreadsheets with clear loan contracts, automatic math calculations, and friendly reminders.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="https://bankofgaga.com" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sax-gold to-amber-600 hover:from-sax-gold/90 hover:to-amber-600/90 text-white font-semibold shadow-md flex items-center gap-2 transition-all duration-300"
            >
              Visit Live App <ExternalLink className="w-4 h-4" />
            </a>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 text-xs font-semibold">
              Project Type: Subscription SaaS App
            </span>
          </div>
        </header>

        {/* Screenshot Showcase */}
        <ScreenshotShowcase 
          src="/images/bank-of-gaga.png"
          alt="Bank of Gaga Application Dashboard Screenshot"
          appName="Bank of Gaga Dashboard"
          icon={<PiggyBank className="w-12 h-12" />}
          iconColorClass="text-sax-gold/40"
        />

        {/* Tech Stack Bar */}
        <section className="glass-panel rounded-2xl p-6 border border-white/5 mb-12">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Project Tech Stack</h3>
          <div className="flex flex-wrap gap-2.5">
            {['Next.js 15', 'TypeScript', 'NextAuth.js v4', 'Drizzle ORM', 'Supabase Postgres', 'Stripe Subscriptions', 'Resend', 'Tailwind CSS'].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Writeup Content */}
        <div className="space-y-12 text-slate-300 leading-relaxed text-base">
          
          {/* What I Built */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-sax-gold" /> What I Built
            </h2>
            <p>
              Bank of Gaga is a family loan management portal. It lets family members set up real loan agreements with custom amortization rates, automatic payment schedules, and clear dashboards. It removes the awkwardness from lending money by letting the software handle the math and reminders.
            </p>
            <p>
              The app is a complete subscription SaaS. It uses NextAuth for secure logging, Drizzle to manage database schemas, and Stripe webhooks to manage monthly ($7.99) and annual ($59.99) subscription billing.
            </p>
          </section>

          {/* Why I Built It */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-sax-gold" /> The Core Concept
            </h2>
            <p>
              Lending money to family members is incredibly common, but it&apos;s usually tracked on random napkins or messy Excel sheets. This leads to forgotten balances, missed timelines, and awkward family dinner conversations.
            </p>
            <p>
              I built Bank of Gaga to solve this using a double-sided user interface:
            </p>
            <ul className="space-y-3.5 pl-5 list-none">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>For Lenders ("Gagas"):</strong> A highly legible, clear desktop interface. Gagas can view summaries, click to adjust payment terms, and export clean PDF loan records.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>For Borrowers:</strong> A mobile-first progress screen. Borrowers see when payments are due and receive friendly email alerts when a transaction is logged.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>Financial Literacy Arena:</strong> A mock stock market simulator. Borrowers (especially kids) can practice investing their pretend cash balance, adding a fun learning layer to debt tracking.</span>
              </li>
            </ul>
          </section>

          {/* Tech Features */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sax-gold" /> Key Technical Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Amortization Engine</h4>
                <p className="text-xs text-slate-400">
                  Runs compounding math directly in database updates to calculate principal vs. interest splits, letting users make extra payments or adjust terms mid-loan.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Secure Entry Rate-Limiters</h4>
                <p className="text-xs text-slate-400">
                  Protects sensitive entry points (like signups, password resets, and invitation links) from brute-forcing using custom serverless Redis limits.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">GA4 Attribution Tracking</h4>
                <p className="text-xs text-slate-400">
                  Tracks subscription signups and correlates landing page flows to Stripe conversions using server-side analytics.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Email Reminders pipeline</h4>
                <p className="text-xs text-slate-400">
                  Integrates Resend transactional API to dispatch balance notifications and monthly receipts automatically.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Bottom Navigation */}
        <footer className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center text-center sm:text-left">
          <Link href="/projects/teach-weave" className="text-sm text-slate-400 hover:text-white transition-colors">
            &larr; Prev Project: Teach Weave
          </Link>
          <Link href="/projects/teaching-sax" className="text-sm text-sax-gold hover:text-white transition-colors font-medium flex items-center gap-1">
            Next Project: Teaching Sax &rarr;
          </Link>
        </footer>

      </div>
    </article>
  );
}
