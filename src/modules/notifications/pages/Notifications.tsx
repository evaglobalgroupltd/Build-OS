import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Notifications — Notifications module
 * BRD reference: Sec. 20.2
 *
 * TODO: replace this placeholder with the real implementation.
 * All notifications for the current user.
 */
export function Notifications() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Notifications"
        description="All notifications for the current user."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 20.2
          </span>
        }
      />
    </Card>
  )
}
