import {
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

  return (
    <div className="space-y-6">
      <Card>
        <div className="border-b border-line bg-paper-2 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                  <KeyRound className="h-4 w-4 text-ink/55" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                    Digital Property Passport
                  </p>

                  <h1 className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-ink">
                    Ownership
                  </h1>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/50">
                Ownership and title records retained as part of the property's
                permanent Digital Property Passport.
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
              icon={UserRound}
              label="Owner"
              value={ownershipRecord.owner}
              description={ownershipRecord.ownershipType}
            />

            <SummaryMetric
              icon={FileCheck2}
              label="Title"
              value={ownershipRecord.titleReference}
              description="Title reference"
            />

            <SummaryMetric
              icon={CheckCircle2}
              label="Status"
              value={ownershipRecord.status}
              description={`${verifiedDocuments} verified records`}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Current ownership"
          subtitle="Primary ownership and title information for the property"
        />

        <CardBody>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

          <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Ownership record verified
                </p>

                <p className="mt-1 text-xs text-ink/45">
                  The current ownership record is retained in the property
                  passport.
                </p>
              </div>
            </div>

            <span className="hidden rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 sm:inline-flex">
              Verified
            </span>
          </div>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          title="Ownership records"
          subtitle="Title and ownership documentation included in the Digital Property Passport"
        />

        <div className="divide-y divide-line">
          {ownershipDocuments.map((document) => (
            <div
              key={document.id}
              className="px-6 py-5 transition-colors hover:bg-ink/[0.02]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                    <FileText className="h-4 w-4 text-ink/50" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-ink">
                        {document.title}
                      </h2>

                      <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                        {document.status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-ink/40">
                      {document.id} · {document.type}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Recorded
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink/60">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {document.date}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Document
                  </button>

                  <ChevronRight className="hidden h-4 w-4 text-ink/25 sm:block" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Passport record"
          subtitle="Ownership documentation forms part of the permanent property archive"
        />

        <CardBody>
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
              <FileCheck2 className="h-4 w-4 text-ink/55" />
            </div>

            <p className="text-xs leading-5 text-ink/50">
              Ownership and title documentation should remain linked to the
              relevant property and land records throughout the project
              lifecycle and within the completed Digital Property Passport.
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
    <div>
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-ink/35" />

        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
    </div>
  )
}