import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Management Reports — Reports module
 * BRD reference: Sec. 20.3
 *
 * TODO: replace this placeholder with the real implementation.
 * Cross-project management summaries.
 */
export function ManagementReports() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Management Reports"
        description="Cross-project management summaries."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 20.3
          </span>
        }
      />
    </Card>
  )
}
