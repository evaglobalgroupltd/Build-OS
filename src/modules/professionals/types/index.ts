// Professionals module — shared domain types
//
// BRD reference:
// - Sec. 40.7 — Professional Services / Professional Network
//
// Architecture:
// - This file is the canonical domain model for Professionals.
// - API services, hooks, pages, and components should import these types.
// - Do not duplicate Professional / Proposal / Invitation / Deliverable
//   types inside UI components or API modules.

 /* -------------------------------------------------------------------------- */
/* Professional taxonomy                                                     */
/* -------------------------------------------------------------------------- */

export type ProfessionalCategory =
  | 'architect'
  | 'engineer'
  | 'surveyor'
  | 'valuation'
  | 'planning'
  | 'approval'
  | 'inspection'
  | 'other'

/* -------------------------------------------------------------------------- */
/* Professional lifecycle                                                     */
/* -------------------------------------------------------------------------- */

export type ProfessionalVerificationStatus =
  | 'pending'
  | 'verified'
  | 'suspended'
  | 'rejected'

export type ProfessionalAvailability =
  | 'available'
  | 'limited'
  | 'unavailable'

/* -------------------------------------------------------------------------- */
/* Invitation lifecycle                                                       */
/* -------------------------------------------------------------------------- */

export type InvitationStatus =
  | 'new'
  | 'reviewing'
  | 'proposal_submitted'
  | 'expired'
  | 'declined'

/* -------------------------------------------------------------------------- */
/* Proposal lifecycle                                                         */
/* -------------------------------------------------------------------------- */

export type ProposalStatus =
  | 'submitted'
  | 'under_review'
  | 'shortlisted'
  | 'accepted'
  | 'declined'
  | 'withdrawn'

/* -------------------------------------------------------------------------- */
/* Deliverable lifecycle                                                      */
/* -------------------------------------------------------------------------- */

export type DeliverableStatus =
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'revision_requested'
  | 'rejected'

/* -------------------------------------------------------------------------- */
/* Professional services                                                      */
/* -------------------------------------------------------------------------- */

export interface ProfessionalService {
  id: string
  name: string
  description?: string
}

/* -------------------------------------------------------------------------- */
/* Professional profile                                                       */
/* -------------------------------------------------------------------------- */

export interface Professional {
  id: string
  userId: string

  /** Public-facing professional or practice name. */
  name: string

  category: ProfessionalCategory
  specialty?: string

  location?: string
  bio?: string

  /** Number of years of professional experience. */
  yearsExperience?: number

  verificationStatus: ProfessionalVerificationStatus
  verifiedSince?: string

  availability: ProfessionalAvailability

  /** Platform-calculated trust score, typically represented as 0–100. */
  trustScore?: number

  /** Aggregate client rating, typically represented as 0–5. */
  rating?: number

  reviewCount?: number
  completedProjects?: number

  /** Human-readable response-time indicator, e.g. "< 24 hours". */
  responseTime?: string

  services: ProfessionalService[]

  createdAt?: string
  updatedAt?: string
}

/* -------------------------------------------------------------------------- */
/* Professional verification                                                  */
/* -------------------------------------------------------------------------- */

export interface ProfessionalVerification {
  id: string
  professionalId: string

  /** Identity / KYC verification state. */
  identityVerified: boolean

  /** Professional credentials and qualifications. */
  credentialsVerified: boolean

  /** Practice, firm, licence, or operating entity verification. */
  practiceVerified: boolean

  status: ProfessionalVerificationStatus

  verifiedAt?: string
  expiresAt?: string

  /** Internal verification notes. */
  notes?: string
}

/* -------------------------------------------------------------------------- */
/* Service invitations                                                        */
/* -------------------------------------------------------------------------- */

export interface ServiceInvitation {
  id: string

  professionalId: string
  projectId: string

  title: string
  projectName: string
  service: string
  category: ProfessionalCategory

  location?: string
  description?: string

  requirements: string[]

  budgetMin?: number
  budgetMax?: number
  currency?: string

  duration?: string

  status: InvitationStatus

  /** Timestamp at which the invitation was received. */
  receivedAt: string

  /** Proposal response deadline. */
  deadline?: string

  clientName?: string
}

/* -------------------------------------------------------------------------- */
/* Proposals                                                                  */
/* -------------------------------------------------------------------------- */

export interface Proposal {
  id: string

  invitationId: string
  professionalId: string
  projectId: string

  title: string
  service: string

  description?: string

  /** Professional's proposed commercial fee. */
  proposedFee: number
  currency?: string

  timeline?: string

  /** Scope / outputs committed by the professional. */
  deliverables: string[]

  status: ProposalStatus

  submittedAt: string
  validUntil?: string

  /** Optional message presented to the client with the proposal. */
  clientMessage?: string

  createdAt?: string
  updatedAt?: string
}

/* -------------------------------------------------------------------------- */
/* Deliverables                                                               */
/* -------------------------------------------------------------------------- */

export interface Deliverable {
  id: string

  professionalId: string
  projectId: string
  proposalId?: string

  title: string
  description?: string

  status: DeliverableStatus

  submittedAt?: string
  reviewedAt?: string
  approvedAt?: string

  /** Feedback provided when revisions are required. */
  revisionNotes?: string

  files?: ProfessionalFile[]
}

/* -------------------------------------------------------------------------- */
/* Professional files                                                         */
/* -------------------------------------------------------------------------- */

export interface ProfessionalFile {
  id: string

  name: string
  url?: string

  mimeType?: string
  size?: number

  uploadedAt?: string
}

/* -------------------------------------------------------------------------- */
/* Professional reviews                                                       */
/* -------------------------------------------------------------------------- */

export interface ProfessionalReview {
  id: string

  professionalId: string
  projectId?: string
  clientId?: string

  /** Client rating, normally represented as 1–5. */
  rating: number

  comment?: string

  /** Indicates whether the review is associated with a verified engagement. */
  verified: boolean

  createdAt: string
}

/* -------------------------------------------------------------------------- */
/* Professional trust metrics                                                 */
/* -------------------------------------------------------------------------- */

export interface ProfessionalTrustMetrics {
  professionalId: string

  /** Overall platform trust score, represented as 0–100. */
  score: number

  /** Percentage / score representing verification completeness. */
  verificationCompleteness?: number

  credentialScore?: number
  projectRecordScore?: number
  clientRatingScore?: number
  timelinessScore?: number
  evidenceQualityScore?: number
}