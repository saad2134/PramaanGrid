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
  Image as ImageIcon,
} from 'lucide-react';
import { INITIAL_WHATSAPP_MESSAGES } from '@/lib/demo-data';
import { WhatsAppMessage } from '@/types';

interface WhatsAppSimulatorProps {
  onReportCreated?: () => void;
}

export default function WhatsAppSimulator({
  onReportCreated,
}: WhatsAppSimulatorProps) {
  const [messages, setMessages] = useState<WhatsAppMessage[]>(
    INITIAL_WHATSAPP_MESSAGES
  );
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPhotoType, setSelectedPhotoType] = useState<
    'real_dump' | 'troll_pet' | 'drain_clog'
  >('real_dump');

  const DEMO_PRESETS = {
    real_dump: {
      label: 'Dump at Banjara Hills',
      image:
        'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80',
      cleanImage:
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
      text: 'Heavy trash dumped on road corner blocking open drain near Road 12.',
      lat: 17.4156,
      lng: 78.4358,
      locationName: 'Banjara Hills, Hyderabad',
    },
    troll_pet: {
      label: 'Test Troll Filter (Pet/Meme)',
      image:
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
      cleanImage: '',
      text: 'Look at my cute dog sleeping!',
      lat: 17.385,
      lng: 78.4867,
      locationName: 'Abids, Hyderabad',
    },
    drain_clog: {
      label: 'Stormwater Culvert Plastic',
      image:
        'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=800&q=80',
      cleanImage:
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      text: 'Culvert is 100% choked with discarded plastic bags. Water backing up.',
      lat: 17.3616,
      lng: 78.4747,
      locationName: 'Charminar Drainage Channel',
    },
  };

  const handleSendMessage = async (presetKey?: keyof typeof DEMO_PRESETS) => {
    const preset = presetKey ? DEMO_PRESETS[presetKey] : DEMO_PRESETS[selectedPhotoType];
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
      // Send to internal triage endpoint
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: preset.image,
          lat: preset.lat,
          lng: preset.lng,
          address: preset.locationName,
          ward: 'Ward 98 - Central Zone',
          city: 'Hyderabad',
          notes: textToSend,
        }),
      });

      const resData = await response.json();

      if (resData.isTroll) {
        // Troll filter caught it!
        const botReply: WhatsAppMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `⚠️ PramaanGrid Troll Shield Alert:\n\n${resData.message}\n\nOur Gemini Flash model automatically filters out non-civic photos to protect municipal response resources. Please upload an image of solid waste or a drain blockage.`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isError: true,
        };
        setMessages((prev) => [...prev, botReply]);
      } else if (resData.success && resData.data) {
        const report = resData.data;
        const botReply: WhatsAppMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `✅ Report Authenticated & Filed!\n\n📋 Ticket ID: #${report.id}\n⚠️ Severity: ${report.severity}/10 (${report.ai_triage?.hazard_level || 'HIGH'} Hazard)\n📦 Estimated Volume: ${report.ai_triage?.estimated_volume_m3 || 3.2} m³\n\n🛡️ Privacy Filter: Pedestrian faces and vehicle registration plates blurred.\n\n✨ "Vision of Tomorrow" Projection:\nHere is how your street will look once cleared:`,
          cleanImageUrl: report.ai_clean_image_url || preset.cleanImage,
          ticketId: report.id,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        const contractorNotice: WhatsAppMessage = {
          id: `bot-notice-${Date.now()}`,
          sender: 'bot',
          text: `🔒 Anti-Fraud Lock Engaged: Contractor payout is frozen in municipal escrow. Payment will only release upon GPS & VLM Proof-of-Clearance verification.`,
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
    <div className="flex flex-col h-[650px] w-full max-w-md mx-auto rounded-3xl overflow-hidden border-4 border-zinc-800 bg-[#0b141a] shadow-2xl shadow-emerald-950/30">
      {/* WhatsApp Header */}
      <div className="flex items-center justify-between bg-[#202c33] px-4 py-3 border-b border-zinc-800 text-white">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-white font-bold text-sm">
            <span>PG</span>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#202c33]" />
          </div>
          <div>
            <h3 className="font-semibold text-sm flex items-center gap-1.5">
              <span>PramaanGrid Official</span>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </h3>
            <p className="text-[11px] text-zinc-400">
              {isProcessing ? 'AI Auditor analyzing...' : 'Verified Civic Gateway'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-500/30">
            Govt. of TS
          </span>
        </div>
      </div>

      {/* Preset Quick Actions for Judges/Presenters */}
      <div className="bg-[#111b21] px-3 py-2 border-b border-zinc-800/80 flex gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
        <button
          onClick={() => handleSendMessage('real_dump')}
          disabled={isProcessing}
          className="whitespace-nowrap rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-3 py-1 font-medium transition-colors"
        >
          🚨 Report Blackspot
        </button>
        <button
          onClick={() => handleSendMessage('troll_pet')}
          disabled={isProcessing}
          className="whitespace-nowrap rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3 py-1 font-medium transition-colors"
        >
          🐶 Test Troll Filter
        </button>
        <button
          onClick={() => handleSendMessage('drain_clog')}
          disabled={isProcessing}
          className="whitespace-nowrap rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 px-3 py-1 font-medium transition-colors"
        >
          🌊 Choked Drain
        </button>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'citizen' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3 text-xs shadow-md ${
                msg.sender === 'citizen'
                  ? 'bg-[#005c4b] text-white rounded-tr-none'
                  : msg.isError
                  ? 'bg-rose-950/80 border border-rose-600/40 text-rose-200 rounded-tl-none'
                  : 'bg-[#202c33] text-zinc-100 rounded-tl-none'
              }`}
            >
              {/* If message has uploaded photo */}
              {msg.imageUrl && (
                <div className="mb-2 overflow-hidden rounded-xl border border-black/20">
                  <img
                    src={msg.imageUrl}
                    alt="Citizen upload"
                    className="w-full h-36 object-cover"
                  />
                </div>
              )}

              {/* If message has location */}
              {msg.location && (
                <div className="mb-2 flex items-center gap-1.5 rounded-lg bg-black/20 p-2 text-[11px] text-emerald-200">
                  <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                  <span className="truncate">{msg.location.name}</span>
                </div>
              )}

              {/* Text Body */}
              <div className="whitespace-pre-wrap leading-relaxed">
                {msg.text}
              </div>

              {/* If message includes AI Clean Vision projection */}
              {msg.cleanImageUrl && (
                <div className="mt-3 overflow-hidden rounded-xl border border-emerald-500/40 bg-zinc-950 p-1">
                  <div className="flex items-center gap-1 px-1.5 py-1 text-[10px] font-semibold text-emerald-400">
                    <Sparkles className="h-3 w-3" />
                    <span>Vision of Tomorrow (AI Projection)</span>
                  </div>
                  <img
                    src={msg.cleanImageUrl}
                    alt="AI clean vision"
                    className="w-full h-36 object-cover rounded-lg"
                  />
                  <p className="mt-1 text-[9px] text-zinc-400 px-1 text-center">
                    Simulated clean state via FLUX.1 Inpainting
                  </p>
                </div>
              )}

              {/* Timestamp & Read ticks */}
              <div className="mt-1 flex items-center justify-end gap-1 text-[9px] text-zinc-400">
                <span>{msg.timestamp}</span>
                {msg.sender === 'citizen' && (
                  <CheckCheck className="h-3 w-3 text-cyan-400" />
                )}
              </div>
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex items-start">
            <div className="flex items-center gap-2 rounded-2xl rounded-tl-none bg-[#202c33] p-3 text-xs text-zinc-300">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
              <span>Gemini Flash running multimodal triage...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 bg-[#202c33] px-3 py-2 border-t border-zinc-800">
        <button
          onClick={() => handleSendMessage()}
          title="Attach Photo"
          className="rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-colors"
        >
          <Camera className="h-5 w-5 text-emerald-400" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Message or report a blackspot..."
          disabled={isProcessing}
          className="flex-1 rounded-xl bg-[#2a3942] px-3 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={isProcessing}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-colors disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
