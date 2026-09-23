
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
    <div className="space-y-7 pb-8">

      {/* ===================================================== */}
      {/* Page Header */}
      {/* ===================================================== */}

      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

        <div className="max-w-2xl">

          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/35">
              Professional marketplace
            </p>
          </div>

          <h1 className="font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[36px]">
            Find the right expertise
            <span className="text-ink/35"> for your project.</span>
          </h1>

          <p className="mt-3 max-w-xl text-[13px] leading-6 text-ink/48">
            Connect with verified architects, engineers, surveyors, valuers
            and technical specialists across your project lifecycle.
          </p>

        </div>

        {/* Trust signal */}

        <div className="flex shrink-0 items-center gap-3 rounded-[18px] border border-ink/[0.07] bg-white px-4 py-3.5 shadow-[0_8px_30px_rgba(20,30,25,0.035)]">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
            <ShieldCheck size={17} />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink/55">
              Verified network
            </p>

            <p className="mt-0.5 text-[9px] leading-4 text-ink/35">
              Credentials checked before paid participation
            </p>
          </div>

        </div>

      </header>

      {/* ===================================================== */}
      {/* Marketplace Overview */}
      {/* ===================================================== */}

      <section
        aria-label="Marketplace overview"
        className="grid grid-cols-2 gap-3 xl:grid-cols-4"
      >

        <SummaryCard
          icon={BadgeCheck}
          label="Verified professionals"
          value={professionals.length}
          description="Currently listed"
          accent="teal"
        />

        <SummaryCard
          icon={Star}
          label="Average rating"
          value="4.8"
          description="Client feedback"
          accent="amber"
        />

        <SummaryCard
          icon={Award}
          label="Average trust score"
          value="91"
          description="Platform trust"
          accent="ink"
        />

        <SummaryCard
          icon={BriefcaseBusiness}
          label="Projects completed"
          value="384"
          description="Across the network"
          accent="blue"
        />

      </section>

      {/* ===================================================== */}
      {/* Marketplace */}
      {/* ===================================================== */}

      <section aria-label="Professional directory">

        <Card className="overflow-hidden">

          {/* Directory header */}

          <CardHeader
            title="Professional directory"
            subtitle="Explore verified expertise based on specialty, experience and platform trust"
          />

          {/* Search / filter toolbar */}

          <div className="border-y border-ink/[0.07] bg-[#FAFBFA] px-4 py-4 sm:px-6">

            <div className="flex flex-col gap-4">

              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                {/* Search */}

                <div className="relative w-full lg:max-w-[420px]">

                  <Search
                    className="
                      pointer-events-none
                      absolute
                      left-3.5
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      text-ink/25
                    "
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search professionals, services or locations..."
                    aria-label="Search professionals"
                    className="
                      h-11
                      w-full
                      rounded-[14px]
                      border
                      border-ink/[0.08]
                      bg-white
                      pl-10
                      pr-4
                      text-[11px]
                      font-medium
                      text-ink
                      outline-none
                      shadow-[0_2px_10px_rgba(20,30,25,0.02)]
                      placeholder:text-ink/25
                      transition
                      focus:border-ink/20
                      focus:ring-4
                      focus:ring-ink/[0.025]
                    "
                  />

                </div>

                {/* Result count */}

                <div className="flex items-center justify-between gap-3">

                  <span className="text-[10px] font-medium text-ink/35">
                    Showing{' '}
                    <span className="font-bold text-ink/55">
                      {filteredProfessionals.length}
                    </span>{' '}
                    professionals
                  </span>

                </div>

              </div>

              {/* Category filter */}

              <div className="flex items-center gap-2 overflow-x-auto pb-0.5">

                <div className="mr-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ink/[0.045]">
                  <Filter className="h-3.5 w-3.5 text-ink/40" />
                </div>

                {categories.map((category) => {
                  const active = activeCategory === category

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={[
                        'whitespace-nowrap rounded-full px-3.5 py-2 text-[10px] font-semibold transition-all',
                        active
                          ? 'bg-ink text-white shadow-[0_4px_12px_rgba(20,25,22,0.12)]'
                          : 'bg-white text-ink/45 ring-1 ring-inset ring-ink/[0.06] hover:bg-ink/[0.025] hover:text-ink/75',
                      ].join(' ')}
                    >
                      {category}
                    </button>
                  )
                })}

              </div>

            </div>

          </div>

          {/* Professional results */}

          {filteredProfessionals.length > 0 ? (

            <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-2 xl:grid-cols-3">

              {filteredProfessionals.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                />
              ))}

            </div>

          ) : (

            <CardBody>

              <div className="flex min-h-[280px] flex-col items-center justify-center text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-ink/[0.045]">
                  <Search className="h-5 w-5 text-ink/25" />
                </div>

                <h3 className="mt-5 font-display text-base font-semibold tracking-[-0.015em] text-ink">
                  No professionals found
                </h3>

                <p className="mt-1.5 max-w-sm text-[11px] leading-5 text-ink/40">
                  Try adjusting your search or selecting a different
                  professional category.
                </p>

                {(search || activeCategory !== 'All') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('')
                      setActiveCategory('All')
                    }}
                    className="mt-5 rounded-full bg-ink px-4 py-2 text-[10px] font-bold text-white transition hover:opacity-90"
                  >
                    Clear filters
                  </button>
                )}

              </div>

            </CardBody>

          )}

        </Card>

      </section>

    </div>
  )
}

