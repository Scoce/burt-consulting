'use client';

import React, { useState } from 'react';

interface ScreenshotShowcaseProps {
  src: string;
  alt: string;
  appName: string;
  icon: React.ReactNode;
  iconColorClass?: string;
}

export default function ScreenshotShowcase({ 
  src, 
  alt, 
  appName, 
  icon,
  iconColorClass = 'text-sax-gold/40'
}: ScreenshotShowcaseProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <section className="mb-12 rounded-2xl overflow-hidden border border-white/5 bg-slate-950/80 p-1 text-center relative group">
      <div className="aspect-video relative bg-slate-900/50 flex flex-col items-center justify-center p-6 border border-dashed border-white/10 rounded-xl overflow-hidden">
        
        {!hasError ? (
          <img 
            src={src} 
            alt={alt} 
            onError={() => setHasError(true)}
            className="absolute inset-0 w-full h-full object-cover rounded-xl z-20"
          />
        ) : null}
        
        {/* Placeholder UI shows if image fails to load or hasn't been uploaded yet */}
        <div className="flex flex-col items-center justify-center space-y-3 py-12 z-10">
          <div className={`${iconColorClass} animate-pulse`}>
            {icon}
          </div>
          <div className="space-y-1 px-4">
            <h4 className="text-sm font-semibold text-white">{appName} Screenshot</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Take a screenshot of your active application on your Mac (e.g. using Cmd+Shift+4) and save it as <code className="text-sax-gold font-mono text-[10px] bg-white/5 px-1 py-0.5 rounded">{src.substring(8)}</code> inside the <code className="text-white bg-white/5 px-1 py-0.5 rounded">/public/images/</code> folder to replace this placeholder!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
