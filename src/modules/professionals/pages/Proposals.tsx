import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Filter,
  MessageSquare,
  Search,
  Send,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type ProposalStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Shortlisted'
  | 'Accepted'
  | 'Declined'
  | 'Withdrawn'

type Proposal = {
  id: string
  title: string
  project: string
  service: string
  submittedAt: string
  validUntil: string
  status: ProposalStatus
  fee: string
  timeline: string
  description: string
  client: string
  deliverables: number
  message?: string
}

const proposals: Proposal[] = [
  {
    id: 'PROP-0052',
    title: 'Architectural Design & Documentation',
    project: 'Maitama Residence',
    service: 'Architecture',
    submittedAt: 'Aug 29, 2026',
    validUntil: 'Sep 12, 2026',
    status: 'Under Review',
    fee: '₦850,000',
    timeline: '6 weeks',
    description:
      'Complete architectural design package covering concept development, detailed drawings and construction documentation.',
    client: 'Private Client',
    deliverables: 8,
  },
  {
    id: 'PROP-0049',
    title: 'Residential Structural Design',
    project: 'Jabi Duplex Construction',
    service: 'Structural Engineering',
    submittedAt: 'Aug 27, 2026',
    validUntil: 'Sep 10, 2026',
    status: 'Shortlisted',
    fee: '₦620,000',
    timeline: '4 weeks',
    description:
      'Structural analysis and design for the proposed duplex including foundation, columns, beams and slab design.',
    client: 'Private Client',
    deliverables: 6,
  },
  {
    id: 'PROP-0045',
    title: 'Topographical & Boundary Survey',
    project: 'Gwarinpa Residential Development',
    service: 'Surveying',
    submittedAt: 'Aug 24, 2026',
    validUntil: 'Sep 07, 2026',
    status: 'Accepted',
    fee: '₦320,000',
    timeline: '10 days',
    description:
      'Complete site survey including boundary confirmation, topographical levels, coordinates and survey plan.',
    client: 'Private Client',
    deliverables: 5,
  },
  {
    id: 'PROP-0041',
    title: 'Planning Approval Support',
    project: 'Lokogoma Family Home',
    service: 'Planning & Approvals',
    submittedAt: 'Aug 20, 2026',
    validUntil: 'Sep 03, 2026',
    status: 'Submitted',
    fee: '₦410,000',
    timeline: '5 weeks',
    description:
      'Preparation and coordination of statutory planning documentation and approval submissions.',
    client: 'Private Client',
    deliverables: 7,
  },
  {
    id: 'PROP-0037',
    title: 'Property Valuation',
    project: 'Asokoro Investment Property',
    service: 'Valuation',
    submittedAt: 'Aug 17, 2026',
    validUntil: 'Aug 31, 2026',
    status: 'Declined',
    fee: '₦275,000',
    timeline: '7 days',
    description:
      'Independent property valuation supported by site inspection, market analysis and professional reporting.',
    client: 'Private Client',
    deliverables: 4,
    message:
      'The client selected another professional for this assignment.',
  },
]

const filters = [
  'All',
  'Submitted',
  'Under Review',
  'Shortlisted',
  'Accepted',
  'Declined',
  'Withdrawn',
] as const

