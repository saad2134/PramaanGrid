'use client';

import React from 'react';
import { SpotlightCard } from './ui/SpotlightCard';
import {
  Smartphone,
  ShieldCheck,
  Sparkles,
  Lock,
  Scale,
  Radar,
  CheckCircle2,
  AlertTriangle,
  Eye,
  FileText,
  MapPin,
  Clock,
  Fingerprint,
  Zap,
} from 'lucide-react';

export function BentoGrid() {
  return (
    <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider">Core System Protocol</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 tracking-tight leading-tight">
          Engineered for Mathematical Civic Trust
        </h2>

        <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl font-normal">
          How PramaanGrid eliminates municipal leakage, ghost contractors, and citizen apathy through 5 interlocking algorithmic pillars.
        </p>

        {/* Protocol Highlights Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs text-zinc-400 font-mono">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>&lt;200ms Ingestion</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <Radar className="w-3.5 h-3.5 text-cyan-400" />
            <span>35m GPS Buffer</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <Eye className="w-3.5 h-3.5 text-rose-400" />
            <span>3-Anchor VLM</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Automated Escrow</span>
          </span>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* CARD 1: Citizen WhatsApp & Troll Shield (Span 2 cols on desktop) */}
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.2)"
          className="lg:col-span-2 flex flex-col justify-between border-emerald-500/20 bg-gradient-to-br from-[#0c1210]/80 to-[#07090c]/90"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 px-3 py-0.5 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Track 01 &amp; 02: Citizen Ingestion
              </span>
              <span className="text-xs font-mono text-zinc-400 bg-white/[0.04] px-2.5 py-0.5 rounded-md border border-white/[0.06]">
                500M+ Reach • 0 Installs
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center squircle bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Smartphone className="h-5 w-5" />
              </div>
              <span>WhatsApp Native Ingestion &amp; Troll Shield</span>
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
              Eliminates the 90%+ drop-off rate of municipal government apps. Citizens submit photos and location pins natively over WhatsApp. Our zero-shot Gemini Flash gate weeds out domestic pets, memes, and selfies in sub-800ms before any compute or municipal resources are committed.
            </p>
          </div>

          {/* Interactive Visual Element */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Left Micro-HUD: WhatsApp Webhook Intake */}
            <div className="rounded-2xl bg-black/60 border border-white/[0.08] p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pb-2 border-b border-white/[0.06]">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Fingerprint className="w-3.5 h-3.5" />
                  <span>Twilio Webhook</span>
                </span>
                <span className="text-zinc-500">&lt;200ms ACK</span>
              </div>
              <div className="mt-2.5 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Phone Privacy:</span>
                  <span className="font-mono text-zinc-300">+91 98480***** (SHA-256)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Auto-Triage:</span>
                  <span className="text-emerald-400 font-semibold">Severity 9/10 (Critical)</span>
                </div>
              </div>
            </div>

            {/* Right Micro-HUD: Troll Filter & Privacy Shield */}
            <div className="rounded-2xl bg-black/60 border border-white/[0.08] p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pb-2 border-b border-white/[0.06]">
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Privacy Shield Active</span>
                </span>
                <span className="text-emerald-400 font-bold">DPDP 2023</span>
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-xs text-zinc-400">Faces &amp; License Plates</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Auto-Blurred</span>
                </span>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* CARD 2: Geodetic Haversine GPS Radar (Col 1) */}
        <SpotlightCard
          spotlightColor="rgba(6, 182, 212, 0.2)"
          className="flex flex-col justify-between border-cyan-500/20 bg-gradient-to-br from-[#081216]/80 to-[#07090c]/90"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/35 px-3 py-0.5 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Track 03: Geodetic Radar
              </span>
              <span className="text-xs font-mono text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.06]">
                &le;35m Buffer
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center squircle bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Radar className="h-5 w-5" />
              </div>
              <span>Haversine GPS Telemetry</span>
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Extracts hardware-level EXIF coordinates and computes the great-circle distance between the original complaint geo-pin and contractor cleanup photo.
            </p>
          </div>

          {/* Radar HUD Graphic */}
          <div className="mt-6 rounded-2xl bg-black/60 border border-white/[0.08] p-4 text-center relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-1">
              <span>TARGET COORDINATES</span>
              <span className="text-cyan-400">17.4108° N, 78.4373° E</span>
            </div>
            <div className="py-2">
              <div className="text-3xl font-black font-mono text-emerald-400 tracking-tight flex items-center justify-center gap-1.5">
                <span>6.8</span>
                <span className="text-sm font-semibold text-emerald-500">meters</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25 mt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Exact Spot Match Confirmed</span>
              </span>
            </div>
          </div>
        </SpotlightCard>

        {/* CARD 3: VLM Structural Anchor Triangulation (Col 1) */}
        <SpotlightCard
          spotlightColor="rgba(244, 63, 94, 0.2)"
          className="flex flex-col justify-between border-rose-500/20 bg-gradient-to-br from-[#140a0e]/80 to-[#07090c]/90"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 border border-rose-500/35 px-3 py-0.5 text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                Track 04: Anti-Fraud VLM
              </span>
              <span className="text-xs font-mono text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.06]">
                &gt;95% Confidence
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center squircle bg-rose-500/15 text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                <Eye className="h-5 w-5" />
              </div>
              <span>VLM Structural Landmark Anchors</span>
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              GPS can be spoofed by rooted handsets. Tier 2 isolates invariant architectural anchors (culvert curbs, stone pitching, boundary masonry) to prove spatial continuity.
            </p>
          </div>

          {/* Triangulation Anchor Cards */}
          <div className="mt-6 rounded-2xl bg-black/60 border border-white/[0.08] p-3 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between bg-white/[0.02] p-2 rounded-xl border border-white/[0.04]">
              <span className="text-zinc-400 text-[11px]">1. Bridge Abutment</span>
              <span className="text-emerald-400 font-semibold text-[11px]">99% Match</span>
            </div>
            <div className="flex items-center justify-between bg-white/[0.02] p-2 rounded-xl border border-white/[0.04]">
              <span className="text-zinc-400 text-[11px]">2. Canal Embankment</span>
              <span className="text-emerald-400 font-semibold text-[11px]">98% Match</span>
            </div>
            <div className="flex items-center justify-between bg-white/[0.02] p-2 rounded-xl border border-white/[0.04]">
              <span className="text-zinc-400 text-[11px]">3. Storm Culvert Grate</span>
              <span className="text-emerald-400 font-semibold text-[11px]">97% Match</span>
            </div>
          </div>
        </SpotlightCard>

        {/* CARD 4: Automated Municipal Escrow Smart Lock (Col 1) */}
        <SpotlightCard
          spotlightColor="rgba(245, 158, 11, 0.2)"
          className="flex flex-col justify-between border-amber-500/20 bg-gradient-to-br from-[#141008]/80 to-[#07090c]/90"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/35 px-3 py-0.5 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Financial Escrow
              </span>
              <span className="text-xs font-mono text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.06]">
                ₹4.16L+ Protected
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center squircle bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Lock className="h-5 w-5" />
              </div>
              <span>Automated Escrow Lock &amp; Slashing</span>
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Tender payouts are held in smart contract escrow. If a contractor attempts GPS spoofing or remote photo re-upload, payout is frozen and penalties are slashed.
            </p>
          </div>

          {/* Escrow Settlement HUD */}
          <div className="mt-6 rounded-2xl bg-black/60 border border-white/[0.08] p-3.5 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Verified Job Payout:</span>
              <span className="font-mono text-emerald-400 font-bold">₹4,500 Authorized</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.06]">
              <span className="text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>3.42km Fraud Attempt:</span>
              </span>
              <span className="font-mono text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/25">
                ₹8,500 Frozen
              </span>
            </div>
          </div>
        </SpotlightCard>

        {/* CARD 5: Gen-RTI SLA Statutory Escalator (Col 1) */}
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.2)"
          className="flex flex-col justify-between border-emerald-500/20 bg-gradient-to-br from-[#0c1210]/80 to-[#07090c]/90"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 px-3 py-0.5 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Civic Accountability
              </span>
              <span className="text-xs font-mono text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.06]">
                RTI Act 2005
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center squircle bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Scale className="h-5 w-5" />
              </div>
              <span>Gen-RTI Statutory Escalator</span>
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              If municipal officers breach the statutory 72-hour cleanup deadline, PramaanGrid automatically drafts a legally binding Section 6(1) Right to Information application.
            </p>
          </div>

          {/* Legal Notice Preview */}
          <div className="mt-6 rounded-2xl bg-black/60 border border-white/[0.08] p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Form &apos;A&apos; / प्रपत्र &apos;क&apos;</span>
                <span className="text-[10px] font-mono text-zinc-400">Bilingual English &amp; Hindi</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/25">
              1-Click Draft
            </span>
          </div>
        </SpotlightCard>

      </div>
    </section>
  );
}
