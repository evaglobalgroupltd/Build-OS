import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Fund Escrow — Escrow module
 * BRD reference: Sec. 18
 *
 * TODO: replace this placeholder with the real implementation.
 * Add funds to a project's escrow wallet.
 */
export function Funding() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Fund Escrow"
        description="Add funds to a project's escrow wallet."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 18
          </span>
        }
      />
    </Card>
  )
}
