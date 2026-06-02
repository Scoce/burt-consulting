'use client';

import React, { useState } from 'react';
import { Mail, User, Building, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit contact request. Please try again.');
      } else {
        setStatus('success');
        setName('');
        setEmail('');
        setCompany('');
        setMessage('');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('A network error occurred. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="glass-panel border border-sax-gold/20 p-8 sm:p-12 rounded-3xl text-center space-y-6 max-w-xl mx-auto shadow-xl animate-in zoom-in-95 duration-500">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sax-gold/10 text-sax-gold">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
          <p className="text-slate-300 leading-relaxed text-sm">
            Thank you for reaching out, James. Your inquiry has been routed securely. I will check my inbox and get back to you shortly.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-colors text-sm"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl relative">
      <div className="absolute -top-1/4 -right-1/4 w-72 h-72 bg-sax-gold/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-72 h-72 bg-tech-cyan/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="form-name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Full Name <span className="text-sax-gold">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <User className="w-4 h-4" />
              </span>
              <input
                id="form-name"
                type="text"
                required
                disabled={status === 'submitting'}
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-deep-blue/50 border border-white/10 focus:border-sax-gold/40 focus:ring-1 focus:ring-sax-gold/20 rounded-xl py-3 pl-11 pr-4 text-white text-sm outline-none transition-all duration-300 placeholder:text-slate-600 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="form-email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Email Address <span className="text-sax-gold">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <Mail className="w-4 h-4" />
              </span>
              <input
                id="form-email"
                type="email"
                required
                disabled={status === 'submitting'}
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-deep-blue/50 border border-white/10 focus:border-sax-gold/40 focus:ring-1 focus:ring-sax-gold/20 rounded-xl py-3 pl-11 pr-4 text-white text-sm outline-none transition-all duration-300 placeholder:text-slate-600 disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label htmlFor="form-company" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Organization / Company <span className="text-slate-500">(Optional)</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
              <Building className="w-4 h-4" />
            </span>
            <input
              id="form-company"
              type="text"
              disabled={status === 'submitting'}
              placeholder="Google, Stripe, etc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-deep-blue/50 border border-white/10 focus:border-sax-gold/40 focus:ring-1 focus:ring-sax-gold/20 rounded-xl py-3 pl-11 pr-4 text-white text-sm outline-none transition-all duration-300 placeholder:text-slate-600 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="form-message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Your Message <span className="text-sax-gold">*</span>
          </label>
          <textarea
            id="form-message"
            required
            rows={5}
            disabled={status === 'submitting'}
            placeholder="Let's connect! Send a message here if you want to chat about software development, music, AI, or how we might collaborate..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-deep-blue/50 border border-white/10 focus:border-sax-gold/40 focus:ring-1 focus:ring-sax-gold/20 rounded-xl py-3 px-4 text-white text-sm outline-none transition-all duration-300 placeholder:text-slate-600 min-h-[120px] resize-y disabled:opacity-50"
          />
        </div>

        {/* Alert box */}
        {status === 'error' && (
          <div className="flex items-start gap-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-in fade-in duration-300">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-4 px-6 rounded-xl font-semibold text-sm text-white shadow-lg bg-gradient-to-r from-sax-gold to-tech-cyan hover:from-sax-gold/90 hover:to-tech-cyan/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending Submission...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
