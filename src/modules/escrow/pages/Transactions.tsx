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

function getTransactionTone(status: TransactionStatus) {
  switch (status) {
    case 'completed':
      return {
        icon: 'bg-[#F4F7F4] text-[#12613E]',
        rail: 'bg-[#12613E]',
      }

    case 'pending':
      return {
        icon: 'bg-[#F7F1E7] text-[#C28A2C]',
        rail: 'bg-[#C28A2C]',
      }

    case 'frozen':
    case 'failed':
      return {
        icon: 'bg-[#F8EEE6] text-[#B85C12]',
        rail: 'bg-[#B85C12]',
      }

    default:
      return {
        icon: 'bg-[#F7F8F6] text-ink/55',
        rail: 'bg-ink/20',
      }
  }
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
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C28A2C]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              Escrow controls
            </span>

            <span className="h-px w-8 bg-ink/10" />

            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink/30">
              Financial ledger
            </span>
          </div>

          <h1 className="mt-3 font-display text-[30px] font-semibold tracking-[-0.03em] text-ink sm:text-[34px]">
            Transactions
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
            A complete, auditable record of project funding, reservations,
            releases, freezes and refunds.
          </p>
        </div>

        <button
          type="button"
          className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-ink/[0.08] bg-white px-4 py-2.5 text-xs font-semibold text-ink/65 shadow-[0_5px_18px_rgba(20,30,25,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/[0.12] hover:text-ink hover:shadow-[0_10px_24px_rgba(20,30,25,0.06)]"
        >
          <Download className="h-4 w-4 text-ink/45 transition-transform duration-200 group-hover:-translate-y-0.5" />
          Export ledger
        </button>
      </div>

      {/* Custody / integrity notice */}
      <div className="relative overflow-hidden rounded-[20px] border border-ink/[0.07] bg-[#F4F7F4] p-4 sm:p-5">
        <div className="absolute inset-y-0 left-0 w-1 bg-[#12613E]" />

        <div className="flex items-start gap-3.5 pl-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border border-ink/[0.06] bg-white text-[#12613E] shadow-[0_4px_14px_rgba(20,30,25,0.04)]">
            <ShieldCheck className="h-[18px] w-[18px]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-ink">
                Ledger integrity & custody
              </p>

              <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#12613E]">
                Controlled
              </span>
            </div>

            <p className="mt-1.5 max-w-4xl text-xs leading-5 text-ink/50">
              Build OS records funding status, verifies milestones and manages
              payment recommendations. Funds may be held by an approved escrow
              partner or settled through the configured payment channel.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-medium text-ink/40">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#12613E]" />
                Audit trail maintained
              </span>

              <span className="inline-flex items-center gap-1.5">
                <LockKeyhole className="h-3.5 w-3.5 text-ink/35" />
                Custody externally governed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Completed volume"
          value={formatCurrency(completedVolume)}
          icon={ArrowUpRight}
          description="Settled ledger activity"
          tone="teal"
        />

        <MetricCard
          label="Pending releases"
          value={formatCurrency(pendingAmount)}
          icon={ArrowUpRight}
          description="Awaiting approval"
          tone="amber"
        />

        <MetricCard
          label="Frozen payments"
          value={formatCurrency(frozenAmount)}
          icon={LockKeyhole}
          description="Protected pending review"
          tone="brick"
        />

        <MetricCard
          label="Transactions"
          value={transactions.length.toString()}
          icon={FileText}
          description="Recorded ledger entries"
          tone="neutral"
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
          <div className="flex flex-col gap-2.5 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/25" />

              <input
                type="search"
                placeholder="Search transaction, project, reference or counterparty..."
                className="h-11 w-full rounded-[13px] border border-ink/[0.07] bg-[#F7F8F6] pl-10 pr-4 text-xs text-ink outline-none transition placeholder:text-ink/30 focus:border-ink/15 focus:bg-white focus:ring-4 focus:ring-ink/[0.025]"
              />
            </div>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-between gap-4 rounded-[13px] border border-ink/[0.07] bg-[#F7F8F6] px-3.5 text-xs font-semibold text-ink/55 transition hover:border-ink/[0.12] hover:bg-white hover:text-ink"
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-ink/35" />
                All types
              </span>

              <ChevronDown className="h-3.5 w-3.5 text-ink/30" />
            </button>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-between gap-4 rounded-[13px] border border-ink/[0.07] bg-[#F7F8F6] px-3.5 text-xs font-semibold text-ink/55 transition hover:border-ink/[0.12] hover:bg-white hover:text-ink"
            >
              <span>All statuses</span>

              <ChevronDown className="h-3.5 w-3.5 text-ink/30" />
            </button>
          </div>

          {/* Ledger metadata */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-ink/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40">
                Live ledger
              </span>

              <span className="text-[10px] text-ink/25">·</span>

              <span className="text-[10px] text-ink/40">
                {transactions.length} recorded entries
              </span>
            </div>

            <span className="font-mono text-[9px] tracking-wide text-ink/30">
              NGN · PROJECT PRJ-2026-00421
            </span>
          </div>

          {/* Desktop table */}
          <div className="mt-1 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="border-b border-ink/[0.06] text-left">
                  <th className="py-3.5 pr-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                    Transaction
                  </th>

                  <th className="py-3.5 pr-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                    Type
                  </th>

                  <th className="py-3.5 pr-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                    Counterparty
                  </th>

                  <th className="py-3.5 pr-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                    Wallet
                  </th>

                  <th className="py-3.5 pr-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                    Amount
                  </th>

                  <th className="py-3.5 pr-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                    Status
                  </th>

                  <th className="py-3.5 text-right text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
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
          <div className="mt-4 space-y-3 md:hidden">
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
  const tone = getTransactionTone(transaction.status)

  return (
    <tr className="group border-b border-ink/[0.055] transition-colors last:border-0 hover:bg-[#F7F8F6]/60">
      <td className="py-4 pr-5">
        <div className="flex items-center gap-3">
          <TransactionIcon
            type={transaction.type}
            status={transaction.status}
          />

          <div className="min-w-0">
            <p className="font-mono text-[10px] font-semibold tracking-wide text-ink">
              {transaction.id}
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-[10px] text-ink/35">
                {transaction.projectId}
              </span>

              <span className="text-ink/15">·</span>

              <span className="font-mono text-[9px] text-ink/35">
                {transaction.reference}
              </span>
            </div>
          </div>
        </div>
      </td>

      <td className="py-4 pr-5">
        <div>
          <p className="text-xs font-semibold text-ink">
            {formatType(transaction.type)}
          </p>

          {transaction.milestone ? (
            <p className="mt-1 max-w-[180px] truncate text-[10px] text-ink/40">
              {transaction.milestone}
            </p>
          ) : (
            <p className="mt-1 max-w-[180px] truncate text-[10px] leading-4 text-ink/35">
              {transaction.description}
            </p>
          )}
        </div>
      </td>

      <td className="py-4 pr-5">
        <p className="max-w-[175px] text-xs font-semibold leading-5 text-ink">
          {transaction.counterparty}
        </p>

        <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.08em] text-ink/30">
          {custodyLabel[transaction.fundingSource]}
        </p>
      </td>

      <td className="py-4 pr-5">
        <span className="inline-flex rounded-full border border-ink/[0.06] bg-[#F7F8F6] px-2.5 py-1.5 text-[9px] font-semibold text-ink/50">
          {transaction.wallet}
        </span>
      </td>

      <td className="py-4 pr-5">
        <div>
          <p
            className={`whitespace-nowrap font-display text-[15px] font-semibold tracking-tight ${
              credit ? 'text-[#12613E]' : 'text-ink'
            }`}
          >
            {credit ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </p>

          <p className="mt-0.5 text-[9px] uppercase tracking-[0.1em] text-ink/25">
            {transaction.currency}
          </p>
        </div>
      </td>

      <td className="py-4 pr-5">
        <Badge tone={statusTone[transaction.status]}>
          {capitalize(transaction.status)}
        </Badge>
      </td>

      <td className="py-4 text-right">
        <p className="whitespace-nowrap font-mono text-[9px] text-ink/40">
          {transaction.date}
        </p>

        <button
          type="button"
          className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold text-ink/35 transition hover:text-ink"
        >
          View transaction
          <ExternalLink className="h-3 w-3" />
        </button>
      </td>

      <td className="relative w-0 p-0">
        <span
          className={`absolute bottom-0 left-0 right-0 h-px opacity-0 transition-opacity group-hover:opacity-100 ${tone.rail}`}
        />
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
  const tone = getTransactionTone(transaction.status)

  return (
    <article
      className={`group relative overflow-hidden rounded-[18px] border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(20,30,25,0.055)] ${
        transaction.status === 'frozen'
          ? 'border-[#B85C12]/[0.12] bg-[#F8EEE6]'
          : transaction.status === 'completed'
            ? 'border-ink/[0.07] bg-white'
            : 'border-ink/[0.07] bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <TransactionIcon
            type={transaction.type}
            status={transaction.status}
          />

          <div className="min-w-0">
            <p className="truncate font-mono text-[10px] font-semibold tracking-wide text-ink">
              {transaction.id}
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-[9px] text-ink/35">
                {transaction.projectId}
              </span>

              <span className="text-ink/15">·</span>

              <span className="font-mono text-[9px] text-ink/30">
                {transaction.reference}
              </span>
            </div>
          </div>
        </div>

        <Badge tone={statusTone[transaction.status]}>
          {capitalize(transaction.status)}
        </Badge>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
            {formatType(transaction.type)}
          </p>

          <p className="mt-1.5 truncate text-xs font-semibold text-ink">
            {transaction.counterparty}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p
            className={`font-display text-[17px] font-semibold tracking-tight ${
              credit ? 'text-[#12613E]' : 'text-ink'
            }`}
          >
            {credit ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </p>

          <p className="mt-0.5 text-[8px] uppercase tracking-[0.12em] text-ink/25">
            {transaction.currency}
          </p>
        </div>
      </div>

      {transaction.milestone && (
        <div className="mt-4 rounded-[13px] border border-ink/[0.05] bg-[#F7F8F6] px-3 py-2.5">
          <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/30">
            Milestone
          </p>

          <p className="mt-1 text-[10px] font-medium text-ink/60">
            {transaction.milestone}
          </p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-ink/[0.06] pt-3.5">
        <LedgerDetail
          label="Wallet"
          value={transaction.wallet}
        />

        <LedgerDetail
          label="Custody"
          value={custodyLabel[transaction.fundingSource]}
        />

        <LedgerDetail
          label="Date"
          value={transaction.date}
          mono
        />

        <LedgerDetail
          label="Reference"
          value={transaction.reference}
          mono
        />
      </div>

      <p className="mt-3.5 text-[10px] leading-5 text-ink/40">
        {transaction.description}
      </p>

      <button
        type="button"
        className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink/40 transition hover:text-ink"
      >
        View transaction
        <ExternalLink className="h-3 w-3" />
      </button>

      <span
        className={`absolute bottom-0 left-0 right-0 h-0.5 ${tone.rail}`}
      />
    </article>
  )
}

function TransactionIcon({
  type,
  status,
}: {
  type: TransactionType
  status: TransactionStatus
}) {
  const credit = isCredit(type)
  const tone = getTransactionTone(status)

  if (type === 'freeze') {
    return (
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] ${tone.icon}`}
      >
        <LockKeyhole className="h-4 w-4" />
      </div>
    )
  }

  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] ${tone.icon}`}
    >
      {credit ? (
        <ArrowDownLeft className="h-4 w-4" />
      ) : (
        <ArrowUpRight className="h-4 w-4" />
      )}
    </div>
  )
}

function LedgerDetail({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="min-w-0 rounded-[11px] bg-[#F7F8F6] px-2.5 py-2">
      <p className="text-[8px] uppercase tracking-[0.1em] text-ink/25">
        {label}
      </p>

      <p
        className={`mt-1 truncate text-[9px] font-semibold text-ink/55 ${
          mono ? 'font-mono font-medium' : ''
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function MetricCard({
  label,
  value,
  description,
  icon: Icon,
  tone,
}: {
  label: string
  value: string
  description: string
  icon: typeof Wallet
  tone: 'teal' | 'amber' | 'brick' | 'neutral'
}) {
  const toneStyles = {
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

  return (
    <Card className="group p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(20,30,25,0.05)] sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${toneStyles[tone].dot}`}
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
              {label}
            </p>
          </div>

          <p className="mt-2.5 font-display text-[20px] font-semibold tracking-[-0.025em] text-ink">
            {value}
          </p>

          <p className="mt-1 text-[10px] leading-4 text-ink/35">
            {description}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] transition-transform duration-200 group-hover:scale-[1.03] ${toneStyles[tone].icon}`}
        >
          <Icon className="h-[17px] w-[17px]" />
        </div>
      </div>
    </Card>
  )
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}