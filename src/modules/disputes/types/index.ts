
// Disputes module — domain types
// BRD reference: Sec. 19
//
// Canonical domain models for:
// - dispute creation and lifecycle
// - evidence management
// - party responses
// - administrative and expert review
// - resolution and closure
// - timeline/audit events
//
// Keep cross-cutting application primitives such as User, Role, Company,
// Project and shared identifiers in the root `src/types` directory.
//
// These types represent the frontend/domain contract and should remain
// independent from transport-specific API/DTO concerns.

/* -------------------------------------------------------------------------- */
/* Core enums / unions                                                        */
/* -------------------------------------------------------------------------- */

/**
 * High-level lifecycle status of a dispute.
 */
export type DisputeStatus =
  | 'open'
  | 'under_review'
  | 'resolved'
  | 'escalated'

/**
 * Detailed workflow stage within the dispute lifecycle.
 *
 * The stage provides more precision than DisputeStatus and is intended
 * for timelines, workflow indicators and administrative transitions.
 */
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

/**
 * Primary classification of the dispute.
 *
 * `string` is intentionally supported on Dispute.category for forward
 * compatibility with backend-managed/custom categories.
 */
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

/**
 * Financial or operational action resulting from a resolution.
 */
export type DisputeResolutionType =
  | 'payment_release'
  | 'payment_refund'
  | 'correction'
  | 'replacement'
  | 'partial_settlement'
  | 'dismissed'
  | 'other'

/**
 * Supported evidence classifications.
 */
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

/**
 * Supported currencies for dispute financial values.
 */
export type DisputeCurrency = 'NGN' | 'USD'

/**
 * Role of the person performing a formal dispute review.
 */
export type DisputeReviewerRole = 'admin' | 'expert'

/* -------------------------------------------------------------------------- */
/* Dispute                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Primary dispute record.
 *
 * This is the canonical representation consumed by dispute pages,
 * dashboards, workflow components and service responses.
 */
export interface Dispute {
  /** Unique dispute identifier. */
  id: string

  /** Project associated with the dispute. */
  projectId: string

  /**
   * Dispute classification.
   *
   * `string` preserves compatibility with future backend-defined
   * categories without requiring a frontend release for every new value.
   */
  category: DisputeCategory | string

  /** Party who raised the dispute. */
  raisedBy: string

  /** Party responding to the dispute. */
  respondent: string

  /** Financial amount affected by the dispute. */
  amount: number

  /** Currency used for the affected amount. */
  currency: DisputeCurrency

  /** High-level lifecycle status. */
  status: DisputeStatus

  /** Current detailed workflow stage. */
  stage: DisputeStage

  /** Human-readable dispute opening date/time. */
  openedDate: string

  /** Optional affected project milestone. */
  affectedMilestoneId?: string

  /** Optional affected payment record. */
  affectedPaymentId?: string

  /** Formal description of the issue. */
  description?: string

  /** Resolution requested by the initiating party. */
  requestedResolution?: string

  /**
   * Indicates whether the affected payment line is currently frozen.
   */
  paymentFrozen: boolean

  /** Number of evidence records attached to the dispute. */
  evidenceCount: number

  /** Number of formal party responses submitted. */
  responseCount: number

  /** Officer currently responsible for administrative handling. */
  assignedOfficerId?: string

  /** Expert assigned when technical review is required. */
  assignedExpertId?: string

  /** Date/time the dispute was resolved. */
  resolvedDate?: string

  /** Date/time the dispute was formally closed. */
  closedDate?: string

  /** Record creation timestamp. */
  createdAt: string

  /** Last modification timestamp. */
  updatedAt: string
}

/* -------------------------------------------------------------------------- */
/* Evidence                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Evidence submitted in support of a dispute.
 *
 * File metadata remains separate from the actual binary asset. This keeps
 * the domain model lightweight and allows storage providers to change
 * without changing UI contracts.
 */
export interface DisputeEvidence {
  /** Unique evidence identifier. */
  id: string

  /** Dispute to which the evidence belongs. */
  disputeId: string

  /** User/party that submitted the evidence. */
  submittedBy: string

  /** Evidence classification. */
  type: EvidenceType

  /** Display name shown in the evidence register. */
  name: string

  /** Optional human-readable description. */
  description?: string

  /** Accessible/storage URL for the uploaded file. */
  fileUrl: string

  /** Original filename supplied by the uploader. */
  fileName: string

  /** MIME type reported for the file. */
  mimeType: string

  /** File size in bytes. */
  fileSize: number

  /** Submission timestamp. */
  submittedAt: string

  /** Whether the evidence has passed verification/review. */
  verified: boolean
}

