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
// - This is the single network boundary for the Users module.
// - UI components, pages and hooks must not call fetch/axios directly.
// - Domain types live in ./types and remain the source of truth.
// - Authentication, verification, security and session operations are
//   exposed through explicit, typed service methods.
//
// Backend contract:
// - Endpoint paths are centralized below.
// - HTTP transport is delegated to the shared API client.
// - The backend remains authoritative for identity, verification,
//   MFA state, sessions and account security.
//
// TODO:
// - Confirm endpoint paths against the final backend contract.
// - Add request/response validation once the backend schemas are finalized.
// - Add multipart-specific API client support if not already available.

import { api } from '@/lib/api'

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

/* ========================================================================== */
/* Response contracts                                                         */
/* ========================================================================== */

/**
 * Generic API response envelope.
 *
 * Keep this local until the shared API client's response contract
 * becomes the application-wide standard.
 */
export interface ApiResponse<T> {
  data: T
  message?: string
}

/**
 * Pagination metadata used by future Users list endpoints.
 */
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

/**
 * Generic paginated response.
 */
export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

/**
 * MFA setup response.
 *
 * `secret` should only be exposed during the MFA enrollment flow.
 * The backend should never return it as part of normal user/profile data.
 */
export interface MfaSetupResponse {
  secret: string
  qrCodeUrl?: string
}

/**
 * Current account status response.
 */
export interface AccountStatusResponse {
  status: AccountStatus
  verificationStatus: VerificationStatus
}

/* ========================================================================== */
/* Endpoint map                                                               */
/* ========================================================================== */

const USERS_BASE = '/users'

const endpoints = {
  currentUser: `${USERS_BASE}/me`,
  user: (id: string) => `${USERS_BASE}/${id}`,

  verification: `${USERS_BASE}/me/verification`,

  documents: `${USERS_BASE}/me/documents`,
  document: (documentId: string) =>
    `${USERS_BASE}/me/documents/${documentId}`,

  security: `${USERS_BASE}/me/security`,
  password: `${USERS_BASE}/me/security/password`,

  mfaSetup: `${USERS_BASE}/me/security/mfa/setup`,
  mfaVerify: `${USERS_BASE}/me/security/mfa/verify`,
  mfaDisable: `${USERS_BASE}/me/security/mfa/disable`,

  sessions: `${USERS_BASE}/me/sessions`,
  session: (sessionId: string) =>
    `${USERS_BASE}/me/sessions/${sessionId}`,
  revokeOtherSessions: `${USERS_BASE}/me/sessions/revoke-others`,

  securityEvents: `${USERS_BASE}/me/security/events`,

  status: `${USERS_BASE}/me/status`,
} as const

/* ========================================================================== */
/* Users service                                                              */
/* ========================================================================== */

