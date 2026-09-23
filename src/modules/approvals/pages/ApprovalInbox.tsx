
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
  const config = {
    High: {
      className:
        'border-red-500/15 bg-red-500/[0.07] text-red-600',
      dot: 'bg-red-500',
    },
    Medium: {
      className:
        'border-amber-500/15 bg-amber-500/[0.07] text-amber-700',
      dot: 'bg-amber-500',
    },
    Normal: {
      className:
        'border-ink/10 bg-ink/[0.035] text-ink/50',
      dot: 'bg-ink/30',
    },
  }[priority]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide ${config.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {priority} priority
    </span>
  )
}

function InspectionBadge({
  status,
}: {
  status: ApprovalItem['inspection']
}) {
  const config = {
    Passed: {
      icon: CheckCircle2,
      label: 'Inspection passed',
      className: 'text-emerald-600',
    },
    'Correction Required': {
      icon: XCircle,
      label: 'Correction required',
      className: 'text-red-600',
    },
    Pending: {
      icon: Clock3,
      label: 'Inspection pending',
      className: 'text-amber-700',
    },
  }[status]

  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  )
}

function SummaryCard({
  label,
  value,
  caption,
  icon: Icon,
  tone = 'neutral',
}: {
  label: string
  value: string | number
  caption: string
  icon: typeof Clock3
  tone?: 'neutral' | 'danger' | 'success' | 'warning'
}) {
  const toneConfig = {
    neutral: {
      iconBg: 'bg-ink/[0.045]',
      icon: 'text-ink/55',
      value: 'text-ink',
    },
    danger: {
      iconBg: 'bg-red-500/[0.08]',
      icon: 'text-red-500',
      value: 'text-ink',
    },
    success: {
      iconBg: 'bg-emerald-500/[0.08]',
      icon: 'text-emerald-600',
      value: 'text-ink',
    },
    warning: {
      iconBg: 'bg-amber-500/[0.08]',
      icon: 'text-amber-600',
      value: 'text-ink',
    },
  }[tone]

  return (
    <Card className="group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.055)]">
      <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-ink/[0.025] transition-transform duration-500 group-hover:scale-125" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
            {label}
          </p>

          <p
            className={`mt-2 font-display text-[26px] font-semibold tracking-tight ${toneConfig.value}`}
          >
            {value}
          </p>

          <p className="mt-1 text-xs text-ink/40">
            {caption}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneConfig.iconBg}`}
        >
          <Icon className={`h-[18px] w-[18px] ${toneConfig.icon}`} />
        </div>
      </div>
    </Card>
  )
}

function EvidenceStatus({
  evidence,
}: {
  evidence: string
}) {
  const [verified, total] = evidence
    .split(' / ')
    .map(Number)

  const complete =
    Number.isFinite(verified) &&
    Number.isFinite(total) &&
    verified === total

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
          complete
            ? 'bg-emerald-500/[0.08]'
            : 'bg-amber-500/[0.08]'
        }`}
      >
        <FileCheck2
          className={`h-3.5 w-3.5 ${
            complete
              ? 'text-emerald-600'
              : 'text-amber-600'
          }`}
        />
      </div>

      <span
        className={`text-xs font-semibold ${
          complete ? 'text-emerald-700' : 'text-ink/65'
        }`}
      >
        {evidence}
      </span>
    </div>
  )
}

