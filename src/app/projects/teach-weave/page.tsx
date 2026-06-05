import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ScreenshotShowcase from '@/components/ScreenshotShowcase';
import { ArrowLeft, ExternalLink, GraduationCap, Cpu, Zap, LayoutGrid, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Teach Weave | K-12 AI Lesson Marketplace',
  description: 'How I built Teach Weave, a B2C SaaS marketplace for K-12 educators featuring AI-adaptive resources, state standards alignment, and LMS integrations.',
  alternates: {
    canonical: 'https://burtconsulting.com/projects/teach-weave',
  },
};

export default function TeachWeaveProject() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Teach Weave',
    'operatingSystem': 'Web',
    'applicationCategory': 'EducationalApplication',
    'description': 'A B2C marketplace SaaS for K-12 teachers featuring AI-adaptive resources, state standards alignment, and Google Classroom push integration.',
  };

  return (
    <article className="min-h-screen py-16 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tech-cyan/5 rounded-full blur-3xl -z-10" />

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tech-cyan/10 border border-tech-cyan/20 text-xs font-semibold text-tech-cyan">
            <GraduationCap className="w-4 h-4" />
            Education Technology SaaS
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Teach Weave: Homework That Adapts to Every Kid
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            A modern SaaS marketplace for K-12 teachers. Upload once, and let AI translate lessons to different reading levels, languages, and accessibility needs in one click.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="https://teachweave.com" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-tech-cyan to-tech-violet hover:from-tech-cyan/90 hover:to-tech-violet/90 text-white font-semibold shadow-md flex items-center gap-2 transition-all duration-300"
            >
              Visit Live App <ExternalLink className="w-4 h-4" />
            </a>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 text-xs font-semibold">
              Project Type: Commercial SaaS Prototype
            </span>
          </div>
        </header>

        {/* Screenshot Showcase */}
        <ScreenshotShowcase 
          src="/images/teach-weave.png"
          alt="Teach Weave Application Dashboard Screenshot"
          appName="Teach Weave Dashboard"
          icon={<Cpu className="w-12 h-12" />}
          iconColorClass="text-tech-cyan/40"
        />

        {/* Tech Stack Bar */}
        <section className="glass-panel rounded-2xl p-6 border border-white/5 mb-12">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Project Tech Stack</h3>
          <div className="flex flex-wrap gap-2.5">
            {['Next.js 15', 'TypeScript', 'Supabase Auth', 'Drizzle ORM', 'Supabase Postgres', 'Stripe Connect', 'Inngest', 'Resend', 'Vercel AI SDK', 'Tailwind CSS'].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Writeup Content */}
        <div className="space-y-12 text-slate-300 leading-relaxed text-base">
          
          {/* What We Built */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-tech-cyan" /> What I Built
            </h2>
            <p>
              Teach Weave is a full-featured lesson plan marketplace. Think of it like a next-generation alternative to Teachers Pay Teachers. It allows educators to buy and sell classroom materials, but with a massive technical upgrade: **dynamic, AI-powered document adaptation**.
            </p>
            <p>
              Under the hood, I integrated a background job queue using **Inngest** and the **Vercel AI SDK**. When a lesson is uploaded, background workers analyze the content, verify state standards, and prepare it so buyers can customize the material instantly.
            </p>
          </section>

          {/* Why I Built It */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-tech-cyan" /> The Problem & The Solution
            </h2>
            <p>
              Every student learns differently. In a single class, a teacher might have kids reading at a 3rd-grade level, some reading at a 6th-grade level, and others who need Spanish translations or extra step-by-step guides. Traditionally, teachers spent hours manually creating these variants.
            </p>
            <p>
              Teach Weave changes that completely:
            </p>
            <ul className="space-y-3.5 pl-5 list-none">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-cyan shrink-0 mt-0.5" />
                <span><strong>AI-Adaptive Customization:</strong> Buyers click a slider to change the reading level, swap languages, or adjust content length on demand, dynamically compiling a customized document.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-cyan shrink-0 mt-0.5" />
                <span><strong>Compliance Checked Automatically:</strong> We map every document automatically to state-specific standards (like Common Core or TEKS) using automated text analysis at upload.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-cyan shrink-0 mt-0.5" />
                <span><strong>Fair Platform Economics:</strong> Traditional sites take up to 45% of teacher sales. Teach Weave keeps fees at just 15%, routing payouts directly via Stripe Connect.</span>
              </li>
            </ul>
          </section>

          {/* Technical Details */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-tech-cyan" /> Cool Tech Under the Hood
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Dynamic Adaptation Pipeline</h4>
                <p className="text-xs text-slate-400">
                  Processes and cleans documents using customized system prompts, then caches modified assets in Supabase storage to make subsequent downloads instantaneous.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Standards Graph Parser</h4>
                <p className="text-xs text-slate-400">
                  Matches text indices against a hierarchical standards database using fuzzy-match prompts to tag files accurately without manual labor.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Secure RLS Isolation</h4>
                <p className="text-xs text-slate-400">
                  Postgres Row-Level Security ensures that purchase tables dictate download access keys, protecting content files from direct URLs.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Google Classroom Sync</h4>
                <p className="text-xs text-slate-400">
                  Pushes adapted files directly to the Google Classroom SDK, making distribution to students instant for the buying teacher.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Bottom Navigation */}
        <footer className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center text-center sm:text-left">
          <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
            &larr; Back to Portfolio
          </Link>
          <Link href="/projects/bank-of-gaga" className="text-sm text-sax-gold hover:text-white transition-colors font-medium flex items-center gap-1">
            Next Project: Bank of Gaga &rarr;
          </Link>
        </footer>

      </div>
    </article>
  );
}
