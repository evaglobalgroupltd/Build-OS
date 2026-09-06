// Professionals module — shared domain types
// BRD reference: Sec. 40.7

export type ProfessionalCategory =
  | 'architect'
  | 'engineer'
  | 'surveyor'
  | 'valuation'
  | 'planning'
  | 'approval'
  | 'inspection'
  | 'other'

export type ProfessionalVerificationStatus =
  | 'pending'
  | 'verified'
  | 'suspended'
  | 'rejected'

export type ProfessionalAvailability =
  | 'available'
  | 'limited'
  | 'unavailable'

export type InvitationStatus =
  | 'new'
  | 'reviewing'
  | 'proposal_submitted'
  | 'expired'
  | 'declined'

export type ProposalStatus =
  | 'submitted'
  | 'under_review'
  | 'shortlisted'
  | 'accepted'
  | 'declined'
  | 'withdrawn'

export type DeliverableStatus =
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'revision_requested'
  | 'rejected'

export interface ProfessionalService {
  id: string
  name: string
  description?: string
}

export interface Professional {
  id: string
  userId: string

  name: string
  category: ProfessionalCategory
  specialty?: string

  location?: string
  bio?: string

  yearsExperience?: number

  verificationStatus: ProfessionalVerificationStatus
  verifiedSince?: string

  availability: ProfessionalAvailability

  trustScore?: number
  rating?: number
  reviewCount?: number
  completedProjects?: number

  responseTime?: string

  services: ProfessionalService[]

  createdAt?: string
  updatedAt?: string
}

export interface ProfessionalVerification {
  id: string
  professionalId: string

  identityVerified: boolean
  credentialsVerified: boolean
  practiceVerified: boolean

  status: ProfessionalVerificationStatus

  verifiedAt?: string
  expiresAt?: string

  notes?: string
}

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

  receivedAt: string
  deadline?: string

  clientName?: string
}

export interface Proposal {
  id: string

  invitationId: string
  professionalId: string
  projectId: string

  title: string
  service: string

  description?: string

  proposedFee: number
  currency?: string

  timeline?: string

  deliverables: string[]

  status: ProposalStatus

  submittedAt: string
  validUntil?: string

  clientMessage?: string

  createdAt?: string
  updatedAt?: string
}

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

  revisionNotes?: string

  files?: ProfessionalFile[]
}

export interface ProfessionalFile {
  id: string

  name: string
  url?: string

  mimeType?: string
  size?: number

  uploadedAt?: string
}

export interface ProfessionalReview {
  id: string

  professionalId: string
  projectId?: string

  clientId?: string

  rating: number
  comment?: string

  verified: boolean

  createdAt: string
}

export interface ProfessionalTrustMetrics {
  professionalId: string

  score: number

  verificationCompleteness?: number
  credentialScore?: number
  projectRecordScore?: number
  clientRatingScore?: number
  timelinessScore?: number
  evidenceQualityScore?: number
}