function ApprovalItemRow({
  item,
}: {
  item: ApprovalItem
}) {
  const evidenceParts = item.evidence
    .split(' / ')
    .map(Number)

  const evidenceComplete =
    evidenceParts.length === 2 &&
    evidenceParts[0] === evidenceParts[1]

  const canApprove =
    item.inspection === 'Passed' &&
    evidenceComplete

  const isUrgent =
    item.priority === 'High' ||
    item.due === 'Today'

  return (
    <div
      className={`group relative overflow-hidden px-6 py-7 transition-all duration-300 hover:bg-ink/[0.018] ${
        isUrgent ? 'bg-red-500/[0.012]' : ''
      }`}
    >
      {/* Priority rail */}
      <div
        className={`absolute inset-y-0 left-0 w-[2px] transition-all duration-300 ${
          item.priority === 'High'
            ? 'bg-red-500'
            : item.priority === 'Medium'
              ? 'bg-amber-500'
              : 'bg-transparent group-hover:bg-ink/15'
        }`}
      />

      <div className="space-y-6">
        {/* Identity + value */}
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div className="min-w-0 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-[17px] font-semibold tracking-tight text-ink">
                {item.milestone}
              </h3>

              <PriorityBadge priority={item.priority} />
            </div>

            <p className="mt-1 text-xs font-medium text-ink/40">
              {item.project}
            </p>

            <p className="mt-3 max-w-3xl text-[12px] leading-5 text-ink/50">
              {item.description}
            </p>
          </div>

          <div className="shrink-0 lg:text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/30">
              Milestone value
            </p>

            <p className="mt-1 font-display text-[25px] font-semibold tracking-tight text-ink">
              {item.amount}
            </p>

            <p className="mt-1 text-[10px] text-ink/35">
              Awaiting authorization
            </p>
          </div>
        </div>

        {/* Completion meter */}
        <div className="max-w-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-ink/35">
                Completion submitted
              </span>

              {item.progress === 100 && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                  <CheckCircle2 className="h-3 w-3" />
                  Complete
                </span>
              )}
            </div>

            <span className="font-display text-xs font-semibold text-ink/65">
              {item.progress}%
            </span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                item.progress === 100
                  ? 'bg-emerald-600'
                  : 'bg-ink'
              }`}
              style={{
                width: `${Math.min(
                  Math.max(item.progress, 0),
                  100,
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Metadata grid */}
        <div className="grid gap-5 border-y border-line py-5 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-ink/30">
              Contractor
            </p>

            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink/75">
              <UserRound className="h-3.5 w-3.5 text-ink/35" />
              {item.contractor}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-ink/30">
              Submitted
            </p>

            <p className="mt-1.5 text-xs font-semibold text-ink/75">
              {item.submitted}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-ink/30">
              Decision due
            </p>

            <p
              className={`mt-1.5 text-xs font-semibold ${
                item.due === 'Today'
                  ? 'text-red-600'
                  : 'text-ink/75'
              }`}
            >
              {item.due}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-ink/30">
              Evidence
            </p>

            <div className="mt-1">
              <EvidenceStatus evidence={item.evidence} />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-ink/30">
              Inspection
            </p>

            <div className="mt-1.5">
              <InspectionBadge status={item.inspection} />
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-2 text-xs text-ink/40">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ink/35" />

            <span>
              Evidence verification is required before payment
              authorization.
            </span>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/65 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all hover:border-ink/15 hover:bg-ink/[0.025] hover:text-ink"
            >
              Review submission

              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {canApprove && (
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white shadow-[0_5px_16px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Approve & Release
              </button>
            )}

            {item.inspection === 'Correction Required' && (
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/15 bg-red-500/[0.045] px-4 py-2.5 text-xs font-semibold text-red-600 transition-all hover:bg-red-500/[0.08]"
              >
                <XCircle className="h-3.5 w-3.5" />
                Request Correction
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
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

  const readyForApproval = approvalItems.filter((item) => {
    const [verified, total] = item.evidence
      .split(' / ')
      .map(Number)

    return (
      item.inspection === 'Passed' &&
      verified === total
    )
  }).length

  const parseAmount = (amount: string) => {
    const numeric = Number(
      amount.replace(/[₦,]/g, '').replace(/M$/i, ''),
    )

    return Number.isFinite(numeric) ? numeric : 0
  }

  const totalValue = approvalItems
    .reduce((total, item) => total + parseAmount(item.amount), 0)
    .toFixed(1)

  const totalValueLabel = `₦${totalValue}M`

  return (
    <div className="space-y-6">
      {/* Premium header */}
      <div className="relative overflow-hidden rounded-[26px] border border-line bg-white px-6 py-7 shadow-[0_12px_40px_rgba(0,0,0,0.035)] sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#B85C12]/[0.035]" />
        <div className="pointer-events-none absolute bottom-[-90px] right-28 h-40 w-40 rounded-full bg-ink/[0.025]" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink">
                <Construction className="h-4 w-4 text-white" />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                Approval Control
              </span>

              <span className="h-1 w-1 rounded-full bg-[#B85C12]" />
              <span className="text-[10px] font-medium text-ink/35">
                Live queue
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-[34px]">
              Approval Inbox
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
              Review construction milestones, validate completion
              evidence and authorize controlled payment release.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/[0.045] px-3.5 py-2 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Controlled approval workflow
          </div>
        </div>
      </div>

      {/* Queue intelligence */}
      <section>
        <div className="mb-3.5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
              Decision intelligence
            </p>

            <h2 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">
              Approval queue
            </h2>

            <p className="mt-0.5 text-xs text-ink/40">
              Current submissions requiring review or authorization
            </p>
          </div>

          <span className="text-xs font-medium text-ink/35">
            {approvalItems.length} active submissions
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Awaiting approval"
            value={approvalItems.length}
            caption="Active decisions"
            icon={Clock3}
          />

          <SummaryCard
            label="High priority"
            value={highPriority}
            caption="Requires immediate attention"
            icon={AlertTriangle}
            tone="danger"
          />

          <SummaryCard
            label="Approval value"
            value={totalValueLabel}
            caption="Funds awaiting decision"
            icon={FileCheck2}
          />

          <SummaryCard
            label="Ready to approve"
            value={readyForApproval}
            caption="Evidence and inspection complete"
            icon={CheckCircle2}
            tone="success"
          />
        </div>
      </section>

      {/* Approval ledger */}
      <Card className="overflow-hidden rounded-[22px]">
        <div className="border-b border-line bg-white px-6 py-5 sm:px-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                  Pending decisions
                </p>
              </div>

              <h2 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-ink">
                Milestones awaiting approval
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-line bg-paper-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/40">
              <FileCheck2 className="h-3.5 w-3.5" />
              Evidence controlled
            </div>
          </div>
        </div>

        <div className="divide-y divide-line">
          {approvalItems.map((item) => (
            <ApprovalItemRow
              key={`${item.project}-${item.milestone}`}
              item={item}
            />
          ))}
        </div>

        <div className="border-t border-line bg-paper-2/50 px-6 py-4 sm:px-7">
          <div className="flex flex-col justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/30 sm:flex-row">
            <span>
              {approvalItems.length} submissions in approval queue
            </span>

            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Audit-ready workflow
            </span>
          </div>
        </div>
      </Card>

      {/* Governance rule */}
      <Card className="relative overflow-hidden border-amber-500/15 bg-amber-500/[0.025] p-5 sm:p-6">
        <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-amber-500/[0.035]" />

        <div className="relative flex gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/[0.08]">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">
              Approval control principle
            </p>

            <p className="mt-1 max-w-4xl text-xs leading-5 text-ink/50">
              A milestone should only proceed to payment approval
              after the contractor submits the required evidence, the
              Project Manager completes verification and the client
              review is complete. Rejected or incomplete submissions
              remain payment-frozen until the required correction or
              evidence is formally recorded.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}