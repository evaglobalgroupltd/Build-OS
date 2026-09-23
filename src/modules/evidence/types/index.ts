// Evidence module — domain types
//
// BRD reference:
// - Evidence & verification
// - Milestone approval
// - Monitoring and reporting
// - Procurement delivery verification
// - Dispute evidence
// - Digital Property Passport
//
// Design principle:
// Evidence is a first-class, auditable Build OS object.
// It records:
//   1. what was submitted,
//   2. what the submission is attached to,
//   3. who submitted it,
//   4. what verification state it is in,
//   5. what reviewers decided,
//   6. and what workflow action comes next.
//
// Important:
// Evidence verification does NOT automatically authorize payment release.
// Payment release remains governed by the Escrow / Payment Approval domain.

/* -------------------------------------------------------------------------- */
/* Statuses                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Lifecycle state of an evidence package.
 *
 * `draft`
 *   Evidence is being prepared and has not entered review.
 *
 * `submitted`
 *   Evidence has been submitted and is awaiting review.
 *
 * `under_review`
 *   A reviewer is actively assessing the evidence.
 *
 * `verified`
 *   Evidence has passed the applicable verification process.
 *
 * `needs_information`
 *   Additional evidence, clarification, or documentation is required.
 *
 * `blocked`
 *   A dispute, compliance issue, or other control prevents progression.
 *
 * `rejected`
 *   The submission has been formally rejected.
 */
export type EvidenceStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'verified'
  | 'needs_information'
  | 'blocked'
  | 'rejected'

/**
 * Supported evidence file formats at the domain level.
 *
 * The actual MIME type belongs to the upload/infrastructure layer.
 */
export type EvidenceFileType =
  | 'image'
  | 'video'
  | 'document'

/**
 * Status of an individual step in the verification trail.
 */
export type EvidenceStepStatus =
  | 'complete'
  | 'pending'
  | 'blocked'

/**
 * Business context in which evidence is being used.
 */
export type EvidenceCategory =
  | 'milestone'
  | 'procurement'
  | 'monitoring'
  | 'inspection'
  | 'dispute'
  | 'handover'

/**
 * Reviewer decision applied to an evidence submission.
 *
 * This is intentionally separate from EvidenceStatus because
 * a decision represents an action taken by a reviewer, while
 * status represents the resulting lifecycle state.
 */
export type EvidenceReviewDecision =
  | 'verified'
  | 'needs_information'
  | 'rejected'
  | 'blocked'

/* -------------------------------------------------------------------------- */
/* File                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Individual uploaded evidence file.
 *
 * This is domain-level metadata. Upload transport details,
 * storage provider identifiers, and signed URLs should remain
 * in the infrastructure/API layer where possible.
 */
export interface EvidenceFile {
  id: string

  /**
   * Original or display filename.
   */
  name: string

  type: EvidenceFileType

  /**
   * Human-readable file size.
   *
   * Example: "4.8 MB"
   */
  size: string

  /**
   * Timestamp representing when the file was uploaded.
   *
   * Mock data may use a human-readable value.
   * Production APIs should normally return an ISO timestamp.
   */
  uploadedAt: string

  /**
   * URL to the original file when available.
   */
  url?: string

  /**
   * Lightweight preview URL for images/videos.
   */
  thumbnailUrl?: string
}

/* -------------------------------------------------------------------------- */
/* Workflow                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Individual activity within the evidence verification workflow.
 *
 * EvidenceTrail uses these steps to communicate not only
 * the current state, but how the record arrived there.
 */
export interface EvidenceStep {
  id: string

  /**
   * Human-readable workflow step.
   *
   * Example:
   * "Submitted"
   * "Project Manager Review"
   * "Independent Verification"
   */
  label: string

  status: EvidenceStepStatus

  /**
   * Person or organisation responsible for this step.
   *
   * Example:
   * "Segun Adeyemi (Contractor)"
   */
  actor?: string

  /**
   * ISO timestamp or presentation-ready timestamp.
   */
  timestamp?: string

  /**
   * Context explaining a blocked,
   * rejected, or information-request state.
   */
  note?: string
}

/**
 * Verification and workflow history attached to an evidence record.
 */
export interface EvidenceTrailData {
  /**
   * Workflow completion percentage.
   *
   * This represents verification/workflow progress,
   * not necessarily the percentage completion of the
   * underlying construction milestone.
   */
  percentComplete: number

