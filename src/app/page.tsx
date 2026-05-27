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
    desc: 'An alternative to Teachers Pay Teachers offering AI-adaptive resources, state standards alignment, and direct Google Classroom pushes.',
    icon: <GraduationCap className="w-6 h-6 text-tech-cyan" />,
    path: '/projects/teach-weave',
    liveUrl: 'https://teachweave.com',
    tech: ['Next.js 15', 'Drizzle', 'Inngest', 'Stripe Connect', 'Vercel AI SDK']
  },
  {
    title: 'Bank of Gaga',
    subtitle: 'Informal Family Loan Tracker',
    desc: 'A family loan manager replacing spreadsheets. Lenders create loan agreements and automated payment plans, while kids learn investing.',
    icon: <PiggyBank className="w-6 h-6 text-sax-gold" />,
    path: '/projects/bank-of-gaga',
    liveUrl: 'https://bankofgaga.com',
    tech: ['Next.js 15', 'NextAuth', 'Drizzle', 'Supabase Postgres', 'Stripe']
  },
  {
    title: 'Teaching Sax',
    subtitle: 'Wind Studio Management Software',
    desc: 'Management software for woodwind teachers, featuring student progression mapping, practice assignments, and progress audio recording.',
    icon: <Music className="w-6 h-6 text-sax-gold" />,
    path: '/projects/teaching-sax',
    liveUrl: 'https://teachingsax.com',
    tech: ['Next.js 16', 'TypeScript', 'Drizzle ORM', 'Stripe Payments', 'Postgres']
  },
  {
    title: 'Truths & Lies: AI Edition',
    subtitle: 'Kids Prompt Engineering Game',
    desc: 'A trivia game powered by the Gemini API, built collaboratively to teach prompt engineering to the founder\'s 8-year-old son.',
    icon: <Gamepad2 className="w-6 h-6 text-tech-violet" />,
    path: '/projects/truths-and-lies',
    liveUrl: '#',
    tech: ['Next.js 16', 'Gemini API', 'Serverless DB', 'Tailwind CSS']
  }
];

const services = [
  {
    title: 'AI Workflow Audits & Integration',
    desc: 'Help organizations analyze administrative friction and design custom LLM automations—from content adapting to background standards mapping.',
    icon: <Workflow className="w-5 h-5 text-tech-cyan" />
  },
  {
    title: 'SaaS Architecture & Custom Building',
    desc: 'Develop modern full-stack systems using Next.js 16, Neon Serverless Postgres, and Stripe subscriptions or Connect payouts.',
    icon: <Code2 className="w-5 h-5 text-tech-violet" />
  },
  {
    title: 'Subscription Billing & Payments Strategy',
    desc: 'Leverage deep experience in payment networks, Stripe billing integration, and merchant acquiring to build robust recurring monetization models.',
    icon: <Coins className="w-5 h-5 text-sax-gold" />
  },
  {
    title: 'Solutions Consulting & Sales Alignment',
    desc: 'Consulting on building and scaling pre-sales solutions engineering teams, mapping technical architectures, and executing enterprise sales.',
    icon: <Layers className="w-5 h-5 text-slate-400" />
  }
];

export default function Home() {
  return (
    <div className="relative">
      
      {/* Hero Section */}
      <DualityHero />

      {/* Services Section */}
      <section id="services" className="py-20 bg-deep-blue/40 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Strategy & Full-Stack Execution
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Applying the precision of a classical musician and the experience of a B2B tech veteran to help you design, build, and deploy high-performance software.
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
              Featured Case Studies
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Detailed write-ups of actual applications developed for personal passions and commercial validation.
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
                      Case Study <ArrowUpRight className="w-3.5 h-3.5" />
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
                  James Burt Biography
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  About the Builder
                </h2>
                <div className="w-20 h-1 bg-sax-gold rounded-full" />
              </div>
              
              <div className="lg:col-span-2 space-y-6 text-slate-300 text-sm leading-relaxed">
                <p>
                  I have spent the last <strong>17 years working in the technology sector</strong> across sales engineering, solutions consulting, product management, sysadmin, and technical support. Currently, I serve as the Manager of Solutions Consulting at Global Payments. My career spans subscription billing (Chargify, Maxio), embedded payment processing (Worldpay, Payrix), enterprise security training (Inspired eLearning), video surveillance (Pro-Vigil), and network hosting infrastructures (Peer 1).
                </p>
                <p>
                  However, before transitioning to tech, my training was in classical music. I hold a <strong>music education degree</strong> and served as a high school and middle school band director. My primary instrument is the saxophone. In many ways, building software is a return to that instructional mindset: analyzing complex, micro-level processes, finding the optimal pedagogic path, and automating structures so that students—or SaaS creators—can execute without unnecessary friction.
                </p>
                <p>
                  Now based in San Antonio, Texas, I use my unique background to help organizations integrate AI workflows into their businesses, build lifestyle SaaS tools that make lives easier, and coach pre-sales engineering teams to perform at their absolute best.
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
              Let\'s Connect
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Start Integrating AI Today
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              If you want to discuss custom SaaS projects, billing integrations, or how your organization can start automating tasks using AI, send an inquiry below.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

    </div>
  );
}
