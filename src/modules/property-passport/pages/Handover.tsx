import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  FileText,
  ShieldCheck,
  AlertTriangle,
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

  const completionPercentage = Math.round(
    (completedItems / checklist.length) * 100,
  )

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
                    Handover
                  </h1>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/50">
                Final completion checklist, defect review and project handover
                sign-off.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-700">
              <AlertTriangle className="h-3.5 w-3.5" />
              Handover pending
            </span>
          </div>
        </div>

        <CardBody>
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryMetric
              icon={ClipboardCheck}
              label="Checklist"
              value={`${completedItems}/${checklist.length}`}
              description={`${completionPercentage}% completed`}
            />

            <SummaryMetric
              icon={AlertTriangle}
              label="Defects"
              value={`${resolvedDefects}/${defects.length}`}
              description="Defects resolved"
            />

            <SummaryMetric
              icon={FileCheck2}
              label="Sign-offs"
              value={`${signOffs.filter((item) => item.status === 'Approved').length}/${signOffs.length}`}
              description="Required approvals"
            />
          </div>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          title="Handover checklist"
          subtitle="Final completion requirements before project handover"
        />

        <div className="divide-y divide-line">
          {checklist.map((item) => (
            <div
              key={item.item}
              className="flex flex-col gap-3 px-6 py-5 transition-colors hover:bg-ink/[0.02] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    item.status === 'Completed'
                      ? 'bg-emerald-500/10'
                      : 'bg-amber-500/10'
                  }`}
                >
                  {item.status === 'Completed' ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-ink">
                    {item.item}
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-ink/45">
                    {item.description}
                  </p>
                </div>
              </div>

              <span
                className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  item.status === 'Completed'
                    ? 'bg-emerald-500/10 text-emerald-700'
                    : 'bg-amber-500/10 text-amber-700'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader
            title="Defects"
            subtitle="Outstanding and resolved items identified during final review"
          />

          <div className="divide-y divide-line">
            {defects.map((defect) => (
              <div key={defect.id} className="px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-ink">
                        {defect.item}
                      </h2>

                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                          defect.status === 'Resolved'
                            ? 'bg-emerald-500/10 text-emerald-700'
                            : 'bg-amber-500/10 text-amber-700'
                        }`}
                      >
                        {defect.status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-ink/40">
                      {defect.id} · {defect.location}
                    </p>
                  </div>

                  <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                    {defect.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader
            title="Handover sign-off"
            subtitle="Required project approval chain"
          />

          <div className="divide-y divide-line">
            {signOffs.map((signOff) => (
              <div
                key={signOff.role}
                className="flex items-center justify-between gap-4 px-6 py-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      signOff.status === 'Approved'
                        ? 'bg-emerald-500/10'
                        : 'bg-amber-500/10'
                    }`}
                  >
                    {signOff.status === 'Approved' ? (
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

                <div className="text-right">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                      signOff.status === 'Approved'
                        ? 'bg-emerald-500/10 text-emerald-700'
                        : 'bg-amber-500/10 text-amber-700'
                    }`}
                  >
                    {signOff.status}
                  </span>

                  {signOff.date && (
                    <p className="mt-2 text-[10px] text-ink/35">
                      {signOff.date}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Handover certificate"
          subtitle="Final document retained in the Digital Property Passport"
        />

        <CardBody>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <FileText className="h-4 w-4 text-ink/50" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Project Handover Certificate
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/45">
                  Generated after the required completion checks and final
                  approvals have been satisfied.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
            >
              View certificate
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
              <ShieldCheck className="h-4 w-4 text-ink/55" />
            </div>

            <p className="text-xs leading-5 text-ink/50">
              Handover records should remain linked to the completed project
              archive and Digital Property Passport, including final reports,
              defects, warranties and the handover certificate.
            </p>
          </div>
        </CardBody>
      </Card>
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