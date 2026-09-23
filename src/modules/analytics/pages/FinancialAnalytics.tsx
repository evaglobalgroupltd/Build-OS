import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DollarSign,
  Download,
  FileText,
  LockKeyhole,
  Receipt,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
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
      glow: 'from-[#B85C12]/[0.08]',
    },
    green: {
      icon: 'bg-[#173629]/10 text-[#173629]',
      glow: 'from-[#173629]/[0.07]',
    },
    ink: {
      icon: 'bg-ink/5 text-ink/60',
      glow: 'from-ink/[0.04]',
    },
  }

  return (
    <Card className="group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(23,54,41,0.08)]">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentStyles[accent].glow} via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
            {label}
          </p>

          <p className="mt-2 font-display text-[26px] font-semibold tracking-tight text-ink">
            {value}
          </p>

          <p className="mt-1 max-w-[220px] text-xs leading-5 text-ink/40">
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
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${accentStyles[accent].icon}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  )
}

interface SpendingBarProps {
  label: string
  value: number
  amount: string
}

function SpendingBar({ label, value, amount }: SpendingBarProps) {
  return (
    <div className="group">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-ink">{label}</span>

        <span className="text-xs font-semibold text-ink/55">{amount}</span>
      </div>

      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-ink/[0.06]">
        <div
          className="h-full rounded-full bg-[#B85C12] transition-all duration-500 group-hover:bg-[#D88A4B]"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>

      <div className="mt-1 flex justify-end">
        <span className="text-[10px] font-medium text-ink/30">{value}%</span>
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
      accent: 'copper' as const,
    },
    {
      label: 'Escrow Volume',
      value: '₦184.2M',
      description: 'Funds currently managed through escrow',
      change: '+16.4%',
      changeType: 'positive' as const,
      icon: ShieldCheck,
      accent: 'green' as const,
    },
    {
      label: 'Released Payments',
      value: '₦137.8M',
      description: 'Successfully released to recipients',
      change: '+19.7%',
      changeType: 'positive' as const,
      icon: CheckCircle2,
      accent: 'green' as const,
    },
    {
      label: 'Procurement Spend',
      value: '₦72.4M',
      description: 'Materials and supplier payments',
      change: '+11.2%',
      changeType: 'positive' as const,
      icon: Receipt,
      accent: 'copper' as const,
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
    <div className="space-y-8">
      {/* =========================================================
          EXECUTIVE HERO
      ========================================================= */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#173629] px-6 py-8 text-white shadow-[0_24px_70px_rgba(23,54,41,0.16)] sm:px-8 lg:px-10 lg:py-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#B85C12]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-white/[0.04] blur-3xl" />

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07]">
                <BarChart3 className="h-5 w-5 text-[#D88A4B]" />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Financial Intelligence
              </span>
            </div>

            <h1 className="mt-5 max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[42px] lg:leading-[1.08]">
              Financial command,
              <br />
              <span className="text-[#D88A4B]">without the noise.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55 sm:text-[15px]">
              Track transaction volume, escrow positions, procurement spend,
              releases, refunds and financial risk across the Build OS
              ecosystem.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
            <div className="flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.08] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-200">
                Financial systems healthy
              </span>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.12]"
            >
              <Download className="h-4 w-4" />
              Export report
            </button>
          </div>
        </div>

        <div className="relative mt-9 grid gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Platform volume
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-white">
              ₦248.6M
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Escrow managed
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-white">
              ₦184.2M
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Current net movement
            </p>
            <p className="mt-1 flex items-center gap-1.5 font-display text-xl font-semibold text-[#D88A4B]">
              <TrendingUp className="h-4 w-4" />
              ₦21.0M
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINANCIAL OVERVIEW
      ========================================================= */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
              Financial overview
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
              Capital moving through the platform
            </h2>

            <p className="mt-1 text-xs text-ink/40">
              Platform-wide financial performance
            </p>
          </div>

          <div className="hidden items-center gap-2 text-xs font-medium text-ink/35 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Positive movement across core indicators
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {financialMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      {/* =========================================================
          ESCROW POSITION
      ========================================================= */}
      <section>
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
            Escrow intelligence
          </p>

          <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
            Funds under active control
          </h2>

          <p className="mt-1 text-xs text-ink/40">
            Current wallet, reservation and payment-release position
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {escrowMetrics.map((metric, index) => (
            <Card
              key={metric.label}
              className="group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(23,54,41,0.07)]"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#B85C12]/[0.035] blur-2xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40">
                    {metric.label}
                  </p>

                  <p className="mt-2 font-display text-[25px] font-semibold tracking-tight text-ink">
                    {metric.value}
                  </p>

                  <p className="mt-1 max-w-[200px] text-xs leading-5 text-ink/40">
                    {metric.description}
                  </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#173629]/[0.06]">
                  <metric.icon className="h-4.5 w-4.5 text-[#173629]/65" />
                </div>
              </div>

              <div className="relative mt-5 flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/25">
                  Position 0{index + 1}
                </span>
                <div className="h-px flex-1 bg-ink/[0.06]" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================
          TREND + SPENDING
      ========================================================= */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden p-0 lg:col-span-2">
          <div className="flex flex-col justify-between gap-4 border-b border-line px-6 py-6 sm:flex-row sm:items-start sm:px-7">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#B85C12]">
                Financial trend
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
                Transaction activity
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Six-month transaction and spending trend
              </p>
            </div>

            <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#173629]" />
                Inflow
              </span>

              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#D8CFC4]" />
                Spend
              </span>
            </div>
          </div>

          <div className="px-6 pb-6 pt-8 sm:px-7">
            <div className="relative flex h-64 items-end gap-3 sm:gap-5">
              <div className="pointer-events-none absolute inset-x-0 top-0 space-y-[51px]">
                <div className="border-t border-dashed border-ink/[0.06]" />
                <div className="border-t border-dashed border-ink/[0.06]" />
                <div className="border-t border-dashed border-ink/[0.06]" />
                <div className="border-t border-dashed border-ink/[0.06]" />
              </div>

              {monthlyActivity.map((month) => (
                <div
                  key={month.month}
                  className="relative flex h-full flex-1 items-end justify-center gap-1.5 sm:gap-2"
                >
                  <div className="flex h-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-xl bg-[#173629] transition-all duration-500 hover:bg-[#234b39]"
                      style={{ height: `${month.income}%` }}
                      title={`Inflow: ${month.incomeLabel}`}
                    />
                  </div>

                  <div className="flex h-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-xl bg-[#D8CFC4] transition-all duration-500 hover:bg-[#CBBEAF]"
                      style={{ height: `${month.spending}%` }}
                      title={`Spend: ${month.spendingLabel}`}
                    />
                  </div>

                  <span className="absolute -bottom-7 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink/35">
                    {month.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-3 divide-x divide-line border-t border-line pt-5">
              <div className="pr-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                  Current inflow
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-ink">
                  ₦82.0M
                </p>
              </div>

              <div className="px-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                  Current spend
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-ink">
                  ₦61.0M
                </p>
              </div>

              <div className="pl-4 text-right">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                  Net movement
                </p>
                <p className="mt-1 flex items-center justify-end gap-1 font-display text-lg font-semibold text-emerald-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  ₦21.0M
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-7">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#B85C12]">
              Procurement
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
              Spend distribution
            </h2>

            <p className="mt-1 text-xs text-ink/40">
              Current procurement allocation
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {spendingCategories.map((category) => (
              <SpendingBar key={category.label} {...category} />
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-line pt-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/30">
              Primary allocation
            </span>

            <span className="text-xs font-semibold text-ink">
              Construction materials
            </span>
          </div>
        </Card>
      </div>

      {/* =========================================================
          PAYMENT HEALTH
      ========================================================= */}
      <section>
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
            Payment health
          </p>

          <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
            Operational efficiency
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-0.5">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-500/[0.05] blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>

                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-emerald-700">
                  Healthy
                </span>
              </div>

              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/35">
                Successful releases
              </p>

              <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
                96.8%
              </p>

              <p className="mt-2 text-xs leading-5 text-ink/40">
                Payments released successfully after evidence and approval
                requirements were satisfied.
              </p>
            </div>
          </Card>

          <Card className="group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-0.5">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#B85C12]/[0.05] blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#B85C12]/10">
                  <Clock3 className="h-5 w-5 text-[#B85C12]" />
                </div>

                <span className="rounded-full bg-[#B85C12]/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#B85C12]">
                  Efficient
                </span>
              </div>

              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/35">
                Average release time
              </p>

              <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
                18.4 hrs
              </p>

              <p className="mt-2 text-xs leading-5 text-ink/40">
                Average time from complete payment evidence to approved
                release.
              </p>
            </div>
          </Card>

          <Card className="group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-0.5">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#173629]/[0.05] blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#173629]/[0.07]">
                  <Wallet className="h-5 w-5 text-[#173629]/70" />
                </div>

                <span className="rounded-full bg-[#173629]/[0.07] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#173629]">
                  Active
                </span>
              </div>

              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/35">
                Escrow utilisation
              </p>

              <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
                74.2%
              </p>

              <p className="mt-2 text-xs leading-5 text-ink/40">
                Percentage of available escrow funds currently reserved
                against active commitments.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* =========================================================
          RECENT TRANSACTIONS
      ========================================================= */}
      <Card className="overflow-hidden">
        <div className="flex flex-col justify-between gap-4 border-b border-line px-6 py-6 sm:flex-row sm:items-center sm:px-7">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#173629]/[0.06]">
                <Receipt className="h-4 w-4 text-[#173629]/70" />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#B85C12]">
                Financial activity
              </p>
            </div>

            <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
              Recent transactions
            </h2>

            <p className="mt-1 text-xs text-ink/40">
              Latest movements across escrow, procurement and refunds
            </p>
          </div>

          <button
            type="button"
            className="group inline-flex w-fit items-center gap-2 rounded-xl border border-line px-3.5 py-2 text-xs font-semibold text-ink/55 transition-all hover:border-ink/10 hover:bg-ink/[0.03] hover:text-ink"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="divide-y divide-line">
          {transactions.map((transaction, index) => (
            <div
              key={transaction.reference}
              className="group px-6 py-5 transition-colors hover:bg-[#173629]/[0.018] sm:px-7"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/[0.045] text-xs font-semibold text-ink/30 transition-colors group-hover:bg-[#173629]/[0.07] group-hover:text-[#173629]">
                    0{index + 1}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {transaction.description}
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.08em] text-ink/35">
                      <span>{transaction.reference}</span>
                      <span>•</span>
                      <span>{transaction.type}</span>
                      <span>•</span>
                      <span>{transaction.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-5 sm:justify-end">
                  <div className="text-left sm:text-right">
                    <p className="font-display text-base font-semibold text-ink">
                      {transaction.amount}
                    </p>

                    <p className="mt-0.5 text-[10px] text-ink/30">
                      Transaction value
                    </p>
                  </div>

                  <span
                    className={
                      transaction.status === 'Released' ||
                      transaction.status === 'Refunded'
                        ? 'rounded-full bg-emerald-500/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-emerald-700'
                        : 'rounded-full bg-[#B85C12]/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#B85C12]'
                    }
                  >
                    {transaction.status}
                  </span>

                  <div className="hidden h-8 w-8 items-center justify-center rounded-full border border-line text-ink/30 transition-all group-hover:border-ink/10 group-hover:text-ink/70 sm:flex">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* =========================================================
          FINANCIAL CONTROLS
      ========================================================= */}
      <section className="relative overflow-hidden rounded-[24px] bg-[#17251D] px-6 py-6 text-white shadow-[0_18px_55px_rgba(23,54,41,0.12)] sm:px-7">
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#B85C12]/15 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
              <ShieldCheck className="h-5 w-5 text-[#D88A4B]" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-base font-semibold text-white">
                  Financial controls active
                </h2>

                <span className="rounded-full border border-emerald-300/10 bg-emerald-300/[0.07] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-emerald-200">
                  System healthy
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-xs leading-5 text-white/45">
                Escrow movements are subject to evidence validation, approval
                chains, dispute freezes and audit logging before funds are
                released.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-xs font-semibold text-white/40">
            <Sparkles className="h-4 w-4 text-[#D88A4B]" />
            Protected financial workflow
          </div>
        </div>
      </section>

      {/* =========================================================
          EXECUTIVE INSIGHT
      ========================================================= */}
      <Card className="overflow-hidden border-[#B85C12]/10 bg-[#B85C12]/[0.025] p-0">
        <div className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#B85C12]/10">
              <TrendingUp className="h-5 w-5 text-[#B85C12]" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#B85C12]">
                Executive signal
              </p>

              <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                Capital velocity remains positive.
              </h3>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                Current inflow of ₦82.0M is ahead of spend at ₦61.0M, producing
                a net movement of ₦21.0M for the latest reporting period.
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-xl bg-white px-4 py-3 shadow-sm">
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
              Latest movement
            </p>
            <p className="mt-0.5 font-display text-lg font-semibold text-[#173629]">
              +₦21.0M
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}