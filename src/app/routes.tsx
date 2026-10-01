import { Routes, Route, Navigate } from 'react-router-dom'

import {
  Home,
  Solutions,
  Projects as PublicProjectsPage,
  About,
  Contact,
  Privacy,
  Terms,
  ScrollManager,
} from '@/pages/public/Home'

import { Login } from '@/pages/auth/Login'
import { Join } from '@/pages/auth/Join'
import { Register } from '@/pages/auth/Register'
import { ProjectQuestionnaire } from '@/components/ProjectQuestionnaire'

/* -------------------------------------------------------------------------- */
/* Client: the whole /app/client/* tree lives in clientHubs.tsx               */
/* -------------------------------------------------------------------------- */

import { clientHubRoutes } from './clientHubs'

/* -------------------------------------------------------------------------- */
/* Contractor                                                                 */
/* -------------------------------------------------------------------------- */

import { ContractorDashboard } from '@/pages/contractor/Dashboard'
import { ProjectsPage as ContractorAvailableProjectsPage } from '@/pages/contractor/Projects'
import { BidsPage } from '@/pages/contractor/Bids'
import { MilestonesPage as ContractorMilestonesPage } from '@/pages/contractor/Milestones'
import { MaterialsPage } from '@/pages/contractor/Materials'
import { ReportsPage as ContractorReportsPage } from '@/pages/contractor/Reports'
import { PaymentsPage as ContractorPaymentsPage } from '@/pages/contractor/Payments'
import { DisputesPage as ContractorDisputesPage } from '@/pages/contractor/Disputes'

/* -------------------------------------------------------------------------- */
/* Marketplace                                                                */
/* -------------------------------------------------------------------------- */

import { MarketDashboard } from '@/pages/market-place/Dashboard'
import { CataloguePage } from '@/pages/market-place/Catalogue'
import { QuotationsPage } from '@/pages/market-place/Quotations'
import { OrdersPage } from '@/pages/market-place/Orders'
import { DeliveriesPage } from '@/pages/market-place/Deliveries'
import { PaymentsPage as MarketPaymentsPage } from '@/pages/market-place/Payments'
import { DisputesPage as MarketDisputesPage } from '@/pages/market-place/Disputes'

/* -------------------------------------------------------------------------- */
/* Project Manager                                                            */
/* -------------------------------------------------------------------------- */

import { ProjectManagerDashboard } from '@/pages/project-manager/Dashboard'
import { ProjectsPage as PMProjectsPage } from '@/pages/project-manager/Projects'
import { InspectionsPage } from '@/pages/project-manager/Inspections'
import { MilestonesPage as PMMilestonesPage } from '@/pages/project-manager/Milestones'
import { EvidencePage } from '@/pages/project-manager/Evidence'
import { ReportsPage as PMReportsPage } from '@/pages/project-manager/Reports'
import { RisksPage } from '@/pages/project-manager/Risks'

/* -------------------------------------------------------------------------- */
/* Professional                                                               */
/* -------------------------------------------------------------------------- */

import { ProfessionalDashboard } from '@/pages/professional/Dashboard'
import { AssignmentsPage } from '@/pages/professional/Assignments'
import { ProposalsPage } from '@/pages/professional/Proposals'
import { DeliverablesPage } from '@/pages/professional/Deliverables'
import { PaymentsPage as ProfessionalPaymentsPage } from '@/pages/professional/Payments'

/* -------------------------------------------------------------------------- */
/* Admin                                                                      */
/* -------------------------------------------------------------------------- */

import { AdminDashboard } from '@/pages/admin/Dashboard'
import { UsersPage } from '@/pages/admin/Users'
import { VerificationPage } from '@/pages/admin/Verification'
import { ProjectsPage as AdminProjectsPage } from '@/pages/admin/Projects'
import { MarketplacePage } from '@/pages/admin/Marketplace'
import { ProcurementPage as AdminProcurementPage } from '@/pages/admin/Procurement'
import { EscrowPage as AdminEscrowPage } from '@/pages/admin/Escrow'
import { DisputesPage as AdminDisputesPage } from '@/pages/admin/Disputes'
import { CompliancePage } from '@/pages/admin/Compliance'
import { ReportsPage as AdminReportsPage } from '@/pages/admin/Reports'
import { AnalyticsPage } from '@/pages/admin/Analytics'

/* =============================================================================
 * APP ROUTES
 *
 * Specific routes always beat the "/app/client/*" style fallbacks at the bottom,
 * regardless of order. A client link that bounces to the dashboard means its
 * route is missing from clientHubs.tsx.
 * ========================================================================== */

