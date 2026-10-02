'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import StatsBanner from '@/components/StatsBanner';
import WhatsAppSimulator from '@/components/WhatsAppSimulator';
import ProofVerifier from '@/components/ProofVerifier';
import LeafletMap from '@/components/LeafletMap';
import GenRTIModal from '@/components/GenRTIModal';
import Footer from '@/components/Footer';
import {
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Smartphone,
  MapPin,
  Scale,
  ArrowRight,
  TrendingDown,
  Lock,
  Layers,
  CheckCircle2,
  FileCheck2,
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

  // Fetch live reports & metrics from API
  const refreshData = async () => {
    try {
      const res = await fetch('/api/reports');
      const json = await res.json();
      if (json.success && json.data) {
        setReports(json.data);
        if (json.metrics) setMetrics(json.metrics);
        // keep selected report up to date
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
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      <Navbar onResetDemo={handleResetDemo} isResetting={isResetting} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-14 border-b border-zinc-800/80">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col items-center text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI First Product Builder Hackathon 2026</span>
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span className="text-zinc-300">Tracks 01, 02 &amp; 04</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl">
                Nagar-Drishti <span className="text-emerald-400 font-serif italic">(नगर-दृष्टि)</span>
              </h1>
              <p className="mt-4 text-xl sm:text-2xl font-bold bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                The Anti-Fraud Proof-of-Clearance Protocol for Civic Operations
              </p>

              {/* Core Premise */}
              <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
                India generates 150,000 tonnes of waste daily, yet 40% remains uncollected while municipal corporations bleed millions on ghost contracts and unverified cleanups.
                <span className="text-zinc-200 font-medium block mt-1">
                  Nagar-Drishti turns waste reporting into an algorithmic trust protocol: zero app download via WhatsApp, instant GenAI &quot;Vision of Tomorrow&quot;, and mathematical Proof-of-Clearance that makes contractor fraud impossible.
                </span>
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setActiveTab('simulator')}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-3 text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                >
                  <Smartphone className="h-4 w-4" />
                  <span>Launch WhatsApp Simulator</span>
                </button>

                <button
                  onClick={() => setActiveTab('verifier')}
                  className="flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 px-5 py-3 text-sm font-semibold transition-all hover:scale-105"
                >
                  <ShieldAlert className="h-4 w-4 text-rose-400" />
                  <span>Test Fraud Interception</span>
                </button>

                <a
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 px-4 py-3 text-sm font-medium transition-colors"
                >
                  <MapPin className="h-4 w-4 text-cyan-400" />
                  <span>Municipal Command Center</span>
                </a>
              </div>
            </div>

            {/* Live Stats Row */}
            <div className="mt-12">
              <StatsBanner metrics={metrics} />
            </div>
          </div>
        </section>

        {/* INTERACTIVE WORKSPACE TABS */}
        <section className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Tab Selector */}
            <div className="inline-flex rounded-2xl bg-zinc-900 p-1.5 border border-zinc-800 shadow-xl overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTab('simulator')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'simulator'
                    ? 'bg-emerald-500 text-black shadow-md'
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
                    ? 'bg-emerald-500 text-black shadow-md'
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
                    ? 'bg-emerald-500 text-black shadow-md'
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
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>4. Protocol Architecture</span>
              </button>
            </div>
          </div>

          {/* TAB 1: WHATSAPP SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 flex justify-center">
                <WhatsAppSimulator onReportCreated={refreshData} />
              </div>

              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <div>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400">
                    Track 01 &amp; 02 Innovation
                  </span>
                  <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                    Zero-Friction Ingestion with GenAI &quot;Vision of Tomorrow&quot;
                  </h2>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    Most civic apps fail because citizens refuse to download 80MB government apps that log out every 5 minutes. Nagar-Drishti runs natively on WhatsApp — the app 500 million Indians already use daily.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Feature 1 */}
                  <div className="flex gap-4 rounded-xl bg-zinc-900/60 border border-zinc-800 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">
                        FLUX.1 Inpainting: The Psychological Hook
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        When a citizen reports an ugly dump, we don&apos;t just reply with a boring ticket number. We send back an AI-generated &quot;Vision of Tomorrow&quot; showing their exact street pristine and green. This turns cynical complaints into hopeful community ownership.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex gap-4 rounded-xl bg-zinc-900/60 border border-zinc-800 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">
                        Gemini 3.5 Flash: Real-Time Multimodal Triage
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Filters out memes, domestic pets, and selfies in sub-second latency. Automatically rates hazard severity (1-10), itemizes polymer types, estimates volume (m³), and blurs pedestrian faces and license plates for privacy.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex gap-4 rounded-xl bg-zinc-900/60 border border-zinc-800 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">
                        Escrow Payment Lock
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">
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
            <div className="mt-8 space-y-6">
              <div className="max-w-3xl">
                <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-xs font-semibold text-rose-400">
                  Track 04: The Core Anti-Fraud Engine
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                  Mathematical &amp; Visual Proof-of-Clearance
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
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
                        ? 'bg-zinc-800 text-white border-emerald-500'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
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
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Map */}
              <div className="lg:col-span-8 h-[580px]">
                <LeafletMap
                  reports={reports}
                  selectedReportId={selectedReport.id}
                  onSelectReport={(r) => setSelectedReport(r)}
                />
              </div>

              {/* Right: Selected Ticket Inspector */}
              <div className="lg:col-span-4 flex flex-col rounded-2xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
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
                    <span className="text-zinc-500 block text-[10px]">TICKET ID</span>
                    <span className="font-mono text-zinc-200 text-sm font-bold">
                      #{selectedReport.id}
                    </span>
                  </div>

                  <div>
                    <span className="text-zinc-500 block text-[10px]">LOCATION</span>
                    <p className="text-zinc-200 font-medium">{selectedReport.address}</p>
                    <p className="text-zinc-400 text-[11px]">{selectedReport.ward}, {selectedReport.city}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                    <div>
                      <span className="text-zinc-500 block text-[10px]">SEVERITY</span>
                      <span className="font-bold text-amber-400">
                        {selectedReport.severity}/10
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">CATEGORY</span>
                      <span className="font-bold text-white capitalize">
                        {selectedReport.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-zinc-500 block text-[10px]">AI AUDIT DESCRIPTION</span>
                    <p className="text-zinc-300 mt-1 leading-relaxed">
                      {selectedReport.description}
                    </p>
                  </div>

                  {selectedReport.assigned_contractor && (
                    <div>
                      <span className="text-zinc-500 block text-[10px]">ASSIGNED CONTRACTOR</span>
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
            <div className="mt-8 space-y-8">
              <div className="max-w-3xl">
                <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-400">
                  Full System Design
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                  Next-Gen End-to-End System Architecture
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
                  Designed for 100,000+ daily requests across Indian municipalities without server cold starts or database bottlenecks.
                </p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-sm">
                    01
                  </div>
                  <h4 className="font-bold text-white text-sm">WhatsApp Ingestion</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Webhook receives image &amp; GPS coordinates. Immediate 200 OK ACK avoids timeout while background worker initiates Gemini triage.
                  </p>
                </div>

                <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold text-sm">
                    02
                  </div>
                  <h4 className="font-bold text-white text-sm">FLUX.1 Inpainting</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Uses FLUX.1 Fill [dev] to preserve exact street architecture while removing debris. Sent back via WhatsApp to drive citizen engagement.
                  </p>
                </div>

                <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold text-sm">
                    03
                  </div>
                  <h4 className="font-bold text-white text-sm">Geodetic Haversine GPS</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Calculates geographic distance between Before &amp; After photo coordinates. Offsets &gt; 35m trigger automatic contractor payment freezes.
                  </p>
                </div>

                <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-sm">
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
        </section>
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
