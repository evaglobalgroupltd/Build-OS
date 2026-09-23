import type { Project } from '@/modules/projects/types'
import { StagePill } from './StagePill'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  MapPin,
} from 'lucide-react'

export function ProjectCard({ project }: { project: Project }) {
  const currencySymbol = project.currency === 'NGN' ? '₦' : '$'
  const budget = `${currencySymbol}${(project.budget / 1_000_000).toFixed(1)}M`

  return (
    <article
      className="
        group relative overflow-hidden rounded-[22px]
        border border-ink/[0.075]
        bg-white
        transition-all duration-300
        hover:-translate-y-1
        hover:border-ink/[0.12]
        hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]
      "
    >
      {/* Subtle luxury accent */}
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 h-px
          bg-gradient-to-r
          from-transparent via-ink/15 to-transparent
          opacity-70
        "
      />

      {/* Main content */}
      <div className="p-5 sm:p-6">

        {/* Project identity */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">

            {/* Eyebrow */}
            <div className="mb-2.5 flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-ink/[0.045] text-ink/45">
                <Building2 size={12} strokeWidth={1.8} />
              </span>

              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                Project
              </span>
            </div>

            {/* Name */}
            <h3
              className="
                truncate
                font-display text-[17px] font-semibold
                leading-tight tracking-[-0.025em]
                text-ink
                transition-colors duration-200
                group-hover:text-ink/80
              "
            >
              {project.name}
            </h3>

            {/* Location */}
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-ink/45">
              <MapPin size={11} strokeWidth={1.8} />
              <span className="truncate">{project.location}</span>
            </div>
          </div>

          {/* Stage */}
          <div className="shrink-0">
            <StagePill stage={project.stage} />
          </div>
        </div>

        {/* Progress section */}
        <div className="mt-6 rounded-[17px] border border-ink/[0.055] bg-[#FAFBFA] p-4">

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/35">
                Build progress
              </p>

              <p className="mt-1.5 font-display text-[25px] font-semibold leading-none tracking-[-0.04em] text-ink">
                {project.progressPercent}
                <span className="ml-0.5 text-[14px] text-ink/35">
                  %
                </span>
              </p>
            </div>

            <div className="pb-0.5 text-right">
              <p className="text-[9px] uppercase tracking-[0.1em] text-ink/30">
                Completion
              </p>

              <p className="mt-1 text-[10px] font-semibold text-ink/55">
                {project.progressPercent >= 100
                  ? 'Completed'
                  : project.progressPercent >= 75
                    ? 'Near completion'
                    : project.progressPercent >= 40
                      ? 'In progress'
                      : 'Early stage'}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <ProgressBar
              percent={project.progressPercent}
              tone="teal"
            />
          </div>
        </div>

        {/* Financial + contractor information */}
        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">

          {/* Contractor */}
          {project.contractorName ? (
            <div className="rounded-[15px] border border-ink/[0.055] px-3.5 py-3">
              <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/35">
                Contractor
              </p>

              <div className="mt-1.5 flex min-w-0 items-center gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#F4F6F3] text-ink/50">
                  <CheckCircle2 size={12} />
                </div>

                <span className="truncate text-[11px] font-semibold text-ink/70">
                  {project.contractorName}
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-[15px] border border-dashed border-ink/[0.08] px-3.5 py-3">
              <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/30">
                Contractor
              </p>

              <p className="mt-1.5 text-[11px] font-medium text-ink/40">
                Not assigned
              </p>
            </div>
          )}

          {/* Budget */}
          <div className="rounded-[15px] border border-ink/[0.055] px-3.5 py-3">
            <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/35">
              Project budget
            </p>

            <p className="mt-1.5 font-display text-[15px] font-semibold tracking-[-0.02em] text-ink">
              {budget}
            </p>
          </div>
        </div>

        {/* Pending approvals */}
        {project.pendingApprovals > 0 && (
          <div
            className="
              mt-3 flex items-center justify-between gap-3
              rounded-[15px]
              border border-[#B85C12]/15
              bg-[#FBF5EF]
              px-3.5 py-3
            "
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#B85C12]/10 text-[#B85C12]">
                <CheckCircle2 size={13} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-[#7A3F0C]">
                  {project.pendingApprovals} approval
                  {project.pendingApprovals === 1 ? '' : 's'} pending
                </p>

                <p className="mt-0.5 truncate text-[9px] text-[#7A3F0C]/55">
                  Requires your review
                </p>
              </div>
            </div>

            <Badge tone="amber">
              Action
            </Badge>
          </div>
        )}
      </div>

      {/* Bottom action strip */}
      <div
        className="
          flex items-center justify-between
          border-t border-ink/[0.055]
          bg-[#FCFCFB]
          px-5 py-3.5
          sm:px-6
        "
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.11em] text-ink/40">
            Project active
          </span>
        </div>

        <button
          type="button"
          className="
            inline-flex items-center gap-1.5
            text-[10px] font-bold
            text-ink/55
            transition-all duration-200
            hover:gap-2
            hover:text-ink
          "
        >
          View project
          <ArrowUpRight
            size={12}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </article>
  )
}