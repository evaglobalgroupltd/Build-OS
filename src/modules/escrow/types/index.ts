// Escrow module — domain types
// BRD reference: Sec. 18, Sec. 19, Sec. 22, Sec. 23
//
// Lean MVP custody model:
// Build OS tracks escrow status and payment workflows.
// Funds may be held by approved financial partners or moved via
// direct bank transfer. Build OS must not imply custody unless
// product/legal requirements change.

export type EscrowEventType =
  | 'deposit'
  | 'release'
  | 'freeze'
  | 'refund'

export type FundingSource =
  | 'partner_escrow'
  | 'build_os'
  | 'direct_bank_transfer'

export type WalletType =
  | 'material'
  | 'labour'
  | 'professional'
  | 'monitoring'
  | 'contingency'
  | 'refund'

export type FundingStatus =
  | 'pending'
  | 'processing'
  | 'funded'
  | 'failed'
  | 'cancelled'

export type PaymentRequestStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'released'
  | 'frozen'

export type PaymentApprovalStatus =
  | 'pending'
  | 'approved'
  | 'rejected'

export type FrozenPaymentStatus =
  | 'active'
  | 'under_review'
  | 'released'
  | 'resolved'

export type RefundStatus =
  | 'pending'
  | 'approved'
  | 'processing'
  | 'completed'
  | 'rejected'

export interface EscrowFundingSource {
  fundingSource: FundingSource
  custodian?: string
  accountReference?: string
  notes?: string
}

export interface EscrowTransaction {
  id: string
  projectId: string
  type: EscrowEventType
  amount: number
  currency: 'NGN' | 'USD'
  milestoneLabel: string
  date: string
  fundingSource: FundingSource

  /**
   * Financial institution / escrow provider
   * actually holding the funds.
   */
  custodian?: string

  reference?: string
  description?: string
}

export interface EscrowAccount {
  id: string
  projectId: string

  fundingSource: FundingSource
  custodian?: string

  currency: 'NGN' | 'USD'

  totalDeposited: number
  totalReleased: number
  totalFrozen: number
  totalRefunded: number

  availableBalance: number

  createdAt: string
  updatedAt: string
}

export interface ProjectWallet {
  id: string
  projectId: string

  type: WalletType

  allocatedAmount: number
  reservedAmount: number
  releasedAmount: number
  balance: number

  currency: 'NGN' | 'USD'

  createdAt: string
  updatedAt: string
}

export interface FundingRequest {
  id: string
  projectId: string

  amount: number
  currency: 'NGN' | 'USD'

  fundingSource: FundingSource
  custodian?: string

  reference?: string

  status: FundingStatus

  requestedAt: string
  completedAt?: string

  createdBy: string
}

export interface PaymentRequest {
  id: string
  projectId: string

  milestoneId: string
  milestoneLabel: string

  requestedAmount: number
  currency: 'NGN' | 'USD'

  contractorId?: string
  supplierId?: string
  professionalId?: string

  evidenceCount: number

  status: PaymentRequestStatus

  submittedAt: string
  submittedBy: string

  notes?: string
}

export interface PaymentApproval {
  id: string

  paymentRequestId: string
  projectId: string

  status: PaymentApprovalStatus

  approvedBy?: string
  approvedAt?: string

  rejectedBy?: string
  rejectedAt?: string

  reason?: string
}

export interface FrozenPayment {
  id: string

  paymentRequestId: string
  projectId: string

  amount: number
  currency: 'NGN' | 'USD'

  disputeId?: string

  status: FrozenPaymentStatus

  frozenAt: string
  reason: string

  releasedAt?: string
}

export interface Refund {
  id: string
  projectId: string

  amount: number
  currency: 'NGN' | 'USD'

  reason: string

  status: RefundStatus

  requestedAt: string
  completedAt?: string

  beneficiaryName?: string
}

export interface EscrowSummary {
  totalBalance: number
  totalDeposited: number
  totalReleased: number
  totalFrozen: number
  totalRefunded: number

  activeProjects: number

  currency: 'NGN' | 'USD'
}