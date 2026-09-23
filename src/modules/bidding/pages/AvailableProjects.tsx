
import {
  ArrowUpRight,
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
  const isClosingSoon = project.status === 'Closing soon'

  return (
    <Card
      className={`
        group
        relative
        overflow-hidden
        rounded-[22px]
        border
        bg-white
        transition-all
        duration-300
        hover:-translate-y-[2px]
        hover:shadow-[0_20px_50px_rgba(20,40,30,0.08)]
        ${
          isClosingSoon
            ? 'border-[#B85C12]/15'
            : 'border-ink/[0.07]'
        }
      `}
    >
      {/* Subtle top accent */}
      <div
        className={`
          absolute inset-x-0 top-0 h-0.5
          ${isClosingSoon ? 'bg-[#B85C12]' : 'bg-[#173629]/15'}
        `}
      />

      <div className="p-5 sm:p-6">
        {/* ===================================================== */}
        {/* Project identity */}
        {/* ===================================================== */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={isClosingSoon ? 'amber' : 'teal'}>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3" />
                  {project.status}
                </span>
              </Badge>

              {project.verifiedClient && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4EE] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.06em] text-[#12613E]">
                  <ShieldCheck className="h-3 w-3" />
                  Verified client
                </span>
              )}
            </div>

            <h3 className="mt-3 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink sm:text-[21px]">
              {project.title}
            </h3>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-ink/45">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-ink/30" />
                {project.location}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Construction className="h-3.5 w-3.5 text-ink/30" />
                {project.phase}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 lg:block lg:text-right">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/30">
                Project reference
              </p>

              <p className="mt-1 font-mono text-[10px] font-medium tracking-wide text-ink/40">
                {project.id}
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* Description */}
        {/* ===================================================== */}

        <p className="mt-5 max-w-3xl text-[12px] leading-5 text-ink/50 sm:text-[13px] sm:leading-6">
          {project.description}
        </p>

        {/* ===================================================== */}
        {/* Opportunity metrics */}
        {/* ===================================================== */}

        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <div className="rounded-[16px] bg-[#F6F8F5] p-3.5">
            <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-ink/35">
              Estimated budget
            </p>

            <p className="mt-1.5 flex items-center gap-1.5 font-display text-[14px] font-semibold tracking-[-0.01em] text-ink">
              <WalletCards className="h-3.5 w-3.5 shrink-0 text-[#B85C12]" />
              {project.budget}
            </p>
          </div>

          <div className="rounded-[16px] bg-[#F6F8F5] p-3.5">
            <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-ink/35">
              Timeline
            </p>

            <p className="mt-1.5 flex items-center gap-1.5 font-display text-[14px] font-semibold text-ink">
              <Clock3 className="h-3.5 w-3.5 text-ink/40" />
              {project.timelineWeeks} weeks
            </p>
          </div>

          <div className="rounded-[16px] bg-[#F6F8F5] p-3.5">
            <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-ink/35">
              Client
            </p>

            <p className="mt-1.5 truncate font-display text-[14px] font-semibold text-ink">
              {project.clientType}
            </p>
          </div>

          <div
            className={`
              rounded-[16px] p-3.5
              ${
                isClosingSoon
                  ? 'bg-[#F8EEE6]'
                  : 'bg-[#173629]'
              }
            `}
          >
            <p
              className={`
                text-[8px] font-bold uppercase tracking-[0.10em]
                ${isClosingSoon ? 'text-[#9A4D0A]/55' : 'text-white/40'}
              `}
            >
              Active bids
            </p>

            <p
              className={`
                mt-1.5 font-display text-[16px] font-semibold
                ${isClosingSoon ? 'text-[#7A3F0C]' : 'text-white'}
              `}
            >
              {project.bidsCount}
            </p>
          </div>
        </div>

        {/* ===================================================== */}
        {/* Footer */}
        {/* ===================================================== */}

        <div className="mt-5 flex flex-col gap-4 border-t border-ink/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-ink/35">
              <CalendarDays className="h-3.5 w-3.5" />
              Posted {project.posted}
            </span>

            {isClosingSoon && (
              <span className="rounded-full bg-[#B85C12]/[0.08] px-2.5 py-1 text-[9px] font-bold text-[#9A4D0A]">
                Applications closing soon
              </span>
            )}
          </div>

          <button
            type="button"
            className="
              group/button
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-full
              bg-ink
              px-5
              py-2.5
              text-[11px]
              font-bold
              text-white
              transition-all
              duration-200
              hover:bg-[#173629]
              hover:shadow-[0_8px_20px_rgba(20,40,30,0.14)]
            "
          >
            Review project
            <ArrowUpRight
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-200
                group-hover/button:translate-x-0.5
                group-hover/button:-translate-y-0.5
              "
            />
          </button>
        </div>
      </div>
    </Card>
  )
}

