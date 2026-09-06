// Evidence module — domain types
//
// BRD reference:
// - Evidence & verification
// - Milestone approval
// - Monitoring and reporting
// - Procurement delivery verification
// - Dispute evidence
// - Digital Property Passport

export type EvidenceStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'verified'
  | 'needs_information'
  | 'blocked'
  | 'rejected'

export type EvidenceFileType =
  | 'image'
  | 'video'
  | 'document'

export type EvidenceStepStatus =
  | 'complete'
  | 'pending'
  | 'blocked'

export type EvidenceCategory =
  | 'milestone'
  | 'procurement'
  | 'monitoring'
  | 'inspection'
  | 'dispute'
  | 'handover'

/**
 * Individual uploaded evidence file.
 */
export interface EvidenceFile {
  id: string
  name: string
  type: EvidenceFileType
  size: string

  /**
   * Human-readable timestamp for current mock data.
   * This can later become an ISO timestamp from the API.
   */
  uploadedAt: string

  /**
   * Optional URL for real uploaded evidence.
   */
  url?: string

  /**
   * Optional thumbnail URL for image/video previews.
   */
  thumbnailUrl?: string
}

/**
 * Evidence workflow activity.
 */
export interface EvidenceStep {
  id: string
  label: string
  status: EvidenceStepStatus

  /**
   * Who performed this step.
   *
   * Example:
   * "Segun Adeyemi (Contractor)"
   */
  actor?: string

  /**
   * ISO date or human-readable timestamp.
   */
  timestamp?: string

  /**
   * Optional explanation for blocked,
   * rejected or information-request states.
   */
  note?: string
}

/**
 * Evidence verification trail.
 */
export interface EvidenceTrailData {
  percentComplete: number

  steps: EvidenceStep[]

  /**
   * The single next thing that has to happen
   * for this evidence workflow to move forward.
   */
  nextAction?: {
    label: string
    description?: string
  }
}

/**
 * Project reference connected to evidence.
 */
export interface EvidenceProject {
  id: string
  name: string
  location?: string
}

/**
 * Milestone reference connected to evidence.
 */
export interface EvidenceMilestone {
  id: string
  name: string
}

/**
 * Person or organisation that submitted evidence.
 */
export interface EvidenceSubmitter {
  id?: string
  name: string
  role: string
}

/**
 * Reviewer information.
 */
export interface EvidenceReviewer {
  id?: string
  name: string
  role: string
}

/**
 * Main Evidence domain object.
 *
 * Evidence is a first-class Build OS object.
 * It can be attached to milestones, procurement,
 * monitoring reports, inspections, disputes and
 * handover records.
 */
export interface Evidence {
  id: string

  title: string

  description: string

  category: EvidenceCategory

  status: EvidenceStatus

  project: EvidenceProject

  milestone?: EvidenceMilestone

  submittedBy: EvidenceSubmitter

  submittedAt: string

  files: EvidenceFile[]

  trail?: EvidenceTrailData

  reviewer?: EvidenceReviewer

  reviewedAt?: string

  reviewNote?: string

  /**
   * True when an active dispute or compliance issue
   * prevents the evidence from progressing.
   */
  isBlocked?: boolean

  /**
   * Optional trust or verification quality indicator.
   */
  verificationScore?: number
}

/**
 * Data required to submit new evidence.
 */
export interface CreateEvidencePayload {
  title: string

  description?: string

  category: EvidenceCategory

  projectId: string

  milestoneId?: string

  files: File[]
}

/**
 * Reviewer decision.
 */
export type EvidenceReviewDecision =
  | 'verified'
  | 'needs_information'
  | 'rejected'
  | 'blocked'

/**
 * Data submitted during evidence review.
 */
export interface ReviewEvidencePayload {
  decision: EvidenceReviewDecision

  note?: string
}

/**
 * Filters used by the Evidence Library.
 */
export interface EvidenceFilters {
  search?: string

  status?: EvidenceStatus | 'all'

  category?: EvidenceCategory | 'all'

  projectId?: string

  milestoneId?: string
}