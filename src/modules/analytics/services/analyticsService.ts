// Analytics module — API service layer
//
// This is the single network boundary for the Analytics module.
//
// Pages and components should consume `analyticsService` rather than
// calling fetch/axios or another HTTP implementation directly.
//
// Backend reference: BRD Sec. 28.1
//
// API namespace:
//   /api/analytics
//
// Design principles:
// - Keep HTTP concerns isolated from analytics domain logic.
// - Keep analytics endpoints centralized and discoverable.
// - Keep all responses strongly typed against ./types.
// - Allow the application's configured API client to be injected.
// - Keep this module independent from fetch, Axios, TanStack Query, etc.
// - Do not place presentation logic in this service layer.

import type {
  AnalyticsDashboardData,
  AnalyticsDateRange,
  ComplianceAnalytics,
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
  ProjectRisk,
  RiskAnalyticsSummary,
  RiskCategory,
  RiskTrend,
  VerificationAnalytics,
} from './types'

/**
 * Supported analytics reporting periods.
 */
export type AnalyticsPeriod =
  | 'today'
  | '7d'
  | '30d'
  | '90d'
  | '12m'
  | 'custom'

/**
 * Common query parameters shared by analytics endpoints.
 *
 * `from` and `to` should use the application's canonical date format,
 * preferably ISO-8601 dates or timestamps.
 */
export interface AnalyticsQuery {
  from?: string
  to?: string
  period?: AnalyticsPeriod

  projectId?: string
  contractorId?: string
  marketplaceUserId?: string
}

/**
 * Standard analytics API response envelope.
 *
 * Domain data lives inside `data`.
 * Reporting metadata belongs inside `meta`.
 */
export interface AnalyticsResponse<T> {
  data: T

  meta?: {
    period?: AnalyticsDateRange
    generatedAt?: string
  }
}

/**
 * Minimal HTTP contract required by the Analytics module.
 *
 * The analytics service intentionally does not know whether the
 * application uses fetch, Axios, TanStack Query, a custom client,
 * or another HTTP implementation.
 */
export interface AnalyticsApiClient {
  get<T>(
    path: string,
    options?: {
      params?: Record<
        string,
        string | number | boolean | undefined
      >
    },
  ): Promise<T>
}

/**
 * Analytics API client instance.
 *
 * Configure this once during application startup:
 *
 * configureAnalyticsApi(apiClient)
 */
let apiClient: AnalyticsApiClient | null = null

/**
 * Inject the application's configured API client.
 *
 * Keeping configuration here means every analytics request passes
 * through one predictable network boundary.
 */
export function configureAnalyticsApi(
  client: AnalyticsApiClient,
): void {
  apiClient = client
}

/**
 * Returns the configured Analytics API client.
 *
 * Kept private so consumers interact with the domain service rather
 * than the underlying HTTP implementation.
 */
function getConfiguredClient(): AnalyticsApiClient {
  if (!apiClient) {
    throw new Error(
      'Analytics API client has not been configured. ' +
        'Call configureAnalyticsApi() during application startup.',
    )
  }

  return apiClient
}

/**
 * Execute a typed GET request against the Analytics API.
 */
async function get<T>(
  path: string,
  params?: AnalyticsQuery,
): Promise<T> {
  return getConfiguredClient().get<T>(path, {
    params,
  })
}

/**
 * Analytics service.
 *
 * This is the public API consumed by Analytics pages, hooks and
 * application services.
 */
