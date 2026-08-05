import { Routes, Route, Navigate } from 'react-router-dom'

import { Home } from '@/pages/public/Home'
import { Login } from '@/pages/auth/Login'
import { Register } from '@/pages/auth/Register'

import { ClientDashboard } from '@/pages/client/Dashboard'
import { ProjectsPage as ClientProjectsPage } from '@/pages/client/Projects'
import { EscrowPage } from '@/pages/client/Escrow'
import { ProcurementPage as ClientProcurementPage } from '@/pages/client/Procurement'
import { ReportsPage as ClientReportsPage } from '@/pages/client/Reports'
import { DisputesPage as ClientDisputesPage } from '@/pages/client/Disputes'
import { PassportPage } from '@/pages/client/Passport'

import { ContractorDashboard } from '@/pages/contractor/Dashboard'
import { ProjectsPage as ContractorAvailableProjectsPage } from '@/pages/contractor/Projects'
import { BidsPage } from '@/pages/contractor/Bids'
import { MilestonesPage as ContractorMilestonesPage } from '@/pages/contractor/Milestones'
import { MaterialsPage } from '@/pages/contractor/Materials'
import { ReportsPage as ContractorReportsPage } from '@/pages/contractor/Reports'
import { PaymentsPage as ContractorPaymentsPage } from '@/pages/contractor/Payments'
import { DisputesPage as ContractorDisputesPage } from '@/pages/contractor/Disputes'

import { SupplierDashboard } from '@/pages/supplier/Dashboard'
import { CataloguePage } from '@/pages/supplier/Catalogue'
import { QuotationsPage } from '@/pages/supplier/Quotations'
import { OrdersPage } from '@/pages/supplier/Orders'
import { DeliveriesPage } from '@/pages/supplier/Deliveries'
import { PaymentsPage as SupplierPaymentsPage } from '@/pages/supplier/Payments'
import { DisputesPage as SupplierDisputesPage } from '@/pages/supplier/Disputes'

import { ProjectManagerDashboard } from '@/pages/project-manager/Dashboard'
import { ProjectsPage as PMProjectsPage } from '@/pages/project-manager/Projects'
import { InspectionsPage } from '@/pages/project-manager/Inspections'
import { MilestonesPage as PMMilestonesPage } from '@/pages/project-manager/Milestones'
import { EvidencePage } from '@/pages/project-manager/Evidence'
import { ReportsPage as PMReportsPage } from '@/pages/project-manager/Reports'
import { RisksPage } from '@/pages/project-manager/Risks'

import { ProfessionalDashboard } from '@/pages/professional/Dashboard'
import { AssignmentsPage } from '@/pages/professional/Assignments'
import { ProposalsPage } from '@/pages/professional/Proposals'
import { DeliverablesPage } from '@/pages/professional/Deliverables'
import { PaymentsPage as ProfessionalPaymentsPage } from '@/pages/professional/Payments'

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

export function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Client */}
      <Route path="/app/client" element={<ClientDashboard />} />
      <Route path="/app/client/projects" element={<ClientProjectsPage />} />
      <Route path="/app/client/escrow" element={<EscrowPage />} />
      <Route path="/app/client/procurement" element={<ClientProcurementPage />} />
      <Route path="/app/client/reports" element={<ClientReportsPage />} />
      <Route path="/app/client/disputes" element={<ClientDisputesPage />} />
      <Route path="/app/client/passport" element={<PassportPage />} />

      {/* Contractor */}
      <Route path="/app/contractor" element={<ContractorDashboard />} />
      <Route path="/app/contractor/available" element={<ContractorAvailableProjectsPage />} />
      <Route path="/app/contractor/bids" element={<BidsPage />} />
      <Route path="/app/contractor/milestones" element={<ContractorMilestonesPage />} />
      <Route path="/app/contractor/materials" element={<MaterialsPage />} />
      <Route path="/app/contractor/reports" element={<ContractorReportsPage />} />
      <Route path="/app/contractor/payments" element={<ContractorPaymentsPage />} />
      <Route path="/app/contractor/disputes" element={<ContractorDisputesPage />} />

      {/* Supplier */}
      <Route path="/app/supplier" element={<SupplierDashboard />} />
      <Route path="/app/supplier/catalogue" element={<CataloguePage />} />
      <Route path="/app/supplier/quotations" element={<QuotationsPage />} />
      <Route path="/app/supplier/orders" element={<OrdersPage />} />
      <Route path="/app/supplier/deliveries" element={<DeliveriesPage />} />
      <Route path="/app/supplier/payments" element={<SupplierPaymentsPage />} />
      <Route path="/app/supplier/disputes" element={<SupplierDisputesPage />} />

      {/* Project Manager */}
      <Route path="/app/pm" element={<ProjectManagerDashboard />} />
      <Route path="/app/pm/projects" element={<PMProjectsPage />} />
      <Route path="/app/pm/inspections" element={<InspectionsPage />} />
      <Route path="/app/pm/milestones" element={<PMMilestonesPage />} />
      <Route path="/app/pm/evidence" element={<EvidencePage />} />
      <Route path="/app/pm/reports" element={<PMReportsPage />} />
      <Route path="/app/pm/risks" element={<RisksPage />} />

      {/* Professional */}
      <Route path="/app/professional" element={<ProfessionalDashboard />} />
      <Route path="/app/professional/invitations" element={<AssignmentsPage />} />
      <Route path="/app/professional/proposals" element={<ProposalsPage />} />
      <Route path="/app/professional/deliverables" element={<DeliverablesPage />} />
      <Route path="/app/professional/payments" element={<ProfessionalPaymentsPage />} />

      {/* Admin */}
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
