import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  MessageSquare,
  Search,
  Upload,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type DeliverableStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Revision Requested'
  | 'Approved'
  | 'Rejected'

type Deliverable = {
  id: string
  title: string
  project: string
  service: string
  submittedAt: string
  dueDate: string
  status: DeliverableStatus
  description: string
  files: number
  amount: string
  reviewer: string
  feedback?: string
}

const deliverables: Deliverable[] = [
  {
    id: 'DEL-0048',
    title: 'Architectural Design Package',
    project: 'Maitama Residence',
    service: 'Architecture',
    submittedAt: 'Aug 28, 2026',
    dueDate: 'Aug 30, 2026',
    status: 'Under Review',
    description:
      'Complete architectural drawing package including floor plans, elevations, sections and schedules.',
    files: 8,
    amount: '₦850,000',
    reviewer: 'Client review pending',
  },
  {
    id: 'DEL-0045',
    title: 'Topographical Survey Report',
    project: 'Gwarinpa Residential Development',
    service: 'Surveying',
    submittedAt: 'Aug 25, 2026',
    dueDate: 'Aug 27, 2026',
    status: 'Approved',
    description:
      'Site survey report with boundary information, levels, coordinates and survey plan.',
    files: 5,
    amount: '₦320,000',
    reviewer: 'Approved by client',
  },
  {
    id: 'DEL-0042',
    title: 'Structural Engineering Drawings',
    project: 'Jabi Duplex Construction',
    service: 'Structural Engineering',
    submittedAt: 'Aug 23, 2026',
    dueDate: 'Aug 25, 2026',
    status: 'Revision Requested',
    description:
      'Structural design package covering foundation, columns, beams and suspended slab details.',
    files: 11,
    amount: '₦620,000',
    reviewer: 'Client requested revisions',
    feedback:
      'Please revise the foundation detail and include the updated reinforcement schedule.',
  },
  {
    id: 'DEL-0039',
    title: 'Property Valuation Report',
    project: 'Asokoro Investment Property',
    service: 'Valuation',
    submittedAt: 'Aug 18, 2026',
    dueDate: 'Aug 20, 2026',
    status: 'Approved',
    description:
      'Professional valuation report covering property inspection, market analysis and valuation conclusion.',
    files: 4,
    amount: '₦275,000',
    reviewer: 'Approved by client',
  },
  {
    id: 'DEL-0036',
    title: 'Planning Approval Documentation',
    project: 'Lokogoma Family Home',
    service: 'Planning & Approvals',
    submittedAt: 'Aug 15, 2026',
    dueDate: 'Aug 18, 2026',
    status: 'Rejected',
    description:
      'Planning approval submission package prepared for the project approval process.',
    files: 6,
    amount: '₦410,000',
    reviewer: 'Submission requires correction',
    feedback:
      'Additional site documentation is required before this deliverable can be accepted.',
  },
]

const filters = [
  'All',
  'Submitted',
  'Under Review',
  'Revision Requested',
  'Approved',
  'Rejected',
] as const

