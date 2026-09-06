import {
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Cloud,
  FileText,
  MapPin,
  Plus,
  Users,
  AlertTriangle,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'

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
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
            <ClipboardList className="h-3.5 w-3.5" />
            Monitoring / Daily Reports
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            Daily Reports
          </h1>

          <p className="mt-1 max-w-xl text-sm text-ink/55">
            Record site activity, workforce, progress, weather conditions and
            issues from every active project.
          </p>
        </div>

        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-ink px-4 text-xs font-semibold text-white transition hover:bg-ink/90">
          <Plus className="h-4 w-4" />
          New Daily Report
        </button>
      </div>

      {/* Today's summary */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Reports Today"
          value="03"
          detail="All sites reporting"
          icon={FileText}
        />
        <MetricCard
          label="Workers On Site"
          value="73"
          detail="Across active projects"
          icon={Users}
        />
        <MetricCard
          label="Site Issues"
          value="03"
          detail="2 require attention"
          icon={AlertTriangle}
          warning
        />
        <MetricCard
          label="Avg. Progress"
          value="54%"
          detail="+4.2% this week"
          icon={CheckCircle2}
        />
      </div>

      {/* Report list */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-ink">
              Recent Site Reports
            </h2>
            <p className="mt-0.5 text-xs text-ink/45">
              Latest submissions from monitored projects
            </p>
          </div>

          <span className="rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/45">
            28 Aug 2026
          </span>
        </div>

        <div className="divide-y divide-ink/8">
          {reports.map((report) => (
            <button
              key={`${report.project}-${report.date}`}
              className="group flex w-full flex-col gap-4 px-5 py-5 text-left transition hover:bg-ink/[0.025] lg:flex-row lg:items-center"
            >
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                  <FileText className="h-4 w-4 text-ink/60" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-ink">
                      {report.project}
                    </h3>

                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-emerald-700">
                      {report.status}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/45">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {report.site}
                    </span>
                    <span>{report.date}</span>
                    <span>Submitted {report.submitted}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5 border-t border-ink/8 pt-3 lg:border-0 lg:pt-0">
                <MiniStat label="Progress" value={`${report.progress}%`} />
                <MiniStat label="Workers" value={report.workers} />
                <MiniStat
                  label="Issues"
                  value={report.issues}
                  danger={report.issues > 0}
                />
              </div>

              <ChevronRight className="hidden h-4 w-4 text-ink/25 transition group-hover:translate-x-0.5 group-hover:text-ink/60 lg:block" />
            </button>
          ))}
        </div>
      </Card>

      {/* Report capture */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
              <Camera className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink">
                Evidence Capture
              </h3>
              <p className="text-xs text-ink/45">
                Attach photos and site evidence to today's report.
              </p>
            </div>
          </div>

          <div className="flex min-h-[130px] items-center justify-center rounded-xl border border-dashed border-ink/15 bg-ink/[0.02]">
            <button className="flex flex-col items-center gap-2 text-xs text-ink/50 transition hover:text-ink">
              <Camera className="h-6 w-6" />
              <span className="font-medium">Add site photos</span>
              <span className="text-[10px] text-ink/35">
                JPG, PNG up to 10MB
              </span>
            </button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
              <Cloud className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink">
                Site Conditions
              </h3>
              <p className="text-xs text-ink/45">
                Conditions automatically attached to the report.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Condition label="Weather" value="Partly Cloudy" />
            <Condition label="Site Access" value="Normal" />
            <Condition label="Working Hours" value="07:30 — 17:00" />
            <Condition label="Restrictions" value="None reported" />
          </div>
        </Card>
      </div>

      <div className="text-right font-mono text-[9px] uppercase tracking-widest text-ink/25">
        BRD ref: Sec. 20.3 / 43
      </div>
    </div>
  )
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  warning = false,
}: {
  label: string
  value: string
  detail: string
  icon: typeof FileText
  warning?: boolean
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/40">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
            {value}
          </p>
        </div>

        <Icon
          className={`h-4 w-4 ${
            warning ? 'text-amber-600' : 'text-ink/30'
          }`}
        />
      </div>

      <p className="mt-2 text-[11px] text-ink/40">{detail}</p>
    </Card>
  )
}

function MiniStat({
  label,
  value,
  danger = false,
}: {
  label: string
  value: string | number
  danger?: boolean
}) {
  return (
    <div>
      <p className="font-mono text-[8px] uppercase tracking-wider text-ink/35">
        {label}
      </p>
      <p
        className={`mt-1 text-xs font-semibold ${
          danger ? 'text-amber-700' : 'text-ink'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function Condition({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ink/[0.035] p-3">
      <p className="font-mono text-[8px] uppercase tracking-wider text-ink/35">
        {label}
      </p>
      <p className="mt-1 text-xs font-medium text-ink">{value}</p>
    </div>
  )
}