import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  Filter,
  LockKeyhole,
  Search,
  ShieldCheck,
  Wallet,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { FundingSource } from '@/modules/escrow/types'

type TransactionType =
  | 'funding'
  | 'reservation'
  | 'release'
  | 'refund'
  | 'freeze'
  | 'adjustment'

type TransactionStatus =
  | 'completed'
  | 'pending'
  | 'frozen'
  | 'failed'
  | 'reversed'

interface EscrowTransaction {
  id: string
  projectId: string
  reference: string
  type: TransactionType
  status: TransactionStatus
  amount: number
  currency: 'NGN'
  wallet: string
  fundingSource: FundingSource
  counterparty: string
  description: string
  date: string
  milestone?: string
}

const custodyLabel: Record<FundingSource, string> = {
  partner_escrow: 'Partner escrow',
  build_os: 'Build OS',
  direct_bank_transfer: 'Direct bank transfer',
}

const transactions: EscrowTransaction[] = [
  {
    id: 'TXN-2026-00981',
    projectId: 'PRJ-2026-00421',
    reference: 'ESC-7F92A1',
    type: 'release',
    status: 'completed',
    amount: 4250000,
    currency: 'NGN',
    wallet: 'Labour wallet',
    fundingSource: 'partner_escrow',
    counterparty: 'BuildRight Construction Ltd',
    description: 'Milestone 03 payment released after approval.',
    milestone: 'Milestone 03 — Structural Works',
    date: '27 Aug 2026 · 10:42',
  },
  {
    id: 'TXN-2026-00980',
    projectId: 'PRJ-2026-00421',
    reference: 'ESC-7F91D4',
    type: 'freeze',
    status: 'frozen',
    amount: 2850000,
    currency: 'NGN',
    wallet: 'Labour wallet',
    fundingSource: 'partner_escrow',
    counterparty: 'BuildRight Construction Ltd',
    description: 'Payment line frozen following a milestone dispute.',
    milestone: 'Milestone 04 — Internal Finishing',
    date: '27 Aug 2026 · 09:49',
  },
  {
    id: 'TXN-2026-00979',
    projectId: 'PRJ-2026-00421',
    reference: 'ESC-7F8C21',
    type: 'reservation',
    status: 'completed',
    amount: 1680000,
    currency: 'NGN',
    wallet: 'Material wallet',
    fundingSource: 'partner_escrow',
    counterparty: 'PrimeBuild Materials Ltd',
    description: 'Funds reserved for approved material procurement.',
    date: '26 Aug 2026 · 15:18',
  },
  {
    id: 'TXN-2026-00978',
    projectId: 'PRJ-2026-00421',
    reference: 'ESC-7F7B91',
    type: 'funding',
    status: 'completed',
    amount: 12500000,
    currency: 'NGN',
    wallet: 'Project escrow',
    fundingSource: 'partner_escrow',
    counterparty: 'Client / Diaspora Investor',
    description: 'Project escrow funding received and reconciled.',
    date: '25 Aug 2026 · 12:04',
  },
  {
    id: 'TXN-2026-00977',
    projectId: 'PRJ-2026-00421',
    reference: 'ESC-7F6D44',
    type: 'refund',
    status: 'completed',
    amount: 750000,
    currency: 'NGN',
    wallet: 'Refund wallet',
    fundingSource: 'partner_escrow',
    counterparty: 'Client / Diaspora Investor',
    description: 'Unused procurement balance returned to client.',
    date: '24 Aug 2026 · 16:31',
  },
  {
    id: 'TXN-2026-00976',
    projectId: 'PRJ-2026-00421',
    reference: 'ESC-7F5A20',
    type: 'release',
    status: 'pending',
    amount: 920000,
    currency: 'NGN',
    wallet: 'Professional wallet',
    fundingSource: 'partner_escrow',
    counterparty: 'Apex Design & Engineering',
    description: 'Professional service payment awaiting approval.',
    milestone: 'Architectural design deliverable',
    date: '23 Aug 2026 · 11:20',
  },
]

