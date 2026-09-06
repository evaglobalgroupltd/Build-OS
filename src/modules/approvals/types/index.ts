// Approvals module — shared domain types
// BRD references: Sec. 43.3, 43.4
//
// Keep approval-specific types in this file.
// Cross-cutting entities such as User, Role, Company and Project-level
// primitives should remain in the root src/types directory.

/* -------------------------------------------------------------------------- */
/* Enums / unions                                                             */
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
/* Evidence                                                                   */
/* -------------------------------------------------------------------------- */

export interface ApprovalEvidence {
  id: string

  type: ApprovalEvidenceType

  name: string

  url?: string

  verified: boolean

  uploadedAt: string

  uploadedBy: string
}

/* -------------------------------------------------------------------------- */
/* Inspection                                                                 */
/* -------------------------------------------------------------------------- */

export interface ApprovalInspection {
  id: string

  status: InspectionStatus

  inspectedBy?: string

  inspectedAt?: string

  comments?: string

  defectCount: number
}

/* -------------------------------------------------------------------------- */
/* Decision                                                                   */
/* -------------------------------------------------------------------------- */

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
/* Approval                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Core approval record used by:
 *
 * - Approval Inbox
 * - Approval Details
 * - Approval History
 * - Approval dashboard metrics
 */
export interface Approval {
  id: string

  projectId: string

  projectName: string

  milestoneId: string

  milestoneName: string

  contractorId: string

  contractorName: string

  amount: number

  currency: string

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
/* Approval details                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Extended approval context.
 *
 * Used by ApprovalDetails when the user needs the complete decision record.
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

  previousDecisions: ApprovalDecision[]
}

/* -------------------------------------------------------------------------- */
/* Approval history                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Historical decision record.
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
/* Filters                                                                    */
/* -------------------------------------------------------------------------- */

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
/* Pagination                                                                 */
/* -------------------------------------------------------------------------- */

export interface ApprovalListResponse {
  data: Approval[]

  total: number

  page: number

  limit: number

  totalPages: number
}

export interface ApprovalHistoryResponse {
  data: ApprovalHistoryItem[]

  total: number

  page: number

  limit: number

  totalPages: number
}

/* -------------------------------------------------------------------------- */
/* Dashboard summary                                                          */
/* -------------------------------------------------------------------------- */

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
/* Approval actions                                                           */
/* -------------------------------------------------------------------------- */

export interface ApprovalDecisionPayload {
  comment?: string
}

export interface ApprovalRejectionPayload {
  reason: string
}

export interface ApprovalCorrectionPayload {
  reason: string

  requiredActions: string[]
}