import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Payment Approvals — Escrow module
 * BRD reference: Sec. 18
 *
 * TODO: replace this placeholder with the real implementation.
 * Approve or reject pending payment releases.
 */
export function PaymentApprovals() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Payment Approvals"
        description="Approve or reject pending payment releases."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 18
          </span>
        }
      />
    </Card>
  )
}
