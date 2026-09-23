// Reports module — shared domain types
//
// BRD references:
// - Sec. 20: Reporting & Analytics
// - Sec. 22: Admin Control Centre
// - Sec. 28.1: Backend Services
//
// This module defines the shared reporting contract used by:
// - Report dashboards
// - Report detail views
// - Analytics
// - Governance and compliance controls
// - Export workflows
// - Reporting API services
//
// Keep report-specific UI state outside this file.
// These types represent domain/API data rather than presentation concerns.

/* -------------------------------------------------------------------------- */
/* Report classification                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Supported report domains across Build OS.
 */
export type ReportType =
  | 'project'
  | 'financial'
  | 'compliance'
  | 'audit'
  | 'management'

/**
 * Lifecycle state of a report.
 *
 * draft
 *   Report has been created but is not yet being generated.
 *
 * generating
 *   Report generation is currently in progress.
 *
 * completed
 *   Report has been successfully generated.
 *
 * failed
 *   Report generation failed and may require retry or investigation.
 */
export type ReportStatus =
  | 'draft'
  | 'generating'
  | 'completed'
  | 'failed'

/**
 * Supported report export formats.
 */
export type ExportFormat =
  | 'pdf'
  | 'xlsx'
  | 'csv'

/**
 * Lifecycle state of a report export job.
 */
export type ReportExportStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'

/* -------------------------------------------------------------------------- */
/* Report filters                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Shared filtering contract for report queries.
 *
 * The backend may support additional filters in the future without
 * requiring report-specific query structures.
 */
export interface ReportFilters {
  projectId?: string
  projectIds?: string[]

  startDate?: string
  endDate?: string

  reportType?: ReportType
  status?: ReportStatus

  generatedBy?: string

  search?: string
}

/* -------------------------------------------------------------------------- */
/* Base report                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Common metadata shared by every report domain.
 */
export interface BaseReport {
  id: string

  title: string
  description?: string

  type: ReportType
  status: ReportStatus

  generatedAt: string
  generatedBy: string

  createdAt: string
  updatedAt: string
}

/* -------------------------------------------------------------------------- */
/* Reporting dashboard                                                        */
/* -------------------------------------------------------------------------- */

/**
 * High-level reporting snapshot used by the central
 * Reports / Analytics dashboard.
 */
export interface ReportSummary {
  activeProjects: number
  completedProjects: number
  totalProjects: number

  portfolioValue: number
  totalBudget: number
  totalSpend: number

  escrowBalance: number

  openDisputes: number

  complianceScore: number
  auditEvents: number
}

/* -------------------------------------------------------------------------- */
/* Project reports                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Project-level operational and financial reporting data.
 *
 * Covers delivery progress, budget performance, milestones,
 * quality, compliance, risk, and unresolved issues.
 */
export interface ProjectReport extends BaseReport {
  projectId: string
  projectName: string

  progress: number

  budget: number
  spend: number
  remainingBudget: number

  milestonesCompleted: number
  totalMilestones: number

  riskScore: number
  qualityScore: number
  complianceScore: number

  openIssues: number
  openDisputes: number
}

/* -------------------------------------------------------------------------- */
/* Financial reports                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Financial and escrow reporting data.
 *
 * Amounts should be represented as numeric values in the API contract;
 * presentation layers are responsible for currency formatting.
 */
export interface FinancialReport extends BaseReport {
  escrowBalance: number

  releasedAmount: number
  reservedAmount: number
  frozenAmount: number
  refundedAmount: number

  totalSpend: number

  procurementSpend: number
  labourSpend: number
  professionalSpend: number
  contingencySpend: number
}

/* -------------------------------------------------------------------------- */
/* Compliance reports                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Compliance, identity, AML, and account-risk reporting data.
 */
export interface ComplianceReport extends BaseReport {
  complianceScore: number

  verifiedUsers: number
  pendingReviews: number
  rejectedApplications: number

  amlFlags: number
  riskAlerts: number

  suspendedAccounts: number
  expiredDocuments: number
}

/* -------------------------------------------------------------------------- */
/* Audit reports                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Governance and audit activity reporting data.
 */
export interface AuditReport extends BaseReport {
  eventCount: number

  criticalEvents: number
  warningEvents: number

  userActions: number
  escrowEvents: number
  disputeEvents: number
  complianceEvents: number
}

/* -------------------------------------------------------------------------- */
/* Management reports                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Executive portfolio reporting data.
 *
 * Intended for management-level dashboards and control-centre views.
 */
export interface ManagementReport extends BaseReport {
  activeProjects: number
  completedProjects: number
  delayedProjects: number

  portfolioValue: number
  budgetUtilization: number

  contractorCount: number
  supplierCount: number

  disputeCount: number
  complianceScore: number
}

/* -------------------------------------------------------------------------- */
/* Report exports                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Request used to generate a downloadable report.
 */
export interface ReportExportRequest {
  reportType: ReportType
  format: ExportFormat

  filters?: ReportFilters
}

/**
 * Persistent record of a generated report export.
 */
export interface ReportExport {
  id: string

  fileName: string

  reportType: ReportType
  format: ExportFormat

  createdAt: string
  createdBy: string

  downloadUrl?: string

  status: ReportExportStatus
}

/**
 * API response returned after requesting a report export.
 *
 * Kept separate from ReportExport so the API can evolve independently
 * from the persisted export-history model.
 */
export interface ReportExportResponse extends ReportExport {}

/* -------------------------------------------------------------------------- */
/* Reports dashboard aggregation                                              */
/* -------------------------------------------------------------------------- */

/**
 * Aggregated reporting workspace payload.
 *
 * This structure allows the reporting dashboard to consume a complete
 * reporting snapshot in a single response when the backend supports it.
 */
export interface ReportsDashboard {
  summary: ReportSummary

  projects: ProjectReport[]
  financials: FinancialReport[]
  compliance: ComplianceReport[]
  audits: AuditReport[]
  management: ManagementReport[]
}