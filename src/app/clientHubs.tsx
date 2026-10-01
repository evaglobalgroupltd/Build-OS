import type { ReactNode } from 'react'
import { Navigate, Outlet, Route, useLocation, useParams } from 'react-router-dom'

import { DashboardLayout } from '@/layouts/DashboardLayout'
import { HubLayout, PageBoundary, SectionTabs, type SectionTab } from '@/components/ui/HubLayout'
import { projects } from '@/data/mockData'
import type { Project } from '@/modules/projects/types'

import {
  decisionTabs,
  disputeCaseTabs,
  disputeTabs,
  documentTabs,
  escrowTabs,
  passportTabs,
  procurementTabs,
  projectTabs,
  reportTabs,
  updatesTabs,
} from '@/pages/client/clientTabs'

/* ---- Pages that carry their own DashboardLayout (hand-built client pages) ---- */
import { ClientDashboard, ClientProjectPage } from '@/pages/client/Dashboard'
import { ClientDecisionsPage } from '@/pages/client/Decisions'
import { MessagesPage } from '@/pages/client/Messages'
import { UpdatesPage } from '@/pages/client/Updates'
import { ProjectsPage as ClientProjectsPage, CreateProjectPage, EditProjectPage } from '@/pages/client/Projects'

/* ---- Module pages (layout-less: rendered inside a hub or ModulePage) ---- */
// approvals
import { ApprovalDetails } from '@/modules/approvals/pages/ApprovalDetails'
import { ApprovalHistory } from '@/modules/approvals/pages/ApprovalHistory'
import { ApprovalInbox } from '@/modules/approvals/pages/ApprovalInbox'
// escrow
import { Wallet } from '@/modules/escrow/pages/Wallet'
import { Transactions } from '@/modules/escrow/pages/Transactions'
import { Funding } from '@/modules/escrow/pages/Funding'
import { PaymentApprovals } from '@/modules/escrow/pages/PaymentApprovals'
import { PaymentRequests } from '@/modules/escrow/pages/PaymentRequests'
import { FrozenPayments } from '@/modules/escrow/pages/FrozenPayments'
import { Refunds } from '@/modules/escrow/pages/Refunds'
// procurement
import { MaterialRequests } from '@/modules/procurement/pages/MaterialRequests'
import { ProcurementDashboard } from '@/modules/procurement/pages/ProcurementDashboard'
import { CreateRequest } from '@/modules/procurement/pages/CreateRequest'
import { Quotations } from '@/modules/procurement/pages/Quotations'
import { QuoteComparison } from '@/modules/procurement/pages/QuoteComparison'
import { PurchaseOrders } from '@/modules/procurement/pages/PurchaseOrders'
import { Deliveries } from '@/modules/procurement/pages/Deliveries'
import { DeliveryVerification } from '@/modules/procurement/pages/DeliveryVerification'
// reports + monitoring
import { ProjectReports } from '@/modules/reports/pages/ProjectReports'
import { FinancialReports } from '@/modules/reports/pages/FinancialReports'
import { Progress } from '@/modules/monitoring/pages/Progress'
import { DailyReport } from '@/modules/monitoring/pages/DailyReport'
import { WeeklyReport } from '@/modules/monitoring/pages/WeeklyReport'
import { MonthlyReport } from '@/modules/monitoring/pages/MonthlyReport'
import { Reports as ReportLibrary } from '@/modules/monitoring/pages/Reports'
// disputes
import { DisputeList } from '@/modules/disputes/pages/DisputeList'
import { CreateDispute } from '@/modules/disputes/pages/CreateDispute'
import { DisputeDetails } from '@/modules/disputes/pages/DisputeDetails'
import { Evidence as DisputeEvidence } from '@/modules/disputes/pages/Evidence'
import { Responses as DisputeResponses } from '@/modules/disputes/pages/Responses'
import { Resolution as DisputeResolution } from '@/modules/disputes/pages/Resolution'
// property passport
import { Passport } from '@/modules/property-passport/pages/Passport'
import { PropertyOverview } from '@/modules/property-passport/pages/PropertyOverview'
import { Ownership } from '@/modules/property-passport/pages/Ownership'
import { LandDocuments } from '@/modules/property-passport/pages/LandDocuments'
import { Designs } from '@/modules/property-passport/pages/Designs'
import { Inspections as PassportInspections } from '@/modules/property-passport/pages/Inspections'
import { Contracts } from '@/modules/property-passport/pages/Contracts'
import { Payments as PassportPayments } from '@/modules/property-passport/pages/Payments'
import { Procurement as PassportProcurement } from '@/modules/property-passport/pages/Procurement'
import { Warranties } from '@/modules/property-passport/pages/Warranties'
import { Handover } from '@/modules/property-passport/pages/Handover'
// documents
import { DocumentVault } from '@/modules/documents/pages/DocumentVault'
import { UploadDocument } from '@/modules/documents/pages/UploadDocument'
import { DocumentDetails } from '@/modules/documents/pages/DocumentDetails'
import { DocumentHistory } from '@/modules/documents/pages/DocumentHistory'
// evidence + milestones
import { EvidenceDetails } from '@/modules/evidence/pages/EvidenceDetails'
import { EvidenceReview } from '@/modules/evidence/pages/EvidenceReview'
import { MilestoneDetails } from '@/modules/milestones/pages/MilestoneDetails'
// projects
import { ProjectDetails } from '@/modules/projects/pages/ProjectDetails'
import { ProjectTimeline } from '@/modules/projects/pages/ProjectTimeline'
import { ProjectTeam } from '@/modules/projects/pages/ProjectTeam'
import { ProjectDocuments } from '@/modules/projects/pages/ProjectDocuments'
import { ProjectSettings } from '@/modules/projects/pages/ProjectSettings'
// notifications
import { Notifications } from '@/modules/notifications/pages/Notifications'
import { NotificationSettings } from '@/modules/notifications/pages/NotificationSettings'

