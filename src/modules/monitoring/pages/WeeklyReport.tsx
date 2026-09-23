import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileText,
  HardHat,
  TrendingUp,
  Wallet,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

interface WeeklyActivity {
  id: string
  title: string
  project: string
  description: string
  status: 'complete' | 'in-progress' | 'planned'
}

interface MilestoneProgress {
  id: string
  name: string
  progress: number
  status: 'ahead' | 'on-track' | 'delayed'
}

const activities: WeeklyActivity[] = [
  {
    id: 'activity-1',
    title: 'Foundation reinforcement completed',
    project: 'Skyline Residences',
    description:
      'Reinforcement work for the primary foundation section was completed and submitted for inspection.',
    status: 'complete',
  },
  {
    id: 'activity-2',
    title: 'Concrete works progressing',
    project: 'Skyline Residences',
    description:
      'Concrete casting continues across the active structural work packages.',
    status: 'in-progress',
  },
  {
    id: 'activity-3',
    title: 'Material delivery verification',
    project: 'Metro Commercial Hub',
    description:
      'Incoming structural materials are scheduled for verification before deployment.',
    status: 'planned',
  },
]

const milestones: MilestoneProgress[] = [
  {
    id: 'milestone-1',
    name: 'Site preparation',
    progress: 100,
    status: 'ahead',
  },
  {
    id: 'milestone-2',
    name: 'Foundation works',
    progress: 78,
    status: 'on-track',
  },
  {
    id: 'milestone-3',
    name: 'Structural framework',
    progress: 42,
    status: 'delayed',
  },
  {
    id: 'milestone-4',
    name: 'External works',
    progress: 15,
    status: 'on-track',
  },
]

const activityStatusConfig = {
  complete: {
    label: 'Completed',
    className: 'bg-[#12613E]/[0.07] text-[#12613E]',
  },
  'in-progress': {
    label: 'In progress',
    className: 'bg-[#B85C12]/[0.07] text-[#B85C12]',
  },
  planned: {
    label: 'Planned',
    className: 'bg-ink/[0.05] text-ink/45',
  },
}

const milestoneStatusConfig = {
  ahead: {
    label: 'Ahead',
    className: 'text-[#12613E]',
    barClassName: 'bg-[#12613E]',
  },
  'on-track': {
    label: 'On track',
    className: 'text-[#12613E]',
    barClassName: 'bg-[#12613E]/75',
  },
  delayed: {
    label: 'Delayed',
    className: 'text-red-600',
    barClassName: 'bg-red-500',
  },
}

