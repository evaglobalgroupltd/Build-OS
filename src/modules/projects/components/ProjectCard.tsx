import type { Project } from '@/modules/projects/types'
import { StagePill } from './StagePill'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-md border border-line p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-sm font-semibold text-ink">{project.name}</p>
          <p className="text-xs text-ink/50">{project.location}</p>
        </div>
        <StagePill stage={project.stage} />
      </div>

      <div className="mt-3">
        <div className="mb-1 flex justify-between text-xs text-ink/50">
          <span>Progress</span>
          <span className="font-mono">{project.progressPercent}%</span>
        </div>
        <ProgressBar percent={project.progressPercent} tone="teal" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-ink/50">
        {project.contractorName && <Badge>{project.contractorName}</Badge>}
        <span className="font-mono">
          {project.currency === 'NGN' ? '₦' : '$'}
          {(project.budget / 1_000_000).toFixed(1)}M budget
        </span>
        {project.pendingApprovals > 0 && (
          <Badge tone="amber">{project.pendingApprovals} approvals pending</Badge>
        )}
      </div>
    </div>
  )
}
