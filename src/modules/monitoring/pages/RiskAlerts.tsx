import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Filter,
  HardHat,
  ShieldAlert,
  TrendingDown,
  Wallet,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

type RiskSeverity = 'critical' | 'high' | 'medium' | 'low'
type RiskStatus = 'open' | 'investigating' | 'mitigated'

interface RiskAlert {
  id: string
  title: string
  description: string
  category: 'budget' | 'timeline' | 'quality'
  severity: RiskSeverity
  status: RiskStatus
  project: string
  detectedAt: string
  impact: string
  recommendation: string
}

const riskAlerts: RiskAlert[] = [
  {
    id: 'risk-001',
    title: 'Projected budget overrun',
    description:
      'Current procurement and material costs are trending above the approved project budget.',
    category: 'budget',
    severity: 'critical',
    status: 'open',
    project: 'Skyline Residences',
    detectedAt: 'Today, 09:24',
    impact: 'Projected +8.4% budget variance',
    recommendation:
      'Review outstanding purchase orders and identify cost reduction opportunities.',
  },
  {
    id: 'risk-002',
    title: 'Foundation milestone delay',
    description:
      'The foundation work package is progressing behind the approved construction schedule.',
    category: 'timeline',
    severity: 'high',
    status: 'investigating',
    project: 'Skyline Residences',
    detectedAt: 'Today, 07:40',
    impact: 'Estimated 6-day schedule delay',
    recommendation:
      'Review contractor capacity and assess schedule recovery options.',
  },
  {
    id: 'risk-003',
    title: 'Concrete quality variance detected',
    description:
      'Recent inspection evidence indicates a variance requiring additional verification.',
    category: 'quality',
    severity: 'high',
    status: 'investigating',
    project: 'Metro Commercial Hub',
    detectedAt: 'Yesterday',
    impact: 'Quality verification required',
    recommendation:
      'Schedule an additional inspection and review supporting evidence.',
  },
  {
    id: 'risk-004',
    title: 'Material delivery dependency',
    description:
      'A delayed material delivery could affect the upcoming structural work package.',
    category: 'timeline',
    severity: 'medium',
    status: 'open',
    project: 'Metro Commercial Hub',
    detectedAt: 'Yesterday',
    impact: 'Potential 2-day delay',
    recommendation:
      'Confirm supplier delivery timeline and evaluate alternative sourcing.',
  },
  {
    id: 'risk-005',
    title: 'Minor cost variance',
    description:
      'Current expenditure is slightly above the expected cost curve for this stage.',
    category: 'budget',
    severity: 'low',
    status: 'mitigated',
    project: 'Riverside Villas',
    detectedAt: 'Aug 26, 2026',
    impact: '+1.2% budget variance',
    recommendation:
      'Continue monitoring expenditure against the approved budget.',
  },
]

const severityConfig: Record<
  RiskSeverity,
  {
    label: string
    className: string
    dotClassName: string
    accentClassName: string
  }
> = {
  critical: {
    label: 'Critical',
    className: 'border-red-500/15 bg-red-500/[0.07] text-red-600',
    dotClassName: 'bg-red-500',
    accentClassName: 'bg-red-500',
  },
  high: {
    label: 'High',
    className: 'border-orange-500/15 bg-orange-500/[0.07] text-orange-600',
    dotClassName: 'bg-orange-500',
    accentClassName: 'bg-orange-500',
  },
  medium: {
    label: 'Medium',
    className: 'border-amber-500/15 bg-amber-500/[0.07] text-amber-700',
    dotClassName: 'bg-amber-500',
    accentClassName: 'bg-amber-500',
  },
  low: {
    label: 'Low',
    className: 'border-ink/[0.07] bg-ink/[0.035] text-ink/55',
    dotClassName: 'bg-ink/30',
    accentClassName: 'bg-ink/25',
  },
}

const statusConfig: Record<
  RiskStatus,
  {
    label: string
    className: string
    dotClassName: string
  }
