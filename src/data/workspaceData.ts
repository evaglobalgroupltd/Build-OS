/* =============================================================================
 * src/data/workspaceData.ts
 *
 * Mock data for the three pages every actor shares: Messages, Updates and
 * Decisions (src/pages/workspace/*). One file, one record set per role, so the
 * backend swap later is a single place: replace each `*ByRole` lookup with an
 * API call keyed by the signed-in role.
 *
 * Roles with no entry (admin) simply have no workspace pages.
 * ========================================================================== */

import type { UserRole } from '@/types'

/* ------------------------------- Messages -------------------------------- */

/** 'me' = the signed-in user, 'them' = the other party in the conversation. */
export type MessageSender = 'me' | 'them'

export type Message = {
  id: number
  sender: MessageSender
  text: string
  time: string
  read?: boolean
  attachment?: {
    name: string
    type: 'document' | 'image'
    /** Object URL for files you just attached. */
    url?: string
  }
}

export type Conversation = {
  id: string
  name: string
  role: string
  initials: string
  project: string
  projectId: string
  online: boolean
  unread: number
  lastMessage: string
  lastTime: string
  accent: string
  messages: Message[]
}

/* -------------------------------- Updates -------------------------------- */

export type UpdateType =
  | 'evidence'
  | 'approval'
  | 'document'
  | 'payment'
  | 'message'
  | 'inspection'
  | 'project'

export type UpdateStatus = 'new' | 'action_required' | 'completed' | 'informational'

/** Where the primary button for an update should go. */
export type UpdateAction = 'decisions' | 'project' | 'escrow' | 'passport' | 'messages'

export type UpdateItem = {
  id: string
  type: UpdateType
  status: UpdateStatus
  title: string
  description: string
  project: string
  projectId: string
  actor: string
  timestamp: string
  dateGroup: 'Today' | 'Yesterday' | 'Earlier'
  amount?: number
  attachments?: number
  action: UpdateAction
  actionLabel: string
  priority?: 'high' | 'normal'
}

/* ------------------------------- Decisions ------------------------------- */

export type DecisionStatus = 'pending' | 'approved' | 'rejected' | 'clarification'
export type DecisionPriority = 'high' | 'medium' | 'low'
export type DecisionAction = 'approve' | 'reject' | 'clarify'

export interface Decision {
  id: string
  title: string
  description: string
  project: string
  projectId: string
  category: string
  status: DecisionStatus
  priority: DecisionPriority
  requestedBy: string
  requestedDate: string
  deadline?: string
  financialImpact?: string
  financialValue?: number
  recommendation?: string
  requiresPayment?: boolean
}

/* ========================================================================== */
/* CLIENT                                                                     */
/* ========================================================================== */

const clientConversations: Conversation[] = [
  {
    id: 'conv-001',
    name: 'Build Team',
    role: 'Project Contractor',
    initials: 'BT',
    project: 'Lekki Residence',
    projectId: '1',
    online: true,
    unread: 2,
    lastMessage: 'The roofing evidence has been uploaded for your review.',
    lastTime: '10:42 PM',
    accent: 'from-blue-600 to-cyan-500',
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'Good evening. The roofing phase is progressing well and we have completed the main roof structure.',
        time: '8:31 PM',
        read: true,
      },
      {
        id: 2,
        sender: 'me',
        text: 'Great. Please make sure the supporting evidence is uploaded before the milestone is submitted.',
        time: '8:37 PM',
        read: true,
      },
      {
        id: 3,
        sender: 'them',
        text: 'Absolutely. We have uploaded the latest site photographs and inspection evidence.',
        time: '10:21 PM',
        read: true,
      },
      {
        id: 4,
        sender: 'them',
        text: 'The roofing evidence has been uploaded for your review.',
        time: '10:42 PM',
        read: false,
      },
    ],
  },
  {
    id: 'conv-002',
    name: 'Amina Yusuf',
    role: 'Project Manager',
    initials: 'AY',
    project: 'Lekki Residence',
    projectId: '1',
    online: true,
    unread: 0,
    lastMessage: 'I have added the inspection notes to the project.',
    lastTime: 'Yesterday',
    accent: 'from-violet-600 to-fuchsia-500',
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'I have completed the inspection notes for the latest site visit.',
        time: 'Yesterday',
        read: true,
      },
      {
        id: 2,
        sender: 'me',
        text: 'Thank you. I will review them together with the milestone evidence.',
        time: 'Yesterday',
        read: true,
      },
    ],
  },
  {
    id: 'conv-003',
    name: 'Kola Architects',
    role: 'Professional Expert',
    initials: 'KA',
    project: 'Lekki Residence',
    projectId: '1',
    online: false,
    unread: 0,
    lastMessage: 'The revised drawings are ready.',
    lastTime: 'Mon',
    accent: 'from-amber-500 to-orange-500',
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'The revised architectural drawings are now ready for review.',
        time: 'Mon',
        read: true,
        attachment: {
          name: 'Revised Architectural Drawings.pdf',
          type: 'document',
        },
      },
    ],
  },
]

