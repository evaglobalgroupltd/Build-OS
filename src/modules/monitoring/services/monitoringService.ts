// Monitoring module — API service layer
// BRD references: Sec. 20.3 / 28.1 / 43
//
// This file is the single network boundary for the Monitoring module.
// Pages and UI components should consume this service instead of calling
// fetch/axios directly.
//
// TODO: Replace the mock-ready contracts below with real HTTP calls once
// the Monitoring backend API is available.

export type MonitoringReportType = 'daily' | 'weekly' | 'monthly'

export type MonitoringReportStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'

export type InspectionStatus =
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

export type InspectionOutcome =
  | 'passed'
  | 'attention_required'
  | 'failed'
  | 'pending'

export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical'

export type RiskCategory =
  | 'budget'
  | 'timeline'
  | 'quality'
  | 'safety'
  | 'procurement'
  | 'other'

export type RiskStatus = 'open' | 'acknowledged' | 'mitigating' | 'resolved'

/**
 * High-level monitoring information for a project.
 */
export interface MonitoringDashboard {
  projectId: string
  projectName: string

  overallProgress: number
  budgetProgress: number
  timelineProgress: number
  qualityScore: number

  activeRisks: number
  criticalRisks: number

  upcomingInspections: number
  completedInspections: number

  lastUpdated: string
}

/**
 * Project progress tracking data.
 */
export interface ProjectProgress {
  projectId: string
  overallProgress: number

  plannedProgress: number
  actualProgress: number

  variance: number

  startDate: string
  expectedCompletionDate: string

  milestonesCompleted: number
  milestonesTotal: number

  updatedAt: string
}

/**
 * Daily, weekly, and monthly site report.
 */
export interface MonitoringReport {
  id: string
  projectId: string

  type: MonitoringReportType

  title: string
  summary: string

  reportDate: string

  progressPercentage: number

  workCompleted: string[]
  workPlanned: string[]

  issues: string[]
  recommendations: string[]

  status: MonitoringReportStatus

  submittedBy: string
  submittedAt?: string

  createdAt: string
  updatedAt: string
}

/**
 * Site inspection record.
 */
export interface Inspection {
  id: string
  projectId: string

  title: string
  description?: string

  scheduledDate: string
  completedDate?: string

  inspectorId?: string
  inspectorName?: string

  status: InspectionStatus
  outcome: InspectionOutcome

  findings: string[]
  recommendations: string[]

  createdAt: string
  updatedAt: string
}

/**
 * Budget, timeline, quality, or operational risk alert.
 */
export interface RiskAlert {
  id: string
  projectId: string

  title: string
  description: string

  category: RiskCategory
  severity: RiskSeverity
  status: RiskStatus

  impact?: string
  mitigation?: string

  detectedAt: string
  resolvedAt?: string

  createdAt: string
  updatedAt: string
}

/**
 * Parameters used when requesting reports.
 */
export interface MonitoringReportFilters {
  projectId?: string
  type?: MonitoringReportType
  status?: MonitoringReportStatus

  startDate?: string
  endDate?: string
}

/**
 * Parameters used when requesting inspections.
 */
export interface InspectionFilters {
  projectId?: string
  status?: InspectionStatus
  outcome?: InspectionOutcome

  startDate?: string
  endDate?: string
}

/**
 * Parameters used when requesting risk alerts.
 */
export interface RiskAlertFilters {
  projectId?: string
  category?: RiskCategory
  severity?: RiskSeverity
  status?: RiskStatus
}

/**
 * Payload for creating a monitoring report.
 */
export interface CreateMonitoringReportPayload {
  projectId: string
  type: MonitoringReportType

  title: string
  summary: string

  reportDate: string

  progressPercentage: number

  workCompleted?: string[]
  workPlanned?: string[]

  issues?: string[]
  recommendations?: string[]
}

/**
 * Payload for updating a monitoring report.
 */
export type UpdateMonitoringReportPayload =
  Partial<CreateMonitoringReportPayload>

/**
 * Payload for creating a site inspection.
 */
export interface CreateInspectionPayload {
  projectId: string

  title: string
  description?: string

  scheduledDate: string
  inspectorId?: string
}

/**
 * Payload for creating a risk alert.
 */
export interface CreateRiskAlertPayload {
  projectId: string

