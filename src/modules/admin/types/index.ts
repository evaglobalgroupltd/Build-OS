 // Admin module — shared domain types
 //
 // BRD reference: Sec. 39
 //
 // Keep Admin-specific domain types in this file.
 // Cross-cutting types such as User, UserRole, Project, etc. belong
 // in the root `src/types` and should be imported here when required.
 //
 // This file contains no API or UI concerns.

import type { UserRole } from '@/types'

/* -------------------------------------------------------------------------- */
/* User Administration                                                        */
/* -------------------------------------------------------------------------- */

export type AdminUserStatus =
  | 'active'
  | 'pending'
  | 'suspended'
  | 'deactivated'

export interface AdminUserSummary {
  id: string
  name: string
  email: string
  role: UserRole
  status: AdminUserStatus
  lastActivityAt?: string
  createdAt: string
}

export interface AdminUserDetails extends AdminUserSummary {
  phone?: string
  avatarUrl?: string
  emailVerified: boolean
  twoFactorEnabled: boolean
  lastLoginAt?: string
  updatedAt: string
}

export interface AdminUserFilters {
  search?: string
  role?: UserRole
  status?: AdminUserStatus
}

/* -------------------------------------------------------------------------- */
/* Audit Logs                                                                 */
/* -------------------------------------------------------------------------- */

export type AuditAction =
  | 'created'
  | 'updated'
  | 'deleted'
  | 'viewed'
  | 'approved'
  | 'rejected'
  | 'invited'
  | 'activated'
  | 'suspended'
  | 'deactivated'
  | 'login'
  | 'logout'
  | 'permission_changed'
  | 'settings_changed'

export type AuditSeverity =
  | 'info'
  | 'warning'
  | 'critical'

export interface AuditLogEntry {
  id: string
  action: AuditAction
  severity: AuditSeverity
  actorId?: string
  actorName?: string
  actorRole?: UserRole
  resourceType?: string
  resourceId?: string
  resourceName?: string
  description: string
  ipAddress?: string
  createdAt: string
}

export interface AuditLogFilters {
  search?: string
  action?: AuditAction
  severity?: AuditSeverity
  actorId?: string
  resourceType?: string
  from?: string
  to?: string
}

/* -------------------------------------------------------------------------- */
/* Compliance                                                                 */
/* -------------------------------------------------------------------------- */

export type ComplianceStatus =
  | 'compliant'
  | 'partially_compliant'
  | 'non_compliant'
  | 'not_assessed'

export type ComplianceRiskLevel =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'

export interface ComplianceControl {
  id: string
  name: string
  description?: string
  status: ComplianceStatus
  riskLevel: ComplianceRiskLevel
  ownerId?: string
  lastReviewedAt?: string
  nextReviewAt?: string
}

export interface ComplianceSummary {
  score?: number
  totalControls: number
  compliantControls: number
  openExceptions: number
  overdueReviews: number
  status: ComplianceStatus
  updatedAt?: string
}

export interface ComplianceException {
  id: string
  controlId: string
  title: string
  description?: string
  riskLevel: ComplianceRiskLevel
  ownerId?: string
  dueAt?: string
  resolvedAt?: string
}

/* -------------------------------------------------------------------------- */
/* Platform Settings                                                          */
/* -------------------------------------------------------------------------- */

export interface PlatformSettings {
  id: string
  platformName?: string
  defaultLocale?: string
  defaultTimezone?: string
  maintenanceMode: boolean
  updatedAt: string
  updatedBy?: string
}

export interface PlatformSettingsChange {
  id: string
  setting: string
  previousValue?: unknown
  newValue?: unknown
  changedBy: string
  changedAt: string
}

/* -------------------------------------------------------------------------- */
/* Administrative Overview                                                    */
/* -------------------------------------------------------------------------- */

export interface AdminOverviewMetrics {
  totalUsers: number
  activeUsers: number
  pendingUsers: number
  suspendedUsers: number
  auditEventsToday: number
  openComplianceExceptions: number
}

export interface AdminModuleStatus {
  available: boolean
  lastUpdatedAt?: string
}

/* -------------------------------------------------------------------------- */
/* Shared Admin Pagination                                                    */
/* -------------------------------------------------------------------------- */

export interface AdminPagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}