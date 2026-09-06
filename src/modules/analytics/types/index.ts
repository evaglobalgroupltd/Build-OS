// Analytics module — shared domain types
//
// Analytics-specific types live here.
// Cross-cutting application types such as User, UserRole, Project,
// Contractor, Supplier/MarketplaceUser, etc. should remain in src/types.
//
// These interfaces are intentionally frontend-friendly and can later be
// mapped directly from API/DTO responses.

export type AnalyticsPeriod =
  | 'today'
  | '7d'
  | '30d'
  | '90d'
  | '12m'
  | 'custom'

export type AnalyticsTrend =
  | 'up'
  | 'down'
  | 'neutral'

export type AnalyticsChangeType =
  | 'positive'
  | 'negative'
  | 'neutral'

export type RiskSeverity =
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'

export type ProjectHealth =
  | 'healthy'
  | 'at-risk'
  | 'delayed'
  | 'completed'

export type ProjectStage =
  | 'draft'
  | 'under-review'
  | 'bidding'
  | 'contracted'
  | 'in-progress'
  | 'inspection'
  | 'handover'
  | 'completed'
  | 'disputed'

export interface AnalyticsDateRange {
  from: string
  to: string
  period: AnalyticsPeriod
}

export interface AnalyticsMetric {
  label: string
  value: string | number
  description?: string
  change?: string
  changeValue?: number
  changeType?: AnalyticsChangeType
  trend?: AnalyticsTrend
}

export interface AnalyticsSeriesPoint {
  label: string
  value: number
  previousValue?: number
  date?: string
}

export interface AnalyticsSeries {
  name: string
  data: AnalyticsSeriesPoint[]
}

export interface ProjectAnalyticsSummary {
  activeProjects: number
  completedProjects: number
  atRiskProjects: number
  delayedProjects: number
  totalProjectValue: number
  averageProjectDurationDays: number
  onTimeDeliveryRate: number
  milestoneCompletionRate: number
  budgetPerformanceRate: number
  inspectionComplianceRate: number
  reportingComplianceRate: number
  handoverSuccessRate: number
}

export interface ProjectAnalyticsItem {
  id: string
  name: string
  location?: string
  contractorName?: string
  projectStage: ProjectStage
  health: ProjectHealth
  progress: number
  budget: number
  spent?: number
  budgetVariance?: number
  milestoneCompletion?: number
  startDate?: string
  expectedCompletionDate?: string
  actualCompletionDate?: string
}

export interface ProjectLifecycleMetric {
  stage: ProjectStage
  count: number
  percentage: number
}

export interface MilestoneAnalytics {
  total: number
  completed: number
  pending: number
  atRisk: number
  overdue: number
  completionRate: number
}

export interface FinancialAnalyticsSummary {
  totalRevenue: number
  totalProjectValue: number
  escrowVolume: number
  escrowBalance: number
  pendingReleases: number
  releasedPayments: number
  frozenFunds: number
  refundedAmount: number
  procurementSpend: number
  averageTransactionValue: number
}

export interface FinancialTrend {
  period: string
  revenue: number
  escrowVolume: number
  projectSpend: number
  procurementSpend: number
}

export interface ContractorAnalyticsSummary {
  totalContractors: number
  verifiedContractors: number
  activeContractors: number
  contractorsWithActiveProjects: number
  averageTrustScore: number
  averageBidWinRate: number
  averageOnTimeRate: number
  averageMilestoneCompletionRate: number
  disputeRate: number
}

export interface ContractorPerformance {
  contractorId: string
  contractorName: string
  trustScore: number
  projectsCompleted: number
  activeProjects: number
  onTimeRate: number
  milestoneCompletionRate: number
  disputeRate: number
  averageRating?: number
  totalContractValue?: number
}

export interface MarketplaceAnalyticsSummary {
  activeMarketplaceUsers: number
  verifiedMarketplaceUsers: number
  activeListings: number
  activeProducts: number
  quotationRequests: number
  quotationsSubmitted: number
  ordersPlaced: number
  ordersDelivered: number
  totalMarketplaceValue: number
  averageOrderValue: number
  deliverySuccessRate: number
}

export interface MarketplacePerformance {
  marketplaceUserId: string
  marketplaceUserName: string
  listings: number
  quotations: number
  orders: number
  completedOrders: number
  cancelledOrders: number
  deliveryRate: number
  rating?: number
  totalTransactionValue: number
}

export interface RiskAnalyticsSummary {
  activeRisks: number
  criticalRisks: number
  highRisks: number
  mediumRisks: number
  lowRisks: number
  projectsAtRisk: number
  estimatedExposure: number
  disputesExposure: number
  overallRiskScore: number
}

export interface RiskCategory {
  category: string
  count: number
  percentage: number
  severity: RiskSeverity
}

export interface ProjectRisk {
  id: string
  title: string
  projectId: string
  projectName: string
  description: string
  category: string
  severity: RiskSeverity
  probability: number
  impact: number
  exposure?: number
  detectedAt: string
  resolvedAt?: string
  status: 'open' | 'mitigating' | 'resolved'
}

export interface RiskTrend {
  category: string
  current: number
  previous: number
  trend: AnalyticsTrend
}

export interface DisputeAnalytics {
  totalDisputes: number
  openDisputes: number
  resolvedDisputes: number
  frozenAmount: number
  disputedValue: number
  averageResolutionDays: number
  resolutionRate: number
}

export interface VerificationAnalytics {
  totalSubmitted: number
  approved: number
  rejected: number
  pending: number
  requiringInformation: number
  approvalRate: number
  averageReviewTimeHours: number
}

export interface ComplianceAnalytics {
  projectsCompliant: number
  projectsWithMissingDocuments: number
  overdueReports: number
  pendingInspections: number
  complianceRate: number
}

export interface PlatformAnalyticsSummary {
  users: number
  verifiedUsers: number
  activeProjects: number
  completedProjects: number
  projectValue: number
  escrowVolume: number
  marketplaceVolume: number
  activeDisputes: number
  platformRevenue: number
  overallRiskScore: number
}

export interface AnalyticsDashboardData {
  period: AnalyticsDateRange
  overview: PlatformAnalyticsSummary
  projects: ProjectAnalyticsSummary
  financial: FinancialAnalyticsSummary
  contractors: ContractorAnalyticsSummary
  marketplace: MarketplaceAnalyticsSummary
  risk: RiskAnalyticsSummary
  disputes: DisputeAnalytics
  verification: VerificationAnalytics
  compliance: ComplianceAnalytics
}