const clientUpdates: UpdateItem[] = [
  {
    id: 'update-001',
    type: 'approval',
    status: 'action_required',
    title: 'Roofing milestone requires your approval',
    description:
      'The contractor has submitted completion evidence for the roofing milestone. Review the evidence before approving the milestone and associated release.',
    project: 'Lekki Residence',
    projectId: '1',
    actor: 'Build Team',
    timestamp: '10:42 PM',
    dateGroup: 'Today',
    amount: 4500000,
    attachments: 6,
    action: 'decisions',
    actionLabel: 'Review milestone',
    priority: 'high',
  },
  {
    id: 'update-002',
    type: 'evidence',
    status: 'new',
    title: 'New site evidence uploaded',
    description:
      'Six new photographs and supporting evidence have been added to the roofing milestone record.',
    project: 'Lekki Residence',
    projectId: '1',
    actor: 'Build Team',
    timestamp: '10:21 PM',
    dateGroup: 'Today',
    attachments: 6,
    action: 'decisions',
    actionLabel: 'View evidence',
    priority: 'normal',
  },
  {
    id: 'update-003',
    type: 'inspection',
    status: 'completed',
    title: 'Site inspection completed',
    description:
      'The latest site inspection has been completed and the inspection notes have been added to the project record.',
    project: 'Lekki Residence',
    projectId: '1',
    actor: 'Amina Yusuf · Project Manager',
    timestamp: '6:18 PM',
    dateGroup: 'Today',
    attachments: 3,
    action: 'project',
    actionLabel: 'View project',
    priority: 'normal',
  },
  {
    id: 'update-004',
    type: 'payment',
    status: 'completed',
    title: 'Structure milestone payment released',
    description:
      'The structure milestone was approved and the corresponding escrow release was recorded.',
    project: 'Lekki Residence',
    projectId: '1',
    actor: 'Build OS',
    timestamp: 'Yesterday',
    dateGroup: 'Yesterday',
    amount: 6750000,
    action: 'escrow',
    actionLabel: 'View escrow',
    priority: 'normal',
  },
  {
    id: 'update-005',
    type: 'document',
    status: 'new',
    title: 'Revised architectural drawings added',
    description:
      'The latest architectural drawing package has been added to the project documentation.',
    project: 'Lekki Residence',
    projectId: '1',
    actor: 'Kola Architects',
    timestamp: 'Yesterday',
    dateGroup: 'Yesterday',
    attachments: 1,
    action: 'passport',
    actionLabel: 'Open Property Passport',
    priority: 'normal',
  },
  {
    id: 'update-006',
    type: 'message',
    status: 'informational',
    title: 'New message from the project team',
    description:
      'The project contractor has sent an update regarding the roofing evidence submission.',
    project: 'Lekki Residence',
    projectId: '1',
    actor: 'Build Team',
    timestamp: 'Yesterday',
    dateGroup: 'Yesterday',
    action: 'messages',
    actionLabel: 'Open messages',
    priority: 'normal',
  },
  {
    id: 'update-007',
    type: 'project',
    status: 'completed',
    title: 'Foundation milestone completed',
    description:
      'The foundation milestone was approved after the required evidence and verification were completed.',
    project: 'Lekki Residence',
    projectId: '1',
    actor: 'Build OS',
    timestamp: '18 Sep',
    dateGroup: 'Earlier',
    amount: 4500000,
    action: 'project',
    actionLabel: 'View project',
    priority: 'normal',
  },
  {
    id: 'update-008',
    type: 'document',
    status: 'completed',
    title: 'Site survey documentation completed',
    description:
      'The completed site survey documentation has been added to the project record.',
    project: 'Lekki Residence',
    projectId: '1',
    actor: 'Professional Team',
    timestamp: '16 Sep',
    dateGroup: 'Earlier',
    attachments: 4,
    action: 'passport',
    actionLabel: 'View passport',
    priority: 'normal',
  },
]

