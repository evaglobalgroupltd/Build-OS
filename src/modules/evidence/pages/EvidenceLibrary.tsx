import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Evidence Library — Evidence module
 * BRD reference: Sec. 43
 *
 * TODO: replace this placeholder with the real implementation.
 * All evidence submitted across a project.
 */
export function EvidenceLibrary() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Evidence Library"
        description="All evidence submitted across a project."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 43
          </span>
        }
      />
    </Card>
  )
}
