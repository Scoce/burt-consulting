'use client';

import React from 'react';
import Link from 'next/link';
import { Linkedin, Github, Cpu, Music, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-blue border-t border-white/5 py-12 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-radial from-sax-gold/5 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-radial from-tech-cyan/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo & Headline */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10">
                <Cpu className="w-3.5 h-3.5 text-tech-cyan" />
              </div>
              <span className="font-sans font-bold text-base tracking-tight text-white">
                James Burt
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Technologist, music educator, and software builder based in San Antonio, TX. Helping businesses and individuals build AI-driven workflows.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Navigations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-sax-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#services" className="text-sm text-slate-400 hover:text-sax-gold transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/#about" className="text-sm text-slate-400 hover:text-sax-gold transition-colors">About Me</Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-slate-400 hover:text-sax-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Connect</h3>
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.linkedin.com/in/jamescburt/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-sax-gold hover:border-sax-gold/30 hover:bg-white/10 transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-sax-gold hover:border-sax-gold/30 hover:bg-white/10 transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-slate-500">
              Direct inquiries route securely via Resend server functions.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Burt Consulting. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> and AI in San Antonio, Texas.
          </p>
        </div>
      </div>
    </footer>
  );
}
