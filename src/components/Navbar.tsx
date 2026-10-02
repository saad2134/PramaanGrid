'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RefreshCw, MapPin } from 'lucide-react';

interface NavbarProps {
  onResetDemo?: () => void;
  isResetting?: boolean;
}

export default function Navbar({ onResetDemo, isResetting }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#07090c]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand with Official Squircle Icon */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center squircle bg-emerald-950/40 p-0.5 group-hover:scale-105 transition-all">
            <img
              src="/icon.png"
              alt="PramaanGrid Official Emblem"
              className="h-full w-full object-cover rounded-[22%]"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                PramaanGrid
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                प्रमाण-ग्रिड
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block tracking-normal font-normal">
              Anti-Fraud Proof-of-Clearance Protocol for Civic Operations
            </p>
          </div>
        </Link>

        {/* Live Trust Badges & Navigation */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="hidden lg:flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/[0.08] px-3.5 py-1 text-xs text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium text-zinc-300">
              VLM &amp; GPS Cryptographic Escrow Active
            </span>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] px-3.5 py-1.5 text-xs font-semibold text-zinc-200 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MapPin className="h-3.5 w-3.5 text-emerald-400" />
            <span>Command Center</span>
          </Link>

          {onResetDemo && (
            <button
              onClick={onResetDemo}
              disabled={isResetting}
              title="Reset sample datasets to default"
              className="flex items-center gap-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${isResetting ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
