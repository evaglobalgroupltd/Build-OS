import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileCheck2,
  FileText,
  Package,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Procurement Record — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * Materials procured over the life of the build, retained as part
 * of the project's permanent Digital Property Passport.
 *
 * TODO:
 * - Replace static data with API-backed procurement records.
 * - Link records to the operational Procurement module.
 * - Add procurement document preview/download.
 * - Add supplier and delivery history when supported by the backend.
 * - Add material verification records when the domain model is defined.
 */

type ProcurementStatus = 'Delivered' | 'Ordered' | 'Verified'

const procurementRecords = [
  {
    id: 'PROC-001',
    material: 'Cement',
    quantity: '500 bags',
    supplier: 'Approved Supplier',
    date: '12 Jun 2026',
    status: 'Verified' as ProcurementStatus,
    document: 'cement-procurement-record.pdf',
  },
  {
    id: 'PROC-002',
    material: 'Reinforcement Steel',
    quantity: '12 tonnes',
    supplier: 'Approved Supplier',
    date: '25 Jun 2026',
    status: 'Delivered' as ProcurementStatus,
    document: 'reinforcement-steel-record.pdf',
  },
  {
    id: 'PROC-003',
    material: 'Floor Tiles',
    quantity: '850 m²',
    supplier: 'Approved Supplier',
    date: '08 Aug 2026',
    status: 'Verified' as ProcurementStatus,
    document: 'floor-tiles-procurement-record.pdf',
  },
  {
    id: 'PROC-004',
    material: 'Electrical Materials',
    quantity: 'Project quantity',
    supplier: 'Approved Supplier',
    date: '18 Aug 2026',
    status: 'Ordered' as ProcurementStatus,
    document: null,
  },
]

export function Procurement() {
  const verified = procurementRecords.filter(
    (record) => record.status === 'Verified',
  ).length

  const delivered = procurementRecords.filter(
    (record) => record.status === 'Delivered',
  ).length

  const ordered = procurementRecords.filter(
    (record) => record.status === 'Ordered',
  ).length

  return (
    <div className="space-y-6">
      <Card>
        <div className="border-b border-line bg-paper-2 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                  <Package className="h-4 w-4 text-ink/55" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                    Digital Property Passport
                  </p>

                  <h1 className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-ink">
                    Procurement Record
                  </h1>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/50">
                Materials procured over the life of the build, retained as
                part of the project's permanent property record.
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
              icon={ClipboardList}
              label="Records"
              value={procurementRecords.length.toString()}
              description="Procurement records"
            />

            <SummaryMetric
              icon={FileCheck2}
              label="Verified"
              value={verified.toString()}
              description="Verified material records"
            />

            <SummaryMetric
              icon={Truck}
              label="Delivery status"
              value={`${delivered} delivered`}
              description={`${ordered} currently ordered`}
            />
          </div>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          title="Procurement history"
          subtitle="Materials procured throughout the project lifecycle"
        />

        <div className="divide-y divide-line">
          {procurementRecords.map((record) => (
            <div
              key={record.id}
              className="px-6 py-5 transition-colors hover:bg-ink/[0.02]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      record.status === 'Verified'
                        ? 'bg-emerald-500/10'
                        : record.status === 'Delivered'
                          ? 'bg-emerald-500/10'
                          : 'bg-amber-500/10'
                    }`}
                  >
                    {record.status === 'Verified' ? (
                      <FileCheck2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Package className="h-4 w-4 text-ink/50" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-ink">
                        {record.material}
                      </h2>

                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                          record.status === 'Verified' ||
                          record.status === 'Delivered'
                            ? 'bg-emerald-500/10 text-emerald-700'
                            : 'bg-amber-500/10 text-amber-700'
                        }`}
                      >
                        {record.status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-ink/40">
                      {record.id} · {record.supplier}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Quantity
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {record.quantity}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Date
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink/60">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {record.date}
                    </p>
                  </div>

                  {record.document ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Record
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-line px-3 py-2 text-xs font-medium text-ink/35">
                      No document
                    </span>
                  )}

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
            title="Material record"
            subtitle="Procurement information retained for the completed property"
          />

          <CardBody>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <Package className="h-4 w-4 text-ink/55" />
              </div>

              <p className="text-xs leading-5 text-ink/50">
                Procurement records provide a historical reference for
                materials acquired during the construction lifecycle and should
                remain linked to the completed property record.
              </p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Supporting records"
            subtitle="Procurement documents retained in the Passport"
          />

          <CardBody>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <FileCheck2 className="h-4 w-4 text-ink/55" />
              </div>

              <p className="text-xs leading-5 text-ink/50">
                Procurement documentation should remain available alongside
                the corresponding material record within the Digital Property
                Passport.
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