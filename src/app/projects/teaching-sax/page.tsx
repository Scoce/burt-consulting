import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ScreenshotShowcase from '@/components/ScreenshotShowcase';
import { ArrowLeft, ExternalLink, Music, Video, Star, FileText, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Teaching Sax | Custom Woodwind Studio Software',
  description: 'How I built a custom teaching platform and virtual classroom to support my return to saxophone instruction, featuring low-latency audio tuning.',
  alternates: {
    canonical: 'https://jamescburt.com/projects/teaching-sax',
  },
};

export default function TeachingSaxProject() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Teaching Sax',
    'operatingSystem': 'Web',
    'applicationCategory': 'EducationalApplication',
    'description': 'A private virtual saxophone teaching studio management and student practice tracking platform featuring low-latency WebRTC audio.',
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
            <Music className="w-4 h-4" />
            Music Pedagogy &amp; Software
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Teaching Sax: Video Lessons That Actually Sound Good
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            A custom teaching studio and practice platform I built to solve the real headaches of running a virtual woodwind studio.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="https://teachingsax.com" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sax-gold to-amber-600 hover:from-sax-gold/90 hover:to-amber-600/90 text-white font-semibold shadow-md flex items-center gap-2 transition-all duration-300"
            >
              Visit Live App <ExternalLink className="w-4 h-4" />
            </a>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 text-xs font-semibold">
              Project Status: Active Studio Tool
            </span>
          </div>
        </header>

        {/* Screenshot Showcase */}
        <ScreenshotShowcase 
          src="/images/teaching-sax.png"
          alt="Teaching Sax Virtual Classroom Dashboard Screenshot"
          appName="Teaching Sax Classroom"
          icon={<Video className="w-12 h-12" />}
          iconColorClass="text-sax-gold/40"
        />

        {/* Tech Stack Bar */}
        <section className="glass-panel rounded-2xl p-6 border border-white/5 mb-12">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Project Tech Stack</h3>
          <div className="flex flex-wrap gap-2.5">
            {['Next.js 16', 'TypeScript', 'Daily.co SDK (WebRTC)', 'Drizzle ORM', 'Neon Postgres', 'Stripe Payments', 'Tailwind CSS'].map((tech) => (
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
              <Star className="w-5 h-5 text-sax-gold" /> Why I Built It
            </h2>
            <p>
              When I decided to get back into teaching private saxophone lessons, I looked around for software to manage student rosters, schedule slots, and keep track of assignments. Almost everything available felt like it was built in 2005—clunky, dated, and heavily skewed toward in-person piano studios.
            </p>
            <p>
              As someone with both a music education degree and a background in building web apps, I decided to build my own studio tool from scratch. Using the software every week with actual students means every feature solves a friction point I&apos;ve personally experienced during a lesson.
            </p>
          </section>

          {/* Core Feature Highlight: Low Latency Audio */}
          <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-sax-gold/20 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sax-gold/5 rounded-full blur-2xl -z-10 pointer-events-none" />
            
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-sax-gold" /> The Core Problem: Why Zoom Fails for Instruments
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              If you&apos;ve ever tried to teach music lessons over standard video platforms like Zoom or Teams, you know the frustration. Standard video conferencing tools use aggressive noise-cancellation and noise-gating algorithms designed to isolate speech and silence background noise. When a student plays a long, sustained tone on a saxophone, the software assumes it&apos;s a vacuum cleaner or HVAC unit and cuts the sound off completely.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              To solve this, I built a custom virtual classroom integration using the **Daily.co WebRTC SDK** with raw, uncompressed stereo Opus audio (256kbps stereo, 48kHz). By bypassing browser speech filtering, tone quality, dynamics, and subtle intonation come through naturally with minimal latency.
            </p>
          </section>

          {/* Key Features */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-sax-gold" /> Making Studio Management Painless
            </h2>
            <ul className="space-y-3.5 pl-5 list-none">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>Tokenized Self-Booking Links:</strong> Students pick available slots from a Calendly-style booking view on `/contact` with custom time templates and automated email confirmations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>Google Calendar API Sync:</strong> Decoupled from user sign-in, allowing direct sync of lesson slots into my real calendar without permission headaches.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>iCal Native Calendar Feeds:</strong> Serves a read-only `.ics` calendar URL at `/api/calendar/[token]` so students and parents can subscribe directly from Apple or Google Calendar on their phones.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>Painless Assignment Flow:</strong> I can type feedback and assigned exercises during the lesson so it appears immediately on the student&apos;s practice page without post-lesson typing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>Multi-Tenant Architecture from Day One:</strong> Scoped by `teacher_id` across all database tables so the infrastructure can cleanly support other music teachers whenever the studio expands.</span>
              </li>
            </ul>
          </section>

        </div>

        {/* Bottom Navigation */}
        <footer className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center text-center sm:text-left">
          <Link href="/projects/bank-of-gaga" className="text-sm text-slate-400 hover:text-white transition-colors">
            &larr; Prev Project: Bank of Gaga
          </Link>
          <Link href="/projects/truths-and-lies" className="text-sm text-sax-gold hover:text-white transition-colors font-medium flex items-center gap-1">
            Next Project: Truths & Lies &rarr;
          </Link>
        </footer>

      </div>
    </article>
  );
}
