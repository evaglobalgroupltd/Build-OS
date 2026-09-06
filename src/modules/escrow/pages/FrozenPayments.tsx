import {
  AlertTriangle,
  ArrowRight,
  Clock3,
  FileText,
  LockKeyhole,
  MessageSquare,
  Scale,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { FundingSource } from '@/modules/escrow/types'
import { CustodyNotice } from '@/modules/escrow/components/CustodyNotice'

interface FrozenPayment {
  id: string
  projectId: string
  projectName: string
  disputeId: string
  milestone: string
  amount: string
  fundingSource: FundingSource
  custodian: string
  reason: string
  frozenAt: string
  status: 'payment_frozen' | 'under_review' | 'resolved'
  daysFrozen: number
}

const frozenPayments: FrozenPayment[] = [
  {
    id: 'PAY-2026-00871',
    projectId: 'PRJ-2026-00421',
    projectName: 'Abuja Residential Development',
    disputeId: 'DSP-2026-00418',
    milestone: 'Milestone 04 — Internal Finishing',
    amount: '₦2.85M',
    fundingSource: 'partner_escrow',
    custodian: 'Approved escrow partner',
    reason:
      'Client disputes completion of agreed internal finishing works.',
    frozenAt: '27 Aug 2026 · 09:49',
    status: 'payment_frozen',
    daysFrozen: 0,
  },
  {
    id: 'PAY-2026-00842',
    projectId: 'PRJ-2026-00387',
    projectName: 'Lagos Commercial Development',
    disputeId: 'DSP-2026-00391',
    milestone: 'Milestone 02 — Structural Works',
    amount: '₦6.40M',
    fundingSource: 'partner_escrow',
    custodian: 'Approved escrow partner',
    reason:
      'Delivery and milestone evidence are under technical review.',
    frozenAt: '25 Aug 2026 · 14:21',
    status: 'under_review',
    daysFrozen: 2,
  },
]

const statusTone = {
  payment_frozen: 'brick',
  under_review: 'amber',
  resolved: 'teal',
} as const

function formatStatus(status: FrozenPayment['status']) {
  return status
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function FrozenPayments() {
  const totalFrozen = frozenPayments.reduce(
    (total, payment) => total + parseAmount(payment.amount),
    0,
  )

  const activeCases = frozenPayments.filter(
    (payment) => payment.status !== 'resolved',
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10">
              <LockKeyhole className="h-5 w-5 text-red-600" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Escrow controls
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Frozen Payments
            </h1>

            <Badge tone="brick">
              {activeCases} active {activeCases === 1 ? 'case' : 'cases'}
            </Badge>
          </div>

          <p className="mt-1 max-w-2xl text-sm text-ink/50">
            Payment lines placed on hold because of a dispute, verification
            issue or unresolved milestone condition.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 transition hover:bg-ink/[0.02] hover:text-ink"
        >
          <FileText className="h-4 w-4" />
          View payment history
        </button>
      </div>

      {/* Compliance notice */}
      <CustodyNotice
        fundingSource="partner_escrow"
        custodian="Approved escrow partner"
      />

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          icon={LockKeyhole}
          label="Frozen payment lines"
          value={String(activeCases)}
          description="Currently protected from release"
        />

        <SummaryCard
          icon={WalletCards}
          label="Affected amount"
          value={formatNaira(totalFrozen)}
          description="Across active frozen payment lines"
        />

        <SummaryCard
          icon={Scale}
          label="Awaiting resolution"
          value={String(
            frozenPayments.filter(
              (payment) => payment.status === 'under_review',
            ).length,
          )}
          description="Cases currently under review"
        />
      </div>

      {/* Control banner */}
      <div className="flex gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

        <div>
          <p className="text-sm font-semibold text-ink">
            Frozen funds are protected from release
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/50">
            Build OS records the freeze, tracks evidence and controls the
            approval workflow. The underlying funds remain with the configured
            escrow/payment provider or bank channel.
          </p>
        </div>
      </div>

      {/* Payment list */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Frozen payment lines"
          subtitle="Payments affected by active disputes or unresolved verification conditions"
        />

        <CardBody>
          <div className="space-y-3">
            {frozenPayments.map((payment) => (
              <FrozenPaymentCard
                key={payment.id}
                payment={payment}
              />
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Workflow */}
      <Card>
        <CardHeader
          title="Freeze and resolution workflow"
          subtitle="How Build OS handles an affected payment line"
        />

        <CardBody>
          <div className="grid gap-3 md:grid-cols-5">
            <WorkflowStep
              icon={MessageSquare}
              step="01"
              title="Dispute opened"
              description="A formal complaint is raised against the affected payment."
            />

            <WorkflowStep
              icon={LockKeyhole}
              step="02"
              title="Payment frozen"
              description="The affected payment line is placed on hold."
            />

            <WorkflowStep
              icon={FileText}
              step="03"
              title="Evidence review"
              description="Parties submit supporting documents and records."
            />

            <WorkflowStep
              icon={Scale}
              step="04"
              title="Resolution"
              description="Admin or technical review determines the next action."
            />

            <WorkflowStep
              icon={ShieldCheck}
              step="05"
              title="Settlement"
              description="Payment recommendation or refund proceeds through the configured channel."
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function FrozenPaymentCard({
  payment,
}: {
  payment: FrozenPayment
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper-2 p-4 transition hover:border-ink/15">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* Identity */}
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
            <LockKeyhole className="h-5 w-5 text-red-600" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-sm font-semibold text-ink">
                {payment.milestone}
              </p>

              <Badge tone={statusTone[payment.status]}>
                {formatStatus(payment.status)}
              </Badge>
            </div>

            <p className="mt-1 text-xs text-ink/45">
              {payment.projectName}
            </p>

            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-ink/30">
              <span>{payment.id}</span>
              <span>{payment.projectId}</span>
              <span>{payment.disputeId}</span>
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="xl:min-w-[150px] xl:text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            Frozen amount
          </p>

          <p className="mt-1 font-mono text-lg font-semibold text-ink">
            {payment.amount}
          </p>

          <p className="mt-1 text-[10px] text-ink/35">
            {payment.daysFrozen === 0
              ? 'Frozen today'
              : `${payment.daysFrozen} days frozen`}
          </p>
        </div>

        {/* Action */}
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-ink px-4 text-xs font-semibold text-white transition hover:bg-ink/90"
        >
          View case
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-4 grid gap-3 border-t border-line pt-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />

          <p className="text-[11px] leading-5 text-ink/45">
            <span className="font-semibold text-ink/60">Reason:</span>{' '}
            {payment.reason}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-ink/35">
          <Clock3 className="h-3.5 w-3.5" />
          {payment.frozenAt}
        </div>
      </div>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: typeof LockKeyhole
  label: string
  value: string
  description: string
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
            {label}
          </p>

          <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
            {value}
          </p>

          <p className="mt-1 text-[10px] text-ink/35">
            {description}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
          <Icon className="h-4 w-4 text-ink/45" />
        </div>
      </div>
    </Card>
  )
}

function WorkflowStep({
  icon: Icon,
  step,
  title,
  description,
}: {
  icon: typeof LockKeyhole
  step: string
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-line bg-paper-2 p-4">
      <div className="flex items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
          <Icon className="h-4 w-4 text-ink/45" />
        </div>

        <span className="font-mono text-[9px] font-semibold text-ink/25">
          {step}
        </span>
      </div>

      <p className="mt-4 text-xs font-semibold text-ink">
        {title}
      </p>

      <p className="mt-1 text-[10px] leading-5 text-ink/40">
        {description}
      </p>
    </div>
  )
}

function parseAmount(value: string) {
  return Number(value.replace(/[₦M,]/g, '')) * 1_000_000
}

function formatNaira(value: number) {
  if (value >= 1_000_000) {
    return `₦${(value / 1_000_000).toFixed(2)}M`
  }

  return `₦${value.toLocaleString('en-NG')}`
}