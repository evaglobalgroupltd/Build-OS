import type { ComponentType } from 'react'

import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  MapPin,
  Plus,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type InspectionStatus =
  | 'Scheduled'
  | 'In Progress'
  | 'Pending Review'
  | 'Completed'
  | 'Requires Action'
  | 'Cancelled'

type InspectionType =
  | 'Milestone'
  | 'Material Delivery'
  | 'Quality'
  | 'Safety'
  | 'Final'

interface Inspection {
  id: string
  projectId: string
  projectName: string
  type: InspectionType
  title: string
  location: string
  scheduledDate: string
  scheduledTime: string
  inspector: string
  professional?: string
  contractor: string
  milestone?: string
  status: InspectionStatus
  priority: 'Normal' | 'High' | 'Critical'
  findings: number
  evidenceCount: number
  reportStatus: 'Not Started' | 'Draft' | 'Submitted' | 'Verified'
  summary: string
}

const inspections: Inspection[] = [
  {
    id: 'INS-001',
    projectId: 'PRJ-2026-014',
    projectName: 'Ahmed Residence — Abuja',
    type: 'Milestone',
    title: 'Foundation Completion Inspection',
    location: 'Gwarinpa, Abuja, Nigeria',
    scheduledDate: '28 Aug 2026',
    scheduledTime: '10:00 AM',
    inspector: 'Ibrahim Musa',
    professional: 'Engr. Yusuf Abdullahi',
    contractor: 'PrimeBuild Construction Ltd.',
    milestone: 'Foundation Completion',
    status: 'Pending Review',
    priority: 'High',
    findings: 1,
    evidenceCount: 7,
    reportStatus: 'Submitted',
    summary:
      'Foundation works have been completed and require final professional verification before milestone approval.',
  },
  {
    id: 'INS-002',
    projectId: 'PRJ-2026-014',
    projectName: 'Ahmed Residence — Abuja',
    type: 'Material Delivery',
    title: 'Reinforcement Steel Delivery',
    location: 'Gwarinpa, Abuja, Nigeria',
    scheduledDate: '27 Aug 2026',
    scheduledTime: '02:00 PM',
    inspector: 'Ibrahim Musa',
    contractor: 'PrimeBuild Construction Ltd.',
    status: 'Completed',
    priority: 'Normal',
    findings: 0,
    evidenceCount: 5,
    reportStatus: 'Verified',
    summary:
      'Delivered reinforcement steel was inspected against the approved material request and accepted.',
  },
  {
    id: 'INS-003',
    projectId: 'PRJ-2026-011',
    projectName: 'Musa Family Home — Kaduna',
    type: 'Quality',
    title: 'Blockwork Quality Inspection',
    location: 'Barnawa, Kaduna, Nigeria',
    scheduledDate: '29 Aug 2026',
    scheduledTime: '09:30 AM',
    inspector: 'Amina Bello',
    professional: 'Arc. Fatima Ibrahim',
    contractor: 'SolidCore Builders Ltd.',
    milestone: 'Blockwork',
    status: 'Scheduled',
    priority: 'Normal',
    findings: 0,
    evidenceCount: 0,
    reportStatus: 'Not Started',
    summary:
      'Planned inspection of block alignment, mortar quality, openings and workmanship.',
  },
  {
    id: 'INS-004',
    projectId: 'PRJ-2026-009',
    projectName: 'Greenview Duplex — Abuja',
    type: 'Safety',
    title: 'Site Safety Compliance Inspection',
    location: 'Katampe, Abuja, Nigeria',
    scheduledDate: '30 Aug 2026',
    scheduledTime: '11:00 AM',
    inspector: 'Ibrahim Musa',
    contractor: 'BuildRight Nigeria Ltd.',
    status: 'Requires Action',
    priority: 'Critical',
    findings: 3,
    evidenceCount: 4,
    reportStatus: 'Submitted',
    summary:
      'Inspection identified unresolved site safety observations requiring contractor corrective action.',
  },
  {
    id: 'INS-005',
    projectId: 'PRJ-2026-006',
    projectName: 'Lakeview Apartments — Lagos',
    type: 'Final',
    title: 'Final Completion Inspection',
    location: 'Lekki, Lagos, Nigeria',
    scheduledDate: '01 Sep 2026',
    scheduledTime: '09:00 AM',
    inspector: 'David Okafor',
    professional: 'Engr. Chinedu Eze',
    contractor: 'PrimeBuild West Ltd.',
    milestone: 'Final Completion',
    status: 'Scheduled',
    priority: 'High',
    findings: 0,
    evidenceCount: 0,
    reportStatus: 'Not Started',
    summary:
      'Final inspection covering defects, workmanship, installations, external works and handover readiness.',
  },
]

