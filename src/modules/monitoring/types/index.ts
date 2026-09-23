// Monitoring module — shared domain types
// BRD references: Sec. 20.3 / 43
//
// Monitoring-specific domain models live here.
// Cross-cutting application models such as User, UserRole,
// ProjectSummary, Project, Evidence, etc. belong in src/types.
//
// This module is intentionally transport-agnostic. API request/response
// concerns belong in monitoringService.ts.

/* -------------------------------------------------------------------------- */
/* Report                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Supported monitoring report periods.
 */
export type MonitoringReportType =
  | 'daily'
  | 'weekly'
  | 'monthly'

/**
 * Lifecycle state of a monitoring report.
 */
export type MonitoringReportStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'

/* -------------------------------------------------------------------------- */
/* Inspection                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Site inspection lifecycle.
 */
export type InspectionStatus =
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

/**
 * Current or final inspection outcome.
 */
export type InspectionOutcome =
  | 'pending'
  | 'passed'
  | 'attention_required'
  | 'failed'

/* -------------------------------------------------------------------------- */
/* Risk                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Risk categories monitored across a project.
 */
export type RiskCategory =
  | 'budget'
  | 'timeline'
  | 'quality'
  | 'safety'
  | 'procurement'
  | 'resource'
  | 'other'

/**
 * Severity used for risk prioritisation.
 */
export type RiskSeverity =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'

/**
 * Current lifecycle state of a risk alert.
 */
export type RiskStatus =
  | 'open'
  | 'acknowledged'
  | 'mitigating'
  | 'resolved'

/* -------------------------------------------------------------------------- */
/* Project health & progress                                                  */
/* -------------------------------------------------------------------------- */

/**
 * High-level health state of a monitored project.
 */
export type ProjectHealth =
  | 'healthy'
  | 'attention'
  | 'at_risk'
  | 'critical'

/**
 * Delivery classification derived from planned vs actual progress.
 */
export type ProgressStatus =
  | 'ahead'
  | 'on_track'
  | 'slightly_delayed'
  | 'delayed'
  | 'critical'

/**
 * Generic state used by dashboard metrics.
 */
export type MonitoringMetricStatus =
  | 'positive'
  | 'neutral'
  | 'warning'
  | 'negative'

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * A single metric displayed in the monitoring dashboard.
 */
export interface MonitoringMetric {
  id: string

  label: string
  value: number | string

  previousValue?: number | string
  change?: number

  unit?: string

  status?: MonitoringMetricStatus
}

/**
 * High-level monitoring overview for a project.
 *
 * This is intentionally an aggregate read model. It should not be treated
 * as the source of truth for individual reports, inspections, or risks.
 */
export interface MonitoringDashboard {
  projectId: string
  projectName: string

  health: ProjectHealth

  overallProgress: number
  plannedProgress: number
  actualProgress: number
  progressVariance: number

  budgetProgress: number
  timelineProgress: number
  qualityScore: number

  activeRisks: number
  criticalRisks: number

  upcomingInspections: number
  completedInspections: number

  metrics?: MonitoringMetric[]

  lastUpdated: string
}

/* -------------------------------------------------------------------------- */
/* Progress                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Historical planned-vs-actual progress point.
 */
export interface ProgressTimelinePoint {
  date: string

  plannedProgress: number
  actualProgress: number
}

/**
 * Project progress tracking data.
 */
export interface ProjectProgress {
  projectId: string

  overallProgress: number

  plannedProgress: number
  actualProgress: number

  /**
   * Positive = ahead of plan.
   * Negative = behind plan.
   */
  variance: number

  status: ProgressStatus

  startDate: string
  expectedCompletionDate: string

  milestonesCompleted: number
  milestonesTotal: number

  timeline?: ProgressTimelinePoint[]

  updatedAt: string
}

/* -------------------------------------------------------------------------- */
/* Work activities                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Lifecycle state of a work activity.
 */
export type WorkActivityStatus =
  | 'completed'
  | 'in_progress'
  | 'pending'

/**
 * Work activity recorded in a monitoring report.
 */
export interface WorkActivity {
  id: string

  description: string

  status: WorkActivityStatus

  notes?: string
}

/* -------------------------------------------------------------------------- */
/* Issues                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Lifecycle state of a monitoring issue.
 */
export type MonitoringIssueStatus =
  | 'open'
  | 'in_progress'
  | 'resolved'

/**
 * Project issue identified through monitoring.
 */
export interface MonitoringIssue {
  id: string

  title: string
  description?: string

  severity: RiskSeverity

  status: MonitoringIssueStatus

  createdAt: string
  resolvedAt?: string
}

/* -------------------------------------------------------------------------- */
/* Recommendations                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Priority assigned to a monitoring recommendation.
 */
