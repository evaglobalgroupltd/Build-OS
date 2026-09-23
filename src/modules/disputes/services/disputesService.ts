
// Disputes module — API service layer
// BRD reference: Sec. 19 / Sec. 28.1
//
// This file is the single network boundary for the disputes module.
//
// Pages/components should consume disputesService only.
// They must not call fetch(), axios, or another HTTP client directly.
//
// The service contract is intentionally backend-ready. The placeholder
// implementation can be replaced with the project's shared API client
// without changing consumers of this module.

/* -------------------------------------------------------------------------- */
/* Imports                                                                    */
/* -------------------------------------------------------------------------- */

import type {
  Dispute,
  DisputeEvidence,
  DisputeResponse,
  DisputeResolution,
  DisputeStatus,
} from '@/modules/disputes/types'

/* -------------------------------------------------------------------------- */
/* Shared primitives                                                          */
/* -------------------------------------------------------------------------- */

export type DisputeCurrency = 'NGN' | 'USD'

export type DisputeResolutionType =
  | 'payment_release'
  | 'payment_refund'
  | 'correction'
  | 'replacement'
  | 'partial_settlement'
  | 'dismissed'
  | 'other'

/* -------------------------------------------------------------------------- */
/* Request payloads                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Payload used when opening a new dispute.
 */
export interface CreateDisputePayload {
  projectId: string
  category: string
  respondent: string
  affectedMilestone?: string
  affectedPaymentId?: string
  amount: number
  currency: DisputeCurrency
  description: string
  requestedResolution: string
}

/**
 * Payload used when attaching supporting evidence to a dispute.
 *
 * The final HTTP implementation should send this as multipart/form-data.
 */
export interface SubmitEvidencePayload {
  disputeId: string
  description?: string
  file: File
}

/**
 * Payload used when submitting a party response.
 */
export interface SubmitResponsePayload {
  disputeId: string
  message: string
  evidenceIds?: string[]
}

/**
 * Payload used when resolving a dispute.
 *
 * Resolution authority should ultimately be enforced by the backend,
 * regardless of the frontend user's role.
 */
export interface ResolveDisputePayload {
  disputeId: string
  outcome: string
  resolutionType: DisputeResolutionType
  amount?: number
  currency?: DisputeCurrency
  notes?: string
}

/* -------------------------------------------------------------------------- */
/* Query filters                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Supported dispute list filters.
 *
 * Keep filtering here so pages do not need to understand query-string
 * construction or backend parameter conventions.
 */
export interface DisputeFilters {
  status?: DisputeStatus
  projectId?: string
  raisedBy?: string
  respondent?: string
  category?: string
}

/* -------------------------------------------------------------------------- */
/* Service error                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Standard service-layer error.
 *
 * This gives the UI a predictable error shape once the shared API client
 * is connected.
 */
export class DisputesServiceError extends Error {
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

    this.name = 'DisputesServiceError'
    this.code = options?.code
    this.status = options?.status
  }
}

/* -------------------------------------------------------------------------- */
/* Internal helpers                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Used by placeholder methods until the shared API client is connected.
 *
 * Keeping the backend transition explicit prevents silent failures where
 * pages appear to work but are actually operating against empty data.
 */
function notConnected(method: string): never {
  throw new DisputesServiceError(
    `disputesService.${method} is not connected to the backend yet.`,
    {
      code: 'DISPUTES_API_NOT_CONNECTED',
    },
  )
}

/**
 * Placeholder for the project's shared HTTP client.
 *
 * Replace this boundary with the real client when the backend becomes
 * available. Keeping the dependency isolated here prevents the rest of
 * the disputes module from becoming coupled to a specific HTTP library.
 *
 * Example future implementation:
 *
 *   import { api } from '@/lib/api'
 *
 *   return api.get<Dispute[]>('/disputes', {
 *     params: filters,
 *   })
 *
 * Do not expose fetch/axios directly to pages or components.
 */
void notConnected

/* -------------------------------------------------------------------------- */
/* Disputes service                                                           */
/* -------------------------------------------------------------------------- */