export function Deliverables() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>('All')
  const [search, setSearch] = useState('')

  const filteredDeliverables = useMemo(() => {
    const query = search.trim().toLowerCase()

    return deliverables.filter((deliverable) => {
      const matchesFilter =
        activeFilter === 'All' || deliverable.status === activeFilter

      const matchesSearch =
        !query ||
        deliverable.title.toLowerCase().includes(query) ||
        deliverable.project.toLowerCase().includes(query) ||
        deliverable.service.toLowerCase().includes(query) ||
        deliverable.id.toLowerCase().includes(query)

      return matchesFilter && matchesSearch
    })
  }, [activeFilter, search])

  const pendingCount = deliverables.filter(
    (item) =>
      item.status === 'Submitted' || item.status === 'Under Review',
  ).length

  const revisionCount = deliverables.filter(
    (item) => item.status === 'Revision Requested',
  ).length

  const approvedCount = deliverables.filter(
    (item) => item.status === 'Approved',
  ).length

  return (
    <div className="space-y-7">
      {/* ========================================================= */}
      {/* Header */}
      {/* ========================================================= */}

      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Professional workspace
            </p>
          </div>

          <h1 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
            Deliverables
          </h1>

          <p className="mt-1.5 max-w-xl text-[13px] leading-5 text-ink/50">
            Manage submitted work, monitor review progress, respond to client
            feedback and keep every deliverable moving toward approval.
          </p>
        </div>

        <button
          type="button"
          className="
            group
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-full
            bg-ink
            px-5
            py-3
            text-xs
            font-semibold
            text-white
            shadow-[0_8px_24px_rgba(20,30,25,0.12)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-[0_12px_30px_rgba(20,30,25,0.16)]
          "
        >
          <Upload className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          Upload deliverable
        </button>
      </header>

      {/* ========================================================= */}
      {/* Summary */}
      {/* ========================================================= */}

      <section
        aria-label="Deliverable summary"
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        <SummaryCard
          icon={Clock3}
          label="Awaiting review"
          value={pendingCount}
          description="Submitted deliverables"
          tone="amber"
        />

        <SummaryCard
          icon={MessageSquare}
          label="Needs revision"
          value={revisionCount}
          description="Client feedback received"
          tone="orange"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Approved"
          value={approvedCount}
          description="Accepted by clients"
          tone="teal"
        />

        <SummaryCard
          icon={FileCheck2}
          label="Total deliverables"
          value={deliverables.length}
          description="Across active projects"
          tone="ink"
        />
      </section>

      {/* ========================================================= */}
      {/* Main workspace */}
      {/* ========================================================= */}

      <Card className="overflow-hidden rounded-[24px]">
        <CardHeader
          title="Submitted deliverables"
          subtitle="Track submitted work, client review and approval status"
        />

        {/* Search + Filters */}
        <div className="border-y border-ink/[0.06] bg-[#FBFBFA] px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            {/* Search */}
            <div className="relative min-w-0 flex-1 xl:max-w-[430px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/30" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search deliverables, projects or services..."
                className="
                  h-11
                  w-full
                  rounded-[14px]
                  border
                  border-ink/[0.07]
                  bg-white
                  pl-10
                  pr-4
                  text-[11px]
                  font-medium
                  text-ink
                  outline-none
                  shadow-[0_2px_10px_rgba(20,30,25,0.025)]
                  placeholder:text-ink/30
                  transition-all
                  duration-200
                  focus:border-ink/20
                  focus:shadow-[0_4px_16px_rgba(20,30,25,0.05)]
                "
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 xl:pb-0">
              <div className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/[0.045]">
                <Filter className="h-3.5 w-3.5 text-ink/40" />
              </div>

              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={[
                    'whitespace-nowrap rounded-full px-3.5 py-2 text-[10px] font-semibold transition-all duration-200',
                    activeFilter === filter
                      ? 'bg-ink text-white shadow-[0_4px_12px_rgba(20,30,25,0.10)]'
                      : 'bg-white text-ink/45 hover:bg-ink/[0.045] hover:text-ink',
                  ].join(' ')}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredDeliverables.length > 0 ? (
          <div className="divide-y divide-ink/[0.06]">
            {filteredDeliverables.map((deliverable) => (
              <DeliverableRow
                key={deliverable.id}
                deliverable={deliverable}
              />
            ))}
          </div>
        ) : (
          <CardBody>
            <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-ink/[0.045]">
                <FileText className="h-5 w-5 text-ink/30" />
              </div>

              <h3 className="mt-4 font-display text-base font-semibold text-ink">
                No deliverables found
              </h3>

              <p className="mt-1 max-w-sm text-[11px] leading-5 text-ink/40">
                Try another search term or change the status filter to find
                another deliverable.
              </p>
            </div>
          </CardBody>
        )}
      </Card>
    </div>
  )
}

/* =============================================================== */
/* Deliverable Row */
/* =============================================================== */

