import type { ComponentType } from 'react'
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flag,
  TrendingUp,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'

type MilestoneStatus = 'Complete' | 'In progress' | 'Upcoming'

type Milestone = {
  name: string
  progress: number
  status: MilestoneStatus
  due: string
}

const milestones: Milestone[] = [
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
    <div className="space-y-7 pb-8">
      {/* ─────────────────────────────────────────────────────────────
          HERO
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white shadow-[0_18px_55px_rgba(20,40,30,0.07)]">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#12613E]/[0.07] blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#B85C12]/[0.04] blur-3xl" />

        <div className="relative p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#12613E]/10 bg-[#12613E]/[0.05] px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#12613E]">
                  <TrendingUp size={11} />
                  Monitoring / Progress
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/30">
                  BOS-0248
                </span>
              </div>

              <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl lg:text-[42px] lg:leading-[1.05]">
                Project
                <br className="hidden sm:block" />
                <span className="text-ink/45"> progress.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/50 sm:text-[15px]">
                Track delivery performance, milestone completion, and
                schedule position against the approved project baseline.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                <HeroMeta label="Project" value="Gwarinpa Residential Estate" />
                <HeroMeta label="Current phase" value="Structural works" />
                <HeroMeta label="Status" value="On track" accent />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-[#12613E]/10 bg-[#12613E]/[0.035] px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#12613E]/[0.08] text-[#12613E]">
                <CheckCircle2 size={16} />
              </div>

              <div>
                <p className="text-xs font-semibold text-ink">
                  Healthy delivery
                </p>
                <p className="mt-0.5 text-[10px] text-ink/40">
                  No critical schedule variance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PROJECT POSITION
      ───────────────────────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <div className="border-b border-ink/[0.07] px-5 py-4.5 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                Delivery position
              </p>

              <h2 className="mt-1 text-sm font-semibold tracking-tight text-ink">
                Current project performance
              </h2>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#12613E]/10 bg-[#12613E]/[0.05] px-2.5 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-[#12613E]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
              On track
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_260px]">
          {/* Main progress */}
          <div className="p-5 sm:p-6 lg:p-7">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/30">
                  Actual progress
                </p>

                <div className="mt-1 flex items-baseline gap-3">
                  <span className="font-display text-5xl font-semibold tracking-[-0.05em] text-ink">
                    68%
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-[#12613E]/[0.08] px-2 py-1 font-mono text-[9px] font-semibold text-[#12613E]">
                    <ArrowUpRight size={10} />
                    +3%
                  </span>
                </div>

                <p className="mt-1 text-xs text-ink/40">
                  Current completion against approved baseline
                </p>
              </div>

              <div className="sm:text-right">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/30">
                  Planned position
                </p>

                <p className="mt-1 text-xl font-semibold tracking-tight text-ink/55">
                  65%
                </p>

                <p className="mt-1 text-[10px] text-[#12613E]">
                  3% ahead of plan
                </p>
              </div>
            </div>

            <div className="mt-7">
              <div className="relative h-3 overflow-hidden rounded-full bg-ink/[0.055]">
                <div
                  className="h-full rounded-full bg-[#12613E]"
                  style={{ width: '68%' }}
                />

                <div
                  className="absolute inset-y-0 w-px bg-[#B85C12]"
                  style={{ left: '65%' }}
                  aria-hidden="true"
                />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/25">
                  Start
                </span>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-px bg-[#B85C12]" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-ink/35">
                    Planned 65%
                  </span>
                </div>

                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/25">
                  Completion
                </span>
              </div>
            </div>
          </div>

          {/* Status panel */}
          <div className="border-t border-ink/[0.07] bg-[#12613E]/[0.025] p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-7">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#12613E]/[0.08] text-[#12613E]">
                  <CheckCircle2 size={21} />
                </div>

                <p className="mt-4 text-sm font-semibold text-ink">
                  Healthy progress
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/40">
                  Delivery remains ahead of the approved baseline with no
                  critical schedule variance.
                </p>
              </div>

              <div className="mt-6 border-t border-[#12613E]/10 pt-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/25">
                  Schedule position
                </p>

                <p className="mt-1 text-sm font-semibold text-[#12613E]">
                  +3% ahead
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          KPI STRIP
      ───────────────────────────────────────────────────────────── */}
      <section>
        <div className="mb-3.5">
          <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-ink/30">
            Delivery indicators
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <MetricCard
            label="Schedule variance"
            value="+3%"
            description="Ahead of baseline"
            icon={ArrowUpRight}
            accent="green"
          />

          <MetricCard
            label="Completed milestones"
            value="8 / 14"
            description="57% milestone completion"
            icon={CheckCircle2}
            accent="neutral"
          />

          <MetricCard
            label="Estimated completion"
            value="18 Oct"
            description="2026"
            icon={CalendarDays}
            accent="bronze"
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MILESTONE TIMELINE
      ───────────────────────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <div className="border-b border-ink/[0.07] px-5 py-4.5 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                Delivery control
              </p>

              <h2 className="mt-1 text-sm font-semibold tracking-tight text-ink">
                Milestone timeline
              </h2>

              <p className="mt-1 text-[11px] leading-4 text-ink/40">
                Current completion against each major project phase.
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/30">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
                Complete
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 lg:p-7">
          <div className="relative">
            {milestones.map((milestone, index) => (
              <MilestoneItem
                key={milestone.name}
                milestone={milestone}
                index={index}
                last={index === milestones.length - 1}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          DELIVERY OUTLOOK
      ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#12613E]/[0.08] text-[#12613E]">
                <TrendingUp size={17} />
              </div>

              <div>
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-ink/30">
                  Delivery outlook
                </p>

                <h3 className="mt-1 text-sm font-semibold text-ink">
                  Project remains ahead of baseline
                </h3>

                <p className="mt-2 max-w-2xl text-xs leading-5 text-ink/45">
                  Current delivery performance is tracking above the
                  approved programme. Structural works are the dominant
                  active phase, while MEP installation has commenced.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-ink/30">
                  Next critical date
                </p>

                <p className="mt-2 text-lg font-semibold tracking-tight text-ink">
                  15 Sep
                </p>

                <p className="mt-1 text-[10px] text-ink/40">
                  Structural works milestone
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#B85C12]/[0.08] text-[#B85C12]">
                <Flag size={15} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER METADATA
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 border-t border-ink/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/25">
          Build OS / Monitoring / Project Progress
        </span>

        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/25">
          PROJECT #BOS-0248
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   SUPPORTING COMPONENTS
───────────────────────────────────────────────────────────────────── */

function HeroMeta({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/30">
        {label}
      </span>

      <span className="h-1 w-1 rounded-full bg-ink/15" />

      <span
        className={`text-[10px] font-semibold ${
          accent ? 'text-[#12613E]' : 'text-ink/55'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function MetricCard({
  label,
  value,
  description,
  icon: Icon,
  accent,
}: {
  label: string
  value: string
  description: string
  icon: ComponentType<{ size?: number; className?: string }>
  accent: 'green' | 'bronze' | 'neutral'
}) {
  const styles = {
    green: {
      icon: 'bg-[#12613E]/[0.08] text-[#12613E]',
      value: 'text-[#12613E]',
    },
    bronze: {
      icon: 'bg-[#B85C12]/[0.08] text-[#B85C12]',
      value: 'text-ink',
    },
    neutral: {
      icon: 'bg-ink/[0.04] text-ink/45',
      value: 'text-ink',
    },
  }

  const style = styles[accent]

  return (
    <Card className="group">
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="text-xs font-medium text-ink/45">{label}</p>

          <p
            className={`mt-2 font-display text-[27px] font-semibold tracking-[-0.035em] ${style.value}`}
          >
            {value}
          </p>

          <p className="mt-1 text-[10px] text-ink/35">
            {description}
          </p>
        </div>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
        >
          <Icon size={16} />
        </div>
      </div>
    </Card>
  )
}

function MilestoneItem({
  milestone,
  index,
  last,
}: {
  milestone: Milestone
  index: number
  last: boolean
}) {
  const complete = milestone.status === 'Complete'
  const active = milestone.status === 'In progress'

  const markerClass = complete
    ? 'bg-[#12613E] text-white'
    : active
      ? 'bg-[#B85C12] text-white'
      : 'bg-ink/[0.06] text-ink/35'

  const progressClass = complete
    ? 'bg-[#12613E]'
    : active
      ? 'bg-[#B85C12]'
      : 'bg-ink/15'

  const statusClass = complete
    ? 'text-[#12613E]'
    : active
      ? 'text-[#B85C12]'
      : 'text-ink/35'

  return (
    <div className={`relative flex gap-4 ${last ? '' : 'pb-8'}`}>
      {!last && (
        <div className="absolute left-[15px] top-8 bottom-0 w-px bg-ink/[0.08]" />
      )}

      <div
        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm ${markerClass}`}
      >
        {complete ? (
          <CheckCircle2 size={15} />
        ) : active ? (
          <TrendingUp size={14} />
        ) : (
          <Flag size={13} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-ink">
                {milestone.name}
              </p>

              <span
                className={`rounded-full bg-ink/[0.035] px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.08em] ${statusClass}`}
              >
                {milestone.status}
              </span>
            </div>

            <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-ink/35">
              <Clock3 size={11} />
              Due {milestone.due}
            </p>
          </div>

          <span className={`font-mono text-[10px] font-semibold ${statusClass}`}>
            {milestone.progress}%
          </span>
        </div>

        <div className="mt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-ink/[0.055]">
            <div
              className={`h-full rounded-full transition-all ${progressClass}`}
              style={{ width: `${milestone.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-ink/20">
            Phase {String(index + 1).padStart(2, '0')}
          </span>

          <span className="font-mono text-[8px] text-ink/25">
            {milestone.progress === 100
              ? 'Delivered'
              : `${100 - milestone.progress}% remaining`}
          </span>
        </div>
      </div>
    </div>
  )
}