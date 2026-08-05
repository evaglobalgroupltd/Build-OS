import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Supplier Analytics — Analytics module
 * BRD reference: Sec. 39.3
 *
 * TODO: replace this placeholder with the real implementation.
 * Supplier performance and reliability trends.
 */
export function SupplierAnalytics() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Supplier Analytics"
        description="Supplier performance and reliability trends."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 39.3
          </span>
        }
      />
    </Card>
  )
}
