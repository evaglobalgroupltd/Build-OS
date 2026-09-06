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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
            Professional workspace
          </p>

          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
            Service Invitations
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Review invitations from clients and decide which professional
            service opportunities you want to pursue.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5">
          <BadgeCheck className="h-4 w-4 text-emerald-600" />

          <div>
            <p className="text-[10px] font-semibold text-ink">
              Verified opportunities
            </p>

            <p className="text-[9px] text-ink/40">
              Invitations from verified project clients
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={Send}
          label="New invitations"
          value={newCount}
          description="Awaiting your response"
        />

        <SummaryCard
          icon={Clock3}
          label="Under review"
          value={reviewingCount}
          description="Opportunities you're considering"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Proposals submitted"
          value={submittedCount}
          description="Awaiting client decision"
        />

        <SummaryCard
          icon={BriefcaseBusiness}
          label="Total invitations"
          value={invitations.length}
          description="Invitation history"
        />
      </div>

      {/* Invitation list */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Service opportunities"
          subtitle="Review project requirements before submitting a proposal"
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
                placeholder="Search invitations, projects or services..."
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

        {filteredInvitations.length > 0 ? (
          <div className="divide-y divide-line">
            {filteredInvitations.map((invitation) => (
              <InvitationRow
                key={invitation.id}
                invitation={invitation}
              />
            ))}
          </div>
        ) : (
          <CardBody>
            <div className="flex min-h-52 flex-col items-center justify-center text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink/5">
                <Search className="h-5 w-5 text-ink/35" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-ink">
                No invitations found
              </h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-ink/40">
                Try another search term or change the invitation status
                filter.
              </p>
            </div>
          </CardBody>
        )}
      </Card>
    </div>
  )
}

function InvitationRow({
  invitation,
}: {
  invitation: ServiceInvitation
}) {
  const canRespond =
    invitation.status === 'New' ||
    invitation.status === 'Reviewing'

  return (
    <div className="px-6 py-5 transition-colors hover:bg-ink/[0.015]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        {/* Identity */}
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/5">
            <BriefcaseBusiness className="h-4 w-4 text-ink/45" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-ink">
                {invitation.title}
              </h3>

              <StatusBadge status={invitation.status} />
            </div>

            <p className="mt-1 text-xs font-medium text-ink/50">
              {invitation.project}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-ink/35">
              <span>{invitation.id}</span>

              <span>{invitation.service}</span>

              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {invitation.location}
              </span>
            </div>
          </div>
        </div>

        {/* Opportunity metadata */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4 xl:min-w-[560px]">
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
          />

          <MetaItem
            label="Duration"
            value={invitation.duration}
          />
        </div>

        {/* Action */}
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
          >
            View details
            <ChevronRight className="h-3.5 w-3.5 text-ink/35" />
          </button>

          {canRespond && (
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-ink px-3.5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Send className="h-3.5 w-3.5" />
              Submit proposal
            </button>
          )}
        </div>
      </div>

      {/* Opportunity detail */}
      <div className="mt-5 grid gap-4 border-t border-line pt-5 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
            Project brief
          </p>

          <p className="mt-1.5 text-xs leading-5 text-ink/50">
            {invitation.description}
          </p>
        </div>

        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
            Key requirements
          </p>

          <div className="mt-2 space-y-1.5">
            {invitation.requirements.map((requirement) => (
              <div
                key={requirement}
                className="flex items-start gap-2 text-[10px] text-ink/45"
              >
                <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-ink/30" />
                <span>{requirement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expired / declined notice */}
      {(invitation.status === 'Expired' ||
        invitation.status === 'Declined') && (
        <div
          className={[
            'mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-[10px]',
            invitation.status === 'Expired'
              ? 'border border-amber-500/15 bg-amber-500/[0.04] text-amber-700'
              : 'border border-rose-500/15 bg-rose-500/[0.04] text-rose-700',
          ].join(' ')}
        >
          <XCircle className="h-3.5 w-3.5" />

          <span>
            {invitation.status === 'Expired'
              ? 'This invitation is no longer accepting proposals.'
              : 'This invitation was declined and is no longer active.'}
          </span>
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
      className: 'bg-sky-500/10 text-sky-700',
      icon: Send,
    },
    Reviewing: {
      className: 'bg-amber-500/10 text-amber-700',
      icon: Clock3,
    },
    'Proposal Submitted': {
      className: 'bg-violet-500/10 text-violet-700',
      icon: FileText,
    },
    Expired: {
      className: 'bg-ink/5 text-ink/40',
      icon: Clock3,
    },
    Declined: {
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