import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Milestone Review — Milestones module
 * BRD reference: Sec. 18.4
 *
 * TODO: replace this placeholder with the real implementation.
 * Review evidence and approve/reject a milestone.
 */
export function MilestoneReview() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Milestone Review"
        description="Review evidence and approve/reject a milestone."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 18.4
          </span>
        }
      />
    </Card>
  )
}
