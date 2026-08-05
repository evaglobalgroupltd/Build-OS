import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Suppliers — Suppliers module
 * BRD reference: Sec. 17.2
 *
 * TODO: replace this placeholder with the real implementation.
 * Browse the supplier marketplace.
 */
export function SupplierList() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Suppliers"
        description="Browse the supplier marketplace."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 17.2
          </span>
        }
      />
    </Card>
  )
}
