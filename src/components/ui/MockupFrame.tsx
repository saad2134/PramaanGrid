'use client';

import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { BorderBeam } from './BorderBeam';

interface MockupFrameProps {
  children: React.ReactNode;
  url?: string;
  badge?: string;
  enableBorderBeam?: boolean;
  className?: string;
}

export function MockupFrame({
  children,
  url = 'pramaangrid.gov.in/live-escrow-audit',
  badge = 'SECURE ESCROW v2.4',
  enableBorderBeam = true,
  className = '',
}: MockupFrameProps) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden glass-panel border border-white/[0.12] shadow-2xl shadow-black/80 ${className}`}
    >
      {/* Top Application Bar */}
      <div className="relative flex items-center justify-between px-4 py-3 bg-[#0d1117]/90 border-b border-white/[0.08] text-xs">
        {/* Window controls */}
        <div className="flex items-center gap-2 z-10 shrink-0">
          <div className="h-3 w-3 rounded-full bg-rose-500/80 shadow-sm" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80 shadow-sm" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80 shadow-sm" />
        </div>

        {/* Address / Status Pill: Absolutely centered in the frame */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-lg bg-black/50 px-3.5 py-1 border border-white/[0.08] text-[11px] text-zinc-400 font-mono shadow-inner z-0 pointer-events-none">
          <Lock className="h-3 w-3 text-emerald-400 shrink-0" />
          <span className="text-zinc-200 font-medium tracking-tight whitespace-nowrap">{url}</span>
        </div>

        {/* Right Badge */}
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20 z-10 shrink-0">
          <ShieldCheck className="h-3 w-3 shrink-0" />
          <span className="hidden sm:inline">{badge}</span>
          <span className="sm:hidden">SECURE</span>
        </div>
      </div>

      {/* Frame Body */}
      <div className="relative p-1 bg-[#07090c]/90">
        {children}
      </div>

      {/* Optional Animated Border Beam */}
      {enableBorderBeam && (
        <BorderBeam
          size={160}
          duration={9}
          colorFrom="#10b981"
          colorTo="#06b6d4"
          borderWidth={1.5}
        />
      )}
    </div>
  );
}
