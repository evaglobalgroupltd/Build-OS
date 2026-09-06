// Organizations module — shared domain types
//
// BRD reference: Sec. 4.2
//
// Keep organization-specific types in this module.
// Cross-cutting types such as User and UserRole should remain in
// the root src/types directory.

export type OrganizationStatus = 'active' | 'suspended' | 'pending'

export type OrganizationMemberStatus =
  | 'active'
  | 'invited'
  | 'suspended'
  | 'removed'

export type OrganizationRoleType = 'system' | 'custom'

export type OrganizationPermissionCategory =
  | 'organization'
  | 'projects'
  | 'finance'
  | 'procurement'
  | 'reports'
  | 'documents'
  | 'members'

export interface Organization {
  id: string
  name: string
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

  status: OrganizationStatus

  memberCount: number
  projectCount: number
  activeProjectCount?: number

  createdAt: string
  updatedAt: string
}

export interface OrganizationMember {
  id: string
  organizationId: string

  userId: string
  fullName: string
  email: string
  phone?: string
  avatarUrl?: string

  roleId: string
  roleName: string

  status: OrganizationMemberStatus

  joinedAt?: string
  invitedAt?: string
  lastActiveAt?: string
}

export interface OrganizationRole {
  id: string
  organizationId: string

  name: string
  description: string

  type: OrganizationRoleType

  permissions: string[]
  memberCount: number

  isDefault?: boolean
  isEditable?: boolean
  isDeletable?: boolean

  createdAt: string
  updatedAt: string
}

export interface OrganizationPermission {
  id: string
  key: string
  name: string
  description: string

  category: OrganizationPermissionCategory

  enabled?: boolean
}

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

export interface InviteOrganizationMemberInput {
  email: string
  roleId: string
  message?: string
}

export interface UpdateOrganizationMemberInput {
  roleId?: string
  status?: OrganizationMemberStatus
}

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