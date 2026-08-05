// Disputes module — domain types (BRD Sec. 19: Disputes)

export type DisputeStatus = 'open' | 'under_review' | 'resolved' | 'escalated'

export interface Dispute {
  id: string
  projectId: string
  category: string
  raisedBy: string
  respondent: string
  amount: number
  status: DisputeStatus
  openedDate: string
}