export function Inspections() {
  const scheduledCount = inspections.filter(
    (item) => item.status === 'Scheduled',
  ).length

  const pendingCount = inspections.filter(
    (item) => item.status === 'Pending Review',
  ).length

  const completedCount = inspections.filter(
    (item) => item.status === 'Completed',
  ).length

  const actionCount = inspections.filter(
    (item) => item.status === 'Requires Action',
  ).length

  const totalFindings = inspections.reduce(
    (total, inspection) => total + inspection.findings,
    0,
  )

  const totalEvidence = inspections.reduce(
    (total, inspection) => total + inspection.evidenceCount,
    0,
  )

  return (
    <div className="space-y-6 pb-8">
      {/* Hero */}
      <Card className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#12613E]/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-56 w-56 rounded-full bg-[#B85C12]/[0.05] blur-3xl" />

        <div className="relative border-b border-ink/[0.06] bg-[#F8FAF8] px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#12613E]/[0.08] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#12613E]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
                  Construction monitoring
                </span>

                <span className="rounded-full border border-ink/[0.07] bg-white px-3 py-1.5 text-[10px] font-medium text-ink/45">
                  {inspections.length} inspection records
                </span>
              </div>

              <h1 className="mt-5 font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-[34px]">
                Site inspections
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
                Coordinate field inspections, verify evidence, track findings
                and maintain an auditable record of project quality, safety
                and milestone decisions.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5">
                <HeroMeta
                  icon={CalendarDays}
                  label={`${scheduledCount} scheduled`}
                />

                <HeroMeta
                  icon={FileCheck2}
                  label={`${pendingCount} pending review`}
                />

                <HeroMeta
                  icon={CheckCircle2}
                  label={`${completedCount} verified`}
                />

                <HeroMeta
                  icon={AlertTriangle}
                  label={`${actionCount} require action`}
                  emphasis={actionCount > 0}
                />
              </div>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[13px] bg-ink px-4.5 py-3 text-xs font-semibold text-white shadow-[0_12px_28px_rgba(20,40,30,0.16)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(20,40,30,0.2)]"
            >
              <Plus className="h-4 w-4" />
              Schedule inspection
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid divide-y divide-ink/[0.06] sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          <InspectionMetric
            icon={CalendarDays}
            label="Scheduled"
            value={String(scheduledCount)}
            description="Upcoming field inspections"
            tone="green"
          />

          <InspectionMetric
            icon={Clock3}
            label="Pending review"
            value={String(pendingCount)}
            description="Reports awaiting verification"
            tone="bronze"
          />

          <InspectionMetric
            icon={CheckCircle2}
            label="Completed"
            value={String(completedCount)}
            description="Verified inspection records"
            tone="green"
          />

          <InspectionMetric
            icon={AlertTriangle}
            label="Action required"
            value={String(actionCount)}
            description={`${totalFindings} open finding${totalFindings === 1 ? '' : 's'}`}
            tone={actionCount > 0 ? 'rose' : 'neutral'}
          />
        </div>
      </Card>

      {/* Governance notice */}
      <div className="relative overflow-hidden rounded-[18px] border border-[#12613E]/[0.10] bg-[#12613E]/[0.045] px-5 py-4 sm:px-6">
        <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-[#12613E]/[0.06] blur-2xl" />

        <div className="relative flex items-start gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-white text-[#12613E] shadow-sm">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#12613E]">
              Inspection-controlled monitoring
            </p>

            <p className="mt-1 max-w-4xl text-xs leading-5 text-ink/50">
              Inspection findings can influence milestone verification,
              material acceptance, project risk and payment recommendations.
              Inspection records and decisions remain part of the project
              audit trail.
            </p>
          </div>
        </div>
      </div>

      {/* Queue controls */}
      <Card>
        <CardBody className="p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

                <p className="text-sm font-semibold tracking-[-0.01em] text-ink">
                  Inspection queue
                </p>
              </div>

              <p className="mt-1.5 text-xs text-ink/40">
                Review scheduled, active and completed field records.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <FilterButton label="All" active />
              <FilterButton label="Scheduled" />
              <FilterButton label="Pending review" />
              <FilterButton label="Completed" />
              <FilterButton label="Action required" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Queue */}
      <div className="space-y-4">
        {inspections.map((inspection) => (
          <InspectionRow
            key={inspection.id}
            inspection={inspection}
          />
        ))}
      </div>

      {/* Operational overview */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Inspection workflow"
          subtitle="The standard sequence from field scheduling to verified project record."
        />

        <CardBody className="pt-2">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <WorkflowStep
              number="01"
              title="Schedule"
              description="Create an inspection against a project, milestone or delivery."
              tone="green"
            />

            <WorkflowStep
              number="02"
              title="Inspect"
              description="Review site conditions, workmanship, materials or safety controls."
            />

            <WorkflowStep
              number="03"
              title="Evidence"
              description="Attach photographs, videos, documents and inspection notes."
            />

            <WorkflowStep
              number="04"
              title="Findings"
              description="Record issues and assign corrective actions where required."
              tone="bronze"
            />

            <WorkflowStep
              number="05"
              title="Verify"
              description="Review the report and connect the decision to the project record."
              tone="green"
            />
          </div>
        </CardBody>
      </Card>

      {/* Controls */}
      <Card>
        <CardHeader
          title="Inspection controls"
          subtitle="Governance principles supporting reliable project monitoring."
        />

        <CardBody className="pt-2">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <ControlCard
              icon={UserCheck}
              title="Independent verification"
              description="Contractor evidence alone should not determine milestone acceptance."
            />

            <ControlCard
              icon={FileCheck2}
              title="Evidence required"
              description="Inspection findings should be supported by appropriate site evidence."
            />

            <ControlCard
              icon={AlertTriangle}
              title="Risk escalation"
              description="Critical findings can trigger corrective action or payment controls."
              tone="bronze"
            />

            <ControlCard
              icon={ShieldCheck}
              title="Audit trail"
              description="Inspection decisions and status changes remain permanently recorded."
              tone="green"
            />
          </div>
        </CardBody>
      </Card>

      {/* Footer */}
      <Card className="overflow-hidden">
        <CardBody className="p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">
                Need to schedule another inspection?
              </p>

              <p className="mt-1.5 max-w-2xl text-xs leading-5 text-ink/45">
                Create a project-linked inspection and assign the appropriate
                Project Manager or professional expert.
              </p>

              <div className="mt-3 flex flex-wrap gap-4 text-[10px] font-medium text-ink/35">
                <span>{totalEvidence} evidence items recorded</span>
                <span>{inspections.length} inspection records</span>
                <span>Audit trail enabled</span>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[12px] border border-ink/[0.08] bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 shadow-sm transition-all hover:-translate-y-0.5 hover:border-ink/[0.12] hover:bg-[#F8FAF8] hover:text-ink"
            >
              <Plus className="h-4 w-4" />
              Create inspection
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function InspectionRow({
  inspection,
}: {
  inspection: Inspection
}) {
  const isCritical = inspection.priority === 'Critical'
  const hasFindings = inspection.findings > 0

  return (
    <Card
      className={`group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(20,40,30,0.08)] ${
        isCritical
          ? 'border-rose-500/[0.14]'
          : 'border-ink/[0.06]'
      }`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
          {/* Main */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-ink/30">
                {inspection.id}
              </span>

              <InspectionStatusBadge status={inspection.status} />

              <PriorityBadge priority={inspection.priority} />

              <span className="rounded-full bg-ink/[0.045] px-2.5 py-1 text-[10px] font-semibold text-ink/45">
                {inspection.type}
              </span>
            </div>

            <div className="mt-4">
              <h2 className="font-display text-[16px] font-semibold tracking-[-0.015em] text-ink">
                {inspection.title}
              </h2>

              <p className="mt-1 text-xs text-ink/45">
                {inspection.projectName}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5 text-[11px] text-ink/45">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-ink/30" />
                {inspection.location}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-ink/30" />
                {inspection.scheduledDate}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5 text-ink/30" />
                {inspection.scheduledTime}
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-xs leading-5 text-ink/50">
              {inspection.summary}
            </p>
          </div>

          {/* Detail grid */}
          <div className="grid gap-2.5 sm:grid-cols-2 xl:w-[370px]">
            <CompactInfo
              label="Inspector"
              value={inspection.inspector}
            />

            <CompactInfo
              label="Contractor"
              value={inspection.contractor}
            />

            <CompactInfo
              label="Evidence"
              value={`${inspection.evidenceCount} ${
                inspection.evidenceCount === 1 ? 'item' : 'items'
              }`}
              tone={inspection.evidenceCount > 0 ? 'green' : 'neutral'}
            />

            <CompactInfo
              label="Findings"
              value={`${inspection.findings} ${
                inspection.findings === 1 ? 'finding' : 'findings'
              }`}
              tone={hasFindings ? 'bronze' : 'green'}
            />
          </div>

          {/* Open */}
          <button
            type="button"
            className="inline-flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-[12px] border border-ink/[0.07] bg-white px-3 text-xs font-semibold text-ink/50 transition-all hover:border-[#12613E]/20 hover:bg-[#12613E]/[0.035] hover:text-[#12613E] sm:w-auto xl:h-11 xl:w-11 xl:px-0"
            aria-label={`Open ${inspection.title}`}
          >
            <span className="xl:hidden">Open inspection</span>

            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-col gap-3 border-t border-ink/[0.06] bg-[#FAFBFA] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {inspection.milestone && (
            <MetadataItem
              label="Milestone"
              value={inspection.milestone}
            />
          )}

          {inspection.professional && (
            <MetadataItem
              label="Professional"
              value={inspection.professional}
            />
          )}
        </div>

        <MetadataItem
          label="Report"
          value={inspection.reportStatus}
        />
      </div>
    </Card>
  )
}

function HeroMeta({
  icon: Icon,
  label,
  emphasis = false,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  emphasis?: boolean
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
        emphasis ? 'text-rose-600' : 'text-ink/40'
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  )
}

function InspectionStatusBadge({
  status,
}: {
  status: InspectionStatus
}) {
  const styles: Record<InspectionStatus, string> = {
    Scheduled: 'bg-[#12613E]/[0.08] text-[#12613E]',
    'In Progress': 'bg-amber-500/[0.10] text-amber-700',
    'Pending Review': 'bg-[#B85C12]/[0.10] text-[#A44F0B]',
    Completed: 'bg-emerald-500/[0.09] text-emerald-700',
    'Requires Action': 'bg-rose-500/[0.09] text-rose-700',
    Cancelled: 'bg-ink/[0.045] text-ink/40',
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  )
}

function PriorityBadge({
  priority,
}: {
  priority: Inspection['priority']
}) {
  const styles = {
    Normal: 'bg-ink/[0.045] text-ink/40',
    High: 'bg-[#B85C12]/[0.10] text-[#A44F0B]',
    Critical: 'bg-rose-500/[0.09] text-rose-700',
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[priority]}`}
    >
      {priority}
    </span>
  )
}

function InspectionMetric({
  icon: Icon,
  label,
  value,
  description,
  tone,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  tone: 'green' | 'bronze' | 'rose' | 'neutral'
}) {
  const toneStyles = {
    green: {
      icon: 'bg-[#12613E]/[0.08] text-[#12613E]',
      value: 'text-[#12613E]',
    },
    bronze: {
      icon: 'bg-[#B85C12]/[0.09] text-[#A44F0B]',
      value: 'text-[#A44F0B]',
    },
    rose: {
      icon: 'bg-rose-500/[0.08] text-rose-600',
      value: 'text-rose-700',
    },
    neutral: {
      icon: 'bg-ink/[0.05] text-ink/50',
      value: 'text-ink',
    },
  }

  return (
    <div className="px-6 py-5 sm:px-7">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-[11px] ${toneStyles[tone].icon}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.10em] text-ink/30">
            {label}
          </p>

          <p
            className={`mt-0.5 font-display text-xl font-semibold ${toneStyles[tone].value}`}
          >
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

function FilterButton({
  label,
  active = false,
}: {
  label: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      className={`rounded-[11px] px-3.5 py-2 text-[10px] font-semibold transition-all ${
        active
          ? 'bg-ink text-white shadow-[0_7px_18px_rgba(20,40,30,0.12)]'
          : 'border border-ink/[0.07] bg-white text-ink/45 hover:border-ink/[0.12] hover:bg-[#FAFBFA] hover:text-ink/70'
      }`}
    >
      {label}
    </button>
  )
}

function CompactInfo({
  label,
  value,
  tone = 'neutral',
}: {
  label: string
  value: string
  tone?: 'green' | 'bronze' | 'neutral'
}) {
  const accents = {
    green: 'border-[#12613E]/[0.10] bg-[#12613E]/[0.025]',
    bronze: 'border-[#B85C12]/[0.10] bg-[#B85C12]/[0.025]',
    neutral: 'border-ink/[0.06] bg-white',
  }

  return (
    <div
      className={`min-w-0 rounded-[13px] border p-3.5 ${accents[tone]}`}
    >
      <p className="text-[9px] font-semibold uppercase tracking-[0.10em] text-ink/30">
        {label}
      </p>

      <p className="mt-1 truncate text-[11px] font-semibold text-ink">
        {value}
      </p>
    </div>
  )
}

function MetadataItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <span className="text-[10px] text-ink/35">
      {label}:{' '}
      <span className="font-semibold text-ink/55">
        {value}
      </span>
    </span>
  )
}

function WorkflowStep({
  number,
  title,
  description,
  tone = 'neutral',
}: {
  number: string
  title: string
  description: string
  tone?: 'green' | 'bronze' | 'neutral'
}) {
  const numberStyles = {
    green: 'bg-[#12613E]/[0.08] text-[#12613E]',
    bronze: 'bg-[#B85C12]/[0.09] text-[#A44F0B]',
    neutral: 'bg-ink/[0.045] text-ink/45',
  }

  return (
    <div className="group rounded-[16px] border border-ink/[0.06] bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/[0.10] hover:shadow-[0_14px_30px_rgba(20,40,30,0.06)]">
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-[9px] font-semibold ${numberStyles[tone]}`}
        >
          {number}
        </span>

        <p className="text-xs font-semibold text-ink">
          {title}
        </p>
      </div>

      <p className="mt-3 text-xs leading-5 text-ink/45">
        {description}
      </p>
    </div>
  )
}

function ControlCard({
  icon: Icon,
  title,
  description,
  tone = 'neutral',
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  tone?: 'green' | 'bronze' | 'neutral'
}) {
  const iconStyles = {
    green: 'bg-[#12613E]/[0.08] text-[#12613E]',
    bronze: 'bg-[#B85C12]/[0.09] text-[#A44F0B]',
    neutral: 'bg-ink/[0.045] text-ink/50',
  }

  return (
    <div className="rounded-[16px] border border-ink/[0.06] bg-white p-4.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/[0.10] hover:shadow-[0_14px_30px_rgba(20,40,30,0.06)]">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-[11px] ${iconStyles[tone]}`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <p className="mt-3.5 text-xs font-semibold text-ink">
        {title}
      </p>

      <p className="mt-1.5 text-xs leading-5 text-ink/45">
        {description}
      </p>
    </div>
  )
}