import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
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
}

function MetricCard({
  label,
  value,
  description,
  change,
  changeType = 'neutral',
  icon: Icon,
}: MetricCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/45">
            {label}
          </p>

          <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
            {value}
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/40">
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
                    ? 'font-medium text-emerald-600'
                    : changeType === 'negative'
                      ? 'font-medium text-red-500'
                      : 'text-ink/45'
                }
              >
                {change}
              </span>
            </div>
          )}
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
          <Icon className="h-5 w-5 text-ink/60" />
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
          <p className="text-sm font-medium text-ink">
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

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
        <div
          className="h-full rounded-full bg-ink transition-all duration-500"
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
    },
    {
      label: 'Projects Completed',
      value: '426',
      description: 'Projects successfully handed over',
      change: '+14.2%',
      changeType: 'positive' as const,
      icon: CheckCircle2,
    },
    {
      label: 'Projects At Risk',
      value: '67',
      description: 'Projects requiring intervention',
      change: '+9 this week',
      changeType: 'negative' as const,
      icon: AlertTriangle,
    },
    {
      label: 'Total Project Value',
      value: '₦842.6M',
      description: 'Contract value across active projects',
      change: '+18.7%',
      changeType: 'positive' as const,
      icon: DollarSign,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <GanttChart className="h-5 w-5 text-ink/70" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Project Intelligence
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Project Analytics
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Monitor project delivery, milestones, budget performance,
            inspections, reporting compliance and project-level risk across
            the Build OS ecosystem.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-medium text-ink/60">
          <TrendingUp className="h-4 w-4 text-emerald-600" />
          Delivery performance improving
        </div>
      </div>

      {/* Core project KPIs */}
      <section>
        <div className="mb-3">
          <h2 className="font-display text-base font-semibold text-ink">
            Project overview
          </h2>

          <p className="mt-0.5 text-xs text-ink/40">
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

      {/* Delivery performance */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Delivery performance
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Portfolio health
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Key indicators across active projects
              </p>
            </div>

            <HardHat className="h-5 w-5 text-ink/45" />
          </div>

          <div className="mt-7 space-y-6">
            {deliveryMetrics.map((metric) => (
              <ProgressBar
                key={metric.label}
                {...metric}
              />
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Portfolio status
            </p>

            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Delivery score
            </h2>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-ink/10">
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
        </Card>
      </div>

      {/* Project lifecycle */}
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Project lifecycle
            </p>

            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Project pipeline
            </h2>

            <p className="mt-1 text-xs text-ink/40">
              Current distribution across major project stages
            </p>
          </div>

          <GanttChart className="h-5 w-5 text-ink/45" />
        </div>

        <div className="mt-8">
          <div className="flex h-9 overflow-hidden rounded-lg bg-ink/5">
            {lifecycle.map((stage) => (
              <div
                key={stage.stage}
                className="h-full border-r border-paper last:border-0"
                style={{
                  width: `${stage.percentage}%`,
                }}
                title={`${stage.stage}: ${stage.count}`}
              >
                <div className="h-full bg-ink/75" />
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {lifecycle.map((stage) => (
              <div key={stage.stage}>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-ink/50" />

                  <span className="text-xs text-ink/45">
                    {stage.stage}
                  </span>
                </div>

                <p className="mt-2 font-display text-xl font-semibold text-ink">
                  {stage.count}
                </p>

                <p className="mt-0.5 text-[10px] text-ink/35">
                  {stage.percentage}% of portfolio
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Active projects */}
      <Card className="overflow-hidden">
        <div className="flex flex-col justify-between gap-3 border-b border-line px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Active portfolio
            </p>

            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Project delivery
            </h2>

            <p className="mt-1 text-xs text-ink/40">
              Selected active projects and current execution status
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-ink/45">
            <BriefcaseBusiness className="h-4 w-4" />
            1,284 active projects
          </div>
        </div>

        <div className="divide-y divide-line">
          {activeProjects.map((project) => (
            <div
              key={project.name}
              className="px-6 py-5 transition-colors hover:bg-ink/[0.02]"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                      <HardHat className="h-4 w-4 text-ink/55" />
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

                        <span>
                          {project.contractor}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full xl:w-64">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink/40">
                      Progress
                    </span>

                    <span className="text-xs font-semibold text-ink">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
                    <div
                      className="h-full rounded-full bg-ink"
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
                          ? 'mt-1 inline-flex rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700'
                          : project.statusType === 'warning'
                            ? 'mt-1 inline-flex rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700'
                            : 'mt-1 inline-flex rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-600'
                      }
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Risks + milestone summary */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="border-b border-line px-6 py-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-ink/50" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Project risk
                </p>

                <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                  Attention required
                </h2>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-6">
            {riskItems.map((risk) => {
              const Icon = risk.icon

              const styles =
                risk.severity === 'critical'
                  ? 'border-red-500/15 bg-red-500/[0.03]'
                  : 'border-amber-500/15 bg-amber-500/[0.03]'

              return (
                <div
                  key={risk.title}
                  className={`rounded-xl border p-4 ${styles}`}
                >
                  <div className="flex gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-ink/55" />

                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {risk.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-ink/45">
                        {risk.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Milestone control
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Milestone position
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Current milestone verification and delivery position
              </p>
            </div>

            <Flag className="h-5 w-5 text-ink/45" />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-paper-2 p-4">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />

              <p className="mt-3 text-xs text-ink/40">
                Completed
              </p>

              <p className="mt-1 font-display text-xl font-semibold text-ink">
                4,286
              </p>
            </div>

            <div className="rounded-xl bg-paper-2 p-4">
              <Clock3 className="h-4 w-4 text-amber-600" />

              <p className="mt-3 text-xs text-ink/40">
                Pending
              </p>

              <p className="mt-1 font-display text-xl font-semibold text-ink">
                384
              </p>
            </div>

            <div className="rounded-xl bg-paper-2 p-4">
              <AlertTriangle className="h-4 w-4 text-amber-600" />

              <p className="mt-3 text-xs text-ink/40">
                At risk
              </p>

              <p className="mt-1 font-display text-xl font-semibold text-ink">
                72
              </p>
            </div>

            <div className="rounded-xl bg-paper-2 p-4">
              <XCircle className="h-4 w-4 text-red-500" />

              <p className="mt-3 text-xs text-ink/40">
                Overdue
              </p>

              <p className="mt-1 font-display text-xl font-semibold text-ink">
                41
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-line p-4">
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

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/5">
              <div
                className="h-full rounded-full bg-ink"
                style={{ width: '91%' }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <p className="text-xs text-ink/40">
            Average project duration
          </p>

          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            7.8 mo
          </p>

          <p className="mt-1 text-xs text-emerald-600">
            4.2% faster than baseline
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-ink/40">
            Average budget variance
          </p>

          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            +3.6%
          </p>

          <p className="mt-1 text-xs text-amber-700">
            Within monitored threshold
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-ink/40">
            Projects requiring intervention
          </p>

          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            67
          </p>

          <p className="mt-1 text-xs text-red-500">
            5.2% of active portfolio
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-ink/40">
            Successful handover rate
          </p>

          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            96.4%
          </p>

          <p className="mt-1 text-xs text-emerald-600">
            +2.1% this quarter
          </p>
        </Card>
      </div>
    </div>
  )
}