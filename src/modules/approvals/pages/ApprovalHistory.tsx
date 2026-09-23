
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Construction,
  FileCheck2,
  History,
  ShieldCheck,
  XCircle,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

type ApprovalOutcome =
  | 'Approved'
  | 'Correction Required'
  | 'Rejected'

interface ApprovalRecord {
  milestone: string
  project: string
  amount: string
  outcome: ApprovalOutcome
  decidedBy: string
  role: string
  date: string
  evidence: string
  payment: string
  note: string
}

function OutcomeBadge({ outcome }: { outcome: ApprovalOutcome }) {
  const config = {
    Approved: {
      icon: CheckCircle2,
      className:
        'border-emerald-500/15 bg-emerald-500/[0.07] text-emerald-700',
    },
    'Correction Required': {
      icon: AlertTriangle,
      className:
        'border-amber-500/15 bg-amber-500/[0.07] text-amber-700',
    },
    Rejected: {
      icon: XCircle,
      className:
        'border-red-500/15 bg-red-500/[0.06] text-red-600',
    },
  }[outcome]

  const Icon = config.icon

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1',
        'text-[9px] font-bold uppercase tracking-[0.07em]',
        config.className,
      ].join(' ')}
    >
      <Icon className="h-3 w-3" />
      {outcome}
    </span>
  )
}

function PaymentStatus({ status }: { status: string }) {
  const isReleased = status === 'Released'
  const isFrozen = status === 'Frozen'

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 text-[10px] font-bold',
        isReleased
          ? 'text-emerald-600'
          : isFrozen
            ? 'text-red-600'
            : 'text-amber-700',
      ].join(' ')}
    >
      {isReleased ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : isFrozen ? (
        <XCircle className="h-3.5 w-3.5" />
      ) : (
        <Clock3 className="h-3.5 w-3.5" />
      )}

      {status}
    </span>
  )
}

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
  tone = 'neutral',
}: {
  label: string
  value: string | number
  description: string
  icon: typeof History
  tone?: 'neutral' | 'success' | 'warning' | 'danger'
}) {
  const toneStyles = {
    neutral: {
      icon: 'bg-ink/[0.045] text-ink/55',
      value: 'text-ink',
    },
    success: {
      icon: 'bg-emerald-500/[0.08] text-emerald-600',
      value: 'text-ink',
    },
    warning: {
      icon: 'bg-amber-500/[0.08] text-amber-600',
      value: 'text-ink',
    },
    danger: {
      icon: 'bg-red-500/[0.07] text-red-500',
      value: 'text-ink',
    },
  }[tone]

  return (
    <Card
      className="
        group
        relative
        overflow-hidden
        p-5
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]
      "
    >
      <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-ink/[0.025]" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-ink/35">
            {label}
          </p>

          <p
            className={[
              'mt-2 font-display text-[28px] font-semibold leading-none tracking-[-0.035em]',
              toneStyles.value,
            ].join(' ')}
          >
            {value}
          </p>

          <p className="mt-2 text-[10px] leading-4 text-ink/40">
            {description}
          </p>
        </div>

        <div
          className={[
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
            'transition-transform duration-300 group-hover:scale-105',
            toneStyles.icon,
          ].join(' ')}
        >
          <Icon className="h-[17px] w-[17px]" />
        </div>
      </div>
    </Card>
  )
}

function RecordRow({ record }: { record: ApprovalRecord }) {
  const isApproved = record.outcome === 'Approved'
  const isRejected = record.outcome === 'Rejected'

  return (
    <div
      className="
        group
        relative
        px-5
        py-5
        transition-all
        duration-300
        hover:bg-ink/[0.018]
        sm:px-6
      "
    >
      <div
        className={[
          'absolute left-0 top-5 h-[calc(100%-40px)] w-[2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100',
          isApproved
            ? 'bg-emerald-500'
            : isRejected
              ? 'bg-red-500'
              : 'bg-amber-500',
        ].join(' ')}
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_120px] xl:items-center">

        {/* Identity */}
        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-[14px] font-semibold tracking-[-0.01em] text-ink">
              {record.milestone}
            </h3>

            <OutcomeBadge outcome={record.outcome} />
          </div>

          <p className="mt-1 text-[10px] font-medium text-ink/40">
            {record.project}
          </p>

          <p className="mt-3 max-w-2xl text-[10.5px] leading-5 text-ink/50">
            {record.note}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">

            <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-ink/40">
              <FileCheck2 className="h-3 w-3" />
              {record.evidence}
            </span>

            <span className="h-1 w-1 rounded-full bg-ink/15" />

            <span className="text-[9px] font-semibold text-ink/40">
              {record.role} · {record.decidedBy}
            </span>

          </div>
        </div>

        {/* Financial / verification metadata */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 xl:grid-cols-2">

          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-ink/30">
              Amount
            </p>

            <p className="mt-1 font-display text-[15px] font-semibold tracking-[-0.02em] text-ink">
              {record.amount}
            </p>
          </div>

          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-ink/30">
              Payment
            </p>

            <div className="mt-1">
              <PaymentStatus status={record.payment} />
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 xl:col-span-2">

            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-ink/30">
              Decision
            </p>

            <p className="mt-1 text-[10px] font-semibold text-ink/65">
              {record.date}
            </p>

          </div>

        </div>

        {/* Action */}
        <div className="flex items-center justify-between border-t border-ink/[0.06] pt-4 xl:block xl:border-0 xl:pt-0">

          <div className="hidden xl:block">
            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-ink/30">
              Record
            </p>

            <p className="mt-1 text-[9px] text-ink/40">
              Immutable
            </p>
          </div>

          <button
            type="button"
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-ink/[0.08]
              bg-white
              px-3
              py-1.5
              text-[9px]
              font-bold
              text-ink/55
              transition-all
              duration-200
              hover:border-ink/20
              hover:text-ink
              xl:mt-3
            "
          >
            View record
            <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </button>

        </div>

      </div>
    </div>
  )
}

