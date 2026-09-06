// Bidding module — domain types
// BRD references: Sec. 17.1 / 24

export type BidStatus =
  | 'draft'
  | 'submitted'
  | 'shortlisted'
  | 'clarification'
  | 'awarded'
  | 'rejected'

export type BidCurrency = 'NGN' | 'USD'

export interface BidCostItem {
  description: string
  quantity: number
  unit: string
  rate: number
  total: number
}

export interface BidMilestone {
  id: string
  name: string
  percentage: number
  amount: number
  status?: 'pending' | 'approved' | 'paid'
}

export interface Bid {
  id: string
  projectId: string

  contractorId?: string
  contractorName: string

  /**
   * Contractor verification and marketplace trust indicators.
   */
  trustScore: number
  verified: boolean

  /**
   * Commercial proposal.
   */
  amount: number
  currency: BidCurrency

  /**
   * Proposed execution timeline.
   */
  timelineWeeks: number

  /**
   * Current lifecycle state.
   */
  status: BidStatus

  /**
   * Detailed bid submission information.
   */
  projectPhase?: string
  scope?: string
  approach?: string

  /**
   * Cost breakdown required for bid comparison.
   */
  costs?: BidCostItem[]

  /**
   * Proposed payment structure.
   */
  milestones?: BidMilestone[]

  /**
   * Contractor assumptions, exclusions or conditions.
   */
  assumptions?: string

  /**
   * Number of days for which the submitted bid remains valid.
   */
  bidValidityDays?: number

  /**
   * Clarification workflow.
   */
  clarificationMessage?: string
  clarificationResponse?: string

  /**
   * Marketplace timestamps.
   */
  createdAt?: string
  updatedAt?: string
  submittedAt?: string
  awardedAt?: string
}