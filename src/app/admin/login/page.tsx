'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, ShieldAlert, ArrowRight, Sparkles, KeyRound } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/admin/growth';

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Authentication failed');
        setLoading(false);
        return;
      }

      router.push(nextUrl);
      router.refresh();
    } catch (err) {
      console.error('Login error:', err);
      setError('A network or server error occurred. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Subtle Background Glows */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Branding */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-black text-base">
              BC
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight">James Burt</span>
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight pt-2">
            Growth Hub Access
          </h1>
          <p className="text-xs text-slate-400">
            Enter your admin passkey to access internal portfolio telemetry.
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/70 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-xs rounded-2xl p-3.5 flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Admin Passkey
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••••••••••"
                  autoFocus
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-black text-sm py-3.5 px-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Unlock Growth Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="border-t border-white/5 pt-4 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <LoginForm />
    </Suspense>
  );
}
