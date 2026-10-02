import { Report, ClearanceProof, CivicMetrics, WhatsAppMessage } from '@/types';

export const INITIAL_METRICS: CivicMetrics = {
  total_reports: 1248,
  resolved_count: 1082,
  pending_count: 114,
  fraud_blocked_count: 52,
  taxpayer_money_saved_inr: 416000, // ₹4.16 Lakhs saved from bogus contractor claims
  avg_response_hours: 4.8,
  cleanliness_score: 87.4,
};

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'REP-HYD-01',
    phone_hash: '9198480*****',
    original_image_url:
      'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=900&q=80',
    ai_clean_image_url:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80',
    lat: 17.4156,
    lng: 78.4358,
    address: 'Near MLA Colony, Road No. 12, Banjara Hills',
    ward: 'Ward 98 - Jubilee Hills',
    city: 'Hyderabad',
    category: 'garbage',
    severity: 9,
    status: 'PENDING',
    description:
      'Massive accumulation of mixed plastic packaging and construction debris blocking the main roadside storm culvert.',
    created_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString(), // 3 hours ago
    assigned_contractor: 'Deccan CleanTech Operations Pvt Ltd',
    ai_triage: {
      is_civic_issue: true,
      confidence: 0.98,
      category: 'garbage',
      severity: 9,
      hazard_level: 'CRITICAL',
      detected_materials: [
        'Single-use LDPE carry bags',
        'Styrofoam food trays',
        'Masonry rubble',
        'PET beverage bottles',
      ],
      estimated_volume_m3: 4.6,
      troll_filter_passed: true,
      reasoning:
        'Active stormwater blockage detected. Risk of waterlogging on arterial road during rainfall. Immediate removal required.',
      blur_regions: [{ x: 140, y: 55, width: 45, height: 50, type: 'face' }],
    },
  },
  {
    id: 'REP-HYD-02',
    phone_hash: '9194401*****',
    original_image_url:
      'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=900&q=80',
    ai_clean_image_url:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80',
    lat: 17.3616,
    lng: 78.4747,
    address: 'Near Mecca Masjid Arch, Laad Bazaar',
    ward: 'Ward 74 - Charminar',
    city: 'Hyderabad',
    category: 'garbage',
    severity: 7,
    status: 'ASSIGNED',
    description:
      'Commercial cardboard boxes and discarded retail plastic sacks dumped along heritage pedestrian corridor.',
    created_at: new Date(Date.now() - 11 * 3600 * 1000).toISOString(),
    assigned_contractor: 'Charminar Heritage Waste Services',
    ai_triage: {
      is_civic_issue: true,
      confidence: 0.95,
      category: 'garbage',
      severity: 7,
      hazard_level: 'HIGH',
      detected_materials: [
        'Cardboard packaging',
        'Polypropylene strapping bands',
        'Plastic film wrap',
      ],
      estimated_volume_m3: 2.8,
      troll_filter_passed: true,
      reasoning:
        'High footfall heritage zone encroachment. High recyclability quotient.',
    },
  },
  {
    id: 'REP-BLR-03',
    phone_hash: '9198860*****',
    original_image_url:
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=900&q=80',
    ai_clean_image_url:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    lat: 12.9719,
    lng: 77.6412,
    address: 'Opp. BDA Complex, 100 Feet Road, Indiranagar',
    ward: 'Ward 112 - Domlur',
    city: 'Bengaluru',
    category: 'drain',
    severity: 8,
    status: 'RESOLVED',
    description:
      'Secondary overflow container spilled over into pedestrian sidewalk and open drainage pit.',
    created_at: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
    resolved_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    assigned_contractor: 'Swachh Bengaluru Solutions',
    ai_triage: {
      is_civic_issue: true,
      confidence: 0.97,
      category: 'drain',
      severity: 8,
      hazard_level: 'HIGH',
      detected_materials: ['Mixed food waste', 'Beverage cans', 'Plastic cups'],
      estimated_volume_m3: 3.1,
      troll_filter_passed: true,
      reasoning:
        'Clogged drainage entrance creating breeding ground for mosquitoes.',
    },
  },
  {
    id: 'REP-BLR-04',
    phone_hash: '9197310*****',
    original_image_url:
      'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=900&q=80',
    ai_clean_image_url:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80',
    lat: 12.9352,
    lng: 77.6772,
    address: 'Stormwater Culvert #4, Outer Ring Road, Bellandur',
    ward: 'Ward 150 - Bellandur',
    city: 'Bengaluru',
    category: 'drain',
    severity: 10,
    status: 'FRAUD',
    description:
      'Severe plastic bottleneck in primary stormwater runoff canal leading to lake outlet.',
    created_at: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    assigned_contractor: 'Apex Eco-Logistics Infra LLP',
    ai_triage: {
      is_civic_issue: true,
      confidence: 0.99,
      category: 'drain',
      severity: 10,
      hazard_level: 'CRITICAL',
      detected_materials: [
        'Multi-layer plastic packaging',
        'Discarded textiles',
        'PET containers',
        'Sludge biomass',
      ],
      estimated_volume_m3: 8.5,
      troll_filter_passed: true,
      reasoning:
        'Imminent flash flood risk for Outer Ring Road arterial tech corridor if not dredged.',
    },
  },
  {
    id: 'REP-DEL-05',
    phone_hash: '9198110*****',
    original_image_url:
      'https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=900&q=80',
    ai_clean_image_url:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80',
    lat: 28.5672,
    lng: 77.2433,
    address: 'Block-D Market Perimeter, Lajpat Nagar Central Market',
    ward: 'Ward 58 - Lajpat Nagar',
    city: 'Delhi',
    category: 'garbage',
    severity: 8,
    status: 'PENDING',
    description:
      'Untended commercial vegetable waste and rotting organic material ignored for over 72 hours.',
    created_at: new Date(Date.now() - 74 * 3600 * 1000).toISOString(), // 74h ago -> Ready for Gen-RTI Escalation!
    assigned_contractor: 'Capital Municipal Concessionaire Ltd',
    ai_triage: {
      is_civic_issue: true,
      confidence: 0.94,
      category: 'garbage',
      severity: 8,
      hazard_level: 'HIGH',
      detected_materials: [
        'Wet organic waste',
        'Rotting food packaging',
        'Cartons',
      ],
      estimated_volume_m3: 3.5,
      troll_filter_passed: true,
      reasoning:
        'SLA breached (>72 hours unaddressed). Eligible for automated Right to Information (RTI) legal notice generation.',
    },
  },
];

