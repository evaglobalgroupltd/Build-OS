import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  LockKeyhole,
  MessageSquare,
  ShieldCheck,
  User,
  XCircle,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CustodyNotice } from '@/modules/escrow/components/CustodyNotice'

type PaymentStatus =
  | 'pending_review'
  | 'pm_verified'
  | 'client_approval'
  | 'blocked'
  | 'approved'

type PaymentCategory = 'labour' | 'materials' | 'professional' | 'monitoring'

interface PaymentRequest {
  id: string
  projectId: string
  projectName: string
  payee: string
  role: string
  category: PaymentCategory
  milestone: string
  amount: string
  requestedAt: string
  status: PaymentStatus
  description: string
  evidence: string[]
  pmVerified: boolean
  clientApproved: boolean
  disputeActive: boolean
}

const paymentRequests: PaymentRequest[] = [
  {
    id: 'PAY-2026-00841',
    projectId: 'PRJ-2026-00421',
    projectName: 'Abuja Residential Development',
    payee: 'BuildRight Construction Ltd',
    role: 'Contractor',
    category: 'labour',
    milestone: 'Milestone 04 — Internal Finishing',
    amount: '₦2.85M',
    requestedAt: '27 Aug 2026 · 08:34',
    status: 'pending_review',
    description:
      'Contractor has submitted the milestone completion package and requested release of the associated labour payment.',
    evidence: [
      'milestone-04-progress-report.pdf',
      'site-progress-photos.zip',
      'completion-checklist.pdf',
    ],
    pmVerified: false,
    clientApproved: false,
    disputeActive: true,
  },
  {
    id: 'PAY-2026-00839',
    projectId: 'PRJ-2026-00421',
    projectName: 'Abuja Residential Development',
    payee: 'Prime Materials Supply Ltd',
    role: 'Supplier',
    category: 'materials',
    milestone: 'Procurement 07 — Electrical Materials',
    amount: '₦1.42M',
    requestedAt: '26 Aug 2026 · 16:12',
    status: 'pm_verified',
    description:
      'Delivery has been recorded and supporting delivery evidence has been submitted for verification.',
    evidence: [
      'delivery-note-070.pdf',
      'material-delivery-photos.zip',
    ],
    pmVerified: true,
    clientApproved: false,
    disputeActive: false,
  },
  {
    id: 'PAY-2026-00832',
    projectId: 'PRJ-2026-00421',
    projectName: 'Abuja Residential Development',
    payee: 'Axis Engineering Partners',
    role: 'Professional Expert',
    category: 'professional',
    milestone: 'Structural inspection — Stage 03',
    amount: '₦650K',
    requestedAt: '25 Aug 2026 · 11:26',
    status: 'client_approval',
    description:
      'Structural inspection deliverable has been submitted and verified by the assigned project manager.',
    evidence: [
      'structural-inspection-report.pdf',
      'inspection-certificate.pdf',
    ],
    pmVerified: true,
    clientApproved: false,
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
  PaymentStatus,
  'neutral' | 'amber' | 'brick' | 'teal'
> = {
  pending_review: 'neutral',
  pm_verified: 'amber',
  client_approval: 'amber',
  blocked: 'brick',
  approved: 'teal',
}

function formatStatus(status: PaymentStatus) {
  return status
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function PaymentApprovals() {
  const pending = paymentRequests.filter(
    (payment) =>
      payment.status !== 'approved' && !payment.disputeActive,
  )

  const blocked = paymentRequests.filter(
    (payment) => payment.disputeActive || payment.status === 'blocked',
  )

  const totalPending = '₦2.07M'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <FileCheck2 className="h-5 w-5 text-ink/60" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Escrow & payments
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Payment Approvals
            </h1>

            <Badge tone="amber">
              {pending.length} awaiting action
            </Badge>
          </div>

          <p className="mt-1 max-w-2xl text-sm text-ink/50">
            Review evidence, milestone verification and payment conditions
            before approving a payment release recommendation.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 transition hover:bg-ink/[0.02] hover:text-ink"
        >
          <ArrowRight className="h-4 w-4" />
          View payment history
        </button>
      </div>

      {/* Compliance notice */}
      <CustodyNotice
        fundingSource="partner_escrow"
        custodian="Approved escrow partner"
      />

      {/* Overview */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Awaiting approval"
          value={String(pending.length)}
          description="Payment requests requiring action"
          icon={Clock3}
        />

        <MetricCard
          label="Pending value"
          value={totalPending}
          description="Unreleased eligible payments"
          icon={LockKeyhole}
        />

        <MetricCard
          label="Blocked"
          value={String(blocked.length)}
          description="Payments requiring resolution"
          icon={AlertTriangle}
          alert
        />

        <MetricCard
          label="Evidence verified"
          value="1"
          description="Requests with PM verification"
          icon={ShieldCheck}
        />
      </div>

      {/* Approval rules */}
      <Card className="overflow-hidden">
        <CardBody>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Release controls are active
                </p>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                  Eligible payment releases require supporting evidence,
                  applicable project-manager verification, required approval
                  and no active dispute affecting the payment line.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-[10px] font-semibold text-ink/40">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              Audit trail enabled
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Payment queue */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Payment release queue"
          subtitle="Review each request before approving or rejecting the release"
        />

        <CardBody>
          <div className="space-y-3">
            {paymentRequests.map((payment) => (
              <PaymentRequestCard
                key={payment.id}
                payment={payment}
              />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function PaymentRequestCard({
  payment,
}: {
  payment: PaymentRequest
}) {
  const blocked = payment.disputeActive || payment.status === 'blocked'

  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        blocked
          ? 'border-red-500/15 bg-red-500/[0.025]'
          : 'border-line bg-paper-2 hover:border-ink/15'
      }`}
    >
      {/* Top row */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={statusTone[payment.status]}>
              {blocked ? 'Payment Blocked' : formatStatus(payment.status)}
            </Badge>

            <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[9px] font-semibold text-ink/40">
              {payment.id}
            </span>

            <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-ink/40">
              {categoryLabel[payment.category]}
            </span>
          </div>

          <h2 className="mt-3 text-sm font-semibold text-ink">
            {payment.milestone}
          </h2>

          <p className="mt-1 text-xs text-ink/45">
            {payment.projectName} · {payment.projectId}
          </p>
        </div>

        <div className="xl:text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            Requested amount
          </p>

          <p className="mt-1 font-mono text-lg font-semibold tracking-tight text-ink">
            {payment.amount}
          </p>
        </div>
      </div>

      {/* Payee */}
      <div className="mt-5 grid gap-3 border-y border-line py-4 sm:grid-cols-2 xl:grid-cols-4">
        <DetailItem
          icon={User}
          label="Payee"
          value={payment.payee}
        />

        <DetailItem
          label="Role"
          value={payment.role}
        />

        <DetailItem
          label="Requested"
          value={payment.requestedAt}
          mono
        />

        <DetailItem
          label="Project"
          value={payment.projectId}
          mono
        />
      </div>

      {/* Description */}
      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
          Payment request
        </p>

        <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/55">
          {payment.description}
        </p>
      </div>

      {/* Controls */}
      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        <ControlCheck
          label="Evidence submitted"
          complete={payment.evidence.length > 0}
        />

        <ControlCheck
          label="PM verification"
          complete={payment.pmVerified}
        />

        <ControlCheck
          label="Client approval"
          complete={payment.clientApproved}
        />
      </div>

      {/* Evidence */}
      <div className="mt-5 rounded-xl border border-line bg-white p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-ink/40" />

            <p className="text-xs font-semibold text-ink">
              Supporting evidence
            </p>
          </div>

          <span className="text-[10px] text-ink/35">
            {payment.evidence.length} files
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {payment.evidence.map((file) => (
            <button
              key={file}
              type="button"
              className="inline-flex max-w-full items-center gap-2 rounded-lg border border-line bg-paper-2 px-2.5 py-2 text-left transition hover:border-ink/15 hover:bg-ink/[0.02]"
            >
              <FileText className="h-3.5 w-3.5 shrink-0 text-ink/35" />

              <span className="truncate text-[10px] font-medium text-ink/55">
                {file}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Blocked notice */}
      {blocked && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-500/15 bg-red-500/[0.04] p-3">
          <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />

          <div>
            <p className="text-xs font-semibold text-red-700">
              Release blocked
            </p>

            <p className="mt-1 text-[11px] leading-5 text-ink/45">
              An active dispute affects this payment line. The amount must
              remain frozen until the dispute is resolved or an authorised
              resolution permits further action.
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-[11px] font-semibold text-ink/55 transition hover:text-ink"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Add review note
        </button>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            disabled={blocked}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/15 bg-red-500/[0.04] px-4 py-2.5 text-[11px] font-semibold text-red-600 transition hover:bg-red-500/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <XCircle className="h-3.5 w-3.5" />
            Reject
          </button>

          <button
            type="button"
            disabled={blocked || !payment.pmVerified}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[11px] font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Approve release
          </button>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
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

function ControlCheck({
  label,
  complete,
}: {
  label: string
  complete: boolean
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5">
      {complete ? (
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
      ) : (
        <Clock3 className="h-3.5 w-3.5 shrink-0 text-amber-500" />
      )}

      <span
        className={`text-[10px] font-semibold ${
          complete ? 'text-ink/60' : 'text-amber-700'
        }`}
      >
        {label}
      </span>

      <span className="ml-auto text-[9px] text-ink/30">
        {complete ? 'Complete' : 'Pending'}
      </span>
    </div>
  )
}