import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Filter,
  MapPin,
  Search,
  Send,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type InvitationStatus =
  | 'New'
  | 'Reviewing'
  | 'Proposal Submitted'
  | 'Expired'
  | 'Declined'

type ServiceInvitation = {
  id: string
  title: string
  project: string
  service: string
  location: string
  receivedAt: string
  deadline: string
  status: InvitationStatus
  budget: string
  duration: string
  client: string
  description: string
  requirements: string[]
}

const invitations: ServiceInvitation[] = [
  {
    id: 'INV-0078',
    title: 'Residential Architectural Design',
    project: 'Maitama Residence',
    service: 'Architecture',
    location: 'Maitama, Abuja',
    receivedAt: 'Aug 30, 2026',
    deadline: 'Sep 08, 2026',
    status: 'New',
    budget: '₦750k – ₦950k',
    duration: '6–8 weeks',
    client: 'Verified Client',
    description:
      'Client is seeking an experienced architect for the design and documentation of a new residential property.',
    requirements: [
      'Concept and detailed architectural design',
      'Construction documentation',
      'Residential project experience',
    ],
  },
  {
    id: 'INV-0074',
    title: 'Structural Engineering Services',
    project: 'Jabi Duplex Construction',
    service: 'Structural Engineering',
    location: 'Jabi, Abuja',
    receivedAt: 'Aug 28, 2026',
    deadline: 'Sep 05, 2026',
    status: 'Reviewing',
    budget: '₦500k – ₦700k',
    duration: '4–5 weeks',
    client: 'Verified Client',
    description:
      'Structural engineer required for analysis, design and construction documentation for a residential duplex.',
    requirements: [
      'Structural analysis and design',
      'Foundation and frame design',
      'Construction-stage technical support',
    ],
  },
  {
    id: 'INV-0070',
    title: 'Topographical Site Survey',
    project: 'Gwarinpa Residential Development',
    service: 'Surveying',
    location: 'Gwarinpa, Abuja',
    receivedAt: 'Aug 25, 2026',
    deadline: 'Sep 02, 2026',
    status: 'Proposal Submitted',
    budget: '₦250k – ₦350k',
    duration: '7–10 days',
    client: 'Verified Client',
    description:
      'Survey professional required to establish site boundaries, levels and topographical information.',
    requirements: [
      'Boundary survey',
      'Topographical survey',
      'Survey plan and coordinates',
    ],
  },
  {
    id: 'INV-0066',
    title: 'Planning Approval Consultancy',
    project: 'Lokogoma Family Home',
    service: 'Planning & Approvals',
    location: 'Lokogoma, Abuja',
    receivedAt: 'Aug 20, 2026',
    deadline: 'Aug 29, 2026',
    status: 'Expired',
    budget: '₦350k – ₦450k',
    duration: '4–6 weeks',
    client: 'Verified Client',
    description:
      'Professional planning consultant needed to coordinate statutory approval documentation.',
    requirements: [
      'Planning documentation',
      'Approval submission support',
      'Regulatory coordination',
    ],
  },
  {
    id: 'INV-0062',
    title: 'Property Valuation Assignment',
    project: 'Asokoro Investment Property',
    service: 'Valuation',
    location: 'Asokoro, Abuja',
    receivedAt: 'Aug 17, 2026',
    deadline: 'Aug 27, 2026',
    status: 'Declined',
    budget: '₦200k – ₦300k',
    duration: '5–7 days',
    client: 'Verified Client',
    description:
      'Independent valuation professional required for an investment property assessment.',
    requirements: [
      'Physical property inspection',
      'Market analysis',
      'Professional valuation report',
    ],
  },
]

const filters = [
  'All',
  'New',
  'Reviewing',
  'Proposal Submitted',
  'Expired',
  'Declined',
] as const

