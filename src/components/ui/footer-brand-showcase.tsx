'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface FooterBrandShowcaseProps {
  text?: string;
  className?: string;
}

export const FooterBrandShowcase: React.FC<FooterBrandShowcaseProps> = ({
  text = 'PRAMAANGRID',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' });

  // Map mouse & touch coordinates across the component
  useEffect(() => {
    if (isHovered && containerRef.current && cursor.x !== 0 && cursor.y !== 0) {
      const rect = containerRef.current.getBoundingClientRect();
      const rawRatioX = (cursor.x - rect.left) / rect.width;
      const rawRatioY = (cursor.y - rect.top) / rect.height;

      const innerMarginX = 0.12;
      const mappedX = (rawRatioX - innerMarginX) / (1 - 2 * innerMarginX);
      const clampedX = Math.max(-0.1, Math.min(1.1, mappedX));

      const cxPercentage = clampedX * 100;
      const cyPercentage = rawRatioY * 100;

      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });

      setMousePos({
        x: Math.max(0, Math.min(100, rawRatioX * 100)),
        y: Math.max(0, Math.min(100, rawRatioY * 100)),
      });
    } else {
      setMaskPosition({ cx: '50%', cy: '50%' });
      setMousePos({ x: 50, y: 50 });
    }
  }, [cursor, isHovered]);

  const handlePointerMove = (clientX: number, clientY: number) => {
    setCursor({ x: clientX, y: clientY });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMaskPosition({ cx: '50%', cy: '50%' });
      }}
      onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        setIsHovered(true);
        if (e.touches.length > 0) {
          handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onTouchMove={(e) => {
        if (e.touches.length > 0) {
          handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onTouchEnd={() => {
        setIsHovered(false);
        setMaskPosition({ cx: '50%', cy: '50%' });
      }}
      className={`relative w-full overflow-visible select-none cursor-pointer pt-3 sm:pt-6 pb-0 z-10 ${className}`}
    >
      {/* Ambient Volumetric Upward Spotlight - Subtle diffusion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? {
                opacity: [0.15, 0.35, 0.15],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-20 sm:-top-32 bottom-0 left-0 right-0 w-full blur-3xl pointer-events-none bg-[radial-gradient(ellipse_75%_90%_at_50%_100%,rgba(16,185,129,0.12)_0%,rgba(16,185,129,0.02)_50%,transparent_75%)]"
      />

      {/* Interactive Smooth Cursor Following Light Glow */}
      <motion.div
        animate={{
          left: `${mousePos.x}%`,
          opacity: isHovered ? 0.4 : 0.12,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 22 }}
        className="absolute -top-16 sm:-top-24 bottom-0 -translate-x-1/2 w-80 sm:w-[500px] bg-gradient-to-t from-emerald-500/15 via-emerald-400/5 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Unified SVG: Concentric 3D Hover Text + Parallel Horizon Arc */}
      <svg
        className="w-full h-auto overflow-visible"
        viewBox="0 0 1440 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Parallel Arcs in exact same coordinate system */}
          <path
            id="pgBrandTextConcentricArc"
            d="M 120 195 Q 720 85 1320 195"
            fill="none"
          />

          <path
            id="pgBrandHorizonConcentricArc"
            d="M 0 240 Q 720 130 1440 240"
            fill="none"
          />

          {/* Radial Reveal Mask for 3D Spotlight Text */}
          <motion.radialGradient
            id="pgBrandRevealMask"
            gradientUnits="userSpaceOnUse"
            r="45%"
            initial={{ cx: '50%', cy: '50%' }}
            animate={maskPosition}
            transition={{
              type: 'spring',
              stiffness: 160,
              damping: 24,
              mass: 0.4,
            }}
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="55%" stopColor="white" stopOpacity="0.85" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </motion.radialGradient>

          <mask id="pgBrandTextMask" maskUnits="userSpaceOnUse" x="-100%" y="-100%" width="300%" height="300%">
            <rect
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
              fill="url(#pgBrandRevealMask)"
            />
          </mask>

          {/* X-Axis Opacity Taper Gradient for Text */}
          <linearGradient id="pgBrandTextTaperGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="12%" stopColor="white" stopOpacity="0.30" />
            <stop offset="28%" stopColor="white" stopOpacity="0.85" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
            <stop offset="72%" stopColor="white" stopOpacity="0.85" />
            <stop offset="88%" stopColor="white" stopOpacity="0.30" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <mask id="pgBrandTextTaperMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="250">
            <rect x="0" y="0" width="1440" height="250" fill="url(#pgBrandTextTaperGradient)" />
          </mask>

          {/* Horizon Laser Gradients with Emerald/Cyan Civic Theme */}
          <linearGradient id="pgDarkHorizonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="15%" stopColor="#10b981" stopOpacity="0.35" />
            <stop offset="35%" stopColor="#34d399" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#6ee7b7" stopOpacity="1" />
            <stop offset="65%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#06b6d4" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>

          {/* Multi-Layered Laser Glow Filters */}
          <filter id="pgLaserGlowWide" x="-30%" y="-300%" width="160%" height="700%">
            <feGaussianBlur stdDeviation="9" result="blurWide" />
          </filter>
          <filter id="pgLaserGlowMid" x="-30%" y="-300%" width="160%" height="700%">
            <feGaussianBlur stdDeviation="3.5" result="blurMid" />
          </filter>
          <filter id="pgLaserGlowCore" x="-30%" y="-300%" width="160%" height="700%">
            <feGaussianBlur stdDeviation="1.2" result="blurCore" />
            <feMerge>
              <feMergeNode in="blurCore" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Theme Color Gradients for 3D Text */}
          <linearGradient id="pgThemeTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="25%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#34d399" />
            <stop offset="75%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="pgThemeStrokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#065f46" stopOpacity="0.3" />
            <stop offset="30%" stopColor="#047857" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#047857" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#065f46" stopOpacity="0.3" />
          </linearGradient>

          {/* Horizon Occlusion ClipPath */}
          <clipPath id="pgAboveHorizonClip">
            <path d="M -100 -100 L 1540 -100 L 1540 240 Q 720 130 -100 240 Z" />
          </clipPath>
        </defs>

        {/* 3D HOVER TEXT SECTION (Clipped behind horizon arc) */}
        <g clipPath="url(#pgAboveHorizonClip)">
          {/* Ambient Stroke Text Outline along concentric arc */}
          <motion.text
            textAnchor="middle"
            dominantBaseline="central"
            strokeWidth="1.5"
            stroke="url(#pgThemeStrokeGradient)"
            strokeLinejoin="round"
            mask="url(#pgBrandTextTaperMask)"
            className="fill-transparent font-sans text-[126px] font-black tracking-wider opacity-60"
            initial={{ strokeDashoffset: 2000, strokeDasharray: 2000 }}
            animate={{
              strokeDashoffset: 0,
              strokeDasharray: 2000,
            }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
            }}
          >
            <textPath href="#pgBrandTextConcentricArc" startOffset="50%" textAnchor="middle">
              {text}
            </textPath>
          </motion.text>

          {/* Interactive Spotlight Reveal Text along same concentric arc */}
          <text
            textAnchor="middle"
            dominantBaseline="central"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            stroke="#34d399"
            fill="url(#pgThemeTextGradient)"
            mask="url(#pgBrandTextMask)"
            className="font-sans text-[126px] font-black tracking-wider drop-shadow-[0_0_24px_rgba(16,185,129,0.55)]"
          >
            <textPath href="#pgBrandTextConcentricArc" startOffset="50%" textAnchor="middle">
              {text}
            </textPath>
          </text>
        </g>

        {/* HORIZON LIGHT ARC SECTION (Multi-Layered Glowing Horizon Beam) */}
        <path
          d="M 0 240 Q 720 130 1440 240"
          stroke="url(#pgDarkHorizonGrad)"
          strokeWidth="16"
          className="opacity-60"
          filter="url(#pgLaserGlowWide)"
        />
        <path
          d="M 0 240 Q 720 130 1440 240"
          stroke="url(#pgDarkHorizonGrad)"
          strokeWidth="6"
          className="opacity-80"
          filter="url(#pgLaserGlowMid)"
        />
        <path
          d="M 0 240 Q 720 130 1440 240"
          stroke="url(#pgDarkHorizonGrad)"
          strokeWidth="2.5"
          className="opacity-95"
          filter="url(#pgLaserGlowCore)"
        />
        <path
          d="M 0 240 Q 720 130 1440 240"
          stroke="#a7f3d0"
          strokeWidth="1.2"
          className="opacity-100"
        />
      </svg>
    </div>
  );
};
