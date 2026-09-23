import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  FileText,
  KeyRound,
  Map,
  Ruler,
  ShieldCheck,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Property Passport — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * The full verified record of a build.
 *
 * This is the Passport overview. Detailed records remain in their
 * respective Passport modules:
 * - Ownership
 * - Land Documents
 * - Designs
 * - Inspections
 * - Contracts
 * - Handover
 *
 * TODO:
 * - Replace static summary data with API-backed Passport data.
 * - Link each section to its detailed module.
 * - Add overall Passport verification state.
 * - Add document completeness calculation.
 * - Add final Passport export/download.
 */

const passportSections = [
  {
    title: 'Ownership',
    description: 'Ownership and title records.',
    count: '2',
    status: 'Verified',
    icon: KeyRound,
    href: './ownership',
  },
  {
    title: 'Land Documents',
    description: 'Survey, C of O and allocation records.',
    count: '3',
    status: 'Verified',
    icon: Map,
    href: './land-documents',
  },
  {
    title: 'Designs',
    description: 'Architectural, structural and related designs.',
    count: '3',
    status: 'Verified',
    icon: Ruler,
    href: './designs',
  },
  {
    title: 'Inspections',
    description: 'Inspection history and findings.',
    count: '3',
    status: 'Review',
    icon: ClipboardCheck,
    href: './inspections',
  },
  {
    title: 'Contracts',
    description: 'Contracts signed across the project.',
    count: '4',
    status: 'Verified',
    icon: FileText,
    href: './contracts',
  },
  {
    title: 'Handover',
    description: 'Completion checklist and final sign-off.',
    count: '1',
    status: 'Pending',
    icon: FileCheck2,
    href: './handover',
  },
]