/* =============================================================================
 * Small layout helpers
 * ========================================================================== */

/** Flat page: dashboard layout + optional tab bar + error boundary. */
function ModulePage({
  title,
  tabs = [],
  children,
}: {
  title: string
  tabs?: SectionTab[]
  children: ReactNode
}) {
  const { pathname } = useLocation()

  return (
    <DashboardLayout title={title}>
      {tabs.length > 0 && <SectionTabs tabs={tabs} label={`${title} sections`} />}
      <PageBoundary key={pathname}>{children}</PageBoundary>
    </DashboardLayout>
  )
}

/** Second-level tabs for one dispute (Case / Evidence / Responses / Resolution). */
function CaseLayout() {
  const { disputeId = '' } = useParams()

  return (
    <>
      <SectionTabs tabs={disputeCaseTabs(disputeId)} label="Case sections" />
      <Outlet />
    </>
  )
}

/** Project sub-pages that need the project from the URL. */
function useRouteProject() {
  const { projectId = '' } = useParams<{ projectId: string }>()
  const project = (projects as unknown as Project[]).find((p) => String(p.id) === projectId)
  return { projectId, project }
}

function ProjectTab({ title, children }: { title?: string; children: (ctx: ReturnType<typeof useRouteProject>) => ReactNode }) {
  const ctx = useRouteProject()

  return (
    <ModulePage title={title ?? ctx.project?.name ?? 'Project'} tabs={projectTabs(ctx.projectId)}>
      {children(ctx)}
    </ModulePage>
  )
}

/* =============================================================================
 * THE CLIENT ROUTE TABLE
 *
 * Use in AppRoutes:   <Routes> ... {clientHubRoutes} ... </Routes>
 * (React Router flattens fragments, so no wrapper component is needed.)
 * ========================================================================== */

