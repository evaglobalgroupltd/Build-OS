import { useMemo, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  FileCheck2,
  FileText,
  Filter,
  Gavel,
  Image as ImageIcon,
  MessageSquare,
  ShieldCheck,
  WalletCards,
  X,
} from 'lucide-react'

import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { DetailPanel, DetailRow } from '@/components/ui/DetailPanel'
import { SectionTabs } from '@/components/ui/HubLayout'
import { updatesTabs } from '@/pages/client/clientTabs'
import { CLIENT_ROUTES, useProjectHref } from '@/pages/client/clientRoutes'

/* =============================================================================
 * Client Updates   (route: /app/client/updates)
 *
 * Fixes vs. the previous version:
 *  - Breadcrumb pointed at /app/client/dashboard (not a route -> home page).
 *  - Every action pointed at /app/client/projects/1. Each update now sends you
 *    where the work actually happens (decisions, escrow, passport, messages).
 *  - "Details" used to repeat the project link. It now opens a detail panel.
 *  - Clicking the card itself opens the same panel.
 * ============================================================================= */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type UpdateType =
  | 'evidence'
  | 'approval'
  | 'document'
  | 'payment'
  | 'message'
  | 'inspection'
  | 'project'

type UpdateStatus = 'new' | 'action_required' | 'completed' | 'informational'

/** Where the primary button for an update should go. */
type UpdateAction = 'decisions' | 'project' | 'escrow' | 'passport' | 'messages'

type UpdateItem = {
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

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const UPDATES: UpdateItem[] = [
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

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const TYPE_META: Record<
  UpdateType,
  { label: string; icon: typeof FileText; iconClass: string; bgClass: string }
> = {
  evidence: { label: 'Evidence', icon: ImageIcon, iconClass: 'text-violet-600', bgClass: 'bg-violet-50' },
  approval: { label: 'Approval', icon: FileCheck2, iconClass: 'text-blue-600', bgClass: 'bg-blue-50' },
  document: { label: 'Document', icon: FileText, iconClass: 'text-slate-600', bgClass: 'bg-slate-100' },
  payment: { label: 'Escrow', icon: WalletCards, iconClass: 'text-emerald-600', bgClass: 'bg-emerald-50' },
  message: { label: 'Message', icon: MessageSquare, iconClass: 'text-cyan-600', bgClass: 'bg-cyan-50' },
  inspection: { label: 'Inspection', icon: CheckCircle2, iconClass: 'text-indigo-600', bgClass: 'bg-indigo-50' },
  project: { label: 'Project', icon: ShieldCheck, iconClass: 'text-blue-600', bgClass: 'bg-blue-50' },
}

const STATUS_META: Record<UpdateStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-blue-50 text-blue-700 ring-blue-100' },
  action_required: { label: 'Action required', className: 'bg-amber-50 text-amber-700 ring-amber-100' },
  completed: { label: 'Completed', className: 'bg-emerald-50 text-emerald-700 ring-emerald-100' },
  informational: { label: 'Information', className: 'bg-slate-100 text-slate-600 ring-slate-200' },
}

const INTERACTIVE = 'a,button,input,textarea,select,[role="button"]'

function formatNaira(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)
}

function UpdateIcon({ type }: { type: UpdateType }) {
  const meta = TYPE_META[type]
  const Icon = meta.icon

  return (
    <div
      className={[
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
        meta.bgClass,
        meta.iconClass,
      ].join(' ')}
    >
      <Icon className="h-5 w-5" />
    </div>
  )
}

function StatusBadge({ status }: { status: UpdateStatus }) {
  const meta = STATUS_META[status]

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ring-1 ring-inset',
        meta.className,
      ].join(' ')}
    >
      {meta.label}
    </span>
  )
}

