import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FolderPlus,
  Search,
  SlidersHorizontal,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { ProjectCard } from '@/modules/projects/components/ProjectCard'
import type { Project, ProjectStage } from '@/modules/projects/types'
import { projects } from '@/data/mockData'

type ProjectFilter = 'all' | ProjectStage

const filters: { value: ProjectFilter; label: string }[] = [
  { value: 'all', label: 'All projects' },
  { value: 'draft', label: 'Draft' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'bidding', label: 'Bidding' },
  { value: 'awarded', label: 'Awarded' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'monitoring', label: 'Monitoring' },
  { value: 'handover', label: 'Handover' },
  { value: 'completed', label: 'Completed' },
  { value: 'disputed', label: 'Disputed' },
]

export function ProjectList() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<ProjectFilter>('all')

  const allProjects = projects as Project[]

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase()

    return allProjects.filter((project) => {
      const matchesFilter =
        filter === 'all' || project.stage === filter

      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        project.contractorName?.toLowerCase().includes(query)

      return matchesFilter && matchesSearch
    })
  }, [search, filter])

  const activeProjects = allProjects.filter(
    (project) =>
      project.stage === 'in_progress' ||
      project.stage === 'monitoring',
  ).length

  const pendingApprovals = allProjects.reduce(
    (total, project) => total + project.pendingApprovals,
    0,
  )

  const completedProjects = allProjects.filter(
    (project) => project.stage === 'completed',
  ).length

  const hasFilters = Boolean(search.trim()) || filter !== 'all'

  return (
    <div className="space-y-7">

      {/* ===================================================== */}
      {/* Header */}
      {/* ===================================================== */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Portfolio
            </p>
          </div>

          <h1 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
            Your projects
          </h1>

          <p className="mt-1.5 max-w-2xl text-[13px] leading-5 text-ink/50">
            Manage your properties from initial planning through construction,
            monitoring and final handover.
          </p>
        </div>

        <button
          type="button"
          className="
            group
            flex
            w-fit
            items-center
            gap-2
            rounded-full
            bg-ink
            px-5
            py-3
            text-xs
            font-bold
            text-white
            shadow-[0_10px_25px_rgba(15,23,20,0.12)]
            transition
            duration-300
            hover:-translate-y-0.5
            hover:shadow-[0_14px_30px_rgba(15,23,20,0.16)]
          "
        >
          <FolderPlus size={14} />

          Create project

          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>

      {/* ===================================================== */}
      {/* Portfolio summary */}
      {/* ===================================================== */}

      <section
        aria-label="Portfolio summary"
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        <SummaryCard
          label="Total projects"
          value={String(allProjects.length)}
          detail="Across your portfolio"
          icon={Building2}
        />

        <SummaryCard
          label="Active projects"
          value={String(activeProjects)}
          detail="In progress or monitoring"
          icon={Clock3}
          tone="green"
        />

        <SummaryCard
          label="Pending approvals"
          value={String(pendingApprovals)}
          detail={
            pendingApprovals > 0
              ? 'Requires your attention'
              : 'Nothing waiting'
          }
          icon={CheckCircle2}
          tone={pendingApprovals > 0 ? 'amber' : 'green'}
        />

        <SummaryCard
          label="Completed"
          value={String(completedProjects)}
          detail="Successfully delivered"
          icon={CheckCircle2}
          tone="default"
        />
      </section>

      {/* ===================================================== */}
      {/* Main project workspace */}
      {/* ===================================================== */}

      <Card className="overflow-hidden">

        {/* Workspace header */}

        <div className="border-b border-ink/[0.07] px-5 py-5 sm:px-6">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink/40">
                Project portfolio
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                All projects
              </h2>

              <p className="mt-1 text-[11px] text-ink/45">
                {filteredProjects.length} project
                {filteredProjects.length === 1 ? '' : 's'} currently shown
              </p>
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setFilter('all')
                }}
                className="
                  flex
                  w-fit
                  items-center
                  gap-1.5
                  text-[11px]
                  font-semibold
                  text-[#B85C12]
                  transition
                  hover:text-[#8F4307]
                "
              >
                Clear filters
                <ArrowUpRight size={13} />
              </button>
            )}

          </div>
        </div>

        <CardBody className="p-5 sm:p-6">

          {/* ================================================= */}
          {/* Search */}
          {/* ================================================= */}

          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-3 sm:flex-row">

              <div className="group relative flex-1">

                <Search
                  size={15}
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-ink/30
                    transition
                    group-focus-within:text-ink/60
                  "
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search projects, locations or contractors..."
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-ink/[0.08]
                    bg-[#FAFBFA]
                    pl-11
                    pr-4
                    text-[12px]
                    font-medium
                    text-ink
                    outline-none
                    transition
                    placeholder:text-ink/30
                    hover:border-ink/[0.14]
                    focus:border-ink/25
                    focus:bg-white
                    focus:shadow-[0_0_0_3px_rgba(15,23,20,0.025)]
                  "
                />
              </div>

              <button
                type="button"
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-ink/[0.08]
                  bg-white
                  px-4
                  text-[11px]
                  font-bold
                  text-ink/60
                  transition
                  hover:border-ink/15
                  hover:bg-ink/[0.025]
                  hover:text-ink
                "
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>

            </div>

            {/* ================================================= */}
            {/* Stage navigation */}
            {/* ================================================= */}

            <div className="relative">

              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">

                {filters.map((item) => {
                  const active = filter === item.value

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setFilter(item.value)}
                      className={[
                        'group relative whitespace-nowrap rounded-full px-3.5 py-2 text-[10px] font-bold transition-all duration-200',
                        active
                          ? 'bg-ink text-white shadow-[0_5px_15px_rgba(15,23,20,0.12)]'
                          : 'bg-[#F5F6F4] text-ink/45 hover:bg-[#ECEFEB] hover:text-ink/70',
                      ].join(' ')}
                    >
                      {item.label}

                      {active && item.value !== 'all' && (
                        <span className="ml-1.5 inline-block h-1 w-1 rounded-full bg-white/60 align-middle" />
                      )}
                    </button>
                  )
                })}

              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* Results */}
          {/* ================================================= */}

          <div className="mt-6">

            {filteredProjects.length > 0 ? (

              <div className="space-y-4">

                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="
                      group
                      overflow-hidden
                      rounded-[20px]
                      border
                      border-ink/[0.07]
                      bg-white
                      transition
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-ink/[0.11]
                      hover:shadow-[0_16px_40px_rgba(20,40,30,0.07)]
                    "
                  >
                    <ProjectCard project={project} />

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.06] bg-[#FCFDFC] px-4 py-3">

                      <div className="flex items-center gap-2">

                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF4EE] text-[#12613E]">
                          <CheckCircle2 size={13} />
                        </span>

                        <div>
                          <p className="text-[10px] font-semibold text-ink/65">
                            Project tracking active
                          </p>

                          <p className="text-[9px] text-ink/35">
                            Milestones and project activity monitored
                          </p>
                        </div>

                      </div>

                      <button
                        type="button"
                        className="
                          flex
                          items-center
                          gap-1
                          text-[10px]
                          font-bold
                          text-ink/45
                          transition
                          hover:text-[#B85C12]
                        "
                      >
                        Open project
                        <ChevronRight
                          size={13}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </button>

                    </div>
                  </div>
                ))}

              </div>

            ) : (

              <EmptyProjectResults
                search={search}
                filter={filter}
                onClear={() => {
                  setSearch('')
                  setFilter('all')
                }}
              />

            )}
          </div>
        </CardBody>
      </Card>

      {/* ===================================================== */}
      {/* Project lifecycle */}
      {/* ===================================================== */}

      <section
        aria-label="Project lifecycle"
        className="
          overflow-hidden
          rounded-[20px]
          border
          border-ink/[0.07]
          bg-[#F7F8F6]
        "
      >

        <div className="border-b border-ink/[0.06] px-5 py-4 sm:px-6">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                Workflow
              </p>

              <h3 className="mt-1 font-display text-base font-semibold text-ink">
                Project lifecycle
              </h3>
            </div>

            <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-ink/40">
              Governed workflow
            </span>

          </div>
        </div>

        <div className="px-5 py-5 sm:px-6">

          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">

            {[
              'Draft',
              'Submitted',
              'Bidding',
              'Awarded',
              'In Progress',
              'Monitoring',
              'Handover',
              'Completed',
            ].map((stage, index, array) => (
              <div
                key={stage}
                className="flex items-center gap-2"
              >

                <span
                  className="
                    rounded-full
                    border
                    border-ink/[0.07]
                    bg-white
                    px-3
                    py-1.5
                    text-[9px]
                    font-semibold
                    text-ink/50
                  "
                >
                  {stage}
                </span>

                {index < array.length - 1 && (
                  <ChevronRight
                    size={11}
                    className="text-ink/20"
                  />
                )}

              </div>
            ))}

          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#B85C12]/10 bg-[#FBF6F1] px-4 py-3">

            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B85C12]/10 text-[#B85C12]">
              <Clock3 size={13} />
            </div>

            <p className="text-[10.5px] leading-5 text-ink/50">
              Disputed projects remain separately identifiable so project,
              payment and evidence actions can continue through the formal
              dispute workflow.
            </p>

          </div>

        </div>
      </section>
    </div>
  )
}