export const clientHubRoutes = (
  <>
    {/* ---------------- Overview ---------------- */}
    <Route path="/app/client" element={<ClientDashboard />} />

    {/* ---------------- Projects ---------------- */}
    <Route path="/app/client/projects" element={<ClientProjectsPage />} />
    <Route path="/app/client/projects/new" element={<CreateProjectPage />} />
    <Route path="/app/client/questionnaire" element={<CreateProjectPage />} />
    <Route path="/app/client/projects/:projectId" element={<ClientProjectPage />} />
    <Route path="/app/client/projects/:projectId/edit" element={<EditProjectPage />} />
    <Route
      path="/app/client/projects/:projectId/details"
      element={<ProjectTab>{({ project }) => <ProjectDetails project={project} />}</ProjectTab>}
    />
    <Route
      path="/app/client/projects/:projectId/timeline"
      element={<ProjectTab>{() => <ProjectTimeline />}</ProjectTab>}
    />
    <Route path="/app/client/projects/:projectId/team" element={<ProjectTab>{() => <ProjectTeam />}</ProjectTab>} />
    <Route
      path="/app/client/projects/:projectId/documents"
      element={<ProjectTab>{() => <ProjectDocuments />}</ProjectTab>}
    />
    <Route
      path="/app/client/projects/:projectId/settings"
      element={<ProjectTab>{({ projectId }) => <ProjectSettings projectId={projectId} />}</ProjectTab>}
    />

    {/* ---------------- Decisions & approvals ---------------- */}
    <Route path="/app/client/decisions" element={<ClientDecisionsPage />} />
    <Route
      path="/app/client/decisions/approvals"
      element={
        <ModulePage title="Milestone approvals" tabs={decisionTabs}>
          <ApprovalInbox />
        </ModulePage>
      }
    />
    <Route
      path="/app/client/decisions/approvals/:approvalId"
      element={
        <ModulePage title="Approval" tabs={decisionTabs}>
          <ApprovalDetails />
        </ModulePage>
      }
    />
    <Route
      path="/app/client/decisions/history"
      element={
        <ModulePage title="Approval history" tabs={decisionTabs}>
          <ApprovalHistory />
        </ModulePage>
      }
    />

    {/* ---------------- Escrow ---------------- */}
    <Route path="/app/client/escrow" element={<HubLayout title="Escrow" tabs={escrowTabs} />}>
      <Route index element={<Wallet />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="fund" element={<Funding />} />
      <Route path="approvals" element={<PaymentApprovals />} />
      <Route path="requests" element={<PaymentRequests />} />
      <Route path="frozen" element={<FrozenPayments />} />
      <Route path="refunds" element={<Refunds />} />
    </Route>
    <Route path="/app/client/vault" element={<Navigate to="/app/client/escrow" replace />} />

    {/* ---------------- Procurement ---------------- */}
    <Route path="/app/client/procurement" element={<HubLayout title="Procurement" tabs={procurementTabs} />}>
      <Route index element={<MaterialRequests />} />
      <Route path="overview" element={<ProcurementDashboard />} />
      <Route path="new" element={<CreateRequest />} />
      <Route path="quotations" element={<Quotations />} />
      <Route path="compare" element={<QuoteComparison />} />
      <Route path="orders" element={<PurchaseOrders />} />
      <Route path="deliveries" element={<Deliveries />} />
      <Route path="verify" element={<DeliveryVerification />} />
    </Route>

    {/* ---------------- Reports ---------------- */}
    <Route path="/app/client/reports" element={<HubLayout title="Reports" tabs={reportTabs} />}>
      <Route index element={<ProjectReports />} />
      <Route path="financial" element={<FinancialReports />} />
      <Route path="progress" element={<Progress />} />
      <Route path="daily" element={<DailyReport />} />
      <Route path="weekly" element={<WeeklyReport />} />
      <Route path="monthly" element={<MonthlyReport />} />
      <Route path="library" element={<ReportLibrary />} />
    </Route>

    {/* ---------------- Disputes ---------------- */}
    <Route path="/app/client/disputes" element={<HubLayout title="Disputes" tabs={disputeTabs} />}>
      <Route index element={<DisputeList />} />
      <Route path="new" element={<CreateDispute />} />
      <Route path=":disputeId" element={<CaseLayout />}>
        <Route index element={<DisputeDetails />} />
        <Route path="evidence" element={<DisputeEvidence />} />
        <Route path="responses" element={<DisputeResponses />} />
        <Route path="resolution" element={<DisputeResolution />} />
      </Route>
    </Route>

    {/* ---------------- Property Passport ---------------- */}
    <Route path="/app/client/passport" element={<HubLayout title="Property Passport" tabs={passportTabs} />}>
      <Route index element={<Passport />} />
      <Route path="property" element={<PropertyOverview />} />
      <Route path="ownership" element={<Ownership />} />
      <Route path="land-documents" element={<LandDocuments />} />
      <Route path="designs" element={<Designs />} />
      <Route path="inspections" element={<PassportInspections />} />
      <Route path="contracts" element={<Contracts />} />
      <Route path="payments" element={<PassportPayments />} />
      <Route path="procurement" element={<PassportProcurement />} />
      <Route path="warranties" element={<Warranties />} />
      <Route path="handover" element={<Handover />} />
    </Route>

    {/* ---------------- Documents ---------------- */}
    <Route path="/app/client/documents" element={<HubLayout title="Documents" tabs={documentTabs} />}>
      <Route index element={<DocumentVault />} />
      <Route path="upload" element={<UploadDocument />} />
      <Route path=":documentId" element={<DocumentDetails />} />
      <Route path=":documentId/history" element={<DocumentHistory />} />
    </Route>

    {/* ---------------- Milestones & evidence (detail pages) ---------------- */}
    <Route
      path="/app/client/milestones/:milestoneId"
      element={
        <ModulePage title="Milestone">
          <MilestoneDetails />
        </ModulePage>
      }
    />
    <Route path="/app/client/milestones" element={<Navigate to="/app/client/projects" replace />} />
    <Route path="/app/client/evidence" element={<Navigate to="/app/client/updates" replace />} />
    <Route
      path="/app/client/evidence/:evidenceId"
      element={
        <ModulePage title="Evidence">
          <EvidenceDetails />
        </ModulePage>
      }
    />
    <Route
      path="/app/client/evidence/:evidenceId/review"
      element={
        <ModulePage title="Review evidence">
          <EvidenceReview />
        </ModulePage>
      }
    />

    {/* ---------------- Updates & messages ---------------- */}
    <Route path="/app/client/updates" element={<UpdatesPage />} />
    <Route
      path="/app/client/updates/notifications"
      element={
        <ModulePage title="Notifications" tabs={updatesTabs}>
          <Notifications />
        </ModulePage>
      }
    />
    <Route
      path="/app/client/updates/preferences"
      element={
        <ModulePage title="Notification preferences" tabs={updatesTabs}>
          <NotificationSettings />
        </ModulePage>
      }
    />
    <Route path="/app/client/messages" element={<MessagesPage />} />
  </>
)