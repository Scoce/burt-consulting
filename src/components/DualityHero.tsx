'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Cpu, Music, ArrowRight, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export default function DualityHero() {
  const [track, setTrack] = useState<'tech' | 'music'>('tech');

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-in-out -z-20 ${
          track === 'tech' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tech-cyan/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-violet/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-in-out -z-20 ${
          track === 'music' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-sax-gold/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 -z-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/10 via-deep-blue to-deep-blue -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Track Selector Toggle */}
        <div className="inline-flex p-1.5 rounded-2xl glass-panel border border-white/10 mb-8 md:mb-12 shadow-2xl scale-95 sm:scale-100">
          <button
            id="toggle-track-tech"
            onClick={() => setTrack('tech')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all-300 ${
              track === 'tech'
                ? 'bg-gradient-to-r from-tech-cyan to-tech-violet text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Software & Tech
          </button>
          <button
            id="toggle-track-music"
            onClick={() => setTrack('music')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all-300 ${
              track === 'music'
                ? 'bg-gradient-to-r from-sax-gold to-amber-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Music className="w-4 h-4" />
            Music & Teaching
          </button>
        </div>

        {/* Dynamic Content Layout */}
        <div className="max-w-4xl mx-auto">
          {track === 'tech' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tech-cyan/10 border border-tech-cyan/20 text-xs font-semibold text-tech-cyan">
                <Sparkles className="w-3 h-3" />
                Builder & Tinkerer
              </div>
              
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Building software I actually use, <br />
                <span className="text-gradient-tech">tinkering with AI along the way.</span>
              </h1>
              
              {/* Supporting Copy */}
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                I&apos;ve spent 17 years working in B2B SaaS—mostly around payments, subscription billing, and systems architecture. These days, I spend my free time building tools that solve real problems and exploring practical uses for LLMs.
              </p>

              {/* Highlight Bullets */}
              <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-sm text-slate-400 py-4 max-w-lg sm:max-w-xl mx-auto">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-tech-cyan" /> 17 Years in B2B SaaS
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-tech-cyan" /> Billing & Payment Systems
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-tech-cyan" /> Practical AI Tools
                </span>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  id="cta-tech-projects"
                  href="#projects"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-tech-cyan to-tech-violet hover:from-tech-cyan/90 hover:to-tech-violet/90 text-white font-semibold shadow-lg hover:shadow-tech-cyan/10 transition-all duration-300 inline-flex items-center justify-center gap-2 group"
                >
                  Explore the Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  id="cta-tech-contact"
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold transition-all duration-300 inline-flex items-center justify-center"
                >
                  Say Hello
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sax-gold/10 border border-sax-gold/20 text-xs font-semibold text-sax-gold">
                <Music className="w-3 h-3" />
                Music Education & Woodwinds
              </div>
              
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Former band director <br />
                <span className="text-gradient-gold">building tools for real music studios.</span>
              </h1>
              
              {/* Supporting Copy */}
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                Before my tech career, I taught middle and high school band. My instrument is the saxophone. Now I&apos;m combining both backgrounds—running a private virtual studio and building software designed for how music lessons actually run.
              </p>

              {/* Highlight Bullets */}
              <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-sm text-slate-400 py-4 max-w-lg sm:max-w-xl mx-auto">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sax-gold" /> Music Education Background
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sax-gold" /> Active Saxophone Studio
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sax-gold" /> Pedagogy-First Software
                </span>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  id="cta-music-project"
                  href="/projects/teaching-sax"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-sax-gold to-amber-600 hover:from-sax-gold/90 hover:to-amber-600/90 text-white font-semibold shadow-lg hover:shadow-sax-gold/10 transition-all duration-300 inline-flex items-center justify-center gap-2 group"
                >
                  See Teaching Sax <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  id="cta-music-contact"
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold transition-all duration-300 inline-flex items-center justify-center"
                >
                  Say Hello
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
