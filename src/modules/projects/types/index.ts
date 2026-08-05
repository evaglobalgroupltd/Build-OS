// Projects module — domain types (BRD Sec. 16: Project Lifecycle)

export type ProjectStage =
  | 'draft'
  | 'submitted'
  | 'bidding'
  | 'awarded'
  | 'in_progress'
  | 'monitoring'
  | 'handover'
  | 'completed'
  | 'disputed'

export interface Project {
  id: string
  name: string
  location: string
  clientId: string
  clientName: string
  stage: ProjectStage
  budget: number
  currency: 'NGN' | 'USD'
  escrowBalance: number
  progressPercent: number
  contractorName?: string
  startDate: string
  targetCompletionDate: string
  openDisputes: number
  pendingApprovals: number
}
