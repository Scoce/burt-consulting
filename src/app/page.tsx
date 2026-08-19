'use client';

import React from 'react';
import Link from 'next/link';
import DualityHero from '@/components/DualityHero';
import ContactForm from '@/components/ContactForm';
import { 
  Cpu, 
  Music, 
  Sparkles, 
  ArrowUpRight, 
  PiggyBank, 
  GraduationCap, 
  Gamepad2, 
  Code2, 
  Coins, 
  Workflow, 
  Layers 
} from 'lucide-react';

const projects = [
  {
    title: 'Teach Weave',
    subtitle: 'K-12 AI-Adaptive Lesson Marketplace',
    desc: 'A modern alternative to Teachers Pay Teachers. It uses AI to adapt resources (like reading levels or languages) on the fly and maps them to state compliance standards.',
    icon: <GraduationCap className="w-6 h-6 text-tech-cyan" />,
    path: '/projects/teach-weave',
    liveUrl: 'https://teachweave.com',
    tech: ['Next.js 15', 'Drizzle', 'Inngest', 'Stripe Connect', 'Vercel AI SDK']
  },
  {
    title: 'Bank of Gaga',
    subtitle: 'Informal Family Loan Tracker',
    desc: 'A friendly app that replaces awkward family loan spreadsheets. Lenders get formal loan contracts and automated timelines, while kids learn investing with simulated cash.',
    icon: <PiggyBank className="w-6 h-6 text-sax-gold" />,
    path: '/projects/bank-of-gaga',
    liveUrl: 'https://bankofgaga.com',
    tech: ['Next.js 15', 'NextAuth', 'Drizzle', 'Supabase Postgres', 'Stripe']
  },
  {
    title: 'Teaching Sax',
    subtitle: 'Wind Studio Management Software',
    desc: 'A custom teaching tool built when I restarted my virtual saxophone studio. It tracks student practice, handles scheduling, and features a low-latency video player tuned for music lessons.',
    icon: <Music className="w-6 h-6 text-sax-gold" />,
    path: '/projects/teaching-sax',
    liveUrl: 'https://teachingsax.com',
    tech: ['Next.js 16', 'TypeScript', 'Drizzle ORM', 'Stripe Payments', 'Postgres']
  },
  {
    title: 'Truths & Lies: AI Edition',
    subtitle: 'Kids Prompt Engineering Game',
    desc: 'An AI-powered trivia game I built with my 8-year-old son to teach him prompt engineering. It uses Gemini to create fun, age-friendly categories on the fly.',
    icon: <Gamepad2 className="w-6 h-6 text-tech-violet" />,
    path: '/projects/truths-and-lies',
    liveUrl: '#',
    tech: ['Next.js 16', 'Gemini API', 'Serverless DB', 'Tailwind CSS']
  }
];

const services = [
  {
    title: 'AI Workflow Integration',
    desc: 'Building custom AI workflows—like automatic content adaptation and background document checkups—to automate repetitive tasks and remove software friction.',
    icon: <Workflow className="w-5 h-5 text-tech-cyan" />
  },
  {
    title: 'Full-Stack SaaS Development',
    desc: 'Designing and building clean, modern web applications from scratch, leveraging Next.js, Neon Serverless Postgres, and Stripe integrations.',
    icon: <Code2 className="w-5 h-5 text-tech-violet" />
  },
  {
    title: 'Payments & Subscriptions Strategy',
    desc: 'Architecting robust billing systems, subscription models, payment processing pipelines, and Stripe Connect multi-party payouts.',
    icon: <Coins className="w-5 h-5 text-sax-gold" />
  },
  {
    title: 'Solutions Engineering & Architecture',
    desc: 'Leading and scaling pre-sales solutions engineering teams, mapping technical architectures, and designing sales engineering strategies.',
    icon: <Layers className="w-5 h-5 text-slate-400" />
  }
];

export default function Home() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'James Burt',
    'url': 'https://jamescburt.com',
    'jobTitle': 'Technologist & Software Builder',
    'description': '17-year B2B SaaS industry veteran, solutions engineering leader, woodwind educator, and software builder based in San Antonio, TX.',
    'sameAs': [
      'https://www.linkedin.com/in/jamescburt/'
    ],
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'San Antonio',
      'addressRegion': 'TX',
      'addressCountry': 'US'
    }
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      
      {/* Hero Section */}
      <DualityHero />

      {/* Services Section */}
      <section id="expertise" className="py-20 bg-deep-blue/40 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Areas of Focus & Expertise
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Applying the precision of a classical musician and the experience of a B2B tech veteran to designing, building, and deploying high-performance software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 flex gap-4 items-start"
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-white/5 border border-white/10">
                  {service.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">{service.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section id="projects" className="py-20 relative">
        {/* Subtle radial backdrop highlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-radial from-sax-gold/5 via-tech-violet/5 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              A look at actual applications I've built for personal passions and commercial validation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <div 
                key={proj.title}
                className="group glass-panel rounded-3xl p-6 sm:p-8 border border-white/5 hover:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon & Title */}
                  <div className="flex items-start justify-between">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      {proj.icon}
                    </div>
                    <Link
                      href={proj.path}
                      className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg bg-white/5 border border-white/10 inline-flex items-center gap-1 text-xs font-medium"
                      aria-label={`Read case study for ${proj.title}`}
                    >
                      Read Story <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  
                  {/* Text copy */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-sax-gold transition-colors">{proj.title}</h3>
                    <p className="text-xs font-semibold text-gradient-tech">{proj.subtitle}</p>
                  </div>
                  
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {proj.desc}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-400 text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-deep-blue/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/5 relative overflow-hidden">
            {/* Radial background highlight */}
            <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-sax-gold/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
              <div className="lg:col-span-1 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sax-gold/10 border border-sax-gold/20 text-xs font-semibold text-sax-gold">
                  <Cpu className="w-3 h-3" />
                  My Story
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  About the Builder
                </h2>
                <div className="w-20 h-1 bg-sax-gold rounded-full" />
              </div>
              
              <div className="lg:col-span-2 space-y-6 text-slate-300 text-sm leading-relaxed">
                <p>
                  I've spent the last <strong>17 years building, scaling, and supporting SaaS products</strong>. My experience spans everything from sales engineering and product management to sysadmin and managing pre-sales solutions consulting teams. I've had the chance to work across diverse fields including subscription billing, embedded payment systems, cybersecurity awareness, video surveillance, and hosting infrastructure.
                </p>
                <p>
                  But before my detour into the tech world, my training was in classical music. I hold a <strong>music education degree</strong> and served as a high school and middle school band director (my primary instrument is the saxophone). In many ways, building software feels just like teaching music: you're analyzing complex, micro-level processes, finding the cleanest path forward, and automating structures so that students—or users—can succeed without hitting unnecessary friction.
                </p>
                <p>
                  Now based in San Antonio, Texas, I focus on building personal software projects, experimenting with new AI workflows, and applying my pre-sales engineering background to everything I create.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tech-cyan/10 border border-tech-cyan/20 text-xs font-semibold text-tech-cyan">
              <Sparkles className="w-3 h-3" />
              {"Let's Connect"}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Let's Connect
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Have a question about one of my projects, want to talk software architecture, or see some way we can work together? Send a message below.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

    </div>
  );
}
