import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'

import { Card, CardBody } from '@/components/ui/Card'

const contractor = {
  name: 'Apex Build & Engineering Ltd.',
  category: 'General Building & Civil Engineering Contractor',
  location: 'Abuja, Nigeria',
  registration: 'RC 8421931',
  trustScore: 91,
  rating: 4.8,
  reviews: 42,
  completedProjects: 18,
  onTimeDelivery: 94,
  yearsExperience: 9,
  teamSize: '25–50',
  status: 'Available for projects',
  verified: true,
}

const credentials = [
  {
    title: 'CAC Registration',
    description: 'Company registration verified',
  },
  {
    title: 'Tax Identification',
    description: 'TIN information verified',
  },
  {
    title: 'Professional Credentials',
    description: 'Submitted credentials reviewed',
  },
  {
    title: 'Bank Account',
    description: 'Settlement details verified',
  },
]

const capabilities = [
  'Residential Construction',
  'Commercial Buildings',
  'Civil Works',
  'Renovation',
  'Structural Works',
  'Interior Fit-Out',
  'Project Management',
  'Site Development',
]

const projects = [
  {
    name: 'Gwarinpa Residential Development',
    type: 'Residential Construction',
    value: '₦24.5M',
    year: '2026',
    rating: '4.9',
  },
  {
    name: 'Maitama Duplex Construction',
    type: 'Luxury Residential',
    value: '₦38.2M',
    year: '2025',
    rating: '4.8',
  },
  {
    name: 'Jabi Commercial Renovation',
    type: 'Commercial Renovation',
    value: '₦12.8M',
    year: '2025',
    rating: '4.7',
  },
]

