import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Dispute Details — Disputes module
 * BRD reference: Sec. 19
 *
 * TODO: replace this placeholder with the real implementation.
 * Full detail and timeline of a dispute.
 */
export function DisputeDetails() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Dispute Details"
        description="Full detail and timeline of a dispute."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 19
          </span>
        }
      />
    </Card>
  )
}
