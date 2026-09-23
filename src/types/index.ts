// Root-level types: cross-cutting types shared across many modules.
// Module-specific domain types (Project, Bid, EscrowTransaction, Dispute,
// MaterialRequest, ...) live inside their owning module's `types/` folder —
// see src/modules/*/types/index.ts.

export type UserRole =
  | 'client'
  | 'diaspora_client'
  | 'contractor'
  | 'market_place'
  | 'project_manager'
  | 'professional'
  | 'admin'

// Sub-type for the generic 'professional' role only. 'contractor' and
// 'project_manager' are their own top-level UserRole (they have dedicated
// dashboards at /app/contractor and /app/pm), so they are NOT included here.
export type ProfessionalType =
  | 'architect'
  | 'engineer'
  | 'surveyor'
  | 'artisan'
  | 'other_professional'

export type VerificationStatus =
  | 'unverified'
  | 'pending'
  | 'verified'
  | 'rejected'
  | 'resubmission_required'

export interface User {
  id: string
  fullName: string
  email: string
  role: UserRole
  // Only set (and only meaningful) when role === 'professional'.
  professionalType?: ProfessionalType
  avatarInitials: string
  verificationStatus: VerificationStatus
  trustScore: number // 0-100, see Section 15.4
  country: string
}

export interface NavItem {
  label: string
  path: string
  icon: string
}