/** Resolves an update's primary action to a real route. */
function useActionTo() {
  const projectHref = useProjectHref()

  return (update: UpdateItem): string => {
    switch (update.action) {
      case 'decisions':
        return CLIENT_ROUTES.decisions
      case 'escrow':
        return CLIENT_ROUTES.escrow
      case 'passport':
        return CLIENT_ROUTES.passport
      case 'messages':
        return CLIENT_ROUTES.messages
      default:
        return projectHref(update.projectId)
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Filters                                                                    */
/* -------------------------------------------------------------------------- */

type FilterKey = 'all' | 'action' | 'evidence' | 'approvals' | 'documents'

const FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: 'all', label: 'All updates' },
  { key: 'action', label: 'Action required' },
  { key: 'evidence', label: 'Evidence' },
  { key: 'approvals', label: 'Approvals' },
  { key: 'documents', label: 'Documents' },
]

/* -------------------------------------------------------------------------- */
/* Update row                                                                 */
/* -------------------------------------------------------------------------- */

function UpdateRow({
  update,
  actionTo,
  projectTo,
  onOpen,
  onDismiss,
}: {
  update: UpdateItem
  actionTo: string
  projectTo: string
  onOpen: (update: UpdateItem) => void
  onDismiss: (id: string) => void
}) {
  const typeMeta = TYPE_META[update.type]

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest(INTERACTIVE)) return
    onOpen(update)
  }

  return (
    <article
      onClick={handleCardClick}
      className={[
        'group relative cursor-pointer rounded-2xl border bg-white p-4 transition duration-200',
        update.status === 'action_required'
          ? 'border-blue-200 shadow-[0_12px_35px_-24px_rgba(22,87,255,0.5)]'
          : 'border-slate-200/80 hover:border-slate-300 hover:shadow-[0_12px_35px_-25px_rgba(15,23,42,0.3)]',
      ].join(' ')}
    >
      {update.status === 'action_required' && (
        <div className="absolute inset-y-4 left-0 w-0.5 rounded-r-full bg-blue-600" />
      )}

      <div className="flex flex-col gap-4 sm:flex-row">
        <UpdateIcon type={update.type} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
            <div className="min-w-0">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <StatusBadge status={update.status} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                  {typeMeta.label}
                </span>
                {update.priority === 'high' && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.1em] text-amber-600">
                    <AlertCircle className="h-3 w-3" />
                    Priority
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold tracking-tight text-[#0B1220]">
                <button
                  type="button"
                  onClick={() => onOpen(update)}
                  className="text-left hover:underline"
                >
                  {update.title}
                </button>
              </h3>
            </div>

            <span className="shrink-0 text-[10px] font-medium text-slate-400">
              {update.timestamp}
            </span>
          </div>

          <p className="mt-2 max-w-3xl text-xs leading-5 text-slate-500">
            {update.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              to={projectTo}
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-600 transition hover:text-blue-600"
            >
              <span className="h-1 w-1 rounded-full bg-blue-500" />
              {update.project}
            </Link>

            <span className="text-[10px] text-slate-400">By {update.actor}</span>

            {update.attachments !== undefined && (
              <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                <FileText className="h-3 w-3" />
                {update.attachments} attachment{update.attachments === 1 ? '' : 's'}
              </span>
            )}

            {update.amount !== undefined && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                <WalletCards className="h-3 w-3" />
                {formatNaira(update.amount)}
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Link
              to={actionTo}
              className={[
                'inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-[10px] font-bold transition',
                update.status === 'action_required'
                  ? 'bg-[#1657FF] text-white shadow-sm hover:bg-blue-700'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700',
              ].join(' ')}
            >
              {update.actionLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => onOpen(update)}
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[10px] font-semibold text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
            >
              Details
              <ExternalLink className="h-3 w-3" />
            </button>

            {update.status !== 'action_required' && (
              <button
                type="button"
                onClick={() => onDismiss(update.id)}
                className="ml-auto inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[10px] font-semibold text-slate-400 opacity-0 transition hover:bg-slate-50 hover:text-slate-700 focus-visible:opacity-100 group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
                Dismiss
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/* Summary tile                                                               */
/* -------------------------------------------------------------------------- */

function SummaryTile({
  active,
  onClick,
  icon: Icon,
  iconClass,
  value,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: typeof FileText
  iconClass: string
  value: number
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'rounded-2xl border bg-white p-4 text-left shadow-sm transition',
        active
          ? 'border-blue-300 ring-4 ring-blue-500/5'
          : 'border-slate-200/80 hover:border-blue-200',
      ].join(' ')}
    >
      <div className="flex items-center justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClass}`}>
          <Icon className="h-4 w-4" />
        </div>
        <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
      </div>

      <p className="mt-4 text-2xl font-bold tracking-tight text-[#0B1220]">{value}</p>
      <p className="mt-0.5 text-xs text-slate-500">{label}</p>
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/* Main page                                                                  */
/* -------------------------------------------------------------------------- */

export function UpdatesPage() {
  const projectHref = useProjectHref()
  const actionTo = useActionTo()

  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [updates, setUpdates] = useState(UPDATES)
  const [selected, setSelected] = useState<UpdateItem | null>(null)

  const actionCount = updates.filter((u) => u.status === 'action_required').length
  const evidenceCount = updates.filter((u) => u.type === 'evidence').length
  const approvalCount = updates.filter((u) => u.type === 'approval').length
  const documentCount = updates.filter((u) => u.type === 'document').length

  const filteredUpdates = useMemo(() => {
    switch (activeFilter) {
      case 'action':
        return updates.filter((u) => u.status === 'action_required')
      case 'evidence':
        return updates.filter((u) => u.type === 'evidence')
      case 'approvals':
        return updates.filter((u) => u.type === 'approval')
      case 'documents':
        return updates.filter((u) => u.type === 'document')
      default:
        return updates
    }
  }, [activeFilter, updates])

  const groupedUpdates = useMemo(
    () =>
      ['Today', 'Yesterday', 'Earlier']
        .map((group) => ({
          group,
          items: filteredUpdates.filter((u) => u.dateGroup === group),
        }))
        .filter((section) => section.items.length > 0),
    [filteredUpdates],
  )

  function handleDismiss(id: string) {
    setUpdates((current) => current.filter((u) => u.id !== id))
    setSelected((current) => (current?.id === id ? null : current))
  }

  return (
    <DashboardLayout title="Updates">
      <div className="mx-auto w-full max-w-[1400px] space-y-7">
        <SectionTabs tabs={updatesTabs} label="Update sections" />
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
              <Link
                to={CLIENT_ROUTES.overview}
                className="transition hover:text-blue-600"
              >
                Client Portal
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-slate-600">Updates</span>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600">
              Project activity
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-[#0B1220] sm:text-3xl">
              Project updates
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Stay informed about project progress, evidence, inspections, documents,
              payments and items requiring your attention. Select any update to see
              the full details.
            </p>
          </div>

          <Link
            to={CLIENT_ROUTES.projects}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 lg:self-auto"
          >
            View projects
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Summary */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryTile
            active={activeFilter === 'action'}
            onClick={() => setActiveFilter('action')}
            icon={AlertCircle}
            iconClass="bg-amber-50 text-amber-600"
            value={actionCount}
            label="Require your attention"
          />
          <SummaryTile
            active={activeFilter === 'evidence'}
            onClick={() => setActiveFilter('evidence')}
            icon={ImageIcon}
            iconClass="bg-violet-50 text-violet-600"
            value={evidenceCount}
            label="Evidence updates"
          />
          <SummaryTile
            active={activeFilter === 'approvals'}
            onClick={() => setActiveFilter('approvals')}
            icon={FileCheck2}
            iconClass="bg-blue-50 text-blue-600"
            value={approvalCount}
            label="Approval updates"
          />
          <SummaryTile
            active={activeFilter === 'documents'}
            onClick={() => setActiveFilter('documents')}
            icon={FileText}
            iconClass="bg-slate-100 text-slate-600"
            value={documentCount}
            label="Document updates"
          />
        </div>

        {/* Feed */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section>
            <Card className="overflow-hidden border-slate-200/80 shadow-sm">
              <CardHeader className="border-b border-slate-200/80 bg-white px-5 py-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-blue-600" />
                      <h2 className="text-sm font-bold text-[#0B1220]">Activity feed</h2>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {filteredUpdates.length} update
                      {filteredUpdates.length === 1 ? '' : 's'} shown
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter className="h-3.5 w-3.5 text-slate-400" />
                    <div
                      className="flex max-w-full gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1"
                      role="tablist"
                      aria-label="Filter updates"
                    >
                      {FILTERS.map((filter) => (
                        <button
                          key={filter.key}
                          type="button"
                          role="tab"
                          aria-selected={activeFilter === filter.key}
                          onClick={() => setActiveFilter(filter.key)}
                          className={[
                            'whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition',
                            activeFilter === filter.key
                              ? 'bg-white text-[#0B1220] shadow-sm'
                              : 'text-slate-500 hover:text-slate-800',
                          ].join(' ')}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardBody className="bg-[#F7F9FC] p-4 sm:p-5">
                {groupedUpdates.length === 0 ? (
                  <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <Check className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-slate-800">Nothing here</h3>
                    <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
                      There are no updates matching this filter right now.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveFilter('all')}
                      className="mt-4 rounded-xl bg-[#0B1220] px-4 py-2 text-[10px] font-bold text-white transition hover:bg-slate-800"
                    >
                      View all updates
                    </button>
                  </div>
                ) : (
                  <div className="space-y-7">
                    {groupedUpdates.map((section) => (
                      <div key={section.group}>
                        <div className="mb-3 flex items-center gap-3">
                          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            {section.group}
                          </span>
                          <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        <div className="space-y-3">
                          {section.items.map((update) => (
                            <UpdateRow
                              key={update.id}
                              update={update}
                              actionTo={actionTo(update)}
                              projectTo={projectHref(update.projectId)}
                              onOpen={setSelected}
                              onDismiss={handleDismiss}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </section>

          {/* Right rail */}
          <aside className="space-y-4">
            <Card className="overflow-hidden border-blue-200 bg-[#0B1220] text-white shadow-[0_20px_60px_-30px_rgba(11,18,32,0.65)]">
              <CardBody className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-300">
                  Your attention
                </p>

                <h3 className="mt-1 text-lg font-bold tracking-tight">
                  {actionCount === 0
                    ? 'Everything is up to date'
                    : `${actionCount} item${actionCount === 1 ? '' : 's'} need${
                        actionCount === 1 ? 's' : ''
                      } your attention`}
                </h3>

                <p className="mt-2 text-xs leading-5 text-white/55">
                  Approval requests and other client actions appear here as part of
                  the project activity stream.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {actionCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveFilter('action')}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-[10px] font-bold text-[#0B1220] transition hover:bg-blue-50"
                    >
                      Show action items
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}

                  <Link
                    to={CLIENT_ROUTES.decisions}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-3.5 py-2.5 text-[10px] font-bold text-white transition hover:bg-white/10"
                  >
                    Go to decisions
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardBody>
            </Card>

            <Card className="border-slate-200/80 shadow-sm">
              <CardHeader className="px-5 pb-2 pt-5">
                <h3 className="text-sm font-bold text-[#0B1220]">Quick access</h3>
                <p className="mt-1 text-[11px] text-slate-400">
                  Continue where you need to go.
                </p>
              </CardHeader>

              <CardBody className="space-y-1 p-3">
                {[
                  { label: 'My projects', description: 'Portfolio & progress', href: CLIENT_ROUTES.projects, icon: FileText },
                  { label: 'Decisions', description: 'Approvals waiting', href: CLIENT_ROUTES.decisions, icon: Gavel },
                  { label: 'Escrow', description: 'Funds & releases', href: CLIENT_ROUTES.escrow, icon: WalletCards },
                  { label: 'Messages', description: 'Project communication', href: CLIENT_ROUTES.messages, icon: MessageSquare },
                  { label: 'Property passport', description: 'Verified records', href: CLIENT_ROUTES.passport, icon: ShieldCheck },
                ].map((item) => {
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-800">{item.label}</p>
                        <p className="mt-0.5 text-[10px] text-slate-400">{item.description}</p>
                      </div>

                      <ChevronRight className="h-3.5 w-3.5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500" />
                    </Link>
                  )
                })}
              </CardBody>
            </Card>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Evidence-first project control
                  </p>
                  <p className="mt-1 text-[10px] leading-5 text-slate-400">
                    Project activity, verification, approvals and escrow events remain
                    connected to the underlying project record.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <DetailPanel
          open
          onClose={() => setSelected(null)}
          eyebrow={TYPE_META[selected.type].label}
          title={selected.title}
          footer={
            <>
              <Link
                to={actionTo(selected)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1657FF] px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-blue-700"
              >
                {selected.actionLabel}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <Link
                to={CLIENT_ROUTES.messages}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[11px] font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Ask the team
              </Link>
            </>
          }
        >
          <StatusBadge status={selected.status} />

          <p className="mt-4 text-[13px] leading-6 text-ink/65">
            {selected.description}
          </p>

          <dl className="mt-5 divide-y divide-line border-y border-line">
            <DetailRow
              label="Project"
              value={
                <Link
                  to={projectHref(selected.projectId)}
                  className="text-blue-600 hover:underline"
                >
                  {selected.project}
                </Link>
              }
            />
            <DetailRow label="Raised by" value={selected.actor} />
            <DetailRow
              label="When"
              value={
                selected.dateGroup === 'Earlier'
                  ? selected.timestamp
                  : `${selected.dateGroup}, ${selected.timestamp}`
              }
            />
            {selected.amount !== undefined && (
              <DetailRow label="Amount" value={formatNaira(selected.amount)} />
            )}
            {selected.attachments !== undefined && (
              <DetailRow
                label="Attachments"
                value={`${selected.attachments} file${selected.attachments === 1 ? '' : 's'}`}
              />
            )}
          </dl>

          {selected.attachments !== undefined && (
            <Link
              to={CLIENT_ROUTES.passport}
              className="mt-5 flex items-center justify-between rounded-2xl bg-[#F7F9FC] p-4 transition hover:bg-slate-100"
            >
              <span className="flex items-center gap-2.5 text-[12px] font-semibold text-slate-700">
                <FileText className="h-4 w-4 text-slate-400" />
                View files in Property Passport
              </span>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </Link>
          )}
        </DetailPanel>
      )}
    </DashboardLayout>
  )
}

export default UpdatesPage