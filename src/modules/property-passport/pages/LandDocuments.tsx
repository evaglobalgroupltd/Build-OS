import {
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
    description: 'Survey documentation identifying the project property and boundaries.',
    date: '10 May 2026',
    status: 'Verified',
    document: 'land-survey-plan.pdf',
  },
  {
    id: 'LAND-002',
    title: 'Certificate of Occupancy',
    type: 'C of O',
    description: 'Certificate of Occupancy retained as part of the property record.',
    date: '15 May 2026',
    status: 'Verified',
    document: 'certificate-of-occupancy.pdf',
  },
  {
    id: 'LAND-003',
    title: 'Land Allocation Document',
    type: 'Allocation',
    description: 'Allocation documentation associated with the project property.',
    date: '18 May 2026',
    status: 'Verified',
    document: 'land-allocation-document.pdf',
  },
]

export function LandDocuments() {
  const verified = documents.filter(
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
                  <Map className="h-4 w-4 text-ink/55" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                    Digital Property Passport
                  </p>

                  <h1 className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-ink">
                    Land Documents
                  </h1>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/50">
                Land and property documentation retained as part of the
                project's permanent Digital Property Passport.
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
              icon={FileText}
              label="Documents"
              value={documents.length.toString()}
              description="Land records"
            />

            <SummaryMetric
              icon={CheckCircle2}
              label="Verified"
              value={`${verified}/${documents.length}`}
              description="Verified records"
            />

            <SummaryMetric
              icon={Map}
              label="Categories"
              value="3"
              description="Survey, C of O and allocation"
            />
          </div>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          title="Land records"
          subtitle="Property documentation included in the Digital Property Passport"
        />

        <div className="divide-y divide-line">
          {documents.map((document) => (
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

                    <p className="mt-2 max-w-xl text-xs leading-5 text-ink/50">
                      {document.description}
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

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="Property documentation"
            subtitle="Core land records retained for the project property"
          />

          <CardBody>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <Map className="h-4 w-4 text-ink/55" />
              </div>

              <p className="text-xs leading-5 text-ink/50">
                Land survey, Certificate of Occupancy and allocation
                documentation should remain linked to the relevant property
                record throughout the project lifecycle.
              </p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Passport record"
            subtitle="Land documents form part of the permanent property archive"
          />

          <CardBody>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <FileCheck2 className="h-4 w-4 text-ink/55" />
              </div>

              <p className="text-xs leading-5 text-ink/50">
                Verified land documentation should remain available in the
                Digital Property Passport as part of the project's permanent
                record.
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