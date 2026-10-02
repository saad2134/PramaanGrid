import {
  INITIAL_REPORTS,
  INITIAL_CLEARANCE_PROOFS,
  INITIAL_METRICS,
} from './demo-data';
import { Report, ClearanceProof, CivicMetrics, ReportStatus } from '@/types';

// In-memory runtime cache for server-side API routes & dev mode
class DataStore {
  private reports: Report[] = [...INITIAL_REPORTS];
  private proofs: ClearanceProof[] = [...INITIAL_CLEARANCE_PROOFS];
  private metrics: CivicMetrics = { ...INITIAL_METRICS };

  getReports(): Report[] {
    return [...this.reports];
  }

  getReportById(id: string): Report | undefined {
    return this.reports.find((r) => r.id === id);
  }

  addReport(report: Report): Report {
    this.reports.unshift(report);
    this.metrics.total_reports += 1;
    this.metrics.pending_count += 1;
    return report;
  }

  updateReportStatus(id: string, status: ReportStatus, resolvedAt?: string): Report | null {
    const idx = this.reports.findIndex((r) => r.id === id);
    if (idx === -1) return null;

    const prev = this.reports[idx];
    const updated = {
      ...prev,
      status,
      resolved_at: resolvedAt || (status === 'RESOLVED' ? new Date().toISOString() : prev.resolved_at),
    };

    if (prev.status === 'PENDING' && status === 'RESOLVED') {
      this.metrics.pending_count = Math.max(0, this.metrics.pending_count - 1);
      this.metrics.resolved_count += 1;
    } else if (status === 'FRAUD' && prev.status !== 'FRAUD') {
      this.metrics.fraud_blocked_count += 1;
      this.metrics.taxpayer_money_saved_inr += 8500;
    }

    this.reports[idx] = updated;
    return updated;
  }

  getProofs(): ClearanceProof[] {
    return [...this.proofs];
  }

  getProofByReportId(reportId: string): ClearanceProof | undefined {
    return this.proofs.find((p) => p.report_id === reportId);
  }

  addProof(proof: ClearanceProof): ClearanceProof {
    // If a proof already exists for this report, replace it
    const existingIndex = this.proofs.findIndex((p) => p.report_id === proof.report_id);
    if (existingIndex >= 0) {
      this.proofs[existingIndex] = proof;
    } else {
      this.proofs.unshift(proof);
    }

    if (proof.verification_status === 'VERIFIED') {
      this.updateReportStatus(proof.report_id, 'RESOLVED');
    } else if (
      proof.verification_status === 'FRAUD_GPS_MISMATCH' ||
      proof.verification_status === 'FRAUD_LANDMARK_MISMATCH'
    ) {
      this.updateReportStatus(proof.report_id, 'FRAUD');
    }

    return proof;
  }

  getMetrics(): CivicMetrics {
    return { ...this.metrics };
  }

  resetToDefault(): void {
    this.reports = [...INITIAL_REPORTS];
    this.proofs = [...INITIAL_CLEARANCE_PROOFS];
    this.metrics = { ...INITIAL_METRICS };
  }
}

// Global singleton to preserve state across API routes in dev mode
const globalStore = global as unknown as { __pramaanGridStore?: DataStore };

export const store = globalStore.__pramaanGridStore || new DataStore();
if (process.env.NODE_ENV !== 'production') {
  globalStore.__pramaanGridStore = store;
}
