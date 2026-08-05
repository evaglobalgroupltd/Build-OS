// Escrow module — domain types (BRD Sec. 18: Escrow & Wallets)

export type EscrowEventType = 'deposit' | 'release' | 'freeze' | 'refund'

export interface EscrowTransaction {
  id: string
  projectId: string
  type: EscrowEventType
  amount: number
  currency: 'NGN' | 'USD'
  milestoneLabel: string
  date: string
}
