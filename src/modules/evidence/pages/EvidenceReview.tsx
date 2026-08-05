import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Evidence Review — Evidence module
 * BRD reference: Sec. 43
 *
 * TODO: replace this placeholder with the real implementation.
 * Reviewer view for verifying submitted evidence.
 */
export function EvidenceReview() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Evidence Review"
        description="Reviewer view for verifying submitted evidence."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 43
          </span>
        }
      />
    </Card>
  )
}