const clientDecisions: Decision[] = [
  {
    id: 'DEC-2026-015',
    title: 'Approve roofing milestone',
    description:
      'The contractor has submitted completion evidence for the roofing milestone. Review the evidence before approving the release.',
    project: 'Lekki Residence',
    projectId: '1',
    category: 'Milestone',
    status: 'pending',
    priority: 'high',
    requestedBy: 'Build Team',
    requestedDate: '29 Sep 2026',
    deadline: '01 Oct 2026',
    financialImpact: '₦4,500,000 held in escrow',
    financialValue: 4500000,
    recommendation:
      'The supervisor has verified the evidence. Approving releases the milestone payment and starts electrical and plumbing.',
    requiresPayment: true,
  },
  {
    id: 'DEC-2026-014',
    title: 'Approve revised foundation reinforcement',
    description:
      'The project team has recommended additional reinforcement following the latest structural inspection.',
    project: 'Gwarinpa Residence',
    projectId: 'gwarinpa-residence',
    category: 'Structural',
    status: 'pending',
    priority: 'high',
    requestedBy: 'Project Management',
    requestedDate: '28 Sep 2026',
    deadline: '02 Oct 2026',
    financialImpact: '+₦1,850,000',
    financialValue: 1850000,
    recommendation:
      'Approve the reinforcement to maintain the structural specification and avoid downstream delays.',
    requiresPayment: true,
  },
  {
    id: 'DEC-2026-013',
    title: 'Select imported bathroom fixtures',
    description:
      'Three fixture packages have been reviewed against the approved bathroom specification and supplier quotations.',
    project: 'Maitama Executive Residence',
    projectId: 'maitama-executive-residence',
    category: 'Procurement',
    status: 'pending',
    priority: 'medium',
    requestedBy: 'Procurement Team',
    requestedDate: '27 Sep 2026',
    deadline: '04 Oct 2026',
    financialImpact: '+₦920,000',
    financialValue: 920000,
    recommendation:
      'Package B offers the closest match to the approved specification within the current procurement allowance.',
    requiresPayment: true,
  },
  {
    id: 'DEC-2026-012',
    title: 'Approve electrical layout revision',
    description:
      'The electrical consultant has submitted a revised layout to accommodate the updated kitchen and home-office requirements.',
    project: 'Asokoro Smart Home',
    projectId: 'asokoro-smart-home',
    category: 'Design',
    status: 'clarification',
    priority: 'medium',
    requestedBy: 'Design Consultant',
    requestedDate: '25 Sep 2026',
    deadline: '03 Oct 2026',
    financialImpact: 'No immediate impact',
    financialValue: 0,
    recommendation:
      'Clarification has been requested regarding the additional circuits before approval.',
  },
  {
    id: 'DEC-2026-011',
    title: 'Approve milestone 03 completion',
    description:
      'The project manager has submitted evidence and verification documents for the completed blockwork milestone.',
    project: 'Gwarinpa Residence',
    projectId: 'gwarinpa-residence',
    category: 'Milestone',
    status: 'approved',
    priority: 'high',
    requestedBy: 'Project Management',
    requestedDate: '21 Sep 2026',
    financialImpact: '₦4,200,000 released',
    financialValue: 4200000,
    recommendation:
      'Verification was completed and the milestone was approved for escrow release.',
  },
  {
    id: 'DEC-2026-010',
    title: 'Approve external landscaping package',
    description:
      'The landscaping supplier submitted a final package covering hardscape, planting and irrigation.',
    project: 'Maitama Executive Residence',
    projectId: 'maitama-executive-residence',
    category: 'External Works',
    status: 'rejected',
    priority: 'low',
    requestedBy: 'Project Manager',
    requestedDate: '18 Sep 2026',
    financialImpact: '+₦1,400,000',
    financialValue: 1400000,
    recommendation:
      'The proposal was returned for revision because the irrigation scope exceeded the approved allowance.',
  },
]

/* ========================================================================== */
/* OTHER ACTORS                                                               */
/* Small builders keep these compact; every record has the same shape as the  */
/* client data above.                                                         */
/* ========================================================================== */

