import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  FileText,
  ShieldCheck,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Inspections — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * Inspection history and findings retained as part of the
 * project's permanent Digital Property Passport.
 *
 * TODO:
 * - Replace static data with API-backed inspection records.
 * - Add inspection detail view.
 * - Add finding resolution workflow.
 * - Add inspection report preview/download.
 * - Link inspections to relevant project milestones.
 */

const inspections = [
  {
    id: 'INS-001',
    type: 'Foundation Inspection',
    inspector: 'Professional / Inspector',
    date: '05 Jul 2026',
    status: 'Passed',
    findings: 0,
    summary: 'Foundation works inspected and accepted.',
    document: 'foundation-inspection-report.pdf',
  },
  {
    id: 'INS-002',
    type: 'Structural Works Inspection',
    inspector: 'Professional / Inspector',
    date: '02 Aug 2026',
    status: 'Passed',
    findings: 1,
    summary: 'Structural works inspected with one minor finding recorded.',
    document: 'structural-inspection-report.pdf',
  },
  {
    id: 'INS-003',
    type: 'Final Project Inspection',
    inspector: 'Professional / Inspector',
    date: '28 Aug 2026',
    status: 'Review Required',
    findings: 2,
    summary: 'Final inspection completed; outstanding findings require review.',
    document: 'final-inspection-report.pdf',
  },
]

export function Inspections() {
  const passed = inspections.filter(
    (inspection) => inspection.status === 'Passed',
  ).length

  const totalFindings = inspections.reduce(
    (total, inspection) => total + inspection.findings,
    0,
  )

  const openFindings = inspections
    .filter((inspection) => inspection.status === 'Review Required')
    .reduce((total, inspection) => total + inspection.findings, 0)

  return (
    <div className="space-y-6">
      <Card>
        <div className="border-b border-line bg-paper-2 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                  <ClipboardCheck className="h-4 w-4 text-ink/55" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                    Digital Property Passport
                  </p>

                  <h1 className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-ink">
                    Inspections
                  </h1>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/50">
                Inspection history and findings retained as part of the
                project's permanent project record.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Passport record
            </span>
          </div>
        </div>

        <CardBody>
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryMetric
              icon={ClipboardCheck}
              label="Inspections"
              value={inspections.length.toString()}
              description="Recorded inspections"
            />

            <SummaryMetric
              icon={CheckCircle2}
              label="Passed"
              value={`${passed}/${inspections.length}`}
              description="Inspections passed"
            />

            <SummaryMetric
              icon={AlertTriangle}
              label="Findings"
              value={totalFindings.toString()}
              description={`${openFindings} requiring review`}
            />
          </div>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          title="Inspection history"
          subtitle="Recorded inspections and their findings"
        />

        <div className="divide-y divide-line">
          {inspections.map((inspection) => (
            <div
              key={inspection.id}
              className="px-6 py-5 transition-colors hover:bg-ink/[0.02]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      inspection.status === 'Passed'
                        ? 'bg-emerald-500/10'
                        : 'bg-amber-500/10'
                    }`}
                  >
                    {inspection.status === 'Passed' ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-ink">
                        {inspection.type}
                      </h2>

                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                          inspection.status === 'Passed'
                            ? 'bg-emerald-500/10 text-emerald-700'
                            : 'bg-amber-500/10 text-amber-700'
                        }`}
                      >
                        {inspection.status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-ink/40">
                      {inspection.id} · {inspection.inspector}
                    </p>

                    <p className="mt-2 max-w-xl text-xs leading-5 text-ink/50">
                      {inspection.summary}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Findings
                    </p>

                    <p
                      className={`mt-1 text-sm font-semibold ${
                        inspection.findings > 0
                          ? 'text-amber-700'
                          : 'text-emerald-700'
                      }`}
                    >
                      {inspection.findings}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Inspected
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink/60">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {inspection.date}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Report
                  </button>

                  <ChevronRight className="hidden h-4 w-4 text-ink/25 sm:block" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="Inspection findings"
            subtitle="Items identified during project inspections"
          />

          <CardBody>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  {openFindings} findings require review
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/45">
                  Outstanding inspection findings should be reviewed and
                  resolved before final project completion and handover.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Inspection records"
            subtitle="Reports retained in the Digital Property Passport"
          />

          <CardBody>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <FileCheck2 className="h-4 w-4 text-ink/55" />
              </div>

              <p className="text-xs leading-5 text-ink/50">
                Inspection reports and findings should remain linked to the
                project archive so the completed property retains its
                inspection history.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function SummaryMetric({
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
    <div className="rounded-2xl border border-line bg-paper-2 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
          <Icon className="h-4 w-4 text-ink/50" />
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

      <p className="mt-3 text-xs text-ink/40">{description}</p>
    </div>
  )
}