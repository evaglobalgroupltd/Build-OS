// Verification module — API service layer
//
// BRD references:
// - Sec. 15.2 — Verification Status Lifecycle
// - Sec. 15.3 — Verification Documents
// - Sec. 22 — User Management & Identity
//
// This module is the single network boundary for verification-related
// operations.
//
// Pages and components should use this service instead of calling
// fetch/axios directly.
//
// Verification lifecycle:
//
// Draft
//   → Submitted
//   → Need More Information
//   → Verified
//   → Suspended
//   → Rejected

import type {
  Verification,
  VerificationDocument,
  VerificationReview,
  VerificationStatus,
} from './types'

// -----------------------------------------------------------------------------
// API client
// -----------------------------------------------------------------------------
//
// Replace this fallback with the project's configured API client when the
// backend integration is enabled.
//
// Example:
// import { api } from '@/lib/api'
//
// The service intentionally remains isolated from the UI layer so that pages
// and components do not need to know whether the application uses Axios,
// fetch, or another HTTP client.
// -----------------------------------------------------------------------------

// import { api } from '@/lib/api'

// -----------------------------------------------------------------------------
// Shared request types
// -----------------------------------------------------------------------------

export interface VerificationQueueParams {
  status?: VerificationStatus
  role?: string
  search?: string
  page?: number
  limit?: number
}

export interface CreateVerificationPayload {
  role: string
  country?: string
}

export type UpdateVerificationPayload = Record<string, unknown>

export interface RequestVerificationInformationPayload {
  comment: string
  documentTypes?: string[]
}

export interface RejectVerificationPayload {
  reason: string
  comment?: string
}

export interface SuspendVerificationPayload {
  reason: string
}

// -----------------------------------------------------------------------------
// Validation helpers
// -----------------------------------------------------------------------------

function requireId(
  id: string,
  label = 'Verification ID',
): void {
  if (!id?.trim()) {
    throw new Error(`${label} is required`)
  }
}

function requireText(
  value: string | undefined,
  message: string,
): void {
  if (!value?.trim()) {
    throw new Error(message)
  }
}

// -----------------------------------------------------------------------------
// Verification service
// -----------------------------------------------------------------------------

