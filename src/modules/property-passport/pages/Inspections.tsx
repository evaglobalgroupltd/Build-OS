import {
  AlertTriangle,
  ArrowUpRight,
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

  const passRate = Math.round((passed / inspections.length) * 100)

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* Page header                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
              Digital Property Passport
            </p>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl">
              Inspections
            </h1>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold ${
                openFindings > 0
                  ? 'border-amber-500/15 bg-amber-500/8 text-amber-700'
                  : 'border-emerald-500/15 bg-emerald-500/8 text-emerald-700'
              }`}
            >
              {openFindings > 0 ? (
                <AlertTriangle className="h-3 w-3" />
              ) : (
                <ShieldCheck className="h-3 w-3" />
              )}

              {openFindings > 0
                ? `${openFindings} finding${openFindings === 1 ? '' : 's'} require review`
                : 'Inspection record complete'}
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
            Professional inspection history, findings and reports retained as
            part of the property's permanent project record.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink/65 shadow-[0_8px_24px_rgba(11,18,32,0.04)]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#1657FF]" />
            Passport record
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Inspection overview                                                 */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <div className="relative overflow-hidden border-b border-line bg-[#0B1220] px-6 py-7 sm:px-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#1657FF]/15 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-[#34A6FF]/10 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/8">
                  <ClipboardCheck className="h-4 w-4 text-white/80" />
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  Inspection overview
                </p>
              </div>

              <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white">
                {passed} of {inspections.length} inspections passed
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-white/45">
                Inspection records provide a traceable view of project quality,
                professional review and outstanding findings throughout the
                project lifecycle.
              </p>
            </div>

            <div className="min-w-[220px]">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    Pass rate
                  </p>

                  <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-white">
                    {passRate}
                    <span className="text-lg text-white/30">%</span>
                  </p>
                </div>

                <span className="text-xs font-semibold text-white/45">
                  {passed}/{inspections.length}
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#34A6FF] transition-all"
                  style={{ width: `${passRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <CardBody>
          <div className="grid gap-3 sm:grid-cols-3">
            <SummaryMetric
              icon={ClipboardCheck}
              label="Inspections"
              value={inspections.length.toString()}
              description="Recorded inspections"
              accent="blue"
            />

            <SummaryMetric
              icon={CheckCircle2}
              label="Passed"
              value={`${passed}/${inspections.length}`}
              description={`${passRate}% inspection pass rate`}
              accent="green"
            />

            <SummaryMetric
              icon={AlertTriangle}
              label="Findings"
              value={totalFindings.toString()}
              description={
                openFindings > 0
                  ? `${openFindings} requiring review`
                  : 'No open findings'
              }
              accent={openFindings > 0 ? 'amber' : 'green'}
            />
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Inspection history                                                  */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Inspection history"
          subtitle="Professional inspections recorded against the project"
        />

        <div className="divide-y divide-line">
          {inspections.map((inspection, index) => {
            const isPassed = inspection.status === 'Passed'

            return (
              <div
                key={inspection.id}
                className="group relative px-6 py-6 transition-colors hover:bg-[#F6F8FC]/70 sm:px-7"
              >
                <div
                  className={`absolute inset-y-0 left-0 w-0.5 ${
                    isPassed ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Identity */}
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border border-line bg-paper-2">
                      <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-bold text-ink/30 shadow-sm">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {isPassed ? (
                        <CheckCircle2 className="h-[17px] w-[17px] text-emerald-600" />
                      ) : (
                        <AlertTriangle className="h-[17px] w-[17px] text-amber-600" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-semibold text-ink">
                          {inspection.type}
                        </h2>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] ${
                            isPassed
                              ? 'bg-emerald-500/10 text-emerald-700'
                              : 'bg-amber-500/10 text-amber-700'
                          }`}
                        >
                          {inspection.status}
                        </span>
                      </div>

                      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-ink/35">
                        <span className="font-semibold tracking-[0.08em]">
                          {inspection.id}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-ink/15" />

                        <span>{inspection.inspector}</span>
                      </div>

                      <p className="mt-2 max-w-xl text-xs leading-5 text-ink/45">
                        {inspection.summary}
                      </p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pl-15 lg:pl-0">
                    <InspectionMeta
                      label="Findings"
                      value={inspection.findings.toString()}
                      tone={inspection.findings > 0 ? 'amber' : 'green'}
                    />

                    <InspectionMeta
                      label="Inspected"
                      value={inspection.date}
                      icon={CalendarDays}
                    />

                    <button
                      type="button"
                      className="group/button inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2.5 text-[10px] font-semibold text-ink shadow-[0_6px_18px_rgba(11,18,32,0.035)] transition-all hover:-translate-y-0.5 hover:border-[#1657FF]/20 hover:bg-[#1657FF]/5 hover:text-[#1657FF]"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Report
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
                    </button>

                    <ChevronRight className="hidden h-4 w-4 text-ink/15 transition-transform group-hover:translate-x-0.5 sm:block" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Findings + records                                                  */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader
            title="Inspection findings"
            subtitle="Items identified during professional project inspections"
          />

          <CardBody>
            <div
              className={`rounded-[18px] border px-5 py-5 ${
                openFindings > 0
                  ? 'border-amber-500/15 bg-amber-500/[0.035]'
                  : 'border-emerald-500/15 bg-emerald-500/[0.035]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    openFindings > 0
                      ? 'bg-amber-500/10'
                      : 'bg-emerald-500/10'
                  }`}
                >
                  {openFindings > 0 ? (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    {openFindings > 0
                      ? `${openFindings} finding${
                          openFindings === 1 ? '' : 's'
                        } require review`
                      : 'All inspection findings resolved'}
                  </p>

                  <p className="mt-1.5 text-xs leading-5 text-ink/45">
                    {openFindings > 0
                      ? 'Outstanding inspection findings should be reviewed, assigned and resolved before final project completion and handover.'
                      : 'No outstanding inspection findings are currently awaiting review.'}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        openFindings > 0
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/35">
                      {openFindings > 0
                        ? 'Action required'
                        : 'Inspection clear'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader
            title="Inspection records"
            subtitle="Reports retained in the Digital Property Passport"
          />

          <CardBody>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-paper-2">
                <FileCheck2 className="h-4 w-4 text-[#1657FF]" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">
                  Permanent inspection archive
                </p>

                <p className="mt-1.5 text-xs leading-5 text-ink/45">
                  Inspection reports, findings and professional assessments
                  remain linked to the project archive so the completed
                  property retains a traceable inspection history.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1657FF]/8 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#1657FF]">
                    <ShieldCheck className="h-3 w-3" />
                    Passport linked
                  </span>

                  <span className="text-[10px] text-ink/30">
                    {inspections.length} retained reports
                  </span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Passport integrity                                                  */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex items-start gap-4 rounded-[22px] border border-[#1657FF]/10 bg-[#1657FF]/[0.035] px-6 py-5 sm:px-7">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1657FF]/10 bg-white shadow-[0_6px_18px_rgba(22,87,255,0.06)]">
          <ShieldCheck className="h-4 w-4 text-[#1657FF]" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold text-ink">
            Permanent passport record
          </p>

          <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/45">
            Inspection history forms part of the property's permanent audit
            trail, preserving professional assessments, findings, reports and
            resolution history within the Digital Property Passport.
          </p>
        </div>
      </div>
    </div>
  )
}

function SummaryMetric({
  icon: Icon,
  label,
  value,
  description,
  accent = 'blue',
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  accent?: 'blue' | 'green' | 'amber'
}) {
  const accentStyles = {
    blue: {
      icon: 'bg-[#1657FF]/8 text-[#1657FF]',
      value: 'text-ink',
    },
    green: {
      icon: 'bg-emerald-500/10 text-emerald-600',
      value: 'text-emerald-700',
    },
    amber: {
      icon: 'bg-amber-500/10 text-amber-600',
      value: 'text-amber-700',
    },
  }

  const styles = accentStyles[accent]

  return (
    <div className="group rounded-[18px] border border-line bg-paper-2 px-5 py-4 transition-all hover:border-ink/10 hover:bg-white hover:shadow-[0_10px_28px_rgba(11,18,32,0.045)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${styles.icon}`}
          >
            <Icon className="h-4 w-4" />
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
            {label}
          </p>
        </div>

        <ChevronRight className="h-3.5 w-3.5 text-ink/15 transition-transform group-hover:translate-x-0.5" />
      </div>

      <p
        className={`mt-3 font-display text-2xl font-semibold tracking-tight ${styles.value}`}
      >
        {value}
      </p>

      <p className="mt-1 text-[11px] text-ink/40">{description}</p>
    </div>
  )
}

function InspectionMeta({
  label,
  value,
  tone,
  icon: Icon,
}: {
  label: string
  value: string
  tone?: 'green' | 'amber'
  icon?: React.ComponentType<{ className?: string }>
}) {
  const valueClass =
    tone === 'green'
      ? 'text-emerald-700'
      : tone === 'amber'
        ? 'text-amber-700'
        : 'text-ink/60'

  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
        {label}
      </p>

      <p
        className={`mt-1 flex items-center gap-1.5 text-xs font-semibold ${valueClass}`}
      >
        {Icon && <Icon className="h-3.5 w-3.5 text-ink/30" />}
        {value}
      </p>
    </div>
  )
}