  title: string
  description: string

  category: RiskCategory
  severity: RiskSeverity

  impact?: string
  mitigation?: string
}

/**
 * Monitoring API service.
 *
 * Replace the TODO sections with the application's shared API client,
 * for example:
 *
 * import { api } from '@/lib/api'
 *
 * Then implement:
 *
 * getDashboard: (projectId) =>
 *   api.get<MonitoringDashboard>(`/monitoring/projects/${projectId}`)
 */
export const monitoringService = {
  /**
   * Get the complete monitoring overview for a project.
   */
  getDashboard: async (
    projectId: string,
  ): Promise<MonitoringDashboard> => {
    void projectId

    throw new Error(
      'Monitoring API is not yet connected. Backend implementation pending.',
    )
  },

  /**
   * Get progress information for a project.
   */
  getProgress: async (
    projectId: string,
  ): Promise<ProjectProgress> => {
    void projectId

    throw new Error(
      'Monitoring API is not yet connected. Backend implementation pending.',
    )
  },

  /**
   * Get all monitoring reports.
   */
  listReports: async (
    filters?: MonitoringReportFilters,
  ): Promise<MonitoringReport[]> => {
    void filters

    throw new Error(
      'Monitoring API is not yet connected. Backend implementation pending.',
    )
  },

  /**
   * Get a single monitoring report.
   */
  getReport: async (
    reportId: string,
  ): Promise<MonitoringReport> => {
    void reportId

    throw new Error(
      'Monitoring API is not yet connected. Backend implementation pending.',
    )
  },

  /**
   * Create a monitoring report.
   */
  createReport: async (
    payload: CreateMonitoringReportPayload,
  ): Promise<MonitoringReport> => {
    void payload

    throw new Error(
      'Monitoring API is not yet connected. Backend implementation pending.',
    )
  },

  /**
   * Update a monitoring report.
   */
  updateReport: async (
    reportId: string,
    payload: UpdateMonitoringReportPayload,
  ): Promise<MonitoringReport> => {
    void reportId
    void payload

    throw new Error(
      'Monitoring API is not yet connected. Backend implementation pending.',
    )
  },

  /**
   * Get all inspections.
   */
  listInspections: async (
    filters?: InspectionFilters,
  ): Promise<Inspection[]> => {
    void filters

    throw new Error(
      'Monitoring API is not yet connected. Backend implementation pending.',
    )
  },

  /**
   * Get a single inspection.
   */
  getInspection: async (
    inspectionId: string,
  ): Promise<Inspection> => {
    void inspectionId

    throw new Error(
      'Monitoring API is not yet connected. Backend implementation pending.',
    )
  },

  /**
   * Create a new site inspection.
   */
  createInspection: async (
    payload: CreateInspectionPayload,
  ): Promise<Inspection> => {
    void payload

    throw new Error(
      'Monitoring API is not yet connected. Backend implementation pending.',
    )
  },

  /**
   * Get all active and historical risk alerts.
   */
  listRiskAlerts: async (
    filters?: RiskAlertFilters,
  ): Promise<RiskAlert[]> => {
    void filters

    throw new Error(
      'Monitoring API is not yet connected. Backend implementation pending.',
    )
  },

  /**
   * Get a single risk alert.
   */
  getRiskAlert: async (
    riskId: string,
  ): Promise<RiskAlert> => {
    void riskId

    throw new Error(
      'Monitoring API is not yet connected. Backend implementation pending.',
    )
  },

  /**
   * Create a risk alert.
   */
  createRiskAlert: async (
    payload: CreateRiskAlertPayload,
  ): Promise<RiskAlert> => {
    void payload

    throw new Error(
      'Monitoring API is not yet connected. Backend implementation pending.',
    )
  },

  /**
   * Mark a risk alert as acknowledged.
   */
  acknowledgeRiskAlert: async (
    riskId: string,
  ): Promise<RiskAlert> => {
    void riskId

    throw new Error(
      'Monitoring API is not yet connected. Backend implementation pending.',
    )
  },

  /**
   * Resolve a risk alert.
   */
  resolveRiskAlert: async (
    riskId: string,
  ): Promise<RiskAlert> => {
    void riskId

    throw new Error(
      'Monitoring API is not yet connected. Backend implementation pending.',
    )
  },
}