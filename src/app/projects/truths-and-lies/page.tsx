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
            AI & Family Collaboration
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Truths & Lies: Teaching AI to My Son
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            An AI-powered trivia game I built with my 8-year-old son to teach him prompt engineering. Powered dynamically by the Google Gemini API.
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
            {['Next.js 16', 'TypeScript', 'Gemini API', 'Node Postgres', 'Neon Serverless', 'Tailwind CSS'].map((tech) => (
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
              <Cpu className="w-5 h-5 text-tech-violet" /> What We Built
            </h2>
            <p>
              Truths and Lies is an interactive two-truths-and-a-lie trivia game. Instead of relying on a pre-written database of questions, the game connects to the **Google Gemini API** to generate trivia dynamically. 
            </p>
            <p>
              Players select a division (Children, Teens, or Adults) and a category (like Sports, Movies, Science, History, or Music), and Gemini instantly cooks up three facts where exactly one is a lie. The challenge is to find the lie without clicking a truth!
            </p>
          </section>

          {/* Why We Built It */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" /> Coding as a Family
            </h2>
            <p>
              This app started as a fun, educational way to teach my 8-year-old son how programming and AI work. He came up with the core ideas—choosing categories like Sports Stars and Movies, setting up a Hall of Fame leaderboard, and designing how the badges should look.
            </p>
            <p>
              Together, we expanded the solo game into a real-time classroom multiplayer experience:
            </p>
            <ul className="space-y-3.5 pl-5 list-none">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-violet shrink-0 mt-0.5" />
                <span><strong>Writing System Instructions:</strong> Learning how to prompt Gemini so that it instructs the LLM to output structured JSON data containing exactly one lie, without giving away which index is correct.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-violet shrink-0 mt-0.5" />
                <span><strong>Smartboard & Live Contest Suite:</strong> Designed for teachers to project educational warm-ups on a Smartboard or run 15-second speed contests where students scan a QR code to answer on their own devices.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-violet shrink-0 mt-0.5" />
                <span><strong>AI-Assisted Nickname Moderation:</strong> A safety pipeline using Gemini-2.5-flash to screen student lobby names in real time, automatically blocking profanity, crude numbers, and Gen Alpha brainrot slang (like *skibidi* or *gyatt*).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-violet shrink-0 mt-0.5" />
                <span><strong>Zero-Friction Guest Mode:</strong> Automatically creates mock sessions on landing, letting users jump straight into gameplay without completing email registrations.</span>
              </li>
            </ul>
          </section>

          {/* Tech details */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-tech-violet" /> Under the Hood
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Dynamic Gemini Prompting</h4>
                <p className="text-xs text-slate-400">
                  Calls Gemini dynamically using system instructions to enforce JSON returns, separating content delivery from validation checks.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">AI Classroom safety</h4>
                <p className="text-xs text-slate-400">
                  Uses strict K-12 moderator system instructions with JSON response schemas to identify cuss evasions, inappropriate numbers, and meme slang.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Live Lobby speed leaderboard</h4>
                <p className="text-xs text-slate-400">
                  Provides a real-time lobby where answers submitted via mobile devices calculate score metrics based on response speed.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Neon Serverless DB</h4>
                <p className="text-xs text-slate-400">
                  Stores live lobbies, user profiles, streaks, and unlocked badges in a scalable relational database with Jose-backed JWT auth tokens.
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
