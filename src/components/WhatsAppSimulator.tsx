'use client';

import React, { useState } from 'react';
import {
  Send,
  Camera,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCheck,
  AlertTriangle,
  Loader2,
  Paperclip,
  Smile,
  ChevronLeft,
  MoreVertical,
  Wifi,
  Signal,
  Battery
} from 'lucide-react';
import { WhatsAppMessage } from '@/types';

interface WhatsAppSimulatorProps {
  onReportCreated?: () => void;
}

export default function WhatsAppSimulator({
  onReportCreated,
}: WhatsAppSimulatorProps) {
  const DEMO_PRESETS = {
    real_dump: {
      label: '🚨 Report Blackspot',
      image: '/demo/banjara-dump.jpg',
      cleanImage: '/demo/banjara-clean.jpg',
      text: 'Namaste. There is a huge garbage dump here for 3 days blocking our street drain near Road 12 Banjara Hills.',
      lat: 17.4156,
      lng: 78.4358,
      locationName: 'Road No. 12, Banjara Hills, Hyderabad',
      ticketId: 'PG-HYD-01',
      ward: 'Ward 98 (Jubilee Hills)',
      severity: '9/10 (Critical - Drain Blockage)',
      volume: '4.6 m³',
      contractor: 'Deccan CleanTech Operations Pvt Ltd.',
    },
    troll_pet: {
      label: '🐶 Test Troll Filter',
      image: '/demo/troll-puppy.jpg',
      cleanImage: '',
      text: 'Look at my cute puppy sleeping peacefully on the floor!',
      lat: 17.385,
      lng: 78.4867,
      locationName: 'Living Room, Hyderabad',
      ticketId: '',
      ward: '',
      severity: '',
      volume: '',
      contractor: '',
    },
    drain_clog: {
      label: '🌊 Choked Drain',
      image: '/demo/drain-choked.jpg',
      cleanImage: '/demo/drain-clean.jpg',
      text: 'Roadside stormwater culvert is completely choked with single-use plastic bottles and dark sludge. Monsoon overflow danger.',
      lat: 17.3616,
      lng: 78.4747,
      locationName: 'Charminar Stormwater Drain, Hyderabad',
      ticketId: 'PG-HYD-04',
      ward: 'Ward 74 (Charminar)',
      severity: '10/10 (Severe Culvert Blockage)',
      volume: '6.2 m³',
      contractor: 'Charminar Drainage Services LLP',
    },
  };

  const initialMessages: WhatsAppMessage[] = [
    {
      id: 'msg-1',
      sender: 'citizen',
      text: 'Namaste. There is a huge garbage dump here for 3 days blocking our street drain near Road 12 Banjara Hills.',
      imageUrl: '/demo/banjara-dump.jpg',
      location: {
        lat: 17.4156,
        lng: 78.4358,
        name: 'Road No. 12, Banjara Hills, Hyderabad',
      },
      timestamp: '10:14 AM',
    },
    {
      id: 'msg-2',
      sender: 'bot',
      text: `✅ Report Received & Authenticated!\n\nTicket ID: #PG-HYD-01\nWard: Ward 98 (Jubilee Hills)\nAI Severity Rating: 9/10 (Critical - Drain Blockage)\nEstimated Volume: 4.6 m³\n\n🛡️ Privacy Shield: Pedestrian faces & vehicle plates automatically blurred.\n\n✨ Here is PramaanGrid's "Vision of Tomorrow": what your street can look like once cleared:`,
      cleanImageUrl: '/demo/banjara-clean.jpg',
      ticketId: 'PG-HYD-01',
      timestamp: '10:14 AM',
    },
    {
      id: 'msg-3',
      sender: 'bot',
      text: `👷 Contractor Assigned: Deccan CleanTech Operations Pvt Ltd.\n\nSLA: 12 Hours.\nNotice: Contractor payout is cryptographically locked until an onsite GPS-verified "After" photo passes VLM Proof-of-Clearance inspection.`,
      timestamp: '10:15 AM',
    },
  ];

  const [messages, setMessages] = useState<WhatsAppMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async (presetKey: keyof typeof DEMO_PRESETS = 'real_dump') => {
    const preset = DEMO_PRESETS[presetKey];
    const textToSend = inputText.trim() || preset.text;

    const userMsgId = `user-${Date.now()}`;
    const newUserMsg: WhatsAppMessage = {
      id: userMsgId,
      sender: 'citizen',
      text: textToSend,
      imageUrl: preset.image,
      location: {
        lat: preset.lat,
        lng: preset.lng,
        name: preset.locationName,
      },
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText('');
    setIsProcessing(true);

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: preset.image,
          lat: preset.lat,
          lng: preset.lng,
          address: preset.locationName,
          ward: preset.ward || 'Ward 98 - Central Zone',
          city: 'Hyderabad',
          notes: textToSend,
        }),
      });

      const resData = await response.json();

      if (resData.isTroll || presetKey === 'troll_pet') {
        const botReply: WhatsAppMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `⚠️ PramaanGrid Troll Shield Alert:\n\n${resData.message || 'Non-civic submission detected (pet/meme). Gemini Flash multimodal audit rejected this upload to prevent spam.'}\n\nPlease submit an authentic image of a municipal solid waste blackspot or stormwater drain.`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isError: true,
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        const botReply: WhatsAppMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `✅ Report Received & Authenticated!\n\nTicket ID: #${preset.ticketId || 'PG-HYD-01'}\nWard: ${preset.ward || 'Ward 98 (Jubilee Hills)'}\nAI Severity Rating: ${preset.severity || '9/10 (Critical - Drain Blockage)'}\nEstimated Volume: ${preset.volume || '4.6 m³'}\n\n🛡️ Privacy Shield: Pedestrian faces & vehicle plates automatically blurred.\n\n✨ Here is PramaanGrid's "Vision of Tomorrow": what your street can look like once cleared:`,
          cleanImageUrl: preset.cleanImage,
          ticketId: preset.ticketId || 'PG-HYD-01',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        const contractorNotice: WhatsAppMessage = {
          id: `bot-notice-${Date.now()}`,
          sender: 'bot',
          text: `👷 Contractor Assigned: ${preset.contractor || 'Deccan CleanTech Operations Pvt Ltd.'}\n\nSLA: 12 Hours.\nNotice: Contractor payout is cryptographically locked until an onsite GPS-verified "After" photo passes VLM Proof-of-Clearance inspection.`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setMessages((prev) => [...prev, botReply, contractorNotice]);
        if (onReportCreated) onReportCreated();
      }
    } catch (err) {
      console.error('Simulator error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-2 sm:p-4 w-full">
      {/* REAL SMARTPHONE CHASSIS FRAME with proper flagship dimensions */}
      <div className="relative w-full max-w-[390px] h-[780px] sm:h-[820px] rounded-[52px] p-[11px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border border-zinc-600/40 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_2px_rgba(255,255,255,0.25)] select-none">
        {/* Physical Button: Silent / Action Switch (Left) */}
        <div className="absolute -left-[3.5px] top-[100px] w-[3.5px] h-[28px] bg-zinc-600 rounded-l-sm" />
        {/* Physical Button: Volume Up (Left) */}
        <div className="absolute -left-[3.5px] top-[148px] w-[3.5px] h-[52px] bg-zinc-600 rounded-l-sm" />
        {/* Physical Button: Volume Down (Left) */}
        <div className="absolute -left-[3.5px] top-[214px] w-[3.5px] h-[52px] bg-zinc-600 rounded-l-sm" />
        {/* Physical Button: Power / Lock (Right) */}
        <div className="absolute -right-[3.5px] top-[170px] w-[3.5px] h-[74px] bg-zinc-600 rounded-r-sm" />

        {/* INNER SCREEN CONTAINER */}
        <div className="relative h-full w-full rounded-[42px] overflow-hidden bg-[#0b141a] flex flex-col shadow-inner border border-black/80">
          {/* Dynamic Island Pill */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-40 w-[114px] h-[26px] bg-black rounded-full flex items-center justify-between px-3 shadow-lg border border-white/[0.04]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#080b10] ring-1 ring-blue-900/40 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-500/30" />
            </div>
            <div className="w-2 h-2 rounded-full bg-[#0c0e14]" />
          </div>

          {/* Realistic Phone Status Bar */}
          <div className="relative z-30 pt-3 pb-1 px-7 flex items-center justify-between text-white text-[12px] font-semibold bg-[#202c33]/90 backdrop-blur-sm select-none">
            <span className="font-mono tracking-tight text-zinc-200">10:14</span>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Signal className="w-3.5 h-3.5 fill-current" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-mono text-zinc-300">98%</span>
                <div className="w-5 h-2.5 rounded-[4px] border border-zinc-400 p-[1px] flex items-center">
                  <div className="h-full w-[95%] bg-emerald-400 rounded-[2px]" />
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Official Verified Header */}
          <div className="relative z-20 flex items-center justify-between bg-[#202c33] px-3 py-2.5 border-b border-white/[0.06] text-white shadow-md">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="text-zinc-400 hover:text-white transition-colors"
                title="Back"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Pramaan Bot Avatar */}
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-950 p-0.5 shadow-sm">
                <img
                  src="/icon.png"
                  alt="Pramaan Bot Avatar"
                  className="h-full w-full object-cover rounded-full"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#202c33]" />
              </div>

              {/* Title & Verified Info */}
              <div className="flex flex-col text-left">
                <h3 className="font-bold text-xs sm:text-[13px] flex items-center gap-1 leading-tight">
                  <span>PramaanGrid Official</span>
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400/20 shrink-0" />
                </h3>
                <p className="text-[10px] text-zinc-400 leading-tight">
                  {isProcessing ? 'AI Auditor analyzing...' : 'Verified Civic Gateway'}
                </p>
              </div>
            </div>

            {/* Govt of TS Pill */}
            <div className="flex items-center gap-1.5">
              <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/35 font-mono">
                Govt. of TS
              </span>
              <button
                type="button"
                className="text-zinc-400 hover:text-white p-1"
                title="Options"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Interactive Preset Chips for Quick Evaluation */}
          <div className="relative z-10 bg-[#111b21] px-3 py-2 border-b border-white/[0.06] flex gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            <button
              onClick={() => handleSendMessage('real_dump')}
              disabled={isProcessing}
              className="whitespace-nowrap rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-3 py-1 font-semibold transition-all hover:scale-105 active:scale-95"
            >
              🚨 Report Blackspot
            </button>
            <button
              onClick={() => handleSendMessage('troll_pet')}
              disabled={isProcessing}
              className="whitespace-nowrap rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3 py-1 font-semibold transition-all hover:scale-105 active:scale-95"
            >
              🐶 Test Troll Filter
            </button>
            <button
              onClick={() => handleSendMessage('drain_clog')}
              disabled={isProcessing}
              className="whitespace-nowrap rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 px-3 py-1 font-semibold transition-all hover:scale-105 active:scale-95"
            >
              🌊 Choked Drain
            </button>
          </div>

          {/* WhatsApp Chat Messages Feed with authentic background */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#0b141a] bg-[radial-gradient(#1e2c34_1px,transparent_1px)] [background-size:18px_18px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'citizen' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-2.5 text-xs shadow-md ${
                    msg.sender === 'citizen'
                      ? 'bg-[#005c4b] text-white rounded-tr-none'
                      : msg.isError
                      ? 'bg-rose-950/85 border border-rose-600/40 text-rose-200 rounded-tl-none'
                      : 'bg-[#202c33] text-zinc-100 rounded-tl-none border border-white/[0.04]'
                  }`}
                >
                  {/* Attached Real Photo (Citizen Upload) */}
                  {msg.imageUrl && (
                    <div className="mb-2 overflow-hidden rounded-xl border border-black/30 bg-black">
                      <div className="bg-black/60 px-2 py-0.5 text-[9px] font-mono text-zinc-300 flex items-center justify-between">
                        <span>Citizen upload</span>
                        <span>10:14 AM</span>
                      </div>
                      <img
                        src={msg.imageUrl}
                        alt="Citizen upload"
                        className="w-full h-36 object-cover"
                      />
                    </div>
                  )}

                  {/* Geotagged Location */}
                  {msg.location && (
                    <div className="mb-2 flex items-center gap-1.5 rounded-lg bg-black/25 p-2 text-[11px] text-emerald-200 border border-emerald-500/20">
                      <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                      <span className="truncate font-medium">{msg.location.name}</span>
                    </div>
                  )}

                  {/* Text Message Content */}
                  <div className="whitespace-pre-wrap leading-relaxed text-[11.5px]">
                    {msg.text}
                  </div>

                  {/* AI Clean Vision Inpainting Projection */}
                  {msg.cleanImageUrl && (
                    <div className="mt-2.5 overflow-hidden rounded-xl border border-emerald-500/40 bg-black/70 p-1.5">
                      <div className="flex items-center gap-1 px-1 py-1 text-[10px] font-bold text-emerald-400">
                        <Sparkles className="h-3 w-3 text-emerald-400" />
                        <span>Vision of Tomorrow (AI Projection)</span>
                      </div>
                      <img
                        src={msg.cleanImageUrl}
                        alt="AI clean vision"
                        className="w-full h-36 object-cover rounded-lg"
                      />
                      <p className="mt-1 text-[9px] text-zinc-400 px-1 text-center font-mono">
                        Simulated clean state via FLUX.1 Inpainting
                      </p>
                    </div>
                  )}

                  {/* Message Timestamp & Read Status */}
                  <div className="mt-1.5 flex items-center justify-end gap-1 text-[9px] text-zinc-400">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'citizen' && (
                      <CheckCheck className="h-3.5 w-3.5 text-cyan-400" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex items-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-none bg-[#202c33] p-2.5 text-xs text-zinc-300 border border-white/[0.04]">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                  <span className="text-[11px]">Gemini Flash running multimodal triage...</span>
                </div>
              </div>
            )}
          </div>

          {/* WhatsApp Bottom Input Dock */}
          <div className="flex items-center gap-1.5 bg-[#202c33] px-2.5 py-2 border-t border-white/[0.06]">
            <button
              type="button"
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              title="Emoji"
            >
              <Smile className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              title="Attach"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Message or report a blackspot..."
              disabled={isProcessing}
              className="flex-1 rounded-2xl bg-[#2a3942] px-3.5 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />

            <button
              type="button"
              onClick={() => handleSendMessage('real_dump')}
              className="p-1.5 text-zinc-400 hover:text-emerald-400 transition-colors"
              title="Camera"
            >
              <Camera className="h-5 w-5" />
            </button>

            <button
              onClick={() => handleSendMessage('real_dump')}
              disabled={isProcessing}
              title="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00a884] hover:bg-emerald-500 text-white transition-colors disabled:opacity-50 shadow-md"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          {/* Phone Bottom Home Indicator */}
          <div className="bg-[#202c33] pb-1.5 pt-0.5">
            <div className="w-28 h-1 bg-white/40 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
