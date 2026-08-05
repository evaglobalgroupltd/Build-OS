import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Inspections — Monitoring module
 * BRD reference: Sec. 20.3 / 43
 *
 * TODO: replace this placeholder with the real implementation.
 * Scheduled and completed site inspections.
 */
export function Inspections() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Inspections"
        description="Scheduled and completed site inspections."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 20.3 / 43
          </span>
        }
      />
    </Card>
  )
}
