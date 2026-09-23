import { useMemo } from 'react'
import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Eye,
  ListChecks,
  MapPin,
  TriangleAlert,
} from 'lucide-react'

import { DashboardLayout } from '@/layouts/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { StagePill } from '@/modules/projects/components/StagePill'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { projects } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { useProjectProfile } from '@/hooks/useProjectProfile'
import { deriveProjectManagerDashboardConfig } from '@/derive/projectManagerDashboardConfig'

const projectImages = [
  '/images/Real1.jpeg',
  '/images/Real3.jpeg',
  '/images/Real5.jpeg',
  '/images/Real7.jpeg',
]

const inspections = [
  {
    id: 1,
    project: 'Abuja Terrace (3 Units)',
    milestone: 'Foundation inspection',
    date: 'Today · 2:30 PM',
    status: 'Ready for review',
    image: projectImages[0],
  },
  {
    id: 2,
    project: 'Lekki 4-Bedroom Duplex',
    milestone: 'Electrical first-fix',
    date: 'Tomorrow · 10:00 AM',
    status: 'Evidence uploaded',
    image: projectImages[1],
  },
]

const featuredMilestones = [
  { label: 'Foundation', status: 'complete' },
  { label: 'Structure', status: 'complete' },
  { label: 'Roofing', status: 'current' },
  { label: 'Electrical', status: 'pending' },
  { label: 'Finishing', status: 'pending' },
  { label: 'Handover', status: 'pending' },
]

