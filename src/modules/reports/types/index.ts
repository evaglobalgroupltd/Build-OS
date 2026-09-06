// Reports module — shared types
// BRD refs:
// Sec. 20 Reporting & Analytics
// Sec. 22 Admin Control Centre
// Sec. 28.1 Backend Services

export type ReportType =
  | 'project'
  | 'financial'
  | 'compliance'
  | 'audit'
  | 'management'

export type ReportStatus =
  | 'draft'
  | 'generating'
  | 'completed'
  | 'failed'

export type ExportFormat =
  | 'pdf'
  | 'xlsx'
  | 'csv'

export interface ReportFilters {
  projectId?: string
  projectIds?: string[]

  startDate?: string
  endDate?: string

  reportType?: ReportType

  status?: string

  generatedBy?: string

  search?: string
}

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

// =====================================
// Project Reports
// =====================================

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

// =====================================
// Financial Reports
// =====================================

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

// =====================================
// Compliance Reports
// =====================================

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

// =====================================
// Audit Reports
// =====================================

export interface AuditReport extends BaseReport {
  eventCount: number

  criticalEvents: number

  warningEvents: number

  userActions: number

  escrowEvents: number

  disputeEvents: number

  complianceEvents: number
}

// =====================================
// Management Reports
// =====================================

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

// =====================================
// Exports
// =====================================

export interface ReportExportRequest {
  reportType: ReportType

  format: ExportFormat

  filters?: ReportFilters
}

export interface ReportExport {
  id: string

  fileName: string

  reportType: ReportType

  format: ExportFormat

  createdAt: string

  createdBy: string

  downloadUrl?: string

  status:
    | 'pending'
    | 'processing'
    | 'completed'
    | 'failed'
}

// =====================================
// Dashboard Aggregation
// =====================================

export interface ReportsDashboard {
  summary: ReportSummary

  projects: ProjectReport[]

  financials: FinancialReport[]

  compliance: ComplianceReport[]

  audits: AuditReport[]

  management: ManagementReport[]
}