export function AvailableProjects() {
  const verifiedProjects = projects.filter(
    (project) => project.verifiedClient,
  )

  const openProjects = projects.filter(
    (project) => project.status === 'Open',
  )

  return (
    <div className="space-y-8">
      {/* ===================================================== */}
      {/* Marketplace header */}
      {/* ===================================================== */}

      <div className="relative overflow-hidden rounded-[24px] bg-[#173629] px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/[0.035]" />
        <div className="absolute -bottom-28 right-24 h-48 w-48 rounded-full bg-[#B85C12]/10" />
        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-white/[0.015]" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <BriefcaseBusiness className="h-4 w-4 text-white/80" />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">
                Contractor marketplace
              </span>
            </div>

            <h1 className="mt-5 font-display text-[28px] font-semibold leading-tight tracking-[-0.035em] sm:text-[34px]">
              Opportunities worth
              <br className="hidden sm:block" /> building for.
            </h1>

            <p className="mt-3 max-w-xl text-[12px] leading-5 text-white/50 sm:text-[13px] sm:leading-6">
              Discover construction opportunities matched to your trade,
              capabilities and operating location.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="rounded-2xl bg-white/[0.08] px-4 py-3">
              <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-white/35">
                Available now
              </p>

              <p className="mt-1 font-display text-[22px] font-semibold">
                {projects.length}
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.08] px-4 py-3">
              <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-white/35">
                Verified clients
              </p>

              <p className="mt-1 font-display text-[22px] font-semibold">
                {verifiedProjects.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* Marketplace snapshot */}
      {/* ===================================================== */}

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="group rounded-[20px] border-ink/[0.07] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(20,40,30,0.05)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35">
                Matching projects
              </p>

              <p className="mt-2 font-display text-[27px] font-semibold tracking-[-0.035em] text-ink">
                {projects.length}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4F6F3] text-ink/50">
              <BriefcaseBusiness className="h-4 w-4" />
            </div>
          </div>

          <p className="mt-2 text-[10px] text-ink/40">
            Opportunities matching your profile
          </p>
        </Card>

        <Card className="group rounded-[20px] border-ink/[0.07] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(20,40,30,0.05)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35">
                Verified clients
              </p>

              <p className="mt-2 font-display text-[27px] font-semibold tracking-[-0.035em] text-ink">
                {verifiedProjects.length}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>

          <p className="mt-2 text-[10px] text-ink/40">
            Projects with verified clients
          </p>
        </Card>

        <Card className="group rounded-[20px] border-ink/[0.07] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(20,40,30,0.05)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35">
                Open opportunities
              </p>

              <p className="mt-2 font-display text-[27px] font-semibold tracking-[-0.035em] text-ink">
                {openProjects.length}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F7EFE8] text-[#B85C12]">
              <Construction className="h-4 w-4" />
            </div>
          </div>

          <p className="mt-2 text-[10px] text-ink/40">
            Currently accepting bids
          </p>
        </Card>
      </div>

      {/* ===================================================== */}
      {/* Project discovery */}
      {/* ===================================================== */}

      <section>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/35">
              Marketplace opportunities
            </p>

            <h2 className="mt-1 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
              Projects matching your profile
            </h2>

            <p className="mt-1 text-[11px] leading-5 text-ink/40">
              Review the scope, assess the opportunity and submit a structured bid.
            </p>
          </div>

          <span className="hidden rounded-full border border-ink/[0.07] bg-white px-3 py-1.5 text-[9px] font-semibold text-ink/40 sm:block">
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