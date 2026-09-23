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

  const evidenceSubmitted = paymentRequests.filter(
    (request) => request.evidenceCount > 0,
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
              Payment requests
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-[30px] font-semibold tracking-[-0.035em] text-ink sm:text-[34px]">
              Payment Requests
            </h1>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F1E7] px-3 py-1.5 text-[10px] font-semibold text-[#8A641D]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C28A2C]" />
              {activeRequests.length} active
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/45">
            Submit, track and review requests for milestone, procurement,
            professional and monitoring payments within the controlled
            project-finance workflow.
          </p>
        </div>

        <button
          type="button"
          className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-ink/[0.08] bg-white px-4 py-2.5 text-[11px] font-semibold text-ink/60 shadow-[0_5px_18px_rgba(20,30,25,0.035)] transition duration-200 hover:-translate-y-0.5 hover:border-ink/[0.12] hover:text-ink hover:shadow-[0_8px_24px_rgba(20,30,25,0.06)]"
        >
          <Plus className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-90" />
          New payment request
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
          Executive summary
      ───────────────────────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Active requests"
          value={String(activeRequests.length)}
          description="Requests currently in workflow"
          icon={FileCheck2}
          tone="ink"
        />

        <SummaryCard
          label="Awaiting approval"
          value={String(awaitingApproval.length)}
          description="Verified requests progressing to approval"
          icon={Clock3}
          tone="amber"
        />

        <SummaryCard
          label="Blocked"
          value={String(blockedRequests.length)}
          description="Requests protected from release"
          icon={LockKeyhole}
          tone="brick"
        />

        <SummaryCard
          label="Evidence submitted"
          value={String(evidenceSubmitted.length)}
          description="Requests containing supporting records"
          icon={ShieldCheck}
          tone="teal"
        />
      </div>

      {/* ─────────────────────────────────────────────
          Governance banner
      ───────────────────────────────────────────── */}
      <Card className="overflow-hidden border-ink/[0.06]">
        <CardBody className="p-0">
          <div className="relative flex flex-col gap-5 overflow-hidden bg-[#F4F7F4] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="absolute inset-y-0 left-0 w-1 bg-[#12613E]" />

            <div className="flex items-start gap-4 pl-1">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink/[0.05] bg-white shadow-[0_4px_14px_rgba(20,30,25,0.035)]">
                <ShieldCheck className="h-[18px] w-[18px] text-[#12613E]" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-ink">
                    Release controls are active
                  </p>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-[#12613E]">
                    <CheckCircle2 className="h-3 w-3" />
                    Controlled
                  </span>
                </div>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                  Eligible payment releases require supporting evidence,
                  applicable project-manager verification, required approval
                  and no active dispute affecting the payment line.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-full border border-ink/[0.05] bg-white px-3 py-2 text-[10px] font-semibold text-ink/45 shadow-[0_3px_12px_rgba(20,30,25,0.025)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#12613E]" />
              Audit trail enabled
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ─────────────────────────────────────────────
          Workflow
      ───────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Payment request workflow"
          subtitle="Every request moves through evidence, verification and approval controls"
        />

        <CardBody className="p-3 sm:p-4">
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
              description="Payment is processed through the applicable channel"
              active
            />
          </div>
        </CardBody>
      </Card>

      {/* ─────────────────────────────────────────────
          Request queue
      ───────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Payment request queue"
          subtitle="Requests linked to projects, milestones and escrow-controlled payment lines"
        />

        <CardBody className="p-3 sm:p-4">
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
    <article
      className={`group relative overflow-hidden rounded-[18px] border transition duration-200 ${
        blocked
          ? 'border-[#B85C12]/15 bg-[#F8EEE6]'
          : 'border-ink/[0.07] bg-white hover:-translate-y-0.5 hover:border-ink/[0.11] hover:shadow-[0_12px_34px_rgba(20,30,25,0.055)]'
      }`}
    >
      {/* Status rail */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[2px] ${
          blocked
            ? 'bg-[#B85C12]/55'
            : request.pmVerified
              ? 'bg-[#12613E]/45'
              : 'bg-[#C28A2C]/45'
        }`}
      />

      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={statusTone[request.status]}>
                {blocked ? 'Blocked' : formatStatus(request.status)}
              </Badge>

              <span className="rounded-full bg-[#F7F8F6] px-2.5 py-1 font-mono text-[9px] font-semibold tracking-wide text-ink/35">
                {request.id}
              </span>

              <span className="rounded-full border border-ink/[0.06] bg-white px-2.5 py-1 text-[9px] font-semibold text-ink/40">
                {categoryLabel[request.category]}
              </span>
            </div>

            <div className="mt-3">
              <h2 className="font-display text-[17px] font-semibold tracking-[-0.015em] text-ink">
                {request.milestone}
              </h2>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink/40">
                <span>{request.projectName}</span>
                <span className="h-1 w-1 rounded-full bg-ink/20" />
                <span className="font-mono text-[10px]">
                  {request.projectId}
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0 rounded-[14px] bg-[#F7F8F6] px-4 py-3 xl:min-w-[150px] xl:text-right">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
              Requested amount
            </p>

            <p className="mt-1 font-display text-[21px] font-semibold tracking-[-0.025em] text-ink">
              {request.amount}
            </p>
          </div>
        </div>

        {/* Requester details */}
        <div className="mt-5 grid gap-px overflow-hidden rounded-[14px] border border-ink/[0.06] bg-ink/[0.045] sm:grid-cols-2 xl:grid-cols-4">
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
        <div className="mt-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/30">
            Request description
          </p>

          <p className="mt-1.5 max-w-3xl text-xs leading-5 text-ink/55">
            {request.description}
          </p>
        </div>

        {/* Verification controls */}
        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          <Control
            label="Evidence"
            value={`${request.evidenceCount} ${
              request.evidenceCount === 1 ? 'file' : 'files'
            }`}
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

        {/* Blocked notice */}
        {blocked && (
          <div className="mt-4 overflow-hidden rounded-[14px] border border-[#B85C12]/15 bg-white/55">
            <div className="flex items-start gap-3 border-l-2 border-[#B85C12] p-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F8EEE6]">
                <AlertTriangle className="h-4 w-4 text-[#B85C12]" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold text-[#8E4A13]">
                    Payment request is protected from release
                  </p>

                  <span className="rounded-full bg-[#F8EEE6] px-2 py-0.5 text-[9px] font-semibold text-[#9A5518]">
                    Dispute active
                  </span>
                </div>

                <p className="mt-1 text-[11px] leading-5 text-ink/45">
                  An active dispute affects this payment line. The request can
                  remain visible for audit purposes, but it cannot proceed to
                  payment release until the dispute is resolved or otherwise
                  authorised.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Evidence */}
        <div className="mt-5 rounded-[14px] border border-ink/[0.06] bg-[#F7F8F6] p-3.5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_3px_10px_rgba(20,30,25,0.035)]">
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
              className="group/evidence inline-flex items-center justify-center gap-1.5 rounded-full border border-ink/[0.07] bg-white px-3 py-2 text-[10px] font-semibold text-ink/50 transition hover:border-ink/[0.12] hover:text-ink"
            >
              View evidence
              <ArrowRight className="h-3 w-3 transition-transform group-hover/evidence:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-3 border-t border-ink/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[10px] text-ink/35">
            <ShieldCheck className="h-3.5 w-3.5 text-ink/30" />
            Request actions are recorded in the audit trail.
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/[0.08] bg-white px-4 py-2.5 text-[11px] font-semibold text-ink/55 transition hover:border-ink/[0.13] hover:text-ink"
            >
              View request
            </button>

            <button
              type="button"
              disabled={blocked}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[11px] font-semibold text-white shadow-[0_5px_14px_rgba(11,18,32,0.08)] transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-35"
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
  icon: typeof Clock3
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
  active,
}: {
  number: string
  title: string
  description: string
  active?: boolean
}) {
  return (
    <div
      className={`group rounded-[15px] border p-3.5 transition duration-200 ${
        active
          ? 'border-ink/[0.07] bg-[#F7F8F6] hover:-translate-y-0.5'
          : 'border-ink/[0.06] bg-white hover:border-ink/[0.1]'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-lg font-mono text-[8px] font-semibold ${
            active
              ? 'bg-ink text-white'
              : 'bg-[#F7F8F6] text-ink/35'
          }`}
        >
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
    <div
      className={`flex items-center gap-2.5 rounded-[13px] border px-3 py-2.5 transition ${
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
        ) : (
          <Clock3
            className={`h-3.5 w-3.5 ${
              danger ? 'text-[#B85C12]' : 'text-[#C28A2C]'
            }`}
          />
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