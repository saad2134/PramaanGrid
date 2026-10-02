'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TopBanner from '@/components/TopBanner';
import { ArrowLeft, Shield, EyeOff, Lock, FileCheck } from 'lucide-react';

export default function PrivacyPage() {
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
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Privacy Shield Policy
              </h1>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                Compliant with India DPDP Act 2023 and Municipal Data Charters
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 text-xs sm:text-sm leading-relaxed space-y-6">
            <section className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                <EyeOff className="h-4 w-4" />
                <span>1. Automatic Facial &amp; Number Plate Anonymization</span>
              </div>
              <p className="text-zinc-400">
                PramaanGrid processes all citizen WhatsApp photo submissions through a local client-side and edge-based privacy filter. Pedestrian faces, bystanders, and private vehicle registration plates are automatically detected and Gaussian blurred before any image is forwarded to municipal contractor registers or public dashboards.
              </p>
            </section>

            <section className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                <Lock className="h-4 w-4" />
                <span>2. Phone Number Cryptographic Hashing</span>
              </div>
              <p className="text-zinc-400">
                Raw citizen telephone numbers are never exposed to contractors, field workers, or public APIs. Each phone number is converted into a one-way salted SHA-256 hash (e.g. 9198480*****), safeguarding citizen reporters from harassment, commercial solicitation, or contractor retaliation.
              </p>
            </section>

            <section className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                <FileCheck className="h-4 w-4" />
                <span>3. Zero Commercial Data Monetization</span>
              </div>
              <p className="text-zinc-400">
                PramaanGrid is a free and open source civic protocol under GNU General Public License v3.0 (GPL-3.0). We do not display advertisements, sell location telemetry to private data brokers, or harvest user data for commercial profiling. All data remains exclusively within municipal civic operations.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
