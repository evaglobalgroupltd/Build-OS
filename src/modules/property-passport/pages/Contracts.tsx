import {
  CalendarDays,
  ChevronRight,
  Download,
  FileCheck2,
  FileText,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Contracts — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * Contracts signed across the project.
 *
 * BRD support:
 * - Digital Property Passport contains contracts.
 * - Completed projects compile project records into the passport.
 *
 * TODO:
 * - Replace static data with API-backed contract records.
 * - Add document preview/download.
 * - Add contract signing / execution workflow when supported by backend.
 */

const contracts = [
  {
    id: 'CON-001',
    title: 'Main Construction Contract',
    party: 'Contractor',
    counterparty: 'Client / Project Owner',
    value: '₦185,000,000',
    signedDate: '12 Jun 2026',
    status: 'Executed',
    document: 'main-construction-contract.pdf',
  },
  {
    id: 'CON-002',
    title: 'Project Management Agreement',
    party: 'Project Manager',
    counterparty: 'Client / Project Owner',
    value: '₦6,500,000',
    signedDate: '15 Jun 2026',
    status: 'Executed',
    document: 'project-management-agreement.pdf',
  },
  {
    id: 'CON-003',
    title: 'Professional Services Agreement',
    party: 'Professional Expert',
    counterparty: 'Client / Project Owner',
    value: '₦4,200,000',
    signedDate: '18 Jun 2026',
    status: 'Executed',
    document: 'professional-services-agreement.pdf',
  },
]

export function Contracts() {
  return (
    <div className="space-y-6">
      <Card>
        <div className="border-b border-line bg-paper-2 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                  <FileCheck2 className="h-4 w-4 text-ink/55" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                    Digital Property Passport
                  </p>

                  <h1 className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-ink">
                    Contracts
                  </h1>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/50">
                Signed contracts and project agreements retained as part of the
                permanent project record.
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
              label="Contracts"
              value={contracts.length.toString()}
              description="Project agreements"
            />

            <SummaryMetric
              icon={FileCheck2}
              label="Executed"
              value={contracts
                .filter((contract) => contract.status === 'Executed')
                .length.toString()}
              description="Signed and recorded"
            />

            <SummaryMetric
              icon={Users}
              label="Parties"
              value="3"
              description="Contracting roles"
            />
          </div>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          title="Project contracts"
          subtitle="Contracts and agreements included in the property passport"
        />

        <div className="divide-y divide-line">
          {contracts.map((contract) => (
            <div
              key={contract.id}
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
                        {contract.title}
                      </h2>

                      <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                        {contract.status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-ink/40">
                      {contract.id}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/45">
                      <span>
                        <span className="font-medium text-ink/60">
                          Party:
                        </span>{' '}
                        {contract.party}
                      </span>

                      <span>
                        <span className="font-medium text-ink/60">
                          Counterparty:
                        </span>{' '}
                        {contract.counterparty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Contract value
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {contract.value}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Signed
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink/60">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {contract.signedDate}
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
          subtitle="Contract documents form part of the project's permanent archive"
        />

        <CardBody>
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
              <FileCheck2 className="h-4 w-4 text-ink/55" />
            </div>

            <p className="text-xs leading-5 text-ink/50">
              Contract records should remain linked to the project archive and
              Digital Property Passport alongside project, procurement,
              inspection, payment, warranty and handover records.
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