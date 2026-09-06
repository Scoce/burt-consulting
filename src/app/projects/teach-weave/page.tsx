import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ScreenshotShowcase from '@/components/ScreenshotShowcase';
import { ArrowLeft, ExternalLink, GraduationCap, Cpu, Zap, LayoutGrid, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Teach Weave | K-12 AI Lesson Marketplace',
  description: 'How I built Teach Weave, a B2C SaaS marketplace for K-12 educators featuring AI-adaptive resources, state standards alignment, and LMS integrations.',
  alternates: {
    canonical: 'https://jamescburt.com/projects/teach-weave',
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
            Education Tech
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Teach Weave: A Teaching Resource Marketplace That Respects Teachers
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            An alternative to Teachers Pay Teachers built with fair creator economics (15% vs up to 45%), one-click listing migration, and sensibly scoped AI.
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
              Project Status: Live Prototype
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
          
          {/* Why I Built It */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-tech-cyan" /> Why I Built It
            </h2>
            <p>
              Teachers Pay Teachers (TPT) is the dominant marketplace for classroom resources, but almost every teacher who sells on it shares the same frustrations: the platform takes a steep cut (often 20% to 45%), search is cluttered with keyword-stuffed titles, and migrating an existing catalog anywhere else feels like an exhausting weekend of manual copying and pasting.
            </p>
            <p>
              I built Teach Weave to test what a marketplace looks like when it actually puts teachers first: keeping creator fees capped at a flat 15% via Stripe Connect, organizing search primarily by state standards (like TEKS, B.E.S.T., and Common Core), and building migration tooling so creators can bring their inventory over in an evening.
            </p>
          </section>

          {/* Where AI Helps vs Hurts */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-tech-cyan" /> Where AI Actually Helps (and Where It Doesn&apos;t)
            </h2>
            <p>
              A lot of modern tools slap &ldquo;AI&rdquo; on the cover as marketing hype. While building Teach Weave, we learned early on what was genuinely useful and what teachers hated:
            </p>
            <ul className="space-y-3.5 pl-5 list-none">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-cyan shrink-0 mt-0.5" />
                <span><strong>Keeping AI Scope Sensible:</strong> We initially tested letting AI rebuild entire worksheet layouts. In practice, teachers hated losing their visual formatting and hand-designed structures. We pulled that back and narrowed AI strictly to reading-level adjustments and language translations, keeping it as an opt-in toggle so creators retain full control.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-cyan shrink-0 mt-0.5" />
                <span><strong>TPT 1-Click URL Import:</strong> The biggest friction for creators is retyping titles and descriptions. With Teach Weave, creators just paste their existing TPT product URL. The server automatically pulls title and description metadata and pre-fills the upload form in seconds.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-cyan shrink-0 mt-0.5" />
                <span><strong>Multi-Document Bundles &amp; Watermarked ZIPs:</strong> Real classroom units include multiple files—lesson plans, worksheets, and answer keys. The system compiles multi-file uploads, stamps PDFs with per-buyer watermarks, and streams them as a clean ZIP package.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-cyan shrink-0 mt-0.5" />
                <span><strong>Google Classroom Draft Push:</strong> Instead of downloading files and manually re-uploading them to Google, teachers push resources straight to their Classroom courses—landing as a draft assignment so they can verify due dates and points before students see it.</span>
              </li>
            </ul>
          </section>

          {/* Technical Details */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-tech-cyan" /> Practical Architecture Choices
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Metadata Scraper Engine</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fetches listing metadata server-side, cleans URL tracking tags, and resolves fallbacks so creators can import their existing catalog without retyping hours of copy.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Decoupled Google OAuth Flow</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Isolates Google Classroom scopes from standard login. Normal users never see intrusive permission screens, and Drive access is scoped strictly to files created by the application.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Forensic PDF Watermarking</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Programmatically stamps buyer identifiers onto each PDF page before download streaming, creating clear provenance to discourage unauthorized public re-sharing.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Standards-First Search Graph</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every resource is linked to state-specific standards frameworks (Common Core, TEKS, NGSS), allowing teachers to search directly by code rather than wading through keyword spam.
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
