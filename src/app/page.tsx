'use client';

import React, { useState } from 'react';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import StatsBanner from '@/components/StatsBanner';
import WhatsAppSimulator from '@/components/WhatsAppSimulator';
import ProofVerifier from '@/components/ProofVerifier';
import LeafletMap from '@/components/LeafletMap';
import GenRTIModal from '@/components/GenRTIModal';
import Footer from '@/components/Footer';
import { BentoGrid } from '@/components/BentoGrid';
import { HeroParticles } from '@/components/ui/HeroParticles';
import { MockupFrame } from '@/components/ui/MockupFrame';
import { BorderBeam } from '@/components/ui/BorderBeam';
import {
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  MapPin,
  Scale,
  Layers,
  Lock,
  ArrowUpRight,
  CheckCircle2,
  AlertOctagon,
  Radar,
  Sparkles,
} from 'lucide-react';
import { Report, CivicMetrics } from '@/types';
import { INITIAL_METRICS, INITIAL_REPORTS } from '@/lib/demo-data';

export default function Home() {
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [metrics, setMetrics] = useState<CivicMetrics>(INITIAL_METRICS);
  const [selectedReport, setSelectedReport] = useState<Report>(INITIAL_REPORTS[0]);
  const [activeTab, setActiveTab] = useState<'simulator' | 'verifier' | 'map' | 'architecture'>('simulator');
  const [isRtiModalOpen, setIsRtiModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Right-hand hero preview interactive toggle state
  const [heroAuditMode, setHeroAuditMode] = useState<'legit' | 'fraud'>('legit');

  // Fetch live reports & metrics from API
  const refreshData = async () => {
    try {
      const res = await fetch('/api/reports');
      const json = await res.json();
      if (json.success && json.data) {
        setReports(json.data);
        if (json.metrics) setMetrics(json.metrics);
        const updatedSelected = json.data.find((r: Report) => r.id === selectedReport.id);
        if (updatedSelected) setSelectedReport(updatedSelected);
      }
    } catch (e) {
      console.error('Failed to refresh live data:', e);
    }
  };

  const handleResetDemo = async () => {
    setIsResetting(true);
    try {
      await fetch('/api/demo/reset', { method: 'POST' });
      await refreshData();
    } catch (e) {
      console.error('Reset error:', e);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090c] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* 1. TOP ANNOUNCEMENT BANNER (Hackathon & Tracks) */}
      <TopBanner />

      {/* 2. STICKY NAVBAR */}
      <Navbar onResetDemo={handleResetDemo} isResetting={isResetting} />

      <main className="flex-1">
        {/* ============================================================
            HERO SECTION — Left/Right High-Impact Layout
            ============================================================ */}
        <section className="relative overflow-hidden pt-12 pb-16 lg:py-20 border-b border-white/[0.06] bg-mesh-dark">
          {/* Animated Ambient Particles (inspired by Attenomy) */}
          <HeroParticles particleCount={40} />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* LEFT COLUMN: Editorial & Value Proposition */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Pilot Status Badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] px-3.5 py-1 text-xs text-zinc-300 mb-5 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[11px] font-bold text-emerald-400">LIVE PROTOCOL</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-300">Municipal Anti-Fraud Grid</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                  PramaanGrid <span className="text-emerald-400 font-serif italic font-normal block sm:inline">(प्रमाण-ग्रिड)</span>
                </h1>

                {/* Sub-headline */}
                <p className="mt-3.5 text-lg sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400 tracking-tight">
                  The Anti-Fraud Proof-of-Clearance Protocol for Civic Operations
                </p>

                {/* Grounded Domain Reality */}
                <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                  India produces 150,000 tonnes of municipal waste daily, yet 40% remains uncollected while urban local bodies bleed ₹500+ Cr on ghost contracts and fake cleanups.
                  <span className="text-zinc-200 font-medium block mt-2">
                    PramaanGrid stops contractor fraud with algorithmic accountability: zero app download via WhatsApp, instant GenAI &quot;Vision of Tomorrow&quot;, and mathematical Proof-of-Clearance that keeps municipal funds safe in escrow.
                  </span>
                </p>

                {/* Call-to-Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab('simulator')}
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Smartphone className="h-4 w-4" />
                    <span>Launch WhatsApp Simulator</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('verifier')}
                    className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.12] px-6 py-3 text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ShieldAlert className="h-4 w-4 text-rose-400" />
                    <span>Test Fraud Interception</span>
                  </button>

                  <a
                    href="/dashboard"
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-transparent hover:bg-white/[0.05] text-zinc-400 hover:text-white px-4 py-3 text-xs sm:text-sm font-medium transition-colors"
                  >
                    <span>Command Center</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
                  </a>
                </div>

                {/* Live Trust Metrics Row */}
                <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 w-full max-w-lg">
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-white font-mono block">
                      ₹{(metrics.taxpayer_money_saved_inr / 100000).toFixed(2)}L
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">Funds Protected</span>
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-rose-400 font-mono block">
                      {metrics.fraud_blocked_count}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">Frauds Blocked</span>
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono block">
                      12 Hours
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">Statutory SLA</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Interactive Live Forensic Audit Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/[0.12] shadow-2xl p-5">
                  {/* Card Header Bar */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <div className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-white tracking-tight">
                        LIVE FORENSIC AUDIT
                      </span>
                    </div>

                    {/* Mode Toggle inside the preview */}
                    <div className="flex rounded-lg bg-black/40 p-0.5 border border-white/[0.08] text-[10px]">
                      <button
                        onClick={() => setHeroAuditMode('legit')}
                        className={`px-2 py-1 rounded-md font-semibold transition-colors ${
                          heroAuditMode === 'legit'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Valid Cleanup
                      </button>
                      <button
                        onClick={() => setHeroAuditMode('fraud')}
                        className={`px-2 py-1 rounded-md font-semibold transition-colors ${
                          heroAuditMode === 'fraud'
                            ? 'bg-rose-600 text-white shadow-sm'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Fraud Attempt
                      </button>
                    </div>
                  </div>

                  {/* Split Visual: Before vs After */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {/* Before Image */}
                    <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-black">
                      <div className="bg-zinc-900/90 px-2.5 py-1 text-[10px] font-semibold text-amber-400 flex items-center justify-between">
                        <span>BEFORE (Citizen)</span>
                        <span className="text-[9px] text-zinc-500 font-mono">10:14 AM</span>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=600&q=80"
                        alt="Before Cleanup"
                        className="h-28 w-full object-cover"
                      />
                    </div>

                    {/* After Image */}
                    <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-black">
                      <div
                        className={`px-2.5 py-1 text-[10px] font-semibold flex items-center justify-between ${
                          heroAuditMode === 'legit'
                            ? 'bg-emerald-950/80 text-emerald-400'
                            : 'bg-rose-950/80 text-rose-400'
                        }`}
                      >
                        <span>AFTER (Contractor)</span>
                        <span className="text-[9px] text-zinc-400 font-mono">
                          {heroAuditMode === 'legit' ? '02:30 PM' : 'Remote Photo'}
                        </span>
                      </div>
                      <img
                        src={
                          heroAuditMode === 'legit'
                            ? 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
                            : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
                        }
                        alt="After Cleanup"
                        className="h-28 w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Radar & Audit Metrics Breakdown */}
                  <div className="mt-4 space-y-2.5 text-xs">
                    {/* Geodetic Haversine Readout */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <Radar className={`h-4 w-4 ${heroAuditMode === 'legit' ? 'text-emerald-400' : 'text-rose-400'}`} />
                        <span className="text-[11px] text-zinc-300">Geodetic GPS Offset</span>
                      </div>
                      <span
                        className={`font-mono font-bold text-xs ${
                          heroAuditMode === 'legit' ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {heroAuditMode === 'legit' ? '6.8m (Within 35m)' : '3,420m (VIOLATION)'}
                      </span>
                    </div>

                    {/* VLM Structural Anchor Verification */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className={`h-4 w-4 ${heroAuditMode === 'legit' ? 'text-cyan-400' : 'text-rose-400'}`} />
                        <span className="text-[11px] text-zinc-300">VLM Landmark Alignment</span>
                      </div>
                      <span
                        className={`font-semibold text-xs ${
                          heroAuditMode === 'legit' ? 'text-cyan-300' : 'text-rose-400'
                        }`}
                      >
                        {heroAuditMode === 'legit' ? '3/3 Structural Anchors' : '0/3 Anchors (Mismatch)'}
                      </span>
                    </div>

                    {/* Escrow Status Outcome */}
                    <div
                      className={`p-3 rounded-xl border flex items-center justify-between ${
                        heroAuditMode === 'legit'
                          ? 'bg-emerald-950/25 border-emerald-500/40 text-emerald-200'
                          : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {heroAuditMode === 'legit' ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        ) : (
                          <AlertOctagon className="h-4 w-4 text-rose-400 shrink-0" />
                        )}
                        <span className="font-bold text-[11px]">
                          {heroAuditMode === 'legit'
                            ? 'VERIFIED: Contractor Payout Released'
                            : 'CRITICAL FRAUD: Payment Frozen'}
                        </span>
                      </div>

                      <span
                        className={`font-mono font-bold text-xs ${
                          heroAuditMode === 'legit' ? 'text-emerald-400' : 'text-rose-400 line-through'
                        }`}
                      >
                        {heroAuditMode === 'legit' ? '₹4,500' : '₹8,500'}
                      </span>
                    </div>
                  </div>

                  {/* Traveling BorderBeam */}
                  <BorderBeam
                    size={140}
                    duration={8}
                    colorFrom={heroAuditMode === 'legit' ? '#10b981' : '#f43f5e'}
                    colorTo={heroAuditMode === 'legit' ? '#06b6d4' : '#fb7185'}
                    borderWidth={1.5}
                  />
                </div>
              </div>
            </div>

            {/* Live Stats Row */}
            <div className="mt-14">
              <StatsBanner metrics={metrics} />
            </div>
          </div>

          {/* Flowing animated bottom border (inspired by Attenomy Hero) */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse opacity-50" />
        </section>

        {/* ============================================================
            INTERACTIVE WORKSPACE — Wrapped in MockupFrame with BorderBeam
            ============================================================ */}
        <section className="py-14 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-8">
            {/* Tab Selector */}
            <div className="inline-flex rounded-2xl bg-white/[0.04] p-1.5 border border-white/[0.08] shadow-2xl overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTab('simulator')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'simulator'
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Smartphone className="h-4 w-4" />
                <span>1. Citizen WhatsApp Gateway</span>
              </button>

              <button
                onClick={() => setActiveTab('verifier')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'verifier'
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>2. Proof-of-Clearance Terminal</span>
              </button>

              <button
                onClick={() => setActiveTab('map')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'map'
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <MapPin className="h-4 w-4" />
                <span>3. Live GIS Command Center</span>
              </button>

              <button
                onClick={() => setActiveTab('architecture')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'architecture'
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>4. Protocol Architecture</span>
              </button>
            </div>
          </div>

          {/* Device Mockup Wrapper with traveling BorderBeam */}
          <MockupFrame
            url={`pramaangrid.gov.in/${activeTab}`}
            badge={
              activeTab === 'verifier'
                ? 'FORENSIC AUDIT ACTIVE'
                : activeTab === 'simulator'
                ? 'WHATSAPP GATEWAY'
                : 'MUNICIPAL GIS'
            }
          >
            <div className="p-4 sm:p-6">
              {/* TAB 1: WHATSAPP SIMULATOR */}
              {activeTab === 'simulator' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 flex justify-center">
                    <WhatsAppSimulator onReportCreated={refreshData} />
                  </div>

                  <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
                    <div>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400">
                        Track 01 &amp; 02 Innovation
                      </span>
                      <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Zero-Friction Ingestion with GenAI &quot;Vision of Tomorrow&quot;
                      </h2>
                      <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        Most civic apps fail because citizens refuse to download 80MB government portals that log out constantly. PramaanGrid runs natively on WhatsApp — the tool 500 million Indians already trust and use daily.
                      </p>
                    </div>

                    <div className="space-y-3.5">
                      {/* Feature 1 */}
                      <div className="flex gap-4 rounded-2xl glass-panel p-4.5 hover:border-white/[0.14] transition-colors">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center squircle bg-cyan-950/40 text-cyan-400 border border-cyan-500/30">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-white">
                            FLUX.1 Inpainting: The Behavioral Hook
                          </h4>
                          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                            When a citizen reports an ugly dump, we don&apos;t just reply with a bureaucratic ticket. We return an AI-generated &quot;Vision of Tomorrow&quot; showing their exact street pristine and green. This turns cynical complaints into hopeful community ownership.
                          </p>
                        </div>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex gap-4 rounded-2xl glass-panel p-4.5 hover:border-white/[0.14] transition-colors">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center squircle bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-white">
                            Gemini 3.5 Flash: Sub-Second Multimodal Triage
                          </h4>
                          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                            Filters out memes, domestic pets, and selfies in sub-second latency. Automatically rates hazard severity (1-10), itemizes polymer types, estimates volume (m³), and blurs pedestrian faces and license plates for privacy compliance.
                          </p>
                        </div>
                      </div>

                      {/* Feature 3 */}
                      <div className="flex gap-4 rounded-2xl glass-panel p-4.5 hover:border-white/[0.14] transition-colors">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center squircle bg-amber-950/40 text-amber-400 border border-amber-500/30">
                          <Lock className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-white">
                            Escrow Payment Lock
                          </h4>
                          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                            The moment the report is logged, municipal funds for the assigned contractor are held in escrow. Payout cannot be released until an on-site Proof-of-Clearance verification is passed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROOF-OF-CLEARANCE TERMINAL */}
              {activeTab === 'verifier' && (
                <div className="space-y-6">
                  <div className="max-w-3xl">
                    <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-xs font-semibold text-rose-400">
                      Track 04: The Core Anti-Fraud Engine
                    </span>
                    <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Mathematical &amp; Visual Proof-of-Clearance
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-400">
                      Select a reported blackspot below, then test both a legitimate on-site cleanup and a contractor fraud attempt to see how the system intercepts false claims in real-time.
                    </p>
                  </div>

                  {/* Report selector pill row */}
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {reports.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedReport(r)}
                        className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap border transition-all ${
                          selectedReport.id === r.id
                            ? 'bg-zinc-800 text-white border-emerald-500 shadow-sm'
                            : 'bg-zinc-900/60 text-zinc-400 border-white/[0.06] hover:text-white hover:bg-zinc-800'
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            r.status === 'RESOLVED'
                              ? 'bg-emerald-400'
                              : r.status === 'FRAUD'
                              ? 'bg-rose-400'
                              : 'bg-amber-400'
                          }`}
                        />
                        <span>{r.id}: {r.address.split(',')[0]}</span>
                      </button>
                    ))}
                  </div>

                  <ProofVerifier
                    report={selectedReport}
                    onVerified={refreshData}
                  />
                </div>
              )}

              {/* TAB 3: LIVE GIS COMMAND CENTER */}
              {activeTab === 'map' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left: Map */}
                  <div className="lg:col-span-8 h-[580px]">
                    <LeafletMap
                      reports={reports}
                      selectedReportId={selectedReport.id}
                      onSelectReport={(r) => setSelectedReport(r)}
                    />
                  </div>

                  {/* Right: Selected Ticket Inspector */}
                  <div className="lg:col-span-4 flex flex-col rounded-3xl glass-panel p-5 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                      <span className="font-bold text-sm text-white">Ticket Inspector</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          selectedReport.status === 'RESOLVED'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : selectedReport.status === 'FRAUD'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {selectedReport.status}
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-zinc-500 block text-[10px] font-mono">TICKET ID</span>
                        <span className="font-mono text-zinc-200 text-sm font-bold">
                          #{selectedReport.id}
                        </span>
                      </div>

                      <div>
                        <span className="text-zinc-500 block text-[10px] font-mono">LOCATION</span>
                        <p className="text-zinc-200 font-medium">{selectedReport.address}</p>
                        <p className="text-zinc-400 text-[11px]">{selectedReport.ward}, {selectedReport.city}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 bg-black/40 p-2.5 rounded-xl border border-white/[0.06]">
                        <div>
                          <span className="text-zinc-500 block text-[10px] font-mono">SEVERITY</span>
                          <span className="font-bold text-amber-400">
                            {selectedReport.severity}/10
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block text-[10px] font-mono">CATEGORY</span>
                          <span className="font-bold text-white capitalize">
                            {selectedReport.category}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-zinc-500 block text-[10px] font-mono">AI AUDIT DESCRIPTION</span>
                        <p className="text-zinc-300 mt-1 leading-relaxed">
                          {selectedReport.description}
                        </p>
                      </div>

                      {selectedReport.assigned_contractor && (
                        <div>
                          <span className="text-zinc-500 block text-[10px] font-mono">ASSIGNED CONTRACTOR</span>
                          <p className="text-zinc-200 font-medium">
                            {selectedReport.assigned_contractor}
                          </p>
                        </div>
                      )}

                      {/* Gen-RTI Button */}
                      <div className="pt-2">
                        <button
                          onClick={() => setIsRtiModalOpen(true)}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 py-2.5 font-semibold text-xs transition-colors"
                        >
                          <Scale className="h-4 w-4" />
                          <span>Draft Legal Gen-RTI Notice</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PROTOCOL ARCHITECTURE */}
              {activeTab === 'architecture' && (
                <div className="space-y-8">
                  <div className="max-w-3xl">
                    <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-400">
                      Full System Design
                    </span>
                    <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Next-Gen End-to-End System Architecture
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-400">
                      Designed for 100,000+ daily requests across Indian municipalities without server cold starts or database bottlenecks.
                    </p>
                  </div>

                  {/* 4 Pillars Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="rounded-3xl glass-panel p-5 space-y-3">
                      <div className="flex h-10 w-10 items-center justify-center squircle bg-emerald-500/20 text-emerald-400 font-bold text-sm">
                        01
                      </div>
                      <h4 className="font-bold text-white text-sm">WhatsApp Ingestion</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Webhook receives image &amp; GPS coordinates. Immediate 200 OK ACK avoids timeout while background worker initiates Gemini triage.
                      </p>
                    </div>

                    <div className="rounded-3xl glass-panel p-5 space-y-3">
                      <div className="flex h-10 w-10 items-center justify-center squircle bg-cyan-500/20 text-cyan-400 font-bold text-sm">
                        02
                      </div>
                      <h4 className="font-bold text-white text-sm">FLUX.1 Inpainting</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Uses FLUX.1 Fill [dev] to preserve exact street architecture while removing debris. Sent back via WhatsApp to drive citizen engagement.
                      </p>
                    </div>

                    <div className="rounded-3xl glass-panel p-5 space-y-3">
                      <div className="flex h-10 w-10 items-center justify-center squircle bg-amber-500/20 text-amber-400 font-bold text-sm">
                        03
                      </div>
                      <h4 className="font-bold text-white text-sm">Geodetic Haversine GPS</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Calculates geographic distance between Before &amp; After photo coordinates. Offsets &gt; 35m trigger automatic contractor payment freezes.
                      </p>
                    </div>

                    <div className="rounded-3xl glass-panel p-5 space-y-3">
                      <div className="flex h-10 w-10 items-center justify-center squircle bg-rose-500/20 text-rose-400 font-bold text-sm">
                        04
                      </div>
                      <h4 className="font-bold text-white text-sm">Gemini VLM Audit</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Multimodal vision model cross-examines 3+ background structural anchors to eliminate spoofing, fake cleanups, and stock photography fraud.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </MockupFrame>
        </section>

        {/* ============================================================
            BENTO GRID SECTION — MagicBento Inspired Polish
            ============================================================ */}
        <BentoGrid />
      </main>

      {/* GEN-RTI MODAL */}
      <GenRTIModal
        report={selectedReport}
        isOpen={isRtiModalOpen}
        onClose={() => setIsRtiModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
