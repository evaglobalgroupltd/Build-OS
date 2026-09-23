// Monitoring module — API service layer
// BRD references: Sec. 20.3 / 28.1 / 43
//
// This module is the single network boundary for Monitoring.
// UI components, hooks, and pages should consume this service rather
// than calling fetch/axios directly.
//
// Backend integration:
// Replace the request helper implementation with the application's
// shared API client once the Monitoring backend is available.

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

export type RiskSeverity =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'

export type RiskCategory =
  | 'budget'
  | 'timeline'
  | 'quality'
  | 'safety'
  | 'procurement'
  | 'other'

export type RiskStatus =
  | 'open'
  | 'acknowledged'
  | 'mitigating'
  | 'resolved'

/* -------------------------------------------------------------------------- */
/* Shared primitives                                                          */
/* -------------------------------------------------------------------------- */

export interface MonitoringDateRange {
  startDate?: string
  endDate?: string
}

/**
 * Standard pagination parameters.
 *
 * These are optional so the service remains compatible with endpoints
 * that initially return complete collections.
 */
export interface MonitoringPagination {
  page?: number
  limit?: number
}

/**
 * Generic paginated API response.
 *
 * The backend can adopt this shape later without requiring the UI
 * layer to know about transport-specific details.
 */
export interface MonitoringPaginatedResponse<T> {
  data: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Progress                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Project-level progress tracking.
 */
export interface ProjectProgress {
  projectId: string

  overallProgress: number

  plannedProgress: number
  actualProgress: number

  /**
   * Positive values indicate actual progress is ahead of plan.
   * Negative values indicate actual progress is behind plan.
   */
  variance: number

  startDate: string
  expectedCompletionDate: string

  milestonesCompleted: number
  milestonesTotal: number