const typeLabel: Record<TransactionType, string> = {
  funding: 'Funding',
  reservation: 'Reserved',
  release: 'Payment release',
  refund: 'Refund',
  freeze: 'Payment freeze',
  adjustment: 'Adjustment',
}

const statusTone: Record<
  TransactionStatus,
  'neutral' | 'amber' | 'brick' | 'teal'
> = {
  completed: 'teal',
  pending: 'amber',
  frozen: 'brick',
  failed: 'brick',
  reversed: 'neutral',
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatType(type: TransactionType) {
  return typeLabel[type]
}

function isCredit(type: TransactionType) {
  return type === 'funding' || type === 'refund'
}

export function Transactions() {
  const completedVolume = transactions
    .filter((transaction) => transaction.status === 'completed')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const pendingAmount = transactions
    .filter((transaction) => transaction.status === 'pending')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const frozenAmount = transactions
    .filter((transaction) => transaction.status === 'frozen')
    .reduce((total, transaction) => total + transaction.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <Wallet className="h-5 w-5 text-ink/60" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Escrow management
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Transactions
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Complete ledger of project funding, reservations, releases,
            freezes and refunds.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/65 transition hover:bg-ink/[0.02] hover:text-ink"
        >
          <Download className="h-4 w-4" />
          Export ledger
        </button>
      </div>

      {/* Compliance notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ink/45" />

        <div>
          <p className="text-sm font-semibold text-ink">
            Escrow activity is tracked, not held by Build OS
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/50">
            Build OS records funding status, verifies milestones and manages
            payment recommendations. Funds may be held by an approved escrow
            partner or settled through the configured payment channel.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Completed volume"
          value={formatCurrency(completedVolume)}
          icon={ArrowUpRight}
          description="Completed ledger activity"
        />

        <MetricCard
          label="Pending releases"
          value={formatCurrency(pendingAmount)}
          icon={ArrowUpRight}
          description="Awaiting approval"
        />

        <MetricCard
          label="Frozen payments"
          value={formatCurrency(frozenAmount)}
          icon={LockKeyhole}
          description="Protected pending review"
        />

        <MetricCard
          label="Transactions"
          value={transactions.length.toString()}
          icon={FileText}
          description="Recorded ledger entries"
        />
      </div>

      {/* Ledger */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Escrow transaction ledger"
          subtitle="Search and review every recorded project transaction"
        />

        <CardBody>
          {/* Filters */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

              <input
                type="search"
                placeholder="Search transaction, project, reference or counterparty..."
                className="h-10 w-full rounded-xl border border-line bg-paper-2 pl-9 pr-3 text-xs text-ink outline-none placeholder:text-ink/30 focus:border-ink/20"
              />
            </div>

            <button
              type="button"
              className="inline-flex h-10 items-center justify-between gap-3 rounded-xl border border-line bg-paper-2 px-3 text-xs font-semibold text-ink/55 hover:text-ink"
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                All types
              </span>

              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              className="inline-flex h-10 items-center justify-between gap-3 rounded-xl border border-line bg-paper-2 px-3 text-xs font-semibold text-ink/55 hover:text-ink"
            >
              <span>All statuses</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Desktop table */}
          <div className="mt-5 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="border-b border-line text-left">
                  <th className="pb-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                    Transaction
                  </th>

                  <th className="pb-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                    Type
                  </th>

                  <th className="pb-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                    Counterparty
                  </th>

                  <th className="pb-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                    Wallet
                  </th>

                  <th className="pb-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                    Amount
                  </th>

                  <th className="pb-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                    Status
                  </th>

                  <th className="pb-3 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile ledger */}
          <div className="mt-5 space-y-3 md:hidden">
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function TransactionRow({
  transaction,
}: {
  transaction: EscrowTransaction
}) {
  const credit = isCredit(transaction.type)

  return (
    <tr className="border-b border-line/70 last:border-0">
      <td className="py-4 pr-4">
        <div className="flex items-center gap-3">
          <TransactionIcon type={transaction.type} />

          <div className="min-w-0">
            <p className="font-mono text-xs font-semibold text-ink">
              {transaction.id}
            </p>

            <p className="mt-1 text-[11px] text-ink/40">
              {transaction.projectId} · {transaction.reference}
            </p>
          </div>
        </div>
      </td>

      <td className="py-4 pr-4">
        <p className="text-xs font-semibold text-ink">
          {formatType(transaction.type)}
        </p>

        <p className="mt-1 max-w-[180px] text-[11px] leading-4 text-ink/40">
          {transaction.description}
        </p>
      </td>

      <td className="py-4 pr-4">
        <p className="max-w-[170px] text-xs font-semibold text-ink">
          {transaction.counterparty}
        </p>

        <p className="mt-1 text-[10px] text-ink/35">
          {custodyLabel[transaction.fundingSource]}
        </p>
      </td>

      <td className="py-4 pr-4">
        <span className="rounded-lg bg-paper-2 px-2 py-1 text-[10px] font-medium text-ink/55">
          {transaction.wallet}
        </span>
      </td>

      <td className="py-4 pr-4">
        <p
          className={`whitespace-nowrap font-mono text-xs font-semibold ${
            credit ? 'text-emerald-600' : 'text-ink'
          }`}
        >
          {credit ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </p>
      </td>

      <td className="py-4 pr-4">
        <Badge tone={statusTone[transaction.status]}>
          {capitalize(transaction.status)}
        </Badge>
      </td>

      <td className="py-4 text-right">
        <p className="whitespace-nowrap font-mono text-[10px] text-ink/40">
          {transaction.date}
        </p>

        <button
          type="button"
          className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-ink/40 hover:text-ink"
        >
          View
          <ExternalLink className="h-3 w-3" />
        </button>
      </td>
    </tr>
  )
}

function TransactionCard({
  transaction,
}: {
  transaction: EscrowTransaction
}) {
  const credit = isCredit(transaction.type)

  return (
    <div className="rounded-2xl border border-line bg-paper-2 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <TransactionIcon type={transaction.type} />

          <div className="min-w-0">
            <p className="truncate font-mono text-xs font-semibold text-ink">
              {transaction.id}
            </p>

            <p className="mt-1 text-[10px] text-ink/40">
              {transaction.projectId}
            </p>
          </div>
        </div>

        <Badge tone={statusTone[transaction.status]}>
          {capitalize(transaction.status)}
        </Badge>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-ink/35">
            {formatType(transaction.type)}
          </p>

          <p className="mt-1 text-xs font-semibold text-ink">
            {transaction.counterparty}
          </p>
        </div>

        <p
          className={`font-mono text-sm font-semibold ${
            credit ? 'text-emerald-600' : 'text-ink'
          }`}
        >
          {credit ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3">
        <div>
          <p className="text-[10px] text-ink/35">Wallet</p>
          <p className="mt-1 text-[11px] font-semibold text-ink/60">
            {transaction.wallet}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-ink/35">Date</p>
          <p className="mt-1 font-mono text-[10px] text-ink/50">
            {transaction.date}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-5 text-ink/40">
        {transaction.description}
      </p>

      <button
        type="button"
        className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-ink/45 hover:text-ink"
      >
        View transaction
        <ExternalLink className="h-3 w-3" />
      </button>
    </div>
  )
}

function TransactionIcon({ type }: { type: TransactionType }) {
  const credit = isCredit(type)

  if (type === 'freeze') {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
        <LockKeyhole className="h-4 w-4" />
      </div>
    )
  }

  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
        credit ? 'bg-emerald-500/10 text-emerald-600' : 'bg-ink/5 text-ink/50'
      }`}
    >
      {credit ? (
        <ArrowDownLeft className="h-4 w-4" />
      ) : (
        <ArrowUpRight className="h-4 w-4" />
      )}
    </div>
  )
}

function MetricCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string
  value: string
  description: string
  icon: typeof Wallet
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-ink/40">{label}</p>

          <p className="mt-2 font-mono text-lg font-semibold tracking-tight text-ink">
            {value}
          </p>

          <p className="mt-1 text-[10px] text-ink/35">{description}</p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-paper-2">
          <Icon className="h-4 w-4 text-ink/45" />
        </div>
      </div>
    </Card>
  )
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}