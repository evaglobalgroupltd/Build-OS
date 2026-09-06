import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  MoreHorizontal,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'

const monthlyStats = [
  {
    label: 'Overall Progress',
    value: '68%',
    change: '+8.4%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    label: 'Milestones',
    value: '17 / 25',
    change: '+3 this month',
    trend: 'up',
    icon: CheckCircle2,
  },
  {
    label: 'Budget Used',
    value: '61.8%',
    change: 'Within plan',
    trend: 'up',
    icon: Wallet,
  },
  {
    label: 'Schedule',
    value: '4 days',
    change: 'Ahead',
    trend: 'up',
    icon: Clock3,
  },
]

const milestones = [
  {
    name: 'Foundation & Ground Works',
    status: 'Completed',
    progress: 100,
    date: 'Aug 04',
  },
  {
    name: 'Structural Frame — Level 1',
    status: 'Completed',
    progress: 100,
    date: 'Aug 11',
  },
  {
    name: 'Structural Frame — Level 2',
    status: 'In Progress',
    progress: 72,
    date: 'Aug 29',
  },
  {
    name: 'Electrical First Fix',
    status: 'In Progress',
    progress: 41,
    date: 'Sep 06',
  },
]

const activity = [
  {
    title: 'Monthly site inspection completed',
    description: 'Inspection passed with 2 minor observations.',
    time: 'Today',
    type: 'inspection',
  },
  {
    title: 'Milestone evidence submitted',
    description: 'Level 2 structural frame progress evidence uploaded.',
    time: 'Yesterday',
    type: 'evidence',
  },
  {
    title: 'Material delivery verified',
    description: 'Rebar and cement delivery matched approved quantities.',
    time: 'Aug 24',
    type: 'procurement',
  },
]

