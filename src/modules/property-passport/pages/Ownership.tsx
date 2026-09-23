import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  FileCheck2,
  FileText,
  KeyRound,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Ownership — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * Ownership and title records retained as part of the project's
 * permanent Digital Property Passport.
 *
 * TODO:
 * - Replace static data with API-backed ownership records.
 * - Add ownership/title document preview and download.
 * - Add ownership verification workflow.
 * - Link ownership records to the project's land/property records.
 * - Support ownership history when the backend model is defined.
 */

const ownershipRecord = {
  owner: 'Project Owner',
  ownershipType: 'Registered Ownership',
  titleReference: 'TITLE-REF-001',
  acquisitionDate: '15 May 2026',
  status: 'Verified',
  document: 'title-document.pdf',
}

const ownershipDocuments = [
  {
    id: 'OWN-001',
    title: 'Title Document',
    type: 'Title Record',
    date: '15 May 2026',
    status: 'Verified',
  },
  {
    id: 'OWN-002',
    title: 'Ownership Record',
    type: 'Ownership',
    date: '15 May 2026',
    status: 'Verified',
  },
]

export function Ownership() {
  const verifiedDocuments = ownershipDocuments.filter(
    (document) => document.status === 'Verified',
  ).length

  const verificationPercentage =
    ownershipDocuments.length > 0
      ? Math.round((verifiedDocuments / ownershipDocuments.length) * 100)
      : 0

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
              Ownership
            </h1>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/[0.06] px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
              <ShieldCheck className="h-3 w-3" />
              Verified
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/45">
            Authoritative ownership and title records retained as part of the
            property's permanent Digital Property Passport.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-[0_8px_24px_rgba(11,18,32,0.04)]">
          <FileCheck2 className="h-3.5 w-3.5 text-[#1657FF]" />
          {verifiedDocuments}/{ownershipDocuments.length} records verified
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Ownership overview                                                  */}
      {/* ------------------------------------------------------------------ */}

      <Card className="relative overflow-hidden border-0 bg-[#0B1220] text-white shadow-[0_18px_50px_rgba(11,18,32,0.14)]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#1657FF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-[#34A6FF]/10 blur-3xl" />

        <CardBody className="relative p-6 sm:p-7 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07]">
                  <KeyRound className="h-4 w-4 text-[#6FA3FF]" />
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  Ownership record
                </p>
              </div>

              <h2 className="mt-4 max-w-xl font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {ownershipRecord.owner}
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
                {ownershipRecord.ownershipType} associated with title reference{' '}
                <span className="font-medium text-white/75">
                  {ownershipRecord.titleReference}
                </span>
                .
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Ownership verified
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-medium text-white/55">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Acquired {ownershipRecord.acquisitionDate}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center justify-center lg:pr-4">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/[0.035]">
                <div
                  className="absolute inset-2 rounded-full"
                  style={{
                    background: `conic-gradient(#34A6FF ${verificationPercentage}%, rgba(255,255,255,0.08) ${verificationPercentage}% 100%)`,
                  }}
                />

                <div className="relative flex h-[104px] w-[104px] flex-col items-center justify-center rounded-full bg-[#0B1220]">
                  <span className="font-display text-3xl font-semibold tracking-tight text-white">
                    {verificationPercentage}%
                  </span>

                  <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    Verified
                  </span>
                </div>
              </div>

              <p className="mt-3 text-center text-[10px] font-medium text-white/35">
                Property ownership integrity
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
          icon={UserRound}
          label="Owner"
          value={ownershipRecord.owner}
          description={ownershipRecord.ownershipType}
        />

        <SummaryMetric
          icon={FileCheck2}
          label="Title reference"
          value={ownershipRecord.titleReference}
          description="Registered title record"
          accent="blue"
        />

        <SummaryMetric
          icon={CheckCircle2}
          label="Verification"
          value={`${verifiedDocuments}/${ownershipDocuments.length}`}
          description="Ownership records verified"
          accent="green"
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Current ownership                                                   */}
      {/* ------------------------------------------------------------------ */}

      <Card>
        <CardHeader
          title="Current ownership"
          subtitle="Primary ownership and title information recorded against the property"
        />

        <CardBody>
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            <DetailItem
              icon={UserRound}
              label="Owner"
              value={ownershipRecord.owner}
            />

            <DetailItem
              icon={KeyRound}
              label="Ownership type"
              value={ownershipRecord.ownershipType}
            />

            <DetailItem
              icon={FileText}
              label="Title reference"
              value={ownershipRecord.titleReference}
            />

            <DetailItem
              icon={CalendarDays}
              label="Acquisition date"
              value={ownershipRecord.acquisitionDate}
            />
          </div>

          <div className="mt-7 border-t border-line pt-6">
            <div className="flex flex-col gap-4 rounded-[20px] border border-emerald-500/15 bg-emerald-500/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">
                    Ownership record verified
                  </p>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-ink/45">
                    The current ownership record has been verified and retained
                    within the permanent property passport.
                  </p>
                </div>
              </div>

              <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Ownership records                                                   */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Ownership records"
          subtitle="Title and ownership documentation included in the Digital Property Passport"
        />

        <div className="divide-y divide-line">
          {ownershipDocuments.map((document, index) => (
            <div
              key={document.id}
              className="group relative px-5 py-5 transition-colors hover:bg-[#1657FF]/[0.018] sm:px-6"
            >
              <div className="absolute inset-y-0 left-0 w-0.5 bg-transparent transition-colors group-hover:bg-[#1657FF]" />

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6F8FC] text-xs font-semibold text-ink/35 transition-colors group-hover:bg-[#1657FF]/[0.07] group-hover:text-[#1657FF]">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="flex min-w-0 items-start gap-3">
                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white sm:flex">
                      <FileText className="h-4 w-4 text-ink/45" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-semibold text-ink">
                          {document.title}
                        </h2>

                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          {document.status}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-ink/40">
                        {document.id} · {document.type}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-4 pl-[54px] sm:pl-0">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                      Recorded
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink/60">
                      <CalendarDays className="h-3.5 w-3.5 text-ink/35" />
                      {document.date}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-[0_5px_18px_rgba(11,18,32,0.035)] transition-all hover:border-[#1657FF]/20 hover:bg-[#1657FF]/[0.035] hover:text-[#1657FF]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Document
                    <ArrowUpRight className="h-3 w-3 opacity-40" />
                  </button>

                  <ChevronRight className="hidden h-4 w-4 text-ink/20 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1657FF]/50 sm:block" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Ownership integrity / archive                                      */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader
            title="Property ownership"
            subtitle="Core ownership information retained against the property"
          />

          <CardBody>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1657FF]/[0.07]">
                <KeyRound className="h-4 w-4 text-[#1657FF]" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Registered ownership
                </p>

                <p className="mt-1.5 text-xs leading-5 text-ink/45">
                  Ownership and title information remains linked to the
                  property's legal and land records throughout the project
                  lifecycle.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-line bg-paper-2 px-2.5 py-1 text-[10px] font-medium text-ink/50">
                    {ownershipRecord.titleReference}
                  </span>

                  <span className="rounded-full border border-line bg-paper-2 px-2.5 py-1 text-[10px] font-medium text-ink/50">
                    {ownershipRecord.ownershipType}
                  </span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Passport record"
            subtitle="Permanent archive status"
          />

          <CardBody>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <FileCheck2 className="h-4 w-4 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Ownership documentation preserved
                </p>

                <p className="mt-1.5 text-xs leading-5 text-ink/45">
                  These records form part of the permanent Digital Property
                  Passport and remain available as part of the property's
                  documented ownership history.
                </p>
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

          <div>
            <p className="text-sm font-semibold text-ink">
              Permanent property record
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/45">
              Ownership and title documentation should remain linked to the
              relevant property and land records throughout the project
              lifecycle and within the completed Digital Property Passport.
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
  accent?: 'blue' | 'green' | 'ink'
}) {
  const accentClasses = {
    blue: {
      icon: 'bg-[#1657FF]/[0.07] text-[#1657FF]',
    },
    green: {
      icon: 'bg-emerald-500/10 text-emerald-600',
    },
    ink: {
      icon: 'bg-ink/5 text-ink/50',
    },
  }

  return (
    <div className="group rounded-[18px] border border-line bg-paper-2 px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_30px_rgba(11,18,32,0.055)]">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accentClasses[accent].icon}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
            {label}
          </p>

          <p className="mt-0.5 truncate font-display text-lg font-semibold tracking-tight text-ink">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink/40">{description}</p>
    </div>
  )
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="group">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-ink/30 transition-colors group-hover:text-[#1657FF]" />

        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-semibold tracking-[-0.01em] text-ink">
        {value}
      </p>
    </div>
  )
}