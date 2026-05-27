import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink, GraduationCap, Cpu, Zap, LayoutGrid, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Teach Weave Case Study | K-12 AI Lesson Marketplace',
  description: 'Learn about Teach Weave, a B2C SaaS marketplace for K-12 educators featuring AI-adaptive resources, state standards alignment, and LMS integrations.',
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
    'offers': {
      '@type': 'Offer',
      'price': '0',
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
        <header className="space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tech-cyan/10 border border-tech-cyan/20 text-xs font-semibold text-tech-cyan">
            <GraduationCap className="w-4 h-4" />
            Education Technology SaaS
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Teach Weave: AI-Adaptive Lesson Marketplace
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            A high-performance SaaS marketplace enabling K-12 educators to publish, adapt, and align resources to state standards dynamically.
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
              Role: Architect & Sole Developer
            </span>
          </div>
        </header>

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
          
          {/* What I Built */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-tech-cyan" /> What I Built
            </h2>
            <p>
              <strong>Teach Weave</strong> (originally scaffolded as <em>Teachstack</em>) is a complete B2C marketplace SaaS designed specifically for school teachers. The application provides an elegant, fast-loading marketplace interface where educators can upload educational content (lesson plan files, PDFs, etc.) and purchase content from peers.
            </p>
            <p>
              The platform incorporates three distinct serverless AI engines powered by the Vercel AI SDK (with Claude/OpenAI integration) running on background workers managed by <strong>Inngest</strong>. These background workers run checks at upload, verify licensure credentials, and dynamically adapt lessons on-demand.
            </p>
          </section>

          {/* Why I Built It */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-tech-cyan" /> Why I Built It & The Value Proposition
            </h2>
            <p>
              K-12 educators spend hours modifying resources for diverse classroom needs. In the traditional marketplace (like Teachers Pay Teachers), teachers must manually format files for different reading levels, languages, and accessibility requirements.
            </p>
            <p>
              Teach Weave completely disrupts this flow through its value propositions:
            </p>
            <ul className="space-y-3.5 pl-5 list-none">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-cyan shrink-0 mt-0.5" />
                <span><strong>AI-Adaptive Resources:</strong> Creators upload a single resource template, and buyers can generate variations matching specific reading levels, secondary languages, scaffolding needs, or lengths on demand.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-cyan shrink-0 mt-0.5" />
                <span><strong>Standards-First Search:</strong> A custom-mapped relational standards graph cover frameworks such as Common Core, TEKS, and B.E.S.T., ensuring lessons strictly match state compliance demands.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-cyan shrink-0 mt-0.5" />
                <span><strong>Creator-Centric Economics:</strong> Lower platform fees (15% vs TPT\'s 20-45%) keep more revenue with teachers. It utilizes Stripe Connect Express accounts to handle instant compliance, onboarding, and payouts.</span>
              </li>
            </ul>
          </section>

          {/* Technical Architecture Deep Dive */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-tech-cyan" /> Technical Differentiators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Content Adaptation Engine</h4>
                <p className="text-xs text-slate-400">
                  Runs localized LLM prompting structures in serverless routes to take parent resource uploads and adapt them dynamically, caching results to minimize latency.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Standards Alignment Worker</h4>
                <p className="text-xs text-slate-400">
                  Uses an Inngest background queue to analyze file texts at upload, verify licensing compliance, and automatically map educational codes.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Supabase RLS Gating</h4>
                <p className="text-xs text-slate-400">
                  Leverages Postgres Row-Level Security policies combined with Drizzle ORM queries, securing buyer library downloads directly at the database layer.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">LMS Classroom Push</h4>
                <p className="text-xs text-slate-400">
                  Enables teachers to immediately push purchased resources and their adapted variants to student classrooms with a single click.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Bottom Navigation */}
        <footer className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
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
