import {
  CalendarDays,
  ChevronRight,
  Download,
  FileCheck2,
  FileText,
  Layers3,
  Ruler,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Designs — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * Architectural and structural designs retained as part of the
 * project's permanent Digital Property Passport.
 *
 * TODO:
 * - Replace static data with API-backed design records.
 * - Add document preview/download.
 * - Add version history when supported by backend.
 * - Link designs to the relevant professional/service record.
 */

const designs = [
  {
    id: 'DSN-001',
    title: 'Architectural Design Package',
    type: 'Architectural',
    description: 'Approved architectural drawings and design documentation.',
    version: 'Rev. 03',
    date: '20 Jun 2026',
    status: 'Approved',
    document: 'architectural-design-package.pdf',
  },
  {
    id: 'DSN-002',
    title: 'Structural Design Package',
    type: 'Structural',
    description: 'Structural drawings and supporting design documentation.',
    version: 'Rev. 02',
    date: '24 Jun 2026',
    status: 'Approved',
    document: 'structural-design-package.pdf',
  },
  {
    id: 'DSN-003',
    title: 'MEP Design Drawings',
    type: 'MEP',
    description: 'Mechanical, electrical and plumbing design drawings.',
    version: 'Rev. 01',
    date: '28 Jun 2026',
    status: 'Approved',
    document: 'mep-design-drawings.pdf',
  },
]

export function Designs() {
  return (
    <div className="space-y-6">
      <Card>
        <div className="border-b border-line bg-paper-2 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                  <Ruler className="h-4 w-4 text-ink/55" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                    Digital Property Passport
                  </p>

                  <h1 className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-ink">
                    Designs
                  </h1>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/50">
                Architectural, structural and related design records retained
                as part of the permanent project archive.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <FileCheck2 className="h-3.5 w-3.5" />
              Passport record
            </span>
          </div>
        </div>

        <CardBody>
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryMetric
              icon={Layers3}
              label="Design packages"
              value={designs.length.toString()}
              description="Recorded design packages"
            />

            <SummaryMetric
              icon={FileCheck2}
              label="Approved"
              value={designs
                .filter((design) => design.status === 'Approved')
                .length.toString()}
              description="Approved design records"
            />

            <SummaryMetric
              icon={Ruler}
              label="Design types"
              value={new Set(designs.map((design) => design.type)).size.toString()}
              description="Architectural, structural and MEP"
            />
          </div>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          title="Project designs"
          subtitle="Design documents included in the Digital Property Passport"
        />

        <div className="divide-y divide-line">
          {designs.map((design) => (
            <div
              key={design.id}
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
                        {design.title}
                      </h2>

                      <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                        {design.status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-ink/40">
                      {design.id} · {design.type}
                    </p>

                    <p className="mt-2 max-w-xl text-xs leading-5 text-ink/50">
                      {design.description}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Version
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {design.version}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Recorded
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink/60">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {design.date}
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
          title="Design record"
          subtitle="Design documentation forms part of the project's permanent archive"
        />

        <CardBody>
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
              <FileCheck2 className="h-4 w-4 text-ink/55" />
            </div>

            <p className="text-xs leading-5 text-ink/50">
              Design records should remain linked to the project archive and
              Digital Property Passport, preserving the approved documentation
              used throughout project execution and handover.
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