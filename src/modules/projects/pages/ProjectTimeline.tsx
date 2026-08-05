import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Project Timeline — Projects module
 * BRD reference: Sec. 16
 *
 * TODO: replace this placeholder with the real implementation.
 * Chronological timeline of project events.
 */
export function ProjectTimeline() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Project Timeline"
        description="Chronological timeline of project events."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 16
          </span>
        }
      />
    </Card>
  )
}
