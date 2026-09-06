import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  ShieldCheck,
  ShieldX,
  Wrench,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Warranties — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * Warranties on materials and workmanship, retained as part of the
 * project's permanent Digital Property Passport.
 *
 * TODO:
 * - Replace static data with API-backed warranty records.
 * - Add warranty document preview/download.
 * - Add warranty detail view.
 * - Add expiry notifications when notification infrastructure exists.
 * - Add warranty claim history when the backend domain supports it.
 */

type WarrantyStatus = 'Active' | 'Expiring Soon' | 'Expired'

const warranties = [
  {
    id: 'WAR-001',
    subject: 'Structural Workmanship',
    category: 'Workmanship',
    provider: 'Project Contractor',
    startDate: '01 Aug 2026',
    expiryDate: '01 Aug 2031',
    status: 'Active' as WarrantyStatus,
    document: 'structural-workmanship-warranty.pdf',
  },
  {
    id: 'WAR-002',
    subject: 'Roofing Materials',
    category: 'Materials',
    provider: 'Approved Supplier',
    startDate: '15 Jul 2026',
    expiryDate: '15 Jul 2031',
    status: 'Active' as WarrantyStatus,
    document: 'roofing-material-warranty.pdf',
  },
  {
    id: 'WAR-003',
    subject: 'Electrical Installation',
    category: 'Workmanship',
    provider: 'Electrical Contractor',
    startDate: '20 Aug 2026',
    expiryDate: '20 Aug 2028',
    status: 'Expiring Soon' as WarrantyStatus,
    document: 'electrical-warranty.pdf',
  },
  {
    id: 'WAR-004',
    subject: 'Plumbing Installation',
    category: 'Workmanship',
    provider: 'Plumbing Contractor',
    startDate: '20 Aug 2026',
    expiryDate: '20 Aug 2028',
    status: 'Active' as WarrantyStatus,
    document: 'plumbing-warranty.pdf',
  },
]

export function Warranties() {
  const active = warranties.filter(
    (warranty) => warranty.status === 'Active',
  ).length

  const expiringSoon = warranties.filter(
    (warranty) => warranty.status === 'Expiring Soon',
  ).length

  const expired = warranties.filter(
    (warranty) => warranty.status === 'Expired',
  ).length

  return (
    <div className="space-y-6">
      <Card>
        <div className="border-b border-line bg-paper-2 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                  <ShieldCheck className="h-4 w-4 text-ink/55" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                    Digital Property Passport
                  </p>

                  <h1 className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-ink">
                    Warranties
                  </h1>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/50">
                Warranties covering materials and workmanship, retained as part
                of the property's permanent Digital Property Passport.
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
              icon={ShieldCheck}
              label="Active"
              value={active.toString()}
              description="Current warranties"
            />

            <SummaryMetric
              icon={Clock3}
              label="Expiring soon"
              value={expiringSoon.toString()}
              description="Requires attention"
            />

            <SummaryMetric
              icon={ShieldX}
              label="Expired"
              value={expired.toString()}
              description="Expired warranties"
            />
          </div>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          title="Warranty register"
          subtitle="Materials and workmanship warranties retained in the Passport"
        />

        <div className="divide-y divide-line">
          {warranties.map((warranty) => (
            <div
              key={warranty.id}
              className="px-6 py-5 transition-colors hover:bg-ink/[0.02]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      warranty.status === 'Active'
                        ? 'bg-emerald-500/10'
                        : warranty.status === 'Expiring Soon'
                          ? 'bg-amber-500/10'
                          : 'bg-ink/5'
                    }`}
                  >
                    <Wrench className="h-4 w-4 text-ink/50" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-ink">
                        {warranty.subject}
                      </h2>

                      <WarrantyStatusBadge status={warranty.status} />
                    </div>

                    <p className="mt-1 text-xs text-ink/40">
                      {warranty.id} · {warranty.category} · {warranty.provider}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Start
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink/60">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {warranty.startDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Expires
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink/60">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {warranty.expiryDate}
                    </p>
                  </div>

                  {warranty.document ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Warranty
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
            title="Warranty coverage"
            subtitle="Protection retained for materials and workmanship"
          />

          <CardBody>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <Wrench className="h-4 w-4 text-ink/55" />
              </div>

              <p className="text-xs leading-5 text-ink/50">
                Warranty records provide a permanent reference for applicable
                materials and workmanship associated with the completed
                property.
              </p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Warranty documents"
            subtitle="Supporting warranty certificates and records"
          />

          <CardBody>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <FileCheck2 className="h-4 w-4 text-ink/55" />
              </div>

              <p className="text-xs leading-5 text-ink/50">
                Warranty documentation should remain attached to its
                corresponding record so the property's Passport retains the
                evidence of applicable coverage.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function WarrantyStatusBadge({
  status,
}: {
  status: WarrantyStatus
}) {
  const styles = {
    Active: 'bg-emerald-500/10 text-emerald-700',
    'Expiring Soon': 'bg-amber-500/10 text-amber-700',
    Expired: 'bg-ink/5 text-ink/45',
  }

  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
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