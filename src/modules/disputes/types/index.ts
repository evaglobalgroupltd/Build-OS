// Disputes module — domain types
// BRD reference: Sec. 19
//
// Domain models for dispute creation, evidence, responses,
// administrative review, expert review, resolution and closure.

export type DisputeStatus =
  | 'open'
  | 'under_review'
  | 'resolved'
  | 'escalated'

export type DisputeStage =
  | 'dispute_opened'
  | 'evidence_submitted'
  | 'payment_frozen'
  | 'party_response'
  | 'admin_review'
  | 'expert_review'
  | 'recommendation'
  | 'resolution'
  | 'closure'

export type DisputeCategory =
  | 'quality'
  | 'payment'
  | 'delay'
  | 'scope'
  | 'materials'
  | 'delivery'
  | 'contract'
  | 'professional_service'
  | 'abandonment'
  | 'unauthorized_variation'
  | 'other'

export type DisputeResolutionType =
  | 'payment_release'
  | 'payment_refund'
  | 'correction'
  | 'replacement'
  | 'partial_settlement'
  | 'dismissed'
  | 'other'

export type EvidenceType =
  | 'document'
  | 'image'
  | 'video'
  | 'report'
  | 'invoice'
  | 'contract'
  | 'inspection'
  | 'communication'
  | 'other'

export interface Dispute {
  id: string

  projectId: string

  category: DisputeCategory | string

  raisedBy: string

  respondent: string

  amount: number

  currency: 'NGN' | 'USD'

  status: DisputeStatus

  stage: DisputeStage

  openedDate: string

  affectedMilestoneId?: string

  affectedPaymentId?: string

  description?: string

  requestedResolution?: string

  paymentFrozen: boolean

  evidenceCount: number

  responseCount: number

  assignedOfficerId?: string

  assignedExpertId?: string

  resolvedDate?: string

  closedDate?: string

  createdAt: string

  updatedAt: string
}

export interface DisputeEvidence {
  id: string

  disputeId: string

  submittedBy: string

  type: EvidenceType

  name: string

  description?: string

  fileUrl: string

  fileName: string

  mimeType: string

  fileSize: number

  submittedAt: string

  verified: boolean

}

export interface DisputeResponse {
  id: string

  disputeId: string

  submittedBy: string

  partyName: string

  role: string

  message: string

  evidenceIds: string[]

  submittedAt: string

}

export interface DisputeResolution {
  id: string

  disputeId: string

  resolvedBy: string

  resolutionType: DisputeResolutionType

  outcome: string

  amount?: number

  currency?: 'NGN' | 'USD'

  notes?: string

  resolvedAt: string

}

export interface DisputeTimelineEvent {
  id: string

  disputeId: string

  stage: DisputeStage

  title: string

  description?: string

  actor: string

  createdAt: string

}

export interface DisputeReview {
  disputeId: string

  reviewerId: string

  reviewerRole: 'admin' | 'expert'

  recommendation?: string

  notes?: string

  createdAt: string

}

export interface DisputeSummary {
  total: number

  open: number

  underReview: number

  escalated: number

  resolved: number

  disputedAmount: number

  frozenAmount: number
}