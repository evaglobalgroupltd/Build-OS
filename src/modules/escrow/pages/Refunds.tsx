import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  History,
  LockKeyhole,
  Plus,
  RefreshCcw,
  ShieldCheck,
  User,
  WalletCards,
  XCircle,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CustodyNotice } from '@/modules/escrow/components/CustodyNotice'

type RefundStatus =
  | 'requested'
  | 'under_review'
  | 'approved'
  | 'processing'
  | 'completed'
  | 'blocked'
  | 'rejected'

type RefundReason =
  | 'project_cancellation'
  | 'unused_funds'
  | 'overpayment'
  | 'dispute_resolution'
  | 'procurement_cancellation'
  | 'other'

interface Refund {
  id: string
  projectId: string
  projectName: string
  client: string
  reason: RefundReason
  sourceWallet: string
  amount: string
  requestedAt: string
  status: RefundStatus
  description: string
  destination: string
  reconciliationStatus: 'pending' | 'matched' | 'complete'
  evidenceCount: number
  disputeRelated: boolean
}

const refunds: Refund[] = [
  {
    id: 'REF-2026-00184',
    projectId: 'PRJ-2026-00421',
    projectName: 'Abuja Residential Development',
    client: 'Client / Diaspora Investor',
    reason: 'unused_funds',
    sourceWallet: 'Material Wallet',
    amount: '₦780K',
    requestedAt: '27 Aug 2026 · 10:14',
    status: 'under_review',
    description:
      'Unused balance following cancellation of an approved material procurement request.',
    destination: 'Verified client payment account',
    reconciliationStatus: 'pending',
    evidenceCount: 2,
    disputeRelated: false,
  },
  {
    id: 'REF-2026-00181',
    projectId: 'PRJ-2026-00388',
    projectName: 'Lekki Mixed-Use Development',
    client: 'Client / Diaspora Investor',
    reason: 'procurement_cancellation',
    sourceWallet: 'Material Wallet',
    amount: '₦1.15M',
    requestedAt: '26 Aug 2026 · 15:32',
    status: 'approved',
    description:
      'Approved return of reserved procurement funds after the supplier order was cancelled before dispatch.',
    destination: 'Verified client payment account',
    reconciliationStatus: 'matched',
    evidenceCount: 3,
    disputeRelated: false,
  },
  {
    id: 'REF-2026-00177',
    projectId: 'PRJ-2026-00361',
    projectName: 'Kano Residential Build',
    client: 'Client / Diaspora Investor',
    reason: 'dispute_resolution',
    sourceWallet: 'Labour Wallet',
    amount: '₦2.40M',
    requestedAt: '25 Aug 2026 · 09:18',
    status: 'blocked',
    description:
      'Refund proposed as part of a dispute resolution concerning an incomplete milestone.',
    destination: 'Verified client payment account',
    reconciliationStatus: 'pending',
    evidenceCount: 5,
    disputeRelated: true,
  },
  {
    id: 'REF-2026-00169',
    projectId: 'PRJ-2026-00314',
    projectName: 'Port Harcourt Commercial Property',
    client: 'Client / Diaspora Investor',
    reason: 'overpayment',
    sourceWallet: 'Professional Wallet',
    amount: '₦320K',
    requestedAt: '23 Aug 2026 · 12:46',
    status: 'completed',
    description:
      'Verified overpayment identified during final project reconciliation.',
    destination: 'Verified client payment account',
    reconciliationStatus: 'complete',
    evidenceCount: 2,
    disputeRelated: false,
  },
]

const reasonLabel: Record<RefundReason, string> = {
  project_cancellation: 'Project cancellation',
  unused_funds: 'Unused funds',
  overpayment: 'Overpayment',
  dispute_resolution: 'Dispute resolution',
  procurement_cancellation: 'Procurement cancellation',
  other: 'Other',
}

const statusTone: Record<
  RefundStatus,
  'neutral' | 'amber' | 'brick' | 'teal'
> = {
  requested: 'neutral',
  under_review: 'amber',
  approved: 'teal',
  processing: 'amber',
  completed: 'teal',
  blocked: 'brick',
  rejected: 'brick',
}

