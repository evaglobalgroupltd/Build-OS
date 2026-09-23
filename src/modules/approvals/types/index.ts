
// Approvals module — shared domain types
//
// BRD references:
// - Sec. 43.3 — Approval workflow
// - Sec. 43.4 — Approval history / controls
//
// Architectural rule:
// Approval-specific domain models belong here.
//
// Cross-cutting entities such as:
// - User
// - Role
// - Company
// - Project
// - Contractor
//
// should remain in the root `src/types` directory.
//
// This file is intentionally UI-agnostic and API-friendly.
// Presentation-specific formatting should remain inside the UI layer.

/* -------------------------------------------------------------------------- */
/* Approval enums / unions                                                     */
/* -------------------------------------------------------------------------- */

export type ApprovalOutcome =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'CORRECTION_REQUIRED'

export type ApprovalPriority =
  | 'HIGH'
  | 'MEDIUM'
  | 'NORMAL'

export type InspectionStatus =
  | 'PENDING'
  | 'PASSED'
  | 'CORRECTION_REQUIRED'

export type PaymentStatus =
  | 'PENDING'
  | 'RELEASED'
  | 'FROZEN'

export type ApprovalEvidenceType =
  | 'PHOTO'
  | 'VIDEO'
  | 'REPORT'
  | 'INVOICE'
  | 'DELIVERY_NOTE'
  | 'INSPECTION_REPORT'
  | 'TEST_REPORT'
  | 'OTHER'

/* -------------------------------------------------------------------------- */
/* Evidence                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Evidence submitted in support of a milestone approval.
 *
 * Evidence may be uploaded by contractors, project managers,
 * inspectors or other authorized project participants.
 */
export interface ApprovalEvidence {
  id: string

  type: ApprovalEvidenceType

  name: string

  /**
   * Secure or temporary resource URL.
   *
   * The UI should not assume this URL is permanent.
   */
  url?: string

  verified: boolean

  uploadedAt: string

  uploadedBy: string
}

/* -------------------------------------------------------------------------- */
/* Inspection                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Inspection state associated with an approval.
 *
 * An approval should not be considered payment-ready solely because
 * evidence has been uploaded. Inspection state is independently tracked.
 */
export interface ApprovalInspection {
  id: string

  status: InspectionStatus

  inspectedBy?: string

  inspectedAt?: string

  comments?: string

  defectCount: number
}

/* -------------------------------------------------------------------------- */
/* Decision                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Immutable decision record associated with an approval.
 *
 * `approvalId` is optional to preserve flexibility for embedded decision
 * responses, while API responses can populate it when available.
 */
export interface ApprovalDecision {
  id: string

  approvalId?: string

  outcome: ApprovalOutcome

  decidedBy: string

  decidedByName: string

  decidedByRole: string

  decidedAt: string

  comment?: string

  paymentStatus: PaymentStatus
}

/* -------------------------------------------------------------------------- */
/* Core approval                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Core approval record.
 *
 * Used by:
 * - Approval Inbox
 * - Approval Details
 * - Approval History references
 * - Approval dashboard metrics
 * - Payment-control workflows
 */
export interface Approval {
  id: string

  projectId: string

  projectName: string

  milestoneId: string

  milestoneName: string

  contractorId: string

  contractorName: string

  /**
   * Monetary values are stored as numbers.
   *
   * Formatting such as:
   * `₦8.4M`
   * `$8,400,000`
   *
   * belongs in the presentation layer.
   */
  amount: number

  currency: string

  /**
   * Completion percentage.
   *
   * Expected range: 0–100.
   */
  progress: number

  evidenceCount: number

  requiredEvidenceCount: number

  priority: ApprovalPriority

  submittedAt: string

  dueAt?: string

  inspection: ApprovalInspection

  outcome: ApprovalOutcome

  paymentStatus: PaymentStatus

  description?: string

  latestDecision?: ApprovalDecision
}

/* -------------------------------------------------------------------------- */
/* Approval details                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Complete approval context.
 *
 * Used by ApprovalDetails when the user needs the full decision,
 * evidence and project context before taking action.
 */
export interface ApprovalDetail extends Approval {
  evidence: ApprovalEvidence[]

  projectStatus: string

  milestoneStatus: string

  plannedStart?: string

  plannedEnd?: string

  actualStart?: string

  actualEnd?: string

  allocatedAmount: number

  approvedAmount?: number

  clientName?: string

  projectManagerName?: string

  /**
   * Historical decisions associated with this approval.
   *
   * Ordered from newest to oldest by the API contract.
   */
  previousDecisions: ApprovalDecision[]
}

/* -------------------------------------------------------------------------- */
/* Approval history                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Historical approval decision.
 *
 * Pending approvals should not normally appear in this collection.
 */
export interface ApprovalHistoryItem {
  id: string

  projectId: string

  projectName: string

  milestoneId: string

  milestoneName: string

  contractorId: string

  contractorName: string

  amount: number

  currency: string

  outcome: Exclude<ApprovalOutcome, 'PENDING'>

  evidenceCount: number

  requiredEvidenceCount: number

  decidedBy: string

  decidedByName: string

  decidedByRole: string

  decidedAt: string

  paymentStatus: PaymentStatus

  comment?: string
}

/* -------------------------------------------------------------------------- */
/* Filters                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Shared query contract for approval lists and history.
 */
export interface ApprovalFilters {
  projectId?: string

  milestoneId?: string

  contractorId?: string

  outcome?: ApprovalOutcome

  priority?: ApprovalPriority

  paymentStatus?: PaymentStatus

  inspectionStatus?: InspectionStatus

  search?: string

  page?: number

  limit?: number
}

/* -------------------------------------------------------------------------- */
/* Pagination                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Standard paginated approval response.
 */
export interface ApprovalListResponse {
  data: Approval[]

  total: number

  page: number

  limit: number

  totalPages: number
}

/**
 * Standard paginated approval-history response.
 */
export interface ApprovalHistoryResponse {
  data: ApprovalHistoryItem[]

  total: number

  page: number

  limit: number

  totalPages: number
}

/* -------------------------------------------------------------------------- */
/* Dashboard summary                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Aggregated approval metrics.
 *
 * Values should be calculated by the backend so dashboard figures,
 * financial totals and approval queues remain consistent across clients.
 */
export interface ApprovalSummary {
  pending: number

  highPriority: number

  totalPendingValue: number

  readyForApproval: number

  correctionRequired: number

  rejected: number

  approved: number
}

/* -------------------------------------------------------------------------- */
/* Approval actions                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Approval action payload.
 *
 * Used when approving a milestone.
 */
export interface ApprovalDecisionPayload {
  comment?: string
}

/**
 * Rejection payload.
 *
 * A reason is mandatory for governance and auditability.
 */
export interface ApprovalRejectionPayload {
  reason: string
}

/**
 * Correction request payload.
 *
 * Required actions should be explicit enough for the contractor
 * to understand what must be corrected before resubmission.
 */
export interface ApprovalCorrectionPayload {
  reason: string

  requiredActions: string[]
}