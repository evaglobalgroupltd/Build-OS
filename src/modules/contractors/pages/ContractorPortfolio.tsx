import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileCheck2,
  Images,
  MapPin,
  ShieldCheck,
  Star,
  TrendingUp,
} from 'lucide-react'

import { Card, CardBody } from '@/components/ui/Card'

const portfolioProjects = [
  {
    id: 'PRJ-018',
    name: 'Gwarinpa Residential Development',
    location: 'Gwarinpa, Abuja',
    type: 'Residential Construction',
    value: '₦24.5M',
    year: '2026',
    duration: '28 weeks',
    rating: '4.9',
    status: 'Completed',
    imageLabel: 'Residential development',
  },
  {
    id: 'PRJ-014',
    name: 'Maitama Duplex Construction',
    location: 'Maitama, Abuja',
    type: 'Luxury Residential',
    value: '₦38.2M',
    year: '2025',
    duration: '34 weeks',
    rating: '4.8',
    status: 'Completed',
    imageLabel: 'Luxury duplex',
  },
  {
    id: 'PRJ-011',
    name: 'Jabi Commercial Renovation',
    location: 'Jabi, Abuja',
    type: 'Commercial Renovation',
    value: '₦12.8M',
    year: '2025',
    duration: '18 weeks',
    rating: '4.7',
    status: 'Completed',
    imageLabel: 'Commercial renovation',
  },
  {
    id: 'PRJ-008',
    name: 'Wuse II Office Fit-Out',
    location: 'Wuse II, Abuja',
    type: 'Commercial Fit-Out',
    value: '₦9.1M',
    year: '2024',
    duration: '14 weeks',
    rating: '5.0',
    status: 'Completed',
    imageLabel: 'Office fit-out',
  },
]

const references = [
  {
    name: 'David Ibrahim',
    role: 'Property Investor',
    project: 'Gwarinpa Residential Development',
    rating: 5.0,
    comment:
      'The project was delivered professionally with strong communication throughout construction.',
  },
  {
    name: 'Amina Yusuf',
    role: 'Property Owner',
    project: 'Maitama Duplex Construction',
    rating: 4.8,
    comment:
      'Good workmanship, transparent reporting and excellent milestone coordination.',
  },
]

