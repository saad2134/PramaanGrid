'use client';

import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Scale,
  X,
} from 'lucide-react';
import { Report } from '@/types';

interface GenRTIModalProps {
  report: Report;
  isOpen: boolean;
  onClose: () => void;
}

export default function GenRTIModal({
  report,
  isOpen,
  onClose,
}: GenRTIModalProps) {
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  if (!isOpen) return null;

  const hoursElapsed = Math.round(
    (Date.now() - new Date(report.created_at).getTime()) / (3600 * 1000)
  );

  const rtiTextEnglish = `FORM 'A'
APPLICATION FOR INFORMATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005

To:
The Public Information Officer (PIO),
Municipal Corporation / Urban Local Body,
Zone / Ward: ${report.ward}, ${report.city}.

1. Full Name of Applicant: [Citizen via Nagar-Drishti Protocol]
2. Subject Matter of Information:
   Non-Clearance of Solid Waste Blackspot & Clogged Infrastructure at ${report.address}
   (Nagar-Drishti Ticket Ref: #${report.id})

3. Background & Facts:
   An urgent civic hazard regarding municipal solid waste / drain blockage was documented and submitted on ${new Date(
     report.created_at
   ).toLocaleDateString()} at coordinates Latitude ${report.lat.toFixed(
    4
  )}, Longitude ${report.lng.toFixed(4)}.
   More than ${hoursElapsed} hours have elapsed without clearance, violating the 48-hour Citizen Charter SLA under the Solid Waste Management Rules, 2016.

4. Particulars of Information Sought:
   (i) Certified copies of daily logbooks and contractor deployment records for Ward ${
     report.ward
   } from ${new Date(report.created_at).toLocaleDateString()} to date.
   (ii) Name, designation, and official contact details of the Ward Sanitary Inspector responsible for this area.
   (iii) Name of the empanelled concessionaire/contractor awarded the waste management tender for this ward, along with the penalty clauses applicable for SLA breaches.
   (iv) Certified copy of the action taken report (ATR) on Ticket #${report.id}.
   (v) Total budget disbursed to the contractor for this ward in the current financial quarter.

5. Application Fee:
   Indian Postal Order / Court Fee Stamp of ₹10 attached herewith.

Date: ${new Date().toLocaleDateString()}
Place: ${report.city}
Signature of Applicant`;

  const rtiTextHindi = `प्रपत्र 'क'
सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के तहत सूचना हेतु आवेदन

सेवा में,
जन सूचना अधिकारी (PIO),
नगर निगम / स्थानीय निकाय,
वार्ड: ${report.ward}, ${report.city}।

विषय: कचरा ब्लैकस्पॉट व ड्रेनेज रुकावट के संबंध में सूचना बाबत। (टिकट #${report.id})

महोदय,
1. आवेदक का विवरण: [नागरिक - नगर-दृष्टि प्रणाली]
2. स्थान का विवरण: ${report.address} (अक्षांश: ${report.lat.toFixed(
    4
  )}, देशांतर: ${report.lng.toFixed(4)})
3. विवरण: उक्त स्थान पर ठोस कचरे के ढेर की शिकायत दर्ज हुए ${hoursElapsed} घंटे से अधिक बीत चुके हैं, जो कि 48 घंटे के नागरिक चार्टर का उल्लंघन है।

वांछित सूचना:
1. इस वार्ड में कचरा उठान हेतु अनुबंधित ठेकेदार/कंपनी का नाम एवं अनुबंध की प्रमाणित प्रति।
2. इस क्षेत्र के प्रभारी सेनेटरी इंस्पेक्टर का नाम व पदनाम।
3. शिकायत #${report.id} पर अब तक की गई कार्रवाई की प्रमाणित प्रति (ATR)।
4. निर्धारित समयावधि में कचरा न उठने पर संबंधित एजेंसी पर लगाए गए जुर्माने का विवरण।

शुल्क: ₹10 का पोस्टल आर्डर संलग्न है।

दिनांक: ${new Date().toLocaleDateString()}
हस्ताक्षर: [आवेदक]`;

  const currentText = language === 'english' ? rtiTextEnglish : rtiTextHindi;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `RTI-Application-${report.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex flex-col w-full max-w-2xl max-h-[90vh] rounded-3xl bg-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-zinc-950 px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <span>Gen-RTI Escalation Draft</span>
                <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-400 border border-rose-500/30">
                  {hoursElapsed}h SLA Breach
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Automated Right to Information (RTI) legal petition for unaddressed blackspots
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Language Tabs & Info */}
        <div className="flex items-center justify-between px-6 py-3 bg-zinc-900 border-b border-zinc-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-medium">Language:</span>
            <div className="flex rounded-lg bg-zinc-800 p-0.5">
              <button
                onClick={() => setLanguage('english')}
                className={`rounded-md px-3 py-1 font-semibold transition-colors ${
                  language === 'english'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hindi')}
                className={`rounded-md px-3 py-1 font-semibold transition-colors ${
                  language === 'hindi'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                हिन्दी (Hindi)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 font-medium text-zinc-200 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 font-medium text-white transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Notice</span>
            </button>
          </div>
        </div>

        {/* Notice Preview */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-xs leading-relaxed text-zinc-300 bg-zinc-950/80 select-text whitespace-pre-wrap">
          {currentText}
        </div>

        {/* Footer info */}
        <div className="bg-zinc-950 px-6 py-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
          <span>
            Under Section 7(1) of RTI Act 2005, municipal authorities are legally obligated to furnish this data within 30 days.
          </span>
          <span className="font-semibold text-emerald-400">100% Free & Open Source</span>
        </div>
      </div>
    </div>
  );
}
