import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Flag,
  History,
  Package,
  Search,
  ShieldAlert,
  UserRound,
  Wallet,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type TimelineEventType =
  | 'project'
  | 'milestone'
  | 'approval'
  | 'procurement'
  | 'payment'
  | 'monitoring'
  | 'document'
  | 'change_request'
  | 'dispute'
  | 'team'

type TimelineEvent = {
  id: string
  type: TimelineEventType
  title: string
  description: string
  actor: string
  date: string
  time: string
  status?: 'completed' | 'pending' | 'attention' | 'info'
  reference?: string
}

const eventTypeLabels: Record<TimelineEventType, string> = {
  project: 'Project',
  milestone: 'Milestone',
  approval: 'Approval',
  procurement: 'Procurement',
  payment: 'Payment',
  monitoring: 'Monitoring',
  document: 'Document',
  change_request: 'Change request',
  dispute: 'Dispute',
  team: 'Team',
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 'EVT-001',
    type: 'project',
    title: 'Project created',
    description: 'Project record was created from the project creation workflow.',
    actor: 'Project Owner',
    date: '01 Aug 2026',
    time: '09:14',
    status: 'completed',
    reference: 'PRJ-001',
  },
  {
    id: 'EVT-002',
    type: 'document',
    title: 'Land documents uploaded',
    description: 'Survey plan and title documents were added to the project record.',
    actor: 'Project Manager',
    date: '02 Aug 2026',
    time: '11:32',
    status: 'completed',
    reference: 'DOC-001',
  },
  {
    id: 'EVT-003',
    type: 'approval',
    title: 'Project approved',
    description: 'Project review was completed and the project moved into the delivery workflow.',
    actor: 'Build OS Admin',
    date: '04 Aug 2026',
    time: '15:08',
    status: 'completed',
    reference: 'APR-001',
  },
  {
    id: 'EVT-004',
    type: 'team',
    title: 'Contractor assigned',
    description: 'Apex Construction Ltd was assigned as the project contractor.',
    actor: 'Project Owner',
    date: '05 Aug 2026',
    time: '10:45',
    status: 'completed',
    reference: 'TEAM-003',
  },
  {
    id: 'EVT-005',
    type: 'payment',
    title: 'Escrow funding recorded',
    description: 'Project funds were deposited into the project wallet for controlled release.',
    actor: 'Project Owner',
    date: '06 Aug 2026',
    time: '13:21',
    status: 'completed',
    reference: 'PAY-001',
  },
  {
    id: 'EVT-006',
    type: 'milestone',
    title: 'Foundation milestone verified',
    description: 'Foundation completion evidence was submitted and verified.',
    actor: 'Project Manager',
    date: '15 Aug 2026',
    time: '16:42',
    status: 'completed',
    reference: 'MS-002',
  },
  {
    id: 'EVT-007',
    type: 'procurement',
    title: 'Material request approved',
    description: 'A material request linked to the approved project scope was approved for procurement.',
    actor: 'Project Manager',
    date: '18 Aug 2026',
    time: '10:18',
    status: 'completed',
    reference: 'MR-003',
  },
  {
    id: 'EVT-008',
    type: 'monitoring',
    title: 'Weekly progress report submitted',
    description: 'Weekly progress report with site evidence was uploaded.',
    actor: 'Project Manager',
    date: '28 Aug 2026',
    time: '17:05',
    status: 'completed',
    reference: 'RPT-006',
  },
  {
    id: 'EVT-009',
    type: 'milestone',
    title: 'Block work milestone submitted',
    description: 'Block work progress was submitted for review with supporting site evidence.',
    actor: 'Apex Construction Ltd',
    date: '29 Aug 2026',
    time: '14:26',
    status: 'pending',
    reference: 'MS-003',
  },
  {
    id: 'EVT-010',
    type: 'approval',
    title: 'Milestone approval required',
    description: 'Client review is required before the associated milestone payment can proceed.',
    actor: 'Build OS',
    date: '29 Aug 2026',
    time: '14:31',
    status: 'attention',
    reference: 'APR-008',
  },
  {
    id: 'EVT-011',
    type: 'document',
    title: 'Site evidence uploaded',
    description: 'Photo and video evidence was attached to the current milestone.',
    actor: 'Site Team',
    date: '29 Aug 2026',
    time: '14:34',
    status: 'info',
    reference: 'DOC-008',
  },
]

const filters: {
  value: TimelineEventType | 'all'
  label: string
}[] = [
  { value: 'all', label: 'All activity' },
  { value: 'project', label: 'Project' },
  { value: 'milestone', label: 'Milestones' },
  { value: 'approval', label: 'Approvals' },
  { value: 'procurement', label: 'Procurement' },
  { value: 'payment', label: 'Payments' },
  { value: 'monitoring', label: 'Monitoring' },
  { value: 'document', label: 'Documents' },
  { value: 'change_request', label: 'Changes' },
  { value: 'dispute', label: 'Disputes' },
  { value: 'team', label: 'Team' },
]

