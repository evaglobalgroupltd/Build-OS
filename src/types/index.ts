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
