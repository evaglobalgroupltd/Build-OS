import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Resolution — Disputes module
 * BRD reference: Sec. 19
 *
 * TODO: replace this placeholder with the real implementation.
 * Final resolution and outcome of a dispute.
 */
export function Resolution() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Resolution"
        description="Final resolution and outcome of a dispute."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 19
          </span>
        }
      />
    </Card>
  )
}
