// Projects module — domain types
//
// BRD references:
// - Sec. 16: Project Lifecycle
// - Sec. 16.2: Project Creation
// - Sec. 18: Project Execution / Milestones
// - Sec. 19.1: Change Requests
// - Sec. 20: Monitoring
// - Sec. 23: Project Documents / Digital Property Passport
//
// Architecture:
// - Keep project-specific domain types in this module.
// - Cross-cutting types such as User, UserRole, Currency, etc.
//   should remain in the root src/types directory.
// - UI-specific display types should not be defined here.

/* -------------------------------------------------------------------------- */
/* Project lifecycle                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Canonical project lifecycle.
 *
 * draft
 *   → submitted
 *   → bidding
 *   → awarded
 *   → in_progress
 *   → monitoring
 *   → handover
 *   → completed
 *
 * disputed is an exceptional project state and may occur when
 * a project enters formal dispute resolution.
 */
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

/**
 * Lifecycle stages that represent active project execution.
 */
export type ActiveProjectStage =
  | 'bidding'
  | 'awarded'
  | 'in_progress'
  | 'monitoring'
  | 'handover'

/**
 * Lifecycle stages that represent terminal or exceptional states.
 */
export type TerminalProjectStage =
  | 'completed'
  | 'disputed'

/* -------------------------------------------------------------------------- */
/* Project                                                                     */
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

  /**
   * Funds currently held in project escrow.
   */
  escrowBalance: number

  /**
   * Overall project completion percentage.
   *
   * Expected range: 0–100.
   */
  progressPercent: number

  contractorId?: string
  contractorName?: string

  projectManagerId?: string
  projectManagerName?: string

  startDate: string
  targetCompletionDate: string

  /**
   * Number of unresolved project disputes.
   */
  openDisputes: number

  /**
   * Number of actions currently waiting for approval.
   */
  pendingApprovals: number
}

/* -------------------------------------------------------------------------- */
/* Project currency                                                            */
/* -------------------------------------------------------------------------- */

export type ProjectCurrency = 'NGN' | 'USD'

/* -------------------------------------------------------------------------- */
/* Project team                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Project-specific team roles.
 *
 * Platform-wide roles should remain in the shared UserRole type.
 */
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

  /**
   * Indicates whether the participant has completed
   * the required verification process.
   */
  verified: boolean

  responsibility?: string

  joinedAt?: string
}

/* -------------------------------------------------------------------------- */
/* Project documents                                                           */
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
/* Project timeline                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Categories represented in the project audit trail.
 */
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

  /**
   * ISO-8601 timestamp.
   */
  createdAt: string

  status?: ProjectTimelineEventStatus

  /**
   * Optional link to the domain record that generated
   * this timeline event.
   *
   * Examples:
   * milestone → milestone ID
   * document → document ID
   * dispute → dispute ID
   * change_request → change request ID
   */
  referenceType?: string
  referenceId?: string
}

/* -------------------------------------------------------------------------- */
/* Project settings                                                            */
/* -------------------------------------------------------------------------- */

export interface ProjectSettings {
  /**
   * Evidence must be submitted before a milestone
   * can proceed through its verification workflow.
   */
  requireMilestoneEvidence: boolean

  /**
   * Client approval is required before applicable
   * milestone/payment actions can proceed.
   */
  requireClientApproval: boolean

  /**
   * Enable scheduled weekly progress reporting.
   */
  weeklyProgressReports: boolean

  /**
   * General project-level notifications.
   */
  projectNotifications: boolean

  /**
   * Milestone lifecycle notifications.
   */
  milestoneAlerts: boolean

  /**
   * Payment and escrow notifications.
   */
  paymentAlerts: boolean

  /**
   * Project document notifications.
   */
  documentAlerts: boolean
}

/* -------------------------------------------------------------------------- */
/* Project milestones                                                         */
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

  /**
   * Position of the milestone within the project plan.
   */
  sequence: number

  status: ProjectMilestoneStatus

  /**
   * Expected range: 0–100.
   */
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
/* Project creation — Step 1: Basics                                         */
/* -------------------------------------------------------------------------- */

export interface ProjectBasics {
  name: string
  location: string
  clientId: string
}

/* -------------------------------------------------------------------------- */
/* Project creation — Step 2: Land details                                   */
/* -------------------------------------------------------------------------- */

export interface ProjectLandDetails {
  landAddress: string

  titleType?: string
  titleNumber?: string

  landSize?: string

  surveyPlanDocumentId?: string
  titleDocumentId?: string
}

/* -------------------------------------------------------------------------- */
/* Project creation — Step 3: Building profile                               */
/* -------------------------------------------------------------------------- */

export interface ProjectBuildingProfile {
  buildingType: string

  numberOfFloors?: number
  numberOfUnits?: number

  estimatedFloorArea?: number
  floorAreaUnit?: ProjectFloorAreaUnit

  bedrooms?: number
  bathrooms?: number

  description?: string
}

export type ProjectFloorAreaUnit =
  | 'sqm'
  | 'sqft'

/* -------------------------------------------------------------------------- */
/* Project creation — Step 4: Service requirements                            */
/* -------------------------------------------------------------------------- */

export interface ProjectServiceRequirements {
  electricity?: boolean
  water?: boolean
  drainage?: boolean
  internet?: boolean
  security?: boolean

  other?: string[]
}

/* -------------------------------------------------------------------------- */
/* Project creation — Step 5: Budget & timeline                              */
/* -------------------------------------------------------------------------- */

export interface ProjectBudgetTimeline {
  budget: number
  currency: ProjectCurrency

  startDate: string
  targetCompletionDate: string
}

/* -------------------------------------------------------------------------- */
/* Project creation — Step 6: Finishing                                      */
/* -------------------------------------------------------------------------- */

export type ProjectFinishingLevel =
  | 'basic'
  | 'standard'
  | 'premium'
  | 'luxury'

export interface ProjectFinishingDetails {
  level: ProjectFinishingLevel

  description?: string
}

/* -------------------------------------------------------------------------- */
/* Project creation — complete draft                                         */
/* -------------------------------------------------------------------------- */

/**
 * Complete project creation payload.
 *
 * Represents the structured data collected throughout
 * the multi-step project creation workflow.
 */
export interface ProjectCreationDraft {
  basics: ProjectBasics

  land: ProjectLandDetails

  building: ProjectBuildingProfile

  services: ProjectServiceRequirements

  budgetTimeline: ProjectBudgetTimeline

  finishing: ProjectFinishingDetails

  /**
   * IDs of documents already uploaded during creation.
   */
  documentIds: string[]
}

/* -------------------------------------------------------------------------- */
/* Project filters                                                             */
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