/* ============================================================= */
/* Professional Card                                              */
/* ============================================================= */

function ProfessionalCard({
  professional,
}: {
  professional: Professional
}) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[20px]
        border
        border-ink/[0.07]
        bg-white
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-ink/[0.13]
        hover:shadow-[0_18px_45px_rgba(20,30,25,0.075)]
      "
    >

      {/* Subtle top accent */}

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/[0.12] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* ======================================================= */}
      {/* Identity */}
      {/* ======================================================= */}

      <div className="flex items-start justify-between gap-3">

        <div className="flex min-w-0 items-center gap-3">

          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-[#F2F4F2] font-display text-sm font-semibold tracking-[-0.02em] text-ink transition-transform duration-300 group-hover:scale-[1.03]">
            {getInitials(professional.name)}

            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#12613E]">
              <BadgeCheck className="h-2.5 w-2.5 text-white" />
            </span>
          </div>

          <div className="min-w-0">

            <div className="flex min-w-0 items-center gap-1.5">

              <h3 className="truncate text-[13px] font-bold tracking-[-0.01em] text-ink">
                {professional.name}
              </h3>

            </div>

            <p className="mt-1 text-[10px] font-medium text-ink/40">
              {professional.category}
            </p>

          </div>

        </div>

        <AvailabilityBadge
          availability={professional.availability}
        />

      </div>

      {/* ======================================================= */}
      {/* Specialty */}
      {/* ======================================================= */}

      <div className="mt-6">

        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/25">
          Primary specialty
        </p>

        <p className="mt-1.5 text-[13px] font-semibold tracking-[-0.01em] text-ink/75">
          {professional.specialty}
        </p>

        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-ink/35">
          <MapPin className="h-3 w-3" />
          {professional.location}
        </div>

      </div>

      {/* ======================================================= */}
      {/* Trust panel */}
      {/* ======================================================= */}

      <div className="mt-5 rounded-[15px] border border-ink/[0.05] bg-[#F8F9F8] p-3.5">

        <div className="flex items-center justify-between gap-3">

          <div>

            <div className="flex items-center gap-1.5">

              <ShieldCheck className="h-3.5 w-3.5 text-[#12613E]" />

              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35">
                Trust score
              </p>

            </div>

            <div className="mt-1 flex items-baseline gap-1">

              <span className="font-display text-[21px] font-semibold tracking-[-0.04em] text-ink">
                {professional.trustScore}
              </span>

              <span className="text-[9px] font-medium text-ink/25">
                / 100
              </span>

            </div>

          </div>

          <TrustScore score={professional.trustScore} />

        </div>

        {/* Trust progress */}

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/[0.06]">

          <div
            className="h-full rounded-full bg-[#12613E] transition-all duration-500"
            style={{
              width: `${professional.trustScore}%`,
            }}
          />

        </div>

      </div>

      {/* ======================================================= */}
      {/* Metrics */}
      {/* ======================================================= */}

      <div className="mt-5 grid grid-cols-3 divide-x divide-ink/[0.07]">

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

      {/* ======================================================= */}
      {/* Description */}
      {/* ======================================================= */}

      <p className="mt-5 line-clamp-2 min-h-[40px] text-[10.5px] leading-5 text-ink/40">
        {professional.bio}
      </p>

      {/* ======================================================= */}
      {/* Verification */}
      {/* ======================================================= */}

      <div className="mt-4 flex items-center gap-1.5 border-t border-ink/[0.06] pt-4">

        <ShieldCheck className="h-3 w-3 shrink-0 text-[#12613E]" />

        <span className="text-[9px] font-medium text-ink/35">
          Verified since {professional.verifiedSince}
        </span>

        <span className="ml-auto text-[9px] font-semibold text-[#12613E]">
          Credentialed
        </span>

      </div>

      {/* ======================================================= */}
      {/* Action */}
      {/* ======================================================= */}

      <button
        type="button"
        className="
          mt-4
          flex
          w-full
          items-center
          justify-between
          rounded-[13px]
          bg-ink/[0.035]
          px-3.5
          py-3
          text-[10px]
          font-bold
          text-ink/65
          transition-all
          group-hover:bg-ink
          group-hover:text-white
        "
      >

        <span>View professional profile</span>

        <ChevronRight
          className="
            h-3.5
            w-3.5
            text-ink/25
            transition-all
            group-hover:translate-x-0.5
            group-hover:text-white/70
          "
        />

      </button>

    </article>
  )
}

