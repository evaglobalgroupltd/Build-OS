import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Project Reports — Reports module
 * BRD reference: Sec. 20.3
 *
 * TODO: replace this placeholder with the real implementation.
 * Reports scoped to a single project.
 */
export function ProjectReports() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Project Reports"
        description="Reports scoped to a single project."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 20.3
          </span>
        }
      />
    </Card>
  )
}