export function AppRoutes() {
  return (
    <>
      <ScrollManager />

      <Routes>
        {/* ================================ PUBLIC ================================ */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<PublicProjectsPage />} />
        <Route path="/solutions/:audience" element={<Solutions />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* ======================== ONBOARDING / PROJECT STUDIO =================== */}
        {/* Canonical Project Studio route (CLIENT_ROUTES.studio = '/onboarding'). */}
        <Route path="/onboarding" element={<ProjectQuestionnaire />} />

        {/* ================================ CLIENT ================================ */}
        {/* Overview, projects, decisions, escrow, procurement, reports, disputes,
            passport, documents, evidence, milestones, updates, messages, and the
            legacy /vault + /questionnaire redirects. */}
        {clientHubRoutes}

        {/* ============================== CONTRACTOR ============================== */}
        <Route path="/app/contractor" element={<ContractorDashboard />} />
        <Route path="/app/contractor/available" element={<ContractorAvailableProjectsPage />} />
        <Route path="/app/contractor/bids" element={<BidsPage />} />
        <Route path="/app/contractor/milestones" element={<ContractorMilestonesPage />} />
        <Route path="/app/contractor/materials" element={<MaterialsPage />} />
        <Route path="/app/contractor/reports" element={<ContractorReportsPage />} />
        <Route path="/app/contractor/payments" element={<ContractorPaymentsPage />} />
        <Route path="/app/contractor/disputes" element={<ContractorDisputesPage />} />

        {/* ============================== MARKETPLACE ============================= */}
        <Route path="/app/market" element={<MarketDashboard />} />
        <Route path="/app/market/catalogue" element={<CataloguePage />} />
        <Route path="/app/market/quotations" element={<QuotationsPage />} />
        <Route path="/app/market/orders" element={<OrdersPage />} />
        <Route path="/app/market/deliveries" element={<DeliveriesPage />} />
        <Route path="/app/market/payments" element={<MarketPaymentsPage />} />
        <Route path="/app/market/disputes" element={<MarketDisputesPage />} />

        {/* ============================ PROJECT MANAGER =========================== */}
        <Route path="/app/pm" element={<ProjectManagerDashboard />} />
        <Route path="/app/pm/projects" element={<PMProjectsPage />} />
        <Route path="/app/pm/inspections" element={<InspectionsPage />} />
        <Route path="/app/pm/milestones" element={<PMMilestonesPage />} />
        <Route path="/app/pm/evidence" element={<EvidencePage />} />
        <Route path="/app/pm/reports" element={<PMReportsPage />} />
        <Route path="/app/pm/risks" element={<RisksPage />} />

        {/* ============================== PROFESSIONAL ============================ */}
        <Route path="/app/professional" element={<ProfessionalDashboard />} />
        <Route path="/app/professional/invitations" element={<AssignmentsPage />} />
        <Route path="/app/professional/proposals" element={<ProposalsPage />} />
        <Route path="/app/professional/deliverables" element={<DeliverablesPage />} />
        <Route path="/app/professional/payments" element={<ProfessionalPaymentsPage />} />

        {/* ================================= ADMIN ================================ */}
        <Route path="/app/admin" element={<AdminDashboard />} />
        <Route path="/app/admin/users" element={<UsersPage />} />
        <Route path="/app/admin/verification" element={<VerificationPage />} />
        <Route path="/app/admin/projects" element={<AdminProjectsPage />} />
        <Route path="/app/admin/marketplace" element={<MarketplacePage />} />
        <Route path="/app/admin/procurement" element={<AdminProcurementPage />} />
        <Route path="/app/admin/escrow" element={<AdminEscrowPage />} />
        <Route path="/app/admin/disputes" element={<AdminDisputesPage />} />
        <Route path="/app/admin/compliance" element={<CompliancePage />} />
        <Route path="/app/admin/reports" element={<AdminReportsPage />} />
        <Route path="/app/admin/analytics" element={<AnalyticsPage />} />

        {/* ============================ APPLICATION FALLBACKS ===================== */}
        <Route path="/app" element={<Navigate to="/app/client" replace />} />
        <Route path="/app/client/*" element={<Navigate to="/app/client" replace />} />
        <Route path="/app/contractor/*" element={<Navigate to="/app/contractor" replace />} />
        <Route path="/app/market/*" element={<Navigate to="/app/market" replace />} />
        <Route path="/app/pm/*" element={<Navigate to="/app/pm" replace />} />
        <Route path="/app/professional/*" element={<Navigate to="/app/professional" replace />} />
        <Route path="/app/admin/*" element={<Navigate to="/app/admin" replace />} />
        <Route path="/app/*" element={<Navigate to="/app/client" replace />} />

        {/* Global fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}