import {
  AlertTriangle,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  MapPin,
  Plus,
  ShieldCheck,
  UserCheck,
  Users,
  X,
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink/45">
                  Monitoring
                </span>

                <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
                  Site Inspections
                </span>
              </div>

              <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                Inspections
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/45">
                Schedule, conduct and verify site inspections across projects,
                milestones, material deliveries, quality and safety checks.
              </p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/45">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {scheduledCount} scheduled
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <FileCheck2 className="h-3.5 w-3.5" />
                  {pendingCount} pending review
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {completedCount} completed
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {actionCount} requiring action
                </span>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Schedule Inspection
            </button>
          </div>
        </div>

        {/* Summary metrics */}
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          <InspectionMetric
            icon={CalendarDays}
            label="Scheduled"
            value={String(scheduledCount)}
            description="Upcoming inspections"
          />

          <InspectionMetric
            icon={Clock3}
            label="Pending review"
            value={String(pendingCount)}
            description="Reports awaiting verification"
          />

          <InspectionMetric
            icon={CheckCircle2}
            label="Completed"
            value={String(completedCount)}
            description="Verified inspections"
          />

          <InspectionMetric
            icon={AlertTriangle}
            label="Action required"
            value={String(actionCount)}
            description="Open inspection findings"
          />
        </div>
      </Card>

      {/* Control notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3.5">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

        <div>
          <p className="text-xs font-semibold text-blue-900">
            Inspection-controlled monitoring
          </p>

          <p className="mt-1 text-xs leading-5 text-blue-800/75">
            Inspection findings can affect milestone verification, material
            acceptance, risk status and payment recommendations. Inspection
            records and decisions are retained in the project audit trail.
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">
                Inspection queue
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Review scheduled, active and completed inspections.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <FilterButton label="All" active />
              <FilterButton label="Scheduled" />
              <FilterButton label="Pending Review" />
              <FilterButton label="Completed" />
              <FilterButton label="Action Required" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Inspection list */}
      <div className="space-y-3">
        {inspections.map((inspection) => (
          <InspectionRow
            key={inspection.id}
            inspection={inspection}
          />
        ))}
      </div>

      {/* Inspection workflow */}
      <Card>
        <CardHeader
          title="Inspection workflow"
          subtitle="Standard monitoring and verification sequence"
        />

        <CardBody>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <WorkflowStep
              number="01"
              title="Schedule"
              description="Create an inspection against a project, milestone or delivery."
            />

            <WorkflowStep
              number="02"
              title="Inspect"
              description="Inspector reviews site conditions, workmanship or materials."
            />

            <WorkflowStep
              number="03"
              title="Evidence"
              description="Photos, videos, documents and inspection notes are attached."
            />

            <WorkflowStep
              number="04"
              title="Findings"
              description="Issues are recorded and corrective actions assigned where required."
            />

            <WorkflowStep
              number="05"
              title="Verify"
              description="Report is reviewed and linked to the relevant project record."
            />
          </div>
        </CardBody>
      </Card>

      {/* Inspection principles */}
      <Card>
        <CardHeader
          title="Inspection controls"
          subtitle="Governance rules supporting reliable project monitoring"
        />

        <CardBody>
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
            />

            <ControlCard
              icon={ShieldCheck}
              title="Audit trail"
              description="Inspection decisions and status changes are permanently recorded."
            />
          </div>
        </CardBody>
      </Card>

      {/* Footer action */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">
                Need to schedule another inspection?
              </p>

              <p className="mt-1 text-xs leading-5 text-ink/45">
                Create a project-linked inspection and assign the appropriate
                Project Manager or professional expert.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 transition-colors hover:bg-paper-2"
            >
              <Plus className="h-4 w-4" />
              Create Inspection
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
  return (
    <Card className="overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
          {/* Main */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                {inspection.id}
              </span>

              <InspectionStatusBadge status={inspection.status} />

              <PriorityBadge priority={inspection.priority} />

              <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[10px] font-semibold text-ink/45">
                {inspection.type}
              </span>
            </div>

            <div className="mt-3">
              <h2 className="text-sm font-semibold text-ink">
                {inspection.title}
              </h2>

              <p className="mt-1 text-xs text-ink/45">
                {inspection.projectName}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/45">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {inspection.location}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {inspection.scheduledDate}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5" />
                {inspection.scheduledTime}
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-xs leading-5 text-ink/50">
              {inspection.summary}
            </p>
          </div>

          {/* Details */}
          <div className="grid gap-3 sm:grid-cols-2 xl:w-[360px]">
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
              value={`${inspection.evidenceCount} items`}
            />

            <CompactInfo
              label="Findings"
              value={`${inspection.findings} ${
                inspection.findings === 1 ? 'finding' : 'findings'
              }`}
            />
          </div>

          {/* Action */}
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line text-ink/40 transition-colors hover:bg-paper-2 hover:text-ink"
            aria-label={`Open ${inspection.title}`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Bottom metadata */}
      <div className="flex flex-col gap-3 border-t border-line bg-paper-2 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {inspection.milestone && (
            <span className="text-[10px] text-ink/40">
              Milestone:{' '}
              <span className="font-semibold text-ink/55">
                {inspection.milestone}
              </span>
            </span>
          )}

          {inspection.professional && (
            <span className="text-[10px] text-ink/40">
              Professional:{' '}
              <span className="font-semibold text-ink/55">
                {inspection.professional}
              </span>
            </span>
          )}
        </div>

        <span className="text-[10px] text-ink/40">
          Report:{' '}
          <span className="font-semibold text-ink/55">
            {inspection.reportStatus}
          </span>
        </span>
      </div>
    </Card>
  )
}

function InspectionStatusBadge({
  status,
}: {
  status: InspectionStatus
}) {
  const styles: Record<InspectionStatus, string> = {
    Scheduled: 'bg-blue-500/10 text-blue-700',
    'In Progress': 'bg-amber-500/10 text-amber-700',
    'Pending Review': 'bg-amber-500/10 text-amber-700',
    Completed: 'bg-emerald-500/10 text-emerald-700',
    'Requires Action': 'bg-rose-500/10 text-rose-700',
    Cancelled: 'bg-ink/5 text-ink/45',
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
    Normal: 'bg-ink/5 text-ink/40',
    High: 'bg-amber-500/10 text-amber-700',
    Critical: 'bg-rose-500/10 text-rose-700',
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
      className={`rounded-xl px-3 py-2 text-[10px] font-semibold transition-colors ${
        active
          ? 'bg-ink text-white'
          : 'border border-line bg-white text-ink/45 hover:bg-paper-2'
      }`}
    >
      {label}
    </button>
  )
}

function CompactInfo({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-3">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-semibold text-ink">
        {value}
      </p>
    </div>
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
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 font-mono text-[9px] font-semibold text-ink/45">
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
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
        <Icon className="h-4 w-4 text-ink/50" />
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