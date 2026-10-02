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
  ArrowRight,
  CheckCircle2,
  AlertOctagon,
  Eye,
} from 'lucide-react';

export function BentoGrid() {
  return (
    <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-3 shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Core System Protocol</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Engineered for Mathematical Civic Trust
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
          How PramaanGrid eliminates municipal leakage, ghost contractors, and citizen apathy through 5 interlocking algorithmic pillars.
        </p>
      </div>

      {/* Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* CARD 1: Zero-Friction WhatsApp (Span 2 cols) */}
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.16)"
          className="md:col-span-2 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Track 01 &amp; 02: Citizen Gateway
              </span>
              <span className="text-[11px] font-mono text-zinc-400">Zero App Installs</span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center squircle-sm bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Smartphone className="h-4 w-4" />
              </div>
              <span>WhatsApp Native Ingestion &amp; Troll Shield</span>
            </h3>

            <p className="mt-3 text-xs text-zinc-400 leading-relaxed max-w-xl">
              500M+ Indians already use WhatsApp. PramaanGrid runs natively over Twilio webhooks with sub-second Gemini 3.5 Flash triage that weeds out pets, memes, and selfies before assigning civic resources.
            </p>
          </div>

          {/* Mini Interactive Preview Graphic */}
          <div className="mt-6 rounded-2xl bg-black/50 border border-white/[0.08] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center squircle bg-emerald-950 p-1 border border-emerald-500/30">
                <img src="/icon.png" alt="Pramaan" className="h-full w-full object-cover rounded-[22%]" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Pramaan Verified Bot</span>
                <span className="text-[10px] text-zinc-400">ACK in &lt; 200ms • Privacy Shield Auto-Blur</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Faces &amp; Plates Blurred</span>
            </div>
          </div>
        </SpotlightCard>

        {/* CARD 2: Geodetic Haversine GPS Radar (Span 1 col) */}
        <SpotlightCard
          spotlightColor="rgba(6, 182, 212, 0.16)"
          className="flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="rounded-full bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                Geodetic Audit
              </span>
              <span className="text-[11px] font-mono text-zinc-400">&le; 35m Tolerance</span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center squircle-sm bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Radar className="h-4 w-4" />
              </div>
              <span>Haversine GPS Offset</span>
            </h3>

            <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
              Extracts hardware EXIF telemetry and calculates millimeter-precise geodetic distance between report coordinates and cleanup submission.
            </p>
          </div>

          <div className="mt-6 rounded-2xl bg-black/50 border border-white/[0.08] p-3 text-center">
            <span className="text-[10px] font-mono text-zinc-500 block uppercase">Real-Time Offset</span>
            <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight">6.8 meters</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">Matched within 35m urban tolerance</span>
          </div>
        </SpotlightCard>

        {/* CARD 3: VLM Landmark Triangulation (Span 1 col) */}
        <SpotlightCard
          spotlightColor="rgba(244, 63, 94, 0.16)"
          className="flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="rounded-full bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                Track 04: Anti-Fraud
              </span>
              <span className="text-[11px] font-mono text-zinc-400">98% Alignment</span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center squircle-sm bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Eye className="h-4 w-4" />
              </div>
              <span>VLM Structural Anchor Triangulation</span>
            </h3>

            <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
              Compares 3+ invariant architectural anchors (retaining walls, curb lines, utility poles) to detect stock photo spoofing or cleanups taken elsewhere.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between bg-black/50 border border-white/[0.08] p-3 rounded-2xl text-xs">
            <span className="text-zinc-400 font-medium">3 Anchors Verified</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>PASS</span>
            </span>
          </div>
        </SpotlightCard>

        {/* CARD 4: Cryptographic Escrow Lock (Span 1 col) */}
        <SpotlightCard
          spotlightColor="rgba(245, 158, 11, 0.16)"
          className="flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Financial Escrow
              </span>
              <span className="text-[11px] font-mono text-zinc-400">Zero Leakage</span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center squircle-sm bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Lock className="h-4 w-4" />
              </div>
              <span>Automated Escrow Lock</span>
            </h3>

            <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
              Contractor claim funds are held frozen in municipal escrow until both Haversine GPS and VLM landmark audits pass verification simultaneously.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between bg-black/50 border border-white/[0.08] p-3 rounded-2xl text-xs">
            <span className="text-zinc-400 font-medium">₹8,500 Bogus Claim</span>
            <span className="font-bold text-rose-400 flex items-center gap-1">
              <AlertOctagon className="h-3.5 w-3.5" />
              <span>FROZEN</span>
            </span>
          </div>
        </SpotlightCard>

        {/* CARD 5: Gen-RTI Legal Notice Generator (Span 1 col) */}
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.16)"
          className="flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Civic Accountability
              </span>
              <span className="text-[11px] font-mono text-zinc-400">Sec 6(1) RTI Act</span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center squircle-sm bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Scale className="h-4 w-4" />
              </div>
              <span>Gen-RTI SLA Escalator</span>
            </h3>

            <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
              If municipal officers breach the 72-hour statutory cleanup SLA, the AI auto-drafts a legally binding Right to Information petition in English &amp; Hindi.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between bg-black/50 border border-white/[0.08] p-3 rounded-2xl text-xs">
            <span className="text-zinc-400 font-medium">Bilingual Form &apos;A&apos;</span>
            <span className="font-bold text-emerald-400">1-Click PDF Draft</span>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
