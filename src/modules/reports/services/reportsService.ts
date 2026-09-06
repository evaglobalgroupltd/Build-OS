// Reports module — API service layer
// BRD refs:
// Sec. 20 Reporting & Analytics
// Sec. 22 Admin Control Centre
// Sec. 28.1 Backend Services

import { api } from '@/lib/api'

import type {
  AuditReport,
  ComplianceReport,
  FinancialReport,
  ManagementReport,
  ProjectReport,
  ReportFilters,
  ReportSummary,
  ReportExportRequest,
  ReportExportResponse,
} from '../types'

export const reportsService = {
  // =========================
  // Dashboard Summary
  // =========================

  getSummary: (filters?: ReportFilters) =>
    api.get<ReportSummary>('/reports/summary', {
      params: filters,
    }),

  // =========================
  // Project Reports
  // =========================

  getProjectReports: (filters?: ReportFilters) =>
    api.get<ProjectReport[]>('/reports/projects', {
      params: filters,
    }),

  getProjectReport: (projectId: string) =>
    api.get<ProjectReport>(
      `/reports/projects/${projectId}`,
    ),

  // =========================
  // Financial Reports
  // =========================

  getFinancialReports: (filters?: ReportFilters) =>
    api.get<FinancialReport[]>('/reports/financial', {
      params: filters,
    }),

  getFinancialReport: (reportId: string) =>
    api.get<FinancialReport>(
      `/reports/financial/${reportId}`,
    ),

  // =========================
  // Compliance Reports
  // =========================

  getComplianceReports: (filters?: ReportFilters) =>
    api.get<ComplianceReport[]>(
      '/reports/compliance',
      {
        params: filters,
      },
    ),

  getComplianceReport: (reportId: string) =>
    api.get<ComplianceReport>(
      `/reports/compliance/${reportId}`,
    ),

  // =========================
  // Audit Reports
  // =========================

  getAuditReports: (filters?: ReportFilters) =>
    api.get<AuditReport[]>('/reports/audit', {
      params: filters,
    }),

  getAuditReport: (reportId: string) =>
    api.get<AuditReport>(
      `/reports/audit/${reportId}`,
    ),

  // =========================
  // Management Reports
  // =========================

  getManagementReports: (filters?: ReportFilters) =>
    api.get<ManagementReport[]>(
      '/reports/management',
      {
        params: filters,
      },
    ),

  getManagementReport: (reportId: string) =>
    api.get<ManagementReport>(
      `/reports/management/${reportId}`,
    ),

  // =========================
  // Report Exports
  // =========================

  exportReport: (
    request: ReportExportRequest,
  ) =>
    api.post<ReportExportResponse>(
      '/reports/export',
      request,
    ),

  getExportHistory: () =>
    api.get<ReportExportResponse[]>(
      '/reports/export/history',
    ),

  downloadExport: (exportId: string) =>
    api.get(
      `/reports/export/${exportId}/download`,
      {
        responseType: 'blob',
      },
    ),
}