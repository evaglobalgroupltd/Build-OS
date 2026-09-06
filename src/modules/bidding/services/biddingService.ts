// Bidding module — API service layer
//
// This is the single network boundary for the Bidding module.
// Pages and components should never call fetch/axios directly.
//
// BRD references:
// - Sec. 17.1 — Contractor Marketplace / Bidding
// - Sec. 24 — Screen-by-Screen Requirements
// - Sec. 28.1 — Backend/API integration
//
// TODO:
// Replace the placeholder implementations with the real API client
// once the backend contract is available.

import type { Bid } from '@/modules/bidding/types'

export interface BidListFilters {
  projectId?: string
  contractorId?: string
  status?: Bid['status']
  search?: string
}

export interface SubmitBidPayload {
  projectId: string
  projectPhase: string
  scope: string
  timelineWeeks: number
  bidValidityDays: number

  costs: Array<{
    description: string
    quantity: number
    unit: string
    rate: number
  }>

  approach: string

  milestones: Array<{
    name: string
    percentage: number
  }>

  assumptions?: string
}

export interface BidDecisionPayload {
  bidId: string
  decision: 'award' | 'reject' | 'request_clarification'
  reason?: string
}

export const biddingService = {
  /**
   * List bids.
   *
   * Used by:
   * - My Bids
   * - Bid Comparison
   * - Admin bidding oversight
   */
  async list(filters?: BidListFilters): Promise<Bid[]> {
    // TODO: return api.get<Bid[]>('/bidding/bids', { params: filters })
    void filters

    return []
  },

  /**
   * Get a single bid by ID.
   *
   * Used by:
   * - Bid Details
   * - Bid Comparison
   * - Award workflow
   */
  async get(id: string): Promise<Bid | null> {
    // TODO: return api.get<Bid>(`/bidding/bids/${id}`)
    void id

    return null
  },

  /**
   * Submit a new contractor bid.
   *
   * A bid should contain:
   * - Project phase
   * - Scope
   * - Cost breakdown
   * - Timeline
   * - Execution approach
   * - Payment milestones
   * - Assumptions / exclusions
   * - Bid validity
   */
  async submitBid(payload: SubmitBidPayload): Promise<Bid> {
    // TODO:
    // return api.post<Bid>('/bidding/bids', payload)

    void payload

    throw new Error(
      'biddingService.submitBid is not connected to the backend yet.',
    )
  },

  /**
   * Update an existing draft bid.
   */
  async updateBid(
    id: string,
    payload: Partial<SubmitBidPayload>,
  ): Promise<Bid> {
    // TODO:
    // return api.patch<Bid>(`/bidding/bids/${id}`, payload)

    void id
    void payload

    throw new Error(
      'biddingService.updateBid is not connected to the backend yet.',
    )
  },

  /**
   * Save a bid as a draft.
   */
  async saveDraft(payload: SubmitBidPayload): Promise<Bid> {
    // TODO:
    // return api.post<Bid>('/bidding/bids/drafts', payload)

    void payload

    throw new Error(
      'biddingService.saveDraft is not connected to the backend yet.',
    )
  },

  /**
   * Submit a previously saved draft.
   */
  async submitDraft(id: string): Promise<Bid> {
    // TODO:
    // return api.post<Bid>(`/bidding/bids/${id}/submit`)

    void id

    throw new Error(
      'biddingService.submitDraft is not connected to the backend yet.',
    )
  },

  /**
   * Request clarification from a contractor.
   */
  async requestClarification(
    bidId: string,
    message: string,
  ): Promise<void> {
    // TODO:
    // return api.post(`/bidding/bids/${bidId}/clarification`, {
    //   message,
    // })

    void bidId
    void message

    throw new Error(
      'biddingService.requestClarification is not connected to the backend yet.',
    )
  },

  /**
   * Award, reject or request clarification on a bid.
   *
   * Important:
   * Awarding a bid should NOT directly release escrow.
   * Contract award and escrow funding remain separate controlled actions.
   */
  async decide(payload: BidDecisionPayload): Promise<Bid> {
    // TODO:
    // return api.post<Bid>(
    //   `/bidding/bids/${payload.bidId}/decision`,
    //   payload,
    // )

    void payload

    throw new Error(
      'biddingService.decide is not connected to the backend yet.',
    )
  },
}