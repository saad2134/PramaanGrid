'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import StatsBanner from '@/components/StatsBanner';
import LeafletMap from '@/components/LeafletMap';
import ProofVerifier from '@/components/ProofVerifier';
import GenRTIModal from '@/components/GenRTIModal';
import Footer from '@/components/Footer';
import {
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  Filter,
  Search,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Report, CivicMetrics, ReportStatus, ReportCategory } from '@/types';
import { INITIAL_METRICS, INITIAL_REPORTS } from '@/lib/demo-data';

export default function DashboardPage() {
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [metrics, setMetrics] = useState<CivicMetrics>(INITIAL_METRICS);
  const [selectedReport, setSelectedReport] = useState<Report>(INITIAL_REPORTS[0]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [cityFilter, setCityFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRtiModalOpen, setIsRtiModalOpen] = useState(false);
  const [showProofDrawer, setShowProofDrawer] = useState(false);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/reports');
      const json = await res.json();
      if (json.success && json.data) {
        setReports(json.data);
        if (json.metrics) setMetrics(json.metrics);
      }
    } catch (e) {
      console.error('Failed to fetch dashboard reports:', e);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = reports.filter((r) => {
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    if (categoryFilter !== 'ALL' && r.category !== categoryFilter) return false;
    if (cityFilter !== 'ALL' && r.city.toLowerCase() !== cityFilter.toLowerCase())
      return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        r.id.toLowerCase().includes(query) ||
        r.address.toLowerCase().includes(query) ||
        r.ward.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      <Navbar />

      {/* SUB-HEADER */}
      <div className="border-b border-zinc-800 bg-zinc-950 px-4 sm:px-6 lg:px-8 py-4">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Municipal Operations Command Center</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  Live Audit Feed
                </span>
              </h1>
              <p className="text-xs text-zinc-400">
                Department of Municipal Administration &amp; Urban Development (DMAUD)
              </p>
            </div>
          </div>

          {/* Quick city tabs */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl bg-zinc-900 p-1 border border-zinc-800 text-xs">
            {['ALL', 'Hyderabad', 'Bengaluru', 'Delhi'].map((c) => (
              <button
                key={c}
                onClick={() => setCityFilter(c)}
                className={`rounded-lg px-3 py-1 font-medium transition-colors ${
                  cityFilter === c
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top metrics summary */}
        <StatsBanner metrics={metrics} />

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-800">
          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ticket, ward, road..."
              className="w-full rounded-xl bg-zinc-900 border border-zinc-800 pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto text-xs">
            <span className="text-zinc-500 text-[11px] font-medium mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" />
              <span>Status:</span>
            </span>

            {['ALL', 'PENDING', 'ASSIGNED', 'RESOLVED', 'FRAUD'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                  statusFilter === st
                    ? 'bg-zinc-800 text-white border border-zinc-700'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}

            <div className="h-4 w-[1px] bg-zinc-800 mx-1 hidden sm:block" />

            {['ALL', 'garbage', 'drain'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-lg px-2.5 py-1 font-semibold capitalize transition-colors ${
                  categoryFilter === cat
                    ? 'bg-zinc-800 text-white border border-zinc-700'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN DASHBOARD SPLIT: Map on Left, Incidents on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Map Column */}
          <div className="lg:col-span-7 h-[600px] flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
              <span className="font-semibold flex items-center gap-1 text-white">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                <span>Geospatial Blackspot Density Heatmap</span>
              </span>
              <span>Showing {filteredReports.length} Active Geo-Clusters</span>
            </div>

            <div className="flex-1 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl">
              <LeafletMap
                reports={filteredReports}
                selectedReportId={selectedReport?.id}
                onSelectReport={(r) => {
                  setSelectedReport(r);
                  setShowProofDrawer(true);
                }}
              />
            </div>
          </div>

          {/* Incident Tickets List */}
          <div className="lg:col-span-5 flex flex-col h-[600px] rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-xl">
            <div className="flex items-center justify-between bg-zinc-900/90 px-4 py-3 border-b border-zinc-800">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <span>Incident Feed</span>
                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300">
                  {filteredReports.length}
                </span>
              </span>
              <span className="text-[10px] text-zinc-400">Click to inspect</span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {filteredReports.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-xs p-6 text-center">
                  <span>No blackspots match the selected filters.</span>
                </div>
              ) : (
                filteredReports.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => {
                      setSelectedReport(r);
                      setShowProofDrawer(true);
                    }}
                    className={`flex gap-3 rounded-xl p-3 cursor-pointer transition-all border ${
                      selectedReport?.id === r.id
                        ? 'bg-zinc-900 border-emerald-500/80 shadow-md'
                        : 'bg-zinc-900/40 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-black border border-zinc-800">
                      <img
                        src={r.original_image_url}
                        alt="Thumbnail"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-xs text-white truncate">
                          #{r.id}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                            r.status === 'RESOLVED'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : r.status === 'FRAUD'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {r.status}
                        </span>
                      </div>

                      <p className="text-zinc-200 text-xs font-medium truncate">
                        {r.address}
                      </p>

                      <div className="mt-1 flex items-center justify-between text-[10px] text-zinc-400">
                        <span>{r.ward}</span>
                        <span className="font-semibold text-amber-400">
                          Severity: {r.severity}/10
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM DETAIL / FORENSIC VERIFIER INSPECTOR */}
        {selectedReport && (
          <div className="mt-8 rounded-3xl bg-zinc-950 border border-zinc-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-3">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider">
                  Active Forensic Inspection
                </span>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                  <span>#{selectedReport.id}</span>
                  <span className="text-zinc-400 text-sm font-normal">
                    — {selectedReport.address} ({selectedReport.city})
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRtiModalOpen(true)}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-2 text-xs font-semibold transition-colors"
                >
                  <Scale className="h-4 w-4" />
                  <span>Gen-RTI Notice</span>
                </button>
              </div>
            </div>

            {/* Proof-of-Clearance Forensic Terminal for Selected Report */}
            <ProofVerifier
              report={selectedReport}
              onVerified={fetchReports}
            />
          </div>
        )}
      </main>

      <GenRTIModal
        report={selectedReport}
        isOpen={isRtiModalOpen}
        onClose={() => setIsRtiModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
