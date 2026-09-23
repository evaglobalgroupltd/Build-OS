import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Home,
  MapPin,
  ShieldCheck,
  Tag,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Property Overview — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * Summary of the property and its status.
 *
 * TODO:
 * - Replace static property data with API-backed property information.
 * - Link property details to the project's primary property record.
 * - Add verified property metadata when the backend model is defined.
 * - Calculate project/property status from live Passport records.
 */

const property = {
  name: 'Project Property',
  propertyId: 'PROP-001',
  type: 'Residential Property',
  location: 'Project Location',
  status: 'Under Development',
  startDate: '05 May 2026',
  expectedCompletion: 'December 2026',
}

const statusItems = [
  {
    label: 'Ownership',
    status: 'Verified',
    icon: ShieldCheck,
  },
  {
    label: 'Land Documents',
    status: 'Verified',
    icon: FileCheck2,
  },
  {
    label: 'Designs',
    status: 'Verified',
    icon: CheckCircle2,
  },
  {
    label: 'Inspections',
    status: 'Review',
    icon: ClipboardCheck,
  },
  {
    label: 'Handover',
    status: 'Pending',
    icon: FileCheck2,
  },
]

export function PropertyOverview() {
  const verifiedItems = statusItems.filter(
    (item) => item.status === 'Verified',
  ).length

  const reviewItems = statusItems.filter(
    (item) => item.status === 'Review',
  ).length

  const pendingItems = statusItems.filter(
    (item) => item.status === 'Pending',
  ).length

  const completion = Math.round(
    (verifiedItems / statusItems.length) * 100,
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
              Property Overview
            </h1>

            <span className="rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-semibold text-ink/50 shadow-sm">
              {property.propertyId}
            </span>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/50">
            The executive reference for the property, its identifying
            information, lifecycle position and current Passport integrity.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-amber-500/15 bg-amber-500/[0.06] px-3.5 py-2 text-xs font-semibold text-amber-700 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          {property.status}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Property hero                                                        */}
      {/* ------------------------------------------------------------------ */}

      <Card className="relative overflow-hidden border-[#0B1220] bg-[#0B1220] text-white shadow-[0_20px_60px_rgba(11,18,32,0.14)]">
        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#1657FF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#34A6FF]/10 blur-3xl" />

        <CardBody className="relative">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                  <Home className="h-5 w-5 text-[#34A6FF]" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Property record
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-white/55">
                    {property.propertyId}
                  </p>
                </div>
              </div>

              <h2 className="mt-6 font-display text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                {property.name}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/45">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-white/30" />
                  {property.location}
                </span>

                <span className="h-1 w-1 rounded-full bg-white/20" />

                <span>{property.type}</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <HeroChip
                  icon={ShieldCheck}
                  label={`${verifiedItems} verified`}
                  tone="green"
                />

                <HeroChip
                  icon={ClipboardCheck}
                  label={`${reviewItems} in review`}
                  tone="amber"
                />

                <HeroChip
                  icon={FileText}
                  label={`${pendingItems} pending`}
                  tone="neutral"
                />
              </div>
            </div>

            <div className="flex justify-start lg:justify-end">
              <div
                className="relative flex h-40 w-40 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#1657FF ${completion}%, rgba(255,255,255,0.08) 0)`,
                }}
              >
                <div className="absolute inset-[9px] flex flex-col items-center justify-center rounded-full bg-[#0B1220]">
                  <span className="font-display text-4xl font-semibold tracking-tight text-white">
                    {completion}%
                  </span>

                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    Passport
                  </span>

                  <span className="mt-0.5 text-[9px] font-medium text-white/25">
                    verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Property identity                                                    */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DetailCard
          icon={Home}
          label="Property"
          value={property.name}
          accent="blue"
        />

        <DetailCard
          icon={Tag}
          label="Property ID"
          value={property.propertyId}
          accent="ink"
        />

        <DetailCard
          icon={MapPin}
          label="Location"
          value={property.location}
          accent="blue"
        />

        <DetailCard
          icon={Home}
          label="Property type"
          value={property.type}
          accent="ink"
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Status overview                                                      */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader
            title="Property status"
            subtitle="Current position within the project lifecycle"
          />

          <CardBody>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                  Current status
                </p>

                <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                  {property.status}
                </p>

                <p className="mt-2 max-w-sm text-xs leading-5 text-ink/40">
                  The property remains in active development with selected
                  Passport areas already verified.
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-500/10 bg-amber-500/[0.07]">
                <Home className="h-5 w-5 text-amber-600" />
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <DateItem
                icon={CalendarDays}
                label="Project start"
                value={property.startDate}
              />

              <DateItem
                icon={CalendarDays}
                label="Expected completion"
                value={property.expectedCompletion}
              />
            </div>
          </CardBody>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader
            title="Passport status"
            subtitle="Integrity of the property's core records"
          />

          <CardBody>
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="font-display text-3xl font-semibold tracking-tight text-ink">
                  {completion}%
                </p>

                <p className="mt-1 text-xs text-ink/40">
                  {verifiedItems} of {statusItems.length} core areas verified
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1657FF]/10 bg-[#1657FF]/[0.06]">
                <ShieldCheck className="h-5 w-5 text-[#1657FF]" />
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-ink/5">
              <div
                className="h-full rounded-full bg-[#1657FF] transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                {verifiedItems} verified
              </span>

              <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                {reviewItems} review
              </span>

              <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[10px] font-semibold text-ink/45">
                {pendingItems} pending
              </span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Record status                                                        */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Record status"
          subtitle="Principal areas contributing to the Digital Property Passport"
        />

        <div className="divide-y divide-line">
          {statusItems.map((item, index) => {
            const Icon = item.icon
            const isVerified = item.status === 'Verified'
            const isReview = item.status === 'Review'

            return (
              <div
                key={item.label}
                className="group relative px-6 py-5 transition-all duration-200 hover:bg-[#1657FF]/[0.025] sm:px-7"
              >
                <div
                  className={`absolute inset-y-0 left-0 w-0.5 ${
                    isVerified
                      ? 'bg-emerald-500'
                      : isReview
                        ? 'bg-amber-500'
                        : 'bg-ink/20'
                  } opacity-0 transition-opacity group-hover:opacity-100`}
                />

                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="relative shrink-0">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
                          isVerified
                            ? 'border-emerald-500/10 bg-emerald-500/[0.06]'
                            : isReview
                              ? 'border-amber-500/10 bg-amber-500/[0.07]'
                              : 'border-line bg-paper-2'
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            isVerified
                              ? 'text-emerald-600'
                              : isReview
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
                      <p className="text-sm font-semibold text-ink">
                        {item.label}
                      </p>

                      <p className="mt-1 text-xs text-ink/35">
                        Digital Property Passport record
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <StatusBadge status={item.status} />

                    <ChevronRight className="hidden h-4 w-4 text-ink/20 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1657FF]/60 sm:block" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Property record                                                      */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Property record"
          subtitle="Permanent property information"
        />

        <CardBody>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#1657FF]/10 bg-[#1657FF]/[0.06]">
              <FileCheck2 className="h-4 w-4 text-[#1657FF]" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">
                Executive property reference
              </p>

              <p className="mt-1.5 max-w-3xl text-xs leading-5 text-ink/45">
                The Property Overview provides the high-level reference for
                the build and its Digital Property Passport. Detailed
                ownership, land, design, inspection, contract, procurement,
                payment and handover records remain in their respective
                Passport sections.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1657FF]/10 bg-[#1657FF]/[0.035] px-3 py-1.5 text-[10px] font-semibold text-[#1657FF]">
                  <ShieldCheck className="h-3 w-3" />
                  Passport record
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-2 px-3 py-1.5 text-[10px] font-semibold text-ink/40">
                  {property.propertyId}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2.5 text-xs font-semibold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#1657FF]/20 hover:bg-[#1657FF]/[0.03] hover:text-[#1657FF]"
            >
              Passport record
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </CardBody>
      </Card>

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
              Permanent Digital Property Passport
            </p>

            <p className="mt-1.5 max-w-3xl text-xs leading-5 text-ink/45">
              This overview remains the high-level property reference while
              detailed records are maintained across the individual Passport
              sections throughout the property's lifecycle.
            </p>
          </div>

          <div className="sm:ml-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1657FF]/10 bg-white px-3 py-1.5 text-[10px] font-semibold text-[#1657FF] shadow-sm">
              <ShieldCheck className="h-3 w-3" />
              Record integrity
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

function DetailCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  accent: 'blue' | 'ink'
}) {
  return (
    <div className="group rounded-[18px] border border-line bg-paper-2 px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_35px_rgba(11,18,32,0.06)]">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${
            accent === 'blue'
              ? 'bg-[#1657FF]/[0.06] text-[#1657FF]'
              : 'bg-ink/5 text-ink/40'
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/30">
          {label}
        </p>
      </div>

      <p className="mt-3 truncate text-sm font-semibold text-ink">{value}</p>
    </div>
  )
}

function DateItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-[16px] border border-line bg-paper-2 px-4 py-3.5 transition-colors hover:bg-white">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-ink/30" />

        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/30">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
    </div>
  )
}

function HeroChip({
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

function StatusBadge({
  status,
}: {
  status: 'Verified' | 'Review' | 'Pending'
}) {
  const isVerified = status === 'Verified'
  const isReview = status === 'Review'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        isVerified
          ? 'bg-emerald-500/10 text-emerald-700'
          : isReview
            ? 'bg-amber-500/10 text-amber-700'
            : 'bg-ink/5 text-ink/45'
      }`}
    >
      {isVerified ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : isReview ? (
        <ClipboardCheck className="h-3 w-3" />
      ) : (
        <FileText className="h-3 w-3" />
      )}

      {status}
    </span>
  )
}