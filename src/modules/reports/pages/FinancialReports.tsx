import {
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  Banknote,
  ChevronRight,
  Download,
  Landmark,
  Receipt,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const financialSummary = [
  {
    label: 'Escrow Balance',
    value: '₦2.84B',
    detail: 'Funds currently secured',
    icon: Wallet,
    tone: 'teal',
  },
  {
    label: 'Funds Released',
    value: '₦1.26B',
    detail: 'Approved project releases',
    icon: ArrowUpCircle,
    tone: 'ink',
  },
  {
    label: 'Procurement Spend',
    value: '₦847M',
    detail: 'Materials & supply costs',
    icon: Receipt,
    tone: 'amber',
  },
  {
    label: 'Refunds',
    value: '₦42M',
    detail: 'Processed to date',
    icon: ArrowDownCircle,
    tone: 'brick',
  },
] as const

const walletBreakdown = [
  {
    wallet: 'Material Wallet',
    amount: '₦940M',
    share: '49%',
  },
  {
    wallet: 'Labour Wallet',
    amount: '₦620M',
    share: '32%',
  },
  {
    wallet: 'Professional Wallet',
    amount: '₦180M',
    share: '9%',
  },
  {
    wallet: 'Monitoring Wallet',
    amount: '₦74M',
    share: '4%',
  },
  {
    wallet: 'Contingency Wallet',
    amount: '₦95M',
    share: '5%',
  },
]

const recentTransactions = [
  {
    reference: 'ESC-2026-00014',
    description: 'Foundation milestone payment',
    amount: '₦12,500,000',
    status: 'Released',
    date: '24 Aug 2026',
  },
  {
    reference: 'ESC-2026-00013',
    description: 'Material procurement reservation',
    amount: '₦8,200,000',
    status: 'Reserved',
    date: '24 Aug 2026',
  },
  {
    reference: 'ESC-2026-00012',
    description: 'Supplier delivery payment',
    amount: '₦4,850,000',
    status: 'Released',
    date: '23 Aug 2026',
  },
  {
    reference: 'ESC-2026-00011',
    description: 'Disputed payment',
    amount: '₦2,300,000',
    status: 'Frozen',
    date: '22 Aug 2026',
  },
]

const transactionStatusStyles = {
  Released: {
    badge: 'bg-[#EAF4EE] text-[#12613E]',
    dot: 'bg-[#12613E]',
  },
  Reserved: {
    badge: 'bg-[#F8EEE6] text-[#B85C12]',
    dot: 'bg-[#B85C12]',
  },
  Frozen: {
    badge: 'bg-brick-light/50 text-brick',
    dot: 'bg-brick',
  },
} as const

const summaryToneStyles = {
  teal: {
    icon: 'bg-[#EAF4EE] text-[#12613E]',
    value: 'text-[#12613E]',
  },
  ink: {
    icon: 'bg-ink/[0.05] text-ink/60',
    value: 'text-ink',
  },
  amber: {
    icon: 'bg-[#F8EEE6] text-[#B85C12]',
    value: 'text-[#B85C12]',
  },
  brick: {
    icon: 'bg-brick-light/50 text-brick',
    value: 'text-brick',
  },
} as const

export function FinancialReports() {
  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                              */}
      {/* ------------------------------------------------------------------ */}

      <Card className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#12613E]/[0.045] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-[#B85C12]/[0.025] blur-3xl" />

        <CardBody className="relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/45">
                  Treasury & escrow control
                </span>
              </div>

              <h1 className="font-display text-[30px] font-semibold tracking-[-0.035em] text-ink sm:text-[34px]">
                Financial Reports
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-ink/50">
                Monitor secured funds, project expenditure, escrow releases,
                procurement commitments and financial reconciliation across
                Build OS.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:border-ink/15 hover:bg-paper-2"
              >
                <Landmark className="h-4 w-4 text-ink/50" />
                Reconciliation
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(20,40,30,0.14)] transition hover:-translate-y-0.5 hover:bg-[#24372D]"
              >
                <Download className="h-4 w-4" />
                Export Report
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Financial Summary                                                   */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {financialSummary.map((item) => {
          const Icon = item.icon
          const tone = summaryToneStyles[item.tone]

          return (
            <Card
              key={item.label}
              className="group transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(20,40,30,0.07)]"
            >
              <CardBody>
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] ${tone.icon}`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </div>

                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ink/10 transition group-hover:bg-[#12613E]/50" />
                </div>

                <div className="mt-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink/40">
                    {item.label}
                  </p>

                  <h3
                    className={`mt-1 font-display text-[27px] font-semibold tracking-[-0.035em] tabular-nums ${tone.value}`}
                  >
                    {item.value}
                  </h3>

                  <p className="mt-1 text-xs text-ink/40">
                    {item.detail}
                  </p>
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Transactions + Wallets                                              */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader
              title="Recent Financial Activity"
              subtitle="Escrow releases, reservations, refunds and payment actions"
            />

            <CardBody className="pt-0">
              <div className="divide-y divide-line">
                {recentTransactions.map((transaction) => {
                  const status =
                    transactionStatusStyles[
                      transaction.status as keyof typeof transactionStatusStyles
                    ]

                  return (
                    <div
                      key={transaction.reference}
                      className="group flex flex-col gap-4 py-4 first:pt-1 last:pb-1 lg:flex-row lg:items-center lg:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-3.5">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] ${status.badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-ink">
                            {transaction.description}
                          </h3>

                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="font-mono text-[10px] tracking-wide text-ink/35">
                              {transaction.reference}
                            </span>

                            <span className="hidden h-1 w-1 rounded-full bg-ink/15 sm:block" />

                            <span className="text-[11px] text-ink/40">
                              {transaction.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-5 pl-[54px] lg:justify-end lg:pl-0">
                        <div className="text-right">
                          <p className="font-display text-[15px] font-semibold tabular-nums text-ink">
                            {transaction.amount}
                          </p>

                          <span
                            className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${status.badge}`}
                          >
                            <span
                              className={`h-1 w-1 rounded-full ${status.dot}`}
                            />
                            {transaction.status}
                          </span>
                        </div>

                        <ChevronRight className="h-4 w-4 text-ink/20 transition group-hover:translate-x-0.5 group-hover:text-ink/45" />
                      </div>
                    </div>
                  )
                })}
              </div>

              <button
                type="button"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-paper-2 px-4 py-3 text-xs font-semibold text-ink/60 transition hover:border-ink/10 hover:bg-white hover:text-ink"
              >
                View complete transaction ledger
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </CardBody>
          </Card>
        </div>

        {/* Wallet Allocation */}
        <Card className="overflow-hidden">
          <CardHeader
            title="Wallet Allocation"
            subtitle="Current escrow allocation across operational wallets"
          />

          <CardBody className="pt-0">
            <div className="rounded-[18px] border border-line bg-paper-2 p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                    Allocated funds
                  </p>

                  <p className="mt-1 font-display text-[25px] font-semibold tracking-[-0.03em] text-ink">
                    ₦1.91B
                  </p>
                </div>

                <Wallet className="h-5 w-5 text-[#12613E]/60" />
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/[0.06]">
                <div className="flex h-full">
                  <div className="w-[49%] bg-[#12613E]" />
                  <div className="w-[32%] bg-[#12613E]/70" />
                  <div className="w-[9%] bg-[#B85C12]/70" />
                  <div className="w-[4%] bg-ink/30" />
                  <div className="w-[5%] bg-ink/15" />
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {walletBreakdown.map((wallet, index) => (
                <div
                  key={wallet.wallet}
                  className="group flex items-center justify-between rounded-2xl border border-transparent px-3 py-3 transition hover:border-line hover:bg-paper-2"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        index === 0
                          ? 'bg-[#12613E]'
                          : index === 1
                            ? 'bg-[#12613E]/70'
                            : index === 2
                              ? 'bg-[#B85C12]'
                              : index === 3
                                ? 'bg-ink/35'
                                : 'bg-ink/15'
                      }`}
                    />

                    <span className="truncate text-sm text-ink/60">
                      {wallet.wallet}
                    </span>
                  </div>

                  <div className="ml-4 flex shrink-0 items-center gap-3">
                    <span className="text-[10px] font-medium text-ink/30">
                      {wallet.share}
                    </span>

                    <span className="font-semibold tabular-nums text-ink">
                      {wallet.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#EAF4EE] px-3.5 py-3">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#12613E]" />

              <p className="text-[11px] leading-5 text-[#12613E]/75">
                Wallet allocations remain subject to escrow governance and
                approved project controls.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Financial Control Domains                                           */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 lg:grid-cols-3">
        <FinancialControlCard
          eyebrow="Performance"
          title="Budget Performance"
          subtitle="Project financial efficiency"
          icon={TrendingUp}
          tone="teal"
          metrics={[
            {
              icon: TrendingUp,
              label: 'Budget Utilization',
              value: '81%',
              tone: 'success',
            },
            {
              icon: Banknote,
              label: 'Approved Spend',
              value: '₦1.41B',
            },
            {
              icon: Receipt,
              label: 'Procurement Cost',
              value: '₦847M',
            },
          ]}
        />

        <FinancialControlCard
          eyebrow="Governance"
          title="Escrow Controls"
          subtitle="Payment oversight and protected funds"
          icon={ShieldCheck}
          tone="amber"
          metrics={[
            {
              icon: Wallet,
              label: 'Pending Releases',
              value: '₦92M',
              tone: 'warning',
            },
            {
              icon: AlertTriangle,
              label: 'Frozen Payments',
              value: '₦17M',
              tone: 'danger',
            },
            {
              icon: ArrowDownCircle,
              label: 'Refund Queue',
              value: '₦8M',
              tone: 'warning',
            },
          ]}
        />

        <FinancialControlCard
          eyebrow="Reconciliation"
          title="Financial Reconciliation"
          subtitle="Platform-wide financial integrity"
          icon={Landmark}
          tone="ink"
          metrics={[
            {
              icon: Landmark,
              label: 'Reconciled Transactions',
              value: '99.4%',
              tone: 'success',
            },
            {
              icon: Receipt,
              label: 'Outstanding Reviews',
              value: '23',
              tone: 'warning',
            },
            {
              icon: Banknote,
              label: 'Refund Processed',
              value: '₦42M',
              tone: 'success',
            },
          ]}
        />
      </div>
    </div>
  )
}

function FinancialControlCard({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  tone,
  metrics,
}: {
  eyebrow: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  tone: 'teal' | 'amber' | 'ink'
  metrics: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    value: string
    tone?: 'success' | 'warning' | 'danger'
  }[]
}) {
  const toneStyles = {
    teal: {
      icon: 'bg-[#EAF4EE] text-[#12613E]',
    },
    amber: {
      icon: 'bg-[#F8EEE6] text-[#B85C12]',
    },
    ink: {
      icon: 'bg-ink/[0.05] text-ink/55',
    },
  } as const

  const valueStyles = {
    success: 'text-[#12613E]',
    warning: 'text-[#B85C12]',
    danger: 'text-brick',
    default: 'text-ink',
  } as const

  const cardTone = toneStyles[tone]

  return (
    <Card className="group transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(20,40,30,0.06)]">
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/35">
              {eyebrow}
            </p>

            <h2 className="mt-1 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-ink/40">
              {subtitle}
            </p>
          </div>

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] ${cardTone.icon}`}
          >
            <Icon className="h-[18px] w-[18px]" />
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          {metrics.map((metric) => {
            const MetricIcon = metric.icon
            const valueTone =
              valueStyles[metric.tone ?? 'default']

            return (
              <div
                key={metric.label}
                className="flex items-center justify-between rounded-2xl bg-paper-2 px-3.5 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white">
                    <MetricIcon className="h-3.5 w-3.5 text-ink/45" />
                  </div>

                  <span className="truncate text-xs text-ink/55">
                    {metric.label}
                  </span>
                </div>

                <span
                  className={`ml-3 shrink-0 text-sm font-semibold tabular-nums ${valueTone}`}
                >
                  {metric.value}
                </span>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-between rounded-xl px-1 py-1 text-xs font-semibold text-ink/45 transition hover:text-ink"
        >
          <span>Open detailed controls</span>
          <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </button>
      </CardBody>
    </Card>
  )
}