// Bidding module — domain types (BRD Sec. 17.1 / 24)

export type BidStatus = 'submitted' | 'shortlisted' | 'clarification' | 'awarded' | 'rejected'

export interface Bid {
  id: string
  projectId: string
  contractorName: string
  trustScore: number
  verified: boolean
  amount: number
  currency: 'NGN' | 'USD'
  timelineWeeks: number
  status: BidStatus
}
