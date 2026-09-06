// Authentication module — API service layer
// BRD references: Sec. 24, Sec. 28.1
//
// This is the single network boundary for authentication.
// Pages/components should never call fetch/axios directly.
//
// Current implementation:
// - Defines the frontend/backend authentication contract.
// - Returns typed responses.
// - Keeps network calls ready for the central API client.
//
// TODO:
// Replace the placeholder implementations with the real API client
// when the backend defined in Sec. 28.1 is available.

import type { UserRole } from '@/types'

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface RegisterPayload {
  fullName: string
  country: string
  email: string
  phone: string
  password: string
  role: UserRole
}

export interface LoginPayload {
  email: string
  password: string
}

export interface VerifyOtpPayload {
  email: string
  otp: string
}

export interface ResendOtpPayload {
  email: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  password: string
}

export interface RefreshTokenPayload {
  refreshToken: string
}

export interface AuthUser {
  id: string
  fullName: string
  email: string
  phone: string
  country: string
  role: UserRole
  emailVerified: boolean
  phoneVerified: boolean
  mfaEnabled: boolean
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'DEACTIVATED'
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

export interface RegisterResponse {
  userId: string
  email: string
  phone: string
  role: UserRole
  otpRequired: boolean
  emailVerificationRequired: boolean
  phoneVerificationRequired: boolean
  message: string
}

export interface VerifyOtpResponse {
  verified: boolean
  verificationType: 'EMAIL' | 'PHONE'
  message: string
}

export interface ResendOtpResponse {
  sent: boolean
  expiresIn: number
  message: string
}

export interface PasswordResetResponse {
  success: boolean
  message: string
}

/* -------------------------------------------------------------------------- */
/* Service                                                                    */
/* -------------------------------------------------------------------------- */

export const authenticationService = {
  /**
   * Register a new Build OS account.
   *
   * Expected backend flow:
   *
   * 1. Validate registration data.
   * 2. Check duplicate email/phone.
   * 3. Create user.
   * 4. Assign selected role.
   * 5. Create verification records.
   * 6. Send OTP.
   * 7. Return verification requirements.
   *
   * BRD: Sec. 24
   */
  register: async (
    payload: RegisterPayload,
  ): Promise<RegisterResponse> => {
    /*
     * TODO:
     *
     * return api.post<RegisterResponse>(
     *   '/auth/register',
     *   payload,
     * )
     */

    console.log('authenticationService.register', payload)

    return {
      userId: '',
      email: payload.email,
      phone: payload.phone,
      role: payload.role,
      otpRequired: true,
      emailVerificationRequired: true,
      phoneVerificationRequired: true,
      message:
        'Registration API is not connected yet.',
    }
  },

  /**
   * Verify an email or phone OTP.
   *
   * BRD: Sec. 24
   */
  verifyOtp: async (
    payload: VerifyOtpPayload,
  ): Promise<VerifyOtpResponse> => {
    /*
     * TODO:
     *
     * return api.post<VerifyOtpResponse>(
     *   '/auth/verify-otp',
     *   payload,
     * )
     */

    console.log('authenticationService.verifyOtp', payload)

    return {
      verified: false,
      verificationType: 'EMAIL',
      message:
        'OTP verification API is not connected yet.',
    }
  },

  /**
   * Resend an OTP.
   *
   * Backend should enforce:
   * - rate limiting
   * - expiry
   * - maximum resend attempts
   * - abuse protection
   */
  resendOtp: async (
    payload: ResendOtpPayload,
  ): Promise<ResendOtpResponse> => {
    /*
     * TODO:
     *
     * return api.post<ResendOtpResponse>(
     *   '/auth/resend-otp',
     *   payload,
     * )
     */

    console.log(
      'authenticationService.resendOtp',
      payload,
    )

    return {
      sent: false,
      expiresIn: 0,
      message:
        'OTP resend API is not connected yet.',
    }
  },

  /**
   * Authenticate an existing user.
   */
  login: async (
    payload: LoginPayload,
  ): Promise<AuthResponse> => {
    /*
     * TODO:
     *
     * return api.post<AuthResponse>(
     *   '/auth/login',
     *   payload,
     * )
     */

    console.log('authenticationService.login', payload)

    throw new Error(
      'Authentication API is not connected yet.',
    )
  },

  /**
   * Refresh an expired access token.
   *
   * Refresh tokens should preferably be handled through
   * secure httpOnly cookies by the backend.
   */
  refreshToken: async (
    payload: RefreshTokenPayload,
  ): Promise<AuthTokens> => {
    /*
     * TODO:
     *
     * return api.post<AuthTokens>(
     *   '/auth/refresh',
     *   payload,
     * )
     */

    console.log(
      'authenticationService.refreshToken',
      payload,
    )

    throw new Error(
      'Token refresh API is not connected yet.',
    )
  },

  /**
   * Get the currently authenticated user.
   *
   * Useful when restoring an authentication session after
   * a browser refresh.
   */
  me: async (): Promise<AuthUser> => {
    /*
     * TODO:
     *
     * return api.get<AuthUser>('/auth/me')
     */

    throw new Error(
      'Current-user API is not connected yet.',
    )
  },

  /**
   * Log the current user out.
   *
   * The backend should invalidate/revoke the refresh token
   * or active session where applicable.
   */
  logout: async (): Promise<void> => {
    /*
     * TODO:
     *
     * await api.post('/auth/logout')
     */

    return
  },

  /**
   * Request a password-reset email/SMS.
   */
  forgotPassword: async (
    payload: ForgotPasswordPayload,
  ): Promise<PasswordResetResponse> => {
    /*
     * TODO:
     *
     * return api.post<PasswordResetResponse>(
     *   '/auth/forgot-password',
     *   payload,
     * )
     */

    console.log(
      'authenticationService.forgotPassword',
      payload,
    )

    return {
      success: true,
      message:
        'If an account exists, password reset instructions will be sent.',
    }
  },

  /**
   * Reset a password using a valid reset token.
   */
  resetPassword: async (
    payload: ResetPasswordPayload,
  ): Promise<PasswordResetResponse> => {
    /*
     * TODO:
     *
     * return api.post<PasswordResetResponse>(
     *   '/auth/reset-password',
     *   payload,
     * )
     */

    console.log(
      'authenticationService.resetPassword',
      payload,
    )

    throw new Error(
      'Password reset API is not connected yet.',
    )
  },

  /**
   * Check whether an email is already registered.
   *
   * Useful during registration before submission.
   */
  checkEmailAvailability: async (
    email: string,
  ): Promise<{ available: boolean }> => {
    /*
     * TODO:
     *
     * return api.get<{ available: boolean }>(
     *   '/auth/check-email',
     *   { params: { email } },
     * )
     */

    console.log(
      'authenticationService.checkEmailAvailability',
      email,
    )

    return {
      available: true,
    }
  },

  /**
   * Check whether a phone number is already registered.
   */
  checkPhoneAvailability: async (
    phone: string,
  ): Promise<{ available: boolean }> => {
    /*
     * TODO:
     *
     * return api.get<{ available: boolean }>(
     *   '/auth/check-phone',
     *   { params: { phone } },
     * )
     */

    console.log(
      'authenticationService.checkPhoneAvailability',
      phone,
    )

    return {
      available: true,
    }
  },
}