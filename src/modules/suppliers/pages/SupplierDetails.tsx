import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Supplier Details — Suppliers module
 * BRD reference: Sec. 17.2
 *
 * TODO: replace this placeholder with the real implementation.
 * Admin/client detail view of a supplier.
 */
export function SupplierDetails() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Supplier Details"
        description="Admin/client detail view of a supplier."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 17.2
          </span>
        }
      />
    </Card>
  )
}
