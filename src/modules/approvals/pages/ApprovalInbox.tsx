import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Construction,
  FileCheck2,
  ShieldCheck,
  UserRound,
  XCircle,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

type ApprovalPriority = 'High' | 'Medium' | 'Normal'

interface ApprovalItem {
  milestone: string
  project: string
  contractor: string
  amount: string
  submitted: string
  due: string
  progress: number
  evidence: string
  inspection: 'Passed' | 'Pending' | 'Correction Required'
  priority: ApprovalPriority
  description: string
}

function PriorityBadge({
  priority,
}: {
  priority: ApprovalPriority
}) {
  const classes =
    priority === 'High'
      ? 'bg-red-500/10 text-red-600'
      : priority === 'Medium'
        ? 'bg-amber-500/10 text-amber-700'
        : 'bg-ink/5 text-ink/50'

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${classes}`}
    >
      {priority} priority
    </span>
  )
}

function InspectionBadge({
  status,
}: {
  status: ApprovalItem['inspection']
}) {
  if (status === 'Passed') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Inspection passed
      </span>
    )
  }

  if (status === 'Correction Required') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600">
        <XCircle className="h-3.5 w-3.5" />
        Correction required
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">
      <Clock3 className="h-3.5 w-3.5" />
      Inspection pending
    </span>
  )
}

export function ApprovalInbox() {
  const approvalItems: ApprovalItem[] = [
    {
      milestone: 'Foundation & Groundworks',
      project: 'Gwarinpa Residential Development',
      contractor: 'PrimeBuild Construction Ltd.',
      amount: '₦8.4M',
      submitted: '27 Aug 2026',
      due: 'Today',
      progress: 100,
      evidence: '4 / 4 verified',
      inspection: 'Passed',
      priority: 'High',
      description:
        'Foundation works have been completed and submitted for client approval and milestone payment release.',
    },
    {
      milestone: 'Roofing Structure',
      project: 'Maitama Duplex Construction',
      contractor: 'NexaBuild Projects Ltd.',
      amount: '₦11.6M',
      submitted: '26 Aug 2026',
      due: 'Tomorrow',
      progress: 100,
      evidence: '7 / 8 verified',
      inspection: 'Pending',
      priority: 'Medium',
      description:
        'Roof structure and covering have been submitted. Final inspection confirmation is still required.',
    },
    {
      milestone: 'Electrical First Fix',
      project: 'Wuse II Office Fit-Out',
      contractor: 'VoltEdge Engineering',
      amount: '₦3.2M',
      submitted: '25 Aug 2026',
      due: 'In 2 days',
      progress: 100,
      evidence: '6 / 6 verified',
      inspection: 'Passed',
      priority: 'Normal',
      description:
        'Electrical conduit and first-fix installation submitted with supporting evidence and inspection report.',
    },
    {
      milestone: 'Excavation Works',
      project: 'Jabi Commercial Renovation',
      contractor: 'Capital Earthworks Ltd.',
      amount: '₦4.8M',
      submitted: '24 Aug 2026',
      due: 'In 3 days',
      progress: 94,
      evidence: '3 / 5 verified',
      inspection: 'Correction Required',
      priority: 'High',
      description:
        'Additional excavation measurements and final site evidence are required before approval.',
    },
  ]

  const highPriority = approvalItems.filter(
    (item) => item.priority === 'High',
  ).length

  const totalValue = '₦28.0M'

  const readyForApproval = approvalItems.filter(
    (item) =>
      item.inspection === 'Passed' &&
      item.evidence.split(' / ')[0] === item.evidence.split(' / ')[1],
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
            Approval Inbox
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Review construction milestones submitted for approval,
            verification and payment release.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-medium text-ink/55">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          Controlled approval workflow
        </div>
      </div>

      {/* Summary */}
      <section>
        <div className="mb-3">
          <h2 className="font-display text-base font-semibold text-ink">
            Approval queue
          </h2>

          <p className="mt-0.5 text-xs text-ink/40">
            Items currently requiring your attention
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
                  Awaiting approval
                </p>

                <p className="mt-2 font-display text-2xl font-semibold text-ink">
                  {approvalItems.length}
                </p>

                <p className="mt-1 text-xs text-ink/40">
                  Active decisions
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                <Clock3 className="h-5 w-5 text-ink/55" />
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
                  High priority
                </p>

                <p className="mt-2 font-display text-2xl font-semibold text-ink">
                  {highPriority}
                </p>

                <p className="mt-1 text-xs text-red-600">
                  Requires immediate attention
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
                  Approval value
                </p>

                <p className="mt-2 font-display text-2xl font-semibold text-ink">
                  {totalValue}
                </p>

                <p className="mt-1 text-xs text-ink/40">
                  Funds awaiting decision
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                <FileCheck2 className="h-5 w-5 text-ink/55" />
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
                  Ready to approve
                </p>

                <p className="mt-2 font-display text-2xl font-semibold text-ink">
                  {readyForApproval}
                </p>

                <p className="mt-1 text-xs text-emerald-600">
                  Evidence and inspection complete
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Approval queue */}
      <Card className="overflow-hidden">
        <div className="border-b border-line px-6 py-5">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Pending decisions
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Milestones awaiting approval
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-ink/40">
              <FileCheck2 className="h-4 w-4" />
              Evidence-controlled
            </div>
          </div>
        </div>

        <div className="divide-y divide-line">
          {approvalItems.map((item) => (
            <div
              key={`${item.project}-${item.milestone}`}
              className="px-6 py-6 transition-colors hover:bg-ink/[0.02]"
            >
              <div className="flex flex-col gap-5">
                {/* Top row */}
                <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-ink">
                        {item.milestone}
                      </h3>

                      <PriorityBadge priority={item.priority} />
                    </div>

                    <p className="mt-1 text-xs text-ink/40">
                      {item.project}
                    </p>

                    <p className="mt-3 max-w-3xl text-xs leading-5 text-ink/50">
                      {item.description}
                    </p>
                  </div>

                  <div className="shrink-0 text-left lg:text-right">
                    <p className="text-xs text-ink/40">
                      Milestone value
                    </p>

                    <p className="mt-1 font-display text-xl font-semibold text-ink">
                      {item.amount}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="max-w-3xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink/40">
                      Completion submitted
                    </span>

                    <span className="font-semibold text-ink/60">
                      {item.progress}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
                    <div
                      className="h-full rounded-full bg-ink transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          Math.max(item.progress, 0),
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid gap-4 border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-5">
                  <div>
                    <p className="text-xs text-ink/40">
                      Contractor
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-ink">
                      <UserRound className="h-3.5 w-3.5 text-ink/40" />
                      {item.contractor}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-ink/40">
                      Submitted
                    </p>

                    <p className="mt-1 text-xs font-semibold text-ink">
                      {item.submitted}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-ink/40">
                      Decision due
                    </p>

                    <p
                      className={
                        item.due === 'Today'
                          ? 'mt-1 text-xs font-semibold text-red-600'
                          : 'mt-1 text-xs font-semibold text-ink'
                      }
                    >
                      {item.due}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-ink/40">
                      Evidence
                    </p>

                    <p className="mt-1 text-xs font-semibold text-ink">
                      {item.evidence}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-ink/40">
                      Inspection
                    </p>

                    <div className="mt-1">
                      <InspectionBadge status={item.inspection} />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-between gap-3 border-t border-line pt-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2 text-xs text-ink/40">
                    <ShieldCheck className="h-4 w-4" />

                    <span>
                      Review evidence before authorizing payment.
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03] hover:text-ink"
                    >
                      Review submission
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    {item.inspection === 'Passed' &&
                      item.evidence.split(' / ')[0] ===
                        item.evidence.split(' / ')[1] && (
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Approve & Release
                        </button>
                      )}

                    {item.inspection === 'Correction Required' && (
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-500/10"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Request Correction
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Workflow rule */}
      <Card className="border-amber-500/15 bg-amber-500/[0.025] p-5">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

          <div>
            <p className="text-sm font-semibold text-ink">
              Approval control
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/50">
              A milestone should only proceed to payment approval after the
              contractor submits the required evidence, the Project Manager
              completes verification and the client review is complete.
              Rejected or incomplete submissions should remain payment-frozen
              until the required correction or evidence is recorded.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}