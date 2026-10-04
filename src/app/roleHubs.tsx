/* =============================================================================
 * src/app/roleHubs.tsx
 *
 * The route tables for every actor except the client (see clientHubs.tsx) and
 * admin. Each table is a fragment you drop into <Routes> in routes.tsx:
 *
 *   {contractorRoutes}  {marketRoutes}  {professionalRoutes}  {pmRoutes}
 *
 * Why one file: these used to be ~25 one-line wrapper files (pages/contractor/
 * Bids.tsx, pages/market-place/Orders.tsx ...) that did nothing but put a module
 * page inside DashboardLayout. <ModulePage> / <HubLayout> do that now, so a new
 * page is one <Route> line here instead of a new file plus an import in routes.tsx.
 *
 * Every actor shares the same three workspace pages (Messages, Updates and,
 * where it makes sense, Decisions) from pages/workspace/*.
 *
 * Rule of thumb for adding a page: add the <Route> here, add the item to
 * config/navigation.ts, and (if other pages link to it by concept) add the
 * section to config/appRoutes.ts. Paths in all three must match.
 * ========================================================================== */

import { Route } from 'react-router-dom'

import { CaseLayout, HubLayout, ModulePage, type SectionTab } from '@/components/ui/HubLayout'

import { ProfilePage } from '@/pages/Profile'
import { MessagesPage } from '@/pages/workspace/Messages'
import { UpdatesPage } from '@/pages/workspace/Updates'
import { DecisionsPage } from '@/pages/workspace/Decisions'
import { updatesTabsFor } from '@/hooks/useWorkspace'

import { ContractorDashboard } from '@/pages/contractor/Dashboard'
import { MarketDashboard } from '@/pages/market-place/Dashboard'
import { ProfessionalDashboard } from '@/pages/professional/Dashboard'
import { ProjectManagerDashboard } from '@/pages/project-manager/Dashboard'
import { AdminDashboard } from '@/pages/admin/Dashboard'

/* ---- shared module pages ---- */
import { Notifications } from '@/modules/notifications/pages/Notifications'
import { NotificationSettings } from '@/modules/notifications/pages/NotificationSettings'
import { Transactions } from '@/modules/escrow/pages/Transactions'
import { PaymentRequests } from '@/modules/escrow/pages/PaymentRequests'
import { DisputeList } from '@/modules/disputes/pages/DisputeList'
import { CreateDispute } from '@/modules/disputes/pages/CreateDispute'
import { DisputeDetails } from '@/modules/disputes/pages/DisputeDetails'
import { Evidence as DisputeEvidence } from '@/modules/disputes/pages/Evidence'
import { Responses as DisputeResponses } from '@/modules/disputes/pages/Responses'
import { Resolution as DisputeResolution } from '@/modules/disputes/pages/Resolution'
import { ProjectReports } from '@/modules/reports/pages/ProjectReports'
import { DocumentVault } from '@/modules/documents/pages/DocumentVault'
import { UploadDocument } from '@/modules/documents/pages/UploadDocument'
import { DocumentDetails } from '@/modules/documents/pages/DocumentDetails'
import { DocumentHistory } from '@/modules/documents/pages/DocumentHistory'
import { BuildTeamPage, MarketplacePage } from '@/pages/contractor/Workforce'

/* ---- contractor ---- */
import { MyBids } from '@/modules/bidding/pages/MyBids'
import { BidDetails } from '@/modules/bidding/pages/BidDetails'
import { BidSubmission } from '@/modules/bidding/pages/BidSubmission'
import { MilestoneList } from '@/modules/milestones/pages/MilestoneList'
import { MilestoneDetails } from '@/modules/milestones/pages/MilestoneDetails'
import { MaterialRequests } from '@/modules/procurement/pages/MaterialRequests'
import { CreateRequest } from '@/modules/procurement/pages/CreateRequest'

/* ---- marketplace ---- */
import { Catalogue } from '@/modules/market/pages/Catalogue'
import { Quotations } from '@/modules/procurement/pages/Quotations'
import { PurchaseOrders } from '@/modules/procurement/pages/PurchaseOrders'
import { Deliveries } from '@/modules/procurement/pages/Deliveries'
import { DeliveryVerification } from '@/modules/procurement/pages/DeliveryVerification'