export function ContractorPortfolio() {
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
              Contractor portfolio
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Project portfolio
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            A verified record of completed work, project performance, client
            feedback and professional experience.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatusPill icon={ShieldCheck} label="Verified contractor" />
          <StatusPill icon={BadgeCheck} label="18 projects completed" />
        </div>
      </div>

      {/* Portfolio summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Completed projects"
          value="18"
          description="Verified project history"
          icon={CheckCircle2}
        />

        <SummaryCard
          label="Total project value"
          value="₦84.6M"
          description="Recorded contract value"
          icon={TrendingUp}
        />

        <SummaryCard
          label="Average rating"
          value="4.8 / 5"
          description="42 verified reviews"
          icon={Star}
        />

        <SummaryCard
          label="On-time delivery"
          value="94%"
          description="Milestones delivered on schedule"
          icon={CalendarDays}
        />
      </div>

      {/* Specialties */}
      <Card>
        <CardBody>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Professional capabilities
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Specialties
              </h2>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
              <CheckCircle2 className="h-3 w-3" />
              Verified credentials
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              'Residential Construction',
              'Commercial Buildings',
              'Renovation',
              'Project Management',
              'Structural Works',
              'Interior Fit-Out',
            ].map((specialty) => (
              <span
                key={specialty}
                className="rounded-full border border-line bg-paper-2 px-3 py-1.5 text-xs font-medium text-ink/60"
              >
                {specialty}
              </span>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Completed work */}
      <Card className="overflow-hidden">
        <div className="border-b border-line px-6 py-5">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Verified work history
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Completed projects
              </h2>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/50 transition-colors hover:text-ink"
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="grid gap-px bg-line sm:grid-cols-2">
          {portfolioProjects.map((project) => (
            <PortfolioProject key={project.id} project={project} />
          ))}
        </div>
      </Card>

      {/* Performance + references */}
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardBody>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Delivery record
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Project performance
              </h2>
            </div>

            <div className="mt-6 space-y-5">
              <PerformanceBar
                label="Project completion"
                value={96}
              />

              <PerformanceBar
                label="On-time delivery"
                value={94}
              />

              <PerformanceBar
                label="Quality performance"
                value={92}
              />

              <PerformanceBar
                label="Client satisfaction"
                value={96}
              />

              <PerformanceBar
                label="Compliance"
                value={98}
              />
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-xl bg-ink/[0.03] p-3">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />

              <p className="text-xs leading-5 text-ink/50">
                Performance data is based on verified Build OS project,
                milestone and client records.
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-3">
          <CardBody>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Client feedback
                </p>

                <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                  References & reviews
                </h2>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                <Star className="h-4 w-4 fill-current" />
                4.8 average
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {references.map((reference) => (
                <div
                  key={reference.name}
                  className="rounded-xl border border-line bg-paper-2 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                        {reference.name
                          .split(' ')
                          .map((name) => name[0])
                          .join('')}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {reference.name}
                        </p>

                        <p className="mt-0.5 text-[11px] text-ink/40">
                          {reference.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-ink">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {reference.rating.toFixed(1)}
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-ink/55">
                    “{reference.comment}”
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-ink/40">
                    <FileCheck2 className="h-3 w-3" />
                    {reference.project}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Verification record */}
      <Card>
        <CardBody>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Verified professional record
                </p>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                  Company registration, portfolio evidence, project history,
                  client feedback and performance records have been verified
                  through the Build OS contractor verification process.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03] hover:text-ink"
            >
              View verification
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function PortfolioProject({
  project,
}: {
  project: (typeof portfolioProjects)[number]
}) {
  return (
    <div className="bg-white p-5 transition-colors hover:bg-ink/[0.015]">
      {/* Project visual */}
      <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl bg-ink/[0.04]">
        <div className="absolute inset-0 bg-gradient-to-br from-ink/[0.08] via-transparent to-ink/[0.03]" />

        <div className="relative flex flex-col items-center gap-2 text-ink/30">
          <Images className="h-7 w-7" />
          <span className="text-[10px] font-medium">
            {project.imageLabel}
          </span>
        </div>

        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-emerald-700 shadow-sm">
          Completed
        </span>
      </div>

      {/* Details */}
      <div className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-ink">
              {project.name}
            </h3>

            <p className="mt-1 text-[11px] text-ink/40">
              {project.type}
            </p>
          </div>

          <button
            type="button"
            aria-label={`Open ${project.name}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/5 text-ink/45 transition-colors hover:bg-ink/10 hover:text-ink"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <ProjectDetail
            icon={MapPin}
            label="Location"
            value={project.location}
          />

          <ProjectDetail
            icon={CalendarDays}
            label="Completed"
            value={project.year}
          />

          <ProjectDetail
            icon={TrendingUp}
            label="Contract"
            value={project.value}
          />

          <ProjectDetail
            icon={Star}
            label="Client rating"
            value={project.rating}
            star
          />
        </div>
      </div>
    </div>
  )
}

function ProjectDetail({
  icon: Icon,
  label,
  value,
  star = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  star?: boolean
}) {
  return (
    <div>
      <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-ink/30">
        <Icon className="h-3 w-3" />
        {label}
      </p>

      <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-ink">
        {star && <Star className="h-3 w-3 fill-current" />}
        {value}
      </p>
    </div>
  )
}

function PerformanceBar({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-ink/55">
          {label}
        </span>

        <span className="text-xs font-semibold text-ink">
          {value}%
        </span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/5">
        <div
          className="h-full rounded-full bg-ink transition-all duration-500"
          style={{
            width: `${Math.min(Math.max(value, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  )
}

function SummaryCard({
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

            <p className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
              {value}
            </p>

            <p className="mt-1 text-xs text-ink/40">
              {description}
            </p>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
            <Icon className="h-4 w-4 text-ink/55" />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function StatusPill({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-2 text-[10px] font-semibold text-ink/55">
      <Icon className="h-3.5 w-3.5 text-emerald-600" />
      {label}
    </span>
  )
}