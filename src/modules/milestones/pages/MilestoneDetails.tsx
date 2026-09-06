import {
  AlertTriangle,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  FileText,
  Image as ImageIcon,
  Info,
  MapPin,
  MessageSquare,
  Package,
  ShieldCheck,
  UserCheck,
  Video,
  WalletCards,
  X,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type MilestoneStatus =
  | 'Pending'
  |  'In Progress'
  |  'Submitted'
  |  'Under Review'
  |  'Approved'
  |  'Rejected'
  |  'Disputed'

type VerificationStatus =
  | 'Pending'
  |  'Verified'
  |  'Rejected'
  |  'More Evidence Required'

interface MilestoneEvidence {
  id: string
  type: 'Photo' | 'Video' | 'Report' | 'Receipt' | 'Document'
  name: string
  uploadedBy: string
  uploadedAt: string
  status: VerificationStatus
}

interface MilestoneApproval {
  role: 'Contractor' | 'Project Manager' | 'Professional' | 'Client'
  name: string
  status: VerificationStatus
  date?: string
  comment?: string
}

interface Milestone {
  id: string
  projectId: string
  projectName: string
  name: string
  phase: string
  status: MilestoneStatus
  description: string
  location: string
  progress: number
  amount: number
  completedAmount: number
  dueDate: string
  submittedDate: string
  contractor: string
  projectManager: string
  professional?: string
  startedDate: string
  evidenceRequired: number
  evidenceSubmitted: number
  evidence: MilestoneEvidence[]
  approvals: MilestoneApproval[]
  materials: string[]
  risks: string[]
}

const milestone: Milestone = {
  id: 'MS-004',
  projectId: 'PRJ-2026-014',
  projectName: 'Ahmed Residence — Abuja',
  name: 'Foundation Completion',
  phase: 'Foundation',
  status: 'Under Review',
  description:
    'Completion of excavation, blinding, reinforcement, formwork and concrete works required for the approved foundation stage.',
  location: 'Gwarinpa, Abuja, Nigeria',
  progress: 100,
  amount: 4850000,
  completedAmount: 0,
  dueDate: '28 Aug 2026',
  submittedDate: '27 Aug 2026',
  contractor: 'PrimeBuild Construction Ltd.',
  projectManager: 'Ibrahim Musa',
  professional: 'Engr. Yusuf Abdullahi',
  startedDate: '18 Aug 2026',
  evidenceRequired: 6,
  evidenceSubmitted: 7,
  materials: [
    'Concrete',
    'Reinforcement steel',
    'Binding wire',
    'Hardcore',
    'DPM',
  ],
  risks: [
    'Final reinforcement inspection pending professional sign-off.',
  ],
  evidence: [
    {
      id: 'EV-001',
      type: 'Photo',
      name: 'Foundation excavation — east wing',
      uploadedBy: 'PrimeBuild Construction Ltd.',
      uploadedAt: '27 Aug 2026, 09:42',
      status: 'Verified',
    },
    {
      id: 'EV-002',
      type: 'Photo',
      name: 'Reinforcement installation',
      uploadedBy: 'PrimeBuild Construction Ltd.',
      uploadedAt: '27 Aug 2026, 10:15',
      status: 'Verified',
    },
    {
      id: 'EV-003',
      type: 'Video',
      name: 'Foundation site walkthrough',
      uploadedBy: 'PrimeBuild Construction Ltd.',
      uploadedAt: '27 Aug 2026, 10:28',
      status: 'Verified',
    },
    {
      id: 'EV-004',
      type: 'Report',
      name: 'Foundation inspection report',
      uploadedBy: 'Ibrahim Musa',
      uploadedAt: '27 Aug 2026, 15:05',
      status: 'Verified',
    },
    {
      id: 'EV-005',
      type: 'Receipt',
      name: 'Concrete delivery receipt',
      uploadedBy: 'PrimeBuild Construction Ltd.',
      uploadedAt: '27 Aug 2026, 15:31',
      status: 'Verified',
    },
    {
      id: 'EV-006',
      type: 'Photo',
      name: 'Concrete pour completion',
      uploadedBy: 'PrimeBuild Construction Ltd.',
      uploadedAt: '27 Aug 2026, 16:12',
      status: 'More Evidence Required',
    },
    {
      id: 'EV-007',
      type: 'Document',
      name: 'Concrete mix specification',
      uploadedBy: 'PrimeBuild Construction Ltd.',
      uploadedAt: '27 Aug 2026, 16:22',
      status: 'Pending',
    },
  ],
  approvals: [
    {
      role: 'Contractor',
      name: 'PrimeBuild Construction Ltd.',
      status: 'Verified',
      date: '27 Aug 2026',
      comment: 'Foundation works completed according to approved scope.',
    },
    {
      role: 'Project Manager',
      name: 'Ibrahim Musa',
      status: 'Verified',
      date: '27 Aug 2026',
      comment: 'Site inspection completed. Work substantially matches approved milestone.',
    },
    {
      role: 'Professional',
      name: 'Engr. Yusuf Abdullahi',
      status: 'Pending',
      comment: 'Awaiting final reinforcement and concrete verification.',
    },
    {
      role: 'Client',
      name: 'Ahmed Residence Client',
      status: 'Pending',
    },
  ],
}

export function MilestoneDetails() {
  const paymentReady =
    milestone.approvals.every(
      (approval) =>
        approval.role === 'Client' ||
        approval.status === 'Verified',
    ) &&
    !milestone.risks.length

  const verifiedEvidence = milestone.evidence.filter(
    (item) => item.status === 'Verified',
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink/45">
                  {milestone.id}
                </span>

                <StatusBadge status={milestone.status} />
              </div>

              <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                {milestone.name}
              </h1>

              <p className="mt-1 text-sm text-ink/45">
                {milestone.projectName}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/45">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {milestone.location}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Due {milestone.dueDate}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" />
                  Started {milestone.startedDate}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 transition-colors hover:bg-paper-2"
              >
                <MessageSquare className="h-4 w-4" />
                Request Evidence
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <CheckCircle2 className="h-4 w-4" />
                Review Milestone
              </button>
            </div>
          </div>
        </div>

        {/* Summary metrics */}
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          <MilestoneMetric
            icon={CheckCircle2}
            label="Progress"
            value={`${milestone.progress}%`}
            description="Reported completion"
          />

          <MilestoneMetric
            icon={CircleDollarSign}
            label="Milestone value"
            value={formatCurrency(milestone.amount)}
            description="Amount subject to approval"
          />

          <MilestoneMetric
            icon={FileCheck2}
            label="Evidence"
            value={`${verifiedEvidence}/${milestone.evidence.length}`}
            description="Evidence verified"
          />

          <MilestoneMetric
            icon={ShieldCheck}
            label="Payment status"
            value={paymentReady ? 'Ready' : 'Controlled'}
            description={
              paymentReady
                ? 'Approval chain complete'
                : 'Approval chain incomplete'
            }
          />
        </div>
      </Card>

      {/* Review warning */}
      {!paymentReady && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

          <div>
            <p className="text-xs font-semibold text-amber-900">
              Payment remains controlled
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-800/75">
              The milestone cannot proceed to payment release until the
              required independent verification, evidence review and client
              approval are complete.
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {/* Milestone overview */}
          <Card>
            <CardHeader
              title="Milestone overview"
              subtitle="Scope and completion information"
            />

            <CardBody>
              <p className="text-sm leading-6 text-ink/55">
                {milestone.description}
              </p>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Completion
                    </p>

                    <p className="mt-1 font-display text-2xl font-semibold text-ink">
                      {milestone.progress}%
                    </p>
                  </div>

                  <span className="text-xs font-medium text-ink/40">
                    Submitted {milestone.submittedDate}
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-ink transition-all"
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoBlock
                  label="Project phase"
                  value={milestone.phase}
                />

                <InfoBlock
                  label="Project ID"
                  value={milestone.projectId}
                />

                <InfoBlock
                  label="Contractor"
                  value={milestone.contractor}
                />

                <InfoBlock
                  label="Project Manager"
                  value={milestone.projectManager}
                />

                <InfoBlock
                  label="Professional"
                  value={milestone.professional ?? 'Not assigned'}
                />

                <InfoBlock
                  label="Submitted"
                  value={milestone.submittedDate}
                />
              </div>
            </CardBody>
          </Card>

          {/* Evidence */}
          <Card>
            <CardHeader
              title="Evidence trail"
              subtitle="Evidence submitted to support milestone verification"
            />

            <CardBody>
              <div className="space-y-3">
                {milestone.evidence.map((item) => (
                  <EvidenceRow
                    key={item.id}
                    evidence={item}
                  />
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Materials */}
          <Card>
            <CardHeader
              title="Material usage"
              subtitle="Materials associated with this milestone"
            />

            <CardBody>
              <div className="flex flex-wrap gap-2">
                {milestone.materials.map((material) => (
                  <span
                    key={material}
                    className="inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-3 py-1.5 text-xs font-medium text-ink/55"
                  >
                    <Package className="h-3.5 w-3.5" />
                    {material}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          {/* Payment */}
          <Card>
            <CardHeader
              title="Milestone payment"
              subtitle="Escrow-controlled release"
            />

            <CardBody>
              <div className="rounded-xl bg-paper-2 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                    <WalletCards className="h-4 w-4 text-ink/55" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Amount
                    </p>

                    <p className="mt-0.5 font-display text-xl font-semibold text-ink">
                      {formatCurrency(milestone.amount)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <PaymentRow
                  label="Milestone value"
                  value={formatCurrency(milestone.amount)}
                />

                <PaymentRow
                  label="Released"
                  value={formatCurrency(milestone.completedAmount)}
                />

                <PaymentRow
                  label="Pending"
                  value={formatCurrency(
                    milestone.amount - milestone.completedAmount,
                  )}
                />
              </div>

              <div className="mt-5 rounded-xl border border-line p-3.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-ink/50" />

                  <p className="text-xs font-semibold text-ink">
                    Release controls
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-ink/45">
                  Evidence, independent verification and client approval are
                  required before escrow can release this payment.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Approval chain */}
          <Card>
            <CardHeader
              title="Approval chain"
              subtitle="Required verification sequence"
            />

            <CardBody>
              <div className="space-y-5">
                {milestone.approvals.map((approval, index) => (
                  <ApprovalStep
                    key={approval.role}
                    approval={approval}
                    last={index === milestone.approvals.length - 1}
                  />
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Risks */}
          <Card>
            <CardHeader
              title="Risks and blockers"
              subtitle="Items requiring attention"
            />

            <CardBody>
              {milestone.risks.length === 0 ? (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3.5 py-3 text-xs font-medium text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  No active milestone risks.
                </div>
              ) : (
                <div className="space-y-3">
                  {milestone.risks.map((risk) => (
                    <div
                      key={risk}
                      className="flex items-start gap-2.5 rounded-xl bg-amber-500/10 px-3.5 py-3"
                    >
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

                      <p className="text-xs leading-5 text-amber-800">
                        {risk}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">
                Milestone decision
              </p>

              <p className="mt-1 text-xs leading-5 text-ink/45">
                Record a verification decision. Every decision becomes part of
                the project audit trail.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100"
              >
                <X className="h-4 w-4" />
                Reject
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100"
              >
                <MessageSquare className="h-4 w-4" />
                Request More Evidence
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Check className="h-4 w-4" />
                Approve Milestone
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Audit trail */}
      <Card>
        <CardHeader
          title="Audit trail"
          subtitle="Milestone activity and verification history"
        />

        <CardBody>
          <div className="space-y-4">
            <AuditItem
              title="Milestone submitted"
              description="Contractor submitted completion evidence for review."
              actor={milestone.contractor}
              date="27 Aug 2026, 16:22"
            />

            <AuditItem
              title="PM verification completed"
              description="Project Manager inspected the milestone and verified the submitted work."
              actor={milestone.projectManager}
              date="27 Aug 2026, 15:05"
            />

            <AuditItem
              title="Evidence uploaded"
              description="Foundation photographs, inspection report and concrete documentation were added."
              actor={milestone.contractor}
              date="27 Aug 2026, 16:22"
            />

            <AuditItem
              title="Milestone started"
              description="Foundation milestone moved into execution."
              actor="Build OS"
              date="18 Aug 2026, 08:00"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function StatusBadge({
  status,
}: {
  status: MilestoneStatus
}) {
  const styles: Record<MilestoneStatus, string> = {
    Pending: 'bg-ink/5 text-ink/50',
    'In Progress': 'bg-blue-500/10 text-blue-700',
    Submitted: 'bg-amber-500/10 text-amber-700',
    'Under Review': 'bg-amber-500/10 text-amber-700',
    Approved: 'bg-emerald-500/10 text-emerald-700',
    Rejected: 'bg-rose-500/10 text-rose-700',
    Disputed: 'bg-rose-500/10 text-rose-700',
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  )
}

function MilestoneMetric({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
}) {
  return (
    <div className="px-6 py-5 sm:px-7">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
          <Icon className="h-4 w-4 text-ink/55" />
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            {label}
          </p>

          <p className="mt-0.5 font-display text-xl font-semibold text-ink">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink/40">
        {description}
      </p>
    </div>
  )
}

function InfoBlock({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-3.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-semibold text-ink">
        {value}
      </p>
    </div>
  )
}

function EvidenceRow({
  evidence,
}: {
  evidence: MilestoneEvidence
}) {
  const Icon =
    evidence.type === 'Photo'
      ? ImageIcon
      : evidence.type === 'Video'
        ? Video
        : evidence.type === 'Report'
          ? FileText
          : FileCheck2

  const statusClass =
    evidence.status === 'Verified'
      ? 'bg-emerald-500/10 text-emerald-700'
      : evidence.status === 'More Evidence Required'
        ? 'bg-amber-500/10 text-amber-700'
        : evidence.status === 'Rejected'
          ? 'bg-rose-500/10 text-rose-700'
          : 'bg-ink/5 text-ink/45'

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line p-3.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
          <Icon className="h-4 w-4 text-ink/50" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-ink">
            {evidence.name}
          </p>

          <p className="mt-1 text-[10px] text-ink/40">
            {evidence.type} · {evidence.uploadedBy} · {evidence.uploadedAt}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusClass}`}
        >
          {evidence.status}
        </span>

        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink/40 transition-colors hover:bg-paper-2 hover:text-ink"
          aria-label={`View ${evidence.name}`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function ApprovalStep({
  approval,
  last,
}: {
  approval: MilestoneApproval
  last: boolean
}) {
  const verified = approval.status === 'Verified'
  const rejected = approval.status === 'Rejected'
  const moreEvidence =
    approval.status === 'More Evidence Required'

  return (
    <div className="relative flex gap-3">
      {!last && (
        <div className="absolute left-4 top-9 h-[calc(100%+1rem)] w-px bg-line" />
      )}

      <div
        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          verified
            ? 'bg-emerald-500/10 text-emerald-700'
            : rejected
              ? 'bg-rose-500/10 text-rose-700'
              : moreEvidence
                ? 'bg-amber-500/10 text-amber-700'
                : 'bg-ink/5 text-ink/40'
        }`}
      >
        {verified ? (
          <Check className="h-4 w-4" />
        ) : rejected ? (
          <X className="h-4 w-4" />
        ) : (
          <Clock3 className="h-4 w-4" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-ink">
              {approval.role}
            </p>

            <p className="mt-0.5 text-[10px] text-ink/40">
              {approval.name}
            </p>
          </div>

          <span className="text-[10px] font-medium text-ink/35">
            {approval.date ?? 'Pending'}
          </span>
        </div>

        <p
          className={`mt-2 text-[10px] font-semibold ${
            verified
              ? 'text-emerald-700'
              : rejected
                ? 'text-rose-700'
                : moreEvidence
                  ? 'text-amber-700'
                  : 'text-ink/40'
          }`}
        >
          {approval.status}
        </p>

        {approval.comment && (
          <p className="mt-1 text-xs leading-5 text-ink/45">
            {approval.comment}
          </p>
        )}
      </div>
    </div>
  )
}

function PaymentRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-ink/45">
        {label}
      </span>

      <span className="text-xs font-semibold text-ink">
        {value}
      </span>
    </div>
  )
}

function AuditItem({
  title,
  description,
  actor,
  date,
}: {
  title: string
  description: string
  actor: string
  date: string
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/5">
        <UserCheck className="h-3.5 w-3.5 text-ink/50" />
      </div>

      <div className="min-w-0 flex-1 border-b border-line pb-4 last:border-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold text-ink">
            {title}
          </p>

          <span className="text-[10px] text-ink/35">
            {date}
          </span>
        </div>

        <p className="mt-1 text-xs leading-5 text-ink/45">
          {description}
        </p>

        <p className="mt-1.5 text-[10px] font-medium text-ink/35">
          By {actor}
        </p>
      </div>
    </div>
  )
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)
}