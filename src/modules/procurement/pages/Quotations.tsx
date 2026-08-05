import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Quotations — Procurement module
 * BRD reference: Sec. 17.3
 *
 * TODO: replace this placeholder with the real implementation.
 * Quotes received from suppliers.
 */
export function Quotations() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Quotations"
        description="Quotes received from suppliers."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 17.3
          </span>
        }
      />
    </Card>
  )
}
