// Verification module — shared types
// BRD references: Sec. 15.2, 15.3, 22
//
// Keep verification-specific types in this module.
// Cross-cutting types such as User and UserRole should remain in
// the root `src/types`.

export type VerificationStatus =
  | 'draft'
  | 'submitted'
  | 'need_more_information'
  | 'verified'
  | 'suspended'
  | 'rejected'

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

export type VerificationReviewAction =
  | 'submitted'
  | 'approved'
  | 'rejected'
  | 'request_information'
  | 'suspended'
  | 'resubmitted'

export interface VerificationDocument {
  id: string
  verificationId: string

  type: VerificationDocumentType
  name: string
  fileName: string
  fileUrl?: string

  mimeType?: string
  size?: number

  status: VerificationDocumentStatus

  rejectionReason?: string
  adminComment?: string

  uploadedAt: string
  reviewedAt?: string
  expiresAt?: string
}

export interface VerificationReview {
  id: string
  verificationId: string

  action: VerificationReviewAction

  comment?: string
  reason?: string

  reviewerId?: string
  reviewerName?: string

  createdAt: string
}

export interface Verification {
  id: string
  userId: string

  /**
   * User role being verified.
   * Keep the canonical UserRole type in the root src/types when available.
   */
  role: string

  status: VerificationStatus

  /**
   * Verification completion percentage.
   * Example: 75 means 75% of required verification information
   * has been completed.
   */
  completionPercentage: number

  documents: VerificationDocument[]

  /**
   * Documents or information still required before submission
   * or approval.
   */
  missingDocuments: VerificationDocumentType[]

  /**
   * Latest administrative feedback.
   */
  adminComment?: string

  rejectionReason?: string

  /**
   * Trust score generated from the Build OS trust framework.
   */
  trustScore?: number

  submittedAt?: string
  verifiedAt?: string
  suspendedAt?: string
  rejectedAt?: string

  createdAt: string
  updatedAt: string
}

export interface CreateVerificationPayload {
  role: string
  country?: string
}

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

export interface UploadVerificationDocumentPayload {
  file: File
  documentType: VerificationDocumentType
}

export interface VerificationInformationRequest {
  comment: string
  documentTypes?: VerificationDocumentType[]
}

export interface VerificationRejectionRequest {
  reason: string
  comment?: string
}

export interface VerificationSuspensionRequest {
  reason: string
}

export interface VerificationQueueFilters {
  status?: VerificationStatus
  role?: string
  search?: string
  page?: number
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