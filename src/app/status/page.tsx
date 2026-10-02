'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TopBanner from '@/components/TopBanner';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Server,
  Database,
  Smartphone,
  ArrowLeft,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export default function StatusPage() {
  const services = [
    {
      name: 'Gemini 2.5 Flash Multimodal Triage',
      description: 'Sub-second civic blackspot hazard scoring, volume estimation, and troll shield filtering.',
      status: 'Operational',
      latency: '460ms',
      icon: Sparkles,
      uptime: '99.99%',
    },
    {
      name: 'FLUX.1 Inpainting Clean Vision',
      description: 'Generative AI pipeline producing the Vision of Tomorrow clean street visualization.',
      status: 'Operational',
      latency: '1.6s',
      icon: Zap,
      uptime: '99.94%',
    },
    {
      name: 'Geodetic Haversine GPS Audit Engine',
      description: 'Cryptographic EXIF distance verification enforcing 35-meter maximum cleanup radius.',
      status: 'Operational',
      latency: '14ms',
      icon: ShieldCheck,
      uptime: '100%',
    },
    {
      name: 'Municipal Escrow Settlement Engine',
      description: 'Automated municipal contractor payout disbursement and fraud claim freeze locks.',
      status: 'Operational',
      latency: '32ms',
      icon: Layers,
      uptime: '100%',
    },
    {
      name: 'WhatsApp Cloud Webhook Gateway',
      description: 'Zero-install citizen reporting gateway supporting image, audio, and GPS live pins.',
      status: 'Operational',
      latency: '120ms',
      icon: Smartphone,
      uptime: '99.98%',
    },
    {
      name: 'GIS Spatial Ward Database',
      description: 'High-availability spatial index tracking municipal blackspots across city wards.',
      status: 'Operational',
      latency: '18ms',
      icon: Database,
      uptime: '100%',
    },
  ];

  const metrics = [
    { label: 'Overall System Uptime', value: '99.98%', sub: 'Last 90 days' },
    { label: 'Active Escrow Locks', value: '52 Frauds Frozen', sub: '₹4.16L protected' },
    { label: 'Statutory 12h SLA Compliance', value: '94.2%', sub: 'Avg 4.8h turnaround' },
    { label: 'Incidents in Past 90 Days', value: '0 Critical', sub: 'All systems green' },
  ];

  return (
    <div className="min-h-screen bg-[#07090c] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      <TopBanner />
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Breadcrumb / Back button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to PramaanGrid Protocol</span>
          </Link>
        </div>

        {/* Global Operational Status Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-teal-950/40 border border-emerald-500/30 shadow-2xl relative overflow-hidden mb-10">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-md">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    All Systems Operational
                  </h1>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/35">
                    LIVE
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                  PramaanGrid municipal audit pipelines, AI triage, and escrow networks are functioning normally with zero degradation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono text-zinc-400 bg-black/40 px-3.5 py-2 rounded-xl border border-white/[0.08]">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              <span>Refreshed: Just now</span>
            </div>
          </div>
        </div>

        {/* Top-Level KPI Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-4 glass-panel border border-white/[0.08] hover:border-emerald-500/30 transition-colors"
            >
              <span className="text-[11px] font-medium text-zinc-400 block mb-1">
                {m.label}
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-white block">
                {m.value}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">
                {m.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Services Status Table */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#0c1017]/80 overflow-hidden shadow-2xl mb-12">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between bg-black/20">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Server className="h-4 w-4 text-emerald-400" />
              <span>Core Protocol Services &amp; Subsystems</span>
            </h2>
            <span className="text-[11px] font-mono text-zinc-400">
              6 of 6 Systems Active
            </span>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {services.map((svc, index) => {
              const Icon = svc.icon;
              return (
                <div
                  key={index}
                  className="p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-emerald-400 border border-white/[0.08] mt-0.5">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-white">
                          {svc.name}
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5 max-w-xl leading-relaxed">
                        {svc.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 sm:gap-8 text-xs font-mono shrink-0 pl-12 sm:pl-0">
                    <div className="text-left sm:text-right">
                      <span className="text-zinc-500 text-[10px] block">LATENCY</span>
                      <span className="text-zinc-300 font-medium">{svc.latency}</span>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-zinc-500 text-[10px] block">UPTIME</span>
                      <span className="text-zinc-300 font-medium">{svc.uptime}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{svc.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 90-Day Incident History Section */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#0c1017]/80 p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-400" />
              <span>Past Incident History (Last 90 Days)</span>
            </h2>
            <span className="text-xs text-emerald-400 font-mono font-medium">
              100% Clean Audit Period
            </span>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl p-4 bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-zinc-200">
                  Zero outages or unplanned downtime recorded across all municipal nodes.
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Automated failover routes for Google Gemini Flash, Replicate FLUX.1 inpainting, and WhatsApp API webhooks functioned with 100% delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