  updatedAt: string
}

/* -------------------------------------------------------------------------- */
/* Monitoring reports                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Daily, weekly, or monthly monitoring report.
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
 * Parameters used when requesting monitoring reports.
 */
export interface MonitoringReportFilters
  extends MonitoringDateRange,
    MonitoringPagination {
  projectId?: string
  type?: MonitoringReportType
  status?: MonitoringReportStatus
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
 * Payload for updating an existing monitoring report.
 */
export type UpdateMonitoringReportPayload =
  Partial<CreateMonitoringReportPayload>

/* -------------------------------------------------------------------------- */
/* Inspections                                                                */
/* -------------------------------------------------------------------------- */

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
 * Parameters used when requesting inspections.
 */
export interface InspectionFilters
  extends MonitoringDateRange,
    MonitoringPagination {
  projectId?: string
  status?: InspectionStatus
  outcome?: InspectionOutcome
}

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

/* -------------------------------------------------------------------------- */
/* Risk alerts                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Budget, timeline, quality, safety, procurement, or operational risk.
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
 * Parameters used when requesting risk alerts.
 */
export interface RiskAlertFilters extends MonitoringPagination {
  projectId?: string
  category?: RiskCategory
  severity?: RiskSeverity
  status?: RiskStatus
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

/* -------------------------------------------------------------------------- */
/* API errors                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Normalized error shape exposed by the Monitoring service.
 *
 * UI components should not need to understand whether the backend
 * eventually uses fetch, Axios, or another HTTP client.
 */
export interface MonitoringApiError {
  message: string
  status?: number
  code?: string
  details?: unknown
}

/**
 * Creates a consistent error for the current unconnected state.
 *
 * Keeping this centralized prevents every service method from having
 * its own slightly different error message.
 */
const createNotConnectedError = (): Error =>
  new Error(
    'Monitoring API is not yet connected. Backend implementation pending.',
  )

/* -------------------------------------------------------------------------- */
/* Monitoring service                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Monitoring API service.
 *
 * This object intentionally contains no UI logic.
 *
 * Recommended future integration:
 *
 *   import { api } from '@/lib/api'
 *
 * Example:
 *
 *   getDashboard: (projectId) =>
 *     api.get<MonitoringDashboard>(
 *       `/monitoring/projects/${projectId}`,
 *     )
 *
 * Once the shared API client is connected, only this module should need
 * to know the Monitoring endpoint structure.
 */
export const monitoringService = {
  /* ---------------------------------------------------------------------- */
  /* Dashboard                                                              */
  /* ---------------------------------------------------------------------- */

  /**
   * Get the complete monitoring overview for a project.
   */
  async getDashboard(
    projectId: string,
  ): Promise<MonitoringDashboard> {
    void projectId

    throw createNotConnectedError()
  },

  /* ---------------------------------------------------------------------- */
  /* Progress                                                               */
  /* ---------------------------------------------------------------------- */

  /**
   * Get progress information for a project.
   */
  async getProgress(
    projectId: string,
  ): Promise<ProjectProgress> {
    void projectId

    throw createNotConnectedError()
  },

  /* ---------------------------------------------------------------------- */
  /* Reports                                                                */
  /* ---------------------------------------------------------------------- */

  /**
   * Get monitoring reports.
   */
  async listReports(
    filters?: MonitoringReportFilters,
  ): Promise<MonitoringReport[]> {
    void filters

    throw createNotConnectedError()
  },

  /**
   * Get a single monitoring report.
   */
  async getReport(
    reportId: string,
  ): Promise<MonitoringReport> {
    void reportId

    throw createNotConnectedError()
  },

  /**
   * Create a monitoring report.
   */
  async createReport(
    payload: CreateMonitoringReportPayload,
  ): Promise<MonitoringReport> {
    void payload

    throw createNotConnectedError()
  },

  /**
   * Update a monitoring report.
   */
  async updateReport(
    reportId: string,
    payload: UpdateMonitoringReportPayload,
  ): Promise<MonitoringReport> {
    void reportId
    void payload

    throw createNotConnectedError()
  },

  /* ---------------------------------------------------------------------- */
  /* Inspections                                                            */
  /* ---------------------------------------------------------------------- */

  /**
   * Get inspections.
   */
  async listInspections(
    filters?: InspectionFilters,
  ): Promise<Inspection[]> {
    void filters

    throw createNotConnectedError()
  },

  /**
   * Get a single inspection.
   */
  async getInspection(
    inspectionId: string,
  ): Promise<Inspection> {
    void inspectionId

    throw createNotConnectedError()
  },

  /**
   * Create a site inspection.
   */
  async createInspection(
    payload: CreateInspectionPayload,
  ): Promise<Inspection> {
    void payload

    throw createNotConnectedError()
  },

  /* ---------------------------------------------------------------------- */
  /* Risk alerts                                                            */
  /* ---------------------------------------------------------------------- */

  /**
   * Get active and historical risk alerts.
   */
  async listRiskAlerts(
    filters?: RiskAlertFilters,
  ): Promise<RiskAlert[]> {
    void filters

    throw createNotConnectedError()
  },

  /**
   * Get a single risk alert.
   */
  async getRiskAlert(
    riskId: string,
  ): Promise<RiskAlert> {
    void riskId

    throw createNotConnectedError()
  },

  /**
   * Create a risk alert.
   */
  async createRiskAlert(
    payload: CreateRiskAlertPayload,
  ): Promise<RiskAlert> {
    void payload

    throw createNotConnectedError()
  },

  /**
   * Acknowledge a risk alert.
   */
  async acknowledgeRiskAlert(
    riskId: string,
  ): Promise<RiskAlert> {
    void riskId

    throw createNotConnectedError()
  },

  /**
   * Resolve a risk alert.
   */
  async resolveRiskAlert(
    riskId: string,
  ): Promise<RiskAlert> {
    void riskId

    throw createNotConnectedError()
  },
} as const

export type MonitoringService = typeof monitoringService