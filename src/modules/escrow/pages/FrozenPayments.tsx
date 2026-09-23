import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
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

  const activePayments = frozenPayments.filter(
    (payment) => payment.status !== 'resolved',
  )

  const activeCases = activePayments.length

  const underReview = frozenPayments.filter(
    (payment) => payment.status === 'under_review',
  ).length

  const resolvedCases = frozenPayments.filter(
    (payment) => payment.status === 'resolved',
  ).length

  return (
    <div className="space-y-7">

      {/* ===================================================== */}
      {/* Page header                                             */}
      {/* ===================================================== */}

      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div className="min-w-0">

          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Escrow controls
            </p>

            <span className="hidden h-3 w-px bg-ink/10 sm:block" />

            <p className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-ink/30 sm:block">
              Payment protection
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <h1 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
              Frozen Payments
            </h1>

            {activeCases > 0 && (
              <span
                className="
                  inline-flex items-center gap-1.5
                  rounded-full
                  border border-[#B85C12]/15
                  bg-[#F8EEE6]
                  px-2.5 py-1.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-[#B85C12]
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />
                {activeCases} active {activeCases === 1 ? 'case' : 'cases'}
              </span>
            )}

          </div>

          <p className="mt-2 max-w-2xl text-[12px] leading-5 text-ink/45 sm:text-[13px]">
            Payment lines placed on hold because of a dispute, verification
            issue or unresolved milestone condition.
          </p>
        </div>

        <button
          type="button"
          className="
            group
            inline-flex
            w-fit
            shrink-0
            items-center
            gap-2
            rounded-full
            border border-ink/[0.09]
            bg-white
            px-4
            py-2.5
            text-xs
            font-semibold
            text-ink
            shadow-[0_4px_16px_rgba(20,30,25,0.035)]
            transition-all
            duration-300
            hover:border-ink/20
            hover:shadow-[0_8px_22px_rgba(20,30,25,0.07)]
          "
        >
          <FileText className="h-3.5 w-3.5 text-ink/45" />

          View payment history

          <ArrowRight
            className="
              h-3.5 w-3.5
              text-ink/30
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          />
        </button>

      </header>

      {/* ===================================================== */}
      {/* Custody disclosure                                      */}
      {/* ===================================================== */}

      <CustodyNotice
        fundingSource="partner_escrow"
        custodian="Approved escrow partner"
      />

      {/* ===================================================== */}
      {/* Executive summary                                       */}
      {/* ===================================================== */}

      <section
        aria-label="Frozen payment summary"
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        <SummaryCard
          icon={LockKeyhole}
          label="Frozen payment lines"
          value={String(activeCases)}
          description="Currently protected from release"
          tone="brick"
        />

        <SummaryCard
          icon={WalletCards}
          label="Affected amount"
          value={formatNaira(
            activePayments.reduce(
              (total, payment) => total + parseAmount(payment.amount),
              0,
            ),
          )}
          description="Across active frozen payment lines"
          tone="ink"
        />

        <SummaryCard
          icon={Scale}
          label="Awaiting resolution"
          value={String(underReview)}
          description="Cases currently under review"
          tone="amber"
        />
      </section>

      {/* ===================================================== */}
      {/* Protection banner                                      */}
      {/* ===================================================== */}

      <section
        aria-label="Payment protection notice"
        className="
          relative
          overflow-hidden
          rounded-[20px]
          border border-[#12613E]/10
          bg-[#F4F7F4]
        "
      >
        {/* Decorative accent */}
        <div
          className="
            absolute
            bottom-0
            left-0
            top-0
            w-1
            bg-[#12613E]
          "
        />

        <div className="flex items-start gap-4 px-5 py-4.5 sm:px-6 sm:py-5">

          <div
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl
              bg-white
              text-[#12613E]
              shadow-[0_3px_12px_rgba(20,40,30,0.05)]
              ring-1 ring-[#12613E]/10
            "
          >
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[12px] font-semibold text-ink">
                Frozen funds are protected from release
              </p>

              <span
                className="
                  rounded-full
                  bg-white
                  px-2 py-1
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-[#12613E]/65
                  ring-1 ring-[#12613E]/10
                "
              >
                Controlled
              </span>
            </div>

            <p className="mt-1.5 max-w-4xl text-[10.5px] leading-[1.8] text-ink/45">
              Build OS records the freeze, tracks evidence and controls the
              approval workflow. The underlying funds remain with the configured
              escrow/payment provider or bank channel.
            </p>
          </div>

        </div>
      </section>

      {/* ===================================================== */}
      {/* Frozen payment lines                                   */}
      {/* ===================================================== */}

      <section aria-label="Frozen payment lines">

        <Card className="overflow-hidden">

          <CardHeader
            title="Frozen payment lines"
            subtitle="Payments affected by active disputes or unresolved verification conditions"
          />

          <CardBody className="p-3 sm:p-4">

            {frozenPayments.length > 0 ? (
              <div className="space-y-3">
                {frozenPayments.map((payment) => (
                  <FrozenPaymentCard
                    key={payment.id}
                    payment={payment}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}

          </CardBody>

        </Card>

      </section>

      {/* ===================================================== */}
      {/* Workflow                                                */}
      {/* ===================================================== */}

      <section aria-label="Freeze and resolution workflow">

        <Card>

          <CardHeader
            title="Freeze & resolution workflow"
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
                active
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

      </section>

      {/* ===================================================== */}
      {/* Resolution status                                      */}
      {/* ===================================================== */}

      {resolvedCases > 0 && (
        <div
          className="
            flex items-center gap-3
            rounded-2xl
            border border-[#12613E]/10
            bg-[#F4F7F4]
            px-4 py-3
          "
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#12613E]">
            <CheckCircle2 className="h-4 w-4" />
          </div>

          <div>
            <p className="text-[11px] font-semibold text-ink">
              {resolvedCases} resolved {resolvedCases === 1 ? 'case' : 'cases'}
            </p>

            <p className="mt-0.5 text-[10px] text-ink/40">
              Resolved payment lines remain available in the payment history.
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

function FrozenPaymentCard({
  payment,
}: {
  payment: FrozenPayment
}) {
  const isFrozen = payment.status === 'payment_frozen'
  const isUnderReview = payment.status === 'under_review'
  const isResolved = payment.status === 'resolved'

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[18px]
        border border-ink/[0.07]
        bg-white
        transition-all
        duration-300
        hover:border-ink/[0.12]
        hover:shadow-[0_12px_35px_rgba(20,30,25,0.055)]
      "
    >
      <div className="p-4 sm:p-5">

        {/* =================================================== */}
        {/* Main identity row                                    */}
        {/* =================================================== */}

        <div className="flex flex-col gap-5 xl:flex-row xl:items-center">

          {/* Identity */}
          <div className="flex min-w-0 flex-1 items-start gap-3.5">

            <div
              className={[
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px]',
                isFrozen
                  ? 'bg-[#F8EEE6] text-[#B85C12]'
                  : isUnderReview
                    ? 'bg-[#F7F1E7] text-[#9A6818]'
                    : 'bg-[#EAF4EE] text-[#12613E]',
              ].join(' ')}
            >
              {isResolved ? (
                <CheckCircle2 className="h-[17px] w-[17px]" />
              ) : (
                <LockKeyhole className="h-[17px] w-[17px]" />
              )}
            </div>

            <div className="min-w-0 flex-1">

              <div className="flex flex-wrap items-center gap-2">

                <p className="max-w-full truncate text-[12px] font-semibold tracking-[-0.01em] text-ink sm:text-[13px]">
                  {payment.milestone}
                </p>

                <Badge tone={statusTone[payment.status]}>
                  {formatStatus(payment.status)}
                </Badge>

              </div>

              <p className="mt-1 text-[11px] text-ink/45">
                {payment.projectName}
              </p>

              {/* Reference IDs */}
              <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1">

                <ReferenceId value={payment.id} />

                <ReferenceId value={payment.projectId} />

                <ReferenceId value={payment.disputeId} />

              </div>

            </div>

          </div>

          {/* Amount */}
          <div className="flex items-center justify-between gap-6 border-t border-ink/[0.06] pt-4 xl:min-w-[180px] xl:border-0 xl:pt-0 xl:text-right">

            <div className="xl:ml-auto">

              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
                Frozen amount
              </p>

              <p className="mt-1 font-display text-[20px] font-semibold tracking-[-0.025em] text-ink">
                {payment.amount}
              </p>

              <div className="mt-1 flex items-center gap-1.5 text-[9.5px] text-ink/35 xl:justify-end">

                <Clock3 className="h-3 w-3" />

                <span>
                  {payment.daysFrozen === 0
                    ? 'Frozen today'
                    : `${payment.daysFrozen} days frozen`}
                </span>

              </div>

            </div>

          </div>

          {/* Action */}
          <button
            type="button"
            className="
              group/action
              inline-flex
              h-10
              w-full
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-ink
              px-4
              text-[11px]
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-ink/90
              xl:w-auto
            "
          >
            View case

            <ArrowRight
              className="
                h-3.5 w-3.5
                text-white/50
                transition-transform
                duration-300
                group-hover/action:translate-x-0.5
              "
            />
          </button>

        </div>

        {/* =================================================== */}
        {/* Secondary information                                */}
        {/* =================================================== */}

        <div className="mt-4 grid gap-3 border-t border-ink/[0.06] pt-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">

          {/* Reason */}
          <div className="flex min-w-0 items-start gap-2.5">

            <div
              className="
                mt-0.5
                flex h-6 w-6 shrink-0
                items-center justify-center
                rounded-lg
                bg-[#F8EEE6]
                text-[#B85C12]
              "
            >
              <AlertTriangle className="h-3 w-3" />
            </div>

            <p className="text-[10.5px] leading-[1.7] text-ink/45">
              <span className="font-semibold text-ink/60">
                Reason:
              </span>{' '}
              {payment.reason}
            </p>

          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-1.5 pl-[34px] text-[9.5px] text-ink/30 md:pl-0">

            <Clock3 className="h-3 w-3" />

            <span>{payment.frozenAt}</span>

          </div>

        </div>

      </div>

      {/* Bottom status rail */}
      <div
        className={[
          'h-0.5 w-full transition-opacity duration-300',
          isFrozen
            ? 'bg-[#B85C12]'
            : isUnderReview
              ? 'bg-[#C28A2C]'
              : 'bg-[#12613E]',
          'opacity-70 group-hover:opacity-100',
        ].join(' ')}
      />

    </article>
  )
}

function ReferenceId({
  value,
}: {
  value: string
}) {
  return (
    <span className="font-mono text-[8.5px] font-medium tracking-[-0.01em] text-ink/25">
      {value}
    </span>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  tone,
}: {
  icon: typeof LockKeyhole
  label: string
  value: string
  description: string
  tone: 'brick' | 'ink' | 'amber'
}) {
  const iconClasses = {
    brick: 'bg-[#F8EEE6] text-[#B85C12]',
    ink: 'bg-ink/[0.05] text-ink/45',
    amber: 'bg-[#F7F1E7] text-[#9A6818]',
  }

  return (
    <Card className="p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(20,30,25,0.05)]">
      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-ink/35">
            {label}
          </p>

          <p className="mt-2 font-display text-[25px] font-semibold tracking-[-0.035em] text-ink">
            {value}
          </p>

          <p className="mt-1 text-[10px] leading-4 text-ink/35">
            {description}
          </p>

        </div>

        <div
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
            iconClasses[tone],
          ].join(' ')}
        >
          <Icon className="h-4 w-4" />
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
  active = false,
}: {
  icon: typeof LockKeyhole
  step: string
  title: string
  description: string
  active?: boolean
}) {
  return (
    <div
      className={[
        'relative rounded-[16px] border p-4 transition-all duration-300',
        active
          ? 'border-[#B85C12]/15 bg-[#F8EEE6]/45'
          : 'border-ink/[0.06] bg-[#F7F8F6] hover:border-ink/[0.10] hover:bg-white',
      ].join(' ')}
    >
      <div className="flex items-center justify-between">

        <div
          className={[
            'flex h-8 w-8 items-center justify-center rounded-xl',
            active
              ? 'bg-white text-[#B85C12] shadow-sm'
              : 'bg-white text-ink/40',
          ].join(' ')}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>

        <span
          className={[
            'font-mono text-[9px] font-semibold',
            active ? 'text-[#B85C12]/60' : 'text-ink/20',
          ].join(' ')}
        >
          {step}
        </span>

      </div>

      <p className="mt-4 text-[11px] font-semibold text-ink">
        {title}
      </p>

      <p className="mt-1 text-[9.5px] leading-[1.7] text-ink/40">
        {description}
      </p>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-[18px] bg-[#F7F8F6] px-6 py-12 text-center">

      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#12613E] shadow-sm ring-1 ring-ink/[0.05]">
        <ShieldCheck className="h-[18px] w-[18px]" />
      </div>

      <p className="mt-4 text-[12px] font-semibold text-ink">
        No frozen payments
      </p>

      <p className="mt-1 max-w-sm text-[10.5px] leading-5 text-ink/40">
        There are currently no payment lines being held for disputes or
        unresolved verification conditions.
      </p>

    </div>
  )
}

function parseAmount(value: string) {
  const normalized = value
    .replace(/[₦,\s]/g, '')
    .toUpperCase()

  if (normalized.endsWith('M')) {
    return Number.parseFloat(normalized.replace('M', '')) * 1_000_000
  }

  if (normalized.endsWith('K')) {
    return Number.parseFloat(normalized.replace('K', '')) * 1_000
  }

  return Number.parseFloat(normalized) || 0
}

function formatNaira(value: number) {
  if (value >= 1_000_000) {
    return `₦${(value / 1_000_000).toFixed(2)}M`
  }

  return `₦${value.toLocaleString('en-NG')}`
}