export const analyticsService = {
  // ---------------------------------------------------------------------------
  // Dashboard
  // ---------------------------------------------------------------------------

  /**
   * Complete analytics dashboard.
   *
   * Used by the main Analytics Overview screen when the dashboard
   * requires multiple analytics domains in one response.
   */
  getDashboard(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<AnalyticsDashboardData>>(
      '/api/analytics/dashboard',
      params,
    )
  },

  /**
   * Platform-wide analytics overview.
   */
  getOverview(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<PlatformAnalyticsSummary>>(
      '/api/analytics/overview',
      params,
    )
  },

  // ---------------------------------------------------------------------------
  // Projects
  // ---------------------------------------------------------------------------

  /**
   * Project delivery summary.
   */
  getProjectSummary(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<ProjectAnalyticsSummary>>(
      '/api/analytics/projects/summary',
      params,
    )
  },

  /**
   * Project-level analytics records.
   */
  getProjects(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<ProjectAnalyticsItem[]>>(
      '/api/analytics/projects',
      params,
    )
  },

  /**
   * Project lifecycle distribution.
   */
  getProjectLifecycle(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<ProjectLifecycleMetric[]>>(
      '/api/analytics/projects/lifecycle',
      params,
    )
  },

  /**
   * Project milestone analytics.
   */
  getMilestones(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<MilestoneAnalytics>>(
      '/api/analytics/projects/milestones',
      params,
    )
  },

  // ---------------------------------------------------------------------------
  // Financial
  // ---------------------------------------------------------------------------

  /**
   * Financial analytics summary.
   */
  getFinancialSummary(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<FinancialAnalyticsSummary>>(
      '/api/analytics/financial/summary',
      params,
    )
  },

  /**
   * Financial trend series.
   */
  getFinancialTrends(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<FinancialTrend[]>>(
      '/api/analytics/financial/trends',
      params,
    )
  },

  // ---------------------------------------------------------------------------
  // Contractors
  // ---------------------------------------------------------------------------

  /**
   * Contractor analytics summary.
   */
  getContractorSummary(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<ContractorAnalyticsSummary>>(
      '/api/analytics/contractors/summary',
      params,
    )
  },

  /**
   * Contractor performance analytics.
   */
  getContractorPerformance(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<ContractorPerformance[]>>(
      '/api/analytics/contractors/performance',
      params,
    )
  },

  // ---------------------------------------------------------------------------
  // Marketplace
  // ---------------------------------------------------------------------------

  /**
   * Marketplace analytics summary.
   *
   * This intentionally replaces the previous Supplier Analytics endpoint.
   */
  getMarketplaceSummary(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<MarketplaceAnalyticsSummary>>(
      '/api/analytics/marketplace/summary',
      params,
    )
  },

  /**
   * Marketplace performance analytics.
   */
  getMarketplacePerformance(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<MarketplacePerformance[]>>(
      '/api/analytics/marketplace/performance',
      params,
    )
  },

  // ---------------------------------------------------------------------------
  // Risk Intelligence
  // ---------------------------------------------------------------------------

  /**
   * Portfolio risk analytics summary.
   */
  getRiskSummary(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<RiskAnalyticsSummary>>(
      '/api/analytics/risks/summary',
      params,
    )
  },

  /**
   * Risk distribution by category.
   */
  getRiskCategories(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<RiskCategory[]>>(
      '/api/analytics/risks/categories',
      params,
    )
  },

  /**
   * Highest-priority project risks.
   */
  getPriorityRisks(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<ProjectRisk[]>>(
      '/api/analytics/risks/priority',
      params,
    )
  },

  /**
   * Risk movement over time.
   */
  getRiskTrends(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<RiskTrend[]>>(
      '/api/analytics/risks/trends',
      params,
    )
  },

  // ---------------------------------------------------------------------------
  // Disputes
  // ---------------------------------------------------------------------------

  /**
   * Dispute analytics.
   */
  getDisputes(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<DisputeAnalytics>>(
      '/api/analytics/disputes',
      params,
    )
  },

  // ---------------------------------------------------------------------------
  // Verification & Compliance
  // ---------------------------------------------------------------------------

  /**
   * Verification analytics.
   */
  getVerification(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<VerificationAnalytics>>(
      '/api/analytics/verification',
      params,
    )
  },

  /**
   * Compliance analytics.
   */
  getCompliance(
    params?: AnalyticsQuery,
  ) {
    return get<AnalyticsResponse<ComplianceAnalytics>>(
      '/api/analytics/compliance',
      params,
    )
  },
} as const

/**
 * Analytics service type.
 *
 * Useful when a consumer needs to mock or abstract the service in tests
 * without depending directly on the concrete implementation.
 */
export type AnalyticsService = typeof analyticsService