export function MonthlyReport() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
              Monitoring / Reports
            </span>
            <span className="h-1 w-1 rounded-full bg-ink/20" />
            <span className="font-mono text-[10px] text-ink/40">
              AUG 2026
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Monthly Report
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-ink/55">
            A consolidated view of project progress, schedule, financial
            performance, milestones, and site activity for August 2026.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-ink/10 bg-white px-3.5 text-xs font-medium text-ink transition hover:bg-ink/[0.03]"
          >
            <CalendarDays size={15} className="text-ink/50" />
            August 2026
          </button>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-ink px-4 text-xs font-semibold text-white transition hover:bg-ink/90"
          >
            <Download size={15} />
            Export Report
          </button>
        </div>
      </div>

      {/* Report status */}
      <Card>
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold text-ink">
                August report is ready
              </p>
              <p className="mt-0.5 text-xs text-ink/50">
                Data last synchronized today at 09:42 WAT.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
              Verified data
            </span>

            <button
              type="button"
              className="rounded-lg p-2 text-ink/40 transition hover:bg-ink/5 hover:text-ink"
              aria-label="More report options"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>
      </Card>

      {/* KPI grid */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {monthlyStats.map((stat) => {
          const Icon = stat.icon

          return (
            <Card key={stat.label}>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-ink/50">
                    {stat.label}
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/[0.04] text-ink/50">
                    <Icon size={15} />
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between gap-3">
                  <span className="text-2xl font-semibold tracking-tight text-ink">
                    {stat.value}
                  </span>

                  <span className="mb-0.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 font-mono text-[9px] font-semibold text-emerald-700">
                    <ArrowUpRight size={11} />
                    {stat.change}
                  </span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Progress + financial overview */}
      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        <Card>
          <div className="border-b border-ink/10 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">
                  Project progress
                </p>
                <p className="mt-0.5 text-xs text-ink/45">
                  Planned vs actual progress this month
                </p>
              </div>

              <span className="font-mono text-[10px] text-ink/40">
                AUG 01 — AUG 31
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-4xl font-semibold tracking-tight text-ink">
                  68%
                </span>
                <p className="mt-1 text-xs text-ink/45">
                  Overall project completion
                </p>
              </div>

              <div className="text-right">
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight size={14} />
                  8.4%
                </div>
                <p className="mt-1 text-[10px] text-ink/40">
                  Month-on-month
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-[10px] font-medium">
                  <span className="text-ink/50">Actual</span>
                  <span className="font-mono text-ink/60">68%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-ink/[0.06]">
                  <div
                    className="h-full rounded-full bg-ink"
                    style={{ width: '68%' }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-[10px] font-medium">
                  <span className="text-ink/50">Planned</span>
                  <span className="font-mono text-ink/60">64%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-ink/[0.06]">
                  <div
                    className="h-full rounded-full bg-ink/20"
                    style={{ width: '64%' }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-ink/10 pt-5">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-wider text-ink/35">
                  Completed
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">17</p>
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-wider text-ink/35">
                  Active
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">6</p>
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-wider text-ink/35">
                  Remaining
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">8</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="border-b border-ink/10 px-5 py-4">
            <p className="text-sm font-semibold text-ink">
              Financial position
            </p>
            <p className="mt-0.5 text-xs text-ink/45">
              Current month expenditure
            </p>
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-wider text-ink/35">
                  Total budget
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
                  ₦48.5M
                </p>
              </div>

              <div className="rounded-xl bg-ink/[0.04] p-2.5 text-ink/50">
                <Wallet size={17} />
              </div>
            </div>

            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-ink/50">Budget consumed</span>
                <span className="font-mono text-xs font-semibold text-ink">
                  61.8%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-ink/[0.06]">
                <div
                  className="h-full rounded-full bg-ink"
                  style={{ width: '61.8%' }}
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between border-b border-ink/[0.06] pb-3">
                <span className="text-xs text-ink/50">Spent to date</span>
                <span className="text-sm font-semibold text-ink">₦30.0M</span>
              </div>

              <div className="flex items-center justify-between border-b border-ink/[0.06] pb-3">
                <span className="text-xs text-ink/50">Committed</span>
                <span className="text-sm font-semibold text-ink">₦7.2M</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-ink/50">Available</span>
                <span className="text-sm font-semibold text-emerald-600">
                  ₦11.3M
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Milestones */}
      <Card>
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-ink">
              Milestone performance
            </p>
            <p className="mt-0.5 text-xs text-ink/45">
              Key delivery points during the reporting period
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-semibold text-ink/55 transition hover:text-ink"
          >
            View all
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="divide-y divide-ink/[0.07]">
          {milestones.map((milestone) => (
            <div
              key={milestone.name}
              className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    milestone.status === 'Completed'
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-amber-500/10 text-amber-600'
                  }`}
                >
                  {milestone.status === 'Completed' ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    <Clock3 size={15} />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-ink">
                    {milestone.name}
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[10px] text-ink/40">
                      Due {milestone.date}
                    </span>
                    <span className="h-0.5 w-0.5 rounded-full bg-ink/20" />
                    <span
                      className={`text-[10px] font-medium ${
                        milestone.status === 'Completed'
                          ? 'text-emerald-600'
                          : 'text-amber-600'
                      }`}
                    >
                      {milestone.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:w-48">
                <div className="flex-1">
                  <div className="mb-1.5 flex justify-between">
                    <span className="text-[9px] text-ink/35">
                      Completion
                    </span>
                    <span className="font-mono text-[9px] text-ink/50">
                      {milestone.progress}%
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                    <div
                      className={`h-full rounded-full ${
                        milestone.status === 'Completed'
                          ? 'bg-emerald-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Activity + report summary */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Card>
          <div className="border-b border-ink/10 px-5 py-4">
            <p className="text-sm font-semibold text-ink">
              Site activity
            </p>
            <p className="mt-0.5 text-xs text-ink/45">
              Recent verified project events
            </p>
          </div>

          <div className="divide-y divide-ink/[0.07]">
            {activity.map((item) => (
              <div key={item.title} className="flex gap-3 px-5 py-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/[0.04] text-ink/50">
                  {item.type === 'inspection' && <CheckCircle2 size={14} />}
                  {item.type === 'evidence' && <FileText size={14} />}
                  {item.type === 'procurement' && <Wallet size={14} />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-semibold text-ink">
                      {item.title}
                    </p>
                    <span className="shrink-0 font-mono text-[9px] text-ink/35">
                      {item.time}
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] leading-4 text-ink/45">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="border-b border-ink/10 px-5 py-4">
            <p className="text-sm font-semibold text-ink">
              Management summary
            </p>
            <p className="mt-0.5 text-xs text-ink/45">
              Key observations from this reporting period
            </p>
          </div>

          <div className="p-5">
            <div className="space-y-4">
              <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp
                    size={16}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />
                  <div>
                    <p className="text-xs font-semibold text-ink">
                      Project is ahead of schedule
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-ink/50">
                      Overall delivery is currently tracking 4 days ahead of
                      the approved baseline.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <Clock3
                    size={16}
                    className="mt-0.5 shrink-0 text-amber-600"
                  />
                  <div>
                    <p className="text-xs font-semibold text-ink">
                      Two activities require attention
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-ink/50">
                      Electrical first fix and material scheduling remain the
                      main areas requiring monitoring.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-ink/10 bg-ink/[0.02] p-4">
                <div className="flex items-start gap-3">
                  <FileText
                    size={16}
                    className="mt-0.5 shrink-0 text-ink/50"
                  />
                  <div>
                    <p className="text-xs font-semibold text-ink">
                      Evidence coverage remains strong
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-ink/50">
                      94% of reported milestone activity for the month has
                      supporting evidence attached.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-ink/10 bg-white py-2.5 text-xs font-semibold text-ink transition hover:bg-ink/[0.03]"
            >
              <FileText size={14} />
              Open Full Report
              <ChevronRight size={14} className="text-ink/40" />
            </button>
          </div>
        </Card>
      </div>

      {/* Footer metadata */}
      <div className="flex flex-col gap-2 border-t border-ink/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/30">
          Build OS / Monitoring / Monthly Report
        </span>

        <span className="font-mono text-[9px] text-ink/30">
          BRD REF: SEC. 20.3 / 43
        </span>
      </div>
    </div>
  )
}