export type MonitoringRecommendationPriority =
  | 'low'
  | 'medium'
  | 'high'

/**
 * Lifecycle state of a recommendation.
 */
export type MonitoringRecommendationStatus =
  | 'open'
  | 'in_progress'
  | 'implemented'

/**
 * Recommendation attached to a monitoring report or inspection.
 */
export interface MonitoringRecommendation {
  id: string

  description: string

  priority: MonitoringRecommendationPriority

  status: MonitoringRecommendationStatus

  createdAt: string
}

/* -------------------------------------------------------------------------- */
/* Monitoring reports                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Daily, weekly, or monthly project monitoring report.
 */
export interface MonitoringReport {
  id: string

  projectId: string

  type: MonitoringReportType

  title: string
  summary: string

  reportDate: string

  progressPercentage: number

  workCompleted: WorkActivity[]
  workPlanned: WorkActivity[]

  issues: MonitoringIssue[]
  recommendations: MonitoringRecommendation[]

  status: MonitoringReportStatus

  submittedBy: string
  submittedAt?: string

  createdAt: string
  updatedAt: string
}

/* -------------------------------------------------------------------------- */
/* Inspection findings                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Finding identified during a site inspection.
 */
export interface InspectionFinding {
  id: string

  title: string
  description: string

  severity: RiskSeverity

  resolved: boolean
  resolvedAt?: string

  /**
   * References to evidence records stored by the Evidence module.
   */
  evidenceIds?: string[]
}

/* -------------------------------------------------------------------------- */
/* Inspections                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Scheduled or completed project site inspection.
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

  findings: InspectionFinding[]

  recommendations: MonitoringRecommendation[]

  createdAt: string
  updatedAt: string
}

/* -------------------------------------------------------------------------- */
/* Risk alerts                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Risk alert generated through project monitoring, rules, or AI analysis.
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

  /**
   * Optional probability estimate represented as a percentage.
   *
   * Example:
   *   75 = 75% likelihood.
   */
  likelihood?: number

  /**
   * Optional impact score used by the risk engine.
   */
  impactScore?: number

  /**
   * Optional calculated risk score.
   */
  riskScore?: number

  mitigation?: string

  detectedAt: string

  acknowledgedAt?: string
  resolvedAt?: string

  createdAt: string
  updatedAt: string
}

/* -------------------------------------------------------------------------- */
/* Filters                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Filter parameters for monitoring reports.
 */
export interface MonitoringReportFilters {
  projectId?: string

  type?: MonitoringReportType
  status?: MonitoringReportStatus

  startDate?: string
  endDate?: string
}

/**
 * Filter parameters for inspections.
 */
export interface InspectionFilters {
  projectId?: string

  status?: InspectionStatus
  outcome?: InspectionOutcome

  startDate?: string
  endDate?: string
}

/**
 * Filter parameters for risk alerts.
 */
export interface RiskAlertFilters {
  projectId?: string

  category?: RiskCategory
  severity?: RiskSeverity
  status?: RiskStatus
}

/* -------------------------------------------------------------------------- */
/* Report write payloads                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Payload used when creating a monitoring report.
 */
export interface CreateMonitoringReportPayload {
  projectId: string

  type: MonitoringReportType

  title: string
  summary: string

  reportDate: string

  progressPercentage: number

  workCompleted?: WorkActivity[]
  workPlanned?: WorkActivity[]

  issues?: MonitoringIssue[]
  recommendations?: MonitoringRecommendation[]
}

/**
 * Payload used when updating a monitoring report.
 */
export type UpdateMonitoringReportPayload =
  Partial<CreateMonitoringReportPayload>

/* -------------------------------------------------------------------------- */
/* Inspection write payloads                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Payload used when creating an inspection.
 */
export interface CreateInspectionPayload {
  projectId: string

  title: string
  description?: string

  scheduledDate: string

  inspectorId?: string
}

/**
 * Payload used when updating an inspection.
 */
export type UpdateInspectionPayload =
  Partial<CreateInspectionPayload> & {
    status?: InspectionStatus
    outcome?: InspectionOutcome

    completedDate?: string

    findings?: InspectionFinding[]
    recommendations?: MonitoringRecommendation[]
  }

/* -------------------------------------------------------------------------- */
/* Risk write payloads                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Payload used when creating a risk alert.
 */
export interface CreateRiskAlertPayload {
  projectId: string

  title: string
  description: string

  category: RiskCategory
  severity: RiskSeverity

  impact?: string

  likelihood?: number
  impactScore?: number

  mitigation?: string
}

/**
 * Payload used when updating a risk alert.
 */
export type UpdateRiskAlertPayload =
  Partial<CreateRiskAlertPayload> & {
    status?: RiskStatus
  }