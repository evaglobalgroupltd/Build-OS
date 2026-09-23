import {
  ArrowUpRight,
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

  const verifiedPercentage = Math.round(
    (verified / procurementRecords.length) * 100,
  )

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* Page header                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1657FF]">
              Digital Property Passport
            </p>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl">
              Procurement
            </h1>

            <span className="rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-semibold text-ink/50 shadow-sm">
              {procurementRecords.length} records
            </span>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/50">
            A permanent record of materials procured throughout the build,
            including quantities, delivery state, suppliers and supporting
            documentation.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/[0.06] px-3.5 py-2 text-xs font-semibold text-emerald-700 shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5" />
          Passport record
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Procurement overview                                                */}
      {/* ------------------------------------------------------------------ */}

      <Card className="relative overflow-hidden border-[#0B1220] bg-[#0B1220] text-white shadow-[0_20px_60px_rgba(11,18,32,0.14)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1657FF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#34A6FF]/10 blur-3xl" />

        <CardBody className="relative">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                  <Package className="h-4 w-4 text-[#34A6FF]" />
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  Material intelligence
                </p>
              </div>

              <h2 className="mt-5 max-w-xl font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Procurement activity retained as part of the permanent
                property record.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
                Every recorded material contributes to the property's
                historical procurement trail, providing a clear reference
                across ordering, delivery and verification.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <OverviewChip
                  icon={CheckCircle2}
                  label={`${verified} verified`}
                  tone="green"
                />

                <OverviewChip
                  icon={Truck}
                  label={`${delivered} delivered`}
                  tone="blue"
                />

                <OverviewChip
                  icon={Package}
                  label={`${ordered} ordered`}
                  tone="amber"
                />
              </div>
            </div>

            <div className="flex items-center justify-center lg:pr-4">
              <div
                className="relative flex h-36 w-36 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#1657FF ${verifiedPercentage}%, rgba(255,255,255,0.08) 0)`,
                }}
              >
                <div className="absolute inset-[9px] flex flex-col items-center justify-center rounded-full bg-[#0B1220]">
                  <span className="font-display text-3xl font-semibold tracking-tight text-white">
                    {verifiedPercentage}%
                  </span>

                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Summary metrics                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryMetric
          icon={ClipboardList}
          label="Records"
          value={procurementRecords.length.toString()}
          description="Procurement records"
          accent="blue"
        />

        <SummaryMetric
          icon={FileCheck2}
          label="Verified"
          value={verified.toString()}
          description={`${verifiedPercentage}% of recorded materials`}
          accent="green"
        />

        <SummaryMetric
          icon={Truck}
          label="Delivery status"
          value={`${delivered} delivered`}
          description={`${ordered} currently ordered`}
          accent="amber"
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Procurement history                                                 */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Procurement history"
          subtitle="Materials procured throughout the project lifecycle"
        />

        <div className="divide-y divide-line">
          {procurementRecords.map((record, index) => {
            const isVerified = record.status === 'Verified'
            const isDelivered = record.status === 'Delivered'

            return (
              <div
                key={record.id}
                className="group relative px-6 py-5 transition-all duration-200 hover:bg-[#1657FF]/[0.025] sm:px-7"
              >
                <div
                  className={`absolute inset-y-0 left-0 w-0.5 transition-opacity ${
                    isVerified
                      ? 'bg-emerald-500'
                      : isDelivered
                        ? 'bg-[#1657FF]'
                        : 'bg-amber-500'
                  } opacity-0 group-hover:opacity-100`}
                />

                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  {/* Identity */}
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="relative shrink-0">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
                          isVerified
                            ? 'border-emerald-500/10 bg-emerald-500/[0.07]'
                            : isDelivered
                              ? 'border-[#1657FF]/10 bg-[#1657FF]/[0.06]'
                              : 'border-amber-500/10 bg-amber-500/[0.07]'
                        }`}
                      >
                        {isVerified ? (
                          <FileCheck2 className="h-4 w-4 text-emerald-600" />
                        ) : isDelivered ? (
                          <Truck className="h-4 w-4 text-[#1657FF]" />
                        ) : (
                          <Package className="h-4 w-4 text-amber-600" />
                        )}
                      </div>

                      <span className="absolute -bottom-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#0B1220] px-1 text-[8px] font-bold text-white">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-semibold text-ink">
                          {record.material}
                        </h2>

                        <StatusBadge status={record.status} />
                      </div>

                      <p className="mt-1.5 text-xs text-ink/40">
                        {record.id} · {record.supplier}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-line bg-paper-2 px-2.5 py-1 text-[10px] font-semibold text-ink/50">
                          Material record
                        </span>

                        <span className="rounded-full border border-line bg-paper-2 px-2.5 py-1 text-[10px] font-semibold text-ink/50">
                          {record.quantity}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Record metadata */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center xl:justify-end">
                    <div className="min-w-[130px]">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                        Quantity
                      </p>

                      <p className="mt-1 text-sm font-semibold text-ink">
                        {record.quantity}
                      </p>
                    </div>

                    <div className="min-w-[130px]">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                        Recorded
                      </p>

                      <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink/60">
                        <CalendarDays className="h-3.5 w-3.5 text-ink/35" />
                        {record.date}
                      </p>
                    </div>

                    {record.document ? (
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-3.5 py-2.5 text-xs font-semibold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#1657FF]/20 hover:bg-[#1657FF]/[0.03] hover:text-[#1657FF]"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Record
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    ) : (
                      <span className="inline-flex items-center justify-center rounded-full border border-dashed border-line px-3.5 py-2.5 text-xs font-medium text-ink/30">
                        No document
                      </span>
                    )}

                    <ChevronRight className="hidden h-4 w-4 text-ink/20 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1657FF]/60 xl:block" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Supporting record panels                                            */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader
            title="Material record"
            subtitle="Procurement information retained for the completed property"
          />

          <CardBody>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#1657FF]/10 bg-[#1657FF]/[0.06]">
                <Package className="h-4 w-4 text-[#1657FF]" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Construction material history
                </p>

                <p className="mt-1.5 text-xs leading-5 text-ink/45">
                  Procurement records provide a historical reference for
                  materials acquired during the construction lifecycle and
                  remain linked to the completed property record.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1657FF]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Permanent property reference
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader
            title="Supporting records"
            subtitle="Procurement documents retained in the Passport"
          />

          <CardBody>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.06]">
                <FileCheck2 className="h-4 w-4 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Documentary evidence
                </p>

                <p className="mt-1.5 text-xs leading-5 text-ink/45">
                  Procurement documentation should remain available alongside
                  the corresponding material record within the Digital Property
                  Passport.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Record integrity maintained
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Permanent record notice                                              */}
      {/* ------------------------------------------------------------------ */}

      <div className="rounded-[22px] border border-[#1657FF]/10 bg-[#1657FF]/[0.035] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-[#1657FF]/10">
            <ShieldCheck className="h-4 w-4 text-[#1657FF]" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">
              Permanent procurement record
            </p>

            <p className="mt-1.5 max-w-3xl text-xs leading-5 text-ink/45">
              Procurement records form part of the property's Digital Property
              Passport and should remain available as a historical reference
              for materials acquired throughout the project lifecycle.
            </p>
          </div>

          <div className="sm:ml-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1657FF]/10 bg-white px-3 py-1.5 text-[10px] font-semibold text-[#1657FF] shadow-sm">
              <ShieldCheck className="h-3 w-3" />
              Passport record
            </span>
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
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  accent: 'blue' | 'green' | 'amber'
}) {
  const styles = {
    blue: {
      icon: 'border-[#1657FF]/10 bg-[#1657FF]/[0.06] text-[#1657FF]',
      value: 'text-[#1657FF]',
    },
    green: {
      icon: 'border-emerald-500/10 bg-emerald-500/[0.06] text-emerald-600',
      value: 'text-emerald-700',
    },
    amber: {
      icon: 'border-amber-500/10 bg-amber-500/[0.06] text-amber-600',
      value: 'text-amber-700',
    },
  }

  const current = styles[accent]

  return (
    <div className="group rounded-[18px] border border-line bg-paper-2 px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_35px_rgba(11,18,32,0.06)]">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${current.icon}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/30">
            {label}
          </p>

          <p
            className={`mt-0.5 truncate font-display text-xl font-semibold tracking-tight ${current.value}`}
          >
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink/40">{description}</p>
    </div>
  )
}

function OverviewChip({
  icon: Icon,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  tone: 'blue' | 'green' | 'amber'
}) {
  const styles = {
    blue: 'border-[#34A6FF]/15 bg-[#34A6FF]/10 text-[#8ACBFF]',
    green: 'border-emerald-400/15 bg-emerald-400/10 text-emerald-300',
    amber: 'border-amber-400/15 bg-amber-400/10 text-amber-300',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold ${styles[tone]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  )
}

function StatusBadge({ status }: { status: ProcurementStatus }) {
  const isVerified = status === 'Verified'
  const isDelivered = status === 'Delivered'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        isVerified
          ? 'bg-emerald-500/10 text-emerald-700'
          : isDelivered
            ? 'bg-[#1657FF]/10 text-[#1657FF]'
            : 'bg-amber-500/10 text-amber-700'
      }`}
    >
      {isVerified ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : isDelivered ? (
        <Truck className="h-3 w-3" />
      ) : (
        <Package className="h-3 w-3" />
      )}

      {status}
    </span>
  )
}