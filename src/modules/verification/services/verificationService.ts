// Verification module — API service layer
// BRD references: Sec. 15.2, 15.3, 22
//
// This is the single network boundary for verification-related operations.
// Pages and components should use this service instead of calling fetch/axios
// directly.
//
// Backend endpoints are structured around the Build OS verification lifecycle:
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
  VerificationStatus,
  VerificationReview,
} from './types'

// Replace with the project's configured API client once available.
// import { api } from '@/lib/api'

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
   * Primarily used by admins when opening a verification request.
   */
  get: async (id: string): Promise<Verification> => {
    if (!id) {
      throw new Error('Verification ID is required')
    }

    throw new Error(
      'verificationService.get: API client not configured',
    )

    // return api.get<Verification>(`/verification/${id}`)
  },

  /**
   * Get the verification queue for Build OS administrators.
   *
   * Supports filtering by:
   * - status
   * - user type / role
   * - submission date
   * - search
   */
  listQueue: async (params?: {
    status?: VerificationStatus
    role?: string
    search?: string
    page?: number
    limit?: number
  }): Promise<Verification[]> => {
    void params

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
  create: async (payload: {
    role: string
    country?: string
  }): Promise<Verification> => {
    if (!payload.role) {
      throw new Error('Verification role is required')
    }

    void payload

    throw new Error(
      'verificationService.create: API client not configured',
    )

    // return api.post<Verification>('/verification', payload)
  },

  /**
   * Update verification profile information.
   *
   * Only editable information should be accepted by the backend
   * according to the current verification status.
   */
  update: async (
    id: string,
    payload: Record<string, unknown>,
  ): Promise<Verification> => {
    if (!id) {
      throw new Error('Verification ID is required')
    }

    void payload

    throw new Error(
      'verificationService.update: API client not configured',
    )

    // return api.patch<Verification>(`/verification/${id}`, payload)
  },

  /**
   * Upload a verification document.
   *
   * Examples:
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
    if (!verificationId) {
      throw new Error('Verification ID is required')
    }

    if (!file) {
      throw new Error('Verification document is required')
    }

    if (!documentType) {
      throw new Error('Document type is required')
    }

    void file
    void documentType

    throw new Error(
      'verificationService.uploadDocument: API client not configured',
    )

    // const formData = new FormData()
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
   * The backend should enforce whether the document is still editable
   * based on the verification lifecycle.
   */
  deleteDocument: async (
    verificationId: string,
    documentId: string,
  ): Promise<void> => {
    if (!verificationId) {
      throw new Error('Verification ID is required')
    }

    if (!documentId) {
      throw new Error('Document ID is required')
    }

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
   * Draft → Submitted
   */
  submit: async (id: string): Promise<Verification> => {
    if (!id) {
      throw new Error('Verification ID is required')
    }

    throw new Error(
      'verificationService.submit: API client not configured',
    )

    // return api.post<Verification>(`/verification/${id}/submit`)
  },

  /**
   * Request additional information from the applicant.
   *
   * Submitted → Need More Information
   */
  requestInformation: async (
    id: string,
    payload: {
      comment: string
      documentTypes?: string[]
    },
  ): Promise<VerificationReview> => {
    if (!id) {
      throw new Error('Verification ID is required')
    }

    if (!payload.comment.trim()) {
      throw new Error('A review comment is required')
    }

    void payload

    throw new Error(
      'verificationService.requestInformation: API client not configured',
    )

    // return api.post<VerificationReview>(
    //   `/admin/verification/${id}/request-information`,
    //   payload,
    // )
  },

  /**
   * Approve a verification.
   *
   * Submitted → Verified
   */
  approve: async (
    id: string,
    comment?: string,
  ): Promise<VerificationReview> => {
    if (!id) {
      throw new Error('Verification ID is required')
    }

    void comment

    throw new Error(
      'verificationService.approve: API client not configured',
    )

    // return api.post<VerificationReview>(
    //   `/admin/verification/${id}/approve`,
    //   { comment },
    // )
  },

  /**
   * Reject a verification.
   *
   * The backend should retain the full audit trail and rejection reason.
   */
  reject: async (
    id: string,
    payload: {
      reason: string
      comment?: string
    },
  ): Promise<VerificationReview> => {
    if (!id) {
      throw new Error('Verification ID is required')
    }

    if (!payload.reason.trim()) {
      throw new Error('A rejection reason is required')
    }

    void payload

    throw new Error(
      'verificationService.reject: API client not configured',
    )

    // return api.post<VerificationReview>(
    //   `/admin/verification/${id}/reject`,
    //   payload,
    // )
  },

  /**
   * Suspend an already verified user.
   *
   * Verified → Suspended
   *
   * Used for fraud, compliance, dispute or misconduct concerns.
   */
  suspend: async (
    id: string,
    payload: {
      reason: string
    },
  ): Promise<VerificationReview> => {
    if (!id) {
      throw new Error('Verification ID is required')
    }

    if (!payload.reason.trim()) {
      throw new Error('Suspension reason is required')
    }

    void payload

    throw new Error(
      'verificationService.suspend: API client not configured',
    )

    // return api.post<VerificationReview>(
    //   `/admin/verification/${id}/suspend`,
    //   payload,
    // )
  },

  /**
   * Get verification review history.
   *
   * Provides the audit trail for admin decisions and applicant updates.
   */
  getReviewHistory: async (
    id: string,
  ): Promise<VerificationReview[]> => {
    if (!id) {
      throw new Error('Verification ID is required')
    }

    throw new Error(
      'verificationService.getReviewHistory: API client not configured',
    )

    // return api.get<VerificationReview[]>(
    //   `/verification/${id}/reviews`,
    // )
  },

  /**
   * Get verification documents attached to an application.
   */
  getDocuments: async (
    id: string,
  ): Promise<VerificationDocument[]> => {
    if (!id) {
      throw new Error('Verification ID is required')
    }

    throw new Error(
      'verificationService.getDocuments: API client not configured',
    )

    // return api.get<VerificationDocument[]>(
    //   `/verification/${id}/documents`,
    // )
  },
}