import {
  AlertTriangle,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  Filter,
  FolderKanban,
  Image as ImageIcon,
  MapPin,
  Search,
  ShieldCheck,
  UserCheck,
  WalletCards,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type MilestoneStatus =
  | 'Pending'
  | 'In Progress'
  | 'Submitted'
  | 'Under Review'
  | 'Approved'
  | 'Rejected'
  | 'Disputed'

interface Milestone {
  id: string
  projectId: string
  projectName: string
  name: string
  phase: string
  status: MilestoneStatus
  progress: number
  amount: number
  dueDate: string
  evidence: number
  verifiedEvidence: number
  contractor: string
  projectManager: string
  risk: 'Low' | 'Medium' | 'High'
}

const milestones: Milestone[] = [
  {
    id: 'MS-001',
    projectId: 'PRJ-2026-014',
    projectName: 'Ahmed Residence — Abuja',
    name: 'Site Clearing',
    phase: 'Pre-Construction',
    status: 'Approved',
    progress: 100,
    amount: 850000,
    dueDate: '08 Aug 2026',
    evidence: 6,
    verifiedEvidence: 6,
    contractor: 'PrimeBuild Construction Ltd.',
    projectManager: 'Ibrahim Musa',
    risk: 'Low',
  },
  {
    id: 'MS-002',
    projectId: 'PRJ-2026-014',
    projectName: 'Ahmed Residence — Abuja',
    name: 'Excavation',
    phase: 'Foundation',
    status: 'Approved',
    progress: 100,
    amount: 1250000,
    dueDate: '15 Aug 2026',
    evidence: 5,
    verifiedEvidence: 5,
    contractor: 'PrimeBuild Construction Ltd.',
    projectManager: 'Ibrahim Musa',
    risk: 'Low',
  },
  {
    id: 'MS-003',
    projectId: 'PRJ-2026-014',
    projectName: 'Ahmed Residence — Abuja',
    name: 'Foundation',
    phase: 'Foundation',
    status: 'Approved',
    progress: 100,
    amount: 3900000,
    dueDate: '24 Aug 2026',
    evidence: 8,
    verifiedEvidence: 8,
    contractor: 'PrimeBuild Construction Ltd.',
    projectManager: 'Ibrahim Musa',
    risk: 'Low',
  },
  {
    id: 'MS-004',
    projectId: 'PRJ-2026-014',
    projectName: 'Ahmed Residence — Abuja',
    name: 'Foundation Completion',
    phase: 'Foundation',
    status: 'Under Review',
    progress: 100,
    amount: 4850000,
    dueDate: '28 Aug 2026',
    evidence: 7,
    verifiedEvidence: 5,
    contractor: 'PrimeBuild Construction Ltd.',
    projectManager: 'Ibrahim Musa',
    risk: 'Medium',
  },
  {
    id: 'MS-005',
    projectId: 'PRJ-2026-014',
    projectName: 'Ahmed Residence — Abuja',
    name: 'Block Work',
    phase: 'Structure',
    status: 'In Progress',
    progress: 64,
    amount: 6250000,
    dueDate: '12 Sep 2026',
    evidence: 9,
    verifiedEvidence: 9,
    contractor: 'PrimeBuild Construction Ltd.',
    projectManager: 'Ibrahim Musa',
    risk: 'Low',
  },
  {
    id: 'MS-006',
    projectId: 'PRJ-2026-014',
    projectName: 'Ahmed Residence — Abuja',
    name: 'Columns & Beams',
    phase: 'Structure',
    status: 'Pending',
    progress: 0,
    amount: 5400000,
    dueDate: '26 Sep 2026',
    evidence: 0,
    verifiedEvidence: 0,
    contractor: 'PrimeBuild Construction Ltd.',
    projectManager: 'Ibrahim Musa',
    risk: 'Low',
  },
  {
    id: 'MS-007',
    projectId: 'PRJ-2026-014',
    projectName: 'Ahmed Residence — Abuja',
    name: 'Roofing',
    phase: 'Roofing',
    status: 'Pending',
    progress: 0,
    amount: 7100000,
    dueDate: '18 Oct 2026',
    evidence: 0,
    verifiedEvidence: 0,
    contractor: 'PrimeBuild Construction Ltd.',
    projectManager: 'Ibrahim Musa',
    risk: 'Low',
  },
]

export function MilestoneList() {
  const approved = milestones.filter(
    (milestone) => milestone.status === 'Approved',
  ).length

  const inProgress = milestones.filter(
    (milestone) => milestone.status === 'In Progress',
  ).length

  const awaitingReview = milestones.filter(
    (milestone) =>
      milestone.status === 'Submitted' ||
      milestone.status === 'Under Review',
  ).length

  const disputed = milestones.filter(
    (milestone) => milestone.status === 'Disputed',
  ).length

  const totalValue = milestones.reduce(
    (total, milestone) => total + milestone.amount,
    0,
  )

  const approvedValue = milestones
    .filter((milestone) => milestone.status === 'Approved')
    .reduce((total, milestone) => total + milestone.amount, 0)

  const averageProgress = Math.round(
    milestones.reduce(
      (total, milestone) => total + milestone.progress,
      0,
    ) / milestones.length,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white">
                  <FolderKanban className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                    Project controls
                  </p>

                  <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    Milestones
                  </h1>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/50">
                Track project milestones, completion evidence, verification,
                approvals and payment readiness from a single project
                timeline.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-3">
              <MapPin className="h-4 w-4 text-ink/40" />

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/35">
                  Project
                </p>

                <p className="mt-0.5 text-xs font-semibold text-ink">
                  Ahmed Residence — Abuja
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          <MilestoneMetric
            icon={CheckCircle2}
            label="Approved"
            value={`${approved}/${milestones.length}`}
            description="Milestones completed and approved"
          />

          <MilestoneMetric
            icon={Clock3}
            label="In progress"
            value={inProgress.toString()}
            description="Currently under execution"
          />

          <MilestoneMetric
            icon={FileCheck2}
            label="Awaiting review"
            value={awaitingReview.toString()}
            description="Evidence or approval pending"
          />

          <MilestoneMetric
            icon={CircleDollarSign}
            label="Approved value"
            value={formatCompactCurrency(approvedValue)}
            description={`of ${formatCompactCurrency(totalValue)} milestone value`}
          />
        </div>
      </Card>

      {/* Project progress */}
      <Card>
        <CardHeader
          title="Project milestone progress"
          subtitle="Overall completion across the approved project roadmap"
        />

        <CardBody>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-[7px] border-ink/10">
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-ink">
                    {averageProgress}%
                  </p>

                  <p className="text-[8px] font-semibold text-ink/35">
                    PROGRESS
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Construction roadmap
                </p>

                <p className="mt-1 max-w-md text-xs leading-5 text-ink/45">
                  Progress is calculated from milestone completion and should
                  be supported by evidence rather than status declarations
                  alone.
                </p>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Roadmap completion
                </span>

                <span className="text-xs font-semibold text-ink">
                  {averageProgress}%
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-ink"
                  style={{ width: `${averageProgress}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] text-ink/35">
                <span>{approved} approved</span>
                <span>{inProgress} active</span>
                <span>{milestones.length - approved - inProgress} remaining</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-xl">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />

              <input
                type="search"
                placeholder="Search milestones, phases or contractors..."
                className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-ink/25"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-medium text-ink/60 transition-colors hover:bg-paper-2"
              >
                <Filter className="h-3.5 w-3.5" />
                All milestones
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-medium text-ink/60 transition-colors hover:bg-paper-2"
              >
                <Clock3 className="h-3.5 w-3.5" />
                Needs review
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Alerts */}
      {(awaitingReview > 0 || disputed > 0) && (
        <div className="grid gap-3 md:grid-cols-2">
          {awaitingReview > 0 && (
            <AlertCard
              icon={FileCheck2}
              title={`${awaitingReview} milestone${awaitingReview > 1 ? 's' : ''} awaiting review`}
              description="Evidence or approval actions are required before payment can proceed."
              tone="amber"
            />
          )}

          {disputed > 0 && (
            <AlertCard
              icon={AlertTriangle}
              title={`${disputed} disputed milestone${disputed > 1 ? 's' : ''}`}
              description="Affected payment lines remain frozen pending dispute resolution."
              tone="rose"
            />
          )}
        </div>
      )}

      {/* Milestone timeline */}
      <Card>
        <CardHeader
          title="Project milestone roadmap"
          subtitle="Evidence-backed construction stages and payment controls"
        />

        <CardBody>
          <div className="space-y-0">
            {milestones.map((milestone, index) => (
              <MilestoneRow
                key={milestone.id}
                milestone={milestone}
                last={index === milestones.length - 1}
              />
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Verification controls */}
      <Card>
        <CardHeader
          title="Milestone verification controls"
          subtitle="Rules governing milestone approval and payment eligibility"
        />

        <CardBody>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ControlCard
              icon={ImageIcon}
              title="Evidence"
              description="Photos, videos, reports, receipts and completion notes support milestone claims."
            />

            <ControlCard
              icon={UserCheck}
              title="Independent verification"
              description="Contractor evidence alone is insufficient for payment release."
            />

            <ControlCard
              icon={BadgeCheck}
              title="Client approval"
              description="Major milestone payments require client approval after verification."
            />

            <ControlCard
              icon={WalletCards}
              title="Escrow control"
              description="Payment remains controlled until the required approval chain is complete."
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function MilestoneRow({
  milestone,
  last,
}: {
  milestone: Milestone
  last: boolean
}) {
  const evidenceComplete =
    milestone.evidence > 0 &&
    milestone.verifiedEvidence === milestone.evidence

  return (
    <div className="relative flex gap-4 pb-7 last:pb-0">
      {!last && (
        <div className="absolute left-[17px] top-9 h-[calc(100%-1rem)] w-px bg-line" />
      )}

      {/* Timeline marker */}
      <div
        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          milestone.status === 'Approved'
            ? 'bg-emerald-500/10 text-emerald-700'
            : milestone.status === 'Disputed'
              ? 'bg-rose-500/10 text-rose-700'
              : milestone.status === 'Under Review' ||
                  milestone.status === 'Submitted'
                ? 'bg-amber-500/10 text-amber-700'
                : milestone.status === 'In Progress'
                  ? 'bg-blue-500/10 text-blue-700'
                  : 'bg-ink/5 text-ink/40'
        }`}
      >
        {milestone.status === 'Approved' ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : milestone.status === 'Disputed' ? (
          <AlertTriangle className="h-4 w-4" />
        ) : (
          <span className="text-[10px] font-bold">
            {milestone.id.replace('MS-', '')}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="rounded-xl border border-line bg-white p-4 transition-shadow hover:shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-paper-2 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-ink/40">
                  {milestone.phase}
                </span>

                <StatusBadge status={milestone.status} />
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-sm font-semibold text-ink">
                  {milestone.name}
                </h3>

                <span className="font-mono text-[9px] text-ink/30">
                  {milestone.id}
                </span>
              </div>

              <p className="mt-1 text-xs text-ink/40">
                {milestone.projectName}
              </p>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-ink/55 transition-colors hover:text-ink"
            >
              View details
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Progress */}
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-wide text-ink/35">
                Completion
              </span>

              <span className="text-xs font-semibold text-ink">
                {milestone.progress}%
              </span>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-ink"
                style={{ width: `${milestone.progress}%` }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <SmallMetric
              icon={CircleDollarSign}
              label="Value"
              value={formatCurrency(milestone.amount)}
            />

            <SmallMetric
              icon={CalendarDays}
              label="Due"
              value={milestone.dueDate}
            />

            <SmallMetric
              icon={FileCheck2}
              label="Evidence"
              value={`${milestone.verifiedEvidence}/${milestone.evidence}`}
            />

            <SmallMetric
              icon={ShieldCheck}
              label="Risk"
              value={milestone.risk}
            />
          </div>

          {/* Verification state */}
          <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3 text-[10px] text-ink/40">
              <span>
                Contractor:{' '}
                <strong className="font-semibold text-ink/60">
                  {milestone.contractor}
                </strong>
              </span>

              <span>
                PM:{' '}
                <strong className="font-semibold text-ink/60">
                  {milestone.projectManager}
                </strong>
              </span>
            </div>

            <div>
              {evidenceComplete ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" />
                  Evidence verified
                </span>
              ) : milestone.status === 'Under Review' ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-amber-700">
                  <Clock3 className="h-3 w-3" />
                  Verification pending
                </span>
              ) : milestone.status === 'Pending' ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-1.5 text-[10px] font-semibold text-ink/40">
                  Not started
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-1.5 text-[10px] font-semibold text-ink/45">
                  Evidence required
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
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

function SmallMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-3.5 w-3.5 shrink-0 text-ink/35" />

      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-semibold text-ink/65">
          {value}
        </p>
      </div>
    </div>
  )
}

function AlertCard({
  icon: Icon,
  title,
  description,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  tone: 'amber' | 'rose'
}) {
  const classes =
    tone === 'amber'
      ? 'border-amber-200 bg-amber-50 text-amber-700'
      : 'border-rose-200 bg-rose-50 text-rose-700'

  return (
    <div className={`rounded-xl border px-4 py-3.5 ${classes}`}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-4 w-4 shrink-0" />

        <div>
          <p className="text-xs font-semibold">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 opacity-75">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

function ControlCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-line bg-paper-2 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
        <Icon className="h-4 w-4 text-ink/55" />
      </div>

      <p className="mt-3 text-xs font-semibold text-ink">
        {title}
      </p>

      <p className="mt-1.5 text-xs leading-5 text-ink/45">
        {description}
      </p>
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

function formatCompactCurrency(value: number) {
  if (value >= 1000000) {
    return `₦${(value / 1000000).toFixed(1)}m`
  }

  if (value >= 1000) {
    return `₦${Math.round(value / 1000)}k`
  }

  return formatCurrency(value)
}