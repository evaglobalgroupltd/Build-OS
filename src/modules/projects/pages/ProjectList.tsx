import { useMemo, useState } from 'react'
import { FolderPlus, Search, SlidersHorizontal } from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
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

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase()

    return (projects as Project[]).filter((project) => {
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

  const activeProjects = (projects as Project[]).filter(
    (project) =>
      project.stage === 'in_progress' ||
      project.stage === 'monitoring',
  ).length

  const pendingApprovals = (projects as Project[]).reduce(
    (total, project) => total + project.pendingApprovals,
    0,
  )

  const completedProjects = (projects as Project[]).filter(
    (project) => project.stage === 'completed',
  ).length

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
            Projects
          </p>

          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
            Your projects
          </h1>

          <p className="mt-1 text-sm text-ink/45">
            Track projects from submission through construction, monitoring
            and handover.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white"
        >
          <FolderPlus className="h-4 w-4" />
          Create project
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total projects"
          value={String(projects.length)}
          detail="Across your account"
        />

        <SummaryCard
          label="Active projects"
          value={String(activeProjects)}
          detail="In progress or monitoring"
        />

        <SummaryCard
          label="Pending approvals"
          value={String(pendingApprovals)}
          detail="Requires client action"
          tone={pendingApprovals > 0 ? 'amber' : 'default'}
        />

        <SummaryCard
          label="Completed"
          value={String(completedProjects)}
          detail="Projects completed"
        />
      </div>

      {/* Project list */}
      <Card>
        <CardHeader
          title="All projects"
          subtitle={`${filteredProjects.length} project${
            filteredProjects.length === 1 ? '' : 's'
          } shown`}
        />

        <CardBody className="space-y-5">
          {/* Search + filter */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by project, location or contractor..."
                  className="h-10 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-xs text-ink outline-none placeholder:text-ink/30 focus:border-ink/30"
                />
              </div>

              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line px-3 text-xs font-semibold text-ink/55 hover:bg-ink/[0.03]"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
            </div>

            {/* Stage filters */}
            <div className="flex gap-1 overflow-x-auto pb-1">
              {filters.map((item) => {
                const active = filter === item.value

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFilter(item.value)}
                    className={[
                      'whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-semibold transition-colors',
                      active
                        ? 'bg-ink text-white'
                        : 'text-ink/40 hover:bg-ink/5 hover:text-ink',
                    ].join(' ')}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Results */}
          {filteredProjects.length > 0 ? (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
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
        </CardBody>
      </Card>

      {/* Workflow note */}
      <div className="rounded-xl border border-line bg-paper-2 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="neutral">Project lifecycle</Badge>

          <span className="text-xs text-ink/40">
            Draft → Submitted → Bidding → Awarded → In Progress → Monitoring
            → Handover → Completed
          </span>
        </div>

        <p className="mt-2 text-[11px] leading-5 text-ink/40">
          Disputed projects remain separately identifiable so related project
          and payment actions can be handled through the formal dispute
          workflow.
        </p>
      </div>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  detail,
  tone = 'default',
}: {
  label: string
  value: string
  detail: string
  tone?: 'default' | 'amber'
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
        {label}
      </p>

      <p
        className={[
          'mt-3 font-display text-xl font-semibold',
          tone === 'amber' ? 'text-amber-700' : 'text-ink',
        ].join(' ')}
      >
        {value}
      </p>

      <p className="mt-1 text-[10px] text-ink/35">{detail}</p>
    </div>
  )
}

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
    <div className="rounded-xl border border-dashed border-line px-6 py-12 text-center">
      <FolderPlus className="mx-auto h-6 w-6 text-ink/20" />

      <p className="mt-3 text-sm font-semibold text-ink">
        No projects found
      </p>

      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-ink/40">
        {search
          ? `Nothing matches "${search}".`
          : `There are no projects in the ${
              filter === 'all' ? 'selected' : filter.replace('_', ' ')
            } stage.`}
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-4 rounded-lg border border-line px-3 py-2 text-[11px] font-semibold text-ink hover:bg-ink/[0.03]"
      >
        Clear search and filters
      </button>
    </div>
  )
}