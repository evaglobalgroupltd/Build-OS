// Documents module — shared domain types
// BRD reference: Sec. 20.1
//
// Keep Documents-specific types in this module.
// Cross-cutting types such as User, UserRole, Project, etc.
// should remain in the root src/types directory.

export type DocumentStatus =
  | 'draft'
  | 'submitted'
  | 'verified'
  | 'needs_information'
  | 'rejected'
  | 'suspended'
  | 'archived'

export type DocumentCategory =
  | 'land_ownership'
  | 'contracts'
  | 'design'
  | 'approvals'
  | 'procurement'
  | 'inspection'
  | 'reports'
  | 'payments'
  | 'insurance'
  | 'warranties'
  | 'handover'
  | 'compliance'
  | 'other'

export type DocumentAccessLevel =
  | 'private'
  | 'project_participants'
  | 'admin_only'

export type DocumentHistoryEventType =
  | 'uploaded'
  | 'updated'
  | 'viewed'
  | 'downloaded'
  | 'version_created'
  | 'access_changed'
  | 'verification_submitted'
  | 'verified'
  | 'information_requested'
  | 'rejected'
  | 'archived'
  | 'restored'

export type DocumentVerificationStatus =
  | 'pending'
  | 'verified'
  | 'needs_information'
  | 'rejected'

export interface Document {
  id: string
  projectId: string

  name: string
  description?: string

  category: DocumentCategory
  status: DocumentStatus
  accessLevel: DocumentAccessLevel

  fileName: string
  fileUrl?: string
  mimeType: string
  fileSize: number

  version: number

  uploadedBy: string
  uploadedAt: string
  updatedAt: string

  verification?: DocumentVerification

  metadata?: DocumentMetadata
}

export interface DocumentMetadata {
  documentDate?: string
  expiryDate?: string
  referenceNumber?: string
  issuingAuthority?: string
  documentOwner?: string
  tags?: string[]
}

export interface DocumentVerification {
  status: DocumentVerificationStatus

  verifiedBy?: string
  verifiedAt?: string

  reviewerComment?: string
  requestedInformation?: string
}

export interface DocumentVersion {
  id: string
  documentId: string

  version: number
  fileName: string
  fileUrl?: string
  mimeType: string
  fileSize: number

  uploadedBy: string
  uploadedAt: string

  changeSummary?: string
  isCurrent: boolean
}

export interface DocumentHistoryEvent {
  id: string
  documentId: string

  type: DocumentHistoryEventType

  title: string
  description?: string

  actorId: string
  actorName: string
  actorRole: string

  version?: number

  createdAt: string
}

export interface DocumentAccessRecord {
  id: string
  documentId: string

  userId: string
  userName: string
  userRole: string

  action:
    | 'viewed'
    | 'downloaded'
    | 'shared'
    | 'updated'

  createdAt: string
}

export interface DocumentUploadInput {
  projectId: string

  name: string
  description?: string

  category: DocumentCategory
  accessLevel?: DocumentAccessLevel

  file: File

  metadata?: DocumentMetadata
}

export interface DocumentUpdateInput {
  name?: string
  description?: string

  category?: DocumentCategory
  accessLevel?: DocumentAccessLevel

  metadata?: DocumentMetadata
}

export interface DocumentVersionUploadInput {
  file: File
  changeSummary?: string
}

export interface DocumentVerificationInput {
  status:
    | 'verified'
    | 'needs_information'
    | 'rejected'

  comment?: string
}

export interface DocumentListFilters {
  projectId?: string
  category?: DocumentCategory
  status?: DocumentStatus
  verificationStatus?: DocumentVerificationStatus
  search?: string
  page?: number
  limit?: number
}

export interface DocumentListResponse {
  items: Document[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface DocumentUploadResponse {
  document: Document
  message?: string
}

export interface DocumentVerificationResponse {
  documentId: string
  status: DocumentVerificationStatus

  comment?: string

  verifiedBy?: string
  verifiedAt?: string
}