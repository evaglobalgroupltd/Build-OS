/* =============================================================================
 * src/hooks/useWorkspace.ts
 *
 * Everything the shared Messages / Updates / Decisions pages need to know about
 * "who am I looking at": the role, where its links go, its wording and its data.
 *
 *   const ws = useWorkspace()
 *   <Link to={ws.routes.messages}>…   ws.copy.portal   ws.data.updates
 *
 * The role comes from the URL first (/app/contractor/... => contractor), so a
 * link can never jump to another actor's area.
 * ========================================================================== */

import { useMemo } from 'react'

import { useAppRoutes } from '@/config/appRoutes'
import { useProjectHref } from '@/pages/client/clientRoutes'
import { conversationsByRole, decisionsByRole, updatesByRole } from '@/data/workspaceData'
import type { SectionTab } from '@/components/ui/HubLayout'
import type { UserRole } from '@/types'

export interface RoleCopy {
  /** Breadcrumb root, e.g. "Client Portal". */
  portal: string
  /** Who the user talks to / works with. */
  counterpart: string
  /** Label for the money link: "escrow" for clients, "payments" for earners. */
  money: string
  /** Decisions hero, two lines. */
  decisionsHeadline: [string, string]
  decisionsIntro: string
  /** Wording used when a decision is resolved. */
  approveNote: string
  rejectNote: string
  clarifyNote: string
  messagesIntro: string
  updatesIntro: string
}

const CLIENT_COPY: RoleCopy = {
  portal: 'Client Portal',
  counterpart: 'project team',
  money: 'escrow',
  decisionsHeadline: ['Decisions that move', 'your projects forward.'],
  decisionsIntro:
    'Review project decisions, understand their financial and operational impact, and provide approvals without losing visibility across your Build OS workspace.',
  approveNote: 'Your approval has been recorded. Any related payment follows the escrow release rules.',
  rejectNote: 'Your rejection has been recorded. The project team will be asked to revise and resubmit.',
  clarifyNote: 'The project team has been asked for more context. You can follow up in Messages.',
  messagesIntro:
    'Communicate directly with the people responsible for your projects, while keeping project conversations connected to the Build OS record.',
  updatesIntro: 'Everything that changed on your projects, in one place.',
}

const COPY: Partial<Record<UserRole, RoleCopy>> = {
  client: CLIENT_COPY,
  diaspora_client: CLIENT_COPY,
  contractor: {
    portal: 'Contractor Portal',
    counterpart: 'client and project manager',
    money: 'payments',
    decisionsHeadline: ['Respond fast,', 'keep every job moving.'],
    decisionsIntro:
      'Awards, variation requests and schedule changes that need your answer. Every response is recorded against the project.',
    approveNote: 'Your acceptance has been recorded and the client has been notified.',
    rejectNote: 'Your decline has been recorded. The client will be notified.',
    clarifyNote: 'The client has been asked for more detail. You can follow up in Messages.',
    messagesIntro: 'Talk to clients, project managers and suppliers, with every conversation tied to the project record.',
    updatesIntro: 'Awards, payments, inspections and evidence across your jobs.',
  },
  market_place: {
    portal: 'Marketplace Portal',
    counterpart: 'buyer',
    money: 'payments',
    decisionsHeadline: ['Quote, confirm,', 'deliver with confidence.'],
    decisionsIntro:
      'Quotation requests, purchase orders and delivery issues waiting for your response. Every answer is recorded against the order.',
    approveNote: 'Your response has been recorded and the buyer has been notified.',
    rejectNote: 'Your decline has been recorded. The buyer will be notified.',
    clarifyNote: 'The buyer has been asked for more detail. You can follow up in Messages.',
    messagesIntro: 'Talk to contractors and the procurement desk, with every conversation tied to the order record.',
    updatesIntro: 'Quotation requests, orders, deliveries and payments across your catalogue.',
  },
  professional: {
    portal: 'Professional Portal',
    counterpart: 'client',
    money: 'payments',
    decisionsHeadline: ['Take on the right work,', 'on your terms.'],
    decisionsIntro:
      'Service invitations, scope changes and schedule requests waiting for your answer. Every response is recorded against the engagement.',
    approveNote: 'Your acceptance has been recorded and the client has been notified.',
    rejectNote: 'Your decline has been recorded. The client will be notified.',
    clarifyNote: 'The client has been asked for more detail. You can follow up in Messages.',
    messagesIntro: 'Talk to clients and project managers, with every conversation tied to the engagement record.',
    updatesIntro: 'Invitations, deliverables and payments across your engagements.',
  },
  admin: {
    portal: 'Admin Console',
    counterpart: 'platform users',
    money: 'escrow',
    decisionsHeadline: ['Oversight that keeps', 'the platform trusted.'],
    decisionsIntro:
      'Verifications, flagged releases and disputes waiting for an admin ruling. Every ruling is written to the audit log.',
    approveNote: 'Your approval has been recorded in the audit log.',
    rejectNote: 'Your rejection has been recorded in the audit log and the requester will be notified.',
    clarifyNote: 'The requester has been asked for more information. You can follow up in Messages.',
    messagesIntro: 'Talk to clients, contractors, suppliers and professionals about verification, payments and disputes.',
    updatesIntro: 'Verification, escrow, compliance and dispute activity across the platform.',
  },
  project_manager: {
    portal: 'Project Manager Portal',
    counterpart: 'contractor and client',
    money: 'payments',
    decisionsHeadline: ['Verify with evidence,', 'decide with confidence.'],
    decisionsIntro: 'Items waiting for your verification decision.',
    approveNote: 'Your verification has been recorded.',
    rejectNote: 'Your rejection has been recorded. The contractor will be asked to resubmit.',
    clarifyNote: 'The contractor has been asked for more detail. You can follow up in Messages.',
    messagesIntro: 'Talk to contractors and clients, with every conversation tied to the project record.',
    updatesIntro: 'Evidence, inspections and client requests across your assigned projects.',
  },
}

/** Tabs for the Updates area (Activity / Notifications / Preferences). Same for every role. */
export const updatesTabsFor = (base: string): SectionTab[] => [
  { label: 'Activity', to: `${base}/updates`, end: true },
  { label: 'Notifications', to: `${base}/updates/notifications` },
  { label: 'Preferences', to: `${base}/updates/preferences` },
]

export function useWorkspace() {
  const app = useAppRoutes()
  const clientProjectHref = useProjectHref()
  const { role, to, has } = app

  return useMemo(() => {
    const overview = to('overview')
    const projects = has('projects') ? to('projects') : overview

    const routes = {
      overview,
      projects,
      decisions: has('decisions') ? to('decisions') : overview,
      /** Escrow for clients, payments for everyone else. */
      escrow: has('money') ? to('money') : overview,
      messages: to('messages'),
      updates: to('updates'),
      reports: has('reports') ? to('reports') : overview,
      /** Only clients have a Property Passport; others land on their project list. */
      passport: has('passport') ? to('passport') : projects,
    }

    return {
      role,
      routes,
      copy: COPY[role] ?? CLIENT_COPY,
      /** Clients get real project detail pages; other roles land on their project list. */
      projectHref: role === 'client' || role === 'diaspora_client' ? clientProjectHref : () => projects,
      hasDecisions: has('decisions'),
      hasDecisionApprovals: role === 'client' || role === 'diaspora_client',
      isClient: role === 'client' || role === 'diaspora_client',
      updatesTabs: updatesTabsFor(overview),
      data: {
        conversations: conversationsByRole(role),
        updates: updatesByRole(role),
        decisions: decisionsByRole(role),
      },
    }
  }, [role, to, has, clientProjectHref])
}