  steps: EvidenceStep[]

  /**
   * The single next action required for the workflow
   * to progress.
   */
  nextAction?: {
    label: string
    description?: string
  }
}

/* -------------------------------------------------------------------------- */
/* References                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Project reference connected to the evidence.
 */
export interface EvidenceProject {
  id: string
  name: string
  location?: string
}

/**
 * Optional milestone reference connected to the evidence.
 */
export interface EvidenceMilestone {
  id: string
  name: string
}

/**
 * Person or organisation that submitted the evidence.
 */
export interface EvidenceSubmitter {
  id?: string
  name: string
  role: string
}

/**
 * Person responsible for reviewing the evidence.
 */
export interface EvidenceReviewer {
  id?: string
  name: string
  role: string
}

/* -------------------------------------------------------------------------- */
/* Review                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Immutable record of a review decision.
 *
 * Keeping review information together makes the audit trail
 * easier to extend later without repeatedly modifying the
 * top-level Evidence interface.
 */
export interface EvidenceReview {
  decision: EvidenceReviewDecision

  reviewer: EvidenceReviewer

  reviewedAt: string

  note?: string
}

/* -------------------------------------------------------------------------- */
/* Evidence                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Main Evidence domain object.
 *
 * Evidence is a first-class Build OS object and may support:
 *
 * - milestone approval
 * - payment verification
 * - procurement delivery
 * - site monitoring
 * - inspections
 * - disputes
 * - handover
 * - Digital Property Passport records
 *
 * IMPORTANT:
 * `verified` means the evidence package has passed its applicable
 * verification workflow. It does not itself authorize escrow release.
 */
export interface Evidence {
  id: string

  title: string

  description: string

  category: EvidenceCategory

  status: EvidenceStatus

  /**
   * Project to which this evidence belongs.
   */
  project: EvidenceProject

  /**
   * Milestone associated with the evidence, when applicable.
   */
  milestone?: EvidenceMilestone

  /**
   * Party responsible for submitting the evidence.
   */
  submittedBy: EvidenceSubmitter

  /**
   * Submission timestamp.
   *
   * Production APIs should normally provide this as ISO 8601.
   */
  submittedAt: string

  /**
   * Files forming the evidence package.
   */
  files: EvidenceFile[]

  /**
   * Human-readable verification workflow.
   */
  trail?: EvidenceTrailData

  /**
   * Latest reviewer.
   *
   * Kept at the top level for convenient UI access.
   */
  reviewer?: EvidenceReviewer

  /**
   * Latest review timestamp.
   */
  reviewedAt?: string

  /**
   * Latest reviewer note.
   */
  reviewNote?: string

  /**
   * Structured representation of the latest review decision.
   *
   * This can coexist with the convenience fields above while
   * the API evolves toward a more explicit audit model.
   */
  review?: EvidenceReview

  /**
   * Indicates that an active dispute, compliance issue,
   * or other control currently prevents progression.
   */
  isBlocked?: boolean

  /**
   * Optional quality / verification indicator.
   *
   * Expected range when supplied: 0–100.
   *
   * This is a quality indicator, not a payment authorization
   * or trust-score replacement.
   */
  verificationScore?: number
}

/* -------------------------------------------------------------------------- */
/* Creation                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Data required to submit new evidence.
 *
 * `files` intentionally remains browser-native here because this
 * payload represents the UI/application boundary. The API service
 * may transform it into multipart/form-data or another transport
 * representation.
 */
export interface CreateEvidencePayload {
  title: string

  description?: string

  category: EvidenceCategory

  projectId: string

  milestoneId?: string

  files: File[]
}

/* -------------------------------------------------------------------------- */
/* Review                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Data submitted when a reviewer evaluates evidence.
 */
export interface ReviewEvidencePayload {
  decision: EvidenceReviewDecision

  note?: string
}

/* -------------------------------------------------------------------------- */
/* Filtering                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Filters supported by the Evidence Library.
 *
 * `all` is a UI convenience value and should normally be
 * normalized away before reaching the API.
 */
export interface EvidenceFilters {
  search?: string

  status?: EvidenceStatus | 'all'

  category?: EvidenceCategory | 'all'

  projectId?: string

  milestoneId?: string
}