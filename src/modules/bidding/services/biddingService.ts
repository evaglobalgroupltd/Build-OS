
// Bidding module — API service layer
//
// This file is the single network boundary for the Bidding module.
// Pages, components and hooks should never call fetch/axios directly.
//
// BRD references:
// - Sec. 17.1 — Contractor Marketplace / Bidding
// - Sec. 24 — Screen-by-Screen Requirements
// - Sec. 28.1 — Backend/API integration
//
// Architecture:
// UI → hooks/services → biddingService → API client → backend
//
// TODO:
// Replace the placeholder implementations with the application's
// shared API client once the backend contract is available.

import type { Bid } from '@/modules/bidding/types'

/* -------------------------------------------------------------------------- */
/* Domain contracts                                                           */
/* -------------------------------------------------------------------------- */

export interface BidListFilters {
  projectId?: string
  contractorId?: string
  status?: Bid['status']
  search?: string
}

export interface BidCostItem {
  description: string
  quantity: number
  unit: string
  rate: number
}

export interface BidMilestone {
  name: string
  percentage: number
}

export interface SubmitBidPayload {
  projectId: string
  projectPhase: string
  scope: string
  timelineWeeks: number
  bidValidityDays: number

  costs: BidCostItem[]

  approach: string

  milestones: BidMilestone[]

  assumptions?: string
}

export interface BidDecisionPayload {
  bidId: string
  decision: 'award' | 'reject' | 'request_clarification'
  reason?: string
}

/* -------------------------------------------------------------------------- */
/* API configuration                                                           */
/* -------------------------------------------------------------------------- */

const BIDDING_BASE_PATH = '/bidding'

const BID_ENDPOINTS = {
  list: `${BIDDING_BASE_PATH}/bids`,
  create: `${BIDDING_BASE_PATH}/bids`,
  drafts: `${BIDDING_BASE_PATH}/bids/drafts`,

  byId: (id: string) =>
    `${BIDDING_BASE_PATH}/bids/${encodeURIComponent(id)}`,

  submit: (id: string) =>
    `${BIDDING_BASE_PATH}/bids/${encodeURIComponent(id)}/submit`,

  clarification: (id: string) =>
    `${BIDDING_BASE_PATH}/bids/${encodeURIComponent(id)}/clarification`,

  decision: (id: string) =>
    `${BIDDING_BASE_PATH}/bids/${encodeURIComponent(id)}/decision`,
} as const

/* -------------------------------------------------------------------------- */
/* Service                                                                     */
/* -------------------------------------------------------------------------- */

export const biddingService = {
  /**
   * List bids.
   *
   * Used by:
   * - My Bids
   * - Bid Comparison
   * - Admin bidding oversight
   *
   * Supported filters:
   * - projectId
   * - contractorId
   * - status
   * - search
   */
  async list(filters?: BidListFilters): Promise<Bid[]> {
    // TODO:
    // return api.get<Bid[]>(BID_ENDPOINTS.list, {
    //   params: filters,
    // })

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
    // TODO:
    // return api.get<Bid>(BID_ENDPOINTS.byId(id))

    void id

    return null
  },

  /**
   * Submit a new contractor bid.
   *
   * A submitted bid contains:
   * - Project phase
   * - Scope
   * - Cost breakdown
   * - Delivery timeline
   * - Execution approach
   * - Payment milestones
   * - Assumptions / exclusions
   * - Bid validity
   *
   * Business rule:
   * Submission should only succeed when the backend validates
   * the project, contractor eligibility and commercial payload.
   */
  async submitBid(payload: SubmitBidPayload): Promise<Bid> {
    // TODO:
    // return api.post<Bid>(
    //   BID_ENDPOINTS.create,
    //   payload,
    // )

    void payload

    throw new Error(
      'biddingService.submitBid is not connected to the backend yet.',
    )
  },

  /**
   * Update an existing draft bid.
   *
   * Only fields supplied in the payload should be updated.
   */
  async updateBid(
    id: string,
    payload: Partial<SubmitBidPayload>,
  ): Promise<Bid> {
    // TODO:
    // return api.patch<Bid>(
    //   BID_ENDPOINTS.byId(id),
    //   payload,
    // )

    void id
    void payload

    throw new Error(
      'biddingService.updateBid is not connected to the backend yet.',
    )
  },

  /**
   * Save a bid as a draft.
   *
   * Drafts are not treated as submitted proposals and should not
   * enter the client's bid-review workflow until explicitly submitted.
   */
  async saveDraft(payload: SubmitBidPayload): Promise<Bid> {
    // TODO:
    // return api.post<Bid>(
    //   BID_ENDPOINTS.drafts,
    //   payload,
    // )

    void payload

    throw new Error(
      'biddingService.saveDraft is not connected to the backend yet.',
    )
  },

  /**
   * Submit a previously saved draft.
   *
   * This intentionally uses a dedicated endpoint rather than
   * mutating the draft directly. The backend can therefore perform
   * final validation before moving it into the submitted state.
   */
  async submitDraft(id: string): Promise<Bid> {
    // TODO:
    // return api.post<Bid>(
    //   BID_ENDPOINTS.submit(id),
    // )

    void id

    throw new Error(
      'biddingService.submitDraft is not connected to the backend yet.',
    )
  },

  /**
   * Request clarification from a contractor.
   *
   * Clarification is kept separate from bid decisions so that
   * communication does not implicitly change the commercial state.
   */
  async requestClarification(
    bidId: string,
    message: string,
  ): Promise<void> {
    // TODO:
    // await api.post(
    //   BID_ENDPOINTS.clarification(bidId),
    //   { message },
    // )

    void bidId
    void message

    throw new Error(
      'biddingService.requestClarification is not connected to the backend yet.',
    )
  },

  /**
   * Award, reject or request clarification on a bid.
   *
   * IMPORTANT:
   * Awarding a bid does NOT release escrow.
   *
   * Contract award and escrow funding are intentionally separate
   * controlled actions and should remain separate throughout the
   * application architecture.
   */
  async decide(payload: BidDecisionPayload): Promise<Bid> {
    // TODO:
    // return api.post<Bid>(
    //   BID_ENDPOINTS.decision(payload.bidId),
    //   payload,
    // )

    void payload

    throw new Error(
      'biddingService.decide is not connected to the backend yet.',
    )
  },
} as const