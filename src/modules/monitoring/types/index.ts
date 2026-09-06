// Monitoring module — shared domain types
// BRD references: Sec. 20.3 / 43
//
// Keep Monitoring-specific domain models in this file.
// Cross-cutting application models (User, UserRole, ProjectSummary, etc.)
// should remain in the root `src/types` directory.

/**
 * Supported monitoring report periods.
 */
export type MonitoringReportType = 'daily' | 'weekly' | 'monthly'

/**
 * Lifecycle state of a monitoring report.
 */
export type MonitoringReportStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'

/**
 * Site inspection lifecycle.
 */
export type InspectionStatus =
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

/**
 * Final or current inspection outcome.
 */
export type InspectionOutcome =
  | 'pending'
  | 'passed'
  | 'attention_required'
  | 'failed'

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
 * Risk severity used for alert prioritisation.
 */
export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical'

/**
 * Current lifecycle state of a risk alert.
 */
export type RiskStatus =
  | 'open'
  | 'acknowledged'
  | 'mitigating'
  | 'resolved'

/**
 * High-level project health state.
 */
export type ProjectHealth =
  | 'healthy'
  | 'attention'
  | 'at_risk'
  | 'critical'

/**
 * Progress classification based on planned vs actual progress.
 */
export type ProgressStatus =
  | 'ahead'
  | 'on_track'
  | 'slightly_delayed'
  | 'delayed'
  | 'critical'

/**
 * A single metric displayed on the monitoring dashboard.
 */
export interface MonitoringMetric {
  id: string

  label: string
  value: number | string

  previousValue?: number | string
  change?: number

  unit?: string

  status?: 'positive' | 'neutral' | 'warning' | 'negative'
}

/**
 * High-level monitoring overview for a project.
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

/**
 * A point in the historical project progress timeline.
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

  variance: number
  status: ProgressStatus

  startDate: string
  expectedCompletionDate: string

  milestonesCompleted: number
  milestonesTotal: number

  timeline?: ProgressTimelinePoint[]

  updatedAt: string
}

/**
 * Work activity recorded in a monitoring report.
 */
export interface WorkActivity {
  id: string

  description: string

  status: 'completed' | 'in_progress' | 'pending'

  notes?: string
}

/**
 * A project issue identified during monitoring.
 */
export interface MonitoringIssue {
  id: string

  title: string
  description?: string

  severity: RiskSeverity

  status: 'open' | 'in_progress' | 'resolved'

  createdAt: string
  resolvedAt?: string
}

/**
 * A recommendation attached to a monitoring report or inspection.
 */
export interface MonitoringRecommendation {
  id: string

  description: string

  priority: 'low' | 'medium' | 'high'

  status: 'open' | 'in_progress' | 'implemented'

  createdAt: string
}

/**
 * A daily, weekly, or monthly project monitoring report.
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

/**
 * A finding identified during an inspection.
 */
export interface InspectionFinding {
  id: string

  title: string
  description: string

  severity: RiskSeverity

  resolved: boolean
  resolvedAt?: string

  evidenceIds?: string[]
}

/**
 * A scheduled or completed project site inspection.
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

/**
 * A risk alert detected through project monitoring or AI analysis.
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

  likelihood?: number
  impactScore?: number
  riskScore?: number

  mitigation?: string

  detectedAt: string

  acknowledgedAt?: string
  resolvedAt?: string

  createdAt: string
  updatedAt: string
}

/**
 * Filter parameters shared by report list screens.
 */
export interface MonitoringReportFilters {
  projectId?: string

  type?: MonitoringReportType
  status?: MonitoringReportStatus

  startDate?: string
  endDate?: string
}

/**
 * Filter parameters for inspection screens.
 */
export interface InspectionFilters {
  projectId?: string

  status?: InspectionStatus
  outcome?: InspectionOutcome

  startDate?: string
  endDate?: string
}

/**
 * Filter parameters for risk alert screens.
 */
export interface RiskAlertFilters {
  projectId?: string

  category?: RiskCategory
  severity?: RiskSeverity
  status?: RiskStatus
}

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

/**
 * Payload used when creating a new inspection.
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