function MetricCard({
  label,
  value,
  description,
  icon: Icon,
  tone = 'neutral',
  progress,
}: {
  label: string
  value: string
  description: string
  icon: typeof TrendingUp
  tone?: 'neutral' | 'green' | 'bronze' | 'critical'
  progress?: number
}) {
  const styles = {
    neutral: {
      icon: 'bg-ink/[0.045] text-ink/55',
      value: 'text-ink',
      bar: 'bg-ink/30',
    },
    green: {
      icon: 'bg-[#12613E]/[0.07] text-[#12613E]',
      value: 'text-[#12613E]',
      bar: 'bg-[#12613E]',
    },
    bronze: {
      icon: 'bg-[#B85C12]/[0.07] text-[#B85C12]',
      value: 'text-[#B85C12]',
      bar: 'bg-[#B85C12]',
    },
    critical: {
      icon: 'bg-red-500/[0.07] text-red-600',
      value: 'text-red-600',
      bar: 'bg-red-500',
    },
  }

  const style = styles[tone]

  return (
    <Card className="group overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/35">
              {label}
            </p>

            <p
              className={`mt-3 font-display text-[32px] font-semibold leading-none tracking-[-0.045em] ${style.value}`}
            >
              {value}
            </p>

            {progress !== undefined ? (
              <div className="mt-4">
                <div className="h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                  <div
                    className={`h-full rounded-full ${style.bar}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : null}

            <p className="mt-2.5 text-[11px] text-ink/40">
              {description}
            </p>
          </div>

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] ${style.icon}`}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
          </div>
        </div>
      </div>

      <div className="h-px bg-ink/[0.04]">
        <div className="h-px w-10 bg-ink/[0.08] transition-all duration-500 group-hover:w-16" />
      </div>
    </Card>
  )
}

function HealthCard({
  label,
  status,
  description,
  tone,
}: {
  label: string
  status: string
  description: string
  tone: 'healthy' | 'watch'
}) {
  const isHealthy = tone === 'healthy'

  return (
    <div
      className={`rounded-[15px] border p-4 ${
        isHealthy
          ? 'border-[#12613E]/10 bg-[#12613E]/[0.025]'
          : 'border-[#B85C12]/10 bg-[#B85C12]/[0.025]'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-[12px] font-semibold text-ink">{label}</span>

        <span
          className={`font-mono text-[8px] font-semibold uppercase tracking-[0.14em] ${
            isHealthy ? 'text-[#12613E]' : 'text-[#B85C12]'
          }`}
        >
          {status}
        </span>
      </div>

      <p className="mt-2 text-[11px] leading-5 text-ink/45">
        {description}
      </p>
    </div>
  )
}

function MilestoneRow({ milestone }: { milestone: MilestoneProgress }) {
  const status = milestoneStatusConfig[milestone.status]

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-[12px] font-semibold text-ink">
            {milestone.name}
          </p>

          <p className={`mt-1 text-[10px] font-medium ${status.className}`}>
            {status.label}
          </p>
        </div>

        <span className="shrink-0 font-mono text-[10px] font-semibold text-ink/45">
          {milestone.progress}%
        </span>
      </div>

      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink/[0.055]">
        <div
          className={`h-full rounded-full ${status.barClassName}`}
          style={{ width: `${milestone.progress}%` }}
        />
      </div>
    </div>
  )
}

function ActivityIcon({
  status,
}: {
  status: WeeklyActivity['status']
}) {
  if (status === 'complete') {
    return (
      <CheckCircle2
        className="h-[18px] w-[18px] text-[#12613E]"
        strokeWidth={1.7}
      />
    )
  }

  if (status === 'in-progress') {
    return (
      <Clock3
        className="h-[18px] w-[18px] text-[#B85C12]"
        strokeWidth={1.7}
      />
    )
  }

  return (
    <CalendarDays
      className="h-[18px] w-[18px] text-ink/45"
      strokeWidth={1.7}
    />
  )
}

/**
 * Weekly Report — Monitoring module
 *
 * BRD reference:
 * - Sec. 20.3
 * - Sec. 43
 *
 * Weekly overview of project performance, progress, activity,
 * budget health and emerging risks.
 */
export function WeeklyReport() {
  const reportPeriod = '18 – 24 August 2026'

  return (
    <div className="space-y-7 pb-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.06] bg-white px-5 py-7 shadow-[0_18px_50px_rgba(20,40,30,0.07)] sm:px-7 sm:py-8 lg:px-9 lg:py-9">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#12613E]/[0.055] blur-3xl" />

        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-[#B85C12]/[0.035] blur-3xl" />

        <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#12613E]/10 bg-[#12613E]/[0.05] px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#12613E]">
                <FileText className="h-3 w-3" />
                Monitoring / Weekly Intelligence
              </span>

              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                BRD Sec. 20.3 / 43
              </span>
            </div>

            <h1 className="font-display text-[34px] font-semibold leading-[1.02] tracking-[-0.055em] text-ink sm:text-[42px] lg:text-[48px]">
              Weekly project intelligence.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/50 sm:text-[15px]">
              A consolidated management view of delivery progress, milestone
              performance, project health, activities, and emerging exposure
              for the reporting period.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-ink/35">
              <span>18 – 24 August 2026</span>

              <span className="hidden h-1 w-1 rounded-full bg-ink/20 sm:block" />

              <span>Portfolio monitoring</span>

              <span className="hidden h-1 w-1 rounded-full bg-ink/20 sm:block" />

              <span>Weekly cycle</span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-[12px] border border-ink/[0.06] bg-[#F8F9F7] px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-[#12613E]" />

            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/40">
              Reporting cycle active
            </span>
          </div>
        </div>
      </section>

      {/* Period navigation */}
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#12613E]">
              Reporting period
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h2 className="font-display text-xl font-semibold tracking-[-0.035em] text-ink">
                {reportPeriod}
              </h2>

              <span className="rounded-full bg-[#12613E]/[0.07] px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-[#12613E]">
                Current report
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-ink/[0.07] text-ink/45 transition hover:bg-ink/[0.04] hover:text-ink"
              aria-label="Previous week"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
            </button>

            <button
              type="button"
              className="flex h-9 items-center gap-2 rounded-[10px] bg-[#18271F] px-4 text-[10px] font-semibold text-white transition hover:bg-[#12613E]"
            >
              <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.8} />
              Current week
            </button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-ink/[0.07] text-ink/45 transition hover:bg-ink/[0.04] hover:text-ink"
              aria-label="Next week"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </Card>

      {/* Executive metrics */}
      <section>
        <div className="mb-4">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#12613E]">
            Executive indicators
          </p>

          <h2 className="mt-1.5 font-display text-xl font-semibold tracking-[-0.035em] text-ink">
            Weekly position
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Overall progress"
            value="64%"
            description="+6.2% delivered this week"
            icon={TrendingUp}
            tone="green"
            progress={64}
          />

          <MetricCard
            label="Budget utilisation"
            value="58%"
            description="Within approved budget"
            icon={Wallet}
            tone="bronze"
          />

          <MetricCard
            label="Completed activities"
            value="12"
            description="3 more than last week"
            icon={CheckCircle2}
            tone="green"
          />

          <MetricCard
            label="Active risks"
            value="4"
            description="1 requires immediate action"
            icon={AlertTriangle}
            tone="critical"
          />
        </div>
      </section>

      {/* Main intelligence */}
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        {/* Milestones */}
        <Card className="overflow-hidden">
          <div className="border-b border-ink/[0.06] px-5 py-5 sm:px-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#12613E]/[0.07] text-[#12613E]">
                    <ClipboardCheck
                      className="h-4 w-4"
                      strokeWidth={1.7}
                    />
                  </div>

                  <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                    Milestone performance
                  </h2>
                </div>

                <p className="mt-2 text-[11px] leading-5 text-ink/40">
                  Progress against the approved project plan.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#12613E] transition hover:text-[#0D4C31]"
              >
                View progress
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
              </button>
            </div>
          </div>

          <div className="space-y-6 p-5 sm:p-6">
            {milestones.map((milestone) => (
              <MilestoneRow key={milestone.id} milestone={milestone} />
            ))}
          </div>

          <div className="border-t border-ink/[0.06] bg-[#F8F9F7]/70 px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                4 milestones monitored
              </span>

              <span className="text-[10px] text-ink/40">
                1 delayed · 1 ahead · 2 on track
              </span>
            </div>
          </div>
        </Card>

        {/* Health */}
        <Card className="overflow-hidden">
          <div className="border-b border-ink/[0.06] px-5 py-5 sm:px-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#B85C12]/[0.07] text-[#B85C12]">
                <HardHat className="h-4 w-4" strokeWidth={1.7} />
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                  Weekly health
                </h2>

                <p className="mt-0.5 text-[10px] text-ink/40">
                  Current operating position
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-5 sm:p-6">
            <HealthCard
              label="Budget health"
              status="Healthy"
              tone="healthy"
              description="Current spending remains within the approved project budget."
            />

            <HealthCard
              label="Schedule health"
              status="Watch"
              tone="watch"
              description="One structural milestone requires schedule recovery attention."
            />

            <HealthCard
              label="Quality health"
              status="Stable"
              tone="healthy"
              description="Inspection evidence indicates acceptable quality performance."
            />
          </div>

          <div className="border-t border-ink/[0.06] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                Overall position · Stable
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Weekly activity */}
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-ink/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#12613E]/[0.07] text-[#12613E]">
                <Clock3 className="h-4 w-4" strokeWidth={1.7} />
              </div>

              <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                Weekly activity
              </h2>
            </div>

            <p className="mt-2 text-[11px] text-ink/40">
              Key activities recorded during this reporting period.
            </p>
          </div>

          <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-ink/30">
            {activities.length} key activities
          </span>
        </div>

        <div className="divide-y divide-ink/[0.06]">
          {activities.map((activity) => {
            const status = activityStatusConfig[activity.status]

            return (
              <div
                key={activity.id}
                className="group flex flex-col gap-4 px-5 py-5 transition hover:bg-ink/[0.012] sm:px-6 lg:flex-row lg:items-start lg:justify-between"
              >
                <div className="flex min-w-0 gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-ink/[0.06] bg-[#F8F9F7]">
                    <ActivityIcon status={activity.status} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-[12px] font-semibold tracking-[-0.005em] text-ink">
                        {activity.title}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>

                    <p className="mt-2 max-w-3xl text-[11px] leading-5 text-ink/45">
                      {activity.description}
                    </p>

                    <div className="mt-2.5 flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-[#12613E]" />

                      <span className="font-mono text-[9px] font-medium text-ink/35">
                        {activity.project}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex shrink-0 items-center gap-1.5 self-start text-[10px] font-semibold text-ink/35 transition group-hover:text-[#12613E]"
                >
                  Details
                  <ChevronRight
                    className="h-3.5 w-3.5"
                    strokeWidth={1.8}
                  />
                </button>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Next week priorities */}
      <Card className="overflow-hidden border-[#12613E]/10 bg-[#12613E]/[0.018]">
        <div className="p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#12613E]/[0.08] text-[#12613E]">
              <TrendingUp className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-[#12613E]">
                Next reporting period
              </p>

              <h2 className="mt-1.5 font-display text-xl font-semibold tracking-[-0.035em] text-ink">
                Priorities for next week
              </h2>

              <p className="mt-2 max-w-2xl text-[11px] leading-5 text-ink/40">
                Focus areas carried forward from the current delivery and
                health position.
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <PriorityCard
                  number="01"
                  title="Recover structural timeline"
                  description="Address the identified schedule variance."
                />

                <PriorityCard
                  number="02"
                  title="Verify material deliveries"
                  description="Confirm procurement readiness before deployment."
                />

                <PriorityCard
                  number="03"
                  title="Complete quality inspection"
                  description="Resolve outstanding evidence requirements."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#12613E]/[0.08] px-5 py-3.5 sm:px-6">
          <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-ink/25">
            Build OS · Weekly management cycle
          </span>
        </div>
      </Card>
    </div>
  )
}

function PriorityCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="rounded-[14px] border border-ink/[0.05] bg-white/75 p-4 transition hover:border-[#12613E]/10 hover:bg-white">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[8px] font-semibold tracking-[0.14em] text-[#12613E]">
          {number}
        </span>

        <ArrowUpRight
          className="h-3.5 w-3.5 text-ink/20"
          strokeWidth={1.8}
        />
      </div>

      <p className="mt-4 text-[11px] font-semibold text-ink">{title}</p>

      <p className="mt-1.5 text-[10px] leading-5 text-ink/40">
        {description}
      </p>
    </div>
  )
}