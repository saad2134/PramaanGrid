'use client';

import React from 'react';
import { ShieldAlert, CheckCircle2, TrendingUp, IndianRupee } from 'lucide-react';
import { CivicMetrics } from '@/types';

interface StatsBannerProps {
  metrics: CivicMetrics;
}

export default function StatsBanner({ metrics }: StatsBannerProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
      {/* 1. Taxpayer Money Protected */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-4.5 hover:border-emerald-500/40 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-400/90 tracking-tight">
            Taxpayer Funds Protected
          </span>
          <div className="flex h-7 w-7 items-center justify-center squircle-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            <IndianRupee className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline gap-1">
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
            ₹{(metrics.taxpayer_money_saved_inr / 100000).toFixed(2)}L
          </span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-400">
          Saved from bogus contractor claims
        </p>
      </div>

      {/* 2. Bogus Claims Intercepted */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-4.5 hover:border-rose-500/40 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-rose-400/90 tracking-tight">
            Contractor Fraud Caught
          </span>
          <div className="flex h-7 w-7 items-center justify-center squircle-sm bg-rose-500/10 text-rose-400 border border-rose-500/25">
            <ShieldAlert className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-rose-300 font-mono">
            {metrics.fraud_blocked_count}
          </span>
          <span className="text-xs text-rose-400/80 font-medium">violations</span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-400">
          GPS &amp; VLM landmark mismatches blocked
        </p>
      </div>

      {/* 3. Verified Clearances */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-4.5 hover:border-cyan-500/40 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-cyan-400/90 tracking-tight">
            Verified Cleanups
          </span>
          <div className="flex h-7 w-7 items-center justify-center squircle-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
            <CheckCircle2 className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
            {metrics.resolved_count}
          </span>
          <span className="text-xs text-zinc-400">/ {metrics.total_reports}</span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-400">
          Cryptographically audited &amp; closed
        </p>
      </div>

      {/* 4. City Cleanliness Score */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-4.5 hover:border-amber-500/40 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-amber-400/90 tracking-tight">
            Cleanliness Index
          </span>
          <div className="flex h-7 w-7 items-center justify-center squircle-sm bg-amber-500/10 text-amber-400 border border-amber-500/25">
            <TrendingUp className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
            {metrics.cleanliness_score}%
          </span>
          <span className="text-xs text-emerald-400 font-semibold">+6.4%</span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-400">
          Avg turnaround: {metrics.avg_response_hours}h
        </p>
      </div>
    </div>
  );
}
