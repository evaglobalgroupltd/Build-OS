// Projects module — domain types
//
// BRD references:
// - Sec. 16: Project Lifecycle
// - Sec. 16.2: Project Creation
// - Sec. 18: Project Execution / Milestones
// - Sec. 19.1: Change Requests
// - Sec. 20: Monitoring
// - Sec. 23: Project Documents / Digital Property Passport

/* -------------------------------------------------------------------------- */
/* Project lifecycle                                                           */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Project                                                                      */
/* -------------------------------------------------------------------------- */

export interface Project {
  id: string

  name: string
  location: string

  clientId: string
  clientName: string

  stage: ProjectStage

  budget: number
  currency: ProjectCurrency

  escrowBalance: number

  progressPercent: number

  contractorId?: string
  contractorName?: string

  projectManagerId?: string
  projectManagerName?: string

  startDate: string
  targetCompletionDate: string

  openDisputes: number
  pendingApprovals: number
}

/* -------------------------------------------------------------------------- */
/* Project currency                                                             */
/* -------------------------------------------------------------------------- */

export type ProjectCurrency = 'NGN' | 'USD'

/* -------------------------------------------------------------------------- */
/* Project team                                                                 */
/* -------------------------------------------------------------------------- */

export type ProjectTeamRole =
  | 'client'
  | 'project_manager'
  | 'contractor'
  | 'architect'
  | 'quantity_surveyor'
  | 'engineer'
  | 'site_supervisor'

export type ProjectTeamMemberStatus =
  | 'active'
  | 'invited'
  | 'inactive'

export interface ProjectTeamMember {
  id: string

  projectId: string
  userId: string

  name: string
  role: ProjectTeamRole

  organisation?: string
  email: string

  status: ProjectTeamMemberStatus
  verified: boolean

  responsibility?: string
  joinedAt?: string
}

/* -------------------------------------------------------------------------- */
/* Project documents                                                            */
/* -------------------------------------------------------------------------- */

export type ProjectDocumentStatus =
  | 'pending'
  | 'verified'
  | 'rejected'

export interface ProjectDocument {
  id: string

  projectId: string

  name: string
  documentType: string

  fileUrl: string

  uploadedAt: string
  uploadedBy: string

  status: ProjectDocumentStatus
}

/* -------------------------------------------------------------------------- */
/* Project timeline                                                             */
/* -------------------------------------------------------------------------- */

export type ProjectTimelineEventType =
  | 'project'
  | 'milestone'
  | 'approval'
  | 'procurement'
  | 'payment'
  | 'monitoring'
  | 'document'
  | 'change_request'
  | 'dispute'
  | 'team'

export type ProjectTimelineEventStatus =
  | 'completed'
  | 'pending'
  | 'attention'
  | 'info'

export interface ProjectTimelineEvent {
  id: string

  projectId: string

  type: ProjectTimelineEventType

  title: string
  description: string

  actorId: string
  actorName: string

  createdAt: string

  status?: ProjectTimelineEventStatus

  referenceType?: string
  referenceId?: string
}

/* -------------------------------------------------------------------------- */
/* Project settings                                                             */
/* -------------------------------------------------------------------------- */

export interface ProjectSettings {
  requireMilestoneEvidence: boolean
  requireClientApproval: boolean

  weeklyProgressReports: boolean

  projectNotifications: boolean
  milestoneAlerts: boolean
  paymentAlerts: boolean
  documentAlerts: boolean
}

/* -------------------------------------------------------------------------- */
/* Project milestones                                                           */
/* -------------------------------------------------------------------------- */

export type ProjectMilestoneStatus =
  | 'pending'
  | 'in_progress'
  | 'submitted'
  | 'under_review'
  | 'verified'
  | 'rejected'
  | 'completed'

export interface ProjectMilestone {
  id: string

  projectId: string

  name: string
  description?: string

  sequence: number

  status: ProjectMilestoneStatus

  progressPercent: number

  plannedStartDate?: string
  plannedEndDate?: string

  actualStartDate?: string
  actualEndDate?: string

  budgetAmount?: number
  currency?: ProjectCurrency

  requiresEvidence: boolean
  requiresApproval: boolean

  completedAt?: string
}

/* -------------------------------------------------------------------------- */
/* Project creation                                                            */
/* -------------------------------------------------------------------------- */

export interface ProjectBasics {
  name: string
  location: string
  clientId: string
}

export interface ProjectLandDetails {
  landAddress: string

  titleType?: string
  titleNumber?: string

  landSize?: string

  surveyPlanDocumentId?: string
  titleDocumentId?: string
}

export interface ProjectBuildingProfile {
  buildingType: string

  numberOfFloors?: number
  numberOfUnits?: number

  estimatedFloorArea?: number
  floorAreaUnit?: 'sqm' | 'sqft'

  bedrooms?: number
  bathrooms?: number

  description?: string
}

export interface ProjectServiceRequirements {
  electricity?: boolean
  water?: boolean
  drainage?: boolean
  internet?: boolean
  security?: boolean

  other?: string[]
}

export interface ProjectBudgetTimeline {
  budget: number
  currency: ProjectCurrency

  startDate: string
  targetCompletionDate: string
}

export type ProjectFinishingLevel =
  | 'basic'
  | 'standard'
  | 'premium'
  | 'luxury'

export interface ProjectFinishingDetails {
  level: ProjectFinishingLevel

  description?: string
}

export interface ProjectCreationDraft {
  basics: ProjectBasics
  land: ProjectLandDetails
  building: ProjectBuildingProfile
  services: ProjectServiceRequirements
  budgetTimeline: ProjectBudgetTimeline
  finishing: ProjectFinishingDetails

  documentIds: string[]
}

/* -------------------------------------------------------------------------- */
/* Project filters                                                              */
/* -------------------------------------------------------------------------- */

export interface ProjectListParams {
  stage?: ProjectStage
  search?: string

  page?: number
  pageSize?: number
}

export interface ProjectListResponse {
  data: Project[]
  total: number

  page: number
  pageSize: number
}