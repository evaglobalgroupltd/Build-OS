import { useMemo } from 'react'
import {
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock,
  Gavel,
  MessageCircle,
  Target,
  Wallet,
} from 'lucide-react'

import { DashboardLayout } from '@/layouts/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { ProjectCard } from '@/modules/projects/components/ProjectCard'
import { ProjectProgressChart } from '@/components/charts/ProjectProgressChart'
import { SkeletonCard } from '@/components/feedback/Skeleton'
import { useMockLoading } from '@/hooks/useMockLoading'
import { projects, disputes } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { useProjectProfile } from '@/hooks/useProjectProfile'
import { deriveClientDashboardConfig } from '@/derive/clientDashboardConfig'
import {
  PROJECT_TYPES,
  PROPERTY_TYPES,
  COVERAGE_STATES,
  LAND_STATUS_OPTIONS,
  INVESTMENT_BANDS,
  PRIORITIES,
  getOptionLabel,
  getOptionLabels,
  getBandRange,
} from '@/data/projectOptions'

const projectImages = [
  '/images/estate1.jpeg',
  '/images/estate2.jpeg',
  '/images/estate3.jpeg',
  '/images/estate4.jpeg',
  '/images/estate5.jpeg',
]

const milestones = [
  { label: 'Foundation', status: 'complete' },
  { label: 'Structure', status: 'complete' },
  { label: 'Roofing', status: 'current' },
  { label: 'Electrical/Plumbing', status: 'pending' },
  { label: 'Finishing', status: 'pending' },
  { label: 'Handover', status: 'pending' },
]

const recentUpdates = [
  {
    text: 'Roofing evidence uploaded — 9 photos awaiting your review.',
    meta: 'Grace Aliyu · Supervisor · Adeyemi 5-Bedroom Duplex · 20 Jun',
    tone: 'current',
  },
  {
    text: 'Structure milestone approved. ₦6.75M released to contractor.',
    meta: 'You · Approved · Adeyemi 5-Bedroom Duplex · 12 Jun',
    tone: 'complete',
  },
  {
    text: 'Foundation milestone approved. ₦4.5M released to contractor.',
    meta: 'You · Approved · Adeyemi 5-Bedroom Duplex · 2 Jun',
    tone: 'complete',
  },
  {
    text: 'Site survey completed and shared to your documents.',
    meta: 'Engr. Bala Yusuf · Engineer · Adeyemi 5-Bedroom Duplex · 24 May',
    tone: 'muted',
  },
]

const activityDotClasses = {
  complete: 'bg-[#12613E]',
  current: 'bg-[#B85C12]',
  muted: 'bg-ink/25',
}

