import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronRight,
  Clock3,
  Filter,
  MapPin,
  Search,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type ProfessionalCategory =
  | 'Architect'
  | 'Engineer'
  | 'Surveyor'
  | 'Valuer'
  | 'Planning Expert'
  | 'Inspector'

type Professional = {
  id: string
  name: string
  category: ProfessionalCategory
  specialty: string
  location: string
  experience: number
  trustScore: number
  rating: number
  reviews: number
  projects: number
  availability: 'Available' | 'Limited' | 'Busy'
  verifiedSince: string
  bio: string
}

const professionals: Professional[] = [
  {
    id: 'PRO-0018',
    name: 'Adebayo & Partners',
    category: 'Architect',
    specialty: 'Residential Architecture',
    location: 'Abuja, FCT',
    experience: 14,
    trustScore: 94,
    rating: 4.9,
    reviews: 38,
    projects: 72,
    availability: 'Available',
    verifiedSince: '2024',
    bio: 'Architectural practice specialising in residential design, construction documentation and project coordination.',
  },
  {
    id: 'PRO-0024',
    name: 'Nexus Structural Engineering',
    category: 'Engineer',
    specialty: 'Structural Engineering',
    location: 'Abuja, FCT',
    experience: 11,
    trustScore: 91,
    rating: 4.8,
    reviews: 31,
    projects: 58,
    availability: 'Available',
    verifiedSince: '2024',
    bio: 'Structural engineering consultancy delivering structural analysis, design and construction documentation.',
  },
  {
    id: 'PRO-0031',
    name: 'GeoPoint Survey Associates',
    category: 'Surveyor',
    specialty: 'Land & Topographical Survey',
    location: 'Abuja, FCT',
    experience: 9,
    trustScore: 88,
    rating: 4.7,
    reviews: 24,
    projects: 46,
    availability: 'Limited',
    verifiedSince: '2025',
    bio: 'Professional surveying team providing boundary, topographical and construction survey services.',
  },
  {
    id: 'PRO-0012',
    name: 'PrimeValue Consultants',
    category: 'Valuer',
    specialty: 'Property Valuation',
    location: 'Lagos, Nigeria',
    experience: 16,
    trustScore: 96,
    rating: 4.9,
    reviews: 45,
    projects: 103,
    availability: 'Available',
    verifiedSince: '2023',
    bio: 'Property valuation and advisory practice supporting residential and investment property decisions.',
  },
  {
    id: 'PRO-0042',
    name: 'UrbanPlan Advisory',
    category: 'Planning Expert',
    specialty: 'Planning & Approvals',
    location: 'Abuja, FCT',
    experience: 12,
    trustScore: 86,
    rating: 4.6,
    reviews: 19,
    projects: 41,
    availability: 'Limited',
    verifiedSince: '2025',
    bio: 'Planning consultants supporting development applications, statutory approvals and regulatory coordination.',
  },
  {
    id: 'PRO-0029',
    name: 'BuildCheck Professionals',
    category: 'Inspector',
    specialty: 'Construction Inspection',
    location: 'Lagos, Nigeria',
    experience: 10,
    trustScore: 89,
    rating: 4.8,
    reviews: 27,
    projects: 64,
    availability: 'Busy',
    verifiedSince: '2024',
    bio: 'Independent inspection professionals providing construction quality checks and technical reporting.',
  },
]

const categories = [
  'All',
  'Architect',
  'Engineer',
  'Surveyor',
  'Valuer',
  'Planning Expert',
  'Inspector',
] as const

export function ProfessionalList() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>('All')
  const [search, setSearch] = useState('')

  const filteredProfessionals = useMemo(() => {
    const query = search.trim().toLowerCase()

    return professionals.filter((professional) => {
      const matchesCategory =
        activeCategory === 'All' ||
        professional.category === activeCategory

      const matchesSearch =
        !query ||
        professional.name.toLowerCase().includes(query) ||
        professional.category.toLowerCase().includes(query) ||
        professional.specialty.toLowerCase().includes(query) ||
        professional.location.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, search])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
            Professional marketplace
          </p>

          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
            Find a professional
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Browse verified architects, engineers, surveyors and other
            technical professionals for your project.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />

          <div>
            <p className="text-[10px] font-semibold text-ink">
              Verified professionals
            </p>

            <p className="text-[9px] text-ink/40">
              Credentials checked before paid participation
            </p>
          </div>
        </div>
      </div>

      {/* Marketplace stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={BadgeCheck}
          label="Verified professionals"
          value={professionals.length}
          description="Available in marketplace"
        />

        <SummaryCard
          icon={Star}
          label="Average rating"
          value="4.8"
          description="Client feedback"
        />

        <SummaryCard
          icon={Award}
          label="Average trust score"
          value="91"
          description="Platform trust score"
        />

        <SummaryCard
          icon={BriefcaseBusiness}
          label="Projects completed"
          value="384"
          description="Across listed professionals"
        />
      </div>

      {/* Search and filters */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Verified professionals"
          subtitle="Select a professional based on expertise, experience and trust"
        />

        <div className="border-y border-line bg-paper-2 px-6 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative min-w-0 flex-1 lg:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, service or location..."
                className="h-10 w-full rounded-xl border border-line bg-white pl-9 pr-3 text-xs text-ink outline-none placeholder:text-ink/30 focus:border-ink/30"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <Filter className="mr-1 h-3.5 w-3.5 shrink-0 text-ink/35" />

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={[
                    'whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-semibold transition-colors',
                    activeCategory === category
                      ? 'bg-ink text-white'
                      : 'bg-white text-ink/50 hover:bg-ink/5 hover:text-ink',
                  ].join(' ')}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Professional cards */}
        {filteredProfessionals.length > 0 ? (
          <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProfessionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
              />
            ))}
          </div>
        ) : (
          <CardBody>
            <div className="flex min-h-52 flex-col items-center justify-center text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink/5">
                <Search className="h-5 w-5 text-ink/35" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-ink">
                No professionals found
              </h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-ink/40">
                Try a different name, service, location or category.
              </p>
            </div>
          </CardBody>
        )}
      </Card>
    </div>
  )
}

