import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink, Music, Award, Compass, BookOpen, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Teaching Sax Case Study | Saxophone Studio Management SaaS',
  description: 'Read the Teaching Sax case study. Custom-built studio management software for Woodwind teachers, featuring lesson assignment flow and audio archives.',
  alternates: {
    canonical: 'https://burtconsulting.com/projects/teaching-sax',
  },
};

export default function TeachingSaxProject() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Teaching Sax',
    'operatingSystem': 'Web',
    'applicationCategory': 'EducationalApplication',
    'description': 'A private virtual saxophone teaching studio management and student practice tracking platform built by a Woodwind educator.',
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
            <Music className="w-4 h-4" />
            Music Pedagogy SaaS
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Teaching Sax: Custom Woodwind Studio Software
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            Custom studio management software built by a Woodwind teacher for Woodwind teachers, grounding pedagogy in daily workflows.
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
              Role: Founder & Saxophone Instructor
            </span>
          </div>
        </header>

        {/* Tech Stack Bar */}
        <section className="glass-panel rounded-2xl p-6 border border-white/5 mb-12">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Project Tech Stack</h3>
          <div className="flex flex-wrap gap-2.5">
            {['Next.js 16', 'TypeScript', 'Drizzle ORM', 'Supabase Postgres', 'Stripe API', 'Daily.co SDK (Video)', 'Next Themes', 'Playwright E2E', 'Tailwind CSS'].map((tech) => (
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
              <Award className="w-5 h-5 text-sax-gold" /> What I Built
            </h2>
            <p>
              <strong>Teaching Sax</strong> is a custom SaaS application designed to manage a virtual-first saxophone studio. It acts as both a commercial teaching storefront and a tool for the teacher to track schedules, handle lesson payments via Stripe, store recordings, assign homework, and measure student progression over time.
            </p>
            <p>
              The platform implements woodwind-specific progress metrics (e.g. scales, tone, embouchure, breathing exercises) rather than piano-centric frameworks. It also features a built-in virtual classroom using the Daily.co video SDK for low-latency audio sync.
            </p>
          </section>

          {/* Why I Built It */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-sax-gold" /> Why I Built It & The Product Thesis
            </h2>
            <p>
              Traditional music studio software (like MyMusicStaff or Duet) is dated, web-first, and heavily piano-centric. Woodwind teaching requires a different pedagogical shape—breathing, embouchure position, reeds maintenance, and real-time audio analysis.
            </p>
            <p>
              The product thesis is simple: <strong>"Build software for your own practice, then sell it."</strong> Grounded in my actual teaching practice, I built this to resolve daily friction points:
            </p>
            <ul className="space-y-3.5 pl-5 list-none">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>Lesson-to-Practice Notes:</strong> The system captures comments during lessons and flows them directly into the student\'s practice assignment dashboard without double-typing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>Audio Recording Archive:</strong> Students record their practice sessions directly within the app. Both the teacher and student can review recordings historically to hear audible tone improvements.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sax-gold shrink-0 mt-0.5" />
                <span><strong>Parent Visibility:</strong> Parents paying for premium lessons can view progress charts and hear audio snippets, providing full transparency without invading the student\'s personal practice area.</span>
              </li>
            </ul>
          </section>

          {/* Core Technical Highlights */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sax-gold" /> Core Technical Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Low-Latency Video Lessons</h4>
                <p className="text-xs text-slate-400">
                  Integrates the Daily.co WebRTC SDK configured with high-quality audio profiles specifically tuned for wind instruments, preventing default voice gates from cutting out saxophone notes.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Repertoire Progression Maps</h4>
                <p className="text-xs text-slate-400">
                  Maps Woodwind exercises (e.g. Rubank methods, Ferling etudes) to a relational database, tracking student achievements and automatically proposing new sheet music tasks.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Stripe Late-Cancel Automations</h4>
                <p className="text-xs text-slate-400">
                  Handles late cancellations and scheduling changes automatically via Stripe pre-authorizations, protecting the teacher\'s schedule without manual invoice chasing.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Playwright E2E Auditing</h4>
                <p className="text-xs text-slate-400">
                  Uses Playwright browser automation tests to verify scheduling calendar updates and audio upload scripts on simulated mobile and desktop screens.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Bottom Navigation */}
        <footer className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
          <Link href="/projects/bank-of-gaga" className="text-sm text-slate-400 hover:text-white transition-colors">
            &larr; Prev Project
          </Link>
          <Link href="/projects/truths-and-lies" className="text-sm text-sax-gold hover:text-white transition-colors font-medium flex items-center gap-1">
            Next Project: Truths & Lies &rarr;
          </Link>
        </footer>

      </div>
    </article>
  );
}
