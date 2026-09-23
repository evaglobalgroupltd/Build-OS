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
  accent?: 'copper' | 'green' | 'red' | 'amber'
}

function MetricCard({
  label,
  value,
  description,
  change,
  changeType = 'neutral',
  icon: Icon,
  accent = 'copper',
}: MetricCardProps) {
  const accentStyles = {
    copper: {
      icon: 'bg-[#B85C12]/10 text-[#B85C12]',
      glow: 'group-hover:border-[#B85C12]/20',
    },
    green: {
      icon: 'bg-emerald-500/10 text-emerald-700',
      glow: 'group-hover:border-emerald-500/20',
    },
    red: {
      icon: 'bg-red-500/10 text-red-600',
      glow: 'group-hover:border-red-500/20',
    },
    amber: {
      icon: 'bg-amber-500/10 text-amber-700',
      glow: 'group-hover:border-amber-500/20',
    },
  }

  const styles = accentStyles[accent]

  return (
    <Card
      className={`group relative overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white p-5 shadow-[0_16px_50px_rgba(23,54,41,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(23,54,41,0.09)] ${styles.glow}`}
    >
      <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-[#B85C12]/[0.025] blur-2xl transition-transform duration-500 group-hover:scale-150" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
            {label}
          </p>

          <p className="mt-2 font-display text-[28px] font-semibold tracking-[-0.035em] text-ink">
            {value}
          </p>

          <p className="mt-1 max-w-[220px] text-xs leading-5 text-ink/40">
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
          <Icon className="h-[19px] w-[19px]" />
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
      label: 'Critical',
    },
    high: {
      bar: 'bg-[#B85C12]',
      badge: 'bg-[#B85C12]/10 text-[#9B4D0D]',
      label: 'High',
    },
    medium: {
      bar: 'bg-amber-500',
      badge: 'bg-amber-500/10 text-amber-700',
      label: 'Medium',
    },
    low: {
      bar: 'bg-emerald-500',
      badge: 'bg-emerald-500/10 text-emerald-700',
      label: 'Low',
    },
  }

  const styles = severityStyles[severity]

  return (
    <div className="group">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${styles.bar} shadow-sm`}
          />

          <span className="truncate text-sm font-medium text-ink">
            {label}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-wide text-ink/30">
            {styles.label}
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${styles.badge}`}
          >
            {count}
          </span>
        </div>
      </div>

      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-ink/[0.055]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${styles.bar}`}
          style={{
            width: `${Math.min(Math.max(percentage, 0), 100)}%`,
          }}
        />
      </div>

      <div className="mt-1.5 flex justify-between text-[10px] text-ink/30">
        <span>Exposure index</span>
        <span>{percentage}%</span>
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
    Critical: {
      badge: 'bg-red-500/10 text-red-600',
      icon: 'bg-red-500/10 text-red-600',
      border: 'border-l-red-500',
    },
    High: {
      badge: 'bg-[#B85C12]/10 text-[#9B4D0D]',
      icon: 'bg-[#B85C12]/10 text-[#B85C12]',
      border: 'border-l-[#B85C12]',
    },
    Medium: {
      badge: 'bg-amber-500/10 text-amber-700',
      icon: 'bg-amber-500/10 text-amber-700',
      border: 'border-l-amber-500',
    },
  }

  const styles = severityStyles[severity]

  return (
    <div
      className={`group border-l-2 ${styles.border} px-6 py-5 transition-all duration-300 hover:bg-ink/[0.018]`}
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-3.5">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
          >
            <Icon className="h-[17px] w-[17px]" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-ink">
                {title}
              </p>

              <span
                className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] ${styles.badge}`}
              >
                {severity}
              </span>
            </div>

            <p className="mt-1 text-xs font-semibold text-ink/50">
              {project}
            </p>

            <p className="mt-1.5 max-w-2xl text-xs leading-5 text-ink/40">
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 xl:w-72">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
              Probability
            </p>

            <p className="mt-1 text-sm font-semibold text-ink">
              {probability}
            </p>
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
              Impact
            </p>

            <p className="mt-1 text-sm font-semibold text-ink">
              {impact}
            </p>
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
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
      accent: 'copper' as const,
    },
    {
      label: 'Critical Risks',
      value: '11',
      description: 'Risks requiring immediate intervention',
      change: '+3 this week',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      accent: 'red' as const,
    },
    {
      label: 'Projects At Risk',
      value: '67',
      description: 'Projects with one or more material risks',
      change: '+9 this week',
      changeType: 'negative' as const,
      icon: BriefcaseBusiness,
      accent: 'amber' as const,
    },
    {
      label: 'Estimated Exposure',
      value: '₦28.4M',
      description: 'Estimated financial exposure from active risks',
      change: '−6.8% vs previous period',
      changeType: 'positive' as const,
      icon: Banknote,
      accent: 'green' as const,
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
    <div className="space-y-7">
      {/* Premium hero */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#173629] shadow-[0_28px_90px_rgba(23,54,41,0.16)]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#B85C12]/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl" />

        <div className="relative px-6 py-7 sm:px-8 sm:py-9">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.08] ring-1 ring-white/10">
                  <ShieldAlert className="h-[17px] w-[17px] text-[#D88A4B]" />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Risk Intelligence
                </span>
              </div>

              <h1 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Risk Analytics
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
                Identify emerging project, financial, procurement, contractor
                and compliance risks before they become material delivery
                problems.
              </p>
            </div>

            <div className="w-fit rounded-2xl border border-emerald-300/15 bg-white/[0.055] px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-emerald-300" />

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/35">
                    Portfolio signal
                  </p>

                  <p className="mt-0.5 text-xs font-semibold text-white/80">
                    Overall exposure declining
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 border-t border-white/[0.08] pt-5 sm:grid-cols-3">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/30">
                Risk score
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-white">
                24<span className="ml-1 text-xs font-normal text-white/30">/100</span>
              </p>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/30">
                Active exposure
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-white">
                ₦28.4M
              </p>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/30">
                Critical events
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-[#D88A4B]">
                11
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core risk KPIs */}
      <section>
        <div className="mb-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/35">
            Portfolio intelligence
          </p>

          <h2 className="mt-1 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
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

      {/* Exposure + categories */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] p-6 shadow-[0_20px_60px_rgba(23,54,41,0.05)]">
          <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-[#B85C12]/[0.035] blur-3xl" />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                Portfolio exposure
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-ink">
                Risk score
              </h2>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/[0.045]">
              <ShieldCheck className="h-4 w-4 text-ink/50" />
            </div>
          </div>

          <div className="relative mt-7 flex flex-col items-center">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[11px] border-ink/[0.055]">
              <div
                className="absolute inset-[-11px] rounded-full border-[11px] border-transparent border-l-[#B85C12] border-t-[#D88A4B]"
                style={{
                  transform: 'rotate(-42deg)',
                }}
              />

              <div className="text-center">
                <p className="font-display text-[42px] font-bold tracking-[-0.05em] text-ink">
                  24
                </p>

                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                  of 100
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Moderate exposure
            </div>

            <p className="mt-4 max-w-sm text-center text-xs leading-5 text-ink/40">
              Composite risk score based on project delays, budget variance,
              contractor performance, procurement and dispute activity.
            </p>
          </div>
        </Card>

        <Card className="rounded-[24px] border border-ink/[0.07] p-6 shadow-[0_20px_60px_rgba(23,54,41,0.05)] lg:col-span-2">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                Risk distribution
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-ink">
                Risk categories
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Active risks grouped by their primary source
              </p>
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/25">
              6 monitored domains
            </span>
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
      <Card className="overflow-hidden rounded-[24px] border border-ink/[0.07] shadow-[0_20px_60px_rgba(23,54,41,0.05)]">
        <div className="relative border-b border-line px-6 py-6">
          <div className="absolute right-6 top-6 h-16 w-16 rounded-full bg-red-500/[0.035] blur-2xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#173629]">
                <AlertCircle className="h-[17px] w-[17px] text-[#D88A4B]" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                  Early warning system
                </p>

                <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-ink">
                  Priority risks
                </h2>

                <p className="mt-1 text-xs text-ink/40">
                  Risks with the highest probability and potential project
                  impact
                </p>
              </div>
            </div>

            <span className="hidden rounded-full bg-red-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-red-600 sm:block">
              4 active alerts
            </span>
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
      <Card className="rounded-[24px] border border-ink/[0.07] p-6 shadow-[0_20px_60px_rgba(23,54,41,0.05)]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
              Risk trend analysis
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-ink">
              Risk movement
            </h2>

            <p className="mt-1 text-xs text-ink/40">
              Current risk count compared with the previous reporting period
            </p>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-medium text-ink/35">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#173629]" />
              Current
            </span>

            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-ink/15" />
              Previous
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-7">
          {trendData.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="text-sm font-semibold text-ink">
                    {item.label}
                  </span>

                  {item.trend === 'down' ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.06em] text-emerald-600">
                      <ArrowDownRight className="h-3 w-3" />
                      Improving
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.06em] text-red-500">
                      <ArrowUpRight className="h-3 w-3" />
                      Increasing
                    </span>
                  )}
                </div>

                <span className="shrink-0 text-xs font-bold text-ink">
                  {item.current} active
                </span>
              </div>

              <div className="mt-3 space-y-1.5">
                <div className="flex h-2 overflow-hidden rounded-full bg-ink/[0.045]">
                  <div
                    className="h-full rounded-full bg-[#173629] transition-all duration-500"
                    style={{
                      width: `${Math.min(item.current * 1.5, 100)}%`,
                    }}
                  />
                </div>

                <div className="flex h-1.5 overflow-hidden rounded-full bg-ink/[0.045]">
                  <div
                    className="h-full rounded-full bg-[#173629]/20"
                    style={{
                      width: `${Math.min(item.previous * 1.5, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <p className="mt-1.5 text-[10px] text-ink/30">
                Previous period: {item.previous} active risks
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Risk controls */}
      <section>
        <div className="mb-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
            Control domains
          </p>

          <h2 className="mt-1 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
            Risk controls
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="group relative overflow-hidden rounded-[22px] border border-ink/[0.07] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(23,54,41,0.08)]">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-amber-500/[0.035] blur-3xl" />

            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10">
                <CalendarClock className="h-5 w-5 text-amber-700" />
              </div>

              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                Schedule risk
              </p>

              <p className="mt-1 font-display text-[30px] font-semibold tracking-[-0.04em] text-ink">
                48
              </p>

              <p className="mt-2 text-xs leading-5 text-ink/40">
                Active delay-related risks across the project portfolio.
              </p>
            </div>
          </Card>

          <Card className="group relative overflow-hidden rounded-[22px] border border-ink/[0.07] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(23,54,41,0.08)]">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-orange-500/[0.035] blur-3xl" />

            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10">
                <Users className="h-5 w-5 text-orange-700" />
              </div>

              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                Counterparty risk
              </p>

              <p className="mt-1 font-display text-[30px] font-semibold tracking-[-0.04em] text-ink">
                24
              </p>

              <p className="mt-2 text-xs leading-5 text-ink/40">
                Contractor and vendor performance risks requiring monitoring.
              </p>
            </div>
          </Card>

          <Card className="group relative overflow-hidden rounded-[22px] border border-ink/[0.07] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(23,54,41,0.08)]">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-red-500/[0.035] blur-3xl" />

            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10">
                <Gavel className="h-5 w-5 text-red-600" />
              </div>

              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                Dispute exposure
              </p>

              <p className="mt-1 font-display text-[30px] font-semibold tracking-[-0.04em] text-ink">
                ₦3.2M
              </p>

              <p className="mt-2 text-xs leading-5 text-ink/40">
                Funds currently affected by active disputes and payment
                freezes.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Governance command panel */}
      <section className="relative overflow-hidden rounded-[26px] bg-[#17251D] shadow-[0_24px_70px_rgba(23,54,41,0.12)]">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#B85C12]/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.07] ring-1 ring-white/[0.08]">
              <ShieldCheck className="h-5 w-5 text-[#D88A4B]" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/35">
                Governance layer
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-white">
                Risk governance
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-5 text-white/45">
                Risk events should be linked to projects, milestones,
                procurement requests, counterparties, payments and disputes
                so every intervention has an auditable record.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-300/10 bg-emerald-400/[0.08] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Monitoring active
          </div>
        </div>
      </section>
    </div>
  )
}