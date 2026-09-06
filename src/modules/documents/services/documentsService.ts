// Documents module — API service layer
// BRD reference: Sec. 20.1
//
// This module is the single network boundary for Documents.
// Pages and components must not call fetch/axios directly.
//
// The endpoint paths below define the frontend API contract.
// Replace the api client import/path if your project's shared HTTP client
// uses a different location.

import { api } from '@/lib/api'

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

  verifiedBy?: string
  verifiedAt?: string

  adminComment?: string
}

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

export interface DocumentHistoryEvent {
  id: string
  documentId: string

  type:
    | 'uploaded'
    | 'updated'
    | 'verified'
    | 'downloaded'
    | 'viewed'
    | 'access_changed'
    | 'rejected'
    | 'archived'

  title: string
  description?: string

  actorId: string
  actorName: string
  actorRole: string

  version?: number
  createdAt: string

  ipAddress?: string
}

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

export interface DocumentAccessRecord {
  id: string
  documentId: string

  userId: string
  userName: string
  userRole: string

  action: 'viewed' | 'downloaded' | 'shared' | 'updated'

  createdAt: string
  ipAddress?: string
}

export interface DocumentVerificationInput {
  status: 'verified' | 'needs_information' | 'rejected'
  comment?: string
}

export interface DocumentVerificationResult {
  documentId: string
  status: DocumentStatus
  comment?: string
  verifiedBy?: string
  verifiedAt?: string
}

export interface DocumentUploadResult {
  document: Document
  message?: string
}

export const documentsService = {
  /**
   * List documents available to the authenticated user.
   */
  list: (params?: DocumentListParams) =>
    api.get<DocumentListResponse>('/documents', {
      params,
    }),

  /**
   * Get a single document.
   */
  get: (id: string) =>
    api.get<Document>(`/documents/${id}`),

  /**
   * Upload a new document.
   *
   * Uses multipart/form-data because the request contains a File.
   */
  upload: (input: CreateDocumentInput) => {
    const formData = new FormData()

    formData.append('projectId', input.projectId)
    formData.append('name', input.name)
    formData.append('category', input.category)
    formData.append('file', input.file)

    if (input.description) {
      formData.append('description', input.description)
    }

    if (input.accessLevel) {
      formData.append('accessLevel', input.accessLevel)
    }

    return api.post<DocumentUploadResult>('/documents', formData)
  },

  /**
   * Update document metadata.
   *
   * Does not replace the underlying file.
   */
  update: (id: string, input: UpdateDocumentInput) =>
    api.patch<Document>(`/documents/${id}`, input),

  /**
   * Archive a document.
   *
   * Archived documents remain available in the audit trail but are no
   * longer treated as active project records.
   */
  archive: (id: string) =>
    api.post<Document>(`/documents/${id}/archive`),

  /**
   * Restore an archived document.
   */
  restore: (id: string) =>
    api.post<Document>(`/documents/${id}/restore`),

  /**
   * Upload a new version of an existing document.
   */
  uploadVersion: (
    id: string,
    file: File,
    changeSummary?: string,
  ) => {
    const formData = new FormData()

    formData.append('file', file)

    if (changeSummary) {
      formData.append('changeSummary', changeSummary)
    }

    return api.post<DocumentVersion>(
      `/documents/${id}/versions`,
      formData,
    )
  },

  /**
   * Get all versions of a document.
   */
  versions: (id: string) =>
    api.get<DocumentVersion[]>(
      `/documents/${id}/versions`,
    ),

  /**
   * Get a specific document version.
   */
  version: (id: string, version: number) =>
    api.get<DocumentVersion>(
      `/documents/${id}/versions/${version}`,
    ),

  /**
   * Get complete document history.
   */
  history: (id: string) =>
    api.get<DocumentHistoryEvent[]>(
      `/documents/${id}/history`,
    ),

  /**
   * Get document access history.
   */
  accessHistory: (id: string) =>
    api.get<DocumentAccessRecord[]>(
      `/documents/${id}/access-history`,
    ),

  /**
   * Record/document download endpoint.
   *
   * The backend should enforce authorisation before returning the file.
   */
  download: (id: string) =>
    api.get<Blob>(`/documents/${id}/download`, {
      responseType: 'blob',
    }),

  /**
   * Request a document verification decision.
   *
   * Normally restricted to Build OS Admin or authorised verification roles.
   */
  verify: (id: string, input: DocumentVerificationInput) =>
    api.post<DocumentVerificationResult>(
      `/documents/${id}/verification`,
      input,
    ),

  /**
   * Request additional information from the document owner.
   */
  requestInformation: (
    id: string,
    comment: string,
  ) =>
    api.post<DocumentVerificationResult>(
      `/documents/${id}/verification/request-information`,
      {
        comment,
      },
    ),

  /**
   * Get documents associated with a specific project.
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
}