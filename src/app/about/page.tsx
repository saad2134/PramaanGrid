'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TopBanner from '@/components/TopBanner';
import { ArrowLeft, Target, ShieldCheck, Cpu, Code2, Award, FileText } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#07090c] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      <TopBanner />
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to PramaanGrid Protocol</span>
          </Link>
        </div>

        <div className="rounded-3xl border border-white/[0.08] bg-[#0c1017]/90 p-8 sm:p-12 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                About PramaanGrid (प्रमाण-ग्रिड)
              </h1>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                AI First Product Builder Hackathon 2026 by College.dev
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 text-xs sm:text-sm leading-relaxed space-y-6">
            <section className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                <Target className="h-4 w-4" />
                <span>The Core Civic Challenge</span>
              </div>
              <p className="text-zinc-400">
                India generates 150,000 tonnes of municipal solid waste daily, yet 40% remains uncollected. Urban local bodies allocate hundreds of crores to private cleaning contractors, but have had zero reliable methods to verify whether garbage was truly cleared or if remote generic photos were re-uploaded for bogus billing.
              </p>
            </section>

            <section className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                <Cpu className="h-4 w-4" />
                <span>The Proof-of-Clearance Protocol</span>
              </div>
              <p className="text-zinc-400">
                PramaanGrid bridges the trust gap between citizens, contractors, and municipal authorities:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-400 text-xs">
                <li>Zero-barrier WhatsApp citizen ingestion with Gemini 2.5 Flash multimodal triage.</li>
                <li>FLUX.1 Clean Vision inpainting generating a hopeful &quot;Vision of Tomorrow&quot; for every report.</li>
                <li>Geodetic Haversine GPS distance auditing (maximum 35m tolerance).</li>
                <li>Gemini Vision Language Model structural landmark matching.</li>
                <li>Contractor escrow locks that keep municipal funds secure until on-site verification succeeds.</li>
              </ul>
            </section>

            <section className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                <Award className="h-4 w-4" />
                <span>Hackathon Tracks Addressed</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div className="rounded-xl p-3 bg-black/40 border border-white/[0.06]">
                  <span className="text-[11px] font-bold text-emerald-400 block font-mono">TRACK 01</span>
                  <span className="text-xs text-white font-semibold">Civic Waste Education</span>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    AI Vision of Tomorrow converts cynical complaints into community pride.
                  </p>
                </div>

                <div className="rounded-xl p-3 bg-black/40 border border-white/[0.06]">
                  <span className="text-[11px] font-bold text-cyan-400 block font-mono">TRACK 02</span>
                  <span className="text-xs text-white font-semibold">Street Action &amp; Garbage</span>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Instant WhatsApp triage dispatching contractors under statutory 12h SLAs.
                  </p>
                </div>

                <div className="rounded-xl p-3 bg-black/40 border border-white/[0.06]">
                  <span className="text-[11px] font-bold text-amber-400 block font-mono">TRACK 04</span>
                  <span className="text-xs text-white font-semibold">Drain Infrastructure</span>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Culvert plastic bottleneck tracking preventing monsoon urban flash floods.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
