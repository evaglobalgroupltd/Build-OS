import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ChevronRight,
  Clock3,
  Eye,
  Info,
  LockKeyhole,
  ShieldCheck,
  Wallet as WalletIcon,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { EscrowTrendChart } from '@/components/charts/EscrowTrendChart'
import {
  escrowMonthlyTrend,
  escrowTransactions,
  projects,
} from '@/data/mockData'

type TransactionType = 'deposit' | 'release' | 'freeze' | 'refund'

const transactionMeta: Record<
  TransactionType,
  {
    label: string
    tone: 'teal' | 'amber' | 'brick' | 'neutral'
    icon: typeof ArrowDownToLine
  }
> = {
  deposit: {
    label: 'Deposit',
    tone: 'teal',
    icon: ArrowDownToLine,
  },
  release: {
    label: 'Release',
    tone: 'amber',
    icon: ArrowUpFromLine,
  },
  freeze: {
    label: 'Frozen',
    tone: 'brick',
    icon: LockKeyhole,
  },
  refund: {
    label: 'Refund',
    tone: 'neutral',
    icon: ArrowUpFromLine,
  },
}

function formatMoney(amount: number, currency = 'NGN') {
  if (currency !== 'NGN') {
    return `${currency === 'USD' ? '$' : currency} ${(amount / 1_000_000).toFixed(2)}M`
  }

  return `₦${(amount / 1_000_000).toFixed(2)}M`
}

