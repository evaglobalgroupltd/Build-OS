import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  LockKeyhole,
  Plus,
  ShieldCheck,
  User,
  WalletCards,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CustodyNotice } from '@/modules/escrow/components/CustodyNotice'

type RequestStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'pm_verified'
  | 'awaiting_approval'
  | 'blocked'
  | 'approved'
  | 'paid'
  | 'rejected'

type PaymentCategory =
  | 'labour'
  | 'materials'
  | 'professional'
  | 'monitoring'

interface PaymentRequest {
  id: string
  projectId: string
  projectName: string
  requester: string
  requesterRole: string
  category: PaymentCategory
  milestone: string
  amount: string
  description: string
  submittedAt: string
  status: RequestStatus
  evidenceCount: number
  pmVerified: boolean
  disputeActive: boolean
}

const paymentRequests: PaymentRequest[] = [
  {
    id: 'REQ-2026-00518',
    projectId: 'PRJ-2026-00421',
    projectName: 'Abuja Residential Development',
    requester: 'BuildRight Construction Ltd',
    requesterRole: 'Contractor',
    category: 'labour',
    milestone: 'Milestone 04 — Internal Finishing',
    amount: '₦2.85M',
    description:
      'Request for release of the labour component following submission of the internal finishing milestone evidence.',
    submittedAt: '27 Aug 2026 · 08:34',
    status: 'blocked',
    evidenceCount: 3,
    pmVerified: false,
    disputeActive: true,
  },
  {
    id: 'REQ-2026-00515',
    projectId: 'PRJ-2026-00421',
    projectName: 'Abuja Residential Development',
    requester: 'Prime Materials Supply Ltd',
    requesterRole: 'Supplier',
    category: 'materials',
    milestone: 'Procurement 07 — Electrical Materials',
    amount: '₦1.42M',
    description:
      'Payment request following delivery of approved electrical materials and submission of delivery evidence.',
    submittedAt: '26 Aug 2026 · 16:12',
    status: 'pm_verified',
    evidenceCount: 2,
    pmVerified: true,
    disputeActive: false,
  },
  {
    id: 'REQ-2026-00509',
    projectId: 'PRJ-2026-00421',
    projectName: 'Abuja Residential Development',
    requester: 'Axis Engineering Partners',
    requesterRole: 'Professional Expert',
    category: 'professional',
    milestone: 'Structural Inspection — Stage 03',
    amount: '₦650K',
    description:
      'Request for payment against the completed structural inspection deliverable.',
    submittedAt: '25 Aug 2026 · 11:26',
    status: 'awaiting_approval',
    evidenceCount: 2,
    pmVerified: true,
    disputeActive: false,
  },
  {
    id: 'REQ-2026-00502',
    projectId: 'PRJ-2026-00388',
    projectName: 'Lekki Mixed-Use Development',
    requester: 'Site Monitoring Partners',
    requesterRole: 'Monitoring Provider',
    category: 'monitoring',
    milestone: 'Monthly Monitoring Report — August',
    amount: '₦280K',
    description:
      'Monitoring service payment request linked to the approved monthly reporting cycle.',
    submittedAt: '24 Aug 2026 · 14:05',
    status: 'submitted',
    evidenceCount: 1,
    pmVerified: false,
    disputeActive: false,
  },
]

const categoryLabel: Record<PaymentCategory, string> = {
  labour: 'Labour',
  materials: 'Materials',
  professional: 'Professional',
  monitoring: 'Monitoring',
}

const statusTone: Record<
  RequestStatus,
  'neutral' | 'amber' | 'brick' | 'teal'
> = {
  draft: 'neutral',
  submitted: 'neutral',
  under_review: 'amber',
  pm_verified: 'amber',
  awaiting_approval: 'amber',
  blocked: 'brick',
  approved: 'teal',
  paid: 'teal',
  rejected: 'brick',
}