export function ServiceInvitations() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>('All')
  const [search, setSearch] = useState('')

  const filteredInvitations = useMemo(() => {
    const query = search.trim().toLowerCase()

    return invitations.filter((invitation) => {
      const matchesFilter =
        activeFilter === 'All' ||
        invitation.status === activeFilter

      const matchesSearch =
        !query ||
        invitation.title.toLowerCase().includes(query) ||
        invitation.project.toLowerCase().includes(query) ||
        invitation.service.toLowerCase().includes(query) ||
        invitation.location.toLowerCase().includes(query) ||
        invitation.id.toLowerCase().includes(query)

      return matchesFilter && matchesSearch
    })
  }, [activeFilter, search])

  const newCount = invitations.filter(
    (item) => item.status === 'New',
  ).length

  const reviewingCount = invitations.filter(
    (item) => item.status === 'Reviewing',
  ).length

  const submittedCount = invitations.filter(
    (item) => item.status === 'Proposal Submitted',
  ).length

  return (
    <div className="space-y-7">
      {/* ─────────────────────────────────────────────
          PAGE HEADER
      ───────────────────────────────────────────── */}
      <header className="relative overflow-hidden rounded-[28px] border border-ink/[0.07] bg-white shadow-[0_14px_45px_rgba(11,18,32,0.045)]">
        {/* Decorative glow */}
        <div className="absolute right-0 top-0 h-48 w-48 translate-x-16 -translate-y-20 rounded-full bg-[#1657FF]/[0.09] blur-3xl" />

        <div className="absolute bottom-0 right-24 h-20 w-20 translate-y-12 rounded-full bg-[#34A6FF]/[0.06] blur-2xl" />

        <div className="relative flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1657FF]">
                Professional workspace
              </p>
            </div>

            <h1 className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-[#0B1220] sm:text-[34px]">
              Service Invitations
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-ink/45">
              Review verified project opportunities, assess requirements and
              decide which assignments you want to pursue.
            </p>
          </div>

          {/* Verification signal */}
          <div className="group flex items-center gap-3 rounded-2xl border border-ink/[0.07] bg-[#F6F8FC] px-4 py-3.5 transition-all duration-200 hover:border-[#1657FF]/15 hover:bg-[#1657FF]/[0.025]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/[0.08]">
              <BadgeCheck className="h-4 w-4 text-emerald-600" />
            </div>

            <div>
              <p className="text-[10px] font-bold text-[#0B1220]">
                Verified opportunities
              </p>

              <p className="mt-0.5 text-[9px] text-ink/40">
                Invitations from verified project clients
              </p>
            </div>

            <ChevronRight className="ml-2 h-3.5 w-3.5 text-ink/20 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────
          SUMMARY
      ───────────────────────────────────────────── */}
      <section
        aria-label="Invitation summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <SummaryCard
          icon={Send}
          label="New invitations"
          value={newCount}
          description="Awaiting your response"
          accent="blue"
        />

        <SummaryCard
          icon={Clock3}
          label="Under review"
          value={reviewingCount}
          description="Opportunities you're considering"
          accent="amber"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Proposals submitted"
          value={submittedCount}
          description="Awaiting client decision"
          accent="violet"
        />

        <SummaryCard
          icon={BriefcaseBusiness}
          label="Total invitations"
          value={invitations.length}
          description="Invitation history"
          accent="navy"
        />
      </section>

      {/* ─────────────────────────────────────────────
          OPPORTUNITY WORKSPACE
      ───────────────────────────────────────────── */}
      <Card className="overflow-hidden rounded-[26px] border-ink/[0.07] shadow-[0_14px_45px_rgba(11,18,32,0.045)]">
        <CardHeader
          title="Service opportunities"
          subtitle="Review project requirements before submitting a proposal"
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
                  placeholder="Search invitations, projects or services..."
                  className="h-11 w-full rounded-xl border border-ink/[0.07] bg-white pl-10 pr-4 text-xs font-medium text-ink outline-none shadow-[0_2px_8px_rgba(11,18,32,0.025)] transition-all placeholder:text-ink/25 focus:border-[#1657FF]/30 focus:ring-4 focus:ring-[#1657FF]/[0.06]"
                />
              </div>

              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />

                {filteredInvitations.length} opportunity
                {filteredInvitations.length === 1 ? '' : 'ies'}
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
                    ? invitations.length
                    : invitations.filter(
                        (item) => item.status === filter,
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
        {filteredInvitations.length > 0 ? (
          <div className="divide-y divide-ink/[0.06]">
            {filteredInvitations.map((invitation, index) => (
              <InvitationRow
                key={invitation.id}
                invitation={invitation}
                index={index}
              />
            ))}
          </div>
        ) : (
          <CardBody>
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-ink/[0.06] bg-[#F6F8FC]">
                <Search className="h-5 w-5 text-ink/25" />
              </div>

              <h3 className="mt-4 font-display text-base font-semibold text-ink">
                No invitations found
              </h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-ink/40">
                Try another search term or change the invitation status
                filter.
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

function InvitationRow({
  invitation,
  index,
}: {
  invitation: ServiceInvitation
  index: number
}) {
  const canRespond =
    invitation.status === 'New' ||
    invitation.status === 'Reviewing'

  return (
    <article className="group relative px-5 py-5 transition-all duration-200 hover:bg-[#F6F8FC]/60 sm:px-6 sm:py-6">
      {/* Hover accent */}
      <div className="absolute bottom-5 left-0 top-5 w-0.5 rounded-r-full bg-[#1657FF] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="flex flex-col gap-6">
        {/* Identity + actions */}
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex min-w-0 flex-1 gap-4">
            {/* Opportunity icon */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-ink/[0.06] bg-[#F6F8FC] transition-all duration-200 group-hover:border-[#1657FF]/15 group-hover:bg-[#1657FF]/[0.06]">
              <BriefcaseBusiness className="h-[17px] w-[17px] text-ink/40 transition-colors group-hover:text-[#1657FF]" />

              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-[#0B1220] px-1 text-[7px] font-bold text-white">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold tracking-[-0.01em] text-ink">
                  {invitation.title}
                </h3>

                <StatusBadge status={invitation.status} />
              </div>

              <p className="mt-1.5 text-xs font-medium text-ink/45">
                {invitation.project}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <MetaPill>{invitation.id}</MetaPill>

                <MetaPill>{invitation.service}</MetaPill>

                <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-ink/35">
                  <MapPin className="h-3 w-3 text-ink/25" />
                  {invitation.location}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              className="group/button inline-flex items-center justify-center gap-1.5 rounded-xl border border-ink/[0.07] bg-white px-4 py-2.5 text-[11px] font-semibold text-ink shadow-[0_2px_8px_rgba(11,18,32,0.025)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1657FF]/20 hover:bg-[#1657FF] hover:text-white hover:shadow-[0_8px_20px_rgba(22,87,255,0.14)]"
            >
              View details

              <ChevronRight className="h-3.5 w-3.5 text-ink/25 transition-all group-hover/button:translate-x-0.5 group-hover/button:text-white" />
            </button>

            {canRespond && (
              <button
                type="button"
                className="group/button inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0B1220] px-4 py-2.5 text-[11px] font-semibold text-white shadow-[0_5px_15px_rgba(11,18,32,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1657FF] hover:shadow-[0_8px_20px_rgba(22,87,255,0.18)]"
              >
                <Send className="h-3.5 w-3.5 transition-transform group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
                Submit proposal
              </button>
            )}
          </div>
        </div>

        {/* Opportunity metrics */}
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-ink/[0.055] bg-[#F6F8FC] sm:grid-cols-4">
          <MetaItem
            icon={CalendarDays}
            label="Received"
            value={invitation.receivedAt}
          />

          <MetaItem
            icon={Clock3}
            label="Deadline"
            value={invitation.deadline}
          />

          <MetaItem
            label="Budget"
            value={invitation.budget}
            emphasis
          />

          <MetaItem
            label="Duration"
            value={invitation.duration}
          />
        </div>

        {/* Brief + requirements */}
        <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          {/* Brief */}
          <div className="rounded-2xl border border-ink/[0.055] bg-white px-4 py-4 sm:px-5">
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#1657FF]/[0.07]">
                <FileText className="h-3.5 w-3.5 text-[#1657FF]" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-ink/30">
                  Project brief
                </p>

                <p className="mt-1.5 text-xs leading-5 text-ink/50">
                  {invitation.description}
                </p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="rounded-2xl border border-ink/[0.055] bg-white px-4 py-4 sm:px-5">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-ink/30">
                Key requirements
              </p>

              <span className="rounded-full bg-ink/[0.035] px-2 py-1 text-[8px] font-bold text-ink/30">
                {String(invitation.requirements.length).padStart(2, '0')}
              </span>
            </div>

            <div className="mt-2.5 space-y-2">
              {invitation.requirements.map((requirement) => (
                <div
                  key={requirement}
                  className="flex items-start gap-2 text-[10px] text-ink/45"
                >
                  <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-[#1657FF]/50" />

                  <span>{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client signal */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.055] pt-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/[0.08]">
              <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" />
            </div>

            <div>
              <p className="text-[9px] font-bold text-ink/50">
                {invitation.client}
              </p>

              <p className="text-[8px] text-ink/30">
                Client identity verified
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] font-semibold text-ink/30">
            <Clock3 className="h-3 w-3" />
            Response deadline: {invitation.deadline}
          </div>
        </div>

        {/* Expired / declined notice */}
        {(invitation.status === 'Expired' ||
          invitation.status === 'Declined') && (
          <div
            className={[
              'flex items-center gap-2 rounded-2xl border px-4 py-3 text-[10px]',
              invitation.status === 'Expired'
                ? 'border-amber-500/[0.12] bg-amber-500/[0.035] text-amber-700'
                : 'border-rose-500/[0.12] bg-rose-500/[0.035] text-rose-700',
            ].join(' ')}
          >
            <XCircle className="h-3.5 w-3.5 shrink-0" />

            <span>
              {invitation.status === 'Expired'
                ? 'This invitation is no longer accepting proposals.'
                : 'This invitation was declined and is no longer active.'}
            </span>
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
  accent: 'blue' | 'amber' | 'violet' | 'navy'
}) {
  const styles = {
    blue: {
      icon: 'bg-[#1657FF]/[0.08] text-[#1657FF]',
      dot: 'bg-[#1657FF]',
    },
    amber: {
      icon: 'bg-amber-500/[0.08] text-amber-600',
      dot: 'bg-amber-500',
    },
    violet: {
      icon: 'bg-violet-500/[0.08] text-violet-600',
      dot: 'bg-violet-500',
    },
    navy: {
      icon: 'bg-[#0B1220]/[0.06] text-[#0B1220]',
      dot: 'bg-[#0B1220]',
    },
  }

  const style = styles[accent]

  return (
    <Card className="group relative overflow-hidden rounded-[22px] border-ink/[0.07] shadow-[0_10px_35px_rgba(11,18,32,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(11,18,32,0.07)]">
      <CardBody>
        <div className="flex items-start justify-between">
          <div
            className={[
              'flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105',
              style.icon,
            ].join(' ')}
          >
            <Icon className="h-[17px] w-[17px]" />
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />

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
            className={[
              'h-full w-1/3 rounded-full opacity-80 transition-all duration-500 group-hover:w-1/2',
              style.dot,
            ].join(' ')}
          />
        </div>
      </CardBody>
    </Card>
  )
}

function MetaPill({
  children,
}: {
  children: React.ReactNode
}) {
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
  status: InvitationStatus
}) {
  const config: Record<
    InvitationStatus,
    {
      className: string
      icon: React.ComponentType<{ className?: string }>
    }
  > = {
    New: {
      className: 'bg-[#1657FF]/[0.08] text-[#1657FF]',
      icon: Send,
    },
    Reviewing: {
      className: 'bg-amber-500/[0.09] text-amber-700',
      icon: Clock3,
    },
    'Proposal Submitted': {
      className: 'bg-violet-500/[0.09] text-violet-700',
      icon: FileText,
    },
    Expired: {
      className: 'bg-ink/[0.05] text-ink/40',
      icon: Clock3,
    },
    Declined: {
      className: 'bg-rose-500/[0.09] text-rose-700',
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