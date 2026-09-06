// Users module — API service layer
//
// BRD references:
// - Sec. 15.1 — User Management
// - Sec. 15.2 — Verification Status Lifecycle
// - Sec. 15.3 — Document Requirements
// - Sec. 20.1 — Compliance Framework
// - Sec. 22 — User Management & Identity
// - Sec. 24 — Registration / Login / MFA / Device Recognition
//
// Architecture:
// Keep this file as the single place where the Users module communicates
// with the backend. Pages and components should never call fetch/axios
// directly.
//
// TODO:
// - Connect these methods to the shared API client once Sec. 28.1 backend
//   endpoints are available.
// - Replace placeholder Promise returns with real HTTP requests.
// - Add request/response validation once the backend contract is finalized.

import type {
  AccountStatus,
  SecurityEvent,
  SecuritySummary,
  Session,
  UpdateProfilePayload,
  User,
  UserDocument,
  UserVerification,
  VerificationStatus,
} from './types'

/**
 * Generic API response shape.
 *
 * Keep this local until the project's shared API response contract
 * is finalized.
 */
export interface ApiResponse<T> {
  data: T
  message?: string
}

/**
 * Pagination metadata used by list endpoints.
 */
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

/**
 * Paginated API response.
 */
export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

/**
 * Users service.
 *
 * All user/account-related network operations should live here.
 */
export const usersService = {
  /**
   * Get the currently authenticated user's profile.
   *
   * GET /users/me
   */
  getCurrentUser: async (): Promise<User> => {
    // TODO: return api.get<User>('/users/me')
    throw new Error('usersService.getCurrentUser is not implemented')
  },

  /**
   * Get a user by ID.
   *
   * GET /users/:id
   */
  getById: async (id: string): Promise<User> => {
    // TODO: return api.get<User>(`/users/${id}`)
    throw new Error('usersService.getById is not implemented')
  },

  /**
   * Update the authenticated user's profile.
   *
   * PATCH /users/me
   */
  updateProfile: async (
    payload: UpdateProfilePayload,
  ): Promise<User> => {
    // TODO:
    // return api.patch<User>('/users/me', payload)
    throw new Error('usersService.updateProfile is not implemented')
  },

  /**
   * Get the user's verification status.
   *
   * GET /users/me/verification
   */
  getVerificationStatus: async (): Promise<UserVerification> => {
    // TODO:
    // return api.get<UserVerification>('/users/me/verification')
    throw new Error(
      'usersService.getVerificationStatus is not implemented',
    )
  },

  /**
   * Get documents submitted for verification.
   *
   * GET /users/me/documents
   */
  getDocuments: async (): Promise<UserDocument[]> => {
    // TODO:
    // return api.get<UserDocument[]>('/users/me/documents')
    throw new Error('usersService.getDocuments is not implemented')
  },

  /**
   * Upload a verification document.
   *
   * POST /users/me/documents
   *
   * The actual multipart/form-data implementation should be handled
   * by the shared API client.
   */
  uploadDocument: async (
    file: File,
    documentType: string,
  ): Promise<UserDocument> => {
    // TODO:
    // const formData = new FormData()
    // formData.append('file', file)
    // formData.append('documentType', documentType)
    //
    // return api.post<UserDocument>(
    //   '/users/me/documents',
    //   formData,
    // )

    void file
    void documentType

    throw new Error('usersService.uploadDocument is not implemented')
  },

  /**
   * Remove a verification document.
   *
   * DELETE /users/me/documents/:documentId
   */
  deleteDocument: async (
    documentId: string,
  ): Promise<void> => {
    // TODO:
    // await api.delete(`/users/me/documents/${documentId}`)

    void documentId

    throw new Error('usersService.deleteDocument is not implemented')
  },

  /**
   * Get the user's security summary.
   *
   * Includes security score, MFA status, password strength,
   * active session count, etc.
   *
   * GET /users/me/security
   */
  getSecuritySummary: async (): Promise<SecuritySummary> => {
    // TODO:
    // return api.get<SecuritySummary>('/users/me/security')
    throw new Error(
      'usersService.getSecuritySummary is not implemented',
    )
  },

  /**
   * Change the authenticated user's password.
   *
   * POST /users/me/security/password
   */
  changePassword: async (
    currentPassword: string,
    newPassword: string,
  ): Promise<void> => {
    // TODO:
    // await api.post('/users/me/security/password', {
    //   currentPassword,
    //   newPassword,
    // })

    void currentPassword
    void newPassword

    throw new Error(
      'usersService.changePassword is not implemented',
    )
  },

  /**
   * Enable MFA.
   *
   * The backend should return the MFA setup information required
   * by the client, such as a QR code or secret.
   *
   * POST /users/me/security/mfa/setup
   */
  setupMfa: async (): Promise<{
    secret: string
    qrCodeUrl?: string
  }> => {
    // TODO:
    // return api.post('/users/me/security/mfa/setup')
    throw new Error('usersService.setupMfa is not implemented')
  },

  /**
   * Confirm MFA setup.
   *
   * POST /users/me/security/mfa/verify
   */
  verifyMfa: async (code: string): Promise<void> => {
    // TODO:
    // await api.post('/users/me/security/mfa/verify', { code })

    void code

    throw new Error('usersService.verifyMfa is not implemented')
  },

  /**
   * Disable MFA.
   *
   * POST /users/me/security/mfa/disable
   */
  disableMfa: async (code: string): Promise<void> => {
    // TODO:
    // await api.post('/users/me/security/mfa/disable', { code })

    void code

    throw new Error('usersService.disableMfa is not implemented')
  },

  /**
   * Get all active sessions/devices.
   *
   * GET /users/me/sessions
   */
  getSessions: async (): Promise<Session[]> => {
    // TODO:
    // return api.get<Session[]>('/users/me/sessions')
    throw new Error('usersService.getSessions is not implemented')
  },

  /**
   * Revoke a specific session.
   *
   * DELETE /users/me/sessions/:sessionId
   */
  revokeSession: async (
    sessionId: string,
  ): Promise<void> => {
    // TODO:
    // await api.delete(`/users/me/sessions/${sessionId}`)

    void sessionId

    throw new Error(
      'usersService.revokeSession is not implemented',
    )
  },

  /**
   * Revoke every session except the current session.
   *
   * POST /users/me/sessions/revoke-others
   */
  revokeOtherSessions: async (): Promise<void> => {
    // TODO:
    // await api.post('/users/me/sessions/revoke-others')
    throw new Error(
      'usersService.revokeOtherSessions is not implemented',
    )
  },

  /**
   * Get recent security activity.
   *
   * GET /users/me/security/events
   */
  getSecurityEvents: async (): Promise<SecurityEvent[]> => {
    // TODO:
    // return api.get<SecurityEvent[]>('/users/me/security/events')
    throw new Error(
      'usersService.getSecurityEvents is not implemented',
    )
  },

  /**
   * Get the current account status.
   *
   * GET /users/me/status
   */
  getAccountStatus: async (): Promise<{
    status: AccountStatus
    verificationStatus: VerificationStatus
  }> => {
    // TODO:
    // return api.get('/users/me/status')
    throw new Error(
      'usersService.getAccountStatus is not implemented',
    )
  },
}