'use client';

import React from 'react';
import { ShieldAlert, CheckCircle2, TrendingUp, IndianRupee, Clock, ShieldCheck } from 'lucide-react';
import { CivicMetrics } from '@/types';

interface StatsBannerProps {
  metrics: CivicMetrics;
}

export default function StatsBanner({ metrics }: StatsBannerProps) {
  return (
    <div className="w-full">
      {/* Section Header Label */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
            Real-Time Municipal Escrow &amp; Audit Metrics
          </span>
        </div>
        <span className="text-[11px] text-emerald-400 font-mono hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 border border-emerald-500/20">
          <Clock className="h-3 w-3" />
          <span>Statutory 12-Hour Citizen SLA Active</span>
        </span>
      </div>

      {/* Unified 4-Card Metrics Grid (Combines all core domain KPIs with zero redundancy) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full">
        {/* 1. Taxpayer Money Protected */}
        <div className="relative overflow-hidden rounded-2xl glass-panel p-5 hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 tracking-tight flex items-center gap-1.5">
              <span>Taxpayer Funds Protected</span>
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <IndianRupee className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
              ₹{(metrics.taxpayer_money_saved_inr / 100000).toFixed(2)}L
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              Escrow Locked
            </span>
          </div>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Directly saved from ghost contractor claims and remote photo re-uploads.
          </p>
        </div>

        {/* 2. Bogus Claims Intercepted */}
        <div className="relative overflow-hidden rounded-2xl glass-panel p-5 hover:border-rose-500/40 transition-all duration-300 group hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-400 tracking-tight flex items-center gap-1.5">
              <span>Contractor Fraud Intercepted</span>
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:scale-110 transition-transform">
              <ShieldAlert className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-rose-300 font-mono">
              {metrics.fraud_blocked_count}
            </span>
            <span className="text-xs text-rose-400/90 font-medium">violations caught</span>
          </div>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            GPS spoofing &amp; VLM landmark mismatches intercepted before payout.
          </p>
        </div>

        {/* 3. Verified Clearances */}
        <div className="relative overflow-hidden rounded-2xl glass-panel p-5 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cyan-400 tracking-tight flex items-center gap-1.5">
              <span>Verified Cleanups</span>
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
              {metrics.resolved_count}
            </span>
            <span className="text-xs font-mono text-zinc-400">/ {metrics.total_reports} reports</span>
          </div>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Cryptographically audited and recorded in municipal civic register.
          </p>
        </div>

        {/* 4. Statutory SLA & Cleanliness Score */}
        <div className="relative overflow-hidden rounded-2xl glass-panel p-5 hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-400 tracking-tight flex items-center gap-1.5">
              <span>City Cleanliness &amp; SLA</span>
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
              {metrics.cleanliness_score}%
            </span>
            <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
              {metrics.avg_response_hours}h turnaround
            </span>
          </div>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            Statutory 12-hour citizen deadline enforced across all city wards.
          </p>
        </div>
      </div>
    </div>
  );
}
