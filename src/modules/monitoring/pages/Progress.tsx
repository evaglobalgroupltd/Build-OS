import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flag,
  TrendingUp,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'

const milestones = [
  {
    name: 'Site preparation',
    progress: 100,
    status: 'Complete',
    due: '12 Jun',
  },
  {
    name: 'Foundation works',
    progress: 100,
    status: 'Complete',
    due: '04 Jul',
  },
  {
    name: 'Structural works',
    progress: 78,
    status: 'In progress',
    due: '15 Sep',
  },
  {
    name: 'MEP installation',
    progress: 42,
    status: 'In progress',
    due: '28 Sep',
  },
  {
    name: 'Finishing works',
    progress: 12,
    status: 'Upcoming',
    due: '18 Oct',
  },
]

export function Progress() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
          <TrendingUp className="h-3.5 w-3.5" />
          Monitoring / Progress
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Project Progress
        </h1>

        <p className="mt-1 text-sm text-ink/55">
          Track actual progress against the approved project timeline.
        </p>
      </div>

      <Card>
        <div className="grid gap-6 p-5 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[9px] font-semibold text-emerald-600">
                ON TRACK
              </span>

              <span className="font-mono text-[9px] text-ink/35">
                PROJECT #BOS-0248
              </span>
            </div>

            <h2 className="mt-3 text-lg font-semibold text-ink">
              Gwarinpa Residential Estate
            </h2>

            <p className="mt-1 text-xs text-ink/45">
              Current phase: Structural works
            </p>

            <div className="mt-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-ink/40">
                    Actual progress
                  </p>
                  <p className="mt-1 text-4xl font-semibold text-ink">68%</p>
                </div>

                <div className="text-right">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-ink/40">
                    Planned
                  </p>
                  <p className="mt-1 text-lg font-semibold text-ink/60">65%</p>
                </div>
              </div>

              <div className="relative mt-4 h-3 overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: '68%' }}
                />
              </div>

              <div className="mt-2 flex justify-between font-mono text-[9px] text-ink/35">
                <span>START</span>
                <span>+3% AHEAD OF PLAN</span>
                <span>COMPLETION</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center rounded-2xl bg-emerald-500/[0.05] p-6 lg:min-w-[190px]">
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500" />
              <p className="mt-3 text-sm font-semibold text-ink">
                Healthy progress
              </p>
              <p className="mt-1 text-xs text-ink/45">
                No critical schedule variance
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <div className="p-5">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink/40">
              Schedule variance
            </p>
            <p className="mt-2 flex items-center gap-1 text-2xl font-semibold text-emerald-600">
              <ArrowUpRight className="h-5 w-5" />
              +3%
            </p>
            <p className="mt-1 text-xs text-ink/45">Ahead of baseline</p>
          </div>
        </Card>

        <Card>
          <div className="p-5">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink/40">
              Completed milestones
            </p>
            <p className="mt-2 text-2xl font-semibold text-ink">8 / 14</p>
            <p className="mt-1 text-xs text-ink/45">57% milestone completion</p>
          </div>
        </Card>

        <Card>
          <div className="p-5">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink/40">
              Estimated completion
            </p>
            <p className="mt-2 flex items-center gap-1 text-2xl font-semibold text-ink">
              <CalendarDays className="h-5 w-5 text-blue-500" />
              18 Oct
            </p>
            <p className="mt-1 text-xs text-ink/45">2026</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="border-b border-ink/10 px-5 py-4">
          <h3 className="font-semibold text-ink">Milestone timeline</h3>
          <p className="mt-0.5 text-xs text-ink/45">
            Current completion against each major project phase.
          </p>
        </div>

        <div className="p-5">
          <div className="relative space-y-7">
            {milestones.map((milestone, index) => {
              const complete = milestone.progress === 100
              const active =
                milestone.status === 'In progress'

              return (
                <div key={milestone.name} className="relative flex gap-4">
                  {index < milestones.length - 1 && (
                    <div className="absolute left-[13px] top-7 h-[calc(100%+8px)] w-px bg-ink/10" />
                  )}

                  <div
                    className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      complete
                        ? 'bg-emerald-500 text-white'
                        : active
                          ? 'bg-blue-500 text-white'
                          : 'bg-ink/10 text-ink/40'
                    }`}
                  >
                    {complete ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : active ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <Flag className="h-3.5 w-3.5" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row">
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {milestone.name}
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-xs text-ink/40">
                          <Clock3 className="h-3 w-3" />
                          Due {milestone.due}
                        </p>
                      </div>

                      <span
                        className={`font-mono text-[10px] font-semibold ${
                          complete
                            ? 'text-emerald-600'
                            : active
                              ? 'text-blue-600'
                              : 'text-ink/35'
                        }`}
                      >
                        {milestone.progress}%
                      </span>
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10">
                      <div
                        className={`h-full rounded-full ${
                          complete
                            ? 'bg-emerald-500'
                            : active
                              ? 'bg-blue-500'
                              : 'bg-ink/20'
                        }`}
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </div>
  )
}