export function ProjectTimeline() {
  const [filter, setFilter] = useState<
    TimelineEventType | 'all'
  >('all')

  const [search, setSearch] = useState('')

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase()

    return timelineEvents.filter((event) => {
      const matchesType =
        filter === 'all' || event.type === filter

      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.actor.toLowerCase().includes(query) ||
        event.reference?.toLowerCase().includes(query)

      return matchesType && matchesSearch
    })
  }, [filter, search])

  const attentionCount = timelineEvents.filter(
    (event) => event.status === 'attention',
  ).length

  const milestoneCount = timelineEvents.filter(
    (event) => event.type === 'milestone',
  ).length

  const approvalCount = timelineEvents.filter(
    (event) => event.type === 'approval',
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
            Project activity
          </p>

          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
            Project Timeline
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/45">
            Chronological record of project events, milestones, approvals,
            procurement, monitoring, payments and decisions.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2">
          <History className="h-4 w-4 text-ink/30" />

          <span className="font-mono text-[10px] text-ink/40">
            {timelineEvents.length} events recorded
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TimelineStat
          icon={History}
          label="Total events"
          value={String(timelineEvents.length)}
          detail="Project activity"
        />

        <TimelineStat
          icon={ClipboardCheck}
          label="Milestones"
          value={String(milestoneCount)}
          detail="Milestone activity"
        />

        <TimelineStat
          icon={FileCheck2}
          label="Approvals"
          value={String(approvalCount)}
          detail="Approval events"
        />

        <TimelineStat
          icon={AlertTriangle}
          label="Needs attention"
          value={String(attentionCount)}
          detail="Pending action"
          tone={attentionCount > 0 ? 'amber' : 'default'}
        />
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader
          title="Activity history"
          subtitle="Every significant project event is recorded chronologically."
        />

        <CardBody className="space-y-5">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search project activity..."
              className="h-10 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-xs text-ink outline-none placeholder:text-ink/30 focus:border-ink/30"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-1 overflow-x-auto pb-1">
            {filters.map((item) => {
              const active = filter === item.value

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  className={[
                    'whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-semibold transition-colors',
                    active
                      ? 'bg-ink text-white'
                      : 'text-ink/40 hover:bg-ink/5 hover:text-ink',
                  ].join(' ')}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* Event list */}
          {filteredEvents.length > 0 ? (
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute bottom-5 left-[19px] top-5 w-px bg-line" />

              <div className="space-y-1">
                {filteredEvents.map((event) => (
                  <TimelineEventRow
                    key={event.id}
                    event={event}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-line px-6 py-12 text-center">
              <History className="mx-auto h-6 w-6 text-ink/20" />

              <p className="mt-3 text-sm font-semibold text-ink">
                No activity found
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Try another search term or activity type.
              </p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Audit note */}
      <div className="rounded-xl border border-line bg-paper-2 p-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-ink/35" />

          <div>
            <p className="text-xs font-semibold text-ink">
              Project audit trail
            </p>

            <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/45">
              Timeline entries should be generated from actual project
              records rather than manually edited activity. Important actions
              should retain the actor, timestamp, related record and resulting
              status for auditability.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Timeline event                                                              */
/* -------------------------------------------------------------------------- */

function TimelineEventRow({
  event,
}: {
  event: TimelineEvent
}) {
  const Icon = getEventIcon(event.type)

  return (
    <div className="relative flex gap-4 py-4 first:pt-1 last:pb-1">
      {/* Event icon */}
      <div
        className={[
          'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-white',
          event.status === 'attention'
            ? 'border-amber-500/30'
            : event.status === 'completed'
              ? 'border-teal/20'
              : 'border-line',
        ].join(' ')}
      >
        <Icon
          className={[
            'h-4 w-4',
            event.status === 'attention'
              ? 'text-amber-700'
              : event.status === 'completed'
                ? 'text-teal'
                : 'text-ink/40',
          ].join(' ')}
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 rounded-xl border border-line bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold text-ink">
                {event.title}
              </p>

              <Badge tone={getEventTone(event.type)}>
                {eventTypeLabels[event.type]}
              </Badge>

              {event.status === 'attention' && (
                <Badge tone="amber">Action required</Badge>
              )}

              {event.status === 'pending' && (
                <Badge tone="amber">Pending</Badge>
              )}
            </div>

            <p className="mt-2 text-xs leading-5 text-ink/45">
              {event.description}
            </p>
          </div>

          <div className="shrink-0 text-left sm:text-right">
            <p className="font-mono text-[10px] text-ink/45">
              {event.date}
            </p>

            <p className="mt-0.5 font-mono text-[10px] text-ink/25">
              {event.time}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
          <div className="flex items-center gap-1.5 text-[10px] text-ink/35">
            <UserRound className="h-3 w-3" />
            {event.actor}
          </div>

          <div className="flex items-center gap-3">
            {event.reference && (
              <span className="font-mono text-[9px] text-ink/25">
                {event.reference}
              </span>
            )}

            <button
              type="button"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-ink"
            >
              View record
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Supporting components                                                       */
/* -------------------------------------------------------------------------- */

function TimelineStat({
  icon: Icon,
  label,
  value,
  detail,
  tone = 'default',
}: {
  icon: React.ElementType
  label: string
  value: string
  detail: string
  tone?: 'default' | 'amber'
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </span>

        <Icon className="h-4 w-4 text-ink/30" />
      </div>

      <p
        className={[
          'mt-3 font-display text-xl font-semibold',
          tone === 'amber' ? 'text-amber-700' : 'text-ink',
        ].join(' ')}
      >
        {value}
      </p>

      <p className="mt-1 text-[10px] text-ink/35">{detail}</p>
    </div>
  )
}

function getEventIcon(type: TimelineEventType) {
  switch (type) {
    case 'project':
      return Flag
    case 'milestone':
      return ClipboardCheck
    case 'approval':
      return FileCheck2
    case 'procurement':
      return Package
    case 'payment':
      return Wallet
    case 'monitoring':
      return Search
    case 'document':
      return FileText
    case 'change_request':
      return ArrowRight
    case 'dispute':
      return AlertTriangle
    case 'team':
      return UserRound
    default:
      return History
  }
}

function getEventTone(
  type: TimelineEventType,
): 'neutral' | 'amber' | 'teal' | 'brick' {
  switch (type) {
    case 'approval':
    case 'milestone':
      return 'teal'
    case 'payment':
    case 'procurement':
      return 'amber'
    case 'dispute':
      return 'brick'
    default:
      return 'neutral'
  }
}