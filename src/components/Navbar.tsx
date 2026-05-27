'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Cpu, Music, ExternalLink } from 'lucide-react';

const projects = [
  { name: 'Teach Weave', path: '/projects/teach-weave', desc: 'AI-Adaptive Teacher Marketplace' },
  { name: 'Bank of Gaga', path: '/projects/bank-of-gaga', desc: 'Family Loan Management SaaS' },
  { name: 'Teaching Sax', path: '/projects/teaching-sax', desc: 'Saxophone Studio & Teacher SaaS' },
  { name: 'Truths & Lies', path: '/projects/truths-and-lies', desc: 'AI Two Truths and a Lie Game' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-3 bg-deep-blue/80 backdrop-blur-md border-b border-white/5' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo / Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 group-hover:border-sax-gold/30 transition-colors">
                <Cpu className="w-4 h-4 text-tech-cyan absolute group-hover:opacity-0 transition-opacity duration-300" />
                <Music className="w-4 h-4 text-sax-gold absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="font-sans font-bold text-lg tracking-tight text-white group-hover:text-gradient-gold transition-all duration-300">
                James Burt
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/' ? 'text-sax-gold bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>

            {/* Projects Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`px-4 py-2 text-sm font-medium rounded-lg inline-flex items-center gap-1.5 transition-colors ${
                  pathname.startsWith('/projects') ? 'text-sax-gold bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Projects <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-64 rounded-xl border border-white/5 bg-deep-blue/95 backdrop-blur-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {projects.map((proj) => (
                    <Link
                      key={proj.name}
                      href={proj.path}
                      className="block px-4 py-2.5 hover:bg-white/5 transition-colors group"
                    >
                      <div className="text-sm font-semibold text-slate-100 group-hover:text-sax-gold transition-colors">{proj.name}</div>
                      <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors mt-0.5">{proj.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              href="/#services" 
              className="px-4 py-2 text-sm font-medium rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Services
            </Link>
            
            <Link 
              href="/#about" 
              className="px-4 py-2 text-sm font-medium rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              About
            </Link>

            <Link 
              href="https://www.linkedin.com/in/jamescburt/" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 text-sm font-medium rounded-lg text-slate-300 hover:text-white hover:bg-white/5 inline-flex items-center gap-1 transition-colors"
            >
              LinkedIn <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Link
              href="/#contact"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-sax-gold to-tech-cyan group-hover:from-sax-gold group-hover:to-tech-cyan hover:text-white focus:ring-2 focus:outline-none focus:ring-sax-gold-light/20 transition-all duration-300"
            >
              <span className="relative px-4 py-2.5 transition-all ease-in duration-75 bg-deep-blue rounded-md group-hover:bg-opacity-0">
                Get in Touch
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-5 w-5" /> : <Menu className="block h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 bg-deep-blue/95 border-b border-white/5 backdrop-blur-xl">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-white/5"
          >
            Home
          </Link>
          
          <div className="px-3 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Projects</div>
          {projects.map((proj) => (
            <Link
              key={proj.name}
              href={proj.path}
              onClick={() => setIsOpen(false)}
              className="block px-5 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5"
            >
              {proj.name}
            </Link>
          ))}
          
          <Link
            href="/#services"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-white/5"
          >
            Services
          </Link>
          
          <Link
            href="/#about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-white/5"
          >
            About
          </Link>

          <Link
            href="https://www.linkedin.com/in/jamescburt/"
            target="_blank"
            rel="noreferrer"
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-white/5"
          >
            LinkedIn
          </Link>

          <div className="pt-2 px-3">
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-sax-gold to-tech-cyan"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
