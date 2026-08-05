import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Account Settings — Users module
 * BRD reference: Sec. 15.1
 *
 * TODO: replace this placeholder with the real implementation.
 * Manage account preferences and notifications.
 */
export function AccountSettings() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Account Settings"
        description="Manage account preferences and notifications."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 15.1
          </span>
        }
      />
    </Card>
  )
}
