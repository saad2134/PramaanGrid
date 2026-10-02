'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TopBanner from '@/components/TopBanner';
import { ArrowLeft, Scale, Clock, ShieldAlert, Award } from 'lucide-react';

export default function TermsPage() {
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
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Statutory SLA &amp; Municipal Escrow Charter
              </h1>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                Swachh Bharat Mission (SBM) Urban 2.0 and DMAUD Governance Framework
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 text-xs sm:text-sm leading-relaxed space-y-6">
            <section className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                <Clock className="h-4 w-4" />
                <span>1. Statutory 12-Hour Citizen Resolution SLA</span>
              </div>
              <p className="text-zinc-400">
                Under the Municipal Solid Waste Management Rules 2016 and SBM Urban 2.0 mandates, urban local bodies are legally obligated to resolve solid waste blackspots within a statutory 12-hour window. If a reported blackspot remains unaddressed past 72 hours, PramaanGrid automatically drafts a legal Right to Information (RTI) requisition under Section 6(1) of the RTI Act 2005.
              </p>
            </section>

            <section className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-rose-400 font-bold mb-2">
                <ShieldAlert className="h-4 w-4" />
                <span>2. Anti-Fraud Contractor Escrow Lock</span>
              </div>
              <p className="text-zinc-400">
                Contractor billing is tied directly to algorithmic Proof-of-Clearance verification. Payout funds are held in escrow. Payouts are frozen immediately if the Geodetic Haversine GPS offset exceeds 35 meters, or if the Gemini Vision Language Model fails to match at least 3 structural physical anchors between the Before and After cleanup photos.
              </p>
            </section>

            <section className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                <Award className="h-4 w-4" />
                <span>3. GNU General Public License v3.0</span>
              </div>
              <p className="text-zinc-400">
                PramaanGrid is licensed under the GNU GPL v3. Anyone may review, audit, verify, and host this protocol for civic benefit. No proprietary lock-in is imposed on municipal bodies or citizen users.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
