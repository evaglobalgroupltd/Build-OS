import type { SectionTab } from '@/components/ui/HubLayout'

/* Tab bars for each client hub. Kept in a plain .ts file with type-only imports
 * so pages (Decisions, Updates...) and the route table can both import them
 * without creating an import cycle. */

const B = '/app/client'

export const decisionTabs: SectionTab[] = [
  { label: 'Decisions', to: `${B}/decisions`, end: true },
  { label: 'Milestone approvals', to: `${B}/decisions/approvals` },
  { label: 'History', to: `${B}/decisions/history` },
]

export const updatesTabs: SectionTab[] = [
  { label: 'Activity', to: `${B}/updates`, end: true },
  { label: 'Notifications', to: `${B}/updates/notifications` },
  { label: 'Preferences', to: `${B}/updates/preferences` },
]

export const escrowTabs: SectionTab[] = [
  { label: 'Wallet', to: `${B}/escrow`, end: true },
  { label: 'Transactions', to: `${B}/escrow/transactions` },
  { label: 'Fund project', to: `${B}/escrow/fund` },
  { label: 'Payment approvals', to: `${B}/escrow/approvals` },
  { label: 'Payment requests', to: `${B}/escrow/requests` },
  { label: 'Frozen payments', to: `${B}/escrow/frozen` },
  { label: 'Refunds', to: `${B}/escrow/refunds` },
]

export const procurementTabs: SectionTab[] = [
  { label: 'Requests', to: `${B}/procurement`, end: true },
  { label: 'Overview', to: `${B}/procurement/overview` },
  { label: 'New request', to: `${B}/procurement/new` },
  { label: 'Quotations', to: `${B}/procurement/quotations` },
  { label: 'Compare quotes', to: `${B}/procurement/compare` },
  { label: 'Purchase orders', to: `${B}/procurement/orders` },
  { label: 'Deliveries', to: `${B}/procurement/deliveries` },
  { label: 'Verify delivery', to: `${B}/procurement/verify` },
]

export const reportTabs: SectionTab[] = [
  { label: 'Project', to: `${B}/reports`, end: true },
  { label: 'Financial', to: `${B}/reports/financial` },
  { label: 'Progress', to: `${B}/reports/progress` },
  { label: 'Daily', to: `${B}/reports/daily` },
  { label: 'Weekly', to: `${B}/reports/weekly` },
  { label: 'Monthly', to: `${B}/reports/monthly` },
  { label: 'Library', to: `${B}/reports/library` },
]

export const disputeTabs: SectionTab[] = [
  { label: 'All disputes', to: `${B}/disputes`, end: true },
  { label: 'Raise a dispute', to: `${B}/disputes/new` },
]

export const disputeCaseTabs = (id: string): SectionTab[] => [
  { label: 'Case', to: `${B}/disputes/${id}`, end: true },
  { label: 'Evidence', to: `${B}/disputes/${id}/evidence` },
  { label: 'Responses', to: `${B}/disputes/${id}/responses` },
  { label: 'Resolution', to: `${B}/disputes/${id}/resolution` },
]

export const passportTabs: SectionTab[] = [
  { label: 'Passport', to: `${B}/passport`, end: true },
  { label: 'Property', to: `${B}/passport/property` },
  { label: 'Ownership', to: `${B}/passport/ownership` },
  { label: 'Land documents', to: `${B}/passport/land-documents` },
  { label: 'Designs', to: `${B}/passport/designs` },
  { label: 'Inspections', to: `${B}/passport/inspections` },
  { label: 'Contracts', to: `${B}/passport/contracts` },
  { label: 'Payments', to: `${B}/passport/payments` },
  { label: 'Procurement', to: `${B}/passport/procurement` },
  { label: 'Warranties', to: `${B}/passport/warranties` },
  { label: 'Handover', to: `${B}/passport/handover` },
  { label: 'Documents', to: `${B}/documents` },
]

export const documentTabs: SectionTab[] = [
  { label: 'Vault', to: `${B}/documents`, end: true },
  { label: 'Upload', to: `${B}/documents/upload` },
  { label: 'Property Passport', to: `${B}/passport` },
]

export const projectTabs = (id: string | number): SectionTab[] => [
  { label: 'Overview', to: `${B}/projects/${id}`, end: true },
  { label: 'Details', to: `${B}/projects/${id}/details` },
  { label: 'Timeline', to: `${B}/projects/${id}/timeline` },
  { label: 'Team', to: `${B}/projects/${id}/team` },
  { label: 'Documents', to: `${B}/projects/${id}/documents` },
  { label: 'Settings', to: `${B}/projects/${id}/settings` },
]