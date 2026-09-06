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
  if (outcome === 'Approved') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
        <CheckCircle2 className="h-3 w-3" />
        Approved
      </span>
    )
  }

  if (outcome === 'Rejected') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-600">
        <XCircle className="h-3 w-3" />
        Rejected
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
      <AlertTriangle className="h-3 w-3" />
      Correction Required
    </span>
  )
}

function PaymentStatus({ status }: { status: string }) {
  const isReleased = status === 'Released'
  const isFrozen = status === 'Frozen'

  return (
    <span
      className={
        isReleased
          ? 'inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600'
          : isFrozen
            ? 'inline-flex items-center gap-1.5 text-xs font-semibold text-red-600'
            : 'inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700'
      }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <Construction className="h-5 w-5 text-ink/70" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Approval Control
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Approval History
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Review previous milestone decisions, verification outcomes and
            payment releases across your construction projects.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-medium text-ink/55">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          Audit-ready records
        </div>
      </div>

      {/* Summary */}
      <section>
        <div className="mb-3">
          <h2 className="font-display text-base font-semibold text-ink">
            Decision summary
          </h2>

          <p className="mt-0.5 text-xs text-ink/40">
            Historical milestone approval activity
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
                  Total decisions
                </p>

                <p className="mt-2 font-display text-2xl font-semibold text-ink">
                  {approvalRecords.length}
                </p>

                <p className="mt-1 text-xs text-ink/40">
                  Recorded approvals
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                <History className="h-5 w-5 text-ink/55" />
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
                  Approved
                </p>

                <p className="mt-2 font-display text-2xl font-semibold text-ink">
                  {approvedCount}
                </p>

                <p className="mt-1 text-xs text-emerald-600">
                  Payment authorized
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
                  Corrections
                </p>

                <p className="mt-2 font-display text-2xl font-semibold text-ink">
                  {correctionCount}
                </p>

                <p className="mt-1 text-xs text-amber-700">
                  Evidence or work correction
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
                  Rejected
                </p>

                <p className="mt-2 font-display text-2xl font-semibold text-ink">
                  {rejectedCount}
                </p>

                <p className="mt-1 text-xs text-red-600">
                  Payment frozen
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* History */}
      <Card className="overflow-hidden">
        <div className="border-b border-line px-6 py-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Decision records
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Milestone approval history
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-ink/40">
              <FileCheck2 className="h-4 w-4" />
              Evidence-controlled
            </div>
          </div>
        </div>

        <div className="divide-y divide-line">
          {approvalRecords.map((record) => (
            <div
              key={`${record.project}-${record.milestone}`}
              className="px-6 py-5 transition-colors hover:bg-ink/[0.02]"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                {/* Milestone */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-ink">
                      {record.milestone}
                    </h3>

                    <OutcomeBadge outcome={record.outcome} />
                  </div>

                  <p className="mt-1 text-xs text-ink/40">
                    {record.project}
                  </p>

                  <p className="mt-3 max-w-xl text-xs leading-5 text-ink/50">
                    {record.note}
                  </p>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4 xl:min-w-[580px]">
                  <div>
                    <p className="text-xs text-ink/40">
                      Amount
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {record.amount}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-ink/40">
                      Evidence
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {record.evidence}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-ink/40">
                      Decision by
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {record.decidedBy}
                    </p>

                    <p className="mt-0.5 text-[10px] text-ink/35">
                      {record.role}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-ink/40">
                      Payment
                    </p>

                    <div className="mt-1">
                      <PaymentStatus status={record.payment} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-line pt-4 xl:block xl:min-w-[110px] xl:border-0 xl:pt-0">
                  <div>
                    <p className="text-xs text-ink/40">
                      Decision date
                    </p>

                    <p className="mt-1 text-xs font-semibold text-ink">
                      {record.date}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/50 transition-colors hover:text-ink xl:mt-3"
                  >
                    View details
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Control principle */}
      <Card className="border-emerald-500/15 bg-emerald-500/[0.025] p-5">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

          <div>
            <p className="text-sm font-semibold text-ink">
              Approval records are immutable
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/50">
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