/* ========================================================= */
/* Summary Card */
/* ========================================================= */

function SummaryCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = 'default',
}: {
  label: string
  value: string
  detail: string
  icon: typeof Building2
  tone?: 'default' | 'green' | 'amber'
}) {
  const iconStyles = {
    default: 'bg-ink/[0.05] text-ink/45',
    green: 'bg-[#EAF4EE] text-[#12613E]',
    amber: 'bg-[#F8EEE6] text-[#B85C12]',
  }

  const valueStyles = {
    default: 'text-ink',
    green: 'text-[#12613E]',
    amber: 'text-[#B85C12]',
  }

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[18px]
        border
        border-ink/[0.07]
        bg-white
        p-4
        transition
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_12px_30px_rgba(20,40,30,0.055)]
        sm:p-5
      "
    >

      <div className="flex items-start justify-between gap-3">

        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35 sm:text-[10px]">
            {label}
          </p>

          <p
            className={[
              'mt-2 font-display text-[25px] font-semibold tracking-[-0.035em] sm:text-[28px]',
              valueStyles[tone],
            ].join(' ')}
          >
            {value}
          </p>
        </div>

        <div
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105',
            iconStyles[tone],
          ].join(' ')}
        >
          <Icon size={16} />
        </div>

      </div>

      <p className="mt-2 text-[10px] leading-4 text-ink/40">
        {detail}
      </p>
    </div>
  )
}