> = {
  open: {
    label: 'Open',
    className: 'text-red-600',
    dotClassName: 'bg-red-500',
  },
  investigating: {
    label: 'Investigating',
    className: 'text-amber-700',
    dotClassName: 'bg-amber-500',
  },
  mitigated: {
    label: 'Mitigated',
    className: 'text-[#12613E]',
    dotClassName: 'bg-[#12613E]',
  },
}

function RiskCategoryIcon({
  category,
  className,
}: {
  category: RiskAlert['category']
  className?: string
}) {
  const props = {
    className,
    strokeWidth: 1.7,
  }

  switch (category) {
    case 'budget':
      return <Wallet {...props} />

    case 'timeline':
      return <CalendarClock {...props} />

    case 'quality':
      return <HardHat {...props} />

    default:
      return <AlertTriangle {...props} />
  }
}

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
  tone = 'neutral',
}: {
  label: string
  value: number
  description: string
  icon: typeof AlertTriangle
  tone?: 'neutral' | 'critical' | 'bronze' | 'green'
}) {
  const toneStyles = {
    neutral: {
      icon: 'bg-ink/[0.045] text-ink/55',
      value: 'text-ink',
    },
    critical: {
      icon: 'bg-red-500/[0.07] text-red-600',
      value: 'text-red-600',
    },
    bronze: {
      icon: 'bg-[#B85C12]/[0.07] text-[#B85C12]',
      value: 'text-[#B85C12]',
    },
    green: {
      icon: 'bg-[#12613E]/[0.07] text-[#12613E]',
      value: 'text-[#12613E]',
    },
  }

  const styles = toneStyles[tone]

  return (
    <Card className="group overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/35">
              {label}
            </p>

            <p
              className={`mt-3 font-display text-[32px] font-semibold leading-none tracking-[-0.045em] ${styles.value}`}
            >
              {value}
            </p>

            <p className="mt-2 text-[11px] text-ink/40">
              {description}
            </p>
          </div>

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] ${styles.icon}`}
          >
            <Icon className="h-[18px] w-[18px]" />
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-ink/[0.04]">
        <div className="h-px w-10 bg-ink/[0.08] transition-all duration-500 group-hover:w-16" />
      </div>
    </Card>
  )
}

function SeverityBadge({ severity }: { severity: RiskSeverity }) {
  const config = severityConfig[severity]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] ${config.className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dotClassName}`}
      />
      {config.label}
    </span>
  )
}

function StatusIndicator({ status }: { status: RiskStatus }) {
  const config = statusConfig[status]

  return (
    <span className={`inline-flex items-center gap-1.5 ${config.className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dotClassName}`} />
      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
        {config.label}
      </span>
    </span>
  )
}

