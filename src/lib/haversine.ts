/**
 * Haversine formula for calculating geodetic distance between coordinates
 */
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Radius of the Earth in meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export interface GpsEvaluation {
  isMatch: boolean;
  distanceMeters: number;
  status: 'GPS_MATCH' | 'GPS_SUSPICIOUS' | 'GPS_MISMATCH_FRAUD';
  message: string;
}

/**
 * Evaluates whether an "After" photo's GPS coordinates correspond to the original report
 * In urban density (tall buildings, narrow gullies), standard phone GPS has 5-15m variance.
 * Thresholds:
 * <= 35m: Valid match
 * 35m - 80m: Suspicious (requires high VLM visual confidence)
 * > 80m: Definite GPS Mismatch Fraud (contractor took photo in wrong location or depot)
 */
export function evaluateGpsMatch(
  reportLat: number,
  reportLng: number,
  afterLat: number,
  afterLng: number,
  thresholdMeters: number = 35
): GpsEvaluation {
  const distanceMeters = calculateDistanceMeters(
    reportLat,
    reportLng,
    afterLat,
    afterLng
  );

  if (distanceMeters <= thresholdMeters) {
    return {
      isMatch: true,
      distanceMeters,
      status: 'GPS_MATCH',
      message: `Exact spot confirmed. Distance offset is only ${distanceMeters}m (within ${thresholdMeters}m tolerance).`,
    };
  } else if (distanceMeters <= 80) {
    return {
      isMatch: false,
      distanceMeters,
      status: 'GPS_SUSPICIOUS',
      message: `Borderline location offset: ${distanceMeters}m from reported blackspot. Verification requires secondary visual landmark confirmation.`,
    };
  } else {
    return {
      isMatch: false,
      distanceMeters,
      status: 'GPS_MISMATCH_FRAUD',
      message: `CRITICAL FRAUD ALERT: Photo was captured ${distanceMeters}m (${(
        distanceMeters / 1000
      ).toFixed(2)} km) away from assigned ticket! Contractor payment flagged and blocked.`,
    };
  }
}
