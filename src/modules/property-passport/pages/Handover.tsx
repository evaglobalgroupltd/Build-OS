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
 * Handover — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * Handover checklist, defects, approvals and final sign-off.
 *
 * BRD support:
 * - Final report includes completion checklist, defects, warranties
 *   and handover recommendation.
 * - Completed projects retain a handover certificate in the
 *   Digital Property Passport.
 *
 * TODO:
 * - Replace static data with API-backed handover records.
 * - Add checklist completion workflow.
 * - Add defect resolution workflow.
 * - Add client / PM / professional sign-off actions.
 * - Add handover certificate generation/download.
 */

const checklist = [
  {
    item: 'Construction works completed',
    description: 'Approved project scope has been substantially completed.',
    status: 'Completed',
  },
  {
    item: 'Milestones verified',
    description: 'Required project milestones have been reviewed and approved.',
    status: 'Completed',
  },
  {
    item: 'Final inspection completed',
    description: 'Final inspection and project condition review completed.',
    status: 'Completed',
  },
  {
    item: 'Defects reviewed',
    description: 'Outstanding defects have been documented and assigned.',
    status: 'In Review',
  },
  {
    item: 'Project documents compiled',
    description: 'Final project records are available in the property passport.',
    status: 'Completed',
  },
  {
    item: 'Handover recommendation',
    description: 'PM / professional recommendation has been submitted.',
    status: 'Completed',
  },
]

const defects = [
  {
    id: 'DEF-001',
    item: 'Minor paint touch-up',
    location: 'Ground floor living area',
    status: 'Open',
    priority: 'Low',
  },
  {
    id: 'DEF-002',
    item: 'Door hardware adjustment',
    location: 'First floor bedroom',
    status: 'Resolved',
    priority: 'Low',
  },
]

const signOffs = [
  {
    role: 'Project Manager',
    name: 'Project Manager',
    status: 'Approved',
    date: '28 Aug 2026',
  },
  {
    role: 'Professional / Inspector',
    name: 'Professional Expert',
    status: 'Approved',
    date: '29 Aug 2026',
  },
  {
    role: 'Client / Project Owner',
    name: 'Client',
    status: 'Pending',
    date: null,
  },
]

