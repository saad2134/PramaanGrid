'use client';

import React, { useEffect, useState } from 'react';
import { Report } from '@/types';
import { AlertCircle, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface LeafletMapProps {
  reports: Report[];
  selectedReportId?: string;
  onSelectReport?: (report: Report) => void;
}

export default function LeafletMap({
  reports,
  selectedReportId,
  onSelectReport,
}: LeafletMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex h-full min-h-[420px] w-full items-center justify-center rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-500 text-xs">
        Loading GIS Geo-Spatial Engine...
      </div>
    );
  }

  return (
    <LeafletMapInner
      reports={reports}
      selectedReportId={selectedReportId}
      onSelectReport={onSelectReport}
    />
  );
}

function LeafletMapInner({
  reports,
  selectedReportId,
  onSelectReport,
}: LeafletMapProps) {
  const [mapInstance, setMapInstance] = useState<unknown>(null);

  useEffect(() => {
    // Dynamic import of Leaflet
    let isMounted = true;

    async function initMap() {
      const L = (await import('leaflet')).default;
      // Import leaflet CSS
      await import('leaflet/dist/leaflet.css');

      const container = document.getElementById('nagar-drishti-map');
      if (!container || !isMounted) return;

      // Clean up previous instance if any
      const existingMap = (container as unknown as { _leaflet_id?: number })._leaflet_id;
      if (existingMap) {
        container.innerHTML = '';
      }

      // Default center: Hyderabad (approx center between Hyd, Blr, Del)
      const centerLat = reports.length > 0 ? reports[0].lat : 17.385;
      const centerLng = reports.length > 0 ? reports[0].lng : 78.4867;

      const map = L.map('nagar-drishti-map', {
        center: [centerLat, centerLng],
        zoom: 12,
        zoomControl: true,
      });

      // CartoDB DarkMatter Tiles (Modern sleek dark theme)
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }
      ).addTo(map);

      // Custom Pin Icons for each status
      const getMarkerColor = (status: string) => {
        switch (status) {
          case 'RESOLVED':
            return '#10b981'; // Emerald
          case 'FRAUD':
            return '#f43f5e'; // Rose
          case 'ASSIGNED':
            return '#06b6d4'; // Cyan
          default:
            return '#f59e0b'; // Amber
        }
      };

      const markers: unknown[] = [];

      reports.forEach((report) => {
        const color = getMarkerColor(report.status);

        // Custom HTML marker pin with pulsating radar effect
        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center;">
              <span style="position: absolute; width: 28px; height: 28px; border-radius: 9999px; background-color: ${color}; opacity: 0.35; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
              <span style="position: relative; width: 18px; height: 18px; border-radius: 9999px; background-color: ${color}; border: 3px solid #09090b; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);"></span>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([report.lat, report.lng], { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          if (onSelectReport) onSelectReport(report);
        });

        // Popup HTML
        const popupContent = `
          <div style="font-family: system-ui, -apple-system, sans-serif; padding: 4px; max-width: 220px; color: #18181b;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <span style="font-weight: 700; font-size: 12px; color: #09090b;">#${report.id}</span>
              <span style="font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px; background: ${color}20; color: ${color};">${report.status}</span>
            </div>
            <img src="${report.original_image_url}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" />
            <p style="font-size: 11px; margin: 0 0 4px; font-weight: 500; color: #27272a;">${report.address}</p>
            <div style="font-size: 10px; color: #71717a;">Severity: ${report.severity}/10 • ${report.category}</div>
          </div>
        `;

        marker.bindPopup(popupContent);
        markers.push(marker);
      });

      // Fit bounds if markers exist
      if (reports.length > 0) {
        const group = L.featureGroup(markers as L.Layer[]);
        map.fitBounds(group.getBounds().pad(0.15));
      }

      setMapInstance(map);
    }

    initMap();

    return () => {
      isMounted = false;
    };
  }, [reports]);

  return (
    <div className="relative h-full min-h-[420px] w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-inner">
      <div id="nagar-drishti-map" className="h-full w-full min-h-[420px]" />

      {/* Floating Legend */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1 rounded-xl bg-zinc-950/90 border border-zinc-800 p-2.5 text-[10px] text-zinc-300 backdrop-blur-md shadow-xl">
        <span className="font-semibold text-zinc-400 mb-0.5">Live Status:</span>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span>Pending Triage</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          <span>Contractor Assigned</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Verified Clearance</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          <span>Fraud Caught / Blocked</span>
        </div>
      </div>
    </div>
  );
}
