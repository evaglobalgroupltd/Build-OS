import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DollarSign,
  FileCheck2,
  Flag,
  GanttChart,
  HardHat,
  MapPin,
  TrendingUp,
  XCircle,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

interface MetricCardProps {
  label: string
  value: string
  description: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: typeof BriefcaseBusiness
  accent?: 'copper' | 'green' | 'ink'
}

function MetricCard({
  label,
  value,
  description,
  change,
  changeType = 'neutral',
  icon: Icon,
  accent = 'ink',
}: MetricCardProps) {
  const accentStyles = {
    copper: {
      icon: 'bg-[#B85C12]/10 text-[#B85C12]',
      border: 'group-hover:border-[#B85C12]/20',
    },
    green: {
      icon: 'bg-[#173629]/10 text-[#173629]',
      border: 'group-hover:border-[#173629]/20',
    },
    ink: {
      icon: 'bg-ink/5 text-ink/60',
      border: 'group-hover:border-ink/15',
    },
  }

  const styles = accentStyles[accent]

  return (
    <Card
      className={`group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(23,54,41,0.08)] ${styles.border}`}
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-ink/[0.025] blur-2xl transition-transform duration-500 group-hover:scale-150" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
            {label}
          </p>

          <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
            {value}
          </p>

          <p className="mt-1 max-w-[190px] text-xs leading-5 text-ink/40">
            {description}
          </p>

          {change && (
            <div className="mt-3 flex items-center gap-1.5 text-xs">
              {changeType === 'positive' && (
                <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
              )}

              {changeType === 'negative' && (
                <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
              )}

              <span
                className={
                  changeType === 'positive'
                    ? 'font-semibold text-emerald-600'
                    : changeType === 'negative'
                      ? 'font-semibold text-red-500'
                      : 'text-ink/45'
                }
              >
                {change}
              </span>
            </div>
          )}
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${styles.icon}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  )
}

interface ProgressBarProps {
  label: string
  value: number
  description: string
}

