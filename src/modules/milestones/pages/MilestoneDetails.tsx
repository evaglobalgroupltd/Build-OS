import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Milestone Details — Milestones module
 * BRD reference: Sec. 18.4
 *
 * TODO: replace this placeholder with the real implementation.
 * Detail view of a single milestone.
 */
export function MilestoneDetails() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Milestone Details"
        description="Detail view of a single milestone."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 18.4
          </span>
        }
      />
    </Card>
  )
}
