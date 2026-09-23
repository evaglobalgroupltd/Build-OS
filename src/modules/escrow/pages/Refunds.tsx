import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
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

function formatReconciliation(
  status: Refund['reconciliationStatus'],
) {
  return {
    pending: 'Pending',
    matched: 'Matched',
    complete: 'Complete',
  }[status]
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
    <div className="space-y-7">
      {/* ─────────────────────────────────────────────
          Header
      ───────────────────────────────────────────── */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
              Escrow controls
            </span>

            <span className="h-3.5 w-px bg-ink/10" />

            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink/30">
              Refund management
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-[30px] font-semibold tracking-[-0.035em] text-ink sm:text-[34px]">
              Refunds
            </h1>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F1E7] px-3 py-1.5 text-[10px] font-semibold text-[#8A641D]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C28A2C]" />
              {activeRefunds.length} active
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/45">
            Track returned project funds, unused balances, cancelled
            procurement amounts and approved dispute-related refunds.
          </p>
        </div>

        <button
          type="button"
          className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[11px] font-semibold text-white shadow-[0_6px_18px_rgba(11,18,32,0.08)] transition duration-200 hover:-translate-y-0.5 hover:bg-ink/90 hover:shadow-[0_9px_24px_rgba(11,18,32,0.12)]"
        >
          <Plus className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-90" />
          Request refund
        </button>
      </div>

      {/* ─────────────────────────────────────────────
          Custody
      ───────────────────────────────────────────── */}
      <CustodyNotice
        fundingSource="partner_escrow"
        custodian="Approved escrow partner"
      />

      {/* ─────────────────────────────────────────────
          Summary
      ───────────────────────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Active refunds"
          value={String(activeRefunds.length)}
          description="Refunds currently in workflow"
          icon={RefreshCcw}
          tone="ink"
        />

        <SummaryCard
          label="Under review"
          value={String(pendingReview.length)}
          description="Refund requests requiring review"
          icon={Clock3}
          tone="amber"
        />

        <SummaryCard
          label="Blocked"
          value={String(blockedRefunds.length)}
          description="Refunds requiring additional resolution"
          icon={LockKeyhole}
          tone="brick"
        />

        <SummaryCard
          label="Completed"
          value={String(completedRefunds.length)}
          description="Successfully reconciled refunds"
          icon={CheckCircle2}
          tone="teal"
        />
      </div>

      {/* ─────────────────────────────────────────────
          Refund controls
      ───────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Refund controls"
          subtitle="Funds are returned only after the applicable review and reconciliation checks"
        />

        <CardBody className="p-3 sm:p-4">
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

      {/* ─────────────────────────────────────────────
          Refund queue
      ───────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Refund queue"
          subtitle="Refunds linked to projects, wallets and the original funding/payment activity"
        />

        <CardBody className="p-3 sm:p-4">
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

      {/* ─────────────────────────────────────────────
          Reconciliation
      ───────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <CardBody className="p-0">
          <div className="relative flex items-start gap-4 overflow-hidden bg-[#F7F8F6] p-5 sm:p-6">
            <div className="absolute inset-y-0 left-0 w-1 bg-ink/20" />

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_4px_14px_rgba(20,30,25,0.035)]">
              <History className="h-[18px] w-[18px] text-ink/45" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-ink">
                  Refund reconciliation
                </p>

                <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-ink/40">
                  Audit ready
                </span>
              </div>

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
    <article
      className={`group relative overflow-hidden rounded-[18px] border transition duration-200 ${
        blocked
          ? 'border-[#B85C12]/15 bg-[#F8EEE6]'
          : completed
            ? 'border-[#12613E]/12 bg-[#F4F7F4]'
            : 'border-ink/[0.07] bg-white hover:-translate-y-0.5 hover:border-ink/[0.11] hover:shadow-[0_12px_34px_rgba(20,30,25,0.055)]'
      }`}
    >
      {/* Status rail */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[2px] ${
          blocked
            ? 'bg-[#B85C12]/55'
            : completed
              ? 'bg-[#12613E]/45'
              : refund.status === 'approved'
                ? 'bg-[#12613E]/35'
                : 'bg-[#C28A2C]/45'
        }`}
      />

      <div className="p-4 sm:p-5">
        {/* Top */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={statusTone[refund.status]}>
                {blocked ? 'Blocked' : formatStatus(refund.status)}
              </Badge>

              <span className="rounded-full bg-[#F7F8F6] px-2.5 py-1 font-mono text-[9px] font-semibold tracking-wide text-ink/35">
                {refund.id}
              </span>

              <span className="rounded-full border border-ink/[0.06] bg-white px-2.5 py-1 text-[9px] font-semibold text-ink/40">
                {reasonLabel[refund.reason]}
              </span>
            </div>

            <div className="mt-3">
              <h2 className="font-display text-[17px] font-semibold tracking-[-0.015em] text-ink">
                {refund.projectName}
              </h2>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink/40">
                <span className="font-mono text-[10px]">
                  {refund.projectId}
                </span>

                <span className="h-1 w-1 rounded-full bg-ink/20" />

                <span>{refund.sourceWallet}</span>
              </div>
            </div>
          </div>

          <div
            className={`shrink-0 rounded-[14px] px-4 py-3 xl:min-w-[150px] xl:text-right ${
              blocked
                ? 'bg-white/65'
                : completed
                  ? 'bg-white/70'
                  : 'bg-[#F7F8F6]'
            }`}
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
              Refund amount
            </p>

            <p className="mt-1 font-display text-[21px] font-semibold tracking-[-0.025em] text-ink">
              {refund.amount}
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-5 grid gap-px overflow-hidden rounded-[14px] border border-ink/[0.06] bg-ink/[0.045] sm:grid-cols-2 xl:grid-cols-4">
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
            value={formatReconciliation(
              refund.reconciliationStatus,
            )}
          />
        </div>

        {/* Description */}
        <div className="mt-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/30">
            Refund reason
          </p>

          <p className="mt-1.5 max-w-3xl text-xs leading-5 text-ink/55">
            {refund.description}
          </p>
        </div>

        {/* Destination */}
        <div className="mt-5 flex items-start gap-3 rounded-[14px] border border-ink/[0.06] bg-[#F7F8F6] p-3.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-[0_3px_10px_rgba(20,30,25,0.035)]">
            <WalletCards className="h-4 w-4 text-ink/40" />
          </div>

          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
              Refund destination
            </p>

            <p className="mt-1 truncate text-[11px] font-semibold text-ink/60">
              {refund.destination}
            </p>
          </div>
        </div>

        {/* Checks */}
        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          <CheckItem
            label="Evidence"
            value={`${refund.evidenceCount} ${
              refund.evidenceCount === 1 ? 'file' : 'files'
            }`}
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
          <div className="mt-4 overflow-hidden rounded-[14px] border border-[#B85C12]/15 bg-white/55">
            <div className="flex items-start gap-3 border-l-2 border-[#B85C12] p-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F8EEE6]">
                <AlertTriangle className="h-4 w-4 text-[#B85C12]" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold text-[#8E4A13]">
                    Refund is currently protected
                  </p>

                  <span className="rounded-full bg-[#F8EEE6] px-2 py-0.5 text-[9px] font-semibold text-[#9A5518]">
                    Resolution required
                  </span>
                </div>

                <p className="mt-1 text-[11px] leading-5 text-ink/45">
                  This refund is associated with an active dispute or
                  protected payment line. Further processing should remain
                  suspended until the applicable resolution is authorised.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Completed */}
        {completed && (
          <div className="mt-4 overflow-hidden rounded-[14px] border border-[#12613E]/12 bg-white/60">
            <div className="flex items-start gap-3 border-l-2 border-[#12613E] p-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4F7F4]">
                <CheckCircle2 className="h-4 w-4 text-[#12613E]" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold text-[#12613E]">
                    Refund completed and reconciled
                  </p>

                  <span className="rounded-full bg-[#F4F7F4] px-2 py-0.5 text-[9px] font-semibold text-[#12613E]">
                    Complete
                  </span>
                </div>

                <p className="mt-1 text-[11px] leading-5 text-ink/45">
                  The refund has been completed and the resulting transaction
                  has been matched against the project records.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-3 border-t border-ink/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[10px] text-ink/35">
            <ShieldCheck className="h-3.5 w-3.5 text-ink/30" />
            Refund actions are recorded in the audit trail.
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/[0.08] bg-white px-4 py-2.5 text-[11px] font-semibold text-ink/55 transition hover:border-ink/[0.13] hover:text-ink"
            >
              <FileText className="h-3.5 w-3.5" />
              View details
            </button>

            <button
              type="button"
              disabled={blocked || completed}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[11px] font-semibold text-white shadow-[0_5px_14px_rgba(11,18,32,0.08)] transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-35"
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
    </article>
  )
}

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
  tone,
}: {
  label: string
  value: string
  description: string
  icon: typeof RefreshCcw
  tone: 'ink' | 'amber' | 'brick' | 'teal'
}) {
  const toneClasses = {
    ink: {
      icon: 'bg-[#F7F8F6]',
      iconColor: 'text-ink/45',
      value: 'text-ink',
    },
    amber: {
      icon: 'bg-[#F7F1E7]',
      iconColor: 'text-[#A06E1B]',
      value: 'text-ink',
    },
    brick: {
      icon: 'bg-[#F8EEE6]',
      iconColor: 'text-[#B85C12]',
      value: 'text-[#9B4D11]',
    },
    teal: {
      icon: 'bg-[#F4F7F4]',
      iconColor: 'text-[#12613E]',
      value: 'text-ink',
    },
  }

  const currentTone = toneClasses[tone]

  return (
    <Card className="group p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(20,30,25,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/35">
            {label}
          </p>

          <p
            className={`mt-2 font-display text-[25px] font-semibold tracking-[-0.025em] ${currentTone.value}`}
          >
            {value}
          </p>
        </div>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${currentTone.icon}`}
        >
          <Icon className={`h-4 w-4 ${currentTone.iconColor}`} />
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
    <div className="group rounded-[15px] border border-ink/[0.06] bg-[#F7F8F6] p-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-ink/[0.1]">
      <div className="flex items-center gap-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-ink font-mono text-[8px] font-semibold text-white">
          {number}
        </span>

        <p className="text-xs font-semibold text-ink">
          {title}
        </p>
      </div>

      <p className="mt-3 text-[10px] leading-4 text-ink/40">
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
    <div className="min-w-0 bg-white px-3.5 py-3">
      <div className="flex items-center gap-1.5">
        {Icon && <Icon className="h-3 w-3 text-ink/25" />}

        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
          {label}
        </p>
      </div>

      <p
        className={`mt-1 truncate text-[11px] font-semibold text-ink/65 ${
          mono ? 'font-mono text-[10px]' : ''
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
    <div
      className={`flex items-center gap-2.5 rounded-[13px] border px-3 py-2.5 ${
        danger
          ? 'border-[#B85C12]/12 bg-[#F8EEE6]'
          : 'border-ink/[0.06] bg-white'
      }`}
    >
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
          danger
            ? 'bg-white'
            : complete
              ? 'bg-[#F4F7F4]'
              : 'bg-[#F7F1E7]'
        }`}
      >
        {complete ? (
          <CheckCircle2
            className={`h-3.5 w-3.5 ${
              danger ? 'text-[#B85C12]' : 'text-[#12613E]'
            }`}
          />
        ) : danger ? (
          <XCircle className="h-3.5 w-3.5 text-[#B85C12]" />
        ) : (
          <Clock3 className="h-3.5 w-3.5 text-[#C28A2C]" />
        )}
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-ink/30">
          {label}
        </p>

        <p
          className={`mt-0.5 truncate text-[10px] font-semibold ${
            danger
              ? 'text-[#9B4D11]'
              : complete
                ? 'text-[#12613E]'
                : 'text-[#94691C]'
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  )
}