/* ---- professional ---- */
import { ServiceInvitations } from '@/modules/professionals/pages/ServiceInvitations'
import { Proposals } from '@/modules/professionals/pages/Proposals'
import { Deliverables } from '@/modules/professionals/pages/Deliverables'

/* ---- admin ---- */
import { Users } from '@/modules/admin/pages/Users'
import { AuditLogs } from '@/modules/admin/pages/AuditLogs'
import { Settings as AdminSettings } from '@/modules/admin/pages/Settings'
import { Compliance } from '@/modules/admin/pages/Compliance'
import { AdminVerificationQueue } from '@/modules/verification/pages/AdminVerificationQueue'
import { MarketList } from '@/modules/market/pages/MarketList'
import { MarketplaceAnalytics } from '@/modules/analytics/pages/MarketAnalytics'
import { ProcurementDashboard } from '@/modules/procurement/pages/ProcurementDashboard'
import { Wallet } from '@/modules/escrow/pages/Wallet'
import { PaymentApprovals } from '@/modules/escrow/pages/PaymentApprovals'
import { FrozenPayments } from '@/modules/escrow/pages/FrozenPayments'
import { Refunds } from '@/modules/escrow/pages/Refunds'
import { FinancialReports } from '@/modules/reports/pages/FinancialReports'
import { AuditReports } from '@/modules/reports/pages/AuditReports'
import { ComplianceReports } from '@/modules/reports/pages/ComplianceReports'
import { ManagementReports } from '@/modules/reports/pages/ManagementReports'
import { Overview as AnalyticsOverview } from '@/modules/analytics/pages/Overview'
import { ProjectAnalytics } from '@/modules/analytics/pages/ProjectAnalytics'
import { FinancialAnalytics } from '@/modules/analytics/pages/FinancialAnalytics'
import { ContractorAnalytics } from '@/modules/analytics/pages/ContractorAnalytics'
import { RiskAnalytics } from '@/modules/analytics/pages/RiskAnalytics'

/* ---- project manager ---- */
import { ProjectList } from '@/modules/projects/pages/ProjectList'
import { Inspections } from '@/modules/monitoring/pages/Inspections'
import { RiskAlerts } from '@/modules/monitoring/pages/RiskAlerts'
import { MilestoneReview } from '@/modules/milestones/pages/MilestoneReview'
import { EvidenceLibrary } from '@/modules/evidence/pages/EvidenceLibrary'
import { EvidenceDetails } from '@/modules/evidence/pages/EvidenceDetails'
import { EvidenceReview } from '@/modules/evidence/pages/EvidenceReview'

/* =============================================================================
 * Shared route groups (same shape for every actor)
 * ========================================================================== */

/** /messages, /updates (+ notifications, preferences). Every actor has these. */
const workspaceRoutes = (base: string) => (
  <>
    {profileRoute(base)}
    <Route path={`${base}/messages`} element={<MessagesPage />} />
    <Route path={`${base}/updates`} element={<UpdatesPage />} />
    <Route
      path={`${base}/updates/notifications`}
      element={
        <ModulePage title="Notifications" tabs={updatesTabsFor(base)}>
          <Notifications />
        </ModulePage>
      }
    />
    <Route
      path={`${base}/updates/preferences`}
      element={
        <ModulePage title="Notification preferences" tabs={updatesTabsFor(base)}>
          <NotificationSettings />
        </ModulePage>
      }
    />
  </>
)

/** /profile: same page for every actor. */
const profileRoute = (base: string) => (
  <Route
    path={`${base}/profile`}
    element={
      <ModulePage title="Profile">
        <ProfilePage />
      </ModulePage>
    }
  />
)

/** /decisions for actors who respond to requests (contractor, marketplace, professional). */
const decisionRoute = (base: string) => <Route path={`${base}/decisions`} element={<DecisionsPage />} />

