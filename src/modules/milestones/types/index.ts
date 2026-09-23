// Milestones module — shared domain types
//
// BRD references:
// - Sec. 15.1 Verification, evidence & audit trail
// - Sec. 18.2 Payment / dispute controls
// - Sec. 18.4 Milestone approval rules
// - Sec. 22 Financial controls
// - Sec. 24 Governance & administration
//
// Architecture:
// - This file is the canonical source of truth for milestone-domain types.
// - Milestone services, hooks and UI components should import from here.
// - Cross-cutting types such as User, UserRole and Project remain in src/types.
// - Do not redefine milestone types inside pages or components.

// -----------------------------------------------------------------------------
// Workflow
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// Evidence
// -----------------------------------------------------------------------------

export type MilestoneEvidenceType =
  | 'photo'
  | 'video'
  | 'completion_note'
  | 'material_usage'
  | 'labour_summary'
  | 'receipt'
  | 'professional_signoff'

export type MilestoneEvidenceStatus =
  | 'pending'
  | 'verified'
  | 'needs_information'
  | 'rejected'

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

  /**
   * Verification state of this individual evidence item.
   *
   * Evidence must be verified according to the applicable workflow
   * before it can support milestone payment.
   */
  status: MilestoneEvidenceStatus

  /**
   * Optional reviewer information for evidence-level verification.
   */
  reviewedBy?: string
  reviewedAt?: string
  reviewComment?: string
}

// -----------------------------------------------------------------------------
// Actors
// -----------------------------------------------------------------------------

export type MilestoneActorRole =
  | 'contractor'
  | 'project_manager'
  | 'professional'
  | 'client'
  | 'admin'

// -----------------------------------------------------------------------------
// Review
// -----------------------------------------------------------------------------

export interface MilestoneReview {
  id: string
  milestoneId: string

  reviewerId: string
  reviewerRole: MilestoneActorRole

  decision: MilestoneReviewDecision

  comment?: string

  reviewedAt: string
}

// -----------------------------------------------------------------------------
// Audit
// -----------------------------------------------------------------------------

export type MilestoneAuditAction =
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
  | 'payment_frozen'
  | 'status_changed'

export interface MilestoneAuditEntry {
  id: string
  milestoneId: string

  action: MilestoneAuditAction

  actorId: string
  actorRole: MilestoneActorRole

  previousStatus?: MilestoneStatus
  newStatus?: MilestoneStatus

  comment?: string

  /**
   * Additional structured information attached to the audit event.
   *
   * Examples:
   * - payment amount
   * - evidence ID
   * - dispute reference
   * - review decision
   */
  metadata?: Record<string, unknown>

  createdAt: string
}

// -----------------------------------------------------------------------------
// Creation / update
// -----------------------------------------------------------------------------

export interface CreateMilestoneInput {
  projectId: string

  name: string
  description?: string

  /**
   * Examples from BRD Sec. 18.4:
   *
   * Site clearing
   * Excavation
   * Foundation
   * DPC
   * Block work
   * Columns / beams
   * Roofing
   * MEP
   * Plastering
   * Flooring
   * Painting
   * Fittings
   * External works
   * Final completion / handover
   */
  phase: string

  amount: number

  dueDate?: string

  /**
   * Indicates whether completion requires verification
   * by an architect, engineer or another designated professional.
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

// -----------------------------------------------------------------------------
// Review input
// -----------------------------------------------------------------------------

export interface MilestoneReviewInput {
  decision: MilestoneReviewDecision
  comment?: string
}

// -----------------------------------------------------------------------------
// Evidence input
// -----------------------------------------------------------------------------

export interface MilestoneEvidenceInput {
  type: MilestoneEvidenceType

  title?: string
  description?: string

  url: string
  fileName?: string
  mimeType?: string
  fileSize?: number
}

// -----------------------------------------------------------------------------
// Payment
// -----------------------------------------------------------------------------

export type MilestonePaymentStatus =
  | 'not_ready'
  | 'pending_approval'
  | 'approved'
  | 'frozen'
  | 'released'

export interface MilestonePaymentState {
  status: MilestonePaymentStatus

  /**
   * Payment becomes releasable only after all applicable
   * verification and approval requirements are satisfied.
   */
  eligibleForRelease: boolean

  amount: number

  releasedAt?: string

  /**
   * Populated when payment is frozen because of a dispute,
   * incomplete verification or another control condition.
   */
  frozenReason?: string
}

// -----------------------------------------------------------------------------
// Milestone
// -----------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // Verification
  // ---------------------------------------------------------------------------

  /**
   * Indicates that the designated Project Manager has completed
   * the applicable verification step.
   */
  pmVerified: boolean

  /**
   * Major milestone payments require explicit client approval.
   */
  clientApproved: boolean

  /**
   * True when required professional sign-off has been completed.
   */
  professionalSignedOff: boolean

  // ---------------------------------------------------------------------------
  // Dispute / payment controls
  // ---------------------------------------------------------------------------

  /**
   * Whether the milestone currently has an active payment dispute.
   */
  disputed: boolean

  /**
   * Payment state derived from the authoritative financial workflow.
   *
   * This is preferable to making UI components infer payment readiness
   * from several independent booleans.
   */
  payment: MilestonePaymentState

  /**
   * Legacy/convenience fields retained for straightforward UI access.
   *
   * The backend remains authoritative for actual payment release.
   */
  paymentReleased: boolean
  paymentReleasedAt?: string

  // ---------------------------------------------------------------------------
  // Review state
  // ---------------------------------------------------------------------------

  rejectionReason?: string
  reviewComment?: string

  // ---------------------------------------------------------------------------
  // Audit
  // ---------------------------------------------------------------------------

  /**
   * Complete audit trail of milestone actions.
   *
   * Every material workflow transition, verification decision and
   * financial action should be traceable.
   */
  auditHistory: MilestoneAuditEntry[]

  // ---------------------------------------------------------------------------
  // Timestamps
  // ---------------------------------------------------------------------------

  createdAt: string
  updatedAt: string
}

// -----------------------------------------------------------------------------
// Derived / presentation helpers
// -----------------------------------------------------------------------------

export interface MilestoneEvidenceSummary {
  required: number
  submitted: number
  verified: number
  pending: number
  rejected: number
  complete: boolean
}

export interface MilestoneVerificationSummary {
  pmVerified: boolean
  professionalRequired: boolean
  professionalSignedOff: boolean
  clientApproved: boolean
  evidenceComplete: boolean
  paymentEligible: boolean
}

export interface MilestoneProgressSummary {
  percentage: number
  completed: boolean
  overdue: boolean
  daysRemaining?: number
}