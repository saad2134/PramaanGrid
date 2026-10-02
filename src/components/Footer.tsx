'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Mail,
  FileText,
  Activity,
  Award,
  Smartphone,
  ShieldCheck,
  MapPin,
  Scale,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { FooterBrandShowcase } from '@/components/ui/footer-brand-showcase';

interface FooterLink {
  text: string;
  href: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export default function Footer() {
  const columns: FooterColumn[] = [
    {
      title: 'Platform & Ops',
      links: [
        { text: 'Command Center', href: '/dashboard', icon: <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> },
        { text: 'System Status', href: '/status', icon: <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> },
        { text: 'Citizen WhatsApp Gateway', href: '/#workspace', icon: <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> },
        { text: 'Proof-of-Clearance Engine', href: '/#workspace', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> },
      ],
    },
    {
      title: 'Protocol & Charters',
      links: [
        { text: 'About PramaanGrid', href: '/about', icon: <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> },
        { text: 'Privacy Shield Policy', href: '/privacy', icon: <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> },
        { text: 'Statutory Municipal Charter', href: '/terms', icon: <Scale className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> },
        { text: 'SBM Urban 2.0 Compliance', href: '/terms', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> },
      ],
    },
    {
      title: 'Open Source & Trust',
      links: [
        {
          text: 'College.dev Hackathon 2026',
          href: 'https://college.dev',
          isExternal: true,
          icon: <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
        },
        {
          text: 'GNU GPL v3 License',
          href: 'https://www.gnu.org/licenses/gpl-3.0.html',
          isExternal: true,
          icon: <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
        },
        {
          text: 'GitHub Repository',
          href: 'https://github.com/saad2134/pramaan-grid',
          isExternal: true,
          icon: (
            <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          ),
        },
        {
          text: 'Contact Maintainer',
          href: 'mailto:reach.saad@outlook.com',
          isExternal: true,
          icon: <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
        },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#05070a] text-zinc-300 pt-12 sm:pt-16 pb-0 relative overflow-hidden border-t border-white/[0.08]">
      {/* Flowing Top Border Line (inspired by Attenomy) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12">
          {/* Logo & Brand Column (spans 2 cols on lg screens) */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            {/* Logo and Brand Heading */}
            <Link href="/" className="flex items-center gap-3 group mb-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                <img
                  src="/icon.png"
                  alt="PramaanGrid Logo"
                  className="h-full w-full object-contain rounded-2xl transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-white tracking-tight flex items-center gap-1.5">
                  PramaanGrid
                  <span className="text-emerald-400 font-serif italic font-normal text-sm">
                    (प्रमाण-ग्रिड)
                  </span>
                </span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">
                  Proof-of-Clearance Protocol
                </span>
              </div>
            </Link>

            {/* Mission Statement */}
            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm leading-relaxed mt-1">
              India&apos;s first AI-native Proof-of-Clearance protocol for municipal solid waste management. Blocking fraudulent contractor claims, enforcing statutory 12-hour SLAs, and transforming WhatsApp reports into cryptographically audited civic infrastructure.
            </p>

            {/* Developer / Social Squircle Ring */}
            <div className="flex items-center gap-2.5 mt-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] shadow-sm hover:border-emerald-500/40 transition-colors">
                <a
                  href="https://github.com/saad2134/pramaan-grid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-zinc-400 hover:text-white transition-colors"
                  aria-label="GitHub Repository"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <span className="h-3 w-[1px] bg-white/[0.1]" />
                <a
                  href="mailto:reach.saad@outlook.com"
                  className="p-1 text-zinc-400 hover:text-emerald-400 transition-colors"
                  aria-label="Email reach.saad@outlook.com"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Dynamic Categorized Columns with Real Pages & Icons */}
          {columns.map((column, index) => (
            <div key={index} className="flex flex-col gap-3.5 text-left">
              {/* Category Badge Header */}
              <div className="flex items-center gap-2">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-200 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-md w-fit select-none shadow-xs">
                  {column.title}
                </h3>
              </div>

              {/* Links List with Icons */}
              <div className="flex flex-col gap-2.5">
                {column.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className="text-zinc-400 hover:text-emerald-400 text-xs sm:text-[13px] transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    {link.icon && link.icon}
                    <span>{link.text}</span>
                    {link.isExternal && (
                      <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-auto" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider with gradient fade-out */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent mt-2 mb-6" />

        {/* Footer Bottom Row with Status: Operational Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3 pb-4">
          <p className="select-none text-center sm:text-left">
            &copy; 2026 PramaanGrid (प्रमाण-ग्रिड). Free and Open Source under GNU General Public License v3.0 (GPL-3.0).
          </p>

          {/* Status: Operational Button with Border linking to /status */}
          <Link
            href="/status"
            className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/35 bg-emerald-950/40 hover:bg-emerald-950/70 hover:border-emerald-500/60 px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-all duration-200 shadow-sm group cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] text-emerald-400 font-semibold group-hover:text-emerald-300">
              Status: Operational
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* 3D Curved Hover Brand Showcase with Horizon Light Arc (inspired by Attenomy) */}
      <FooterBrandShowcase text="PRAMAANGRID" />
    </footer>
  );
}
