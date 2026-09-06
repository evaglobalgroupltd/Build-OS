import {
  AlertCircle,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileWarning,
  Gavel,
  HardHat,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

interface MetricCardProps {
  label: string
  value: string
  description: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: typeof AlertTriangle
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
                <ArrowDownRight className="h-3.5 w-3.5 text-emerald-600" />
              )}

              {changeType === 'negative' && (
                <ArrowUpRight className="h-3.5 w-3.5 text-red-500" />
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

interface RiskBarProps {
  label: string
  count: number
  percentage: number
  severity: 'critical' | 'high' | 'medium' | 'low'
}

function RiskBar({
  label,
  count,
  percentage,
  severity,
}: RiskBarProps) {
  const severityStyles = {
    critical: {
      bar: 'bg-red-500',
      badge: 'bg-red-500/10 text-red-600',
    },
    high: {
      bar: 'bg-orange-500',
      badge: 'bg-orange-500/10 text-orange-700',
    },
    medium: {
      bar: 'bg-amber-500',
      badge: 'bg-amber-500/10 text-amber-700',
    },
    low: {
      bar: 'bg-emerald-500',
      badge: 'bg-emerald-500/10 text-emerald-700',
    },
  }

  const styles = severityStyles[severity]

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${styles.bar}`} />

          <span className="text-sm font-medium text-ink">
            {label}
          </span>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${styles.badge}`}
        >
          {count}
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
        <div
          className={`h-full rounded-full ${styles.bar}`}
          style={{
            width: `${Math.min(Math.max(percentage, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  )
}

interface RiskRowProps {
  title: string
  project: string
  description: string
  probability: string
  impact: string
  severity: 'Critical' | 'High' | 'Medium'
  icon: typeof AlertTriangle
}

function RiskRow({
  title,
  project,
  description,
  probability,
  impact,
  severity,
  icon: Icon,
}: RiskRowProps) {
  const severityStyles = {
    Critical: 'bg-red-500/10 text-red-600',
    High: 'bg-orange-500/10 text-orange-700',
    Medium: 'bg-amber-500/10 text-amber-700',
  }

  return (
    <div className="px-6 py-5 transition-colors hover:bg-ink/[0.02]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
            <Icon className="h-4 w-4 text-ink/55" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-ink">
                {title}
              </p>

              <span
                className={`rounded-full px-2 py-1 text-[10px] font-semibold ${severityStyles[severity]}`}
              >
                {severity}
              </span>
            </div>

            <p className="mt-1 text-xs font-medium text-ink/50">
              {project}
            </p>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/40">
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:w-72">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-ink/35">
              Probability
            </p>

            <p className="mt-1 text-sm font-semibold text-ink">
              {probability}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wide text-ink/35">
              Impact
            </p>

            <p className="mt-1 text-sm font-semibold text-ink">
              {impact}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wide text-ink/35">
              Priority
            </p>

            <p className="mt-1 text-sm font-semibold text-ink">
              {severity}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function RiskAnalytics() {
  const riskMetrics = [
    {
      label: 'Active Risks',
      value: '142',
      description: 'Open risks across the project portfolio',
      change: '12 fewer than last period',
      changeType: 'positive' as const,
      icon: ShieldAlert,
    },
    {
      label: 'Critical Risks',
      value: '11',
      description: 'Risks requiring immediate intervention',
      change: '+3 this week',
      changeType: 'negative' as const,
      icon: AlertTriangle,
    },
    {
      label: 'Projects At Risk',
      value: '67',
      description: 'Projects with one or more material risks',
      change: '+9 this week',
      changeType: 'negative' as const,
      icon: BriefcaseBusiness,
    },
    {
      label: 'Estimated Exposure',
      value: '₦28.4M',
      description: 'Estimated financial exposure from active risks',
      change: '−6.8% vs previous period',
      changeType: 'positive' as const,
      icon: Banknote,
    },
  ]

  const riskCategories = [
    {
      label: 'Schedule & Delay',
      count: 48,
      percentage: 82,
      severity: 'high' as const,
    },
    {
      label: 'Budget & Cost',
      count: 31,
      percentage: 61,
      severity: 'high' as const,
    },
    {
      label: 'Contractor Performance',
      count: 24,
      percentage: 48,
      severity: 'medium' as const,
    },
    {
      label: 'Procurement & Materials',
      count: 19,
      percentage: 39,
      severity: 'medium' as const,
    },
    {
      label: 'Compliance & Documentation',
      count: 12,
      percentage: 24,
      severity: 'low' as const,
    },
    {
      label: 'Payment & Escrow',
      count: 8,
      percentage: 16,
      severity: 'critical' as const,
    },
  ]

  const priorityRisks = [
    {
      title: 'Milestone delay',
      project: 'Wuse Commercial Complex',
      description:
        'Structural works milestone is 6 days overdue and may affect the downstream construction schedule.',
      probability: 'High',
      impact: 'High',
      severity: 'High' as const,
      icon: Clock3,
    },
    {
      title: 'Budget variance',
      project: 'Lugbe Housing Development',
      description:
        'Current project spend is tracking 8.4% above the approved baseline.',
      probability: 'High',
      impact: 'High',
      severity: 'Critical' as const,
      icon: TrendingDown,
    },
    {
      title: 'Contractor performance',
      project: 'Kubwa Residential Estate',
      description:
        'Repeated reporting delays and incomplete milestone evidence have reduced the project trust score.',
      probability: 'Medium',
      impact: 'High',
      severity: 'High' as const,
      icon: HardHat,
    },
    {
      title: 'Procurement delay',
      project: 'Gwarinpa Family Residence',
      description:
        'Critical structural materials remain pending supplier fulfilment.',
      probability: 'Medium',
      impact: 'Medium',
      severity: 'Medium' as const,
      icon: FileWarning,
    },
  ]

  const trendData = [
    {
      label: 'Schedule',
      current: 48,
      previous: 61,
      trend: 'down',
    },
    {
      label: 'Budget',
      current: 31,
      previous: 38,
      trend: 'down',
    },
    {
      label: 'Contractor',
      current: 24,
      previous: 21,
      trend: 'up',
    },
    {
      label: 'Procurement',
      current: 19,
      previous: 26,
      trend: 'down',
    },
    {
      label: 'Compliance',
      current: 12,
      previous: 15,
      trend: 'down',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <ShieldAlert className="h-5 w-5 text-ink/70" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Risk Intelligence
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Risk Analytics
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Identify emerging project, financial, procurement, contractor and
            compliance risks before they become material delivery problems.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-medium text-ink/60">
          <TrendingDown className="h-4 w-4 text-emerald-600" />
          Overall exposure declining
        </div>
      </div>

      {/* Core risk KPIs */}
      <section>
        <div className="mb-3">
          <h2 className="font-display text-base font-semibold text-ink">
            Risk overview
          </h2>

          <p className="mt-0.5 text-xs text-ink/40">
            Current portfolio risk position
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {riskMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              {...metric}
            />
          ))}
        </div>
      </section>

      {/* Risk exposure + categories */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Portfolio exposure
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Risk score
              </h2>
            </div>

            <ShieldCheck className="h-5 w-5 text-ink/45" />
          </div>

          <div className="mt-8 flex flex-col items-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-ink/10">
              <div className="text-center">
                <p className="font-display text-4xl font-bold tracking-tight text-ink">
                  24
                </p>

                <p className="text-xs font-medium text-ink/40">
                  / 100
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Moderate exposure
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-ink/45">
              Composite risk score based on project delays, budget variance,
              contractor performance, procurement and dispute activity.
            </p>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Risk distribution
            </p>

            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Risk categories
            </h2>

            <p className="mt-1 text-xs text-ink/40">
              Active risks grouped by their primary source
            </p>
          </div>

          <div className="mt-7 space-y-5">
            {riskCategories.map((category) => (
              <RiskBar
                key={category.label}
                {...category}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Priority risks */}
      <Card className="overflow-hidden">
        <div className="border-b border-line px-6 py-5">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-ink/50" />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Early warning system
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Priority risks
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Risks with the highest probability and potential project
                impact
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-line">
          {priorityRisks.map((risk) => (
            <RiskRow
              key={`${risk.project}-${risk.title}`}
              {...risk}
            />
          ))}
        </div>
      </Card>

      {/* Risk trends */}
      <Card className="p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Risk trend analysis
            </p>

            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Risk movement
            </h2>

            <p className="mt-1 text-xs text-ink/40">
              Current risk count compared with the previous reporting period
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-ink/40">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-ink" />
              Current
            </span>

            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-ink/20" />
              Previous
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {trendData.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-ink">
                    {item.label}
                  </span>

                  {item.trend === 'down' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                      <ArrowDownRight className="h-3 w-3" />
                      Improving
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-500">
                      <ArrowUpRight className="h-3 w-3" />
                      Increasing
                    </span>
                  )}
                </div>

                <span className="text-xs font-semibold text-ink">
                  {item.current} active
                </span>
              </div>

              <div className="mt-2 space-y-1.5">
                <div className="flex h-2 overflow-hidden rounded-full bg-ink/5">
                  <div
                    className="h-full rounded-full bg-ink"
                    style={{
                      width: `${Math.min(item.current * 1.5, 100)}%`,
                    }}
                  />
                </div>

                <div className="flex h-1.5 overflow-hidden rounded-full bg-ink/5">
                  <div
                    className="h-full rounded-full bg-ink/20"
                    style={{
                      width: `${Math.min(item.previous * 1.5, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <p className="mt-1 text-[10px] text-ink/35">
                Previous period: {item.previous} active risks
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Risk controls */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
            <CalendarClock className="h-5 w-5 text-amber-700" />
          </div>

          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-ink/40">
            Schedule risk
          </p>

          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            48
          </p>

          <p className="mt-2 text-xs leading-5 text-ink/40">
            Active delay-related risks across the project portfolio.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
            <Users className="h-5 w-5 text-orange-700" />
          </div>

          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-ink/40">
            Counterparty risk
          </p>

          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            24
          </p>

          <p className="mt-2 text-xs leading-5 text-ink/40">
            Contractor and vendor performance risks requiring monitoring.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
            <Gavel className="h-5 w-5 text-red-600" />
          </div>

          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-ink/40">
            Dispute exposure
          </p>

          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            ₦3.2M
          </p>

          <p className="mt-2 text-xs leading-5 text-ink/40">
            Funds currently affected by active disputes and payment freezes.
          </p>
        </Card>
      </div>

      {/* Governance */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
              <ShieldCheck className="h-5 w-5 text-ink/60" />
            </div>

            <div>
              <h2 className="font-display text-base font-semibold text-ink">
                Risk governance
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                Risk events should be linked to projects, milestones,
                procurement requests, counterparties, payments and disputes
                so every intervention has an auditable record.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Monitoring active
          </div>
        </div>
      </Card>
    </div>
  )
}