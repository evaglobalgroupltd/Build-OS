
import type { UserRole, NavItem } from '@/types'

/**
 * Build OS navigation
 * ---------------------------------------------------------------------------
 * Single source of truth for sidebar navigation.
 *
 * Every path defined here must have a matching <Route> in app/routes.tsx.
 *
 * Client architecture:
 *
 * Overview
 * Projects
 * Decisions
 * Escrow
 * Procurement
 * Reports
 * Messages
 * Updates
 * Property Passport
 * Disputes
 *
 * The ordering intentionally follows the client's operating workflow:
 *
 * Understand → Manage Projects → Make Decisions → Secure Funds
 * → Procure → Review → Communicate → Track → Verify → Resolve
 * ---------------------------------------------------------------------------
 */

export const navByRole: Record<UserRole, NavItem[]> = {
  /* =========================================================================
   * CLIENT
   * ========================================================================= */

  client: [
    {
      label: 'Overview',
      path: '/app/client',
      icon: 'LayoutDashboard',
    },

    {
      label: 'Projects',
      path: '/app/client/projects',
      icon: 'Building2',
    },

    {
      label: 'Decisions',
      path: '/app/client/decisions',
      icon: 'GitPullRequestArrow',
    },

    {
      label: 'Escrow',
      path: '/app/client/escrow',
      icon: 'ShieldCheck',
    },

    {
      label: 'Procurement',
      path: '/app/client/procurement',
      icon: 'PackageSearch',
    },

    {
      label: 'Reports',
      path: '/app/client/reports',
      icon: 'FileBarChart',
    },

    {
      label: 'Messages',
      path: '/app/client/messages',
      icon: 'MessagesSquare',
    },

    {
      label: 'Updates',
      path: '/app/client/updates',
      icon: 'BellRing',
    },

    {
      label: 'Property Passport',
      path: '/app/client/passport',
      icon: 'BadgeCheck',
    },

    {
      label: 'Disputes',
      path: '/app/client/disputes',
      icon: 'Scale',
    },
  ],

  /* =========================================================================
   * CONTRACTOR
   * ========================================================================= */

  contractor: [
    {
      label: 'Overview',
      path: '/app/contractor',
      icon: 'LayoutDashboard',
    },

    {
      label: 'Available Projects',
      path: '/app/contractor/available',
      icon: 'Search',
    },

    {
      label: 'My Bids',
      path: '/app/contractor/bids',
      icon: 'Gavel',
    },

    {
      label: 'Active Milestones',
      path: '/app/contractor/milestones',
      icon: 'ListChecks',
    },

    {
      label: 'Material Requests',
      path: '/app/contractor/materials',
      icon: 'PackageSearch',
    },

    {
      label: 'Reports',
      path: '/app/contractor/reports',
      icon: 'FileBarChart',
    },

    {
      label: 'Payments',
      path: '/app/contractor/payments',
      icon: 'Wallet',
    },

    {
      label: 'Disputes',
      path: '/app/contractor/disputes',
      icon: 'Scale',
    },
  ],

  /* =========================================================================
   * MARKET PLACE
   * ========================================================================= */

  market_place: [
    {
      label: 'Overview',
      path: '/app/market',
      icon: 'LayoutDashboard',
    },

    {
      label: 'Catalogue',
      path: '/app/market/catalogue',
      icon: 'Boxes',
    },

    {
      label: 'Quotation Requests',
      path: '/app/market/quotations',
      icon: 'FileText',
    },

    {
      label: 'Purchase Orders',
      path: '/app/market/orders',
      icon: 'ClipboardList',
    },

    {
      label: 'Deliveries',
      path: '/app/market/deliveries',
      icon: 'Truck',
    },

    {
      label: 'Payments',
      path: '/app/market/payments',
      icon: 'Wallet',
    },

    {
      label: 'Disputes',
      path: '/app/market/disputes',
      icon: 'Scale',
    },
  ],

  /* =========================================================================
   * PROJECT MANAGER
   * ========================================================================= */

  project_manager: [
    {
      label: 'Overview',
      path: '/app/pm',
      icon: 'LayoutDashboard',
    },

    {
      label: 'Assigned Projects',
      path: '/app/pm/projects',
      icon: 'Building2',
    },

    {
      label: 'Inspections',
      path: '/app/pm/inspections',
      icon: 'ClipboardCheck',
    },

    {
      label: 'Milestone Verification',
      path: '/app/pm/milestones',
      icon: 'ListChecks',
    },

    {
      label: 'Evidence',
      path: '/app/pm/evidence',
      icon: 'FolderCheck',
    },

    {
      label: 'Risk Alerts',
      path: '/app/pm/risks',
      icon: 'TriangleAlert',
    },

    {
      label: 'Reports',
      path: '/app/pm/reports',
      icon: 'FileBarChart',
    },
  ],

  /* =========================================================================
   * PROFESSIONAL EXPERT
   * ========================================================================= */

  professional: [
    {
      label: 'Overview',
      path: '/app/professional',
      icon: 'LayoutDashboard',
    },

    {
      label: 'Service Invitations',
      path: '/app/professional/invitations',
      icon: 'Mail',
    },

    {
      label: 'Proposals',
      path: '/app/professional/proposals',
      icon: 'FileText',
    },

    {
      label: 'Deliverables',
      path: '/app/professional/deliverables',
      icon: 'FolderCheck',
    },

    {
      label: 'Payments',
      path: '/app/professional/payments',
      icon: 'Wallet',
    },
  ],

  /* =========================================================================
   * ADMIN
   * ========================================================================= */

  admin: [
    {
      label: 'Overview',
      path: '/app/admin',
      icon: 'LayoutDashboard',
    },

    {
      label: 'Users',
      path: '/app/admin/users',
      icon: 'Users',
    },

    {
      label: 'Verification Queue',
      path: '/app/admin/verification',
      icon: 'BadgeCheck',
    },

    {
      label: 'Projects',
      path: '/app/admin/projects',
      icon: 'Building2',
    },

    {
      label: 'Marketplace',
      path: '/app/admin/marketplace',
      icon: 'Boxes',
    },

    {
      label: 'Procurement',
      path: '/app/admin/procurement',
      icon: 'PackageSearch',
    },

    {
      label: 'Escrow Oversight',
      path: '/app/admin/escrow',
      icon: 'Wallet',
    },

    {
      label: 'Disputes',
      path: '/app/admin/disputes',
      icon: 'Gavel',
    },

    {
      label: 'Compliance',
      path: '/app/admin/compliance',
      icon: 'ShieldCheck',
    },

    {
      label: 'Reports',
      path: '/app/admin/reports',
      icon: 'FileBarChart',
    },

    {
      label: 'Analytics',
      path: '/app/admin/analytics',
      icon: 'ChartColumn',
    },
  ],
}

/* ============================================================================
 * ROLE LABELS
 * ========================================================================== */

export const roleLabels: Record<UserRole, string> = {
  client: 'Client',
  contractor: 'Contractor',
  market_place: 'Market Place',
  project_manager: 'Project Manager',
  professional: 'Professional Expert',
  admin: 'Build OS Admin',
}