/** /payments hub: transactions + payment requests. */
const paymentsRoutes = (base: string) => {
  const tabs: SectionTab[] = [
    { label: 'Transactions', to: `${base}/payments`, end: true },
    { label: 'Payment requests', to: `${base}/payments/requests` },
  ]

  return (
    <Route path={`${base}/payments`} element={<HubLayout title="Payments" tabs={tabs} />}>
      <Route index element={<Transactions />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="requests" element={<PaymentRequests />} />
    </Route>
  )
}

/** /documents hub: vault, upload, one document and its history. */
const documentsRoutes = (base: string) => {
  const tabs: SectionTab[] = [
    { label: 'Vault', to: `${base}/documents`, end: true },
    { label: 'Upload', to: `${base}/documents/upload` },
  ]

  return (
    <Route path={`${base}/documents`} element={<HubLayout title="Documents" tabs={tabs} />}>
      <Route index element={<DocumentVault />} />
      <Route path="upload" element={<UploadDocument />} />
      <Route path=":documentId" element={<DocumentDetails />} />
      <Route path=":documentId/history" element={<DocumentHistory />} />
    </Route>
  )
}

/** /disputes hub: list, raise, and the four-tab case view. */
const disputesRoutes = (base: string) => {
  const tabs: SectionTab[] = [
    { label: 'All disputes', to: `${base}/disputes`, end: true },
    { label: 'Raise a dispute', to: `${base}/disputes/new` },
  ]

  return (
    <Route path={`${base}/disputes`} element={<HubLayout title="Disputes" tabs={tabs} />}>
      <Route index element={<DisputeList />} />
      <Route path="new" element={<CreateDispute />} />
      <Route path=":disputeId" element={<CaseLayout base={base} />}>
        <Route index element={<DisputeDetails />} />
        <Route path="evidence" element={<DisputeEvidence />} />
        <Route path="responses" element={<DisputeResponses />} />
        <Route path="resolution" element={<DisputeResolution />} />
      </Route>
    </Route>
  )
}

/* =============================================================================
 * CONTRACTOR   /app/contractor/*
 * ========================================================================== */

const C = '/app/contractor'

export const contractorRoutes = (
  <>
    <Route path={C} element={<ContractorDashboard />} />

    {/* Find work */}
    <Route
      path={`${C}/available`}
      element={
        <ModulePage title="Marketplace">
          <MarketplacePage />
        </ModulePage>
      }
    />

    {/* Your people: invite, assign to projects, control site access */}
    <Route
      path={`${C}/team`}
      element={
        <ModulePage title="Build Team">
          <BuildTeamPage />
        </ModulePage>
      }
    />

    {/* Bids */}
    <Route
      path={`${C}/bids`}
      element={
        <HubLayout
          title="Bids"
          tabs={[
            { label: 'My bids', to: `${C}/bids`, end: true },
            { label: 'Submit a bid', to: `${C}/bids/submit` },
          ]}
        />
      }
    >
      <Route index element={<MyBids />} />
      <Route path="submit" element={<BidSubmission />} />
      <Route path=":bidId" element={<BidDetails />} />
    </Route>

    {/* Milestones */}
    <Route
      path={`${C}/milestones`}
      element={
        <ModulePage title="Active Milestones">
          <MilestoneList />
        </ModulePage>
      }
    />
    <Route
      path={`${C}/milestones/:milestoneId`}
      element={
        <ModulePage title="Milestone">
          <MilestoneDetails />
        </ModulePage>
      }
    />

    {/* Evidence: proof of work for each milestone */}
    <Route
      path={`${C}/evidence`}
      element={
        <HubLayout
          title="Evidence"
          tabs={[{ label: 'Evidence library', to: `${C}/evidence`, end: true }]}
        />
      }
    >
      <Route index element={<EvidenceLibrary />} />
      <Route path=":evidenceId" element={<EvidenceDetails />} />
    </Route>

    {/* Materials */}
    <Route
      path={`${C}/materials`}
      element={
        <HubLayout
          title="Material Requests"
          tabs={[
            { label: 'Requests', to: `${C}/materials`, end: true },
            { label: 'New request', to: `${C}/materials/new` },
          ]}
        />
      }
    >
      <Route index element={<MaterialRequests />} />
      <Route path="new" element={<CreateRequest />} />
    </Route>

    <Route
      path={`${C}/reports`}
      element={
        <ModulePage title="Reports">
          <ProjectReports />
        </ModulePage>
      }
    />

    {documentsRoutes(C)}
    {paymentsRoutes(C)}
    {disputesRoutes(C)}
    {decisionRoute(C)}
    {workspaceRoutes(C)}
  </>
)

/* =============================================================================
 * MARKETPLACE   /app/market/*
 * ========================================================================== */

const M = '/app/market'

export const marketRoutes = (
  <>
    <Route path={M} element={<MarketDashboard />} />

    <Route
      path={`${M}/catalogue`}
      element={
        <ModulePage title="Catalogue">
          <Catalogue />
        </ModulePage>
      }
    />
    <Route
      path={`${M}/quotations`}
      element={
        <ModulePage title="Quotation Requests">
          <Quotations />
        </ModulePage>
      }
    />
    <Route
      path={`${M}/orders`}
      element={
        <ModulePage title="Purchase Orders">
          <PurchaseOrders />
        </ModulePage>
      }
    />

    <Route
      path={`${M}/deliveries`}
      element={
        <HubLayout
          title="Deliveries"
          tabs={[
            { label: 'Deliveries', to: `${M}/deliveries`, end: true },
            { label: 'Verify delivery', to: `${M}/deliveries/verify` },
          ]}
        />
      }
    >
      <Route index element={<Deliveries />} />
      <Route path="verify" element={<DeliveryVerification />} />
    </Route>

    {documentsRoutes(M)}
    {paymentsRoutes(M)}
    {disputesRoutes(M)}
    {decisionRoute(M)}
    {workspaceRoutes(M)}
  </>
)

/* =============================================================================
 * PROFESSIONAL   /app/professional/*
 * ========================================================================== */

const P = '/app/professional'

export const professionalRoutes = (
  <>
    <Route path={P} element={<ProfessionalDashboard />} />

    <Route
      path={`${P}/invitations`}
      element={
        <ModulePage title="Service Invitations">
          <ServiceInvitations />
        </ModulePage>
      }
    />
    <Route
      path={`${P}/proposals`}
      element={
        <ModulePage title="Proposals">
          <Proposals />
        </ModulePage>
      }
    />
    <Route
      path={`${P}/deliverables`}
      element={
        <ModulePage title="Deliverables">
          <Deliverables />
        </ModulePage>
      }
    />

    {documentsRoutes(P)}
    {paymentsRoutes(P)}
    {decisionRoute(P)}
    {workspaceRoutes(P)}
  </>
)

/* =============================================================================
 * PROJECT MANAGER   /app/pm/*
 * ========================================================================== */

const PM = '/app/pm'

export const pmRoutes = (
  <>
    <Route path={PM} element={<ProjectManagerDashboard />} />

    <Route
      path={`${PM}/projects`}
      element={
        <ModulePage title="Assigned Projects">
          <ProjectList />
        </ModulePage>
      }
    />
    <Route
      path={`${PM}/inspections`}
      element={
        <ModulePage title="Inspections">
          <Inspections />
        </ModulePage>
      }
    />
    <Route
      path={`${PM}/milestones`}
      element={
        <ModulePage title="Milestone Verification">
          <MilestoneReview />
        </ModulePage>
      }
    />

    {/* Evidence: library, then a detail page and its review screen */}
    <Route
      path={`${PM}/evidence`}
      element={
        <ModulePage title="Evidence">
          <EvidenceLibrary />
        </ModulePage>
      }
    />
    <Route
      path={`${PM}/evidence/:evidenceId`}
      element={
        <ModulePage title="Evidence">
          <EvidenceDetails />
        </ModulePage>
      }
    />
    <Route
      path={`${PM}/evidence/:evidenceId/review`}
      element={
        <ModulePage title="Review evidence">
          <EvidenceReview />
        </ModulePage>
      }
    />

    <Route
      path={`${PM}/risks`}
      element={
        <ModulePage title="Risk Alerts">
          <RiskAlerts />
        </ModulePage>
      }
    />
    <Route
      path={`${PM}/reports`}
      element={
        <ModulePage title="Reports">
          <ProjectReports />
        </ModulePage>
      }
    />

    {documentsRoutes(PM)}
    {workspaceRoutes(PM)}
  </>
)


/* =============================================================================
 * ADMIN   /app/admin/*
 * ========================================================================== */

const A = '/app/admin'

const tabsOf = (base: string, items: Array<[label: string, sub: string]>): SectionTab[] =>
  items.map(([label, sub], i) => ({ label, to: sub ? `${base}/${sub}` : base, end: i === 0 }))

export const adminRoutes = (
  <>
    <Route path={A} element={<AdminDashboard />} />

    {/* People */}
    <Route
      path={`${A}/users`}
      element={<HubLayout title="Users" tabs={tabsOf(`${A}/users`, [['All users', ''], ['Audit logs', 'audit-logs'], ['Settings', 'settings']])} />}
    >
      <Route index element={<Users />} />
      <Route path="audit-logs" element={<AuditLogs />} />
      <Route path="settings" element={<AdminSettings />} />
    </Route>
    <Route
      path={`${A}/verification`}
      element={
        <ModulePage title="Verification Queue">
          <AdminVerificationQueue />
        </ModulePage>
      }
    />

    {/* Work on the platform */}
    <Route
      path={`${A}/projects`}
      element={
        <ModulePage title="All Projects">
          <ProjectList />
        </ModulePage>
      }
    />
    <Route
      path={`${A}/marketplace`}
      element={<HubLayout title="Marketplace" tabs={tabsOf(`${A}/marketplace`, [['Listings', ''], ['Catalogue', 'catalogue'], ['Analytics', 'analytics']])} />}
    >
      <Route index element={<MarketList />} />
      <Route path="catalogue" element={<Catalogue />} />
      <Route path="analytics" element={<MarketplaceAnalytics />} />
    </Route>
    <Route
      path={`${A}/procurement`}
      element={
        <ModulePage title="Procurement Oversight">
          <ProcurementDashboard />
        </ModulePage>
      }
    />

    {/* Money: escrow oversight */}
    <Route
      path={`${A}/escrow`}
      element={
        <HubLayout
          title="Escrow Oversight"
          tabs={tabsOf(`${A}/escrow`, [
            ['Wallet', ''],
            ['Transactions', 'transactions'],
            ['Payment approvals', 'approvals'],
            ['Payment requests', 'requests'],
            ['Frozen payments', 'frozen'],
            ['Refunds', 'refunds'],
          ])}
        />
      }
    >
      <Route index element={<Wallet />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="approvals" element={<PaymentApprovals />} />
      <Route path="requests" element={<PaymentRequests />} />
      <Route path="frozen" element={<FrozenPayments />} />
      <Route path="refunds" element={<Refunds />} />
    </Route>

    {disputesRoutes(A)}

    {/* Compliance */}
    <Route
      path={`${A}/compliance`}
      element={
        <ModulePage title="Compliance">
          <Compliance />
        </ModulePage>
      }
    />

    {/* Reports + analytics */}
    <Route
      path={`${A}/reports`}
      element={<HubLayout title="Reports" tabs={tabsOf(`${A}/reports`, [['Management', ''], ['Projects', 'projects'], ['Financial', 'financial'], ['Audit', 'audit'], ['Compliance', 'compliance']])} />}
    >
      <Route index element={<ManagementReports />} />
      <Route path="projects" element={<ProjectReports />} />
      <Route path="financial" element={<FinancialReports />} />
      <Route path="audit" element={<AuditReports />} />
      <Route path="compliance" element={<ComplianceReports />} />
    </Route>
    <Route
      path={`${A}/analytics`}
      element={<HubLayout title="Analytics" tabs={tabsOf(`${A}/analytics`, [['Overview', ''], ['Projects', 'projects'], ['Financial', 'financial'], ['Contractors', 'contractors'], ['Risk', 'risk']])} />}
    >
      <Route index element={<AnalyticsOverview />} />
      <Route path="projects" element={<ProjectAnalytics />} />
      <Route path="financial" element={<FinancialAnalytics />} />
      <Route path="contractors" element={<ContractorAnalytics />} />
      <Route path="risk" element={<RiskAnalytics />} />
    </Route>

    {documentsRoutes(A)}
    {decisionRoute(A)}
    {workspaceRoutes(A)}
  </>
)
