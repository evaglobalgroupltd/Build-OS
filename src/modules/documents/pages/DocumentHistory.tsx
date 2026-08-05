import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Document History — Documents module
 * BRD reference: Sec. 20.1
 *
 * TODO: replace this placeholder with the real implementation.
 * Version and access history for a document.
 */
export function DocumentHistory() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Document History"
        description="Version and access history for a document."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 20.1
          </span>
        }
      />
    </Card>
  )
}
