
// Approvals module — API service layer
//
// BRD references:
// - Sec. 43.3 — Approval workflow
// - Sec. 43.4 — Approval history / controls
// - Sec. 28.1 — Backend / API architecture
//
// Architecture:
// - This file is the single network boundary for the Approvals module.
// - Pages/components must consume these methods instead of calling
//   fetch/axios directly.
// - Domain models remain frontend-friendly and API-ready.
// - Mock implementations can be replaced with the shared API client
//   without changing consumers.
//
// TODO:
// Replace the mock implementations with the real API client once the
// backend contract in Sec. 28.1 is implemented.

/* -------------------------------------------------------------------------- */
/* Domain enums                                                               */
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
/* Shared API primitives                                                      */
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

export interface ApprovalInspection {
  id: string

  status: InspectionStatus

  inspectedBy?: string

  inspectedAt?: string

  comments?: string

  defectCount: number
}

export interface ApprovalDecision {
  id: string

  outcome: ApprovalOutcome

  decidedBy: string

  decidedByName: string

  decidedByRole: string

  decidedAt: string

  comment?: string

  paymentStatus: PaymentStatus
}

/* -------------------------------------------------------------------------- */
/* Approval resources                                                         */
/* -------------------------------------------------------------------------- */

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
/* Query / filter contracts                                                   */
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
/* Mutation payloads                                                          */
/* -------------------------------------------------------------------------- */

export interface ApprovalDecisionPayload {
  comment?: string
}

export interface ApprovalCorrectionPayload {
  reason: string

  requiredActions: string[]
}

export interface ApprovalRejectionPayload {
  reason: string
}

/* -------------------------------------------------------------------------- */
/* Service configuration                                                      */
/* -------------------------------------------------------------------------- */

const APPROVALS_BASE_PATH = '/approvals'

const DEFAULT_PAGE = 1

const DEFAULT_LIMIT = 20

const createPagination = (
  filters: ApprovalFilters,
) => ({
  page: filters.page ?? DEFAULT_PAGE,
  limit: filters.limit ?? DEFAULT_LIMIT,
})

/* -------------------------------------------------------------------------- */
/* Approvals service                                                           */
/* -------------------------------------------------------------------------- */