function ProgressBar({
  label,
  value,
  description,
}: ProgressBarProps) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink">
            {label}
          </p>

          <p className="mt-0.5 text-xs text-ink/40">
            {description}
          </p>
        </div>

        <span className="text-sm font-semibold text-ink">
          {value}%
        </span>
      </div>

      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-ink/[0.06]">
        <div
          className="h-full rounded-full bg-[#173629] transition-all duration-500"
          style={{
            width: `${Math.min(Math.max(value, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  )
}

export function ProjectAnalytics() {
  const projectMetrics = [
    {
      label: 'Active Projects',
      value: '1,284',
      description: 'Projects currently in execution',
      change: '+8.4%',
      changeType: 'positive' as const,
      icon: BriefcaseBusiness,
      accent: 'green' as const,
    },
    {
      label: 'Projects Completed',
      value: '426',
      description: 'Projects successfully handed over',
      change: '+14.2%',
      changeType: 'positive' as const,
      icon: CheckCircle2,
      accent: 'copper' as const,
    },
    {
      label: 'Projects At Risk',
      value: '67',
      description: 'Projects requiring intervention',
      change: '+9 this week',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      accent: 'ink' as const,
    },
    {
      label: 'Total Project Value',
      value: '₦842.6M',
      description: 'Contract value across active projects',
      change: '+18.7%',
      changeType: 'positive' as const,
      icon: DollarSign,
      accent: 'copper' as const,
    },
  ]

  const deliveryMetrics = [
    {
      label: 'On-Time Delivery',
      value: 88,
      description: 'Projects tracking within agreed schedule',
    },
    {
      label: 'Milestone Completion',
      value: 91,
      description: 'Milestones completed as planned',
    },
    {
      label: 'Budget Performance',
      value: 86,
      description: 'Projects remaining within approved budget',
    },
    {
      label: 'Inspection Compliance',
      value: 94,
      description: 'Required inspections completed',
    },
    {
      label: 'Reporting Compliance',
      value: 89,
      description: 'Projects submitting required reports',
    },
  ]

  const lifecycle = [
    {
      stage: 'Draft',
      count: 184,
      percentage: 14,
    },
    {
      stage: 'Under Review',
      count: 126,
      percentage: 10,
    },
    {
      stage: 'Bidding',
      count: 218,
      percentage: 17,
    },
    {
      stage: 'Contracted',
      count: 172,
      percentage: 13,
    },
    {
      stage: 'In Progress',
      count: 584,
      percentage: 45,
    },
  ]

  const activeProjects = [
    {
      name: 'Maitama Residential Development',
      location: 'Maitama, Abuja',
      contractor: 'BuildRight Construction',
      progress: 72,
      budget: '₦84.2M',
      status: 'On track',
      statusType: 'healthy',
    },
    {
      name: 'Gwarinpa Family Residence',
      location: 'Gwarinpa, Abuja',
      contractor: 'PrimeBuild Nigeria',
      progress: 48,
      budget: '₦36.8M',
      status: 'On track',
      statusType: 'healthy',
    },
    {
      name: 'Wuse Commercial Complex',
      location: 'Wuse II, Abuja',
      contractor: 'UrbanWorks Ltd.',
      progress: 63,
      budget: '₦112.4M',
      status: 'At risk',
      statusType: 'warning',
    },
    {
      name: 'Lugbe Housing Development',
      location: 'Lugbe, Abuja',
      contractor: 'MetroBuild Ltd.',
      progress: 31,
      budget: '₦52.6M',
      status: 'Delayed',
      statusType: 'critical',
    },
  ]

  const riskItems = [
    {
      title: 'Milestone overdue',
      description:
        'Wuse Commercial Complex has a milestone 6 days past its expected completion date.',
      severity: 'warning',
      icon: Clock3,
    },
    {
      title: 'Budget variance detected',
      description:
        'Lugbe Housing Development is tracking 8.4% above the approved cost baseline.',
      severity: 'critical',
      icon: DollarSign,
    },
    {
      title: 'Inspection pending',
      description:
        'Three active projects have inspections awaiting Project Manager verification.',
      severity: 'warning',
      icon: FileCheck2,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Executive Hero */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#173629] px-6 py-7 text-white shadow-[0_24px_70px_rgba(23,54,41,0.16)] sm:px-8 sm:py-9">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#B85C12]/20 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07]">
                <GanttChart className="h-4 w-4 text-[#D88A4B]" />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Project Intelligence
              </span>
            </div>

            <h1 className="mt-5 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[42px] lg:leading-[1.05]">
              Every project.{' '}
              <span className="text-[#D88A4B]">
                One operating picture.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">
              Monitor delivery, milestones, budgets, inspections and
              reporting compliance across the entire Build OS project
              ecosystem.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-2 text-xs font-medium text-white/70 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
              Delivery performance improving
            </div>

            <div className="flex items-center gap-5 pt-1">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/35">
                  Active
                </p>

                <p className="mt-1 font-display text-xl font-semibold">
                  1,284
                </p>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/35">
                  Value
                </p>

                <p className="mt-1 font-display text-xl font-semibold">
                  ₦842.6M
                </p>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/35">
                  Delivery
                </p>

                <p className="mt-1 font-display text-xl font-semibold">
                  89/100
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core KPIs */}
      <section>
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
            Portfolio intelligence
          </p>

          <h2 className="mt-1 font-display text-xl font-semibold text-ink">
            Project overview
          </h2>

          <p className="mt-1 text-xs text-ink/40">
            Portfolio-wide project activity and value
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {projectMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              {...metric}
            />
          ))}
        </div>
      </section>

      {/* Delivery Performance */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="relative overflow-hidden p-6 lg:col-span-2">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#173629]/[0.025] blur-3xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
                Delivery performance
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                Portfolio health
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Key indicators across active projects
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173629]/[0.06]">
              <HardHat className="h-4 w-4 text-[#173629]" />
            </div>
          </div>

          <div className="relative mt-8 space-y-6">
            {deliveryMetrics.map((metric) => (
              <ProgressBar
                key={metric.label}
                {...metric}
              />
            ))}
          </div>
        </Card>

        <Card className="relative overflow-hidden p-6">
          <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#B85C12]/[0.045] blur-3xl" />

          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
              Portfolio status
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold text-ink">
              Delivery score
            </h2>

            <div className="mt-8 flex flex-col items-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-ink/[0.07]">
                <div className="absolute inset-[-10px] rounded-full border-[10px] border-transparent border-t-[#173629] border-r-[#B85C12] -rotate-12" />

                <div className="text-center">
                  <p className="font-display text-4xl font-bold tracking-tight text-ink">
                    89
                  </p>

                  <p className="text-xs font-medium text-ink/40">
                    / 100
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Strong delivery
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-ink/45">
                Composite score based on schedule, budget, milestones,
                inspections and reporting compliance.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Lifecycle */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-ink/[0.06] px-6 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
                Project lifecycle
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                Project pipeline
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Current distribution across major project stages
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173629]/[0.06]">
              <GanttChart className="h-4 w-4 text-[#173629]" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex h-10 overflow-hidden rounded-xl bg-ink/[0.04] p-1">
            {lifecycle.map((stage, index) => (
              <div
                key={stage.stage}
                className="h-full overflow-hidden first:rounded-l-lg last:rounded-r-lg"
                style={{
                  width: `${stage.percentage}%`,
                }}
                title={`${stage.stage}: ${stage.count}`}
              >
                <div
                  className={`h-full ${
                    index === 0
                      ? 'bg-ink/25'
                      : index === 1
                        ? 'bg-ink/35'
                        : index === 2
                          ? 'bg-[#B85C12]/55'
                          : index === 3
                            ? 'bg-[#D88A4B]'
                            : 'bg-[#173629]'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {lifecycle.map((stage, index) => (
              <div
                key={stage.stage}
                className="group rounded-2xl border border-transparent p-3 transition hover:border-ink/[0.06] hover:bg-paper-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      index === 4
                        ? 'bg-[#173629]'
                        : index === 3
                          ? 'bg-[#D88A4B]'
                          : 'bg-ink/35'
                    }`}
                  />

                  <span className="text-[10px] font-medium uppercase tracking-wide text-ink/40">
                    {stage.stage}
                  </span>
                </div>

                <p className="mt-3 font-display text-2xl font-semibold text-ink">
                  {stage.count}
                </p>

                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[10px] text-ink/35">
                    Portfolio share
                  </span>

                  <span className="text-[10px] font-semibold text-ink/55">
                    {stage.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Active Projects */}
      <Card className="overflow-hidden">
        <div className="border-b border-ink/[0.06] px-6 py-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
                Active portfolio
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                Project delivery
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Selected active projects and current execution status
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-ink/[0.04] px-3 py-1.5 text-xs text-ink/45">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              1,284 active projects
            </div>
          </div>
        </div>

        <div className="divide-y divide-ink/[0.06]">
          {activeProjects.map((project) => (
            <div
              key={project.name}
              className="group px-6 py-5 transition-colors hover:bg-paper-2"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#173629]/[0.06] transition-colors group-hover:bg-[#173629]/[0.1]">
                      <HardHat className="h-4 w-4 text-[#173629]/70" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {project.name}
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink/40">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {project.location}
                        </span>

                        <span>{project.contractor}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full xl:w-64">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-wide text-ink/35">
                      Progress
                    </span>

                    <span className="text-xs font-semibold text-ink">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/[0.06]">
                    <div
                      className="h-full rounded-full bg-[#173629] transition-all duration-500"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-8 xl:w-56 xl:justify-end">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-ink/35">
                      Budget
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {project.budget}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-ink/35">
                      Status
                    </p>

                    <span
                      className={
                        project.statusType === 'healthy'
                          ? 'mt-1 inline-flex rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700'
                          : project.statusType === 'warning'
                            ? 'mt-1 inline-flex rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700'
                            : 'mt-1 inline-flex rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600'
                      }
                    >
                      {project.status}
                    </span>
                  </div>

                  <ChevronRight className="hidden h-4 w-4 text-ink/20 transition-transform group-hover:translate-x-1 xl:block" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Risk + Milestone Intelligence */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="border-b border-ink/[0.06] px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                    Project risk
                  </p>

                  <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                    Attention required
                  </h2>
                </div>
              </div>

              <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600">
                67 at risk
              </span>
            </div>
          </div>

          <div className="space-y-3 p-6">
            {riskItems.map((risk) => {
              const Icon = risk.icon

              const styles =
                risk.severity === 'critical'
                  ? 'border-red-500/15 bg-red-500/[0.025]'
                  : 'border-amber-500/15 bg-amber-500/[0.025]'

              const iconStyles =
                risk.severity === 'critical'
                  ? 'bg-red-500/10 text-red-600'
                  : 'bg-amber-500/10 text-amber-600'

              return (
                <div
                  key={risk.title}
                  className={`group rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(23,54,41,0.06)] ${styles}`}
                >
                  <div className="flex gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconStyles}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-ink">
                        {risk.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-ink/45">
                        {risk.description}
                      </p>
                    </div>

                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-ink/20 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
                Milestone control
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Milestone position
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Current milestone verification and delivery position
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#173629]/[0.06]">
              <Flag className="h-4 w-4 text-[#173629]" />
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="group rounded-2xl bg-emerald-500/[0.05] p-4 transition hover:-translate-y-0.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />

              <p className="mt-3 text-xs text-ink/40">
                Completed
              </p>

              <p className="mt-1 font-display text-xl font-semibold text-ink">
                4,286
              </p>
            </div>

            <div className="group rounded-2xl bg-amber-500/[0.05] p-4 transition hover:-translate-y-0.5">
              <Clock3 className="h-4 w-4 text-amber-600" />

              <p className="mt-3 text-xs text-ink/40">
                Pending
              </p>

              <p className="mt-1 font-display text-xl font-semibold text-ink">
                384
              </p>
            </div>

            <div className="group rounded-2xl bg-amber-500/[0.05] p-4 transition hover:-translate-y-0.5">
              <AlertTriangle className="h-4 w-4 text-amber-600" />

              <p className="mt-3 text-xs text-ink/40">
                At risk
              </p>

              <p className="mt-1 font-display text-xl font-semibold text-ink">
                72
              </p>
            </div>

            <div className="group rounded-2xl bg-red-500/[0.04] p-4 transition hover:-translate-y-0.5">
              <XCircle className="h-4 w-4 text-red-500" />

              <p className="mt-3 text-xs text-ink/40">
                Overdue
              </p>

              <p className="mt-1 font-display text-xl font-semibold text-ink">
                41
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-ink/[0.06] bg-paper-2 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-ink/45" />

                <span className="text-xs font-medium text-ink/60">
                  Average milestone completion
                </span>
              </div>

              <span className="text-sm font-semibold text-ink">
                91%
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/[0.06]">
              <div
                className="h-full rounded-full bg-[#173629]"
                style={{ width: '91%' }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Executive Project Signals */}
      <section className="relative overflow-hidden rounded-[24px] bg-[#17251D] p-6 text-white sm:p-7">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#B85C12]/10 blur-3xl" />

        <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D88A4B]">
              Executive project signal
            </p>

            <h2 className="mt-2 max-w-2xl font-display text-xl font-semibold sm:text-2xl">
              Portfolio delivery remains strong, with focused intervention
              required across the risk layer.
            </h2>

            <p className="mt-2 max-w-2xl text-xs leading-5 text-white/40">
              89/100 portfolio delivery score, 91% milestone completion and
              94% inspection compliance currently define the operating
              picture.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] px-5 py-4 text-center">
              <p className="text-[10px] uppercase tracking-wide text-white/35">
                At risk
              </p>

              <p className="mt-1 font-display text-2xl font-semibold text-[#D88A4B]">
                67
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] px-5 py-4 text-center">
              <p className="text-[10px] uppercase tracking-wide text-white/35">
                Completed
              </p>

              <p className="mt-1 font-display text-2xl font-semibold">
                426
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="group p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(23,54,41,0.06)]">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            Average project duration
          </p>

          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            7.8 mo
          </p>

          <p className="mt-1 text-xs font-medium text-emerald-600">
            4.2% faster than baseline
          </p>
        </Card>

        <Card className="group p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(23,54,41,0.06)]">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            Average budget variance
          </p>

          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            +3.6%
          </p>

          <p className="mt-1 text-xs font-medium text-amber-700">
            Within monitored threshold
          </p>
        </Card>

        <Card className="group p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(23,54,41,0.06)]">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            Projects requiring intervention
          </p>

          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            67
          </p>

          <p className="mt-1 text-xs font-medium text-red-500">
            5.2% of active portfolio
          </p>
        </Card>

        <Card className="group p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(23,54,41,0.06)]">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            Successful handover rate
          </p>

          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            96.4%
          </p>

          <p className="mt-1 text-xs font-medium text-emerald-600">
            +2.1% this quarter
          </p>
        </Card>
      </div>
    </div>
  )
}