/* ============================================================= */
/* Summary Card                                                    */
/* ============================================================= */

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
  description: string
  accent: 'teal' | 'amber' | 'ink' | 'blue'
}) {
  const accentStyles = {
    teal: 'bg-[#EAF4EE] text-[#12613E]',
    amber: 'bg-[#F7EFE8] text-[#B85C12]',
    ink: 'bg-ink/[0.055] text-ink/60',
    blue: 'bg-[#EEF3FF] text-[#315BCB]',
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(20,30,25,0.055)]">

      <CardBody className="relative">

        <div className="flex items-start justify-between gap-3">

          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentStyles[accent]}`}
          >
            <Icon className="h-4 w-4" />
          </div>

          <span className="font-display text-[25px] font-semibold tracking-[-0.04em] text-ink">
            {value}
          </span>

        </div>

        <div className="mt-5">

          <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-ink/35">
            {label}
          </p>

          <p className="mt-1 text-[10px] text-ink/35">
            {description}
          </p>

        </div>

      </CardBody>

    </Card>
  )
}

/* ============================================================= */
/* Metric                                                          */
/* ============================================================= */

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

        {Icon && (
          <Icon className="h-3 w-3 fill-current text-[#B85C12]" />
        )}

        <p className="text-[11px] font-bold tracking-[-0.01em] text-ink/70">
          {value}
        </p>

      </div>

      <p className="mt-1 text-[8.5px] font-medium text-ink/30">
        {label}
      </p>

    </div>
  )
}

/* ============================================================= */
/* Availability                                                    */
/* ============================================================= */

function AvailabilityBadge({
  availability,
}: {
  availability: Professional['availability']
}) {
  const styles = {
    Available: 'bg-[#EAF4EE] text-[#12613E]',
    Limited: 'bg-[#F7EFE8] text-[#A75A19]',
    Busy: 'bg-[#FBECEC] text-[#A33A3A]',
  }

  const dotStyles = {
    Available: 'bg-[#12613E]',
    Limited: 'bg-[#B85C12]',
    Busy: 'bg-[#A33A3A]',
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[8.5px] font-bold ${styles[availability]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dotStyles[availability]}`}
      />

      {availability}
    </span>
  )
}

/* ============================================================= */
/* Trust Score                                                     */
/* ============================================================= */

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

      <p className="text-[9px] font-bold text-ink/55">
        {category}
      </p>

      <p className="mt-0.5 text-[8px] text-ink/25">
        Platform rating
      </p>

    </div>
  )
}

/* ============================================================= */
/* Initials                                                        */
/* ============================================================= */

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}