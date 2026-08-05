import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Contractor Verification — Contractors module
 * BRD reference: Sec. 14.2
 *
 * TODO: replace this placeholder with the real implementation.
 * Verification status and documents.
 */
export function ContractorVerification() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Contractor Verification"
        description="Verification status and documents."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 14.2
          </span>
        }
      />
    </Card>
  )
}
