import {
  AlertTriangle,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Image as ImageIcon,
  MapPin,
  Package,
  ShieldCheck,
  UserCheck,
  Users,
  Video,
  X,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type ReportStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected'

type EvidenceType = 'Photo' | 'Video' | 'Document'

interface DailyEvidence {
  id: string
  type: EvidenceType
  name: string
  uploadedAt: string
  uploadedBy: string
  status: 'Verified' | 'Pending' | 'Rejected'
}

interface MaterialUsage {
  name: string
  quantity: string
  unit: string
  status: 'Used' | 'Delivered' | 'Low Stock'
}

interface DailyReportData {
  id: string
  projectId: string
  projectName: string
  reportDate: string
  submittedAt: string
  status: ReportStatus
  location: string
  contractor: string
  projectManager: string
  milestone: string
  workCompleted: string[]
  workersOnSite: number
  workingHours: string
  materials: MaterialUsage[]
  equipment: string[]
  progress: number
  issues: string[]
  safetyNotes: string[]
  nextDayPlan: string[]
  evidence: DailyEvidence[]
  submittedBy: string
}

const report: DailyReportData = {
  id: 'DR-2026-0827',
  projectId: 'PRJ-2026-014',
  projectName: 'Ahmed Residence — Abuja',
  reportDate: '27 Aug 2026',
  submittedAt: '27 Aug 2026, 16:22',
  status: 'Under Review',
  location: 'Gwarinpa, Abuja, Nigeria',
  contractor: 'PrimeBuild Construction Ltd.',
  projectManager: 'Ibrahim Musa',
  milestone: 'Foundation Completion',
  workersOnSite: 18,
  workingHours: '8:00 AM – 5:30 PM',
  progress: 100,
  submittedBy: 'PrimeBuild Construction Ltd.',
  workCompleted: [
    'Completed remaining foundation excavation works.',
    'Installed reinforcement for the east and west foundation sections.',
    'Completed formwork inspection and corrections.',
    'Completed concrete pouring for the approved foundation scope.',
    'Carried out site cleanup and prepared the foundation area for next-stage works.',
  ],
  materials: [
    {
      name: 'Concrete',
      quantity: '18',
      unit: 'm³',
      status: 'Used',
    },
    {
      name: 'Reinforcement steel',
      quantity: '2.4',
      unit: 'tonnes',
      status: 'Used',
    },
    {
      name: 'Binding wire',
      quantity: '42',
      unit: 'kg',
      status: 'Used',
    },
    {
      name: 'Hardcore',
      quantity: '12',
      unit: 'm³',
      status: 'Used',
    },
    {
      name: 'DPM',
      quantity: '185',
      unit: 'm²',
      status: 'Used',
    },
  ],
  equipment: [
    'Concrete mixer',
    'Poker vibrator',
    'Plate compactor',
    'Generator',
    'Site water pump',
  ],
  issues: [
    'Final reinforcement inspection is still awaiting professional sign-off.',
  ],
  safetyNotes: [
    'All workers were required to use helmets and safety boots.',
    'Concrete work area was restricted during the pour.',
    'No major safety incident was reported during the shift.',
  ],
  nextDayPlan: [
    'Complete final foundation verification.',
    'Address any observations from professional inspection.',
    'Begin preparation for the next approved construction stage.',
  ],
  evidence: [
    {
      id: 'EV-DR-001',
      type: 'Photo',
      name: 'Foundation excavation — east wing',
      uploadedAt: '27 Aug 2026, 09:42',
      uploadedBy: 'PrimeBuild Construction Ltd.',
      status: 'Verified',
    },
    {
      id: 'EV-DR-002',
      type: 'Photo',
      name: 'Reinforcement installation',
      uploadedAt: '27 Aug 2026, 10:15',
      uploadedBy: 'PrimeBuild Construction Ltd.',
      status: 'Verified',
    },
    {
      id: 'EV-DR-003',
      type: 'Video',
      name: 'Foundation site walkthrough',
      uploadedAt: '27 Aug 2026, 10:28',
      uploadedBy: 'PrimeBuild Construction Ltd.',
      status: 'Verified',
    },
    {
      id: 'EV-DR-004',
      type: 'Photo',
      name: 'Concrete pour completion',
      uploadedAt: '27 Aug 2026, 16:12',
      uploadedBy: 'PrimeBuild Construction Ltd.',
      status: 'Pending',
    },
    {
      id: 'EV-DR-005',
      type: 'Document',
      name: 'Daily site inspection notes',
      uploadedAt: '27 Aug 2026, 16:18',
      uploadedBy: 'Ibrahim Musa',
      status: 'Verified',
    },
  ],
}

export function DailyReport() {
  const verifiedEvidence = report.evidence.filter(
    (item) => item.status === 'Verified',
  ).length

  const hasOpenIssue = report.issues.length > 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink/45">
                  {report.id}
                </span>

                <StatusBadge status={report.status} />
              </div>

              <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                Daily Site Report
              </h1>

              <p className="mt-1 text-sm text-ink/45">
                {report.projectName}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/45">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {report.reportDate}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {report.location}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" />
                  {report.workingHours}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 transition-colors hover:bg-paper-2"
              >
                <FileText className="h-4 w-4" />
                Export Report
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <CheckCircle2 className="h-4 w-4" />
                Review Report
              </button>
            </div>
          </div>
        </div>

        {/* Summary metrics */}
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          <ReportMetric
            icon={CheckCircle2}
            label="Daily progress"
            value={`${report.progress}%`}
            description="Reported milestone progress"
          />

          <ReportMetric
            icon={Users}
            label="Workers on site"
            value={`${report.workersOnSite}`}
            description="Recorded for this shift"
          />

          <ReportMetric
            icon={Package}
            label="Materials"
            value={`${report.materials.length}`}
            description="Material categories recorded"
          />

          <ReportMetric
            icon={ShieldCheck}
            label="Evidence"
            value={`${verifiedEvidence}/${report.evidence.length}`}
            description="Evidence currently verified"
          />
        </div>
      </Card>

      {/* Review notice */}
      <div
        className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 ${
          hasOpenIssue
            ? 'border-amber-200 bg-amber-50'
            : 'border-emerald-200 bg-emerald-50'
        }`}
      >
        {hasOpenIssue ? (
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
        ) : (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
        )}

        <div>
          <p
            className={`text-xs font-semibold ${
              hasOpenIssue ? 'text-amber-900' : 'text-emerald-900'
            }`}
          >
            {hasOpenIssue
              ? 'Report requires attention'
              : 'No active report issues'}
          </p>

          <p
            className={`mt-1 text-xs leading-5 ${
              hasOpenIssue
                ? 'text-amber-800/75'
                : 'text-emerald-800/75'
            }`}
          >
            {hasOpenIssue
              ? 'One or more site issues have been recorded and should be reviewed before the report is approved.'
              : 'The submitted daily report contains no unresolved issues.'}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {/* Report overview */}
          <Card>
            <CardHeader
              title="Report overview"
              subtitle="Daily construction activity and project context"
            />

            <CardBody>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoBlock
                  label="Project ID"
                  value={report.projectId}
                />

                <InfoBlock
                  label="Milestone"
                  value={report.milestone}
                />

                <InfoBlock
                  label="Contractor"
                  value={report.contractor}
                />

                <InfoBlock
                  label="Project Manager"
                  value={report.projectManager}
                />

                <InfoBlock
                  label="Report date"
                  value={report.reportDate}
                />

                <InfoBlock
                  label="Submitted by"
                  value={report.submittedBy}
                />
              </div>
            </CardBody>
          </Card>

          {/* Work completed */}
          <Card>
            <CardHeader
              title="Work completed"
              subtitle="Activities recorded during the reporting period"
            />

            <CardBody>
              <div className="space-y-3">
                {report.workCompleted.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-line bg-white p-3.5"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                      <Check className="h-3.5 w-3.5 text-emerald-700" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/30">
                        Activity {String(index + 1).padStart(2, '0')}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-ink/60">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Materials */}
          <Card>
            <CardHeader
              title="Materials used"
              subtitle="Materials consumed or recorded during the day"
            />

            <CardBody>
              <div className="overflow-hidden rounded-xl border border-line">
                <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-line bg-paper-2 px-4 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  <span>Material</span>
                  <span>Quantity</span>
                  <span>Status</span>
                </div>

                <div className="divide-y divide-line">
                  {report.materials.map((material) => (
                    <div
                      key={material.name}
                      className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-3.5"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <Package className="h-4 w-4 shrink-0 text-ink/35" />

                        <span className="truncate text-xs font-semibold text-ink">
                          {material.name}
                        </span>
                      </div>

                      <span className="text-xs font-medium text-ink/55">
                        {material.quantity} {material.unit}
                      </span>

                      <MaterialStatus status={material.status} />
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Evidence */}
          <Card>
            <CardHeader
              title="Daily evidence"
              subtitle="Photos, videos and documents supporting the report"
            />

            <CardBody>
              <div className="space-y-3">
                {report.evidence.map((item) => (
                  <EvidenceRow
                    key={item.id}
                    evidence={item}
                  />
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Safety */}
          <Card>
            <CardHeader
              title="Safety observations"
              subtitle="Site safety conditions recorded for the day"
            />

            <CardBody>
              <div className="space-y-3">
                {report.safetyNotes.map((note) => (
                  <div
                    key={note}
                    className="flex items-start gap-3 rounded-xl bg-paper-2 p-3.5"
                  >
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ink/45" />

                    <p className="text-xs leading-5 text-ink/55">
                      {note}
                    </p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          {/* Workforce */}
          <Card>
            <CardHeader
              title="Site workforce"
              subtitle="Attendance and working period"
            />

            <CardBody>
              <div className="rounded-xl bg-paper-2 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                    <Users className="h-4 w-4 text-ink/55" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Workers on site
                    </p>

                    <p className="mt-0.5 font-display text-2xl font-semibold text-ink">
                      {report.workersOnSite}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <DetailRow
                  label="Working hours"
                  value={report.workingHours}
                />

                <DetailRow
                  label="Project phase"
                  value={report.milestone}
                />

                <DetailRow
                  label="Daily progress"
                  value={`${report.progress}%`}
                />
              </div>
            </CardBody>
          </Card>

          {/* Equipment */}
          <Card>
            <CardHeader
              title="Equipment on site"
              subtitle="Equipment reported during the shift"
            />

            <CardBody>
              <div className="flex flex-wrap gap-2">
                {report.equipment.map((equipment) => (
                  <span
                    key={equipment}
                    className="rounded-full bg-paper-2 px-3 py-1.5 text-xs font-medium text-ink/55"
                  >
                    {equipment}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Issues */}
          <Card>
            <CardHeader
              title="Issues and risks"
              subtitle="Items requiring monitoring or action"
            />

            <CardBody>
              {report.issues.length === 0 ? (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3.5 py-3 text-xs font-medium text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  No issues reported.
                </div>
              ) : (
                <div className="space-y-3">
                  {report.issues.map((issue) => (
                    <div
                      key={issue}
                      className="flex items-start gap-2.5 rounded-xl bg-amber-500/10 px-3.5 py-3"
                    >
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

                      <p className="text-xs leading-5 text-amber-800">
                        {issue}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>

          {/* Next day */}
          <Card>
            <CardHeader
              title="Next-day plan"
              subtitle="Planned activities for the next reporting period"
            />

            <CardBody>
              <div className="space-y-3">
                {report.nextDayPlan.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink/5 font-mono text-[9px] font-semibold text-ink/45">
                      {index + 1}
                    </div>

                    <p className="pt-0.5 text-xs leading-5 text-ink/55">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Verification */}
          <Card>
            <CardHeader
              title="Report verification"
              subtitle="Daily report review status"
            />

            <CardBody>
              <div className="space-y-4">
                <VerificationRow
                  label="Submitted by contractor"
                  status="Verified"
                />

                <VerificationRow
                  label="Evidence review"
                  status={
                    verifiedEvidence === report.evidence.length
                      ? 'Verified'
                      : 'Pending'
                  }
                />

                <VerificationRow
                  label="Project Manager review"
                  status="Pending"
                />

                <VerificationRow
                  label="Client visibility"
                  status="Verified"
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Decision */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">
                Daily report decision
              </p>

              <p className="mt-1 text-xs leading-5 text-ink/45">
                Review the submitted activities and evidence before recording
                the report decision. All actions are added to the project
                audit trail.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100"
              >
                <X className="h-4 w-4" />
                Reject Report
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100"
              >
                <AlertTriangle className="h-4 w-4" />
                Request Clarification
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Check className="h-4 w-4" />
                Approve Report
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Audit trail */}
      <Card>
        <CardHeader
          title="Audit trail"
          subtitle="Report submission and verification history"
        />

        <CardBody>
          <div className="space-y-4">
            <AuditItem
              title="Daily report submitted"
              description="Contractor submitted the daily construction report with site evidence."
              actor={report.contractor}
              date={report.submittedAt}
            />

            <AuditItem
              title="Evidence uploaded"
              description="Site photographs, walkthrough video and inspection notes were attached to the report."
              actor={report.contractor}
              date="27 Aug 2026, 16:18"
            />

            <AuditItem
              title="Site inspection recorded"
              description="Project Manager recorded the day's site inspection and progress observation."
              actor={report.projectManager}
              date="27 Aug 2026, 15:05"
            />

            <AuditItem
              title="Daily report period started"
              description="Daily monitoring period opened for the foundation completion phase."
              actor="Build OS"
              date="27 Aug 2026, 08:00"
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
  status: ReportStatus
}) {
  const styles: Record<ReportStatus, string> = {
    Draft: 'bg-ink/5 text-ink/50',
    Submitted: 'bg-blue-500/10 text-blue-700',
    'Under Review': 'bg-amber-500/10 text-amber-700',
    Approved: 'bg-emerald-500/10 text-emerald-700',
    Rejected: 'bg-rose-500/10 text-rose-700',
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  )
}

function ReportMetric({
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

function DetailRow({
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

function MaterialStatus({
  status,
}: {
  status: MaterialUsage['status']
}) {
  const styles = {
    Used: 'bg-emerald-500/10 text-emerald-700',
    Delivered: 'bg-blue-500/10 text-blue-700',
    'Low Stock': 'bg-amber-500/10 text-amber-700',
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  )
}

function EvidenceRow({
  evidence,
}: {
  evidence: DailyEvidence
}) {
  const Icon =
    evidence.type === 'Photo'
      ? ImageIcon
      : evidence.type === 'Video'
        ? Video
        : FileText

  const statusClass =
    evidence.status === 'Verified'
      ? 'bg-emerald-500/10 text-emerald-700'
      : evidence.status === 'Rejected'
        ? 'bg-rose-500/10 text-rose-700'
        : 'bg-amber-500/10 text-amber-700'

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
            {evidence.type} · {evidence.uploadedBy} ·{' '}
            {evidence.uploadedAt}
          </p>
        </div>
      </div>

      <span
        className={`shrink-0 self-start rounded-full px-2.5 py-1 text-[10px] font-semibold sm:self-auto ${statusClass}`}
      >
        {evidence.status}
      </span>
    </div>
  )
}

function VerificationRow({
  label,
  status,
}: {
  label: string
  status: 'Verified' | 'Pending' | 'Rejected'
}) {
  const verified = status === 'Verified'
  const rejected = status === 'Rejected'

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
            verified
              ? 'bg-emerald-500/10 text-emerald-700'
              : rejected
                ? 'bg-rose-500/10 text-rose-700'
                : 'bg-amber-500/10 text-amber-700'
          }`}
        >
          {verified ? (
            <Check className="h-3.5 w-3.5" />
          ) : rejected ? (
            <X className="h-3.5 w-3.5" />
          ) : (
            <Clock3 className="h-3.5 w-3.5" />
          )}
        </div>

        <span className="truncate text-xs text-ink/55">
          {label}
        </span>
      </div>

      <span
        className={`shrink-0 text-[10px] font-semibold ${
          verified
            ? 'text-emerald-700'
            : rejected
              ? 'text-rose-700'
              : 'text-amber-700'
        }`}
      >
        {status}
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

      <div className="min-w-0 flex-1 border-b border-line pb-4">
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