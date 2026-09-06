import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Filter,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  TrendingUp,
} from 'lucide-react'

import { Card, CardBody } from '@/components/ui/Card'

const contractors = [
  {
    id: 'CTR-001',
    initials: 'AB',
    name: 'Apex Build & Engineering Ltd.',
    category: 'General Building Contractor',
    location: 'Abuja, Nigeria',
    trustScore: 91,
    rating: 4.8,
    reviews: 42,
    completedProjects: 18,
    onTimeDelivery: 94,
    verified: true,
    specialties: [
      'Residential Construction',
      'Commercial Buildings',
      'Renovation',
    ],
    status: 'Available',
  },
  {
    id: 'CTR-002',
    initials: 'PM',
    name: 'PrimeMark Construction Ltd.',
    category: 'Building & Civil Engineering',
    location: 'Abuja, Nigeria',
    trustScore: 88,
    rating: 4.7,
    reviews: 36,
    completedProjects: 24,
    onTimeDelivery: 91,
    verified: true,
    specialties: ['Civil Works', 'Residential Construction', 'Infrastructure'],
    status: 'Available',
  },
  {
    id: 'CTR-003',
    initials: 'VC',
    name: 'Vertex Construction Group',
    category: 'Commercial Contractor',
    location: 'Lagos, Nigeria',
    trustScore: 86,
    rating: 4.6,
    reviews: 29,
    completedProjects: 15,
    onTimeDelivery: 89,
    verified: true,
    specialties: ['Commercial Buildings', 'Fit-Out', 'Renovation'],
    status: 'Limited availability',
  },
  {
    id: 'CTR-004',
    initials: 'GH',
    name: 'GreenHaven Developments',
    category: 'Residential Contractor',
    location: 'Abuja, Nigeria',
    trustScore: 84,
    rating: 4.8,
    reviews: 21,
    completedProjects: 12,
    onTimeDelivery: 92,
    verified: true,
    specialties: ['Residential Construction', 'Interior Works', 'Renovation'],
    status: 'Available',
  },
]

export function ContractorList() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <Building2 className="h-5 w-5 text-ink/65" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Contractor marketplace
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Find a contractor
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Discover verified contractors using Build OS trust, delivery
            history, client ratings and verified business credentials.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-medium text-ink/55">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          Verified marketplace
        </div>
      </div>

      {/* Search and filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />

              <input
                type="search"
                placeholder="Search contractors, companies or specialties..."
                className="h-11 w-full rounded-xl border border-line bg-paper-2 pl-10 pr-4 text-sm text-ink outline-none transition focus:border-ink/20 focus:ring-2 focus:ring-ink/5"
              />
            </div>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line px-4 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03] hover:text-ink"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-ink px-4 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Filter className="h-4 w-4" />
              Apply
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <FilterChip label="All contractors" active />
            <FilterChip label="Verified only" />
            <FilterChip label="Residential" />
            <FilterChip label="Commercial" />
            <FilterChip label="Civil works" />
            <FilterChip label="Available now" />
          </div>
        </CardBody>
      </Card>

      {/* Marketplace summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <MarketplaceMetric
          label="Verified contractors"
          value="124"
          description="Ready to work"
          icon={BadgeCheck}
        />

        <MarketplaceMetric
          label="Average trust score"
          value="87 / 100"
          description="Across verified contractors"
          icon={ShieldCheck}
        />

        <MarketplaceMetric
          label="Active marketplace"
          value="38"
          description="Currently accepting projects"
          icon={TrendingUp}
        />
      </div>

      {/* Results */}
      <Card className="overflow-hidden">
        <div className="border-b border-line px-6 py-5">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Contractor directory
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Verified contractors
              </h2>
            </div>

            <p className="text-xs text-ink/40">
              {contractors.length} contractors shown
            </p>
          </div>
        </div>

        <div className="divide-y divide-line">
          {contractors.map((contractor) => (
            <ContractorCard
              key={contractor.id}
              contractor={contractor}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}

function ContractorCard({
  contractor,
}: {
  contractor: (typeof contractors)[number]
}) {
  return (
    <div className="px-6 py-6 transition-colors hover:bg-ink/[0.015]">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        {/* Identity */}
        <div className="flex min-w-0 gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-sm font-bold text-white">
            {contractor.initials}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-ink">
                {contractor.name}
              </h3>

              {contractor.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                  <BadgeCheck className="h-3 w-3" />
                  Verified
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-ink/45">
              {contractor.category}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink/40">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {contractor.location}
              </span>

              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                {contractor.completedProjects} projects completed
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {contractor.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="rounded-full bg-ink/5 px-2.5 py-1 text-[10px] font-medium text-ink/50"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="grid grid-cols-3 gap-5 border-y border-line py-4 xl:min-w-[360px] xl:border-y-0 xl:border-l xl:py-0 xl:pl-6">
          <Metric
            label="Trust score"
            value={`${contractor.trustScore}`}
            suffix="/100"
            highlight
          />

          <Metric
            label="Rating"
            value={contractor.rating.toString()}
            suffix={` (${contractor.reviews})`}
            star
          />

          <Metric
            label="On-time"
            value={`${contractor.onTimeDelivery}%`}
          />
        </div>

        {/* Actions */}
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row xl:flex-col">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03] hover:text-ink"
          >
            View profile
            <ChevronRight className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            Invite to project
          </button>

          <span
            className={
              contractor.status === 'Available'
                ? 'text-center text-[10px] font-medium text-emerald-700'
                : 'text-center text-[10px] font-medium text-amber-700'
            }
          >
            {contractor.status}
          </span>
        </div>
      </div>
    </div>
  )
}

function Metric({
  label,
  value,
  suffix,
  highlight = false,
  star = false,
}: {
  label: string
  value: string
  suffix?: string
  highlight?: boolean
  star?: boolean
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
        {label}
      </p>

      <p
        className={
          highlight
            ? 'mt-1 font-display text-lg font-bold text-ink'
            : 'mt-1 font-display text-lg font-semibold text-ink'
        }
      >
        {star && (
          <Star className="mr-1 inline h-3.5 w-3.5 fill-current align-[1px]" />
        )}

        {value}

        {suffix && (
          <span className="text-[10px] font-medium text-ink/35">
            {suffix}
          </span>
        )}
      </p>
    </div>
  )
}

function FilterChip({
  label,
  active = false,
}: {
  label: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      className={
        active
          ? 'rounded-full bg-ink px-3 py-1.5 text-[10px] font-semibold text-white'
          : 'rounded-full border border-line bg-white px-3 py-1.5 text-[10px] font-medium text-ink/50 transition-colors hover:bg-ink/[0.03] hover:text-ink'
      }
    >
      {label}
    </button>
  )
}

function MarketplaceMetric({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string
  value: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              {label}
            </p>

            <p className="mt-2 font-display text-xl font-semibold text-ink">
              {value}
            </p>

            <p className="mt-1 text-xs text-ink/40">
              {description}
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
            <Icon className="h-4 w-4 text-ink/55" />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}