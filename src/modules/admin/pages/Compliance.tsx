import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Compliance — Admin module
 * BRD reference: Sec. 39
 *
 * TODO: replace this placeholder with the real implementation.
 * Platform-wide compliance monitoring.
 */
export function Compliance() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Compliance"
        description="Platform-wide compliance monitoring."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 39
          </span>
        }
      />
    </Card>
  )
}
