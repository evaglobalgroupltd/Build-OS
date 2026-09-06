// Analytics module — API service layer
//
// This is the single network boundary for the Analytics module.
// Pages and components should consume analyticsService rather than calling
// fetch/axios directly.
//
// Backend reference: BRD Sec. 28.1
//
// Expected API namespace:
//   /api/analytics
//
// The service is intentionally written against the analytics domain types.
// Replace the request implementation with the project's configured API
// client when the backend becomes available.

import type {
  AnalyticsDashboardData,
  AnalyticsDateRange,
  ContractorAnalyticsSummary,
  ContractorPerformance,
  DisputeAnalytics,
  FinancialAnalyticsSummary,
  FinancialTrend,
  MarketplaceAnalyticsSummary,
  MarketplacePerformance,
  MilestoneAnalytics,
  PlatformAnalyticsSummary,
  ProjectAnalyticsItem,
  ProjectAnalyticsSummary,
  ProjectLifecycleMetric,
  RiskAnalyticsSummary,
  RiskCategory,
  ProjectRisk,
  RiskTrend,
  VerificationAnalytics,
  ComplianceAnalytics,
} from './types'

export interface AnalyticsQuery {
  from?: string
  to?: string
  period?: 'today' | '7d' | '30d' | '90d' | '12m' | 'custom'
  projectId?: string
  contractorId?: string
  marketplaceUserId?: string
}

export interface AnalyticsResponse<T> {
  data: T
  meta?: {
    period?: AnalyticsDateRange
    generatedAt?: string
  }
}

export interface AnalyticsApiClient {
  get<T>(
    path: string,
    options?: {
      params?: Record<string, string | number | boolean | undefined>
    },
  ): Promise<T>
}

/**
 * The application API client should be injected here.
 *
 * This keeps the analytics service independent from a specific HTTP
 * implementation such as fetch, Axios, TanStack Query, etc.
 */
let apiClient: AnalyticsApiClient | null = null

export function configureAnalyticsApi(
  client: AnalyticsApiClient,
): void {
  apiClient = client
}

async function get<T>(
  path: string,
  params?: AnalyticsQuery,
): Promise<T> {
  if (!apiClient) {
    throw new Error(
      'Analytics API client has not been configured. ' +
        'Call configureAnalyticsApi() during application startup.',
    )
  }

  return apiClient.get<T>(path, {
    params,
  })
}

export const analyticsService = {
  /**
   * Complete analytics dashboard.
   *
   * Used by the main Analytics Overview screen when the dashboard needs
   * all major analytics domains in one response.
   */
  getDashboard: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<AnalyticsDashboardData>>(
      '/api/analytics/dashboard',
      params,
    ),

  /**
   * Platform-wide overview.
   */
  getOverview: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<PlatformAnalyticsSummary>>(
      '/api/analytics/overview',
      params,
    ),

  /**
   * Project delivery analytics.
   */
  getProjectSummary: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<ProjectAnalyticsSummary>>(
      '/api/analytics/projects/summary',
      params,
    ),

  getProjects: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<ProjectAnalyticsItem[]>>(
      '/api/analytics/projects',
      params,
    ),

  getProjectLifecycle: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<ProjectLifecycleMetric[]>>(
      '/api/analytics/projects/lifecycle',
      params,
    ),

  getMilestones: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<MilestoneAnalytics>>(
      '/api/analytics/projects/milestones',
      params,
    ),

  /**
   * Financial analytics.
   */
  getFinancialSummary: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<FinancialAnalyticsSummary>>(
      '/api/analytics/financial/summary',
      params,
    ),

  getFinancialTrends: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<FinancialTrend[]>>(
      '/api/analytics/financial/trends',
      params,
    ),

  /**
   * Contractor performance analytics.
   */
  getContractorSummary: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<ContractorAnalyticsSummary>>(
      '/api/analytics/contractors/summary',
      params,
    ),

  getContractorPerformance: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<ContractorPerformance[]>>(
      '/api/analytics/contractors/performance',
      params,
    ),

  /**
   * Marketplace analytics.
   *
   * This replaces the previous Supplier Analytics endpoint.
   */
  getMarketplaceSummary: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<MarketplaceAnalyticsSummary>>(
      '/api/analytics/marketplace/summary',
      params,
    ),

  getMarketplacePerformance: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<MarketplacePerformance[]>>(
      '/api/analytics/marketplace/performance',
      params,
    ),

  /**
   * Risk intelligence.
   */
  getRiskSummary: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<RiskAnalyticsSummary>>(
      '/api/analytics/risks/summary',
      params,
    ),

  getRiskCategories: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<RiskCategory[]>>(
      '/api/analytics/risks/categories',
      params,
    ),

  getPriorityRisks: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<ProjectRisk[]>>(
      '/api/analytics/risks/priority',
      params,
    ),

  getRiskTrends: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<RiskTrend[]>>(
      '/api/analytics/risks/trends',
      params,
    ),

  /**
   * Dispute analytics.
   */
  getDisputes: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<DisputeAnalytics>>(
      '/api/analytics/disputes',
      params,
    ),

  /**
   * Verification and compliance analytics.
   */
  getVerification: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<VerificationAnalytics>>(
      '/api/analytics/verification',
      params,
    ),

  getCompliance: (
    params?: AnalyticsQuery,
  ) =>
    get<AnalyticsResponse<ComplianceAnalytics>>(
      '/api/analytics/compliance',
      params,
    ),
}