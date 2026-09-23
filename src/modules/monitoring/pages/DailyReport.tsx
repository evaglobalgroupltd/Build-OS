
import type { ComponentType } from 'react'
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

type ReportStatus =
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Approved'
  | 'Rejected'

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

  const evidencePercentage =
    report.evidence.length > 0
      ? Math.round((verifiedEvidence / report.evidence.length) * 100)
      : 0

  return (
    <div className="space-y-7 pb-8">
      {/* =========================================================
          HERO / REPORT HEADER
      ========================================================= */}

      <Card className="overflow-hidden">
        <div className="relative overflow-hidden border-b border-ink/[0.07] bg-[#F8F9F7] px-5 py-6 sm:px-7 sm:py-7 lg:px-8">
          {/* subtle architectural background */}
          <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-[#12613E]/[0.035] blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-[#B85C12]/[0.025] blur-3xl" />

          <div className="relative flex flex-col gap-7 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-ink/[0.07] bg-white px-3 py-1.5 font-mono text-[9px] font-semibold tracking-[0.08em] text-ink/40 shadow-[0_3px_12px_rgba(20,40,30,0.03)]">
                  {report.id}
                </span>

                <StatusBadge status={report.status} />
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/35">
                Construction monitoring
              </p>

              <h1 className="mt-1.5 max-w-2xl font-display text-[29px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
                Daily Site Report
              </h1>

              <p className="mt-2 text-[13px] text-ink/50">
                {report.projectName}
              </p>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5 text-[11px] font-medium text-ink/45">
                <MetaItem
                  icon={CalendarDays}
                  value={report.reportDate}
                />

                <MetaItem
                  icon={MapPin}
                  value={report.location}
                />

                <MetaItem
                  icon={Clock3}
                  value={report.workingHours}
                />
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                className="
                  inline-flex items-center gap-2 rounded-full
                  border border-ink/[0.09] bg-white px-4 py-2.5
                  text-[11px] font-semibold text-ink/65
                  shadow-[0_4px_14px_rgba(20,40,30,0.035)]
                  transition duration-200
                  hover:-translate-y-0.5 hover:border-ink/15
                  hover:shadow-[0_8px_20px_rgba(20,40,30,0.07)]
                "
              >
                <FileText className="h-3.5 w-3.5" />
                Export Report
              </button>

              <button
                type="button"
                className="
                  inline-flex items-center gap-2 rounded-full
                  bg-ink px-4.5 py-2.5
                  text-[11px] font-semibold text-white
                  shadow-[0_8px_20px_rgba(20,30,25,0.12)]
                  transition duration-200
                  hover:-translate-y-0.5 hover:opacity-95
                "
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Review Report
              </button>
            </div>
          </div>
        </div>

        {/* Summary metrics */}
        <div className="grid divide-y divide-ink/[0.07] sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          <ReportMetric
            icon={CheckCircle2}
            label="Daily progress"
            value={`${report.progress}%`}
            description="Reported milestone progress"
            tone="green"
          />

          <ReportMetric
            icon={Users}
            label="Workers on site"
            value={String(report.workersOnSite)}
            description="Recorded for this shift"
            tone="ink"
          />

          <ReportMetric
            icon={Package}
            label="Materials"
            value={String(report.materials.length)}
            description="Material categories recorded"
            tone="bronze"
          />

          <ReportMetric
            icon={ShieldCheck}
            label="Evidence"
            value={`${verifiedEvidence}/${report.evidence.length}`}
            description={`${evidencePercentage}% currently verified`}
            tone="green"
          />
        </div>
      </Card>

      {/* =========================================================
          REVIEW NOTICE
      ========================================================= */}

      <div
        className={[
          'relative overflow-hidden rounded-[20px] border px-5 py-4',
          'shadow-[0_8px_25px_rgba(20,40,30,0.035)]',
          hasOpenIssue
            ? 'border-[#B85C12]/15 bg-[#FBF6F1]'
            : 'border-[#12613E]/15 bg-[#F3F8F5]',
        ].join(' ')}
      >
        <div className="flex items-start gap-3.5">
          <div
            className={[
              'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
              hasOpenIssue
                ? 'bg-[#B85C12]/10 text-[#B85C12]'
                : 'bg-[#12613E]/10 text-[#12613E]',
            ].join(' ')}
          >
            {hasOpenIssue ? (
              <AlertTriangle className="h-4 w-4" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
          </div>

          <div>
            <p
              className={[
                'text-[12px] font-bold',
                hasOpenIssue ? 'text-[#7A3F0C]' : 'text-[#12613E]',
              ].join(' ')}
            >
              {hasOpenIssue
                ? 'Report requires attention'
                : 'No active report issues'}
            </p>

            <p
              className={[
                'mt-1 max-w-3xl text-[11px] leading-5',
                hasOpenIssue ? 'text-[#7A3F0C]/70' : 'text-[#12613E]/70',
              ].join(' ')}
            >
              {hasOpenIssue
                ? 'One or more site issues have been recorded and should be reviewed before the report is approved.'
                : 'The submitted daily report contains no unresolved issues.'}
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          {/* Report overview */}
          <Card>
            <CardHeader
              title="Report overview"
              subtitle="Daily construction activity and project context"
            />

            <CardBody>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoBlock
                  label="Project ID"
                  value={report.projectId}
                />

                <InfoBlock
                  label="Milestone"
                  value={report.milestone}
                  accent
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
              <div className="space-y-2.5">
                {report.workCompleted.map((item, index) => (
                  <div
                    key={item}
                    className="
                      group flex items-start gap-3.5 rounded-[16px]
                      border border-ink/[0.06] bg-white p-4
                      transition duration-200
                      hover:border-ink/[0.10]
                      hover:shadow-[0_8px_22px_rgba(20,40,30,0.045)]
                    "
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E] transition group-hover:scale-105">
                      <Check className="h-3.5 w-3.5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                        Activity {String(index + 1).padStart(2, '0')}
                      </p>

                      <p className="mt-1.5 text-[12px] leading-5 text-ink/65">
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
              <div className="overflow-hidden rounded-[16px] border border-ink/[0.07]">
                <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-ink/[0.07] bg-[#F7F8F6] px-4 py-3 text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35">
                  <span>Material</span>
                  <span>Quantity</span>
                  <span>Status</span>
                </div>

                <div className="divide-y divide-ink/[0.06]">
                  {report.materials.map((material) => (
                    <div
                      key={material.name}
                      className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-3.5 transition hover:bg-[#FAFBFA]"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ink/[0.045]">
                          <Package className="h-3.5 w-3.5 text-ink/40" />
                        </div>

                        <span className="truncate text-[11px] font-semibold text-ink">
                          {material.name}
                        </span>
                      </div>

                      <span className="text-[11px] font-medium text-ink/55">
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
              <div className="space-y-2.5">
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
              <div className="space-y-2.5">
                {report.safetyNotes.map((note) => (
                  <div
                    key={note}
                    className="flex items-start gap-3 rounded-[15px] bg-[#F7F8F6] p-4"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-[0_2px_8px_rgba(20,40,30,0.04)]">
                      <ShieldCheck className="h-3.5 w-3.5 text-ink/45" />
                    </div>

                    <p className="pt-0.5 text-[11px] leading-5 text-ink/55">
                      {note}
                    </p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* =======================================================
            RIGHT RAIL
        ======================================================= */}

        <div className="space-y-5">
          {/* Workforce */}
          <Card>
            <CardHeader
              title="Site workforce"
              subtitle="Attendance and working period"
            />

            <CardBody>
              <div className="rounded-[18px] bg-[#F6F8F5] p-4.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#12613E] shadow-[0_4px_12px_rgba(20,40,30,0.05)]">
                    <Users className="h-4.5 w-4.5" />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35">
                      Workers on site
                    </p>

                    <p className="mt-0.5 font-display text-[27px] font-semibold tracking-[-0.03em] text-ink">
                      {report.workersOnSite}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3.5">
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
                  emphasis
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
                    className="
                      rounded-full border border-ink/[0.06]
                      bg-[#F7F8F6] px-3 py-1.5
                      text-[10px] font-semibold text-ink/55
                      transition hover:border-ink/[0.10]
                      hover:bg-white
                    "
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
                <div className="flex items-center gap-2.5 rounded-[15px] bg-[#EAF4EE] px-4 py-3.5 text-[11px] font-semibold text-[#12613E]">
                  <CheckCircle2 className="h-4 w-4" />
                  No issues reported.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {report.issues.map((issue) => (
                    <div
                      key={issue}
                      className="flex items-start gap-2.5 rounded-[15px] border border-[#B85C12]/10 bg-[#FBF6F1] px-4 py-3.5"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#B85C12]/10">
                        <AlertTriangle className="h-3.5 w-3.5 text-[#B85C12]" />
                      </div>

                      <p className="pt-0.5 text-[11px] leading-5 text-[#7A3F0C]/80">
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
              <div className="space-y-3.5">
                {report.nextDayPlan.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink/[0.05] font-mono text-[9px] font-bold text-ink/45">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <p className="pt-0.5 text-[11px] leading-5 text-ink/55">
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

      {/* =========================================================
          DECISION PANEL
      ========================================================= */}

      <Card className="overflow-hidden">
        <div className="border-b border-ink/[0.06] bg-[#F8F9F7] px-5 py-4 sm:px-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
            Governance
          </p>

          <h3 className="mt-1 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
            Daily report decision
          </h3>
        </div>

        <CardBody>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[12px] leading-5 text-ink/55">
                Review the submitted activities and evidence before recording
                the report decision. All actions are added to the project
                audit trail.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                className="
                  inline-flex items-center gap-2 rounded-full
                  border border-rose-200 bg-rose-50 px-4 py-2.5
                  text-[10px] font-bold text-rose-700
                  transition duration-200
                  hover:-translate-y-0.5 hover:bg-rose-100
                "
              >
                <X className="h-3.5 w-3.5" />
                Reject Report
              </button>

              <button
                type="button"
                className="
                  inline-flex items-center gap-2 rounded-full
                  border border-[#B85C12]/15 bg-[#FBF6F1]
                  px-4 py-2.5 text-[10px] font-bold text-[#B85C12]
                  transition duration-200
                  hover:-translate-y-0.5 hover:bg-[#F7EEE6]
                "
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                Request Clarification
              </button>

              <button
                type="button"
                className="
                  inline-flex items-center gap-2 rounded-full
                  bg-ink px-4 py-2.5
                  text-[10px] font-bold text-white
                  shadow-[0_7px_18px_rgba(20,30,25,0.12)]
                  transition duration-200
                  hover:-translate-y-0.5 hover:opacity-95
                "
              >
                <Check className="h-3.5 w-3.5" />
                Approve Report
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* =========================================================
          AUDIT TRAIL
      ========================================================= */}

      <Card>
        <CardHeader
          title="Audit trail"
          subtitle="Report submission and verification history"
        />

        <CardBody>
          <div className="space-y-0">
            <AuditItem
              title="Daily report submitted"
              description="Contractor submitted the daily construction report with site evidence."
              actor={report.contractor}
              date={report.submittedAt}
              first
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
              last
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

/* ===============================================================
   PRESENTATIONAL COMPONENTS
================================================================ */

function MetaItem({
  icon: Icon,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  value: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 text-ink/30" />
      {value}
    </span>
  )
}

function StatusBadge({
  status,
}: {
  status: ReportStatus
}) {
  const styles: Record<ReportStatus, string> = {
    Draft: 'border-ink/[0.07] bg-ink/[0.04] text-ink/50',
    Submitted: 'border-blue-500/10 bg-blue-500/[0.07] text-blue-700',
    'Under Review':
      'border-[#B85C12]/10 bg-[#B85C12]/[0.08] text-[#B85C12]',
    Approved:
      'border-[#12613E]/10 bg-[#12613E]/[0.08] text-[#12613E]',
    Rejected: 'border-rose-500/10 bg-rose-500/[0.07] text-rose-700',
  }

  return (
    <span
      className={[
        'rounded-full border px-3 py-1.5',
        'text-[9px] font-bold uppercase tracking-[0.08em]',
        styles[status],
      ].join(' ')}
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
  tone = 'ink',
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  tone?: 'green' | 'bronze' | 'ink'
}) {
  const toneClasses = {
    green: 'bg-[#EAF4EE] text-[#12613E]',
    bronze: 'bg-[#FBF0E8] text-[#B85C12]',
    ink: 'bg-ink/[0.05] text-ink/55',
  }

  return (
    <div className="px-5 py-5 sm:px-6">
      <div className="flex items-center gap-3">
        <div
          className={[
            'flex h-9 w-9 items-center justify-center rounded-xl',
            toneClasses[tone],
          ].join(' ')}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35">
            {label}
          </p>

          <p className="mt-0.5 font-display text-[21px] font-semibold tracking-[-0.025em] text-ink">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[10px] text-ink/40">
        {description}
      </p>
    </div>
  )
}

function InfoBlock({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="rounded-[15px] border border-ink/[0.06] bg-[#FAFBFA] p-4 transition hover:bg-white">
      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35">
        {label}
      </p>

      <p
        className={[
          'mt-1.5 text-[12px] font-semibold',
          accent ? 'text-[#12613E]' : 'text-ink',
        ].join(' ')}
      >
        {value}
      </p>
    </div>
  )
}

function DetailRow({
  label,
  value,
  emphasis = false,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-ink/[0.06] pb-3.5 last:border-0 last:pb-0">
      <span className="text-[11px] text-ink/45">
        {label}
      </span>

      <span
        className={[
          'text-[11px] font-semibold text-right',
          emphasis ? 'text-[#12613E]' : 'text-ink',
        ].join(' ')}
      >
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
    Used: 'border-[#12613E]/10 bg-[#12613E]/[0.07] text-[#12613E]',
    Delivered: 'border-blue-500/10 bg-blue-500/[0.07] text-blue-700',
    'Low Stock':
      'border-[#B85C12]/10 bg-[#B85C12]/[0.07] text-[#B85C12]',
  }

  return (
    <span
      className={[
        'rounded-full border px-2.5 py-1',
        'text-[9px] font-bold uppercase tracking-[0.06em]',
        styles[status],
      ].join(' ')}
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
      ? 'border-[#12613E]/10 bg-[#12613E]/[0.07] text-[#12613E]'
      : evidence.status === 'Rejected'
        ? 'border-rose-500/10 bg-rose-500/[0.07] text-rose-700'
        : 'border-[#B85C12]/10 bg-[#B85C12]/[0.07] text-[#B85C12]'

  return (
    <div
      className="
        group flex flex-col gap-3 rounded-[16px]
        border border-ink/[0.06] bg-white p-3.5
        transition duration-200
        hover:border-ink/[0.10]
        hover:shadow-[0_8px_22px_rgba(20,40,30,0.045)]
        sm:flex-row sm:items-center sm:justify-between
      "
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F6F4] text-ink/45 transition group-hover:bg-[#EAF4EE] group-hover:text-[#12613E]">
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold text-ink">
            {evidence.name}
          </p>

          <p className="mt-1 text-[9px] text-ink/40">
            {evidence.type} · {evidence.uploadedBy} · {evidence.uploadedAt}
          </p>
        </div>
      </div>

      <span
        className={[
          'shrink-0 self-start rounded-full border px-2.5 py-1',
          'text-[9px] font-bold uppercase tracking-[0.06em]',
          'sm:self-auto',
          statusClass,
        ].join(' ')}
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
          className={[
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
            verified
              ? 'bg-[#EAF4EE] text-[#12613E]'
              : rejected
                ? 'bg-rose-500/10 text-rose-700'
                : 'bg-[#FBF0E8] text-[#B85C12]',
          ].join(' ')}
        >
          {verified ? (
            <Check className="h-3.5 w-3.5" />
          ) : rejected ? (
            <X className="h-3.5 w-3.5" />
          ) : (
            <Clock3 className="h-3.5 w-3.5" />
          )}
        </div>

        <span className="truncate text-[11px] text-ink/55">
          {label}
        </span>
      </div>

      <span
        className={[
          'shrink-0 text-[9px] font-bold uppercase tracking-[0.06em]',
          verified
            ? 'text-[#12613E]'
            : rejected
              ? 'text-rose-700'
              : 'text-[#B85C12]',
        ].join(' ')}
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
  first = false,
  last = false,
}: {
  title: string
  description: string
  actor: string
  date: string
  first?: boolean
  last?: boolean
}) {
  return (
    <div className="relative flex gap-3.5">
      {!last && (
        <div className="absolute left-[15px] top-8 bottom-0 w-px bg-ink/[0.07]" />
      )}

      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white bg-[#F1F3F0] shadow-[0_2px_8px_rgba(20,40,30,0.04)]">
        <UserCheck className="h-3.5 w-3.5 text-ink/45" />
      </div>

      <div
        className={[
          'min-w-0 flex-1 pb-5',
          !last ? 'border-b border-ink/[0.06]' : '',
          first ? 'pt-0' : 'pt-0.5',
        ].join(' ')}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] font-semibold text-ink">
            {title}
          </p>

          <span className="text-[9px] font-medium text-ink/35">
            {date}
          </span>
        </div>

        <p className="mt-1 text-[10px] leading-5 text-ink/45">
          {description}
        </p>

        <p className="mt-1.5 text-[9px] font-semibold text-ink/35">
          By {actor}
        </p>
      </div>
    </div>
  )
}
