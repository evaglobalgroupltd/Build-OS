import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DollarSign,
  Gavel,
  Package,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
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
      glow: 'group-hover:border-[#B85C12]/20',
    },
    green: {
      icon: 'bg-[#173629]/10 text-[#173629]',
      glow: 'group-hover:border-[#173629]/20',
    },
    ink: {
      icon: 'bg-ink/5 text-ink/60',
      glow: 'group-hover:border-ink/15',
    },
  }

  const styles = accentStyles[accent]

  return (
    <Card
      className={`group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(23,54,41,0.08)] ${styles.glow}`}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-ink/[0.025] blur-2xl transition-transform duration-500 group-hover:scale-150" />

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
      border: 'border-emerald-500/10',
    },
    warning: {
      dot: 'bg-amber-500',
      text: 'text-amber-700',
      badge: 'bg-amber-500/10',
      border: 'border-amber-500/10',
    },
    critical: {
      dot: 'bg-red-500',
      text: 'text-red-600',
      badge: 'bg-red-500/10',
      border: 'border-red-500/10',
    },
  }

  const styles = statusStyles[status]

  return (
    <div
      className={`group flex items-center justify-between gap-4 rounded-2xl border bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(23,54,41,0.06)] ${styles.border}`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${styles.dot} shadow-[0_0_0_4px_rgba(16,185,129,0.06)]`}
        />

        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">
            {label}
          </p>

          <p className="mt-0.5 truncate text-xs text-ink/40">
            {description}
          </p>
        </div>
      </div>

      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${styles.badge} ${styles.text}`}
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
      accent: 'green' as const,
    },
    {
      label: 'Active Projects',
      value: '1,284',
      description: 'Projects currently in progress',
      change: '+8.4%',
      changeType: 'positive' as const,
      icon: BriefcaseBusiness,
      accent: 'copper' as const,
    },
    {
      label: 'Marketplace GMV',
      value: '₦126.8M',
      description: 'Marketplace transaction volume',
      change: '+24.6%',
      changeType: 'positive' as const,
      icon: Store,
      accent: 'copper' as const,
    },
    {
      label: 'Escrow Volume',
      value: '₦184.2M',
      description: 'Funds managed through escrow',
      change: '+16.4%',
      changeType: 'positive' as const,
      icon: Wallet,
      accent: 'green' as const,
    },
  ]

  const operationalMetrics = [
    {
      label: 'Verified Users',
      value: '6,982',
      description: 'Users with completed verification',
      icon: ShieldCheck,
      accent: 'green' as const,
    },
    {
      label: 'Pending Verification',
      value: '247',
      description: 'Applications awaiting review',
      icon: Clock3,
      accent: 'copper' as const,
    },
    {
      label: 'Procurement Volume',
      value: '₦72.4M',
      description: 'Current procurement activity',
      icon: ShoppingCart,
      accent: 'green' as const,
    },
    {
      label: 'Active Disputes',
      value: '34',
      description: 'Cases requiring resolution',
      icon: Gavel,
      accent: 'ink' as const,
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
    <div className="space-y-8">
      {/* Executive Hero */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#173629] px-6 py-7 text-white shadow-[0_24px_70px_rgba(23,54,41,0.16)] sm:px-8 sm:py-9">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#B85C12]/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07]">
                <BarChart3 className="h-4 w-4 text-[#D88A4B]" />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Platform Intelligence
              </span>
            </div>

            <h1 className="mt-5 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[42px] lg:leading-[1.05]">
              The operating picture of{' '}
              <span className="text-[#D88A4B]">Build OS.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">
              A live executive view across users, projects, marketplace
              transactions, escrow, procurement and operational risk.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-2 text-xs font-medium text-white/70 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
              Platform operational
            </div>

            <div className="flex items-center gap-5 pt-1">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/35">
                  Users
                </p>
                <p className="mt-1 font-display text-xl font-semibold">
                  8,426
                </p>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/35">
                  Projects
                </p>
                <p className="mt-1 font-display text-xl font-semibold">
                  1,284
                </p>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/35">
                  GMV
                </p>
                <p className="mt-1 font-display text-xl font-semibold">
                  ₦126.8M
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core KPIs */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
              Executive metrics
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold text-ink">
              Platform overview
            </h2>

            <p className="mt-1 text-xs text-ink/40">
              Core business and platform KPIs
            </p>
          </div>

          <Sparkles className="hidden h-4 w-4 text-[#B85C12]/60 sm:block" />
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
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
            Operating layer
          </p>

          <h2 className="mt-1 font-display text-xl font-semibold text-ink">
            Operational position
          </h2>

          <p className="mt-1 text-xs text-ink/40">
            Verification, procurement and dispute activity
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {operationalMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              {...metric}
            />
          ))}
        </div>
      </section>

      {/* Pipeline + System Health */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden p-0 lg:col-span-2">
          <div className="border-b border-ink/[0.06] px-6 py-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
                  Project ecosystem
                </p>

                <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                  Project pipeline
                </h2>

                <p className="mt-1 text-xs text-ink/40">
                  Distribution of active projects by lifecycle stage
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173629]/[0.06]">
                <BriefcaseBusiness className="h-4 w-4 text-[#173629]/70" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex h-10 overflow-hidden rounded-xl bg-ink/[0.04] p-1">
              {projectPipeline.map((stage, index) => (
                <div
                  key={stage.label}
                  className="h-full overflow-hidden first:rounded-l-lg last:rounded-r-lg"
                  style={{
                    width: `${stage.percentage}%`,
                  }}
                  title={`${stage.label}: ${stage.count}`}
                >
                  <div
                    className={`h-full ${
                      index === 0
                        ? 'bg-ink/30'
                        : index === 1
                          ? 'bg-ink/40'
                          : index === 2
                            ? 'bg-[#B85C12]/60'
                            : index === 3
                              ? 'bg-[#173629]'
                              : 'bg-[#D88A4B]'
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
              {projectPipeline.map((stage, index) => (
                <div
                  key={stage.label}
                  className="group rounded-2xl border border-transparent p-3 transition hover:border-ink/[0.06] hover:bg-paper-2"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        index === 3
                          ? 'bg-[#173629]'
                          : index === 4
                            ? 'bg-[#D88A4B]'
                            : 'bg-ink/30'
                      }`}
                    />

                    <span className="text-[10px] font-medium uppercase tracking-wide text-ink/40">
                      {stage.label}
                    </span>
                  </div>

                  <p className="mt-3 font-display text-2xl font-semibold text-ink">
                    {stage.count}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-ink/35">
                      Share
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

        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
                System health
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                Operational status
              </h2>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
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

      {/* Financial Command */}
      <section className="relative overflow-hidden rounded-[26px] bg-[#17251D] p-6 text-white sm:p-7">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#B85C12]/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D88A4B]">
              Financial command
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold">
              Platform financial position
            </h2>

            <p className="mt-1 text-xs text-white/40">
              Current reporting period
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/40">
            <DollarSign className="h-4 w-4 text-[#D88A4B]" />
            Live financial snapshot
          </div>
        </div>

        <div className="relative mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.045] p-5">
            <p className="text-xs text-white/40">
              Total transaction volume
            </p>

            <p className="mt-2 font-display text-2xl font-semibold">
              ₦248.6M
            </p>

            <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +22.8%
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.045] p-5">
            <p className="text-xs text-white/40">
              Escrow reserved
            </p>

            <p className="mt-2 font-display text-2xl font-semibold">
              ₦31.6M
            </p>

            <p className="mt-2 text-xs text-white/35">
              Against active commitments
            </p>
          </div>

          <div className="rounded-2xl border border-[#D88A4B]/20 bg-[#B85C12]/[0.08] p-5">
            <p className="text-xs text-white/40">
              Pending releases
            </p>

            <p className="mt-2 font-display text-2xl font-semibold">
              ₦9.8M
            </p>

            <p className="mt-2 text-xs font-medium text-[#D88A4B]">
              Awaiting approval
            </p>
          </div>

          <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.04] p-5">
            <p className="text-xs text-white/40">
              Frozen funds
            </p>

            <p className="mt-2 font-display text-2xl font-semibold">
              ₦3.2M
            </p>

            <p className="mt-2 text-xs font-medium text-red-300">
              Dispute affected
            </p>
          </div>
        </div>
      </section>

      {/* Alerts + Activity */}
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
                    Risk & attention
                  </p>

                  <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                    Platform alerts
                  </h2>
                </div>
              </div>

              <span className="rounded-full bg-ink/[0.04] px-2.5 py-1 text-[10px] font-semibold text-ink/45">
                3 signals
              </span>
            </div>
          </div>

          <div className="space-y-3 p-6">
            {alerts.map((alert) => {
              const styles =
                alert.severity === 'critical'
                  ? 'border-red-500/15 bg-red-500/[0.025]'
                  : alert.severity === 'warning'
                    ? 'border-amber-500/15 bg-amber-500/[0.025]'
                    : 'border-emerald-500/15 bg-emerald-500/[0.025]'

              const dot =
                alert.severity === 'critical'
                  ? 'bg-red-500'
                  : alert.severity === 'warning'
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'

              return (
                <div
                  key={alert.title}
                  className={`group rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(23,54,41,0.06)] ${styles}`}
                >
                  <div className="flex gap-3">
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot}`}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-ink">
                        {alert.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-ink/45">
                        {alert.description}
                      </p>
                    </div>

                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-ink/20 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-ink/[0.06] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#173629]/[0.07]">
                <TrendingUp className="h-4 w-4 text-[#173629]" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                  Platform activity
                </p>

                <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                  Recent activity
                </h2>
              </div>
            </div>
          </div>

          <div className="divide-y divide-ink/[0.06]">
            {recentActivity.map((activity) => (
              <div
                key={`${activity.title}-${activity.time}`}
                className="group flex items-center gap-3 px-6 py-4 transition-colors hover:bg-paper-2"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/[0.04] transition-colors group-hover:bg-[#173629]/[0.07]">
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
                  <p className="truncate text-sm font-semibold text-ink">
                    {activity.title}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-ink/40">
                    {activity.description}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs font-bold text-ink">
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

      {/* Governance */}
      <section className="relative overflow-hidden rounded-[24px] border border-[#173629]/10 bg-white p-6 shadow-[0_12px_40px_rgba(23,54,41,0.05)] sm:p-7">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#B85C12]/[0.04] blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#173629]/[0.07]">
              <ShieldCheck className="h-5 w-5 text-[#173629]" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
                Governance layer
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Platform governance
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                Administrative actions, verification decisions, escrow
                movements, disputes and financial events are recorded in the
                platform audit trail.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Controls active
          </div>
        </div>
      </section>
    </div>
  )
}