// Authentication module — shared types
// BRD reference: Sec. 24, Sec. 28.1
//
// Keep authentication-specific types here.
// Cross-cutting types such as User, UserRole, Company and permissions
// should remain in the root `src/types` directory.

/* -------------------------------------------------------------------------- */
/* Authentication status                                                      */
/* -------------------------------------------------------------------------- */

export type AccountStatus =
  | 'ACTIVE'
  | 'PENDING'
  | 'SUSPENDED'
  | 'DEACTIVATED'

export type VerificationType =
  | 'EMAIL'
  | 'PHONE'

export type VerificationStatus =
  | 'PENDING'
  | 'VERIFIED'
  | 'EXPIRED'
  | 'FAILED'

/* -------------------------------------------------------------------------- */
/* Registration                                                               */
/* -------------------------------------------------------------------------- */

export interface RegisterPayload {
  fullName: string
  country: string
  email: string
  phone: string
  password: string
  role: import('@/types').UserRole
}

export interface RegisterResponse {
  userId: string
  email: string
  phone: string
  role: import('@/types').UserRole

  otpRequired: boolean
  emailVerificationRequired: boolean
  phoneVerificationRequired: boolean

  message: string
}

/* -------------------------------------------------------------------------- */
/* Login                                                                      */
/* -------------------------------------------------------------------------- */

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  fullName: string
  email: string
  phone: string
  country: string
  role: import('@/types').UserRole

  emailVerified: boolean
  phoneVerified: boolean
  mfaEnabled: boolean

  status: AccountStatus
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string

  expiresIn: number

  tokenType: 'Bearer'
}

export interface AuthResponse {
  user: AuthUser
  tokens: AuthTokens
}

/* -------------------------------------------------------------------------- */
/* OTP / verification                                                         */
/* -------------------------------------------------------------------------- */

export interface VerifyOtpPayload {
  email: string
  otp: string
  verificationType?: VerificationType
}

export interface VerifyOtpResponse {
  verified: boolean

  verificationType: VerificationType

  status?: VerificationStatus

  message: string
}

export interface ResendOtpPayload {
  email: string
  verificationType?: VerificationType
}

export interface ResendOtpResponse {
  sent: boolean

  expiresIn: number

  message: string
}

/* -------------------------------------------------------------------------- */
/* Password recovery                                                          */
/* -------------------------------------------------------------------------- */

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  password: string
}

export interface PasswordResetResponse {
  success: boolean
  message: string
}

/* -------------------------------------------------------------------------- */
/* Session management                                                         */
/* -------------------------------------------------------------------------- */

export interface RefreshTokenPayload {
  refreshToken: string
}

export interface Session {
  id: string

  userId: string

  createdAt: string

  expiresAt: string

  lastActivityAt?: string

  ipAddress?: string

  userAgent?: string

  revokedAt?: string

  active: boolean
}

/* -------------------------------------------------------------------------- */
/* Availability checks                                                        */
/* -------------------------------------------------------------------------- */

export interface AvailabilityResponse {
  available: boolean

  message?: string
}

/* -------------------------------------------------------------------------- */
/* Authentication errors                                                      */
/* -------------------------------------------------------------------------- */

export type AuthenticationErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_NOT_FOUND'
  | 'ACCOUNT_ALREADY_EXISTS'
  | 'EMAIL_ALREADY_EXISTS'
  | 'PHONE_ALREADY_EXISTS'
  | 'ACCOUNT_NOT_VERIFIED'
  | 'ACCOUNT_SUSPENDED'
  | 'ACCOUNT_DEACTIVATED'
  | 'INVALID_OTP'
  | 'OTP_EXPIRED'
  | 'OTP_RATE_LIMITED'
  | 'INVALID_RESET_TOKEN'
  | 'RESET_TOKEN_EXPIRED'
  | 'SESSION_EXPIRED'
  | 'SESSION_REVOKED'
  | 'MFA_REQUIRED'
  | 'MFA_FAILED'
  | 'TOO_MANY_ATTEMPTS'
  | 'VALIDATION_ERROR'
  | 'UNKNOWN_ERROR'

export interface AuthenticationError {
  code: AuthenticationErrorCode

  message: string

  field?: string

  details?: Record<string, unknown>
}

/* -------------------------------------------------------------------------- */
/* MFA                                                                        */
/* -------------------------------------------------------------------------- */

export type MfaMethod =
  | 'AUTHENTICATOR'
  | 'SMS'
  | 'EMAIL'

export interface MfaChallenge {
  challengeId: string

  method: MfaMethod

  expiresIn: number
}

export interface VerifyMfaPayload {
  challengeId: string

  code: string
}

export interface VerifyMfaResponse {
  verified: boolean

  message: string
}

/* -------------------------------------------------------------------------- */
/* Authentication context                                                     */
/* -------------------------------------------------------------------------- */

export interface AuthenticationState {
  isAuthenticated: boolean

  isLoading: boolean

  user: AuthUser | null

  accessToken: string | null

  error: AuthenticationError | null
}