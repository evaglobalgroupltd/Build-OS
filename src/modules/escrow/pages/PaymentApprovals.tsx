import {
  AlertTriangle,
  ArrowRight,
  Check,
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

type PaymentCategory =
  | 'labour'
  | 'materials'
  | 'professional'
  | 'monitoring'

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
    (payment) =>
      payment.disputeActive || payment.status === 'blocked',
  )

  const verified = paymentRequests.filter(
    (payment) => payment.pmVerified,
  )

  const totalPending = '₦2.07M'

  return (
    <div className="space-y-7">
      {/* ===================================================== */}
      {/* Page header                                             */}
      {/* ===================================================== */}

      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C28A2C]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Escrow & payments
            </p>

            <span className="hidden h-3 w-px bg-ink/10 sm:block" />

            <p className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-ink/30 sm:block">
              Release controls
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
              Payment Approvals
            </h1>

            {pending.length > 0 && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border border-[#C28A2C]/15
                  bg-[#F7F1E7]
                  px-2.5
                  py-1.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-[#9A6818]
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#C28A2C]" />
                {pending.length} awaiting action
              </span>
            )}
          </div>

          <p className="mt-2 max-w-2xl text-[12px] leading-5 text-ink/45 sm:text-[13px]">
            Review evidence, milestone verification and payment conditions
            before approving a payment release recommendation.
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
          <FileText className="h-3.5 w-3.5 text-ink/40" />

          View payment history

          <ArrowRight className="h-3.5 w-3.5 text-ink/30 transition-transform duration-300 group-hover:translate-x-0.5" />
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
      {/* Executive overview                                      */}
      {/* ===================================================== */}

      <section
        aria-label="Payment approval overview"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
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
          value={String(verified.length)}
          description="Requests with PM verification"
          icon={ShieldCheck}
          positive
        />
      </section>

      {/* ===================================================== */}
      {/* Release controls                                       */}
      {/* ===================================================== */}

      <section
        aria-label="Payment release controls"
        className="
          relative
          overflow-hidden
          rounded-[20px]
          border border-[#12613E]/10
          bg-[#F4F7F4]
        "
      >
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#12613E]" />

        <div className="flex flex-col gap-4 px-5 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
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
                  Release controls are active
                </p>

                <span
                  className="
                    rounded-full
                    bg-white
                    px-2
                    py-1
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-[#12613E]/65
                    ring-1 ring-[#12613E]/10
                  "
                >
                  Protected
                </span>
              </div>

              <p className="mt-1.5 max-w-3xl text-[10.5px] leading-[1.8] text-ink/45">
                Eligible payment releases require supporting evidence,
                applicable project-manager verification, required approval
                and no active dispute affecting the payment line.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 border-t border-[#12613E]/10 pt-3 text-[9.5px] font-semibold text-ink/40 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#12613E]" />

            Audit trail enabled
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* Payment queue                                           */}
      {/* ===================================================== */}

      <section aria-label="Payment release queue">
        <Card className="overflow-hidden">
          <CardHeader
            title="Payment release queue"
            subtitle="Review each request before approving or rejecting the release"
          />

          <CardBody className="p-3 sm:p-4">
            {paymentRequests.length > 0 ? (
              <div className="space-y-3">
                {paymentRequests.map((payment) => (
                  <PaymentRequestCard
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
    </div>
  )
}

/* ============================================================= */
/* Payment request card                                          */
/* ============================================================= */

function PaymentRequestCard({
  payment,
}: {
  payment: PaymentRequest
}) {
  const blocked =
    payment.disputeActive || payment.status === 'blocked'

  const canApprove =
    !blocked &&
    payment.pmVerified &&
    payment.status !== 'approved'

  return (
    <article
      className={[
        'group overflow-hidden rounded-[18px] border bg-white transition-all duration-300',
        blocked
          ? 'border-[#B85C12]/15 shadow-[0_6px_25px_rgba(184,92,18,0.025)]'
          : 'border-ink/[0.07] hover:border-ink/[0.12] hover:shadow-[0_12px_35px_rgba(20,30,25,0.055)]',
      ].join(' ')}
    >
      {/* =================================================== */}
      {/* Request header                                        */}
      {/* =================================================== */}

      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={statusTone[payment.status]}>
                {blocked
                  ? 'Payment blocked'
                  : formatStatus(payment.status)}
              </Badge>

              <span className="rounded-full bg-[#F7F8F6] px-2.5 py-1 font-mono text-[8.5px] font-semibold text-ink/35">
                {payment.id}
              </span>

              <span className="rounded-full bg-[#F7F8F6] px-2.5 py-1 text-[8.5px] font-semibold text-ink/35">
                {categoryLabel[payment.category]}
              </span>
            </div>

            <h2 className="mt-3 text-[13px] font-semibold tracking-[-0.01em] text-ink sm:text-sm">
              {payment.milestone}
            </h2>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[10.5px] text-ink/45">
                {payment.projectName}
              </span>

              <span className="h-1 w-1 rounded-full bg-ink/15" />

              <span className="font-mono text-[8.5px] text-ink/25">
                {payment.projectId}
              </span>
            </div>
          </div>

          <div className="border-t border-ink/[0.06] pt-4 xl:min-w-[150px] xl:border-0 xl:pt-0 xl:text-right">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
              Requested amount
            </p>

            <p className="mt-1 font-display text-[21px] font-semibold tracking-[-0.025em] text-ink">
              {payment.amount}
            </p>

            <p className="mt-1 text-[9px] text-ink/30">
              Requested {payment.requestedAt}
            </p>
          </div>
        </div>

        {/* =================================================== */}
        {/* Payee details                                         */}
        {/* =================================================== */}

        <div className="mt-5 grid gap-3 border-y border-ink/[0.06] py-4 sm:grid-cols-2 xl:grid-cols-4">
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
            label="Category"
            value={categoryLabel[payment.category]}
          />

          <DetailItem
            label="Payment reference"
            value={payment.id}
            mono
          />
        </div>

        {/* =================================================== */}
        {/* Description                                           */}
        {/* =================================================== */}

        <div className="mt-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
            Payment request
          </p>

          <p className="mt-1.5 max-w-4xl text-[10.5px] leading-[1.75] text-ink/50">
            {payment.description}
          </p>
        </div>

        {/* =================================================== */}
        {/* Control matrix                                        */}
        {/* =================================================== */}

        <div className="mt-5">
          <div className="mb-2.5 flex items-center justify-between">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
              Release conditions
            </p>

            <span className="text-[9px] text-ink/25">
              {getControlProgress(payment)} of 3 complete
            </span>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
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
        </div>

        {/* =================================================== */}
        {/* Evidence                                             */}
        {/* =================================================== */}

        <div className="mt-5 rounded-[16px] border border-ink/[0.06] bg-[#F7F8F6] p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-ink/40">
                <FileText className="h-3.5 w-3.5" />
              </div>

              <div>
                <p className="text-[10.5px] font-semibold text-ink">
                  Supporting evidence
                </p>

                <p className="text-[8.5px] text-ink/30">
                  Submitted with this payment request
                </p>
              </div>
            </div>

            <span className="rounded-full bg-white px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-ink/30 ring-1 ring-ink/[0.05]">
              {payment.evidence.length}{' '}
              {payment.evidence.length === 1 ? 'file' : 'files'}
            </span>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {payment.evidence.map((file) => (
              <button
                key={file}
                type="button"
                className="
                  group/file
                  flex
                  min-w-0
                  items-center
                  gap-2
                  rounded-xl
                  border border-ink/[0.05]
                  bg-white
                  px-3
                  py-2.5
                  text-left
                  transition-all
                  duration-200
                  hover:border-ink/[0.10]
                  hover:shadow-[0_4px_14px_rgba(20,30,25,0.035)]
                "
              >
                <FileText className="h-3.5 w-3.5 shrink-0 text-ink/30" />

                <span className="min-w-0 flex-1 truncate text-[9.5px] font-medium text-ink/55">
                  {file}
                </span>

                <ArrowRight className="h-3 w-3 shrink-0 text-ink/20 transition-transform duration-200 group-hover/file:translate-x-0.5 group-hover/file:text-ink/40" />
              </button>
            ))}
          </div>
        </div>

        {/* =================================================== */}
        {/* Blocked state                                         */}
        {/* =================================================== */}

        {blocked && (
          <div className="mt-4 overflow-hidden rounded-[16px] border border-[#B85C12]/15 bg-[#F8EEE6]/45">
            <div className="flex items-start gap-3 px-4 py-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[#B85C12] shadow-sm">
                <LockKeyhole className="h-3.5 w-3.5" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[11px] font-semibold text-ink">
                    Release blocked
                  </p>

                  <span className="rounded-full bg-white px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#B85C12] ring-1 ring-[#B85C12]/10">
                    Dispute active
                  </span>
                </div>

                <p className="mt-1 text-[10px] leading-[1.7] text-ink/45">
                  An active dispute affects this payment line. The amount
                  must remain frozen until the dispute is resolved or an
                  authorised resolution permits further action.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =================================================== */}
        {/* Actions                                               */}
        {/* =================================================== */}

        <div className="mt-5 flex flex-col gap-3 border-t border-ink/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-full
              border border-ink/[0.08]
              bg-white
              px-4
              py-2.5
              text-[10px]
              font-semibold
              text-ink/55
              transition-all
              hover:border-ink/15
              hover:text-ink
            "
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Add review note
          </button>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              disabled={blocked}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-full
                border border-[#B85C12]/15
                bg-[#F8EEE6]
                px-4
                py-2.5
                text-[10px]
                font-semibold
                text-[#B85C12]
                transition-all
                hover:bg-[#F8EEE6]/80
                disabled:cursor-not-allowed
                disabled:opacity-35
              "
            >
              <XCircle className="h-3.5 w-3.5" />
              Reject
            </button>

            <button
              type="button"
              disabled={!canApprove}
              className="
                group/approve
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-full
                bg-ink
                px-5
                py-2.5
                text-[10px]
                font-semibold
                text-white
                shadow-[0_5px_16px_rgba(20,30,25,0.08)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-ink/90
                hover:shadow-[0_8px_20px_rgba(20,30,25,0.12)]
                disabled:cursor-not-allowed
                disabled:opacity-35
                disabled:hover:translate-y-0
              "
            >
              <CheckCircle2 className="h-3.5 w-3.5" />

              Approve release

              <ArrowRight className="h-3 w-3 text-white/45 transition-transform duration-200 group-hover/approve:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom state rail */}
      <div
        className={[
          'h-0.5 w-full opacity-70 transition-opacity duration-300 group-hover:opacity-100',
          blocked
            ? 'bg-[#B85C12]'
            : payment.status === 'approved'
              ? 'bg-[#12613E]'
              : payment.status === 'pm_verified'
                ? 'bg-[#C28A2C]'
                : 'bg-ink/15',
        ].join(' ')}
      />
    </article>
  )
}

/* ============================================================= */
/* Metric card                                                    */
/* ============================================================= */

function MetricCard({
  label,
  value,
  description,
  icon: Icon,
  alert = false,
  positive = false,
}: {
  label: string
  value: string
  description: string
  icon: typeof Clock3
  alert?: boolean
  positive?: boolean
}) {
  return (
    <Card className="p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(20,30,25,0.045)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/35">
            {label}
          </p>

          <p
            className={[
              'mt-2 font-display text-[23px] font-semibold tracking-[-0.03em]',
              alert
                ? 'text-[#B85C12]'
                : positive
                  ? 'text-[#12613E]'
                  : 'text-ink',
            ].join(' ')}
          >
            {value}
          </p>
        </div>

        <div
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
            alert
              ? 'bg-[#F8EEE6] text-[#B85C12]'
              : positive
                ? 'bg-[#EAF4EE] text-[#12613E]'
                : 'bg-[#F7F8F6] text-ink/40',
          ].join(' ')}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <p className="mt-2 text-[9.5px] leading-4 text-ink/35">
        {description}
      </p>
    </Card>
  )
}

/* ============================================================= */
/* Detail item                                                    */
/* ============================================================= */

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
        {Icon && <Icon className="h-3 w-3 text-ink/25" />}

        <p className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-ink/30">
          {label}
        </p>
      </div>

      <p
        className={[
          'mt-1 truncate text-[10.5px] font-semibold text-ink/65',
          mono ? 'font-mono text-[9px]' : '',
        ].join(' ')}
      >
        {value}
      </p>
    </div>
  )
}

/* ============================================================= */
/* Control check                                                  */
/* ============================================================= */

function ControlCheck({
  label,
  complete,
}: {
  label: string
  complete: boolean
}) {
  return (
    <div
      className={[
        'flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-colors',
        complete
          ? 'border-[#12613E]/10 bg-[#F4F7F4]'
          : 'border-[#C28A2C]/10 bg-[#F7F1E7]/50',
      ].join(' ')}
    >
      <div
        className={[
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-md',
          complete
            ? 'bg-white text-[#12613E]'
            : 'bg-white text-[#C28A2C]',
        ].join(' ')}
      >
        {complete ? (
          <Check className="h-3 w-3" />
        ) : (
          <Clock3 className="h-3 w-3" />
        )}
      </div>

      <span
        className={[
          'min-w-0 truncate text-[9.5px] font-semibold',
          complete ? 'text-ink/60' : 'text-[#9A6818]',
        ].join(' ')}
      >
        {label}
      </span>

      <span
        className={[
          'ml-auto shrink-0 text-[8px] font-bold uppercase tracking-[0.06em]',
          complete ? 'text-[#12613E]/55' : 'text-[#C28A2C]/70',
        ].join(' ')}
      >
        {complete ? 'Complete' : 'Pending'}
      </span>
    </div>
  )
}

/* ============================================================= */
/* Helpers                                                        */
/* ============================================================= */

function getControlProgress(payment: PaymentRequest) {
  return [
    payment.evidence.length > 0,
    payment.pmVerified,
    payment.clientApproved,
  ].filter(Boolean).length
}

/* ============================================================= */
/* Empty state                                                     */
/* ============================================================= */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-[18px] bg-[#F7F8F6] px-6 py-12 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#12613E] shadow-sm ring-1 ring-ink/[0.05]">
        <ShieldCheck className="h-[18px] w-[18px]" />
      </div>

      <p className="mt-4 text-[12px] font-semibold text-ink">
        No payment requests
      </p>

      <p className="mt-1 max-w-sm text-[10.5px] leading-5 text-ink/40">
        There are currently no payment requests waiting for review or
        release approval.
      </p>
    </div>
  )
}