/* -------------------------------------------------------------------------- */
/* Party response                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Formal response submitted by a dispute participant.
 *
 * Evidence is referenced by ID rather than embedded, allowing evidence
 * records to maintain their own lifecycle and verification state.
 */
export interface DisputeResponse {
  /** Unique response identifier. */
  id: string

  /** Dispute associated with the response. */
  disputeId: string

  /** User who submitted the response. */
  submittedBy: string

  /** Display name of the responding party. */
  partyName: string

  /** Role of the responding party in the dispute. */
  role: string

  /** Formal response statement. */
  message: string

  /** Supporting evidence references. */
  evidenceIds: string[]

  /** Response submission timestamp. */
  submittedAt: string
}

/* -------------------------------------------------------------------------- */
/* Resolution                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Final or proposed resolution attached to a dispute.
 */
export interface DisputeResolution {
  /** Unique resolution identifier. */
  id: string

  /** Dispute being resolved. */
  disputeId: string

  /** User/officer who issued the resolution. */
  resolvedBy: string

  /** Financial or operational resolution action. */
  resolutionType: DisputeResolutionType

  /** Human-readable outcome. */
  outcome: string

  /** Optional amount affected by the resolution. */
  amount?: number

  /** Currency for the optional resolution amount. */
  currency?: DisputeCurrency

  /** Additional administrative resolution notes. */
  notes?: string

  /** Resolution timestamp. */
  resolvedAt: string
}

/* -------------------------------------------------------------------------- */
/* Timeline / workflow event                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Immutable-style event representing a meaningful dispute workflow action.
 *
 * This structure can also serve as the frontend representation of the
 * dispute audit timeline.
 */
export interface DisputeTimelineEvent {
  /** Unique timeline event identifier. */
  id: string

  /** Dispute associated with the event. */
  disputeId: string

  /** Workflow stage represented by the event. */
  stage: DisputeStage

  /** Short event title. */
  title: string

  /** Optional event description. */
  description?: string

  /** User/system actor responsible for the event. */
  actor: string

  /** Event creation timestamp. */
  createdAt: string
}

/* -------------------------------------------------------------------------- */
/* Review                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Administrative or technical review record.
 *
 * A dispute may pass through an administrative review, an expert review,
 * or both depending on the workflow and complexity of the case.
 */
export interface DisputeReview {
  /** Dispute being reviewed. */
  disputeId: string

  /** Reviewer user identifier. */
  reviewerId: string

  /** Type of reviewer. */
  reviewerRole: DisputeReviewerRole

  /** Optional formal recommendation. */
  recommendation?: string

  /** Optional review notes. */
  notes?: string

  /** Review creation timestamp. */
  createdAt: string
}

/* -------------------------------------------------------------------------- */
/* Aggregate summary                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Lightweight aggregate used by dispute dashboards and command centres.
 *
 * Financial values should be interpreted using the currency context
 * supplied by the relevant project/account aggregation.
 */
export interface DisputeSummary {
  /** Total disputes represented by the aggregation. */
  total: number

  /** Currently open disputes. */
  open: number

  /** Disputes currently under review. */
  underReview: number

  /** Disputes escalated for additional handling. */
  escalated: number

  /** Resolved disputes. */
  resolved: number

  /** Total value currently disputed. */
  disputedAmount: number

  /** Total value currently frozen. */
  frozenAmount: number
}

/* -------------------------------------------------------------------------- */
/* Domain constants                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Ordered workflow stages.
 *
 * Useful for progress indicators, timelines and stage navigation without
 * duplicating the lifecycle order throughout the UI.
 */
export const disputeStages: readonly DisputeStage[] = [
  'dispute_opened',
  'evidence_submitted',
  'payment_frozen',
  'party_response',
  'admin_review',
  'expert_review',
  'recommendation',
  'resolution',
  'closure',
] as const

/**
 * Supported dispute categories.
 *
 * Kept as a runtime constant so forms and filters can consume the same
 * source of truth as the TypeScript union.
 */
export const disputeCategories: readonly DisputeCategory[] = [
  'quality',
  'payment',
  'delay',
  'scope',
  'materials',
  'delivery',
  'contract',
  'professional_service',
  'abandonment',
  'unauthorized_variation',
  'other',
] as const

/**
 * Supported resolution actions.
 */
export const disputeResolutionTypes: readonly DisputeResolutionType[] = [
  'payment_release',
  'payment_refund',
  'correction',
  'replacement',
  'partial_settlement',
  'dismissed',
  'other',
] as const

/**
 * Supported evidence types.
 */
export const evidenceTypes: readonly EvidenceType[] = [
  'document',
  'image',
  'video',
  'report',
  'invoice',
  'contract',
  'inspection',
  'communication',
  'other',
] as const
