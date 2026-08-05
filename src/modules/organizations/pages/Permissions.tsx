import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Permissions — Organizations module
 * BRD reference: Sec. 4.2
 *
 * TODO: replace this placeholder with the real implementation.
 * Configure permission sets per role.
 */
export function Permissions() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Permissions"
        description="Configure permission sets per role."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 4.2
          </span>
        }
      />
    </Card>
  )
}
