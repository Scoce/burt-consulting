import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ScreenshotShowcase from '@/components/ScreenshotShowcase';
import { ArrowLeft, Cpu, Heart, BrainCircuit, Trophy, Gamepad2, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Truths and Lies | Gemini AI Kids Game',
  description: 'How I built a two-truths-and-a-lie trivia game using Next.js and the Gemini API, designed collaboratively with my 8-year-old son.',
  alternates: {
    canonical: 'https://jamescburt.com/projects/truths-and-lies',
  },
};

export default function TruthsAndLiesProject() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Truths and Lies: AI Edition',
    'operatingSystem': 'Web',
    'applicationCategory': 'GameApplication',
    'description': 'A two-truths-and-a-lie trivia game powered by the Gemini API, built collaboratively to teach prompt engineering to an 8-year-old child.',
  };

  return (
    <article className="min-h-screen py-16 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tech-violet/5 rounded-full blur-3xl -z-10" />

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tech-violet/10 border border-tech-violet/20 text-xs font-semibold text-tech-violet">
            <BrainCircuit className="w-4 h-4" />
            Father &amp; Son Project
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Truths &amp; Lies: Building an AI Game with My 8-Year-Old Son
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            A dynamic two-truths-and-a-lie trivia game built with the Gemini API to teach prompt engineering—plus the unexpected challenge of classroom meme slang moderation.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-semibold flex items-center gap-2">
              Status: Active Family Project <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 text-xs font-semibold">
              Co-Creator: My 8-Year-Old Son
            </span>
          </div>
        </header>

        {/* Screenshot Showcase */}
        <ScreenshotShowcase 
          src="/images/truths-and-lies.png"
          alt="Truths and Lies Application Interface Screenshot"
          appName="Truths and Lies Interface"
          icon={<Gamepad2 className="w-12 h-12" />}
          iconColorClass="text-tech-violet/40"
        />

        {/* Tech Stack Bar */}
        <section className="glass-panel rounded-2xl p-6 border border-white/5 mb-12">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Project Tech Stack</h3>
          <div className="flex flex-wrap gap-2.5">
            {['Next.js 16', 'TypeScript', 'Gemini API', 'Neon Postgres', 'Tailwind CSS'].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Writeup Content */}
        <div className="space-y-12 text-slate-300 leading-relaxed text-base">
          
          {/* How It Started */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" /> How It Started
            </h2>
            <p>
              Instead of just letting my 8-year-old son play games on an iPad, I wanted to show him how software gets made. We decided to build a digital version of &ldquo;Two Truths and a Lie.&rdquo; He served as the creative director: choosing trivia categories (like Sports Stars, Marvel Movies, and Animal Facts), designing achievement badges, and testing early rounds.
            </p>
            <p>
              Rather than writing hundreds of trivia questions by hand, we hooked the game up to Google&apos;s Gemini API. Players choose a division (Kids, Teens, or Adults) and a category, and Gemini generates three plausible statements on the fly where exactly one is false.
            </p>
          </section>

          {/* Prompt Engineering & Classroom Lobbies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-tech-violet" /> Prompt Engineering &amp; School Smartboards
            </h2>
            <p>
              What started as a simple living-room experiment evolved into a classroom learning tool with a few hilarious engineering lessons along the way:
            </p>
            <ul className="space-y-3.5 pl-5 list-none">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-violet shrink-0 mt-0.5" />
                <span><strong>Teaching an 8-Year-Old How Prompts Work:</strong> We spent afternoons discovering how to structure system instructions. He quickly saw that if you aren&apos;t precise, the AI will cheat—either by making the lie absurdly obvious or by accidentally revealing the answer in the JSON output.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-violet shrink-0 mt-0.5" />
                <span><strong>Smartboard &amp; QR Code Live Contests:</strong> We built a classroom mode for teachers. An educator can project the statements on a Smartboard for group discussions, or launch a 15-second speed contest where students scan a QR code on their phones to lock in their guesses.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-violet shrink-0 mt-0.5" />
                <span><strong>The &ldquo;Brainrot&rdquo; Moderation Filter:</strong> As soon as we added live multiplayer lobbies, we ran into a real school problem: kids love disruptive nicknames. We had to build a dedicated safety pipeline using Gemini-2.5-flash to screen student lobby names in real time, specifically instructing the model to reject inappropriate words, meme numbers, and Gen Alpha slang (*skibidi*, *gyatt*, *rizzler*, *sigma*).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-violet shrink-0 mt-0.5" />
                <span><strong>Zero-Friction Guest Access:</strong> In a classroom setting, no teacher wants 25 students creating email accounts. We built an automatic guest session flow so kids can scan the QR code and jump straight into the game.</span>
              </li>
            </ul>
          </section>

          {/* Under the Hood */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-tech-violet" /> Under the Hood
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Strict JSON Prompting</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enforces strict JSON schema outputs from Gemini, cleanly separating statement text from the hidden lie index to prevent answer leaks on the client.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Real-Time AI Nickname Guard</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Screens student lobby submissions with a low-latency Gemini prompt tuned specifically to catch cuss-word evasions, crude numbers, and classroom meme slang.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Live Speed Leaderboards</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Calculates live scores based on both correctness and millisecond submission speed for high-energy classroom contest rounds.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Serverless Neon DB</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Stores live lobbies, user streaks, and unlocked badges in a serverless relational database with lightweight JWT session management.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Bottom Navigation */}
        <footer className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center text-center sm:text-left">
          <Link href="/projects/teaching-sax" className="text-sm text-slate-400 hover:text-white transition-colors">
            &larr; Prev Project: Teaching Sax
          </Link>
          <Link href="/" className="text-sm text-sax-gold hover:text-white transition-colors font-medium">
            Back to Portfolio Home &rarr;
          </Link>
        </footer>

      </div>
    </article>
  );
}
