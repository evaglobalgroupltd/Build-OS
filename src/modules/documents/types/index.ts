// Documents module — shared domain types
//
// BRD reference: Sec. 20.1
//
// This module is the single source of truth for Documents-specific
// domain contracts.
//
// Keep cross-cutting application types such as User, UserRole,
// Project, etc. in the root src/types directory.
//
// Architecture:
// UI → hooks/query layer → documents service → API client
//
// These types intentionally contain no UI-specific concerns.


// ─────────────────────────────────────────────────────────────
// Core document states
// ─────────────────────────────────────────────────────────────

export type DocumentStatus =
  | 'draft'
  | 'submitted'
  | 'verified'
  | 'needs_information'
  | 'rejected'
  | 'suspended'
  | 'archived'

export type DocumentVerificationStatus =
  | 'pending'
  | 'verified'
  | 'needs_information'
  | 'rejected'


// ─────────────────────────────────────────────────────────────
// Classification
// ─────────────────────────────────────────────────────────────

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


// ─────────────────────────────────────────────────────────────
// Access control
// ─────────────────────────────────────────────────────────────

export type DocumentAccessLevel =
  | 'private'
  | 'project_participants'
  | 'admin_only'

export type DocumentAccessAction =
  | 'viewed'
  | 'downloaded'
  | 'shared'
  | 'updated'


// ─────────────────────────────────────────────────────────────
// Audit / history
// ─────────────────────────────────────────────────────────────

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


// ─────────────────────────────────────────────────────────────
// Shared metadata
// ─────────────────────────────────────────────────────────────

export interface DocumentMetadata {
  documentDate?: string
  expiryDate?: string
  referenceNumber?: string
  issuingAuthority?: string
  documentOwner?: string
  tags?: string[]
}


// ─────────────────────────────────────────────────────────────
// Verification
// ─────────────────────────────────────────────────────────────

export interface DocumentVerification {
  status: DocumentVerificationStatus

  verifiedBy?: string
  verifiedAt?: string

  reviewerComment?: string
  requestedInformation?: string
}


// ─────────────────────────────────────────────────────────────
// Primary document entity
// ─────────────────────────────────────────────────────────────

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


// ─────────────────────────────────────────────────────────────
// Document versions
// ─────────────────────────────────────────────────────────────

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


// ─────────────────────────────────────────────────────────────
// Document audit history
// ─────────────────────────────────────────────────────────────

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


// ─────────────────────────────────────────────────────────────
// Access audit records
// ─────────────────────────────────────────────────────────────

export interface DocumentAccessRecord {
  id: string

  documentId: string

  userId: string
  userName: string
  userRole: string

  action: DocumentAccessAction

  createdAt: string
}


// ─────────────────────────────────────────────────────────────
// Create / upload contracts
// ─────────────────────────────────────────────────────────────

export interface DocumentUploadInput {
  projectId: string

  name: string
  description?: string

  category: DocumentCategory
  accessLevel?: DocumentAccessLevel

  file: File

  metadata?: DocumentMetadata
}


// ─────────────────────────────────────────────────────────────
// Update contracts
// ─────────────────────────────────────────────────────────────

export interface DocumentUpdateInput {
  name?: string
  description?: string

  category?: DocumentCategory
  accessLevel?: DocumentAccessLevel

  metadata?: DocumentMetadata
}


// ─────────────────────────────────────────────────────────────
// Version upload
// ─────────────────────────────────────────────────────────────

export interface DocumentVersionUploadInput {
  file: File

  changeSummary?: string
}


// ─────────────────────────────────────────────────────────────
// Verification actions
// ─────────────────────────────────────────────────────────────

export type DocumentVerificationAction =
  | 'verified'
  | 'needs_information'
  | 'rejected'

export interface DocumentVerificationInput {
  status: DocumentVerificationAction

  comment?: string
}


// ─────────────────────────────────────────────────────────────
// List / search filters
// ─────────────────────────────────────────────────────────────

export interface DocumentListFilters {
  projectId?: string

  category?: DocumentCategory
  status?: DocumentStatus
  verificationStatus?: DocumentVerificationStatus

  search?: string

  page?: number
  limit?: number
}


// ─────────────────────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────────────────────

export interface DocumentListResponse {
  items: Document[]

  total: number

  page: number
  limit: number
  totalPages: number
}


// ─────────────────────────────────────────────────────────────
// API responses
// ─────────────────────────────────────────────────────────────

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