// Contractors module — domain types
// BRD references: Sec. 14.2 / 15.3 / 15.4 / 17.2 / 23 / 24
//
// Keep contractor-specific types in this module.
// Cross-cutting types such as User, UserRole, Currency, etc.
// should remain in the root `src/types`.

export type ContractorVerificationStatus =
  | 'draft'
  | 'submitted'
  | 'needs_information'
  | 'verified'
  | 'suspended'
  | 'rejected'

export type ContractorAvailability =
  | 'available'
  | 'limited'
  | 'unavailable'

export type ContractorProjectStatus =
  | 'completed'
  | 'in_progress'
  | 'cancelled'
  | 'disputed'

export type ContractorDocumentStatus =
  | 'pending'
  | 'submitted'
  | 'verified'
  | 'needs_information'
  | 'rejected'
  | 'expired'

export type ContractorDocumentType =
  | 'cac_certificate'
  | 'tin'
  | 'company_profile'
  | 'professional_licence'
  | 'directors_ownership'
  | 'bank_verification'
  | 'portfolio'
  | 'insurance'
  | 'reference'

export type ContractorSpecialty =
  | 'residential_construction'
  | 'commercial_construction'
  | 'civil_works'
  | 'structural_works'
  | 'renovation'
  | 'interior_fit_out'
  | 'site_development'
  | 'project_management'
  | 'general_building'
  | 'specialist_construction'

export type ContractorSortOption =
  | 'trust_score'
  | 'rating'
  | 'completed_projects'
  | 'on_time_delivery'
  | 'experience'
  | 'newest'

export interface Contractor {
  id: string

  companyName: string
  registrationNumber?: string

  description?: string

  category: string
  specialties: ContractorSpecialty[]

  country: string
  state?: string
  city?: string
  address?: string

  email?: string
  phone?: string
  website?: string

  logoUrl?: string
  coverImageUrl?: string

  verificationStatus: ContractorVerificationStatus

  verified: boolean
  verifiedAt?: string

  availability: ContractorAvailability

  trustScore: number
  rating: number
  reviewCount: number

  completedProjects: number
  activeProjects: number
  disputedProjects: number

  onTimeDelivery: number
  qualityScore: number
  clientSatisfaction: number
  complianceScore: number

  yearsExperience: number
  teamSize?: string

  createdAt: string
  updatedAt: string
}

export interface ContractorProfile extends Contractor {
  directors?: ContractorDirector[]

  certifications: ContractorCertification[]

  professionalLicences: ContractorLicence[]

  serviceAreas: string[]

  portfolioCount: number

  referenceCount: number

  insurance?: ContractorInsurance

  bankVerification?: ContractorBankVerification
}

export interface ContractorDirector {
  id: string
  name: string
  role: string
  ownershipPercentage?: number
  verified: boolean
}

export interface ContractorCertification {
  id: string
  name: string
  issuingBody?: string
  certificateNumber?: string
  issuedAt?: string
  expiresAt?: string
  status: ContractorDocumentStatus
  documentUrl?: string
}

export interface ContractorLicence {
  id: string
  name: string
  issuingBody?: string
  licenceNumber?: string
  issuedAt?: string
  expiresAt?: string
  status: ContractorDocumentStatus
  documentUrl?: string
}

export interface ContractorInsurance {
  provider?: string
  policyNumber?: string
  coverageAmount?: number
  currency?: 'NGN' | 'USD'
  issuedAt?: string
  expiresAt?: string
  status: ContractorDocumentStatus
  documentUrl?: string
}

export interface ContractorBankVerification {
  bankName?: string
  accountName?: string
  accountNumberMasked?: string
  verified: boolean
  verifiedAt?: string
}

export interface ContractorPortfolioItem {
  id: string

  contractorId: string

  name: string
  description?: string

  projectType: ContractorSpecialty | string

  location?: string

  contractValue?: number
  currency: 'NGN' | 'USD'

  startDate?: string
  completionDate?: string

  status: ContractorProjectStatus

  clientName?: string

  rating?: number

  images: string[]
  videos?: string[]

  completionCertificateUrl?: string

  verified: boolean

  createdAt: string
  updatedAt: string
}

export interface ContractorVerification {
  contractorId: string

  status: ContractorVerificationStatus

  progress: number

  submittedAt?: string
  verifiedAt?: string

  adminComment?: string

  documents: ContractorVerificationDocument[]

  checks: ContractorVerificationCheck[]

  canTransact: boolean
  canBid: boolean
  canReceivePayments: boolean
}

export interface ContractorVerificationDocument {
  id: string

  type: ContractorDocumentType

  name: string
  description?: string

  status: ContractorDocumentStatus

  required: boolean

  documentUrl?: string

  submittedAt?: string
  reviewedAt?: string
  expiresAt?: string

  adminComment?: string
}

export interface ContractorVerificationCheck {
  id: string

  name: string
  description?: string

  status: 'pending' | 'in_review' | 'passed' | 'failed'

  reviewedAt?: string
  comment?: string
}

export interface ContractorTrustScore {
  contractorId: string

  score: number

  projectCompletion: number
  onTimePerformance: number
  qualityPerformance: number
  clientSatisfaction: number
  compliance: number

  disputeImpact?: number

  calculatedAt: string
}

export interface ContractorReview {
  id: string

  contractorId: string
  projectId: string

  clientName?: string

  rating: number

  title?: string
  comment?: string

  verified: boolean

  createdAt: string
}

export interface ContractorReference {
  id: string

  contractorId: string

  name: string
  organization?: string

  relationship?: string

  contact?: string

  description?: string

  verified: boolean
}

export interface ContractorFilters {
  search?: string

  specialty?: ContractorSpecialty

  location?: string

  city?: string
  state?: string

  verificationStatus?: ContractorVerificationStatus

  verifiedOnly?: boolean

  availability?: ContractorAvailability

  minimumTrustScore?: number

  minimumRating?: number

  minimumExperience?: number

  minimumCompletedProjects?: number

  sort?: ContractorSortOption

  page?: number
  limit?: number
}

export interface ContractorListResponse {
  items: Contractor[]

  total: number
  page: number
  limit: number

  hasNextPage: boolean
}

export interface ContractorInvitation {
  id: string

  contractorId: string
  projectId: string

  status:
    | 'pending'
    | 'accepted'
    | 'declined'
    | 'expired'

  message?: string

  sentAt: string
  respondedAt?: string
}

export interface ContractorDocumentUpload {
  contractorId: string

  type: ContractorDocumentType

  file: File
}