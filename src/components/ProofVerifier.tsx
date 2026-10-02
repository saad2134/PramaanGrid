'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  ArrowRight,
  Eye,
  IndianRupee,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { Report, ClearanceProof } from '@/types';

interface ProofVerifierProps {
  report: Report;
  existingProof?: ClearanceProof | null;
  onVerified?: () => void;
}

export default function ProofVerifier({
  report,
  existingProof,
  onVerified,
}: ProofVerifierProps) {
  const [activeTab, setActiveTab] = useState<'legit' | 'fraud' | 'custom'>('legit');
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentProof, setCurrentProof] = useState<ClearanceProof | null>(
    existingProof || null
  );

  useEffect(() => {
    setCurrentProof(existingProof || null);
  }, [report.id, existingProof]);

  const SCENARIOS = {
    legit: {
      title: `Legitimate Onsite Cleanup (${report.ward})`,
      afterUrl: report.ai_clean_image_url || '/demo/banjara-clean.jpg',
      lat: report.lat + 0.00006, // ~6.8 meters away
      lng: report.lng + 0.00005,
      workerName: report.assigned_contractor ? `${report.assigned_contractor} Field Team` : 'Rameshwarappa Gowda',
      contractorName: report.assigned_contractor || 'Deccan CleanTech Operations Pvt Ltd',
      amountInr: 4500,
    },
    fraud: {
      title: 'Contractor Ghost Cleanup (Fraudulent Remote Photo)',
      afterUrl: '/demo/fraud-remote-site.jpg',
      lat: report.lat + 0.031, // ~3,420 meters (3.4 km) away!
      lng: report.lng + 0.024,
      workerName: 'Vikram Singh (Concessionaire Proxy)',
      contractorName: 'Apex Eco-Logistics Infra LLP',
      amountInr: 8500,
    },
  };

  const runVerification = async (scenarioKey: 'legit' | 'fraud') => {
    setIsVerifying(true);
    const scenario = SCENARIOS[scenarioKey];

    try {
      const res = await fetch('/api/verify-clearance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId: report.id,
          afterImageUrl: scenario.afterUrl,
          afterLat: scenario.lat,
          afterLng: scenario.lng,
          workerName: scenario.workerName,
          contractorName: scenario.contractorName,
          payoutAmountInr: scenario.amountInr,
        }),
      });

      const resData = await res.json();
      if (resData.success && resData.data?.proof) {
        setCurrentProof(resData.data.proof);
        if (onVerified) onVerified();
      }
    } catch (err) {
      console.error('Verification error:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex flex-col w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span>Proof-of-Clearance Forensic Terminal</span>
            </h3>
            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-300">
              Ticket #{report.id}
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Auditing contractor submission using Geodetic Haversine GPS & Gemini VLM Landmark Triangulation
          </p>
        </div>

        {/* 1-Click Simulation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('legit');
              runVerification('legit');
            }}
            disabled={isVerifying}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-600/30 transition-colors disabled:opacity-50"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Simulate Real Cleanup</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('fraud');
              runVerification('fraud');
            }}
            disabled={isVerifying}
            className="flex items-center gap-1.5 rounded-lg bg-rose-600/20 border border-rose-500/40 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-600/30 transition-colors disabled:opacity-50"
          >
            <AlertOctagon className="h-4 w-4 text-rose-400" />
            <span>Simulate Fraud Attempt</span>
          </button>
        </div>
      </div>

      {/* Visual Comparison: BEFORE vs AFTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {/* BEFORE IMAGE */}
        <div className="flex flex-col rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
          <div className="flex items-center justify-between bg-zinc-900/80 px-3 py-2 text-xs border-b border-zinc-800">
            <span className="font-semibold text-amber-400 flex items-center gap-1.5">
              <span>🔴 BEFORE (Citizen Report)</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">
              GPS: {report.lat.toFixed(4)}, {report.lng.toFixed(4)}
            </span>
          </div>
          <div className="relative h-56 w-full bg-black">
            <img
              src={report.original_image_url}
              alt="Before report"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-[10px] text-zinc-300 backdrop-blur-sm">
              Severity: {report.severity}/10 ({report.category})
            </div>
          </div>
        </div>

        {/* AFTER IMAGE */}
        <div className="flex flex-col rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
          <div className="flex items-center justify-between bg-zinc-900/80 px-3 py-2 text-xs border-b border-zinc-800">
            <span className="font-semibold text-cyan-400 flex items-center gap-1.5">
              <span>🔵 AFTER ({currentProof ? 'Contractor Submission' : 'Clean State Vision'})</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">
              {currentProof
                ? `GPS: ${currentProof.lat.toFixed(4)}, ${currentProof.lng.toFixed(4)}`
                : 'AI Clean State Projection'}
            </span>
          </div>
          <div className="relative h-56 w-full bg-black flex items-center justify-center">
            {isVerifying ? (
              <div className="flex flex-col items-center gap-2 text-emerald-400">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="text-xs font-medium">Running Geodetic & VLM Analysis...</span>
              </div>
            ) : currentProof ? (
              <img
                src={currentProof.after_image_url}
                alt="After cleanup"
                className="h-full w-full object-cover"
              />
            ) : report.ai_clean_image_url ? (
              <div className="relative h-full w-full">
                <img
                  src={report.ai_clean_image_url}
                  alt="AI Clean Vision"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 rounded-md bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 backdrop-blur-xs flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Vision of Tomorrow</span>
                </div>
              </div>
            ) : (
              <div className="text-center p-4 text-zinc-500 text-xs">
                Click "Simulate Real Cleanup" or "Simulate Fraud Attempt" to execute live audit.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Audit Decision Card */}
      {currentProof && (
        <div
          className={`mt-5 rounded-xl border p-4 transition-all ${
            currentProof.verification_status === 'VERIFIED'
              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100'
              : 'bg-rose-950/25 border-rose-500/50 text-rose-100'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              {currentProof.verification_status === 'VERIFIED' ? (
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
                  <AlertOctagon className="h-5 w-5" />
                </div>
              )}
              <div>
                <h4 className="font-bold text-sm tracking-tight">
                  {currentProof.verification_status === 'VERIFIED'
                    ? 'VERIFICATION PASSED: AUTHENTIC ON-SITE CLEARANCE'
                    : 'FRAUD INTERCEPTED: CONTRACTOR PAYMENT FROZEN'}
                </h4>
                <p className="text-xs opacity-80">
                  Contractor: {currentProof.contractor_name} ({currentProof.worker_name})
                </p>
              </div>
            </div>

            {/* Payout Escrow Status */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  Contractor Escrow
                </span>
                <span
                  className={`text-sm font-black ${
                    currentProof.payout_status === 'AUTHORIZED'
                      ? 'text-emerald-400'
                      : 'text-rose-400 line-through'
                  }`}
                >
                  ₹{currentProof.payout_amount_inr.toLocaleString()}
                </span>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold border ${
                  currentProof.payout_status === 'AUTHORIZED'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}
              >
                {currentProof.payout_status === 'AUTHORIZED'
                  ? 'PAYMENT RELEASED'
                  : 'FROZEN / BARRING NOTICE'}
              </span>
            </div>
          </div>

          {/* Audit Metrics Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 text-xs">
            {/* 1. GPS Distance Offset */}
            <div className="rounded-lg bg-black/30 p-2.5 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block">
                Geodetic Distance Offset
              </span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span
                  className={`text-base font-bold ${
                    currentProof.gps_distance_meters <= 35
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }`}
                >
                  {currentProof.gps_distance_meters < 1000
                    ? `${currentProof.gps_distance_meters}m`
                    : `${(currentProof.gps_distance_meters / 1000).toFixed(2)} km`}
                </span>
                <span className="text-[10px] text-zinc-400">
                  {currentProof.gps_distance_meters <= 35
                    ? '(Tolerance: <=35m)'
                    : '(VIOLATION: >35m)'}
                </span>
              </div>
            </div>

            {/* 2. VLM Confidence */}
            <div className="rounded-lg bg-black/30 p-2.5 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block">
                VLM Landmark Confidence
              </span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-base font-bold text-white">
                  {(currentProof.vlm_confidence * 100).toFixed(0)}%
                </span>
                <span className="text-[10px] text-zinc-400">
                  {currentProof.verification_status === 'VERIFIED'
                    ? 'Structural alignment verified'
                    : 'Anchor triangulation failed'}
                </span>
              </div>
            </div>

            {/* 3. Waste State */}
            <div className="rounded-lg bg-black/30 p-2.5 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block">
                Waste Mass State
              </span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span
                  className={`text-base font-bold ${
                    currentProof.verification_status === 'VERIFIED'
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }`}
                >
                  {currentProof.verification_status === 'VERIFIED'
                    ? '100% Cleared'
                    : 'Disputed / Incomplete'}
                </span>
              </div>
            </div>
          </div>

          {/* Forensic Reason */}
          <div className="mt-3 rounded-lg bg-black/40 p-3 text-xs border border-zinc-800 leading-relaxed">
            <span className="font-semibold text-zinc-300 block mb-0.5">
              Auditor AI Verdict:
            </span>
            <p className="text-zinc-200">{currentProof.verification_reason}</p>
          </div>

          {/* Structural Landmark Anchors List */}
          {currentProof.landmark_matches && currentProof.landmark_matches.length > 0 && (
            <div className="mt-3">
              <span className="text-[11px] font-semibold text-zinc-400 block mb-1.5">
                Structural Landmark Anchors:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {currentProof.landmark_matches.map((lm, idx) => (
                  <div
                    key={idx}
                    className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] border transition-all ${
                      lm.matched
                        ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-100'
                        : 'bg-rose-950/40 border-rose-500/30 text-rose-100'
                    }`}
                  >
                    <span className="font-medium text-zinc-200">
                      {lm.landmark}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 font-semibold shrink-0 rounded px-1.5 py-0.5 text-[10px] ${
                        lm.matched
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      }`}
                    >
                      {lm.matched ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 shrink-0" />
                          <span>Matched</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 shrink-0" />
                          <span>Mismatch / Missing</span>
                        </>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
