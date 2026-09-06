import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Construction,
  MapPin,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface AvailableProject {
  id: string
  title: string
  location: string
  phase: string
  budget: string
  timelineWeeks: number
  description: string
  clientType: string
  verifiedClient: boolean
  bidsCount: number
  posted: string
  status: 'Open' | 'Closing soon'
}

const projects: AvailableProject[] = [
  {
    id: 'PRJ-1048',
    title: 'Luxury Residential Development',
    location: 'Maitama, Abuja',
    phase: 'Full Construction',
    budget: '₦65M – ₦82M',
    timelineWeeks: 32,
    description:
      'Construction of a high-end residential property including structural works, MEP, finishing and external works.',
    clientType: 'Diaspora Investor',
    verifiedClient: true,
    bidsCount: 7,
    posted: '2 days ago',
    status: 'Open',
  },
  {
    id: 'PRJ-1051',
    title: 'Commercial Office Fit-Out',
    location: 'Wuse II, Abuja',
    phase: 'Finishing',
    budget: '₦18M – ₦25M',
    timelineWeeks: 14,
    description:
      'Interior fit-out covering partitions, ceilings, flooring, electrical, HVAC, lighting and finishing works.',
    clientType: 'Corporate Client',
    verifiedClient: true,
    bidsCount: 4,
    posted: '3 days ago',
    status: 'Open',
  },
  {
    id: 'PRJ-1056',
    title: 'Residential Duplex Construction',
    location: 'Gwarinpa, Abuja',
    phase: 'Structure',
    budget: '₦34M – ₦46M',
    timelineWeeks: 24,
    description:
      'Two-storey residential construction requiring structural, roofing, MEP and associated building works.',
    clientType: 'Private Client',
    verifiedClient: true,
    bidsCount: 11,
    posted: '5 days ago',
    status: 'Closing soon',
  },
  {
    id: 'PRJ-1060',
    title: 'Estate Infrastructure Works',
    location: 'Katampe, Abuja',
    phase: 'Infrastructure',
    budget: '₦42M – ₦58M',
    timelineWeeks: 20,
    description:
      'Estate infrastructure works covering drainage, access roads, external utilities and related civil works.',
    clientType: 'Property Developer',
    verifiedClient: true,
    bidsCount: 3,
    posted: '1 week ago',
    status: 'Open',
  },
]

function ProjectCard({ project }: { project: AvailableProject }) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="teal">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  {project.status}
                </span>
              </Badge>

              {project.verifiedClient && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified client
                </span>
              )}
            </div>

            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-ink">
              {project.title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink/45">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {project.location}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Construction className="h-3.5 w-3.5" />
                {project.phase}
              </span>
            </div>
          </div>

          <span className="shrink-0 font-mono text-[10px] font-medium text-ink/35">
            {project.id}
          </span>
        </div>

        {/* Description */}
        <p className="mt-5 max-w-3xl text-sm leading-6 text-ink/50">
          {project.description}
        </p>

        {/* Project metrics */}
        <div className="mt-5 grid grid-cols-2 gap-3 border-y border-line py-4 sm:grid-cols-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              Estimated budget
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
              <WalletCards className="h-3.5 w-3.5 text-ink/45" />
              {project.budget}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              Timeline
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
              <Clock3 className="h-3.5 w-3.5 text-ink/45" />
              {project.timelineWeeks} weeks
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              Client
            </p>
            <p className="mt-1.5 text-sm font-semibold text-ink">
              {project.clientType}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              Active bids
            </p>
            <p className="mt-1.5 text-sm font-semibold text-ink">
              {project.bidsCount}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5 text-xs text-ink/40">
            <CalendarDays className="h-3.5 w-3.5" />
            Posted {project.posted}
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-ink/90"
          >
            Review project
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Card>
  )
}

export function AvailableProjects() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <BriefcaseBusiness className="h-5 w-5 text-ink/70" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Contractor Marketplace
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Available Projects
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Discover verified construction opportunities matching your trade,
            capabilities and operating location.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-medium text-ink/55">
          <Construction className="h-4 w-4 text-ink/45" />
          {projects.length} projects available
        </div>
      </div>

      {/* Marketplace summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
            Matching projects
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            {projects.length}
          </p>
          <p className="mt-1 text-xs text-ink/40">
            Projects matching your profile
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
            Verified clients
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            {projects.filter((project) => project.verifiedClient).length}
          </p>
          <p className="mt-1 text-xs text-ink/40">
            Projects with verified clients
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
            Open opportunities
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            {projects.filter((project) => project.status === 'Open').length}
          </p>
          <p className="mt-1 text-xs text-ink/40">
            Currently accepting bids
          </p>
        </Card>
      </div>

      {/* Project list */}
      <section>
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-base font-semibold text-ink">
              Projects matching your profile
            </h2>
            <p className="mt-0.5 text-xs text-ink/40">
              Review the scope and submit a structured bid.
            </p>
          </div>

          <span className="hidden text-xs text-ink/40 sm:block">
            {projects.length} results
          </span>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}