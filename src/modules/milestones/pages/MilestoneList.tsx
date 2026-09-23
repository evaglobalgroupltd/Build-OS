import type { ComponentType } from 'react'

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

  const activeMilestone =
    milestones.find(
      (milestone) =>
        milestone.status === 'Under Review' ||
        milestone.status === 'Submitted',
    ) ?? milestones.find((milestone) => milestone.status === 'In Progress')

  const verifiedEvidence = milestones.reduce(
    (total, milestone) => total + milestone.verifiedEvidence,
    0,
  )

  const totalEvidence = milestones.reduce(
    (total, milestone) => total + milestone.evidence,
    0,
  )

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden rounded-[28px] bg-[#0B1220] text-white shadow-[0_24px_70px_rgba(11,18,32,0.16)]">
        {/* Decorative atmosphere */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#1657FF]/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#34A6FF]/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '42px 42px',
            }}
          />
        </div>

        <div className="relative">
          <div className="px-6 pb-8 pt-7 sm:px-8 lg:px-10 lg:pb-9">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    <FolderKanban className="h-3 w-3" />
                    Project controls
                  </span>

                  <span className="font-mono text-[9px] font-medium tracking-[0.14em] text-white/30">
                    {milestones[0].projectId}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6EA1FF]">
                    Construction roadmap
                  </p>

                  <h1 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                    Milestones
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
                    Evidence-backed project stages, verification checkpoints
                    and payment controls across the construction lifecycle.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/40">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-white/25" />
                    Ahmed Residence — Abuja
                  </span>

                  <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

                  <span>
                    {milestones.length} tracked milestones
                  </span>

                  <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

                  <span>
                    {formatCompactCurrency(totalValue)} total roadmap value
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 text-xs font-semibold text-white/75 transition-all hover:border-white/20 hover:bg-white/[0.1] hover:text-white"
                >
                  <Filter className="h-3.5 w-3.5" />
                  View controls
                </button>

                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-semibold text-[#0B1220] transition-transform hover:-translate-y-0.5"
                >
                  Review active milestone
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Hero metrics */}
          <div className="grid border-t border-white/[0.08] sm:grid-cols-2 xl:grid-cols-4">
            <HeroMetric
              label="Roadmap progress"
              value={`${averageProgress}%`}
              description="Average milestone completion"
            />

            <HeroMetric
              label="Approved"
              value={`${approved}/${milestones.length}`}
              description={`${formatCompactCurrency(approvedValue)} approved`}
            />

            <HeroMetric
              label="Evidence verified"
              value={`${verifiedEvidence}/${totalEvidence}`}
              description="Across submitted milestones"
            />

            <HeroMetric
              label="Awaiting action"
              value={awaitingReview.toString()}
              description={
                activeMilestone
                  ? `${activeMilestone.id} requires attention`
                  : 'No active review'
              }
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ATTENTION STRIP                                                     */}
      {/* ------------------------------------------------------------------ */}

      {(awaitingReview > 0 || disputed > 0) && (
        <div className="grid gap-3 lg:grid-cols-2">
          {awaitingReview > 0 && (
            <AlertCard
              icon={Clock3}
              title={`${awaitingReview} milestone${awaitingReview > 1 ? 's' : ''} require review`}
              description="Verification or approval actions remain outstanding before the affected payment controls can progress."
              tone="amber"
              action="Review queue"
            />
          )}

          {disputed > 0 && (
            <AlertCard
              icon={AlertTriangle}
              title={`${disputed} disputed milestone${disputed > 1 ? 's' : ''}`}
              description="Affected payment lines remain controlled until the dispute resolution process is completed."
              tone="rose"
              action="View disputes"
            />
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* PROJECT COMMAND CENTER                                               */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          {/* Progress */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Project delivery progress"
              subtitle="Roadmap completion calculated from milestone execution"
            />

            <CardBody>
              <div className="grid gap-7 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-center">
                <ProgressRing value={averageProgress} />

                <div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        Construction roadmap
                      </p>

                      <p className="mt-1 max-w-xl text-xs leading-5 text-ink/45">
                        Progress should be supported by evidence, verification
                        and approved project activity rather than status
                        declarations alone.
                      </p>
                    </div>

                    <span className="font-display text-2xl font-semibold tracking-tight text-ink">
                      {averageProgress}%
                    </span>
                  </div>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-ink/[0.07]">
                    <div
                      className="h-full rounded-full bg-[#1657FF] transition-all"
                      style={{ width: `${averageProgress}%` }}
                    />
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-3">
                    <ProgressLegend
                      label="Approved"
                      value={approved}
                      tone="green"
                    />

                    <ProgressLegend
                      label="Active"
                      value={inProgress}
                      tone="blue"
                    />

                    <ProgressLegend
                      label="Remaining"
                      value={milestones.length - approved - inProgress}
                      tone="neutral"
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Search / filters */}
          <Card>
            <CardBody>
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

                  <input
                    type="search"
                    placeholder="Search milestones, phases or contractors..."
                    className="h-11 w-full rounded-xl border border-line bg-paper-2 pl-11 pr-4 text-sm text-ink outline-none transition-all placeholder:text-ink/30 focus:border-[#1657FF]/30 focus:bg-white focus:ring-4 focus:ring-[#1657FF]/[0.05]"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <FilterButton active>
                    <Filter className="h-3.5 w-3.5" />
                    All milestones
                  </FilterButton>

                  <FilterButton>
                    <Clock3 className="h-3.5 w-3.5" />
                    Needs review
                  </FilterButton>

                  <FilterButton>
                    <AlertTriangle className="h-3.5 w-3.5" />
                    At risk
                  </FilterButton>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Timeline */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Milestone roadmap"
              subtitle="Evidence-backed construction stages and payment controls"
              action={
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                  {milestones.length} stages
                </span>
              }
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
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RIGHT RAIL                                                        */}
        {/* ---------------------------------------------------------------- */}

        <aside className="space-y-6">
          {/* Active control */}
          <div className="overflow-hidden rounded-2xl bg-[#0B1220] text-white shadow-[0_18px_45px_rgba(11,18,32,0.12)]">
            <div className="relative overflow-hidden px-5 py-5">
              <div className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-[#1657FF]/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Payment control
                  </p>

                  <WalletCards className="h-4 w-4 text-white/25" />
                </div>

                <p className="mt-4 font-display text-3xl font-semibold tracking-tight">
                  {formatCompactCurrency(
                    activeMilestone?.amount ?? 0,
                  )}
                </p>

                <p className="mt-1 text-xs text-white/40">
                  {activeMilestone?.name ?? 'No active milestone'}
                </p>

                <div className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.04] p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />

                    <span className="text-[10px] font-semibold uppercase tracking-wide text-white/55">
                      Payment controlled
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-white/35">
                    Funds remain protected until verification and approval
                    requirements are satisfied.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.08] px-5 py-4">
              <ControlCheck
                label="Evidence verification"
                complete={
                  activeMilestone
                    ? activeMilestone.verifiedEvidence ===
                      activeMilestone.evidence
                    : false
                }
              />

              <ControlCheck
                label="Independent approval"
                complete={activeMilestone?.status === 'Approved'}
              />

              <ControlCheck
                label="Client approval"
                complete={activeMilestone?.status === 'Approved'}
              />
            </div>
          </div>

          {/* Current stage */}
          {activeMilestone && (
            <Card>
              <CardHeader
                title="Current stage"
                subtitle="Milestone requiring the next project action"
              />

              <CardBody>
                <div className="rounded-xl border border-line bg-paper-2 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                        {activeMilestone.id}
                      </p>

                      <p className="mt-1.5 text-sm font-semibold text-ink">
                        {activeMilestone.name}
                      </p>
                    </div>

                    <StatusBadge status={activeMilestone.status} />
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
                        Completion
                      </span>

                      <span className="text-xs font-semibold text-ink">
                        {activeMilestone.progress}%
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                      <div
                        className="h-full rounded-full bg-[#1657FF]"
                        style={{
                          width: `${activeMilestone.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <RailMetric
                      label="Due"
                      value={activeMilestone.dueDate}
                    />

                    <RailMetric
                      label="Evidence"
                      value={`${activeMilestone.verifiedEvidence}/${activeMilestone.evidence}`}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Verification principles */}
          <Card>
            <CardHeader
              title="Verification controls"
              subtitle="Rules governing milestone eligibility"
            />

            <CardBody className="space-y-1">
              <ControlRow
                icon={ImageIcon}
                title="Evidence"
                description="Photos, reports, receipts and completion records."
              />

              <ControlRow
                icon={UserCheck}
                title="Independent verification"
                description="Contractor evidence alone cannot release payment."
              />

              <ControlRow
                icon={BadgeCheck}
                title="Client approval"
                description="Required before major milestone payment release."
              />

              <ControlRow
                icon={ShieldCheck}
                title="Escrow protection"
                description="Funds remain controlled throughout review."
              />
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Milestone row                                                              */
/* -------------------------------------------------------------------------- */

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
    <div className="relative flex gap-4 pb-6 sm:gap-5 sm:pb-7">
      {!last && (
        <div className="absolute bottom-0 left-[17px] top-9 w-px bg-line" />
      )}

      {/* Timeline marker */}
      <div
        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-4 ring-white ${
          milestone.status === 'Approved'
            ? 'bg-emerald-500/10 text-emerald-700'
            : milestone.status === 'Disputed'
              ? 'bg-rose-500/10 text-rose-700'
              : milestone.status === 'Under Review' ||
                  milestone.status === 'Submitted'
                ? 'bg-amber-500/10 text-amber-700'
                : milestone.status === 'In Progress'
                  ? 'bg-[#1657FF]/10 text-[#1657FF]'
                  : 'bg-ink/5 text-ink/40'
        }`}
      >
        {milestone.status === 'Approved' ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : milestone.status === 'Disputed' ? (
          <AlertTriangle className="h-4 w-4" />
        ) : (
          <span className="font-mono text-[9px] font-bold">
            {milestone.id.replace('MS-', '')}
          </span>
        )}
      </div>

      {/* Milestone card */}
      <div className="min-w-0 flex-1">
        <div
          className={`group rounded-2xl border bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(11,18,32,0.07)] sm:p-5 ${
            milestone.status === 'Under Review'
              ? 'border-amber-200/80'
              : milestone.status === 'Disputed'
                ? 'border-rose-200/80'
                : 'border-line'
          }`}
        >
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-paper-2 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-ink/40">
                  {milestone.phase}
                </span>

                <StatusBadge status={milestone.status} />

                {milestone.risk !== 'Low' && (
                  <RiskBadge risk={milestone.risk} />
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                  {milestone.name}
                </h3>

                <span className="font-mono text-[9px] text-ink/25">
                  {milestone.id}
                </span>
              </div>

              <p className="mt-1 text-xs text-ink/40">
                {milestone.projectName}
              </p>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg px-2 py-1.5 text-xs font-semibold text-ink/45 transition-colors hover:bg-paper-2 hover:text-ink"
            >
              View details
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                Completion
              </span>

              <span className="font-mono text-[10px] font-semibold text-ink/60">
                {milestone.progress}%
              </span>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
              <div
                className={`h-full rounded-full transition-all ${
                  milestone.status === 'Approved'
                    ? 'bg-emerald-500'
                    : milestone.status === 'Disputed'
                      ? 'bg-rose-500'
                      : 'bg-[#1657FF]'
                }`}
                style={{ width: `${milestone.progress}%` }}
              />
            </div>
          </div>

          {/* Metrics */}
          <div className="mt-5 grid gap-4 border-y border-line py-4 sm:grid-cols-2 xl:grid-cols-4">
            <SmallMetric
              icon={CircleDollarSign}
              label="Milestone value"
              value={formatCurrency(milestone.amount)}
            />

            <SmallMetric
              icon={CalendarDays}
              label="Due date"
              value={milestone.dueDate}
            />

            <SmallMetric
              icon={FileCheck2}
              label="Evidence"
              value={`${milestone.verifiedEvidence}/${milestone.evidence}`}
            />

            <SmallMetric
              icon={ShieldCheck}
              label="Risk level"
              value={milestone.risk}
            />
          </div>

          {/* Footer */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-wrap gap-x-4 gap-y-2 text-[10px] text-ink/35">
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

            <VerificationState
              complete={evidenceComplete}
              status={milestone.status}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Hero metric                                                               */
/* -------------------------------------------------------------------------- */

function HeroMetric({
  label,
  value,
  description,
}: {
  label: string
  value: string
  description: string
}) {
  return (
    <div className="border-white/[0.08] px-6 py-5 first:border-l-0 sm:px-7 xl:border-l">
      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30">
        {label}
      </p>

      <p className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-white/30">
        {description}
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Progress ring                                                             */
/* -------------------------------------------------------------------------- */

function ProgressRing({ value }: { value: number }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative mx-auto h-36 w-36 lg:mx-0">
      <svg
        className="h-full w-full -rotate-90"
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          className="text-ink/[0.07]"
        />

        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-[#1657FF]"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-semibold tracking-tight text-ink">
          {value}%
        </span>

        <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-ink/30">
          Complete
        </span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Small UI components                                                       */
/* -------------------------------------------------------------------------- */

function ProgressLegend({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: 'green' | 'blue' | 'neutral'
}) {
  const dot =
    tone === 'green'
      ? 'bg-emerald-500'
      : tone === 'blue'
        ? 'bg-[#1657FF]'
        : 'bg-ink/20'

  return (
    <div className="flex items-center gap-2">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />

      <span className="text-[10px] text-ink/40">
        {label}
      </span>

      <span className="text-[10px] font-semibold text-ink/65">
        {value}
      </span>
    </div>
  )
}

function FilterButton({
  children,
  active = false,
}: {
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <button
      type="button"
      className={`inline-flex h-11 items-center gap-2 rounded-xl border px-3.5 text-xs font-medium transition-all ${
        active
          ? 'border-[#1657FF]/20 bg-[#1657FF]/[0.06] text-[#1657FF]'
          : 'border-line bg-white text-ink/50 hover:bg-paper-2 hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

function StatusBadge({
  status,
}: {
  status: MilestoneStatus
}) {
  const styles: Record<MilestoneStatus, string> = {
    Pending: 'bg-ink/5 text-ink/50',
    'In Progress': 'bg-[#1657FF]/10 text-[#1657FF]',
    Submitted: 'bg-amber-500/10 text-amber-700',
    'Under Review': 'bg-amber-500/10 text-amber-700',
    Approved: 'bg-emerald-500/10 text-emerald-700',
    Rejected: 'bg-rose-500/10 text-rose-700',
    Disputed: 'bg-rose-500/10 text-rose-700',
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  )
}

function RiskBadge({
  risk,
}: {
  risk: Milestone['risk']
}) {
  if (risk === 'Low') return null

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-semibold ${
        risk === 'High'
          ? 'bg-rose-500/10 text-rose-700'
          : 'bg-amber-500/10 text-amber-700'
      }`}
    >
      <AlertTriangle className="h-3 w-3" />
      {risk} risk
    </span>
  )
}

function SmallMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-paper-2">
        <Icon className="h-3.5 w-3.5 text-ink/35" />
      </div>

      <div className="min-w-0">
        <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/25">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-semibold text-ink/65">
          {value}
        </p>
      </div>
    </div>
  )
}

function VerificationState({
  complete,
  status,
}: {
  complete: boolean
  status: MilestoneStatus
}) {
  if (complete) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1.5 text-[9px] font-semibold text-emerald-700">
        <CheckCircle2 className="h-3 w-3" />
        Evidence verified
      </span>
    )
  }

  if (status === 'Under Review' || status === 'Submitted') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1.5 text-[9px] font-semibold text-amber-700">
        <Clock3 className="h-3 w-3" />
        Verification pending
      </span>
    )
  }

  if (status === 'Pending') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-1.5 text-[9px] font-semibold text-ink/40">
        Not started
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-1.5 text-[9px] font-semibold text-ink/45">
      Evidence required
    </span>
  )
}

function AlertCard({
  icon: Icon,
  title,
  description,
  tone,
  action,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  tone: 'amber' | 'rose'
  action: string
}) {
  const classes =
    tone === 'amber'
      ? {
          wrapper: 'border-amber-200/70 bg-amber-50/70',
          icon: 'bg-amber-500/10 text-amber-700',
          title: 'text-amber-900',
          body: 'text-amber-800/60',
          action: 'text-amber-800 hover:bg-amber-500/10',
        }
      : {
          wrapper: 'border-rose-200/70 bg-rose-50/70',
          icon: 'bg-rose-500/10 text-rose-700',
          title: 'text-rose-900',
          body: 'text-rose-800/60',
          action: 'text-rose-800 hover:bg-rose-500/10',
        }

  return (
    <div
      className={`rounded-2xl border px-4 py-4 ${classes.wrapper}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${classes.icon}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <p className={`text-xs font-semibold ${classes.title}`}>
            {title}
          </p>

          <p className={`mt-1 text-xs leading-5 ${classes.body}`}>
            {description}
          </p>
        </div>

        <button
          type="button"
          className={`hidden rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition-colors sm:block ${classes.action}`}
        >
          {action}
        </button>
      </div>
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
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="text-[10px] text-white/45">
        {label}
      </span>

      {complete ? (
        <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-emerald-400">
          <CheckCircle2 className="h-3 w-3" />
          Complete
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-amber-400">
          <Clock3 className="h-3 w-3" />
          Pending
        </span>
      )}
    </div>
  )
}

function RailMetric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/25">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-ink/70">
        {value}
      </p>
    </div>
  )
}

function ControlRow({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-paper-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/[0.04]">
        <Icon className="h-3.5 w-3.5 text-ink/50" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-ink">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-4.5 text-ink/40">
          {description}
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

function formatCompactCurrency(value: number) {
  if (value >= 1000000) {
    return `₦${(value / 1000000).toFixed(1)}m`
  }

  if (value >= 1000) {
    return `₦${Math.round(value / 1000)}k`
  }

  return formatCurrency(value)
}