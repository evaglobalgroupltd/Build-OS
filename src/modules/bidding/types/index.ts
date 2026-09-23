
// Bidding module — domain types
//
// BRD references:
// - Sec. 17.1 — Contractor Marketplace / Bidding
// - Sec. 24   — Screen-by-Screen Requirements
//
// This file contains the canonical domain contracts for the Bidding module.
// Keep module-specific types here; shared cross-module types belong in
// the root `src/types`.
//
// Architecture:
// UI → hooks/services → biddingService → Bid domain types

/* -------------------------------------------------------------------------- */
/* Lifecycle                                                                    */
/* -------------------------------------------------------------------------- */

export type BidStatus =
  | 'draft'
  | 'submitted'
  | 'shortlisted'
  | 'clarification'
  | 'awarded'
  | 'rejected'

/* -------------------------------------------------------------------------- */
/* Commercial                                                                  */
/* -------------------------------------------------------------------------- */

export type BidCurrency = 'NGN' | 'USD'

export interface BidCostItem {
  /**
   * Human-readable description of the priced item or work package.
   */
  description: string

  /**
   * Quantity being priced.
   */
  quantity: number

  /**
   * Unit of measurement, e.g. "m²", "bags", "hours", "lot".
   */
  unit: string

  /**
   * Unit rate in the bid currency.
   */
  rate: number

  /**
   * Calculated line total.
   *
   * Expected relationship:
   * quantity × rate = total
   */
  total: number
}

/* -------------------------------------------------------------------------- */
/* Payment milestones                                                          */
/* -------------------------------------------------------------------------- */

export type BidMilestoneStatus =
  | 'pending'
  | 'approved'
  | 'paid'

export interface BidMilestone {
  /**
   * Stable identifier for the milestone.
   */
  id: string

  /**
   * Milestone name shown to the client and contractor.
   */
  name: string

  /**
   * Percentage of the total bid assigned to this milestone.
   */
  percentage: number

  /**
   * Monetary value represented by the milestone.
   */
  amount: number

  /**
   * Current payment lifecycle state.
   */
  status?: BidMilestoneStatus
}

/* -------------------------------------------------------------------------- */
/* Bid                                                                         */
/* -------------------------------------------------------------------------- */

export interface Bid {
  /**
   * Stable bid identifier.
   */
  id: string

  /**
   * Project this bid belongs to.
   */
  projectId: string

  /* ------------------------------------------------------------------------ */
  /* Contractor identity & trust                                             */
  /* ------------------------------------------------------------------------ */

  contractorId?: string
  contractorName: string

  /**
   * Marketplace trust indicator.
   *
   * The exact scoring model is owned by the marketplace/trust service.
   */
  trustScore: number

  /**
   * Indicates whether the contractor has completed the required
   * marketplace verification checks.
   */
  verified: boolean

  /* ------------------------------------------------------------------------ */
  /* Commercial proposal                                                      */
  /* ------------------------------------------------------------------------ */

  /**
   * Total proposed contract value.
   */
  amount: number

  /**
   * Currency used for the commercial proposal.
   */
  currency: BidCurrency

  /* ------------------------------------------------------------------------ */
  /* Delivery proposal                                                        */
  /* ------------------------------------------------------------------------ */

  /**
   * Proposed execution duration in weeks.
   */
  timelineWeeks: number

  /**
   * Current lifecycle state of the bid.
   */
  status: BidStatus

  /* ------------------------------------------------------------------------ */
  /* Submission detail                                                        */
  /* ------------------------------------------------------------------------ */

  /**
   * Project phase covered by this proposal.
   */
  projectPhase?: string

  /**
   * Contractor's interpretation of the requested scope.
   */
  scope?: string

  /**
   * Proposed execution methodology or approach.
   */
  approach?: string

  /* ------------------------------------------------------------------------ */
  /* Cost structure                                                           */
  /* ------------------------------------------------------------------------ */

  /**
   * Detailed commercial breakdown used for bid review and comparison.
   */
  costs?: BidCostItem[]

  /* ------------------------------------------------------------------------ */
  /* Payment structure                                                        */
  /* ------------------------------------------------------------------------ */

  /**
   * Proposed payment milestones.
   */
  milestones?: BidMilestone[]

  /* ------------------------------------------------------------------------ */
  /* Commercial conditions                                                    */
  /* ------------------------------------------------------------------------ */

  /**
   * Contractor assumptions, exclusions, qualifications or conditions.
   */
  assumptions?: string

  /**
   * Number of calendar days for which the submitted proposal remains valid.
   */
  bidValidityDays?: number

  /* ------------------------------------------------------------------------ */
  /* Clarification workflow                                                   */
  /* ------------------------------------------------------------------------ */

  /**
   * Clarification request raised against the bid.
   */
  clarificationMessage?: string

  /**
   * Contractor's response to a clarification request.
   */
  clarificationResponse?: string

  /* ------------------------------------------------------------------------ */
  /* Marketplace timestamps                                                   */
  /* ------------------------------------------------------------------------ */

  /**
   * Record creation timestamp.
   */
  createdAt?: string

  /**
   * Most recent record update timestamp.
   */
  updatedAt?: string

  /**
   * Timestamp at which the bid was formally submitted.
   */
  submittedAt?: string

  /**
   * Timestamp at which the bid was awarded.
   */
  awardedAt?: string
}
