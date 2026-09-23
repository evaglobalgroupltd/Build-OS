import type { ComponentType, ReactNode } from 'react'
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

type MonthlyStat = {
  label: string
  value: string
  change: string
  trend: 'up' | 'neutral'
  icon: ComponentType<{ size?: number; className?: string }>
}

type Milestone = {
  name: string
  status: 'Completed' | 'In Progress'
  progress: number
  date: string
}

type ActivityItem = {
  title: string
  description: string
  time: string
  type: 'inspection' | 'evidence' | 'procurement'
}

const monthlyStats: MonthlyStat[] = [
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

const milestones: Milestone[] = [
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

const activity: ActivityItem[] = [
  {
    title: 'Monthly site inspection completed',
    description: 'Inspection passed with 2 minor observations.',
    time: 'Today',
    type: 'inspection',
  },
  {
    title: 'Milestone evidence submitted',
    description:
      'Level 2 structural frame progress evidence uploaded.',
    time: 'Yesterday',
    type: 'evidence',
  },
  {
    title: 'Material delivery verified',
    description:
      'Rebar and cement delivery matched approved quantities.',
    time: 'Aug 24',
    type: 'procurement',
  },
]

export function MonthlyReport() {
  return (
    <div className="space-y-7 pb-8">
      {/* ─────────────────────────────────────────────────────────────
          REPORT HERO
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white shadow-[0_18px_55px_rgba(20,40,30,0.07)]">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#12613E]/[0.07] blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#B85C12]/[0.045] blur-3xl" />

        <div className="relative p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#12613E]/10 bg-[#12613E]/[0.05] px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#12613E]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
                  Monitoring / Reports
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/30">
                  AUG 2026
                </span>
              </div>

              <h1 className="max-w-3xl font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl lg:text-[42px] lg:leading-[1.05]">
                Monthly project
                <br className="hidden sm:block" />
                <span className="text-ink/45"> performance report.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/50 sm:text-[15px]">
                A consolidated view of project delivery, financial
                performance, milestones, schedule position, and verified
                site activity for August 2026.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                <HeroMeta label="Reporting period" value="01 — 31 Aug 2026" />
                <HeroMeta label="Last synchronized" value="09:42 WAT" />
                <HeroMeta label="Data status" value="Verified" accent />
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-ink/10 bg-white px-4 text-xs font-semibold text-ink transition duration-200 hover:border-ink/15 hover:bg-ink/[0.025]"
              >
                <CalendarDays size={15} className="text-ink/45" />
                August 2026
              </button>

              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#12613E] px-4.5 text-xs font-semibold text-white shadow-[0_10px_25px_rgba(18,97,62,0.18)] transition duration-200 hover:bg-[#0e5335] hover:shadow-[0_12px_30px_rgba(18,97,62,0.22)]"
              >
                <Download size={15} />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          REPORT STATUS
      ───────────────────────────────────────────────────────────── */}
      <Card>
        <div className="flex flex-col gap-4 px-5 py-4.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#12613E]/[0.08] text-[#12613E]">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-ink">
                  August report is ready
                </p>

                <span className="rounded-full bg-[#12613E]/[0.08] px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-[#12613E]">
                  Verified
                </span>
              </div>

              <p className="mt-1 text-xs text-ink/45">
                Reporting data was last synchronized today at 09:42 WAT.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="self-end rounded-lg p-2 text-ink/35 transition hover:bg-ink/[0.04] hover:text-ink sm:self-auto"
            aria-label="More report options"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          EXECUTIVE METRICS
      ───────────────────────────────────────────────────────────── */}
      <section>
        <div className="mb-3.5 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
              Executive indicators
            </p>
            <h2 className="mt-1 text-base font-semibold tracking-tight text-ink">
              Project position
            </h2>
          </div>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.12em] text-ink/30 sm:block">
            August close
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {monthlyStats.map((stat, index) => {
            const Icon = stat.icon

            return (
              <MetricCard
                key={stat.label}
                stat={stat}
                featured={index === 0}
              />
            )
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PROGRESS + FINANCIAL POSITION
      ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
        {/* Progress */}
        <Card className="overflow-hidden">
          <div className="border-b border-ink/[0.07] px-5 py-4.5 sm:px-6">
            <SectionHeading
              eyebrow="Delivery performance"
              title="Project progress"
              description="Planned versus actual progress for the reporting period."
              trailing="AUG 01 — AUG 31"
            />
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/30">
                  Overall completion
                </p>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-[46px]">
                    68%
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#12613E]/[0.08] px-2 py-1 font-mono text-[9px] font-semibold text-[#12613E]">
                    <ArrowUpRight size={11} />
                    8.4%
                  </span>
                </div>

                <p className="mt-1 text-xs text-ink/40">
                  Month-on-month movement
                </p>
              </div>

              <div className="sm:text-right">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/30">
                  Schedule variance
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-[#12613E]">
                  4 days ahead
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              <ProgressRow
                label="Actual"
                value="68%"
                percentage={68}
                strong
              />

              <ProgressRow
                label="Planned"
                value="64%"
                percentage={64}
              />
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-ink/[0.07] pt-5">
              <ReportValue label="Completed" value="17" />
              <ReportValue label="Active" value="6" />
              <ReportValue label="Remaining" value="8" />
            </div>
          </div>
        </Card>

        {/* Financial */}
        <Card className="overflow-hidden">
          <div className="border-b border-ink/[0.07] px-5 py-4.5 sm:px-6">
            <SectionHeading
              eyebrow="Capital position"
              title="Financial position"
              description="Current project expenditure and commitments."
            />
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/30">
                  Approved budget
                </p>

                <p className="mt-1.5 font-display text-3xl font-semibold tracking-[-0.035em] text-ink">
                  ₦48.5M
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#B85C12]/[0.08] text-[#B85C12]">
                <Wallet size={17} />
              </div>
            </div>

            <div className="mt-7">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-xs font-medium text-ink/45">
                  Budget consumed
                </span>

                <span className="font-mono text-[10px] font-semibold text-ink/60">
                  61.8%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-ink/[0.06]">
                <div
                  className="h-full rounded-full bg-[#12613E]"
                  style={{ width: '61.8%' }}
                />
              </div>
            </div>

            <div className="mt-6 divide-y divide-ink/[0.06]">
              <FinancialRow label="Spent to date" value="₦30.0M" />
              <FinancialRow label="Committed" value="₦7.2M" />
              <FinancialRow
                label="Available"
                value="₦11.3M"
                accent
              />
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#12613E]/10 bg-[#12613E]/[0.035] px-3.5 py-3">
              <CheckCircle2
                size={14}
                className="shrink-0 text-[#12613E]"
              />
              <p className="text-[10px] leading-4 text-ink/50">
                Current expenditure remains within the approved financial
                plan.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MILESTONE PERFORMANCE
      ───────────────────────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-ink/[0.07] px-5 py-4.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <SectionHeading
            eyebrow="Delivery control"
            title="Milestone performance"
            description="Key delivery points during the reporting period."
          />

          <button
            type="button"
            className="inline-flex items-center gap-1 self-start text-xs font-semibold text-ink/50 transition hover:text-[#12613E] sm:self-auto"
          >
            View all
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="divide-y divide-ink/[0.06]">
          {milestones.map((milestone, index) => (
            <MilestoneRow
              key={milestone.name}
              milestone={milestone}
              index={index}
            />
          ))}
        </div>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          ACTIVITY + MANAGEMENT SUMMARY
      ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        {/* Activity */}
        <Card className="overflow-hidden">
          <div className="border-b border-ink/[0.07] px-5 py-4.5 sm:px-6">
            <SectionHeading
              eyebrow="Verified events"
              title="Site activity"
              description="Recent project events captured in the audit trail."
            />
          </div>

          <div className="divide-y divide-ink/[0.06]">
            {activity.map((item, index) => (
              <ActivityRow
                key={item.title}
                item={item}
                last={index === activity.length - 1}
              />
            ))}
          </div>

          <div className="border-t border-ink/[0.07] bg-ink/[0.012] px-5 py-3.5 sm:px-6">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-ink/45 transition hover:text-[#12613E]"
            >
              View project activity
              <ArrowUpRight size={12} />
            </button>
          </div>
        </Card>

        {/* Management summary */}
        <Card className="overflow-hidden">
          <div className="border-b border-ink/[0.07] px-5 py-4.5 sm:px-6">
            <SectionHeading
              eyebrow="Executive review"
              title="Management summary"
              description="Key observations from this reporting period."
            />
          </div>

          <div className="p-5 sm:p-6">
            <div className="grid gap-3">
              <InsightCard
                icon={TrendingUp}
                tone="green"
                title="Project is ahead of schedule"
                description="Overall delivery is currently tracking 4 days ahead of the approved baseline."
              />

              <InsightCard
                icon={Clock3}
                tone="bronze"
                title="Two activities require attention"
                description="Electrical first fix and material scheduling remain the main areas requiring monitoring."
              />

              <InsightCard
                icon={FileText}
                tone="neutral"
                title="Evidence coverage remains strong"
                description="94% of reported milestone activity for the month has supporting evidence attached."
              />
            </div>

            <button
              type="button"
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-ink/10 bg-white text-xs font-semibold text-ink transition hover:border-ink/15 hover:bg-ink/[0.025]"
            >
              <FileText size={14} className="text-ink/45" />
              Open Full Report
              <ChevronRight size={14} className="text-ink/35" />
            </button>
          </div>
        </Card>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          REPORT FOOTER
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 border-t border-ink/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/25">
          Build OS / Monitoring / Monthly Report
        </span>

        <div className="flex items-center gap-3">
          <span className="hidden h-1 w-1 rounded-full bg-ink/15 sm:block" />

          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/25">
            BRD REF: SEC. 20.3 / 43
          </span>
        </div>
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
  stat,
  featured = false,
}: {
  stat: MonthlyStat
  featured?: boolean
}) {
  const Icon = stat.icon

  return (
    <Card className="group overflow-hidden">
      <div className="relative p-5">
        {featured && (
          <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#12613E]/[0.06] blur-2xl" />
        )}

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-ink/45">
              {stat.label}
            </p>

            <p className="mt-3 font-display text-[27px] font-semibold tracking-[-0.035em] text-ink">
              {stat.value}
            </p>
          </div>

          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              featured
                ? 'bg-[#12613E]/[0.08] text-[#12613E]'
                : 'bg-ink/[0.035] text-ink/45'
            }`}
          >
            <Icon size={16} />
          </div>
        </div>

        <div className="relative mt-4 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 font-mono text-[8px] font-semibold ${
              stat.trend === 'up'
                ? 'bg-[#12613E]/[0.08] text-[#12613E]'
                : 'bg-ink/[0.04] text-ink/45'
            }`}
          >
            {stat.trend === 'up' ? (
              <ArrowUpRight size={10} />
            ) : (
              <ArrowDownRight size={10} />
            )}
            {stat.change}
          </span>

          <span className="text-[9px] text-ink/30">
            vs previous period
          </span>
        </div>
      </div>
    </Card>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  trailing,
}: {
  eyebrow: string
  title: string
  description: string
  trailing?: string
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-ink/30">
          {eyebrow}
        </p>

        <p className="mt-1 text-sm font-semibold tracking-tight text-ink">
          {title}
        </p>

        <p className="mt-1 text-[11px] leading-4 text-ink/40">
          {description}
        </p>
      </div>

      {trailing && (
        <span className="hidden shrink-0 font-mono text-[8px] uppercase tracking-[0.12em] text-ink/25 sm:block">
          {trailing}
        </span>
      )}
    </div>
  )
}

function ProgressRow({
  label,
  value,
  percentage,
  strong = false,
}: {
  label: string
  value: string
  percentage: number
  strong?: boolean
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`text-[10px] ${
            strong ? 'font-semibold text-ink/65' : 'font-medium text-ink/40'
          }`}
        >
          {label}
        </span>

        <span className="font-mono text-[9px] font-semibold text-ink/50">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-ink/[0.055]">
        <div
          className={`h-full rounded-full transition-all ${
            strong ? 'bg-[#12613E]' : 'bg-ink/15'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

function ReportValue({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/25">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-semibold text-ink">
        {value}
      </p>
    </div>
  )
}

function FinancialRow({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-xs text-ink/45">{label}</span>

      <span
        className={`text-sm font-semibold ${
          accent ? 'text-[#12613E]' : 'text-ink'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function MilestoneRow({
  milestone,
  index,
}: {
  milestone: Milestone
  index: number
}) {
  const completed = milestone.status === 'Completed'

  return (
    <div className="group px-5 py-4.5 transition-colors hover:bg-ink/[0.012] sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-3.5">
          <div
            className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              completed
                ? 'bg-[#12613E]/[0.08] text-[#12613E]'
                : 'bg-[#B85C12]/[0.08] text-[#B85C12]'
            }`}
          >
            <span className="font-mono text-[9px] font-semibold">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-ink sm:text-sm">
              {milestone.name}
            </p>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[9px] text-ink/35">
                Due {milestone.date}
              </span>

              <span className="h-0.5 w-0.5 rounded-full bg-ink/20" />

              <span
                className={`text-[9px] font-semibold ${
                  completed ? 'text-[#12613E]' : 'text-[#B85C12]'
                }`}
              >
                {milestone.status}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:w-64">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/25">
              Completion
            </span>

            <span className="font-mono text-[9px] font-semibold text-ink/50">
              {milestone.progress}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-ink/[0.055]">
            <div
              className={`h-full rounded-full ${
                completed ? 'bg-[#12613E]' : 'bg-[#B85C12]'
              }`}
              style={{ width: `${milestone.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ActivityRow({
  item,
  last,
}: {
  item: ActivityItem
  last: boolean
}) {
  const Icon =
    item.type === 'inspection'
      ? CheckCircle2
      : item.type === 'evidence'
        ? FileText
        : Wallet

  return (
    <div className="relative flex gap-3.5 px-5 py-4.5 sm:px-6">
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/[0.035] text-ink/45">
        <Icon size={15} />

        {!last && (
          <span className="absolute left-1/2 top-full h-4 w-px -translate-x-1/2 bg-ink/[0.08]" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold leading-5 text-ink">
            {item.title}
          </p>

          <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.08em] text-ink/25">
            {item.time}
          </span>
        </div>

        <p className="mt-1 text-[10px] leading-4 text-ink/40">
          {item.description}
        </p>
      </div>
    </div>
  )
}

function InsightCard({
  icon: Icon,
  tone,
  title,
  description,
}: {
  icon: ComponentType<{ size?: number; className?: string }>
  tone: 'green' | 'bronze' | 'neutral'
  title: string
  description: string
}) {
  const styles = {
    green: {
      wrapper: 'border-[#12613E]/10 bg-[#12613E]/[0.035]',
      icon: 'bg-[#12613E]/[0.08] text-[#12613E]',
    },
    bronze: {
      wrapper: 'border-[#B85C12]/10 bg-[#B85C12]/[0.035]',
      icon: 'bg-[#B85C12]/[0.08] text-[#B85C12]',
    },
    neutral: {
      wrapper: 'border-ink/[0.07] bg-ink/[0.018]',
      icon: 'bg-ink/[0.045] text-ink/45',
    },
  }

  const style = styles[tone]

  return (
    <div
      className={`rounded-[16px] border p-4 ${style.wrapper}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${style.icon}`}
        >
          <Icon size={15} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold text-ink">{title}</p>

          <p className="mt-1 text-[10px] leading-4 text-ink/45">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}