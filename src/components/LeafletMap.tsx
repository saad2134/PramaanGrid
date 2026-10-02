'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Report } from '@/types';
import { Crosshair, MapPin, Navigation, Compass, Layers } from 'lucide-react';

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
  const mapRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);
  const leafletModuleRef = useRef<any>(null);
  const markersByIdRef = useRef<Map<string, any>>(new Map());

  // Real-time hover cursor coordinates
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Active selected report
  const activeReport = useMemo(() => {
    return reports.find((r) => r.id === selectedReportId) || reports[0] || null;
  }, [reports, selectedReportId]);

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

      const initialLat = activeReport ? activeReport.lat : 17.4108;
      const initialLng = activeReport ? activeReport.lng : 78.4373;

      const map = L.map(container, {
        center: [initialLat, initialLng],
        zoom: 14,
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

      // Track cursor coordinates for real-time coordinate verification
      map.on('mousemove', (e: any) => {
        setCursorCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      });

      map.on('mouseout', () => {
        setCursorCoords(null);
      });

      // Create persistent layer group for markers
      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapRef.current = map;

      // Populate initial markers
      renderMarkers(map, layerGroup, L, reports, selectedReportId);
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

  // 2. Update markers and active state when `reports` or `selectedReportId` changes
  useEffect(() => {
    if (!mapRef.current || !layerGroupRef.current || !leafletModuleRef.current) return;
    renderMarkers(
      mapRef.current,
      layerGroupRef.current,
      leafletModuleRef.current,
      reports,
      selectedReportId
    );
  }, [reports, selectedReportId]);

  // 3. Smoothly fly to selected report when selectedReportId updates
  useEffect(() => {
    if (!mapRef.current || !selectedReportId) return;
    const targetReport = reports.find((r) => r.id === selectedReportId);
    if (!targetReport) return;

    mapRef.current.flyTo([targetReport.lat, targetReport.lng], 16, {
      duration: 1.0,
      easeLinearity: 0.25,
    });

    const marker = markersByIdRef.current.get(selectedReportId);
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 500);
    }
  }, [selectedReportId, reports]);

  // Helper to render and refresh pins in the layer group
  function renderMarkers(
    map: any,
    layerGroup: any,
    L: any,
    currentReports: Report[],
    currentSelectedId?: string
  ) {
    layerGroup.clearLayers();
    markersByIdRef.current.clear();

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
      const isSelected = report.id === currentSelectedId;
      const color = getMarkerColor(report.status);

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            ${
              isSelected
                ? `<span style="position: absolute; width: 44px; height: 44px; border-radius: 9999px; background-color: ${color}; opacity: 0.45; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
                   <span style="position: absolute; width: 32px; height: 32px; border-radius: 9999px; border: 2px dashed ${color}; opacity: 0.8; animation: spin 8s linear infinite;"></span>`
                : `<span style="position: absolute; width: 28px; height: 28px; border-radius: 9999px; background-color: ${color}; opacity: 0.35; animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>`
            }
            <span style="position: relative; width: ${isSelected ? '22px' : '16px'}; height: ${isSelected ? '22px' : '16px'}; border-radius: 9999px; background-color: ${color}; border: 3px solid #09090b; box-shadow: 0 0 12px ${color};"></span>
          </div>
        `,
        iconSize: isSelected ? [44, 44] : [28, 28],
        iconAnchor: isSelected ? [22, 22] : [14, 14],
      });

      const marker = L.marker([report.lat, report.lng], { icon: customIcon });

      marker.on('click', () => {
        if (onSelectReport) onSelectReport(report);
      });

      const popupContent = `
        <div style="font-family: inherit; padding: 2px; max-width: 240px; color: #f4f4f5;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 800; font-size: 13px; color: #ffffff; letter-spacing: -0.02em;">#${report.id}</span>
            <span style="font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 6px; background: ${color}25; color: ${color}; border: 1px solid ${color}40;">${report.status}</span>
          </div>
          <div style="border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 8px; background: #000;">
            <img src="${report.original_image_url}" style="width: 100%; height: 96px; object-fit: cover; display: block;" />
          </div>
          <p style="font-size: 11px; margin: 0 0 4px; font-weight: 600; color: #e4e4e7; line-height: 1.3;">${report.address}</p>
          <div style="font-size: 10px; color: #a1a1aa; margin-bottom: 6px;">${report.ward} • ${report.city}</div>
          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 10px; font-family: monospace;">
            <span style="color: #34d399; font-weight: 700;">📍 ${report.lat.toFixed(5)}°, ${report.lng.toFixed(5)}°</span>
            <span style="color: #fbbf24; font-weight: 600;">Sev: ${report.severity}/10</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      layerGroup.addLayer(marker);
      markers.push(marker);
      markersByIdRef.current.set(report.id, marker);
    });

    // Auto-fit if reports are loaded and all belong to the same city
    if (markers.length === 1) {
      map.setView([currentReports[0].lat, currentReports[0].lng], 15);
    } else if (markers.length > 1) {
      const firstCity = currentReports[0].city;
      const allSameCity = currentReports.every((r) => r.city === firstCity);
      if (allSameCity) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.2), { maxZoom: 15 });
      } else if (currentSelectedId) {
        const sel = currentReports.find((r) => r.id === currentSelectedId);
        if (sel) map.setView([sel.lat, sel.lng], 14);
      }
    }
  }

  // Quick jump helper to center on any report coordinates
  const jumpToReport = (report: Report) => {
    if (onSelectReport) onSelectReport(report);
    if (mapRef.current) {
      mapRef.current.flyTo([report.lat, report.lng], 16, {
        duration: 1.0,
      });
      const marker = markersByIdRef.current.get(report.id);
      if (marker) {
        setTimeout(() => marker.openPopup(), 400);
      }
    }
  };

  return (
    <div className="relative h-full min-h-[420px] w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-inner group">
      <div ref={containerRef} className="h-full w-full min-h-[420px]" />

      {/* Top-Right Floating Legend */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1 rounded-xl bg-zinc-950/90 border border-zinc-800/90 p-2.5 text-[10px] text-zinc-300 backdrop-blur-md shadow-2xl">
        <span className="font-semibold text-zinc-400 mb-0.5 flex items-center gap-1">
          <Layers className="h-3 w-3 text-emerald-400" />
          <span>Live Anti-Fraud Status:</span>
        </span>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]" />
          <span>Pending Triage</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
          <span>Contractor Assigned</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
          <span>Verified Clearance</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
          <span>Fraud Caught / Blocked</span>
        </div>
      </div>

      {/* Top-Left Quick Coordinate Presets */}
      <div className="absolute top-3 left-3 z-[1000] hidden sm:flex items-center gap-1 rounded-xl bg-zinc-950/85 border border-zinc-800/80 p-1 backdrop-blur-md shadow-xl text-[10px]">
        <span className="px-2 py-0.5 text-zinc-400 font-mono flex items-center gap-1">
          <Compass className="h-3 w-3 text-emerald-400" />
          <span>Quick Pins:</span>
        </span>
        {reports.slice(0, 4).map((r) => (
          <button
            key={r.id}
            onClick={() => jumpToReport(r)}
            className={`rounded-lg px-2 py-0.5 font-medium transition-all ${
              selectedReportId === r.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            #{r.id}
          </button>
        ))}
      </div>

      {/* Bottom Floating GPS Precision HUD */}
      <div className="absolute bottom-3 inset-x-3 z-[1000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-xl bg-zinc-950/90 border border-zinc-800/90 px-3.5 py-2.5 backdrop-blur-md shadow-2xl text-[11px]">
        {/* Active Blackspot Telemetry */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Crosshair className="h-4 w-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-white tracking-tight">
                {activeReport ? `#${activeReport.id}` : 'GPS Telemetry Active'}
              </span>
              <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 text-[9px] font-mono font-semibold text-emerald-300">
                {activeReport ? `${activeReport.lat.toFixed(5)}° N, ${activeReport.lng.toFixed(5)}° E` : 'Calibrated'}
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 truncate max-w-[280px] sm:max-w-md">
              {activeReport ? `${activeReport.address} (${activeReport.ward})` : 'Geodetic Haversine GPS Anchor Active'}
            </p>
          </div>
        </div>

        {/* Live Cursor Readout */}
        <div className="flex items-center gap-3 self-end sm:self-auto text-[10px] font-mono text-zinc-400">
          {cursorCoords ? (
            <span className="flex items-center gap-1 text-emerald-400">
              <Navigation className="h-3 w-3" />
              <span>Cursor: {cursorCoords.lat.toFixed(5)}°, {cursorCoords.lng.toFixed(5)}°</span>
            </span>
          ) : (
            <span className="text-zinc-500 flex items-center gap-1">
              <MapPin className="h-3 w-3 text-zinc-500" />
              <span>CARTO DarkMatter GIS • Precision ±2.5m</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