/* ========================================================= */
/* Empty State */
/* ========================================================= */

function EmptyProjectResults({
  search,
  filter,
  onClear,
}: {
  search: string
  filter: ProjectFilter
  onClear: () => void
}) {
  return (
    <div className="rounded-[20px] border border-dashed border-ink/[0.10] bg-[#FAFBFA] px-6 py-14 text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-ink/30 shadow-[0_5px_20px_rgba(20,40,30,0.05)]">
        <Building2 size={19} />
      </div>

      <p className="mt-4 font-display text-base font-semibold text-ink">
        No projects found
      </p>

      <p className="mx-auto mt-1.5 max-w-sm text-[11px] leading-5 text-ink/40">
        {search
          ? `Nothing matches "${search}". Try another project name, location or contractor.`
          : `There are no projects in the ${
              filter === 'all'
                ? 'selected'
                : filter.replace('_', ' ')
            } stage.`}
      </p>

      <button
        type="button"
        onClick={onClear}
        className="
          mt-5
          rounded-full
          border
          border-ink/[0.09]
          bg-white
          px-4
          py-2.5
          text-[10px]
          font-bold
          text-ink/60
          transition
          hover:border-ink/20
          hover:text-ink
          hover:shadow-sm
        "
      >
        Clear search and filters
      </button>
    </div>
  )
}