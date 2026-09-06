// Users module — shared types
//
// BRD references:
// - Sec. 15.1 — User Management
// - Sec. 15.2 — Verification Status Lifecycle
// - Sec. 15.3 — Document Requirements
// - Sec. 20.1 — Compliance Framework
// - Sec. 22 — User Management & Identity
// - Sec. 24 — Registration / Login / MFA / Device Recognition
//
// Keep module-specific types here; only cross-cutting types
// (e.g. a global `AuthUser`, `UserRole` used outside this module)
// belong in the root `src/types`.
//
// TODO:
// - Reconcile these shapes with the finalized backend contract (Sec. 28.1).
// - Split into separate files (profile.ts, security.ts, verification.ts)
//   if this file grows too large.

/**
 * High-level account lifecycle status.
 *
 * Sec. 15.1 / Sec. 20.1
 */
export type AccountStatus =
  | 'active'
  | 'pending'
  | 'suspended'
  | 'deactivated'

/**
 * Verification lifecycle status for a user or an individual
 * verification item/document.
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
 * User account/profile.
 *
 * Sec. 15.1, Sec. 22
 */
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  emailVerified: boolean
  phone?: string
  phoneVerified: boolean
  role: string
  organization?: string
  country?: string
  address?: string
  avatarUrl?: string
  profileCompletionPercent: number
  verificationStatus: VerificationStatus
  accountStatus: AccountStatus
  createdAt: string
  updatedAt: string
}

/**
 * Payload accepted by `usersService.updateProfile`.
 *
 * All fields optional — partial update.
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

/**
 * A single item in the user's verification checklist
 * (e.g. identity, contact, account review).
 *
 * Sec. 15.2, Sec. 22
 */
export interface VerificationItem {
  id: string
  label: string
  description: string
  status: VerificationStatus
  updatedAt?: string
}

/**
 * Aggregate verification state for the authenticated user.
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
 * Supported verification document types.
 *
 * Sec. 15.3
 */
export type UserDocumentType =
  | 'government_id'
  | 'proof_of_address'
  | 'business_registration'
  | 'other'

/**
 * A document submitted as part of the verification process.
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

/**
 * Qualitative strength rating for the account password.
 *
 * Sec. 24
 */
export type PasswordStrength = 'weak' | 'fair' | 'strong'

/**
 * Aggregate security posture for the authenticated user.
 *
 * Sec. 15.1, Sec. 24
 */
export interface SecuritySummary {
  score: number
  passwordStrength: PasswordStrength
  mfaEnabled: boolean
  activeSessionsCount: number
  lastPasswordChangeAt?: string
}

/**
 * A device/browser session associated with the account.
 *
 * Sec. 24
 */
export interface Session {
  id: string
  device: string
  browser: string
  location?: string
  ipAddress?: string
  current: boolean
  lastActiveAt: string
  createdAt: string
}

/**
 * Category of a recorded security event, used for iconography /
 * filtering in the UI.
 *
 * Sec. 20.1, Sec. 24
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
 * A single entry in the account's security activity log.
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

/**
 * MFA setup response returned when initiating enrollment.
 *
 * Sec. 24
 */
export interface MfaSetupInfo {
  secret: string
  qrCodeUrl?: string
}