import {
  ArrowRight,
  CheckCircle2,
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

  return (
    <div className="space-y-6">
      <Card>
        <div className="border-b border-line bg-paper-2 px-6 py-8 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink/5">
                  <ShieldCheck className="h-5 w-5 text-ink/55" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                    Digital Property Passport
                  </p>

                  <h1 className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    Property Passport
                  </h1>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-ink/50">
                The full verified record of the build, bringing together the
                project's ownership, land, design, inspection, contract and
                handover records.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              {passportProgress}% verified
            </div>
          </div>
        </div>

        <CardBody>
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryMetric
              icon={FileText}
              label="Records"
              value={totalRecords.toString()}
              description="Passport records"
            />

            <SummaryMetric
              icon={CheckCircle2}
              label="Verified sections"
              value={`${verifiedSections}/${passportSections.length}`}
              description="Sections verified"
            />

            <SummaryMetric
              icon={ShieldCheck}
              label="Passport status"
              value="In Progress"
              description="Final records require completion"
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Passport records"
          subtitle="All major records retained as part of the Digital Property Passport"
        />

        <div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-3">
          {passportSections.map((section) => {
            const Icon = section.icon

            return (
              <a
                key={section.title}
                href={section.href}
                className="group rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                    <Icon className="h-4 w-4 text-ink/55" />
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                      section.status === 'Verified'
                        ? 'bg-emerald-500/10 text-emerald-700'
                        : section.status === 'Review'
                          ? 'bg-amber-500/10 text-amber-700'
                          : 'bg-ink/5 text-ink/45'
                    }`}
                  >
                    {section.status}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-semibold text-ink">
                      {section.title}
                    </h2>

                    <span className="font-display text-lg font-semibold text-ink">
                      {section.count}
                    </span>
                  </div>

                  <p className="mt-2 min-h-10 text-xs leading-5 text-ink/45">
                    {section.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                    View records
                  </span>

                  <ArrowRight className="h-3.5 w-3.5 text-ink/30 transition-transform group-hover:translate-x-0.5 group-hover:text-ink/60" />
                </div>
              </a>
            )
          })}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="Passport completeness"
            subtitle="Current state of the project's permanent record"
          />

          <CardBody>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-2xl font-semibold text-ink">
                  {passportProgress}%
                </p>

                <p className="mt-1 text-xs text-ink/45">
                  {verifiedSections} of {passportSections.length} sections
                  verified
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/5">
                <ShieldCheck className="h-5 w-5 text-ink/50" />
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-ink/5">
              <div
                className="h-full rounded-full bg-ink"
                style={{ width: `${passportProgress}%` }}
              />
            </div>

            <p className="mt-4 text-xs leading-5 text-ink/45">
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
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <FileCheck2 className="h-4 w-4 text-ink/55" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Verified project archive
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/45">
                  The Digital Property Passport brings together the verified
                  records of the completed build and provides a permanent
                  reference for the property.
                </p>
              </div>
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
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
          <Icon className="h-4 w-4 text-ink/50" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            {label}
          </p>

          <p className="mt-0.5 truncate font-display text-xl font-semibold text-ink">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink/40">{description}</p>
    </div>
  )
}