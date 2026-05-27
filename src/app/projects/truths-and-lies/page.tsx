import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Cpu, Heart, BrainCircuit, Trophy, Award, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Truths and Lies: AI Edition Case Study | Prompt Engineering',
  description: 'Read the case study of Truths and Lies, an AI-powered trivia game built using Next.js and the Gemini API, designed collaboratively with the founder\'s 8-year-old son.',
  alternates: {
    canonical: 'https://burtconsulting.com/projects/truths-and-lies',
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
      {/* Inject JSON-LD */}
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
        <header className="space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tech-violet/10 border border-tech-violet/20 text-xs font-semibold text-tech-violet">
            <BrainCircuit className="w-4 h-4" />
            AI & EdTech Collaboration
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Truths & Lies: Teaching AI to Kids
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            An AI-powered Two Truths and a Lie game built in collaboration with the founder\'s 8-year-old son to teach the fundamentals of prompt engineering.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-semibold flex items-center gap-2">
              Status: Active Personal Project <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 text-xs font-semibold">
              Co-Creator: My 8-Year-Old Son
            </span>
          </div>
        </header>

        {/* Tech Stack Bar */}
        <section className="glass-panel rounded-2xl p-6 border border-white/5 mb-12">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Project Tech Stack</h3>
          <div className="flex flex-wrap gap-2.5">
            {['Next.js 16', 'TypeScript', 'Gemini API', 'Node Postgres', 'Neon Serverless', 'Lucide Icons', 'Tailwind CSS'].map((tech) => (
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
              <Cpu className="w-5 h-5 text-tech-violet" /> What We Built
            </h2>
            <p>
              <strong>Truths and Lies: AI Edition</strong> is an interactive web-based trivia game where users guess the lie among three statements about historical figures, sports legends, pop culture stars, and cartoon characters. 
            </p>
            <p>
              Under the hood, the game connects to the <strong>Google Gemini API</strong>. Rather than using pre-baked databases of questions, the game queries Gemini dynamically to generate two truths and a lie based on the player\'s age group and selected category (Sports, Movies, Science, History, or Music).
            </p>
          </section>

          {/* Why We Built It */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" /> Why We Built It & The Differentiator
            </h2>
            <p>
              The primary driver behind this app was family education. I wanted to teach my 8-year-old son the fundamentals of programming and prompt engineering. He drove the main concept—choosing the categories, deciding on the "Hall of Fame" leaderboard, and defining how the badges should look.
            </p>
            <p>
              Through this project, he learned:
            </p>
            <ul className="space-y-3.5 pl-5 list-none">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-violet shrink-0 mt-0.5" />
                <span><strong>AI Structuring:</strong> How to write prompts that instruct the LLM to output structured JSON data containing exactly one lie and two truths without revealing the answer in the body.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-violet shrink-0 mt-0.5" />
                <span><strong>Context Scoping:</strong> Adjusting system instructions based on age buckets (e.g. asking Gemini for kid-friendly concepts like Taylor Swift or Superheroes for Children, and deep history for Adults).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-tech-violet shrink-0 mt-0.5" />
                <span><strong>Gamification Design:</strong> Designing database tables to track user scores, award achievement badges (such as "Sports Whiz" or "Night Owl"), and maintain monthly leaderboards.</span>
              </li>
            </ul>
          </section>

          {/* Core Technical Highlights */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-tech-violet" /> Core Technical Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Dynamic Gemini Prompting</h4>
                <p className="text-xs text-slate-400">
                  Sends parameterized payloads specifying age-ranges and categories to Gemini, enforcing JSON output structures to allow the front-end to render options without exposing the correct answer.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Division Leaderboards</h4>
                <p className="text-xs text-slate-400">
                  Splits the Hall of Fame scoreboard automatically into separate buckets: Children (under 12), Teens (12-17), and Adults (18+), ensuring fair competition.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Offline Mock Fallback</h4>
                <p className="text-xs text-slate-400">
                  Implements an in-memory SQL query router simulating users, games, sessions, and achievements tables so developers can test the application without online server setups.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">Badge Award Systems</h4>
                <p className="text-xs text-slate-400">
                  Triggers SQL database upserts after games to verify if unlock criteria are satisfied (e.g. playing at midnight, getting a 5-question streak), storing results in a user achievements table.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Bottom Navigation */}
        <footer className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
          <Link href="/projects/teaching-sax" className="text-sm text-slate-400 hover:text-white transition-colors">
            &larr; Prev Project
          </Link>
          <Link href="/" className="text-sm text-sax-gold hover:text-white transition-colors font-medium">
            Back to Portfolio Home &rarr;
          </Link>
        </footer>

      </div>
    </article>
  );
}
