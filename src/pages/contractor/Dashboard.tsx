import { useMemo } from 'react'
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock,
  Gavel,
  Info,
  MapPin,
  Plus,
  Search,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react'

import { DashboardLayout } from '@/layouts/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { TrustScore } from '@/components/ui/TrustScore'
import { BidList } from '@/modules/bidding/components/BidList'
import { MaterialRequestList } from '@/modules/procurement/components/MaterialRequestList'
import { bids, materialRequests } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { useProjectProfile } from '@/hooks/useProjectProfile'
import { deriveContractorDashboardConfig } from '@/derive/contractorDashboardConfig'

const projectImages = [
  '/images/Yea1.jpeg',
  '/images/Yea2.jpeg',
  '/images/Yea3.jpeg',
  '/images/yea4.jpeg',
]

// `state` / `specialty` map to COVERAGE_STATES / CONTRACTOR_SPECIALTIES values
// (see src/data/projectOptions.ts). In mock data today; a real API response
// should carry these same fields so config.matchesOpportunity works unchanged.
const opportunities = [
  {
    title: 'Modern 4-Bedroom Residence',
    location: 'Maitama, Abuja',
    state: 'abuja',
    specialty: 'residential',
    value: '₦31.5M',
    progress: 'Tender closes in 4 days',
    image: projectImages[1],
  },
  {
    title: 'Palm Grove Estate — Block B',
    location: 'Gwarinpa, Abuja',
    state: 'abuja',
    specialty: 'residential',
    value: '₦46.8M',
    progress: 'Site visit available',
    image: projectImages[2],
  },
  {
    title: 'Contemporary Family Duplex',
    location: 'Wuse 2, Abuja',
    state: 'abuja',
    specialty: 'residential',
    value: '₦27.2M',
    progress: '8 contractors shortlisted',
    image: projectImages[3],
  },
  {
    title: 'Riverside Office Complex',
    location: 'Victoria Island, Lagos',
    state: 'lagos',
    specialty: 'commercial',
    value: '₦58.4M',
    progress: 'Pre-qualification open',
    image: projectImages[0],
  },
]

const milestones = [
  { label: 'Foundation', status: 'complete' },
  { label: 'Structure', status: 'complete' },
  { label: 'Roofing', status: 'current' },
  { label: 'Electrical/Plumbing', status: 'pending' },
  { label: 'Finishing', status: 'pending' },
  { label: 'Handover', status: 'pending' },
]

const pendingActions = [
  {
    icon: AlertTriangle,
    tone: 'amber',
    text: '1 milestone under inspection — track approval in the vault.',
    actionLabel: 'Open vault',
  },
  {
    icon: Info,
    tone: 'ink',
    text: '2 new projects open for bids on the marketplace.',
    actionLabel: 'Browse',
  },
  {
    icon: Info,
    tone: 'ink',
    text: 'A team member invite is still pending acceptance.',
    actionLabel: 'Manage team',
  },
]

const teamActivity = [
  {
    text: 'Roof covering completed. Uploaded 9 photos for inspector review.',
    meta: 'Grace Aliyu · Supervisor · Adeyemi 5-Bedroom Duplex · 9 photos · 20 Jun',
    tone: 'complete',
  },
  {
    text: 'First-fix conduit runs started on ground floor.',
    meta: 'Musa Danladi · Electrician · Grace Chapel Auditorium · 4 photos · 19 Jun',
    tone: 'current',
  },
  {
    text: 'Structure milestone funds released by client. Moving to roofing.',
    meta: 'Engr. Bala Yusuf · Engineer · Adeyemi 5-Bedroom Duplex · 12 Jun',
    tone: 'complete',
  },
  {
    text: 'Column reinforcement tied to first-floor level.',
    meta: 'Sunday Effiong · Mason · Grace Chapel Auditorium · 6 photos · 11 Jun',
    tone: 'muted',
  },
]

const actionToneClasses = {
  amber: { chip: 'bg-[#F8EEE6] text-[#B85C12]' },
  ink: { chip: 'bg-ink/[0.05] text-ink/60' },
}

