import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Approval Details — Approvals module
 * BRD reference: Sec. 43.3
 *
 * TODO: replace this placeholder with the real implementation.
 * Full context for a single approval decision.
 */
export function ApprovalDetails() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Approval Details"
        description="Full context for a single approval decision."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 43.3
          </span>
        }
      />
    </Card>
  )
}
