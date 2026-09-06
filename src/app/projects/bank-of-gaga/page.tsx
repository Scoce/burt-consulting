import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ScreenshotShowcase from '@/components/ScreenshotShowcase';
import { ArrowLeft, ExternalLink, PiggyBank, Users, Shield, TrendingUp, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bank of Gaga | Family Loan Tracker',
  description: 'How I built Bank of Gaga, a subscription-based Web app that helps families track loans, set schedules, and practice investing.',
  alternates: {
    canonical: 'https://jamescburt.com/projects/bank-of-gaga',
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
            Family Finance
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Bank of Gaga: Tracking Family Loans Without the Awkwardness
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            A web app built to replace messy spreadsheets and back-of-the-napkin IOUs with clear agreements, automatic schedules, and friendly reminders.
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
              Project Status: Live App
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
          
          {/* Why I Built It */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-sax-gold" /> Why I Built It
            </h2>
            <p>
              Lending money between family members happens all the time, but it&apos;s almost always tracked on random napkins, buried in a messy Excel sheet, or left to memory. That leads to forgotten balances, missed timelines, and awkward tension at family gatherings.
            </p>
            <p>
              The name comes from our own family: the kids call their grandfather &ldquo;Gaga,&rdquo; and he would occasionally lend them money for a car, college books, or a big expense. I wanted to build a tool that gave family loans the clarity of a real agreement without feeling cold or corporate.
            </p>
          </section>

          {/* Designing for Two Audiences */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-sax-gold" /> Designing for Two Very Different Audiences
            </h2>
            <p>
              The most interesting challenge was designing for two completely different user mindsets on the same platform:
            </p>
            <ul className="space-y-3.5 pl-5 list-none">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>Older Lenders (&ldquo;Gagas&rdquo;):</strong> They manage the loans and want clear, high-contrast buttons, explicit labels, and zero guesswork. I built large confirmation modals, simple date adjustments, and one-click SMS invitation sharing so they never feel lost in the UI.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>Younger Borrowers:</strong> They interact almost entirely on their phones. They need a simple, mobile-first view showing when their next payment is due, deep links to Venmo or Cash App, and quick confirmation when a payment is logged.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>Pretend Stock Market for Kids:</strong> For younger family members, I built a simulated stock market module using real price feeds. They can practice investing their pretend cash balance, turning debt repayment into a practical financial literacy game.</span>
              </li>
            </ul>
          </section>

          {/* Solving the Real Details */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sax-gold" /> Solving the Real Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Mortgage-Style Overpayments</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  When an early user made extra payments, the math initially shrank future monthly payment slots into weird fractional amounts. I rewrote the recalculation engine to follow mortgage behavior: extra payments directly reduce principal and shorten the loan term, celebrated with a &ldquo;Final Payment 🎉&rdquo; badge.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Confirmation Loops &amp; Plaid</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Moving actual money introduces massive regulatory hurdles, so the app intentionally stays a tracking and agreement tool. Lenders confirm payments via a dashboard card with a 24-hour reminder nudge, alongside an in-app waitlist to gauge real demand for bank-feed sync.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Free Printable Agreement Generator</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  For families who just need a physical contract, I built a free public promissory note generator that lets anyone create and download a print-ready PDF loan contract on demand.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Automated Friendly Reminders</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  No one wants to text their kid or sibling asking for money. Automated daily background checks trigger friendly email notifications through Resend before due dates arrive, removing the personal friction.
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
