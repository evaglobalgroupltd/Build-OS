import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Document Details — Documents module
 * BRD reference: Sec. 20.1
 *
 * TODO: replace this placeholder with the real implementation.
 * Detail view of a single document.
 */
export function DocumentDetails() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Document Details"
        description="Detail view of a single document."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 20.1
          </span>
        }
      />
    </Card>
  )
}
