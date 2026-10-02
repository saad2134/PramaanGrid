'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

interface NavbarProps {
  onResetDemo?: () => void;
  isResetting?: boolean;
}

export default function Navbar({ onResetDemo, isResetting }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">
                Nagar-Drishti
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                नगर-दृष्टि
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Anti-Fraud Proof-of-Clearance Protocol for Civic Operations
            </p>
          </div>
        </Link>

        {/* Live Trust Badges & Navigation */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 rounded-full bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>VLM & GPS Cryptographic Audit Active</span>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <span>Command Center</span>
          </Link>

          {onResetDemo && (
            <button
              onClick={onResetDemo}
              disabled={isResetting}
              title="Reset sample datasets to default"
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-600/30 transition-colors disabled:opacity-50"
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
