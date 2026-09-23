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
    <div className="space-y-7">
      {/* ─────────────────────────────────────────────
          Header
      ───────────────────────────────────────────── */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              Escrow controls
            </span>

            <span className="h-px w-8 bg-ink/10" />

            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink/30">
              Financial command
            </span>
          </div>

          <h1 className="mt-3 font-display text-[30px] font-semibold tracking-[-0.03em] text-ink sm:text-[34px]">
            Wallet
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
            Monitor project funds, reservations, releases and protected
            payment lines across your Build OS portfolio.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#12613E]/[0.10] bg-[#F4F7F4] px-3.5 py-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
            <ShieldCheck className="h-3.5 w-3.5 text-[#12613E]" />
          </span>

          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#12613E]">
            Escrow protection active
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          Custody notice
      ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[20px] border border-ink/[0.07] bg-[#F4F7F4] p-4 sm:p-5">
        <div className="absolute inset-y-0 left-0 w-1 bg-[#12613E]" />

        <div className="flex items-start gap-3.5 pl-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border border-ink/[0.06] bg-white text-[#12613E] shadow-[0_4px_14px_rgba(20,30,25,0.04)]">
            <ShieldCheck className="h-[18px] w-[18px]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-ink">
                Payment protection & custody
              </p>

              <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#12613E]">
                Protected
              </span>
            </div>

            <p className="mt-1.5 max-w-4xl text-xs leading-5 text-ink/50">
              Funds are held through the configured escrow or banking
              arrangement. Build OS tracks project funding, verifies evidence
              and payment conditions, and records payment recommendations.
              Build OS does not represent itself as the custodian of client
              funds.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-medium text-ink/40">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#12613E]" />
                Conditions verified
              </span>

              <span className="inline-flex items-center gap-1.5">
                <LockKeyhole className="h-3.5 w-3.5 text-ink/35" />
                Custody externally governed
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-ink/30" />
                Audit trail maintained
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          Financial overview
      ───────────────────────────────────────────── */}
      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <WalletMetric
          label="Escrow balance"
          value={formatCompactMoney(totalBalance)}
          icon={WalletIcon}
          tone="teal"
          hint="Current balance across active projects"
        />

        <WalletMetric
          label="Reserved"
          value={formatCompactMoney(reservedBalance)}
          icon={Clock3}
          tone="neutral"
          hint="Funds allocated to project obligations"
        />

        <WalletMetric
          label="Released"
          value={formatCompactMoney(totalReleased)}
          icon={ArrowUpFromLine}
          tone="amber"
          hint="Payments released against approved conditions"
        />

        <WalletMetric
          label="Frozen"
          value={formatCompactMoney(totalFrozen)}
          icon={LockKeyhole}
          tone="brick"
          hint="Payment lines currently protected"
        />
      </div>

      {/* ─────────────────────────────────────────────
          Balance overview
      ───────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Balance overview"
          subtitle="Current allocation across the escrow lifecycle"
        />

        <CardBody>
          <div className="grid gap-3.5 md:grid-cols-3">
            <BalanceItem
              label="Active balance"
              value={formatCompactMoney(totalBalance)}
              description="Funds currently associated with active project wallets."
              icon={WalletIcon}
              tone="teal"
            />

            <BalanceItem
              label="Frozen"
              value={formatCompactMoney(totalFrozen)}
              description="Payment lines protected while a dispute or review remains active."
              icon={LockKeyhole}
              tone="brick"
            />

            <BalanceItem
              label="Refunded"
              value={formatCompactMoney(totalRefunded)}
              description="Funds returned following cancellation or an approved resolution."
              icon={ArrowUpFromLine}
              tone="neutral"
            />
          </div>

          {/* Allocation strip */}
          <div className="mt-5 rounded-[15px] border border-ink/[0.06] bg-[#F7F8F6] p-3.5">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                  Ledger position
                </p>

                <p className="mt-1 text-xs font-medium text-ink/60">
                  Deposited capital remains traceable through each payment
                  state.
                </p>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-medium text-ink/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
                Reconciled activity
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ─────────────────────────────────────────────
          Activity chart
      ───────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Escrow activity"
          subtitle="Deposits and releases across the last six months"
          action={
            <div className="hidden items-center gap-4 sm:flex">
              <LegendItem label="Deposited" tone="teal" />
              <LegendItem label="Released" tone="amber" />
            </div>
          }
        />

        <CardBody>
          <div className="mb-4 flex items-center justify-between sm:hidden">
            <LegendItem label="Deposited" tone="teal" />
            <LegendItem label="Released" tone="amber" />
          </div>

          <EscrowTrendChart data={escrowMonthlyTrend} />
        </CardBody>
      </Card>

      {/* ─────────────────────────────────────────────
          Project wallets
      ───────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Project wallets"
          subtitle={`${activeProjects.length} active project${
            activeProjects.length === 1 ? '' : 's'
          } with escrow allocation`}
        />

        <CardBody className="p-0">
          {activeProjects.length === 0 ? (
            <EmptyWalletState />
          ) : (
            <div className="divide-y divide-ink/[0.06]">
              {activeProjects.map((project) => (
                <ProjectWalletRow
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* ─────────────────────────────────────────────
          Recent transactions
      ───────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Recent transactions"
          subtitle="Deposits, releases, freezes and refunds recorded against your projects"
          action={
            <button
              type="button"
              className="group hidden items-center gap-1.5 rounded-full border border-ink/[0.07] bg-white px-3.5 py-2 text-[10px] font-semibold text-ink/50 transition hover:border-ink/[0.12] hover:text-ink sm:inline-flex"
            >
              View all
              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          }
        />

        <CardBody className="p-0">
          <div className="divide-y divide-ink/[0.06]">
            {escrowTransactions.map((transaction) => {
              const meta =
                transactionMeta[transaction.type as TransactionType]

              return (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  meta={meta}
                />
              )
            })}
          </div>

          <div className="border-t border-ink/[0.06] px-5 py-3.5 sm:hidden">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-1.5 rounded-[12px] border border-ink/[0.07] bg-[#F7F8F6] py-2.5 text-[10px] font-semibold text-ink/50 transition hover:bg-white hover:text-ink"
            >
              View all transactions
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </CardBody>
      </Card>

      {/* ─────────────────────────────────────────────
          Operational note
      ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[18px] border border-ink/[0.07] bg-white p-4 sm:p-5">
        <div className="absolute inset-y-0 left-0 w-1 bg-ink/10" />

        <div className="flex items-start gap-3 pl-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#F7F8F6] text-ink/45">
            <Info className="h-4 w-4" />
          </div>

          <div>
            <p className="text-xs font-semibold text-ink">
              Payment release controls
            </p>

            <p className="mt-1 max-w-4xl text-xs leading-5 text-ink/45">
              Payment releases should only proceed after the applicable
              evidence is submitted, the project manager or designated
              verifier confirms the milestone, the required client approval is
              recorded, and no active dispute is blocking the payment line.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   Financial metric
───────────────────────────────────────────────────── */

function WalletMetric({
  label,
  value,
  hint,
  icon: Icon,
  tone,
}: {
  label: string
  value: string
  hint: string
  icon: typeof WalletIcon
  tone: 'teal' | 'amber' | 'brick' | 'neutral'
}) {
  const styles = {
    teal: {
      icon: 'bg-[#F4F7F4] text-[#12613E]',
      dot: 'bg-[#12613E]',
    },
    amber: {
      icon: 'bg-[#F7F1E7] text-[#C28A2C]',
      dot: 'bg-[#C28A2C]',
    },
    brick: {
      icon: 'bg-[#F8EEE6] text-[#B85C12]',
      dot: 'bg-[#B85C12]',
    },
    neutral: {
      icon: 'bg-[#F7F8F6] text-ink/45',
      dot: 'bg-ink/25',
    },
  }

  const style = styles[tone]

  return (
    <Card className="group p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(20,30,25,0.05)] sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />

            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
              {label}
            </p>
          </div>

          <p className="mt-2.5 font-display text-[22px] font-semibold tracking-[-0.025em] text-ink">
            {value}
          </p>

          <p className="mt-1 max-w-[190px] text-[10px] leading-4 text-ink/35">
            {hint}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] transition-transform duration-200 group-hover:scale-[1.04] ${style.icon}`}
        >
          <Icon className="h-[17px] w-[17px]" />
        </div>
      </div>
    </Card>
  )
}

/* ─────────────────────────────────────────────────────
   Balance item
───────────────────────────────────────────────────── */

function BalanceItem({
  label,
  value,
  description,
  icon: Icon,
  tone,
}: {
  label: string
  value: string
  description: string
  icon: typeof WalletIcon
  tone: 'teal' | 'brick' | 'neutral'
}) {
  const styles = {
    teal: {
      icon: 'bg-[#F4F7F4] text-[#12613E]',
      rail: 'bg-[#12613E]',
    },
    brick: {
      icon: 'bg-[#F8EEE6] text-[#B85C12]',
      rail: 'bg-[#B85C12]',
    },
    neutral: {
      icon: 'bg-[#F7F8F6] text-ink/45',
      rail: 'bg-ink/20',
    },
  }

  const style = styles[tone]

  return (
    <div className="group relative overflow-hidden rounded-[17px] border border-ink/[0.06] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(20,30,25,0.045)]">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] ${style.icon}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-ink/30">
            {label}
          </p>

          <p className="mt-1 font-display text-[19px] font-semibold tracking-tight text-ink">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[10px] leading-5 text-ink/40">
        {description}
      </p>

      <span
        className={`absolute bottom-0 left-0 right-0 h-0.5 opacity-0 transition-opacity group-hover:opacity-100 ${style.rail}`}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   Project wallet row
───────────────────────────────────────────────────── */

function ProjectWalletRow({
  project,
}: {
  project: (typeof projects)[number]
}) {
  return (
    <div className="group flex flex-col gap-4 px-4 py-4 transition-colors duration-200 hover:bg-[#F7F8F6]/60 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex min-w-0 items-center gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#F4F7F4] text-[#12613E]">
          <WalletIcon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-ink">
              {project.name}
            </p>

            <Badge tone="teal">Active</Badge>
          </div>

          <p className="mt-1 font-mono text-[9px] tracking-wide text-ink/30">
            {project.id}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-5 sm:justify-end">
        <div className="text-left sm:text-right">
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
            Escrow balance
          </p>

          <p className="mt-1 font-display text-[16px] font-semibold tracking-tight text-ink">
            {formatCompactMoney(project.escrowBalance)}
          </p>
        </div>

        <button
          type="button"
          aria-label={`View wallet for ${project.name}`}
          className="group/button flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border border-ink/[0.07] bg-white text-ink/35 transition-all duration-200 hover:border-ink/[0.13] hover:text-ink hover:shadow-[0_5px_15px_rgba(20,30,25,0.05)]"
        >
          <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   Transaction row
───────────────────────────────────────────────────── */

function TransactionRow({
  transaction,
  meta,
}: {
  transaction: (typeof escrowTransactions)[number]
  meta: (typeof transactionMeta)[TransactionType]
}) {
  const Icon = meta.icon

  const amountPrefix =
    transaction.type === 'deposit' || transaction.type === 'refund'
      ? '+'
      : '-'

  const amountTone =
    transaction.type === 'deposit'
      ? 'text-[#12613E]'
      : transaction.type === 'freeze'
        ? 'text-[#B85C12]'
        : 'text-ink'

  const iconTone =
    transaction.type === 'deposit'
      ? 'bg-[#F4F7F4] text-[#12613E]'
      : transaction.type === 'freeze'
        ? 'bg-[#F8EEE6] text-[#B85C12]'
        : transaction.type === 'release'
          ? 'bg-[#F7F1E7] text-[#C28A2C]'
          : 'bg-[#F7F8F6] text-ink/45'

  return (
    <div className="group flex flex-col gap-3.5 px-4 py-4 transition-colors duration-200 hover:bg-[#F7F8F6]/60 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex min-w-0 items-center gap-3.5">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] ${iconTone}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-ink sm:text-sm">
            {transaction.milestoneLabel}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-mono text-[9px] text-ink/30">
              {transaction.id}
            </span>

            <span className="text-[9px] text-ink/15">•</span>

            <span className="text-[10px] text-ink/35">
              {transaction.date}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
        <div className="text-left sm:text-right">
          <p
            className={`font-display text-[15px] font-semibold tracking-tight ${amountTone}`}
          >
            {amountPrefix}
            {formatMoney(transaction.amount, transaction.currency)}
          </p>

          <p className="mt-0.5 text-[8px] uppercase tracking-[0.12em] text-ink/25">
            {transaction.currency}
          </p>
        </div>

        <Badge tone={meta.tone}>{meta.label}</Badge>

        <button
          type="button"
          aria-label={`View transaction ${transaction.id}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-ink/[0.07] bg-white text-ink/30 transition hover:border-ink/[0.12] hover:text-ink"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   Empty state
───────────────────────────────────────────────────── */

function EmptyWalletState() {
  return (
    <div className="px-5 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#F7F8F6] text-ink/25">
        <WalletIcon className="h-5 w-5" />
      </div>

      <p className="mt-4 text-sm font-semibold text-ink">
        No active project wallets
      </p>

      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-ink/40">
        Project escrow allocations will appear here once funding is recorded
        against an active project.
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   Chart legend
───────────────────────────────────────────────────── */

function LegendItem({
  label,
  tone,
}: {
  label: string
  tone: 'teal' | 'amber'
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-ink/45">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          tone === 'teal' ? 'bg-[#12613E]' : 'bg-[#C28A2C]'
        }`}
      />

      {label}
    </span>
  )
}