const activityDotClasses = {
  complete: 'bg-[#12613E]',
  current: 'bg-[#B85C12]',
  muted: 'bg-ink/25',
}

export function ContractorDashboard() {
  const { user } = useAuth()

  // Single source of truth for the Project Studio (CONTRACTOR_FLOW) answers.
  const profile = useProjectProfile()

  // Derivation layer: labels + the opportunity-matching predicate live here,
  // not inline in JSX — see src/derive/contractorDashboardConfig.ts.
  const config = useMemo(
    () => deriveContractorDashboardConfig(profile.answers ?? {}),
    [profile.answers],
  )

  // Matched-first ordering: profile-fit opportunities surface without
  // hiding the rest of the marketplace when the profile is incomplete
  // or nothing matches.
  const sortedOpportunities = useMemo(() => {
    return [...opportunities].sort((a, b) => {
      const aMatch = config.matchesOpportunity(a) ? 0 : 1
      const bMatch = config.matchesOpportunity(b) ? 0 : 1
      return aMatch - bMatch
    })
  }, [config])

  const matchedCount = useMemo(
    () => opportunities.filter(config.matchesOpportunity).length,
    [config],
  )

  const firstName = user.fullName.split(' ')[0]

  return (
    <DashboardLayout title="Contractor Command">

      {/* ------------------------------------------------------- */}
      {/* Header */}
      {/* ------------------------------------------------------- */}

      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Contractor command
            </p>
          </div>

          <h1 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
            Good afternoon, {firstName}
          </h1>

          <p className="mt-1.5 text-[13px] text-ink/50">
            Your projects, tenders and cash position — all in one place.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <TrustScore score={user.trustScore} />

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/60 transition hover:border-ink/20 hover:text-ink"
          >
            <Bell size={17} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-xs font-semibold text-white transition hover:opacity-90"
          >
            <Plus size={15} />
            New bid
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------- */}
      {/* Contractor profile (from the Project Studio questionnaire) */}
      {/* ------------------------------------------------------- */}

      {config.hasProfile && (
        <section aria-label="Contractor profile" className="mb-7">
          <Card>
            <CardHeader
              title="Your contractor profile"
              subtitle="From your Project Studio answers — drives which opportunities are highlighted below"
            />
            <CardBody className="pt-4">
              <div className="flex flex-wrap gap-2">
                {[
                  ...config.specialtyLabels,
                  ...config.coverageStateLabels,
                  config.teamSizeLabel,
                  config.capacityLabel,
                ]
                  .filter((tag): tag is string => Boolean(tag))
                  .map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#F4F6F3] px-3 py-1.5 text-[11px] font-semibold text-ink/70"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </CardBody>
          </Card>
        </section>
      )}

      {/* ------------------------------------------------------- */}
      {/* Metric strip */}
      {/* ------------------------------------------------------- */}

      <section
        aria-label="Business overview"
        className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        <StatCard
          label="Open opportunities"
          value={String(matchedCount).padStart(2, '0')}
          icon={Search}
          tone="ink"
        />

        <StatCard
          label="Bids in review"
          value={String(bids.length)}
          icon={Gavel}
          tone="amber"
        />

        <StatCard
          label="Projects underway"
          value="03"
          icon={Building2}
          tone="teal"
        />

        <StatCard
          label="Received this month"
          value="₦8.0M"
          icon={Wallet}
          tone="teal"
        />
      </section>

      {/* ------------------------------------------------------- */}
      {/* Main project area */}
      {/* ------------------------------------------------------- */}

      <section
        aria-label="Current project"
        className="mb-7 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.75fr)]"
      >

        {/* Hero project */}

        <div className="group relative min-h-[390px] overflow-hidden rounded-[24px] bg-[#17251D] shadow-[0_18px_50px_rgba(20,40,30,0.12)]">

          <img
            src={projectImages[0]}
            alt="Current construction project"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />

          <div className="absolute left-5 top-5 flex items-center gap-2">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#B85C12]">
              Active project
            </span>

            <span className="rounded-full bg-[#153D2B]/90 px-3 py-1.5 text-[10px] font-semibold text-white">
              62% complete
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">

            <div className="mb-4 flex items-center gap-4 text-[11px] font-medium text-white/70">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} />
                Guzape, Abuja
              </span>

              <span className="h-3 w-px bg-white/30" />

              <span>Due in 23 days</span>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <h2 className="max-w-xl font-display text-[27px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[32px]">
                  Adeyemi 5-Bedroom Duplex
                </h2>

                <p className="mt-2 text-[12px] text-white/65">
                  Client: <span className="font-semibold text-white/90">Tunde Adeyemi</span>
                  {' · '}
                  Contract value: <span className="font-semibold text-white/90">₦25.0M</span>
                </p>
              </div>

              <button
                type="button"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-ink transition hover:bg-white/90"
              >
                Open project
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Financial panel */}

        <Card className="flex flex-col overflow-hidden">

          <div className="border-b border-ink/[0.07] px-5 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                  Project finance
                </p>

                <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                  Contract position
                </h3>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F7EFE8] text-[#B85C12]">
                <CircleDollarSign size={17} />
              </div>
            </div>
          </div>

          <CardBody className="flex flex-1 flex-col p-5">

            <div className="mb-6">
              <p className="text-[11px] text-ink/45">
                Total contract value
              </p>

              <p className="mt-1 font-display text-[27px] font-semibold tracking-[-0.03em] text-ink">
                ₦73.0M
              </p>
            </div>

            <div className="space-y-3">

              <div className="rounded-2xl bg-[#F4F7F4] p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink/45">
                    Secured
                  </span>

                  <span className="text-xs font-bold text-[#12613E]">
                    52%
                  </span>
                </div>

                <p className="font-display text-lg font-semibold text-ink">
                  ₦38.2M
                </p>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
                  <div className="h-full w-[52%] rounded-full bg-[#12613E]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-2xl border border-ink/[0.07] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink/40">
                    Released
                  </p>

                  <p className="mt-1 font-display text-base font-semibold text-ink">
                    ₦32.49M
                  </p>
                </div>

                <div className="rounded-2xl border border-ink/[0.07] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink/40">
                    Pending
                  </p>

                  <p className="mt-1 font-display text-base font-semibold text-[#B85C12]">
                    ₦4.50M
                  </p>
                </div>

              </div>

            </div>

            <div className="mt-auto pt-5">

              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl bg-ink px-4 py-3 text-xs font-semibold text-white transition hover:opacity-90"
              >
                <span className="flex items-center gap-2">
                  <Wallet size={14} />
                  View payment milestones
                </span>

                <ChevronRight size={15} />
              </button>

              <p className="mt-3 text-center text-[10px] leading-4 text-ink/40">
                Funds are protected and released against approved milestones.
              </p>

            </div>
          </CardBody>
        </Card>
      </section>

      {/* ------------------------------------------------------- */}
      {/* Progress / next action */}
      {/* ------------------------------------------------------- */}

      <section className="mb-7 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]">

        <Card>
          <CardBody className="p-5 sm:p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                  Next milestone
                </p>

                <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                  Roofing inspection
                </h3>

                <p className="mt-1 text-[12px] text-ink/50">
                  Submit site evidence before the inspector review window closes.
                </p>
              </div>

              <button
                type="button"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#B85C12] px-5 py-2.5 text-xs font-bold text-white transition hover:opacity-90"
              >
                <ClipboardCheck size={14} />
                Submit evidence
              </button>

            </div>

            {/* Connected milestone stepper */}

            <div className="mt-7 overflow-x-auto pb-1">

              <div className="flex min-w-max items-center">

                {milestones.map((milestone, index) => (
                  <div key={milestone.label} className="flex items-center">

                    <div className="flex flex-col items-center gap-2">

                      <div
                        className={[
                          'flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-bold',
                          milestone.status === 'complete'
                            ? 'border-[#12613E] bg-[#12613E] text-white'
                            : milestone.status === 'current'
                              ? 'border-[#B85C12] bg-[#F8EEE6] text-[#B85C12]'
                              : 'border-ink/15 bg-white text-ink/30',
                        ].join(' ')}
                      >
                        {milestone.status === 'complete' ? (
                          <Check size={14} />
                        ) : milestone.status === 'current' ? (
                          <Clock size={13} />
                        ) : (
                          index + 1
                        )}
                      </div>

                      <span
                        className={[
                          'w-[92px] text-center text-[10px] font-semibold leading-tight',
                          milestone.status === 'pending' ? 'text-ink/35' : 'text-ink/70',
                        ].join(' ')}
                      >
                        {milestone.label}
                      </span>

                    </div>

                    {index < milestones.length - 1 && (
                      <div
                        className={[
                          'mb-5 h-[2px] w-10 sm:w-14',
                          milestone.status === 'complete' ? 'bg-[#12613E]' : 'bg-ink/10',
                        ].join(' ')}
                      />
                    )}

                  </div>
                ))}

              </div>

            </div>

            <div className="mb-2 mt-6 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-ink/55">
                Overall completion
              </span>

              <span className="text-[11px] font-bold text-ink">
                62%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-ink/[0.07]">
              <div className="h-full w-[62%] rounded-full bg-[#B85C12]" />
            </div>

            {/* Next-action callout */}

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#B85C12]/20 bg-[#F8EEE6] px-4 py-3">

              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B85C12]/15 text-[#B85C12]">
                <Clock size={13} />
              </div>

              <p className="text-[12px] leading-5 text-[#7A3F0C]">
                <span className="font-semibold">Next:</span> submit roofing milestone evidence for inspector review.
              </p>

            </div>

            <div className="mt-4 flex flex-wrap gap-2">

              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-ink/[0.08] bg-white px-4 py-2 text-[11px] font-semibold text-ink transition hover:border-ink/20"
              >
                <ArrowUpRight size={13} />
                View build
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-ink/[0.08] bg-white px-4 py-2 text-[11px] font-semibold text-ink transition hover:border-ink/20"
              >
                <Users size={13} />
                Team
              </button>

            </div>

          </CardBody>
        </Card>

        {/* Marketplace insight — copy and matched count now derive from the profile */}

        <div className="rounded-[20px] bg-[#173629] p-5 text-white">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
            {config.isFullyBooked ? <Clock size={17} /> : <Sparkles size={17} />}
          </div>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">
            Marketplace insight
          </p>

          {config.isFullyBooked ? (
            <>
              <h3 className="mt-1 font-display text-xl font-semibold leading-tight">
                You're fully booked.
              </h3>

              <p className="mt-2 text-[11px] leading-5 text-white/55">
                New matches will wait here until you free up capacity — update it any time in your profile.
              </p>
            </>
          ) : (
            <>
              <h3 className="mt-1 font-display text-xl font-semibold leading-tight">
                {config.hasProfile ? matchedCount : opportunities.length} projects match your profile.
              </h3>

              <p className="mt-2 text-[11px] leading-5 text-white/55">
                {config.hasProfile
                  ? 'Matched against your coverage states and specialty.'
                  : 'Complete your contractor profile to see matches tailored to you.'}
              </p>
            </>
          )}

          <button
            type="button"
            className="mt-5 flex items-center gap-2 text-xs font-bold text-white"
          >
            Explore opportunities
            <ArrowUpRight size={14} />
          </button>

        </div>
      </section>

      {/* ------------------------------------------------------- */}
      {/* Pending actions & team activity */}
      {/* ------------------------------------------------------- */}

      <section
        aria-label="Pending actions and team activity"
        className="mb-7 grid grid-cols-1 gap-5 lg:grid-cols-2"
      >

        <Card>
          <CardHeader title="Pending actions" />

          <CardBody className="flex flex-col gap-2 pt-4">

            {pendingActions.map((action) => {
              const Icon = action.icon
              const tone = actionToneClasses[action.tone]

              return (
                <div
                  key={action.text}
                  className="flex items-center justify-between gap-3 rounded-xl border border-ink/[0.06] px-4 py-3"
                >

                  <div className="flex items-center gap-3">

                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${tone.chip}`}>
                      <Icon size={13} />
                    </div>

                    <p className="text-[12px] leading-5 text-ink/70">
                      {action.text}
                    </p>

                  </div>

                  <button
                    type="button"
                    className="shrink-0 text-[11px] font-semibold text-[#B85C12]"
                  >
                    {action.actionLabel}
                  </button>

                </div>
              )
            })}

          </CardBody>
        </Card>

        <Card>

          <div className="flex items-center justify-between border-b border-ink/[0.07] px-5 py-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                Team activity
              </p>

              <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                Updates from site
              </h3>
            </div>

            <button
              type="button"
              className="text-[11px] font-semibold text-[#B85C12]"
            >
              View all
            </button>
          </div>

          <CardBody className="flex flex-col gap-4 pt-4">

            {teamActivity.map((entry) => (
              <div key={entry.text} className="flex items-start gap-3">

                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${activityDotClasses[entry.tone]}`}
                />

                <div className="min-w-0">
                  <p className="text-[12px] leading-5 text-ink/75">
                    {entry.text}
                  </p>

                  <p className="mt-0.5 text-[10px] leading-4 text-ink/40">
                    {entry.meta}
                  </p>
                </div>

              </div>
            ))}

          </CardBody>
        </Card>

      </section>

      {/* ------------------------------------------------------- */}
      {/* Opportunities */}
      {/* Matched-first: opportunities fitting the contractor's    */}
      {/* coverage states + specialty (config.matchesOpportunity)  */}
      {/* surface first and carry a "Matches your profile" badge.  */}
      {/* ------------------------------------------------------- */}

      <section className="mb-7">

        <div className="mb-4 flex items-end justify-between">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
              Marketplace
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
              Opportunities worth a look
            </h2>
          </div>

          <button
            type="button"
            className="hidden items-center gap-1 text-xs font-semibold text-[#B85C12] sm:flex"
          >
            View marketplace
            <ChevronRight size={14} />
          </button>

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {sortedOpportunities.map((opportunity) => {
            const isMatch = config.hasProfile && config.matchesOpportunity(opportunity)

            return (
              <article
                key={opportunity.title}
                className="group overflow-hidden rounded-[20px] border border-ink/[0.07] bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(20,40,30,0.08)]"
              >

                <div className="relative h-[155px] overflow-hidden">

                  <img
                    src={opportunity.image}
                    alt={opportunity.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#12613E]">
                    Open tender
                  </span>

                  {isMatch && (
                    <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#B85C12] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-white">
                      <CheckCircle2 size={11} />
                      Matches you
                    </span>
                  )}

                </div>

                <div className="p-4">

                  <h3 className="font-display text-[15px] font-semibold text-ink">
                    {opportunity.title}
                  </h3>

                  <p className="mt-1 flex items-center gap-1 text-[10px] text-ink/45">
                    <MapPin size={11} />
                    {opportunity.location}
                  </p>

                  <div className="mt-4 flex items-end justify-between">

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/35">
                        Estimated value
                      </p>

                      <p className="mt-0.5 font-display text-base font-semibold text-ink">
                        {opportunity.value}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="text-ink/35 transition group-hover:text-[#B85C12]"
                    />

                  </div>

                  <div className="mt-3 border-t border-ink/[0.06] pt-3 text-[10px] font-medium text-ink/45">
                    {opportunity.progress}
                  </div>

                </div>
              </article>
            )
          })}

        </div>
      </section>

      {/* ------------------------------------------------------- */}
      {/* Operational panels */}
      {/* ------------------------------------------------------- */}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]">

        <Card>
          <CardHeader
            title="Your active bids"
            subtitle="Recent tender activity and responses"
          />

          <CardBody className="pt-4">
            <BidList bids={bids} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Procurement queue"
            subtitle="Materials requiring attention"
          />

          <CardBody className="pt-4">
            <MaterialRequestList requests={materialRequests} />
          </CardBody>
        </Card>

      </div>

    </DashboardLayout>
  )
}