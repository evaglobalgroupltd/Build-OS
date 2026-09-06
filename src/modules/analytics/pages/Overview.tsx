import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  DollarSign,
  Gavel,
  Package,
  ShieldCheck,
  ShoppingCart,
  Store,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

interface MetricCardProps {
  label: string
  value: string
  description: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: typeof Users
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

interface HealthItemProps {
  label: string
  value: string
  status: 'healthy' | 'warning' | 'critical'
  description: string
}

function HealthItem({
  label,
  value,
  status,
  description,
}: HealthItemProps) {
  const statusStyles = {
    healthy: {
      dot: 'bg-emerald-500',
      text: 'text-emerald-700',
      badge: 'bg-emerald-500/10',
    },
    warning: {
      dot: 'bg-amber-500',
      text: 'text-amber-700',
      badge: 'bg-amber-500/10',
    },
    critical: {
      dot: 'bg-red-500',
      text: 'text-red-600',
      badge: 'bg-red-500/10',
    },
  }

  const styles = statusStyles[status]

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-line p-4">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${styles.dot}`}
        />

        <div className="min-w-0">
          <p className="text-sm font-medium text-ink">
            {label}
          </p>

          <p className="mt-0.5 truncate text-xs text-ink/40">
            {description}
          </p>
        </div>
      </div>

      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge} ${styles.text}`}
      >
        {value}
      </span>
    </div>
  )
}

export function Overview() {
  const platformMetrics = [
    {
      label: 'Total Users',
      value: '8,426',
      description: 'Registered platform users',
      change: '+12.8% this month',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      label: 'Active Projects',
      value: '1,284',
      description: 'Projects currently in progress',
      change: '+8.4%',
      changeType: 'positive' as const,
      icon: BriefcaseBusiness,
    },
    {
      label: 'Marketplace GMV',
      value: '₦126.8M',
      description: 'Marketplace transaction volume',
      change: '+24.6%',
      changeType: 'positive' as const,
      icon: Store,
    },
    {
      label: 'Escrow Volume',
      value: '₦184.2M',
      description: 'Funds managed through escrow',
      change: '+16.4%',
      changeType: 'positive' as const,
      icon: Wallet,
    },
  ]

  const operationalMetrics = [
    {
      label: 'Verified Users',
      value: '6,982',
      description: 'Users with completed verification',
      icon: ShieldCheck,
    },
    {
      label: 'Pending Verification',
      value: '247',
      description: 'Applications awaiting review',
      icon: Clock3,
    },
    {
      label: 'Procurement Volume',
      value: '₦72.4M',
      description: 'Current procurement activity',
      icon: ShoppingCart,
    },
    {
      label: 'Active Disputes',
      value: '34',
      description: 'Cases requiring resolution',
      icon: Gavel,
    },
  ]

  const projectPipeline = [
    {
      label: 'Draft',
      count: 184,
      percentage: 14,
    },
    {
      label: 'Under Review',
      count: 126,
      percentage: 10,
    },
    {
      label: 'Contracting',
      count: 218,
      percentage: 17,
    },
    {
      label: 'In Progress',
      count: 584,
      percentage: 45,
    },
    {
      label: 'Handover',
      count: 172,
      percentage: 14,
    },
  ]

  const alerts = [
    {
      title: 'Pending verification queue is elevated',
      description:
        '247 user verification submissions are awaiting administrative review.',
      severity: 'warning',
    },
    {
      title: '34 active disputes require attention',
      description:
        'Affected payment lines remain frozen until resolution.',
      severity: 'critical',
    },
    {
      title: 'Escrow release queue is within normal range',
      description:
        'Current pending release volume is ₦9.8M.',
      severity: 'healthy',
    },
  ]

  const recentActivity = [
    {
      title: 'Milestone payment released',
      description: 'Maitama Duplex Construction',
      amount: '₦4.85M',
      time: '18 min ago',
      type: 'payment',
    },
    {
      title: 'New project submitted',
      description: 'Residential development — Gwarinpa',
      amount: '₦18.2M',
      time: '42 min ago',
      type: 'project',
    },
    {
      title: 'Vendor verified',
      description: 'BuildMart Supplies',
      amount: 'Verified',
      time: '1 hr ago',
      type: 'verification',
    },
    {
      title: 'Procurement order accepted',
      description: 'Cement & structural steel',
      amount: '₦2.46M',
      time: '2 hrs ago',
      type: 'procurement',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <BarChart3 className="h-5 w-5 text-ink/70" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Platform Intelligence
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Analytics Overview
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            A real-time view of Build OS activity across users, projects,
            marketplace transactions, escrow, procurement and operational
            risk.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-medium text-ink/60">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Platform operational
        </div>
      </div>

      {/* Core KPIs */}
      <section>
        <div className="mb-3">
          <h2 className="font-display text-base font-semibold text-ink">
            Platform overview
          </h2>

          <p className="mt-0.5 text-xs text-ink/40">
            Core business and platform KPIs
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {platformMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              {...metric}
            />
          ))}
        </div>
      </section>

      {/* Operational KPIs */}
      <section>
        <div className="mb-3">
          <h2 className="font-display text-base font-semibold text-ink">
            Operational position
          </h2>

          <p className="mt-0.5 text-xs text-ink/40">
            Verification, procurement and dispute activity
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {operationalMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              description={metric.description}
              icon={metric.icon}
            />
          ))}
        </div>
      </section>

      {/* Project pipeline + health */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Project ecosystem
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Project pipeline
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Distribution of active projects by lifecycle stage
              </p>
            </div>

            <BriefcaseBusiness className="h-5 w-5 text-ink/45" />
          </div>

          <div className="mt-8">
            <div className="flex h-8 overflow-hidden rounded-lg bg-ink/5">
              {projectPipeline.map((stage) => (
                <div
                  key={stage.label}
                  className="h-full border-r border-paper"
                  style={{
                    width: `${stage.percentage}%`,
                  }}
                  title={`${stage.label}: ${stage.count}`}
                >
                  <div className="h-full bg-ink/80" />
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {projectPipeline.map((stage) => (
                <div key={stage.label}>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-ink/50" />

                    <span className="text-xs text-ink/45">
                      {stage.label}
                    </span>
                  </div>

                  <p className="mt-2 font-display text-xl font-semibold text-ink">
                    {stage.count}
                  </p>

                  <p className="mt-0.5 text-[10px] text-ink/35">
                    {stage.percentage}% of projects
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              System health
            </p>

            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Operational status
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            <HealthItem
              label="Escrow Engine"
              value="Healthy"
              status="healthy"
              description="Payment processing operating normally"
            />

            <HealthItem
              label="Verification"
              value="Review"
              status="warning"
              description="Queue above normal operating level"
            />

            <HealthItem
              label="Marketplace"
              value="Healthy"
              status="healthy"
              description="Orders and listings operating normally"
            />

            <HealthItem
              label="Disputes"
              value="Attention"
              status="critical"
              description="34 active cases require action"
            />
          </div>
        </Card>
      </div>

      {/* Financial snapshot */}
      <Card className="p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Financial snapshot
            </p>

            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Platform financial position
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-ink/45">
            <DollarSign className="h-4 w-4" />
            Current reporting period
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl bg-paper-2 p-5">
            <p className="text-xs text-ink/40">
              Total transaction volume
            </p>

            <p className="mt-2 font-display text-2xl font-semibold text-ink">
              ₦248.6M
            </p>

            <p className="mt-1 text-xs font-medium text-emerald-600">
              +22.8%
            </p>
          </div>

          <div className="rounded-xl bg-paper-2 p-5">
            <p className="text-xs text-ink/40">
              Escrow reserved
            </p>

            <p className="mt-2 font-display text-2xl font-semibold text-ink">
              ₦31.6M
            </p>

            <p className="mt-1 text-xs text-ink/40">
              Against active commitments
            </p>
          </div>

          <div className="rounded-xl bg-paper-2 p-5">
            <p className="text-xs text-ink/40">
              Pending releases
            </p>

            <p className="mt-2 font-display text-2xl font-semibold text-ink">
              ₦9.8M
            </p>

            <p className="mt-1 text-xs text-amber-700">
              Awaiting approval
            </p>
          </div>

          <div className="rounded-xl bg-paper-2 p-5">
            <p className="text-xs text-ink/40">
              Frozen funds
            </p>

            <p className="mt-2 font-display text-2xl font-semibold text-ink">
              ₦3.2M
            </p>

            <p className="mt-1 text-xs text-red-500">
              Dispute affected
            </p>
          </div>
        </div>
      </Card>

      {/* Alerts + recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="border-b border-line px-6 py-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-ink/50" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Risk & attention
                </p>

                <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                  Platform alerts
                </h2>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-6">
            {alerts.map((alert) => {
              const styles =
                alert.severity === 'critical'
                  ? 'border-red-500/15 bg-red-500/[0.03]'
                  : alert.severity === 'warning'
                    ? 'border-amber-500/15 bg-amber-500/[0.03]'
                    : 'border-emerald-500/15 bg-emerald-500/[0.03]'

              return (
                <div
                  key={alert.title}
                  className={`rounded-xl border p-4 ${styles}`}
                >
                  <p className="text-sm font-semibold text-ink">
                    {alert.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-ink/45">
                    {alert.description}
                  </p>
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-line px-6 py-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-ink/50" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Platform activity
                </p>

                <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                  Recent activity
                </h2>
              </div>
            </div>
          </div>

          <div className="divide-y divide-line">
            {recentActivity.map((activity) => (
              <div
                key={`${activity.title}-${activity.time}`}
                className="flex items-center gap-3 px-6 py-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                  {activity.type === 'payment' && (
                    <DollarSign className="h-4 w-4 text-ink/55" />
                  )}

                  {activity.type === 'project' && (
                    <BriefcaseBusiness className="h-4 w-4 text-ink/55" />
                  )}

                  {activity.type === 'verification' && (
                    <ShieldCheck className="h-4 w-4 text-ink/55" />
                  )}

                  {activity.type === 'procurement' && (
                    <Package className="h-4 w-4 text-ink/55" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {activity.title}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-ink/40">
                    {activity.description}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs font-semibold text-ink">
                    {activity.amount}
                  </p>

                  <p className="mt-0.5 text-[10px] text-ink/35">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Trust / governance footer */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
              <ShieldCheck className="h-5 w-5 text-ink/60" />
            </div>

            <div>
              <h2 className="font-display text-base font-semibold text-ink">
                Platform governance
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                Administrative actions, verification decisions, escrow
                movements, disputes and financial events are recorded in the
                platform audit trail.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Controls active
          </div>
        </div>
      </Card>
    </div>
  )
}