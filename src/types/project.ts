export type ProjectType = 'family-home' | 'apartments' | 'commercial' | 'hospitality' | 'renovation' | 'community' | 'other'
export type PropertyType = 'duplex' | 'bungalow' | 'villa' | 'investment' | 'multi-family' | 'unsure'
export type LandStatus = 'owned' | 'searching' | 'design' | 'drawings' | 'contractor'
export type ProjectStage = 'idea' | 'land' | 'design' | 'approval' | 'construction' | 'finishing'
export type BudgetRange = 'starter' | 'family' | 'premium' | 'luxury'

export interface Project {
  id: string
  clientId: string
  clientName: string
  name: string
  status: 'active' | 'completed' | 'on-hold'

  // Fields your existing dashboard/ProjectCard/charts already expect
  escrowBalance: number
  progressPercent: number
  pendingApprovals: number

  // Fields the questionnaire produces
  projectType: ProjectType
  propertyType?: PropertyType
  location: { state: string; details?: string }
  landStatus: LandStatus
  stage: ProjectStage
  budgetRange?: BudgetRange
  style?: string[]
  priorities: string[]
  inspiration?: string
  notes?: string

  createdAt: string
  updatedAt: string
}