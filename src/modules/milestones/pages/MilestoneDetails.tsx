import {
  AlertTriangle,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  FileText,
  Image as ImageIcon,
  MapPin,
  MessageSquare,
  Package,
  ShieldCheck,
  UserCheck,
  Video,
  WalletCards,
  X,
} from 'lucide-react'

import type { ComponentType } from 'react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type MilestoneStatus =
  | 'Pending'
  | 'In Progress'
  | 'Submitted'
  | 'Under Review'
  | 'Approved'
  | 'Rejected'
  | 'Disputed'

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
      comment:
        'Site inspection completed. Work substantially matches approved milestone.',
    },
    {
      role: 'Professional',
      name: 'Engr. Yusuf Abdullahi',
      status: 'Pending',
      comment:
        'Awaiting final reinforcement and concrete verification.',
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
    ) && !milestone.risks.length

  const verifiedEvidence = milestone.evidence.filter(
    (item) => item.status === 'Verified',
  ).length

  const evidenceCompletion = milestone.evidence.length
    ? Math.round(
        (verifiedEvidence / milestone.evidence.length) * 100,
      )
    : 0

  const approvalCompletion = milestone.approvals.length
    ? Math.round(
        (milestone.approvals.filter(
          (approval) => approval.status === 'Verified',
        ).length /
          milestone.approvals.length) *
          100,
      )
    : 0

  return (
    <div className="space-y-6">
      {/* =========================================================
          COMMAND HEADER
      ========================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-[#0B1220] text-white shadow-[0_20px_60px_rgba(11,18,32,0.16)]">
        <div className="absolute inset-0">
          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#1657FF]/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-[#34A6FF]/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative px-6 py-7 sm:px-8 lg:px-10 lg:py-9">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  {milestone.id}
                </span>

                <StatusBadge status={milestone.status} dark />
              </div>

              <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                Milestone review
              </p>

              <h1 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {milestone.name}
              </h1>

              <p className="mt-2 text-sm text-white/45">
                {milestone.projectName}
              </p>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/45">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-white/30" />
                  {milestone.location}
                </span>

                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5 text-white/30" />
                  Due {milestone.dueDate}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-3.5 w-3.5 text-white/30" />
                  Started {milestone.startedDate}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <MessageSquare className="h-4 w-4" />
                Request Evidence
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-[#0B1220] transition-transform hover:-translate-y-0.5"
              >
                <CheckCircle2 className="h-4 w-4" />
                Review Milestone
              </button>
            </div>
          </div>
        </div>

        {/* Command metrics */}
        <div className="relative grid border-t border-white/[0.08] sm:grid-cols-2 xl:grid-cols-4">
          <DarkMetric
            icon={CheckCircle2}
            label="Progress"
            value={`${milestone.progress}%`}
            description="Reported completion"
          />

          <DarkMetric
            icon={CircleDollarSign}
            label="Milestone value"
            value={formatCurrency(milestone.amount)}
            description="Subject to approval"
          />

          <DarkMetric
            icon={FileCheck2}
            label="Evidence"
            value={`${verifiedEvidence}/${milestone.evidence.length}`}
            description={`${evidenceCompletion}% verified`}
          />

          <DarkMetric
            icon={ShieldCheck}
            label="Payment control"
            value={paymentReady ? 'Ready' : 'Controlled'}
            description={
              paymentReady
                ? 'Approval chain complete'
                : 'Verification incomplete'
            }
          />
        </div>
      </section>

      {/* =========================================================
          CONTROL WARNING
      ========================================================= */}
      {!paymentReady && (
        <section className="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-amber-50">
          <div className="absolute inset-y-0 left-0 w-1 bg-amber-500" />

          <div className="flex items-start gap-4 px-5 py-4 sm:px-6">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold text-amber-950">
                  Payment remains controlled
                </p>

                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber-700">
                  Action required
                </span>
              </div>

              <p className="mt-1 text-xs leading-5 text-amber-900/65">
                The milestone cannot proceed to payment release until
                independent verification, evidence review and client
                approval are complete.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          MAIN WORKSPACE
      ========================================================= */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {/* -----------------------------------------------------
              OVERVIEW
          ----------------------------------------------------- */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Milestone overview"
              subtitle="Scope, ownership and completion state"
            />

            <CardBody>
              <p className="max-w-3xl text-sm leading-7 text-ink/55">
                {milestone.description}
              </p>

              {/* Progress */}
              <div className="mt-7 rounded-2xl border border-line bg-paper-2 p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                      Completion
                    </p>

                    <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
                      {milestone.progress}%
                    </p>
                  </div>

                  <span className="text-right text-[11px] text-ink/40">
                    Submitted
                    <br />
                    <span className="font-medium text-ink/60">
                      {milestone.submittedDate}
                    </span>
                  </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-[#1657FF] transition-all"
                    style={{
                      width: `${milestone.progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Ownership grid */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
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

          {/* -----------------------------------------------------
              EVIDENCE
          ----------------------------------------------------- */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Evidence trail"
              subtitle="Supporting material submitted for independent verification"
              action={
                <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[10px] font-semibold text-ink/45">
                  {verifiedEvidence}/{milestone.evidence.length} verified
                </span>
              }
            />

            <CardBody>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="font-display text-2xl font-semibold text-ink">
                    {evidenceCompletion}%
                  </p>

                  <p className="mt-0.5 text-[11px] text-ink/40">
                    Evidence verification progress
                  </p>
                </div>

                <div className="w-32 sm:w-48">
                  <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
                    <div
                      className="h-full rounded-full bg-[#1657FF]"
                      style={{
                        width: `${evidenceCompletion}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {milestone.evidence.map((item) => (
                  <EvidenceRow
                    key={item.id}
                    evidence={item}
                  />
                ))}
              </div>
            </CardBody>
          </Card>

          {/* -----------------------------------------------------
              MATERIALS
          ----------------------------------------------------- */}
          <Card>
            <CardHeader
              title="Material usage"
              subtitle="Materials associated with this milestone"
            />

            <CardBody>
              <div className="grid gap-2 sm:grid-cols-2">
                {milestone.materials.map((material, index) => (
                  <div
                    key={material}
                    className="group flex items-center gap-3 rounded-xl border border-line bg-white p-3.5 transition-all hover:border-[#1657FF]/20 hover:bg-[#1657FF]/[0.02]"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1657FF]/[0.07] text-[#1657FF]">
                      <Package className="h-3.5 w-3.5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-ink">
                        {material}
                      </p>

                      <p className="mt-0.5 text-[9px] font-mono uppercase tracking-wide text-ink/30">
                        Material {String(index + 1).padStart(2, '0')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* =======================================================
            RIGHT RAIL
        ======================================================= */}
        <div className="space-y-6">
          {/* -----------------------------------------------------
              PAYMENT
          ----------------------------------------------------- */}
          <Card className="overflow-hidden">
            <div className="bg-[#0B1220] px-5 py-5 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Escrow control
                  </p>

                  <h2 className="mt-1 font-display text-lg font-semibold">
                    Milestone payment
                  </h2>
                </div>

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    paymentReady
                      ? 'bg-emerald-400/10 text-emerald-300'
                      : 'bg-amber-400/10 text-amber-300'
                  }`}
                >
                  <WalletCards className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-white/35">
                  Controlled amount
                </p>

                <p className="mt-1 font-display text-3xl font-semibold tracking-tight">
                  {formatCurrency(milestone.amount)}
                </p>
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    paymentReady
                      ? 'bg-emerald-400'
                      : 'bg-amber-400'
                  }`}
                />

                <span className="text-[10px] font-semibold text-white/60">
                  {paymentReady
                    ? 'Ready for release'
                    : 'Release controlled'}
                </span>
              </div>
            </div>

            <CardBody>
              <div className="space-y-3">
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

              <div className="mt-5 rounded-xl border border-line bg-paper-2 p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#1657FF]" />

                  <p className="text-xs font-semibold text-ink">
                    Release controls
                  </p>
                </div>

                <div className="mt-3 space-y-2.5">
                  <RuleCheck
                    label="Evidence verification"
                    complete={verifiedEvidence === milestone.evidence.length}
                  />

                  <RuleCheck
                    label="Independent approval"
                    complete={
                      milestone.approvals.some(
                        (approval) =>
                          approval.role === 'Professional' &&
                          approval.status === 'Verified',
                      )
                    }
                  />

                  <RuleCheck
                    label="Client approval"
                    complete={
                      milestone.approvals.some(
                        (approval) =>
                          approval.role === 'Client' &&
                          approval.status === 'Verified',
                      )
                    }
                  />

                  <RuleCheck
                    label="No active dispute"
                    complete={milestone.risks.length === 0}
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* -----------------------------------------------------
              APPROVAL CHAIN
          ----------------------------------------------------- */}
          <Card>
            <CardHeader
              title="Approval chain"
              subtitle={`${approvalCompletion}% of required approvals complete`}
            />

            <CardBody>
              <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-[#1657FF]"
                  style={{
                    width: `${approvalCompletion}%`,
                  }}
                />
              </div>

              <div className="space-y-5">
                {milestone.approvals.map((approval, index) => (
                  <ApprovalStep
                    key={approval.role}
                    approval={approval}
                    last={
                      index === milestone.approvals.length - 1
                    }
                  />
                ))}
              </div>
            </CardBody>
          </Card>

          {/* -----------------------------------------------------
              RISKS
          ----------------------------------------------------- */}
          <Card>
            <CardHeader
              title="Risks & blockers"
              subtitle="Items requiring attention"
            />

            <CardBody>
              {milestone.risks.length === 0 ? (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />

                  <div>
                    <p className="text-xs font-semibold text-emerald-800">
                      No active blockers
                    </p>

                    <p className="mt-0.5 text-[10px] text-emerald-700/65">
                      Milestone has no recorded risks.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {milestone.risks.map((risk) => (
                    <div
                      key={risk}
                      className="rounded-xl border border-amber-200 bg-amber-50 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                        </div>

                        <p className="text-xs leading-5 text-amber-900/75">
                          {risk}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* =========================================================
          DECISION BAR
      ========================================================= */}
      <section className="sticky bottom-4 z-20">
        <div className="overflow-hidden rounded-2xl border border-line bg-white/95 shadow-[0_16px_50px_rgba(11,18,32,0.12)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1657FF]/[0.08] text-[#1657FF]">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <p className="text-sm font-semibold text-ink">
                  Milestone decision
                </p>
              </div>

              <p className="mt-1 max-w-xl text-xs leading-5 text-ink/40">
                Record the verification decision. Every decision becomes
                part of the project's permanent audit trail.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-700 transition-all hover:border-rose-300 hover:bg-rose-100"
              >
                <X className="h-4 w-4" />
                Reject
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-700 transition-all hover:border-amber-300 hover:bg-amber-100"
              >
                <MessageSquare className="h-4 w-4" />
                Request Evidence
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1220] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1657FF]"
              >
                <Check className="h-4 w-4" />
                Approve Milestone
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          AUDIT TRAIL
      ========================================================= */}
      <Card>
        <CardHeader
          title="Audit trail"
          subtitle="Milestone activity and verification history"
        />

        <CardBody>
          <div className="space-y-0">
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
              last
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

/* ===============================================================
   STATUS
================================================================ */

function StatusBadge({
  status,
  dark = false,
}: {
  status: MilestoneStatus
  dark?: boolean
}) {
  const styles: Record<MilestoneStatus, string> = {
    Pending: dark
      ? 'bg-white/10 text-white/55'
      : 'bg-ink/5 text-ink/50',

    'In Progress': dark
      ? 'bg-blue-400/10 text-blue-200'
      : 'bg-blue-500/10 text-blue-700',

    Submitted: dark
      ? 'bg-amber-400/10 text-amber-200'
      : 'bg-amber-500/10 text-amber-700',

    'Under Review': dark
      ? 'bg-amber-400/10 text-amber-200'
      : 'bg-amber-500/10 text-amber-700',

    Approved: dark
      ? 'bg-emerald-400/10 text-emerald-200'
      : 'bg-emerald-500/10 text-emerald-700',

    Rejected: dark
      ? 'bg-rose-400/10 text-rose-200'
      : 'bg-rose-500/10 text-rose-700',

    Disputed: dark
      ? 'bg-rose-400/10 text-rose-200'
      : 'bg-rose-500/10 text-rose-700',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

/* ===============================================================
   DARK HEADER METRIC
================================================================ */

function DarkMetric({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
}) {
  return (
    <div className="border-white/[0.08] px-6 py-5 sm:px-7 sm:py-6 xl:border-r xl:last:border-r-0">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05]">
          <Icon className="h-4 w-4 text-white/55" />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30">
            {label}
          </p>

          <p className="mt-0.5 truncate font-display text-lg font-semibold text-white">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[10px] text-white/30">
        {description}
      </p>
    </div>
  )
}

/* ===============================================================
   INFO BLOCK
================================================================ */

function InfoBlock({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-4 transition-colors hover:border-ink/10">
      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-semibold leading-5 text-ink">
        {value}
      </p>
    </div>
  )
}

/* ===============================================================
   EVIDENCE
================================================================ */

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

  const iconClass =
    evidence.status === 'Verified'
      ? 'bg-emerald-500/10 text-emerald-700'
      : evidence.status === 'More Evidence Required'
        ? 'bg-amber-500/10 text-amber-700'
        : evidence.status === 'Rejected'
          ? 'bg-rose-500/10 text-rose-700'
          : 'bg-ink/5 text-ink/45'

  return (
    <div className="group flex flex-col gap-3 rounded-2xl border border-line bg-white p-4 transition-all hover:border-ink/10 hover:shadow-[0_8px_25px_rgba(11,18,32,0.05)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-xs font-semibold text-ink">
              {evidence.name}
            </p>

            <span className="rounded-full bg-ink/[0.04] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-ink/35">
              {evidence.type}
            </span>
          </div>

          <p className="mt-1 text-[10px] text-ink/40">
            {evidence.uploadedBy} · {evidence.uploadedAt}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${statusClass}`}
        >
          {evidence.status}
        </span>

        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink/35 transition-all hover:border-ink/15 hover:bg-paper-2 hover:text-ink"
          aria-label={`View ${evidence.name}`}
        >
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  )
}

/* ===============================================================
   APPROVAL TIMELINE
================================================================ */

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
    <div className="relative flex gap-3.5">
      {!last && (
        <div className="absolute left-[15px] top-8 h-[calc(100%+1.25rem)] w-px bg-line" />
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

      <div className="min-w-0 flex-1 pb-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-ink">
              {approval.role}
            </p>

            <p className="mt-0.5 text-[10px] text-ink/40">
              {approval.name}
            </p>
          </div>

          <span className="text-[9px] font-medium text-ink/30">
            {approval.date ?? 'Pending'}
          </span>
        </div>

        <span
          className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[9px] font-semibold ${
            verified
              ? 'bg-emerald-500/10 text-emerald-700'
              : rejected
                ? 'bg-rose-500/10 text-rose-700'
                : moreEvidence
                  ? 'bg-amber-500/10 text-amber-700'
                  : 'bg-ink/5 text-ink/40'
          }`}
        >
          {approval.status}
        </span>

        {approval.comment && (
          <p className="mt-2 text-[11px] leading-5 text-ink/45">
            {approval.comment}
          </p>
        )}
      </div>
    </div>
  )
}

/* ===============================================================
   PAYMENT
================================================================ */

function PaymentRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-ink/45">
        {label}
      </span>

      <span className="text-xs font-semibold text-ink">
        {value}
      </span>
    </div>
  )
}

function RuleCheck({
  label,
  complete,
}: {
  label: string
  complete: boolean
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`flex h-4 w-4 items-center justify-center rounded-full ${
          complete
            ? 'bg-emerald-500/10 text-emerald-600'
            : 'bg-ink/5 text-ink/25'
        }`}
      >
        {complete && <Check className="h-2.5 w-2.5" />}
      </div>

      <span
        className={`text-[10px] ${
          complete
            ? 'font-medium text-ink/60'
            : 'text-ink/35'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

/* ===============================================================
   AUDIT
================================================================ */

function AuditItem({
  title,
  description,
  actor,
  date,
  last = false,
}: {
  title: string
  description: string
  actor: string
  date: string
  last?: boolean
}) {
  return (
    <div className="relative flex gap-4">
      {!last && (
        <div className="absolute bottom-0 left-[15px] top-8 w-px bg-line" />
      )}

      <div className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white">
        <UserCheck className="h-3.5 w-3.5 text-ink/45" />
      </div>

      <div
        className={`min-w-0 flex-1 ${
          last ? '' : 'border-b border-line pb-5'
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <p className="text-xs font-semibold text-ink">
            {title}
          </p>

          <span className="text-[9px] text-ink/30">
            {date}
          </span>
        </div>

        <p className="mt-1 text-xs leading-5 text-ink/45">
          {description}
        </p>

        <p className="mt-2 text-[9px] font-semibold uppercase tracking-wide text-ink/30">
          By {actor}
        </p>
      </div>
    </div>
  )
}

/* ===============================================================
   CURRENCY
================================================================ */

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)
}