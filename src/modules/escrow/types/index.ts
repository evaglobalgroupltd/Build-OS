// Escrow module — domain types
// BRD reference: Sec. 18, Sec. 19, Sec. 22, Sec. 23
//
// Lean MVP custody model:
// Build OS tracks escrow status, payment workflows and financial records.
// Funds may be held by approved financial partners or moved via direct
// bank transfer. Build OS must not imply custody unless product/legal
// requirements change.
//
// These types represent the Escrow domain only.
// Cross-cutting entities such as User, Project, Milestone and Evidence
// remain in the root src/types directory.

export type EscrowCurrency = 'NGN' | 'USD'

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

/* -------------------------------------------------------------------------- */
/* Shared domain primitives                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Identifies the entity responsible for the funding/custody arrangement.
 *
 * `build_os` is retained for the MVP funding-source model, but its presence
 * does not by itself mean Build OS legally holds client funds.
 */
export interface EscrowFundingSource {
  fundingSource: FundingSource

  /**
   * Financial institution, approved escrow partner or other recorded
   * custody provider where applicable.
   */
  custodian?: string

  /**
   * External account, wallet or transfer reference where applicable.
   */
  accountReference?: string

  /**
   * Additional operational/compliance context.
   */
  notes?: string
}

/* -------------------------------------------------------------------------- */
/* Transactions                                                               */
/* -------------------------------------------------------------------------- */

export interface EscrowTransaction {
  id: string

  projectId: string

  type: EscrowEventType

  amount: number
  currency: EscrowCurrency

  /**
   * Human-readable milestone or financial event label.
   */
  milestoneLabel: string

  /**
   * ISO-8601 timestamp.
   */
  date: string

  fundingSource: FundingSource

  /**
   * Financial institution / escrow provider actually holding the funds,
   * where applicable.
   *
   * This field should not be populated merely because Build OS records
   * the transaction.
   */
  custodian?: string

  /**
   * External settlement, transfer or financial reference.
   */
  reference?: string

  description?: string
}

/* -------------------------------------------------------------------------- */
/* Escrow accounts                                                            */
/* -------------------------------------------------------------------------- */

export interface EscrowAccount {
  id: string

  projectId: string

  fundingSource: FundingSource

  /**
   * Actual custodian/provider, when applicable.
   */
  custodian?: string

  currency: EscrowCurrency

  totalDeposited: number
  totalReleased: number
  totalFrozen: number
  totalRefunded: number

  /**
   * Amount currently available according to the recorded escrow state.
   *
   * This is an application-level balance and should not be interpreted
   * as proof that Build OS itself holds the corresponding funds.
   */
  availableBalance: number

  createdAt: string
  updatedAt: string
}

/* -------------------------------------------------------------------------- */
/* Project wallets                                                            */
/* -------------------------------------------------------------------------- */

export interface ProjectWallet {
  id: string

  projectId: string

  type: WalletType

  allocatedAmount: number
  reservedAmount: number
  releasedAmount: number
  balance: number

  currency: EscrowCurrency

  createdAt: string
  updatedAt: string
}

/* -------------------------------------------------------------------------- */
/* Funding requests                                                           */
/* -------------------------------------------------------------------------- */

export interface FundingRequest {
  id: string

  projectId: string

  amount: number
  currency: EscrowCurrency

  fundingSource: FundingSource

  /**
   * Actual custodian/provider where applicable.
   */
  custodian?: string

  /**
   * Bank transfer, escrow provider or other external reference.
   */
  reference?: string

  status: FundingStatus

  requestedAt: string
  completedAt?: string

  createdBy: string
}

/* -------------------------------------------------------------------------- */
/* Payment requests                                                           */
/* -------------------------------------------------------------------------- */

export interface PaymentRequest {
  id: string

  projectId: string

  milestoneId: string
  milestoneLabel: string

  requestedAmount: number
  currency: EscrowCurrency

  /**
   * The payment beneficiary may be one of several participant types.
   *
   * At least one should normally be supplied by the backend according
   * to the project workflow.
   */
  contractorId?: string
  supplierId?: string
  professionalId?: string

  /**
   * Number of evidence records associated with this request.
   */
  evidenceCount: number

  status: PaymentRequestStatus

  submittedAt: string
  submittedBy: string

  notes?: string
}

/* -------------------------------------------------------------------------- */
/* Payment approvals                                                          */
/* -------------------------------------------------------------------------- */

export interface PaymentApproval {
  id: string

  paymentRequestId: string
  projectId: string

  status: PaymentApprovalStatus

  approvedBy?: string
  approvedAt?: string

  rejectedBy?: string
  rejectedAt?: string

  /**
   * Required when a payment is rejected.
   */
  reason?: string
}

/* -------------------------------------------------------------------------- */
/* Frozen payments                                                            */
/* -------------------------------------------------------------------------- */

export interface FrozenPayment {
  id: string

  paymentRequestId: string
  projectId: string

  amount: number
  currency: EscrowCurrency

  /**
   * Links the frozen payment to the dispute workflow where applicable.
   */
  disputeId?: string

  status: FrozenPaymentStatus

  frozenAt: string

  /**
   * Human-readable reason explaining why the payment was frozen.
   */
  reason: string

  releasedAt?: string
}

/* -------------------------------------------------------------------------- */
/* Refunds                                                                    */
/* -------------------------------------------------------------------------- */

export interface Refund {
  id: string

  projectId: string

  amount: number
  currency: EscrowCurrency

  reason: string

  status: RefundStatus

  requestedAt: string
  completedAt?: string

  beneficiaryName?: string
}

/* -------------------------------------------------------------------------- */
/* Escrow summary                                                             */
/* -------------------------------------------------------------------------- */

export interface EscrowSummary {
  totalBalance: number
  totalDeposited: number
  totalReleased: number
  totalFrozen: number
  totalRefunded: number

  activeProjects: number

  currency: EscrowCurrency
}