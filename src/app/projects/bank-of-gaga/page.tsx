import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink, PiggyBank, Users, Shield, TrendingUp, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bank of Gaga Case Study | Informal Family Loan Tracker',
  description: 'Learn how Bank of Gaga replaces complex spreadsheets with an elegant family loan tracking SaaS, ensuring automated calculations and payment schedules.',
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
    'offers': {
      '@type': 'Offer',
      'price': '7.99',
      'priceCurrency': 'USD',
    },
  };

  return (
    <article className="min-h-screen py-16 relative">
      {/* Inject JSON-LD */}
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
        <header className="space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sax-gold/10 border border-sax-gold/20 text-xs font-semibold text-sax-gold">
            <PiggyBank className="w-4 h-4" />
            Family Finance SaaS
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Bank of Gaga: Tracking Family Loans Safely
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            Replacing awkward spreadsheets with formal loan agreements, amortization calculations, and friendly reminders.
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
              Role: Founder & Full-Stack Architect
            </span>
          </div>
        </header>

        {/* Tech Stack Bar */}
        <section className="glass-panel rounded-2xl p-6 border border-white/5 mb-12">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Project Tech Stack</h3>
          <div className="flex flex-wrap gap-2.5">
            {['Next.js 15', 'TypeScript', 'NextAuth.js v4', 'Drizzle ORM', 'Supabase Postgres', 'Stripe Subscriptions', 'Resend', 'Google Analytics 4', 'Tailwind CSS'].map((tech) => (
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
              <strong>Bank of Gaga</strong> is a full-scale family loan management application. The product functions as a highly polished, secure, and user-friendly alternative to a standard Excel sheet. Lenders ("Gagas") and borrowers can model custom loan arrangements, generate structured repayment timelines, track modifications, and process automated payment email alerts via Resend.
            </p>
            <p>
              The system implements custom rate-limiting endpoints, NextAuth security guards, and deep Stripe billing integrations supporting monthly ($7.99/mo) and annual ($59.99/yr) user subscription profiles with a 14-day trial flow.
            </p>
          </section>

          {/* Why I Built It */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-sax-gold" /> Why I Built It & The Dual-Audience Solution
            </h2>
            <p>
              Intra-family lending accounts for billions of dollars annually, yet these transactions are plagued by poor tracking, forgotten deadlines, and social friction. 
            </p>
            <p>
              Designing Bank of Gaga required solving a unique <strong>dual-audience UX challenge</strong>:
            </p>
            <ul className="space-y-3.5 pl-5 list-none">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>The Lenders ("Gagas"):</strong> Often older family members who value high legibility, clean visual signals, and structured printouts (such as PDF agreements) to avoid feeling confused.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>The Borrowers (Grandkids/Kids):</strong> Mobile-first users who require quick status trackers, automated payment reminders, and text message alerts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>Financial Literacy Feature:</strong> An optional component allowing kids and younger borrowers to practice investing with simulated cash, turning a debt tracker into a positive learning game.</span>
              </li>
            </ul>
          </section>

          {/* Core Technical Highlights */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sax-gold" /> Core Technical Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Amortization Engine</h4>
                <p className="text-xs text-slate-400">
                  Calculates principal and interest splits dynamically based on standard banking formulas, accommodating one-off payment adjustments and term changes.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">NextAuth Credential Flow</h4>
                <p className="text-xs text-slate-400">
                  Provides unified authentication schemas mapping regular password registers and Google OAuth integrations to single profile rows.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Apex Redirect Middleware</h4>
                <p className="text-xs text-slate-400">
                  Secures SEO canonicals by redirecting subdomain layouts (`www`) to apex and restricting search engine crawlers on critical app sections.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Stripe Subscriptions Webhooks</h4>
                <p className="text-xs text-slate-400">
                  Listens to and handles Stripe subscription invoice cycles, trial expirations, and cards updates completely in the background.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Bottom Navigation */}
        <footer className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
          <Link href="/projects/teach-weave" className="text-sm text-slate-400 hover:text-white transition-colors">
            &larr; Prev Project
          </Link>
          <Link href="/projects/teaching-sax" className="text-sm text-sax-gold hover:text-white transition-colors font-medium flex items-center gap-1">
            Next Project: Teaching Sax &rarr;
          </Link>
        </footer>

      </div>
    </article>
  );
}
