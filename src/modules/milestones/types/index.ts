// Milestones module — shared domain types
// BRD references: Sec. 18.4, Sec. 18.2, Sec. 15.1, Sec. 22, Sec. 24
//
// Keep milestone-specific types in this module.
// Cross-cutting types such as User, UserRole, etc. belong in src/types.

export type MilestoneStatus =
  | 'draft'
  | 'pending_evidence'
  | 'submitted'
  | 'under_review'
  | 'needs_evidence'
  | 'verified'
  | 'approved'
  | 'rejected'
  | 'disputed'
  | 'paid'

export type MilestoneReviewDecision =
  | 'approve'
  | 'reject'
  | 'request_evidence'

export type MilestoneEvidenceType =
  | 'photo'
  | 'video'
  | 'completion_note'
  | 'material_usage'
  | 'labour_summary'
  | 'receipt'
  | 'professional_signoff'

export type MilestoneActorRole =
  | 'contractor'
  | 'project_manager'
  | 'professional'
  | 'client'
  | 'admin'

export interface MilestoneEvidence {
  id: string
  milestoneId: string

  type: MilestoneEvidenceType

  title?: string
  description?: string

  url: string
  fileName?: string
  mimeType?: string
  fileSize?: number

  uploadedBy: string
  uploadedByRole: MilestoneActorRole
  uploadedAt: string
}

export interface MilestoneReview {
  id: string
  milestoneId: string

  reviewerId: string
  reviewerRole: MilestoneActorRole

  decision: MilestoneReviewDecision
  comment?: string

  reviewedAt: string
}

export interface MilestoneAuditEntry {
  id: string
  milestoneId: string

  action:
    | 'created'
    | 'updated'
    | 'evidence_submitted'
    | 'review_requested'
    | 'evidence_requested'
    | 'verified'
    | 'approved'
    | 'rejected'
    | 'disputed'
    | 'payment_released'
    | 'status_changed'

  actorId: string
  actorRole: MilestoneActorRole

  previousStatus?: MilestoneStatus
  newStatus?: MilestoneStatus

  comment?: string

  createdAt: string
}

export interface CreateMilestoneInput {
  projectId: string

  name: string
  description?: string

  /**
   * Examples from BRD Sec. 18.4:
   * Site clearing, excavation, foundation, DPC,
   * block work, columns/beams, roofing, MEP,
   * plastering, flooring, painting, fittings,
   * external works, final completion and handover.
   */
  phase: string

  amount: number

  dueDate?: string

  /**
   * Some milestones require an architect,
   * engineer or other professional sign-off.
   */
  requiresProfessionalSignoff?: boolean
}

export interface UpdateMilestoneInput {
  name?: string
  description?: string
  phase?: string
  amount?: number
  dueDate?: string
  requiresProfessionalSignoff?: boolean
}

export interface MilestoneReviewInput {
  decision: MilestoneReviewDecision
  comment?: string
}

export interface MilestoneEvidenceInput {
  type: MilestoneEvidenceType
  title?: string
  description?: string

  url: string
  fileName?: string
  mimeType?: string
  fileSize?: number
}

export interface Milestone {
  id: string
  projectId: string

  name: string
  description?: string
  phase: string

  status: MilestoneStatus

  /**
   * Amount allocated to this milestone.
   */
  amount: number

  dueDate?: string
  startedAt?: string
  completedAt?: string

  contractorId: string

  projectManagerId?: string
  professionalId?: string

  evidence: MilestoneEvidence[]
  reviews: MilestoneReview[]

  /**
   * BRD Sec. 15.1 / 18.2:
   * Contractor evidence alone cannot release payment.
   */
  pmVerified: boolean

  /**
   * Major milestone payments require client approval.
   */
  clientApproved: boolean

  /**
   * True when required professional sign-off
   * has been completed.
   */
  professionalSignedOff: boolean

  /**
   * Whether the milestone has an active payment dispute.
   */
  disputed: boolean

  /**
   * Payment state.
   */
  paymentReleased: boolean
  paymentReleasedAt?: string

  rejectionReason?: string
  reviewComment?: string

  /**
   * Complete audit trail of milestone actions.
   */
  auditHistory: MilestoneAuditEntry[]

  createdAt: string
  updatedAt: string
}