export const INITIAL_CLEARANCE_PROOFS: ClearanceProof[] = [
  // 1. Legitimate Verified Clearance for REP-BLR-03
  {
    id: 'PRF-VERIFIED-01',
    report_id: 'REP-BLR-03',
    after_image_url:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    worker_id: 'WRK-8821',
    worker_name: 'Rameshwarappa Gowda',
    contractor_name: 'Swachh Bengaluru Solutions',
    lat: 12.97193, // Only 7 meters offset!
    lng: 77.64124,
    photo_timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    gps_distance_meters: 6.8,
    is_verified: true,
    verification_status: 'VERIFIED',
    verification_reason:
      'GPS coordinates match within 6.8m. VLM confirmed 3 structural anchors (compound wall, curb, storm drain grate). Complete debris evacuation verified.',
    vlm_confidence: 0.98,
    landmark_matches: [
      {
        landmark: 'Yellow BDA boundary wall',
        before_pos: 'Left background',
        after_pos: 'Left background',
        matched: true,
      },
      {
        landmark: 'Cast-iron drain grill',
        before_pos: 'Center channel (choked)',
        after_pos: 'Center channel (unclogged)',
        matched: true,
      },
      {
        landmark: 'Sidewalk pavement kerb',
        before_pos: 'Lower right edge',
        after_pos: 'Lower right edge',
        matched: true,
      },
    ],
    payout_status: 'AUTHORIZED',
    payout_amount_inr: 3200,
    created_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
  // 2. Caught Fraud Attempt for REP-BLR-04 (GPS Mismatch: photo taken 3.4 km away!)
  {
    id: 'PRF-FRAUD-02',
    report_id: 'REP-BLR-04',
    after_image_url:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80', // Photo of clean beach/lake taken elsewhere!
    worker_id: 'WRK-4109',
    worker_name: 'Vikram Singh (Apex Eco)',
    contractor_name: 'Apex Eco-Logistics Infra LLP',
    lat: 12.9082, // 3,420 meters away!
    lng: 77.6521,
    photo_timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    gps_distance_meters: 3420,
    is_verified: false,
    verification_status: 'FRAUD_GPS_MISMATCH',
    verification_reason:
      'CRITICAL AUDIT BREACH: Image GPS EXIF reveals photo was captured 3,420 meters (3.42 km) away from Bellandur Culvert #4. Visual landmarks completely inconsistent with reported culvert.',
    vlm_confidence: 0.99,
    landmark_matches: [
      {
        landmark: 'Concrete bridge abutment',
        before_pos: 'Visible in report',
        after_pos: 'Missing entirely',
        matched: false,
      },
      {
        landmark: 'Canal embankment stone pitching',
        before_pos: 'Present on both sides',
        after_pos: 'Sandy slope (unrelated site)',
        matched: false,
      },
    ],
    payout_status: 'HELD_FRAUD',
    payout_amount_inr: 8500, // ₹8,500 contractor claim frozen!
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
];

export const INITIAL_WHATSAPP_MESSAGES: WhatsAppMessage[] = [
  {
    id: 'msg-1',
    sender: 'citizen',
    text: 'Namaste. There is a huge garbage dump here for 3 days blocking our street drain near Road 12 Banjara Hills.',
    imageUrl:
      'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80',
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
    text: '✅ Report Received & Authenticated!\n\nTicket ID: #PG-HYD-01\nWard: Ward 98 (Jubilee Hills)\nAI Severity Rating: 9/10 (Critical - Drain Blockage)\nEstimated Volume: 4.6 m³\n\n🛡️ Privacy Shield: Pedestrian faces & vehicle plates automatically blurred.\n\n✨ Here is PramaanGrid\'s "Vision of Tomorrow" — what your street can look like once cleared:',
    cleanImageUrl:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    ticketId: 'REP-HYD-01',
    timestamp: '10:14 AM',
  },
  {
    id: 'msg-3',
    sender: 'bot',
    text: '👷 Contractor Assigned: Deccan CleanTech Operations Pvt Ltd.\n\nSLA: 12 Hours.\nNotice: Contractor payout is cryptographically locked until an onsite GPS-verified "After" photo passes VLM Proof-of-Clearance inspection.',
    timestamp: '10:15 AM',
  },
];