function DeliverableRow({
  deliverable,
}: {
  deliverable: Deliverable
}) {
  return (
    <article
      className="
        group
        px-5
        py-5
        transition-all
        duration-300
        hover:bg-[#FCFCFB]
        sm:px-6
      "
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* Identity */}
        <div className="flex min-w-0 items-start gap-4">
          <div
            className="
              relative
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-[15px]
              border
              border-ink/[0.06]
              bg-[#F7F7F5]
              transition-all
              duration-300
              group-hover:border-ink/[0.10]
              group-hover:bg-white
              group-hover:shadow-[0_6px_18px_rgba(20,30,25,0.06)]
            "
          >
            <FileText className="h-[17px] w-[17px] text-ink/40 transition-colors group-hover:text-ink/65" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-[14px] font-semibold tracking-[-0.01em] text-ink">
                {deliverable.title}
              </h3>

              <StatusBadge status={deliverable.status} />
            </div>

            <p className="mt-1 text-[11px] font-medium text-ink/55">
              {deliverable.project}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-ink/35">
              <span className="font-semibold text-ink/45">
                {deliverable.id}
              </span>

              <span>{deliverable.service}</span>

              <span>
                {deliverable.files} {deliverable.files === 1 ? 'file' : 'files'}
              </span>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-x-7 gap-y-4 sm:grid-cols-4 xl:min-w-[510px]">
          <MetaItem
            label="Submitted"
            value={deliverable.submittedAt}
          />

          <MetaItem
            label="Due date"
            value={deliverable.dueDate}
          />

          <MetaItem
            label="Professional fee"
            value={deliverable.amount}
            emphasize
          />

          <MetaItem
            label="Review"
            value={deliverable.reviewer}
          />
        </div>

        {/* Action */}
        <button
          type="button"
          className="
            group/action
            inline-flex
            shrink-0
            items-center
            justify-center
            gap-1.5
            rounded-full
            border
            border-ink/[0.08]
            bg-white
            px-4
            py-2.5
            text-[10px]
            font-bold
            text-ink/70
            shadow-[0_2px_8px_rgba(20,30,25,0.025)]
            transition-all
            duration-200
            hover:border-ink/[0.15]
            hover:bg-ink
            hover:text-white
            hover:shadow-[0_6px_16px_rgba(20,30,25,0.10)]
          "
        >
          <Eye className="h-3.5 w-3.5" />

          View

          <ChevronRight
            className="
              h-3.5
              w-3.5
              text-ink/25
              transition-all
              duration-200
              group-hover/action:translate-x-0.5
              group-hover/action:text-white/60
            "
          />
        </button>
      </div>

      {/* Revision feedback */}
      {deliverable.feedback && (
        <div
          className="
            mt-5
            overflow-hidden
            rounded-[16px]
            border
            border-[#B85C12]/[0.12]
            bg-[#B85C12]/[0.035]
          "
        >
          <div className="flex gap-3 px-4 py-3.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#B85C12]/[0.08]">
              <MessageSquare className="h-3.5 w-3.5 text-[#B85C12]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#B85C12]/75">
                Review feedback
              </p>

              <p className="mt-1 text-[11px] leading-5 text-ink/55">
                {deliverable.feedback}
              </p>

              {(deliverable.status === 'Revision Requested' ||
                deliverable.status === 'Rejected') && (
                <button
                  type="button"
                  className="
                    mt-3
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-ink
                    px-3.5
                    py-2
                    text-[9px]
                    font-bold
                    text-white
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:shadow-[0_5px_14px_rgba(20,30,25,0.12)]
                  "
                >
                  <Upload className="h-3 w-3" />
                  Submit revision
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

/* =============================================================== */
/* Summary Card */
/* =============================================================== */

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  description: string
  tone: 'amber' | 'orange' | 'teal' | 'ink'
}) {
  const toneStyles = {
    amber: {
      icon: 'bg-[#F7EFE8] text-[#B85C12]',
      accent: 'text-[#B85C12]',
    },
    orange: {
      icon: 'bg-orange-500/[0.07] text-orange-700',
      accent: 'text-orange-700',
    },
    teal: {
      icon: 'bg-[#EAF4EE] text-[#12613E]',
      accent: 'text-[#12613E]',
    },
    ink: {
      icon: 'bg-ink/[0.045] text-ink/55',
      accent: 'text-ink',
    },
  }

  return (
    <Card
      className="
        group
        relative
        overflow-hidden
        rounded-[20px]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_14px_34px_rgba(20,30,25,0.055)]
      "
    >
      <CardBody className="relative">
        <div className="flex items-start justify-between">
          <div
            className={`
              flex h-10 w-10 items-center justify-center
              rounded-[13px]
              transition-transform
              duration-300
              group-hover:scale-105
              ${toneStyles[tone].icon}
            `}
          >
            <Icon className="h-[17px] w-[17px]" />
          </div>

          <span className="font-display text-[27px] font-semibold leading-none tracking-[-0.04em] text-ink">
            {value.toString().padStart(2, '0')}
          </span>
        </div>

        <p
          className={`
            mt-5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.13em]
            ${toneStyles[tone].accent}
          `}
        >
          {label}
        </p>

        <p className="mt-1.5 text-[10px] leading-4 text-ink/40">
          {description}
        </p>
      </CardBody>
    </Card>
  )
}

/* =============================================================== */
/* Metadata */
/* =============================================================== */

function MetaItem({
  label,
  value,
  emphasize = false,
}: {
  label: string
  value: string
  emphasize?: boolean
}) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-ink/30">
        {label}
      </p>

      <p
        className={[
          'mt-1.5 truncate text-[11px]',
          emphasize
            ? 'font-semibold text-ink'
            : 'font-medium text-ink/60',
        ].join(' ')}
      >
        {value}
      </p>
    </div>
  )
}

/* =============================================================== */
/* Status Badge */
/* =============================================================== */

function StatusBadge({
  status,
}: {
  status: DeliverableStatus
}) {
  const config: Record<
    DeliverableStatus,
    {
      className: string
      icon: React.ComponentType<{ className?: string }>
    }
  > = {
    Submitted: {
      className: 'bg-sky-500/[0.08] text-sky-700',
      icon: Upload,
    },

    'Under Review': {
      className: 'bg-[#B85C12]/[0.08] text-[#B85C12]',
      icon: Clock3,
    },

    'Revision Requested': {
      className: 'bg-orange-500/[0.08] text-orange-700',
      icon: MessageSquare,
    },

    Approved: {
      className: 'bg-[#12613E]/[0.08] text-[#12613E]',
      icon: CheckCircle2,
    },

    Rejected: {
      className: 'bg-rose-500/[0.07] text-rose-700',
      icon: XCircle,
    },
  }

  const { className, icon: Icon } = config[status]

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-2.5
        py-1.5
        text-[9px]
        font-bold
        leading-none
        ${className}
      `}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  )
}