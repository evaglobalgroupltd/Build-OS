import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Notification Settings — Notifications module
 * BRD reference: Sec. 20.2
 *
 * TODO: replace this placeholder with the real implementation.
 * Configure notification channels and frequency.
 */
export function NotificationSettings() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Notification Settings"
        description="Configure notification channels and frequency."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 20.2
          </span>
        }
      />
    </Card>
  )
}
