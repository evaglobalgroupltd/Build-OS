import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Dispute Evidence — Disputes module
 * BRD reference: Sec. 19
 *
 * TODO: replace this placeholder with the real implementation.
 * Evidence submitted as part of a dispute.
 */
export function Evidence() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Dispute Evidence"
        description="Evidence submitted as part of a dispute."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 19
          </span>
        }
      />
    </Card>
  )
}
