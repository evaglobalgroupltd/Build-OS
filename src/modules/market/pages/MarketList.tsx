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
      {/* Marketplace header */}
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white">
                  <Warehouse className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                    Build OS marketplace
                  </p>

                  <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    Supplier Market
                  </h1>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/50">
                Discover verified construction material suppliers, compare
                marketplace reliability and explore approved catalogues for
                project procurement.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Package className="h-4 w-4" />
              Browse materials
            </button>
          </div>
        </div>

        {/* Marketplace metrics */}
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          <MarketplaceMetric
            icon={Users}
            label="Marketplace suppliers"
            value={suppliers.length.toString()}
            description="Active supplier profiles"
          />

          <MarketplaceMetric
            icon={BadgeCheck}
            label="Verified suppliers"
            value={verifiedSuppliers.length.toString()}
            description="Approved for procurement"
          />

          <MarketplaceMetric
            icon={Package}
            label="Listed materials"
            value={listedMaterials.toString()}
            description="Across supplier catalogues"
          />

          <MarketplaceMetric
            icon={ShieldCheck}
            label="Average trust"
            value={`${averageTrust}/100`}
            description="Marketplace reliability score"
          />
        </div>
      </Card>

      {/* Search and filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-xl">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />

              <input
                type="search"
                placeholder="Search suppliers, materials, categories or locations..."
                className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-ink/25"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-medium text-ink/60 transition-colors hover:bg-paper-2"
              >
                <Filter className="h-3.5 w-3.5" />
                Filters
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-medium text-ink/60 transition-colors hover:bg-paper-2"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Sort by trust
              </button>
            </div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={
                  index === 0
                    ? 'shrink-0 rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-white'
                    : 'shrink-0 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-medium text-ink/50 transition-colors hover:bg-paper-2 hover:text-ink'
                }
              >
                {category}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Marketplace content */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Supplier grid */}
        <div className="space-y-4 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Marketplace suppliers
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Browse suppliers available for Build OS procurement.
              </p>
            </div>

            <span className="rounded-full bg-paper-2 px-3 py-1.5 text-xs font-medium text-ink/50">
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
                <div className="py-10 text-center">
                  <Package className="mx-auto h-8 w-8 text-ink/20" />

                  <h3 className="mt-3 text-sm font-semibold text-ink">
                    No suppliers available
                  </h3>

                  <p className="mt-1 text-xs text-ink/40">
                    Supplier profiles will appear here once they are
                    available.
                  </p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Marketplace intelligence */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Marketplace trust"
              subtitle="Supplier reliability indicators"
            />

            <CardBody>
              <div className="flex items-center justify-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-[9px] border-ink/10">
                  <div className="text-center">
                    <p className="font-display text-3xl font-bold tracking-tight text-ink">
                      {averageTrust}
                    </p>

                    <p className="text-[10px] font-medium text-ink/40">
                      AVG TRUST
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Strong marketplace
                </span>
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-ink/45">
                Trust is influenced by supplier verification, delivery
                performance, catalogue quality, client feedback and compliance.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Procurement protection"
              subtitle="How supplier transactions are controlled"
            />

            <CardBody>
              <div className="space-y-4">
                <ProtectionStep
                  icon={BadgeCheck}
                  title="Verified suppliers"
                  description="Business credentials are reviewed before marketplace participation."
                />

                <ProtectionStep
                  icon={Package}
                  title="Approved catalogue"
                  description="Materials and supplier availability support procurement requests."
                />

                <ProtectionStep
                  icon={Truck}
                  title="Delivery evidence"
                  description="Material delivery is verified before payment can proceed."
                />

                <ProtectionStep
                  icon={ShieldCheck}
                  title="Controlled release"
                  description="Funds follow Build OS procurement and verification rules."
                />
              </div>
            </CardBody>
          </Card>

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

function SupplierCard({
  supplier,
}: {
  supplier: MarketSupplier
}) {
  const verified = supplier.status === 'Verified'

  return (
    <Card className="group overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-sm font-bold text-white">
              {supplier.initials}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <h3 className="truncate text-sm font-semibold text-ink">
                  {supplier.name}
                </h3>

                {verified && (
                  <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                )}
              </div>

              <p className="mt-1 text-xs text-ink/45">
                {supplier.category}
              </p>
            </div>
          </div>

          <TrustBadge score={supplier.trustScore} />
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-xs text-ink/45">
          <MapPin className="h-3.5 w-3.5" />
          {supplier.location}
        </div>

        <div className="mt-5 grid grid-cols-3 border-y border-line py-4">
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

        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            Specialties
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {supplier.specialties.slice(0, 4).map((specialty) => (
              <span
                key={specialty}
                className="rounded-full bg-paper-2 px-2.5 py-1 text-[10px] font-medium text-ink/55"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <div className="flex items-center gap-1.5 text-xs text-ink/45">
            <Truck className="h-3.5 w-3.5" />
            {supplier.deliveryCoverage}
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/60 transition-colors hover:text-ink"
          >
            View supplier
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </CardBody>
    </Card>
  )
}

function MarketplaceMetric({
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
    <div className="px-6 py-5 sm:px-7">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
          <Icon className="h-4 w-4 text-ink/55" />
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

      <p className="mt-3 text-xs text-ink/40">
        {description}
      </p>
    </div>
  )
}

function SupplierMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="border-r border-line px-3 first:pl-0 last:border-r-0 last:pr-0">
      <div className="flex items-center gap-1 text-ink/35">
        <Icon className="h-3 w-3" />

        <span className="text-[9px] font-semibold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-1.5 text-sm font-semibold text-ink">
        {value}
      </p>
    </div>
  )
}

function TrustBadge({
  score,
}: {
  score: number
}) {
  const className =
    score >= 90
      ? 'bg-emerald-500/10 text-emerald-700'
      : score >= 75
        ? 'bg-amber-500/10 text-amber-700'
        : 'bg-rose-500/10 text-rose-700'

  return (
    <div
      className={`shrink-0 rounded-lg px-2.5 py-1.5 text-center ${className}`}
    >
      <p className="text-[9px] font-semibold uppercase tracking-wide">
        Trust
      </p>

      <p className="mt-0.5 text-sm font-bold">
        {score}
      </p>
    </div>
  )
}

function ProtectionStep({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
        <Icon className="h-4 w-4 text-ink/55" />
      </div>

      <div>
        <p className="text-xs font-semibold text-ink">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-ink/45">
          {description}
        </p>
      </div>
    </div>
  )
}

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

      <span className="text-sm font-semibold text-ink">
        {value}
      </span>
    </div>
  )
}