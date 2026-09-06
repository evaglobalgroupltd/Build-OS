// Disputes module — API service layer
// BRD reference: Sec. 19 / Sec. 28.1
//
// This is the single network boundary for the disputes module.
// Pages and components must not call fetch/axios directly.
//
// The methods below define the frontend contract now.
// Replace the implementation with the project's shared API client
// when the backend endpoints become available.

import type {
  Dispute,
  DisputeEvidence,
  DisputeResponse,
  DisputeStatus,
  DisputeResolution,
} from '@/modules/disputes/types'

export interface CreateDisputePayload {
  projectId: string
  category: string
  respondent: string
  affectedMilestone?: string
  affectedPaymentId?: string
  amount: number
  currency: 'NGN' | 'USD'
  description: string
  requestedResolution: string
}

export interface SubmitEvidencePayload {
  disputeId: string
  description?: string
  file: File
}

export interface SubmitResponsePayload {
  disputeId: string
  message: string
  evidenceIds?: string[]
}

export interface ResolveDisputePayload {
  disputeId: string
  outcome: string
  resolutionType:
    | 'payment_release'
    | 'payment_refund'
    | 'correction'
    | 'replacement'
    | 'partial_settlement'
    | 'dismissed'
    | 'other'
  amount?: number
  currency?: 'NGN' | 'USD'
  notes?: string
}

export interface DisputeFilters {
  status?: DisputeStatus
  projectId?: string
  raisedBy?: string
  respondent?: string
  category?: string
}

export const disputesService = {
  /**
   * List disputes visible to the authenticated user.
   */
  async list(filters?: DisputeFilters): Promise<Dispute[]> {
    // TODO: connect to:
    // GET /disputes
    //
    // Example:
    // return api.get<Dispute[]>('/disputes', { params: filters })

    void filters

    return []
  },

  /**
   * Get a single dispute by ID.
   */
  async get(id: string): Promise<Dispute | null> {
    // TODO:
    // GET /disputes/:id

    void id

    return null
  },

  /**
   * Create and open a new dispute.
   */
  async create(payload: CreateDisputePayload): Promise<Dispute> {
    // TODO:
    // POST /disputes

    void payload

    throw new Error(
      'disputesService.create is not connected to the backend yet.',
    )
  },

  /**
   * Submit supporting evidence.
   */
  async submitEvidence(
    payload: SubmitEvidencePayload,
  ): Promise<DisputeEvidence> {
    // TODO:
    // POST /disputes/:disputeId/evidence
    //
    // The final implementation should use multipart/form-data.

    void payload

    throw new Error(
      'disputesService.submitEvidence is not connected to the backend yet.',
    )
  },

  /**
   * List evidence attached to a dispute.
   */
  async listEvidence(disputeId: string): Promise<DisputeEvidence[]> {
    // TODO:
    // GET /disputes/:disputeId/evidence

    void disputeId

    return []
  },

  /**
   * Submit a respondent statement or counter-evidence reference.
   */
  async submitResponse(
    payload: SubmitResponsePayload,
  ): Promise<DisputeResponse> {
    // TODO:
    // POST /disputes/:disputeId/responses

    void payload

    throw new Error(
      'disputesService.submitResponse is not connected to the backend yet.',
    )
  },

  /**
   * List all responses submitted for a dispute.
   */
  async listResponses(disputeId: string): Promise<DisputeResponse[]> {
    // TODO:
    // GET /disputes/:disputeId/responses

    void disputeId

    return []
  },

  /**
   * Freeze the affected payment line.
   * Normally restricted to the dispute/admin workflow.
   */
  async freezePayment(disputeId: string): Promise<void> {
    // TODO:
    // POST /disputes/:disputeId/freeze-payment

    void disputeId

    throw new Error(
      'disputesService.freezePayment is not connected to the backend yet.',
    )
  },

  /**
   * Submit a dispute for administrative review.
   */
  async submitForReview(disputeId: string): Promise<Dispute> {
    // TODO:
    // POST /disputes/:disputeId/submit-review

    void disputeId

    throw new Error(
      'disputesService.submitForReview is not connected to the backend yet.',
    )
  },

  /**
   * Resolve a dispute.
   * Restricted to authorised admin/dispute officers.
   */
  async resolve(
    payload: ResolveDisputePayload,
  ): Promise<DisputeResolution> {
    // TODO:
    // POST /disputes/:disputeId/resolve

    void payload

    throw new Error(
      'disputesService.resolve is not connected to the backend yet.',
    )
  },

  /**
   * Get the final resolution for a dispute.
   */
  async getResolution(
    disputeId: string,
  ): Promise<DisputeResolution | null> {
    // TODO:
    // GET /disputes/:disputeId/resolution

    void disputeId

    return null
  },
}