function formatCompactMoney(amount: number) {
  if (amount >= 1_000_000_000) {
    return `₦${(amount / 1_000_000_000).toFixed(2)}B`
  }

  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(2)}M`
  }

  if (amount >= 1_000) {
    return `₦${(amount / 1_000).toFixed(0)}K`
  }

  return `₦${amount.toLocaleString('en-NG')}`
}

export function Wallet() {
  const totalBalance = projects.reduce(
    (sum, project) => sum + project.escrowBalance,
    0,
  )

  const totalDeposited = escrowTransactions
    .filter((transaction) => transaction.type === 'deposit')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const totalReleased = escrowTransactions
    .filter((transaction) => transaction.type === 'release')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const totalFrozen = escrowTransactions
    .filter((transaction) => transaction.type === 'freeze')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const totalRefunded = escrowTransactions
    .filter((transaction) => transaction.type === 'refund')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const reservedBalance = Math.max(
    totalDeposited - totalReleased - totalRefunded,
    0,
  )

  const activeProjects = projects.filter(
    (project) => project.escrowBalance > 0,
  )

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal/10">
              <WalletIcon className="h-5 w-5 text-teal" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Escrow & payments
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Wallet
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Monitor project funds, payment reservations, releases and frozen
            amounts across your Build OS projects.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2">
          <ShieldCheck className="h-4 w-4 text-teal" />

          <span className="text-xs font-medium text-ink/60">
            Escrow protection active
          </span>
        </div>
      </div>

      {/* Custody notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
          <ShieldCheck className="h-4 w-4 text-teal" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-ink">
              Payment protection and custody
            </p>

            <Badge tone="teal">Protected</Badge>
          </div>

          <p className="mt-1 max-w-4xl text-xs leading-5 text-ink/50">
            Funds are held through the configured escrow or banking
            arrangement. Build OS tracks project funding, verifies evidence
            and payment conditions, and records payment recommendations. Build
            OS does not represent itself as the custodian of client funds.
          </p>
        </div>
      </div>

      {/* Financial overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Escrow balance"
          value={formatCompactMoney(totalBalance)}
          icon={WalletIcon}
          tone="teal"
          hint="Current balance across active projects"
        />

        <StatCard
          label="Reserved"
          value={formatCompactMoney(reservedBalance)}
          icon={Clock3}
          tone="ink"
          hint="Funds allocated to project obligations"
        />

        <StatCard
          label="Released"
          value={formatCompactMoney(totalReleased)}
          icon={ArrowUpFromLine}
          tone="amber"
          hint="Payments released against approved conditions"
        />

        <StatCard
          label="Frozen"
          value={formatCompactMoney(totalFrozen)}
          icon={LockKeyhole}
          tone="brick"
          hint="Payment lines currently on hold"
        />
      </div>

      {/* Balance composition */}
      <Card>
        <CardHeader
          title="Balance overview"
          subtitle="Current allocation of funds across the escrow lifecycle"
        />

        <CardBody>
          <div className="grid gap-4 md:grid-cols-3">
            <BalanceItem
              label="Available / active balance"
              value={formatCompactMoney(totalBalance)}
              description="Funds currently associated with active project wallets."
              icon={WalletIcon}
            />

            <BalanceItem
              label="Frozen"
              value={formatCompactMoney(totalFrozen)}
              description="Affected payment lines protected while a dispute is reviewed."
              icon={LockKeyhole}
            />

            <BalanceItem
              label="Refunded"
              value={formatCompactMoney(totalRefunded)}
              description="Funds returned following cancellation or approved resolution."
              icon={ArrowUpFromLine}
            />
          </div>
        </CardBody>
      </Card>

      {/* Activity chart */}
      <Card>
        <CardHeader
          title="Escrow activity"
          subtitle="Deposits and releases over the last six months"
          action={
            <div className="hidden items-center gap-4 text-xs sm:flex">
              <LegendItem label="Deposited" tone="teal" />
              <LegendItem label="Released" tone="amber" />
            </div>
          }
        />

        <CardBody>
          <EscrowTrendChart data={escrowMonthlyTrend} />
        </CardBody>
      </Card>

      {/* Project wallets */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Project wallets"
          subtitle={`${activeProjects.length} active project${activeProjects.length === 1 ? '' : 's'} with escrow allocation`}
        />

        <CardBody className="p-0">
          {activeProjects.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <WalletIcon className="mx-auto h-8 w-8 text-ink/20" />

              <p className="mt-3 text-sm font-semibold text-ink">
                No active project wallets
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Project escrow allocations will appear here once funding is
                recorded.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-line">
              {activeProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col gap-4 px-5 py-4 transition hover:bg-ink/[0.015] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-ink">
                        {project.name}
                      </p>

                      <Badge tone="teal">Active</Badge>
                    </div>

                    <p className="mt-1 font-mono text-[11px] text-ink/35">
                      {project.id}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-6 sm:justify-end">
                    <div className="text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                        Escrow balance
                      </p>

                      <p className="mt-1 font-mono text-sm font-semibold text-ink">
                        {formatCompactMoney(project.escrowBalance)}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label={`View wallet for ${project.name}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-ink/40 transition hover:border-ink/20 hover:text-ink"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Recent transactions */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Recent transactions"
          subtitle="Deposits, releases, freezes and refunds recorded against your projects"
          action={
            <button
              type="button"
              className="hidden items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-ink/55 transition hover:text-ink sm:flex"
            >
              View all
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          }
        />

        <CardBody className="p-0">
          <div className="divide-y divide-line">
            {escrowTransactions.map((transaction) => {
              const meta = transactionMeta[transaction.type as TransactionType]
              const Icon = meta.icon

              return (
                <div
                  key={transaction.id}
                  className="flex flex-col gap-3 px-5 py-4 transition hover:bg-ink/[0.015] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5 text-ink/55">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {transaction.milestoneLabel}
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-mono text-[10px] text-ink/30">
                          {transaction.id}
                        </span>

                        <span className="text-[10px] text-ink/20">•</span>

                        <span className="text-[11px] text-ink/40">
                          {transaction.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span className="font-mono text-sm font-semibold text-ink">
                      {formatMoney(
                        transaction.amount,
                        transaction.currency,
                      )}
                    </span>

                    <Badge tone={meta.tone}>{meta.label}</Badge>

                    <button
                      type="button"
                      aria-label={`View transaction ${transaction.id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink/35 transition hover:text-ink"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardBody>
      </Card>

      {/* Operational note */}
      <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink/40" />

        <div>
          <p className="text-xs font-semibold text-ink">
            Payment release controls
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/45">
            Payment releases should only proceed after the applicable evidence
            is submitted, the project manager or designated verifier confirms
            the milestone, the required client approval is recorded, and no
            active dispute is blocking the payment line.
          </p>
        </div>
      </div>
    </div>
  )
}

function BalanceItem({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string
  value: string
  description: string
  icon: typeof WalletIcon
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper-2 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
          <Icon className="h-4 w-4 text-ink/50" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-ink/45">{label}</p>

          <p className="mt-1 font-mono text-lg font-semibold tracking-tight text-ink">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-5 text-ink/40">
        {description}
      </p>
    </div>
  )
}

function LegendItem({
  label,
  tone,
}: {
  label: string
  tone: 'teal' | 'amber'
}) {
  return (
    <span className="flex items-center gap-1.5 text-ink/50">
      <span
        className={`h-2 w-2 rounded-full ${
          tone === 'teal' ? 'bg-teal' : 'bg-amber'
        }`}
      />

      {label}
    </span>
  )
}