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
        activeFilter === 'All' || proposal.status === activeFilter

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
    <div className="space-y-7">
      {/* ─────────────────────────────────────────────
          PAGE HEADER
      ───────────────────────────────────────────── */}
      <header className="relative overflow-hidden rounded-[28px] border border-ink/[0.07] bg-white shadow-[0_14px_45px_rgba(11,18,32,0.045)]">
        <div className="absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-16 rounded-full bg-[#1657FF]/[0.08] blur-3xl" />

        <div className="relative flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1657FF]">
                Professional workspace
              </p>
            </div>

            <h1 className="mt-2 font-display text-3xl font-semibold tracking-[-0.035em] text-[#0B1220] sm:text-[34px]">
              Proposals
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-ink/45">
              Manage submitted proposals, monitor client decisions and keep
              your professional opportunities moving forward.
            </p>
          </div>

          <button
            type="button"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0B1220] px-5 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(11,18,32,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1657FF] hover:shadow-[0_12px_28px_rgba(22,87,255,0.22)]"
          >
            <Send className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            New proposal
            <ChevronRight className="h-3.5 w-3.5 text-white/45 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────
          SUMMARY METRICS
      ───────────────────────────────────────────── */}
      <section
        aria-label="Proposal summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <SummaryCard
          icon={Clock3}
          label="Active proposals"
          value={activeCount}
          description="Awaiting client decision"
          accent="blue"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Accepted"
          value={acceptedCount}
          description="Successful proposals"
          accent="green"
        />

        <SummaryCard
          icon={XCircle}
          label="Declined"
          value={declinedCount}
          description="Client declined"
          accent="rose"
        />

        <SummaryCard
          icon={FileText}
          label="Total submitted"
          value={proposals.length}
          description="Proposal history"
          accent="navy"
        />
      </section>

      {/* ─────────────────────────────────────────────
          PROPOSAL WORKSPACE
      ───────────────────────────────────────────── */}
      <Card className="overflow-hidden rounded-[26px] border-ink/[0.07] shadow-[0_14px_45px_rgba(11,18,32,0.045)]">
        <CardHeader
          title="Submitted proposals"
          subtitle="Monitor proposal status, pricing and client decisions"
        />

        {/* Toolbar */}
        <div className="border-y border-ink/[0.06] bg-[#F6F8FC] px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative min-w-0 flex-1 lg:max-w-md">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/25" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search proposals, projects or services..."
                  className="h-11 w-full rounded-xl border border-ink/[0.07] bg-white pl-10 pr-4 text-xs font-medium text-ink outline-none shadow-[0_2px_8px_rgba(11,18,32,0.025)] transition-all placeholder:text-ink/25 focus:border-[#1657FF]/30 focus:ring-4 focus:ring-[#1657FF]/[0.06]"
                />
              </div>

              <div className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/30 lg:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />
                {filteredProposals.length} result
                {filteredProposals.length === 1 ? '' : 's'}
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
              <div className="mr-1 flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-white px-2.5 text-[10px] font-semibold text-ink/40 shadow-[0_2px_8px_rgba(11,18,32,0.025)]">
                <Filter className="h-3 w-3" />
                Filter
              </div>

              {filters.map((filter) => {
                const count =
                  filter === 'All'
                    ? proposals.length
                    : proposals.filter(
                        (proposal) => proposal.status === filter,
                      ).length

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={[
                      'group inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[10px] font-semibold transition-all duration-200',
                      activeFilter === filter
                        ? 'bg-[#0B1220] text-white shadow-[0_5px_14px_rgba(11,18,32,0.13)]'
                        : 'bg-white text-ink/45 hover:bg-ink/[0.035] hover:text-ink',
                    ].join(' ')}
                  >
                    {filter}

                    <span
                      className={[
                        'text-[9px]',
                        activeFilter === filter
                          ? 'text-white/45'
                          : 'text-ink/25 group-hover:text-ink/40',
                      ].join(' ')}
                    >
                      {String(count).padStart(2, '0')}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredProposals.length > 0 ? (
          <div className="divide-y divide-ink/[0.06]">
            {filteredProposals.map((proposal, index) => (
              <ProposalRow
                key={proposal.id}
                proposal={proposal}
                index={index}
              />
            ))}
          </div>
        ) : (
          <CardBody>
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-ink/[0.06] bg-[#F6F8FC]">
                <FileText className="h-5 w-5 text-ink/25" />
              </div>

              <h3 className="mt-4 font-display text-base font-semibold text-ink">
                No proposals found
              </h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-ink/40">
                Try another search term or change the proposal status filter.
              </p>

              {(search || activeFilter !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('')
                    setActiveFilter('All')
                  }}
                  className="mt-4 rounded-full bg-[#0B1220] px-4 py-2 text-[10px] font-semibold text-white transition-all hover:bg-[#1657FF]"
                >
                  Clear filters
                </button>
              )}
            </div>
          </CardBody>
        )}
      </Card>
    </div>
  )
}

