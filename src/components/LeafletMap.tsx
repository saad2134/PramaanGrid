'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Report } from '@/types';

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
  const containerRef = useRef<HTMLDivElement>(null);
  // Store map instance and marker layer ref across renders
  const mapRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);
  const leafletModuleRef = useRef<any>(null);

  // 1. Initialize Map ONCE when mounted
  useEffect(() => {
    let isCancelled = false;

    async function setupMap() {
      const container = containerRef.current;
      if (!container || isCancelled) return;

      // Import Leaflet dynamically in client
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');
      leafletModuleRef.current = L;

      // If an existing leaflet map instance is attached to this container, tear it down cleanly
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if ((container as unknown as { _leaflet_id?: number })._leaflet_id) {
        delete (container as unknown as { _leaflet_id?: number })._leaflet_id;
      }

      if (isCancelled) return;

      const centerLat = reports.length > 0 ? reports[0].lat : 17.385;
      const centerLng = reports.length > 0 ? reports[0].lng : 78.4867;

      const map = L.map(container, {
        center: [centerLat, centerLng],
        zoom: 12,
        zoomControl: true,
      });

      // CartoDB DarkMatter Tiles with authenticated API key
      const cartoKey =
        process.env.NEXT_PUBLIC_CARTO_API_KEY ||
        'cb1_47vt_1_aac8885d7563bb7ed0120fbd';

      L.tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png?key=${cartoKey}`,
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20,
        }
      ).addTo(map);

      // Create a persistent layer group for markers so we don't recreate the map on updates
      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapRef.current = map;

      // Populate initial markers
      renderMarkers(map, layerGroup, L, reports);
    }

    setupMap();

    return () => {
      isCancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      const container = containerRef.current;
      if (container && (container as unknown as { _leaflet_id?: number })._leaflet_id) {
        delete (container as unknown as { _leaflet_id?: number })._leaflet_id;
      }
    };
  }, []); // Run ONCE on mount

  // 2. Update markers when `reports` change without destroying the map container
  useEffect(() => {
    if (!mapRef.current || !layerGroupRef.current || !leafletModuleRef.current) return;
    renderMarkers(
      mapRef.current,
      layerGroupRef.current,
      leafletModuleRef.current,
      reports
    );
  }, [reports]);

  // Helper to render or refresh pins in the layer group
  function renderMarkers(map: any, layerGroup: any, L: any, currentReports: Report[]) {
    layerGroup.clearLayers();

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

    const markers: any[] = [];

    currentReports.forEach((report) => {
      const color = getMarkerColor(report.status);

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

      const marker = L.marker([report.lat, report.lng], { icon: customIcon });

      marker.on('click', () => {
        if (onSelectReport) onSelectReport(report);
      });

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
      layerGroup.addLayer(marker);
      markers.push(marker);
    });

    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.15));
    }
  }

  return (
    <div className="relative h-full min-h-[420px] w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-inner">
      <div ref={containerRef} className="h-full w-full min-h-[420px]" />

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
