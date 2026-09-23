import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  Download,
  FileBarChart,
  FileText,
  Search,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

const reports = [
  {
    title: 'August 2026 Monthly Monitoring Report',
    type: 'MONTHLY',
    project: 'All active projects',
    date: '28 Aug 2026',
    size: '2.4 MB',
  },
  {
    title: 'Gwarinpa Estate — Weekly Progress Report',
    type: 'WEEKLY',
    project: 'Gwarinpa Residential Estate',
    date: '27 Aug 2026',
    size: '1.1 MB',
  },
  {
    title: 'Site Inspection Summary',
    type: 'INSPECTION',
    project: 'Gwarinpa Residential Estate',
    date: '27 Aug 2026',
    size: '860 KB',
  },
  {
    title: 'Wuse Commercial Block — Progress Report',
    type: 'WEEKLY',
    project: 'Wuse Commercial Block',
    date: '25 Aug 2026',
    size: '1.3 MB',
  },
  {
    title: 'Daily Site Activity Report',
    type: 'DAILY',
    project: 'Maitama Villas',
    date: '24 Aug 2026',
    size: '720 KB',
  },
]

const reportTypes = [
  {
    icon: FileText,
    title: 'Daily',
    count: '128',
    description: 'Site activity reports',
    accent: 'green',
  },
  {
    icon: BarChart3,
    title: 'Weekly',
    count: '36',
    description: 'Progress summaries',
    accent: 'bronze',
  },
  {
    icon: CalendarDays,
    title: 'Monthly',
    count: '8',
    description: 'Performance reports',
    accent: 'green',
  },
  {
    icon: FileBarChart,
    title: 'Inspections',
    count: '24',
    description: 'Inspection reports',
    accent: 'neutral',
  },
]

const accentStyles = {
  green: {
    icon: 'bg-[#12613E]/[0.08] text-[#12613E]',
    count: 'text-[#12613E]',
    line: 'bg-[#12613E]',
  },
  bronze: {
    icon: 'bg-[#B85C12]/[0.08] text-[#B85C12]',
    count: 'text-[#B85C12]',
    line: 'bg-[#B85C12]',
  },
  neutral: {
    icon: 'bg-ink/[0.05] text-ink/60',
    count: 'text-ink',
    line: 'bg-ink/20',
  },
} as const

function ReportTypeCard({
  icon: Icon,
  title,
  count,
  description,
  accent,
}: (typeof reportTypes)[number]) {
  const styles = accentStyles[accent]

  return (
    <Card className="group overflow-hidden">
      <button
        type="button"
        className="relative w-full p-5 text-left transition duration-300 hover:bg-ink/[0.015] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-[14px] ${styles.icon}`}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </div>

          <ChevronRight
            className="mt-1 h-4 w-4 text-ink/20 transition duration-300 group-hover:translate-x-0.5 group-hover:text-ink/50"
            strokeWidth={1.8}
          />
        </div>

        <div className="mt-6">
          <p className="text-[13px] font-semibold tracking-[-0.01em] text-ink">
            {title} reports
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">
            <p
              className={`font-display text-[30px] font-semibold leading-none tracking-[-0.045em] ${styles.count}`}
            >
              {count}
            </p>

            <p className="max-w-[120px] text-right text-[11px] leading-4 text-ink/40">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-5 h-px overflow-hidden bg-ink/[0.06]">
          <div
            className={`h-px w-8 transition-all duration-500 group-hover:w-16 ${styles.line}`}
          />
        </div>
      </button>
    </Card>
  )
}

function ReportTypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    DAILY: 'bg-ink/[0.05] text-ink/55',
    WEEKLY: 'bg-[#B85C12]/[0.08] text-[#B85C12]',
    MONTHLY: 'bg-[#12613E]/[0.08] text-[#12613E]',
    INSPECTION: 'bg-[#12613E]/[0.06] text-[#12613E]',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] ${
        styles[type] ?? 'bg-ink/[0.05] text-ink/50'
      }`}
    >
      {type}
    </span>
  )
}

function ReportRow({
  title,
  type,
  project,
  date,
  size,
}: (typeof reports)[number]) {
  return (
    <div className="group relative flex flex-col gap-5 px-5 py-5 transition duration-300 hover:bg-ink/[0.015] sm:px-6 lg:flex-row lg:items-center lg:gap-6">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border border-ink/[0.06] bg-[#F8F9F7] text-ink/45 transition duration-300 group-hover:border-[#12613E]/15 group-hover:bg-[#12613E]/[0.05] group-hover:text-[#12613E]">
          <FileText className="h-[18px] w-[18px]" strokeWidth={1.7} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h4 className="min-w-0 truncate text-[13px] font-semibold tracking-[-0.01em] text-ink">
              {title}
            </h4>

            <ReportTypeBadge type={type} />
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-ink/40">
            <span className="truncate">{project}</span>

            <span className="hidden h-1 w-1 rounded-full bg-ink/20 sm:block" />

            <span>{date}</span>

            <span className="hidden h-1 w-1 rounded-full bg-ink/20 sm:block" />

            <span>{size}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-ink/[0.06] pt-4 lg:border-0 lg:pt-0">
        <div className="hidden text-right lg:block">
          <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-ink/30">
            Document
          </p>
          <p className="mt-1 text-[11px] text-ink/50">{size}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-[10px] border border-ink/[0.08] bg-white px-3 text-[11px] font-semibold text-ink/60 transition hover:border-[#12613E]/20 hover:bg-[#12613E]/[0.03] hover:text-[#12613E]"
            title="Download report"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={1.8} />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-[10px] text-ink/25 transition hover:bg-ink/[0.04] hover:text-ink"
            aria-label={`Open ${title}`}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  )
}

export function Reports() {
  return (
    <div className="space-y-7 pb-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.06] bg-white px-5 py-7 shadow-[0_18px_50px_rgba(20,40,30,0.07)] sm:px-7 sm:py-8 lg:px-9 lg:py-9">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#12613E]/[0.055] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-[#B85C12]/[0.035] blur-3xl" />

        <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#12613E]/10 bg-[#12613E]/[0.05] px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#12613E]">
                <FileBarChart className="h-3 w-3" />
                Monitoring / Reports
              </span>

              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                196 archived documents
              </span>
            </div>

            <h1 className="font-display text-[34px] font-semibold leading-[1.02] tracking-[-0.055em] text-ink sm:text-[42px] lg:text-[48px]">
              Reporting intelligence.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/50 sm:text-[15px]">
              A controlled library for project monitoring, inspections,
              progress reporting, and operational records across the portfolio.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-ink/35">
              <span>196 total reports</span>
              <span className="hidden h-1 w-1 rounded-full bg-ink/20 sm:block" />
              <span>4 report classes</span>
              <span className="hidden h-1 w-1 rounded-full bg-ink/20 sm:block" />
              <span>Portfolio monitoring</span>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[12px] bg-[#18271F] px-5 py-3 text-xs font-semibold text-white shadow-[0_12px_28px_rgba(24,39,31,0.16)] transition hover:-translate-y-0.5 hover:bg-[#12613E]"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={1.8} />
            Export library
          </button>
        </div>
      </section>

      {/* Report classes */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#12613E]">
              Report catalogue
            </p>

            <h2 className="mt-1.5 font-display text-xl font-semibold tracking-[-0.035em] text-ink">
              Reporting classes
            </h2>
          </div>

          <p className="hidden text-right text-[11px] text-ink/35 sm:block">
            Select a class to narrow the reporting library
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {reportTypes.map((item) => (
            <ReportTypeCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* Search / filters */}
      <Card className="overflow-hidden">
        <div className="border-b border-ink/[0.06] px-5 py-4.5 sm:px-6">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <p className="text-[12px] font-semibold text-ink">
                Report library
              </p>
              <p className="mt-0.5 text-[10px] text-ink/40">
                Search and refine the document register.
              </p>
            </div>

            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-ink/30">
              196 indexed
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:p-5">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search reports</span>

            <Search
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/25"
              strokeWidth={1.8}
            />

            <input
              type="text"
              placeholder="Search by report, project or document..."
              className="h-11 w-full rounded-[11px] border border-ink/[0.08] bg-[#F8F9F7] pl-10 pr-4 text-[12px] text-ink outline-none transition placeholder:text-ink/25 focus:border-[#12613E]/25 focus:bg-white focus:ring-4 focus:ring-[#12613E]/[0.04]"
            />
          </label>

          <label>
            <span className="sr-only">Report type</span>

            <select className="h-11 w-full rounded-[11px] border border-ink/[0.08] bg-white px-4 text-[11px] font-medium text-ink/60 outline-none transition focus:border-[#12613E]/25 focus:ring-4 focus:ring-[#12613E]/[0.04] sm:w-[165px]">
              <option>All report types</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Inspection</option>
            </select>
          </label>

          <label>
            <span className="sr-only">Project</span>

            <select className="h-11 w-full rounded-[11px] border border-ink/[0.08] bg-white px-4 text-[11px] font-medium text-ink/60 outline-none transition focus:border-[#12613E]/25 focus:ring-4 focus:ring-[#12613E]/[0.04] sm:w-[190px]">
              <option>All projects</option>
              <option>Gwarinpa Estate</option>
              <option>Wuse Commercial Block</option>
              <option>Maitama Villas</option>
            </select>
          </label>
        </div>
      </Card>

      {/* Reports list */}
      <Card className="overflow-hidden">
        <div className="flex flex-col justify-between gap-3 border-b border-ink/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:px-6">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                Recent reports
              </h2>

              <span className="rounded-full bg-ink/[0.05] px-2 py-1 font-mono text-[8px] font-semibold text-ink/40">
                05
              </span>
            </div>

            <p className="mt-1 text-[11px] text-ink/40">
              Latest generated monitoring documents across active projects.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
            <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
            Live register
          </div>
        </div>

        <div className="divide-y divide-ink/[0.06]">
          {reports.map((report) => (
            <ReportRow key={report.title} {...report} />
          ))}
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-ink/[0.06] px-5 py-4.5 sm:flex-row sm:items-center sm:px-6">
          <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-ink/30">
            Showing 5 of 196 reports
          </p>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#12613E] transition hover:text-[#0D4C31]"
          >
            View all reports
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.8} />
          </button>
        </div>
      </Card>

      {/* Governance footer */}
      <div className="flex flex-col justify-between gap-3 rounded-[18px] border border-ink/[0.06] bg-white/70 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="text-[11px] font-semibold text-ink/60">
            Reporting register
          </p>

          <p className="mt-0.5 text-[10px] text-ink/35">
            Documents are retained as part of the project monitoring and audit
            trail.
          </p>
        </div>

        <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-ink/25">
          Build OS · Monitoring
        </span>
      </div>
    </div>
  )
}