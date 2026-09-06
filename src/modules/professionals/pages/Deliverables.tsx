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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
            Professional workspace
          </p>

          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
            Deliverables
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Manage submitted professional deliverables, review feedback and
            track client approval before payment.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Upload className="h-3.5 w-3.5" />
          Upload deliverable
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={Clock3}
          label="Awaiting review"
          value={pendingCount}
          description="Submitted deliverables"
        />

        <SummaryCard
          icon={MessageSquare}
          label="Needs revision"
          value={revisionCount}
          description="Client feedback received"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Approved"
          value={approvedCount}
          description="Accepted by clients"
        />

        <SummaryCard
          icon={FileCheck2}
          label="Total deliverables"
          value={deliverables.length}
          description="Across active projects"
        />
      </div>

      {/* Main workspace */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Submitted deliverables"
          subtitle="Track deliverables awaiting client review and approval"
        />

        <div className="border-y border-line bg-paper-2 px-6 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative min-w-0 flex-1 lg:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search deliverables, projects or services..."
                className="h-10 w-full rounded-xl border border-line bg-white pl-9 pr-3 text-xs text-ink outline-none placeholder:text-ink/30 focus:border-ink/30"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <Filter className="mr-1 h-3.5 w-3.5 shrink-0 text-ink/35" />

              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={[
                    'whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-semibold transition-colors',
                    activeFilter === filter
                      ? 'bg-ink text-white'
                      : 'bg-white text-ink/50 hover:bg-ink/5 hover:text-ink',
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
          <div className="divide-y divide-line">
            {filteredDeliverables.map((deliverable) => (
              <DeliverableRow
                key={deliverable.id}
                deliverable={deliverable}
              />
            ))}
          </div>
        ) : (
          <CardBody>
            <div className="flex min-h-52 flex-col items-center justify-center text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink/5">
                <FileText className="h-5 w-5 text-ink/35" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-ink">
                No deliverables found
              </h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-ink/40">
                Try another search term or change the status filter.
              </p>
            </div>
          </CardBody>
        )}
      </Card>
    </div>
  )
}

function DeliverableRow({
  deliverable,
}: {
  deliverable: Deliverable
}) {
  return (
    <div className="px-6 py-5 transition-colors hover:bg-ink/[0.015]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* Identity */}
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/5">
            <FileText className="h-4 w-4 text-ink/45" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-ink">
                {deliverable.title}
              </h3>

              <StatusBadge status={deliverable.status} />
            </div>

            <p className="mt-1 text-xs text-ink/45">
              {deliverable.project}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-ink/35">
              <span>{deliverable.id}</span>
              <span>{deliverable.service}</span>
              <span>{deliverable.files} files</span>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4 xl:min-w-[510px]">
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
          />

          <MetaItem
            label="Review"
            value={deliverable.reviewer}
          />
        </div>

        {/* Action */}
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
        >
          <Eye className="h-3.5 w-3.5" />
          View
          <ChevronRight className="h-3.5 w-3.5 text-ink/35" />
        </button>
      </div>

      {/* Revision feedback */}
      {deliverable.feedback && (
        <div className="mt-4 rounded-xl border border-amber-500/15 bg-amber-500/[0.04] px-4 py-3">
          <div className="flex gap-3">
            <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700" />

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-700/70">
                Review feedback
              </p>

              <p className="mt-1 text-xs leading-5 text-ink/55">
                {deliverable.feedback}
              </p>
            </div>
          </div>

          {(deliverable.status === 'Revision Requested' ||
            deliverable.status === 'Rejected') && (
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-[10px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Upload className="h-3 w-3" />
              Submit revision
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  description: string
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
            <Icon className="h-4 w-4 text-ink/45" />
          </div>

          <span className="font-display text-2xl font-semibold tracking-tight text-ink">
            {value}
          </span>
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink/40">
          {label}
        </p>

        <p className="mt-1 text-xs text-ink/40">
          {description}
        </p>
      </CardBody>
    </Card>
  )
}

function MetaItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
        {label}
      </p>

      <p className="mt-1 truncate text-[11px] font-medium text-ink/65">
        {value}
      </p>
    </div>
  )
}

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
      className: 'bg-sky-500/10 text-sky-700',
      icon: Upload,
    },
    'Under Review': {
      className: 'bg-amber-500/10 text-amber-700',
      icon: Clock3,
    },
    'Revision Requested': {
      className: 'bg-orange-500/10 text-orange-700',
      icon: MessageSquare,
    },
    Approved: {
      className: 'bg-emerald-500/10 text-emerald-700',
      icon: CheckCircle2,
    },
    Rejected: {
      className: 'bg-rose-500/10 text-rose-700',
      icon: XCircle,
    },
  }

  const { className, icon: Icon } = config[status]

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-semibold ${className}`}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  )
}  