function formatStatus(status: RequestStatus) {
  return status
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function PaymentRequests() {
  const activeRequests = paymentRequests.filter(
    (request) =>
      request.status !== 'paid' && request.status !== 'rejected',
  )

  const blockedRequests = paymentRequests.filter(
    (request) => request.disputeActive || request.status === 'blocked',
  )

  const awaitingApproval = paymentRequests.filter(
    (request) =>
      request.status === 'awaiting_approval' ||
      request.status === 'pm_verified',
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <WalletCards className="h-5 w-5 text-ink/60" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Escrow & payments
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Payment Requests
            </h1>

            <Badge tone="amber">
              {activeRequests.length} active
            </Badge>
          </div>

          <p className="mt-1 max-w-2xl text-sm text-ink/50">
            Submit, track and review requests for milestone, procurement,
            professional and monitoring payments.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-ink/90"
        >
          <Plus className="h-4 w-4" />
          New payment request
        </button>
      </div>

      {/* Custody */}
      <CustodyNotice
        fundingSource="partner_escrow"
        custodian="Approved escrow partner"
      />

      {/* Summary */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Active requests"
          value={String(activeRequests.length)}
          description="Requests currently in workflow"
          icon={FileCheck2}
        />

        <SummaryCard
          label="Awaiting approval"
          value={String(awaitingApproval.length)}
          description="Requests ready for approval review"
          icon={Clock3}
        />

        <SummaryCard
          label="Blocked"
          value={String(blockedRequests.length)}
          description="Requests protected from release"
          icon={LockKeyhole}
          alert
        />

        <SummaryCard
          label="Evidence submitted"
          value={String(
            paymentRequests.filter(
              (request) => request.evidenceCount > 0,
            ).length,
          )}
          description="Requests containing supporting records"
          icon={ShieldCheck}
        />
      </div>

      {/* Workflow */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Payment request workflow"
          subtitle="Every request moves through evidence, verification and approval controls"
        />

        <CardBody>
          <div className="grid gap-2 md:grid-cols-5">
            <WorkflowStep
              number="01"
              title="Submit"
              description="Requester creates payment request"
              active
            />

            <WorkflowStep
              number="02"
              title="Evidence"
              description="Supporting records are attached"
              active
            />

            <WorkflowStep
              number="03"
              title="Verify"
              description="PM verifies applicable evidence"
              active
            />

            <WorkflowStep
              number="04"
              title="Approve"
              description="Authorised party reviews release"
              active
            />

            <WorkflowStep
              number="05"
              title="Release"
              description="Payment is processed by the applicable payment channel"
              active
            />
          </div>
        </CardBody>
      </Card>

      {/* Requests */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Payment request queue"
          subtitle="Requests linked to projects, milestones and escrow-controlled payment lines"
        />

        <CardBody>
          <div className="space-y-3">
            {paymentRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
              />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function RequestCard({
  request,
}: {
  request: PaymentRequest
}) {
  const blocked =
    request.disputeActive || request.status === 'blocked'

  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        blocked
          ? 'border-red-500/15 bg-red-500/[0.025]'
          : 'border-line bg-paper-2 hover:border-ink/15'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={statusTone[request.status]}>
              {blocked ? 'Blocked' : formatStatus(request.status)}
            </Badge>

            <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[9px] font-semibold text-ink/40">
              {request.id}
            </span>

            <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-ink/40">
              {categoryLabel[request.category]}
            </span>
          </div>

          <h2 className="mt-3 text-sm font-semibold text-ink">
            {request.milestone}
          </h2>

          <p className="mt-1 text-xs text-ink/45">
            {request.projectName} · {request.projectId}
          </p>
        </div>

        <div className="xl:text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            Requested amount
          </p>

          <p className="mt-1 font-mono text-lg font-semibold tracking-tight text-ink">
            {request.amount}
          </p>
        </div>
      </div>

      {/* Requester */}
      <div className="mt-5 grid gap-3 border-y border-line py-4 sm:grid-cols-2 xl:grid-cols-4">
        <DetailItem
          icon={User}
          label="Requester"
          value={request.requester}
        />

        <DetailItem
          label="Role"
          value={request.requesterRole}
        />

        <DetailItem
          label="Submitted"
          value={request.submittedAt}
          mono
        />

        <DetailItem
          label="Project"
          value={request.projectId}
          mono
        />
      </div>

      {/* Description */}
      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
          Request description
        </p>

        <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/55">
          {request.description}
        </p>
      </div>

      {/* Verification controls */}
      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        <Control
          label="Evidence"
          value={`${request.evidenceCount} files`}
          complete={request.evidenceCount > 0}
        />

        <Control
          label="PM verification"
          value={request.pmVerified ? 'Verified' : 'Pending'}
          complete={request.pmVerified}
        />

        <Control
          label="Dispute check"
          value={blocked ? 'Blocked' : 'Clear'}
          complete={!blocked}
          danger={blocked}
        />
      </div>

      {/* Blocked */}
      {blocked && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-500/15 bg-red-500/[0.04] p-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />

          <div>
            <p className="text-xs font-semibold text-red-700">
              Payment request is protected from release
            </p>

            <p className="mt-1 text-[11px] leading-5 text-ink/45">
              An active dispute affects this payment line. The request can
              remain visible for audit purposes, but it cannot proceed to
              payment release until the dispute is resolved or otherwise
              authorised.
            </p>
          </div>
        </div>
      )}

      {/* Evidence */}
      <div className="mt-5 flex flex-col gap-3 rounded-xl border border-line bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-paper-2">
            <FileText className="h-4 w-4 text-ink/40" />
          </div>

          <div>
            <p className="text-xs font-semibold text-ink">
              Supporting evidence
            </p>

            <p className="mt-0.5 text-[10px] text-ink/35">
              {request.evidenceCount} file
              {request.evidenceCount === 1 ? '' : 's'} attached
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[10px] font-semibold text-ink/55 transition hover:text-ink"
        >
          View evidence
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-[10px] text-ink/35">
          <ShieldCheck className="h-3.5 w-3.5" />
          Request actions are recorded in the audit trail.
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-[11px] font-semibold text-ink/55 transition hover:text-ink"
          >
            View request
          </button>

          <button
            type="button"
            disabled={blocked}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[11px] font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {blocked ? (
              <>
                <LockKeyhole className="h-3.5 w-3.5" />
                Release blocked
              </>
            ) : (
              <>
                Continue to approval
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
  icon: typeof Clock3
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
  active,
}: {
  number: string
  title: string
  description: string
  active?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        active
          ? 'border-line bg-paper-2'
          : 'border-line bg-white'
      }`}
    >
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

function Control({
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
      ) : (
        <Clock3
          className={`h-3.5 w-3.5 shrink-0 ${
            danger ? 'text-red-600' : 'text-amber-500'
          }`}
        />
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