export function Handover() {
  const completedItems = checklist.filter(
    (item) => item.status === 'Completed',
  ).length

  const resolvedDefects = defects.filter(
    (defect) => defect.status === 'Resolved',
  ).length

  const approvedSignOffs = signOffs.filter(
    (item) => item.status === 'Approved',
  ).length

  const completionPercentage = Math.round(
    (completedItems / checklist.length) * 100,
  )

  const hasPendingItems =
    completedItems < checklist.length ||
    resolvedDefects < defects.length ||
    approvedSignOffs < signOffs.length

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
              Handover
            </h1>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/15 bg-amber-500/8 px-3 py-1.5 text-[10px] font-semibold text-amber-700">
              <AlertTriangle className="h-3 w-3" />
              Handover pending
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
            Final completion review, outstanding defects and formal project
            sign-off before the property is handed over.
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
      {/* Completion overview                                                 */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <div className="relative overflow-hidden border-b border-line bg-[#0B1220] px-6 py-7 sm:px-8">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#1657FF]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-[#34A6FF]/10 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/8">
                  <ClipboardCheck className="h-4 w-4 text-white/80" />
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  Completion overview
                </p>
              </div>

              <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white">
                {completionPercentage}% ready for handover
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-white/45">
                Most completion requirements have been satisfied. The
                remaining review items must be resolved before final client
                acceptance.
              </p>
            </div>

            <div className="min-w-[220px]">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    Checklist progress
                  </p>

                  <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-white">
                    {completedItems}
                    <span className="text-lg text-white/30">
                      /{checklist.length}
                    </span>
                  </p>
                </div>

                <span className="text-xs font-semibold text-white/45">
                  {completionPercentage}%
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#34A6FF] transition-all"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <CardBody>
          <div className="grid gap-3 sm:grid-cols-3">
            <SummaryMetric
              icon={ClipboardCheck}
              label="Checklist"
              value={`${completedItems}/${checklist.length}`}
              description={`${completionPercentage}% completed`}
              accent="blue"
            />

            <SummaryMetric
              icon={AlertTriangle}
              label="Defects"
              value={`${resolvedDefects}/${defects.length}`}
              description={
                defects.length - resolvedDefects > 0
                  ? `${defects.length - resolvedDefects} item requires attention`
                  : 'All defects resolved'
              }
              accent={
                resolvedDefects === defects.length ? 'green' : 'amber'
              }
            />

            <SummaryMetric
              icon={FileCheck2}
              label="Sign-offs"
              value={`${approvedSignOffs}/${signOffs.length}`}
              description={
                approvedSignOffs === signOffs.length
                  ? 'All approvals complete'
                  : 'Final approval pending'
              }
              accent={
                approvedSignOffs === signOffs.length ? 'green' : 'amber'
              }
            />
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Checklist                                                           */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Handover checklist"
          subtitle="Final completion requirements before project handover"
        />

        <div className="divide-y divide-line">
          {checklist.map((item, index) => {
            const isCompleted = item.status === 'Completed'

            return (
              <div
                key={item.item}
                className="group relative flex flex-col gap-4 px-6 py-5 transition-colors hover:bg-[#F6F8FC]/70 sm:flex-row sm:items-center sm:justify-between sm:px-7"
              >
                <div
                  className={`absolute inset-y-0 left-0 w-0.5 transition-opacity ${
                    isCompleted
                      ? 'bg-emerald-500 opacity-0 group-hover:opacity-100'
                      : 'bg-amber-500 opacity-100'
                  }`}
                />

                <div className="flex min-w-0 items-start gap-4">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-line bg-paper-2">
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-bold text-ink/30 shadow-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-ink">
                        {item.item}
                      </h2>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] ${
                          isCompleted
                            ? 'bg-emerald-500/10 text-emerald-700'
                            : 'bg-amber-500/10 text-amber-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <p className="mt-1.5 max-w-2xl text-xs leading-5 text-ink/45">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 pl-14 sm:pl-0">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700/70">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-amber-700/80">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Attention required
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Defects + sign-off                                                  */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader
            title="Defect register"
            subtitle="Outstanding and resolved items from final inspection"
          />

          <div className="divide-y divide-line">
            {defects.map((defect, index) => {
              const isResolved = defect.status === 'Resolved'

              return (
                <div
                  key={defect.id}
                  className="group relative px-6 py-5 transition-colors hover:bg-[#F6F8FC]/70 sm:px-7"
                >
                  <div
                    className={`absolute inset-y-0 left-0 w-0.5 ${
                      isResolved ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-line bg-paper-2">
                      {isResolved ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                              {defect.id}
                            </span>

                            <span className="h-1 w-1 rounded-full bg-ink/15" />

                            <span
                              className={`text-[9px] font-semibold uppercase tracking-[0.1em] ${
                                isResolved
                                  ? 'text-emerald-700'
                                  : 'text-amber-700'
                              }`}
                            >
                              {defect.status}
                            </span>
                          </div>

                          <h2 className="mt-1.5 text-sm font-semibold text-ink">
                            {defect.item}
                          </h2>

                          <p className="mt-1 text-xs text-ink/40">
                            {defect.location}
                          </p>
                        </div>

                        <span className="rounded-full border border-line bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-ink/40">
                          {defect.priority}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-[10px] font-medium text-ink/30">
                          Final inspection item {String(index + 1).padStart(2, '0')}
                        </span>

                        {isResolved ? (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700">
                            <CheckCircle2 className="h-3 w-3" />
                            Cleared
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-amber-700">
                            <AlertTriangle className="h-3 w-3" />
                            Open item
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader
            title="Handover sign-off"
            subtitle="Required approval chain before final acceptance"
          />

          <div className="divide-y divide-line">
            {signOffs.map((signOff, index) => {
              const isApproved = signOff.status === 'Approved'

              return (
                <div
                  key={signOff.role}
                  className="group relative px-6 py-5 transition-colors hover:bg-[#F6F8FC]/70 sm:px-7"
                >
                  <div
                    className={`absolute inset-y-0 left-0 w-0.5 ${
                      isApproved ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-line bg-paper-2">
                        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-bold text-ink/30 shadow-sm">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        {isApproved ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <CalendarDays className="h-4 w-4 text-amber-600" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink">
                          {signOff.role}
                        </p>

                        <p className="mt-1 text-xs text-ink/40">
                          {signOff.name}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] ${
                          isApproved
                            ? 'bg-emerald-500/10 text-emerald-700'
                            : 'bg-amber-500/10 text-amber-700'
                        }`}
                      >
                        {signOff.status}
                      </span>

                      {signOff.date ? (
                        <p className="mt-2 text-[10px] text-ink/30">
                          {signOff.date}
                        </p>
                      ) : (
                        <p className="mt-2 text-[10px] font-medium text-amber-700/70">
                          Awaiting action
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Certificate                                                         */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1657FF]/8">
              <FileCheck2 className="h-4 w-4 text-[#1657FF]" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                Final document
              </p>

              <h2 className="mt-0.5 font-display text-lg font-semibold tracking-tight text-ink">
                Handover certificate
              </h2>
            </div>
          </div>
        </div>

        <CardBody>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(11,18,32,0.05)]">
                <FileText className="h-5 w-5 text-[#1657FF]" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-ink">
                    Project Handover Certificate
                  </p>

                  <span className="rounded-full bg-ink/5 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-ink/40">
                    Passport document
                  </span>
                </div>

                <p className="mt-1.5 max-w-2xl text-xs leading-5 text-ink/45">
                  The final certificate is retained as part of the Digital
                  Property Passport once completion checks and required
                  approvals have been satisfied.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-medium text-ink/35">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3 w-3 text-ink/35" />
                    Passport linked
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3 w-3 text-ink/35" />
                    Final-stage document
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink shadow-[0_6px_18px_rgba(11,18,32,0.04)] transition-all hover:-translate-y-0.5 hover:border-[#1657FF]/20 hover:bg-[#1657FF]/5 hover:text-[#1657FF]"
            >
              View certificate
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Passport integrity                                                  */}
      {/* ------------------------------------------------------------------ */}

      <div className="rounded-[22px] border border-[#1657FF]/10 bg-[#1657FF]/[0.035] px-6 py-5 sm:px-7">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1657FF]/10 bg-white shadow-[0_6px_18px_rgba(22,87,255,0.06)]">
            <ShieldCheck className="h-4 w-4 text-[#1657FF]" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-ink">
              Permanent passport record
            </p>

            <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/45">
              Handover records remain linked to the completed project archive
              and Digital Property Passport, preserving final reports, defects,
              warranties, approvals and the handover certificate as part of
              the project audit trail.
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Final state                                                         */}
      {/* ------------------------------------------------------------------ */}

      {hasPendingItems && (
        <div className="flex items-center gap-3 rounded-2xl border border-amber-500/15 bg-amber-500/[0.035] px-5 py-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-ink">
              Final acceptance is still pending
            </p>

            <p className="mt-0.5 text-[11px] leading-5 text-ink/40">
              Resolve outstanding handover requirements and obtain the
              remaining approval before final project acceptance.
            </p>
          </div>
        </div>
      )}
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