export function ClientDashboard() {
  const { user } = useAuth()

  // Single source of truth for the Project Studio questionnaire answers.
  // Reads from localStorage today; will read from the backend later with
  // no change needed here — see src/hooks/useProjectProfile.ts.
  const profile = useProjectProfile()

  // Derivation layer: turns raw answers into a typed "what should this
  // client see" config. All phase/branching logic lives in this one
  // function — see src/derive/clientDashboardConfig.ts — so it stays out
  // of JSX and is unit-testable on its own.
  //
  // NOTE: this assumes useProjectProfile exposes the raw answers object.
  // If it doesn't yet, add it to the hook's return value — it already
  // reads the full stored object from localStorage, so this is a one-line
  // addition (e.g. `return { ..., answers }`).
  const config = useMemo(
    () => deriveClientDashboardConfig(profile.answers ?? {}),
    [profile.answers],
  )

  const projectTypeLabel = getOptionLabel(PROJECT_TYPES, profile.get('projectType'))
  const propertyTypeLabel = getOptionLabel(PROPERTY_TYPES, profile.get('propertyType'))
  const locationLabel = getOptionLabel(COVERAGE_STATES, profile.get('location'))
  const landStatusLabel = getOptionLabel(LAND_STATUS_OPTIONS, profile.get('landStatus'))
  const budgetRange = getBandRange(INVESTMENT_BANDS, profile.get('budget'))
  const priorityLabels = getOptionLabels(PRIORITIES, profile.get<string[]>('priorities', []))

  const profileTags = [
    projectTypeLabel,
    propertyTypeLabel,
    locationLabel,
    landStatusLabel,
    budgetRange,
    ...priorityLabels,
  ].filter((tag): tag is string => Boolean(tag))

  const { data, isLoading } = useMockLoading(() => {
    const myProjects = projects.filter(
      (project) => project.clientName === user.fullName,
    )

    return {
      myProjects,
      totalEscrow: myProjects.reduce(
        (sum, project) => sum + project.escrowBalance,
        0,
      ),
      pendingApprovals: myProjects.reduce(
        (sum, project) => sum + project.pendingApprovals,
        0,
      ),
    }
  })

  const firstName = user.fullName.split(' ')[0]

  return (
    <DashboardLayout title="Client Overview">

      {/* ===================================================== */}
      {/* Header */}
      {/* ===================================================== */}

      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Private client workspace
            </p>
          </div>

          <h1 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
            Good afternoon, {firstName}
          </h1>

          <p className="mt-1.5 text-[13px] leading-5 text-ink/50">
            Here's the latest across your properties, funds and project decisions.
          </p>
        </div>

        <button
          type="button"
          className="
            flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-ink/[0.10]
            bg-white
            px-4
            py-2.5
            text-xs
            font-semibold
            text-ink
            transition
            hover:border-ink/20
            hover:shadow-sm
          "
        >
          <ClipboardCheck size={14} />
          Review decisions
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F5E8DD] px-1 text-[9px] font-bold text-[#B85C12]">
            {data?.pendingApprovals ?? 0}
          </span>
        </button>
      </div>

      {/* ===================================================== */}
      {/* Project profile (from the Project Studio questionnaire) */}
      {/* ===================================================== */}

      {profile.hasProfile && (
        <section aria-label="Project profile" className="mb-7">
          <Card>
            <CardHeader
              title="Your project profile"
              subtitle="From your Project Studio answers"
            />
            <CardBody className="pt-4">
              {profileTags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profileTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#F4F6F3] px-3 py-1.5 text-[11px] font-semibold text-ink/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[12px] text-ink/45">
                  Complete your Project Studio profile to personalize this dashboard.
                </p>
              )}
            </CardBody>
          </Card>
        </section>
      )}

      {/* ===================================================== */}
      {/* Loading */}
      {/* ===================================================== */}

      {isLoading || !data ? (
        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Loading dashboard"
        >
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <>
          {/* ================================================= */}
          {/* Vision vs. today                                   */}
          {/* Answers-derived: what the client said they're      */}
          {/* building, next to the real state of their project. */}
          {/* Skips cleanly if we have no catalog image to show.  */}
          {/* ================================================= */}

          {config.showVisionCard && (
            <section aria-label="Your vision and current state" className="mb-7">
              <Card className="overflow-hidden">
                <CardHeader
                  title="Your vision, and where you are today"
                  subtitle={
                    config.visionLabel
                      ? `Building a ${config.visionLabel.toLowerCase()}`
                      : undefined
                  }
                />
                <CardBody className="pt-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    {/* The vision — derived from the questionnaire's property/project type */}
                    <div className="group relative h-[220px] overflow-hidden rounded-[18px] bg-[#18271F]">
                      <img
                        src={config.visionImage}
                        alt={config.visionLabel ?? 'Your project vision'}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#12613E]">
                          The vision
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="font-display text-[18px] font-semibold text-white">
                          {config.visionLabel}
                        </p>
                        <p className="mt-1 text-[11px] leading-4 text-white/65">
                          {config.nextStepTitle}
                        </p>
                      </div>
                    </div>

                    {/* Today — real project data when it exists, phase copy when it doesn't */}
                    <div className="group relative h-[220px] overflow-hidden rounded-[18px] bg-[#18271F]">
                      {data.myProjects.length > 0 ? (
                        <>
                          <img
                            src={projectImages[0]}
                            alt="Current state of your build"
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                          <div className="absolute left-4 top-4">
                            <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#B85C12]">
                              Today
                            </span>
                          </div>
                          <div className="absolute inset-x-0 bottom-0 p-5">
                            <p className="font-display text-[18px] font-semibold text-white">
                              {data.myProjects[0].progressPercent}% complete
                            </p>
                            <p className="mt-1 text-[11px] leading-4 text-white/65">
                              {data.myProjects[0].name}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-2 bg-[#F4F6F3] px-6 text-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink/40">
                            <Target size={17} />
                          </div>
                          <p className="text-[12.5px] font-semibold text-ink/70">
                            {config.nextStepTitle}
                          </p>
                          <p className="max-w-[220px] text-[11px] leading-5 text-ink/45">
                            {config.nextStepCopy}
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                </CardBody>
              </Card>
            </section>
          )}

          {/* ================================================= */}
          {/* Metrics */}
          {/* ================================================= */}

          <section
            aria-label="Client overview"
            className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4"
          >
            <StatCard
              label="Properties in progress"
              value={String(data.myProjects.length)}
              icon={Building2}
              tone="ink"
            />

            <StatCard
              label="Capital protected"
              value={`₦${(data.totalEscrow / 1_000_000).toFixed(1)}M`}
              icon={Wallet}
              tone="teal"
              hint="Held until milestones are approved"
            />

            <StatCard
              label="Awaiting your review"
              value={String(data.pendingApprovals)}
              icon={ClipboardCheck}
              tone="amber"
            />

            <StatCard
              label="Active disputes"
              value={String(disputes.length)}
              icon={Gavel}
              tone="brick"
            />
          </section>

          {/* ================================================= */}
          {/* Portfolio hero */}
          {/* ================================================= */}

          {data.myProjects.length > 0 && (
            <section
              aria-label="Featured property"
              className="
                mb-7
                grid
                grid-cols-1
                gap-5
                xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.75fr)]
              "
            >

              {/* Featured project */}

              <div className="group relative min-h-[390px] overflow-hidden rounded-[24px] bg-[#18271F] shadow-[0_18px_50px_rgba(20,40,30,0.11)]">

                <img
                  src={projectImages[0]}
                  alt="Featured property"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-[1.025]
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#12613E]">
                    Your active build
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">

                  <div className="mb-3 flex items-center gap-4 text-[11px] text-white/70">
                    <span>
                      Guzape, Abuja
                    </span>

                    <span className="h-3 w-px bg-white/30" />

                    <span>
                      62% complete
                    </span>
                  </div>

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                      <h2 className="max-w-xl font-display text-[27px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[32px]">
                        {data.myProjects[0].name}
                      </h2>

                      <p className="mt-2 text-[12px] text-white/60">
                        Construction is progressing according to the current milestone plan.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="
                        flex
                        shrink-0
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        bg-white
                        px-5
                        py-2.5
                        text-xs
                        font-bold
                        text-ink
                        transition
                        hover:bg-white/90
                      "
                    >
                      View project
                      <ArrowUpRight size={14} />
                    </button>

                  </div>
                </div>
              </div>

              {/* Financial overview */}

              <Card className="overflow-hidden">

                <div className="border-b border-ink/[0.07] px-5 py-5">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                        Capital overview
                      </p>

                      <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                        Your funds
                      </h3>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
                      <CircleDollarSign size={17} />
                    </div>

                  </div>
                </div>

                <CardBody className="flex h-full flex-col p-5">

                  <div>
                    <p className="text-[11px] text-ink/45">
                      Currently protected
                    </p>

                    <p className="mt-1 font-display text-[28px] font-semibold tracking-[-0.035em] text-ink">
                      ₦{(data.totalEscrow / 1_000_000).toFixed(1)}M
                    </p>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/[0.06]">
                      <div className="h-full w-[72%] rounded-full bg-[#12613E]" />
                    </div>

                    <div className="mt-2 flex justify-between text-[10px] text-ink/40">
                      <span>Protected funds</span>
                      <span>72%</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <div className="rounded-2xl bg-[#F4F6F3] p-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/40">
                        Pending
                      </p>

                      <p className="mt-1 font-display text-base font-semibold text-[#B85C12]">
                        ₦4.5M
                      </p>
                    </div>

                    <div className="rounded-2xl border border-ink/[0.07] p-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/40">
                        Released
                      </p>

                      <p className="mt-1 font-display text-base font-semibold text-ink">
                        ₦32.5M
                      </p>
                    </div>

                  </div>

                  <button
                    type="button"
                    className="
                      mt-auto
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-xl
                      bg-ink
                      px-4
                      py-3
                      text-xs
                      font-semibold
                      text-white
                      transition
                      hover:opacity-90
                    "
                  >
                    <span className="flex items-center gap-2">
                      <Wallet size={14} />
                      Open financial vault
                    </span>

                    <ChevronRight size={15} />
                  </button>

                </CardBody>
              </Card>
            </section>
          )}

          {/* ================================================= */}
          {/* Build progress + recent updates */}
          {/* Gated by config.showMilestoneTracker (derived from  */}
          {/* stage), not an inline boolean — see derivation layer. */}
          {/* ================================================= */}

          {data.myProjects.length > 0 && config.showMilestoneTracker && (
            <section
              aria-label="Build progress and recent updates"
              className="mb-7 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]"
            >

              <Card>
                <CardBody className="p-5 sm:p-6">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                        {data.myProjects[0].name}
                      </p>

                      <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                        Build progress
                      </h3>

                      <p className="mt-1 text-[12px] text-ink/50">
                        Track each stage as your contractor submits evidence for review.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="flex shrink-0 items-center justify-center gap-2 rounded-full border border-ink/[0.08] bg-white px-5 py-2.5 text-xs font-bold text-ink transition hover:border-ink/20"
                    >
                      <MessageCircle size={14} />
                      Message contractor
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

                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#B85C12]/20 bg-[#F8EEE6] px-4 py-3">

                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B85C12]/15 text-[#B85C12]">
                      <Clock size={13} />
                    </div>

                    <p className="text-[12px] leading-5 text-[#7A3F0C]">
                      <span className="font-semibold">Awaiting you:</span> roofing evidence has been submitted for your review.
                    </p>

                  </div>

                </CardBody>
              </Card>

              <Card>

                <div className="flex items-center justify-between border-b border-ink/[0.07] px-5 py-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                      Timeline
                    </p>

                    <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                      Recent updates
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

                  {recentUpdates.map((entry) => (
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
          )}

          {data.myProjects.length > 0 && !config.showMilestoneTracker && profile.hasProfile && (
            <section aria-label="Getting started" className="mb-7">
              <Card>
                <CardBody className="flex flex-col items-center gap-2 py-10 text-center">
                  <p className="text-sm font-semibold text-ink">
                    {config.nextStepTitle}
                  </p>
                  <p className="max-w-sm text-xs leading-5 text-ink/45">
                    {config.nextStepCopy}
                  </p>
                </CardBody>
              </Card>
            </section>
          )}

          {/* ================================================= */}
          {/* Progress overview */}
          {/* ================================================= */}

          {data.myProjects.length > 0 && (
            <section
              className="mb-7"
              aria-label="Portfolio progress"
            >
              <Card>

                <CardHeader
                  title="Portfolio progress"
                  subtitle="How each active build is tracking against its delivery plan"
                />

                <CardBody>

                  <ProjectProgressChart
                    data={data.myProjects.map((project) => ({
                      name: project.name,
                      progressPercent: project.progressPercent,
                    }))}
                  />

                </CardBody>
              </Card>
            </section>
          )}

          {/* ================================================= */}
          {/* Projects */}
          {/* ================================================= */}

          <section
            className="mb-7"
            aria-label="Project portfolio"
          >

            <div className="mb-4 flex items-end justify-between">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                  Portfolio
                </p>

                <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                  Your properties
                </h2>

                <p className="mt-1 text-[11px] text-ink/45">
                  Track progress, milestones and contractor activity.
                </p>
              </div>

              <button
                type="button"
                className="
                  hidden
                  items-center
                  gap-1
                  text-xs
                  font-semibold
                  text-[#B85C12]
                  sm:flex
                "
              >
                View all projects
                <ChevronRight size={14} />
              </button>

            </div>

            {data.myProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                {data.myProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="
                      rounded-[20px]
                      border
                      border-ink/[0.07]
                      bg-white
                      p-1
                      transition
                      duration-300
                      hover:-translate-y-0.5
                      hover:shadow-[0_15px_35px_rgba(20,40,30,0.07)]
                    "
                  >
                    <ProjectCard
                      project={project}
                    />

                    <div className="flex items-center justify-between border-t border-ink/[0.06] px-4 py-3">

                      <div className="flex items-center gap-2">

                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF4EE] text-[#12613E]">
                          <CheckCircle2 size={13} />
                        </div>

                        <span className="text-[10px] font-medium text-ink/45">
                          Milestone tracking active
                        </span>

                      </div>

                      <span className="text-[10px] font-semibold text-ink/45">
                        Project {index + 1}
                      </span>

                    </div>
                  </div>
                ))}

              </div>
            ) : (
              <Card>
                <CardBody className="py-12 text-center">

                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-ink/[0.05] text-ink/35">
                    <Building2 size={19} />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-ink">
                    Your portfolio is empty
                  </p>

                  <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-ink/45">
                    Once a project is assigned to your account, you'll be able to monitor its progress and finances here.
                  </p>

                </CardBody>
              </Card>
            )}

          </section>

          {/* ================================================= */}
          {/* Decisions + disputes */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)]">

            {/* Decisions */}

            <Card>

              <CardHeader
                title="Decisions waiting for you"
                subtitle="Items that may need your approval"
              />

              <CardBody className="pt-4">

                {data.pendingApprovals === 0 ? (

                  <div className="flex items-center gap-3 py-5">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
                      <CheckCircle2 size={17} />
                    </div>

                    <div>
                      <p className="text-[12px] font-semibold text-ink">
                        Nothing waiting
                      </p>

                      <p className="mt-0.5 text-[11px] text-ink/45">
                        You're fully caught up with project approvals.
                      </p>
                    </div>

                  </div>

                ) : (

                  <div className="space-y-2">

                    <div className="flex items-center gap-4 rounded-2xl bg-[#F7F4EF] p-4">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F5E8DD] text-[#B85C12]">
                        <ClipboardCheck size={16} />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-[12px] font-semibold text-ink">
                          {data.pendingApprovals} milestone
                          {data.pendingApprovals === 1 ? '' : 's'} require approval
                        </p>

                        <p className="mt-1 text-[10px] text-ink/45">
                          Review submitted evidence before funds can be released.
                        </p>

                      </div>

                      <ChevronRight
                        size={16}
                        className="shrink-0 text-ink/30"
                      />

                    </div>

                  </div>
                )}

              </CardBody>
            </Card>

            {/* Disputes */}

            <Card>

              <CardHeader
                title="Issues & disputes"
                subtitle="Items requiring attention"
              />

              <CardBody className="pt-4">

                {disputes.length === 0 ? (

                  <div className="flex items-center gap-3 py-4">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
                      <CheckCircle2 size={15} />
                    </div>

                    <div>
                      <p className="text-[12px] font-semibold text-ink">
                        All clear
                      </p>

                      <p className="mt-0.5 text-[10px] text-ink/45">
                        No active disputes.
                      </p>
                    </div>

                  </div>

                ) : (

                  <div className="space-y-3">

                    {disputes.slice(0, 3).map((dispute) => (

                      <div
                        key={dispute.id}
                        className="rounded-2xl border border-brick/10 bg-brick-light/30 p-4"
                      >

                        <div className="flex items-start justify-between gap-3">

                          <p className="text-[11px] font-bold text-brick">
                            {dispute.category}
                          </p>

                          <span className="rounded-lg bg-white/80 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-brick">
                            {dispute.status.replace('_', ' ')}
                          </span>

                        </div>

                        <p className="mt-1.5 text-[10px] text-ink/45">
                          With {dispute.respondent}
                        </p>

                        <p className="mt-2 font-display text-[14px] font-semibold text-ink">
                          ₦{(dispute.amount / 1_000_000).toFixed(2)}M
                        </p>

                      </div>

                    ))}

                  </div>

                )}

              </CardBody>
            </Card>

          </div>
        </>
      )}

    </DashboardLayout>
  )
}