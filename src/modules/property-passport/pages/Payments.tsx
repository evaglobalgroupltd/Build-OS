import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Payments — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * TODO: replace this placeholder with the real implementation.
 * Full payment record for the property.
 */
export function Payments() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Payments"
        description="Full payment record for the property."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 20.4
          </span>
        }
      />
    </Card>
  )
}