function formatStatus(status: RefundStatus) {
  return status
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function Refunds() {
  const activeRefunds = refunds.filter(
    (refund) =>
      refund.status !== 'completed' &&
      refund.status !== 'rejected',
  )

  const pendingReview = refunds.filter(
    (refund) =>
      refund.status === 'requested' ||
      refund.status === 'under_review',
  )

  const blockedRefunds = refunds.filter(
    (refund) =>
      refund.status === 'blocked' ||
      refund.disputeRelated,
  )

  const completedRefunds = refunds.filter(
    (refund) => refund.status === 'completed',
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <RefreshCcw className="h-5 w-5 text-ink/60" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Escrow & payments
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Refunds
            </h1>

            <Badge tone="amber">
              {activeRefunds.length} active
            </Badge>
          </div>

          <p className="mt-1 max-w-2xl text-sm text-ink/50">
            Track returned project funds, unused balances, cancelled
            procurement amounts and approved dispute-related refunds.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-ink/90"
        >
          <Plus className="h-4 w-4" />
          Request refund
        </button>
      </div>

      {/* Custody notice */}
      <CustodyNotice
        fundingSource="partner_escrow"
        custodian="Approved escrow partner"
      />

      {/* Summary */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Active refunds"
          value={String(activeRefunds.length)}
          description="Refunds currently in workflow"
          icon={RefreshCcw}
        />

        <SummaryCard
          label="Under review"
          value={String(pendingReview.length)}
          description="Refund requests requiring review"
          icon={Clock3}
        />

        <SummaryCard
          label="Blocked"
          value={String(blockedRefunds.length)}
          description="Refunds requiring additional resolution"
          icon={LockKeyhole}
          alert
        />

        <SummaryCard
          label="Completed"
          value={String(completedRefunds.length)}
          description="Successfully reconciled refunds"
          icon={CheckCircle2}
        />
      </div>

      {/* Refund controls */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Refund controls"
          subtitle="Funds are returned only after the applicable review and reconciliation checks"
        />

        <CardBody>
          <div className="grid gap-2 md:grid-cols-5">
            <WorkflowStep
              number="01"
              title="Request"
              description="Refund reason and amount submitted"
            />

            <WorkflowStep
              number="02"
              title="Review"
              description="Source balance and supporting evidence checked"
            />

            <WorkflowStep
              number="03"
              title="Approve"
              description="Authorised refund decision recorded"
            />

            <WorkflowStep
              number="04"
              title="Process"
              description="Applicable payment channel processes return"
            />

            <WorkflowStep
              number="05"
              title="Reconcile"
              description="Transaction matched and audit trail completed"
            />
          </div>
        </CardBody>
      </Card>

      {/* Queue */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Refund queue"
          subtitle="Refunds linked to projects, wallets and the original funding/payment activity"
        />

        <CardBody>
          <div className="space-y-3">
            {refunds.map((refund) => (
              <RefundCard
                key={refund.id}
                refund={refund}
              />
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Reconciliation note */}
      <Card className="overflow-hidden">
        <CardBody>
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
              <History className="h-4 w-4 text-ink/50" />
            </div>

            <div>
              <p className="text-sm font-semibold text-ink">
                Refund reconciliation
              </p>

              <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/45">
                Completed refunds remain linked to their originating wallet,
                project, request and payment records. Reconciliation status
                provides an auditable record that the returned amount was
                matched to the expected transaction.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function RefundCard({
  refund,
}: {
  refund: Refund
}) {
  const blocked =
    refund.status === 'blocked' ||
    refund.disputeRelated

  const completed = refund.status === 'completed'

  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        blocked
          ? 'border-red-500/15 bg-red-500/[0.025]'
          : completed
            ? 'border-emerald-500/15 bg-emerald-500/[0.02]'
            : 'border-line bg-paper-2 hover:border-ink/15'
      }`}
    >
      {/* Top */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={statusTone[refund.status]}>
              {blocked ? 'Blocked' : formatStatus(refund.status)}
            </Badge>

            <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[9px] font-semibold text-ink/40">
              {refund.id}
            </span>

            <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-ink/40">
              {reasonLabel[refund.reason]}
            </span>
          </div>

          <h2 className="mt-3 text-sm font-semibold text-ink">
            {refund.projectName}
          </h2>

          <p className="mt-1 text-xs text-ink/45">
            {refund.projectId}
          </p>
        </div>

        <div className="xl:text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            Refund amount
          </p>

          <p className="mt-1 font-mono text-lg font-semibold tracking-tight text-ink">
            {refund.amount}
          </p>
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-5 grid gap-3 border-y border-line py-4 sm:grid-cols-2 xl:grid-cols-4">
        <DetailItem
          icon={User}
          label="Client"
          value={refund.client}
        />

        <DetailItem
          label="Source wallet"
          value={refund.sourceWallet}
        />

        <DetailItem
          label="Requested"
          value={refund.requestedAt}
          mono
        />

        <DetailItem
          label="Reconciliation"
          value={formatReconciliation(refund.reconciliationStatus)}
        />
      </div>

      {/* Description */}
      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
          Refund reason
        </p>

        <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/55">
          {refund.description}
        </p>
      </div>

      {/* Destination */}
      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-line bg-white p-3">
        <WalletCards className="mt-0.5 h-4 w-4 shrink-0 text-ink/35" />

        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
            Refund destination
          </p>

          <p className="mt-1 truncate text-[11px] font-semibold text-ink/60">
            {refund.destination}
          </p>
        </div>
      </div>

      {/* Checks */}
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <CheckItem
          label="Evidence"
          value={`${refund.evidenceCount} files`}
          complete={refund.evidenceCount > 0}
        />

        <CheckItem
          label="Dispute status"
          value={blocked ? 'Blocked' : 'Clear'}
          complete={!blocked}
          danger={blocked}
        />

        <CheckItem
          label="Reconciliation"
          value={formatReconciliation(
            refund.reconciliationStatus,
          )}
          complete={refund.reconciliationStatus === 'complete'}
        />
      </div>

      {/* Blocked */}
      {blocked && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-500/15 bg-red-500/[0.04] p-3">
          <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />

          <div>
            <p className="text-xs font-semibold text-red-700">
              Refund is currently blocked
            </p>

            <p className="mt-1 text-[11px] leading-5 text-ink/45">
              This refund is associated with an active dispute or protected
              payment line. Further processing should remain suspended until
              the applicable resolution is authorised.
            </p>
          </div>
        </div>
      )}

      {/* Completed */}
      {completed && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-3">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

          <div>
            <p className="text-xs font-semibold text-emerald-700">
              Refund completed and reconciled
            </p>

            <p className="mt-1 text-[11px] leading-5 text-ink/45">
              The refund has been completed and the resulting transaction
              has been matched against the project records.
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-[10px] text-ink/35">
          <ShieldCheck className="h-3.5 w-3.5" />
          Refund actions are recorded in the audit trail.
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-[11px] font-semibold text-ink/55 transition hover:text-ink"
          >
            <FileText className="h-3.5 w-3.5" />
            View details
          </button>

          <button
            type="button"
            disabled={blocked || completed}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[11px] font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {completed ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Completed
              </>
            ) : blocked ? (
              <>
                <LockKeyhole className="h-3.5 w-3.5" />
                Processing blocked
              </>
            ) : (
              <>
                Review refund
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
  alert = false,
}: {
  label: string
  value: string
  description: string
  icon: typeof RefreshCcw
  alert?: boolean
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
            {label}
          </p>

          <p
            className={`mt-2 font-mono text-xl font-semibold tracking-tight ${
              alert ? 'text-red-600' : 'text-ink'
            }`}
          >
            {value}
          </p>
        </div>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            alert ? 'bg-red-500/10' : 'bg-paper-2'
          }`}
        >
          <Icon
            className={`h-4 w-4 ${
              alert ? 'text-red-600' : 'text-ink/45'
            }`}
          />
        </div>
      </div>

      <p className="mt-2 text-[10px] leading-4 text-ink/35">
        {description}
      </p>
    </Card>
  )
}

function WorkflowStep({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-line bg-paper-2 p-3">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] font-semibold text-ink/30">
          {number}
        </span>

        <p className="text-xs font-semibold text-ink">
          {title}
        </p>
      </div>

      <p className="mt-2 text-[10px] leading-4 text-ink/40">
        {description}
      </p>
    </div>
  )
}

function DetailItem({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon?: typeof User
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5">
        {Icon && <Icon className="h-3 w-3 text-ink/30" />}

        <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
          {label}
        </p>
      </div>

      <p
        className={`mt-1 truncate text-[11px] font-semibold text-ink/65 ${
          mono ? 'font-mono' : ''
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function CheckItem({
  label,
  value,
  complete,
  danger = false,
}: {
  label: string
  value: string
  complete: boolean
  danger?: boolean
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5">
      {complete ? (
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
      ) : danger ? (
        <XCircle className="h-3.5 w-3.5 shrink-0 text-red-600" />
      ) : (
        <Clock3 className="h-3.5 w-3.5 shrink-0 text-amber-500" />
      )}

      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-wide text-ink/30">
          {label}
        </p>

        <p
          className={`mt-0.5 truncate text-[10px] font-semibold ${
            danger
              ? 'text-red-600'
              : complete
                ? 'text-ink/60'
                : 'text-amber-700'
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

function formatReconciliation(
  status: Refund['reconciliationStatus'],
) {
  const labels = {
    pending: 'Pending',
    matched: 'Matched',
    complete: 'Complete',
  }

  return labels[status]
}