export function Passport() {
  const verifiedSections = passportSections.filter(
    (section) => section.status === 'Verified',
  ).length

  const totalRecords = passportSections.reduce(
    (total, section) => total + Number(section.count),
    0,
  )

  const passportProgress = Math.round(
    (verifiedSections / passportSections.length) * 100,
  )

  const reviewSections = passportSections.filter(
    (section) => section.status === 'Review',
  ).length

  const pendingSections = passportSections.filter(
    (section) => section.status === 'Pending',
  ).length

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* Page header                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1657FF]">
              Digital Property Passport
            </p>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl">
              Property Passport
            </h1>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/15 bg-amber-500/[0.06] px-2.5 py-1 text-[10px] font-semibold text-amber-700">
              <ShieldCheck className="h-3 w-3" />
              In progress
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/45">
            The authoritative record of the build, bringing together verified
            ownership, land, design, inspection, contract and handover records
            in one permanent property archive.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-[0_8px_24px_rgba(11,18,32,0.04)]">
          <FileCheck2 className="h-3.5 w-3.5 text-[#1657FF]" />
          {totalRecords} passport records
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Passport overview                                                   */}
      {/* ------------------------------------------------------------------ */}

      <Card className="relative overflow-hidden border-0 bg-[#0B1220] text-white shadow-[0_18px_50px_rgba(11,18,32,0.14)]">
        <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#1657FF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#34A6FF]/10 blur-3xl" />

        <CardBody className="relative p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07]">
                  <ShieldCheck className="h-4 w-4 text-[#6FA3FF]" />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Passport integrity
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-white/80">
                    Verified project archive
                  </p>
                </div>
              </div>

              <h2 className="mt-6 font-display text-2xl font-semibold tracking-[-0.025em] text-white sm:text-3xl">
                {passportProgress}% of the Passport is verified.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
                {verifiedSections} of {passportSections.length} core sections
                are currently verified. Inspection review and final handover
                remain part of the completion path.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {verifiedSections} verified
                </span>

                {reviewSections > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/15 bg-amber-400/10 px-3 py-1.5 text-[10px] font-semibold text-amber-300">
                    <ClipboardCheck className="h-3.5 w-3.5" />
                    {reviewSections} under review
                  </span>
                )}

                {pendingSections > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-medium text-white/55">
                    <FileCheck2 className="h-3.5 w-3.5" />
                    {pendingSections} pending
                  </span>
                )}
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center justify-center">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-white/[0.035]">
                <div
                  className="absolute inset-2 rounded-full"
                  style={{
                    background: `conic-gradient(#34A6FF ${passportProgress}%, rgba(255,255,255,0.08) ${passportProgress}% 100%)`,
                  }}
                />

                <div className="relative flex h-[118px] w-[118px] flex-col items-center justify-center rounded-full bg-[#0B1220]">
                  <span className="font-display text-3xl font-semibold tracking-tight text-white">
                    {passportProgress}%
                  </span>

                  <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    Verified
                  </span>
                </div>
              </div>

              <p className="mt-3 text-[10px] font-medium text-white/30">
                Passport completeness
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Summary metrics                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryMetric
          icon={FileText}
          label="Records"
          value={totalRecords.toString()}
          description="Documents and project records"
        />

        <SummaryMetric
          icon={CheckCircle2}
          label="Verified sections"
          value={`${verifiedSections}/${passportSections.length}`}
          description="Core sections verified"
          accent="green"
        />

        <SummaryMetric
          icon={ShieldCheck}
          label="Passport status"
          value="In Progress"
          description="Final records require completion"
          accent="amber"
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Passport records                                                    */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Passport records"
          subtitle="Core property records retained within the Digital Property Passport"
        />

        <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-3">
          {passportSections.map((section, index) => {
            const Icon = section.icon

            return (
              <a
                key={section.title}
                href={section.href}
                className="group relative overflow-hidden rounded-[20px] border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1657FF]/15 hover:shadow-[0_14px_35px_rgba(11,18,32,0.065)]"
              >
                <div
                  className={`absolute inset-y-0 left-0 w-0.5 ${
                    section.status === 'Verified'
                      ? 'bg-emerald-500/70'
                      : section.status === 'Review'
                        ? 'bg-amber-500/70'
                        : 'bg-ink/15'
                  }`}
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F6F8FC] text-ink/45 transition-colors group-hover:bg-[#1657FF]/[0.07] group-hover:text-[#1657FF]">
                    <Icon className="h-[17px] w-[17px]" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-ink/25">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        section.status === 'Verified'
                          ? 'bg-emerald-500/10 text-emerald-700'
                          : section.status === 'Review'
                            ? 'bg-amber-500/10 text-amber-700'
                            : 'bg-ink/5 text-ink/45'
                      }`}
                    >
                      {section.status === 'Verified' && (
                        <CheckCircle2 className="h-3 w-3" />
                      )}

                      {section.status === 'Review' && (
                        <ClipboardCheck className="h-3 w-3" />
                      )}

                      {section.status === 'Pending' && (
                        <FileCheck2 className="h-3 w-3" />
                      )}

                      {section.status}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-sm font-semibold tracking-[-0.01em] text-ink">
                      {section.title}
                    </h2>

                    <span className="font-display text-xl font-semibold tracking-tight text-ink/80">
                      {section.count}
                    </span>
                  </div>

                  <p className="mt-2 min-h-10 text-xs leading-5 text-ink/45">
                    {section.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30 transition-colors group-hover:text-[#1657FF]">
                    View records
                  </span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-paper-2 transition-all group-hover:border-[#1657FF]/15 group-hover:bg-[#1657FF]/[0.05]">
                    <ArrowUpRight className="h-3.5 w-3.5 text-ink/30 transition-colors group-hover:text-[#1657FF]" />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Completeness + permanent record                                    */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardHeader
            title="Passport completeness"
            subtitle="Current state of the project's permanent record"
          />

          <CardBody>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-display text-3xl font-semibold tracking-tight text-ink">
                  {passportProgress}%
                </p>

                <p className="mt-1 text-xs text-ink/45">
                  {verifiedSections} of {passportSections.length} sections
                  verified
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1657FF]/[0.07]">
                <ShieldCheck className="h-5 w-5 text-[#1657FF]" />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.14em]">
                <span className="text-ink/30">Verification progress</span>
                <span className="text-ink/45">{passportProgress}%</span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#1657FF] to-[#34A6FF] transition-all"
                  style={{ width: `${passportProgress}%` }}
                />
              </div>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <ProgressState
                label="Verified"
                value={verifiedSections}
                tone="green"
              />

              <ProgressState
                label="Review"
                value={reviewSections}
                tone="amber"
              />

              <ProgressState
                label="Pending"
                value={pendingSections}
                tone="ink"
              />
            </div>

            <p className="mt-5 text-xs leading-5 text-ink/45">
              Inspection review and final handover remain outstanding before
              the Passport can be treated as fully complete.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Passport record"
            subtitle="Permanent project documentation"
          />

          <CardBody>
            <div className="rounded-[20px] border border-[#1657FF]/10 bg-[#1657FF]/[0.035] p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1657FF]/[0.08]">
                  <FileCheck2 className="h-4 w-4 text-[#1657FF]" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">
                    Verified project archive
                  </p>

                  <p className="mt-1.5 text-xs leading-5 text-ink/45">
                    The Digital Property Passport brings together the verified
                    records of the build and provides a permanent reference
                    for the property throughout its lifecycle.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#1657FF]/10 pt-4">
                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                  Archive integrity
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" />
                  Active
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Permanent record notice                                             */}
      {/* ------------------------------------------------------------------ */}

      <div className="rounded-[22px] border border-[#1657FF]/10 bg-[#1657FF]/[0.035] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1657FF]/[0.08]">
            <ShieldCheck className="h-4 w-4 text-[#1657FF]" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">
              Permanent Digital Property Passport
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/45">
              Passport records are intended to remain linked to the property
              throughout the project lifecycle, creating a traceable and
              authoritative record of ownership, construction, verification,
              contracts and final handover.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Shared components                                                          */
/* -------------------------------------------------------------------------- */

function SummaryMetric({
  icon: Icon,
  label,
  value,
  description,
  accent = 'ink',
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  accent?: 'blue' | 'green' | 'amber' | 'ink'
}) {
  const accentClasses = {
    blue: 'bg-[#1657FF]/[0.07] text-[#1657FF]',
    green: 'bg-emerald-500/10 text-emerald-600',
    amber: 'bg-amber-500/10 text-amber-600',
    ink: 'bg-ink/5 text-ink/50',
  }

  return (
    <div className="group rounded-[18px] border border-line bg-paper-2 px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_30px_rgba(11,18,32,0.055)]">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accentClasses[accent]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
            {label}
          </p>

          <p className="mt-0.5 truncate font-display text-xl font-semibold tracking-tight text-ink">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink/40">{description}</p>
    </div>
  )
}

function ProgressState({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: 'green' | 'amber' | 'ink'
}) {
  const toneClasses = {
    green: 'bg-emerald-500/10 text-emerald-700',
    amber: 'bg-amber-500/10 text-amber-700',
    ink: 'bg-ink/5 text-ink/50',
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-line bg-paper-2 px-3 py-2.5">
      <span className="text-[10px] font-medium text-ink/45">{label}</span>

      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${toneClasses[tone]}`}
      >
        {value}
      </span>
    </div>
  )
}