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
  ShieldCheck,
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
    description:
      'Project record was created from the project creation workflow.',
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
    description:
      'Survey plan and title documents were added to the project record.',
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
    description:
      'Project review was completed and the project moved into the delivery workflow.',
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
    description:
      'Apex Construction Ltd was assigned as the project contractor.',
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
    description:
      'Project funds were deposited into the project wallet for controlled release.',
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
    description:
      'Foundation completion evidence was submitted and verified.',
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
    description:
      'A material request linked to the approved project scope was approved for procurement.',
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
    description:
      'Weekly progress report with site evidence was uploaded.',
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
    description:
      'Block work progress was submitted for review with supporting site evidence.',
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
    description:
      'Client review is required before the associated milestone payment can proceed.',
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
    description:
      'Photo and video evidence was attached to the current milestone.',
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

  const completedCount = timelineEvents.filter(
    (event) => event.status === 'completed',
  ).length

  const milestoneCount = timelineEvents.filter(
    (event) => event.type === 'milestone',
  ).length

  const approvalCount = timelineEvents.filter(
    (event) => event.type === 'approval',
  ).length

  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-label="Project timeline header"
        className="
          relative overflow-hidden rounded-[24px]
          bg-[#18271F]
          shadow-[0_18px_50px_rgba(20,40,30,0.10)]
        "
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-48 w-48 rounded-full bg-[#B8D9C4]/[0.04] blur-3xl" />

        <div className="relative flex flex-col gap-7 p-6 sm:p-7 lg:flex-row lg:items-end lg:justify-between lg:p-8">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/[0.09] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/65">
                Project audit trail
              </span>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span className="text-[9px] font-medium text-white/35">
                {timelineEvents.length} recorded events
              </span>
            </div>

            <h1 className="font-display text-[29px] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[34px]">
              Project Timeline
            </h1>

            <p className="mt-3 max-w-2xl text-[11px] leading-5 text-white/45 sm:text-xs">
              A chronological record of project decisions, milestones,
              approvals, procurement, payments and operational activity.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full bg-white/[0.07] px-4 py-2.5">
            <History size={13} className="text-white/40" />

            <span className="font-mono text-[9px] text-white/45">
              Audit history
            </span>

            <span className="h-1 w-1 rounded-full bg-[#B8D9C4]" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Metrics                                                            */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-label="Timeline summary"
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        <TimelineStat
          icon={History}
          label="Total events"
          value={String(timelineEvents.length)}
          detail="Recorded project activity"
        />

        <TimelineStat
          icon={CheckCircle2}
          label="Completed"
          value={String(completedCount)}
          detail="Completed records"
          tone="green"
        />

        <TimelineStat
          icon={ClipboardCheck}
          label="Milestones"
          value={String(milestoneCount)}
          detail="Milestone activity"
        />

        <TimelineStat
          icon={AlertTriangle}
          label="Needs attention"
          value={String(attentionCount)}
          detail="Pending action"
          tone={attentionCount > 0 ? 'amber' : 'default'}
        />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Timeline workspace                                                 */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Activity history"
          subtitle="Every significant project event is recorded chronologically."
        />

        <CardBody className="p-5 sm:p-6">
          {/* Search */}
          <div className="relative">
            <Search
              size={15}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/25"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search activity, people, records or references..."
              className="
                h-11 w-full rounded-[14px]
                border border-ink/[0.07]
                bg-[#FAFBFA]
                pl-11 pr-4
                text-[11px] text-ink
                outline-none
                transition
                placeholder:text-ink/25
                focus:border-ink/[0.16]
                focus:bg-white
                focus:shadow-[0_8px_24px_rgba(20,40,30,0.04)]
              "
            />
          </div>

          {/* Filters */}
          <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1">
            {filters.map((item) => {
              const active = filter === item.value

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  className={[
                    'whitespace-nowrap rounded-full px-3.5 py-2 text-[9px] font-bold transition duration-200',
                    active
                      ? 'bg-ink text-white shadow-[0_5px_15px_rgba(20,30,25,0.10)]'
                      : 'bg-ink/[0.04] text-ink/40 hover:bg-ink/[0.07] hover:text-ink/65',
                  ].join(' ')}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* Result count */}
          <div className="mt-5 flex items-center justify-between border-b border-ink/[0.06] pb-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
              Activity stream
            </p>

            <p className="font-mono text-[9px] text-ink/25">
              {filteredEvents.length} result
              {filteredEvents.length === 1 ? '' : 's'}
            </p>
          </div>

          {/* Timeline */}
          {filteredEvents.length > 0 ? (
            <div className="relative mt-2">
              {/* Desktop vertical line */}
              <div className="absolute bottom-7 left-[20px] top-7 hidden w-px bg-ink/[0.07] sm:block" />

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
            <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/[0.05] text-ink/25">
                <History size={18} />
              </div>

              <p className="mt-4 font-display text-sm font-semibold text-ink">
                No activity found
              </p>

              <p className="mt-1 max-w-xs text-[10px] leading-5 text-ink/35">
                Try another search term or select a different activity type.
              </p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Audit integrity                                                    */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-label="Project audit trail information"
        className="overflow-hidden rounded-[20px] border border-ink/[0.07] bg-white"
      >
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:p-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
            <ShieldCheck size={15} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[11px] font-bold text-ink">
                Project audit trail
              </p>

              <span className="rounded-full bg-[#EAF4EE] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.10em] text-[#12613E]">
                Traceable
              </span>
            </div>

            <p className="mt-1.5 max-w-4xl text-[10.5px] leading-5 text-ink/40">
              Timeline entries should originate from actual project records.
              Important actions retain their actor, timestamp, related
              reference and resulting status so the project history remains
              traceable and auditable.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Timeline event                                                             */
/* -------------------------------------------------------------------------- */

function TimelineEventRow({
  event,
}: {
  event: TimelineEvent
}) {
  const Icon = getEventIcon(event.type)

  const iconStyles =
    event.status === 'attention'
      ? {
          shell: 'border-[#B85C12]/20 bg-[#FBF6F1]',
          icon: 'text-[#B85C12]',
        }
      : event.status === 'completed'
        ? {
            shell: 'border-[#12613E]/15 bg-[#F7FBF8]',
            icon: 'text-[#12613E]',
          }
        : event.status === 'pending'
          ? {
              shell: 'border-[#B85C12]/15 bg-[#FBF8F4]',
              icon: 'text-[#B85C12]',
            }
          : {
              shell: 'border-ink/[0.07] bg-white',
              icon: 'text-ink/35',
            }

  return (
    <article className="group relative flex gap-3 py-3 sm:gap-4 sm:py-4">
      {/* Timeline node */}
      <div className="relative z-10 shrink-0">
        <div
          className={[
            'flex h-10 w-10 items-center justify-center rounded-xl border transition duration-300 sm:h-[42px] sm:w-[42px]',
            iconStyles.shell,
            'group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_20px_rgba(20,40,30,0.07)]',
          ].join(' ')}
        >
          <Icon
            size={15}
            className={iconStyles.icon}
          />
        </div>

        {event.status === 'completed' && (
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#12613E] text-white">
            <CheckCircle2 size={8} />
          </span>
        )}
      </div>

      {/* Event card */}
      <div
        className="
          min-w-0 flex-1 rounded-[17px]
          border border-ink/[0.06]
          bg-[#FCFDFC]
          p-4
          transition duration-300
          group-hover:border-ink/[0.10]
          group-hover:bg-white
          group-hover:shadow-[0_10px_28px_rgba(20,40,30,0.045)]
          sm:p-5
        "
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-[11px] font-semibold text-ink sm:text-xs">
                {event.title}
              </p>

              <Badge tone={getEventTone(event.type)}>
                {eventTypeLabels[event.type]}
              </Badge>

              {event.status === 'attention' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#F8EEE6] px-2 py-1 text-[8px] font-bold text-[#B85C12]">
                  <AlertTriangle size={9} />
                  Action required
                </span>
              )}

              {event.status === 'pending' && (
                <span className="rounded-full bg-[#F8EEE6] px-2 py-1 text-[8px] font-bold text-[#B85C12]">
                  Pending
                </span>
              )}
            </div>

            <p className="mt-2 max-w-2xl text-[10.5px] leading-5 text-ink/40">
              {event.description}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end sm:gap-0.5">
            <span className="font-mono text-[9px] font-medium text-ink/40">
              {event.date}
            </span>

            <span className="font-mono text-[9px] text-ink/25">
              {event.time}
            </span>
          </div>
        </div>

        {/* Event metadata */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.06] pt-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-ink/[0.04] text-ink/30">
              <UserRound size={11} />
            </span>

            <div className="min-w-0">
              <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-ink/25">
                Recorded by
              </p>

              <p className="mt-0.5 truncate text-[9.5px] font-medium text-ink/50">
                {event.actor}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {event.reference && (
              <span className="rounded-full bg-ink/[0.04] px-2.5 py-1.5 font-mono text-[8px] text-ink/30">
                {event.reference}
              </span>
            )}

            <button
              type="button"
              className="
                group/action inline-flex items-center gap-1.5
                text-[9px] font-bold text-ink/45
                transition hover:text-[#B85C12]
              "
            >
              View record
              <ArrowRight
                size={11}
                className="transition-transform duration-200 group-hover/action:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/* Summary metric                                                             */
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
  tone?: 'default' | 'green' | 'amber'
}) {
  const iconStyles = {
    default: 'bg-ink/[0.05] text-ink/35',
    green: 'bg-[#EAF4EE] text-[#12613E]',
    amber: 'bg-[#F8EEE6] text-[#B85C12]',
  }

  const valueStyles = {
    default: 'text-ink',
    green: 'text-[#12613E]',
    amber: 'text-[#B85C12]',
  }

  return (
    <div
      className="
        group relative overflow-hidden rounded-[18px]
        border border-ink/[0.07] bg-white p-4
        transition duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_14px_35px_rgba(20,40,30,0.06)]
        sm:p-5
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35 sm:text-[10px]">
            {label}
          </p>

          <p
            className={[
              'mt-2 font-display text-[25px] font-semibold tracking-[-0.035em]',
              valueStyles[tone],
            ].join(' ')}
          >
            {value}
          </p>
        </div>

        <div
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105',
            iconStyles[tone],
          ].join(' ')}
        >
          <Icon size={16} />
        </div>
      </div>

      <p className="mt-2 text-[10px] leading-4 text-ink/40">
        {detail}
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Event helpers                                                              */
/* -------------------------------------------------------------------------- */

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