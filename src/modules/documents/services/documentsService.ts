// Documents module — API service layer
// BRD reference: Sec. 20.1
//
// Architectural rule:
// Pages and components must never call fetch/axios directly.
// This file is the single network boundary for the Documents module.
//
// The endpoint paths below define the frontend API contract.
// Replace the shared api client import only if your project uses
// a different HTTP client location.

import { api } from '@/lib/api'

/* ==========================================================================
   ENUMS / DOMAIN TYPES
   ========================================================================== */

export type DocumentStatus =
  | 'draft'
  | 'submitted'
  | 'verified'
  | 'needs_information'
  | 'rejected'
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
  | 'other'

export type DocumentAccessLevel =
  | 'project_participants'
  | 'private'
  | 'admin_only'

export type DocumentHistoryEventType =
  | 'uploaded'
  | 'updated'
  | 'verified'
  | 'downloaded'
  | 'viewed'
  | 'access_changed'
  | 'rejected'
  | 'archived'

export type DocumentAccessAction =
  | 'viewed'
  | 'downloaded'
  | 'shared'
  | 'updated'

export type DocumentVerificationStatus =
  | 'verified'
  | 'needs_information'
  | 'rejected'

/* ==========================================================================
   DOCUMENT
   ========================================================================== */

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

  /**
   * Numeric document revision.
   *
   * Example:
   * 1 = v1.0
   * 2 = v2.0
   */
  version: number

  uploadedBy: string
  uploadedAt: string
  updatedAt: string

  verifiedBy?: string
  verifiedAt?: string

  adminComment?: string
}

/* ==========================================================================
   LISTING
   ========================================================================== */

export interface DocumentListParams {
  projectId?: string
  category?: DocumentCategory
  status?: DocumentStatus
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

/* ==========================================================================
   CREATE / UPDATE
   ========================================================================== */

export interface CreateDocumentInput {
  projectId: string
  name: string
  description?: string
  category: DocumentCategory
  accessLevel?: DocumentAccessLevel
  file: File
}

export interface UpdateDocumentInput {
  name?: string
  description?: string
  category?: DocumentCategory
  accessLevel?: DocumentAccessLevel
}

/* ==========================================================================
   HISTORY
   ========================================================================== */

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

  ipAddress?: string
}

/* ==========================================================================
   VERSIONS
   ========================================================================== */

export interface DocumentVersion {
  id: string
  documentId: string

  version: number

  fileName: string
  mimeType: string
  fileSize: number
  fileUrl?: string

  uploadedBy: string
  uploadedAt: string

  changeSummary?: string
  isCurrent: boolean
}

/* ==========================================================================
   ACCESS AUDIT
   ========================================================================== */

export interface DocumentAccessRecord {
  id: string
  documentId: string

  userId: string
  userName: string
  userRole: string

  action: DocumentAccessAction

  createdAt: string
  ipAddress?: string
}

/* ==========================================================================
   VERIFICATION
   ========================================================================== */

export interface DocumentVerificationInput {
  status: DocumentVerificationStatus
  comment?: string
}

export interface DocumentVerificationResult {
  documentId: string

  status: DocumentStatus

  comment?: string

  verifiedBy?: string
  verifiedAt?: string
}

/* ==========================================================================
   UPLOAD RESPONSE
   ========================================================================== */

export interface DocumentUploadResult {
  document: Document
  message?: string
}

/* ==========================================================================
   INTERNAL HELPERS
   ========================================================================== */

/**
 * Creates the multipart payload used by document upload endpoints.
 *
 * Keeping FormData construction in one place prevents pages/components
 * from having to understand the API transport format.
 */
function createDocumentFormData(
  input: CreateDocumentInput,
): FormData {
  const formData = new FormData()

  formData.append('projectId', input.projectId)
  formData.append('name', input.name)
  formData.append('category', input.category)
  formData.append('file', input.file)

  if (input.description?.trim()) {
    formData.append('description', input.description.trim())
  }

  if (input.accessLevel) {
    formData.append('accessLevel', input.accessLevel)
  }

  return formData
}

/**
 * Creates the multipart payload for a document version.
 */
function createVersionFormData(
  file: File,
  changeSummary?: string,
): FormData {
  const formData = new FormData()

  formData.append('file', file)

  if (changeSummary?.trim()) {
    formData.append('changeSummary', changeSummary.trim())
  }

  return formData
}

/* ==========================================================================
   DOCUMENTS SERVICE
   ========================================================================== */