export function ContractorProfile() {
  return (
    <div className="space-y-6">
      {/* Profile header */}
      <Card className="overflow-hidden">
        <div className="h-24 bg-ink/[0.035]" />

        <CardBody className="-mt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-ink text-xl font-bold text-white shadow-sm">
                AB
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {contractor.name}
                  </h1>

                  {contractor.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                      <BadgeCheck className="h-3 w-3" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-ink/50">
                  {contractor.category}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink/40">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {contractor.location}
                  </span>

                  <span className="inline-flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    {contractor.registration}
                  </span>

                  <span className="inline-flex items-center gap-1 text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {contractor.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03] hover:text-ink"
              >
                Contact contractor
                <Mail className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                Invite to project
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Key metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <ProfileMetric
          label="Trust score"
          value={`${contractor.trustScore}/100`}
          description="Excellent standing"
          icon={ShieldCheck}
        />

        <ProfileMetric
          label="Client rating"
          value={contractor.rating.toString()}
          description={`${contractor.reviews} verified reviews`}
          icon={Star}
          star
        />

        <ProfileMetric
          label="Projects completed"
          value={contractor.completedProjects.toString()}
          description="Verified project history"
          icon={CheckCircle2}
        />

        <ProfileMetric
          label="On-time delivery"
          value={`${contractor.onTimeDelivery}%`}
          description="Milestones delivered on time"
          icon={TrendingUp}
        />

        <ProfileMetric
          label="Experience"
          value={`${contractor.yearsExperience} yrs`}
          description={`${contractor.teamSize} team`}
          icon={CalendarDays}
        />
      </div>

      {/* Main profile content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* About */}
        <Card className="lg:col-span-2">
          <CardBody>
            <SectionHeading
              eyebrow="Company overview"
              title="About the contractor"
            />

            <p className="mt-5 max-w-3xl text-sm leading-7 text-ink/55">
              Apex Build & Engineering Ltd. is a verified construction company
              providing residential, commercial and civil engineering services
              across Abuja and surrounding locations. The company has a
              documented record of completed projects, milestone performance
              and client feedback on Build OS.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <InfoRow
                icon={MapPin}
                label="Primary location"
                value={contractor.location}
              />

              <InfoRow
                icon={Building2}
                label="Company registration"
                value={contractor.registration}
              />

              <InfoRow
                icon={Users}
                label="Company size"
                value={contractor.teamSize}
              />

              <InfoRow
                icon={CalendarDays}
                label="Industry experience"
                value={`${contractor.yearsExperience} years`}
              />
            </div>
          </CardBody>
        </Card>

        {/* Trust */}
        <Card>
          <CardBody>
            <SectionHeading
              eyebrow="Build OS reputation"
              title="Trust score"
            />

            <div className="mt-6 flex flex-col items-center">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-[9px] border-ink/10">
                <div className="text-center">
                  <p className="font-display text-3xl font-bold tracking-tight text-ink">
                    {contractor.trustScore}
                  </p>

                  <p className="text-[10px] font-medium text-ink/35">
                    / 100
                  </p>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-700">
                <TrendingUp className="h-3 w-3" />
                Excellent standing
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <TrustFactor label="Completion" value={96} />
              <TrustFactor label="On-time delivery" value={94} />
              <TrustFactor label="Quality" value={92} />
              <TrustFactor label="Client satisfaction" value={96} />
              <TrustFactor label="Compliance" value={98} />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Capabilities + verification */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardBody>
            <SectionHeading
              eyebrow="Professional capabilities"
              title="Services & specialties"
            />

            <div className="mt-5 flex flex-wrap gap-2">
              {capabilities.map((capability) => (
                <span
                  key={capability}
                  className="rounded-full border border-line bg-paper-2 px-3 py-2 text-xs font-medium text-ink/55"
                >
                  {capability}
                </span>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <SectionHeading
              eyebrow="Verification"
              title="Credentials & compliance"
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {credentials.map((credential) => (
                <div
                  key={credential.title}
                  className="flex items-start gap-3 rounded-xl border border-line bg-paper-2 p-3.5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-ink">
                      {credential.title}
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-ink/40">
                      {credential.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Portfolio */}
      <Card className="overflow-hidden">
        <div className="border-b border-line px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <SectionHeading
              eyebrow="Verified work history"
              title="Selected projects"
            />

            <button
              type="button"
              className="hidden items-center gap-1 text-xs font-semibold text-ink/45 transition-colors hover:text-ink sm:inline-flex"
            >
              View full portfolio
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="bg-white p-5 transition-colors hover:bg-ink/[0.015]"
            >
              <div className="flex h-28 items-center justify-center rounded-xl bg-ink/[0.04]">
                <Building2 className="h-7 w-7 text-ink/20" />
              </div>

              <div className="mt-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-ink">
                      {project.name}
                    </h3>

                    <p className="mt-1 text-[10px] text-ink/40">
                      {project.type}
                    </p>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-ink">
                    <Star className="h-3 w-3 fill-current" />
                    {project.rating}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <div>
                    <p className="text-[9px] uppercase tracking-wide text-ink/30">
                      Contract value
                    </p>
                    <p className="mt-1 text-xs font-semibold text-ink">
                      {project.value}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-wide text-ink/30">
                      Completed
                    </p>
                    <p className="mt-1 text-xs font-semibold text-ink">
                      {project.year}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Contact / marketplace CTA */}
      <Card>
        <CardBody>
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <Target className="h-5 w-5 text-ink/55" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Interested in working with this contractor?
                </p>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                  Invite the contractor to review your project scope and submit
                  a verified bid through the Build OS procurement workflow.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03] hover:text-ink"
              >
                <Phone className="h-3.5 w-3.5" />
                Contact
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                Invite to project
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
        {eyebrow}
      </p>

      <h2 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">
        {title}
      </h2>
    </div>
  )
}

function ProfileMetric({
  label,
  value,
  description,
  icon: Icon,
  star = false,
}: {
  label: string
  value: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  star?: boolean
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/35">
              {label}
            </p>

            <p className="mt-2 flex items-center gap-1 font-display text-xl font-semibold tracking-tight text-ink">
              {star && <Star className="h-4 w-4 fill-current" />}
              {value}
            </p>

            <p className="mt-1 text-[10px] text-ink/40">
              {description}
            </p>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/5">
            <Icon className="h-4 w-4 text-ink/50" />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-paper-2 p-3.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
        <Icon className="h-4 w-4 text-ink/45" />
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
          {label}
        </p>

        <p className="mt-1 truncate text-xs font-semibold text-ink">
          {value}
        </p>
      </div>
    </div>
  )
}

function TrustFactor({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-medium text-ink/55">
          {label}
        </span>

        <span className="text-[11px] font-semibold text-ink">
          {value}%
        </span>
      </div>

      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/5">
        <div
          className="h-full rounded-full bg-ink"
          style={{
            width: `${Math.min(Math.max(value, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  )
}