const msg = (id: number, sender: MessageSender, text: string, time: string): Message => ({
  id,
  sender,
  text,
  time,
  read: true,
})

const thread = (
  id: string,
  name: string,
  role: string,
  initials: string,
  project: string,
  projectId: string,
  accent: string,
  unread: number,
  messages: Message[],
): Conversation => {
  const last = messages[messages.length - 1]
  return {
    id,
    name,
    role,
    initials,
    project,
    projectId,
    online: unread > 0,
    unread,
    lastMessage: last.text,
    lastTime: last.time,
    accent,
    messages,
  }
}

const update = (
  id: string,
  type: UpdateType,
  status: UpdateStatus,
  title: string,
  description: string,
  project: string,
  actor: string,
  timestamp: string,
  dateGroup: UpdateItem['dateGroup'],
  action: UpdateAction,
  actionLabel: string,
  extra: Partial<UpdateItem> = {},
): UpdateItem => ({
  id,
  type,
  status,
  title,
  description,
  project,
  projectId: '1',
  actor,
  timestamp,
  dateGroup,
  action,
  actionLabel,
  ...extra,
})

const decision = (
  id: string,
  title: string,
  description: string,
  project: string,
  category: string,
  priority: DecisionPriority,
  requestedBy: string,
  requestedDate: string,
  extra: Partial<Decision> = {},
): Decision => ({
  id,
  title,
  description,
  project,
  projectId: '1',
  category,
  status: 'pending',
  priority,
  requestedBy,
  requestedDate,
  ...extra,
})

/* ------------------------------- Contractor ------------------------------ */

const contractorConversations: Conversation[] = [
  thread('c-001', 'Lekki Residence Client', 'Client', 'LC', 'Lekki Residence', '1', 'from-blue-600 to-cyan-500', 2, [
    msg(1, 'them', 'Please confirm the roofing evidence is complete before you submit the milestone.', '8:37 PM'),
    msg(2, 'me', 'Confirmed. Photos, delivery notes and the supervisor sign-off are all attached.', '8:52 PM'),
    msg(3, 'them', 'Thank you. I will review it tonight.', '10:42 PM'),
  ]),
  thread('c-002', 'Build OS Project Manager', 'Project Manager', 'PM', 'Gwarinpa Residence', 'gwarinpa-residence', 'from-emerald-600 to-teal-500', 1, [
    msg(1, 'them', 'The structural inspection is booked for Thursday. Please have the site foreman available.', '9:10 AM'),
    msg(2, 'me', 'Noted. The foreman will be on site from 8 AM.', '9:25 AM'),
  ]),
  thread('c-003', 'Marketplace Supplier', 'Supplier', 'MS', 'Lekki Residence', '1', 'from-amber-500 to-orange-500', 0, [
    msg(1, 'me', 'Can the roofing sheets be delivered on Monday instead of Wednesday?', 'Yesterday'),
    msg(2, 'them', 'Yes, Monday morning works. Delivery verification will be sent to you.', 'Yesterday'),
  ]),
]

const contractorUpdates: UpdateItem[] = [
  update('cu-001', 'approval', 'action_required', 'Contract award is waiting for your acceptance', 'The client has selected your bid. Review the contract terms and accept or decline the award.', 'Lekki Residence', 'Client', '10:42 PM', 'Today', 'decisions', 'Review award', { priority: 'high', amount: 38500000 }),
  update('cu-002', 'payment', 'new', 'Milestone payment released', 'The foundation milestone payment has been released from escrow to your wallet.', 'Gwarinpa Residence', 'Escrow', '9:05 AM', 'Today', 'escrow', 'View payment', { amount: 6200000 }),
  update('cu-003', 'inspection', 'informational', 'Inspection scheduled', 'A structural inspection has been scheduled for Thursday at 10:00 AM.', 'Gwarinpa Residence', 'Project Manager', '4:15 PM', 'Yesterday', 'messages', 'Message PM'),
  update('cu-004', 'evidence', 'completed', 'Roofing evidence verified', 'The project manager has verified your roofing evidence. The milestone is now with the client for approval.', 'Lekki Residence', 'Project Manager', 'Mon', 'Earlier', 'project', 'View milestone', { attachments: 6 }),
]

