import type { ProjectStage } from '@/modules/projects/types'
import { Badge } from '@/components/ui/Badge'

const stageMap: Record<
  ProjectStage,
  {
    label: string
    tone: 'neutral' | 'amber' | 'teal' | 'brick'
    dot: string
  }
> = {
  draft: {
    label: 'Draft',
    tone: 'neutral',
    dot: 'bg-ink/30',
  },

  submitted: {
    label: 'Submitted',
    tone: 'neutral',
    dot: 'bg-ink/40',
  },

  bidding: {
    label: 'Bidding Open',
    tone: 'amber',
    dot: 'bg-[#B85C12]',
  },

  awarded: {
    label: 'Awarded',
    tone: 'amber',
    dot: 'bg-[#B85C12]',
  },

  in_progress: {
    label: 'In Progress',
    tone: 'teal',
    dot: 'bg-[#12613E]',
  },

  monitoring: {
    label: 'Monitoring',
    tone: 'teal',
    dot: 'bg-[#12613E]',
  },

  handover: {
    label: 'Handover',
    tone: 'amber',
    dot: 'bg-[#B85C12]',
  },

  completed: {
    label: 'Completed',
    tone: 'teal',
    dot: 'bg-[#12613E]',
  },

  disputed: {
    label: 'Disputed',
    tone: 'brick',
    dot: 'bg-brick',
  },
}

export function StagePill({ stage }: { stage: ProjectStage }) {
  const config = stageMap[stage]

  return (
    <Badge
      tone={config.tone}
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-2.5
        py-1.5
        text-[9px]
        font-bold
        uppercase
        tracking-[0.08em]
        whitespace-nowrap
        transition-all
        duration-200
      "
    >
      <span
        aria-hidden="true"
        className={`
          h-1.5
          w-1.5
          shrink-0
          rounded-full
          ${config.dot}
        `}
      />

      {config.label}
    </Badge>
  )
}