function RiskRow({
  risk,
  selected,
  onSelect,
}: {
  risk: RiskAlert
  selected: boolean
  onSelect: () => void
}) {
  const severity = severityConfig[risk.severity]

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onSelect}
        className="group flex w-full flex-col gap-5 px-5 py-5 text-left transition duration-300 hover:bg-ink/[0.012] sm:px-6 lg:flex-row lg:items-center lg:gap-6"
        aria-expanded={selected}
      >
        <div
          className={`absolute bottom-5 left-0 top-5 w-[2px] rounded-r-full ${severity.accentClassName} opacity-0 transition-opacity group-hover:opacity-100 ${
            selected ? 'opacity-100' : ''
          }`}
        />

        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border border-ink/[0.06] bg-[#F8F9F7] text-ink/45 transition duration-300 group-hover:border-[#12613E]/10 group-hover:bg-[#12613E]/[0.04] group-hover:text-[#12613E]">
            <RiskCategoryIcon
              category={risk.category}
              className="h-[18px] w-[18px]"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-ink">
                {risk.title}
              </h3>

              <SeverityBadge severity={risk.severity} />
            </div>

            <p className="mt-2 max-w-3xl text-[12px] leading-5 text-ink/45">
              {risk.description}
            </p>

            <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-[10px] font-medium text-ink/50">
                {risk.project}
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-ink/15 sm:block" />

              <span className="font-mono text-[9px] text-ink/30">
                {risk.detectedAt}
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-ink/15 sm:block" />

              <span className="font-mono text-[9px] text-ink/35">
                {risk.impact}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-ink/[0.06] pt-4 lg:border-0 lg:pt-0">
          <StatusIndicator status={risk.status} />

          <ChevronRight
            className={`h-4 w-4 text-ink/20 transition duration-300 group-hover:text-ink/45 ${
              selected ? 'rotate-90 text-ink/45' : ''
            }`}
            strokeWidth={1.7}
          />
        </div>
      </button>

      {selected && (
        <div className="mx-5 mb-5 ml-5 rounded-[16px] border border-ink/[0.06] bg-[#F8F9F7] p-4 sm:mx-6 sm:ml-[76px] sm:p-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                Recommended response
              </p>

              <p className="mt-2 max-w-2xl text-[12px] leading-5 text-ink/60">
                {risk.recommendation}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {risk.status === 'mitigated' ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-[#12613E]/[0.07] px-3 py-2 text-[10px] font-semibold text-[#12613E]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Risk mitigated
                </span>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[#18271F] px-3.5 py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#12613E]"
                >
                  Review risk
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Risk Alerts — Monitoring module
 *
 * BRD reference:
 * - Sec. 20.3
 * - Sec. 43
 *
 * Monitors budget, timeline and quality risks across projects
 * and surfaces actionable alerts requiring stakeholder attention.
 */
export function RiskAlerts() {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'open' | 'critical' | 'high'
  >('all')

  const [selectedRisk, setSelectedRisk] = useState<string | null>(null)

  const filteredRisks = useMemo(() => {
    if (activeFilter === 'all') {
      return riskAlerts
    }

    if (activeFilter === 'open') {
      return riskAlerts.filter((risk) => risk.status !== 'mitigated')
    }

    return riskAlerts.filter((risk) => risk.severity === activeFilter)
  }, [activeFilter])

  const criticalCount = riskAlerts.filter(
    (risk) => risk.severity === 'critical'
  ).length

  const openCount = riskAlerts.filter(
    (risk) => risk.status !== 'mitigated'
  ).length

  const budgetRisks = riskAlerts.filter(
    (risk) => risk.category === 'budget' && risk.status !== 'mitigated'
  ).length

  const timelineRisks = riskAlerts.filter(
    (risk) => risk.category === 'timeline' && risk.status !== 'mitigated'
  ).length

  return (
    <div className="space-y-7 pb-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.06] bg-white px-5 py-7 shadow-[0_18px_50px_rgba(20,40,30,0.07)] sm:px-7 sm:py-8 lg:px-9 lg:py-9">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#12613E]/[0.055] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-[#B85C12]/[0.035] blur-3xl" />

        <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#B85C12]/10 bg-[#B85C12]/[0.05] px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#B85C12]">
                <ShieldAlert className="h-3 w-3" />
                Monitoring / Risk Intelligence
              </span>

              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                BRD Sec. 20.3 / 43
              </span>
            </div>

            <h1 className="font-display text-[34px] font-semibold leading-[1.02] tracking-[-0.055em] text-ink sm:text-[42px] lg:text-[48px]">
              Risk intelligence.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/50 sm:text-[15px]">
              Identify budget, schedule, and quality exposure early so
              project teams can investigate, respond, and maintain delivery
              control.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-ink/35">
              <span>{openCount} active risks</span>

              <span className="hidden h-1 w-1 rounded-full bg-ink/20 sm:block" />

              <span>{criticalCount} critical</span>

              <span className="hidden h-1 w-1 rounded-full bg-ink/20 sm:block" />

              <span>3 monitoring categories</span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-[12px] border border-ink/[0.06] bg-[#F8F9F7] px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-[#12613E]" />

            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/40">
              Monitoring active
            </span>
          </div>
        </div>
      </section>

      {/* Executive risk position */}
      <section>
        <div className="mb-4">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#12613E]">
            Risk position
          </p>

          <h2 className="mt-1.5 font-display text-xl font-semibold tracking-[-0.035em] text-ink">
            Current exposure
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Active risks"
            value={openCount}
            description="Requiring attention"
            icon={AlertTriangle}
          />

          <SummaryCard
            label="Critical"
            value={criticalCount}
            description="Immediate action required"
            icon={ShieldAlert}
            tone="critical"
          />

          <SummaryCard
            label="Budget risks"
            value={budgetRisks}
            description="Cost variance detected"
            icon={TrendingDown}
            tone="bronze"
          />

          <SummaryCard
            label="Timeline risks"
            value={timelineRisks}
            description="Schedule dependencies"
            icon={Clock3}
            tone="green"
          />
        </div>
      </section>

      {/* Risk register */}
      <Card className="overflow-hidden">
        <div className="border-b border-ink/[0.06] px-5 py-5 sm:px-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                  Detected risks
                </h2>

                <span className="rounded-full bg-ink/[0.05] px-2 py-1 font-mono text-[8px] font-semibold text-ink/40">
                  {filteredRisks.length}
                </span>
              </div>

              <p className="mt-1 text-[11px] text-ink/40">
                {activeFilter === 'all'
                  ? 'All recorded risk signals across monitored projects.'
                  : 'Filtered view of the current risk register.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="mr-1 flex items-center gap-1.5 text-ink/30">
                <Filter className="h-3.5 w-3.5" strokeWidth={1.8} />

                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.15em]">
                  Filter
                </span>
              </div>

              {(
                [
                  ['all', 'All'],
                  ['open', 'Active'],
                  ['critical', 'Critical'],
                  ['high', 'High'],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setActiveFilter(value)
                    setSelectedRisk(null)
                  }}
                  className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold transition ${
                    activeFilter === value
                      ? 'border-[#18271F] bg-[#18271F] text-white'
                      : 'border-ink/[0.06] bg-ink/[0.025] text-ink/45 hover:border-ink/[0.12] hover:bg-ink/[0.05] hover:text-ink/65'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredRisks.length > 0 ? (
          <div className="divide-y divide-ink/[0.06]">
            {filteredRisks.map((risk) => (
              <RiskRow
                key={risk.id}
                risk={risk}
                selected={selectedRisk === risk.id}
                onSelect={() =>
                  setSelectedRisk(
                    selectedRisk === risk.id ? null : risk.id
                  )
                }
              />
            ))}
          </div>
        ) : (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#12613E]/[0.07] text-[#12613E]">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-ink">
              No matching risks
            </h3>

            <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-ink/40">
              No risk records match the selected filter.
            </p>
          </div>
        )}

        <div className="flex flex-col justify-between gap-3 border-t border-ink/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-ink/30">
            Risk register · {riskAlerts.length} recorded signals
          </p>

          <span className="inline-flex items-center gap-2 text-[10px] font-medium text-ink/35">
            <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
            Monitoring continuously
          </span>
        </div>
      </Card>

      {/* Governance note */}
      <div className="flex flex-col gap-4 rounded-[18px] border border-[#B85C12]/10 bg-[#B85C12]/[0.025] px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex items-start gap-3.5">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#B85C12]/[0.08] text-[#B85C12]">
            <ShieldAlert className="h-4 w-4" />
          </div>

          <div>
            <p className="text-[11px] font-semibold text-ink">
              Risk governance
            </p>

            <p className="mt-1 max-w-2xl text-[10px] leading-5 text-ink/40">
              Risk signals should be investigated against supporting project
              evidence before corrective actions or governance decisions are
              recorded.
            </p>
          </div>
        </div>

        <span className="shrink-0 font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-ink/25">
          Build OS · Monitoring
        </span>
      </div>
    </div>
  )
}