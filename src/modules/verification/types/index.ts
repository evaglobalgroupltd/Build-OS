// Verification module — shared domain types
//
// BRD references:
// - Sec. 15.2 — Verification Status Lifecycle
// - Sec. 15.3 — Verification Documents
// - Sec. 22 — User Management & Identity
//
// Keep verification-specific types in this module.
// Cross-cutting types such as User and UserRole should remain in
// the root `src/types` directory.
//
// Lifecycle:
//
// draft
//   → submitted
//   → need_more_information
//   → verified
//   → suspended
//   → rejected
//
// A rejected application may be resubmitted according to the
// backend verification policy.

/* -------------------------------------------------------------------------- */
/* Verification lifecycle                                                     */
/* -------------------------------------------------------------------------- */

export type VerificationStatus =
  | 'draft'
  | 'submitted'
  | 'need_more_information'
  | 'verified'
  | 'suspended'
  | 'rejected'

/**
 * Terminal verification states.
 *
 * Kept as a separate type so UI and business logic can reason about
 * lifecycle states without duplicating string literals.
 */
export type VerificationTerminalStatus =
  | 'verified'
  | 'suspended'
  | 'rejected'

/* -------------------------------------------------------------------------- */
/* Verification documents                                                     */
/* -------------------------------------------------------------------------- */

export type VerificationDocumentStatus =
  | 'pending'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'expired'

export type VerificationDocumentType =
  | 'government_id'
  | 'nin'
  | 'bvn'
  | 'cac_certificate'
  | 'tin'
  | 'professional_licence'
  | 'bank_verification'
  | 'insurance'
  | 'portfolio'
  | 'reference'
  | 'proof_of_address'
  | 'proof_of_funds'
  | 'ownership_document'
  | 'other'

/* -------------------------------------------------------------------------- */
/* Review / administrative actions                                            */
/* -------------------------------------------------------------------------- */

export type VerificationReviewAction =
  | 'submitted'
  | 'approved'
  | 'rejected'
  | 'request_information'
  | 'suspended'
  | 'resubmitted'

/* -------------------------------------------------------------------------- */
/* Verification document                                                      */
/* -------------------------------------------------------------------------- */

export interface VerificationDocument {
  id: string
  verificationId: string

  /**
   * Canonical document category used by the verification framework.
   */
  type: VerificationDocumentType

  /**
   * Human-readable document name.
   */
  name: string

  /**
   * Original uploaded file name.
   */
  fileName: string

  /**
   * Secure document URL when available.
   */
  fileUrl?: string

  mimeType?: string
  size?: number

  status: VerificationDocumentStatus

  /**
   * Populated when the document is rejected or requires clarification.
   */
  rejectionReason?: string

  /**
   * Latest administrative note associated with the document.
   */
  adminComment?: string

  uploadedAt: string
  reviewedAt?: string
  expiresAt?: string
}

/* -------------------------------------------------------------------------- */
/* Verification review                                                       */
/* -------------------------------------------------------------------------- */

export interface VerificationReview {
  id: string
  verificationId: string

  /**
   * Administrative or lifecycle event represented by this review record.
   */
  action: VerificationReviewAction

  /**
   * General reviewer feedback.
   */
  comment?: string

  /**
   * Structured reason where applicable, particularly for rejection
   * or suspension.
   */
  reason?: string

  /**
   * Reviewer identity.
   *
   * Keep reviewer identity lightweight here. The canonical User model
   * remains in the root types module.
   */
  reviewerId?: string
  reviewerName?: string

  createdAt: string
}

/* -------------------------------------------------------------------------- */
/* Verification record                                                        */
/* -------------------------------------------------------------------------- */

export interface Verification {
  id: string
  userId: string

  /**
   * User role being verified.
   *
   * Keep the canonical UserRole type in the root `src/types` module
   * when it is available. This prevents circular ownership of
   * cross-cutting domain types.
   */
  role: string

  status: VerificationStatus

  /**
   * Verification completion percentage.
   *
   * Expected range:
   * 0–100
   */
  completionPercentage: number

  /**
   * All documents currently attached to this verification record.
   */
  documents: VerificationDocument[]

  /**
   * Document types or information still required before the
   * verification can progress.
   */
  missingDocuments: VerificationDocumentType[]

  /**
   * Latest administrative feedback visible to the applicant.
   */
  adminComment?: string

  /**
   * Primary reason associated with a rejected verification.
   */
  rejectionReason?: string

  /**
   * Build OS trust-framework score.
   *
   * Expected range when present:
   * 0–100
   */
  trustScore?: number

  submittedAt?: string
  verifiedAt?: string
  suspendedAt?: string
  rejectedAt?: string

  createdAt: string
  updatedAt: string
}

/* -------------------------------------------------------------------------- */
/* Verification creation                                                      */
/* -------------------------------------------------------------------------- */

export interface CreateVerificationPayload {
  /**
   * Role under which the applicant is being verified.
   */
  role: string

  /**
   * Applicant's country of registration/residence where applicable.
   */
  country?: string
}

/* -------------------------------------------------------------------------- */
/* Verification profile updates                                               */
/* -------------------------------------------------------------------------- */

export interface UpdateVerificationPayload {
  fullName?: string
  phone?: string
  email?: string
  address?: string
  country?: string

  businessName?: string
  registrationNumber?: string
  taxIdentificationNumber?: string
}

/* -------------------------------------------------------------------------- */
/* Document upload                                                            */
/* -------------------------------------------------------------------------- */

export interface UploadVerificationDocumentPayload {
  file: File
  documentType: VerificationDocumentType
}

/* -------------------------------------------------------------------------- */
/* Administrative review requests                                             */
/* -------------------------------------------------------------------------- */

export interface VerificationInformationRequest {
  /**
   * Explanation shown to the applicant describing what is required.
   */
  comment: string

  /**
   * Optional document categories that must be supplied or corrected.
   */
  documentTypes?: VerificationDocumentType[]
}

export interface VerificationRejectionRequest {
  reason: string
  comment?: string
}

export interface VerificationSuspensionRequest {
  reason: string
}

/* -------------------------------------------------------------------------- */
/* Verification queue                                                        */
/* -------------------------------------------------------------------------- */

export interface VerificationQueueFilters {
  status?: VerificationStatus
  role?: string
  search?: string

  /**
   * 1-based page number.
   */
  page?: number

  /**
   * Number of records requested per page.
   */
  limit?: number
}

export interface VerificationQueueSummary {
  total: number

  draft: number
  submitted: number
  needMoreInformation: number

  verified: number
  suspended: number
  rejected: number
}

/* -------------------------------------------------------------------------- */
/* Domain helpers                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Statuses that represent a verification which has completed
 * the ordinary applicant submission journey.
 */
export const VERIFICATION_TERMINAL_STATUSES: readonly VerificationTerminalStatus[] =
  [
    'verified',
    'suspended',
    'rejected',
  ] as const

/**
 * Statuses where the applicant can potentially make changes or
 * provide additional information.
 *
 * The backend remains authoritative over what is actually editable.
 */
export const VERIFICATION_EDITABLE_STATUSES: readonly VerificationStatus[] =
  [
    'draft',
    'need_more_information',
    'rejected',
  ] as const

/**
 * Ordered lifecycle used by progress indicators and status timelines.
 *
 * This is presentation-safe metadata; it does not replace backend
 * authorization or transition validation.
 */
export const VERIFICATION_LIFECYCLE: readonly VerificationStatus[] =
  [
    'draft',
    'submitted',
    'need_more_information',
    'verified',
  ] as const