export const disputesService = {
  /**
   * List disputes visible to the authenticated user.
   *
   * GET /disputes
   *
   * The backend should enforce tenant/project/user visibility.
   */
  async list(filters?: DisputeFilters): Promise<Dispute[]> {
    // TODO: Replace with the shared API client.
    //
    // return api.get<Dispute[]>('/disputes', {
    //   params: filters,
    // })

    void filters

    return []
  },

  /**
   * Get a single dispute by ID.
   *
   * GET /disputes/:id
   */
  async get(id: string): Promise<Dispute | null> {
    // TODO:
    // return api.get<Dispute>(`/disputes/${id}`)

    void id

    return null
  },

  /**
   * Create and open a new dispute.
   *
   * POST /disputes
   *
   * The backend should:
   * - validate the project relationship
   * - validate the respondent
   * - create the dispute
   * - establish the initial workflow state
   * - create the audit entry
   * - notify relevant parties
   */
  async create(payload: CreateDisputePayload): Promise<Dispute> {
    // TODO:
    // return api.post<Dispute>('/disputes', payload)

    void payload

    return notConnected('create')
  },

  /**
   * Submit supporting evidence.
   *
   * POST /disputes/:disputeId/evidence
   *
   * Final implementation should use multipart/form-data.
   */
  async submitEvidence(
    payload: SubmitEvidencePayload,
  ): Promise<DisputeEvidence> {
    // TODO:
    //
    // const formData = new FormData()
    // formData.append('file', payload.file)
    //
    // if (payload.description) {
    //   formData.append('description', payload.description)
    // }
    //
    // return api.post<DisputeEvidence>(
    //   `/disputes/${payload.disputeId}/evidence`,
    //   formData,
    // )

    void payload

    return notConnected('submitEvidence')
  },

  /**
   * List evidence attached to a dispute.
   *
   * GET /disputes/:disputeId/evidence
   */
  async listEvidence(disputeId: string): Promise<DisputeEvidence[]> {
    // TODO:
    // return api.get<DisputeEvidence[]>(
    //   `/disputes/${disputeId}/evidence`,
    // )

    void disputeId

    return []
  },

  /**
   * Submit a respondent statement or counter-evidence reference.
   *
   * POST /disputes/:disputeId/responses
   *
   * The backend should associate the response with the authenticated
   * participant and append the corresponding audit event.
   */
  async submitResponse(
    payload: SubmitResponsePayload,
  ): Promise<DisputeResponse> {
    // TODO:
    // return api.post<DisputeResponse>(
    //   `/disputes/${payload.disputeId}/responses`,
    //   payload,
    // )

    void payload

    return notConnected('submitResponse')
  },

  /**
   * List all responses submitted for a dispute.
   *
   * GET /disputes/:disputeId/responses
   */
  async listResponses(disputeId: string): Promise<DisputeResponse[]> {
    // TODO:
    // return api.get<DisputeResponse[]>(
    //   `/disputes/${disputeId}/responses`,
    // )

    void disputeId

    return []
  },

  /**
   * Freeze the affected payment line.
   *
   * POST /disputes/:disputeId/freeze-payment
   *
   * Normally restricted to the dispute/admin workflow.
   * The backend must enforce authorization and payment ownership.
   */
  async freezePayment(disputeId: string): Promise<void> {
    // TODO:
    // await api.post(
    //   `/disputes/${disputeId}/freeze-payment`,
    // )

    void disputeId

    return notConnected('freezePayment')
  },

  /**
   * Submit a dispute for administrative review.
   *
   * POST /disputes/:disputeId/submit-review
   *
   * This should create a workflow transition and corresponding audit entry.
   */
  async submitForReview(disputeId: string): Promise<Dispute> {
    // TODO:
    // return api.post<Dispute>(
    //   `/disputes/${disputeId}/submit-review`,
    // )

    void disputeId

    return notConnected('submitForReview')
  },

  /**
   * Resolve a dispute.
   *
   * POST /disputes/:disputeId/resolve
   *
   * Restricted to authorised dispute officers/admin users.
   * Authorization must be enforced server-side.
   */
  async resolve(
    payload: ResolveDisputePayload,
  ): Promise<DisputeResolution> {
    // TODO:
    // return api.post<DisputeResolution>(
    //   `/disputes/${payload.disputeId}/resolve`,
    //   payload,
    // )

    void payload

    return notConnected('resolve')
  },

  /**
   * Get the final resolution for a dispute.
   *
   * GET /disputes/:disputeId/resolution
   */
  async getResolution(
    disputeId: string,
  ): Promise<DisputeResolution | null> {
    // TODO:
    // return api.get<DisputeResolution>(
    //   `/disputes/${disputeId}/resolution`,
    // )

    void disputeId

    return null
  },
} as const

/* -------------------------------------------------------------------------- */
/* Future API contract                                                        */
/* -------------------------------------------------------------------------- */
/*
 * Planned endpoint surface:
 *
 * GET    /disputes
 * GET    /disputes/:id
 * POST   /disputes
 *
 * GET    /disputes/:disputeId/evidence
 * POST   /disputes/:disputeId/evidence
 *
 * GET    /disputes/:disputeId/responses
 * POST   /disputes/:disputeId/responses
 *
 * POST   /disputes/:disputeId/freeze-payment
 * POST   /disputes/:disputeId/submit-review
 *
 * GET    /disputes/:disputeId/resolution
 * POST   /disputes/:disputeId/resolve
 *
 * Security expectations:
 * - Authentication handled by the shared API client.
 * - Authorization enforced by the backend.
 * - Tenant/project visibility enforced server-side.
 * - Payment actions require explicit authorization.
 * - Evidence uploads use multipart/form-data.
 * - Workflow transitions create immutable audit events.
 * - Financial amounts are validated server-side.
 * - Currency is validated against the project's supported currencies.
 */
