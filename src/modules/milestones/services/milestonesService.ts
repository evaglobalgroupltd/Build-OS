// Milestones module — API service layer
//
// BRD references:
// - Sec. 15.1 Verification, evidence & audit trail
// - Sec. 18.2 Payment / dispute controls
// - Sec. 18.4 Milestone approval rules
// - Sec. 19.1 Change control
// - Sec. 20.1 Documents & evidence
// - Sec. 22 Financial controls
// - Sec. 23 Client / PM dashboards
// - Sec. 24 Governance & administration
//
// Architecture:
// - This is the single network boundary for milestone operations.
// - Pages, components and hooks must consume milestonesService.
// - No component should call fetch/axios directly for milestone data.
// - API-specific implementation details should remain inside this module.

import type {
  CreateMilestoneInput,
  Milestone,
  MilestoneEvidence,
  MilestoneReviewInput,
  MilestoneStatus,
} from './types'

/**
 * Import the project's configured API client here.
 *
 * Example:
 * import { api } from '@/lib/api'
 *
 * Keep the import isolated to this service so the rest of the
 * milestones module remains independent of the HTTP implementation.
 */

// -----------------------------------------------------------------------------
// Query types
// -----------------------------------------------------------------------------

export interface MilestoneListParams {
  projectId: string
  status?: MilestoneStatus
}

export interface MilestoneListResponse {
  milestones: Milestone[]
  total: number
}

export interface MilestoneEvidenceInput {
  milestoneId: string
  evidence: MilestoneEvidence
}

// -----------------------------------------------------------------------------
// Review / workflow types
// -----------------------------------------------------------------------------

export interface MilestoneRejectionInput {
  reason: string
}

export interface MilestoneEvidenceRequestInput {
  message: string
}

export interface MilestoneDisputeInput {
  reason: string
}

export type MilestoneAuditAction =
  | 'created'
  | 'updated'
  | 'evidence_submitted'
  | 'review_requested'
  | 'reviewed'
  | 'approved'
  | 'rejected'
  | 'evidence_requested'
  | 'disputed'
  | 'status_changed'
  | 'payment_released'
  | 'payment_frozen'

export interface MilestoneAuditEntry {
  id: string
  milestoneId: string
  action: MilestoneAuditAction
  actorId: string
  actorName?: string
  actorRole?: string
  timestamp: string
  previousStatus?: MilestoneStatus
  newStatus?: MilestoneStatus
  comment?: string
  metadata?: Record<string, unknown>
}

// -----------------------------------------------------------------------------
// Service error
// -----------------------------------------------------------------------------

export class MilestonesServiceError extends Error {
  readonly code?: string
  readonly status?: number

  constructor(
    message: string,
    options?: {
      code?: string
      status?: number
    },
  ) {
    super(message)

    this.name = 'MilestonesServiceError'
    this.code = options?.code
    this.status = options?.status
  }
}

// -----------------------------------------------------------------------------
// Endpoint map
// -----------------------------------------------------------------------------

const endpoints = {
  collection: '/milestones',

  byId: (id: string) => `/milestones/${encodeURIComponent(id)}`,

  evidence: (id: string) =>
    `/milestones/${encodeURIComponent(id)}/evidence`,

  review: (id: string) =>
    `/milestones/${encodeURIComponent(id)}/review`,

  approve: (id: string) =>
    `/milestones/${encodeURIComponent(id)}/approve`,

  reject: (id: string) =>
    `/milestones/${encodeURIComponent(id)}/reject`,

  requestEvidence: (id: string) =>
    `/milestones/${encodeURIComponent(id)}/request-evidence`,

  dispute: (id: string) =>
    `/milestones/${encodeURIComponent(id)}/dispute`,

  audit: (id: string) =>
    `/milestones/${encodeURIComponent(id)}/audit`,
} as const

// -----------------------------------------------------------------------------
// API client contract
// -----------------------------------------------------------------------------

/**
 * Minimal contract expected from the application's API client.
 *
 * This keeps the milestone service decoupled from Axios, fetch wrappers,
 * React Query clients, etc.
 *
 * Replace the local type with your project's shared API client when available.
 */
interface ApiClient {
  get<T>(
    url: string,
    options?: {
      params?: Record<string, unknown>
    },
  ): Promise<T>

  post<T>(
    url: string,
    body?: unknown,
  ): Promise<T>

  patch<T>(
    url: string,
    body?: unknown,
  ): Promise<T>
}

// -----------------------------------------------------------------------------
// API client placeholder
// -----------------------------------------------------------------------------

/**
 * Connect this to the project's configured API client.
 *
 * Example:
 *
 * import { api } from '@/lib/api'
 *
 * const apiClient = api
 *
 * The cast below exists only so this service remains structurally ready
 * while the project's actual API client is being wired.
 */
const apiClient = null as unknown as ApiClient

// -----------------------------------------------------------------------------
// Internal guards
// -----------------------------------------------------------------------------

function assertId(id: string, resource = 'milestone'): void {
  if (!id.trim()) {
    throw new MilestonesServiceError(
      `${resource} ID is required.`,
      {
        code: 'INVALID_ID',
      },
    )
  }
}

function assertRequiredText(
  value: string,
  field: string,
): void {
  if (!value.trim()) {
    throw new MilestonesServiceError(
      `${field} is required.`,
      {
        code: 'INVALID_INPUT',
      },
    )
  }
}

// -----------------------------------------------------------------------------
// Service
// -----------------------------------------------------------------------------

