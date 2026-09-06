// Approvals module — API service layer
// BRD references: Sec. 43.3, 43.4
//
// This is the single network boundary for the Approvals module.
// Pages and components should consume these methods instead of calling
// fetch/axios directly.
//
// The current implementation uses typed mock data so the UI can be
// developed before the backend API is available.
//
// TODO: replace the mock implementations with the real API client once
// the backend contract in Sec. 28.1 is implemented.

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

export interface ApprovalEvidence {
  id: string
  type:
    | 'PHOTO'
    | 'VIDEO'
    | 'REPORT'
    | 'INVOICE'
    | 'DELIVERY_NOTE'
    | 'INSPECTION_REPORT'
    | 'TEST_REPORT'
    | 'OTHER'
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

export interface ApprovalSummary {
  pending: number
  highPriority: number

  totalPendingValue: number

  readyForApproval: number

  correctionRequired: number
  rejected: number
  approved: number
}

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

export const approvalsService = {
  /**
   * Get approvals currently awaiting the authenticated user's decision.
   *
   * BRD: Sec. 43.3
   */
  list: async (
    filters: ApprovalFilters = {},
  ): Promise<ApprovalListResponse> => {
    /*
     * TODO:
     *
     * return api.get<ApprovalListResponse>('/approvals', {
     *   params: filters,
     * })
     */

    console.log('approvalsService.list', filters)

    return {
      data: [],
      total: 0,
      page: filters.page ?? 1,
      limit: filters.limit ?? 20,
      totalPages: 0,
    }
  },

  /**
   * Get complete approval context.
   *
   * Includes milestone, project, contractor, evidence,
   * inspection and previous decisions.
   *
   * BRD: Sec. 43.3
   */
  get: async (id: string): Promise<ApprovalDetail> => {
    /*
     * TODO:
     *
     * return api.get<ApprovalDetail>(`/approvals/${id}`)
     */

    console.log('approvalsService.get', id)

    throw new Error(
      'Approval details API is not implemented yet.',
    )
  },

  /**
   * Get historical approval decisions.
   *
   * BRD: Sec. 43.3
   */
  history: async (
    filters: ApprovalFilters = {},
  ): Promise<ApprovalHistoryResponse> => {
    /*
     * TODO:
     *
     * return api.get<ApprovalHistoryResponse>(
     *   '/approvals/history',
     *   { params: filters },
     * )
     */

    console.log('approvalsService.history', filters)

    return {
      data: [],
      total: 0,
      page: filters.page ?? 1,
      limit: filters.limit ?? 20,
      totalPages: 0,
    }
  },

  /**
   * Get approval queue summary for dashboard metrics.
   */
  summary: async (): Promise<ApprovalSummary> => {
    /*
     * TODO:
     *
     * return api.get<ApprovalSummary>('/approvals/summary')
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
   */
  evidence: async (
    approvalId: string,
  ): Promise<ApprovalEvidence[]> => {
    /*
     * TODO:
     *
     * return api.get<ApprovalEvidence[]>(
     *   `/approvals/${approvalId}/evidence`,
     * )
     */

    console.log('approvalsService.evidence', approvalId)

    return []
  },

  /**
   * Get inspection information for an approval.
   */
  inspection: async (
    approvalId: string,
  ): Promise<ApprovalInspection> => {
    /*
     * TODO:
     *
     * return api.get<ApprovalInspection>(
     *   `/approvals/${approvalId}/inspection`,
     * )
     */

    console.log('approvalsService.inspection', approvalId)

    throw new Error(
      'Approval inspection API is not implemented yet.',
    )
  },

  /**
   * Approve a milestone.
   *
   * Expected backend behaviour:
   * 1. Validate required evidence.
   * 2. Validate PM inspection.
   * 3. Record immutable approval decision.
   * 4. Create payment approval/release instruction.
   * 5. Write audit log.
   *
   * BRD: Sec. 43.3
   */
  approve: async (
    approvalId: string,
    payload: ApprovalDecisionPayload = {},
  ): Promise<ApprovalDecision> => {
    /*
     * TODO:
     *
     * return api.post<ApprovalDecision>(
     *   `/approvals/${approvalId}/approve`,
     *   payload,
     * )
     */

    console.log(
      'approvalsService.approve',
      approvalId,
      payload,
    )

    throw new Error(
      'Approval action API is not implemented yet.',
    )
  },

  /**
   * Reject a milestone submission.
   *
   * Payment must remain frozen.
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
     *   `/approvals/${approvalId}/reject`,
     *   payload,
     * )
     */

    console.log(
      'approvalsService.reject',
      approvalId,
      payload,
    )

    throw new Error(
      'Approval rejection API is not implemented yet.',
    )
  },

  /**
   * Request correction from the contractor.
   *
   * The milestone remains unapproved and payment remains frozen.
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
     *   `/approvals/${approvalId}/correction`,
     *   payload,
     * )
     */

    console.log(
      'approvalsService.requestCorrection',
      approvalId,
      payload,
    )

    throw new Error(
      'Approval correction API is not implemented yet.',
    )
  },

  /**
   * Re-open an approval after the contractor has submitted
   * the requested corrections.
   */
  resubmit: async (
    approvalId: string,
  ): Promise<Approval> => {
    /*
     * TODO:
     *
     * return api.post<Approval>(
     *   `/approvals/${approvalId}/resubmit`,
     * )
     */

    console.log(
      'approvalsService.resubmit',
      approvalId,
    )

    throw new Error(
      'Approval resubmission API is not implemented yet.',
    )
  },
}