export const approvalsService = {
  /**
   * Get approvals currently awaiting the authenticated user's decision.
   *
   * BRD: Sec. 43.3
   *
   * Backend:
   * GET /approvals
   */
  list: async (
    filters: ApprovalFilters = {},
  ): Promise<ApprovalListResponse> => {
    /*
     * TODO:
     *
     * return api.get<ApprovalListResponse>(
     *   APPROVALS_BASE_PATH,
     *   { params: filters },
     * )
     */

    const pagination = createPagination(filters)

    return {
      data: [],
      total: 0,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: 0,
    }
  },

  /**
   * Get complete approval context.
   *
   * Includes:
   * - project
   * - milestone
   * - contractor
   * - evidence
   * - inspection
   * - previous decisions
   *
   * BRD: Sec. 43.3
   *
   * Backend:
   * GET /approvals/:id
   */
  get: async (
    id: string,
  ): Promise<ApprovalDetail> => {
    /*
     * TODO:
     *
     * return api.get<ApprovalDetail>(
     *   `${APPROVALS_BASE_PATH}/${id}`,
     * )
     */

    throw new Error(
      'Approval details API is not implemented yet.',
    )
  },

  /**
   * Get historical approval decisions.
   *
   * BRD: Sec. 43.3
   *
   * Backend:
   * GET /approvals/history
   */
  history: async (
    filters: ApprovalFilters = {},
  ): Promise<ApprovalHistoryResponse> => {
    /*
     * TODO:
     *
     * return api.get<ApprovalHistoryResponse>(
     *   `${APPROVALS_BASE_PATH}/history`,
     *   { params: filters },
     * )
     */

    const pagination = createPagination(filters)

    return {
      data: [],
      total: 0,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: 0,
    }
  },

  /**
   * Get approval queue summary.
   *
   * Used by:
   * - Approval dashboard
   * - Approval inbox
   * - Executive/project control metrics
   *
   * Backend:
   * GET /approvals/summary
   */
  summary: async (): Promise<ApprovalSummary> => {
    /*
     * TODO:
     *
     * return api.get<ApprovalSummary>(
     *   `${APPROVALS_BASE_PATH}/summary`,
     * )
     */

    return {
      pending: 0,
      highPriority: 0,
      totalPendingValue: 0,
      readyForApproval: 0,
      correctionRequired: 0,
      rejected: 0,
      approved: 0,
    }
  },

  /**
   * Get all evidence attached to an approval.
   *
   * Backend:
   * GET /approvals/:approvalId/evidence
   */
  evidence: async (
    approvalId: string,
  ): Promise<ApprovalEvidence[]> => {
    /*
     * TODO:
     *
     * return api.get<ApprovalEvidence[]>(
     *   `${APPROVALS_BASE_PATH}/${approvalId}/evidence`,
     * )
     */

    return []
  },

  /**
   * Get inspection information for an approval.
   *
   * Backend:
   * GET /approvals/:approvalId/inspection
   */
  inspection: async (
    approvalId: string,
  ): Promise<ApprovalInspection> => {
    /*
     * TODO:
     *
     * return api.get<ApprovalInspection>(
     *   `${APPROVALS_BASE_PATH}/${approvalId}/inspection`,
     * )
     */

    throw new Error(
      'Approval inspection API is not implemented yet.',
    )
  },

  /**
   * Approve a milestone.
   *
   * Expected backend transaction:
   *
   * 1. Validate required evidence.
   * 2. Validate PM inspection.
   * 3. Validate approval authority.
   * 4. Record immutable approval decision.
   * 5. Create payment approval/release instruction.
   * 6. Write audit log.
   * 7. Return the resulting decision.
   *
   * BRD: Sec. 43.3
   *
   * Backend:
   * POST /approvals/:approvalId/approve
   */
  approve: async (
    approvalId: string,
    payload: ApprovalDecisionPayload = {},
  ): Promise<ApprovalDecision> => {
    /*
     * TODO:
     *
     * return api.post<ApprovalDecision>(
     *   `${APPROVALS_BASE_PATH}/${approvalId}/approve`,
     *   payload,
     * )
     */

    throw new Error(
      'Approval action API is not implemented yet.',
    )
  },

  /**
   * Reject a milestone submission.
   *
   * Payment must remain frozen.
   *
   * Backend:
   * POST /approvals/:approvalId/reject
   *
   * BRD: Sec. 43.3
   */
  reject: async (
    approvalId: string,
    payload: ApprovalRejectionPayload,
  ): Promise<ApprovalDecision> => {
    /*
     * TODO:
     *
     * return api.post<ApprovalDecision>(
     *   `${APPROVALS_BASE_PATH}/${approvalId}/reject`,
     *   payload,
     * )
     */

    throw new Error(
      'Approval rejection API is not implemented yet.',
    )
  },

  /**
   * Request correction from the contractor.
   *
   * The milestone remains unapproved and payment remains frozen
   * until the requested corrections are submitted and reviewed.
   *
   * Backend:
   * POST /approvals/:approvalId/correction
   *
   * BRD: Sec. 43.3
   */
  requestCorrection: async (
    approvalId: string,
    payload: ApprovalCorrectionPayload,
  ): Promise<ApprovalDecision> => {
    /*
     * TODO:
     *
     * return api.post<ApprovalDecision>(
     *   `${APPROVALS_BASE_PATH}/${approvalId}/correction`,
     *   payload,
     * )
     */

    throw new Error(
      'Approval correction API is not implemented yet.',
    )
  },

  /**
   * Re-open an approval after requested corrections
   * have been submitted by the contractor.
   *
   * Backend:
   * POST /approvals/:approvalId/resubmit
   */
  resubmit: async (
    approvalId: string,
  ): Promise<Approval> => {
    /*
     * TODO:
     *
     * return api.post<Approval>(
     *   `${APPROVALS_BASE_PATH}/${approvalId}/resubmit`,
     * )
     */

    throw new Error(
      'Approval resubmission API is not implemented yet.',
    )
  },
}