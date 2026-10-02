export type ReportStatus = 'PENDING' | 'ASSIGNED' | 'RESOLVED' | 'FRAUD' | 'REJECTED';

export type ReportCategory = 'garbage' | 'drain' | 'pothole' | 'sewage' | 'other';

export interface BlurRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'face' | 'license_plate';
}

export interface AITriageResult {
  is_civic_issue: boolean;
  confidence: number;
  category: ReportCategory;
  severity: number; // 1-10
  hazard_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  detected_materials: string[];
  estimated_volume_m3?: number;
  troll_filter_passed: boolean;
  reasoning: string;
  blur_regions?: BlurRegion[];
}

export interface Report {
  id: string;
  phone_hash: string;
  original_image_url: string;
  ai_clean_image_url?: string;
  lat: number;
  lng: number;
  address: string;
  ward: string;
  city: string;
  category: ReportCategory;
  severity: number;
  status: ReportStatus;
  description: string;
  created_at: string;
  resolved_at?: string;
  assigned_contractor?: string;
  ai_triage?: AITriageResult;
}

export type VerificationStatus =
  | 'VERIFIED'
  | 'FRAUD_GPS_MISMATCH'
  | 'FRAUD_LANDMARK_MISMATCH'
  | 'FRAUD_INCOMPLETE_JOB'
  | 'PENDING_REVIEW';

export interface LandmarkMatch {
  landmark: string;
  before_pos: string;
  after_pos: string;
  matched: boolean;
}

export interface ClearanceProof {
  id: string;
  report_id: string;
  after_image_url: string;
  worker_id: string;
  worker_name: string;
  contractor_name: string;
  lat: number;
  lng: number;
  photo_timestamp: string;
  gps_distance_meters: number;
  is_verified: boolean;
  verification_status: VerificationStatus;
  verification_reason: string;
  vlm_confidence: number;
  landmark_matches: LandmarkMatch[];
  payout_status: 'HELD_FRAUD' | 'AUTHORIZED' | 'PENDING';
  payout_amount_inr: number;
  created_at: string;
}

export interface CivicMetrics {
  total_reports: number;
  resolved_count: number;
  pending_count: number;
  fraud_blocked_count: number;
  taxpayer_money_saved_inr: number;
  avg_response_hours: number;
  cleanliness_score: number;
}

export interface WhatsAppMessage {
  id: string;
  sender: 'citizen' | 'bot' | 'worker';
  text: string;
  imageUrl?: string;
  cleanImageUrl?: string;
  timestamp: string;
  location?: { lat: number; lng: number; name: string };
  ticketId?: string;
  isError?: boolean;
}