export const documentsService = {
  /* ------------------------------------------------------------------------
     READ
  ------------------------------------------------------------------------ */

  /**
   * List documents available to the authenticated user.
   *
   * GET /documents
   */
  list: (
    params?: DocumentListParams,
  ) =>
    api.get<DocumentListResponse>(
      '/documents',
      {
        params,
      },
    ),

  /**
   * Get a single document by ID.
   *
   * GET /documents/:id
   */
  get: (id: string) =>
    api.get<Document>(
      `/documents/${id}`,
    ),

  /**
   * Get documents belonging to a specific project.
   *
   * GET /projects/:projectId/documents
   */
  listByProject: (
    projectId: string,
    params?: Omit<DocumentListParams, 'projectId'>,
  ) =>
    api.get<DocumentListResponse>(
      `/projects/${projectId}/documents`,
      {
        params,
      },
    ),

  /* ------------------------------------------------------------------------
     CREATE
  ------------------------------------------------------------------------ */

  /**
   * Upload a new document.
   *
   * POST /documents
   *
   * Uses multipart/form-data because the request contains a File.
   */
  upload: (
    input: CreateDocumentInput,
  ) => {
    const formData = createDocumentFormData(input)

    return api.post<DocumentUploadResult>(
      '/documents',
      formData,
    )
  },

  /* ------------------------------------------------------------------------
     UPDATE
  ------------------------------------------------------------------------ */

  /**
   * Update document metadata.
   *
   * The underlying file is not replaced.
   *
   * PATCH /documents/:id
   */
  update: (
    id: string,
    input: UpdateDocumentInput,
  ) =>
    api.patch<Document>(
      `/documents/${id}`,
      input,
    ),

  /* ------------------------------------------------------------------------
     ARCHIVE / RESTORE
  ------------------------------------------------------------------------ */

  /**
   * Archive a document.
   *
   * Archived documents remain part of the audit trail but are no longer
   * treated as active project records.
   *
   * POST /documents/:id/archive
   */
  archive: (id: string) =>
    api.post<Document>(
      `/documents/${id}/archive`,
    ),

  /**
   * Restore an archived document.
   *
   * POST /documents/:id/restore
   */
  restore: (id: string) =>
    api.post<Document>(
      `/documents/${id}/restore`,
    ),

  /* ------------------------------------------------------------------------
     VERSIONS
  ------------------------------------------------------------------------ */

  /**
   * Upload a new version of an existing document.
   *
   * POST /documents/:id/versions
   */
  uploadVersion: (
    id: string,
    file: File,
    changeSummary?: string,
  ) => {
    const formData = createVersionFormData(
      file,
      changeSummary,
    )

    return api.post<DocumentVersion>(
      `/documents/${id}/versions`,
      formData,
    )
  },

  /**
   * Get all versions of a document.
   *
   * GET /documents/:id/versions
   */
  versions: (id: string) =>
    api.get<DocumentVersion[]>(
      `/documents/${id}/versions`,
    ),

  /**
   * Get one specific document version.
   *
   * GET /documents/:id/versions/:version
   */
  version: (
    id: string,
    version: number,
  ) =>
    api.get<DocumentVersion>(
      `/documents/${id}/versions/${version}`,
    ),

  /* ------------------------------------------------------------------------
     HISTORY / AUDIT
  ------------------------------------------------------------------------ */

  /**
   * Get the complete audit history for a document.
   *
   * GET /documents/:id/history
   */
  history: (id: string) =>
    api.get<DocumentHistoryEvent[]>(
      `/documents/${id}/history`,
    ),

  /**
   * Get access-specific audit records.
   *
   * GET /documents/:id/access-history
   */
  accessHistory: (id: string) =>
    api.get<DocumentAccessRecord[]>(
      `/documents/${id}/access-history`,
    ),

  /* ------------------------------------------------------------------------
     FILE ACCESS
  ------------------------------------------------------------------------ */

  /**
   * Download a document.
   *
   * GET /documents/:id/download
   *
   * The backend is responsible for authorisation before returning
   * the underlying file.
   */
  download: (id: string) =>
    api.get<Blob>(
      `/documents/${id}/download`,
      {
        responseType: 'blob',
      },
    ),

  /* ------------------------------------------------------------------------
     VERIFICATION
  ------------------------------------------------------------------------ */

  /**
   * Submit a document verification decision.
   *
   * POST /documents/:id/verification
   *
   * Normally restricted to Build OS Admin or another authorised
   * verification role.
   */
  verify: (
    id: string,
    input: DocumentVerificationInput,
  ) =>
    api.post<DocumentVerificationResult>(
      `/documents/${id}/verification`,
      input,
    ),

  /**
   * Request additional information from the document owner.
   *
   * POST /documents/:id/verification/request-information
   */
  requestInformation: (
    id: string,
    comment: string,
  ) =>
    api.post<DocumentVerificationResult>(
      `/documents/${id}/verification/request-information`,
      {
        comment: comment.trim(),
      },
    ),
} as const

export default documentsService