export function ProjectManagerDashboard() {
  const { user } = useAuth()

  // Single source of truth for the Project Studio (PROJECT_MANAGER_FLOW) answers.
  const profile = useProjectProfile()

  // Derivation layer: labels + the capacity-vs-workload check live here,
  // not inline in JSX — see src/derive/projectManagerDashboardConfig.ts.
  // Unlike the contractor/professional configs, this one takes no second
  // argument — `isOverCapacity` is a function the dashboard calls with
  // whatever assigned-project count it already has (projects.length below),
  // rather than the derive layer reaching into project data itself.
  const config = useMemo(
    () => deriveProjectManagerDashboardConfig(profile.answers ?? {}),
    [profile.answers],
  )

  const overCapacity = config.isOverCapacity(projects.length)

  const firstName = user.fullName.split(' ')[0]

  const featuredProject = projects[0]

  return (
    <DashboardLayout title="Project Control">

      {/* ===================================================== */}
      {/* Header */}
      {/* ===================================================== */}

      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Delivery control
            </p>
          </div>

          <h1 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
            Good afternoon, {firstName}
          </h1>

          <p className="mt-1.5 text-[13px] leading-5 text-ink/50">
            Monitor site progress, verify milestones, and keep delivery on track.
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
            bg-ink
            px-4
            py-2.5
            text-xs
            font-semibold
            text-white
            transition
            hover:opacity-90
          "
        >
          <Eye size={14} />
          Project overview
        </button>

      </div>

      {/* ===================================================== */}
      {/* Project manager profile (from the Project Studio questionnaire) */}
      {/* ===================================================== */}

      {config.hasProfile && (
        <section aria-label="Project manager profile" className="mb-7">
          <Card>
            <CardHeader
              title="Your project manager profile"
              subtitle="From your Project Studio answers"
            />
            <CardBody className="pt-4">
              <div className="flex flex-wrap gap-2">
                {[
                  ...config.specializationLabels,
                  ...config.coverageStateLabels,
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
              {config.certifications && (
                <p className="mt-3 text-[11px] leading-5 text-ink/50">
                  <span className="font-semibold text-ink/70">Certifications: </span>
                  {config.certifications}
                </p>
              )}
            </CardBody>
          </Card>
        </section>
      )}

      {/* ===================================================== */}
      {/* Capacity warning — declared capacity vs. actual         */}
      {/* assigned workload. Only renders when we can compare     */}
      {/* the two (i.e. capacity has been answered).               */}
      {/* ===================================================== */}

      {overCapacity && (
        <section aria-label="Capacity warning" className="mb-7">
          <div className="flex items-start gap-3 rounded-2xl border border-[#B85C12]/20 bg-[#F8EEE6] px-5 py-4">

            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#B85C12]/15 text-[#B85C12]">
              <TriangleAlert size={15} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-semibold text-[#7A3F0C]">
                You're assigned {projects.length} projects, above the {config.capacityLabel?.toLowerCase()} capacity you set.
              </p>
              <p className="mt-1 text-[11px] leading-5 text-[#7A3F0C]/70">
                Consider updating your capacity in your profile, or flagging this to your team for support.
              </p>
            </div>

          </div>
        </section>
      )}

      {/* ===================================================== */}
      {/* Metrics */}
      {/* ===================================================== */}

      <section
        aria-label="Project manager metrics"
        className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4"
      >

        <StatCard
          label="Assigned projects"
          value={String(projects.length)}
          icon={Building2}
          tone={overCapacity ? 'brick' : 'ink'}
          hint={
            config.capacityCeiling !== undefined && Number.isFinite(config.capacityCeiling)
              ? `Capacity: ${config.capacityLabel}`
              : undefined
          }
        />

        <StatCard
          label="Inspections pending"
          value="02"
          icon={ClipboardCheck}
          tone="amber"
        />

        <StatCard
          label="Milestones to verify"
          value="03"
          icon={ListChecks}
          tone="teal"
        />

        <StatCard
          label="Risk alerts"
          value="01"
          icon={TriangleAlert}
          tone="brick"
        />

      </section>

      {/* ===================================================== */}
      {/* Featured project */}
      {/* ===================================================== */}

      {featuredProject && (
        <section
          aria-label="Priority project"
          className="mb-7"
        >

          <div
            className="
              relative
              min-h-[285px]
              overflow-hidden
              rounded-[24px]
              bg-ink
            "
          >

            <img
              src={projectImages[0]}
              alt={featuredProject.name}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />

            <div className="relative flex min-h-[285px] items-end p-6 sm:p-8">

              <div className="max-w-2xl text-white">

                <div className="mb-4 flex flex-wrap items-center gap-2">

                  <span className="rounded-full bg-white/15 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] backdrop-blur-sm">
                    Priority project
                  </span>

                  <span className="rounded-full bg-[#B85C12] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em]">
                    Active
                  </span>

                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-white/60">

                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} />
                    {featuredProject.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CalendarClock size={12} />
                    Active build
                  </span>

                </div>

                <h2 className="mt-2 font-display text-[25px] font-semibold leading-tight tracking-[-0.025em] sm:text-[30px]">
                  {featuredProject.name}
                </h2>

                <p className="mt-2 max-w-xl text-[12px] leading-5 text-white/60">
                  Current site activity, milestone verification, and delivery
                  status for this assigned project.
                </p>

                <div className="mt-5 max-w-md">

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/40">
                      Overall progress
                    </span>

                    <span className="font-display text-[12px] font-semibold text-white">
                      {featuredProject.progressPercent}%
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-white"
                      style={{
                        width: `${featuredProject.progressPercent}%`,
                      }}
                    />
                  </div>

                </div>

                {/* Milestone stepper */}

                <div className="mt-5 overflow-x-auto pb-1">

                  <div className="flex min-w-max items-center">

                    {featuredMilestones.map((milestone, index) => (
                      <div key={milestone.label} className="flex items-center">

                        <div className="flex flex-col items-center gap-1.5">

                          <div
                            className={[
                              'flex h-6 w-6 items-center justify-center rounded-full border text-[9px] font-bold',
                              milestone.status === 'complete'
                                ? 'border-white bg-white text-ink'
                                : milestone.status === 'current'
                                  ? 'border-[#B85C12] bg-[#B85C12] text-white'
                                  : 'border-white/25 bg-white/5 text-white/40',
                            ].join(' ')}
                          >
                            {milestone.status === 'complete' ? (
                              <Check size={11} />
                            ) : milestone.status === 'current' ? (
                              <Clock size={10} />
                            ) : (
                              index + 1
                            )}
                          </div>

                          <span
                            className={[
                              'w-[68px] text-center text-[9px] font-semibold leading-tight',
                              milestone.status === 'pending' ? 'text-white/35' : 'text-white/80',
                            ].join(' ')}
                          >
                            {milestone.label}
                          </span>

                        </div>

                        {index < featuredMilestones.length - 1 && (
                          <div
                            className={[
                              'mb-4 h-px w-6 sm:w-8',
                              milestone.status === 'complete' ? 'bg-white/70' : 'bg-white/15',
                            ].join(' ')}
                          />
                        )}

                      </div>
                    ))}

                  </div>

                </div>

                <button
                  type="button"
                  className="
                    mt-6
                    flex
                    items-center
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
                  Open project
                  <ArrowUpRight size={14} />
                </button>

              </div>

            </div>
          </div>

        </section>
      )}

      {/* ===================================================== */}
      {/* Project monitoring + inspection queue */}
      {/* ===================================================== */}

      <div className="mb-7 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">

        {/* Project monitoring */}

        <section aria-label="Project monitoring">

          <Card>

            <CardHeader
              title="Project monitoring"
              subtitle="Progress across your assigned builds"
            />

            <CardBody className="pt-2">

              <div className="divide-y divide-ink/[0.07]">

                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="
                      group
                      flex
                      flex-col
                      gap-4
                      py-4
                      first:pt-3
                      last:pb-3
                      sm:flex-row
                      sm:items-center
                    "
                  >

                    {/* Thumbnail */}

                    <div className="relative h-16 w-full shrink-0 overflow-hidden rounded-[13px] sm:h-14 sm:w-20">

                      <img
                        src={projectImages[index % projectImages.length]}
                        alt=""
                        className="
                          h-full
                          w-full
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-105
                        "
                      />

                      <div className="absolute inset-0 bg-black/10" />

                    </div>

                    {/* Identity */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <p className="truncate font-display text-[14px] font-semibold tracking-[-0.01em] text-ink">
                          {project.name}
                        </p>

                        <StagePill stage={project.stage} />

                      </div>

                      <p className="mt-1 flex items-center gap-1 text-[10px] text-ink/40">
                        <MapPin size={11} />
                        {project.location}
                      </p>

                    </div>

                    {/* Progress */}

                    <div className="w-full sm:w-[190px] sm:shrink-0">

                      <div className="mb-1.5 flex items-center justify-between">

                        <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/35">
                          Progress
                        </span>

                        <span className="text-[10px] font-semibold text-ink/60">
                          {project.progressPercent}%
                        </span>

                      </div>

                      <ProgressBar
                        percent={project.progressPercent}
                        tone="teal"
                      />

                    </div>

                    <button
                      type="button"
                      className="
                        flex
                        shrink-0
                        items-center
                        gap-1
                        text-[10px]
                        font-bold
                        text-[#B85C12]
                        transition
                        hover:gap-2
                      "
                    >
                      View
                      <ChevronRight size={13} />
                    </button>

                  </div>
                ))}

              </div>

            </CardBody>

          </Card>

        </section>

        {/* Inspection queue */}

        <section aria-label="Inspection queue">

          <Card className="h-full">

            <CardHeader
              title="Inspection queue"
              subtitle="Evidence waiting for your review"
            />

            <CardBody className="pt-2">

              <div className="divide-y divide-ink/[0.07]">

                {inspections.map((inspection) => (
                  <div
                    key={inspection.id}
                    className="group py-4 first:pt-3 last:pb-3"
                  >

                    <div className="flex gap-3">

                      <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-xl">

                        <img
                          src={inspection.image}
                          alt=""
                          className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-105
                          "
                        />

                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex items-start justify-between gap-2">

                          <p className="text-[11px] font-semibold leading-4 text-ink">
                            {inspection.milestone}
                          </p>

                          <span className="h-2 w-2 shrink-0 rounded-full bg-[#B85C12]" />

                        </div>

                        <p className="mt-1 text-[10px] text-ink/45">
                          {inspection.project}
                        </p>

                        <p className="mt-1.5 flex items-center gap-1 text-[9px] text-ink/35">
                          <CalendarClock size={10} />
                          {inspection.date}
                        </p>

                      </div>

                    </div>

                    <div className="mt-3 flex items-center justify-between">

                      <span className="rounded-full bg-[#F7EFE8] px-2.5 py-1 text-[9px] font-bold text-[#B85C12]">
                        {inspection.status}
                      </span>

                      <button
                        type="button"
                        className="flex items-center gap-1 text-[10px] font-bold text-ink/60"
                      >
                        Review
                        <ChevronRight size={12} />
                      </button>

                    </div>

                  </div>
                ))}

              </div>

              <button
                type="button"
                className="
                  mt-3
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-ink/[0.08]
                  px-4
                  py-3
                  text-[11px]
                  font-semibold
                  text-ink
                  transition
                  hover:border-ink/20
                "
              >
                <span className="flex items-center gap-2">
                  <ClipboardCheck size={14} />
                  Open inspection centre
                </span>

                <ChevronRight size={14} />
              </button>

            </CardBody>

          </Card>

        </section>

      </div>

      {/* ===================================================== */}
      {/* Risk + milestone summary */}
      {/* ===================================================== */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* Risk panel */}

        <section aria-label="Risk alerts">

          <div className="overflow-hidden rounded-[22px] border border-[#D98A5A]/20 bg-[#FFF9F4]">

            <div className="flex items-start gap-4 p-5">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7E6D8] text-[#B85C12]">
                <TriangleAlert size={18} />
              </div>

              <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between gap-3">

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#B85C12]">
                      Attention required
                    </p>

                    <h2 className="mt-1 font-display text-[17px] font-semibold text-ink">
                      1 active project risk
                    </h2>
                  </div>

                  <span className="rounded-full bg-[#F7E6D8] px-2.5 py-1 text-[9px] font-bold text-[#B85C12]">
                    Medium
                  </span>

                </div>

                <p className="mt-3 text-[11px] leading-5 text-ink/50">
                  Material delivery is behind schedule on one assigned project.
                  Review the latest update before the next milestone.
                </p>

                <button
                  type="button"
                  className="
                    mt-4
                    flex
                    items-center
                    gap-1.5
                    text-[11px]
                    font-bold
                    text-[#B85C12]
                  "
                >
                  Review risk
                  <ArrowUpRight size={13} />
                </button>

              </div>

            </div>

          </div>

        </section>

        {/* Milestone summary */}

        <section aria-label="Milestone summary">

          <Card>

            <CardBody className="p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink/40">
                    Milestone control
                  </p>

                  <h2 className="mt-1 font-display text-[17px] font-semibold text-ink">
                    Verification status
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
                  <CheckCircle2 size={17} />
                </div>

              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">

                <div className="rounded-xl bg-[#F4F7F4] p-3">

                  <p className="text-[9px] font-bold uppercase tracking-[0.07em] text-ink/35">
                    Approved
                  </p>

                  <p className="mt-1 font-display text-xl font-semibold text-ink">
                    08
                  </p>

                </div>

                <div className="rounded-xl bg-[#FFF8EF] p-3">

                  <p className="text-[9px] font-bold uppercase tracking-[0.07em] text-ink/35">
                    Review
                  </p>

                  <p className="mt-1 font-display text-xl font-semibold text-[#B85C12]">
                    03
                  </p>

                </div>

                <div className="rounded-xl bg-[#F7F4F2] p-3">

                  <p className="text-[9px] font-bold uppercase tracking-[0.07em] text-ink/35">
                    Blocked
                  </p>

                  <p className="mt-1 font-display text-xl font-semibold text-ink">
                    00
                  </p>

                </div>

              </div>

              <button
                type="button"
                className="
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-ink/[0.08]
                  px-4
                  py-3
                  text-[11px]
                  font-semibold
                  text-ink
                  transition
                  hover:border-ink/20
                "
              >
                <span className="flex items-center gap-2">
                  <ListChecks size={14} />
                  View all milestones
                </span>

                <ChevronRight size={14} />
              </button>

            </CardBody>

          </Card>

        </section>

      </div>

    </DashboardLayout>
  )
}