function ProposalRow({
  proposal,
  index,
}: {
  proposal: Proposal
  index: number
}) {
  return (
    <article className="group relative px-5 py-5 transition-all duration-200 hover:bg-[#F6F8FC]/65 sm:px-6 sm:py-6">
      {/* Left accent */}
      <div className="absolute bottom-5 left-0 top-5 w-0.5 rounded-r-full bg-[#1657FF] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="flex flex-col gap-6">
        {/* Main row */}
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          {/* Proposal identity */}
          <div className="flex min-w-0 gap-4">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-ink/[0.06] bg-[#F6F8FC] text-[#0B1220] transition-all duration-200 group-hover:border-[#1657FF]/15 group-hover:bg-[#1657FF]/[0.07]">
              <FileText className="h-[17px] w-[17px] text-ink/45 transition-colors group-hover:text-[#1657FF]" />

              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-[#0B1220] px-1 text-[7px] font-bold text-white">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold tracking-[-0.01em] text-ink">
                  {proposal.title}
                </h3>

                <StatusBadge status={proposal.status} />
              </div>

              <p className="mt-1.5 text-xs font-medium text-ink/45">
                {proposal.project}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <MetaPill>{proposal.id}</MetaPill>
                <MetaPill>{proposal.service}</MetaPill>
                <MetaPill>
                  {proposal.deliverables} deliverables
                </MetaPill>
              </div>
            </div>
          </div>

          {/* Action */}
          <button
            type="button"
            className="group/button inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-ink/[0.07] bg-white px-4 py-2.5 text-[11px] font-semibold text-ink shadow-[0_2px_8px_rgba(11,18,32,0.025)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1657FF]/20 hover:bg-[#1657FF] hover:text-white hover:shadow-[0_8px_20px_rgba(22,87,255,0.14)]"
          >
            View proposal
            <ChevronRight className="h-3.5 w-3.5 text-ink/30 transition-all group-hover/button:translate-x-0.5 group-hover/button:text-white" />
          </button>
        </div>

        {/* Metadata panel */}
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-ink/[0.055] bg-[#F6F8FC] sm:grid-cols-4">
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
            emphasis
          />

          <MetaItem
            label="Valid until"
            value={proposal.validUntil}
          />
        </div>

        {/* Description */}
        <div className="rounded-2xl border border-ink/[0.055] bg-white px-4 py-3.5 sm:px-5">
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#1657FF]/[0.07]">
              <FileText className="h-3 w-3 text-[#1657FF]" />
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-ink/30">
                Proposal scope
              </p>

              <p className="mt-1 text-xs leading-5 text-ink/50">
                {proposal.description}
              </p>
            </div>
          </div>
        </div>

        {/* Proposal message / outcome */}
        {proposal.message && (
          <div
            className={[
              'rounded-2xl border px-4 py-3.5 sm:px-5',
              proposal.status === 'Declined'
                ? 'border-rose-500/[0.12] bg-rose-500/[0.035]'
                : 'border-emerald-500/[0.12] bg-emerald-500/[0.035]',
            ].join(' ')}
          >
            <div className="flex gap-3">
              <div
                className={[
                  'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
                  proposal.status === 'Declined'
                    ? 'bg-rose-500/10'
                    : 'bg-emerald-500/10',
                ].join(' ')}
              >
                {proposal.status === 'Declined' ? (
                  <XCircle className="h-3.5 w-3.5 text-rose-600" />
                ) : (
                  <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                )}
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-ink/35">
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
    </article>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  description: string
  accent: 'blue' | 'green' | 'rose' | 'navy'
}) {
  const accentStyles = {
    blue: {
      icon: 'bg-[#1657FF]/[0.08] text-[#1657FF]',
      dot: 'bg-[#1657FF]',
    },
    green: {
      icon: 'bg-emerald-500/[0.08] text-emerald-600',
      dot: 'bg-emerald-500',
    },
    rose: {
      icon: 'bg-rose-500/[0.08] text-rose-600',
      dot: 'bg-rose-500',
    },
    navy: {
      icon: 'bg-[#0B1220]/[0.06] text-[#0B1220]',
      dot: 'bg-[#0B1220]',
    },
  }

  const styles = accentStyles[accent]

  return (
    <Card className="group relative overflow-hidden rounded-[22px] border-ink/[0.07] shadow-[0_10px_35px_rgba(11,18,32,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(11,18,32,0.07)]">
      <CardBody>
        <div className="flex items-start justify-between">
          <div
            className={[
              'flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105',
              styles.icon,
            ].join(' ')}
          >
            <Icon className="h-[17px] w-[17px]" />
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
            />

            <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-ink/25">
              Live
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
              {label}
            </p>

            <p className="mt-1 text-xs text-ink/40">
              {description}
            </p>
          </div>

          <span className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#0B1220]">
            {String(value).padStart(2, '0')}
          </span>
        </div>

        <div className="mt-5 h-1 overflow-hidden rounded-full bg-ink/[0.045]">
          <div
            className={`h-full w-1/3 rounded-full ${styles.dot} opacity-80 transition-all duration-500 group-hover:w-1/2`}
          />
        </div>
      </CardBody>
    </Card>
  )
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-ink/[0.035] px-2.5 py-1 text-[9px] font-semibold text-ink/35">
      {children}
    </span>
  )
}

function MetaItem({
  icon: Icon,
  label,
  value,
  emphasis = false,
}: {
  icon?: React.ComponentType<{ className?: string }>
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <div className="min-w-0 border-b border-r border-ink/[0.055] px-4 py-3.5 last:border-r-0 sm:border-b-0 sm:px-5">
      <p className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.14em] text-ink/25">
        {Icon && <Icon className="h-2.5 w-2.5" />}
        {label}
      </p>

      <p
        className={[
          'mt-1.5 truncate text-[11px]',
          emphasis
            ? 'font-bold text-[#0B1220]'
            : 'font-semibold text-ink/60',
        ].join(' ')}
      >
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
      className: 'bg-[#1657FF]/[0.08] text-[#1657FF]',
      icon: Send,
    },
    'Under Review': {
      className: 'bg-amber-500/[0.09] text-amber-700',
      icon: Clock3,
    },
    Shortlisted: {
      className: 'bg-violet-500/[0.09] text-violet-700',
      icon: BadgeCheck,
    },
    Accepted: {
      className: 'bg-emerald-500/[0.09] text-emerald-700',
      icon: CheckCircle2,
    },
    Declined: {
      className: 'bg-rose-500/[0.09] text-rose-700',
      icon: XCircle,
    },
    Withdrawn: {
      className: 'bg-ink/[0.05] text-ink/45',
      icon: XCircle,
    },
  }

  const { className, icon: Icon } = config[status]

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-bold',
        className,
      ].join(' ')}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  )
}