import type { ComponentType } from 'react'

import {
  BadgeCheck,
  ChevronRight,
  Clock3,
  Filter,
  MapPin,
  Package,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  TrendingUp,
  Truck,
  Users,
  Warehouse,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import type { MarketSupplier } from '@/services/MarketService'
import { mockSuppliers } from '@/mocks/suppliers'

const categories = [
  'All suppliers',
  'General Materials',
  'Steel & Reinforcement',
  'Cement & Concrete',
  'Roofing',
  'Finishing',
  'Plumbing',
  'Electrical',
]

export function MarketList() {
  // Temporary data source.
  // Replace with MarketService.list() when the backend is available.
  const suppliers: MarketSupplier[] = mockSuppliers

  const verifiedSuppliers = suppliers.filter(
    (supplier) => supplier.status === 'Verified',
  )

  const averageTrust = suppliers.length
    ? Math.round(
        suppliers.reduce(
          (total, supplier) => total + supplier.trustScore,
          0,
        ) / suppliers.length,
      )
    : 0

  const listedMaterials = suppliers.reduce(
    (total, supplier) => total + supplier.products,
    0,
  )

  const activeDeliveries = suppliers.reduce(
    (total, supplier) => total + supplier.deliveries,
    0,
  )

  return (
    <div className="space-y-6">
      {/* ================================================================
          MARKETPLACE HERO
      ================================================================ */}
      <Card className="group relative overflow-hidden border-0 bg-[#0B1220] text-white shadow-[0_20px_60px_rgba(11,18,32,0.12)]">
        {/* Ambient lighting */}
        <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#1657FF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-[#34A6FF]/10 blur-3xl" />

        {/* Fine grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />

        <div className="relative px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] shadow-inner">
                  <Warehouse className="h-5 w-5 text-[#34A6FF]" />
                </div>

                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Build OS · Procurement Network
                  </p>

                  <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Supplier Market
                  </h1>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-6 text-white/55 sm:text-[15px]">
                Discover verified construction material suppliers, evaluate
                procurement reliability and source approved materials across
                the Build OS ecosystem.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <HeroSignal
                  icon={BadgeCheck}
                  label={`${verifiedSuppliers.length} verified suppliers`}
                />

                <HeroSignal
                  icon={Package}
                  label={`${listedMaterials} listed materials`}
                />

                <HeroSignal
                  icon={ShieldCheck}
                  label={`${averageTrust}/100 average trust`}
                />
              </div>
            </div>

            <button
              type="button"
              className="group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-[#0B1220] shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:bg-white/95"
            >
              <Package className="h-4 w-4" />
              Browse materials
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/button:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Marketplace metrics */}
        <div className="relative grid border-t border-white/10 sm:grid-cols-2 xl:grid-cols-4">
          <MarketplaceMetric
            icon={Users}
            label="Marketplace suppliers"
            value={suppliers.length.toString()}
            description="Active supplier profiles"
            dark
          />

          <MarketplaceMetric
            icon={BadgeCheck}
            label="Verified suppliers"
            value={verifiedSuppliers.length.toString()}
            description="Approved for procurement"
            dark
          />

          <MarketplaceMetric
            icon={Package}
            label="Listed materials"
            value={listedMaterials.toString()}
            description="Across supplier catalogues"
            dark
          />

          <MarketplaceMetric
            icon={ShieldCheck}
            label="Average trust"
            value={`${averageTrust}/100`}
            description="Marketplace reliability score"
            dark
          />
        </div>
      </Card>

      {/* ================================================================
          SEARCH & DISCOVERY
      ================================================================ */}
      <Card className="border-line/80 shadow-[0_8px_30px_rgba(11,18,32,0.035)]">
        <CardBody>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-2xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

              <input
                type="search"
                placeholder="Search suppliers, materials, categories or locations..."
                className="h-12 w-full rounded-2xl border border-line bg-paper-2/70 pl-11 pr-4 text-sm text-ink outline-none transition-all placeholder:text-ink/30 hover:border-ink/15 focus:border-[#1657FF]/40 focus:bg-white focus:ring-4 focus:ring-[#1657FF]/5"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-white px-4 text-xs font-semibold text-ink/60 transition-all hover:border-ink/15 hover:bg-paper-2 hover:text-ink"
              >
                <Filter className="h-3.5 w-3.5" />
                Filters
              </button>

              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-white px-4 text-xs font-semibold text-ink/60 transition-all hover:border-ink/15 hover:bg-paper-2 hover:text-ink"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Sort by trust
              </button>
            </div>
          </div>

          <div className="mt-5 border-t border-line pt-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((category, index) => (
                <button
                  key={category}
                  type="button"
                  className={
                    index === 0
                      ? 'shrink-0 rounded-full bg-[#0B1220] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#111b2f]'
                      : 'shrink-0 rounded-full border border-line bg-white px-4 py-2 text-xs font-medium text-ink/50 transition-all hover:border-ink/15 hover:bg-paper-2 hover:text-ink'
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ================================================================
          CONTENT
      ================================================================ */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Supplier grid */}
        <div className="space-y-5 xl:col-span-2">
          <div className="flex items-end justify-between gap-4 px-1">
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#1657FF]/70">
                Supplier network
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
                Marketplace suppliers
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Browse suppliers available for Build OS procurement.
              </p>
            </div>

            <span className="shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-[10px] font-semibold text-ink/50 shadow-sm">
              {suppliers.length} suppliers
            </span>
          </div>

          {suppliers.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {suppliers.map((supplier) => (
                <SupplierCard
                  key={supplier.id}
                  supplier={supplier}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardBody>
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-2">
                    <Package className="h-5 w-5 text-ink/25" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-ink">
                    No suppliers available
                  </h3>

                  <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-ink/40">
                    Supplier profiles will appear here once they are
                    available.
                  </p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        {/* ================================================================
            MARKETPLACE INTELLIGENCE
        ================================================================ */}
        <div className="space-y-6">
          {/* Trust */}
          <Card className="overflow-hidden">
            <div className="border-b border-line bg-paper-2 px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                    Network intelligence
                  </p>

                  <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                    Marketplace trust
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1657FF]/8 text-[#1657FF]">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>

              <p className="mt-1 text-xs text-ink/40">
                Supplier reliability indicators
              </p>
            </div>

            <CardBody>
              <div className="flex justify-center">
                <TrustRing score={averageTrust} />
              </div>

              <div className="mt-5 flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/8 px-3 py-1.5 text-[10px] font-semibold text-emerald-700">
                  <TrendingUp className="h-3 w-3" />
                  Strong marketplace standing
                </span>
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-ink/45">
                Trust is influenced by supplier verification, delivery
                performance, catalogue quality, client feedback and compliance.
              </p>
            </CardBody>
          </Card>

          {/* Procurement protection */}
          <Card>
            <CardHeader
              title="Procurement protection"
              subtitle="How supplier transactions are controlled"
            />

            <CardBody>
              <div className="space-y-1">
                <ProtectionStep
                  number="01"
                  icon={BadgeCheck}
                  title="Verified suppliers"
                  description="Business credentials are reviewed before marketplace participation."
                />

                <ProtectionStep
                  number="02"
                  icon={Package}
                  title="Approved catalogue"
                  description="Materials and supplier availability support procurement requests."
                />

                <ProtectionStep
                  number="03"
                  icon={Truck}
                  title="Delivery evidence"
                  description="Material delivery is verified before payment can proceed."
                />

                <ProtectionStep
                  number="04"
                  icon={ShieldCheck}
                  title="Controlled release"
                  description="Funds follow Build OS procurement and verification rules."
                />
              </div>
            </CardBody>
          </Card>

          {/* Activity */}
          <Card>
            <CardHeader
              title="Marketplace activity"
              subtitle="Current supplier ecosystem"
            />

            <CardBody>
              <div className="space-y-4">
                <ActivityMetric
                  label="Verified suppliers"
                  value={`${verifiedSuppliers.length}/${suppliers.length}`}
                />

                <ActivityMetric
                  label="Materials available"
                  value={listedMaterials.toString()}
                />

                <ActivityMetric
                  label="Active deliveries"
                  value={activeDeliveries.toString()}
                />

                <ActivityMetric
                  label="Delivery coverage"
                  value="Nationwide"
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   HERO SIGNAL
========================================================================== */

function HeroSignal({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 backdrop-blur-sm">
      <Icon className="h-3.5 w-3.5 text-[#34A6FF]" />

      <span className="text-[10px] font-medium text-white/55">
        {label}
      </span>
    </div>
  )
}

/* ==========================================================================
   SUPPLIER CARD
========================================================================== */

function SupplierCard({
  supplier,
}: {
  supplier: MarketSupplier
}) {
  const verified = supplier.status === 'Verified'

  return (
    <Card className="group relative overflow-hidden border-line/80 transition-all duration-300 hover:-translate-y-1 hover:border-[#1657FF]/15 hover:shadow-[0_18px_45px_rgba(11,18,32,0.08)]">
      {/* Hover accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1657FF]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardBody className="p-5 sm:p-6">
        {/* Identity */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3.5">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B1220] text-xs font-bold tracking-wide text-white shadow-[0_8px_20px_rgba(11,18,32,0.15)]">
              {supplier.initials}

              {verified && (
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#1657FF]">
                  <BadgeCheck className="h-2.5 w-2.5 text-white" />
                </span>
              )}
            </div>

            <div className="min-w-0 pt-0.5">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate text-sm font-semibold tracking-[-0.01em] text-ink">
                  {supplier.name}
                </h3>
              </div>

              <p className="mt-1 text-xs text-ink/40">
                {supplier.category}
              </p>
            </div>
          </div>

          <TrustBadge score={supplier.trustScore} />
        </div>

        {/* Location */}
        <div className="mt-5 flex items-center gap-2 text-xs text-ink/45">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-paper-2">
            <MapPin className="h-3.5 w-3.5 text-ink/40" />
          </div>

          <span>{supplier.location}</span>
        </div>

        {/* Metrics */}
        <div className="mt-5 grid grid-cols-3 rounded-2xl border border-line bg-paper-2/55 py-3.5">
          <SupplierMetric
            label="Rating"
            value={supplier.rating.toString()}
            icon={Star}
          />

          <SupplierMetric
            label="Products"
            value={supplier.products.toString()}
            icon={Package}
          />

          <SupplierMetric
            label="Delivery"
            value={`${supplier.onTimeDelivery}%`}
            icon={Clock3}
          />
        </div>

        {/* Specialties */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
              Specialties
            </p>

            {supplier.specialties.length > 4 && (
              <span className="text-[9px] font-medium text-ink/30">
                +{supplier.specialties.length - 4} more
              </span>
            )}
          </div>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {supplier.specialties.slice(0, 4).map((specialty) => (
              <span
                key={specialty}
                className="rounded-full border border-line bg-white px-2.5 py-1.5 text-[10px] font-medium text-ink/50 transition-colors group-hover:border-ink/10"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <div className="flex min-w-0 items-center gap-1.5 text-[10px] font-medium text-ink/40">
            <Truck className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {supplier.deliveryCoverage}
            </span>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-semibold text-ink/55 transition-all hover:bg-paper-2 hover:text-ink"
          >
            View supplier

            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </CardBody>
    </Card>
  )
}

/* ==========================================================================
   TRUST RING
========================================================================== */

function TrustRing({
  score,
}: {
  score: number
}) {
  const safeScore = Math.min(Math.max(score, 0), 100)

  return (
    <div
      className="relative flex h-36 w-36 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(#1657FF ${safeScore}%, rgba(11,18,32,0.06) ${safeScore}% 100%)`,
      }}
    >
      <div className="absolute inset-[9px] flex flex-col items-center justify-center rounded-full bg-white shadow-inner">
        <p className="font-display text-3xl font-bold tracking-tight text-ink">
          {safeScore}
        </p>

        <p className="mt-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-ink/35">
          Average trust
        </p>
      </div>
    </div>
  )
}

/* ==========================================================================
   MARKETPLACE METRIC
========================================================================== */

function MarketplaceMetric({
  icon: Icon,
  label,
  value,
  description,
  dark = false,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  dark?: boolean
}) {
  return (
    <div
      className={
        dark
          ? 'border-b border-white/10 px-6 py-5 last:border-b-0 sm:px-7 sm:nth-[3]:border-b-0 xl:border-b-0 xl:border-r xl:last:border-r-0'
          : 'px-6 py-5 sm:px-7'
      }
    >
      <div className="flex items-center gap-3">
        <div
          className={
            dark
              ? 'flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]'
              : 'flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5'
          }
        >
          <Icon
            className={
              dark
                ? 'h-4 w-4 text-[#34A6FF]'
                : 'h-4 w-4 text-ink/55'
            }
          />
        </div>

        <div>
          <p
            className={
              dark
                ? 'text-[9px] font-semibold uppercase tracking-[0.14em] text-white/30'
                : 'text-[10px] font-semibold uppercase tracking-wide text-ink/35'
            }
          >
            {label}
          </p>

          <p
            className={
              dark
                ? 'mt-0.5 font-display text-xl font-semibold text-white'
                : 'mt-0.5 font-display text-xl font-semibold text-ink'
            }
          >
            {value}
          </p>
        </div>
      </div>

      <p
        className={
          dark
            ? 'mt-3 text-[10px] text-white/35'
            : 'mt-3 text-xs text-ink/40'
        }
      >
        {description}
      </p>
    </div>
  )
}

/* ==========================================================================
   SUPPLIER METRIC
========================================================================== */

function SupplierMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: ComponentType<{ className?: string }>
}) {
  return (
    <div className="border-r border-line px-3 first:pl-3 last:border-r-0 last:pr-3">
      <div className="flex items-center gap-1 text-ink/30">
        <Icon className="h-3 w-3" />

        <span className="text-[8px] font-semibold uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>

      <p className="mt-1.5 text-sm font-semibold text-ink">
        {value}
      </p>
    </div>
  )
}

/* ==========================================================================
   TRUST BADGE
========================================================================== */

function TrustBadge({
  score,
}: {
  score: number
}) {
  const className =
    score >= 90
      ? 'border-emerald-500/15 bg-emerald-500/8 text-emerald-700'
      : score >= 75
        ? 'border-amber-500/15 bg-amber-500/8 text-amber-700'
        : 'border-rose-500/15 bg-rose-500/8 text-rose-700'

  return (
    <div
      className={`shrink-0 rounded-xl border px-2.5 py-2 text-center ${className}`}
    >
      <p className="text-[8px] font-semibold uppercase tracking-[0.12em]">
        Trust
      </p>

      <p className="mt-0.5 font-display text-sm font-bold">
        {score}
      </p>
    </div>
  )
}

/* ==========================================================================
   PROTECTION STEP
========================================================================== */

function ProtectionStep({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: string
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="group/step flex gap-3.5 rounded-2xl px-2 py-3 transition-colors hover:bg-paper-2/70">
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#1657FF]/10 bg-[#1657FF]/5">
        <Icon className="h-4 w-4 text-[#1657FF]" />

        <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full border border-white bg-[#0B1220] px-1 font-mono text-[7px] font-bold text-white">
          {number}
        </span>
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-ink">
          {title}
        </p>

        <p className="mt-1 text-[11px] leading-5 text-ink/45">
          {description}
        </p>
      </div>
    </div>
  )
}

/* ==========================================================================
   ACTIVITY METRIC
========================================================================== */

function ActivityMetric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-ink/45">
        {label}
      </span>

      <span className="font-display text-sm font-semibold text-ink">
        {value}
      </span>
    </div>
  )
}