const contractorDecisions: Decision[] = [
  decision('CDEC-014', 'Accept contract award', 'The client has awarded you the Lekki Residence build. Accepting starts the contract and the escrow funding schedule.', 'Lekki Residence', 'Award', 'high', 'Client', '02 Oct 2026', { deadline: '06 Oct 2026', financialImpact: '₦38,500,000 contract value', financialValue: 38500000, recommendation: 'Review the milestone schedule and retention terms before accepting.', requiresPayment: true }),
  decision('CDEC-013', 'Respond to variation request', 'The client has asked for an extra balcony slab. Confirm whether you can deliver it and at what cost.', 'Gwarinpa Residence', 'Variation', 'medium', 'Client', '30 Sep 2026', { deadline: '08 Oct 2026', financialImpact: '₦1,800,000 estimated', financialValue: 1800000 }),
  decision('CDEC-012', 'Confirm revised delivery date', 'The project manager proposed moving the electrical phase by one week.', 'Lekki Residence', 'Schedule', 'low', 'Project Manager', '28 Sep 2026'),
]

/* ------------------------------- Marketplace ----------------------------- */

const marketConversations: Conversation[] = [
  thread('m-001', 'Lekki Build Team', 'Contractor', 'LB', 'Lekki Residence', '1', 'from-blue-600 to-cyan-500', 2, [
    msg(1, 'them', 'Can you quote 400 sheets of long-span roofing, delivered to site?', '8:31 PM'),
    msg(2, 'me', 'Yes. I will send the quotation within the hour.', '8:44 PM'),
    msg(3, 'them', 'Thanks. Please include delivery timing.', '10:12 PM'),
  ]),
  thread('m-002', 'Build OS Procurement', 'Procurement desk', 'BP', 'Gwarinpa Residence', 'gwarinpa-residence', 'from-emerald-600 to-teal-500', 0, [
    msg(1, 'them', 'Your catalogue update has been approved and is now live.', 'Yesterday'),
  ]),
]

const marketUpdates: UpdateItem[] = [
  update('mu-001', 'approval', 'action_required', 'New quotation request', 'A contractor has requested a quotation for 400 long-span roofing sheets.', 'Lekki Residence', 'Lekki Build Team', '10:12 PM', 'Today', 'decisions', 'Respond', { priority: 'high', amount: 5600000 }),
  update('mu-002', 'payment', 'new', 'Order payment secured in escrow', 'Payment for purchase order PO-2026-088 is held in escrow and will release on delivery verification.', 'Lekki Residence', 'Escrow', '9:30 AM', 'Today', 'escrow', 'View payment', { amount: 2400000 }),
  update('mu-003', 'project', 'completed', 'Delivery verified', 'The contractor confirmed delivery of reinforcement steel. Payment release is in progress.', 'Gwarinpa Residence', 'Contractor', 'Yesterday', 'Yesterday', 'project', 'View delivery'),
  update('mu-004', 'document', 'informational', 'Catalogue update approved', 'Your updated price list has passed review and is live in the marketplace.', 'Marketplace', 'Build OS', 'Mon', 'Earlier', 'project', 'Open catalogue'),
]

const marketDecisions: Decision[] = [
  decision('MDEC-021', 'Accept quotation request', 'Roofing sheets, 400 units, delivery to Lekki within 7 days. Accepting lets you submit a priced quotation.', 'Lekki Residence', 'Quotation', 'high', 'Lekki Build Team', '02 Oct 2026', { deadline: '05 Oct 2026', financialImpact: '₦5,600,000 estimated order', financialValue: 5600000 }),
  decision('MDEC-020', 'Confirm purchase order', 'A purchase order was raised from your accepted quotation. Confirm stock and delivery date.', 'Gwarinpa Residence', 'Order', 'medium', 'Gwarinpa Build Team', '30 Sep 2026', { deadline: '07 Oct 2026', financialImpact: '₦2,400,000 held in escrow', financialValue: 2400000, requiresPayment: true }),
  decision('MDEC-019', 'Respond to delivery rejection', 'A delivery was flagged for damaged items. Replace, refund or dispute.', 'Lekki Residence', 'Delivery', 'high', 'Contractor', '29 Sep 2026'),
]

/* ------------------------------- Professional ---------------------------- */

