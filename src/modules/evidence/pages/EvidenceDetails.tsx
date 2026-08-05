import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Evidence Details — Evidence module
 * BRD reference: Sec. 43
 *
 * TODO: replace this placeholder with the real implementation.
 * Detail view of a single evidence submission.
 */
export function EvidenceDetails() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Evidence Details"
        description="Detail view of a single evidence submission."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 43
          </span>
        }
      />
    </Card>
  )
}
