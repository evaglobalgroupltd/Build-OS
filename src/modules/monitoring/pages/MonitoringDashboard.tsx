import type { ComponentType } from 'react'

import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Cloud,
  FileText,
  MapPin,
  Plus,
  Users,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const reports = [
  {
    date: '28 AUG 2026',
    project: 'Gwarinpa Residence',
    site: 'Gwarinpa, Abuja',
    submitted: '08:42 AM',
    progress: 68,
    workers: 24,
    issues: 2,
    status: 'Submitted',
  },
  {
    date: '27 AUG 2026',
    project: 'Maitama Commercial Hub',
    site: 'Maitama, Abuja',
    submitted: '05:18 PM',
    progress: 54,
    workers: 31,
    issues: 1,
    status: 'Submitted',
  },
  {
    date: '27 AUG 2026',
    project: 'Wuse II Apartments',
    site: 'Wuse II, Abuja',
    submitted: '04:51 PM',
    progress: 41,
    workers: 18,
    issues: 0,
    status: 'Submitted',
  },
]

export function DailyReport() {
  const totalWorkers = reports.reduce(
    (total, report) => total + report.workers,
    0,
  )

  const totalIssues = reports.reduce(
    (total, report) => total + report.issues,
    0,
  )

  const averageProgress = Math.round(
    reports.reduce((total, report) => total + report.progress, 0) /
      reports.length,
  )

  return (
    <div className="space-y-6 pb-8">
      {/* Hero */}
      <Card className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#12613E]/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-90px] left-1/3 h-56 w-56 rounded-full bg-[#B85C12]/[0.05] blur-3xl" />

        <div className="relative px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#12613E]/[0.08] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#12613E]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
                  Site monitoring
                </span>

                <span className="rounded-full border border-ink/[0.07] bg-white px-3 py-1.5 text-[10px] font-medium text-ink/45">
                  28 Aug 2026
                </span>
              </div>

              <h1 className="mt-5 font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-[34px]">
                Daily site reports
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
                Capture daily site activity, workforce, progress, conditions
                and issues across active projects in one auditable monitoring
                workspace.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5">
                <HeroMeta
                  icon={FileText}
                  label={`${reports.length} reports submitted`}
                />

                <HeroMeta
                  icon={Users}
                  label={`${totalWorkers} workers on site`}
                />

                <HeroMeta
                  icon={AlertTriangle}
                  label={`${totalIssues} open issues`}
                  emphasis={totalIssues > 0}
                />

                <HeroMeta
                  icon={CheckCircle2}
                  label={`${averageProgress}% average progress`}
                />
              </div>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[13px] bg-ink px-4.5 py-3 text-xs font-semibold text-white shadow-[0_12px_28px_rgba(20,40,30,0.16)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(20,40,30,0.2)]"
            >
              <Plus className="h-4 w-4" />
              New daily report
            </button>
          </div>
        </div>
      </Card>

      {/* Summary */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Reports today"
          value="03"
          detail="All monitored sites reporting"
          icon={FileText}
          tone="green"
        />

        <MetricCard
          label="Workers on site"
          value={String(totalWorkers)}
          detail="Across active projects"
          icon={Users}
          tone="neutral"
        />

        <MetricCard
          label="Site issues"
          value={String(totalIssues).padStart(2, '0')}
          detail="2 require attention"
          icon={AlertTriangle}
          tone="bronze"
          warning
        />

        <MetricCard
          label="Average progress"
          value={`${averageProgress}%`}
          detail="+4.2% this week"
          icon={CheckCircle2}
          tone="green"
        />
      </div>

      {/* Monitoring notice */}
      <div className="relative overflow-hidden rounded-[18px] border border-[#12613E]/[0.10] bg-[#12613E]/[0.045] px-5 py-4 sm:px-6">
        <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-[#12613E]/[0.06] blur-2xl" />

        <div className="relative flex items-start gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-white text-[#12613E] shadow-sm">
            <ClipboardList className="h-4 w-4" />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#12613E]">
              Daily reporting controls
            </p>

            <p className="mt-1 max-w-4xl text-xs leading-5 text-ink/50">
              Daily reports provide the operational record for site activity,
              workforce, progress, conditions and issues. Submitted records can
              be linked to evidence, milestones and the project audit trail.
            </p>
          </div>
        </div>
      </div>

      {/* Recent reports */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Recent site reports"
          subtitle="Latest submissions from monitored construction projects."
          action={
            <span className="rounded-full bg-ink/[0.045] px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/40">
              {reports.length} records
            </span>
          }
        />

        <div className="divide-y divide-ink/[0.06]">
          {reports.map((report) => (
            <ReportRow
              key={`${report.project}-${report.date}`}
              report={report}
            />
          ))}
        </div>
      </Card>

      {/* Capture + conditions */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardBody className="p-5 sm:p-6">
            <SectionIntro
              icon={Camera}
              title="Evidence capture"
              description="Attach photographs and supporting site evidence to today's report."
              tone="green"
            />

            <div className="group relative mt-5 flex min-h-[150px] items-center justify-center overflow-hidden rounded-[16px] border border-dashed border-[#12613E]/[0.16] bg-[#12613E]/[0.025] transition-all hover:border-[#12613E]/[0.25] hover:bg-[#12613E]/[0.04]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(18,97,62,0.05),_transparent_65%)]" />

              <button
                type="button"
                className="relative flex flex-col items-center gap-2.5 text-xs text-ink/45 transition-colors hover:text-[#12613E]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-white text-[#12613E] shadow-[0_8px_24px_rgba(20,40,30,0.07)]">
                  <Camera className="h-5 w-5" />
                </span>

                <span className="font-semibold">
                  Add site photos
                </span>

                <span className="text-[10px] text-ink/30">
                  JPG or PNG · up to 10MB
                </span>
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between text-[10px] text-ink/35">
              <span>Evidence becomes part of the report record.</span>
              <span className="font-medium text-[#12613E]">
                Evidence ready
              </span>
            </div>
          </CardBody>
        </Card>

        <Card className="overflow-hidden">
          <CardBody className="p-5 sm:p-6">
            <SectionIntro
              icon={Cloud}
              title="Site conditions"
              description="Current conditions captured alongside the operational report."
              tone="bronze"
            />

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Condition
                label="Weather"
                value="Partly Cloudy"
              />

              <Condition
                label="Site Access"
                value="Normal"
              />

              <Condition
                label="Working Hours"
                value="07:30 — 17:00"
              />

              <Condition
                label="Restrictions"
                value="None reported"
              />
            </div>

            <div className="mt-4 flex items-center gap-2 text-[10px] text-ink/35">
              <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
              Conditions recorded with today's report.
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Footer metadata */}
      <div className="flex flex-col gap-2 border-t border-ink/[0.05] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[10px] text-ink/30">
          Daily construction monitoring · operational record
        </span>

        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/25">
          BRD ref: Sec. 20.3 / 43
        </span>
      </div>
    </div>
  )
}

function ReportRow({
  report,
}: {
  report: (typeof reports)[number]
}) {
  const progressTone =
    report.progress >= 60
      ? 'bg-[#12613E]'
      : report.progress >= 45
        ? 'bg-[#B85C12]'
        : 'bg-ink/30'

  return (
    <button
      type="button"
      className="group flex w-full flex-col gap-5 px-5 py-5 text-left transition-all duration-300 hover:bg-[#FAFBFA] sm:px-6 lg:flex-row lg:items-center lg:gap-6"
    >
      {/* Identity */}
      <div className="flex min-w-0 flex-1 items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#12613E]/[0.07] text-[#12613E] transition-all group-hover:bg-[#12613E]/[0.10]">
          <FileText className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold tracking-[-0.01em] text-ink">
              {report.project}
            </h3>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/[0.08] px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wide text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {report.status}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-ink/40">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-ink/30" />
              {report.site}
            </span>

            <span>{report.date}</span>

            <span>
              Submitted {report.submitted}
            </span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full lg:w-[190px]">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/30">
            Progress
          </p>

          <span className="text-xs font-semibold text-ink">
            {report.progress}%
          </span>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
          <div
            className={`h-full rounded-full ${progressTone}`}
            style={{ width: `${report.progress}%` }}
          />
        </div>
      </div>

      {/* Operational stats */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:w-[220px]">
        <MiniStat
          label="Workers"
          value={report.workers}
        />

        <MiniStat
          label="Issues"
          value={report.issues}
          danger={report.issues > 0}
        />

        <MiniStat
          label="Evidence"
          value="Ready"
          success
        />
      </div>

      {/* Open */}
      <div className="flex items-center justify-between border-t border-ink/[0.06] pt-3 lg:border-0 lg:pt-0">
        <span className="text-[10px] font-medium text-ink/35 lg:hidden">
          Open report
        </span>

        <span className="flex h-9 w-9 items-center justify-center rounded-[11px] border border-ink/[0.07] text-ink/30 transition-all group-hover:border-[#12613E]/[0.15] group-hover:bg-[#12613E]/[0.04] group-hover:text-[#12613E]">
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
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

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = 'neutral',
  warning = false,
}: {
  label: string
  value: string
  detail: string
  icon: ComponentType<{ className?: string }>
  tone?: 'green' | 'bronze' | 'neutral'
  warning?: boolean
}) {
  const styles = {
    green: {
      icon: 'bg-[#12613E]/[0.08] text-[#12613E]',
      value: 'text-[#12613E]',
    },
    bronze: {
      icon: 'bg-[#B85C12]/[0.09] text-[#A44F0B]',
      value: 'text-[#A44F0B]',
    },
    neutral: {
      icon: 'bg-ink/[0.05] text-ink/50',
      value: 'text-ink',
    },
  }

  return (
    <Card className="group p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(20,40,30,0.07)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
            {label}
          </p>

          <p
            className={`mt-2 font-display text-2xl font-semibold tracking-[-0.025em] ${
              warning ? 'text-[#A44F0B]' : styles[tone].value
            }`}
          >
            {value}
          </p>
        </div>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-[11px] ${styles[tone].icon}`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-5 text-ink/40">
        {detail}
      </p>
    </Card>
  )
}

function MiniStat({
  label,
  value,
  danger = false,
  success = false,
}: {
  label: string
  value: string | number
  danger?: boolean
  success?: boolean
}) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.10em] text-ink/30">
        {label}
      </p>

      <p
        className={`mt-1 text-xs font-semibold ${
          danger
            ? 'text-amber-700'
            : success
              ? 'text-[#12613E]'
              : 'text-ink'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function SectionIntro({
  icon: Icon,
  title,
  description,
  tone,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  tone: 'green' | 'bronze'
}) {
  const styles = {
    green: {
      icon: 'bg-[#12613E]/[0.08] text-[#12613E]',
    },
    bronze: {
      icon: 'bg-[#B85C12]/[0.09] text-[#A44F0B]',
    },
  }

  return (
    <div className="flex items-center gap-3.5">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] ${styles[tone].icon}`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <h3 className="text-sm font-semibold tracking-[-0.01em] text-ink">
          {title}
        </h3>

        <p className="mt-0.5 text-xs leading-5 text-ink/40">
          {description}
        </p>
      </div>
    </div>
  )
}

function Condition({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-[13px] border border-ink/[0.05] bg-[#FAFBFA] p-3.5 transition-colors hover:bg-[#F6F8F6]">
      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.10em] text-ink/30">
        {label}
      </p>

      <p className="mt-1.5 text-xs font-semibold text-ink">
        {value}
      </p>
    </div>
  )
}