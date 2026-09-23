// Admin module — API service layer
//
// BRD reference: Sec. 28.1
//
// This module is the single network boundary for Admin functionality.
// UI components, pages and hooks should never call fetch/axios directly.
//
// TODO:
// - Connect these methods to the shared API client once the backend
//   contract is finalised.
// - Replace placeholder return types with the canonical domain types.
// - Add server-side pagination, filtering and sorting.
// - Add appropriate error/permission handling.
// - Add request cancellation where long-running queries are introduced.

/**
 * Admin API response metadata.
 *
 * Keep pagination and request metadata here rather than coupling
 * individual pages to a specific HTTP client implementation.
 */
export interface AdminPagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

/**
 * Generic paginated response used by Admin directory-style endpoints.
 */
export interface AdminListResponse<T> {
  data: T[]
  pagination: AdminPagination
}

/**
 * Supported user account states.
 *
 * These are intentionally kept local to the Admin service until the
 * canonical shared domain types are established.
 */
export type AdminUserStatus =
  | 'active'
  | 'pending'
  | 'suspended'
  | 'deactivated'

/**
 * Minimal administrative user representation.
 *
 * TODO: replace with the canonical User type from @/types once the
 * backend contract has been established.
 */
export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  status: AdminUserStatus
  lastActivityAt?: string
}

/**
 * User directory query parameters.
 */
export interface AdminUserListParams {
  page?: number
  pageSize?: number
  search?: string
  role?: string
  status?: AdminUserStatus
}

/**
 * Platform-level configuration representation.
 *
 * TODO: replace with the canonical configuration contract.
 */
export interface PlatformSettings {
  id: string
  updatedAt: string
}

/**
 * Administrative service boundary.
 *
 * Keep network operations here so the rest of the Admin module remains
 * independent from fetch, axios, or any future HTTP implementation.
 */
export const adminService = {
  /**
   * Retrieve the administrative user directory.
   */
  async listUsers(
    _params?: AdminUserListParams,
  ): Promise<AdminListResponse<AdminUser>> {
    throw new Error(
      'adminService.listUsers() is not implemented until the Admin API contract is available.',
    )
  },

  /**
   * Retrieve a single administrative user.
   */
  async getUser(_id: string): Promise<AdminUser> {
    throw new Error(
      'adminService.getUser() is not implemented until the Admin API contract is available.',
    )
  },

  /**
   * Update administrative user status.
   */
  async updateUserStatus(
    _id: string,
    _status: AdminUserStatus,
  ): Promise<AdminUser> {
    throw new Error(
      'adminService.updateUserStatus() is not implemented until the Admin API contract is available.',
    )
  },

  /**
   * Retrieve platform-wide configuration.
   */
  async getSettings(): Promise<PlatformSettings> {
    throw new Error(
      'adminService.getSettings() is not implemented until the Admin API contract is available.',
    )
  },

  /**
   * Update platform-wide configuration.
   *
   * The payload is intentionally generic for now because the backend
   * configuration schema has not yet been established.
   */
  async updateSettings(
    _settings: Partial<PlatformSettings>,
  ): Promise<PlatformSettings> {
    throw new Error(
      'adminService.updateSettings() is not implemented until the Admin API contract is available.',
    )
  },

  /**
   * Health/readiness check for Admin infrastructure.
   *
   * Useful later for administrative dashboards without coupling the UI
   * directly to a health endpoint.
   */
  async getStatus(): Promise<{ available: boolean }> {
    throw new Error(
      'adminService.getStatus() is not implemented until the Admin API contract is available.',
    )
  },
} as const