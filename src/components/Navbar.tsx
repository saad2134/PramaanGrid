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
        {/* Brand with Clean Squircle Icon (No border) */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center group-hover:scale-105 transition-transform">
            <img
              src="/icon.png"
              alt="PramaanGrid Official Emblem"
              className="h-full w-full object-contain rounded-2xl"
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

        {/* Live Navigation & Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
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
