// Organizations module — shared domain types
//
// BRD reference: Sec. 4.2
//
// This module owns organization-specific domain contracts.
//
// Architecture:
// - Keep organization-specific types here.
// - Cross-cutting types such as User, UserRole and Project remain in
//   the root `src/types` directory.
// - These types must remain framework-agnostic.
// - UI-specific concerns such as icons, colors, labels, routes and
//   presentation classes belong in config/components, not here.


// ============================================================================
// Organization
// ============================================================================

export type OrganizationStatus =
  | 'active'
  | 'suspended'
  | 'pending'

export interface Organization {
  id: string

  /**
   * Display and legal identity.
   */
  name: string
  legalName?: string
  registrationNumber?: string
  description?: string

  /**
   * Organization branding.
   */
  logoUrl?: string
  website?: string

  /**
   * Primary organization contact details.
   */
  email?: string
  phone?: string

  /**
   * Registered/business location.
   */
  address?: string
  city?: string
  state?: string
  country?: string

  /**
   * Current organization lifecycle state.
   */
  status: OrganizationStatus

  /**
   * Aggregate organization metrics supplied by the API.
   */
  memberCount: number
  projectCount: number
  activeProjectCount?: number

  createdAt: string
  updatedAt: string
}


// ============================================================================
// Members
// ============================================================================

export type OrganizationMemberStatus =
  | 'active'
  | 'invited'
  | 'suspended'
  | 'removed'

export interface OrganizationMember {
  id: string
  organizationId: string
  userId: string

  /**
   * Snapshot information returned for convenient organization views.
   * The User entity remains the source of truth for global identity data.
   */
  fullName: string
  email: string
  phone?: string
  avatarUrl?: string

  /**
   * Organization-specific access assignment.
   */
  roleId: string
  roleName: string

  status: OrganizationMemberStatus

  joinedAt?: string
  invitedAt?: string
  lastActiveAt?: string
}


// ============================================================================
// Roles
// ============================================================================

export type OrganizationRoleType =
  | 'system'
  | 'custom'

export interface OrganizationRole {
  id: string
  organizationId: string

  name: string
  description: string

  /**
   * System roles are controlled by the platform.
   * Custom roles are configurable by authorized organization administrators.
   */
  type: OrganizationRoleType

  /**
   * Permission identifiers assigned to this role.
   *
   * These values should correspond to OrganizationPermission.id.
   */
  permissions: string[]

  memberCount: number

  /**
   * Optional policy metadata supplied by the backend.
   */
  isDefault?: boolean
  isEditable?: boolean
  isDeletable?: boolean

  createdAt: string
  updatedAt: string
}


// ============================================================================
// Permissions
// ============================================================================

export type OrganizationPermissionCategory =
  | 'organization'
  | 'projects'
  | 'finance'
  | 'procurement'
  | 'reports'
  | 'documents'
  | 'members'

export interface OrganizationPermission {
  id: string

  /**
   * Stable machine-readable permission identifier.
   *
   * Example:
   * `organization.members.manage`
   * `projects.milestones.verify`
   * `finance.escrow.approve`
   */
  key: string

  /**
   * Human-readable permission information.
   */
  name: string
  description: string

  category: OrganizationPermissionCategory

  /**
   * Presentation/helper state returned when permissions are mapped
   * against a selected role.
   *
   * This should not be interpreted as the user's effective authorization;
   * the backend remains authoritative.
   */
  enabled?: boolean
}


// ============================================================================
// Organization Profile
// ============================================================================

export interface UpdateOrganizationProfileInput {
  name?: string
  legalName?: string
  registrationNumber?: string
  description?: string

  logoUrl?: string
  website?: string

  email?: string
  phone?: string

  address?: string
  city?: string
  state?: string
  country?: string
}


// ============================================================================
// Member Management
// ============================================================================

export interface InviteOrganizationMemberInput {
  email: string
  roleId: string
  message?: string
}

export interface UpdateOrganizationMemberInput {
  roleId?: string
  status?: OrganizationMemberStatus
}


// ============================================================================
// Role Management
// ============================================================================

export interface CreateOrganizationRoleInput {
  name: string
  description: string
  permissionIds: string[]
}

export interface UpdateOrganizationRoleInput {
  name?: string
  description?: string
  permissionIds?: string[]
}


// ============================================================================
// Permission Management
// ============================================================================

/**
 * Payload used when replacing the complete permission set for a role.
 *
 * Kept separate from UpdateOrganizationRoleInput because the permissions
 * endpoint is an independent authorization boundary.
 */
export interface UpdateOrganizationRolePermissionsInput {
  permissionIds: string[]
}