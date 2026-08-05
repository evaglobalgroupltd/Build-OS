import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Award Contract — Bidding module
 * BRD reference: Sec. 17.1 / 24
 *
 * TODO: replace this placeholder with the real implementation.
 * Award a project to the selected bid.
 */
export function AwardContract() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Award Contract"
        description="Award a project to the selected bid."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 17.1 / 24
          </span>
        }
      />
    </Card>
  )
}
