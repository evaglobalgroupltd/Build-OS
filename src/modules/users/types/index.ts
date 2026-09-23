// Users module — shared domain types
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
// - These are the canonical domain contracts for the Users module.
// - UI-specific concerns such as icons, labels, colors, routes and
//   presentation badges do not belong here.
// - Cross-cutting authorization types should remain in the root
//   src/types directory where they are shared across modules.
//
// TODO:
// - Reconcile field names and enum values with the finalized backend
//   contract in Sec. 28.1.
// - Split into profile.ts, verification.ts and security.ts if this
//   module grows substantially.

/* ========================================================================== */
/* Account lifecycle                                                          */
/* ========================================================================== */

/**
 * High-level lifecycle state of a user account.
 *
 * Sec. 15.1 / Sec. 20.1
 */
export type AccountStatus =
  | 'active'
  | 'pending'
  | 'suspended'
  | 'deactivated'

/* ========================================================================== */
/* Verification                                                               */
/* ========================================================================== */

/**
 * Verification lifecycle state.
 *
 * Used by both aggregate verification records and individual
 * verification items/documents.
 *
 * Sec. 15.2
 */
export type VerificationStatus =
  | 'unverified'
  | 'pending'
  | 'in_review'
  | 'verified'
  | 'rejected'
  | 'expired'

/**
 * A single requirement in the user's verification checklist.
 *
 * Examples:
 * - Identity verification
 * - Contact verification
 * - Account verification
 *
 * Sec. 15.2 / Sec. 22
 */
export interface VerificationItem {
  id: string
  label: string
  description: string
  status: VerificationStatus
  updatedAt?: string
}

/**
 * Aggregate verification state for a user.
 *
 * The backend remains authoritative for the overall verification
 * lifecycle and review state.
 *
 * Sec. 15.2
 */
export interface UserVerification {
  status: VerificationStatus
  items: VerificationItem[]
  submittedAt?: string
  reviewedAt?: string
  rejectionReason?: string
}

/**
 * Supported verification document categories.
 *
 * Sec. 15.3
 */
export type UserDocumentType =
  | 'government_id'
  | 'proof_of_address'
  | 'business_registration'
  | 'other'

/**
 * A document submitted as part of the user's verification process.
 *
 * Sec. 15.3
 */
export interface UserDocument {
  id: string
  documentType: UserDocumentType
  fileName: string
  fileUrl?: string
  status: VerificationStatus
  uploadedAt: string
  reviewedAt?: string
  rejectionReason?: string
}

/* ========================================================================== */
/* User identity / profile                                                   */
/* ========================================================================== */

/**
 * Authenticated user account/profile.
 *
 * This represents identity and account information owned by the
 * Users module. Authorization roles that are shared across the
 * application should use the project's global role types where applicable.
 *
 * Sec. 15.1 / Sec. 22
 */
export interface User {
  id: string

  firstName: string
  lastName: string

  email: string
  emailVerified: boolean

  phone?: string
  phoneVerified: boolean

  /**
   * Kept as a string until the backend's final role model is reconciled
   * with the application's shared authorization types.
   */
  role: string

  organization?: string

  country?: string
  address?: string

  avatarUrl?: string

  /**
   * Percentage from 0–100.
   */
  profileCompletionPercent: number

  verificationStatus: VerificationStatus
  accountStatus: AccountStatus

  createdAt: string
  updatedAt: string
}

/**
 * Fields that may be changed through the authenticated user's
 * profile update endpoint.
 *
 * PATCH /users/me
 *
 * Sec. 15.1
 */
export interface UpdateProfilePayload {
  firstName?: string
  lastName?: string
  phone?: string
  organization?: string
  country?: string
  address?: string
}

/* ========================================================================== */
/* Security                                                                   */
/* ========================================================================== */

/**
 * Qualitative password-strength classification.
 *
 * Sec. 24
 */
export type PasswordStrength =
  | 'weak'
  | 'fair'
  | 'strong'

/**
 * Current security posture for the authenticated account.
 *
 * Sec. 15.1 / Sec. 24
 */
export interface SecuritySummary {
  /**
   * Security score represented as a percentage from 0–100.
   */
  score: number

  passwordStrength: PasswordStrength

  mfaEnabled: boolean

  activeSessionsCount: number

  lastPasswordChangeAt?: string
}

/* ========================================================================== */
/* Sessions / devices                                                         */
/* ========================================================================== */

/**
 * Authenticated device/session associated with the account.
 *
 * Sec. 24
 */
export interface Session {
  id: string

  device: string
  browser: string

  location?: string
  ipAddress?: string

  /**
   * True when this is the session currently being used by
   * the authenticated user.
   */
  current: boolean

  lastActiveAt: string
  createdAt: string
}

/* ========================================================================== */
/* Security activity                                                          */
/* ========================================================================== */

/**
 * Machine-readable security event category.
 *
 * The UI may map these values to icons, labels and presentation
 * styles without putting presentation concerns into the domain model.
 *
 * Sec. 20.1 / Sec. 24
 */
export type SecurityEventType =
  | 'login_success'
  | 'login_failed'
  | 'password_changed'
  | 'mfa_enabled'
  | 'mfa_disabled'
  | 'session_revoked'
  | 'profile_updated'
  | 'document_uploaded'

/**
 * Immutable security/audit event.
 *
 * Sec. 20.1
 */
export interface SecurityEvent {
  id: string

  type: SecurityEventType

  action: string
  description: string

  location?: string
  ipAddress?: string

  occurredAt: string
}

/* ========================================================================== */
/* MFA                                                                        */
/* ========================================================================== */

/**
 * Information returned when starting MFA enrollment.
 *
 * This data should only be exposed during the MFA setup flow.
 *
 * Sec. 24
 */
export interface MfaSetupInfo {
  secret: string
  qrCodeUrl?: string
}