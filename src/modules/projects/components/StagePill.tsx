import type { ProjectStage } from '@/modules/projects/types'
import { Badge } from '@/components/ui/Badge'

const stageMap: Record<ProjectStage, { label: string; tone: 'neutral' | 'amber' | 'teal' | 'brick' }> = {
  draft: { label: 'Draft', tone: 'neutral' },
  submitted: { label: 'Submitted', tone: 'neutral' },
  bidding: { label: 'Bidding Open', tone: 'amber' },
  awarded: { label: 'Awarded', tone: 'amber' },
  in_progress: { label: 'In Progress', tone: 'teal' },
  monitoring: { label: 'Monitoring', tone: 'teal' },
  handover: { label: 'Handover', tone: 'amber' },
  completed: { label: 'Completed', tone: 'teal' },
  disputed: { label: 'Disputed', tone: 'brick' },
}

export function StagePill({ stage }: { stage: ProjectStage }) {
  const { label, tone } = stageMap[stage]
  return <Badge tone={tone}>{label}</Badge>
}