export function ApprovalHistory() {
  const approvalRecords: ApprovalRecord[] = [
    {
      milestone: 'Foundation & Groundworks',
      project: 'Gwarinpa Residential Development',
      amount: '₦8.4M',
      outcome: 'Approved',
      decidedBy: 'Ahmed Ibrahim',
      role: 'Client',
      date: '27 Aug 2026',
      evidence: '4 / 4 verified',
      payment: 'Released',
      note: 'Foundation works verified and accepted.',
    },
    {
      milestone: 'Site Clearing & Preparation',
      project: 'Gwarinpa Residential Development',
      amount: '₦2.1M',
      outcome: 'Approved',
      decidedBy: 'Ahmed Ibrahim',
      role: 'Client',
      date: '18 Aug 2026',
      evidence: '6 / 6 verified',
      payment: 'Released',
      note: 'Site preparation completed according to approved scope.',
    },
    {
      milestone: 'Excavation Works',
      project: 'Maitama Duplex Construction',
      amount: '₦4.8M',
      outcome: 'Correction Required',
      decidedBy: 'Ibrahim Musa',
      role: 'Project Manager',
      date: '12 Aug 2026',
      evidence: '3 / 5 verified',
      payment: 'Frozen',
      note: 'Additional excavation measurement evidence required.',
    },
    {
      milestone: 'Substructure Works',
      project: 'Jabi Commercial Renovation',
      amount: '₦6.7M',
      outcome: 'Approved',
      decidedBy: 'Fatima Bello',
      role: 'Client',
      date: '04 Aug 2026',
      evidence: '8 / 8 verified',
      payment: 'Released',
      note: 'Inspection passed with no outstanding defects.',
    },
    {
      milestone: 'Electrical First Fix',
      project: 'Wuse II Office Fit-Out',
      amount: '₦3.2M',
      outcome: 'Rejected',
      decidedBy: 'Ibrahim Musa',
      role: 'Project Manager',
      date: '29 Jul 2026',
      evidence: '2 / 6 verified',
      payment: 'Frozen',
      note: 'Installation did not meet the approved specification.',
    },
  ]

  const approvedCount = approvalRecords.filter(
    (record) => record.outcome === 'Approved',
  ).length

  const correctionCount = approvalRecords.filter(
    (record) => record.outcome === 'Correction Required',
  ).length

  const rejectedCount = approvalRecords.filter(
    (record) => record.outcome === 'Rejected',
  ).length

  const releasedAmount = approvalRecords
    .filter((record) => record.payment === 'Released')
    .reduce(
      (total, record) =>
        total +
        Number(record.amount.replace(/[₦M,]/g, '')),
      0,
    )

  return (
    <div className="space-y-7">

      {/* ===================================================== */}
      {/* Premium page header */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden rounded-[26px] border border-ink/[0.07] bg-white px-6 py-7 shadow-[0_12px_40px_rgba(0,0,0,0.035)] sm:px-8">

        <div className="absolute right-0 top-0 h-48 w-48 translate-x-20 -translate-y-20 rounded-full bg-ink/[0.025]" />

        <div className="absolute bottom-0 right-[18%] h-24 w-24 translate-y-12 rounded-full bg-[#B85C12]/[0.035]" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <div>

            <div className="mb-3 flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink/35">
                Approval Control
              </span>

            </div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-ink/[0.045]">
                <Construction className="h-[19px] w-[19px] text-ink/65" />
              </div>

              <div>

                <h1 className="font-display text-[28px] font-semibold leading-none tracking-[-0.035em] text-ink sm:text-[34px]">
                  Approval History
                </h1>

                <p className="mt-2 max-w-2xl text-[11px] leading-5 text-ink/45">
                  A permanent record of milestone decisions, evidence
                  verification and payment outcomes across your projects.
                </p>

              </div>

            </div>

          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/[0.045] px-3.5 py-2.5">

            <ShieldCheck className="h-4 w-4 text-emerald-600" />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-emerald-700">
                Control status
              </p>

              <p className="mt-0.5 text-[10px] font-semibold text-ink/55">
                Audit-ready records
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* Decision intelligence */}
      {/* ===================================================== */}

      <section>

        <div className="mb-3 flex items-end justify-between">

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-ink/30">
              Decision intelligence
            </p>

            <h2 className="mt-1 font-display text-[17px] font-semibold tracking-[-0.015em] text-ink">
              Approval activity
            </h2>
          </div>

          <span className="hidden text-[9px] font-medium text-ink/30 sm:block">
            Historical control ledger
          </span>

        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">

          <SummaryCard
            label="Total decisions"
            value={approvalRecords.length}
            description="Recorded milestone decisions"
            icon={History}
          />

          <SummaryCard
            label="Approved"
            value={approvedCount}
            description="Payment authorization granted"
            icon={CheckCircle2}
            tone="success"
          />

          <SummaryCard
            label="Corrections"
            value={correctionCount}
            description="Evidence or work correction"
            icon={AlertTriangle}
            tone="warning"
          />

          <SummaryCard
            label="Rejected"
            value={rejectedCount}
            description="Payment remains frozen"
            icon={XCircle}
            tone="danger"
          />

          <SummaryCard
            label="Released"
            value={`₦${releasedAmount.toFixed(1)}M`}
            description="Payments authorized"
            icon={ShieldCheck}
            tone="success"
          />

        </div>

      </section>

      {/* ===================================================== */}
      {/* History ledger */}
      {/* ===================================================== */}

      <Card className="overflow-hidden border-ink/[0.07] shadow-[0_12px_40px_rgba(0,0,0,0.035)]">

        <div className="border-b border-ink/[0.07] bg-[#FCFCFB] px-5 py-5 sm:px-6">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/[0.045]">
                  <FileCheck2 className="h-4 w-4 text-ink/55" />
                </div>

                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/35">
                  Decision records
                </p>

              </div>

              <h2 className="mt-2 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
                Milestone approval ledger
              </h2>

              <p className="mt-1 text-[10px] text-ink/35">
                Evidence-controlled decisions retained for project audit.
              </p>

            </div>

            <div className="flex items-center gap-2 rounded-full border border-ink/[0.07] bg-white px-3 py-2">

              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/45">
                {approvalRecords.length} records
              </span>

            </div>

          </div>

        </div>

        {/* Column labels */}

        <div className="hidden border-b border-ink/[0.06] bg-ink/[0.012] px-6 py-2.5 xl:grid xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_120px]">

          <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/25">
            Milestone & decision
          </span>

          <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/25">
            Financial control
          </span>

          <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/25">
            Record
          </span>

        </div>

        <div className="divide-y divide-ink/[0.06]">

          {approvalRecords.map((record) => (
            <RecordRow
              key={`${record.project}-${record.milestone}`}
              record={record}
            />
          ))}

        </div>

        <div className="border-t border-ink/[0.06] bg-[#FCFCFB] px-6 py-3">

          <div className="flex flex-wrap items-center justify-between gap-2">

            <p className="text-[9px] text-ink/30">
              Showing {approvalRecords.length} recorded decisions
            </p>

            <p className="flex items-center gap-1.5 text-[9px] font-semibold text-ink/35">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              Evidence-controlled ledger
            </p>

          </div>

        </div>

      </Card>

      {/* ===================================================== */}
      {/* Governance principle */}
      {/* ===================================================== */}

      <Card className="relative overflow-hidden border-emerald-500/15 bg-emerald-500/[0.025] p-5 sm:p-6">

        <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-emerald-500/[0.035]" />

        <div className="relative flex gap-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/[0.08]">
            <ShieldCheck className="h-[18px] w-[18px] text-emerald-600" />
          </div>

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-700">
              Governance principle
            </p>

            <p className="mt-1 font-display text-[16px] font-semibold tracking-[-0.015em] text-ink">
              Approval records are immutable
            </p>

            <p className="mt-1.5 max-w-3xl text-[10.5px] leading-5 text-ink/50">
              Every milestone decision should retain its evidence,
              inspection result, decision maker, timestamp, payment outcome
              and audit trail. A later correction should create a new
              workflow event rather than silently modifying the original
              decision.
            </p>

          </div>

        </div>

      </Card>

    </div>
  )
}