export const verificationService = {
  /**
   * Get the current user's verification record.
   *
   * Used by:
   * - Verification screen
   * - Verification status screen
   * - Role dashboards
   */
  getMyVerification: async (): Promise<Verification> => {
    throw new Error(
      'verificationService.getMyVerification: API client not configured',
    )

    // return api.get<Verification>('/verification/me')
  },

  /**
   * Get a specific verification record.
   *
   * Primarily used by administrators when opening a verification request.
   */
  get: async (
    id: string,
  ): Promise<Verification> => {
    requireId(id)

    throw new Error(
      'verificationService.get: API client not configured',
    )

    // return api.get<Verification>(`/verification/${id}`)
  },

  /**
   * Get the Build OS verification queue.
   *
   * Supports:
   * - verification status
   * - applicant role
   * - search
   * - pagination
   */
  listQueue: async (
    params?: VerificationQueueParams,
  ): Promise<Verification[]> => {
    if (params?.page !== undefined && params.page < 1) {
      throw new Error('Verification page must be greater than 0')
    }

    if (params?.limit !== undefined && params.limit < 1) {
      throw new Error('Verification limit must be greater than 0')
    }

    throw new Error(
      'verificationService.listQueue: API client not configured',
    )

    // return api.get<Verification[]>('/admin/verification', {
    //   params,
    // })
  },

  /**
   * Create a verification application.
   *
   * Creates the initial Draft verification record.
   */
  create: async (
    payload: CreateVerificationPayload,
  ): Promise<Verification> => {
    requireText(
      payload.role,
      'Verification role is required',
    )

    throw new Error(
      'verificationService.create: API client not configured',
    )

    // return api.post<Verification>(
    //   '/verification',
    //   payload,
    // )
  },

  /**
   * Update verification profile information.
   *
   * The backend is responsible for determining which fields are editable
   * according to the current verification lifecycle state.
   */
  update: async (
    id: string,
    payload: UpdateVerificationPayload,
  ): Promise<Verification> => {
    requireId(id)

    if (!payload || Object.keys(payload).length === 0) {
      throw new Error(
        'Verification update payload cannot be empty',
      )
    }

    throw new Error(
      'verificationService.update: API client not configured',
    )

    // return api.patch<Verification>(
    //   `/verification/${id}`,
    //   payload,
    // )
  },

  /**
   * Upload a verification document.
   *
   * Supported examples include:
   * - Government ID
   * - NIN
   * - BVN
   * - CAC certificate
   * - TIN
   * - Professional licence
   * - Bank verification
   * - Insurance
   * - References
   */
  uploadDocument: async (
    verificationId: string,
    file: File,
    documentType: string,
  ): Promise<VerificationDocument> => {
    requireId(verificationId)

    if (!file) {
      throw new Error(
        'Verification document is required',
      )
    }

    requireText(
      documentType,
      'Document type is required',
    )

    throw new Error(
      'verificationService.uploadDocument: API client not configured',
    )

    // const formData = new FormData()
    //
    // formData.append('file', file)
    // formData.append('documentType', documentType)
    //
    // return api.post<VerificationDocument>(
    //   `/verification/${verificationId}/documents`,
    //   formData,
    //   {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   },
    // )
  },

  /**
   * Remove a verification document.
   *
   * The backend should determine whether the document remains editable
   * based on the verification lifecycle.
   */
  deleteDocument: async (
    verificationId: string,
    documentId: string,
  ): Promise<void> => {
    requireId(verificationId)
    requireId(documentId, 'Document ID')

    throw new Error(
      'verificationService.deleteDocument: API client not configured',
    )

    // await api.delete(
    //   `/verification/${verificationId}/documents/${documentId}`,
    // )
  },

  /**
   * Submit a completed verification application for admin review.
   *
   * Lifecycle:
   * Draft → Submitted
   */
  submit: async (
    id: string,
  ): Promise<Verification> => {
    requireId(id)

    throw new Error(
      'verificationService.submit: API client not configured',
    )

    // return api.post<Verification>(
    //   `/verification/${id}/submit`,
    // )
  },

  /**
   * Request additional information from the applicant.
   *
   * Lifecycle:
   * Submitted → Need More Information
   */
  requestInformation: async (
    id: string,
    payload: RequestVerificationInformationPayload,
  ): Promise<VerificationReview> => {
    requireId(id)

    requireText(
      payload.comment,
      'A review comment is required',
    )

    throw new Error(
      'verificationService.requestInformation: API client not configured',
    )

    // return api.post<VerificationReview>(
    //   `/admin/verification/${id}/request-information`,
    //   payload,
    // )
  },

  /**
   * Approve a verification application.
   *
   * Lifecycle:
   * Submitted → Verified
   */
  approve: async (
    id: string,
    comment?: string,
  ): Promise<VerificationReview> => {
    requireId(id)

    throw new Error(
      'verificationService.approve: API client not configured',
    )

    // return api.post<VerificationReview>(
    //   `/admin/verification/${id}/approve`,
    //   {
    //     comment: comment?.trim() || undefined,
    //   },
    // )
  },

  /**
   * Reject a verification application.
   *
   * The backend should preserve the complete audit trail, including the
   * rejection reason and optional reviewer comment.
   */
  reject: async (
    id: string,
    payload: RejectVerificationPayload,
  ): Promise<VerificationReview> => {
    requireId(id)

    requireText(
      payload.reason,
      'A rejection reason is required',
    )

    throw new Error(
      'verificationService.reject: API client not configured',
    )

    // return api.post<VerificationReview>(
    //   `/admin/verification/${id}/reject`,
    //   {
    //     reason: payload.reason.trim(),
    //     comment: payload.comment?.trim() || undefined,
    //   },
    // )
  },

  /**
   * Suspend an already verified user.
   *
   * Lifecycle:
   * Verified → Suspended
   *
   * Used for compliance, fraud, dispute, or misconduct-related
   * restrictions.
   */
  suspend: async (
    id: string,
    payload: SuspendVerificationPayload,
  ): Promise<VerificationReview> => {
    requireId(id)

    requireText(
      payload.reason,
      'Suspension reason is required',
    )

    throw new Error(
      'verificationService.suspend: API client not configured',
    )

    // return api.post<VerificationReview>(
    //   `/admin/verification/${id}/suspend`,
    //   {
    //     reason: payload.reason.trim(),
    //   },
    // )
  },

  /**
   * Get verification review history.
   *
   * Provides the audit trail for:
   * - reviewer decisions
   * - applicant updates
   * - information requests
   * - approval / rejection actions
   */
  getReviewHistory: async (
    id: string,
  ): Promise<VerificationReview[]> => {
    requireId(id)

    throw new Error(
      'verificationService.getReviewHistory: API client not configured',
    )

    // return api.get<VerificationReview[]>(
    //   `/verification/${id}/reviews`,
    // )
  },

  /**
   * Get all verification documents attached to an application.
   */
  getDocuments: async (
    id: string,
  ): Promise<VerificationDocument[]> => {
    requireId(id)

    throw new Error(
      'verificationService.getDocuments: API client not configured',
    )

    // return api.get<VerificationDocument[]>(
    //   `/verification/${id}/documents`,
    // )
  },
}