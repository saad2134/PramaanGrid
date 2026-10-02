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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/30 p-4 shadow-lg shadow-emerald-950/20">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-400">
            Fraud Blocked & Saved
          </span>
          <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-400">
            <IndianRupee className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-2xl font-black tracking-tight text-white">
            ₹{(metrics.taxpayer_money_saved_inr / 100000).toFixed(2)}L
          </span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-400">
          Saved from bogus contractor cleanups
        </p>
      </div>

      {/* 2. Bogus Claims Intercepted */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-950/40 via-zinc-900 to-zinc-900 border border-rose-500/30 p-4 shadow-lg shadow-rose-950/20">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-rose-400">
            Contractor Fraud Caught
          </span>
          <div className="rounded-lg bg-rose-500/10 p-1.5 text-rose-400">
            <ShieldAlert className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-2xl font-black tracking-tight text-rose-300">
            {metrics.fraud_blocked_count}
          </span>
          <span className="text-xs text-rose-400/80 font-medium">violations</span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-400">
          GPS & VLM landmark mismatches blocked
        </p>
      </div>

      {/* 3. Verified Clearances */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-950/40 via-zinc-900 to-zinc-900 border border-cyan-500/30 p-4 shadow-lg shadow-cyan-950/20">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-cyan-400">
            Verified Cleanups
          </span>
          <div className="rounded-lg bg-cyan-500/10 p-1.5 text-cyan-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-2xl font-black tracking-tight text-white">
            {metrics.resolved_count}
          </span>
          <span className="text-xs text-zinc-400">/ {metrics.total_reports}</span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-400">
          Cryptographically audited & closed
        </p>
      </div>

      {/* 4. City Cleanliness Score */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/30 via-zinc-900 to-zinc-900 border border-amber-500/30 p-4 shadow-lg shadow-amber-950/20">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-amber-400">
            Cleanliness Index
          </span>
          <div className="rounded-lg bg-amber-500/10 p-1.5 text-amber-400">
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-2xl font-black tracking-tight text-white">
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
