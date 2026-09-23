// Organizations module — API service layer
//
// BRD reference: Sec. 4.2
//
// Architecture:
// - This module is the single network boundary for Organizations.
// - UI components/pages must not call fetch/axios directly.
// - Authentication, base URL, interceptors and common HTTP behavior belong
//   to the shared API client (`@/lib/api`).
// - Domain types remain in ./types and are the source of truth.
//
// Backend endpoint assumptions:
//   GET    /organizations/me
//   PATCH  /organizations/me
//
//   GET    /organizations/me/members
//   GET    /organizations/me/members/:memberId
//   POST   /organizations/me/members/invite
//   PATCH  /organizations/me/members/:memberId
//   DELETE /organizations/me/members/:memberId
//
//   GET    /organizations/me/roles
//   GET    /organizations/me/roles/:roleId
//   POST   /organizations/me/roles
//   PATCH  /organizations/me/roles/:roleId
//   DELETE /organizations/me/roles/:roleId
//
//   GET    /organizations/me/permissions
//   GET    /organizations/me/roles/:roleId/permissions
//   PUT    /organizations/me/roles/:roleId/permissions
//
// TODO:
// Replace endpoint assumptions if the final backend contract differs.
// Do not move HTTP calls into pages/components when doing so.

import { api } from '@/lib/api'

import type {
  CreateOrganizationRoleInput,
  InviteOrganizationMemberInput,
  Organization,
  OrganizationMember,
  OrganizationPermission,
  OrganizationRole,
  UpdateOrganizationMemberInput,
  UpdateOrganizationProfileInput,
  UpdateOrganizationRoleInput,
} from './types'

const ORGANIZATIONS_BASE = '/organizations'

const endpoints = {
  current: `${ORGANIZATIONS_BASE}/me`,

  members: `${ORGANIZATIONS_BASE}/me/members`,
  member: (memberId: string) =>
    `${ORGANIZATIONS_BASE}/me/members/${memberId}`,
  inviteMember: `${ORGANIZATIONS_BASE}/me/members/invite`,

  roles: `${ORGANIZATIONS_BASE}/me/roles`,
  role: (roleId: string) =>
    `${ORGANIZATIONS_BASE}/me/roles/${roleId}`,
  rolePermissions: (roleId: string) =>
    `${ORGANIZATIONS_BASE}/me/roles/${roleId}/permissions`,

  permissions: `${ORGANIZATIONS_BASE}/me/permissions`,
} as const

export const organizationsService = {
  // ---------------------------------------------------------------------------
  // Organization
  // ---------------------------------------------------------------------------

  /**
   * Get the organization associated with the authenticated user.
   */
  get: async (): Promise<Organization> => {
    const response = await api.get<Organization>(endpoints.current)

    return response.data
  },

  /**
   * Update organization profile, branding and editable settings.
   */
  updateProfile: async (
    input: UpdateOrganizationProfileInput,
  ): Promise<Organization> => {
    const response = await api.patch<Organization>(
      endpoints.current,
      input,
    )

    return response.data
  },

  // ---------------------------------------------------------------------------
  // Members
  // ---------------------------------------------------------------------------

  /**
   * List members belonging to the current organization.
   */
  listMembers: async (): Promise<OrganizationMember[]> => {
    const response = await api.get<OrganizationMember[]>(
      endpoints.members,
    )

    return response.data
  },

  /**
   * Get a single organization member.
   */
  getMember: async (
    memberId: string,
  ): Promise<OrganizationMember> => {
    const response = await api.get<OrganizationMember>(
      endpoints.member(memberId),
    )

    return response.data
  },

  /**
   * Invite a new member to the organization.
   */
  inviteMember: async (
    input: InviteOrganizationMemberInput,
  ): Promise<OrganizationMember> => {
    const response = await api.post<OrganizationMember>(
      endpoints.inviteMember,
      input,
    )

    return response.data
  },

  /**
   * Update an organization member's role or status.
   */
  updateMember: async (
    memberId: string,
    input: UpdateOrganizationMemberInput,
  ): Promise<OrganizationMember> => {
    const response = await api.patch<OrganizationMember>(
      endpoints.member(memberId),
      input,
    )

    return response.data
  },

  /**
   * Remove a member from the organization.
   */
  removeMember: async (memberId: string): Promise<void> => {
    await api.delete(endpoints.member(memberId))
  },

  // ---------------------------------------------------------------------------
  // Roles
  // ---------------------------------------------------------------------------

  /**
   * List organization-level roles.
   */
  listRoles: async (): Promise<OrganizationRole[]> => {
    const response = await api.get<OrganizationRole[]>(
      endpoints.roles,
    )

    return response.data
  },

  /**
   * Get a single organization role.
   */
  getRole: async (roleId: string): Promise<OrganizationRole> => {
    const response = await api.get<OrganizationRole>(
      endpoints.role(roleId),
    )

    return response.data
  },

  /**
   * Create a custom organization role.
   */
  createRole: async (
    input: CreateOrganizationRoleInput,
  ): Promise<OrganizationRole> => {
    const response = await api.post<OrganizationRole>(
      endpoints.roles,
      input,
    )

    return response.data
  },

  /**
   * Update an organization role.
   */
  updateRole: async (
    roleId: string,
    input: UpdateOrganizationRoleInput,
  ): Promise<OrganizationRole> => {
    const response = await api.patch<OrganizationRole>(
      endpoints.role(roleId),
      input,
    )

    return response.data
  },

  /**
   * Delete a custom organization role.
   *
   * System roles should be rejected by the backend and should not be
   * removable from the organization layer.
   */
  deleteRole: async (roleId: string): Promise<void> => {
    await api.delete(endpoints.role(roleId))
  },

  // ---------------------------------------------------------------------------
  // Permissions
  // ---------------------------------------------------------------------------

  /**
   * List all permissions available to organization roles.
   */
  listPermissions: async (): Promise<OrganizationPermission[]> => {
    const response = await api.get<OrganizationPermission[]>(
      endpoints.permissions,
    )

    return response.data
  },

  /**
   * Get permissions currently assigned to a specific role.
   */
  getRolePermissions: async (
    roleId: string,
  ): Promise<OrganizationPermission[]> => {
    const response = await api.get<OrganizationPermission[]>(
      endpoints.rolePermissions(roleId),
    )

    return response.data
  },

  /**
   * Replace the complete permission set assigned to a role.
   *
   * The backend should treat this as an atomic replacement rather than
   * incrementally adding/removing individual permissions.
   */
  updateRolePermissions: async (
    roleId: string,
    permissionIds: string[],
  ): Promise<OrganizationRole> => {
    const response = await api.put<OrganizationRole>(
      endpoints.rolePermissions(roleId),
      { permissionIds },
    )

    return response.data
  },
} as const

/**
 * Useful when typing hooks, adapters or dependency-injected consumers
 * without manually duplicating the service contract.
 */
export type OrganizationsService = typeof organizationsService