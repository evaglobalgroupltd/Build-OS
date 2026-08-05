import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Project Settings — Projects module
 * BRD reference: Sec. 16
 *
 * TODO: replace this placeholder with the real implementation.
 * Configure project-level settings.
 */
export function ProjectSettings() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Project Settings"
        description="Configure project-level settings."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 16
          </span>
        }
      />
    </Card>
  )
}