export const usersService = {
  /* ------------------------------------------------------------------------ */
  /* Identity                                                                 */
  /* ------------------------------------------------------------------------ */

  /**
   * Get the currently authenticated user's profile.
   *
   * GET /users/me
   */
  getCurrentUser: async (): Promise<User> => {
    return api.get<User>(endpoints.currentUser)
  },

  /**
   * Get a user by ID.
   *
   * GET /users/:id
   *
   * Authorization is enforced by the backend.
   */
  getById: async (id: string): Promise<User> => {
    return api.get<User>(endpoints.user(id))
  },

  /**
   * Update the authenticated user's profile.
   *
   * PATCH /users/me
   */
  updateProfile: async (
    payload: UpdateProfilePayload,
  ): Promise<User> => {
    return api.patch<User>(
      endpoints.currentUser,
      payload,
    )
  },

  /* ------------------------------------------------------------------------ */
  /* Verification                                                             */
  /* ------------------------------------------------------------------------ */

  /**
   * Get the authenticated user's verification status.
   *
   * GET /users/me/verification
   */
  getVerificationStatus: async (): Promise<UserVerification> => {
    return api.get<UserVerification>(
      endpoints.verification,
    )
  },

  /**
   * Get documents submitted for identity/account verification.
   *
   * GET /users/me/documents
   */
  getDocuments: async (): Promise<UserDocument[]> => {
    return api.get<UserDocument[]>(
      endpoints.documents,
    )
  },

  /**
   * Upload a verification document.
   *
   * POST /users/me/documents
   *
   * The shared API client is responsible for handling the
   * multipart/form-data request.
   */
  uploadDocument: async (
    file: File,
    documentType: string,
  ): Promise<UserDocument> => {
    const formData = new FormData()

    formData.append('file', file)
    formData.append('documentType', documentType)

    return api.post<UserDocument>(
      endpoints.documents,
      formData,
    )
  },

  /**
   * Remove a verification document.
   *
   * DELETE /users/me/documents/:documentId
   */
  deleteDocument: async (
    documentId: string,
  ): Promise<void> => {
    await api.delete(
      endpoints.document(documentId),
    )
  },

  /* ------------------------------------------------------------------------ */
  /* Security                                                                 */
  /* ------------------------------------------------------------------------ */

  /**
   * Get the authenticated user's security posture.
   *
   * Includes:
   * - security score
   * - password strength
   * - MFA status
   * - active session count
   * - other backend-defined security indicators
   *
   * GET /users/me/security
   */
  getSecuritySummary: async (): Promise<SecuritySummary> => {
    return api.get<SecuritySummary>(
      endpoints.security,
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
    await api.post(
      endpoints.password,
      {
        currentPassword,
        newPassword,
      },
    )
  },

  /* ------------------------------------------------------------------------ */
  /* MFA                                                                      */
  /* ------------------------------------------------------------------------ */

  /**
   * Start MFA enrollment.
   *
   * POST /users/me/security/mfa/setup
   *
   * The backend may return:
   * - a secret
   * - a QR code URL
   * - additional enrollment metadata in future versions
   */
  setupMfa: async (): Promise<MfaSetupResponse> => {
    return api.post<MfaSetupResponse>(
      endpoints.mfaSetup,
    )
  },

  /**
   * Confirm MFA enrollment using a verification code.
   *
   * POST /users/me/security/mfa/verify
   */
  verifyMfa: async (
    code: string,
  ): Promise<void> => {
    await api.post(
      endpoints.mfaVerify,
      { code },
    )
  },

  /**
   * Disable MFA.
   *
   * POST /users/me/security/mfa/disable
   */
  disableMfa: async (
    code: string,
  ): Promise<void> => {
    await api.post(
      endpoints.mfaDisable,
      { code },
    )
  },

  /* ------------------------------------------------------------------------ */
  /* Sessions / devices                                                       */
  /* ------------------------------------------------------------------------ */

  /**
   * Get all active authenticated sessions/devices.
   *
   * GET /users/me/sessions
   */
  getSessions: async (): Promise<Session[]> => {
    return api.get<Session[]>(
      endpoints.sessions,
    )
  },

  /**
   * Revoke a specific authenticated session.
   *
   * DELETE /users/me/sessions/:sessionId
   */
  revokeSession: async (
    sessionId: string,
  ): Promise<void> => {
    await api.delete(
      endpoints.session(sessionId),
    )
  },

  /**
   * Revoke every session except the current session.
   *
   * POST /users/me/sessions/revoke-others
   */
  revokeOtherSessions: async (): Promise<void> => {
    await api.post(
      endpoints.revokeOtherSessions,
    )
  },

  /* ------------------------------------------------------------------------ */
  /* Security activity                                                        */
  /* ------------------------------------------------------------------------ */

  /**
   * Get recent security and authentication activity.
   *
   * GET /users/me/security/events
   */
  getSecurityEvents: async (): Promise<SecurityEvent[]> => {
    return api.get<SecurityEvent[]>(
      endpoints.securityEvents,
    )
  },

  /* ------------------------------------------------------------------------ */
  /* Account status                                                           */
  /* ------------------------------------------------------------------------ */

  /**
   * Get the current account and verification status.
   *
   * GET /users/me/status
   */
  getAccountStatus: async (): Promise<AccountStatusResponse> => {
    return api.get<AccountStatusResponse>(
      endpoints.status,
    )
  },
} as const

/**
 * Public service type.
 *
 * Useful for dependency injection, testing and typed hooks without
 * duplicating the service contract.
 */
export type UsersService = typeof usersService