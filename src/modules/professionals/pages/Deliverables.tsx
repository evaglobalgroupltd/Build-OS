import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Deliverables — Professionals module
 * BRD reference: Sec. 40.7
 *
 * TODO: replace this placeholder with the real implementation.
 * Submitted deliverables awaiting approval.
 */
export function Deliverables() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Deliverables"
        description="Submitted deliverables awaiting approval."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 40.7
          </span>
        }
      />
    </Card>
  )
}
