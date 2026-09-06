import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  DollarSign,
  Download,
  FileText,
  LockKeyhole,
  Receipt,
  RefreshCcw,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

interface MetricCardProps {
  label: string
  value: string
  description: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: typeof DollarSign
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

          <p className="mt-1 text-xs text-ink/40">
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

interface BarProps {
  label: string
  value: number
  amount: string
}

function SpendingBar({ label, value, amount }: BarProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-ink">
          {label}
        </span>

        <span className="text-xs font-semibold text-ink/55">
          {amount}
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
        <div
          className="h-full rounded-full bg-ink"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  )
}

export function FinancialAnalytics() {
  const financialMetrics = [
    {
      label: 'Total Transaction Volume',
      value: '₦248.6M',
      description: 'All platform financial activity',
      change: '+22.8% vs previous period',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      label: 'Escrow Volume',
      value: '₦184.2M',
      description: 'Funds currently managed through escrow',
      change: '+16.4%',
      changeType: 'positive' as const,
      icon: ShieldCheck,
    },
    {
      label: 'Released Payments',
      value: '₦137.8M',
      description: 'Successfully released to recipients',
      change: '+19.7%',
      changeType: 'positive' as const,
      icon: CheckCircle2,
    },
    {
      label: 'Procurement Spend',
      value: '₦72.4M',
      description: 'Materials and supplier payments',
      change: '+11.2%',
      changeType: 'positive' as const,
      icon: Receipt,
    },
  ]

  const escrowMetrics = [
    {
      label: 'Reserved Funds',
      value: '₦31.6M',
      description: 'Funds reserved against milestones',
      icon: LockKeyhole,
    },
    {
      label: 'Pending Releases',
      value: '₦9.8M',
      description: 'Awaiting required approvals',
      icon: Clock3,
    },
    {
      label: 'Frozen Funds',
      value: '₦3.2M',
      description: 'Currently affected by disputes',
      icon: ShieldCheck,
    },
    {
      label: 'Refunds',
      value: '₦1.4M',
      description: 'Funds returned to clients',
      icon: RefreshCcw,
    },
  ]

  const spendingCategories = [
    {
      label: 'Construction materials',
      value: 82,
      amount: '₦34.8M',
    },
    {
      label: 'Labour & workforce',
      value: 64,
      amount: '₦27.1M',
    },
    {
      label: 'Equipment',
      value: 43,
      amount: '₦18.2M',
    },
    {
      label: 'Professional services',
      value: 31,
      amount: '₦13.1M',
    },
    {
      label: 'Logistics & delivery',
      value: 24,
      amount: '₦10.2M',
    },
  ]

  const monthlyActivity = [
    {
      month: 'Mar',
      income: 46,
      spending: 31,
      incomeLabel: '₦46M',
      spendingLabel: '₦31M',
    },
    {
      month: 'Apr',
      income: 58,
      spending: 42,
      incomeLabel: '₦58M',
      spendingLabel: '₦42M',
    },
    {
      month: 'May',
      income: 51,
      spending: 38,
      incomeLabel: '₦51M',
      spendingLabel: '₦38M',
    },
    {
      month: 'Jun',
      income: 68,
      spending: 47,
      incomeLabel: '₦68M',
      spendingLabel: '₦47M',
    },
    {
      month: 'Jul',
      income: 74,
      spending: 53,
      incomeLabel: '₦74M',
      spendingLabel: '₦53M',
    },
    {
      month: 'Aug',
      income: 82,
      spending: 61,
      incomeLabel: '₦82M',
      spendingLabel: '₦61M',
    },
  ]

  const transactions = [
    {
      reference: 'ESC-28491',
      description: 'Maitama Duplex — Milestone 04',
      type: 'Escrow Release',
      amount: '₦4,850,000',
      status: 'Released',
      date: '27 Aug 2026',
    },
    {
      reference: 'PRC-19372',
      description: 'Jabi Commercial — Cement & Steel',
      type: 'Procurement',
      amount: '₦2,460,000',
      status: 'Reserved',
      date: '26 Aug 2026',
    },
    {
      reference: 'ESC-28476',
      description: 'Gwarinpa Residential — Final Milestone',
      type: 'Escrow Release',
      amount: '₦6,200,000',
      status: 'Released',
      date: '25 Aug 2026',
    },
    {
      reference: 'REF-04182',
      description: 'Cancelled procurement request',
      type: 'Refund',
      amount: '₦840,000',
      status: 'Refunded',
      date: '24 Aug 2026',
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
              Financial Intelligence
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Financial Analytics
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Track platform transaction volume, escrow activity, procurement
            spend, releases, refunds and financial risk.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <Download className="h-4 w-4" />
          Export report
        </button>
      </div>

      {/* Main financial metrics */}
      <section>
        <div className="mb-3">
          <h2 className="font-display text-base font-semibold text-ink">
            Financial overview
          </h2>

          <p className="mt-0.5 text-xs text-ink/40">
            Platform-wide financial performance
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {financialMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      {/* Escrow metrics */}
      <section>
        <div className="mb-3">
          <h2 className="font-display text-base font-semibold text-ink">
            Escrow position
          </h2>

          <p className="mt-0.5 text-xs text-ink/40">
            Current wallet, reservation and payment-release position
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {escrowMetrics.map((metric) => (
            <Card key={metric.label} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink/45">
                    {metric.label}
                  </p>

                  <p className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
                    {metric.value}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-ink/40">
                    {metric.description}
                  </p>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                  <metric.icon className="h-4 w-4 text-ink/60" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Trend + spending */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Financial trend
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Transaction activity
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Six-month transaction and spending trend
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-ink/45">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-ink" />
                Inflow
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-ink/20" />
                Spend
              </span>
            </div>
          </div>

          <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
            {monthlyActivity.map((month) => (
              <div
                key={month.month}
                className="flex h-full flex-1 items-end justify-center gap-1.5"
              >
                <div className="flex h-full flex-1 flex-col justify-end">
                  <div
                    className="w-full rounded-t-md bg-ink transition-all"
                    style={{ height: `${month.income}%` }}
                    title={`Inflow: ${month.incomeLabel}`}
                  />
                </div>

                <div className="flex h-full flex-1 flex-col justify-end">
                  <div
                    className="w-full rounded-t-md bg-ink/15 transition-all"
                    style={{ height: `${month.spending}%` }}
                    title={`Spend: ${month.spendingLabel}`}
                  />
                </div>

                <span className="absolute translate-y-8 text-[10px] font-medium text-ink/40">
                  {month.month}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-line pt-4">
            <div>
              <p className="text-xs text-ink/40">Current inflow</p>
              <p className="mt-1 text-sm font-semibold text-ink">
                ₦82.0M
              </p>
            </div>

            <div>
              <p className="text-xs text-ink/40">Current spend</p>
              <p className="mt-1 text-sm font-semibold text-ink">
                ₦61.0M
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-ink/40">Net movement</p>
              <p className="mt-1 flex items-center justify-end gap-1 text-sm font-semibold text-emerald-600">
                <TrendingUp className="h-3.5 w-3.5" />
                ₦21.0M
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Procurement
            </p>

            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Spend distribution
            </h2>

            <p className="mt-1 text-xs text-ink/40">
              Current procurement allocation
            </p>
          </div>

          <div className="mt-7 space-y-5">
            {spendingCategories.map((category) => (
              <SpendingBar
                key={category.label}
                {...category}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Payment health */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>

          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-ink/40">
            Successful releases
          </p>

          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            96.8%
          </p>

          <p className="mt-2 text-xs leading-5 text-ink/40">
            Payments released successfully after evidence and approval
            requirements were satisfied.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
            <Clock3 className="h-5 w-5 text-amber-700" />
          </div>

          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-ink/40">
            Average release time
          </p>

          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            18.4 hrs
          </p>

          <p className="mt-2 text-xs leading-5 text-ink/40">
            Average time from complete payment evidence to approved release.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
            <Wallet className="h-5 w-5 text-ink/60" />
          </div>

          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-ink/40">
            Escrow utilisation
          </p>

          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            74.2%
          </p>

          <p className="mt-2 text-xs leading-5 text-ink/40">
            Percentage of available escrow funds currently reserved against
            active commitments.
          </p>
        </Card>
      </div>

      {/* Recent transactions */}
      <Card className="overflow-hidden">
        <div className="flex flex-col justify-between gap-3 border-b border-line px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Financial activity
            </p>

            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Recent transactions
            </h2>
          </div>

          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 text-xs font-semibold text-ink/55 transition-colors hover:text-ink"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="divide-y divide-line">
          {transactions.map((transaction) => (
            <div
              key={transaction.reference}
              className="px-6 py-5 transition-colors hover:bg-ink/[0.02]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                    <FileText className="h-4 w-4 text-ink/55" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {transaction.description}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink/40">
                      <span>{transaction.reference}</span>
                      <span>•</span>
                      <span>{transaction.type}</span>
                      <span>•</span>
                      <span>{transaction.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-5 sm:justify-end">
                  <p className="text-sm font-semibold text-ink">
                    {transaction.amount}
                  </p>

                  <span
                    className={
                      transaction.status === 'Released' ||
                      transaction.status === 'Refunded'
                        ? 'rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700'
                        : 'rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-700'
                    }
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Financial controls */}
      <Card className="p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
              <ShieldCheck className="h-5 w-5 text-ink/60" />
            </div>

            <div>
              <h2 className="font-display text-base font-semibold text-ink">
                Financial controls active
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                Escrow movements are subject to evidence validation, approval
                chains, dispute freezes and audit logging before funds are
                released.
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            System healthy
          </div>
        </div>
      </Card>
    </div>
  )
}