export function Proposals() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>('All')
  const [search, setSearch] = useState('')

  const filteredProposals = useMemo(() => {
    const query = search.trim().toLowerCase()

    return proposals.filter((proposal) => {
      const matchesFilter =
        activeFilter === 'All' ||
        proposal.status === activeFilter

      const matchesSearch =
        !query ||
        proposal.title.toLowerCase().includes(query) ||
        proposal.project.toLowerCase().includes(query) ||
        proposal.service.toLowerCase().includes(query) ||
        proposal.id.toLowerCase().includes(query)

      return matchesFilter && matchesSearch
    })
  }, [activeFilter, search])

  const activeCount = proposals.filter(
    (proposal) =>
      proposal.status === 'Submitted' ||
      proposal.status === 'Under Review' ||
      proposal.status === 'Shortlisted',
  ).length

  const acceptedCount = proposals.filter(
    (proposal) => proposal.status === 'Accepted',
  ).length

  const declinedCount = proposals.filter(
    (proposal) => proposal.status === 'Declined',
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
            Professional workspace
          </p>

          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
            Proposals
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Track submitted service proposals, client reviews and proposal
            outcomes across your projects.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Send className="h-3.5 w-3.5" />
          New proposal
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={Clock3}
          label="Active proposals"
          value={activeCount}
          description="Awaiting client decision"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Accepted"
          value={acceptedCount}
          description="Successful proposals"
        />

        <SummaryCard
          icon={XCircle}
          label="Declined"
          value={declinedCount}
          description="Client declined"
        />

        <SummaryCard
          icon={FileText}
          label="Total submitted"
          value={proposals.length}
          description="Proposal history"
        />
      </div>

      {/* Proposal workspace */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Submitted proposals"
          subtitle="Monitor proposal status, pricing and client decisions"
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
                placeholder="Search proposals, projects or services..."
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
        {filteredProposals.length > 0 ? (
          <div className="divide-y divide-line">
            {filteredProposals.map((proposal) => (
              <ProposalRow
                key={proposal.id}
                proposal={proposal}
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
                No proposals found
              </h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-ink/40">
                Try another search term or change the proposal status filter.
              </p>
            </div>
          </CardBody>
        )}
      </Card>
    </div>
  )
}

function ProposalRow({
  proposal,
}: {
  proposal: Proposal
}) {
  return (
    <div className="px-6 py-5 transition-colors hover:bg-ink/[0.015]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* Proposal identity */}
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/5">
            <FileText className="h-4 w-4 text-ink/45" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-ink">
                {proposal.title}
              </h3>

              <StatusBadge status={proposal.status} />
            </div>

            <p className="mt-1 text-xs text-ink/45">
              {proposal.project}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-ink/35">
              <span>{proposal.id}</span>
              <span>{proposal.service}</span>
              <span>{proposal.deliverables} deliverables</span>
            </div>
          </div>
        </div>

        {/* Proposal metadata */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4 xl:min-w-[530px]">
          <MetaItem
            icon={CalendarDays}
            label="Submitted"
            value={proposal.submittedAt}
          />

          <MetaItem
            icon={Clock3}
            label="Timeline"
            value={proposal.timeline}
          />

          <MetaItem
            label="Proposed fee"
            value={proposal.fee}
          />

          <MetaItem
            label="Valid until"
            value={proposal.validUntil}
          />
        </div>

        {/* Action */}
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
        >
          View proposal
          <ChevronRight className="h-3.5 w-3.5 text-ink/35" />
        </button>
      </div>

      {/* Proposal message / outcome */}
      {proposal.message && (
        <div
          className={[
            'mt-4 rounded-xl px-4 py-3',
            proposal.status === 'Declined'
              ? 'border border-rose-500/15 bg-rose-500/[0.04]'
              : 'border border-emerald-500/15 bg-emerald-500/[0.04]',
          ].join(' ')}
        >
          <div className="flex gap-3">
            {proposal.status === 'Declined' ? (
              <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-600" />
            ) : (
              <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
            )}

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                Client message
              </p>

              <p className="mt-1 text-xs leading-5 text-ink/55">
                {proposal.message}
              </p>
            </div>
          </div>
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
  icon: Icon,
  label,
  value,
}: {
  icon?: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-ink/30">
        {Icon && <Icon className="h-2.5 w-2.5" />}
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
  status: ProposalStatus
}) {
  const config: Record<
    ProposalStatus,
    {
      className: string
      icon: React.ComponentType<{ className?: string }>
    }
  > = {
    Submitted: {
      className: 'bg-sky-500/10 text-sky-700',
      icon: Send,
    },
    'Under Review': {
      className: 'bg-amber-500/10 text-amber-700',
      icon: Clock3,
    },
    Shortlisted: {
      className: 'bg-violet-500/10 text-violet-700',
      icon: BadgeCheck,
    },
    Accepted: {
      className: 'bg-emerald-500/10 text-emerald-700',
      icon: CheckCircle2,
    },
    Declined: {
      className: 'bg-rose-500/10 text-rose-700',
      icon: XCircle,
    },
    Withdrawn: {
      className: 'bg-ink/5 text-ink/45',
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