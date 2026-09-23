import {
  ArrowUpRight,
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

  const activeCoverage = Math.round(
    ((active + expiringSoon) / warranties.length) * 100,
  )

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* Editorial header                                                     */}
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
            <h1 className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
              Warranties
            </h1>

            <span className="rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-semibold text-ink/50 shadow-sm">
              {warranties.length} records
            </span>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/50">
            A permanent register of warranties covering materials and
            workmanship associated with the property, including validity,
            providers and supporting documentation.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/[0.06] px-3.5 py-2 text-xs font-semibold text-emerald-700 shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5" />
          Passport record
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Warranty overview                                                    */}
      {/* ------------------------------------------------------------------ */}

      <Card className="relative overflow-hidden border-[#0B1220] bg-[#0B1220] text-white shadow-[0_20px_60px_rgba(11,18,32,0.14)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1657FF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#34A6FF]/10 blur-3xl" />

        <CardBody className="relative">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                  <ShieldCheck className="h-4 w-4 text-[#34A6FF]" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Property protection
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-white/55">
                    Warranty coverage register
                  </p>
                </div>
              </div>

              <h2 className="mt-5 max-w-xl font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Protection records retained with the property for the long
                term.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
                Warranty records preserve evidence of applicable coverage for
                construction workmanship and materials throughout the
                property's lifecycle.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <OverviewChip
                  icon={CheckCircle2}
                  label={`${active} active`}
                  tone="green"
                />

                <OverviewChip
                  icon={Clock3}
                  label={`${expiringSoon} expiring soon`}
                  tone="amber"
                />

                <OverviewChip
                  icon={ShieldX}
                  label={`${expired} expired`}
                  tone="neutral"
                />
              </div>
            </div>

            <div className="flex items-center justify-center lg:pr-4">
              <div
                className="relative flex h-36 w-36 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#1657FF ${activeCoverage}%, rgba(255,255,255,0.08) 0)`,
                }}
              >
                <div className="absolute inset-[9px] flex flex-col items-center justify-center rounded-full bg-[#0B1220]">
                  <span className="font-display text-3xl font-semibold tracking-tight text-white">
                    {activeCoverage}%
                  </span>

                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    covered
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
          icon={ShieldCheck}
          label="Active"
          value={active.toString()}
          description="Current warranty coverage"
          accent="green"
        />

        <SummaryMetric
          icon={Clock3}
          label="Expiring soon"
          value={expiringSoon.toString()}
          description="Requires attention"
          accent="amber"
        />

        <SummaryMetric
          icon={ShieldX}
          label="Expired"
          value={expired.toString()}
          description="Expired warranties"
          accent="ink"
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Warranty register                                                   */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Warranty register"
          subtitle="Materials and workmanship warranties retained in the Passport"
        />

        <div className="divide-y divide-line">
          {warranties.map((warranty, index) => {
            const isActive = warranty.status === 'Active'
            const isExpiring = warranty.status === 'Expiring Soon'

            return (
              <div
                key={warranty.id}
                className="group relative px-6 py-5 transition-all duration-200 hover:bg-[#1657FF]/[0.025] sm:px-7"
              >
                <div
                  className={`absolute inset-y-0 left-0 w-0.5 ${
                    isActive
                      ? 'bg-emerald-500'
                      : isExpiring
                        ? 'bg-amber-500'
                        : 'bg-ink/20'
                  } opacity-0 transition-opacity group-hover:opacity-100`}
                />

                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  {/* Identity */}
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="relative shrink-0">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
                          isActive
                            ? 'border-emerald-500/10 bg-emerald-500/[0.07]'
                            : isExpiring
                              ? 'border-amber-500/10 bg-amber-500/[0.07]'
                              : 'border-line bg-paper-2'
                        }`}
                      >
                        <Wrench
                          className={`h-4 w-4 ${
                            isActive
                              ? 'text-emerald-600'
                              : isExpiring
                                ? 'text-amber-600'
                                : 'text-ink/45'
                          }`}
                        />
                      </div>

                      <span className="absolute -bottom-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#0B1220] px-1 text-[8px] font-bold text-white">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-semibold text-ink">
                          {warranty.subject}
                        </h2>

                        <WarrantyStatusBadge status={warranty.status} />
                      </div>

                      <p className="mt-1.5 text-xs text-ink/40">
                        {warranty.id} · {warranty.category} ·{' '}
                        {warranty.provider}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-line bg-paper-2 px-2.5 py-1 text-[10px] font-semibold text-ink/50">
                          {warranty.category}
                        </span>

                        <span className="rounded-full border border-line bg-paper-2 px-2.5 py-1 text-[10px] font-semibold text-ink/50">
                          {warranty.provider}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Warranty metadata */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center xl:justify-end">
                    <WarrantyDate
                      label="Start"
                      value={warranty.startDate}
                    />

                    <WarrantyDate
                      label="Expires"
                      value={warranty.expiryDate}
                      emphasis={isExpiring}
                    />

                    {warranty.document ? (
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-3.5 py-2.5 text-xs font-semibold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#1657FF]/20 hover:bg-[#1657FF]/[0.03] hover:text-[#1657FF]"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Warranty
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
      {/* Supporting information                                              */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader
            title="Warranty coverage"
            subtitle="Protection retained for materials and workmanship"
          />

          <CardBody>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#1657FF]/10 bg-[#1657FF]/[0.06]">
                <Wrench className="h-4 w-4 text-[#1657FF]" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Long-term property protection
                </p>

                <p className="mt-1.5 text-xs leading-5 text-ink/45">
                  Warranty records provide a permanent reference for applicable
                  materials and workmanship associated with the completed
                  property.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1657FF]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Coverage retained
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader
            title="Warranty documents"
            subtitle="Supporting warranty certificates and records"
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
                  Warranty documentation should remain attached to its
                  corresponding record so the property's Passport retains the
                  evidence of applicable coverage.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Evidence retained
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Permanent record notice                                             */}
      {/* ------------------------------------------------------------------ */}

      <div className="rounded-[22px] border border-[#1657FF]/10 bg-[#1657FF]/[0.035] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-[#1657FF]/10">
            <ShieldCheck className="h-4 w-4 text-[#1657FF]" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">
              Permanent warranty record
            </p>

            <p className="mt-1.5 max-w-3xl text-xs leading-5 text-ink/45">
              Warranty records form part of the property's Digital Property
              Passport and should remain available as a long-term reference
              for materials and workmanship coverage throughout the property's
              lifecycle.
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
  accent: 'green' | 'amber' | 'ink'
}) {
  const styles = {
    green: {
      icon: 'border-emerald-500/10 bg-emerald-500/[0.06] text-emerald-600',
      value: 'text-emerald-700',
    },
    amber: {
      icon: 'border-amber-500/10 bg-amber-500/[0.06] text-amber-600',
      value: 'text-amber-700',
    },
    ink: {
      icon: 'border-line bg-ink/5 text-ink/45',
      value: 'text-ink',
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
  tone: 'green' | 'amber' | 'neutral'
}) {
  const styles = {
    green: 'border-emerald-400/15 bg-emerald-400/10 text-emerald-300',
    amber: 'border-amber-400/15 bg-amber-400/10 text-amber-300',
    neutral: 'border-white/10 bg-white/[0.06] text-white/50',
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

  const icons = {
    Active: CheckCircle2,
    'Expiring Soon': Clock3,
    Expired: ShieldX,
  }

  const Icon = icons[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  )
}

function WarrantyDate({
  label,
  value,
  emphasis = false,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <div className="min-w-[125px]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/30">
        {label}
      </p>

      <p
        className={`mt-1.5 flex items-center gap-1.5 text-xs font-medium ${
          emphasis ? 'text-amber-700' : 'text-ink/60'
        }`}
      >
        <CalendarDays
          className={`h-3.5 w-3.5 ${
            emphasis ? 'text-amber-500' : 'text-ink/30'
          }`}
        />
        {value}
      </p>
    </div>
  )
}