const professionalConversations: Conversation[] = [
  thread('p-001', 'Lekki Residence Client', 'Client', 'LC', 'Lekki Residence', '1', 'from-blue-600 to-cyan-500', 1, [
    msg(1, 'them', 'Thanks for the revised structural drawings. Can you confirm the beam sizing?', '8:37 PM'),
    msg(2, 'me', 'Confirmed. I have uploaded the calculation sheet with the deliverable.', '9:02 PM'),
  ]),
  thread('p-002', 'Build OS Project Manager', 'Project Manager', 'PM', 'Gwarinpa Residence', 'gwarinpa-residence', 'from-emerald-600 to-teal-500', 0, [
    msg(1, 'them', 'Your survey report has been accepted into the Property Passport.', 'Yesterday'),
  ]),
]

const professionalUpdates: UpdateItem[] = [
  update('pu-001', 'approval', 'action_required', 'New service invitation', 'A client has invited you to submit a proposal for architectural design on a Lekki plot.', 'Lekki Residence', 'Client', '10:42 PM', 'Today', 'decisions', 'Review invitation', { priority: 'high' }),
  update('pu-002', 'payment', 'new', 'Deliverable payment released', 'Payment for the structural design deliverable has been released to your wallet.', 'Gwarinpa Residence', 'Escrow', '9:05 AM', 'Today', 'escrow', 'View payment', { amount: 950000 }),
  update('pu-003', 'document', 'completed', 'Deliverable accepted', 'The client accepted your survey report. It is now part of the Property Passport.', 'Gwarinpa Residence', 'Client', 'Yesterday', 'Yesterday', 'project', 'View deliverable', { attachments: 3 }),
  update('pu-004', 'message', 'informational', 'Clarification requested', 'The client asked about beam sizing on the revised drawings.', 'Lekki Residence', 'Client', 'Mon', 'Earlier', 'messages', 'Reply'),
]

const professionalDecisions: Decision[] = [
  decision('PDEC-009', 'Accept service invitation', 'Architectural design for a four-bedroom duplex. Accepting lets you submit a proposal.', 'Lekki Residence', 'Invitation', 'high', 'Client', '02 Oct 2026', { deadline: '06 Oct 2026', financialImpact: '₦1,200,000 proposed fee', financialValue: 1200000 }),
  decision('PDEC-008', 'Respond to scope change', 'The client has asked to add a boundary survey to your scope.', 'Gwarinpa Residence', 'Scope', 'medium', 'Client', '30 Sep 2026', { deadline: '09 Oct 2026', financialImpact: '₦350,000 additional fee', financialValue: 350000 }),
  decision('PDEC-007', 'Approve revised delivery date', 'Delivery of the structural drawings is proposed for 14 Oct.', 'Lekki Residence', 'Schedule', 'low', 'Project Manager', '28 Sep 2026'),
]

/* ------------------------------ Project manager -------------------------- */

const pmConversations: Conversation[] = [
  thread('pm-001', 'Lekki Build Team', 'Contractor', 'LB', 'Lekki Residence', '1', 'from-blue-600 to-cyan-500', 2, [
    msg(1, 'them', 'Roofing evidence has been uploaded for verification.', '8:31 PM'),
    msg(2, 'me', 'Received. I will inspect on site tomorrow morning.', '8:50 PM'),
  ]),
  thread('pm-002', 'Lekki Residence Client', 'Client', 'LC', 'Lekki Residence', '1', 'from-emerald-600 to-teal-500', 0, [
    msg(1, 'them', 'When can I expect the verification report?', 'Yesterday'),
    msg(2, 'me', 'Within 24 hours of the inspection.', 'Yesterday'),
  ]),
]

const pmUpdates: UpdateItem[] = [
  update('pmu-001', 'evidence', 'action_required', 'Evidence awaiting verification', 'The contractor submitted roofing evidence for milestone verification.', 'Lekki Residence', 'Lekki Build Team', '10:42 PM', 'Today', 'project', 'Open projects', { priority: 'high', attachments: 6 }),
  update('pmu-002', 'inspection', 'new', 'Inspection due Thursday', 'A structural inspection is scheduled for Gwarinpa Residence.', 'Gwarinpa Residence', 'Build OS', '9:00 AM', 'Today', 'project', 'Open inspections'),
  update('pmu-003', 'message', 'informational', 'Client asked for a report date', 'The client is waiting for the milestone verification report.', 'Lekki Residence', 'Client', 'Yesterday', 'Yesterday', 'messages', 'Reply'),
]


