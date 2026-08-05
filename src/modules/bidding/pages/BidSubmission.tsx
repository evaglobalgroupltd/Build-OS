import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Submit a Bid — Bidding module
 * BRD reference: Sec. 17.1 / 24
 *
 * TODO: replace this placeholder with the real implementation.
 * Bid submission form: cost, timeline, approach.
 */
export function BidSubmission() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Submit a Bid"
        description="Bid submission form: cost, timeline, approach."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 17.1 / 24
          </span>
        }
      />
    </Card>
  )
}
