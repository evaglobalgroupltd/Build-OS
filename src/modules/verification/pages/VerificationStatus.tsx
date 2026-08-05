import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Verification Status — Verification module
 * BRD reference: Sec. 15.2
 *
 * TODO: replace this placeholder with the real implementation.
 * Track submitted verification status.
 */
export function VerificationStatus() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Verification Status"
        description="Track submitted verification status."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 15.2
          </span>
        }
      />
    </Card>
  )
}
