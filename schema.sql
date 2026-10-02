-- ============================================================
-- PramaanGrid (प्रमाण-ग्रिड) — Database Schema
-- AI First Product Builder Hackathon 2026
-- Database: Supabase (PostgreSQL + PostGIS)
-- ============================================================

-- Enable PostGIS extension for geospatial queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================================
-- REPORTS TABLE — Citizen submissions via WhatsApp
-- ============================================================
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_hash TEXT NOT NULL,                    -- SHA-256 of phone number (privacy)
  original_image_url TEXT NOT NULL,             -- Before photo (stored in Supabase Storage)
  ai_clean_image_url TEXT,                     -- GenAI "Vision of Tomorrow" (FLUX.1 Fill output)
  location GEOGRAPHY(POINT, 4326),             -- PostGIS point for spatial queries
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
  status TEXT DEFAULT 'PENDING'                -- Workflow status
    CHECK (status IN ('PENDING','ASSIGNED','RESOLVED','FRAUD','REJECTED')),
  category TEXT,                                -- garbage | drain | pothole | other
  severity INT DEFAULT 5                       -- 1-10 scale from Gemini 3.5 Flash
    CHECK (severity BETWEEN 1 AND 10),
  ward TEXT,                                   -- Municipal ward name/number
  assigned_worker_id TEXT,                     -- Worker assigned to clean this
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- ============================================================
-- CLEARANCE PROOFS TABLE — Worker "After" submissions
-- ============================================================
CREATE TABLE clearance_proofs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  after_image_url TEXT NOT NULL,               -- After photo from worker
  worker_id TEXT NOT NULL,
  lat FLOAT NOT NULL,                          -- GPS from EXIF of After photo
  lng FLOAT NOT NULL,
  photo_timestamp TIMESTAMPTZ,                 -- Extracted from EXIF data
  gps_distance_meters FLOAT,                  -- Haversine distance from original report
  is_verified BOOLEAN DEFAULT FALSE,
  verification_reason TEXT,                    -- 'GPS_MATCH' | 'GPS_MISMATCH' | 'LANDMARK_MISMATCH' | 'LANDMARK_MATCH'
  vlm_confidence FLOAT,                       -- Gemini confidence score for landmark verification
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES — Performance optimization
-- ============================================================

-- Spatial index for fast geo-queries (heatmap, nearby reports)
CREATE INDEX idx_reports_location ON reports USING GIST(location);

-- Status index for dashboard filtering
CREATE INDEX idx_reports_status ON reports(status);

-- Report lookup for clearance proofs
CREATE INDEX idx_clearance_report_id ON clearance_proofs(report_id);

-- Time-based queries for analytics
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) — Supabase security
-- ============================================================

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE clearance_proofs ENABLE ROW LEVEL SECURITY;

-- Public read access for dashboard (authenticated users only)
CREATE POLICY "Allow authenticated read on reports"
  ON reports FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow service role full access on reports"
  ON reports FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read on clearance_proofs"
  ON clearance_proofs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow service role full access on clearance_proofs"
  ON clearance_proofs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- GRANTS — Required for Supabase Data API (Oct 2026+ policy)
-- New tables are NOT auto-exposed to the Data API anymore
-- ============================================================

GRANT SELECT ON reports TO authenticated;
GRANT ALL ON reports TO service_role;
GRANT SELECT ON clearance_proofs TO authenticated;
GRANT ALL ON clearance_proofs TO service_role;

-- ============================================================
-- FUNCTIONS — Utility functions for the application
-- ============================================================

-- Function to get reports within a radius (for heatmap/nearby)
CREATE OR REPLACE FUNCTION get_reports_within_radius(
  center_lat FLOAT,
  center_lng FLOAT,
  radius_meters FLOAT DEFAULT 5000
)
RETURNS SETOF reports AS $$
  SELECT *
  FROM reports
  WHERE ST_DWithin(
    location,
    ST_SetSRID(ST_MakePoint(center_lng, center_lat), 4326)::geography,
    radius_meters
  )
  ORDER BY created_at DESC;
$$ LANGUAGE sql STABLE;

-- Function to calculate haversine distance between two points
CREATE OR REPLACE FUNCTION haversine_distance(
  lat1 FLOAT, lng1 FLOAT,
  lat2 FLOAT, lng2 FLOAT
)
RETURNS FLOAT AS $$
  SELECT ST_Distance(
    ST_SetSRID(ST_MakePoint(lng1, lat1), 4326)::geography,
    ST_SetSRID(ST_MakePoint(lng2, lat2), 4326)::geography
  );
$$ LANGUAGE sql IMMUTABLE;
