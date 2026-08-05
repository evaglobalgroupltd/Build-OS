import type { UserRole, NavItem } from '@/types'

// Nav structure per role, derived from BRD Section 23 (Dashboards and User
// Journeys). Every path here must have a matching <Route> in app/routes.tsx —
// this file is the map the Sidebar renders from.
export const navByRole: Record<UserRole, NavItem[]> = {
  client: [
    { label: 'Overview', path: '/app/client', icon: 'LayoutDashboard' },
    { label: 'Projects', path: '/app/client/projects', icon: 'Building2' },
    { label: 'Escrow Wallet', path: '/app/client/escrow', icon: 'Wallet' },
    { label: 'Procurement', path: '/app/client/procurement', icon: 'PackageSearch' },
    { label: 'Reports', path: '/app/client/reports', icon: 'FileBarChart' },
    { label: 'Disputes', path: '/app/client/disputes', icon: 'Gavel' },
    { label: 'Property Passport', path: '/app/client/passport', icon: 'BadgeCheck' },
  ],
  contractor: [
    { label: 'Overview', path: '/app/contractor', icon: 'LayoutDashboard' },
    { label: 'Available Projects', path: '/app/contractor/available', icon: 'Search' },
    { label: 'My Bids', path: '/app/contractor/bids', icon: 'Gavel' },
    { label: 'Active Milestones', path: '/app/contractor/milestones', icon: 'ListChecks' },
    { label: 'Material Requests', path: '/app/contractor/materials', icon: 'PackageSearch' },
    { label: 'Reports', path: '/app/contractor/reports', icon: 'FileBarChart' },
    { label: 'Payments', path: '/app/contractor/payments', icon: 'Wallet' },
    { label: 'Disputes', path: '/app/contractor/disputes', icon: 'Scale' },
  ],
  supplier: [
    { label: 'Overview', path: '/app/supplier', icon: 'LayoutDashboard' },
    { label: 'Catalogue', path: '/app/supplier/catalogue', icon: 'Boxes' },
    { label: 'Quotation Requests', path: '/app/supplier/quotations', icon: 'FileText' },
    { label: 'Purchase Orders', path: '/app/supplier/orders', icon: 'ClipboardList' },
    { label: 'Deliveries', path: '/app/supplier/deliveries', icon: 'Truck' },
    { label: 'Payments', path: '/app/supplier/payments', icon: 'Wallet' },
    { label: 'Disputes', path: '/app/supplier/disputes', icon: 'Scale' },
  ],
  project_manager: [
    { label: 'Overview', path: '/app/pm', icon: 'LayoutDashboard' },
    { label: 'Assigned Projects', path: '/app/pm/projects', icon: 'Building2' },
    { label: 'Inspections', path: '/app/pm/inspections', icon: 'ClipboardCheck' },
    { label: 'Milestone Verification', path: '/app/pm/milestones', icon: 'ListChecks' },
    { label: 'Evidence', path: '/app/pm/evidence', icon: 'FolderCheck' },
    { label: 'Risk Alerts', path: '/app/pm/risks', icon: 'TriangleAlert' },
    { label: 'Reports', path: '/app/pm/reports', icon: 'FileBarChart' },
  ],
  professional: [
    { label: 'Overview', path: '/app/professional', icon: 'LayoutDashboard' },
    { label: 'Service Invitations', path: '/app/professional/invitations', icon: 'Mail' },
    { label: 'Proposals', path: '/app/professional/proposals', icon: 'FileText' },
    { label: 'Deliverables', path: '/app/professional/deliverables', icon: 'FolderCheck' },
    { label: 'Payments', path: '/app/professional/payments', icon: 'Wallet' },
  ],
  admin: [
    { label: 'Overview', path: '/app/admin', icon: 'LayoutDashboard' },
    { label: 'Users', path: '/app/admin/users', icon: 'Users' },
    { label: 'Verification Queue', path: '/app/admin/verification', icon: 'BadgeCheck' },
    { label: 'Projects', path: '/app/admin/projects', icon: 'Building2' },
    { label: 'Marketplace', path: '/app/admin/marketplace', icon: 'Boxes' },
    { label: 'Procurement', path: '/app/admin/procurement', icon: 'PackageSearch' },
    { label: 'Escrow Oversight', path: '/app/admin/escrow', icon: 'Wallet' },
    { label: 'Disputes', path: '/app/admin/disputes', icon: 'Gavel' },
    { label: 'Compliance', path: '/app/admin/compliance', icon: 'ShieldCheck' },
    { label: 'Reports', path: '/app/admin/reports', icon: 'FileBarChart' },
    { label: 'Analytics', path: '/app/admin/analytics', icon: 'ChartColumn' },
  ],
}

export const roleLabels: Record<UserRole, string> = {
  client: 'Client / Diaspora Investor',
  contractor: 'Contractor',
  supplier: 'Supplier',
  project_manager: 'Project Manager',
  professional: 'Professional Expert',
  admin: 'Build OS Admin',
}