/* ---------------------------------- Admin -------------------------------- */

const adminConversations: Conversation[] = [
  thread('a-001', 'Lekki Build Team', 'Contractor', 'LB', 'Lekki Residence', '1', 'from-blue-600 to-cyan-500', 1, [
    msg(1, 'them', 'Our verification documents were resubmitted. Please confirm they are complete.', '9:10 AM'),
    msg(2, 'me', 'Received. The verification team will review them today.', '9:30 AM'),
  ]),
  thread('a-002', 'Lekki Residence Client', 'Client', 'LC', 'Lekki Residence', '1', 'from-emerald-600 to-teal-500', 0, [
    msg(1, 'them', 'Can you confirm when the frozen payment will be reviewed?', 'Yesterday'),
    msg(2, 'me', 'The dispute panel meets on Thursday. You will be updated afterwards.', 'Yesterday'),
  ]),
]

const adminUpdates: UpdateItem[] = [
  update('au-001', 'approval', 'action_required', 'Verification queue needs attention', 'Several contractor and supplier verification submissions are waiting for review.', 'Platform', 'Verification', '10:42 PM', 'Today', 'decisions', 'Open decisions', { priority: 'high' }),
  update('au-002', 'payment', 'new', 'Large escrow release flagged', 'A milestone release above the review threshold needs oversight sign-off.', 'Lekki Residence', 'Escrow', '9:05 AM', 'Today', 'escrow', 'Open escrow', { amount: 4500000 }),
  update('au-003', 'document', 'informational', 'Compliance report generated', 'The weekly compliance report is ready to review.', 'Platform', 'Compliance', 'Yesterday', 'Yesterday', 'project', 'View projects'),
  update('au-004', 'message', 'informational', 'Client asked about a frozen payment', 'A client is waiting for a status update on a frozen payment.', 'Lekki Residence', 'Client', 'Mon', 'Earlier', 'messages', 'Reply'),
]

const adminDecisions: Decision[] = [
  decision('ADEC-031', 'Approve contractor verification', 'Verification documents were resubmitted after a rejection. Approve to make the contractor visible for bidding.', 'Platform', 'Verification', 'high', 'Verification team', '02 Oct 2026', { deadline: '05 Oct 2026' }),
  decision('ADEC-030', 'Release flagged escrow payment', 'This release is above the oversight threshold. Confirm evidence and approvals before it is paid out.', 'Lekki Residence', 'Escrow', 'high', 'Escrow desk', '01 Oct 2026', { deadline: '04 Oct 2026', financialImpact: '₦4,500,000 held in escrow', financialValue: 4500000, requiresPayment: true }),
  decision('ADEC-029', 'Rule on open dispute', 'A dispute has all evidence and responses submitted and is ready for a ruling.', 'Gwarinpa Residence', 'Dispute', 'medium', 'Dispute panel', '28 Sep 2026', { financialImpact: '₦1,200,000 frozen', financialValue: 1200000 }),
]

/* ========================================================================== */
/* LOOKUPS                                                                    */
/* ========================================================================== */

const EMPTY: never[] = []

export const conversationsByRole = (role: UserRole): Conversation[] => {
  switch (role) {
    case 'client':
    case 'diaspora_client':
      return clientConversations
    case 'contractor':
      return contractorConversations
    case 'market_place':
      return marketConversations
    case 'professional':
      return professionalConversations
    case 'project_manager':
      return pmConversations
    case 'admin':
      return adminConversations
    default:
      return EMPTY
  }
}

export const updatesByRole = (role: UserRole): UpdateItem[] => {
  switch (role) {
    case 'client':
    case 'diaspora_client':
      return clientUpdates
    case 'contractor':
      return contractorUpdates
    case 'market_place':
      return marketUpdates
    case 'professional':
      return professionalUpdates
    case 'project_manager':
      return pmUpdates
    case 'admin':
      return adminUpdates
    default:
      return EMPTY
  }
}

export const decisionsByRole = (role: UserRole): Decision[] => {
  switch (role) {
    case 'client':
    case 'diaspora_client':
      return clientDecisions
    case 'contractor':
      return contractorDecisions
    case 'market_place':
      return marketDecisions
    case 'professional':
      return professionalDecisions
    case 'admin':
      return adminDecisions
    default:
      return EMPTY
  }
}
