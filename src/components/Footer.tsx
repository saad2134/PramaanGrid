import React from 'react';
import { ShieldCheck, ExternalLink, Heart, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-10 text-zinc-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">
                PramaanGrid (प्रमाण-ग्रिड)
              </p>
              <p className="text-[11px] text-zinc-500">
                Built for AI First Product Builder Hackathon 2026 — College.dev
              </p>
            </div>
          </div>

          {/* Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Zero-Friction WhatsApp Ingestion</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>FLUX.1 Clean Vision Inpainting</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>Geodetic Haversine GPS Auditing</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              <span>Gemini VLM Anti-Fraud Escrow</span>
            </span>
          </div>

          {/* Author & GitHub */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/saad2134"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <Code2 className="h-4 w-4 text-emerald-400" />
              <span>github.com/saad2134</span>
              <ExternalLink className="h-3 w-3 text-zinc-500" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-600 gap-2">
          <p>© 2026 PramaanGrid. Open source under MIT License. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for a cleaner Bharat.
          </p>
        </div>
      </div>
    </footer>
  );
}
