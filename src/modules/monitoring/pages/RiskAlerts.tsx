import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ShieldAlert,
  TrendingDown,
  Wallet,
  CalendarClock,
  HardHat,
  Filter,
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
  }
> = {
  critical: {
    label: 'Critical',
    className: 'bg-red-500/10 text-red-600 border-red-500/20',
  },
  high: {
    label: 'High',
    className: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  },
  medium: {
    label: 'Medium',
    className: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  },
  low: {
    label: 'Low',
    className: 'bg-ink/5 text-ink/60 border-ink/10',
  },
}

const statusConfig: Record<
  RiskStatus,
  {
    label: string
    className: string
  }
> = {
  open: {
    label: 'Open',
    className: 'text-red-600',
  },
  investigating: {
    label: 'Investigating',
    className: 'text-amber-600',
  },
  mitigated: {
    label: 'Mitigated',
    className: 'text-emerald-600',
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
    strokeWidth: 1.8,
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

/**
 * Risk Alerts — Monitoring module
 * BRD reference: Sec. 20.3 / 43
 *
 * Monitors budget, timeline and quality risks across projects and
 * surfaces actionable alerts requiring stakeholder attention.
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-laterite" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
              Monitoring · Risk Intelligence
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Risk Alerts
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/55">
            Monitor budget, timeline and quality risks before they become
            critical project issues.
          </p>
        </div>

        <div className="rounded-full bg-ink/5 px-3 py-1.5 font-mono text-[10px] text-ink/40">
          BRD ref: Sec. 20.3 / 43
        </div>
      </div>

      {/* Risk Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                Active risks
              </p>

              <p className="mt-2 text-3xl font-semibold text-ink">
                {openCount}
              </p>

              <p className="mt-1 text-xs text-ink/45">
                Requiring attention
              </p>
            </div>

            <div className="rounded-xl bg-ink/5 p-2.5">
              <AlertTriangle className="h-5 w-5 text-laterite" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                Critical
              </p>

              <p className="mt-2 text-3xl font-semibold text-red-600">
                {criticalCount}
              </p>

              <p className="mt-1 text-xs text-ink/45">
                Immediate action needed
              </p>
            </div>

            <div className="rounded-xl bg-red-500/10 p-2.5">
              <ShieldAlert className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                Budget risks
              </p>

              <p className="mt-2 text-3xl font-semibold text-ink">
                {budgetRisks}
              </p>

              <p className="mt-1 text-xs text-ink/45">
                Cost variance detected
              </p>
            </div>

            <div className="rounded-xl bg-amber/10 p-2.5">
              <TrendingDown className="h-5 w-5 text-amber" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                Timeline risks
              </p>

              <p className="mt-2 text-3xl font-semibold text-ink">
                {timelineRisks}
              </p>

              <p className="mt-1 text-xs text-ink/45">
                Schedule dependencies
              </p>
            </div>

            <div className="rounded-xl bg-teal/10 p-2.5">
              <Clock3 className="h-5 w-5 text-teal" />
            </div>
          </div>
        </Card>
      </div>

      {/* Alert List */}
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-ink/8 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-ink">
              Detected risks
            </h2>

            <p className="mt-1 text-sm text-ink/45">
              {filteredRisks.length} risk
              {filteredRisks.length !== 1 ? 's' : ''} matching the current
              filter.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="mr-1 flex items-center gap-1.5 text-ink/40">
              <Filter className="h-3.5 w-3.5" />
              <span className="font-mono text-[10px] uppercase tracking-wider">
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
                onClick={() => setActiveFilter(value)}
                className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                  activeFilter === value
                    ? 'bg-ink text-paper'
                    : 'bg-ink/5 text-ink/55 hover:bg-ink/10'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-ink/7">
          {filteredRisks.map((risk) => {
            const severity = severityConfig[risk.severity]
            const status = statusConfig[risk.status]
            const isSelected = selectedRisk === risk.id

            return (
              <div key={risk.id}>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedRisk(isSelected ? null : risk.id)
                  }
                  className="flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-ink/[0.015]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                    <RiskCategoryIcon
                      category={risk.category}
                      className="h-5 w-5 text-ink/60"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <h3 className="font-medium text-ink">{risk.title}</h3>

                      <span
                        className={`w-fit rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${severity.className}`}
                      >
                        {severity.label}
                      </span>
                    </div>

                    <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-ink/50">
                      {risk.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="font-mono text-[10px] text-ink/40">
                        {risk.project}
                      </span>

                      <span className="font-mono text-[10px] text-ink/35">
                        {risk.detectedAt}
                      </span>

                      <span className="font-mono text-[10px] text-ink/35">
                        {risk.impact}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={`hidden font-mono text-[10px] sm:inline ${status.className}`}
                    >
                      {status.label}
                    </span>

                    <ChevronRight
                      className={`h-4 w-4 text-ink/30 transition-transform ${
                        isSelected ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </button>

                {isSelected && (
                  <div className="mx-5 mb-5 rounded-xl border border-ink/8 bg-ink/[0.02] p-4 sm:ml-[76px]">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/35">
                          Recommended action
                        </p>

                        <p className="mt-1.5 text-sm leading-relaxed text-ink/65">
                          {risk.recommendation}
                        </p>
                      </div>

                      {risk.status === 'mitigated' ? (
                        <div className="flex items-center gap-2 text-sm text-emerald-600">
                          <CheckCircle2 className="h-4 w-4" />
                          Risk mitigated
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="flex shrink-0 items-center gap-2 text-sm font-medium text-ink transition-opacity hover:opacity-60"
                        >
                          View risk details
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}