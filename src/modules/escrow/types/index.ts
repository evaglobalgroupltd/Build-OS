// Escrow module — domain types (BRD Sec. 18: Escrow & Wallets)
//
// IMPORTANT: per the BRD's Lean MVP scope, Build OS does not take custody
// of client funds initially. Every payment-related type/component needs to
// make that explicit rather than implying Build OS itself holds money —
// see FundingSource below and <CustodyNotice />.

export type EscrowEventType = 'deposit' | 'release' | 'freeze' | 'refund'

/** Who actually holds the money. Never assume 'build_os' in copy or defaults. */
export type FundingSource = 'partner_escrow' | 'build_os' | 'direct_bank_transfer'

export interface EscrowTransaction {
  id: string
  projectId: string
  type: EscrowEventType
  amount: number
  currency: 'NGN' | 'USD'
  milestoneLabel: string
  date: string
  fundingSource: FundingSource
  /** Name of the partner bank/escrow provider actually holding the funds */
  custodian?: string
}