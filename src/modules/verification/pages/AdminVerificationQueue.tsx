import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Verification Queue — Verification module
 * BRD reference: Sec. 15.2
 *
 * TODO: replace this placeholder with the real implementation.
 * Admin queue for reviewing submitted verifications.
 */
export function AdminVerificationQueue() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Verification Queue"
        description="Admin queue for reviewing submitted verifications."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 15.2
          </span>
        }
      />
    </Card>
  )
}