function ProfessionalCard({
  professional,
}: {
  professional: Professional
}) {
  return (
    <div className="group rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-sm">
      {/* Profile */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink/5 font-display text-sm font-semibold text-ink">
            {getInitials(professional.name)}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate text-sm font-semibold text-ink">
                {professional.name}
              </h3>

              <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
            </div>

            <p className="mt-0.5 text-[10px] font-medium text-ink/45">
              {professional.category}
            </p>
          </div>
        </div>

        <AvailabilityBadge
          availability={professional.availability}
        />
      </div>

      {/* Specialty */}
      <div className="mt-5">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
          Specialty
        </p>

        <p className="mt-1 text-xs font-semibold text-ink/70">
          {professional.specialty}
        </p>
      </div>

      {/* Location */}
      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-ink/40">
        <MapPin className="h-3 w-3" />
        {professional.location}
      </div>

      {/* Trust */}
      <div className="mt-5 rounded-xl bg-paper-2 p-3.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
              Trust score
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <span className="font-display text-lg font-semibold text-ink">
                {professional.trustScore}
              </span>

              <span className="text-[9px] text-ink/35">/ 100</span>
            </div>
          </div>

          <TrustScore score={professional.trustScore} />
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-4 grid grid-cols-3 divide-x divide-line">
        <Metric
          value={`${professional.experience} yrs`}
          label="Experience"
        />

        <Metric
          value={professional.rating.toFixed(1)}
          label={`${professional.reviews} reviews`}
          icon={Star}
        />

        <Metric
          value={String(professional.projects)}
          label="Projects"
        />
      </div>

      {/* Description */}
      <p className="mt-4 line-clamp-2 text-[11px] leading-5 text-ink/45">
        {professional.bio}
      </p>

      {/* Verification */}
      <div className="mt-4 flex items-center gap-1.5 border-t border-line pt-4 text-[9px] text-ink/35">
        <ShieldCheck className="h-3 w-3 text-emerald-600" />
        Verified since {professional.verifiedSince}
      </div>

      {/* Action */}
      <button
        type="button"
        className="mt-4 flex w-full items-center justify-between rounded-xl border border-line px-3.5 py-2.5 text-xs font-semibold text-ink transition-colors group-hover:border-ink/20 group-hover:bg-ink/[0.02]"
      >
        <span>View professional</span>
        <ChevronRight className="h-3.5 w-3.5 text-ink/35" />
      </button>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
  description: string
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
            <Icon className="h-4 w-4 text-ink/45" />
          </div>

          <span className="font-display text-2xl font-semibold tracking-tight text-ink">
            {value}
          </span>
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink/40">
          {label}
        </p>

        <p className="mt-1 text-xs text-ink/40">
          {description}
        </p>
      </CardBody>
    </Card>
  )
}

function Metric({
  value,
  label,
  icon: Icon,
}: {
  value: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="px-3 first:pl-0 last:pr-0">
      <div className="flex items-center gap-1">
        {Icon && <Icon className="h-3 w-3 fill-current text-amber-500" />}

        <p className="text-xs font-semibold text-ink/70">
          {value}
        </p>
      </div>

      <p className="mt-0.5 text-[9px] text-ink/30">{label}</p>
    </div>
  )
}

function AvailabilityBadge({
  availability,
}: {
  availability: Professional['availability']
}) {
  const styles = {
    Available: 'bg-emerald-500/10 text-emerald-700',
    Limited: 'bg-amber-500/10 text-amber-700',
    Busy: 'bg-rose-500/10 text-rose-700',
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[9px] font-semibold ${styles[availability]}`}
    >
      <Clock3 className="h-3 w-3" />
      {availability}
    </span>
  )
}

function TrustScore({ score }: { score: number }) {
  const category =
    score >= 85
      ? 'Excellent'
      : score >= 70
        ? 'Good'
        : score >= 55
          ? 'Fair'
          : score >= 40
            ? 'Watchlist'
            : 'High Risk'

  return (
    <div className="text-right">
      <p className="text-[9px] font-semibold text-ink/50">
        {category}
      </p>

      <p className="mt-0.5 text-[9px] text-ink/30">
        Platform rating
      </p>
    </div>
  )
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}