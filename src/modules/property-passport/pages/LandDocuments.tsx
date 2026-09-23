import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  FileCheck2,
  FileText,
  Map,
  ShieldCheck,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Land Documents — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * Land survey, C of O and allocation documents retained as part of
 * the project's permanent Digital Property Passport.
 *
 * TODO:
 * - Replace static data with API-backed land document records.
 * - Add document preview/download.
 * - Add document upload workflow.
 * - Add verification workflow.
 * - Link documents to the project's property/land record.
 */

const documents = [
  {
    id: 'LAND-001',
    title: 'Land Survey Plan',
    type: 'Land Survey',
    description:
      'Survey documentation identifying the project property and boundaries.',
    date: '10 May 2026',
    status: 'Verified',
    document: 'land-survey-plan.pdf',
  },
  {
    id: 'LAND-002',
    title: 'Certificate of Occupancy',
    type: 'C of O',
    description:
      'Certificate of Occupancy retained as part of the property record.',
    date: '15 May 2026',
    status: 'Verified',
    document: 'certificate-of-occupancy.pdf',
  },
  {
    id: 'LAND-003',
    title: 'Land Allocation Document',
    type: 'Allocation',
    description:
      'Allocation documentation associated with the project property.',
    date: '18 May 2026',
    status: 'Verified',
    document: 'land-allocation-document.pdf',
  },
]

export function LandDocuments() {
  const verified = documents.filter(
    (document) => document.status === 'Verified',
  ).length

  const verificationPercentage = Math.round(
    (verified / documents.length) * 100,
  )

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
              Land Documents
            </h1>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/8 px-3 py-1.5 text-[10px] font-semibold text-emerald-700">
              <ShieldCheck className="h-3 w-3" />
              {verified}/{documents.length} verified
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
            Core land and property records retained as part of the property's
            permanent Digital Property Passport.
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
      {/* Property record overview                                            */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <div className="relative overflow-hidden border-b border-line bg-[#0B1220] px-6 py-7 sm:px-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#1657FF]/15 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-[#34A6FF]/10 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/8">
                  <Map className="h-4 w-4 text-white/80" />
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  Property record
                </p>
              </div>

              <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white">
                Land documentation verified
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-white/45">
                Core property documents are retained as permanent records,
                supporting land identity, ownership documentation and project
                traceability.
              </p>
            </div>

            <div className="min-w-[220px]">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    Verification
                  </p>

                  <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-white">
                    {verificationPercentage}
                    <span className="text-lg text-white/30">%</span>
                  </p>
                </div>

                <span className="text-xs font-semibold text-white/45">
                  {verified}/{documents.length}
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#34A6FF] transition-all"
                  style={{ width: `${verificationPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <CardBody>
          <div className="grid gap-3 sm:grid-cols-3">
            <SummaryMetric
              icon={FileText}
              label="Documents"
              value={documents.length.toString()}
              description="Core land records"
              accent="blue"
            />

            <SummaryMetric
              icon={CheckCircle2}
              label="Verified"
              value={`${verified}/${documents.length}`}
              description="Verified property records"
              accent="green"
            />

            <SummaryMetric
              icon={Map}
              label="Categories"
              value="3"
              description="Survey, C of O and allocation"
              accent="ink"
            />
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Land records                                                        */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Land records"
          subtitle="Core property documentation included in the Digital Property Passport"
        />

        <div className="divide-y divide-line">
          {documents.map((document, index) => (
            <div
              key={document.id}
              className="group relative px-6 py-6 transition-colors hover:bg-[#F6F8FC]/70 sm:px-7"
            >
              <div className="absolute inset-y-0 left-0 w-0.5 bg-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                {/* Document identity */}
                <div className="flex min-w-0 items-start gap-4">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border border-line bg-paper-2">
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-bold text-ink/30 shadow-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <FileText className="h-[17px] w-[17px] text-[#1657FF]" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-ink">
                        {document.title}
                      </h2>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" />
                        {document.status}
                      </span>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-ink/35">
                      <span className="font-semibold tracking-[0.08em]">
                        {document.id}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-ink/15" />

                      <span>{document.type}</span>
                    </div>

                    <p className="mt-2 max-w-xl text-xs leading-5 text-ink/45">
                      {document.description}
                    </p>
                  </div>
                </div>

                {/* Metadata / action */}
                <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-4 pl-15 lg:pl-0">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                      Recorded
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-ink/60">
                      <CalendarDays className="h-3.5 w-3.5 text-ink/30" />
                      {document.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                      Record type
                    </p>

                    <p className="mt-1 text-xs font-semibold text-ink/60">
                      Property document
                    </p>
                  </div>

                  <button
                    type="button"
                    className="group/button inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2.5 text-[10px] font-semibold text-ink shadow-[0_6px_18px_rgba(11,18,32,0.035)] transition-all hover:-translate-y-0.5 hover:border-[#1657FF]/20 hover:bg-[#1657FF]/5 hover:text-[#1657FF]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Document
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
                  </button>

                  <ChevronRight className="hidden h-4 w-4 text-ink/15 transition-transform group-hover:translate-x-0.5 sm:block" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Property documentation + passport                                   */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader
            title="Property documentation"
            subtitle="Core land records retained for the project property"
          />

          <CardBody>
            <div className="rounded-[18px] border border-[#1657FF]/10 bg-[#1657FF]/[0.035] px-5 py-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1657FF]/10 bg-white shadow-[0_6px_18px_rgba(22,87,255,0.05)]">
                  <Map className="h-4 w-4 text-[#1657FF]" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    Land identity records
                  </p>

                  <p className="mt-1.5 text-xs leading-5 text-ink/45">
                    Survey, Certificate of Occupancy and allocation
                    documentation remain linked to the relevant property
                    record throughout the project lifecycle.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#1657FF] shadow-sm">
                      <ShieldCheck className="h-3 w-3" />
                      Verified records
                    </span>

                    <span className="text-[10px] text-ink/30">
                      {documents.length} core documents
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader
            title="Passport record"
            subtitle="Permanent property documentation archive"
          />

          <CardBody>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-paper-2">
                <FileCheck2 className="h-4 w-4 text-[#1657FF]" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">
                  Permanent land archive
                </p>

                <p className="mt-1.5 text-xs leading-5 text-ink/45">
                  Verified land documentation remains available within the
                  Digital Property Passport as part of the project's permanent
                  property record.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1657FF]/8 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#1657FF]">
                    <ShieldCheck className="h-3 w-3" />
                    Passport linked
                  </span>

                  <span className="text-[10px] text-ink/30">
                    Permanent record
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
            Permanent property record
          </p>

          <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/45">
            Land documentation forms part of the property's permanent audit
            trail, preserving verified survey, occupancy and allocation records
            within the Digital Property Passport.
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
  accent?: 'blue' | 'green' | 'ink'
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
    ink: {
      icon: 'bg-ink/5 text-ink/55',
      value: 'text-ink',
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