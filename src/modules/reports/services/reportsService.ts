// Reports module — API service layer
//
// BRD references:
// - Sec. 20: Reporting & Analytics
// - Sec. 22: Admin Control Centre
// - Sec. 28.1: Backend Services
//
// Responsibilities:
// - Dashboard reporting
// - Project reporting
// - Financial reporting
// - Compliance reporting
// - Audit reporting
// - Management reporting
// - Report export generation and retrieval
//
// Keep this layer focused on API communication.
// Presentation, filtering UI, formatting, and report composition
// should remain within their respective modules/components.

import { api } from '@/lib/api'

import type {
  AuditReport,
  ComplianceReport,
  FinancialReport,
  ManagementReport,
  ProjectReport,
  ReportExportRequest,
  ReportExportResponse,
  ReportFilters,
  ReportSummary,
} from '../types'

/* -------------------------------------------------------------------------- */
/* Reports API                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Central API service for the Reports module.
 *
 * The service intentionally exposes small, predictable methods so that
 * pages, hooks, and higher-level report workflows can remain decoupled
 * from the underlying HTTP implementation.
 */
export const reportsService = {
  /* ------------------------------------------------------------------------ */
  /* Dashboard Summary                                                        */
  /* ------------------------------------------------------------------------ */

  /**
   * Retrieve the aggregated reporting dashboard summary.
   *
   * Supports optional filters for date ranges, projects, roles,
   * report categories, and other server-supported dimensions.
   */
  getSummary: (filters?: ReportFilters) =>
    api.get<ReportSummary>('/reports/summary', {
      params: filters,
    }),

  /* ------------------------------------------------------------------------ */
  /* Project Reports                                                          */
  /* ------------------------------------------------------------------------ */

  /**
   * Retrieve project reports matching the supplied filters.
   */
  getProjectReports: (filters?: ReportFilters) =>
    api.get<ProjectReport[]>('/reports/projects', {
      params: filters,
    }),

  /**
   * Retrieve a single project report by project identifier.
   */
  getProjectReport: (projectId: string) =>
    api.get<ProjectReport>(
      `/reports/projects/${projectId}`,
    ),

  /* ------------------------------------------------------------------------ */
  /* Financial Reports                                                        */
  /* ------------------------------------------------------------------------ */

  /**
   * Retrieve financial reports matching the supplied filters.
   */
  getFinancialReports: (filters?: ReportFilters) =>
    api.get<FinancialReport[]>('/reports/financial', {
      params: filters,
    }),

  /**
   * Retrieve a single financial report by report identifier.
   */
  getFinancialReport: (reportId: string) =>
    api.get<FinancialReport>(
      `/reports/financial/${reportId}`,
    ),

  /* ------------------------------------------------------------------------ */
  /* Compliance Reports                                                       */
  /* ------------------------------------------------------------------------ */

  /**
   * Retrieve compliance reports matching the supplied filters.
   */
  getComplianceReports: (filters?: ReportFilters) =>
    api.get<ComplianceReport[]>(
      '/reports/compliance',
      {
        params: filters,
      },
    ),

  /**
   * Retrieve a single compliance report by report identifier.
   */
  getComplianceReport: (reportId: string) =>
    api.get<ComplianceReport>(
      `/reports/compliance/${reportId}`,
    ),

  /* ------------------------------------------------------------------------ */
  /* Audit Reports                                                             */
  /* ------------------------------------------------------------------------ */

  /**
   * Retrieve audit reports matching the supplied filters.
   */
  getAuditReports: (filters?: ReportFilters) =>
    api.get<AuditReport[]>('/reports/audit', {
      params: filters,
    }),

  /**
   * Retrieve a single audit report by report identifier.
   */
  getAuditReport: (reportId: string) =>
    api.get<AuditReport>(
      `/reports/audit/${reportId}`,
    ),

  /* ------------------------------------------------------------------------ */
  /* Management Reports                                                       */
  /* ------------------------------------------------------------------------ */

  /**
   * Retrieve management reports matching the supplied filters.
   */
  getManagementReports: (filters?: ReportFilters) =>
    api.get<ManagementReport[]>(
      '/reports/management',
      {
        params: filters,
      },
    ),

  /**
   * Retrieve a single management report by report identifier.
   */
  getManagementReport: (reportId: string) =>
    api.get<ManagementReport>(
      `/reports/management/${reportId}`,
    ),

  /* ------------------------------------------------------------------------ */
  /* Report Exports                                                           */
  /* ------------------------------------------------------------------------ */

  /**
   * Generate a new report export.
   *
   * The backend determines the resulting export format and resource
   * based on the supplied request.
   */
  exportReport: (request: ReportExportRequest) =>
    api.post<ReportExportResponse>(
      '/reports/export',
      request,
    ),

  /**
   * Retrieve the authenticated user's report export history.
   */
  getExportHistory: () =>
    api.get<ReportExportResponse[]>(
      '/reports/export/history',
    ),

  /**
   * Download a previously generated report export.
   *
   * The response is intentionally returned as a Blob so the consuming
   * layer can control filename, browser download behavior, and preview.
   */
  downloadExport: (exportId: string) =>
    api.get<Blob>(
      `/reports/export/${exportId}/download`,
      {
        responseType: 'blob',
      },
    ),
}