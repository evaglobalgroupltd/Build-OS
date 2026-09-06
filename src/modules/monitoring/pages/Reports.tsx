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

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
            <FileBarChart className="h-3.5 w-3.5" />
            Monitoring / Reports
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            Reports
          </h1>

          <p className="mt-1 text-sm text-ink/55">
            Central library for project monitoring and performance reports.
          </p>
        </div>
      </div>

      {/* Report type cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            icon: FileText,
            title: 'Daily',
            count: '128',
            description: 'Site activity reports',
          },
          {
            icon: BarChart3,
            title: 'Weekly',
            count: '36',
            description: 'Progress summaries',
          },
          {
            icon: CalendarDays,
            title: 'Monthly',
            count: '8',
            description: 'Performance reports',
          },
          {
            icon: FileBarChart,
            title: 'Inspections',
            count: '24',
            description: 'Inspection reports',
          },
        ].map((item) => {
          const Icon = item.icon

          return (
            <Card key={item.title}>
              <div className="group cursor-pointer p-5 transition hover:bg-ink/[0.02]">
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <ChevronRight className="h-4 w-4 text-ink/25 transition group-hover:translate-x-0.5 group-hover:text-ink/50" />
                </div>

                <p className="mt-4 text-sm font-semibold text-ink">
                  {item.title} reports
                </p>

                <div className="mt-2 flex items-end justify-between">
                  <p className="text-2xl font-semibold text-ink">
                    {item.count}
                  </p>
                  <p className="text-[11px] text-ink/40">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Search/filter */}
      <Card>
        <div className="flex flex-col gap-3 p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full rounded-xl border border-ink/10 bg-ink/[0.02] py-2.5 pl-9 pr-4 text-sm text-ink outline-none placeholder:text-ink/30 focus:border-blue-500/40"
            />
          </div>

          <select className="rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm text-ink/60 outline-none">
            <option>All report types</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Inspection</option>
          </select>

          <select className="rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm text-ink/60 outline-none">
            <option>All projects</option>
            <option>Gwarinpa Estate</option>
            <option>Wuse Commercial Block</option>
            <option>Maitama Villas</option>
          </select>
        </div>
      </Card>

      {/* Reports table/list */}
      <Card>
        <div className="border-b border-ink/10 px-5 py-4">
          <h3 className="font-semibold text-ink">Recent reports</h3>
          <p className="mt-0.5 text-xs text-ink/45">
            Latest generated monitoring documents.
          </p>
        </div>

        <div className="divide-y divide-ink/10">
          {reports.map((report) => (
            <div
              key={report.title}
              className="group flex flex-col gap-4 p-5 transition hover:bg-ink/[0.015] sm:flex-row sm:items-center"
            >
              <div className="rounded-xl bg-ink/5 p-2.5 text-ink/55">
                <FileText className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="truncate text-sm font-semibold text-ink">
                    {report.title}
                  </h4>

                  <span className="rounded-full bg-blue-500/10 px-2 py-0.5 font-mono text-[8px] font-semibold text-blue-600">
                    {report.type}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/40">
                  <span>{report.project}</span>
                  <span>{report.date}</span>
                  <span>{report.size}</span>
                </div>
              </div>

              <button
                className="flex items-center justify-center gap-2 rounded-lg border border-ink/10 px-3 py-2 text-xs font-semibold text-ink/60 transition hover:bg-ink/5 hover:text-ink"
                title="Download report"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Download</span>
              </button>

              <button className="rounded-lg p-2 text-ink/30 transition hover:bg-ink/5 hover:text-ink">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-ink/10 px-5 py-4">
          <p className="font-mono text-[9px] text-ink/35">
            SHOWING 5 OF 196 REPORTS
          </p>

          <button className="text-xs font-semibold text-blue-600">
            View all reports →
          </button>
        </div>
      </Card>
    </div>
  )
}