export const milestonesService = {
  /**
   * Get all milestones belonging to a project.
   *
   * BRD:
   * - Sec. 18.4 Milestone Approval Rules
   * - Sec. 23 Client / PM dashboards
   *
   * Supports optional status filtering while keeping project scope mandatory.
   */
  async list(
    params: MilestoneListParams,
  ): Promise<MilestoneListResponse> {
    assertRequiredText(params.projectId, 'Project ID')

    return apiClient.get<MilestoneListResponse>(
      endpoints.collection,
      {
        params: {
          projectId: params.projectId,
          ...(params.status
            ? {
                status: params.status,
              }
            : {}),
        },
      },
    )
  },

  /**
   * Get a single milestone and its current workflow state.
   *
   * The returned milestone should represent the authoritative server state,
   * including approval, evidence and payment-readiness information.
   */
  async get(id: string): Promise<Milestone> {
    assertId(id)

    return apiClient.get<Milestone>(
      endpoints.byId(id),
    )
  },

  /**
   * Create a new milestone for a project.
   *
   * BRD:
   * - Sec. 18.4 Milestone approval rules
   * - Sec. 19.1 Change control
   */
  async create(
    input: CreateMilestoneInput,
  ): Promise<Milestone> {
    return apiClient.post<Milestone>(
      endpoints.collection,
      input,
    )
  },

  /**
   * Update a milestone before it enters a locked / approved state.
   *
   * The backend remains responsible for enforcing workflow restrictions.
   * The frontend should never be treated as the authority for determining
   * whether an update is permitted.
   */
  async update(
    id: string,
    input: Partial<CreateMilestoneInput>,
  ): Promise<Milestone> {
    assertId(id)

    return apiClient.patch<Milestone>(
      endpoints.byId(id),
      input,
    )
  },

  /**
   * Submit milestone evidence.
   *
   * Evidence may include:
   * - photographs
   * - videos
   * - completion notes
   * - material usage summaries
   * - labour summaries
   * - receipts
   * - professional documentation
   * - supporting reports
   *
   * BRD Sec. 18.4:
   * Evidence must support milestone verification and payment.
   */
  async submitEvidence(
    input: MilestoneEvidenceInput,
  ): Promise<Milestone> {
    assertId(input.milestoneId)

    return apiClient.post<Milestone>(
      endpoints.evidence(input.milestoneId),
      input.evidence,
    )
  },

  /**
   * Request milestone review.
   *
   * Moves a completed milestone into the formal verification workflow.
   *
   * Review should only become available when the milestone has satisfied
   * the applicable submission requirements. The backend remains authoritative.
   */
  async requestReview(
    id: string,
  ): Promise<Milestone> {
    assertId(id)

    return apiClient.post<Milestone>(
      endpoints.review(id),
    )
  },

  /**
   * PM / Professional milestone review.
   *
   * A milestone must not proceed toward payment based solely on
   * contractor-submitted evidence.
   *
   * BRD Sec. 15.1:
   * - independent verification
   * - evidence before payment
   * - client approval
   */
  async review(
    id: string,
    input: MilestoneReviewInput,
  ): Promise<Milestone> {
    assertId(id)

    return apiClient.post<Milestone>(
      endpoints.review(id),
      input,
    )
  },

  /**
   * Client approval of a verified milestone.
   *
   * Major milestone payments require client approval in addition to
   * the applicable professional / project verification workflow.
   */
  async approve(
    id: string,
  ): Promise<Milestone> {
    assertId(id)

    return apiClient.post<Milestone>(
      endpoints.approve(id),
    )
  },

  /**
   * Reject a milestone after review.
   *
   * Rejection should include a meaningful reason and may result in:
   * - corrective work
   * - additional evidence
   * - another verification cycle
   */
  async reject(
    id: string,
    reason: string,
  ): Promise<Milestone> {
    assertId(id)
    assertRequiredText(reason, 'Rejection reason')

    const input: MilestoneRejectionInput = {
      reason: reason.trim(),
    }

    return apiClient.post<Milestone>(
      endpoints.reject(id),
      input,
    )
  },

  /**
   * Request additional evidence.
   *
   * This keeps the milestone inside the verification workflow rather than
   * treating missing evidence as an automatic rejection.
   */
  async requestMoreEvidence(
    id: string,
    message: string,
  ): Promise<Milestone> {
    assertId(id)
    assertRequiredText(message, 'Evidence request message')

    const input: MilestoneEvidenceRequestInput = {
      message: message.trim(),
    }

    return apiClient.post<Milestone>(
      endpoints.requestEvidence(id),
      input,
    )
  },

  /**
   * Mark a milestone as disputed.
   *
   * BRD Sec. 18.2:
   * Disputed payment lines must be frozen until the dispute is resolved.
   */
  async dispute(
    id: string,
    reason: string,
  ): Promise<Milestone> {
    assertId(id)
    assertRequiredText(reason, 'Dispute reason')

    const input: MilestoneDisputeInput = {
      reason: reason.trim(),
    }

    return apiClient.post<Milestone>(
      endpoints.dispute(id),
      input,
    )
  },

  /**
   * Get all evidence attached to a milestone.
   *
   * Evidence should be returned from the server as the authoritative
   * verification record.
   */
  async getEvidence(
    id: string,
  ): Promise<MilestoneEvidence[]> {
    assertId(id)

    return apiClient.get<MilestoneEvidence[]>(
      endpoints.evidence(id),
    )
  },

  /**
   * Get the milestone approval / audit history.
   *
   * BRD Sec. 15.1:
   * Every approval, rejection, status change and financial action
   * must be auditable.
   */
  async getAuditHistory(
    id: string,
  ): Promise<MilestoneAuditEntry[]> {
    assertId(id)

    return apiClient.get<MilestoneAuditEntry[]>(
      endpoints.audit(id),
    )
  },
}

export type MilestonesService = typeof milestonesService