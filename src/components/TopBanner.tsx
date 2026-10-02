'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function TopBanner() {
  return (
    <aside aria-label="Hackathon announcement" className="relative z-50 w-full bg-gradient-to-r from-emerald-950/70 via-emerald-900/50 to-teal-950/70 border-b border-emerald-500/25 py-2 px-4">
      <div className="mx-auto max-w-7xl flex items-center justify-center gap-2 sm:gap-3 text-center text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-white">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          <span>AI First Product Builder Hackathon 2026</span>
        </div>

        <span className="text-emerald-500/50 hidden sm:inline">•</span>

        <span className="text-zinc-300 hidden md:inline text-[11px]">
          college.dev &amp; Wonksknow Technologies
        </span>

        <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
          Tracks 01, 02 &amp; 04
        </span>
      </div>
    </aside>
  );
}
