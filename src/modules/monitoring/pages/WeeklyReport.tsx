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
    className: 'bg-emerald-500/10 text-emerald-600',
  },
  'in-progress': {
    label: 'In progress',
    className: 'bg-amber-500/10 text-amber-700',
  },
  planned: {
    label: 'Planned',
    className: 'bg-ink/5 text-ink/50',
  },
}

const milestoneStatusConfig = {
  ahead: {
    label: 'Ahead',
    className: 'text-emerald-600',
  },
  'on-track': {
    label: 'On track',
    className: 'text-teal',
  },
  delayed: {
    label: 'Delayed',
    className: 'text-red-600',
  },
}

/**
 * Weekly Report — Monitoring module
 * BRD reference: Sec. 20.3 / 43
 *
 * Weekly overview of project performance, progress, activity,
 * budget health and emerging risks.
 */
export function WeeklyReport() {
  const reportPeriod = '18 – 24 August 2026'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4 text-teal" />

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
              Monitoring · Weekly Intelligence
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Weekly Report
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/55">
            A consolidated view of project progress, performance, risks and
            activities for the selected reporting period.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full bg-ink/5 px-3 py-1.5 font-mono text-[10px] text-ink/45">
            BRD ref: Sec. 20.3 / 43
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-ink/10 bg-paper px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-ink/5"
          >
            <CalendarDays className="h-3.5 w-3.5" />
            {reportPeriod}
          </button>
        </div>
      </div>

      {/* Report Period Navigation */}
      <Card className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/40">
            Reporting period
          </p>

          <p className="mt-1 text-sm font-medium text-ink">
            {reportPeriod}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink/10 text-ink/55 transition-colors hover:bg-ink/5"
            aria-label="Previous week"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg bg-ink px-4 text-xs font-medium text-paper transition-opacity hover:opacity-90"
          >
            <CalendarDays className="h-3.5 w-3.5" />
            Current week
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink/10 text-ink/55 transition-colors hover:bg-ink/5"
            aria-label="Next week"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </Card>

      {/* Summary Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                Overall progress
              </p>

              <p className="mt-2 text-3xl font-semibold text-ink">64%</p>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink/8">
                <div className="h-full w-[64%] rounded-full bg-teal" />
              </div>

              <p className="mt-2 text-xs text-ink/45">
                +6.2% this week
              </p>
            </div>

            <div className="rounded-xl bg-teal/10 p-2.5">
              <TrendingUp className="h-5 w-5 text-teal" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                Budget utilisation
              </p>

              <p className="mt-2 text-3xl font-semibold text-ink">58%</p>

              <p className="mt-2 text-xs text-ink/45">
                Within approved budget
              </p>
            </div>

            <div className="rounded-xl bg-amber/10 p-2.5">
              <Wallet className="h-5 w-5 text-amber" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                Completed activities
              </p>

              <p className="mt-2 text-3xl font-semibold text-ink">12</p>

              <p className="mt-2 text-xs text-ink/45">
                3 more than last week
              </p>
            </div>

            <div className="rounded-xl bg-emerald-500/10 p-2.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                Active risks
              </p>

              <p className="mt-2 text-3xl font-semibold text-ink">4</p>

              <p className="mt-2 text-xs text-red-600">
                1 requires immediate action
              </p>
            </div>

            <div className="rounded-xl bg-red-500/10 p-2.5">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        {/* Milestone Performance */}
        <Card className="p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-teal" />

                <h2 className="font-semibold text-ink">
                  Milestone performance
                </h2>
              </div>

              <p className="mt-1 text-sm text-ink/45">
                Progress against the approved project plan.
              </p>
            </div>

            <button
              type="button"
              className="flex items-center gap-1 text-xs font-medium text-ink/55 transition-colors hover:text-ink"
            >
              View progress
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {milestones.map((milestone) => {
              const status = milestoneStatusConfig[milestone.status]

              return (
                <div key={milestone.id}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {milestone.name}
                      </p>

                      <p className={`mt-1 text-xs ${status.className}`}>
                        {status.label}
                      </p>
                    </div>

                    <span className="font-mono text-xs text-ink/55">
                      {milestone.progress}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/7">
                    <div
                      className={`h-full rounded-full ${
                        milestone.status === 'delayed'
                          ? 'bg-red-500'
                          : milestone.status === 'ahead'
                            ? 'bg-emerald-500'
                            : 'bg-teal'
                      }`}
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Weekly Health */}
        <Card className="p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <HardHat className="h-4 w-4 text-amber" />

            <h2 className="font-semibold text-ink">Weekly health</h2>
          </div>

          <p className="mt-1 text-sm text-ink/45">
            Overall project health assessment.
          </p>

          <div className="mt-6 space-y-5">
            <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">
                  Budget health
                </span>

                <span className="font-mono text-[10px] uppercase text-emerald-600">
                  Healthy
                </span>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-ink/50">
                Current spending remains within the approved project budget.
              </p>
            </div>

            <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">
                  Schedule health
                </span>

                <span className="font-mono text-[10px] uppercase text-amber-700">
                  Watch
                </span>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-ink/50">
                One structural milestone requires schedule recovery attention.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">
                  Quality health
                </span>

                <span className="font-mono text-[10px] uppercase text-emerald-600">
                  Stable
                </span>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-ink/50">
                Inspection evidence indicates acceptable quality performance.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-ink/8 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-teal" />

              <h2 className="font-semibold text-ink">Weekly activity</h2>
            </div>

            <p className="mt-1 text-sm text-ink/45">
              Key activities recorded during this reporting period.
            </p>
          </div>

          <span className="font-mono text-[10px] text-ink/35">
            {activities.length} KEY ACTIVITIES
          </span>
        </div>

        <div className="divide-y divide-ink/7">
          {activities.map((activity) => {
            const status = activityStatusConfig[activity.status]

            return (
              <div
                key={activity.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                    {activity.status === 'complete' ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : activity.status === 'in-progress' ? (
                      <Clock3 className="h-5 w-5 text-amber" />
                    ) : (
                      <CalendarDays className="h-5 w-5 text-ink/50" />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-medium text-ink">
                        {activity.title}
                      </h3>

                      <span
                        className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>

                    <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-ink/50">
                      {activity.description}
                    </p>

                    <p className="mt-2 font-mono text-[10px] text-ink/35">
                      {activity.project}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="flex shrink-0 items-center gap-1 text-xs text-ink/45 transition-colors hover:text-ink"
                >
                  Details
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Next Week Priorities */}
      <Card className="border border-teal/15 bg-teal/[0.025] p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10">
            <TrendingUp className="h-5 w-5 text-teal" />
          </div>

          <div className="flex-1">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-teal">
              Next reporting period
            </p>

            <h2 className="mt-1 text-lg font-semibold text-ink">
              Priorities for next week
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-paper/70 p-3">
                <p className="text-sm font-medium text-ink">
                  Recover structural timeline
                </p>
                <p className="mt-1 text-xs text-ink/45">
                  Address the identified schedule variance.
                </p>
              </div>

              <div className="rounded-lg bg-paper/70 p-3">
                <p className="text-sm font-medium text-ink">
                  Verify material deliveries
                </p>
                <p className="mt-1 text-xs text-ink/45">
                  Confirm procurement readiness.
                </p>
              </div>

              <div className="rounded-lg bg-paper/70 p-3">
                <p className="text-sm font-medium text-ink">
                  Complete quality inspection
                </p>
                <p className="mt-1 text-xs text-ink/45">
                  Resolve outstanding evidence requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}